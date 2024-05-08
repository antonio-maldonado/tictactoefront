import { jwtDecode } from "jwt-decode";

export const getJWT=()=>JSON.parse(localStorage.getItem("jwt"));

export const decodeJWT=(token)=>{
    let decodedJWT = null
    try{
        decodedJWT = jwtDecode(token.token)
    }catch(error){
       console.error("No JWT found")
    }

    return decodedJWT;
}

export const getUserId = ()=>{
    const jwt = getJWT();
    let decodedJWT = decodeJWT(jwt);
    if(decodedJWT!=null) return decodedJWT.jti;

    return -1;
}