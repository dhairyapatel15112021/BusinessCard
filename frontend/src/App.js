import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { Form } from './Components/Form/Form';
import { Header } from './Components/Header/Header';
//import { Login } from './Components/Login/Login';
import { useState, lazy, Suspense, createContext } from 'react';
import { Loading } from './Components/Loading';
export const loginContext = createContext();
export const updateContext = createContext();

const Form = lazy(() => import('./Components/Form/Form'));
const Login = lazy(() => import('./Components/Login/Login'));

function App() {
  const [isLogin, setLogin] = useState(false);
  const [update, setUpdate] = useState({
    isUpdate: false,
    id: ""
  });

  return (
    <div className="App">
      <BrowserRouter>
        <loginContext.Provider value={{ isLogin, setLogin }}>
          <updateContext.Provider value={{ update, setUpdate }}>
            <Suspense fallback={<Loading />}>
              <Header />
              <Routes>
                <Route path='/' element={<Form />}></Route>
                <Route path='/login' element={<Login />}></Route>
              </Routes>
            </Suspense>
          </updateContext.Provider>
        </loginContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
