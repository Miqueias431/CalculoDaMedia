/**
 * Calcular Status do Aluno
 * @author Miqueias Rodrigues
 */

function calcularStatus() {
    // Obter os valores das notas do aluno
    let nota1 = parseFloat(document.getElementById('nota1').value);
    let nota2 = parseFloat(document.getElementById('nota2').value);
    let nota3 = parseFloat(document.getElementById('nota3').value);
    let nota4 = parseFloat(document.getElementById('nota4').value);

    // Calcular a média das notas
    let media = (nota1 + nota2 + nota3 + nota4) / 4;

    // Obter o elemento de status para atualizar
    let statusElement = document.getElementById('status');
    let imgElement = document.getElementById('imgStatus'); // Obtendo o elemento da imagem

    // Verificar a média e definir o status
    if (media >= 7) {
        statusElement.textContent = 'APROVADO';
        imgElement.src = 'img/aprovado.png';
    } else if (media <= 4) {
        statusElement.textContent = 'REPROVADO'; 
        imgElement.src = 'img/reprovado.png';
    } else {
        statusElement.textContent = 'RECUPERAÇÃO';
        imgElement.src = 'img/recuperacao.png';
    }

}

// Chamar a função quando o botão for clicado
document.getElementById('btnCalcular').addEventListener('click', calcularStatus);
