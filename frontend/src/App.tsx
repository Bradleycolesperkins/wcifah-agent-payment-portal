import { Routes, Route, Navigate } from 'react-router-dom'
import PaymentPage from './pages/PaymentPage'
import SuccessPage from './pages/SuccessPage'
import FailedPage from './pages/FailedPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaymentPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/failed" element={<FailedPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
