import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { useEffect, useState } from 'react';
import { Boards } from './components/Boards';
import { Navbar } from './components/Navbar';
import { decodeJWT, getJWT } from './util/functions';
import { NewBoard } from './components/NewBoard';
import { CustomBoard } from './components/CustomBoard';

export const App = () => {
    const jwt = getJWT();
    const [isLogged,setIsLogged]=useState(jwt!=null);

    const handlerLogout = ()=>{
        setIsLogged(false);
        localStorage.clear();
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
                        <Route path='/play' element={<CustomBoard/>}/>
                    </Routes>
                </BrowserRouter>
            }  
        </>
    )
}

