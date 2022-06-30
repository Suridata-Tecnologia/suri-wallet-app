import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';
import PolicyTerm from '../../components/PolicyTerm';
import Menu from '../../components/Menu';

const Dashboard = (props) => {
    const [ currentUser, setCurrentUser ] = useState();
    const [ dashboard, setDashboard ] = useState('');

    const { user_id } = useParams();

    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        function getResolution() {            
            return window.screen.width * window.devicePixelRatio
        }

        async function findDashboard(){
            const data =  { resolution: getResolution() };

            await api
            .post(`/reports/${user_id}`, data)
            .then((response) => {            
                setDashboard(response.data);
            })
            .catch((err) => {
                notifyWarn(err.response.data.message);
            });
        }

        findDashboard();   
        
        async function handleBeneficiaries(){
            await api
            .get(`/beneficiaries/${localStorage.getItem('uuid')}`)
            .then((response) => {            
                setCurrentUser(response.data);
            })
            .catch((err) => {
                notifyWarn(err.response.data.message);
            });
        }

        handleBeneficiaries();  
    }, [user_id]);

    return (
        <>
        {localStorage.getItem('rules') !== 'corretor' && localStorage.getItem('pts') === 'null' ? <PolicyTerm />: <div /> }
        <ToastContainer /> 
        <Menu /> 
        <div className="custom-container"> 
        { currentUser && currentUser.id === localStorage.getItem('uuid')  ? <iframe src={`https://datastudio.google.com/embed/reporting/${dashboard.first_code}/page/${dashboard.second_code}?params=%7B"EMPRESA":"${currentUser.company}","CPF":"${currentUser.cpf}"%7D`} title={dashboard.description} width="100vw" height="100vh"></iframe>: 'Carregando...'}                      
        </div>
        </>
    );
};

export default Dashboard;
