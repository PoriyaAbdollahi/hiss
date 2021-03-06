import { Box } from "@chakra-ui/react"
import { useState } from "react"
import { ChatState } from "../components/Context/ChatProvider"
import ChatBox from "../components/ChatUI/ChatBox"
import MyChats from "../components/ChatUI/MyChats"
import SideDrawer from "../components/miscellaneous/SideDrawer"

const ChatPage = () => {
  const { user } = ChatState()
  const [fetchAgain, setfetchedAgain] = useState(false)
  
  return (
    <div style={{ width: "100%", marginTop:"10px" , marginRight:"20px" ,marginLeft:"20px" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setfetchedAgain={ setfetchedAgain } />}
      </Box>
     
    </div>
  )
}

export default ChatPage