import { useEffect, useState } from "react";
import { getJWT, getUserId } from "../util/functions";
import { Link } from "react-router-dom";
import { format, parseISO } from 'date-fns';

export const Boards = () => {
  const jwt = getJWT();
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  const getBoards = async () => {
    const jti = getUserId();

    try {
      const response = await fetch('https://tictactoe-zwst.onrender.com/api/user/' + jti, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwt.token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        data.boards.sort((a, b) => a.id - b.id);

        setUser(data);
        setLoading(false);
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
      {loading && <p>Loading...</p>}
      {!loading && <>
        <h4>{user?.email}</h4>

        <Link to={'/game/'} className="link__button">New game</Link>

        {user?.boards && displayBoards()}
      </>}
     
    </div>
  )
}
