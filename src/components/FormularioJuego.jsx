/* ============================================
   FormularioJuego — Agregar un videojuego al catálogo
   Props:
   - categorias: lista { id, nombre } para el selector.
   - onAgregar: función que recibe el juego nuevo
     (agregarJuego del hook useProductos).
   Estado propio con useState:
   - datos: valores de los campos (campos controlados).
   - errores: mensaje de error de cada campo.
   - aviso: resultado del último intento ('' | 'exito' | 'error').
   Valida los datos antes de agregar y marca en rojo
   los campos con error (clases is-invalid de Bootstrap).
   ============================================ */

import { useState } from 'react'
import { formatearPrecio } from '../utils/formato.js'

// Imágenes de public/img que se pueden elegir para un juego nuevo.
const IMAGENES_DISPONIBLES = [
  { ruta: 'img/juego-echoes.jpg', nombre: 'Aventura (Echoes)' },
  { ruta: 'img/juego-templo.jpg', nombre: 'Templo' },
  { ruta: 'img/juego-cyber.jpg', nombre: 'Carreras futuristas (Cyber)' },
  { ruta: 'img/juego-neon.jpg', nombre: 'Carreras arcade (Neon)' },
  { ruta: 'img/juego-pixelquest.jpg', nombre: 'Pixel art (Pixel Quest)' },
  { ruta: 'img/juego-legends.jpg', nombre: 'Fantasía (Legends)' },
]

// Valor del selector de imagen que activa el campo para pegar una URL.
const OPCION_URL = 'url'

// Imagen que se muestra si la elegida no carga.
const IMAGEN_POR_DEFECTO = `${import.meta.env.BASE_URL}img/logo.png`

const LARGO_MAXIMO_NOMBRE = 60
const LARGO_MINIMO_DESCRIPCION = 10
const LARGO_MAXIMO_DESCRIPCION = 200
const PRECIO_MAXIMO = 1000000

const DATOS_INICIALES = {
  nombre: '',
  categoria: '',
  precio: '',
  precioOferta: '',
  descripcion: '',
  imagen: IMAGENES_DISPONIBLES[0].ruta,
  urlImagen: '',
}

/** true si el texto es un número entero mayor que 0 y no supera el precio máximo. */
const esPrecioValido = (texto) => /^\d+$/.test(texto) && Number(texto) > 0 && Number(texto) <= PRECIO_MAXIMO

/**
 * Revisa cada campo y devuelve un objeto con los errores encontrados.
 * Si el objeto queda vacío, los datos son válidos.
 */
function validarJuego(datos) {
  const errores = {}
  const nombre = datos.nombre.trim()
  const descripcion = datos.descripcion.trim()

  if (!nombre) {
    errores.nombre = 'Escribe el nombre del videojuego.'
  } else if (nombre.length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres.'
  }

  if (!datos.categoria) {
    errores.categoria = 'Elige una categoría.'
  }

  if (!esPrecioValido(datos.precio)) {
    errores.precio = `Ingresa un precio en pesos, sin puntos, entre 1 y ${formatearPrecio(PRECIO_MAXIMO)}.`
  }

  // El precio oferta es opcional: si queda vacío, el juego se vende al precio normal.
  if (datos.precioOferta !== '') {
    if (!esPrecioValido(datos.precioOferta)) {
      errores.precioOferta = 'Ingresa un precio oferta en pesos, sin puntos, o déjalo vacío.'
    } else if (!errores.precio && Number(datos.precioOferta) > Number(datos.precio)) {
      errores.precioOferta = 'El precio oferta no puede ser mayor que el precio normal.'
    }
  }

  if (descripcion.length < LARGO_MINIMO_DESCRIPCION) {
    errores.descripcion = `La descripción debe tener al menos ${LARGO_MINIMO_DESCRIPCION} caracteres.`
  }

  if (datos.imagen === OPCION_URL && !/^https?:\/\/\S+$/.test(datos.urlImagen.trim())) {
    errores.urlImagen = 'Pega una URL que empiece con http:// o https://.'
  }

  return errores
}

