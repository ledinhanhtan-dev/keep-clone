import IImage from './IImage';
import ILabel from './ILabel';
import ITodo from './ITodo';

// prettier-ignore
export type ColorId = 'default' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'dark-blue' | 'purple' | 'pink' | 'brown' | 'gray'

export type NoteVariation = 'item' | 'add' | 'edit';
export interface INoteData {
  isDropdownActive: boolean;
  noteType: 'text' | 'todo';
  noteColor: ColorId;
}
export default interface INote {
  _id: string;
  title: string;
  text: string;
  todos: ITodo[];
  images: IImage[];
  labels: ILabel[];
  noteData: INoteData;
}
