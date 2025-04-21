import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://pttzgpnxyvokatvphezm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0dHpncG54eXZva2F0dnBoZXptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNjI3NDksImV4cCI6MjA2MDgzODc0OX0.7NXGSV_D1Dl4dyqa2biMWLZHfqnpJanMSTLbZS8kZh0'
)

function App() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    altPhone: '',
    email: '',
    deviceModel: '',
    repairType: '',
    issueDescription: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('checkins').insert([{
      customer_name: formData.customerName,
      customer_phone: formData.customerPhone,
      contact_number: formData.altPhone,
      email: formData.email,
      device_model: formData.deviceModel,
      repair_type: formData.repairType,
      issue_description: formData.issueDescription,
      status: 'New'
    }])

    if (error) {
      alert('Something went wrong.')
      console.error(error)
    } else {
      alert('Check-in submitted!')
      setFormData({
        customerName: '',
        customerPhone: '',
        altPhone: '',
        email: '',
        deviceModel: '',
        repairType: '',
        issueDescription: ''
      })
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>ACR Check-In</h1>
      <form onSubmit={handleSubmit}>
        <input name="customerName" placeholder="Customer Name" value={formData.customerName} onChange={handleChange} required /><br />
        <input name="customerPhone" placeholder="Customer Phone" value={formData.customerPhone} onChange={handleChange} required /><br />
        <input name="altPhone" placeholder="Alternate Phone" value={formData.altPhone} onChange={handleChange} /><br />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br />
        <input name="deviceModel" placeholder="Device Model" value={formData.deviceModel} onChange={handleChange} required /><br />
        <input name="repairType" placeholder="Repair Type" value={formData.repairType} onChange={handleChange} required /><br />
        <textarea name="issueDescription" placeholder="Describe the Issue" value={formData.issueDescription} onChange={handleChange} /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
