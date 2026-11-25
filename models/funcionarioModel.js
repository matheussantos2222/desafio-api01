
 // Base de dados em memória
const funcionarios = [
    { funcionario: "Jose Silva", cpf: "123.456.789-00", depto: "D1", salario: 3.55 },
    { funcionario: "Maria Souza", cpf: "987.654.321-00", depto: "D2", salario: 4.25 },
    { funcionario: "João Santos", cpf: "456.789.123-00", depto: "D1", salario: 3.8 },
    { funcionario: "Ana Oliveira", cpf: "321.654.987-00", depto: "D3", salario: 4.1 },
    { funcionario: "Carlos Lima", cpf: "789.123.456-00", depto: "D2", salario: 3.9 }
];

// Retorna todos os funcionários
export const listarTodos = () => {
    return funcionarios;
};

// Busca funcionários por departamento
export const buscarPordepto = (depto) => {
    return funcionarios.filter(
        f => f.depto.toLowerCase() === depto.toLowerCase()
    );
};

// Busca funcionário pelo CPF
export const buscarPorcpf = (cpf) => {
    return funcionarios.find(f => f.cpf === cpf);
};

// Busca funcionários pelo salário
export const salario = (salario) => {
    return funcionarios.filter(
        f => f.salario === parseFloat(salario)
    );
};

// Cria um novo funcionário
export const criar = ({ nome, salario, cpf, depto }) => {
    const novoFuncionario = {
        funcionario: nome,
        cpf: cpf,
        depto: depto,
        salario: parseFloat(salario)
    };

    funcionarios.push(novoFuncionario);
    return novoFuncionario;
};

// Atualiza um funcionário pelo CPF
export const atualizar = (cpf, { nome, depto, salario }) => {
    const index = funcionarios.findIndex(f => f.cpf === cpf);

    if (index === -1) return null;

    funcionarios[index] = {
        cpf: cpf,
        funcionario: nome,
        depto: depto,
        salario: parseFloat(salario)
    };

    return funcionarios[index];
};

// Remove um funcionário pelo CPF
export const remover = (cpf) => {
    const index = funcionarios.findIndex(f => f.cpf === cpf);

    if (index === -1) return null;

    const [funcionarioRemovido] = funcionarios.splice(index, 1);

    return funcionarioRemovido;
};
