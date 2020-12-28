import { Box, ChakraProvider } from "@chakra-ui/react";
import React from 'react';
import { Routes } from './routes';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Box bg="gray.700" minHeight="100vh">
        <Routes />
      </Box>
    </ChakraProvider>
  );
}

export default App;




