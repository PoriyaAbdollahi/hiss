import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import UserbadgeItem from '../UserAvatar/UserbadgeItem'
import UserListItem from '../UserAvatar/UserListItem'

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChatName, setGroupChatName] = useState()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [search, setSearch] = useState()
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  
  const toast = useToast()

  const { user, chats, setChats } = ChatState()
  
  const handleDelete = (deletedUser) => { 
    setSelectedUsers(
     selectedUsers.filter((sel) => sel._id !== deletedUser._id)
   )
 }
  const handleSearch = async(query) => { 
    setSearch(query)
    if (!query) { 
      return 
    }

    try { 
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config)
      console.log(data)
      setLoading(false)
      setSearchResult(data)
    } catch (error) { 
      toast({
        title: "Failed to Load Search Result",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) { 
      toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return
    }



    try { 
    
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
     
      const { data } = await axios.post(`/api/chat/group`,  {
        name: groupChatName,
        users:JSON.stringify(selectedUsers.map((u) => u._id))
      }, config)
     
      setChats([data, ...chats])
      onClose()
       toast({
        title: "New Group Chat Created ! ! !",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) { 
      toast({
        title: "Failed to Create Group Chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
  
    }

  }
  
  const handleGroup = (userToadd) => {
    if (selectedUsers.includes(userToadd)) {
      toast({
        title: "User Already in Group",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return
    }
   
    
    setSelectedUsers([...selectedUsers, userToadd])
   }
  return (
    <>
      <span onClick={onOpen}>{children}</span>
    

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl fontWeight='bold' mb='1rem'>
              <Input placeholder="Chat Name " mb={3} onChange={ (e)=> setGroupChatName(e.target.value)}/>
            </FormControl>
             <FormControl fontWeight='bold' mb='1rem'>
              <Input placeholder="Add users eg: John , akbar , asghar " mb={3} onChange={ (e)=> handleSearch(e.target.value)}/>
            </FormControl>
            <Box w="100%" display="flex" flexwrap="wrap">
              {selectedUsers.map((u) =>
                <UserbadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />)}
            </Box>
           
            {
              loading ? <div>Loading...</div> : (searchResult.slice(0.4).map((user) =>
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleGroup(user)}
                />))
            }
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal