import React from 'react';
import ReactDOM from 'react-dom/client';
import DealRoom from './components/DealRoom/DealRoom';
import InvestorHome from './components/InvestorHome';
import Login from './components/Login/Login';
import Registration from './components/InvestorRegistration/Registration';
import Home from './components/Home/Home';
import App from './App';
import StartupHome from './components/StartupHome/StartupHome';
import UserContextProvider from './contexts/userContextProvider';
import { useContext } from 'react';
import Upload from './components/StarupUpload/StartupForm';
import StartupForm from './components/StarupUpload/StartupForm';
import StartupShow from './components/StartupShow/StartupShow';
import InvestorProfile from './components/InvestorProfile/InvestorProfile';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
    <App/>
    </UserContextProvider>
    
  </React.StrictMode>
);


