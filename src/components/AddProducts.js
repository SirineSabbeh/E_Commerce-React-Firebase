import React , {useState} from 'react';
import { storage, db } from '../config/config'
import '../css/AddProducts.css';
export const AddProducts=()=>{
    const [productName, setProductName] = useState(' ');
    const [productPrice, setproductPrice] = useState(0);
    const [productImg, setproductImg] = useState(null);
    const [error,setError] = useState(' ');

    const types=['image/png','image.jpg'];
    const productImgHandler=(e)=>{
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setproductImg(selectedFile);
            setError('')
        }
        else {
            setproductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }
    const addProduct = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    db.collection('Products').add({
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        ProductImg: url
                    }).then(() => {
                        setProductName('');
                        setproductPrice(0)
                        setproductImg('');
                        setError('');
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message))
                })
            })
    }
    return(
        <div className='container'>
            <br />
            <h1 className='title'>ADD PRODUCTS</h1>
            <hr />
            <form autoComplete="off" className='form-group form' onSubmit={addProduct}>
                <label htmlFor="product-name" className='labelclass'>Product Name</label>
                <input type="text" className='form-control inputclass'  onChange={(e) => setProductName(e.target.value)} value={productName} required/>
                <br />
                <label htmlFor="product-price" className='labelclass'>Product Price</label>
                <input type="number" className='form-control inputclass'  onChange={(e) => setproductPrice(e.target.value)} value={productPrice} required/>
                <br />
                <label htmlFor="product-img" className='labelclass'>Product Image</label>
                <input type="file" className='form-control  inputclass' id="file" onChange={productImgHandler} required />
                <br />
                <button type="submit" className='mybtn'>ADD</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
          </div>
       
    )
}