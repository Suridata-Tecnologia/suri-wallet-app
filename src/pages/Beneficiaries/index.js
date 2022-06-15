import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate  } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

import Menu from '../../components/Menu';

const Beneficiaries = (props) => {
    const [ beneficiaries, setBeneficiaries ] = useState([]);

    const navigate = useNavigate(); 
    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        async function handleBeneficiaries(){
            await api
            .get(`/beneficiaries`)
            .then((response) => {            
                setBeneficiaries(response.data);
            })
            .catch((err) => {
                notifyWarn(err.response.data.message);
            });
        }

        handleBeneficiaries();      
    }, []);

    return (
        <>
        <ToastContainer /> 
        <Menu /> 
        <div className="custom-container">                      
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">CPF</th>
                    <th scope="col">Nome</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Celular</th>
                    <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {beneficiaries.map(beneficiary => (
                        <tr key={beneficiary.id}>
                            <th scope="row">{beneficiary.cpf}</th>
                            <td>{beneficiary.name}</td>
                            <td>{beneficiary.email}</td>
                            <td>{beneficiary.phone}</td>
                            <td><button className="btn btn-dark" onClick={() => navigate(`/contestations/${beneficiary.id}`)}>Con</button><button className="btn btn-primary" onClick={() => navigate(`/dashboard/${beneficiary.id}`)}>Uti</button></td>
                        </tr> 
                    ))}                                       
                </tbody>
            </table>               
        </div>
        </>
    );
};

export default Beneficiaries;
