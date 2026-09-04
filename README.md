# Herederos de Cicumba

Sitio web de la **Proyección Folklórica Herederos de Cicumba** — grupo de danza folklórica de San Pedro Sula, zona norte, Honduras.

Colores institucionales: 🔴 rojo · 🟢 verde · 🔵 azul · 🟡 amarillo.

## Estructura

```
cicumba/
├── index.html          # Landing page pública
├── css/styles.css      # Estilos + colores del grupo
├── js/main.js          # Interacciones (menú, reveal, formulario)
├── app/                # Sistema de gestión privado
│   ├── login.html
│   ├── dashboard.html
│   ├── css/app.css
│   └── js/
│       ├── supabase.js # Config de conexión (editar credenciales)
│       └── auth.js     # Login / logout / guard de rutas
├── img/                # Fotos del grupo (placeholders por ahora)
├── .nojekyll           # Evita el procesado Jekyll en GitHub Pages
└── README.md
```

## Fases del proyecto

- **Fase 1 (hecha):** Landing page en HTML/CSS/JS, publicable en GitHub Pages.
- **Fase 2:** Tablas en Supabase (integrantes, coordinaciones, vestuario, utilería, asistencia, eventos).
- **Fase 3:** Login con Supabase Auth (esqueleto ya incluido en `app/`).
- **Fase 4:** Módulos de gestión por coordinación.

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub.
2. Ve a **Settings → Pages**.
3. En *Source*, elige la rama `main` y la carpeta `/ (root)`.
4. Guarda. El sitio quedará en `https://USUARIO.github.io/cicumba/`.

> GitHub Pages solo sirve archivos estáticos. No ejecuta código de servidor.
> El formulario de contacto usa `mailto:` como fallback (se conecta a un servicio real en fases posteriores).

## Supabase (fases 2–4)

- Supabase se carga por **CDN**, no hay que instalar nada.
- La clave `anon` es pública por diseño; la seguridad real se logra con
  **políticas RLS (Row Level Security)** en el panel de Supabase.
- Edita `app/js/supabase.js` con tu `SUPABASE_URL` y `SUPABASE_ANON_KEY`
  (Supabase → Project Settings → API).

## Pendientes de contenido (landing)

Busca los comentarios `<!-- TODO -->` en `index.html` para completar:

- Lema o frase del grupo (hero)
- Danzas / repertorio reales
- Año de fundación e historia
- Correo, teléfono y redes sociales
- Fotos reales en `img/` (reemplazan los placeholders)

## Desarrollo local

Al ser estático, basta con abrir `index.html` en el navegador.
Para servirlo con rutas limpias:

```bash
# Python
python3 -m http.server 8000
# luego abre http://localhost:8000
```
