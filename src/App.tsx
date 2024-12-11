
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import SignUp from './pages/signUp';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        {/* Other routes */}
      </Routes>
  </Router>
  )
}

export default App
