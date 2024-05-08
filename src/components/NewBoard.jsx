import { useState, useEffect } from 'react';
import { getJWT, getUserId } from '../util/functions';
import { Link,  useNavigate, useParams } from 'react-router-dom';

 const jwt = getJWT();
 const jti = getUserId();

export const NewBoard = () => {

  const {id} = useParams();

  const EMPTY_BOARD = Array(9).fill(0);

  const [board, setBoard] = useState(EMPTY_BOARD);
  const [gameId, setGameId] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("board");

  const navigate = useNavigate();
    const deleteHandler= async()=>{
      try {
        const response = await fetch('http://localhost:8080/api/board/'+id, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${jwt.token}`,
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          navigate("/boards")
        } else {
          setError("Error deleting this board");
        }
      } catch (err) {
        setError("Error starting new game");
      }
    }

    useEffect(() => {
        startNewGame();
    },[]);

    const startNewGame = async () => {
      let endpoint = "http://localhost:8080/api/start/"+jti;
      let method = "POST";

      if((id!=null || id!=undefined)){
        endpoint = "http://localhost:8080/api/board/"+id;
        method = "GET";
        }

      try {
        const response = await fetch(endpoint, {
          method: method,
          headers: {
            'Authorization': `Bearer ${jwt.token}`,
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBoard(data.boardState.map(bs => bs.state));

          setGameId(data.id);
          setIsFinished(data?.isFinished);
          setInput(data.name);
        } else {
          throw new Error("Error");
        }
      } catch (err) {
        setError("Error starting new game");
      } 
    };

    const playMove = async (index) => {
        if (board[index] !== 0 || isFinished) {
            return; 
        }

        try {
            const response = await fetch('http://localhost:8080/api/play', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt.token}`,
              },
              body: JSON.stringify({
                boardId: gameId,
                position: index, 
                name: input,
              }),
            });

            const data = await response.json();
            setBoard(data.boardState.map((square) => square.state));
            setIsFinished(data?.isFinished);

            if (data?.isFinished) {
              setError("Game Over");
            }
            if (response.data?.isFinished) {
                setError("Game Over");
            }

            if(response.status == 409){
              throw new Error('Game finished');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const renderSquare = (index) => {
        const value = board[index] === 1 ? 'X' : (board[index] === 2 ? 'O' : ' ');
        return (
            <button className='button__square' 
              onClick={() => playMove(index)} 
              disabled={isFinished}>
                {value}
            </button>
        );
    };

    if (isFinished){
      <button onClick={startNewGame}>Start New Game</button>
    }

    const onInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
    }

    return (
        <div className='div__container'>
            <h1>Tic-Tac-Toe</h1>
            {error && <div>{error}</div>}
            <div className='board__container'>
                <div className='board__row'>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className='board__row'>
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className='board__row'>
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>

            <input type="text" 
                  name="title" 
                  id="title" 
                  value={input}
                  onChange={onInputChange}
              />

            <p>{isFinished}</p>

            <Link to={'/boards'} className='link__button'>Back to boards</Link>
           
            {id && <button 
                    className="link__button red" 
                    onClick={deleteHandler}>
                      Delete
                  </button>
            }
        </div>
    );
  }

