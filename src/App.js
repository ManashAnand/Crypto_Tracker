import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './Components/Header'
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import Alert from './Components/Authentication/Alert';

function App() {

  return (
    <>
     <BrowserRouter>
        <div className="wholeBody">
          <Header/>
          <Routes>
            <Route path='/' element={<HomePage/>} exact/>
            <Route path='/coins/:id' element={<CoinPage/>} exact/>
          </Routes>
        </div>
        <Alert/>
     </BrowserRouter>
    </>
  );
}

export default App;
