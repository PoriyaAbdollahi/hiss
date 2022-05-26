import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, StackDivider, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const SignUp = () => {
    const [show , setShow] = useState(false)
    const [name , setName] = useState()
    const [email,setEmail]= useState()
    const [confirmPassword,setConfirmPassword]=useState();
    const [password,setPassword]=useState();
    const [pic, setPic] = useState();
    



    const handleShowClicked = () => {
        setShow(!show)
    }    
    
    const postDetail = (pic) => { }
    
     const submitHandler = () => {   }   
  return (
      <VStack spacing="5px" color="black">
          
          <FormControl id='name'>
               <FormLabel>Name</FormLabel>
               <Input placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)}/>
          </FormControl>

          <FormControl id='email'>
               <FormLabel>Email</FormLabel>
               <Input placeholder="Enter Your Name" onChange={(e) => setEmail(e.target.value)}/>
          </FormControl>
          

          <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <InputGroup>
               <Input type={show?"text":"password" } placeholder="Password Your Name" onChange={(e) => setPassword(e.target.value)} />
              <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClicked}>
                      {show ? 'Hide' : 'Show'} 
              </Button>
              </InputRightElement>
              </InputGroup>
          </FormControl>

          
          <FormControl id='confirm-password'>
              <FormLabel>Password</FormLabel>
              <InputGroup>
              <Input type={show?"text":"password" } placeholder="Confirm Password Your Name" onChange={(e) => setConfirmPassword(e.target.value)} />
              <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClicked}>
                      {show ? 'Hide' : 'Show'} 
              </Button>
              </InputRightElement>
              </InputGroup>
          </FormControl>

           <FormControl id='pic'>
               <FormLabel>Upload Your Picture</FormLabel>
              <Input type='file' p={1.5} accept="image/*" onChange={(e) => postDetail(e.target.files[0])}/>
          </FormControl>

          <Button colorScheme="blue" width='100%' style={{ marginTop: 15 }} onClick={ submitHandler }> Sign Up </Button>
        
    </VStack>
  )
}

export default SignUp