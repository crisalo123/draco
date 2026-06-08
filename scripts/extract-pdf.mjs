import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createCanvas, Image } from 'canvas'

globalThis.Image = Image

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const pdfPath = path.join(root, 'referencia.pdf')
const outDir = path.join(root, 'pdf-pages')

class NodeCanvasFactory {
  create(w, h) {
    const canvas = createCanvas(w, h)
    return { canvas, context: canvas.getContext('2d') }
  }
  reset(c, w, h) {
    c.canvas.width = w
    c.canvas.height = h
  }
  destroy(c) {
    c.canvas.width = 0
    c.canvas.height = 0
  }
}

const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
const data = new Uint8Array(fs.readFileSync(pdfPath))
const doc = await pdfjs.getDocument({ data, disableFontFace: true }).promise

fs.mkdirSync(outDir, { recursive: true })

for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i)
  const viewport = page.getViewport({ scale: 2 })
  const canvasFactory = new NodeCanvasFactory()
  const canvas = canvasFactory.create(viewport.width, viewport.height)
  await page.render({
    canvasContext: canvas.context,
    viewport,
    canvasFactory,
  }).promise
  const out = path.join(outDir, `page_${i}.png`)
  fs.writeFileSync(out, canvas.canvas.toBuffer('image/png'))
  console.log('saved', out, `${viewport.width}x${viewport.height}`)
}
