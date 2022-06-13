import React, { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import { FaUser, FaKey } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

import Menu from '../../components/Menu';

const Login = (props) => {
    return (
        <>
        <ToastContainer /> 
        <Menu /> 
        <div className="custom-container">                      
            teste
        </div>
        </>
    );
};

export default Login;
