import React, { Component } from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import { Home } from './components/Home';
import {AddProducts} from './components/AddProducts';
import { SignUp } from './components/SingUp';
import {ProductsContextProvider} from './global/ProductContext';
import { Login } from './components/Login';
import { auth,db } from './config/config';

export class App extends Component {
  state = {
    user : null,
  }
  componentDidMount(){

    // getting user info for navigation bar
    auth.onAuthStateChanged(user => {
      
         if(user){
            db.collection('Userauth').doc(user.uid).get().then(snapshot => {
                this.setState({
                    user: snapshot.data().UserName
                })
            })
          }else{
        
            this.setState({
                user: null
            
        })}
    })
  }



  render() {
    return(
      <ProductsContextProvider>
        <BrowserRouter>
         <Switch>
   
          <Route exact path='/' component={() => <Home user={this.state.user} />} />
          <Route exact path='/addproducts' component={AddProducts}></Route>
          <Route exact path='/SignUp' component={SignUp}></Route>
          <Route exact path='/Login' component={Login}></Route>
        </Switch>
      
        </BrowserRouter>
      </ProductsContextProvider>
    )
  }
}

export default App;