import { useEffect, useState } from 'react'
import { Contact } from '../types/Contact.tsx'

interface ContactFormProps {
  onSubmit: (contact: Omit<Contact, 'id'>) => void
  editingContact: Contact | null
  onUpdate: (contact: Contact) => void
  onCancelEdit: () => void
}

function ContactForm({ onSubmit, editingContact, onUpdate, onCancelEdit }: ContactFormProps) {
  const [name, setName] = useState('')
  const [lastName, setlastName] = useState('') // nuevo estado
  const [phone, setPhone] = useState('')

  // Cargar datos si estamos editando
  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name)
      setlastName(editingContact.lastName)
      setPhone(editingContact.phone)
    } else {
      setName('')
      setlastName('')
      setPhone('')
    }
  }, [editingContact])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !lastName.trim() || !phone.trim()) {
      alert('Por favor complete todos los campos')
      return
    }

    if (editingContact) {
      // Actualizar contacto
      onUpdate({
        ...editingContact,
        name: name.trim(),
        lastName: lastName.trim(),
        phone: phone.trim()
      })
    } else {
      // Crear nuevo contacto
      onSubmit({
        name: name.trim(),
        lastName: lastName.trim(),
        phone: phone.trim()
      })
    }

    // Limpiar campos
    setName('')
    setlastName('')
    setPhone('')
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingrese el nombre"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Apellido:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
          placeholder="Ingrese el apellido"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Teléfono:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ingrese el teléfono"
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit">
          {editingContact ? 'Guardar cambios' : 'Agregar'}
        </button>

        {editingContact && (
          <button type="button" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default ContactForm
