import { useState } from 'react'

// styles
import './Signup.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;


export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password, displayName)
  }

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input
          required 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          type={passwordShown ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        />
        <span className="icon"><i onClick={togglePassword}>{eye}</i></span>
      </label>
      <label>
        <span>Display Name:</span>
        <input
          required
          type="text" 
          onChange={(e) => setDisplayName(e.target.value)} 
          value={displayName}
        />
      </label>
      <label>
        <span>Profile Thumbnail:</span>
        <input 
          required
          type="file" 
        />
      </label>
      <button className="btn">Sign up</button>
    </form>
  )
}
