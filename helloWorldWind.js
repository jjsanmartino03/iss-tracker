const myCanvas = document.getElementById('canvasOne');

myCanvas.setAttribute('width', window.innerWidth);
myCanvas.setAttribute('height', window.innerHeight);

let wwd = new WorldWind.WorldWindow('canvasOne');

wwd.addLayer(new WorldWind.BMNGOneImageLayer());