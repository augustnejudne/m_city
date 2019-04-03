import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = props => {
  const template = (
    <div
      style={{
        background: props.bg,
        color: props.color,
        fontSize: `${props.size}px`,
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous',
        ...props.add,
      }}
    >
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.link}>{template}</Link>;
  } else {
    return template;
  }
};

export const firebaseLooper = snapshot => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({ ...childSnapshot.val(), id: childSnapshot.key });
  });
  return data;
};

export const validate = element => {
  let error = [true, ''];

  if (element.validation.email) {
    const isEmail = /\S+@\S+\.\S+/.test(element.value);
    const errorMessage = !isEmail ? 'Please provide an email' : '';

    error = !isEmail ? [isEmail, errorMessage] : error;
  }

  if (element.validation.required) {
    // check if value is not empty
    // if the value is not empty, then valid === true
    const isValid = element.value.trim() !== '';

    // if isValid is false, errorMessage becomes 'this field is required'
    const errorMessage = !isValid ? 'This field is required' : '';

    // if isValid is false, we change the value of error
    error = !isValid ? [isValid, errorMessage] : error;
  }
  return error;
};
