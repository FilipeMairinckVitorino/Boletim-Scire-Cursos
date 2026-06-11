import { linkAPI } from "./API.js";
import { chaveAPI } from "./API.js";
import { getAlunos } from "./API.js";
import { filtraAlunos, piscaInput } from "./exportFunctions.js";
import { patchAlunos } from "./API.js";


const botaoPost = document.querySelector('button.post')
const inputId = document.querySelector('input.id')
const inputTurma = document.querySelector('input.turma')


export function escreveTabelaInput(alunos){
    let tabela = document.querySelector('tbody')
    tabela.innerHTML = ""

    if(alunos.length == 0){
        alert('CTR ou Turma Incorreto(s)')
    } else {
        alunos.forEach(aluno => {
            tabela.innerHTML += `
                <tr>
                    <td class="id">${aluno.id}</td>
                    <td class="nome">${aluno.nome}</td>
                    <td class="turma">${aluno.turma}</td>
                    <td class="bim1"><input type="number" class="bim1" value="${aluno.bim1}"></td>
                    <td class="bim2"><input type="number" class="bim2" value="${aluno.bim2}"></td>
                    <td class="bim3"><input type="number" class="bim3" value="${aluno.bim3}"></td>
                    <td class="bim4"><input type="number" class="bim4" value="${aluno.bim4}"></td>
                </tr>
            `
        })
    }
}


document.querySelector('button#filtra').addEventListener('click', ()=> montaTabela())

inputId.addEventListener('focus', ()=> {
    document.addEventListener('keydown', (event)=>{
        if(event.key == "Enter"){

            montaTabela()
            event.preventDefault()
        }
    })
})

inputTurma.addEventListener('focus', ()=> {
    document.addEventListener('keydown', (event)=>{
        if(event.key == "Enter"){

            montaTabela()
            event.preventDefault()
        }
    })
})


async function montaTabela(){

    if(inputTurma.value != "" || inputId.value != "") {

        const divCarregamento = document.querySelector('div.carregamento')

        divCarregamento.style.display = 'block'

        divCarregamento.innerHTML = `
            <span class="carregamento"></span>
        `
        let alunosFiltrado = await filtraAlunos(getAlunos)
        escreveTabelaInput(alunosFiltrado)

        divCarregamento.style.display = 'none'

    } else {
        piscaInput(inputId, inputTurma)
    }
}


async function postarNotas(){
    const linhas = document.querySelectorAll('tbody tr')

    if(linhas.length != 0){
        
        for (const element of linhas){
            const id = element.querySelector('td.id').innerText

            const novasNotas = {
                bim1: Number(element.querySelector('input.bim1').value),
                bim2: Number(element.querySelector('input.bim2').value),
                bim3: Number(element.querySelector('input.bim3').value),
                bim4: Number(element.querySelector('input.bim4').value)
            }

            await patchAlunos(linkAPI, chaveAPI, id, novasNotas)
        }

        alert('Nota(s) Alterada(s)')
    }
}


botaoPost.addEventListener('click', async ()=>{

    botaoPost.innerHTML = `
        <span class="carregamento"></span>
    `

    await postarNotas()

    botaoPost.innerHTML = 'Lançar'

})


// © 2025 Filipe Mairinck Vitorino. Todos os direitos reservados.