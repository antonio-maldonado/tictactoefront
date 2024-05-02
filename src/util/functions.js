import { jwtDecode } from "jwt-decode";

export const getJWT=()=>JSON.parse(localStorage.getItem("jwt"));

export const decodeJWT=(token)=>{
    let decodedJWT = null
    try{
        decodedJWT = jwtDecode(token.token)
    }catch(error){
        throw new Error(error);
    }

    return decodedJWT;
}