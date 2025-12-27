import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from "react-hot-toast";


const Root = () => {
    return (
      <div>
        <Toaster position="top-right" reverseOrder={false} />
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
};

export default Root;