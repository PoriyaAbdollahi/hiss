import React, { useEffect } from 'react'
import { Container, Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react"
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'
import { Navigate } from 'react-router-dom'
const HomePage = () => {

  
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));  
      

        if (!userInfo) { 
            Navigate("/")
        }
      return () => {
      
      }
    }, [Navigate])




  return (
    <Container maxW="xl" centerContent>
      <Box
        d='flex'
        justifyContent='center'
        p={3}
        bg='white'
        w="100%"
        m='40px 0 15px 0'
        borderRadius='lg'
        borderWidth='1px'
      >
      <Text color="black" textAlign="center" fontFamily="Work sans" w='100%' fontSize='4xl'>HISS</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs color="black" variant='soft-rounded' colorScheme='messenger'>
        <TabList>
          <Tab width='50%'>Login</Tab>
          <Tab width='50%'>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel >
            <Login/> 
          </TabPanel>
          <TabPanel>
           <SignUp/> 
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Box>

    </Container>
  )
}

export default HomePage