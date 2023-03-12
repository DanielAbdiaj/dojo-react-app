import { useEffect, useState } from 'react'
import { useSignup } from '../../hooks/useSignup';

// styles
import './Signup.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";



const eye = <FontAwesomeIcon icon={faEye} />;

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [imageUrl, setImageUrl] = useState(null);
  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);

  const [thumbnailError, setThumbnailError] = useState(null);

  const {signup,isPending,error}=useSignup();

  
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName,thumbnail);
  }

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const handleFileChange=(e)=>{
    setThumbnail(null);
    let selected=e.target.files[0];
    console.log(selected);

    if (!selected) {
      setThumbnailError('Please select a file')
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image')
      return
    }
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100kb')
      return
    }
    
    setThumbnailError(null)
    setThumbnail(selected)
    console.log('thumbnail updated')
  }

  useEffect(() => {
    if (thumbnail) {
      setImageUrl(URL.createObjectURL(thumbnail));
    }
  }, [thumbnail]);

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

      <input 
          required
          type="file" 
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="select-image"
        />
      
      <label htmlFor="select-image">
        <span>Profile Thumbnail:</span>
        <Button variant="contained" component="span" color="primary">
          Upload Image
        </Button>
      </label>

      {imageUrl && thumbnail && (
        <Box my={3} textAlign="center">
          <div>Image Preview:</div>
          <img src={imageUrl} alt={thumbnail.name} height="100px" />
        </Box>
      )}
  


       {thumbnailError && <div className="error">{thumbnailError}</div>}
        
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      {error && <div className='error'>{error}</div>} 
    </form>
  )
}
