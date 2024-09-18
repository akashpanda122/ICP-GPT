import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
//import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { KasadaClient } from '@/lib/kasada/kasada-client'
import { IdentityProvider } from '../context/AppContext'
//import { InternetIdentityProvider } from "ic-use-internet-identity";
import {Fragment} from 'react';

export const metadata = {
  metadataBase: new URL('https://icp-gpt.vercel.app/'),
  title: {
    default: 'ICPGPT',
    template: ``
  },
  description:
    'Write and Deploy smart contract on ICP using natural language prompt.',
  icons: {
    icon: '/ICPGPT.png',
    shortcut: '/ICPGPT.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <IdentityProvider>
        <Fragment>
          <KasadaClient />
          <Toaster position="top-center" />
        
          <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
            <>
            <div className="flex flex-col min-h-screen bg-black">
            
              <Header />
              <main className="flex flex-col flex-1">{children}</main>
            
            </div>
            {/*<TailwindIndicator />*/}
            </>
            
          </Providers>
          
          <Analytics />
        </Fragment>
        </IdentityProvider>
      </body>
    </html>
  )
}
