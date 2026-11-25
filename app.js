// app.js
import express from 'express';
import funcionarioRoutes from './routes/funcionarioRoutes.js';

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Direciona todas as requisições que começam com '/funcionarios' para o arquivo de rotas
app.use('/funcionarios', funcionarioRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
