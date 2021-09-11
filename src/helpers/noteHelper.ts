import { ObjectId } from 'bson';
import { MouseEvent } from 'react';
import INote, { ColorId, INoteData } from 'src/interfaces/INote';
import { EMPTY_NOTE } from 'src/constants/constants';
import ITodo from 'src/interfaces/ITodo';

interface INoteHelper {
  generateObjectId: () => string;
  generateColorTitle: (colorId: ColorId) => string;
  generateEmptyNote: (noteType: 'text' | 'todo') => INote;

  convertToNoteText: (todos: ITodo[]) => string;
  convertToNoteTodo: (noteId: string, text: string) => ITodo[];

  getButtonRect: (e: MouseEvent) => DOMRect;
  isClickedOn: (target: HTMLElement, element: string) => boolean;
}

class NoteHelper implements INoteHelper {
  generateEmptyNote(noteType: 'text' | 'todo') {
    const _id = this.generateObjectId();

    const noteData: INoteData = {
      noteType,
      noteColor: 'default',
      isDropdownActive: false,
    };

    return { ...EMPTY_NOTE, _id, noteData };
  }

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

const reader = new FileReader();

const recursion = (files: File[], arr: string[]) => {
  if (files.length < 1) return arr;

  reader.onloadend = () => {
    arr.push(reader.result as string);
    recursion(files, arr);
    console.log(arr);
  };

  reader.readAsDataURL(files.pop() as Blob);
};

export const generateEmptyNoteWithImages = (files: FileList) => {
  // const _id = noteHelper.generateObjectId();

  // console.log(Array.from(files));

  // let images: IImage[] = [];

  // Array.from(files).forEach(file => {
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     images.push({
  //       _id: noteHelper.generateObjectId(),
  //       preview: reader.result as string,
  //     });

  //     console.log(images);
  //   };

  //   reader.readAsDataURL(file);
  // });

  // console.log('END');

  const arrFiles = Array.from(files);

  recursion(arrFiles, []);

  // console.log(strArr);

  return { ...EMPTY_NOTE };
};
