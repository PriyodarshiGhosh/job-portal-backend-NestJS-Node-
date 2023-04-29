import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/api/v1/auth/register', { email, password,role });
      console.log(response);
      // Save token to localStorage or store it in state for further use
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/api/v1/auth/login', { email, password });
      console.log(response);
      // Save token to localStorage or store it in state for further use
      localStorage.setItem('token', response.data.accessToken);
      if (response.data.role === 'recruiter') {
        navigate('/jobform');
      }
      if(response.data.role==='candidate'){
        navigate('/applicationform');
      }
      if(response.data.role==='admin'){
        navigate('/adminform');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Auth</h1>
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
