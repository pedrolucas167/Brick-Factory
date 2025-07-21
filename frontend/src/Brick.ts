export interface Brick {
    id: number;
    color: 'branco' | 'preto';
    holes: string;
    status: 'EM_INSPECAO' | 'APROVADO' | 'REPROVADO';
    defective: boolean;
}