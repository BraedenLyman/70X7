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
    <div className="contact-layout">
      <header className="ab-hero">
        <div className="ab-hero__left">
          <p className="ab-kicker">Contact Us</p>
          <h1 className="ab-hero__title">Get in Touch</h1>
        </div>
        <p className="ab-hero__lead" />
        <div className="ab-hero__rule" aria-hidden="true" />
      </header>

      <div className="contact-form-panel">
        {isSubmitted ? (
          <div className="cp-success">
            <span className="cp-success__icon" aria-hidden="true">
              ✓
            </span>
            <h2 className="cp-success__heading">Message Sent</h2>
            <p className="cp-success__text">Thanks for reaching out. We'll be in touch shortly.</p>
          </div>
        ) : (
          <form className="contact-form-grid" onSubmit={handleSubmit}>
            <div className="cp-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="cp-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="cp-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-primary contact-submit" type="submit">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ContactPage
