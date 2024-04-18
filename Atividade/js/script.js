// document.createElement  ( Cria um elemento HTML )

// innerHTML ( Define ou obtém a sintaxe HTML descrevendo os elementos descendentes )
 
// document.getElementById  ( Recupera algum elemento )

let listaDeCompras = [];
let indiceEdicao = -1;

function limpaCampos() {
    document.getElementById('item').value = '';
    document.getElementById('valor').value = '';
}

function salvar() {
    let item = document.getElementById('item').value;
    let valor = document.getElementById('valor').value;

    //validacoes de campos
    if (item.trim() === '' || valor.trim() === '') {
        alert('Por favor, preencha todos os campos.');
        return; // Aborta a função se algum campo estiver vazio
    }

    if (indiceEdicao >= 0) {
        let obj = listaDeCompras[indiceEdicao];
        obj.item = item;
        obj.valor = valor;
    } else {
        listaDeCompras.push(
            {'item': item, 'valor': valor}
        );
    }

    limpaCampos();
    atualizarTabela();

    indiceEdicao = -1;
}

function editarItem(indice) {
    indiceEdicao = indice;
    let obj = listaDeCompras[indice];

    document.getElementById('item').value = obj.item;
    document.getElementById('valor').value = obj.valor;
}

function excluirItem(indice) {
    let obj = listaDeCompras[indice];

    if (confirm(`Tem certeza que deseja excluir a cunsulta com ${obj.item}`)) {
        listaDeCompras.splice(indice, 1);
        atualizarTabela();
    }
}

function formatarDataHora(dataHora) {
    const data = new Date(dataHora);
    const dia = data.toLocaleDateString('pt-BR', { day: '2-digit' });
    const mes = data.toLocaleDateString('pt-BR', { month: '2-digit' });
    const ano = data.toLocaleDateString('pt-BR', { year: 'numeric' });
    const hora = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    return `${dia}/${mes}/${ano} ${hora}`;
}

function atualizarTabela() {

    let tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    listaDeCompras.forEach((i, indice) => {

        let tr = document.createElement('tr');

        tr.innerHTML = `
        <td> ${i.item} </td>
        <td> ${formatarDataHora(i.valor)}</td> </td>
        <td>
            <button
                type="button"
                onclick="editarItem(${indice})"
                class="material-symbols-outlined btn-icone">edit
            </button>

            <button 
                type="button"
                onclick="excluirItem(${indice})"
                class="material-symbols-outlined btn-icone">delete
            </button>

        </td>    
        `;

        tableBody.append(tr);
    });

}