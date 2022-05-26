import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {

    const [show , setShow] = useState(false)
    const [name , setName] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    
     const handleShowClicked = () => {
        setShow(!show)
    }  

        const submitHandler = () => {   }  

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