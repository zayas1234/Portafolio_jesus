import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home"
import Navbar from "./componets/navbar/navbar"
import { ThemeProvider } from "./ThemeContext/ThemeContex"
function App() {
  
  return (
    <>
      <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </>
  )
}

export default App
