import {
  Button, Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure
} from "@chakra-ui/react";

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
                <Tab>ISS</Tab>
                <Tab>About Us</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Text>This is a web application that tracks the movement of the International Space Station (ISS). You
                    can watch the ISS as it moves around the Earth. And if you zoom in (with your mouse wheel), you can watch a detailed 3D
                    model of the Station.</Text>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
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