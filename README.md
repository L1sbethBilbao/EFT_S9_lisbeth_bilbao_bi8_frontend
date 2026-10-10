# Kivo — Tienda de videojuegos · EFT Semana 9 (PFY2201)

Sitio web de la tienda de videojuegos **Kivo**, hecho con **HTML5, CSS3, Bootstrap 5, JavaScript y React** (con Vite y React Router).
Muestra un catálogo de juegos en tarjetas, permite filtrarlos por categoría, armar un carrito de compras, enviar un formulario de contacto y **administrar el catálogo**: agregar y eliminar videojuegos.

**Evaluación Final Transversal (EFT)** · Desarrollo Frontend I (PFY2201) · Duoc UC
**Alumna:** Lisbeth Bilbao

## Enlaces

- **Repositorio:** https://github.com/L1sbethBilbao/EFT_S9_lisbeth_bilbao_bi8_frontend
- **Sitio publicado (GitHub Pages):** https://l1sbethbilbao.github.io/EFT_S9_lisbeth_bilbao_bi8_frontend/

## Contenido

1. [Novedades de la EFT](#novedades-de-la-eft)
2. [Tecnologías](#tecnologías)
3. [Instalación](#instalación)
4. [Comandos](#comandos)
5. [Uso del sitio](#uso-del-sitio)
6. [Datos de los videojuegos](#datos-de-los-videojuegos)
7. [Estructura del proyecto](#estructura-del-proyecto)
8. [Componentes, state y props](#componentes-state-y-props)
9. [HTML semántico, Flexbox y CSS Grid](#html-semántico-flexbox-y-css-grid)
10. [Pruebas en navegadores y dispositivos](#pruebas-en-navegadores-y-dispositivos)
11. [Cumplimiento de la pauta EFT](#cumplimiento-de-la-pauta-eft)
12. [Capturas de pantalla](#capturas-de-pantalla)

## Novedades de la EFT

El proyecto parte de la tienda Kivo de la semana 8 y agrega:

| Mejora | Cómo se implementó |
|---|---|
| Agregar videojuegos al catálogo | Formulario `FormularioJuego.jsx` con campos controlados y validación; llama a `agregarJuego` del hook `useProductos` |
| Eliminar videojuegos del catálogo | Botón **Eliminar** en cada juego de la lista (`CatalogoAdmin.jsx`); si el juego estaba en el carrito, también sale de ahí |
| Restaurar el catálogo | Botón **Restaurar catálogo original**: borra los cambios y vuelve a los juegos de `productos.json` |
| Página de administración | Nueva ruta `/administrar` (`AdministrarPage.jsx`) con el formulario y la lista del catálogo |
| Cambios que no se pierden | Los juegos agregados y eliminados se guardan en `localStorage` |
| CSS Grid propio | La lista de administración se ordena en 3 columnas con `display: grid` |
| Flexbox propio | Las líneas del carrito, sus botones y el total se ordenan con `display: flex` |
| Correcciones | Texto del carrusel que tapaba los puntos de navegación y error del carrusel al salir de la portada |

## Tecnologías

| Herramienta | Uso |
|---|---|
| HTML5 | Estructura con etiquetas semánticas (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`) |
| CSS3 | Estilos propios de Kivo en `src/styles/estilos.css`, con Flexbox, CSS Grid y media queries |
| Bootstrap 5 | Navbar, tarjetas, carrusel, formularios, alertas, spinner y grilla responsiva (instalado con npm) |
| JavaScript (ES6+) | Lógica del catálogo, filtros, carrito y validaciones |
| React 19 | Interfaz con componentes, `useState`, `useEffect`, `useRef` y props |
| React Router 7 | Rutas del sitio (`HashRouter`, `Routes`, `Route`, `NavLink`) |
| Vite 8 | Servidor de desarrollo y generación del sitio final |
| ESLint | Revisa las buenas prácticas del código |
| gh-pages | Publica el sitio en GitHub Pages |

## Instalación

### Requisitos

- [Node.js](https://nodejs.org/) versión **20.19 o superior** (se recomienda la versión LTS). Incluye **npm**.
- [Git](https://git-scm.com/) para clonar el repositorio.
- Un navegador actualizado (Chrome, Edge o Firefox).

### Pasos

1. Clonar el repositorio y entrar a la carpeta:

```bash
git clone https://github.com/L1sbethBilbao/EFT_S9_lisbeth_bilbao_bi8_frontend.git
cd EFT_S9_lisbeth_bilbao_bi8_frontend
```

2. Instalar las dependencias (crea la carpeta `node_modules/`, que no se sube al repositorio):

```bash
npm install
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

4. Abrir en el navegador la dirección que muestra la terminal:
   http://localhost:5173/EFT_S9_lisbeth_bilbao_bi8_frontend/

5. Para detener el servidor, presionar `Ctrl + C` en la terminal.

> **Windows (PowerShell):** si aparece el error *"la ejecución de scripts está deshabilitada en este sistema"*, usar `npm.cmd` en lugar de `npm` (por ejemplo, `npm.cmd install` y `npm.cmd run dev`), o ejecutar una vez `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Descarga las dependencias del proyecto |
| `npm run dev` | Levanta el servidor de desarrollo con recarga automática |
| `npm run lint` | Revisa el código con ESLint |
| `npm run build` | Genera la versión final del sitio en la carpeta `dist/` |
| `npm run preview` | Muestra la versión final (`dist/`) en http://localhost:4173/EFT_S9_lisbeth_bilbao_bi8_frontend/ |
| `npm run deploy` | Ejecuta `build` y publica `dist/` en la rama `gh-pages` (GitHub Pages) |

## Uso del sitio

El menú superior tiene las secciones **Catálogo**, **Categorías**, **Administrar**, **Contacto** y el botón del **Carrito**.

### Catálogo (`/`)

- La portada muestra un **carrusel** con el banner y los 3 primeros juegos; avanza solo cada 3 segundos.
- Mientras se cargan los juegos aparece **"Cargando catálogo de juegos..."**. Si la carga falla, aparece un aviso con el botón **Reintentar**.
- Cada juego se muestra en una **tarjeta** con imagen, categoría, nombre, descripción, precio normal (tachado), precio oferta e insignia de descuento.
- **Buscar:** escribir en **Buscar juego** filtra por nombre, categoría o descripción mientras se escribe.
- **Filtrar por categoría:** con el selector **Categoría** o desde el menú **Categorías** del navbar. **Limpiar filtros** vuelve a mostrar todo.
- **Ver como lista / Ver como cuadrícula** cambia la forma de mostrar las tarjetas.

### Carrito (`/` y `/carrito`)

- **Agregar al carrito** suma el juego; el botón cambia a **✔ En el carrito (N) · Agregar otra**.
- Los botones **+** y **−** cambian la cantidad; con 1 unidad, **−** saca el juego del carrito.
- **Quitar** elimina un juego completo y **Vaciar carrito** lo deja en cero.
- Se muestran el **total** a pagar con precios de oferta y el **ahorro** obtenido.
- El carrito se guarda en el navegador: no se pierde al recargar la página.

### Administrar (`/administrar`)

- **Agregar un videojuego:** completar nombre, categoría, precio normal, precio oferta (opcional), descripción e imagen, y presionar **Agregar videojuego**.
  - La imagen se elige de una lista (con vista previa) o se pega una URL con la opción *"Pegar una URL de imagen"*.
  - Si falta un dato o es incorrecto, el campo se marca en rojo con un mensaje que explica qué corregir.
  - El juego nuevo aparece de inmediato en el catálogo y en el filtro de su categoría.
- **Eliminar un videojuego:** presionar **Eliminar** en la lista y confirmar. Si el juego estaba en el carrito, también se quita de ahí.
- **Restaurar catálogo original:** aparece cuando hubo cambios; vuelve a los 6 juegos de `productos.json`.
- Los cambios se guardan en el navegador y se mantienen al recargar.

Reglas de validación del formulario:

| Campo | Regla |
|---|---|
| Nombre | Obligatorio, entre 3 y 60 caracteres |
| Categoría | Obligatoria |
| Precio normal | Número entero en pesos, sin puntos, entre 1 y $1.000.000 |
| Precio oferta | Opcional; si se escribe, no puede ser mayor que el precio normal |
| Descripción | Entre 10 y 200 caracteres (con contador) |
| URL de imagen | Si se elige pegar una URL, debe empezar con `http://` o `https://` |

### Contacto (`/contacto`)

- Formulario con nombre, correo, asunto, opción de recibir novedades y mensaje (máximo 300 caracteres, con contador).
- Valida los datos antes de enviar y muestra el estado **Enviando...**, el mensaje de éxito o el de error.
- El envío es simulado. Para probar el mensaje de error, usar el correo `falla@kivo.cl`.

### Página no encontrada

Cualquier ruta que no existe (por ejemplo `/#/abc`) muestra **"Página no encontrada"** con un enlace para volver al catálogo.

## Datos de los videojuegos

Los juegos están en `public/data/productos.json` y el hook `useProductos` los pide con `fetch` dentro de `useEffect`, como si fueran la respuesta de la API de un backend. Al leer la respuesta con `respuesta.json()`, el texto JSON se convierte en un **arreglo de objetos de JavaScript** que se guarda en el estado con `useState`.

Cada videojuego es un objeto con esta forma:

```js
{
  id: 1,
  nombre: 'Zelda: Echoes of Time',
  categoria: 'accion',
  categoriaNombre: 'Acción y aventura',
  precio: 49990,
  precioOferta: 39990,
  descripcion: 'Aventura de mundo abierto para Nintendo Switch, con exploración, puzzles y combates en Hyrule.',
  imagen: 'img/juego-echoes.jpg',
}
```

El catálogo que ve el usuario se calcula a partir de los juegos originales y de los cambios hechos en **Administrar**:

```js
const productos = catalogoOriginal
  .filter((juego) => !cambios.eliminados.includes(juego.id))   // quita los eliminados
  .concat(cambios.agregados)                                    // suma los agregados
  .map(conRutaBase)                                             // arma la ruta de cada imagen
```

Al agregar un juego se crea un objeto nuevo con un `id` que no se repite, y el estado se actualiza con copias (estado inmutable):

```js
const agregarJuego = (juego) => {
  setCambios((prev) => {
    const ids = [...catalogoOriginal, ...prev.agregados].map((item) => item.id)
    const nuevo = { ...juego, id: Math.max(0, ...ids) + 1 /* ... */ }
    return { ...prev, agregados: [...prev.agregados, nuevo] }
  })
}
```

Datos guardados en `localStorage`:

| Clave | Contenido |
|---|---|
| `kivoCarritoEFT` | Juegos del carrito con su cantidad |
| `kivoCatalogoEFT` | Juegos agregados y ids de los juegos eliminados |

## Estructura del proyecto

```
EFT_S9_lisbeth_bilbao_bi8_frontend/
├── index.html                  # HTML base con <div id="root">
├── package.json                # Dependencias y scripts
├── package-lock.json           # Versiones exactas de las librerías
├── vite.config.js              # base: '/EFT_S9_lisbeth_bilbao_bi8_frontend/' para GitHub Pages
├── eslint.config.js            # Reglas de ESLint
├── public/
│   ├── data/productos.json     # Catálogo y categorías (se cargan con fetch)
│   └── img/                    # Imágenes de los juegos, logo, banner y favicon
├── docs/capturas/              # Capturas de este README
└── src/
    ├── main.jsx                # Punto de entrada: Bootstrap + estilos + HashRouter + <App />
    ├── App.jsx                 # Estado del carrito y de los filtros, y definición de las rutas
    ├── hooks/
    │   └── useProductos.js     # Carga el catálogo (useEffect + fetch) y permite agregar y eliminar juegos
    ├── pages/
    │   ├── InicioPage.jsx      # "/": portada, catálogo y carrito lateral
    │   ├── CarritoPage.jsx     # "/carrito": carrito a pantalla completa
    │   ├── AdministrarPage.jsx # "/administrar": agregar y eliminar videojuegos
    │   ├── ContactoPage.jsx    # "/contacto": formulario de contacto
    │   └── NoEncontradaPage.jsx # "*": página 404
    ├── components/
    │   ├── Navbar.jsx          # Menú con enlaces, categorías y contador del carrito
    │   ├── Hero.jsx            # Carrusel de destacados (useEffect + useRef + cleanup)
    │   ├── SearchBar.jsx       # Buscador y selector de categoría
    │   ├── EstadoCarga.jsx     # Spinner de carga o aviso de error con Reintentar
    │   ├── ProductList.jsx     # Grilla o lista de juegos
    │   ├── ProductCard.jsx     # Tarjeta reutilizable de un juego
    │   ├── Cart.jsx            # Carrito: vacío o con juegos
    │   ├── CartItem.jsx        # Línea del carrito con + / − / Quitar
    │   ├── CartTotal.jsx       # Total a pagar
    │   ├── FormularioJuego.jsx # Formulario para agregar un videojuego, con validación
    │   ├── CatalogoAdmin.jsx   # Lista del catálogo con Eliminar y Restaurar
    │   ├── ContactForm.jsx     # Formulario de contacto con envío simulado
    │   └── Footer.jsx          # Pie de página
    ├── utils/
    │   ├── formato.js          # formatearPrecio y calcularDescuento
    │   └── carrito.js          # contarProductos, calcularTotal y calcularAhorro
    └── styles/estilos.css      # Estilos propios de Kivo
```

## Componentes, state y props

`App` guarda el estado compartido y lo reparte a los componentes por **props**. Los componentes hijos no modifican el estado directamente: llaman a las funciones que reciben (`onAgregar`, `onEliminar`, `onQuitar`, etc.).

```
App (useState: carrito, busqueda, categoria · useProductos: productos, categorias, estado, cambios)
├── Navbar ← cantidad, categorias, categoriaActiva, onElegirCategoria
├── Routes
│   ├── "/"            InicioPage
│   │   ├── Hero         ← destacados
│   │   ├── EstadoCarga  ← estado, error, onReintentar        (mientras carga o si falla)
│   │   ├── SearchBar    ← busqueda, categoria, onCambiarBusqueda, onCambiarCategoria, onLimpiar
│   │   ├── ProductList  ← juegos filtrados, carrito, onAgregar   (useState: vista)
│   │   │   └── ProductCard (una por juego) ← juego, cantidadEnCarrito, onAgregar, vista
│   │   └── Cart         ← items, onAumentar, onDisminuir, onQuitar, onVaciar
│   │       ├── CartItem (uno por juego)
│   │       └── CartTotal
│   ├── "/carrito"     CarritoPage → Cart
│   ├── "/administrar" AdministrarPage ← productos, categorias, onAgregarJuego, onEliminarJuego, hayCambios, onRestaurar
│   │   ├── FormularioJuego ← categorias, onAgregar          (useState: datos, errores, aviso)
│   │   └── CatalogoAdmin   ← juegos, hayCambios, onEliminar, onRestaurar
│   ├── "/contacto"    ContactoPage → ContactForm             (useState propio + cleanup)
│   └── "*"            NoEncontradaPage
└── Footer
```

- **Componentes reutilizados:** `Cart` se usa en el catálogo y en `/carrito`; `ProductCard` y `CartItem` se repiten por cada juego; `EstadoCarga` se usa en el catálogo y en Administrar.
- **Generación dinámica del contenido:** las tarjetas, las líneas del carrito, la lista de administración y las opciones de categorías se crean con `map` a partir del estado. Al agregar o eliminar un juego, React vuelve a dibujar solo lo que cambió.
- Se usa `HashRouter` (las rutas se ven como `/#/contacto`) porque GitHub Pages solo sirve archivos estáticos: así, al recargar una ruta interna, no aparece un error 404 del servidor.

## HTML semántico, Flexbox y CSS Grid

**Etiquetas semánticas:** `header` (portada), `nav` (menú), `main` (contenido de cada página), `section` (catálogo, carrito, formularios), `article` (cada tarjeta de juego), `aside` (carrito lateral), `footer` (pie de página) y `fieldset`/`legend` en los formularios.

**CSS Grid propio** (`estilos.css`): la lista de **Administrar** ordena cada juego en 3 columnas. En pantallas de 400px o menos, el botón **Eliminar** baja a una segunda fila.

```css
.lista-admin .item-admin {
  display: grid;
  grid-template-columns: 64px 1fr auto;   /* miniatura | nombre y precio | botón */
  align-items: center;
  gap: 0.75rem;
}
```

**Flexbox propio** (`estilos.css`), en el carrito:

| Clase | Qué ordena |
|---|---|
| `.item-carrito` | La miniatura y la información del juego, una al lado de la otra |
| `.info-item` | `flex: 1`: la información ocupa el espacio que deja la miniatura |
| `.controles-item` | Botones − y +, cantidad y **Quitar** en una fila; `margin-left: auto` lleva **Quitar** a la derecha |
| `.total-carrito` | `justify-content: space-between`: "Total:" a la izquierda y el monto a la derecha |

**Bootstrap 5:** la grilla (`row row-cols-1 row-cols-md-2 row-cols-xl-3`) adapta el catálogo a 1, 2 o 3 columnas según el ancho de la pantalla, y se usan sus componentes navbar, card, carousel, form, alert, badge y spinner.

## Pruebas en navegadores y dispositivos

| Prueba | Resultado |
|---|---|
| `npm run lint` y `npm run build` | Sin errores |
| Microsoft Edge 154 (Windows) | Todas las funciones correctas, sin errores en la consola |
| Google Chrome 154 (Windows) | Todas las funciones correctas, sin errores en la consola |
| Celular (375 y 390 px) | Menú desplegable, catálogo en 1 columna, sin scroll horizontal |
| Tablet (768 px) | Catálogo en 2 columnas, sin scroll horizontal |
| Escritorio (1280 y 1366 px) | Catálogo en 3 columnas con el carrito al costado |
| Sitio publicado en GitHub Pages | Rutas, imágenes y datos cargan correctamente |

Funciones probadas: buscador, filtro por categoría (selector y navbar), carrito (agregar, sumar, restar, quitar y vaciar), formulario de contacto (errores, envío correcto y error simulado), agregar un juego y verlo en su categoría, eliminar un juego que estaba en el carrito, carrusel con menos de 3 juegos, restaurar el catálogo, recarga de la página y página 404.

Errores encontrados y corregidos durante las pruebas:

| Error | Corrección |
|---|---|
| El texto del carrusel tapaba los puntos de navegación | `.carousel-caption` con `bottom: 3rem` |
| Al salir de la portada justo durante un cambio de imagen del carrusel aparecía el error *"Illegal invocation"* en la consola (Chrome y Edge) | En el cleanup de `Hero.jsx` se termina la transición y se detiene el avance automático antes de `dispose()` |

## Cumplimiento de la pauta EFT

| Criterio | Dónde se cumple |
|---|---|
| 1. HTML, CSS y Bootstrap 5: etiquetas semánticas, Flexbox o CSS Grid (15 pts) | Etiquetas semánticas en todas las páginas; CSS Grid en `.item-admin` y Flexbox en el carrito (`estilos.css`); grilla y componentes de Bootstrap 5 |
| 2. Componentes de Bootstrap: navbar, tarjetas y formularios (10 pts) | `Navbar.jsx` (navbar con menú desplegable), `ProductCard.jsx` (card), `FormularioJuego.jsx` y `ContactForm.jsx` (formularios con `is-invalid`), carrusel, alertas y spinner |
| 3. Manipulación del DOM y contenido dinámico sin errores (15 pts) | Tarjetas, carrito y lista de administración generados con `map` desde el estado; agregar y eliminar juegos actualiza la página al instante; consola sin errores |
| 4. Componentes reutilizables, state y props (15 pts) | 13 componentes y 5 páginas; `useState` en `App`, `useProductos` y los formularios; datos y funciones por props (ver árbol de componentes) |
| 5. Control de versiones con commits detallados (10 pts) | Repositorio propio de la EFT con commits en español que muestran cada paso del desarrollo ([historial](https://github.com/L1sbethBilbao/EFT_S9_lisbeth_bilbao_bi8_frontend/commits/main)) |
| 6. Video explicativo (15 pts) | Video .mp4 entregado aparte: código, funcionalidades y diseño |
| 7. Compatibilidad con dispositivos y navegadores (10 pts) | Probado en Edge y Chrome, en celular, tablet y escritorio; errores encontrados y corregidos (ver sección de pruebas) |
| 8. README con instrucciones de instalación y uso (10 pts) | Este archivo: instalación, comandos, uso del sitio, datos, estructura y capturas |

## Capturas de pantalla

Capturas tomadas del sitio publicado en GitHub Pages.

### Catálogo

Mientras llegan los datos se muestra **"Cargando catálogo de juegos..."**:
![Catálogo cargando](docs/capturas/01-catalogo-cargando.png)

Catálogo cargado desde `public/data/productos.json`:
![Catálogo cargado](docs/capturas/02-catalogo-cargado.png)

Si la carga falla, aparece el error con el botón **Reintentar**:
![Error al cargar con botón Reintentar](docs/capturas/15-error-reintentar.png)

Vista en lista:
![Catálogo en vista de lista](docs/capturas/07-vista-lista.png)

Búsqueda sin resultados y filtro por la categoría **Carreras**:
![Búsqueda sin resultados](docs/capturas/08-busqueda-sin-resultados.png)

![Filtro por la categoría Carreras](docs/capturas/09-filtro-categoria.png)

### Carrito

![Carrito vacío](docs/capturas/03-carrito-vacio.png)

Al agregar juegos, el botón cambia a **En el carrito** y el contador del navbar se actualiza:
![Botón En el carrito](docs/capturas/04-boton-en-el-carrito.png)

![Carrito con productos, ahorro y total](docs/capturas/05-carrito-con-productos.png)

Después de restar una unidad de Zelda y quitar Pixel Quest Origins:
![Carrito después de restar y quitar](docs/capturas/06-carrito-restar-quitar.png)

![Ruta /carrito](docs/capturas/10-ruta-carrito.png)

### Administrar

![Página Administrar](docs/capturas/17-administrar.png)

Validación del formulario:
![Formulario con errores](docs/capturas/18-formulario-juego-errores.png)

Juego agregado:
![Juego agregado al catálogo](docs/capturas/19-juego-agregado.png)

Lista después de agregar **Galaxy Raiders** y eliminar **Neon Drift League**, con el botón **Restaurar catálogo original**:
![Lista de administración con Restaurar](docs/capturas/20-lista-admin-eliminar-restaurar.png)

El juego nuevo aparece en el catálogo, en el filtro **RPG**:
![Juego nuevo en el filtro RPG](docs/capturas/21-juego-nuevo-en-filtro-rpg.png)

### Contacto y página 404

![Contacto: validación](docs/capturas/11-contacto-validacion.png)

![Contacto: enviando](docs/capturas/12-contacto-enviando.png)

![Contacto: mensaje enviado](docs/capturas/13-contacto-exito.png)

![Página 404](docs/capturas/14-pagina-404.png)

### Vista en celular

<p>
  <img src="docs/capturas/16-movil.png" alt="Catálogo en celular" width="300">
  <img src="docs/capturas/22-administrar-movil.png" alt="Administrar en celular, con el botón Eliminar en una segunda fila" width="300">
</p>
