import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { Production } from '@/pages/Production'
import { ProductionRollUp } from '@/pages/ProductionRollUp'
import { Pipeline } from '@/pages/Pipeline'
import { CustomerInbox } from '@/pages/CustomerInbox'
import { DeliveryPlanning } from '@/pages/DeliveryPlanning'
import { Finance } from '@/pages/Finance'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/production" element={<Production />} />
          <Route path="/production-rollup" element={<ProductionRollUp />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/inbox" element={<CustomerInbox />} />
          <Route path="/delivery" element={<DeliveryPlanning />} />
          <Route path="/finance" element={<Finance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
