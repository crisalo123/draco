/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_PHONE?: string
  /** URL completa del perfil de Instagram (opcional). Si no está, el pie no muestra el enlace. */
  readonly VITE_INSTAGRAM_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
