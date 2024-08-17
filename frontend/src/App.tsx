import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Signup from "./pages/Signup"
import { Routes,Route,BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import Dashboard from "./pages/Dashboard"
import Form from './pages/Form';
import Details from './pages/Details';
import Users from './pages/Users';
 

function App() {
  
  return (
    <RecoilRoot>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup></Signup>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/form' element={<Form></Form>}></Route>
        <Route path='/details' element={<Details></Details>}></Route>
        <Route path='/users' element={<Users></Users>}></Route>
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
    
  )
}

export default App
