import Head from 'next/head'
import Image from 'next/image'
import {useEffect, useState} from "react";
import {getSatelliteInfo} from "tle.js";
import SimpleSidebar from "../components/Sidebar";
import {
  Button,
  Checkbox,
  Container,
  Drawer,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text,
  useDisclosure, VStack
} from "@chakra-ui/react";
import {DrawerExample} from "../components/Drawer";
import {motion} from 'framer-motion'
import MyModal from "../components/MyModal";

function ChevronDownIcon() {
  return null;
}

export default function Home() {
  const [follow, setFollow] = useState(false);
  const [model, setModel] = useState(true)
  const [wwd, setWWD] = useState()
  const [colladaModel, setColladaModel] = useState()
  const [placemark, setPlacemark] = useState()
  const [position, setPosition] = useState()
  const [actualSize, setActualSize] = useState(false)
  const [date, setDate] = useState()
  const [dateToShow, setDateToShow] = useState((date && dateSelectedAt) && new Date(+date + (new Date() - dateSelectedAt)))

  const [dateSelectedAt, setDateSelectedAt] = useState()

  useEffect(() => {
    setDate(new Date())
    setDateSelectedAt(new Date())
  }, [])


  useEffect(() => {
    if (!colladaModel) return
    if (actualSize) {
      colladaModel.scale = 10000
    } else {
      colladaModel.scale = 90000
    }
  }, [actualSize])


  const tle = 'ISS (ZARYA)\n' +
    '1 25544U 98067A   22275.03521722  .00046746  00000+0  83199-3 0  9999\n' +
    '2 25544  51.6418 167.2146 0003169 263.1060 229.2717 15.49661688361757';

  let WorldWind, modelLayer;

  useEffect(() => {
    if (!wwd) return;
    const doIt = () => {
      if (position) {
        const satelliteInfo = getSatelliteInfo(tle, new Date(+date + (new Date() - dateSelectedAt)));
        setDateToShow(new Date(+date + (new Date() - dateSelectedAt)))
        position.latitude = satelliteInfo.lat;
        position.longitude = satelliteInfo.lng;
        position.altitude = satelliteInfo.height * 1000;

        setPosition(position)

        if (follow) {
          wwd.navigator.lookAtLocation.latitude = position.latitude
          wwd.navigator.lookAtLocation.longitude = position.longitude
        }
        wwd.redraw()
      }
    }

    const interval = setInterval(doIt, 100);

    return () => clearInterval(interval)
  }, [follow, wwd, date])


  useEffect(() => {
    if (wwd && wwd.layers && wwd.layers.length === 4) {
      modelLayer = wwd.layers[3]
      if (!model) {
        modelLayer.addRenderable(placemark)
        colladaModel.enabled = false
      } else {
        colladaModel.enabled = true
        modelLayer.removeRenderable(placemark);
      }
      wwd.redraw();
    }
  }, [model])

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvasOne';
    document.getElementById('canvasContainer').appendChild(canvas);
    import('../worldwind.min').then((resolved) => {
      console.log('hola')
      WorldWind = resolved
      const canvaElement = document.getElementById('canvasOne');

      canvaElement.setAttribute('height', window.innerHeight)
      canvaElement.setAttribute('width', window.innerWidth)

      const wwd = new WorldWind.WorldWindow("canvasOne");

      setWWD(wwd)

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

      const position = new WorldWind.Position(10.0, -125.0, 800000.0);

      setPosition(position)

      const colladaLoader = new WorldWind.ColladaLoader(position);
      colladaLoader.init({dirPath: '/models/'});

      let placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
      let highlightPlacemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
      highlightPlacemarkAttributes.imageScale = 0.4;
      placemarkAttributes.imageSource = '/red_dot.png';
      placemarkAttributes.imageScale = 0.3;

      const placemark = new WorldWind.Placemark(position)

      setPlacemark(placemark)
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


      if (model) {
        colladaLoader.load("ISS.dae", function (colladaModel) {
          colladaModel.scale = 90000;
          modelLayer.addRenderable(colladaModel);
          setColladaModel(colladaModel)
        });
      } else {
        modelLayer.addRenderable(placemark)
      }

      wwd.redraw();
    })

    return () => document.getElementById('canvasOne').remove();
  }, [])

  const {getButtonProps, getDisclosureProps, isOpen} = useDisclosure()
  const [hidden, setHidden] = useState(!isOpen)

  const [val, setVal] = useState(0)
  useEffect(() => {
    setDateToShow(new Date(+date + (new Date() - dateSelectedAt)))
  }, [date, dateSelectedAt])

  return (
    <>
      <Head>
        <title>Voyagers: ISS Tracker</title>
      </Head>
    <div id={'canvasContainer'}>
      <canvas style={{position: 'absolute', zIndex: -1}} id="canvasOne" width="1024" height="768">
        Your browser does not support HTML5 Canvas.
      </canvas>
      <Flex background={'transparent'} position={'absolute'}>
        <Flex paddingY={50} paddingLeft={25} flexDir={'column'} justify={'space-between'} height={'100vh'}>
          <Button zIndex={10} {...getButtonProps()}>Menu</Button>
          <motion.div
            {...getDisclosureProps()}
            hidden={hidden}
            initial={false}
            onAnimationStart={() => setHidden(false)}
            onAnimationComplete={() => setHidden(!isOpen)}
            animate={{width: isOpen ? 350 : 0}}
            style={{
              background: 'transparent  ',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              position: 'absolute',
              left: '0',
              height: '100vh',
              top: '0',
            }}
          >
            <Flex paddingY={5} paddingX={5} marginLeft={25} rounded={10} flexDir={'column'} background={'gray.700'}
                  marginTop={100}>
              <VStack spacing={5} align={'start'}>
                <Checkbox isChecked={follow} onChange={(e) => setFollow(e.target.checked)}>Follow Station</Checkbox>
                <Menu flexGrow={'0'}>
                  <MenuButton flexGrow={'0'} as={Button} rightIcon={<ChevronDownIcon/>}>
                    Model: {model ? '3D' : 'Red Point'}
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => {
                      setModel(true);
                    }}>3D</MenuItem>
                    <MenuItem onClick={() => {
                      setModel(false)
                    }}>Red Point</MenuItem>
                  </MenuList>
                </Menu>
                <Checkbox isChecked={actualSize} onChange={(e) => setActualSize(e.target.checked)}>Real size</Checkbox>
                {date && <p>Time: {dateToShow ? dateToShow.toLocaleString() : null}</p>}
                <Slider aria-label='slider-ex-1' min={-1440} max={1440} value={val} onChange={(val) => setVal(val)} onChangeEnd={(val) => {
                  setDateSelectedAt(new Date())
                  setVal(val)
                  setDate(new Date(Date.now() + val * 60 * 1000))
                }}>
                  <SliderTrack>
                    <SliderFilledTrack/>
                  </SliderTrack>
                  <SliderThumb/>
                </Slider>
                <Button onClick={() => {
                  setDate(new Date())
                  setDateSelectedAt(new Date())
                  setVal(0)
                }}>Reset date</Button>
              </VStack>
            </Flex>
          </motion.div>
          <MyModal/>
        </Flex>
      </Flex>
    </div>
    </>
  )
}
