import React, { useEffect, useRef, useState } from 'react';
import MainLayout from '../Layouts/MainLayout';
import axios from 'axios';
import { ComponentToPrint } from '../Components/componentsToPrint';
import { useReactToPrint } from 'react-to-print';

function POSPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [amountPaid, setAmountPaid] = useState(null);
  const [change, setChange] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get('products');
      setProducts(result.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle the error state, e.g., show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProductToCart = (product) => {
    const existingCartItem = cart.find((cartItem) => cartItem.id === product.id);

    if (existingCartItem) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === product.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.harga * (cartItem.quantity + 1),
          };
        }
        return cartItem;
      });

      setCart(updatedCart);
    } else {
      const newCartItem = {
        ...product,
        quantity: 1,
        totalAmount: product.harga,
      };

      setCart([...cart, newCartItem]);
    }
  };

  //use effect untuk merubah total amount
  useEffect(() => {
    let newTotalAmount = 0; // Initialize with 0
    cart.forEach((icart) => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  const removeProduct = (product) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(newCart);
  };

  const handlePrint = () => {
    const newAmountPaid = prompt("Masukkan jumlah uang yang dibayarkan:", "");  
    const newChange = newAmountPaid - totalAmount;
    setAmountPaid(newAmountPaid);
    setChange(newChange);  
  }
  
  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current
  });
  

  useEffect(() => {
    if (amountPaid && change) {
      handleReactToPrint();
    }
  }, [amountPaid, change]);

  return (
    <MainLayout>
      <div className='row'>
        <div className='col-lg-8 mt-3'>
          {isLoading ? (
            'Loading...'
          ) : (
            <div className='row'>
              {products.map((product) => (
                <div key={product.id} className='col-lg-4'>
                  <div className='border product-item' onClick={() => addProductToCart(product)} >
                    <p className='product-name'>{product.nama}</p>
                    <img src={product.gambar} alt={product.nama} className='img-fluid product-image' />
                    <p className='product-price'>Rp. {product.harga}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='col-lg-4'>
          <div style={{ display: 'none' }}>
            <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} amountPaid={amountPaid} change={change} />
          </div>
          <div className='table-responsive bg-dark cart-table'>
            <table className='table table-dark table-hover'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.length ? (
                  cart.map((cartItem, key) => (
                    <tr key={cartItem.id}>
                      <td>{key + 1}</td>
                      <td>{cartItem.nama}</td>
                      <td>Rp. {cartItem.harga}</td>
                      <td>{cartItem.quantity}</td>
                      <td>Rp. {cartItem.totalAmount}</td>
                      <td>
                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartItem)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='6'>Keranjang Kosong</td>
                  </tr>
                )}
              </tbody>
            </table>
            <h2 className='px-2 text-white'>Total Harga : Rp. {totalAmount}</h2>
          </div>
          <div className='mt-3'>
            {totalAmount !== 0 ? (
              <div>
                <button className='btn btn-primary' onClick={handlePrint}>
                  Bayar
                </button>
              </div>
            ) : (
              <div className='empty-cart-message'>Harap Masukkan Produk ke Dalam Keranjang</div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default POSPage;
