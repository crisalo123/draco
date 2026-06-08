import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from '@/presentation/context/CartProvider'
import { ScrollToTop } from '@/presentation/components/ScrollToTop'
import { AboutPage } from '@/presentation/pages/AboutPage'
import { HomePage } from '@/presentation/pages/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
