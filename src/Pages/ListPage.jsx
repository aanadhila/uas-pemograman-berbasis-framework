import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from '../Layouts/MainLayout';

function ListPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nama, setNama] = useState('');
  const [harga, setharga] = useState('');
  const [gambar, setGambar] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get('/products');
      setProducts(result.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle the error state, e.g., show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      // Tampilkan notifikasi konfirmasi
      const confirmed = window.confirm('Apakah Anda yakin ingin menghapus produk ini?');

      if (confirmed) {
        // Jika pengguna mengonfirmasi, lakukan penghapusan produk
        await axios.delete(`http://localhost:5000/products/${productId}`);
        fetchProducts(); // Fetch products again after deletion
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  const addProduct = async () => {
    try {
      const newProduct = { nama, harga, gambar };
      await axios.post('/products', newProduct);
      fetchProducts(); // Fetch products again after adding
      setNama('');
      setharga('');
      setGambar('');
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle the error state, e.g., show an error message to the user
    }
  };

  const editProduct = async (productId) => {
    const product = products.find(product => product.id === productId);
    const { nama, harga, gambar } = product;

    let newNama = nama;
    let newHarga = harga;
    let newgambar = gambar;

    const updateNama = prompt('Enter new product name (leave empty to skip):', nama);
    if (updateNama) {
      newNama = updateNama;
    }

    const updateHarga = prompt('Enter new product harga (leave empty to skip):', harga);
    if (updateHarga) {
      newHarga = updateHarga;
    }

    const updategambar = prompt('Enter new product gambar link (leave empty to skip):', gambar);
    if (updategambar) {
      newgambar = updategambar;
    }

    if (newNama || newHarga || newgambar) {
      try {
        const updatedProduct = {
          nama: newNama,
          harga: newHarga,
          gambar: newgambar
        };
        await axios.put(`http://localhost:5000/products/${productId}`, updatedProduct);
        fetchProducts();
      } catch (error) {
        console.error('Error editing product:', error);
      }
    }
  }

  return (
    <MainLayout>
      <div>
        <center><h2>Daftar Produk</h2></center>
        <form className="product-form" onSubmit={addProduct}>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan Nama Produk"
                className='form-control'
              />
            </div>
            <div className="col">
              <input
                type="text"
                value={harga}
                onChange={(e) => setharga(e.target.value)}
                placeholder="Masukkan Harga Produk"
                className='form-control'
              />
            </div>
          </div>

          <input
            type="text"
            value={gambar}
            onChange={(e) => setGambar(e.target.value)}
            placeholder="Masukkan Link Gambar Produk"
            className='form-control'
          />

          <button type="submit" className='btn btn-primary mt-3'>
            Tambahkan Produk
          </button>

        </form>


        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="card-container">
            {products.map((product) => (
              <div key={product.id} className="card">
                <img src={product.gambar} alt={product.nama} className="card-image" />
                <div className="card-content">
                  <p className="card-name">{product.nama}</p>
                  <p className="card-harga">harga: {product.harga}</p>
                  <div className="button-container">
                    <button onClick={() => editProduct(product.id)} className='btn btn-secondary'>Edit</button>
                    <button onClick={() => deleteProduct(product.id)} className='btn btn-danger'>Hapus</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default ListPage;
