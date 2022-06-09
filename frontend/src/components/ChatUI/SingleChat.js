import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box,  FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getSender , getSenderFull } from '../../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';
import ProfileModal  from "../UserUI/ProfileModal";
import UpdateGroupChatModal from '../ChatUI/UpdateGroupChatModal';
import ScrollableChat from './ScrollableChat';
import './SingleChat.css'
import io from 'socket.io-client';
import Lottie from 'react-lottie';
import typingPATH from '../../animation/typing.json';
import chatingPATH from '../../animation/chat.json';


const ENTPOINT = "http://localhost:5000"
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setfetchedAgain }) => {

    const { selectedChat, setSelectedChat, user,  notification , setNotification} = ChatState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConntected] = useState(false);
    const [typing, setTyping] = useState(false)
    const [isTyping , setIsTyping] = useState(false)
    const toast = useToast()

    const typingAnimationConfig = {
        loop: true,
        autoplay: true,
        animationData: typingPATH,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
     const chatAnimationConfig = {
        loop: true,
        autoplay: true,
        animationData: chatingPATH,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    


    const sendMessage = async (event) => {
        if (event.key == "Enter" && newMessage) { 
            socket.emit('stop typing', selectedChat._id)
            try {
                   const config = {
                      headers: {
                      Authorization: `Bearer ${user.token}`,
                      },
                    };
                setNewMessage("")
                const { data } = await axios.post('/api/message', {
                    content: newMessage,
                    chatId : selectedChat._id
                }, config)
                // console.log(data)
               
                socket.emit("new message", data)
                setMessages([...messages, data])
                

            } catch (error) {
                toast({
                    title: "Error Occured",
                    description: "failed To send Message",
                    status: "error",
                    duration:5000,
                    isClosable: true,
                    position: "bottom",
                })      
                    }
        }      
    }
    
    const fetchMessages = async () => { 
        if (!selectedChat) return;
        try {
             const config = {
                      headers: {
                      Authorization: `Bearer ${user.token}`,
                      },
            };
            setLoading(true)
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config)
            // console.log(data)
             setMessages(data)
            setLoading(false)
            socket.emit("join chat",selectedChat._id)
        } catch (error) { 
            toast({
                title: "Error Occured",
                description: "failed To fetch Messages",
                status: "error",
                duration:5000,
                isClosable: true,
                position: "bottom",
            })      
        }
            
        
       
      
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value)
        // typing Indicator Logic
        if (!socketConnected) return
        
        if (!typing) { 
            setTyping(true)
            socket.emit("typing", selectedChat._id)
        }

        let lastTypingTime = new Date().getTime()
        var timerLength = 3000
      
        setTimeout(() => {
                var timeNow = new Date().getTime()
            var timediff = timeNow - lastTypingTime
            if (timediff >= timerLength && typing) { 
                socket.emit("stop typing", selectedChat._id)
                setTyping(false)
            }
        }, timerLength);
    }
    
    useEffect(() => {
      fetchMessages()
        
        selectedChatCompare = selectedChat
    }, [selectedChat])
    
  
   useEffect(() => {
       socket = io(ENTPOINT)
       socket.emit("setup", user)
       socket.on("connected", () => setSocketConntected(true))
       socket.on("typing", () => setIsTyping(true))
       socket.on("stop typing", () => setIsTyping(false))
   }, [])
    
     useEffect(() => {
         socket.on('message Recieved', (newMessageRecieved) => { 

             if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                 if (!notification.includes(newMessageRecieved)) {
                     setNotification([newMessageRecieved, ...notification])
                     setfetchedAgain(!fetchAgain)
                 }
             } else {
                   setMessages([...messages, newMessageRecieved])
              }
        
         })
        
    })
   
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
                          <UpdateGroupChatModal fetchAgain={fetchAgain} setfetchedAgain={setfetchedAgain} fetchMessages={ fetchMessages }/>
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
                  {loading ? (<Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />) : (<div className='messages'>{<ScrollableChat messages={ messages } /> }</div>)} 
                  <FormControl onKeyDown={sendMessage}>
                      {isTyping ?
                          <div>
                              <Lottie
                                  options={typingAnimationConfig}
                                  width={70}
                                  style={{marginBottom:15 , marginLeft:0}}
                                  
                              />
                          </div> : <></>}
                      <Input
                          variant="filled"
                          bg="#E0E0E0"
                          placeholder='Enter a Message ...'
                          onChange={typingHandler}
                          value={ newMessage }
                      ></Input>
               </FormControl>
               
              </Box>
          </>
      ) : (
              <Box
                
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              h="100%"
              >
                  <Box
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                  >
                     <Lottie 
                        width="500px"
                        options={chatAnimationConfig}
                        style={{marginBottom:15 , marginLeft:0}}
                    />  
                  </Box>
                
              <Text  fontSize="3xl" pb={3} fontFamily="Work sans"
              >
                      Click On a User To start Conversation</Text>   
                  
          </Box>
      )}</>
  )
}

export default SingleChat