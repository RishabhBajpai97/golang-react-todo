
import { Heading, VStack } from '@chakra-ui/react';
import Todo from './Todo';


function App() {
  return <VStack paddingY="20px" w="100%" >
    <Heading fontFamily="monospace" paddingBottom="40px">Todo App</Heading>
    <Todo />
  </VStack>
}

export default App