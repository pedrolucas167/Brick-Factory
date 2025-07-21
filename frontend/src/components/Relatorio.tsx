import React, { useEffect, useState } from 'react';
import { getBricks } from '../services/Api';
import { Brick } from '../types/Brick';
import { AxiosResponse, AxiosError } from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Relatorio() {
    const [bricks, setBricks] = useState<Brick[]>([]);

    useEffect(() => {
        getBricks(0, 100)
            .then((response: AxiosResponse) => {
                console.log('Resposta completa da API (Relatório):', response);
                console.log('response.data:', response.data);
                console.log('response.data.content:', response.data.content);
                console.log('Tipo de response.data.content:', Array.isArray(response.data.content) ? 'Array' : typeof response.data.content);
                const bricksData = Array.isArray(response.data.content) ? response.data.content : Array.isArray(response.data) ? response.data : [];
                setBricks(bricksData);
            })
            .catch((error: AxiosError) => {
                console.error('Erro ao buscar estatísticas:', error.response?.data);
                setBricks([]);
            });
    }, []);

    console.log('Estado bricks (Relatório):', bricks, 'Tipo:', Array.isArray(bricks) ? 'Array' : typeof bricks);
    const stats = {
        whiteEven: bricks.filter(b => b.color === 'branco' && parseInt(b.holes) % 2 === 0).length,
        whiteOdd: bricks.filter(b => b.color === 'branco' && parseInt(b.holes) % 2 !== 0).length,
        blackEven: bricks.filter(b => b.color === 'preto' && parseInt(b.holes) % 2 === 0).length,
        blackOdd: bricks.filter(b => b.color === 'preto' && parseInt(b.holes) % 2 !== 0).length,
        approved: bricks.filter(b => b.status === 'APROVADO').length,
        rejected: bricks.filter(b => b.status === 'REPROVADO').length,
        inspecting: bricks.filter(b => b.status === 'EM_INSPECAO').length,
        defective: bricks.filter(b => b.defective).length,
    };

    const chartData = {
        labels: ['Brancos Pares', 'Brancos Ímpares', 'Pretos Pares', 'Pretos Ímpares'],
        datasets: [{
            label: 'Estatísticas de Tijolos',
            data: [stats.whiteEven, stats.whiteOdd, stats.blackEven, stats.blackOdd],
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
        }],
    };

    return (
        <div>
            <h1>Relatório de Tijolos</h1>
            <p>Brancos com furos pares: {stats.whiteEven}</p>
            <p>Brancos com furos ímpares: {stats.whiteOdd}</p>
            <p>Pretos com furos pares: {stats.blackEven}</p>
            <p>Pretos com furos ímpares: {stats.blackOdd}</p>
            <p>Aprovados: {stats.approved}</p>
            <p>Reprovados: {stats.rejected}</p>
            <p>Em inspeção: {stats.inspecting}</p>
            <p>Defeituosos: {stats.defective}</p>
            <Bar data={chartData} />
        </div>
    );
}

export default Relatorio;