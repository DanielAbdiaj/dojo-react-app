import { useState } from 'react'
import {useLogin} from "../../hooks/useLogin";
// styles
import './Login.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    // Initialize a boolean state
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
      // When the handler is invoked
      // inverse the boolean state of passwordShown
      setPasswordShown(!passwordShown);
    };


    const {login,isPending,error}=useLogin();

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          required
          type={passwordShown ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />
        <span className="icon"><i onClick={togglePassword}>{eye}</i></span>
      </label>
      {/* <button className="btn">Log in</button> */}

      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      {error && <div className='error'>{error}</div>} 
    </form>
  )
}