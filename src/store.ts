import { uid } from 'uid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { Todo, TodoStatus } from './types';

interface State {
  todos: Todo[];
  visibleTodos(status: TodoStatus): Todo[];
  activeTodoCount(): number;
  addTodo(title: string): void;
  toggleTodo(id: string): void;
  toggleAll(): void;
  updateTodo(id: string, title: string): void;
  removeTodo(id: string): void;
  removeCompletedTodo(): void;
}

const useStore = create<State, [['zustand/persist', { todos: Todo[] }], ['zustand/immer', never]]>(
  persist(
    immer((set, get) => ({
      status: '' as TodoStatus,
      todos: [] as Todo[],
      visibleTodos(status: TodoStatus): Todo[] {
        const { todos } = get();

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
      }
    })),
    {
      name: 'todo-storage',
      partialize(state) {
        return {
          todos: state.todos
        };
      }
    }
  )
);

export default useStore;
