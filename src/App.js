
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from './SearchPage'
import ImageEditorPage from  './ImageEditorPage'
import Caption from './Caption';
// import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <BrowserRouter>
    <Routes>
    
    <Route path="/caption" element={<Caption />} />
      <Route path="/" exact element={<SearchPage/>} />
      <Route path="/editor" element={<ImageEditorPage/>} />
  
  </Routes>
  </BrowserRouter>
  );
}

export default App;
