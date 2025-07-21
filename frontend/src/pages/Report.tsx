import React, { useEffect, useState } from 'react';
import { getBricks } from '../services/Api';
import { Brick } from '../types/Brick';
import { AxiosResponse, AxiosError } from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Typography, Box } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Relatorio: React.FC = () => {
    const [bricks, setBricks] = useState<Brick[]>([]);
    const [stats, setStats] = useState<{
        whiteEven: number;
        whiteOdd: number;
        blackEven: number;
        blackOdd: number;
        totalBlack: number;
        totalInspection: number;
        totalApproved: number;
        totalRejected: number;
    }>({
        whiteEven: 0,
        whiteOdd: 0,
        blackEven: 0,
        blackOdd: 0,
        totalBlack: 0,
        totalInspection: 0,
        totalApproved: 0,
        totalRejected: 0,
    });

    useEffect(() => {
        getBricks(0, 100)
            .then((response: AxiosResponse) => {
                console.log('Resposta completa da API (Relatório):', response);
                console.log('response.data:', response.data);
                console.log('response.data.content:', response.data.content);
                console.log('Tipo de response.data.content:', Array.isArray(response.data.content) ? 'Array' : typeof response.data.content);
                const bricksData = Array.isArray(response.data.content) ? response.data.content : Array.isArray(response.data) ? response.data : [];
                setBricks(bricksData);

                const calculatedStats = {
                    whiteEven: bricksData.filter((b: Brick) => b.color === 'branco' && parseInt(b.holes) % 2 === 0).length,
                    whiteOdd: bricksData.filter((b: Brick) => b.color === 'branco' && parseInt(b.holes) % 2 !== 0).length,
                    blackEven: bricksData.filter((b: Brick) => b.color === 'preto' && parseInt(b.holes) % 2 === 0).length,
                    blackOdd: bricksData.filter((b: Brick) => b.color === 'preto' && parseInt(b.holes) % 2 !== 0).length,
                    totalBlack: bricksData.filter((b: Brick) => b.color === 'preto').length,
                    totalInspection: bricksData.filter((b: Brick) => b.status === 'EM_INSPECAO').length,
                    totalApproved: bricksData.filter((b: Brick) => b.status === 'APROVADO').length,
                    totalRejected: bricksData.filter((b: Brick) => b.status === 'REPROVADO').length,
                };
                setStats(calculatedStats);
            })
            .catch((error: AxiosError) => {
                console.error('Erro ao buscar estatísticas:', error.response?.data, error.response?.status);
                setBricks([]);
                setStats({
                    whiteEven: 0,
                    whiteOdd: 0,
                    blackEven: 0,
                    blackOdd: 0,
                    totalBlack: 0,
                    totalInspection: 0,
                    totalApproved: 0,
                    totalRejected: 0,
                });
            });
    }, []);

    console.log('Estado bricks (Relatório):', bricks, 'Tipo:', Array.isArray(bricks) ? 'Array' : typeof bricks);
    console.log('Estado stats:', stats);

    const chartData = {
        labels: ['Brancos Pares', 'Brancos Ímpares', 'Pretos Pares', 'Pretos Ímpares', 'Total Pretos', 'Em Inspeção', 'Aprovados', 'Reprovados'],
        datasets: [
            {
                label: 'Quantidade de Tijolos',
                data: [
                    stats.whiteEven,
                    stats.whiteOdd,
                    stats.blackEven,
                    stats.blackOdd,
                    stats.totalBlack,
                    stats.totalInspection,
                    stats.totalApproved,
                    stats.totalRejected,
                ],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#4CAF50', '#F44336'],
                borderColor: ['#2A80B9', '#CC4B37', '#D4A017', '#3A9A9A', '#7F55DA', '#D47F00', '#388E3C', '#D32F2F'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4">Relatório Estatístico</Typography>
            <Typography>Tijolos Brancos com Furos Pares: {stats.whiteEven}</Typography>
            <Typography>Tijolos Brancos com Furos Ímpares: {stats.whiteOdd}</Typography>
            <Typography>Tijolos Pretos com Furos Pares: {stats.blackEven}</Typography>
            <Typography>Tijolos Pretos com Furos Ímpares: {stats.blackOdd}</Typography>
            <Typography>Total de Tijolos Pretos: {stats.totalBlack}</Typography>
            <Typography>Total de Tijolos em Inspeção: {stats.totalInspection}</Typography>
            <Typography>Total de Tijolos Aprovados: {stats.totalApproved}</Typography>
            <Typography>Total de Tijolos Reprovados: {stats.totalRejected}</Typography>
            <Box sx={{ marginTop: '20px', maxWidth: '800px' }}>
                <Bar
                    data={chartData}
                    options={{
                        scales: { y: { beginAtZero: true } },
                        plugins: { title: { display: true, text: 'Estatísticas de Tijolos' } },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Relatorio;