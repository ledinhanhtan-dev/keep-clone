import { MouseEvent } from 'react';
import ITodo from 'src/interfaces/ITodo';
import INote, { ColorId } from 'src/interfaces/INote';

interface INoteHelper {
  convertToNoteTodo: (text: string) => ITodo[];
  convertToNoteText: (todos: ITodo[]) => string;
  generateNextNoteId: (list: INote[]) => string;
  generateColorTitle: (colorId: ColorId) => string;
  generateNextTodoId: (currentNoteId: string, todos: ITodo[]) => string;
  getButtonRect: (e: MouseEvent) => DOMRect;
  isClickedOn: (target: HTMLElement, element: string) => boolean;
}

class NoteHelper implements INoteHelper {
  convertToNoteTodo(text: string) {
    const segments = text.split('/');

    const convertedTodos = [] as ITodo[];

    for (let i = 0; i < segments.length; i++) {
      convertedTodos.push({ id: `td${i}`, checked: false, text: segments[i] });
    }

    return convertedTodos;
  }

  convertToNoteText(todos: ITodo[]) {
    return todos.map(todo => todo.text).join('/');
  }

  generateNextNoteId(notes: INote[]) {
    if (notes.length < 1) return 'nt1';
    return 'nt' + (notes.length + 1);
  }

  generateNextTodoId(currentNoteId: string, todos: ITodo[]) {
    if (todos.length < 1) return currentNoteId + '/td1';
    return currentNoteId + '/td' + (todos.length + 1);
  }

  generateColorTitle(colorId: ColorId) {
    if (colorId === 'dark-blue') return 'Dark blue';
    return colorId.replace(colorId[0], colorId[0].toUpperCase());
  }

  getButtonRect(e: MouseEvent) {
    return (e.target as HTMLButtonElement).closest('button')!.getBoundingClientRect();
  }

  isClickedOn(target: HTMLElement, element: string) {
    return target.classList.value.includes(element);
  }
}

export const noteHelper = new NoteHelper();
