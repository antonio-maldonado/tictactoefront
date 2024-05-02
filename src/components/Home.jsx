import { Link } from "react-router-dom";
import { decodeJWT, getJWT } from "../util/functions";

export const Home = () =>{
    const jwt = getJWT();
    const decodedJWT = decodeJWT(jwt);

  return (
    <div className="div__container home">
      <h2>Home</h2>
      <p>{decodedJWT.jti}</p>    
      <Link to={'/game'}>New Game</Link>
      
    </div>
  );
}
