import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { supabase } from '../supabaseClient'

function Scanner() {
  const [status, setStatus] = useState('')
  const scannerRef = useRef(null)

  useEffect(() => {
  const html5QrCode = new Html5Qrcode('reader')
  scannerRef.current = html5QrCode
  let isStarted = false

  html5QrCode.start(
    { facingMode: 'environment' },
    { fps: 10, qrbox: 250 },
    onScanSuccess,
    () => {}
  ).then(() => {
    isStarted = true
  }).catch((err) => {
    console.error('Camera start failed:', err)
  })

  return () => {
    if (isStarted) {
      html5QrCode.stop().catch(() => {})
    }
  }
}, [])

  async function onScanSuccess(decodedText) {
    scannerRef.current.pause()

    const { data: existing, error: fetchError } = await supabase
      .from('registrations')
      .select()
      .eq('id', decodedText)
      .single()

    if (fetchError || !existing) {
      setStatus('❌ Invalid QR code')
      return
    }

    if (existing.attended) {
      setStatus(`⚠️ ${existing.name} already checked in`)
      return
    }

    const { data, error } = await supabase
      .from('registrations')
      .update({ attended: true })
      .eq('id', decodedText)
      .select()
      .single()

    if (error) {
      setStatus('❌ Could not check in: ' + error.message)
    } else {
      setStatus(`✅ Checked in: ${data.name}`)
    }
  }

  function resumeScanning() {
    setStatus('')
    scannerRef.current.resume()
  }

  return (
    <div style={{ padding: '60px', textAlign: 'center' }}>
      <h1>Organizer Check-In Scanner</h1>

      <div id="reader" style={{ maxWidth: '400px', margin: '0 auto' }}></div>

      {status && (
        <div style={{ marginTop: '20px' }}>
          <p>{status}</p>
          <button onClick={resumeScanning}>Scan Next</button>
        </div>
      )}
    </div>
  )
}

export default Scanner