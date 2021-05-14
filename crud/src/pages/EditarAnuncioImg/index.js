import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Alert, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import { api } from '../../config';
import { Link } from 'react-router-dom';

export const EditarAnuncioImg = (props) => {    
    const [id, setId] = useState(props.match.params.id);
    const [imagem, setImagem] = useState('');
    const [endImagem, setEndImagem] = useState('');

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const headers = {
        'Content-Type': 'application/json'
    };

    const editarAnuncioImg = async e => {
        e.preventDefault();

        setStatus({formSave: true});
        
        const formData = new FormData();
        formData.append('imagem', imagem);

        await axios.put(api + "/editar-anuncio-img/" + id, formData, {headers})
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
        }).catch(() => {
            setStatus({
                formSave: false,
                type: 'error',
                message: 'Falha: Upload da imagem não realizado!'
            });             
        })
    }

    useEffect(() => {
        const getAnuncio = async () => {
            await axios.get(api + "/visualizar/" + id)
            .then((response) => {
                setEndImagem(response.data.endImagem);                
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
    <div>

    <Container style={{ backgroundColor: '#F8F8FF'}}>

        <div className="d-flex">
            <div className="mr-auto p-2">
                <h1>Edição de Imagem</h1>
            </div>                
            <div className="p-2">  
                <Link to={"/visualizar-anuncio/" + id}
                className="btn btn-dark btn-lg mr-3 mt-1">Visualizar</Link> 

                <Link to={"/editar-anuncio/" + id}
                className="btn btn-dark btn-lg mr-3 mt-1">Editar</Link> 

                <Link to={"/"} 
                className="btn btn-dark btn-lg mt-1">Listar</Link>                                       
            </div>
        </div>  

        <hr className="m-1" />
        {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""} 
        {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""} 


        <Form onSubmit={editarAnuncioImg}>
            <FormGroup>
                <Label>Imagem</Label>
                <Input type="file" name="imagem" onChange={e => setImagem(e.target.files[0])} />
            </FormGroup>

            <FormGroup>
                {status.formSave 
                ? <Button type="submit" outline color="secondary" className="btn btn-lg" disabled >
                    Enviando <Spinner size="sm" color="secondary" /></Button> 
                : <Button type="submit" outline color="info" className="btn btn-lg">Salvar</Button>
                }
            </FormGroup>

            <FormGroup>
                <div class="col-sm-4 col-sm-offset-1"> 
                {imagem 
                    ?<img src={URL.createObjectURL(imagem)} alt="Imagem do anúncio" width="400" height="400" class="img-responsive" style={{width:'100%'}}  />
                    :<img src={endImagem} alt="Imagem do anúncio" width="400" height="400" class="img-responsive" style={{width:'100%'}}  />
                }               
                </div>
            </FormGroup>

            <FormGroup>
                
            </FormGroup>            
        </Form>
        
    </Container>

    </div>
    );  
};