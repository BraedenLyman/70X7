import { useState } from 'react'

const initialForm = {
  name: '',
  email: '',
  message: '',
}

function ContactPage() {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitted(true)
    setFormData(initialForm)
  }

  return (
    <section className="contact-page">
      <p className="hero-kicker">Contact 70X7</p>
      <h1>Send us a message.</h1>
      <p className="contact-intro">
        Questions about sizing, shipping, or upcoming drops? Fill this form and
        our team will get back to you.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="6"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary" type="submit">
          Send Message
        </button>
      </form>

      {isSubmitted && (
        <p className="contact-success">
          Thanks for reaching out. Your message has been sent.
        </p>
      )}
    </section>
  )
}

export default ContactPage
