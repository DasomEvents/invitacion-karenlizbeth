# Invitación digital — Karen Lizbeth · Mis 40 años

Sitio web de una sola página (scroll vertical) para la invitación de cumpleaños
de Karen Lizbeth. Hecho solo con HTML, CSS y JavaScript — sin frameworks, sin
proceso de compilación — listo para subir a GitHub Pages.

## Estructura de archivos

```
/
├── index.html          → todo el contenido y las secciones de la invitación
├── css/
│   └── styles.css      → estilos, paleta de colores, tipografías, animaciones
├── js/
│   └── script.js       → countdown, animaciones al hacer scroll, música, WhatsApp
├── audio/
│   └── README.txt      → aquí colocarás tu archivo party.mp3 (ver abajo)
├── assets/
│   └── README.txt      → carpeta libre para imágenes futuras (opcional)
└── README.md            → este archivo
```

## Cómo subirlo a GitHub

1. Crea una cuenta en [github.com](https://github.com) si aún no tienes una.
2. Crea un repositorio nuevo (botón verde "New repository"). Puedes llamarlo,
   por ejemplo, `karen-40-anos`. Déjalo en público.
3. En la página del repositorio recién creado, haz clic en
   **"uploading an existing file"** (o el botón "Add file" → "Upload files").
4. Arrastra **toda la carpeta** de este proyecto (todos los archivos y
   subcarpetas: `index.html`, `css/`, `js/`, `audio/`, `assets/`, `README.md`)
   a la zona de carga. GitHub respeta la estructura de carpetas al arrastrar.
5. Escribe un mensaje de confirmación (por ejemplo "Primera versión de la
   invitación") y haz clic en **"Commit changes"**.

## Cómo activar GitHub Pages

1. Dentro del repositorio, ve a la pestaña **Settings** (Configuración).
2. En el menú lateral izquierdo, entra a **Pages**.
3. En "Build and deployment" → "Source", selecciona **Deploy from a branch**.
4. En "Branch", selecciona `main` (o `master`, según cómo se llame tu rama) y
   la carpeta `/ (root)`. Haz clic en **Save**.
5. Espera uno o dos minutos. GitHub te mostrará una URL parecida a:
   `https://tu-usuario.github.io/karen-40-anos/`
6. Esa es la liga que puedes compartir con tus invitados. Cada vez que subas
   cambios al repositorio, la página se actualizará automáticamente.

## Dónde colocar la música (`party.mp3`)

El sitio ya está preparado para reproducir un archivo llamado exactamente
`party.mp3` desde la ruta `audio/party.mp3`. Para agregarlo:

1. Ten listo tu archivo de audio y renómbralo exactamente a `party.mp3`
   (todo en minúsculas).
2. Súbelo dentro de la carpeta `audio/` de tu repositorio en GitHub (puedes
   usar el mismo botón "Add file" → "Upload files" dentro de esa carpeta).
3. No necesitas tocar ningún código. En cuanto el archivo esté en
   `audio/party.mp3`, el botón de música (▶ / ⏸) en la esquina superior
   derecha lo reproducirá automáticamente.

Mientras `party.mp3` no exista, el resto de la invitación funciona con
total normalidad — el botón de música simplemente no reproducirá sonido
hasta que subas el archivo.

## Dónde colocar el logotipo (opcional)

Dentro de la sección de Dress Code, justo debajo del texto, hay un
recuadro punteado con la leyenda **"Tu logotipo aquí"** — ese es el
espacio ya preparado para que coloques tú misma un logotipo (por
ejemplo el de Chanel) si así lo deseas. Lo verás en cuanto abras la
página, aunque todavía no hayas subido ninguna imagen: es justamente
la señal de que el espacio está listo.

1. Prepara tu imagen del logotipo, de preferencia en formato **PNG con
   fondo transparente**, en blanco, negro o gris (la página lo muestra
   automáticamente en escala de grises para que combine con la paleta).
   Un ancho de **300–500px** es más que suficiente.
2. Renómbralo exactamente a `chanel-logo.png` (todo en minúsculas).
3. Súbelo dentro de la carpeta `assets/` de tu repositorio.
4. Listo — no necesitas tocar ningún código. En cuanto el archivo exista
   en `assets/chanel-logo.png`, el recuadro punteado desaparece solo y
   en su lugar se muestra tu logotipo.

**Nota sobre autoplay:** los navegadores modernos no permiten reproducir
audio con sonido automáticamente sin que la persona interactúe primero con
la página. Por eso, en cuanto el invitado hace clic, toca la pantalla o
hace scroll por primera vez, el sitio intenta iniciar la música
automáticamente; si el navegador aún así lo bloquea, el botón de Play
sigue disponible para iniciarla manualmente en cualquier momento. El
volumen inicial queda fijo en 50%.

## Datos que ya están configurados

- **Nombre:** Karen Lizbeth — Mis 40 años
- **Fecha y hora:** 17 de octubre de 2026, 5:00 PM (con cuenta regresiva
  en tiempo real)
- **Lugar:** Jardín La Villa
- **Dress code:** Black and White (perlas, brillos) · Color plata exclusivo
  de la cumpleañera
- **Confirmación de asistencia:** formulario con nombre → genera
  automáticamente un mensaje de WhatsApp al número 7712277589
  (`https://wa.me/527712277589`)
- **Ubicación:** botón "Ver Ubicación" que abre
  `https://maps.app.goo.gl/uTKM4n7M5GJc76nm8` en una pestaña nueva
- **Fotografías:** `assets/karen-retrato.jpg` en la sección "Un capítulo
  digno de celebrarse" (franja de texto arriba, foto completa sin recortar
  debajo), y `assets/karen-glam.jpg` en un marco plateado con detalle de
  perlas en la sección de despedida
- **Frase de Coco Chanel:** "No hago moda, soy la moda" en la sección de
  Dress Code
- **Decoración adicional:** bolso, tacón y frasco de perfume ilustrados
  (silueta propia, sin
  logotipos ni nombres de marca) y un collar de perlas decorativo,
  además de las rosas (incluida una variante oscura), el listón de satín
  de la portada y los destellos ya existentes
- **Regalos:** en la sección de confirmación se mantiene la frase "Tu
  presencia es el mejor regalo" y se añadió una línea aclarando que
  cualquier detalle también es bienvenido
- **Brillos de fondo:** una capa sutil de destellos tipo diamante cubre
  toda la página (detrás del texto, encima de los fondos de cada
  sección) y respeta automáticamente la preferencia de "reducir
  movimiento" del sistema operativo del invitado

## Elementos que puedes modificar fácilmente en el futuro

Todos se encuentran comentados y organizados por sección dentro de
`index.html`, `css/styles.css` y `js/script.js`:

- **Textos de cada sección** — están directamente en `index.html`, dentro
  de cada `<section>` (portada, presentación, fecha, dress code,
  confirmación, ubicación, cierre). Solo edita el texto entre las
  etiquetas.
- **Colores** — casi todos los colores están definidos como variables al
  inicio de `css/styles.css`, en el bloque `:root` (por ejemplo `--black`,
  `--silver-2`, `--ivory`). Cambiar un valor ahí actualiza todo el sitio.
- **Tipografías** — también como variables en `:root`
  (`--font-display`, `--font-serif`, `--font-sans`). Si quieres otra
  combinación de Google Fonts, solo cambia el `<link>` de fuentes en el
  `<head>` de `index.html` y estos nombres.
- **Fecha y hora del countdown** — en `js/script.js`, la línea
  `new Date("2026-10-17T17:00:00-06:00")`.
- **Fotografías** — reemplaza `assets/karen-retrato.jpg` o
  `assets/karen-glam.jpg` por otra imagen con el mismo nombre de archivo
  (o cambia el nombre en `index.html`/`css/styles.css` si usas uno
  distinto). Se recomienda un tamaño similar (900–1000px de ancho) para
  que el sitio siga cargando rápido.
- **Frase de la sección Dress Code** — en `index.html`, dentro de
  `<blockquote class="chanel-quote">`.
- **Número de WhatsApp y mensaje** — en `js/script.js`, dentro de
  `initRSVP()` (constante `WHATSAPP_NUMBER` y la variable `message`).
- **Liga de Google Maps** — en `index.html`, el atributo `href` del botón
  "Ver Ubicación".
- **Música** — con solo subir `audio/party.mp3` (ver sección anterior);
  el volumen inicial se ajusta en `js/script.js` (`audio.volume = 0.5`).
- **Animaciones/velocidad** — controladas por las variables `--dur-slow`
  y `--dur-med` en `css/styles.css`.

## Revisión de calidad ya realizada

- Enlaces de WhatsApp y Google Maps verificados y con el formato exacto
  solicitado.
- Audio configurado con la ruta `audio/party.mp3`, volumen inicial 50%,
  y sin errores aunque el archivo todavía no exista.
- Botón único de Play/Pause funcional, con estados accesibles
  (`aria-pressed`, `aria-label`).
- Diseño responsive probado a nivel de composición para móvil, tablet,
  laptop y escritorio (no es solo una reducción de la versión de
  escritorio).
- Animaciones sutiles (aparición progresiva, destellos, transiciones de
  scroll) que respetan `prefers-reduced-motion`.
- HTML semántico, buen contraste, navegación por teclado y `aria-label`
  en botones e íconos decorativos.
- Sin dependencias externas de compilación: solo HTML, CSS, JS y Google
  Fonts.
