import axios from 'axios';
import INote from 'src/interfaces/INote';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// NOTES
export const getNotes = async () => {
  let notes: INote[] = [];

  await API.get('/notes')
    .then(res => (notes = res.data))
    .catch(error => console.log(error));

  return notes;
};
export const addNote = (newNote: INote) => {
  API.post('/notes', newNote)
    .then(res => console.log(res.data))
    .catch(error => console.log(error));
};
export const editNote = (noteId: string, editedNote: INote) => {
  API.patch(`/notes/${noteId}`, editedNote)
    .then(res => console.log(res.data))
    .catch(error => console.log(error));
};
export const deleteNote = (noteId: string) => {
  API.delete(`/notes/${noteId}`)
    .then(res => console.log(res.data))
    .catch(error => console.log(error));
};

// TODOS
export const toggleTodo = (noteId: string, todoId: string) => {
  API.patch(`/notes/${noteId}/${todoId}/toggleTodo`)
    .then(res => console.log(res.data))
    .catch(error => console.log(error));
};
