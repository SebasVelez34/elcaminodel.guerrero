import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const syne = Syne({ 
  subsets: ["latin"],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700']
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic']
});

export const metadata: Metadata = {
  title: '¿Cuál es tu arquetipo? — El Camino del Guerrero',
  description: '12 preguntas sin filtros. Descubre en cuál de los 5 patrones estás atrapado y qué hacer hoy.',
  openGraph: {
    title: '¿Cuál es tu arquetipo cuando ella se aleja? — El Camino del Guerrero',
    description: '12 preguntas. Sin filtros. Al final sabes exactamente en qué patrón estás y qué hacer hoy.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${syne.variable} ${dmSans.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
