import React, { useState, useEffect } from "react";
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate  } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

import Menu from '../../components/Menu';

const Beneficiaries = (props) => {
    const [ beneficiaries, setBeneficiaries ] = useState([]);
    const [ cpf, setCpf ] = useState();

    const [ page, setPage ] = useState(1);

    const navigate = useNavigate(); 
    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        async function handleBeneficiaries(){
            const response = await api.get(`/beneficiaries?page=${page}&size=10`)
            if(!response){
                notifyWarn("Falhar ao listar beneficiários");
                return;
            }
            if(response.data.length === 0){setPage(page-1)}
            setBeneficiaries(response.data);
        }

        handleBeneficiaries();      
    }, [page]);

    function handleCpf(e){
        const { value } = e.target;

        setCpf(value);
    }

    async function handleSearch(){
        const response = await api.get(`/beneficiaries/search/${cpf}`)
        if(!response){
            notifyWarn("Falhar ao buscar beneficiário");
            return;
        }
        setBeneficiaries([response.data]);        
    }

    return (
        <>
        <ToastContainer /> 
        <Menu /> 
        <div className="container">
            <br />
            <h1>Lista de beneficiários</h1>
            <hr />
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Buscar por CPF" onChange={handleCpf} value={cpf || ''} aria-label="Buscar por CPF" aria-describedby="Buscar por CPF" />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={handleSearch}><FaSearch />Buscar</button>
                </div>
            </div>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>CPF</th>
                        <th>Beneficiario</th>
                    </tr>
                </thead>
                <tbody>
                {beneficiaries.map(beneficiary => (
                    beneficiary.id !== localStorage.getItem('uuid') && 
                    <tr key={beneficiary.id}>
                        <th scope="row">{beneficiary.cpf}</th>
                        <td>{beneficiary.name}</td>                        
                    </tr>                     
                ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><input type="button" className="page-link" value="Voltar" onClick={ () => page <= 0 ? 1 : setPage(page - 1) } /></li>
                    <li className="page-item"><input type="button" className="page-link" value="Avançar" onClick={ () => setPage(page + 1)  } /></li>
                </ul>
            </nav>
            </div>
        </>
    );
};

export default Beneficiaries;
