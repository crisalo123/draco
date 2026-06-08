import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const pdfDir = path.join(root, 'pdf-pages')
const outDir = path.join(root, 'src', 'assets')

async function crop(src, dest, region) {
  await sharp(path.join(pdfDir, src))
    .extract(region)
    .jpeg({ quality: 92 })
    .toFile(path.join(outDir, dest))
  console.log('saved', dest, region)
}

function regionFromRatios(pw, ph, { left, top, width, height }) {
  return {
    left: Math.round(pw * left),
    top: Math.round(ph * top),
    width: Math.round(pw * width),
    height: Math.round(ph * height),
  }
}

async function meta(file) {
  const m = await sharp(path.join(pdfDir, file)).metadata()
  return m
}

const page1 = await meta('page-1.png')
const w = page1.width ?? 1700
const h = page1.height ?? 1146

// Logo: recorte cuadrado centrado en el círculo DRACO
const logoSize = Math.round(w * 0.42)
await crop('page-1.png', 'logo.jpg', {
  left: Math.round((w - logoSize) / 2),
  top: Math.round(h * 0.04),
  width: logoSize,
  height: logoSize,
})

await sharp(path.join(pdfDir, 'page-2.png'))
  .jpeg({ quality: 90 })
  .toFile(path.join(outDir, 'hero.jpg'))
console.log('saved hero.jpg')

/** Recortes por página — tarros sin texto de viñetas */
const productRegions = {
  'page-2.png': { left: 0.6, top: 0.6, width: 0.38, height: 0.38 },
  'page-3.png': { left: 0.6, top: 0.6, width: 0.38, height: 0.38 },
  'page-4.png': { left: 0.6, top: 0.6, width: 0.38, height: 0.38 },
  'page-5.png': { left: 0.54, top: 0.5, width: 0.42, height: 0.46 },
  'page-6.png': { left: 0.4, top: 0.4, width: 0.56, height: 0.52 },
  'page-7.png': { left: 0.18, top: 0.22, width: 0.72, height: 0.72 },
}

const productCrops = [
  { page: 'page-2.png', dest: 'img_reishi.jpg' },
  { page: 'page-3.png', dest: 'img_lion_mane.jpg' },
  { page: 'page-4.png', dest: 'img_maitake.jpg' },
  { page: 'page-5.png', dest: 'img_turkey_tail.jpg' },
  { page: 'page-6.png', dest: 'img_cordyceps.jpg' },
  { page: 'page-7.png', dest: 'img_shiitake.jpg' },
]

for (const { page, dest } of productCrops) {
  const m = await meta(page)
  const pw = m.width ?? w
  const ph = m.height ?? h
  const ratios = productRegions[page]
  await crop(page, dest, regionFromRatios(pw, ph, ratios))
}
