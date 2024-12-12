import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';
import { Dashboard } from './pages/dashboard';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </Router>
    <Toaster richColors position="top-center"/>
    
    </>
    
  )
}

export default App
