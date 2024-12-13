import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import { DashboardContainer } from './pages/components/dashboardContainer';
import { DashboardHome } from './pages/dashboardPage';
import { RequisitionCreation } from './pages/requisition-creation';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<DashboardContainer />}>
          <Route index element={<DashboardHome />}></Route>
          <Route path="requisition-creation" element={<RequisitionCreation />} />
          
        </Route>
        
      </Routes>
    </Router>
    <Toaster richColors position="top-center"/>
    </>
    
  )
}

export default App
