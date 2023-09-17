// Imports
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
// Dark or Light Mode
import { ThemeProvider } from '@/components/theme-provider'
const inter = Inter({ subsets: ['latin'] })
// ClerkProvidor should wrap the entire application
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        {/* You can also change the theme to be forced, your choice of theme (dark or light) by having forcedTheme='dark' or 'light'*/}
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
