import classNames from 'classnames';
import React, { type MouseEvent } from 'react';

import useStore from '../../store';
import type { TodoStatus } from '../../types';

const statusList = [
  {
    label: 'All',
    value: ''
  },
  {
    label: 'Active',
    value: 'active'
  },
  {
    label: 'Completed',
    value: 'completed'
  }
];

function Footer(): JSX.Element | null {
  const status = useStore(state => state.status);
  const todos = useStore(state => state.todos);
  const activeTodoCount = useStore(state => state.activeTodoCount());
  const changeStatus = useStore(state => state.changeStatus);
  const removeCompletedTodo = useStore(state => state.removeCompletedTodo);

  const handleChangeStatus = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const href = e.currentTarget.getAttribute('href');

    changeStatus(href as TodoStatus);
    history.replaceState(null, '', href || '/');
  };

  if (todos.length === 0) {
    return null;
  }

  return (
    <footer className="footer">
      <span className="todo-count">{`${activeTodoCount} ${activeTodoCount === 1 ? 'item' : 'items'} left`}</span>
      <ul className="filters">
        {statusList.map(item => (
          <li key={item.value}>
            <a
              href={item.value}
              className={classNames({ selected: item.value === status })}
              onClick={handleChangeStatus}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <button className="clear-completed" disabled={activeTodoCount === todos.length} onClick={removeCompletedTodo}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
