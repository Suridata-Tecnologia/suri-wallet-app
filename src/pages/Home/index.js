import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import Menu from '../../components/Menu';

const Login = (props) => {
    return (
        <>
        <ToastContainer /> 
        <Menu /> 
        <div className="custom-container">                      
            
        </div>
        </>
    );
};

export default Login;
