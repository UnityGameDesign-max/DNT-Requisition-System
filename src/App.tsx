import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import { DashboardContainer } from './pages/components/DashboardContainer';
import { DashboardHome } from './pages/DashboardPage';
import { RequisitionCreation } from './pages/RequisitionCreation';
import { AddApproval } from './pages/AddApproval';

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
