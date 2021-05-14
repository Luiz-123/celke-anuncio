import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import { api } from '../../config';
import { Link } from 'react-router-dom';

export const EditarAnuncio = (props) => {    
    const [id, setId] = useState(props.match.params.id);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    
    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const editAnuncio = async e => {
        e.preventDefault();

        setStatus({ formSave: true });

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/editar" , {id,titulo,descricao}, {headers})
        .then((response) => {
            if(response.data.error){
                setStatus({
                    formSave: false,
                    type: 'error',
                    message: response.data.message
                });    
            }else{
                setStatus({
                    formSave: false,
                    type: 'success',
                    message: response.data.message
                });                 
            }
        })
        .catch(() => {
            setStatus({
                formSave: false,
                type: 'error',
                message: 'Falha: Atualização de anúncio não enviada!'
            });    
        });
    };

    useEffect(() => {
        const getAnuncio = async () => {
            await axios.get(api + "/visualizar/" + id)
            .then((response) => {
                setTitulo(response.data.anuncio.titulo);
                setDescricao(response.data.anuncio.descricao);
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
                <h1>Edição</h1>
            </div>                
            <div className="p-2">  
                <Link to={"/editar-anuncio-img/" + id} 
                className="btn btn-dark btn-lg mr-3 mt-1">Imagem</Link>

                <Link to={"/visualizar-anuncio/" + id}
                className="btn btn-dark btn-lg mr-3 mt-1">Visualizar</Link> 

                <Link to={"/"} 
                className="btn btn-dark btn-lg mt-1">Listar</Link>                                       
            </div>
        </div>  

        <hr className="m-1" />
        {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""} 
        {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""} 

        <Form onSubmit={editAnuncio}>
            <FormGroup>
                <Label>Título</Label>
                <Input type="text" name="titulo" placeholder="Título do livro:" 
                  value={titulo} onChange={ e => setTitulo(e.target.value)}
                />
            </FormGroup>

            <FormGroup>
                <Label>Descrição</Label>
                <Input type="text" name="descricao" placeholder="Descrição do livro:" 
                  value={descricao} onChange={ e => setDescricao(e.target.value)} 
                />
            </FormGroup>
            
            {status.formSave 
            ? <Button type="submit" outline color="secondary" className="btn btn-lg" disabled >
                Enviando <Spinner size="sm" color="secondary" /></Button> 
            : <Button type="submit" outline color="info" className="btn btn-lg">Salvar</Button>
            }

        </Form>   

    </Container>

    );
};