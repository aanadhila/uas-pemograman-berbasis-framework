import React from 'react';
import { Link } from 'react-router-dom';

function MainLayout({ children }) {
    return (
        <div>
            <header>
                <nav className="navbar navbar-light" style={{ backgroundColor: '#F4B183' }}>
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <img src={process.env.PUBLIC_URL + '/icon.png'} width="30" height="30" alt="logo" />
                            <strong style={{ color: 'black' }}>GoEat</strong>
                        </Link>
                    </div>
                </nav>
            </header>
            <main style={{ backgroundColor: '#FFF2CC' }}>
                {children}
            </main>
            <footer className="footer">
                <p>&copy; 2023 GoEat. All rights reserved.</p>
                <p>Alamat Usaha, Kota, Provinsi</p>
                <p>Telepon: 123-456-7890 | Email: info@usaha-makanan.com</p>
            </footer>
        </div>
    );
}

export default MainLayout;
