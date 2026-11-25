import {
    listarFuncionarios,
    maiorSalario,
    buscarPorDepto,
    buscarPorCpf,
    adicionarFuncionario,
    atualizarFuncionario,
    removerFuncionario
} from '../models02/funcionarioModel.js';

// GET - Listar todos os funcionários
export function listar(req, res) {
    res.status(200).json(listarFuncionarios());
}

// GET - Listar o maior salário
export function listarMaiorSalario(req, res) {
    const funcionario = maiorSalario();

    if (!funcionario) {
        return res.status(404).json({
            mensagem: 'Nenhum funcionário cadastrado'
        });
    }

    res.status(200).json(funcionario);
}

// GET - Listar por departamento
export function listarPorDepto(req, res) {
    const depto = req.params.depto;

    const resultado = buscarPorDepto(depto);

    if (resultado.length > 0) {
        res.status(200).json(resultado);
    } else {
        res.status(404).json({
            mensagem: `Nenhum funcionário encontrado no departamento ${depto}`
        });
    }
}

// GET - Listar por CPF
export function listarPorCpf(req, res) {
    const cpf = req.params.cpf;

    const funcionario = buscarPorCpf(cpf);

    if (funcionario) {
        res.status(200).json(funcionario);
    } else {
        res.status(404).json({
            mensagem: `Funcionário não encontrado com CPF ${cpf}`
        });
    }
}

// POST - Cadastrar funcionário
export function cadastrar(req, res) {
    const { funcionario, cpf, depto, salario } = req.body;

    if (!funcionario || !cpf || !depto || salario === undefined) {
        return res.status(400).json({
            mensagem: 'Todos os campos são obrigatórios'
        });
    }

    const novoFuncionario = {
        funcionario,
        cpf,
        depto,
        salario
    };

    adicionarFuncionario(novoFuncionario);

    res.status(201).json(novoFuncionario);
}

// PUT - Alterar funcionário
export function alterar(req, res) {
    const cpf = req.params.cpf;

    const { funcionario, depto, salario } = req.body;

    if (!funcionario || !depto || salario === undefined) {
        return res.status(400).json({
            mensagem: 'Todos os campos são obrigatórios'
        });
    }

    const funcionarioAtualizado = atualizarFuncionario(cpf, {
        funcionario,
        depto,
        salario
    });

    if (!funcionarioAtualizado) {
        return res.status(404).json({
            mensagem: `Funcionário não encontrado com CPF ${cpf}`
        });
    }

    res.status(200).json(funcionarioAtualizado);
}

// DELETE - Excluir funcionário
export function excluir(req, res) {
    const cpf = req.params.cpf;

    const funcionarioRemovido = removerFuncionario(cpf);

    if (!funcionarioRemovido) {
        return res.status(404).json({
            mensagem: `Funcionário não encontrado com CPF ${cpf}`
        });
    }

    res.status(200).json({
        mensagem: `Funcionário com CPF ${cpf} removido com sucesso`,
        funcionario: funcionarioRemovido
    });
}