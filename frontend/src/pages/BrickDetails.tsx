import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBrickById, updateBrickStatus, deleteBrick } from '../services/Api';
import { Button, Typography, Box } from '@mui/material';

const BrickDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [brick, setBrick] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getBrickById(Number(id)).then((response) => {
      setBrick(response.data);
    }).catch(() => {
      setError('Tijolo não encontrado');
    });
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateBrickStatus(Number(id), newStatus);
      setBrick({ ...brick, status: newStatus, defective: newStatus === 'APROVADO' ? brick.defective : false });
      setError('');
    } catch (err) {
      setError('Erro ao atualizar status');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBrick(Number(id));
      alert('Tijolo deletado com sucesso!');
      navigate('/');
    } catch (err) {
      setError('Erro ao deletar tijolo: apenas tijolos defeituosos podem ser deletados');
    }
  };

  if (error) return <Typography color="error">{error}</Typography>;
  if (!brick) return <Typography>Carregando...</Typography>;

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4">Detalhes do Tijolo #{id}</Typography>
      <Typography>Cor: {brick.color}</Typography>
      <Typography>Furos: {brick.holes}</Typography>
      <Typography>Status: {brick.status}</Typography>
      <Typography>Defeituoso: {brick.defective ? 'Sim' : 'Não'}</Typography>
      {brick.status === 'EM_INSPECAO' && (
        <Box sx={{ marginTop: '20px' }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleStatusChange('APROVADO')}
            sx={{ marginRight: '10px' }}
          >
            Aprovar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleStatusChange('REPROVADO')}
          >
            Reprovar
          </Button>
        </Box>
      )}
      {brick.defective && (
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
          sx={{ marginTop: '20px' }}
        >
          Deletar Tijolo
        </Button>
      )}
    </Box>
  );
};

export default BrickDetails;