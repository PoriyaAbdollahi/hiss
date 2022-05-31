import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../Context/ChatProvider'
import ProfileModal from './ProfileModal'

const SideDrawer = () => {
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()
     const { user } = ChatState()
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" borderWidth="5px" p="5px 10px 5px 10px">
         <Tooltip label="Search Users To Chat" hasArrow placement='bottom'>

          <Button variant="ghost">
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
              <MenuItem>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  )
}

export default SideDrawer