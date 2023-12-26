import type { Metadata } from 'next'
import {Raleway} from 'next/font/google'
import './globals.css'
import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";

const inter = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Publify — Create magazines quickly',
}

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
