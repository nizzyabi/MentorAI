// Imports
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
// Dark or Light Mode
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { ProModal } from '@/components/pro-modal'
const inter = Inter({ subsets: ['latin'] })
// ClerkProvidor should wrap the entire application
export const metadata: Metadata = {
  title: 'MyMentorAI',
  description: 'Get advice from the best',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        {/* change background color to bg-secondary (for dark mode)*/}
        <body className={cn(inter.className)}>
        {/* You can also change the theme to be forced, your choice of theme (dark or light) by having forcedTheme='dark' or 'light'*/}
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ProModal />
          {children}
          {/* Analytics */}
          <Analytics />
          {/* Toaster from ShadCN*/}
          <Toaster />
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