export default function FormularioJuego({ categorias, onAgregar }) {
  const [datos, setDatos] = useState(DATOS_INICIALES)
  const [errores, setErrores] = useState({})
  const [aviso, setAviso] = useState('')
  const [nombreAgregado, setNombreAgregado] = useState('')

  const usaUrl = datos.imagen === OPCION_URL
  const rutaVistaPrevia = usaUrl ? datos.urlImagen.trim() : `${import.meta.env.BASE_URL}${datos.imagen}`

  /**
   * onChange compartido por todos los campos:
   * usa el atributo name para saber qué dato actualizar
   * y borra el error de ese campo mientras se corrige.
   */
  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setDatos((prev) => ({ ...prev, [name]: value }))
    setErrores((prev) => ({ ...prev, [name]: '' }))
  }

  /** onSubmit: valida; si todo está bien, envía el juego a onAgregar y limpia el formulario. */
  const manejarEnvio = (evento) => {
    evento.preventDefault()

    const erroresEncontrados = validarJuego(datos)
    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados)
      setAviso('error')
      return
    }

    const nombre = datos.nombre.trim()
    onAgregar({
      nombre,
      categoria: datos.categoria,
      precio: Number(datos.precio),
      precioOferta: datos.precioOferta === '' ? Number(datos.precio) : Number(datos.precioOferta),
      descripcion: datos.descripcion.trim(),
      imagen: usaUrl ? datos.urlImagen.trim() : datos.imagen,
    })

    setNombreAgregado(nombre)
    setAviso('exito')
    setErrores({})
    setDatos(DATOS_INICIALES)
  }

  /** Clases de Bootstrap de un campo: agrega is-invalid si tiene error. */
  const claseCampo = (campo, base = 'form-control') => `${base}${errores[campo] ? ' is-invalid' : ''}`

  return (
    <form className="contact-form" onSubmit={manejarEnvio} noValidate>
      <fieldset className="p-3">
        <legend className="float-none w-auto px-2">Nuevo videojuego</legend>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="juego-nombre">Nombre:</label>
            <input
              className={claseCampo('nombre')}
              id="juego-nombre"
              name="nombre"
              type="text"
              maxLength={LARGO_MAXIMO_NOMBRE}
              placeholder="Ejemplo: Galaxy Raiders"
              value={datos.nombre}
              onChange={manejarCambio}
              aria-describedby="error-nombre"
            />
            <div id="error-nombre" className="invalid-feedback">{errores.nombre}</div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="juego-categoria">Categoría:</label>
            <select
              className={claseCampo('categoria', 'form-select')}
              id="juego-categoria"
              name="categoria"
              value={datos.categoria}
              onChange={manejarCambio}
              aria-describedby="error-categoria"
            >
              <option value="">Elige una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
            <div id="error-categoria" className="invalid-feedback">{errores.categoria}</div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="juego-precio">Precio normal (CLP):</label>
            <input
              className={claseCampo('precio')}
              id="juego-precio"
              name="precio"
              type="text"
              inputMode="numeric"
              placeholder="Ejemplo: 29990"
              value={datos.precio}
              onChange={manejarCambio}
              aria-describedby="error-precio"
            />
            <div id="error-precio" className="invalid-feedback">{errores.precio}</div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label" htmlFor="juego-precio-oferta">Precio oferta (CLP, opcional):</label>
            <input
              className={claseCampo('precioOferta')}
              id="juego-precio-oferta"
              name="precioOferta"
              type="text"
              inputMode="numeric"
              placeholder="Ejemplo: 24990"
              value={datos.precioOferta}
              onChange={manejarCambio}
              aria-describedby="error-precio-oferta"
            />
            <div id="error-precio-oferta" className="invalid-feedback">{errores.precioOferta}</div>
          </div>

          <div className="col-12">
            <label className="form-label" htmlFor="juego-descripcion">Descripción:</label>
            <textarea
              className={claseCampo('descripcion')}
              id="juego-descripcion"
              name="descripcion"
              rows="3"
              maxLength={LARGO_MAXIMO_DESCRIPCION}
              value={datos.descripcion}
              onChange={manejarCambio}
              aria-describedby="error-descripcion"
            ></textarea>
            <div id="error-descripcion" className="invalid-feedback">{errores.descripcion}</div>
            <p className="form-text text-end mb-0">{datos.descripcion.length}/{LARGO_MAXIMO_DESCRIPCION} caracteres</p>
          </div>

          <div className="col-12 col-md-8">
            <label className="form-label" htmlFor="juego-imagen">Imagen:</label>
            <select className="form-select" id="juego-imagen" name="imagen" value={datos.imagen} onChange={manejarCambio}>
              {IMAGENES_DISPONIBLES.map((img) => (
                <option key={img.ruta} value={img.ruta}>{img.nombre}</option>
              ))}
              <option value={OPCION_URL}>Pegar una URL de imagen</option>
            </select>

            {/* Renderizado condicional: el campo de URL solo aparece si se elige esa opción */}
            {usaUrl && (
              <div className="mt-2">
                <label className="form-label visually-hidden" htmlFor="juego-url-imagen">URL de la imagen</label>
                <input
                  className={claseCampo('urlImagen')}
                  id="juego-url-imagen"
                  name="urlImagen"
                  type="url"
                  placeholder="https://..."
                  value={datos.urlImagen}
                  onChange={manejarCambio}
                  aria-describedby="error-url-imagen"
                />
                <div id="error-url-imagen" className="invalid-feedback">{errores.urlImagen}</div>
              </div>
            )}
          </div>

          <div className="col-12 col-md-4">
            <p className="form-label mb-2">Vista previa:</p>
            {/* onError: si la imagen no carga, se muestra el logo de Kivo */}
            <img
              key={rutaVistaPrevia}
              className="vista-previa-juego rounded border"
              src={rutaVistaPrevia || IMAGEN_POR_DEFECTO}
              alt="Vista previa de la imagen del juego"
              onError={(evento) => { evento.currentTarget.src = IMAGEN_POR_DEFECTO }}
            />
          </div>

          <div className="col-12">
            <button className="btn btn-kivo" type="submit">Agregar videojuego</button>
          </div>
        </div>
      </fieldset>

      {/* Renderizado condicional: el aviso solo existe después de intentar agregar */}
      {aviso === 'exito' && (
        <p className="aviso-dinamico aviso-exito mt-3 mb-0" role="status" aria-live="polite">
          ✔ "{nombreAgregado}" se agregó al catálogo.
        </p>
      )}
      {aviso === 'error' && (
        <p className="aviso-dinamico aviso-error mt-3 mb-0" role="alert">
          Revisa los campos marcados en rojo antes de agregar el juego.
        </p>
      )}
    </form>
  )
}
