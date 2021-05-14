import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert } from 'reactstrap';
import { api } from '../../config';
import { Link } from 'react-router-dom';

export const VisualizarAnuncio = (props) => {        
    const [data, setData] = useState([]);
    const [id, setId] = useState(props.match.params.id);
    const [dataImg, setDataImg] = useState();
    
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    useEffect(() => {
        const getAnuncio = async () => {
            await axios.get(api + "/visualizar/" + id)
            .then((response) => {
                setData(response.data.anuncio);
                setDataImg(response.data.endImagem);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Falha: Conexão não realizada!'
                });   
            })    
        }

        getAnuncio();
    },[id]);

    return(
       
        <Container style={{ backgroundColor: '#F8F8FF'}}>

            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h1>Detalhes</h1>
                </div>                
                <div className="p-2">
                    <Link to={"/editar-anuncio-img/" + data.id} 
                    className="btn btn-dark btn-lg mr-3 mt-1">Imagem</Link>

                    <Link to={"/editar-anuncio/" + data.id} 
                    className="btn btn-dark btn-lg mr-3 mt-1">Editar</Link>     

                    <Link to={"/"} 
                    className="btn btn-dark btn-lg mt-1">Listar</Link>                                       
                </div>
            </div>  
            
            <hr className="m-1" />
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""} 

            <dl className="row">

            <div class="col-sm-5 col-sm-offset-1">                
                <dd className="col-sm-9" ><img src={dataImg} alt="Imagem do anúncio"  class="img-responsive" style={{width:'100%'}} /></dd>
            </div>

            <div class="col-sm-7">
                <dt className="col-sm-3">Id:</dt>
                <dd className="col-sm-9" style={{ color: '#000080' }}>{data.id}</dd>

                <dt className="col-sm-3">Título:</dt>
                <dd className="col-sm-9" style={{ color: '#000080' }}>{data.titulo}</dd>

                <dt className="col-sm-3">Descrição:</dt>
                <dd className="col-sm-9" style={{ color: '#000' }}>{data.descricao}</dd>
            </div>

            </dl>   

        </Container>
       
    );
};