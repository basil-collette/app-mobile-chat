
import HomeComponent from './component/home/home.component'
import AuthComponent from './component/auth/auth.component'
import {Routes, Route} from "react-router-dom"
function App() {
  return (
    <Routes>
      <Route path="/" element ={<AuthComponent />} />
      <Route path="/admin" element ={<HomeComponent />} />
    </Routes>
  );
} 

export default App;
