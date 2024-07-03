const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const imagens = document.querySelector('.app__image');
const texto = document.querySelector('.app__title');
const bt = document.querySelectorAll('.app__card-button');
const musicafoco = document.querySelector ('#alternar-musica');
const startrbotao = document.querySelector ('#start-pause');
const startpausetexto = document.querySelector('#start-pause span');
const imagemBotao = document.querySelector('.app__card-primary-butto-icon');
const timerNaTela = document.querySelector('#timer');

let intervalo = null;

const musicaFinalContagem = new Audio ('sons/beep.mp3')
const musicaPausarContagem = new Audio ('sons/pause.mp3')
const musicaIniciarContagem = new Audio ('sons/play.wav');
const musica = new Audio ('sons/luna-rise-part-one.mp3');
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;

musicafoco.addEventListener('change', () =>{
    if (musica.paused){
        musica.play();
    }
    else{
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    botoes('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    botoes('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    botoes('descanso-longo');
    longoBt.classList.add('active');
})

function botoes(tipoDoBotao){
    timer();
    html.setAttribute('data-contexto', tipoDoBotao);
    imagens.setAttribute('src', `/imagens/${tipoDoBotao}.png`);
    switch (tipoDoBotao) {
        case 'foco':
            texto.innerHTML =  'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>'

            break;
        case 'descanso-curto':
          texto.innerHTML=   'Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>'
        break;

        case 'descanso-longo':
            texto.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
    //serve para percorrer a lista e ir excluindo os botoes ativos
    bt.forEach (function (contexto) {
        contexto.classList.remove('active')})
}

const contagemRegressiva = () => {
    if( tempoDecorridoEmSegundos <= 0){
        musicaFinalContagem.play();
        alert('tempo acabou!');
        zerar();
        return;
    }
    timer();
    tempoDecorridoEmSegundos -= 1;
    console.log(tempoDecorridoEmSegundos);
  
}

function iniciarOuPausar(){
    if(intervalo){
        musicaPausarContagem.play();
        startpausetexto.textContent = "Começar";
        imagemBotao.setAttribute ('src', '/imagens/play_arrow.png');
        zerar();
        return;
    }
    intervalo = setInterval(contagemRegressiva, 1000);
    musicaIniciarContagem.play();
    startpausetexto.textContent = "Pausar";
    imagemBotao.setAttribute('src', '/imagens/pause.png');
   
}

function zerar(){
    clearInterval(intervalo);
    intervalo = null;
}

function timer(){
    const tempo = new Date ( tempoDecorridoEmSegundos * 1000);
    const tempoCerto = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timerNaTela.innerHTML = `${tempoCerto}`;
}
timer();
startrbotao.addEventListener('click' , iniciarOuPausar);