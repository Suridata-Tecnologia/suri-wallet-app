/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useNavigate  } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

const Menu = (props) => {
    const navigate = useNavigate(); 

    const user_id = localStorage.getItem('uuid');

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="navbar-brand logo" >
                <img src="https://portal.suridata.com.br/img/storage/suridata_logo_v4.png" width="55" />
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <label className="nav-link" onClick={() => navigate('/home')}>Inicio</label>
                </li>

                <li className="nav-item active">
                    <label className="nav-link" onClick={() => navigate('/profile')}>Perfil</label>
                </li>

                {localStorage.getItem('rules') === 'corretor' && 
                    <li className="nav-item dropdown">
                        <label className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Beneficiários
                        </label>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <label className="dropdown-item" onClick={() => navigate('/beneficiaries')}>Listar</label>
                            <label className="dropdown-item" onClick={() => navigate(`/contestations`)}>Contestações</label>
                        </div>
                    </li>
                }

                {localStorage.getItem('rules') === 'titular' || localStorage.getItem('rules') === 'beneficiario' ? 
                    <>
                        <li className="nav-item">
                            <label className="nav-link" onClick={() => navigate(`/dashboard/${user_id}`)}>Utilização</label>
                        </li>
                        
                        <li className="nav-item">
                            <label className="nav-link" onClick={() => navigate(`/contestations/${user_id}`)}>Contestações</label>
                        </li>
                    </>
                    : ''
                }
                </ul>                
            </div>
        </nav>
        </>
    );
};

export default Menu;
