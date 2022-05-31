import { Children, createContext, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();



    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));  
        setUser(userInfo)

        if (!userInfo) { 
            Navigate("/")
        }
      return () => {
      
      }
    }, [Navigate])
    
    return <ChatContext.Provider value={{ user , setUser }}>{ children }</ChatContext.Provider>
}

export const ChatState = () => { 
return useContext(ChatContext)
}


export default ChatProvider