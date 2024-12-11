import { Toaster } from 'sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import SignUp from './pages/signUp';
import SignIn from './pages/signIn';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        
      </Routes>
    </Router>
    <Toaster richColors position="top-center"/>
    
    </>
    
  )
}

export default App
