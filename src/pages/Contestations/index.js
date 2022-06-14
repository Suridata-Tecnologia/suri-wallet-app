import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

import Menu from '../../components/Menu';

const Contestations = (props) => {
    const [ contestations, setContestations ] = useState([]);

    const { user_id } = useParams();

    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        async function findAllContestations(){
            var endpoint = '';
            if(user_id){ endpoint = `/contestations/${user_id}` }
            else{ endpoint = `/contestations` }

            await api
            .get(endpoint)
            .then((response) => {            
                setContestations(response.data);
            })
            .catch((err) => {
                notifyWarn(err.response.data.message);
            });
        }

        findAllContestations();      
    }, []);

    return (
        <>
        <ToastContainer /> 
        <Menu /> 
        <div className="custom-container">                      
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Código da utilização</th>
                    <th scope="col">Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {contestations.map(contestation => (
                        <tr>
                            <th scope="row">{contestation.id}</th>
                            <td>{contestation.utilizacao_code}</td>
                            <td>{contestation.description && contestation.description.substring(0, 20)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>               
        </div>
        </>
    );
};

export default Contestations;
