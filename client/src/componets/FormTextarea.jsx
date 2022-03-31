import React, { useState } from 'react';
import './css/inputs.css';

function FormTextarea(props) {
  const { label, errorMessage, onChange, id, ...textareaProps } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="mt-6 flex flex-col">
      <label>{label}</label>
      <textarea
        {...textareaProps}
        onChange={onChange}
        className="border rounded-md border-black p-3 w-80"
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className="text-sm text-red-600">{errorMessage}</span>
    </div>
  );
}

export default FormTextarea;
