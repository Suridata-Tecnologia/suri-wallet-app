import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

import Menu from '../../components/Menu';

const Contestations = (props) => {
    const [ dashboard, setDashboard ] = useState('');

    const notify = (message) => toast.success(message);
    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        async function findDashboard(){
            await api
            .get(`/reports/4`)
            .then((response) => {            
                setDashboard(response.data);
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
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </table>               
        </div>
        </>
    );
};

export default Contestations;
