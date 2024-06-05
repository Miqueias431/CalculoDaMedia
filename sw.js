/**
 * Calcular Status do Aluno
 * @author Miqueias Rodrigues
 */

// Nome do cache (Controle de versão)
const cachePWA = 'cache-v1';
// Arquivos a serem armazenados em cache
// Todos os arquivos devem ser add ao vetor (exceto o manifesto)
const urlsToCache = [
  '/',
  '/index.html',  
  '/escola192.png',
  '/escola512.png',
  '/style.css',
  '/media.js'
]

// Instalando o Service Worker e armazenando os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cachePWA)
      .then((cache) => {
        return cache.addAll(urlsToCache)
      })
  )
})

// Interceptando as solicitações de rede e servindo arquivos do cache quando offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se o arquivo está no cache, serve o arquivo do cache
        if (response) {
          return response
        }
        // Caso contrário, faz uma solicitação de rede
        return fetch(event.request)
      })
  )
})

function calcularStatus() {
  // Obter os valores das notas do aluno
  let nota1 = parseFloat(document.getElementById('nota1').value)
  let nota2 = parseFloat(document.getElementById('nota2').value)
  let nota3 = parseFloat(document.getElementById('nota3').value)
  let nota4 = parseFloat(document.getElementById('nota4').value)

  if (!nota1 || !nota2 || !nota3 || !nota4) {
      document.getElementById('status').textContent = ''
      document.getElementById('imgStatus').src = 'img/inicio.png'
      return;
  }

  // Calcular a média das notas
  let media = (nota1 + nota2 + nota3 + nota4) / 4;

  // Obter o elemento de status para atualizar
  let statusElement = document.getElementById('status')
  let imgElement = document.getElementById('imgStatus') // Obtendo o elemento da imagem

  // Verificar a média e definir o status
  if (media >= 6) {
      statusElement.textContent = 'APROVADO'
      imgElement.src = 'img/aprovado.png'
  } else if (media <= 4) {
      statusElement.textContent = 'REPROVADO'
      imgElement.src = 'img/reprovado.png'
  } else {
      statusElement.textContent = 'RECUPERAÇÃO'
      imgElement.src = 'img/recuperacao.png'
  }

  let btnLimpar = document.getElementById('btnLimpar');

  btnLimpar.addEventListener('click', () => {
      imgStatus.src = 'img/inicio.png'
      statusElement.textContent = ''
  })

}

// Chamar a função quando o botão for clicado
document.getElementById('btnCalcular').addEventListener('click', calcularStatus)
