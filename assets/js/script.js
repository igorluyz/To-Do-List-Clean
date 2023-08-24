
// Toda vez que quero pegar algo do meu html, preciso criar uma constante e usar o document.

// Pegando o button
 const button = document.querySelector(".button-add-task")

// Pegando o texto do input
 const input = document.querySelector(".input-task")

// Pegando minha UL para inserir a Li
 const listaCompleta = document.querySelector(".list-tasks")

//  Array que sera adicionado as listas
 let minhaListaItens = []

//  Função que será chamada ao clicar no button e adicionara a tarefa.
function adicionarTarefa(){
    // Verifica se o valor do input está vazio
    if (input.value.trim() === "") {
        alert("Por favor, insira uma tarefa antes de adicionar.");
        return; // Sai da função se o input estiver vazio
    }
    // O método push() adiciona um ou mais elementos ao final de um array
    minhaListaItens.push({tarefa: input.value, concluida: false})
    mostrarTarefa()
}

// Função responsável por criar de forma dinâmica nossas Li
function mostrarTarefa(){

    let novaLi = ''
    minhaListaItens.forEach((item, index) => {
        novaLi = novaLi + `
            <li class="task ${item.concluida && "done"}">
                <img src="./assets/images/checked.png" alt="check-tarefa" onclick="concluirTarefa(${index})">
                <p>${item.tarefa}</p>
                <img src="./assets/images/trash.png" alt="delete-tarefa" onclick="deletarItem(${index})">
            </li>
        `
    }    )

    // Adicionando nossa Li a nossa UL lá no HTML através do Inner.Html
    listaCompleta.innerHTML = novaLi;

    //Função que vai limpar nosso input 
    limparInput()

    // localStorage.setItem sintaxe -->(nome, o que eu quero guardar.) 
    // JSON.stringify ele transforma tudo dentro dele em string
    localStorage.setItem('lista', JSON.stringify(minhaListaItens))
}

limparInput = () => {
    input.value="" // Limpa a caixa de entrada
}

function concluirTarefa(index){
    // Tornando nossa propiedade concluida como false para adicionar a classe
    minhaListaItens[index].concluida = !minhaListaItens[index].concluida;

    mostrarTarefa()
}

deletarItem = (index) => {
    minhaListaItens.splice(index , 1);
    mostrarTarefa()
}

recarregarTarefas = () => {
    const tarefasSalvasLocalmente = localStorage.getItem('lista');

    if(tarefasSalvasLocalmente){
        minhaListaItens = JSON.parse(tarefasSalvasLocalmente) 
        // JSON.PARSE ele transforma tudo dentro dele em OBJECT
    }

    mostrarTarefa()
}

recarregarTarefas();

 button.addEventListener('click', adicionarTarefa);