import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import SignIn from './pages/signIn';
import { DashboardContainer } from './pages/components/dashboardContainer';
import { DashboardHome } from './pages/dashboardPage';
import { RequisitionCreation } from './pages/requisition-creation';
import { AddApproval } from './pages/add-approval';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<DashboardContainer />}>
          <Route index element={<DashboardHome />}></Route>
          <Route path="requisition-creation" element={<RequisitionCreation />} />
          <Route path="add-approval" element={<AddApproval />}/>
          
        </Route>
        
      </Routes>
    </Router>
    <Toaster richColors position="top-center"/>
    </>
    
  )
}

export default App
