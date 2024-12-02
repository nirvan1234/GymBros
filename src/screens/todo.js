import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';

const ToDo = () => {
  // State to hold the list of tasks and the currently edited task
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  // Handle adding a new task
  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = { id: Date.now().toString(), text: taskInput };
      setTasks([...tasks, newTask]);
      setTaskInput(''); // Reset input field
    }
  };

  // Handle editing a task
  const editTask = (id, text) => {
    setEditingTaskId(id); // Set the task to be edited
    setEditedTaskText(text); // Pre-fill the input with the existing task text
  };

  // Handle saving the edited task
  const saveEditedTask = () => {
    if (editedTaskText.trim()) {
      setTasks(tasks.map(task =>
        task.id === editingTaskId ? { ...task, text: editedTaskText } : task
      ));
      setEditingTaskId(null); // Reset edit mode
      setEditedTaskText('');
    }
  };

  // Handle removing a task
  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Input for adding new tasks */}
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
        value={taskInput}
        onChangeText={setTaskInput}
        placeholder="Enter new task"
      />
      <Button title="Add Task" onPress={addTask} />

      {/* List of tasks */}
      <FlatList
        testID="toDoList" // Added testID for testing purposes
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            {editingTaskId === item.id ? (
              // If task is being edited, show input and save button
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1, paddingLeft: 10 }}
                  value={editedTaskText}
                  onChangeText={setEditedTaskText}
                />
                <Button title="Save" onPress={saveEditedTask} />
              </View>
            ) : (
              // If task is not being edited, just show the task text and buttons
              <Text style={{ flex: 1 }}>{item.text}</Text>
            )}

            {editingTaskId !== item.id && (
              <>
                {/* Edit button */}
                <TouchableOpacity onPress={() => editTask(item.id, item.text)}>
                  <Text style={{ color: 'blue', marginRight: 10 }}>Edit</Text>
                </TouchableOpacity>

                {/* Remove button */}
                <TouchableOpacity onPress={() => removeTask(item.id)}>
                  <Text style={{ color: 'red' }}>Remove</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default ToDo;