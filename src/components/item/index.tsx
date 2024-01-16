import classNames from 'classnames';
import React, { useState } from 'react';

import useStore from '../../store';
import type { Todo } from '../../types';
import Input from '../input';

interface Props {
  todo: Todo;
}

function Item(props: Props): JSX.Element {
  const { todo } = props;
  const [isWritable, setIsWritable] = useState(false);
  const { toggleTodo, updateTodo, removeTodo } = useStore();
  const { id, title, completed } = todo;

  const toggleItem = () => {
    toggleTodo(id);
  };
  const removeItem = () => {
    removeTodo(id);
  };
  const updateItem = (title: string) => {
    updateTodo(id, title);
  };
  const handleDoubleClick = () => {
    setIsWritable(true);
  };
  const handleBlur = () => {
    setIsWritable(false);
  };
  const handleUpdate = (title: string) => {
    if (title.length === 0) {
      removeItem();
    } else {
      updateItem(title);
    }

    setIsWritable(false);
  };

  return (
    <li className={classNames({ completed: todo.completed })}>
      <div className="view">
        {isWritable ? (
          <Input defaultValue={title} onSubmit={handleUpdate} onBlur={handleBlur} />
        ) : (
          <>
            <input className="toggle" type="checkbox" checked={completed} onChange={toggleItem} />
            <label onDoubleClick={handleDoubleClick}>{title}</label>
            <button className="destroy" onClick={removeItem} />
          </>
        )}
      </div>
    </li>
  );
}

export default Item;
