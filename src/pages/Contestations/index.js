import React, { useState, useEffect } from "react";
import { FaEdit, FaSearch } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

import api from '../../services/api';

import Menu from '../../components/Menu';

const Contestations = (props) => {
    const [ contestations, setContestations ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ utiCode, setUtiCode ] = useState();

    const navigate = useNavigate();
    const { user_id } = useParams();

    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        async function findAllContestations(){
            var endpoint = '';
            if(user_id){ endpoint = `/contestations/${user_id}` }
            else{ endpoint = `/contestations/find/${localStorage.getItem('hb_id')}` }

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
    }, [user_id]);

    function handleUtiCode(e){
        const { value } = e.target;

        setUtiCode(value);
    }

    async function handleSearch(){
        const response = await api.get(`/contestations/search/${utiCode}`)
        if(!response){
            notifyWarn("Falhar ao buscar beneficiário");
            return;
        }
        setContestations(response.data);        
    }

    return (
        <>
        <ToastContainer /> 
        <Menu /> 
        <div className="container">
            <br />
            <h1>Lista de contestações</h1>
            <hr />
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Buscar por código de utilização" onChange={handleUtiCode} value={utiCode || ''} aria-label="Buscar por código de utilização" aria-describedby="Buscar por código de utilização" />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={handleSearch}><FaSearch />Buscar</button>
                </div>
            </div>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Beneficiário</th>                        
                        <th>Solicitação</th>
                        <th>Tipo de evento</th>
                        <th>Descrição serviço</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                {contestations.map(contestation => (
                    <tr key={contestation.id}>
                        <th scope="row">{contestation.name}</th>                        
                        <td>{contestation.description && contestation.description.substring(0, 20)}</td>
                        <td>{JSON.parse(contestation.params)['Tipo_Evento']}</td>
                        <td>{JSON.parse(contestation.params)['Descricao_Operadora']}</td>
                        <th>{contestation.status}</th>    
                        <td>
                            <div className="btn-toolbar justify-content-between" role="toolbar" aria-label="with button groups">
                                <div className="btn-group" role="group" aria-label="First group">
                                    <button type="button" className="btn btn-dark" onClick={() => navigate(`/contestations/form/${contestation.cpf}_${contestation.utilizacao_code}?params=${JSON.stringify(contestation.params).replaceAll("\\", "")}`)} title="Contestação"><FaEdit /></button>
                                </div>
                            </div>
                        </td>
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

export default Contestations;
