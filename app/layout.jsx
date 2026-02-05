import { DM_Serif_Display, Outfit } from 'next/font/google'
import Providers from '@/components/Providers'
import './globals.css'

const dmSerif = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
})
const outfit = Outfit({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-outfit',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${outfit.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
