import { linkAPI } from "./API.js"
import { chaveAPI } from "./API.js"
import { getAlunos } from "./API.js"
import { piscaInput } from "./exportFunctions.js"
import { mostraAlunos } from "./exportFunctions.js"
import { filtraAlunos } from "./exportFunctions.js"


const idInput = document.querySelector('section.digitaCampos input.id')
const turmaInput = document.querySelector('section.digitaCampos input.turma')


async function montaTabela() {

    if(turmaInput.value != "" || idInput.value != "") {
    
        const divCarregamento = document.querySelector('div.carregamento')

        divCarregamento.style.display = 'block'

        divCarregamento.innerHTML = `
            <span class="carregamento"></span>
        `

        let alunosFiltrado = await filtraAlunos(getAlunos)
        mostraAlunos(alunosFiltrado)

        divCarregamento.style.display = 'none'

    } else {
        piscaInput(idInput, turmaInput)
    }
}



document.querySelector('button#filtra').addEventListener('click', ()=> montaTabela())

idInput.addEventListener('focus', ()=> {
    document.addEventListener('keydown', (event)=>{
        if(event.key == "Enter"){

            montaTabela()
            event.preventDefault()
        }
    })
})

turmaInput.addEventListener('focus', ()=> {
    document.addEventListener('keydown', async (event)=>{
        if(event.key == "Enter"){

            montaTabela()
            event.preventDefault()
        }
    })
})


// © 2025 Filipe Mairinck Vitorino. Todos os direitos reservados.