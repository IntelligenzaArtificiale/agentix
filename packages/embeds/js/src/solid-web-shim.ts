// Shim per solid-js/web: re-export del runtime originale più export addizionale setStyleProperty.
// Importiamo direttamente il file dist per evitare che l'alias di esbuild rientri qui creando loop.
export * from 'solid-js/web/dist/web.js';

export function setStyleProperty(el: HTMLElement | null | undefined, name: string, value: string | null) {
  if (!el) return;
  try {
    if (value == null) el.style.removeProperty(name); else el.style.setProperty(name, value);
  } catch {}
}
