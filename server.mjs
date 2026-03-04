import { createReadStream, existsSync, statSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distDir = path.join(__dirname, 'dist')
const port = Number(process.env.PORT || 8080)

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

server.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on 0.0.0.0:${port}`)
})
