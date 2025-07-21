import React, { useState } from 'react';
import api from '../services/Api';
import { Brick } from '../types/Brick';
import { AxiosError } from 'axios';

function Criacao() {
    const [formData, setFormData] = useState<Partial<Brick>>({
        color: 'branco',
        holes: '1',
        status: 'EM_INSPECAO',
        defective: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/bricks', formData);
            alert('Tijolo criado com sucesso!');
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Erro ao criar tijolo:', axiosError.response?.data);
            alert('Erro ao criar tijolo: ' + (axiosError.response?.data as any)?.message);
        }
    };

    const handleRandom = async () => {
        try {
            await api.post('/bricks/random');
            alert('Tijolo aleatório criado!');
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Erro ao criar tijolo aleatório:', axiosError.response?.data);
            alert('Erro ao criar tijolo aleatório: ' + (axiosError.response?.data as any)?.message);
        }
    };

    return (
        <div>
            <h1>Criar Tijolo</h1>
            <form onSubmit={handleSubmit}>
                <select
                    value={formData.color}
                    onChange={e => setFormData({ ...formData, color: e.target.value as 'branco' | 'preto' })}
                >
                    <option value="branco">Branco</option>
                    <option value="preto">Preto</option>
                </select>
                <input
                    type="number"
                    value={formData.holes}
                    onChange={e => setFormData({ ...formData, holes: e.target.value })}
                    min="1"
                    max="8"
                />
                <button type="submit">Criar</button>
            </form>
            <button onClick={handleRandom}>Criar Aleatório</button>
        </div>
    );
}

export default Criacao;