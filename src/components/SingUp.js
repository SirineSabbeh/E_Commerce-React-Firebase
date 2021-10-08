import React , {useState} from 'react';
import { auth, db } from '../config/config';
import {Link} from 'react-router-dom';
import logo from '../images/human.svg';
import '../css/sign.css';
export const SignUp =(props)=>{
    const [UserName, setUserName] = useState(' ');
    const [UserEmail, setUserEmail] = useState(' ');
    const [UserPassword, setUserPassword] = useState(' ');
    const [error,setError] = useState(' ');
    const Signup=(e)=>{
        e.preventDefault();
       /*  console.log("forme submitted");
        console.log(UserName,UserEmail,UserPassword); */
        auth.createUserWithEmailAndPassword(UserEmail, UserPassword).then((cred) => {
            db.collection('authUser').doc(cred.user.uid).set({
                UserName:UserName,
                UserEmail: UserEmail,
                UserPassword: UserPassword
            }).then(() => {
                setUserName('');
                setUserEmail('');
                setUserPassword('');
                setError('');
                props.history.push('/Login');
            }).catch(err => setError(err.message));
        }).catch(err => setError(err.message));
    }

     return (

      <div className='container'>
            <br />
            <h1 className='titre'>SIGN UP</h1>
            <img src={logo} alt="account"/>
            <hr />
            <form autoComplete="off" className='form-group forme' onSubmit={Signup}>
                <label htmlFor="name" className='labelclasse'>Name :</label>

                <input type="text" className='form-control inputclasse'  onChange={(e) => setUserName(e.target.value)} value={UserName}  placeholder="Both-Name" required/>
                 <br />
                <label htmlFor="price" className='labelclasse'>Email :</label> 
                <input type="email" className='form-control inputclasse'  onChange={(e) =>setUserEmail(e.target.value)} value={UserEmail} placeholder="BothName@gmail.com" required/>
                <br />
                <label  className='labelclasse'>password:</label>
                <input type="password" className='form-control  inputclasse'    onChange={(e) =>setUserPassword(e.target.value)} value={UserPassword} placeholder="password" required />
              

                <br />
                <button type="submit" className='mybtn'>SIGN UP</button>
                {error && <span className='error-msg'>{error}</span>}<br/>
                <div className="w-100 text-center mt-2">
                  Already have an account? <Link to="/Login">Log In</Link>
                 </div>
            </form>
           
           
          </div>
       
   )




}
