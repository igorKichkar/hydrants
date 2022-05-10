import './App.css';
import {BrowserRouter, Routes, Route, Redirect} from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import ListHydrants from "./components/ListHydrants";
import AddHydrant from "./components/AddHydrant";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path='/list_hydrants' element={<ListHydrants/>}/>
                    <Route path='/add_hydrant' element={<AddHydrant/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
