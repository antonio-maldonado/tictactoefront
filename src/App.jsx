import {  BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { useEffect, useState } from 'react';
import { Boards } from './components/Boards';
import { Navbar } from './components/Navbar';
import { decodeJWT, getJWT } from './util/functions';
import { NewBoard } from './components/NewBoard';
export const App = () => {
    const navigate = useNavigate();
    const jwt = getJWT();
    const [isLogged,setIsLogged]=useState(jwt!=null);

    const handlerLogout = ()=>{
        setIsLogged(false);
        localStorage.clear();
         navigate("/");
    }

    useEffect(()=>{

        const verifyLogin = ()=>{
            if(jwt!=null){
                const decodedJWT=decodeJWT(jwt);
                
                if(decodedJWT!=null){
                    setIsLogged(true);
                }
            }else{
                setIsLogged(false);
            }
        }

        verifyLogin();
    },[isLogged,jwt])

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

