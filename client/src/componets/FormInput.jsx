import React from 'react';

function FormInput(props) {
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  return (
    <div className="mt-6 flex flex-col">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        className="border-2 border-black p-1 w-80"
      />
      <span>{errorMessage}</span>
    </div>
  );
}

export default FormInput;
