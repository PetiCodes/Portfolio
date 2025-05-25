import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Peti's Portfolio",
  description: 'Portfolio of Mohammed Petiwala - IT professional with expertise in machine learning, full-stack development, and modern web technologies. Skilled in Python, Java, React, and Node.js.',
  keywords: 'Mohammed Petiwala, Full Stack Developer, Machine Learning Engineer, Python, Java, React, Node.js, Web Development, IT Professional',
  author: 'Mohammed Petiwala',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
