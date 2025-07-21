import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/Api';
import { Brick } from '../types/Brick';
import { AxiosResponse, AxiosError } from 'axios';

function Detalhes() {
    const { id } = useParams<{ id: string }>();
    const [brick, setBrick] = useState<Brick | null>(null);

    useEffect(() => {
        api.get(`/bricks/${id}`)
            .then((response: AxiosResponse<Brick>) => {
                setBrick(response.data);
            })
            .catch((error: AxiosError) => {
                console.error('Erro ao buscar tijolo:', error.response?.data);
            });
    }, [id]);

    const handleStatus = async (status: 'APROVADO' | 'REPROVADO') => {
        try {
            await api.put(`/bricks/${id}/status`, `"${status}"`, {
                headers: { 'Content-Type': 'application/json' },
            });
            alert(`Tijolo ${status.toLowerCase()} com sucesso!`);
            window.location.reload();
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Erro ao atualizar status:', axiosError.response?.data);
            alert('Erro: ' + (axiosError.response?.data as any)?.message);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/bricks/${id}`);
            alert('Tijolo deletado com sucesso!');
            window.location.href = '/';
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Erro ao deletar tijolo:', axiosError.response?.data);
            alert('Erro: ' + (axiosError.response?.data as any)?.message);
        }
    };

    if (!brick) return <div>Carregando...</div>;

    return (
        <div>
            <h1>Detalhes do Tijolo #{id}</h1>
            <p>Cor: {brick.color}</p>
            <p>Furos: {brick.holes}</p>
            <p>Status: {brick.status}</p>
            <p>Defeituoso: {brick.defective ? 'Sim' : 'Não'}</p>
            <button
                onClick={() => handleStatus('APROVADO')}
                disabled={brick.status !== 'EM_INSPECAO'}
            >
                Aprovar
            </button>
            <button
                onClick={() => handleStatus('REPROVADO')}
                disabled={brick.status !== 'EM_INSPECAO'}
            >
                Reprovar
            </button>
            <button
                onClick={handleDelete}
                disabled={!brick.defective}
            >
                Deletar
            </button>
        </div>
    );
}

export default Detalhes;