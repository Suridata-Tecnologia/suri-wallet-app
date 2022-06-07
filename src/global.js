import { createGlobalStyle } from "styled-components";
import styled from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    body{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        background: #fff;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
    html, body, #root{
        height: 100%;
        width: 100%;
    }
    
    @keyframes fade{
        from{
            opacity: 0;
        }to{
            opacity: 1;
        }
    }
    @keyframes move-right{
        from{
            transform: translateX(-100%);        
        }to{
            transform: translateX(0);
        } 
    }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
