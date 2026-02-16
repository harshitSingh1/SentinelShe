'use client'

import { useState } from 'react'

export function CookiePreferences() {
  const [showModal, setShowModal] = useState(false)

  const handleManageCookies = () => {
    // You can replace this with a proper modal or cookie consent panel
    alert('Cookie preferences panel would open here. You can customize your cookie settings.')
  }

  return (
    <div className="mt-8 pt-6 border-t">
      <button 
        onClick={handleManageCookies}
        className="btn-primary"
      >
        Manage Cookie Preferences
      </button>
    </div>
  )
}