import { MouseEvent } from 'react';
import ITodo from 'src/interfaces/ITodo';
import { ColorId } from 'src/interfaces/INote';
import { ObjectId } from 'bson';

interface INoteHelper {
  generateObjectId: () => string;
  generateColorTitle: (colorId: ColorId) => string;

  convertToNoteText: (todos: ITodo[]) => string;
  convertToNoteTodo: (noteId: string, text: string) => ITodo[];

  getButtonRect: (e: MouseEvent) => DOMRect;
  isClickedOn: (target: HTMLElement, element: string) => boolean;
}

class NoteHelper implements INoteHelper {
  generateObjectId() {
    return new ObjectId().toHexString();
  }

  generateColorTitle(colorId: ColorId) {
    if (colorId === 'dark-blue') return 'Dark blue';
    return colorId.replace(colorId[0], colorId[0].toUpperCase());
  }

  convertToNoteText(todos: ITodo[]) {
    return todos.map(todo => todo.text).join('/');
  }

  convertToNoteTodo(noteId: string, text: string) {
    const segments = text.split('/');

    const convertedTodos = [] as ITodo[];

    segments.forEach(segment => {
      const newTodo: ITodo = {
        _id: this.generateObjectId(),
        parentNote: noteId,
        checked: false,
        text: segment,
      };

      convertedTodos.push(newTodo);
    });

    return convertedTodos;
  }

  getButtonRect(e: MouseEvent) {
    return (e.target as HTMLButtonElement).closest('button')!.getBoundingClientRect();
  }

  isClickedOn(target: EventTarget, element: string) {
    return (target as HTMLElement).classList.value.includes(element);
  }
}

export const noteHelper = new NoteHelper();
