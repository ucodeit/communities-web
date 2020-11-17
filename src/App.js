import {BrowserRouter as Router, Route } from 'react-router-dom';
import Inicio from  './views/inicio';


function App() {
  return (
    <Router>
        <Route path="/" exact component={Inicio}/>
    </Router>
  );
}

export default App;
