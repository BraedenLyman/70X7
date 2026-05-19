import { createReadStream, existsSync, statSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Stripe from 'stripe'
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.join(__dirname, 'dist')
const basePort = Number(process.env.PORT || 8787)
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null

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

    if (method === 'OPTIONS' && req.url === '/api/create-payment-intent') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      })
      res.end()
      return
    }

    if (method === 'POST' && req.url === '/api/create-payment-intent') {
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
          const { items } = JSON.parse(body)
          if (!Array.isArray(items) || items.length === 0) {
            res.writeHead(400, {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            })
            res.end(JSON.stringify({ error: 'No items provided for payment intent.' }))
            return
          }

          const amount = items.reduce((sum, item) => {
            const price = Number(item.price.replace(/[^0-9.]/g, ''))
            return sum + price * item.quantity * 100
          }, 0)

          const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount),
            currency: 'cad',
            automatic_payment_methods: { enabled: true },
          })

          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          })
          res.end(JSON.stringify({ clientSecret: paymentIntent.client_secret }))
        } catch (err) {
          res.writeHead(500, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
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

function startServer(port, attemptsLeft = 10) {
  server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
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
