import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const Search = ({ value, onChange, children }) => {
  return (
    <Form className='mt-3'>
      <Form.Group className='mb-3'>
        <Form.Control
          type='text'
          placeholder='Keresés'
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default Search;
