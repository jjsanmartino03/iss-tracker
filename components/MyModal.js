import {
  Button, Heading, Link, List, ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text, UnorderedList, useDisclosure, VStack
} from "@chakra-ui/react";
import Head from "next/head";

function Lorem(props) {
  return null;
}

function BasicUsage() {
  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <>
      <Button onClick={onOpen} size={'lg'}>Information</Button>

      <Modal size={'4xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>ISS Tracker</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <Tabs variant='soft-rounded' colorScheme='green'>
              <TabList>
                <Tab>How to use the app</Tab>
                <Tab>How it works</Tab>
                <Tab>About Us</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VStack align='start' spacing={2}>
                    <Text>This is a web application that tracks the movement of the International Space Station (ISS).
                      You
                      can watch the ISS as it moves around the Earth. And if you zoom in (with your mouse wheel), you
                      can watch a detailed 3D
                      model of the Station.</Text>
                    <Heading size={'xl'}>Menu</Heading>
                    <Text>To toggle the menu, click on the "Menu" button</Text>
                    <UnorderedList>
                      <ListItem><b>Follow station:</b> lock the view of the model in the space station, letting the
                        earth rotate behind</ListItem>
                      <ListItem><b>Models:</b> choose between different space station models</ListItem>
                      <ListItem><b>Real size:</b> show a real size representation of the ISS</ListItem>
                      <ListItem><b>Time slider:</b> choose a time (between a 24 hour range from today) to display where
                        the ISS was at that time. To return to now, click on "Reset Date"</ListItem>
                    </UnorderedList>
                    <Heading size={'xl'}>Navigation</Heading>
                    <UnorderedList>
                      <ListItem>To <b>move the planet</b> click and drag with your mouse's left click</ListItem>
                      <ListItem><b>Zoom in/out</b> with your mouse wheel</ListItem>
                      <ListItem>To <b>change the 3D perspective</b> click and drag with your mouse's right
                        click</ListItem>
                    </UnorderedList>
                    <Heading size={'xl'}>Want to learn more about the ISS?</Heading>
                    <Text>Be sure to check out the <Link
                      href={'https://www.nasa.gov/mission_pages/station/main/index.html'}>ISS official
                      website</Link></Text>
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack align='start' spacing={2}>
                    <Text>Calculating the ISS or any satellite's location is no easy task. Luckily, scientists developed
                      an algorithm called <b>SGP4</b>, that can calculate the position of an element orbiting
                      around the Earth, only with the help of a TLE.</Text>
                    <Heading size={'base'}>Okay, but what exactly is a TLE?</Heading>
                    <Text>Wikipedia says: <Text as={'cite'}>A two-line element set (TLE) is a data format encoding a
                      list of orbital elements of an Earth-orbiting object for a given point in time, the epoch. Using a
                      suitable prediction formula, the state (position and velocity) at any point in the past or future
                      can be estimated to some accuracy</Text></Text>
                    <Text>Basically, a TLE is a set of two lines of texts, that contains a lot of information about a
                      satellite, which we can use to calculate its present or past position. It is important to note
                      that an outdated TLE can generate errors in the calculations we make. So we must use recently
                      generated TLEs, in order to make an accurate prediction.</Text>
                    <Heading size={'lg'}>How we track the ISS</Heading>
                    <Text>We use <a href={'https://github.com/shashwatak/satellite-js'}
                                    target={'_blank'}>Satellite.js</a>, a JavaScript library that, given a TLE of the
                      satellite, calculates its current or past position. We get the TLE from <a
                        href={'https://wheretheiss.at/w/developer'} target={'_blank'}>this page</a>, called "Where the
                      ISS is at?". Then we update the code every day with the new TLE.</Text>
                    <Text>In order to show the planet and the ISS in a 3D model, we use another tool called <a
                      href={'https://worldwind.arc.nasa.gov/web/'} target={'_blank'}>Web Worldwind</a>, which is an
                      open-source library developed by NASA.</Text>
                  </VStack>

                </TabPanel>
                <TabPanel>
                  <VStack align='start' spacing={2}>
                    <Text>We are a team that participated in the 2022 edition of the NASA Space Apps Challenge. Our team
                      is called <b>Voyagers</b>, and <Link href={'https://2022.spaceappschallenge.org/challenges/2022-challenges/track-the-iss/teams/voyagers-2/project'}>this is our team page</Link></Text>
                    <Text>The code for this app is hosted at <Link href={'https://github.com/jjsanmartino03/iss-tracker'}>Github, here</Link>. It's open source, so feel free to contribute!</Text>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Lorem count={2}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BasicUsage