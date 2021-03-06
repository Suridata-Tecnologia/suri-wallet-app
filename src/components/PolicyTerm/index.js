import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

const PolicyTerm = () => {
    const notify = (message) => toast.success(message);
    const notifyWarn = (message) => toast.warn(message);

    useEffect(()=>{
        document.getElementById('open-modal').click();
    }, [])

    async function handleAnswer(e){
        const { value } = e.target;
        const data = { 
            policy_term_status: value,
            policy_term_date: new Date()
        };

        await api.put(`/beneficiaries/policy_term/${localStorage.getItem('uuid')}`, data)
        .then((response) => { 
            localStorage.setItem('pts', '-');          
            document.getElementById('close').click();    
            
            notify("Resposta gravada!");
        })
        .catch((err) => {
            notifyWarn(err.response.data.message);
        });
    }

    return (
        <>        
                <div className="modal fade show" id="policy_term" tabIndex="-1" role="dialog" aria-labelledby="PolicyTermLabel" aria-hidden="true">
                <ToastContainer /> 
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="PolicyTermLabel">Política de privacidade</h5>
                        <span type="button" id="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">&times;</span>
                    </div>
                    <div className="modal-body" style={{ height:"700px", overflowY: "scroll", overflowX: "hidden" }}>
                        Esta política é válida a partir de Março de 2022.
                        <br/>
                        <br/>
                        <br/>
                        <h4>Política de Privacidade - Suridata</h4>

                        <br/><br/>Suridata, pessoa jurídica de direito privado leva a sua privacidade a sério e zela pela segurança e proteção de dados de todos os seus clientes, parceiros, fornecedores e usuários do site domínio https://www.suridata.com.br/ e qualquer outro site, portal ou aplicativo operado pela empresa.
                        <br/><br/>Esta Política de Privacidade destina-se a informá-lo sobre o modo como nós utilizamos e divulgamos informações coletadas em suas visitas à nossa Portal e em mensagens que trocamos com você.
                        <br/><br/>Esta Política de Privacidade aplica-se somente a informações coletadas por meio do Portal.
                        <br/><br/>AO ACESSAR O PORTAL, ENVIAR COMUNICAÇÕES OU FORNECER QUALQUER TIPO DE DADO PESSOAL, VOCÊ DECLARA ESTAR CIENTE COM RELAÇÃO AOS TERMOS AQUI PREVISTOS E DE ACORDO COM A POLÍTICA DE PRIVACIDADE, A QUAL DESCREVE AS FINALIDADES E FORMAS DE TRATAMENTO DE SEUS DADOS PESSOAIS QUE VOCÊ DISPONIBILIZAR NO PORTAL.
                        <br/><br/>Esta Política de Privacidade fornece uma visão geral de nossas práticas de privacidade e das escolhas que você pode fazer, bem como direitos que você pode exercer em relação aos Dados Pessoais tratados por nós. Se você tiver alguma dúvida sobre o uso de Dados Pessoais, entre em contato com lgpd@suridata.com.br.
                        <br/><br/>Além disso, a Política de Privacidade não se aplica a quaisquer aplicativos, produtos, serviços, site ou recursos de mídia social de terceiros que possam ser oferecidos ou acessados por meio do Portal. O acesso a esses links fará com que você deixe o nosso site e poderá resultar na coleta ou compartilhamento de informações sobre você por terceiros. Nós não controlamos, endossamos ou fazemos quaisquer representações sobre sites de terceiros ou suas práticas de privacidade, que podem ser diferentes das nossas. Recomendamos que você revise a política de privacidade de qualquer site com o qual você interaja antes de permitir a coleta e o uso de seus Dados Pessoais.
                        <br/><br/>Caso você nos envie Dados Pessoais referentes a outras pessoas físicas, você declara ter a competência para fazê-lo e declara ter obtido o consentimento necessário para autorizar o uso de tais informações nos termos desta Política de Privacidade.
                        
                        <br/><br/><br/><h5>Seção 1 - Definições</h5>

                        <br/>Para os fins desta Política de Privacidade:<br/>
                        <br/><div style={{ marginLeft:"18px" }}>1. "Dados Pessoais": significa qualquer informação que, direta ou indiretamente, identifique ou possa identificar uma pessoa natural, como por exemplo, nome, CPF, data de nascimento, endereço IP, dentre outros;</div>
                        <br/><div style={{ marginLeft:"18px" }}>2. "Dados Pessoais Sensíveis": significa qualquer informação que revele, em relação a uma pessoa natural, origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico;</div>
                        <br/><div style={{ marginLeft:"18px" }}>3. "Tratamento de Dados Pessoais": significa qualquer operação efetuada no âmbito dos Dados Pessoais, por meio de meios automáticos ou não, tal como a recolha, gravação, organização, estruturação, armazenamento, adaptação ou alteração, recuperação, consulta, utilização, divulgação por transmissão, disseminação ou, alternativamente, disponibilização, harmonização ou associação, restrição, eliminação ou destruição. Também é considerado Tratamento de Dados Pessoais qualquer outra operação prevista nos termos da legislação aplicável;</div>
                        <br/><div style={{ marginLeft:"18px" }}>4. "Leis de Proteção de Dados": significa todas as disposições legais que regulam o Tratamento de Dados Pessoais, incluindo, porém sem se limitar, a Lei nº 13.709/18, Lei Geral de Proteção de Dados Pessoais ("LGPD").</div>
                        
                        <br/><br/><br/><h5>Seção 2 - Uso de Dados Pessoais</h5>
                        
                        <br/>Coletamos e usamos Dados Pessoais para gerenciar seu relacionamento conosco e melhor atendê-lo quando você estiver adquirindo produtos e/ou serviços no Portal, personalizando e melhorando sua experiência. Exemplos de como usamos os dados incluem:<br/>
                        <br/><div style={{ marginLeft:"18px" }}>1.	Viabilizar que você adquira produtos e/ou serviços no Portal;</div>
                        <br/><div style={{ marginLeft:"18px" }}>2.	Para confirmar ou corrigir as informações que temos sobre você;</div>
                        <br/><div style={{ marginLeft:"18px" }}>3.	Para enviar informações que acreditamos ser do seu interesse;</div>
                        <br/><div style={{ marginLeft:"18px" }}>4.	Para personalizar sua experiência de uso do Portal;</div>
                        <br/><div style={{ marginLeft:"18px" }}>5.	Para entrarmos em contato por um número de telefone e/ou endereço de e-mail fornecido. Podemos entrar em contato com você pessoalmente, por mensagem de voz, através de equipamentos de discagem automática, por mensagens de texto (SMS), por e-mail, ou por qualquer outro meio de comunicação que seu dispositivo seja capaz de receber, nos termos da lei e para fins comerciais razoáveis.</div>
                        
                        <br/>Além disso, os Dados Pessoais fornecidos também podem ser utilizados na forma que julgarmos necessária ou adequada: (a) nos termos das Leis de Proteção de Dados; (b) para atender exigências de processo judicial; (c) para cumprir decisão judicial, decisão regulatória ou decisão de autoridades competentes, incluindo autoridades fora do país de residência; (d) para aplicar nossos Termos e Condições de Uso; (e) para proteger nossas operações; (f) para proteger direitos, privacidade, segurança nossos, seus ou de terceiros; (g) para detectar e prevenir fraude; (h) permitir-nos usar as ações disponíveis ou limitar danos que venhamos a sofrer; e (i) de outros modos permitidos por lei.
                        
                        <br/><br/><br/><h5>Seção 3 - Não fornecimento de Dados Pessoais</h5>
                        
                        <br/>Não há obrigatoriedade em compartilhar os Dados Pessoais que solicitamos. No entanto, se você optar por não os compartilhar, em alguns casos, não poderemos fornecer a você acesso completo à Portal, alguns recursos especializados ou ser capaz de prestar a assistência necessária ou, ainda, viabilizar a entrega do produto ou prestar o serviço contratado por você.
                        
                        <br/><br/><br/><h5>Seção 4 - Dados coletados</h5>

                        <br/><br/>O público em geral poderá navegar no Portal sem necessidade de qualquer cadastro e envio de Dados Pessoais. No entanto, algumas das funcionalidades do Portal poderão depender de cadastro e envio de Dados Pessoais como concluir a compra/contratação do serviço e/ou a viabilizar a entrega do produto/prestação do serviço por nós.
                        <br/><br/>No contato a Portal, nós podemos coletar:<br/>
                        <br/><div style={{ marginLeft:"18px" }}>1.	Dados de contato: nome, sobrenome, número de telefone, endereço, cidade, estado e endereço de e-mail;</div>
                        <br/><div style={{ marginLeft:"18px" }}>2.	Informações enviadas: informações que você envia via formulário (dúvidas, reclamações, sugestões, críticas, elogios etc.).</div>
                        
                        <br/>Na navegação geral no Portal, nós poderemos coletar:<br/>
                        <br/><div style={{ marginLeft:"18px" }}>1.	Dados de localização: dados de geolocalização quando você acessa a Portal;</div>
                        <br/><div style={{ marginLeft:"18px" }}>2.	Preferências: informações sobre suas preferências e interesses em relação aos produtos/serviços (quando você nos diz o que eles são ou quando os deduzimos do que sabemos sobre você);</div>
                        <br/><div style={{ marginLeft:"18px" }}>3.	Dados de navegação no Portal: informações sobre suas visitas e atividades, incluindo o conteúdo (e quaisquer anúncios) com os quais você visualiza e interage, informações sobre o navegador e o dispositivo que você está usando, seu endereço IP, sua localização, o endereço do site a partir do qual você chegou. Algumas dessas informações são coletadas usando nossas Ferramentas de Coleta Automática de Dados, que incluem cookies, web beacons e links da web incorporados. Para saber mais, leia como nós usamos Ferramentas de Coleta Automática de Dados na seção 7 abaixo;</div>
                        <br/><div style={{ marginLeft:"18px" }}>4.	Dados anônimos ou agregados: respostas anônimas para pesquisas ou informações anônimas e agregadas sobre como a Portal é usufruída. Durante nossas operações, em certos casos, aplicamos um processo de desidentificação ou pseudonimização aos seus dados para que seja razoavelmente improvável que você identifique você através do uso desses dados com a tecnologia disponível;</div>
                        <br/><div style={{ marginLeft:"18px" }}>5.	Outras informações que podemos coletar: informações que não revelem especificamente a sua identidade ou que não são diretamente relacionadas a um indivíduo, tais como informações sobre navegador e dispositivo; dados de uso do Portal; e informações coletadas por meio de cookies, pixel tags e outras tecnologias.</div>
                        <br/><br/>Nós não coletamos Dados Pessoais Sensíveis.
                        
                        <br/><br/><br/><h5>Seção 5 - Compartilhamento de Dados Pessoais com terceiros</h5>

                        <br/><br/>Nós poderemos compartilhar seus Dados Pessoais:<br/>
                        <br/><div style={{ marginLeft:"18px" }}>1.	Com a(s) empresa(s) parceira(s) que você selecionar ou optar em enviar os seus dados, dúvidas, perguntas etc., bem como com provedores de serviços ou parceiros para gerenciar ou suportar certos aspectos de nossas operações comerciais em nosso nome. Esses provedores de serviços ou parceiros podem estar localizados nos Estados Unidos, na Argentina, no Brasil ou em outros locais globais, incluindo servidores para homologação e produção, e prestadores de serviços de hospedagem e armazenamento de dados, gerenciamento de fraudes, suporte ao cliente, vendas em nosso nome, atendimento de pedidos, personalização de conteúdo, atividades de publicidade e marketing (incluindo publicidade digital e personalizada) e serviços de TI, por exemplo;</div>
                        <br/><div style={{ marginLeft:"18px" }}>2.	Com terceiros, com o objetivo de nos ajudar a gerenciar a Portal;</div>
                        <br/><div style={{ marginLeft:"18px" }}>3.	Com terceiros, caso ocorra qualquer reorganização, fusão, venda, joint venture, cessão, transmissão ou transferência de toda ou parte da nossa empresa, ativo ou capital (incluindo os relativos à falência ou processos semelhantes).</div>

                        <br/><br/><br/><h5>Seção 6 - Transferências internacionais de dados</h5>

                        <br/><br/>Dados Pessoais e informações de outras naturezas coletadas por nós podem ser transferidos ou acessados por entidades pertencentes ao grupo corporativo das empresas parceiras em todo o mundo de acordo com esta Política de Privacidade.
                        
                        <br/><br/><br/><h5>Seção 7 - Coleta automática de Dados Pessoais</h5>
                        
                        <br/><br/>Quando você visita a Portal, ela pode armazenar ou recuperar informações em seu navegador, principalmente na forma de cookies, que são arquivos de texto contendo pequenas quantidades de informação. Essas informações podem ser sobre você, suas preferências ou seu dispositivo e são usadas principalmente para que a Portal funcione como você espera. As informações geralmente não o identificam diretamente, mas podem oferecer uma experiência na internet mais personalizada.
                        <br/><br/>De acordo com esta Política de Privacidade, nós e nossos prestadores de serviços terceirizados, mediante seu consentimento, podemos coletar seus Dados Pessoais de diversas formas, incluindo, entre outros:
                        <br/><br/><div style={{ marginLeft:"18px" }}>1.	Por meio do navegador ou do dispositivo: algumas informações são coletadas pela maior parte dos navegadores ou automaticamente por meio de dispositivos de acesso à internet, como o tipo de computador, resolução da tela, nome e versão do sistema operacional, modelo e fabricante do dispositivo, idioma, tipo e versão do navegador de Internet que está utilizando. Podemos utilizar essas informações para assegurar que a Portal funcione adequadamente.</div>
                        <br/><div style={{ marginLeft:"18px" }}>2.	Uso de cookies: informações sobre o seu uso do Portal podem ser coletadas por terceiros a partir de cookies. Cookies são informações armazenadas diretamente no computador que você está utilizando. Os cookies permitem a coleta de informações tais como o tipo de navegador, o tempo despendido no Portal, as páginas visitadas, as preferências de idioma, e outros dados de tráfego anônimos. Nós e nossos prestadores de serviços utilizamos informações para proteção de segurança, para facilitar a navegação, exibir informações de modo mais eficiente, e personalizar sua experiência ao utilizar a Portal, assim como para rastreamento online. Também coletamos informações estatísticas sobre o uso do Portal para aprimoramento contínuo do nosso design e funcionalidade, para entender como a Portal é utilizada e para auxiliá-lo a solucionar questões relativas à Portal.
                        Caso não deseje que suas informações sejam coletadas por meio de cookies, há um procedimento simples na maior parte dos navegadores que permite que os cookies sejam automaticamente rejeitados, ou oferece a opção de aceitar ou rejeitar a transferência de um cookie (ou cookies) específico(s) de um site determinado para o seu computador. Entretanto, isso pode gerar inconvenientes no uso do Portal.
                        As definições que escolher podem afetar a sua experiência de navegação e o funcionamento que exige a utilização de cookies. Neste sentido, rejeitamos qualquer responsabilidade pelas consequências resultantes do funcionamento limitado do Portal provocado pela desativação de cookies no seu dispositivo (incapacidade de definir ou ler um cookie).</div>
                        <br/><div style={{ marginLeft:"18px" }}>3.	Uso de pixel tags e outras tecnologias similares: pixel tags (também conhecidos como Web beacons e GIFs invisíveis) podem ser utilizados para rastrear ações de usuários do Portal (incluindo destinatários de e-mails), medir o sucesso das nossas campanhas de marketing e coletar dados estatísticos sobre o uso do Portal e taxas de resposta, e ainda para outros fins não especificados. Podemos contratar empresas de publicidade comportamental, para obter relatórios sobre os anúncios do Portal em toda a internet. Para isso, essas empresas utilizam cookies, pixel tags e outras tecnologias para coletar informações sobre a sua utilização, ou sobre a utilização de outros usuários, da nossa Portal e de site de terceiros. Nós não somos responsáveis por pixel tags, cookies e outras tecnologias similares utilizadas por terceiros.</div>
                        
                        <br/><br/><br/><h5>Seção 8 - Categorias de cookies</h5>
                        
                        <br/><br/>Os cookies utilizados na nossa Portal estão de acordo com os requisitos legais e são enquadrados nas seguintes categorias:
                        <br/><br/><div style={{ marginLeft:"18px" }}>1.	Estritamente necessários: estes cookies permitem que você navegue pelo site e desfrute de recursos essenciais com segurança. Um exemplo são os cookies de segurança, que autenticam os usuários, protegem os seus dados e evitam a criação de logins fraudulentos.</div>
                        <br/><div style={{ marginLeft:"18px" }}>2.	Desempenho: os cookies desta categoria coletam informações de forma codificada e anônima relacionadas à nossa Portal virtual, como, por exemplo, o número de visitantes de uma página específica, origem das visitas ao site e quais as páginas acessadas pelo usuário. Todos os dados coletados são utilizados apenas para eventuais melhorias no site e para medir a eficácia da nossa comunicação.</div>
                        <br/><div style={{ marginLeft:"18px" }}>3.	Funcionalidade: estes cookies são utilizados para lembrar definições de preferências do usuário com o objetivo de melhorar a sua visita no nosso site, como, por exemplo, configurações aplicadas no layout do site ou suas respostas para pop-ups de promoções e cadastros -; dessa forma, não será necessário perguntar inúmeras vezes.</div>
                        <br/><div style={{ marginLeft:"18px" }}>4.	Publicidade: utilizamos cookies com o objetivo de criar campanhas segmentadas e entregar anúncios de acordo com o seu perfil de consumo na nossa Portal virtual.</div>

                        <br/><br/><br/><h5>Seção 9 - Direitos do Usuário</h5>
                        
                        <br/><br/>Você pode, a qualquer momento, requerer: (i) confirmação de que seus Dados Pessoais estão sendo tratados; (ii) acesso aos seus Dados Pessoais; (iii) correções a dados incompletos, inexatos ou desatualizados; (iv) anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com o disposto em lei; (v) portabilidade de Dados Pessoais a outro prestador de serviços, contanto que isso não afete nossos segredos industriais e comerciais; (vi) eliminação de Dados Pessoais tratados com seu consentimento, na medida do permitido em lei; (vii) informações sobre as entidades às quais seus Dados Pessoais tenham sido compartilhados; (viii) informações sobre a possibilidade de não fornecer o consentimento e sobre as consequências da negativa; e (ix) revogação do consentimento. Os seus pedidos serão tratados com especial cuidado de forma a que possamos assegurar a eficácia dos seus direitos. Poderá lhe ser pedido que faça prova da sua identidade de modo a assegurar que a partilha dos Dados Pessoais é apenas feita com o seu titular.
                        <br/><br/>Você deverá ter em mente que, em certos casos (por exemplo, devido a requisitos legais), o seu pedido poderá não ser imediatamente satisfeito, além de que nós poderemos não conseguir atendê-lo por conta de cumprimento de obrigações legais.
                        
                        <br/><br/><br/><h5>Seção 10 - Segurança dos Dados Pessoais</h5>
                        
                        <br/><br/>Buscamos adotar as medidas técnicas e organizacionais previstas pelas Leis de Proteção de Dados adequadas para proteção dos Dados Pessoais na nossa organização. Infelizmente, nenhuma transmissão ou sistema de armazenamento de dados tem a garantia de serem 100% seguros. Caso tenha motivos para acreditar que sua interação conosco tenha deixado de ser segura (por exemplo, caso acredite que a segurança de qualquer uma de suas contas foi comprometida), favor nos notificar imediatamente.
                        
                        <br/><br/><br/><h5>Seção 11 - Links de hipertexto para outros sites e redes sociais</h5>
                        
                        <br/><br/>A Portal poderá, de tempos a tempos, conter links de hipertexto que redirecionará você para sites das redes dos nossos parceiros, anunciantes, fornecedores etc. Se você clicar em um desses links para qualquer um desses sites, lembre-se que cada site possui as suas próprias práticas de privacidade e que não somos responsáveis por essas políticas. Consulte as referidas políticas antes de enviar quaisquer Dados Pessoais para esses sites.
                        <br/><br/>Não nos responsabilizamos pelas políticas e práticas de coleta, uso e divulgação (incluindo práticas de proteção de dados) de outras organizações, tais como Facebook, Apple, Google, Microsoft, ou de qualquer outro desenvolvedor de software ou provedor de aplicativo, Portal de mídia social, sistema operacional, prestador de serviços de internet sem fio ou fabricante de dispositivos, incluindo todos os Dados Pessoais que divulgar para outras organizações por meio dos aplicativos, relacionadas a tais aplicativos, ou publicadas em nossas páginas em mídias sociais. Nós recomendamos que você se informe sobre a política de privacidade de cada site visitado ou de cada prestador de serviço utilizado.
                        
                        <br/><br/><br/><h5>Seção 12 - Atualizações desta Política de Privacidade</h5>
                        
                        <br/><br/>Se modificarmos nossa Política de Privacidade, publicaremos o novo texto no Portal, com a data de revisão atualizada. Podemos alterar esta Política de Privacidade a qualquer momento. Caso haja alteração significativa nos termos desta Política de Privacidade, podemos informá-lo por meio das informações de contato que tivermos em nosso banco de dados ou por meio de notificação em nossa Portal.
                        <br/><br/>Recordamos que nós temos como compromisso não tratar os seus Dados Pessoais de forma incompatível com os objetivos descritos acima, exceto se de outra forma requerido por lei ou ordem judicial.
                        <br/><br/>Sua utilização do Portal após as alterações significa que aceitou as Políticas de Privacidade revisadas. Caso, após a leitura da versão revisada, você não esteja de acordo com seus termos, favor encerrar o acesso à Portal.
                        
                        <br/><br/><br/><h5>Seção 13 - Encarregado do tratamento dos Dados Pessoais</h5>
                        
                        <br/><br/>Caso pretenda exercer qualquer um dos direitos previstos, inclusive retirar o seu consentimento, nesta Política de Privacidade e/ou nas Leis de Proteção de Dados, ou resolver quaisquer dúvidas relacionadas ao Tratamento de seus Dados Pessoais, favor contatar-nos em lgpd@suridata.com.br.


                    </div>
                    <div className="modal-footer">
                        <input type="button" className="btn btn-danger" onClick={handleAnswer} value="Recusar" />
                        <input type="button" className="btn btn-success" onClick={handleAnswer} value="Aceitar" />
                    </div>
                    </div>
                </div>
            </div>
            <input type="hidden" id="open-modal" data-toggle="modal" data-target="#policy_term"/>
        </> 
    );
}

export default PolicyTerm;