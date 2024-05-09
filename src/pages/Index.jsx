import { useState } from 'react';
import { Container, VStack, Input, Button, Text, Box, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        description: "Please enter a task description.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newTask = { id: Date.now(), description: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="100%">
        <Text fontSize="2xl" pb={4}>Todo App</Text>
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="lg"
        />
        <Button onClick={addTask} colorScheme="blue" size="lg">Add Task</Button>
        <VStack spacing={4} w="100%">
          {tasks.map(task => (
            <Box key={task.id} w="100%" p={4} borderWidth="1px" borderRadius="lg" display="flex" justifyContent="space-between" alignItems="center">
              <Text as={task.completed ? 's' : ''}>{task.description}</Text>
              <Box>
                <IconButton icon={<FaCheck />} isRound="true" aria-label="Complete Task" onClick={() => toggleCompletion(task.id)} m={1} />
                <IconButton icon={<FaTrash />} isRound="true" aria-label="Delete Task" onClick={() => deleteTask(task.id)} m={1} />
              </Box>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;