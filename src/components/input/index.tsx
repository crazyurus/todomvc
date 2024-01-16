import React, { type ChangeEvent, type KeyboardEvent } from 'react';

import { hasValidMinimum, sanitize } from './utils';

interface Props {
  defaultValue?: string;
  placeholder?: string;
  onSubmit(value: string): void;
  onBlur?(): void;
}

function Input(props: Props): JSX.Element {
  const { defaultValue, placeholder, onSubmit, onBlur } = props;

  const handleBlur = () => {
    if (onBlur) onBlur();
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement> & ChangeEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = e.target.value.trim();

      if (!hasValidMinimum(value, 2)) return;

      onSubmit(sanitize(value));
      e.target.value = '';
    }
  };

  return (
    <div className="input-container">
      <input
        className="new-todo"
        type="text"
        autoFocus
        placeholder={placeholder}
        defaultValue={defaultValue}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Input;
