import IImage from 'src/interfaces/IImage';
import ILabel from 'src/interfaces/ILabel';
import INote from 'src/interfaces/INote';
import ITodo from 'src/interfaces/ITodo';

export const EMPTY_NOTE: INote = {
  _id: '',
  title: '',
  text: '',
  todos: [] as ITodo[],
  images: [] as IImage[],
  labels: [] as ILabel[],
  noteData: {
    isDropdownActive: false,
    noteType: 'text',
    noteColor: 'default',
  },
};
