import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import './Login.css';
import axios from 'axios';

function Login() {
  const initialValues = { username: "", phone: "", password: "", confirmpw:""};
  const [formValues, setFormValues] = useState(initialValues);

  // const [name,setName] = useState();
  // const [phone,setPhone] = useState();
  // const [pass,setPass] = useState();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [action,setAction] = useState("Login");
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Store MongoDB ObjectId

  useEffect(() => {
    // Check if the user was logged in previously
    const loggedInUserId = localStorage.getItem('userId');
    if (loggedInUserId) {
      setUserId(loggedInUserId);
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (!values.username && action === "Register") {
      errors.username = "Username is required!";
    }
    if (values.phone.length !== 10) {
      errors.phone = "Enter valid phone number!";
    } 
    if (values.password.length !==6) {
      errors.password = "Password must be exact 6 characters";
    }
    if (action === "Register" && values.password !== values.confirmpw) {
      errors.confirmpw = "Password doesn't match!";
    } 
    return errors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:3001/login', formValues)
        .then(result => {
          console.log(result);
          if (result.data._id) {
            alert("Login Success")
            // Store user ObjectId in localStorage
            localStorage.setItem('userId', result.data._id);
            setUserId(result.data._id);
            setIsLoggedIn(true);
            navigate('/');
          } else {
            // Handle incorrect password or user not exist
            alert(result.data);
          }
        })
        .catch(err => console.error(err));
    }
  }
  
  const handleRegister = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:3001/register', formValues)
        .then(result => {
          if (result.data) {
            alert("Registration Success");
            // Store user ObjectId in localStorage
            localStorage.setItem('userId', result.data._id);
            setUserId(result.data._id);
            setIsLoggedIn(true);
            navigate('/');
          }
        })
        .catch(err => {
          if (err.response && err.response.data && err.response.data.message) {
              alert(err.response.data.message);
          } else {
              console.error(err);
          }
      });
}
}

  return (
    <div>
    <Navbar isLoggedIn={isLoggedIn} ></Navbar>

    <div className='login-form'>

        <form className='centerform'>
        {/* <h4 >{action}</h4>   */}
        {action==="Login"?<div></div>:
        <><label>Name</label>
        <input type='text' name='username' autoComplete='off' placeholder='Max 10 characters'
        value={formValues.username}
        onChange={handleChange}></input>
        <p>{formErrors.username}</p>
        </>}

        <label>Phone</label>
        <input type='number' name='phone' autoComplete='off' maxLength={10} placeholder='Max 10 numbers'
        value={formValues.phone}
        onChange={handleChange}></input>
        <p>{formErrors.phone}</p>

        <label>Password</label>
        <input type='password' name='password' placeholder='Must be 6 characters'
        value={formValues.password}
        onChange={handleChange}></input>
        <p>{formErrors.password}</p>

        {action==="Login"?<div></div>:
        <><label>Confirm Password</label>
        <input type='password' name='confirmpw' placeholder='Must be 6 characters'
        value={formValues.confirmpw}
        onChange={handleChange}></input>
        <p>{formErrors.confirmpw}</p>
        </>}

        {action==="Login"?<button type='submit' onClick={handleLogin}>Login</button>:<button type='submit' onClick={handleRegister}>Submit</button>}

        {action==="Login"?<h4>Not having account? <span onClick={()=>{setAction("Register")}}>Register</span></h4>:
        <h4>Already having account? <span onClick={()=>{setAction("Login")}}>Login</span></h4>}

        </form>
    </div>
    </div>
  )
}

export default Login