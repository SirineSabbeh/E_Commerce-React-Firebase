import React, { createContext } from 'react';
import { db } from '../config/config';
export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component{
      state={
          products:[]
      }

      componentDidMount() {

        const prevProducts = this.state.products;
        db.collection('Products').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevProducts.push({
                        ProductID: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImg: change.doc.data().ProductImg
                    })
                }
                this.setState({
                    products: prevProducts
                })
            })
        })

    }
    render(){
      return(
     <ProductsContext.Provider value={{ products: [...this.state.products] }}>
        {this.props.children}
     </ProductsContext.Provider>
      )

    }

    





}




/* Vous pouvez écouter un document avec le onSnapshot() méthode.
 Un appel initial utilisant le rappel que vous fournissez crée immédiatement
 un instantané de document avec le contenu actuel du document unique. 
Ensuite, chaque fois que le contenu change, un autre appel met à jour l'instantané du document */