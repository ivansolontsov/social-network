import { Inter, Roboto_Slab } from 'next/font/google'
import ClientProvider from '@/modules/ClientProvider'
import '@/styles/globals.scss';

const inter = Inter({
  subsets: ['latin'],
  variable: "--inter-font"
})
const roboto = Roboto_Slab({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: "--roboto-font"
})

export const metadata = {
  title: 'Social Network',
  description: 'Social Network',
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
  icons: {
    icon: '/images/icon.webp'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable + ' ' + roboto.variable} >
      <body>
        <main className='main'>
          <ClientProvider>
            {children}
          </ClientProvider>
        </main>
      </body>
    </html>
  )
}
