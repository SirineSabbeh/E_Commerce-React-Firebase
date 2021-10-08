import React ,{useEffect} from 'react';
import '../css/Home.css';
import { Navbar } from '../components/Navbar';
import { Products } from '../components/Products';
import { useHistory } from 'react-router-dom'
import { auth } from '../config/config'
export const Home =({ user })=>{
       const history=useHistory();
       useEffect(() => {
        // forcing user to signup
        auth.onAuthStateChanged(user => {
            if (!user) {
                history.push('/Login');
            }
        })
    })
    return(
        <div className="wrapper">
          <Navbar user={user}/>
          <Products/>
        </div>
    )
}