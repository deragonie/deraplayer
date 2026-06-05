# deraplayer - music player

un reproductor de música local con diseño de cassette, creado con un backend en javascript y un frontend con html y css, especialmente hecho para ser corrido con electron. :^

## features
- ventana transparente: no hay bordes de la ventana en la que se ejecuta por lo que tiene una exacta forma del cassette diseñado.
- escaneo dinámico de canciones: no hay que escribir la lista de canciones a mano en el código, si no que se revisa automáticamente la carpeta de "canciones".
- barra de progreso interactiva: si presionas en alguna parte de la barra de progreso, te llevará inmediatamente a ese minuto.
- autoplay :^

<figure align="center">
  <img width="50%" alt="image" src="https://github.com/user-attachments/assets/637725b8-bbce-4d50-be98-99d6e9cd1d21"/>
  <br />
  <figcaption><i>Figura 1: Diseño inicial de la app.</i></figcaption>
</figure>

## structure
```
├── canciones/
|   ├── poseDaddyYankee.mp3
|   └── ...
├── assets/
|   ├──images/   // diseñitos        
│   |   ├── cuerpo.png
│   |   ├── fondo.png
│   |   ├── ruedita.png
│   |   ├── play_unpressed.png
│   |   ├── play_pressed.png
│   |   └── ...
├── index.html
├── styles.css
├── main.js
├── preload.js
└── script.js
```
## installation
debes tener instalado node.js (https://nodejs.org/) y luego clonar e instalar dependencias.

abre tu terminal en la carpeta del proyecto y ejecuta:
```bash
npm install
```

para correr la aplicación basta ejecutar
```bash
npm run start
```
