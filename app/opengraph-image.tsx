import { ImageResponse } from 'next/og'
import { BrandMark } from '@/components/brand/brand-mark'

export const alt = 'Benchmack Technology — software development company in Dar es Salaam, Tanzania'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        color: '#ffffff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: 16,
            background: '#2563eb',
          }}
        >
          <BrandMark size={40} strokeWidth={2.2} />
        </div>
        <div style={{ display: 'flex', fontSize: 36, fontWeight: 600 }}>
          Benchmack&nbsp;<span style={{ color: '#93c5fd', fontWeight: 400 }}>Technology</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 940 }}>
          Reliable software built around how your business works.
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#cbd5e1' }}>
          Mobile apps · POS · Property management · Custom systems
        </div>
      </div>

      <div style={{ display: 'flex', fontSize: 24, color: '#93c5fd' }}>
        benchmacktech.co.tz · Dar es Salaam, Tanzania
      </div>
    </div>,
    size,
  )
}
