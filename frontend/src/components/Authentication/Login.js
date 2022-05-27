import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import{useToast}from"@chakra-ui/react";
import axios from 'axios';
const Login = () => {

    const [show , setShow] = useState(false)
    const [name , setName] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate();


     const handleShowClicked = () => {
        setShow(!show)
    }  

    const submitHandler = async() => {  
        if(!email || !password){
            toast({
                title: "Please fill in all the fields",
                status: "error",
                duration: "5000",
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
            return
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post("/api/user/login", { email, password }, config)
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/chats")
        } catch (error) { 
            toast({
                title: "Invalid credentials",
                status: "error",
                duration: "5000",
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
        }
           
            
         } 

  return (
    <VStack spacing="5px" color="black">
          
     
          <FormControl id='email'>
               <FormLabel>Email</FormLabel>
              <Input placeholder="Enter Your Name" onChange={(e) => setEmail(e.target.value)} value={ email }/>
          </FormControl>
          

          <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <InputGroup>
               <Input type={show?"text":"password" } placeholder="Password Your Name" onChange={(e) => setPassword(e.target.value)} value={ password } />
              <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClicked}>
                      {show ? 'Hide' : 'Show'} 
              </Button>
              </InputRightElement>
              </InputGroup>
          </FormControl>

          <Button colorScheme="blue" width='100%' style={{ marginTop: 15 }} onClick={ submitHandler }> Login </Button>
          <Button
                isLoading={loading}
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={()=>{
                      setEmail("guest@example.com");
                      setPassword("123456");
                }}>Get Guest User Credential</Button>
  
         
    </VStack>
  )
}

export default Login