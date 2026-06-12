"""Extrae el logo de bio.pdf y lo guarda optimizado para fondo oscuro."""
import fitz
from PIL import Image
import numpy as np

PDF_PATH = "src/assets/bio.pdf"
OUT_PATH = "src/assets/logo.png"
SCALE = 4

# Paleta del sitio (fondo #0f1f16)
PARCHMENT = np.array([236, 247, 237], dtype=np.float32)
GOLD = np.array([143, 212, 168], dtype=np.float32)
COPPER = np.array([90, 171, 122], dtype=np.float32)
SOFT_BLUE = np.array([186, 210, 228], dtype=np.float32)
WARM_GOLD = np.array([212, 184, 128], dtype=np.float32)


def _blend(base: np.ndarray, target: np.ndarray, amount: float) -> np.ndarray:
    return np.clip(base * (1 - amount) + target * amount, 0, 255).astype(np.uint8)


def optimize_for_dark_bg(rgba: np.ndarray) -> np.ndarray:
    out = rgba.copy()
    rgb = out[..., :3].astype(np.float32)
    a = out[..., 3]
    visible = a > 16

    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    lum = 0.299 * r + 0.587 * g + 0.114 * b

    # Verdes (tagline + icono): subir contraste hacia oro/pergamino del sitio
    green = visible & (g > r + 8) & (g > b - 10) & (g > 60)
    dark_green = green & (lum < 145)
    mid_green = green & (lum >= 145)

    for mask, target, amount in (
        (dark_green, PARCHMENT, 0.82),
        (mid_green, GOLD, 0.72),
    ):
        idx = np.where(mask)
        for c, t in enumerate(target):
            rgb[idx[0], idx[1], c] = _blend(rgb[idx[0], idx[1], c], np.array(t), amount)

    # Azul marino (BI): aclarar sin perder identidad
    blue = visible & (b > r + 18) & (b > g) & ~green
    idx = np.where(blue)
    if idx[0].size:
        for c, t in enumerate(SOFT_BLUE):
            rgb[idx[0], idx[1], c] = _blend(rgb[idx[0], idx[1], c], np.array(t), 0.55)

    # Bronce / SETAS: calidez dorada
    warm = (
        visible
        & ~green
        & ~blue
        & (r > 95)
        & (r >= g)
        & (g > b * 0.75)
        & (r - b > 25)
    )
    idx = np.where(warm)
    if idx[0].size:
        for c, t in enumerate(WARM_GOLD):
            rgb[idx[0], idx[1], c] = _blend(rgb[idx[0], idx[1], c], np.array(t), 0.48)

    out[..., :3] = rgb.astype(np.uint8)
    return out


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

pad_x = max(4, int((x1 - x0) * 0.06))
pad_y = max(4, int((y1 - y0) * 0.08))
x0 = max(0, x0 - pad_x)
y0 = max(0, y0 - pad_y)
x1 = min(w - 1, x1 + pad_x)
y1 = min(h - 1, y1 + pad_y)

crop = img[y0 : y1 + 1, x0 : x1 + 1]
white = np.all(crop >= 248, axis=2)
rgba = np.dstack([crop, np.where(white, 0, 255).astype(np.uint8)])
rgba = optimize_for_dark_bg(rgba)

Image.fromarray(rgba, mode="RGBA").save(OUT_PATH)
print("Guardado:", OUT_PATH, f"{crop.shape[1]}x{crop.shape[0]}px")
