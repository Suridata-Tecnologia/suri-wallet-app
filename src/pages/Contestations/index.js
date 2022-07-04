import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
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

    const notify = (message) => toast.success(message);
    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        async function findAllContestations(){
            var endpoint = '';
            
            if(user_id){ 
                await api
                .get(`/contestations/${user_id}`)
                .then((response) => {       
                    setContestations(response.data);
                })
                .catch((err) => {
                    notifyWarn(err.response.data.message);
                });
            }
            else{ 
                const data = {
                    health_id: localStorage.getItem('hb_id'),
                    user_id: localStorage.getItem('uuid'), 
                    rules: localStorage.getItem('rules')
                };

                await api
                .get(`/contestations/find`, data)
                .then((response) => {       
                    setContestations(response.data);
                })
                .catch((err) => {
                    notifyWarn(err.response.data.message);
                });
            }

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
        const data = {
            health_id: localStorage.getItem('hb_id'),
            user_id: localStorage.getItem('uuid'), 
            rules: localStorage.getItem('rules'),
            term: utiCode,
            
        }
        const response = await api.post(`/contestations/search/`, data)
        if(!response){
            notifyWarn("Falhar ao buscar beneficiário");
            return;
        }
        setContestations(response.data);        
    }

    async function handleRemoveContestation(contestation){
        await api
        .put(`/contestations/remove/${contestation.id}`, { status:'Cancelada', reason_cancellation: contestation.reason_cancellation })
        .then((response) => {            
            document.getElementById(`cancelButton${contestation.id}`).click();

            const contestationId = response.data.id;
            setContestations(current =>
              current.filter(con => {
                return con.id !== contestationId;
              }),
            );
            notify('Contestação cancelada!');
        })
        .catch((err) => {
            notifyWarn(err.response.data.message);
        });
    }

    function handleContestationChange(e, i){        
        const { value } = e.target;        

        let list = [ ...contestations ];
        list[i].reason_cancellation = value;        
        setContestations(list);        
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
                <input type="text" className="form-control" placeholder="Buscar por nome ou status" onChange={handleUtiCode} value={utiCode || ''} aria-label="Buscar por nome ou status" aria-describedby="Buscar por nome ou status" />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={handleSearch}><FaSearch />Buscar</button>
                </div>
            </div>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Nome</th>                        
                        <th>Solicitação</th>
                        <th>Tipo do atendimento</th>
                        <th>Descrição do atendimento</th>
                        <th>Email</th>
                        <th>Celular</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                {contestations.map((contestation, i) => (
                    <tr key={contestation.id}>
                        <th scope="row">{contestation.name}</th>                        
                        <td>{contestation.description && contestation.description.substring(0, 20)}</td>
                        <td>{JSON.parse(contestation.params)['Tipo_Evento']}</td>
                        <td>{JSON.parse(contestation.params)['Descricao_Operadora']}</td>
                        <th>{contestation.email}</th> 
                        <th>{contestation.phone}</th> 
                        <th>{contestation.status}</th>    
                        <td>
                            <div className="btn-toolbar justify-content-between" role="toolbar" aria-label="with button groups">
                                <div className="btn-group" role="group" aria-label="First group">
                                    <button type="button" className="btn btn-dark" onClick={() => navigate(`/contestations/form/${contestation.cpf}_${contestation.utilizacao_code}?params=${JSON.stringify(contestation.params).replaceAll("\\", "")}`)} title="Contestação"><FaEdit /></button>
                                    { localStorage.getItem('uuid') === contestation.user_id && <button type="button" className="btn btn-danger"  data-toggle="modal" data-target={`#cancelModal${contestation.id}`} onClick={() => {}} title="Cancelar contestação"><FaTrash /></button>}
                                    <div className="modal fade" id={`cancelModal${contestation.id}`} tabIndex="-1" role="dialog" aria-labelledby={`cancelModal${contestation.id}`} aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="passModalLabel">Cancelar contestação</h5>
                                                <button type="button" data-dismiss="modal" aria-label="Close" style={{ border: 'none', background: 'transparent'}}>
                                                x
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="mb-3 row">
                                                    <label className="form-label col-form-label col-sm-4">Motivo do cancelamento</label>
                                                    <textarea placeholder="Digite o motivo do cancelamento" className="form-control" name={`reason_cancellation`} value={contestation.reason_cancellation || ''} onChange={(e) => handleContestationChange(e, i)}>{contestation.reason_cancellation}</textarea>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <input type="button" className="btn btn-dark" onClick={()=>handleRemoveContestation(contestation)} defaultValue="Concluir" />
                                                <input type="button" className="btn btn-danger" id={`cancelButton${contestation.id}`} data-dismiss="modal" defaultValue="Voltar" />                
                                            </div>
                                            </div>
                                        </div>
                                    </div>
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
