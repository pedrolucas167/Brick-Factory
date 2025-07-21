import React, { useState } from 'react';
import { createBrick, createRandomBrick } from '../services/Api';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';

const BrickForm: React.FC = () => {
  const [brick, setBrick] = useState({ color: 'branco', holes: '1' });
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      await createBrick({ ...brick, status: 'EM_INSPECAO', defective: false });
      alert('Tijolo criado com sucesso!');
      setBrick({ color: 'branco', holes: '1' });
      setError('');
    } catch (err) {
      setError('Erro ao criar tijolo');
    }
  };

  const handleRandom = async () => {
    try {
      await createRandomBrick();
      alert('Tijolo aleatório criado com sucesso!');
      setError('');
    } catch (err) {
      setError('Erro ao criar tijolo aleatório');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4">Criar Tijolo</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <FormControl fullWidth margin="normal">
        <InputLabel>Cor</InputLabel>
        <Select
          value={brick.color}
          onChange={(e) => setBrick({ ...brick, color: e.target.value })}
        >
          <MenuItem value="branco">Branco</MenuItem>
          <MenuItem value="preto">Preto</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Número de Furos"
        type="number"
        value={brick.holes}
        onChange={(e) => setBrick({ ...brick, holes: e.target.value })}
        inputProps={{ min: 1, max: 6 }}
        fullWidth
        margin="normal"
      />
      <Box sx={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginRight: '10px' }}>
          Criar Tijolo
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleRandom}>
          Criar Tijolo Aleatório
        </Button>
      </Box>
    </Box>
  );
};

export default BrickForm;