import React, { useState } from 'react'
import './LoginModal.css'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        window.open('/admin', '_blank')
        onClose()
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>Login to Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
