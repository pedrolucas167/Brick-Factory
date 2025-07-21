import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BrickList from './pages/BrickList';
import BrickForm from './pages/BrickForm';
import BrickDetails from './pages/BrickDetails';
import Report from './pages/Report';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Fábrica de Tijolos
          </Typography>
          <Button color="inherit" component={Link} to="/">Listagem</Button>
          <Button color="inherit" component={Link} to="/create">Criar</Button>
          <Button color="inherit" component={Link} to="/report">Relatório</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<BrickList />} />
          <Route path="/create" element={<BrickForm />} />
          <Route path="/brick/:id" element={<BrickDetails />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;