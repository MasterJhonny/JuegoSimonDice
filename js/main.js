// colores.
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
// sonidos.
const musicFondo = document.getElementById('fondo')
const sonidoGanar = document.getElementById('ganar')
const sonidoEnd = document.getElementById('final')
const sonidoDo = document.getElementById('do')
const sonidoRe = document.getElementById('re')
const sonidoMi = document.getElementById('mi')
const sonidoFa = document.getElementById('fa')
// ckeck
const checkFondo = document.getElementById('checkFondo')
// table de informaion.
const nivel = document.getElementById('nivel')
const puntaje = document.getElementById('puntaje')
// cantidad de niveles.
const ULTIMO_NIVEL = 5

class Juego {
    constructor() {
        this.inicialisar = this.inicialisar.bind(this)
        this.inicialisar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 500)
    }
    inicialisar(){
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.pasarDeNivel = this.pasarDeNivel.bind(this)
        btnEmpezar.classList.toggle('hide')
        this.nivel = 1;
        this.puntaje = 0;
        this.colores = [
            { color: celeste, sonido: sonidoDo },
            { color: violeta, sonido: sonidoRe },
            { color: naranja, sonido: sonidoMi },
            { color: verde, sonido: sonidoFa }
        ]
        musicFondo.play();

    }
    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }
    siguienteNivel(){
        this.subNivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClicks()
    }
    trasforColorANum(color){
        switch(color){
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }
    iluminarSecuencia(){
        for(let i = 0; i < this.nivel; i++){
            const color = this.secuencia[i]
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }
    iluminarColor(color){
        this.colores[color].color.classList.add('light')
        this.colores[color].sonido.play()
        setTimeout(() => this.apagarColor(color), 350)
    }
    apagarColor(color){
        this.colores[color].color.classList.remove('light')
    }
    agregarEventosClicks(){
        for(let i=0; i<4; i++){
            this.colores[i].color.addEventListener('click', this.elegirColor )
        }
    }
    eliminarEventosClicks(){
        for(let i=0; i<4; i++){
            this.colores[i].color.removeEventListener('click', this.elegirColor )
        }
    }
    elegirColor(event){
        const nombreColor = event.target.dataset.color;
        const numeroColor = this.trasforColorANum(nombreColor)
        this.iluminarColor(numeroColor)
        if(numeroColor === this.secuencia[this.subNivel] ){
            this.subNivel++
            if(this.subNivel === this.nivel){
                this.nivel++
                this.puntaje += 4
                this.eliminarEventosClicks()
                if(this.nivel === (ULTIMO_NIVEL + 1)){
                    this.ganoElJuego()
                } else {
                    setTimeout(this.pasarDeNivel, 1000) 
                    
                }
            }
        } else {
            this.perdioElJuego()
        }
    }

    ganoElJuego(){
        musicFondo.pause()
        sonidoEnd.play()
        swal('🎉 😄 🎉', 'Felicitaciones Ganaste el juego!', 'success')
        .then(() => {
            this.inicialisar()
            nivel.innerText = 1
        })
    }
    perdioElJuego(){
        swal('Platzi', 'Lo lamentamos perdiste ☹️', 'error')
        .then(() => {
            this.eliminarEventosClicks()
            this.inicialisar()
            nivel.innerText = 1
            puntaje.innerText = 0
        })
    }
    pasarDeNivel(){
        sonidoGanar.play()
        swal(`😊`, `Pasaste al nivel #${this.nivel}`, 'success')
        .then(() => {
            setTimeout(this.siguienteNivel, 1500)
            nivel.innerText = this.nivel;
            puntaje.innerText = this.puntaje;
        })
    }
}


function empezarJuego(){
    window.juego = new Juego;
}

checkFondo.addEventListener('change', () => {
    if(musicFondo.paused){
        musicFondo.play()
    } else if(!musicFondo.paused){
        musicFondo.pause()
    }
})
