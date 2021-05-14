import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home/index';
import { VisualizarAnuncio } from './pages/VisualizarAnuncio/index';
import { CadastrarAnuncio } from './pages/CadastrarAnuncio/index';
import { EditarAnuncio } from './pages/EditarAnuncio/index';
import { EditarAnuncioImg } from './pages/EditarAnuncioImg/index';
import { Menu } from './components/Menu';

function App() {
  return (
    <div>
      <Menu />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/visualizar-anuncio/:id" component={VisualizarAnuncio} />
          <Route path="/cadastrar-anuncio" component={CadastrarAnuncio} />
          <Route path="/editar-anuncio/:id" component={EditarAnuncio} />
          <Route path="/editar-anuncio-img/:id" component={EditarAnuncioImg} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
