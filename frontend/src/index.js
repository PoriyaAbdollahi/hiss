import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import ChatProvider from './components/Context/ChatProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
      <ChatProvider>
          <ChakraProvider>
                <BrowserRouter>
                            <App />
                </BrowserRouter>
          </ChakraProvider>
      </ChatProvider>

);

