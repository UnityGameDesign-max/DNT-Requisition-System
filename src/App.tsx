import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import { Dashboard } from './pages/components/dashboardContainer';
import { DashboardHome } from './pages/dashboardPage';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />}></Route>
        </Route>
        
      </Routes>
    </Router>
    <Toaster richColors position="top-center"/>
    </>
    
  )
}

export default App
