import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react'
import { getSender , getSenderFull } from '../config/ChatLogics';
import { ChatState } from './Context/ChatProvider';
import ProfileModal  from "./miscellaneous/ProfileModal"
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
const SingleChat = ({ fetchAgain, setfetchedAgain }) => {
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  return (
      <>{selectedChat ? (
          <>
              <Text
                  fontSize={{ base: "28px", md: "30px" }}
                  pb={3}
                  px={2}
                  w="100%"
                  display="flex"
                  justifyContent={{ base: "space-between" }}      
                  alignItems="center"
                 >
                  <IconButton display={{ base: "flex", md: "none" }} icon={<ArrowBackIcon />}
                  
                      onClick={() => { setSelectedChat("") }} />
                  {!JSON.parse(selectedChat.isGroupChat) ?
                      <>{getSender(user, selectedChat.users)}
                          { <ProfileModal user={getSenderFull(user,selectedChat.users)}/>}
                      </> :
                      <>{selectedChat.chatName.toUpperCase()}
                          <UpdateGroupChatModal fetchAgain={fetchAgain} setfetchedAgain={ setfetchedAgain}/>
                      </>}
               </Text>
      
              <Box
                  display="flex"
                  flexDir="column"
                  justifyContent="flex-end"
                  p={3}
                  bg="#f8f8f8"
                  w="100%"
                  h="100%"
                  borderRadius="lg"
                  overflow="hidden"
              >
                  {/* message here
                   */}
              </Box>
          </>
      ) : (
          <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              h="100%"
          >
              <Text  fontSize="3xl" pb={3} fontFamily="Work sans"
              >
              Click On a User To start Conversation</Text>              
          </Box>
      )}</>
  )
}

export default SingleChat