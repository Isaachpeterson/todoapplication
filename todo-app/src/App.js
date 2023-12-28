import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CssBaseline, AppBar, Toolbar, Typography, Container, Paper, Checkbox, IconButton, Fab, ThemeProvider, createTheme, TextField, List, ListItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      // Each todo is now an object with a unique ID and text
      setTodos([...todos, { id: uuidv4(), text: newTodo.trim() }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'center', color: 'white' }}>
            Isaac's Todo List
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Paper sx={{ mt: 2, p: 2, backgroundColor: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Add a new todo'
              value={newTodo}
              onChange={handleNewTodoChange}
              sx={{ mr: 1, color: 'white' }}
            />
            <Fab color='primary' aria-label='add' size='small' sx={{ bgcolor: 'cyan', '&:hover': { bgcolor: 'darkcyan'} }} onClick={addTodo}>
              <AddIcon />
            </Fab>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <List {...provided.droppableProps} ref={provided.innerRef}>
                  {todos.map((todo, index) => (
                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
                      {(provided) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style, display: 'flex', alignItems: 'center', marginBottom: 8 }}
                        >
                          <DragIndicatorOutlinedIcon sx={{ color: 'grey' }} />
                          <Checkbox
                            sx={{
                              '&.Mui-checked': {
                                color: 'green', // Checked state
                              },
                            }}
                          />
                          <Typography variant='body1' sx={{ flexGrow: 1 }}>
                            {todo.text}
                          </Typography>
                          <IconButton aria-label='delete' onClick={() => deleteTodo(todo.id)} sx={{
                            color: 'white',
                            '&:hover': {
                              color: 'red',
                              backgroundColor: 'transparent'
                            },
                          }}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;