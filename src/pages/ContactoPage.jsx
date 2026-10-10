/* ============================================
   ContactoPage — Ruta "/contacto"
   Vista separada del catálogo con React Router.
   Al salir de esta ruta, ContactForm se desmonta
   y su cleanup cancela un envío en curso.
   ============================================ */

import ContactForm from '../components/ContactForm.jsx'

export default function ContactoPage() {
  return (
    <main className="container py-4 flex-grow-1">
      <ContactForm />
    </main>
  )
}
