import Head from 'next/head'
import Image from 'next/image'
import {useEffect, useState} from "react";
import {getSatelliteInfo} from "tle.js";

export default function Home() {
  const [follow, setFollow] = useState(true);
  const [model, setModel] = useState(true)

  const tle = 'ISS (ZARYA)\n' +
    '1 25544U 98067A   22274.03874838  .00014927  00000+0  26492-3 0  9996\n' +
    '2 25544  51.6445 172.1493 0002537 314.1559  14.3121 15.50438125361599';

  let wwd, position, WorldWind, modelLayer;

  useEffect(() => {
    const doIt = () => {
      if (position) {
        const satelliteInfo = getSatelliteInfo(tle, +new Date());
        position.latitude = satelliteInfo.lat;
        position.longitude = satelliteInfo.lng;
        position.altitude = satelliteInfo.height * 1000;

        if (follow) {
          wwd.navigator.lookAtLocation.latitude = position.latitude
          wwd.navigator.lookAtLocation.longitude = position.longitude
        }
        wwd.redraw()
      }
    }

    const interval = setInterval(doIt, 100);

    return () => clearInterval(interval)
  }, [follow])

  const createOrbit = () => {
    /* let orbitPoints = []

     for(let i= -(60*60*10); i++; i<0){
       const newPos = new WorldWind.Position()

       const info = getSatelliteInfo(tle, new Date() + (i*10));

       newPos.latitude = info.lat;
       newPos.longitude = info.lng;
       newPos.altitude = info.height;

       orbitPoints.push(newPos)
     }

     let path  = new WorldWind.Path(orbitPoints );

     let orbitPathAttributes= new WorldWind.ShapeAttributes(null);
     orbitPathAttributes.outlineColor = WorldWind.Color.RED;
     orbitPathAttributes.interiorColor = new WorldWind.Color(1, 0, 0, 0.5);

     path.attributes = orbitPathAttributes;
     modelLayer.addRenderable(path)

     wwd.redraw();*/
  }

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvasOne';
    document.getElementById('canvasContainer').appendChild(canvas);
    import('../worldwind.min').then((resolved) => {
      WorldWind = resolved
      const canvaElement = document.getElementById('canvasOne');

      canvaElement.setAttribute('height', window.innerHeight)
      canvaElement.setAttribute('width', window.innerWidth)

      wwd = new WorldWind.WorldWindow("canvasOne");

      wwd.addLayer(new WorldWind.BMNGOneImageLayer());
      const starFieldLayer = new WorldWind.StarFieldLayer();
      const atmosphereLayer = new WorldWind.AtmosphereLayer();
      wwd.addLayer(starFieldLayer);
      wwd.addLayer(atmosphereLayer)

      let date = new Date();
      starFieldLayer.time = date;
      atmosphereLayer.time = date;
      wwd.redraw();

      modelLayer = new WorldWind.RenderableLayer();
      wwd.addLayer(modelLayer);

      position = new WorldWind.Position(10.0, -125.0, 800000.0);

      if (model) {
        let colladaLoader = new WorldWind.ColladaLoader(position);
        colladaLoader.init({dirPath: '/models/'});
        colladaLoader.load("ISS.dae", function (colladaModel) {
          colladaModel.scale = 90000;
          modelLayer.addRenderable(colladaModel);
        });
      } else {
        let placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
        let highlightPlacemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
        highlightPlacemarkAttributes.imageScale = 0.4;
        placemarkAttributes.imageSource = '/red_dot.png';
        placemarkAttributes.imageScale = 0.3;

        let placemark = new WorldWind.Placemark(position)
        placemark.attributes = placemarkAttributes;
        placemark.highlightAttributes = highlightPlacemarkAttributes

        placemarkAttributes.imageOffset = new WorldWind.Offset(
          WorldWind.OFFSET_FRACTION, 0.5,
          WorldWind.OFFSET_FRACTION, 0.5);
        placemarkAttributes.imageColor = WorldWind.Color.WHITE;
        placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
          WorldWind.OFFSET_FRACTION, 0.5,
          WorldWind.OFFSET_FRACTION, 1.0);
        placemarkAttributes.labelAttributes.color = WorldWind.Color.WHITE;

        placemark.attributes = placemarkAttributes;
        placemark.highlightAttributes = highlightPlacemarkAttributes;

        modelLayer.addRenderable(placemark)

      }

      createOrbit()
    })

    return () => document.getElementById('canvasOne').remove();
  })

  return (
    <div id={'canvasContainer'}>
      <canvas id="canvasOne" width="1024" height="768">
        Your browser does not support HTML5 Canvas.
      </canvas>
    </div>
  )
}
