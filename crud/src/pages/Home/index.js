import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'reactstrap';
import { api } from '../../config';
import { Link } from 'react-router-dom';

export const Home = () => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getAnuncios = async () => {
        await axios.get(api)
        .then((response) => {
            console.log(response.data.anuncios);
            setData(response.data.anuncios);
        })
        .catch(() => {
            setStatus({
                type: 'error',
                message: 'Falha: Conexão não realizada!'
            });           
        });
    };

    useEffect(() => {
        getAnuncios();
    },[]);

    const apagarAnuncio = async (idAnuncio) => {
        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.delete(api + "/apagar/" + idAnuncio, {headers} )
        .then((response) => {            
            if(response.data.error){
                setStatus({                
                    type: 'error',
                    message: response.data.message
                });                 
            }else{
                setStatus({                
                    type: 'success',
                    message: response.data.message
                }); 
                getAnuncios();
            }
        })
        .catch(() => {
            setStatus({                
                type: 'error',
                message: 'Falha: Anúncio não excluído!'
            }); 
        });
    };

    return(
        <div style={{ backgroundColor: '#F8F8FF'}}>
            <Container>

                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>Anúncios</h1>
                    </div>
                    <div className="p-2">
                        <Link to={"/cadastrar-anuncio/"} 
                        className="btn btn-dark btn-lg mt-1">Cadastrar</Link>                        
                    </div>
                </div>  

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""} 
                
                <Table striped hover>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Título</th>                    
                    <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td scope="row" style={{ color: '#000080' }}>{item.id}</td>
                           
                            <td>
                                <Link to={"/visualizar-anuncio/" + item.id} style={{ color: '#000080', textDecoration: 'inherit' }}> 
                                    {item.titulo} 
                                </Link>
                            </td>  

                            <td className="text-right">
                                <Link to={"/visualizar-anuncio/" + item.id} 
                                className="btn btn-outline-success btn-sm mr-1 mt-1">Visualizar</Link>

                                <Link to={"/editar-anuncio/" + item.id} 
                                className="btn btn-outline-primary btn-sm mr-1 mt-1">Editar</Link>
                               
                                <span className="btn btn-outline-danger btn-sm mr-1 mt-1" 
                                onClick={() => apagarAnuncio(item.id)}>Excluir</span>
                            </td>
                    </tr>
                    ))}                                        
                </tbody>
                </Table>   

            </Container>
        </div>
    );
};