import {  useState } from 'react';
import {PropTypes} from "prop-types";
//  import { useNavigate } from 'react-router-dom';

export const Login = ({setIsLogged}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://tictactoe-zwst.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwt",JSON.stringify(data));

        if(localStorage.getItem("jwt")!=null){
          setIsLogged(true);
        }
        
      } else {
        setError('Login failed, check your credentials');
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
  <div className='div__login'>
      <h1 className='text-center '>Login</h1>

      <form  className="form__login" onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        handleLogin(); 
      }}>

        <div className="div__input mb-3">
          <label htmlFor="username" className="label__input">Username</label>
          <input
            type="text" name='username'
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className="div__input mb-4">
          <label htmlFor="password" className='label__input'>Password </label>
          <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
    
        <div className="button__login">
          {!loading &&  <button type="submit" className="btn btn-primary">Log In</button>}
        </div>
      </form>
      {loading && <p className='text-center mt-3'>...Loading</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

Login.propTypes={
    setIsLogged: PropTypes.func.isRequired,
}