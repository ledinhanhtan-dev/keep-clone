export type TodoType = 'item' | 'new' | 'dropdown';

export default interface ITodo {
  id: string;
  checked: boolean;
  text: string;
}
