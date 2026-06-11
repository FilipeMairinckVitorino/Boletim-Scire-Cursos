export const linkAPI = 'https://zyduxawaxontracojbta.supabase.co/rest/v1/Alunos'
export const chaveAPI = 'sb_publishable_vIDoEqdmHdJ5s4KN2MAl0g_3ZgRAeOf'

export async function getAlunos(linkAPI, chaveAPI) {
    try {
        const resposta = await fetch(
            linkAPI,
            {
                headers: {
                    apikey: chaveAPI,
                    Authorization: `Bearer ${chaveAPI}`
                }
            }
        )

        if (!resposta.ok) {
            throw new Error('Erro ao buscar alunos')
        }

        const alunos = await resposta.json()

        return alunos

    } catch {
        console.log('ERROR')
        return "ERROR"
    }
}

export async function postAlunos(linkAPI, chaveAPI, id, nome, turma) {
    try {
        const resposta = await fetch(
            linkAPI,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    apikey: chaveAPI,
                    Authorization: `Bearer ${chaveAPI}`
                },
                body: JSON.stringify({
                    id: id,
                    nome: nome,
                    turma: turma,
                    bim1: 0,
                    bim2: 0,
                    bim3: 0,
                    bim4: 0
                })
            }
        )

        if (!resposta.ok) {
            throw new Error('Erro ao adicionar aluno')
        }

        console.log('Aluno adicionado')

    } catch {
        console.log('ERROR')
    }
}

export async function patchAlunos(linkAPI, chaveAPI, id, novasNotas) {
    try {
        const resposta = await fetch(
            `${linkAPI}?id=eq.${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    apikey: chaveAPI,
                    Authorization: `Bearer ${chaveAPI}`
                },
                body: JSON.stringify(novasNotas)
            }
        )

        if (!resposta.ok) {
            throw new Error('Erro ao alterar notas')
        }

        console.log('Nota alterada')

    } catch {
        console.log('ERROR')
    }
}


// © 2025 Filipe Mairinck Vitorino. Todos os direitos reservados.