import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

function AddImage() {
  const [error, setError] = useState(null);
  const [image, setImage] = useState('');

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <input
        type="file"
        className="mt-2"
        name="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        id="validationFormik107"
        feedbackTooltip
      />
    </div>
  );
}

export default AddImage;
