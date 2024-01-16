import classNames from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import useStore from '../../store';

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
  const { status } = useParams();
  const todos = useStore(state => state.todos);
  const activeTodoCount = useStore(state => state.activeTodoCount());
  const removeCompletedTodo = useStore(state => state.removeCompletedTodo);

  if (todos.length === 0) {
    return null;
  }

  return (
    <footer className="footer">
      <span className="todo-count">{`${activeTodoCount} ${activeTodoCount === 1 ? 'item' : 'items'} left`}</span>
      <ul className="filters">
        {statusList.map(item => (
          <li key={item.value}>
            <Link to={'/' + item.value} className={classNames({ selected: item.value === status })} replace>
              {item.label}
            </Link>
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
