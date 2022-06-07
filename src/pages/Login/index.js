import React from "react";
import { FaUser } from 'react-icons/fa';

import './styles.css';

const Login = () => {
  return (
    <div className="container">
        <div className="d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-body">
                    <div className="card-header">
                        <img src="https://portal.suridata.com.br/img/suridata_logo_v6.png" alt="Logo login" width="100px" />
                    </div>
                    <hr />
                    <form>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><FaUser /></span>
                            </div>
                            <input type="text" className="form-control input-group-text" placeholder="Digite seu CPF" />                            
                        </div>                        
                        <div className="button-group">
                            <input type="submit" value="Buscar" className="btn btn-dark" />
                        </div>
                    </form>
                </div>           
            </div>
        </div>
    </div>
  );
};

export default Login;
