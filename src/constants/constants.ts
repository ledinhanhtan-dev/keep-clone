import INote from 'src/interfaces/INote';
import image1Path from 'src/assets/images/image-1.jpg';
import image2Path from 'src/assets/images/image-2.jpg';

const note1: INote = {
  id: 'nt1',
  title: 'Gentek',
  text: 'Citizen',
  labels: [
    { id: 'nt1/lb1', title: 'First' },
    { id: 'nt1/lb2', title: 'Second' },
    { id: 'nt1/lb3', title: 'Third' },
  ],
  images: [
    { id: 'nt1/im1', path: image1Path },
    { id: 'nt1/im2', path: image2Path },
  ],
  todos: [
    { id: 'nt1/td1', checked: false, text: '1' },
    { id: 'nt1/td2', checked: false, text: '2' },
    { id: 'nt1/td3', checked: false, text: '3' },
    { id: 'nt1/td4', checked: false, text: '4' },
  ],
  noteData: {
    isTodoDropdownActive: false,
    noteType: 'todo',
    noteColor: 'default',
  },
};

// const note2 = {
//   id: 'nt2',
//   title: 'Citizen',
//   text: '447',
//   todos: [],
//   labels: [],
// };

// const note3: INote = {
//   id: 'nt3',
//   title: 'Third',
//   text: 'Python is bad. TypeScript is da best',
//   todos: [
//     { id: 'td10', checked: false, text: 'Todo Placeholder' },
//     { id: 'td12', checked: false, text: 'Better todo' },
//   ],
//   labels: [
//     { id: 'lb1', title: 'Alpha' },
//     { id: 'lb2', title: 'Alpha Wolf In The Jungle' },
//   ],
//   noteData: {
//     isTodoDropdownActive: false,
//     noteType: 'text',
//     noteColor: 'red',
//   },
// };

export const DUMMY_NOTES = [note1];
