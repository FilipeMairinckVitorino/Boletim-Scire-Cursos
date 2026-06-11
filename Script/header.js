function ajustaHeader() {
    const forma = document.getElementById('forma')
    const tela = window.innerWidth
    const svgOriginalWidth = 1366
    const scaleX = tela / svgOriginalWidth

    forma.style.transform = `scaleX(${scaleX+0.05}) translateX(-20px)`
}

window.addEventListener('load', ajustaHeader)
window.addEventListener('resize', ajustaHeader)


// © 2025 Filipe Mairinck Vitorino. Todos os direitos reservados.