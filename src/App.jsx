import {  BrowserRouter, Route, Routes} from 'react-router-dom';
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { useEffect, useState } from 'react';
import { Boards } from './components/Boards';
import { Navbar } from './components/Navbar';
import { decodeJWT, getJWT } from './util/functions';
import { NewBoard } from './components/NewBoard';
export const App = () => {
    const jwt = getJWT();
    const [jwt2,setJwt] = useState(jwt);
    const [isLogged,setIsLogged]=useState(jwt2!=null);

    const handlerLogout = ()=>{
        setIsLogged(false);
        localStorage.clear();
        window.location.href="/";
    }

    useEffect(()=>{

        const verifyLogin = ()=>{
            const jwt1 = getJWT();
            if(jwt1!=null){
                const decodedJWT=decodeJWT(jwt1);
                
                if(decodedJWT!=null){
                    setIsLogged(true);
                }
            }else{
                setIsLogged(false);
            }
        }

        verifyLogin();
    },[isLogged,jwt2])

    return (
        <>  
            {!isLogged?
                <Login  setIsLogged={setIsLogged}/>
                    :
                <BrowserRouter>
                    <Navbar handlerLogout={handlerLogout}/>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/boards' element={<Boards/>} />
                        <Route path='/game/:id?' element={<NewBoard/>}/>
                    </Routes>
                </BrowserRouter>
            }  
        </>
    )
}

