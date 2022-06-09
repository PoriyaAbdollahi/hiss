import { ViewIcon } from '@chakra-ui/icons';
import {  Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'


const ProfileModal = ({ user, children }) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();

  const finalRef = React.useRef()
   

  return (
      <>
          {
              children ? <span onClick={onOpen}>{children}</span> :
                  <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
          }

                <Modal size="lg" finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent height="400px">
                            <ModalHeader fontSize="30px" fontFamily="Work sans" diplay="flex" justifyContent="Center" textAlign="center">{ user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" alignItems="center">
                      <Image borderRadius="full" boxSize="150px" src={user.picture} alt={user.name}></Image>
                      <Text>{ user.email}</Text>
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

export default ProfileModal