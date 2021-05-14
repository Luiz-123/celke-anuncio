const express = require('express');
const app = express();
app.use(express.json());

const upload = require('./middlewares/uploadImgAnuncio');
const fs = require('fs');
const path = require('path');
app.use('/files', express.static(path.resolve(__dirname,"public","upload")));

const cors = require('cors');
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

const Anuncio = require('./models/Anuncio');

//const db = require('./models/db');


app.get('/', async (req, res) => {
    await Anuncio.findAll({order: [['id','DESC']]}).then(function(anuncios){
        res.json({anuncios});
    });
  });

app.get('/visualizar/:id', async (req, res) => {    
    await Anuncio.findByPk(req.params.id)
    .then(anuncio => {
            if(anuncio.imagem){
                var endImagem = "http://localhost:8081/files/anuncios/" + anuncio.imagem;
            }else{
                var endImagem = "http://localhost:8081/files/anuncios/icone_anuncio.jpg";
            }


        return res.json({
            error: false,
            anuncio: anuncio,
            endImagem
        });
    }).catch(function(erro){        
        return res.status(400).json({
            error: true,
            message: "Anúncio não encontrado!"
        });
    });
});  

app.post('/cadastrar', async (req, res) => {
    //Spinner de espera do envio do cadastro
    await sleep(1000);
    function sleep(ms){
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    };

    //Chamada para o cadastro
    const resultCad = await Anuncio.create(  
      req.body      
    ).then(function (){
        //res.send('Anúncio cadastrado com sucesso!');
        return res.json({
            error: false,
            message: "Anúncio cadastrado com sucesso!"
        });
    }).catch(function(erro){
        //res.send('Falha no envio do cadastro!');
        return res.status(400).json({
            error: true,
            message: "Falha no envio do cadastro!"
        });
    });
});  

app.put('/editar', async (req, res) => {
    await Anuncio.update(req.body, {
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Anúncio atualizado com sucesso!"      
        });          
    }).catch(function(erro){        
        return res.status(400).json({
            error: true,
            message: "Falha na atualização do anúncio!"
        });
    });    
});  

app.put('/editar-anuncio-img/:id', upload.single('imagem'), async (req, res) => {
    if(req.file) {
        await Anuncio.findByPk(req.params.id).then(anuncio => {           
            const imgAntiga = "./public/upload/anuncios/" + anuncio.dataValues.imagem;
            fs.access(imgAntiga, (err) => {
                if(!err){
                    fs.unlink(imgAntiga, () => {});
                }
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "Anúncio não encontrado!"      
            }); 
        });

        await Anuncio.update({imagem: req.file.filename},{where: {id: req.params.id}})
        .then(function(){
            return res.json({
                error: false,
                message: "Imagem do anúncio enviada com sucesso!"      
            });   
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "Falha ao enviar imagem para o servidor!"      
            }); 
        })         
    }else{
        return res.json({
            error: true,
            message: "Somente as extensões .JPG .JPEG .PNG são aceitas!"      
        }); 
    }    
});  
   
app.delete('/apagar/:id', async (req, res) => {
    await Anuncio.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Anúncio excluído com sucesso!"      
        });          
    }).catch(function(erro){        
        return res.status(400).json({
            error: true,
            message: "Falha na exclusão do anúncio!"
        });
    });        
});  
   
app.listen(8081, function(){
      console.log("Servidor rodando na porta 8081");
});

  