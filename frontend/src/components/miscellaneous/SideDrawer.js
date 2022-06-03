import { Avatar, Drawer  , useToast ,useDisclosure ,Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, DrawerOverlay, DrawerHeader, DrawerContent, DrawerBody, Input, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useHistory } from 'react-router-dom'
import ChatLoading from '../ChatLoading'
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem'

const SideDrawer = () => {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const { user, setSelectedChat, chats, setChats } = ChatState()
  const history = useHistory()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef()
  const toast = useToast()
  
  const logOutHandler = () => {
    localStorage.removeItem('userInfo')
    history.push("/")
  }

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter a something in Search",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left"
      })
    }

    try {
     
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.get(`/api/user?search=${search}`, config)
      setSearchResults(data)
      setLoading(false)
    } catch (error) {
      toast({
        title: "Failed to Load Search Result",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      })
      setLoading(false)
    }
    
  }
  
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.post("/api/chat", { userId }, config)
      if (!chats.find((c) => c._id === data._id)) { 
        setChats([...chats, data])
      }
      setSelectedChat(data)
      setLoadingChat(false)
    } catch (error) {
     
      setLoadingChat(false)
    }
  }

  
  
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" borderWidth="5px" p="5px 10px 5px 10px">
         <Tooltip label="Search Users To Chat" hasArrow placement='bottom'>

          <Button variant="ghost" onClick={ onOpen}>
            <i class="fas fa-search"></i>
            <Text px="4" display={{base:"none" ,md:"flex"}}>Search User</Text>
          </Button>
        </Tooltip>
        
        <Text fontSize="2xl" fontFamily="Work sans">
          HISS
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1}/>
            </MenuButton>
            <MenuList>
              
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              <Avatar size="sm" cursor="pointer" name={user.name} src={ user.picture }/>
            </MenuButton>
            <MenuList>
              <ProfileModal user={ user }>
                <MenuItem>My Profile</MenuItem>   
              </ProfileModal>
              
              <MenuDivider/>
              <MenuItem onClick={logOutHandler}>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
        <Drawer  isOpen={isOpen}
        placement='left'
        initialFocusRef={firstField}
        onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search Users</DrawerHeader>
             <DrawerBody>
            <Box display="flex" pb={2}>
            <Input placeholder="Search By Name or Email"
              mr={2}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
            onClick={handleSearch}
            >
              Go
            </Button>
            </Box>
            {loading ? <ChatLoading /> : (
              searchResults?.map(user => (
                <UserListItem
                  key={user._id}
                  handleFunction={() => accessChat(user._id)}
                  user={user}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
        </DrawerBody>
        </DrawerContent>
     
      </Drawer>
    </>
  )
              }

export default SideDrawer