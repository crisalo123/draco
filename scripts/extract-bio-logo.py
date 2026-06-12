"""Extrae el logo de bio.pdf y lo guarda en src/assets/logo.jpg."""
import fitz
from PIL import Image
import numpy as np

PDF_PATH = "src/assets/bio.pdf"
OUT_PATH = "src/assets/logo.jpg"
SCALE = 4

doc = fitz.open(PDF_PATH)
page = doc[0]
pix = page.get_pixmap(matrix=fitz.Matrix(SCALE, SCALE))
img = np.array(Image.frombytes("RGB", (pix.width, pix.height), pix.samples))
h, w = img.shape[:2]

mask = np.any(img < 250, axis=2)
if not mask.any():
    raise SystemExit("No se detectó logo en bio.pdf")

coords = np.argwhere(mask)
y0, x0 = coords.min(axis=0)
y1, x1 = coords.max(axis=0)

pad = int(min(w, h) * 0.04)
x0 = max(0, x0 - pad)
y0 = max(0, y0 - pad)
x1 = min(w - 1, x1 + pad)
y1 = min(h - 1, y1 + pad)

crop = img[y0 : y1 + 1, x0 : x1 + 1]
ch, cw = crop.shape[:2]
side = max(ch, cw)
square = np.full((side, side, 3), 255, dtype=np.uint8)
oy = (side - ch) // 2
ox = (side - cw) // 2
square[oy : oy + ch, ox : ox + cw] = crop

Image.fromarray(square).save(OUT_PATH, quality=92)
print("Guardado:", OUT_PATH, f"{side}x{side}px")
