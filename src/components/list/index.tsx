import React from 'react';
import { useParams } from 'react-router-dom';

import useStore from '../../store';
import { TodoStatus } from '../../types';
import Item from '../item';

function List(): JSX.Element {
  const { status } = useParams();
  const todos = useStore(state => state.visibleTodos((status || '') as TodoStatus));
  const toggleAll = useStore(state => state.toggleAll);

  return (
    <main className="main">
      {todos.length > 0 ? (
        <div className="toggle-all-container">
          <input
            className="toggle-all"
            type="checkbox"
            checked={todos.every(todo => todo.completed)}
            onChange={toggleAll}
          />
          <label className="toggle-all-label" htmlFor="toggle-all">
            Toggle All Input
          </label>
        </div>
      ) : null}
      <ul className="todo-list">
        {todos.map(todo => (
          <Item key={todo.id} todo={todo} />
        ))}
      </ul>
    </main>
  );
}

export default List;
