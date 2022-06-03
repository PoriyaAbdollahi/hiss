import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, StackDivider, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import{useToast}from"@chakra-ui/react";
import axios from 'axios';
const SignUp = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [confirmPassword, setConfirmPassword] = useState();
    const [password, setPassword] = useState();
    const [picture, setPicture] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const history = useHistory();



    const handleShowClicked = () => {
        setShow(!show)
    }
    
    const postDetail = async (pics) => {
        setLoading(true)
        if (pics === undefined) {
            toast({
                title: "Please select a profile picture",
                status: "error",
                duration: "5000",
                isClosable: true,
                position: "bottom"
            })
            return
        }
       
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics)
            data.append("upload_preset", "chatapp")
            data.append("cloud_name", "defo7jvzc")
            await fetch("https://api.cloudinary.com/v1_1/defo7jvzc/image/upload/", {
                method: "post", body: data
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.url.toString())
                    setPicture(data.url.toString())
                    setLoading(false)
                })
                .then(()=>console.log(picture))
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        } else {
            toast({
                title: "Please select a Image",
                status: "warning",
                duration: "5000",
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)

        }
    }
    
    const submitHandler = () => {
        setLoading(true)
        if (!email || !name || !password || !confirmPassword ) {
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: "5000",
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
            return
        }
        if (password !== confirmPassword) {
            toast({
                title: "Password Do not Match",
                status: "warning",
                duration: "5000",
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
            return
        }
    
            
                 const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }
            axios.post('/api/user', { name, email, password, picture }, config)
                .then((data) => {
                  localStorage.setItem("userInfo", JSON.stringify(data))
                }).then(() => { 

             toast({
                title: "Registeration Successful",
                status: "success",
                duration: "5000",
                isClosable: true,
                position: "bottom"
             })                     
                    setLoading(false)
                    setTimeout(() => {
                         history.push("/chats")
                    }, 1000);
           
                }).catch((err) => { 
                           toast({
                title: "Error occured",
                description: err.reponse.data.message,
                status: "error",
                duration: "5000",
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
            
                })

    }




    
  return (
      <VStack spacing="5px" color="black">
          
          <FormControl id='name'>
               <FormLabel>Name</FormLabel>
               <Input placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)}/>
          </FormControl>

          <FormControl id='email'>
               <FormLabel>Email</FormLabel>
               <Input placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)}/>
          </FormControl>
          

          <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <InputGroup>
               <Input type={show?"text":"password" } placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} />
              <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClicked}>
                      {show ? 'Hide' : 'Show'} 
              </Button>
              </InputRightElement>
              </InputGroup>
          </FormControl>

          
          <FormControl id='confirm-password'>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
              <Input type={show?"text":"password" } placeholder="Confirm Your Password " onChange={(e) => setConfirmPassword(e.target.value)} />
              <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClicked}>
                      {show ? 'Hide' : 'Show'} 
              </Button>
              </InputRightElement>
              </InputGroup>
          </FormControl>

           <FormControl id='picture'>
               <FormLabel>Upload Your Picture</FormLabel>
              <Input type='file' p={1.5} accept="image/*" onChange={(e) => postDetail(e.target.files[0])}/>
          </FormControl>

          <Button colorScheme="blue" width='100%' style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}> Sign Up </Button>
        
    </VStack>
  )
}

export default SignUp