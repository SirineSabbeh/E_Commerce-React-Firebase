import React ,{useState} from 'react';
import { auth} from '../config/config';
import {Link} from 'react-router-dom';
import logo from '../images/human.svg';
import '../css/sign.css';

export const Login=(props)=>{
    const [UserEmail, setUserEmail] = useState('');
    const [UserPassword, setUserPassword] = useState('');
    const [error,setError] = useState('');
    const Signin=(e)=>{
                e.preventDefault();
               /*  console.log("forme submitted");
                console.log(UserName,UserEmail,UserPassword); */
                auth.signInWithEmailAndPassword(UserEmail, UserPassword).then(() => {
                    setUserEmail('');
                    setUserPassword('');
                    setError('');
                    props.history.push('/');
                    
                 }).catch(err => setError(err.message));
             
            }
        
             return (
        
              <div className='container'>
                    <br />
                    <h1 className='titre'>SIGN IN</h1>
                    <img src={logo} alt="account"/>
                    <hr />
                    <form autoComplete="off" className='form-group forme' onSubmit={Signin}>
                        
                    <label htmlFor="price" className='labelclasse'>Email :</label> 
                    <input type="email" className='form-control inputclasse'  onChange={(e) =>setUserEmail(e.target.value)} value={UserEmail} placeholder="BothName@gmail.com" required/>
                    <br />
                    <label  className='labelclasse'>password:</label>
                    <input type="password" className='form-control  inputclasse'    onChange={(e) =>setUserPassword(e.target.value)} value={UserPassword} placeholder="Password" minlength="8" required />
                      
                    
                        <br />
                        <button type="submit" className='mybtn'>SIGN IN</button>
                        <div className="w-100 text-center mt-2">
                        {error && <span className='error-msg'>{error}</span>}<br/>
                          Don't have an account? Register<Link to="/SignUp">Here</Link>
                         </div>
                    </form>
                  
                   
                  </div>
               
           )
        
        
    
    
}