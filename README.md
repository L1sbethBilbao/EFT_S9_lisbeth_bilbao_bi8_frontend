# Kivo — Semana 8 (PFY2201) · React + Vite

Tienda de videojuegos **Kivo** hecha con **React**, **Vite** y **npm**.
Continúa el eCommerce de la semana 7 y ahora aplica **`useState`** para el catálogo, el carrito y elementos interactivos, **`useEffect`** para cargar los productos desde una fuente externa (con cleanup), **renderizado condicional** y **React Router** para separar las vistas.

**Actividad sumativa 3:** Mejorando funcionalidades clave en el eCommerce con React.
**Alumna:** Lisbeth Bilbao · Desarrollo Frontend I (PFY2201) · Duoc UC

## Enlaces

- **Repositorio:** https://github.com/L1sbethBilbao/Bi_Exp3_S8_Lisbeth_Bilbao
- **Sitio publicado (GitHub Pages, rama `gh-pages`):** https://l1sbethbilbao.github.io/Bi_Exp3_S8_Lisbeth_Bilbao/

## Novedades de la semana 8

| Mejora | Cómo se implementó |
|---|---|
| Catálogo cargado dinámicamente | Los juegos están en `public/data/productos.json` y se piden con `fetch` dentro de `useEffect` (hook `useProductos`), igual que una API de un backend |
| Cleanup del efecto | `AbortController` cancela la petición si el componente se desmonta o si se reintenta la carga |
| Estados de carga | `'cargando'` (spinner), `'exito'` (catálogo) y `'error'` (alerta con botón **Reintentar**) |
| Botón que cambia según el estado | **Agregar al carrito** pasa a **✔ En el carrito (N) · Agregar otra**, con otro color |
| Elemento interactivo | Botón **Ver como lista / Ver como cuadrícula** que cambia de texto y de vista |
| Vistas separadas | React Router con las rutas **Catálogo** (`/`), **Carrito** (`/carrito`), **Contacto** (`/contacto`) y página **404** |
| Cleanup al cambiar de ruta | Si se sale de Contacto mientras se envía el mensaje, el envío se cancela |

## Funcionalidades

- **Listado de productos:** imagen, nombre, categoría, descripción corta, **precio normal** (tachado), **precio oferta** e insignia con el % de descuento.
- **Carrito de compras:**
  - Agregar juegos desde cada tarjeta. Si el juego ya está, suma una unidad y el botón muestra **En el carrito**.
  - Botones **+** y **−** para cambiar la cantidad. Con 1 unidad, **−** lo saca del carrito.
  - Botón **Quitar** para eliminar un juego completo y **Vaciar carrito** para dejarlo en cero.
  - **Contador** del total de productos en el navbar y en el carrito.
  - **Total** a pagar con los precios de oferta y el **ahorro** obtenido.
  - Mensaje **"Tu carrito está vacío"** cuando no hay juegos.
  - El carrito se guarda en `localStorage` con `useEffect`, así no se pierde al recargar.
- **Buscador y filtro por categoría:** filtran el catálogo mientras se escribe (`onChange`), también desde el menú **Categorías** del navbar.
- **Formulario de contacto:** campos controlados, validación y envío simulado (estados enviando, éxito y error).
- **Diseño responsivo** con Bootstrap 5 instalado por npm y los estilos propios de Kivo.

## Tecnologías

| Herramienta | Uso |
|---|---|
| React 19 | Librería para construir la interfaz con componentes y hooks |
| React Router 7 | Rutas del sitio (`HashRouter`, `Routes`, `Route`, `NavLink`) |
| Vite 8 | Servidor de desarrollo (`npm run dev`) y bundler (`npm run build`) |
| npm | Gestor de paquetes (`package.json` y `package-lock.json`) |
| Bootstrap 5 | Grilla, navbar, carrusel, spinner y formularios (instalado con npm, no por CDN) |
| ESLint | Revisa buenas prácticas del código (`npm run lint`) |
| gh-pages | Publica la carpeta `dist/` en la rama `gh-pages` (`npm run deploy`) |

## Cómo ejecutar el proyecto

