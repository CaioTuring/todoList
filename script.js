'use strict'

const getBanco = () =>  JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBanco = (bancoDeDados) => localStorage.setItem('todoList', JSON.stringify(bancoDeDados));

const criarItem = (todo, status, indice) => {
    const tarefa = document.createElement('label');
    tarefa.classList.add('todo_item');
    tarefa.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${todo}<div/>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(tarefa);
}

const limparTarefas = () => {
    const todolist = document.getElementById('todoList');
    while (todolist.firstChild) {
        todolist.removeChild(todolist.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const bancoDeDados = getBanco();
    bancoDeDados.forEach ( (tarefa, indice) => criarItem (tarefa.tarefa, tarefa.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const bancoDeDados = getBanco();
        bancoDeDados.push ({'tarefa': texto, 'status': ''});
        setBanco(bancoDeDados);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const bancoDeDados = getBanco();
    bancoDeDados.splice (indice,1);
    setBanco(bancoDeDados);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const bancoDeDados = getBanco();
    bancoDeDados[indice].status = bancoDeDados[indice].status === '' ? 'checked' : '';
    setBanco(bancoDeDados);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    //console.log (elemento);
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }
    else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();