import { linkAPI } from "./API.js"
import { chaveAPI } from "./API.js"

export function piscaInput(...elements){
    elements.forEach(element => {
        element.style.animation = "borderBlink 0.5s 2"
        element.addEventListener('animationend', ()=>{
            element.style.animation = "none"
        })
    })
}

export function mostraAlunos(alunos){
    let tabela = document.querySelector('tbody')

    if(alunos.length == 0){
        alert('Id ou Turma Incorreto(s)')
    } else {
        tabela.innerHTML = ""

        alunos.forEach(element => {

            let media = (element.bim1 + element.bim2 + element.bim3 + element.bim4) / 4

            tabela.innerHTML += `
                <tr>
                    <td class="id">${element.id}</td>
                    <td class="nome">${element.nome}</td>
                    <td class="turma">${element.turma}</td>
                    <td class="bim1">${element.bim1}</td>
                    <td class="bim2">${element.bim2}</td>
                    <td class="bim3">${element.bim3}</td>
                    <td class="bim4">${element.bim4}</td>
                    <td class="media">${media}</td>
                </tr>
            `
        })
    }
}

export async function filtraAlunos(getAlunos){

    const idInput = document.querySelector('section.digitaCampos input.id')
    const turmaInput = document.querySelector('section.digitaCampos input.turma')

    let alunos = await getAlunos(linkAPI, chaveAPI)

    if (idInput.value != "" && turmaInput.value != ""){

        let alunosFiltrado = alunos.filter(aluno => String(aluno.id) === String(idInput.value) && String(aluno.turma) === String(turmaInput.value).toUpperCase())

        return alunosFiltrado

    } else if(idInput.value != "" && turmaInput.value == ""){

        let alunosFiltrado = alunos.filter(aluno => String(aluno.id) === String(idInput.value))

        return alunosFiltrado       

    } else if(idInput.value == "" && turmaInput.value != "") {

        let alunosFiltrado = alunos.filter(aluno => String(aluno.turma) === String(turmaInput.value).toUpperCase())

        return alunosFiltrado

    } else {
        piscaInput(idInput, turmaInput)
    }
}


// © 2025 Filipe Mairinck Vitorino. Todos os direitos reservados.