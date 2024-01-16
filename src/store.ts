import { uid } from 'uid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { Todo, TodoStatus } from './types';

interface State {
  status: TodoStatus;
  todos: Todo[];
  visibleTodos(): Todo[];
  activeTodoCount(): number;
  addTodo(title: string): void;
  toggleTodo(id: string): void;
  toggleAll(): void;
  updateTodo(id: string, title: string): void;
  removeTodo(id: string): void;
  removeCompletedTodo(): void;
  changeStatus(status: TodoStatus): void;
}

const useStore = create<State, [['zustand/immer', never]]>(
  immer((set, get) => ({
    status: '' as TodoStatus,
    todos: [],
    visibleTodos(): Todo[] {
      const { status, todos } = get();

      if (status) {
        return todos.filter(todo => {
          if (status === 'completed') {
            return todo.completed;
          }

          if (status === 'active') {
            return !todo.completed;
          }
        });
      }

      return todos;
    },
    activeTodoCount(): number {
      const { todos } = get();

      return todos.filter(todo => !todo.completed).length;
    },
    addTodo(title: string): void {
      set(state => {
        state.todos.push({
          id: uid(),
          title,
          completed: false
        });
      });
    },
    toggleTodo(id: string): void {
      set(state => {
        const todo = state.todos.find(todo => todo.id === id);

        if (todo) {
          todo.completed = !todo.completed;
        }
      });
    },
    toggleAll(): void {
      set(state => {
        const isAllCompleted = state.todos.every(todo => todo.completed);

        state.todos.forEach(todo => {
          todo.completed = !isAllCompleted;
        });
      });
    },
    updateTodo(id: string, title: string): void {
      set(state => {
        const todo = state.todos.find(todo => todo.id === id);

        if (todo) {
          todo.title = title;
        }
      });
    },
    removeTodo(id: string): void {
      set(state => {
        const index = state.todos.findIndex(todo => todo.id === id);

        state.todos.splice(index, 1);
      });
    },
    removeCompletedTodo(): void {
      set(state => {
        state.todos = state.todos.filter(todo => !todo.completed);
      });
    },
    changeStatus(status: TodoStatus): void {
      set(state => {
        state.status = status;
      });
    }
  }))
);

export default useStore;
