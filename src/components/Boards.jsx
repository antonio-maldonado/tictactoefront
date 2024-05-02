import { useEffect, useState } from "react";
import { getJWT } from "../util/functions";
import { Link } from "react-router-dom";

const jwt = getJWT();

export const Boards = () => {
  const [user, setUser] = useState(null);

  const getBoards = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user/1', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwt.token}`,
          'Content-Type': 'application/json'
        },
       
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        throw new Error("Error");
      }
    } catch (err) {
      throw new Error("Error");
    }
  }

  useEffect(()=>{
    getBoards();
  },[])
  
  return (
    <div className="div__container">
      <h2>Boards</h2>
      <h4>{user?.email}</h4>
      <Link to={'/game'}>New game</Link>
    </div>
  )
}
