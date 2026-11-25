
import * as funcionarioModel from '../models/funcionarioModel.js';

// GET /funcionarios
export const getFuncionarios = (req, res) => {
    const funcionarios = funcionarioModel.listarTodos();

    res.status(200).json(funcionarios);
};

// GET /funcionarios/depto/:depto
export const getFuncionariosPordepto = (req, res) => {
    const depto = req.params.depto.trim();

    const funcionariosDepto = funcionarioModel.buscarPordepto(depto);

    if (funcionariosDepto.length > 0) {
        res.status(200).json(funcionariosDepto);
    } else {
        res.status(404).json({
            mensagem: `Nenhum funcionário encontrado no departamento ${depto}`
        });
    }
};

// GET /funcionarios/cpf/:cpf
export const getFuncionarioPorCpf = (req, res) => {
    const cpf = req.params.cpf.trim();

    const funcionario = funcionarioModel.buscarPorcpf(cpf);

    if (funcionario) {
        res.status(200).json(funcionario);
    } else {
        res.status(404).json({
            mensagem: `Funcionário com CPF ${cpf} não encontrado`
        });
    }
};

// GET /funcionarios/salario/:salario
export const getFuncionariosPorSalario = (req, res) => {
    const salario = req.params.salario;

    const funcionariosSalario = funcionarioModel.buscarPorsalario(salario);

    if (funcionariosSalario.length > 0) {
        res.status(200).json(funcionariosSalario);
    } else {
        res.status(404).json({
            mensagem: `Nenhum funcionário encontrado com salário ${salario}`
        });
    }
};

// POST /funcionarios
export const postFuncionario = (req, res) => {
    const { nome, cpf, depto, salario } = req.body;

    if (!nome || !cpf || !depto || salario === undefined) {
        return res.status(400).json({
            mensagem: 'Todos os campos (nome, cpf, depto, salario) são obrigatórios.'
        });
    }

    const novoFuncionario = funcionarioModel.criar({
        nome,
        cpf,
        depto,
        salario
    });

    res.status(201).json(novoFuncionario);
};

// PUT /funcionarios/cpf/:cpf
export const putFuncionario = (req, res) => {
    const cpf = req.params.cpf.trim();
    const { nome, depto, salario } = req.body;

    if (!nome || !depto || salario === undefined) {
        return res.status(400).json({
            mensagem: 'Todos os campos (nome, depto, salario) devem ser informados.'
        });
    }

    const funcionarioAtualizado = funcionarioModel.atualizar(cpf, {
        nome,
        depto,
        salario
    });

    if (!funcionarioAtualizado) {
        return res.status(404).json({
            mensagem: `Funcionário com CPF ${cpf} não encontrado para atualização.`
        });
    }

    res.status(200).json(funcionarioAtualizado);
};

// DELETE /funcionarios/cpf/:cpf
export const deleteFuncionario = (req, res) => {
    const cpf = req.params.cpf.trim();

    const funcionarioRemovido = funcionarioModel.remover(cpf);

    if (!funcionarioRemovido) {
        return res.status(404).json({
            mensagem: `Funcionário com CPF ${cpf} não encontrado para exclusão.`
        });
    }

    res.status(200).json({
        mensagem: `Funcionário com CPF ${cpf} removido com sucesso.`,
        funcionario: funcionarioRemovido
    });
};
