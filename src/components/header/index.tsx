import React from 'react';

import useStore from '../../store';
import Input from '../input';

function Header(): JSX.Element {
  const addTodo = useStore(state => state.addTodo);

  return (
    <header>
      <h1>todos</h1>
      <Input placeholder="What needs to be done?" onSubmit={addTodo} />
    </header>
  );
}

export default Header;
