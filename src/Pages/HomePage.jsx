import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Carousel from 'react-bootstrap/Carousel';

function HomePage() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/products');
    const data = await res.json();
    setProducts(data);
  };

  return (
    <MainLayout>
      <div style={{ height: '800px' }} className="container-xl">
        <h1 className="display-4">Selamat Datang di GoEat</h1>
        <Carousel>
          {products.map((product) => (
            <Carousel.Item>
              <img src={product.gambar} alt={product.nama} className="d-block w-100" />
            </Carousel.Item>
          ))}
        </Carousel>
        <p>
          GoEat adalah usaha makanan siap saji yang menyediakan berbagai pilihan makanan untuk pengiriman langsung ke
          pelanggan. Pelanggan dapat dengan mudah memesan makanan melalui platform online GoEat, dengan menu yang beragam
          dan sesuai dengan preferensi individu. GoEat menawarkan kemudahan dan kenyamanan dalam menikmati hidangan
          berkualitas tinggi di rumah atau di tempat kerja.
        </p>
        <Link to="/pos" className="btn btn-primary mx-2">
          Beli Makanan
        </Link>
        <Link to="/list" className="btn btn-primary mx-2">
          Daftar Makanan
        </Link>
      </div>
    </MainLayout>
  );
}

export default HomePage;
