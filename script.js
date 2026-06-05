const tituloCancion = document.querySelector('.app h1')
const progreso = document.getElementById('progress')
const cancion = document.getElementById('cancion')

const botonAtras = document.querySelector('.controllers button.prev')
const botonAdelante = document.querySelector('.controllers button.next')
const botonPlayPause = document.querySelector('.controllers button.play')

let playlist = [];
let index = 0;

function actInfoCancion(){
    if (playlist.length===0) return;
    tituloCancion.textContent = playlist[index].name;
    cancion.src = playlist[index].url;
    cancion.load();
};

async function inicializarReproductor() {
    try {
        playlist = await window.electronAPI.getLocalAudio();
        
        if (playlist.length > 0) {
            actInfoCancion();
        } else {
            tituloCancion.textContent = "No hay canciones en la carpeta";
        }
    } catch (error) {
        console.error("Error cargando canciones desde Electron:", error);
    }
}

botonPlayPause.addEventListener('click', playPause);

function playPause() {
    if (playlist.length===0) return;
    if (cancion.paused) {
        reproducirCancion();
        botonPlayPause.textContent = "pause";
    } else {
        pausarCancion();
        botonPlayPause.textContent = "play";
    }
};

function reproducirCancion() {
    cancion.play()  ;
};

function pausarCancion(){
    cancion.pause();
};

botonAdelante.addEventListener('click',sigCancion);
botonAtras.addEventListener('click',antCancion);

function sigCancion() {
    index = (index+1)%playlist.length;
    actInfoCancion();
    reproducirCancion();
    botonPlayPause.textContent = "pause";
};

function antCancion() {
    index = (index-1+playlist.length)%playlist.length;
    actInfoCancion();
    reproducirCancion();
    botonPlayPause.textContent = "pause";
};

cancion.addEventListener('timeupdate', function(){
    if (!cancion.paused) {
        progreso.value = cancion.currentTime;
    }
});

progreso.addEventListener('input', function(){
    cancion.currentTime = progreso.value;
});

inicializarReproductor();