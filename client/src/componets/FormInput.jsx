import React, { useState } from 'react';
import './css/inputs.css';

function FormInput(props) {
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="mt-6 flex flex-col">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        className="border rounded-md border-black p-3 w-80 h-11"
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className="text-sm text-red-600">{errorMessage}</span>
    </div>
  );
}

export default FormInput;
