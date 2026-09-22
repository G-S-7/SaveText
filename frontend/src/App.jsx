
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import Login from './pages/LoginPage'
import Signup from './pages/Signup'
const App = () => {
  return (
    // <div className="relative h-full w-full">
    //  <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,rgba(59,130,246,0.5)_100%)]" />
     <div data-theme="light">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/notes/:id" element={<NoteDetailPage/>}/>
      </Routes>
    </div>
  )
}

export default App