import { createReadStream, existsSync, statSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Stripe from 'stripe'
import 'dotenv/config'
import { initializeMailService, sendOrderConfirmationEmail } from './mailService.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.join(__dirname, 'dist')
const basePort = Number(process.env.PORT || 8787)
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const nodeEnv = process.env.NODE_ENV || 'development'

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null
const shippoApiKey = process.env.SHIPPO_API_KEY

// CORS origin configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:8787',
  'http://127.0.0.1:8787',
  'https://70x7.ca',
  'https://www.70x7.ca',
]

const getCorsOrigin = (requestOrigin) => {
  if (nodeEnv === 'development') {
    return 'http://localhost:5173'
  }
  if (allowedOrigins.includes(requestOrigin)) {
    return requestOrigin
  }
  return 'https://70x7.ca'
}

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0])
  const cleaned = decoded === '/' ? '/index.html' : decoded
  const resolved = path.normalize(path.join(distDir, cleaned))

  if (!resolved.startsWith(distDir)) {
    return null
  }

  return resolved
}

async function sendIndex(res) {
  const indexPath = path.join(distDir, 'index.html')
  const html = await readFile(indexPath, 'utf8')
  res.writeHead(200, { 'Content-Type': contentTypes['.html'] })
  res.end(html)
}

const server = http.createServer(async (req, res) => {
  try {
    const method = req.method || 'GET'
    const host = req.headers.host || `localhost:${basePort}`
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const requestUrl = new URL(req.url || '/', `${protocol}://${host}`)
    const pathname = requestUrl.pathname.replace(/\/+$/, '') || '/'
    const origin = req.headers.origin || `${protocol}://${host}`
    const corsOrigin = getCorsOrigin(origin)

    console.log(`[${method}] ${pathname}`)

    // Handle CORS preflight for all API routes
    if (method === 'OPTIONS' && pathname.startsWith('/api')) {
      console.log('Handling OPTIONS preflight')
      res.writeHead(204, {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      })
      res.end()
      return
    }

    if (method === 'POST' && pathname === '/api/calculate-shipping') {
      if (!shippoApiKey) {
        res.writeHead(503, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': corsOrigin,
        })
        res.end(
          JSON.stringify({
            error: 'Shippo is not configured. Set SHIPPO_API_KEY in your environment.',
          }),
        )
        return
      }

      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', async () => {
        try {
          const { address, weight = 0.25 } = JSON.parse(body)

          // Create address object for Shippo
          const toAddress = {
            name: address.name || 'Customer',
            street1: address.street1 || '',
            city: address.city || '',
            state: address.province || '',
            zip: address.postal_code || '',
            country: address.country === 'Canada' ? 'CA' : 'US',
          }

          // Default from address (Ontario)
          const fromAddress = {
            name: '70X7',
            street1: '123 Main St',
            city: 'Toronto',
            state: 'ON',
            zip: 'M5V 3A8',
            country: 'CA',
          }

          // Create parcel (t-shirt estimate)
          const parcelResponse = await fetch('https://api.goshippo.com/shipments/', {
            method: 'POST',
            headers: {
              'Authorization': `ShippoToken ${shippoApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              address_from: fromAddress,
              address_to: toAddress,
              parcels: [
                {
                  length: '30',
                  width: '20',
                  height: '5',
                  distance_unit: 'cm',
                  weight: weight.toString(),
                  mass_unit: 'kg',
                }
              ],
              carrier_accounts: ['9aec8aca3a2548809c15bfcd9923f805']
            })
          })

          const shipmentData = await parcelResponse.json()

          if (!shipmentData.rates || shipmentData.rates.length === 0) {
            res.writeHead(200, {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': corsOrigin,
            })
            res.end(JSON.stringify({ rates: [] }))
            return
          }

          // Format rates for frontend
          const rates = shipmentData.rates.map(rate => ({
            id: rate.object_id,
            provider: rate.provider,
            servicelevel: rate.servicelevel.name,
            amount: parseFloat(rate.amount),
            currency: rate.currency,
            estimated_days: rate.estimated_days,
          }))

          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin,
          })
          res.end(JSON.stringify({ rates }))
        } catch (err) {
          res.writeHead(500, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin,
          })
          res.end(JSON.stringify({ error: err.message }))
        }
      })
      return
    }

    if (method === 'GET' && pathname === '/api/send-test-email') {
      const testEmail = requestUrl.searchParams.get('email') || 'braedenlyman7@gmail.com'

      try {
        const testOrderData = {
          orderId: `TEST-${Date.now()}`,
          customerName: 'Test Customer',
          customerEmail: testEmail,
          customerAddress: '123 Test Street',
          customerApartment: 'Suite 100',
          customerCity: 'Toronto',
          customerProvince: 'ON',
          customerPostalCode: 'M5V 3A8',
          items: [
            {
              name: 'No Weapons Formed Against Me',
              quantity: 1,
              itemPrice: 40,
            },
            {
              name: 'David & Goliath Fight',
              quantity: 2,
              itemPrice: 40,
            },
          ],
          subtotal: 120,
          shippingCost: 15.99,
          shippingMethod: 'Canada Post - Regular Parcel',
        }

        await sendOrderConfirmationEmail(testOrderData)

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': corsOrigin,
        })
        res.end(JSON.stringify({
          success: true,
          message: `Test email sent to ${testEmail}`
        }))
      } catch (err) {
        res.writeHead(500, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': corsOrigin,
        })
        res.end(JSON.stringify({ error: err.message }))
      }
      return
    }

    if (method === 'POST' && pathname === '/api/send-order-confirmation') {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', async () => {
        try {
          const orderData = JSON.parse(body)
          await sendOrderConfirmationEmail(orderData)
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin,
          })
          res.end(JSON.stringify({ success: true }))
        } catch (err) {
          res.writeHead(500, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin,
          })
          res.end(JSON.stringify({ error: err.message }))
        }
      })
      return
    }

    if (method === 'POST' && pathname === '/api/create-payment-intent') {
      if (!stripe) {
        res.writeHead(503, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        })
        res.end(
          JSON.stringify({
            error: 'Stripe is not configured. Set STRIPE_SECRET_KEY in your environment.',
          }),
        )
        return
      }

      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })
      req.on('end', async () => {
        try {
          const { items, shippingAmount = 0 } = JSON.parse(body)
          if (!Array.isArray(items) || items.length === 0) {
            res.writeHead(400, {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': corsOrigin,
            })
            res.end(JSON.stringify({ error: 'No items provided for payment intent.' }))
            return
          }

          const itemsAmount = items.reduce((sum, item) => {
            const price = Number(item.price.replace(/[^0-9.]/g, ''))
            return sum + price * item.quantity * 100
          }, 0)

          const totalAmount = Math.round(itemsAmount + shippingAmount)

          const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'cad',
            automatic_payment_methods: { enabled: true },
          })

          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin,
          })
          res.end(JSON.stringify({ clientSecret: paymentIntent.client_secret }))
        } catch (err) {
          res.writeHead(500, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin,
          })
          res.end(JSON.stringify({ error: err.message }))
        }
      })
      return
    }

    if (method !== 'GET' && method !== 'HEAD') {
      res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('Method Not Allowed')
      return
    }

    const filePath = safePath(req.url || '/')

    if (filePath && existsSync(filePath) && statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase()
      const type = contentTypes[ext] || 'application/octet-stream'
      res.writeHead(200, { 'Content-Type': type })

      if (method === 'HEAD') {
        res.end()
        return
      }

      createReadStream(filePath).pipe(res)
      return
    }

    await sendIndex(res)
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Internal Server Error')
    console.error(error)
  }
})

async function startServer(port, attemptsLeft = 10) {
  // Initialize mail service
  await initializeMailService()

  server.listen(port, () => {
    const host = nodeEnv === 'production' ? '70x7.ca' : `localhost:${port}`
    console.log(`Server listening on ${nodeEnv === 'production' ? 'https' : 'http'}://${host}`)
  })

  server.once('error', (error) => {
    if (error?.code === 'EADDRINUSE' && attemptsLeft > 0) {
      const nextPort = port + 1
      console.warn(`Port ${port} is in use. Retrying on ${nextPort}...`)
      startServer(nextPort, attemptsLeft - 1)
      return
    }

    console.error(error)
    process.exit(1)
  })
}

startServer(basePort)
