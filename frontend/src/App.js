

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import HomeMain from './components/HomePage'

function App() {
  return (
    <>
        <div className='flex flex-col gap-10'>
          <Navbar/>
          <HomeMain/>
        </div>
        <Footer/>
      
    </>
  );
}

export default App;
