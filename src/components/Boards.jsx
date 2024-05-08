import { useEffect, useState } from "react";
import { getJWT } from "../util/functions";
import { Link } from "react-router-dom";
import { format, parseISO } from 'date-fns';

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

  const displayBoards =()=>{
      let boards = user.boards.map(board=>{
        let b = board.boardState.map(square=>{
          let val=' ';
          if(square.state==1) {
            val='X';
          }else if(square.state==2){
            val='O'
          }

          return (
            <button key={square.id} className='button__square' >
              {val}
            </button>
          );
      });
      return (
        <Link key={board.id}
            className="board__card" 
            to={"/game/"+board.id}>
          <div className="board__row" >
                {b.slice(0,3)}
              
            </div>
            <div className="board__row" >
                {b.slice(3,6)}
              
            </div>
            <div className="board__row" >
                {b.slice(6,9)}
              
            </div>
        <h2>{board.name}</h2>
        <h4>{ format(parseISO(board.date), 'dd/MM/yyyy HH:mm:ss')}</h4>
          </Link>)
      });
    
    return <div className="boards__container">
      {boards}
      
    </div>;
  }

  useEffect(()=>{
    getBoards();
  },[])

  return (
    <div className="div__container">
      <h2>Boards</h2>

      <h4>{user?.email}</h4>

      <Link to={'/game/'} className="link__button">New game</Link>

      {user?.boards && displayBoards()}
    </div>
  )
}
