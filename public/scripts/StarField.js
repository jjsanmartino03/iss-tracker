/*
 * Copyright 2003-2006, 2009, 2017, United States Government, as represented by the Administrator of the
 * National Aeronautics and Space Administration. All rights reserved.
 *
 * The NASAWorldWind/WebWorldWind platform is licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 *  Illustrates how to show the starfield layer above the globe.
 */
requirejs([
    './WorldWindShim',
    './LayerManager'
  ],
  function (WorldWind,
            LayerManager) {
    'use strict';

    // Tell WorldWind to log only warnings and errors.
    WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

    // Create the WorldWindow.
    var wwd = new WorldWind.WorldWindow('canvasOne');

    // Create imagery layers.
    var BMNGLayer = new WorldWind.BMNGLayer();
    var starFieldLayer = new WorldWind.StarFieldLayer();
    var atmosphereLayer = new WorldWind.AtmosphereLayer();

    // Add previously created layers to the WorldWindow.
    wwd.addLayer(BMNGLayer);
    wwd.addLayer(starFieldLayer); //IMPORTANT: add the starFieldLayer before the atmosphereLayer
    wwd.addLayer(atmosphereLayer);

    var date = new Date();
    starFieldLayer.time = date;
    atmosphereLayer.time = date;

    wwd.redraw();

    wwd.redrawCallbacks.push(runSunSimulation);

    var sunSimulationCheckBox = document.getElementById('stars-simulation');
    var doRunSimulation = false;
    var timeStamp = Date.now();
    var factor = 1;

    sunSimulationCheckBox.addEventListener('change', onSunCheckBoxClick, false);

    function onSunCheckBoxClick() {
      doRunSimulation = this.checked;
      if (!doRunSimulation) {
        var date = new Date();
        starFieldLayer.time = date;
        atmosphereLayer.time = date;
      }
      wwd.redraw();
    }

    function runSunSimulation(wwd, stage) {
      if (stage === WorldWind.AFTER_REDRAW && doRunSimulation) {
        timeStamp += (factor * 60 * 1000);
        var date = new Date(timeStamp);
        starFieldLayer.time = date;
        atmosphereLayer.time = date;
        wwd.redraw();
      }
    }

    // Create a layer manager for controlling layer visibility.
    var layerManager = new LayerManager(wwd);
  });