import { chaveAPI } from "./API.js"
import { linkAPI } from "./API.js"
import { postAlunos } from "./API.js"
import { piscaInput } from "./exportFunctions.js"
import { getAlunos } from "./API.js"

const id = document.querySelector('input#postId')
const nome = document.querySelector('input#postNome')
const turma = document.querySelector('input#postTurma')
const botao = document.querySelector('button#novoAluno')

async function postar() {
    if(id.value != "" && nome.value != "" && turma.value != ""){

        try {

            botao.innerHTML = `
                <span class="carregamento"></span>
            `

            await postAlunos(linkAPI, chaveAPI, Number(id.value), String(nome.value).trim(), String(turma.value).trim().toUpperCase())

            botao.innerHTML = `
                Lançar
            `

            id.value = ''
            nome.value = ''
            turma.value = ''

            alert('Aluno adicionado com sucesso!')

        } catch (erro) {

            console.error(erro)

            alert('Erro ao adicionar aluno')

            botao.innerHTML = `
                Lançar
            `
        }

    } else {
        document.querySelectorAll('.postInputs').forEach(element => {
            if (element.value == ""){
                piscaInput(element)
            }
        })
    }
}

botao.addEventListener('click', () => postar())


// © 2025 Filipe Mairinck Vitorino. Todos os direitos reservados.