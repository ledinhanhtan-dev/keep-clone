export type TodoType = 'item' | 'new' | 'dropdown';

export default interface ITodo {
  _id: string;
  text: string;
  checked: boolean;
  parentNote: string;
}
