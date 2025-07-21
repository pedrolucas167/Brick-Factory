import React, { useEffect, useState } from 'react';
import { getBricks } from '../services/Api';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, FormControl, InputLabel, Select, MenuItem, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AxiosResponse, AxiosError } from 'axios';

interface Brick {
    id: number;
    color: string;
    holes: string;
    status: string;
    defective: boolean;
}

const BrickList: React.FC = () => {
    const [bricks, setBricks] = useState<Brick[]>([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [colorFilter, setColorFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        getBricks(page, size)
            .then((response: AxiosResponse) => {
                console.log('Resposta completa da API (BrickList):', response);
                console.log('response.data:', response.data);
                console.log('response.data.content:', response.data.content);
                console.log('Tipo de response.data.content:', Array.isArray(response.data.content) ? 'Array' : typeof response.data.content);
                const bricksData = Array.isArray(response.data.content) ? response.data.content : Array.isArray(response.data) ? response.data : [];
                setBricks(bricksData);
            })
            .catch((error: AxiosError) => {
                console.error('Erro ao buscar tijolos:', error.response?.data, error.response?.status);
                setBricks([]);
            });
    }, [page, size]);

    console.log('Estado bricks (BrickList):', bricks, 'Tipo:', Array.isArray(bricks) ? 'Array' : typeof bricks);

    const filteredBricks = bricks.filter(
        (brick) =>
            (!statusFilter || brick.status === statusFilter) &&
            (!colorFilter || brick.color === colorFilter) &&
            (!idFilter || brick.id.toString().includes(idFilter))
    );

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4">Listagem de Tijolos</Typography>
            <Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Status</InputLabel>
                    <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="EM_INSPECAO">Em Inspeção</MenuItem>
                        <MenuItem value="APROVADO">Aprovado</MenuItem>
                        <MenuItem value="REPROVADO">Reprovado</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Cor</InputLabel>
                    <Select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
                        <MenuItem value="">Todas</MenuItem>
                        <MenuItem value="branco">Branco</MenuItem>
                        <MenuItem value="preto">Preto</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Buscar por ID"
                    value={idFilter}
                    onChange={(e) => setIdFilter(e.target.value)}
                    type="number"
                />
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Cor</TableCell>
                        <TableCell>Furos</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Defeituoso</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredBricks.map((brick) => (
                        <TableRow key={brick.id}>
                            <TableCell>{brick.id}</TableCell>
                            <TableCell>{brick.color}</TableCell>
                            <TableCell>{brick.holes}</TableCell>
                            <TableCell>{brick.status}</TableCell>
                            <TableCell>{brick.defective ? 'Sim' : 'Não'}</TableCell>
                            <TableCell>
                                <Link to={`/brick/${brick.id}`}>Detalhes</Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box sx={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <Button onClick={() => setPage(page - 1)} disabled={page === 0}>Anterior</Button>
                <Button onClick={() => setPage(page + 1)}>Próximo</Button>
            </Box>
        </Box>
    );
};

export default BrickList;