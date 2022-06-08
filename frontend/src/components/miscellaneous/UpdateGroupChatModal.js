import { ViewIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import UserbadgeItem from '../UserAvatar/UserbadgeItem'
import UserListItem from '../UserAvatar/UserListItem'

const UpdateGroupChatModal = ({ fetchAgain , setfetchedAgain , fetchMessages }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState()
    const [groupChatName, setgroupChatName] = useState()
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [renameLoading, setRenameLoading] = useState(false)

    const toast = useToast();
    const handleRemove = async (user1) => { 
          if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
            toast({
                title: "User already in the group",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            return
        }
           try {
            setLoading(true)
             const config = {
                headers: {
                Authorization: `Bearer ${user.token}`,
                },
            };
            
            const { data } = await axios.put('/api/chat/groupremove', {
                chatId: selectedChat._id,
                userId: user1._id,

            }, config)
            
            user1._id === user._id ? setSelectedChat() : setSelectedChat(data)
               setfetchedAgain(!fetchAgain)
               fetchMessages()
               setLoading(false)
           
        } catch (error) {
           toast({
               title: "Failed to remove ",
               description:error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
        }
    }
    const handleAddUser = async(user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: "User already in the group",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            return
        }
        if(selectedChat.groupAdmin._id !== user._id){
            toast({
                title: "Only admins can add someone",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            return
        }
        try {
            setLoading(true)
             const config = {
                headers: {
                Authorization: `Bearer ${user.token}`,
                },
            };
            
            const { data } = await axios.put('/api/chat/groupadd', {
                chatId: selectedChat._id,
                userId: user1._id,

            }, config)
            
                      toast({
                title: "User Added ",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setSelectedChat(data)
            setfetchedAgain(!fetchAgain)
            setLoading(false)
        } catch (error) {
           toast({
                title: "Failed to add new User",
                status: "error",
                duration: 5000,
                description: error.message,
                isClosable: true,
                position: "bottom",
           })
            setLoading(false)
        }
     }
    const handleRename = async () => {
        if (!groupChatName) { return }
        try {
            setRenameLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }


            const data = await axios.put(`/api/chat/rename`, { chatId: selectedChat._id, chatName: groupChatName }, config)
            setSelectedChat(data)
            setfetchedAgain(!fetchAgain)
            setRenameLoading(false)
        } catch (error) {
            toast({
                title: "Failed to rename chat",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            setRenameLoading(false);

            setgroupChatName("")
        }
          }
       
     
    const handleSearch = async (query) => {
        console.log(query)
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
    return (
        <>
        <IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}>open modal</IconButton>
         <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                        <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
                            {selectedChat.users.map((u) => (
                                <UserbadgeItem
                                    key={user._id}
                                    user={u}
                                    handleFunction={ () => handleRemove(u) }
                                />
                            ))}
                        </Box>
                        <FormControl display="flex">
                            <Input placeholder="Chat Name" mb={3} value={groupChatName} onChange={(e) => setgroupChatName(e.target.value)}/>
                            <Button variant="solid" colorScheme="teal" ml={1} isLoading={renameLoading} onClick={handleRename}>Update</Button>
                        </FormControl>
                          <FormControl display="flex">
                            <Input placeholder="Add User To Group" mb={1}  onChange={(e) => handleSearch(e.target.value)}/>
                           
                        </FormControl>
                        {loading ? (<Spinner size="lg" />): searchResult.map((user) => (
                            <UserListItem key={user._id} user={user} handleFunction={ () => handleAddUser(user)}></UserListItem>
                        ))}
          </ModalBody>

          <ModalFooter>
            <Button  mr={3} onClick={ () => handleRemove(user)} colorScheme="red">
                                Leave Group 
            </Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>

     
  )
}

export default UpdateGroupChatModal