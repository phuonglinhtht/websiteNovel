import 'react-loading-skeleton/dist/skeleton.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import './scss/App.scss';
import Account from './views/Account/Account';
import Admin from './views/Account/Admin';
import Active from './views/Active/Active';
import AllStory from './views/AllStory/AllStory';
import Chapter from './views/Chapter/Chapter';
import Home from './views/Home/Home';
import PrivateRoute from './views/PrivateRoute';
import Search from './views/Search/Search';
import StoryDetail from './views/StoryDetail/StoryDetail';
import TopRate from './views/TopRate';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='truyen/:url' element={<StoryDetail />}/>
        <Route element={<PrivateRoute roles={['USER']} />}>
          <Route path='/user/*' element={<Account />}/>
        </Route>
        <Route element={<PrivateRoute roles={['ADMIN']} />}>
          <Route path='admin/*' element={<Admin />}/>
        </Route>
        <Route path='top-rate' element={<TopRate />}/>
        <Route path='active/:token' element={<Active />}/>
        <Route path='truyen/:url/:chapnum' element={<Chapter />}/>
        <Route path='tim-kiem' element={<Search/>}/>
        <Route path='tat-ca' element={<AllStory/>}/>
      </Routes>
      <Footer/>
      <ToastContainer autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover={false} />
    </BrowserRouter>
  );
}

export default App;
