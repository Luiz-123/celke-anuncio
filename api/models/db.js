const Sequelize = require('sequelize');

const sequelize = new Sequelize('celke', 'orion', 'estrelas', {
    host: 'localhost',
    dialect: 'mysql'
  });

  sequelize.authenticate()
  .then(function(){
      console.log("Banco de dados conectado!")
  }).catch(function(err){
      console.log("Falha na conexão com o banco de dados!");
  });

  module.exports = sequelize;