Requisito: [Node.js](https://nodejs.org/) LTS instalado.

```bash
git clone https://github.com/L1sbethBilbao/Bi_Exp3_S8_Lisbeth_Bilbao.git
cd Bi_Exp3_S8_Lisbeth_Bilbao
npm install
npm run dev
```

Abrir http://localhost:5173/Bi_Exp3_S8_Lisbeth_Bilbao/

| Comando | Qué hace |
|---|---|
| `npm install` | Descarga las dependencias en `node_modules/` (esa carpeta no se sube al repositorio) |
| `npm run dev` | Levanta el servidor de desarrollo con recarga automática (HMR) |
| `npm run lint` | Revisa el código con ESLint |
| `npm run build` | Genera la versión de producción en `dist/` (transpila, empaqueta y minifica) |
| `npm run preview` | Muestra el sitio tal como quedará en producción, desde `dist/` |
| `npm run deploy` | Ejecuta `build` y publica `dist/` en la rama `gh-pages` |

## Estructura del proyecto

```
Bi_Exp3_S8_Lisbeth_Bilbao/
├── index.html                # HTML base con <div id="root">
├── package.json              # Dependencias y scripts
├── package-lock.json         # Versiones exactas de las librerías
├── vite.config.js            # base: '/Bi_Exp3_S8_Lisbeth_Bilbao/' para GitHub Pages
├── eslint.config.js          # Reglas de ESLint
├── public/
│   ├── data/productos.json   # Catálogo y categorías (fuente externa que se carga con fetch)
│   └── img/                  # Imágenes de los juegos, logo, banner y favicon
├── docs/capturas/            # Capturas de este README
└── src/
    ├── main.jsx              # Punto de entrada: Bootstrap + estilos + HashRouter + <App />
    ├── App.jsx               # Estado del carrito y filtros, y definición de rutas
    ├── hooks/
    │   └── useProductos.js   # useState + useEffect: carga el catálogo con fetch y AbortController
    ├── pages/
    │   ├── InicioPage.jsx    # Ruta "/": portada, catálogo y carrito lateral
    │   ├── CarritoPage.jsx   # Ruta "/carrito": carrito a pantalla completa
    │   ├── ContactoPage.jsx  # Ruta "/contacto": formulario de contacto
    │   └── NoEncontradaPage.jsx # Ruta "*": página 404
    ├── components/
    │   ├── Navbar.jsx        # NavLink a cada ruta, categorías y contador del carrito
    │   ├── Hero.jsx          # Carrusel de destacados (useEffect + useRef + cleanup)
    │   ├── SearchBar.jsx     # Buscador y selector de categoría (onChange)
    │   ├── EstadoCarga.jsx   # Spinner de carga o alerta de error con Reintentar
    │   ├── ProductList.jsx   # Grilla o lista de juegos (estado "vista")
    │   ├── ProductCard.jsx   # Tarjeta reutilizable con botón Agregar / En el carrito
    │   ├── Cart.jsx          # Carrito: vacío o con juegos
    │   ├── CartItem.jsx      # Línea del carrito con + / − / Quitar
    │   ├── CartTotal.jsx     # Total a pagar
    │   ├── ContactForm.jsx   # Formulario controlado con envío simulado y cleanup
    │   └── Footer.jsx        # Pie de página
    ├── utils/
    │   ├── formato.js        # formatearPrecio y calcularDescuento
    │   └── carrito.js        # contarProductos, calcularTotal y calcularAhorro
    └── styles/estilos.css    # Estilos propios de Kivo
```

### Rutas y componentes

`App` guarda el estado compartido y lo reparte por **props**. Los hijos no modifican el estado directamente: llaman a las funciones que reciben (`onAgregar`, `onQuitar`, etc.).

```
App (useState: carrito, busqueda, categoria · useProductos: productos, categorias, estado)
├── Navbar ← cantidad, categorias, categoriaActiva, onElegirCategoria
├── Routes
│   ├── "/"         InicioPage
│   │   ├── Hero         ← destacados
│   │   ├── EstadoCarga  ← estado, error, onReintentar   (mientras carga o si falla)
│   │   ├── SearchBar    ← busqueda, categoria, onCambiarBusqueda, onCambiarCategoria, onLimpiar
│   │   ├── ProductList  ← juegos filtrados, carrito, onAgregar   (useState: vista)
│   │   │   └── ProductCard (una por juego) ← juego, cantidadEnCarrito, onAgregar, vista
│   │   └── Cart         ← items, onAumentar, onDisminuir, onQuitar, onVaciar
│   │       ├── CartItem (uno por juego)
│   │       └── CartTotal
│   ├── "/carrito"  CarritoPage → Cart
│   ├── "/contacto" ContactoPage → ContactForm (useState propio + cleanup)
│   └── "*"         NoEncontradaPage
└── Footer
```

Se usa `HashRouter` (las rutas se ven como `/#/contacto`) porque GitHub Pages solo sirve archivos estáticos: así, al recargar una ruta interna, no aparece un error 404 del servidor.

## Carga del catálogo con useEffect

```js
useEffect(() => {
  const controller = new AbortController()

  async function cargarCatalogo() {
    try {
      await esperar(DEMORA_SIMULADA_MS, controller.signal)   // simula la demora del servidor
      const respuesta = await fetch(URL_CATALOGO, { signal: controller.signal })
      if (!respuesta.ok) throw new Error(`El servidor respondió con el código ${respuesta.status}.`)
      const datos = await respuesta.json()
      setProductos(datos.productos.map(conRutaBase))
      setCategorias(datos.categorias)
      setEstado('exito')
    } catch (errorCarga) {
      if (errorCarga.name === 'AbortError') return            // cancelado por el cleanup
      setError(errorCarga.message)
      setEstado('error')
    }
  }

  cargarCatalogo()
  return () => controller.abort()                             // cleanup
}, [intento])                                                  // al montar y al pulsar Reintentar
```

- El efecto **nunca** se ejecuta en cada render: tiene arreglo de dependencias.
- Se ejecuta **al montar** el componente y cuando cambia `intento` (botón **Reintentar**).
- El **cleanup** cancela la petición con `AbortController` si el componente se desmonta o antes de repetir el efecto.
- En la consola del navegador se ven los mensajes `[useProductos] Efecto...`, `Cleanup: AbortController.abort()` y `OK: 6 juegos cargados`.

## Cumplimiento de la pauta de evaluación

| Criterio | Dónde se cumple |
|---|---|
| 1. `useState` para catálogo, carrito y elementos interactivos (25 pts) | Catálogo: `productos`, `categorias` y `estado` en `hooks/useProductos.js`. Carrito: `carrito` en `App.jsx` (agregar, restar, quitar, vaciar). Interactivos: `vista` en `ProductList.jsx` (botón lista/cuadrícula), `busqueda` y `categoria` en `App.jsx`, formulario en `ContactForm.jsx` |
| 2. `useEffect` para cargar datos dinámicamente (20 pts) | `hooks/useProductos.js`: `fetch` a `data/productos.json`, actualiza el estado, dependencias `[intento]` y cleanup con `AbortController`. También: guardado del carrito en `localStorage`, scroll al cambiar de ruta, carrusel con cleanup y cancelación del envío del formulario |
| 3. Renderizado condicional (20 pts) | Cargando / error / catálogo (`EstadoCarga.jsx`); botón **Agregar al carrito** → **En el carrito** (`ProductCard.jsx`); carrito vacío (`Cart.jsx`); vista lista o cuadrícula; búsqueda sin resultados; botón **Limpiar filtros**; "producto/productos"; insignia de descuento; ahorro; mensajes del formulario; página 404 |
| 4. Buenas prácticas (15 pts) | Proyecto Vite con archivos `.jsx`, carpetas `components`, `pages`, `hooks`, `utils`, `styles` y `public/data`; componentes reutilizados (`Cart` en dos rutas, `ProductCard`, `CartItem`); comentarios en cada archivo y función; `npm run lint` sin errores |
| 5. GitHub + gh-pages (20 pts) | Repositorio público, `base` de Vite configurada, script `deploy` con gh-pages y sitio publicado en la rama `gh-pages` |

## Capturas de pantalla

### Carga dinámica del catálogo (useEffect)
Mientras llega el JSON se muestra el spinner **"Cargando catálogo de juegos..."**:
![Catálogo cargando](docs/capturas/01-catalogo-cargando.png)

Catálogo cargado desde `public/data/productos.json`:
![Catálogo cargado](docs/capturas/02-catalogo-cargado.png)

Si la petición falla, aparece el error con el botón **Reintentar**:
![Error al cargar con botón Reintentar](docs/capturas/15-error-reintentar.png)

### Carrito de compras
![Carrito vacío](docs/capturas/03-carrito-vacio.png)

Al agregar juegos, el botón cambia a **En el carrito** y el contador del navbar se actualiza:
![Botón En el carrito](docs/capturas/04-boton-en-el-carrito.png)

![Carrito con productos, ahorro y total](docs/capturas/05-carrito-con-productos.png)

Restar una unidad (Zelda pasa de 2 a 1) y quitar un juego (Pixel Quest Origins):
![Carrito después de restar y quitar](docs/capturas/06-carrito-restar-quitar.png)

### Elemento interactivo: vista en lista
![Catálogo en vista de lista](docs/capturas/07-vista-lista.png)

### Buscador y filtros
![Búsqueda sin resultados](docs/capturas/08-busqueda-sin-resultados.png)

![Filtro por la categoría Carreras](docs/capturas/09-filtro-categoria.png)

### Rutas con React Router
![Ruta /carrito](docs/capturas/10-ruta-carrito.png)

![Ruta /contacto: validación](docs/capturas/11-contacto-validacion.png)

![Ruta /contacto: enviando](docs/capturas/12-contacto-enviando.png)

![Ruta /contacto: mensaje enviado](docs/capturas/13-contacto-exito.png)

![Página 404](docs/capturas/14-pagina-404.png)

Para probar el error del envío simulado, usa el correo `falla@kivo.cl`.

### Vista en celular
![Vista móvil](docs/capturas/16-movil.png)

## Contenidos de la semana 8 aplicados

- **Estado con `useState`:** distintos tipos de datos (arreglos, objetos, textos, booleanos), inicialización diferida (`useState(leerCarritoGuardado)`), actualización con el estado anterior (`prev`) y estado inmutable (copias con `...` y `map`/`filter`).
- **Componentes controlados:** buscador, selector y formulario con `value` + `onChange`.
- **Efectos con `useEffect`:** el render queda puro y los efectos (fetch, temporizadores, `localStorage`, carrusel) van dentro de `useEffect`.
- **Montar, actualizar y desmontar:** el catálogo se carga al montar; al cambiar de ruta se desmontan componentes y se ejecutan sus cleanups.
- **Cleanup:** `AbortController` para `fetch`, `clearTimeout` en la espera simulada y `dispose()` del carrusel.
- **Bootstrap en React:** CSS de Bootstrap importado en `main.jsx` y clases usadas en JSX.
- **React Router:** desafío propuesto en la retroalimentación de la semana 7 (separar catálogo y contacto).
