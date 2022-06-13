import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

import Menu from '../../components/Menu';

const Dashboard = (props) => {
    const [ dashboard, setDashboard ] = useState('');

    const notify = (message) => toast.success(message);
    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        async function findDashboard(){
            await api
            .get(`/reports/4`)
            .then((response) => {            
                setDashboard(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                notifyWarn(err.response.data.message);
            });
        }

        findDashboard();      
    }, []);

    return (
        <>
        <ToastContainer /> 
        <Menu /> 
        <div className="custom-container">                      
            <iframe src={`https://datastudio.google.com/embed/reporting/${dashboard.first_code}/page/${dashboard.second_code}`} title={dashboard.description} width="100vw" height="100vh"></iframe>
        </div>
        </>
    );
};

export default Dashboard;
