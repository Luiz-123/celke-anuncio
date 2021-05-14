import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import { api } from '../../config';
import { Link } from 'react-router-dom';

export const CadastrarAnuncio = () => {
    const [anuncio, setAnuncio] = useState({        
        titulo: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const valorInput = e => setAnuncio({...anuncio, [e.target.name]:e.target.value});

    const cadAnuncio = async e => {
        e.preventDefault();

        setStatus({ formSave: true });

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.post(api + "/cadastrar", anuncio, {headers})
        .then((response) => {
            if(response.data.error){
                setStatus({
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
                message: 'Falha: Cadastro de anúncio não enviado!'
            });              
        });       
    };

    return(
           
        <Container style={{ backgroundColor: '#F8F8FF'}}>

            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h1>Cadastro</h1>
                </div>                
                <div className="p-2">
                    <Link to={"/"} 
                    className="btn btn-dark btn-lg mt-1">Listar</Link>                        
                </div>
            </div> 

            <hr className="m-1" />
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""} 
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""} 

            <Form onSubmit={cadAnuncio}>
                <FormGroup>
                    <Label>Título</Label>
                    <Input type="text" name="titulo" placeholder="Título do livro:" onChange={valorInput} />
                </FormGroup>

                <FormGroup>
                    <Label>Descrição</Label>
                    <Input type="text" name="descricao" placeholder="Descrição do livro:" onChange={valorInput} />
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