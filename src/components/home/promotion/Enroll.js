import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import FormField from '../../UI/FormField';
import { validate } from '../../UI/misc';
import { firebasePromotions } from '../../../firebase';

class Enroll extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        center: true,
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        validationMessage: '',
      },
    },
  };

  updateForm = element => {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    newElement.value = element.event.target.value;

    const validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData,
    });
  };

  resetFormSuccess = type => {
    const newFormData = { ...this.state.formData };
    for (let key in newFormData) {
      newFormData[key].value = '';
      newFormData[key].valid = false;
      newFormData[key].validationMessage = '';
    }
    this.setState({
      formError: false,
      formData: newFormData,
      formSuccess: type
        ? 'Succesfully enrolled!'
        : 'That email is already enrolled',
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid;
    }

    if (formIsValid) {
      firebasePromotions
        .orderByChild('email')
        .equalTo(dataToSubmit.email)
        .once('value')
        .then(snapshot => {
          if (snapshot.val() === null) {
            firebasePromotions.push(dataToSubmit);
            this.resetFormSuccess(true);
          } else {
            this.resetFormSuccess(false);
          }
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={event => this.handleSubmit(event)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormField
                id={'email'}
                formData={this.state.formData.email}
                change={element => this.updateForm(element)}
              />
              {this.state.formError ? (
                <div className="error_label">Something is wrong</div>
              ) : null}
              <div className="success_label">{this.state.formSuccess}</div>
              <button type="submit">Enroll</button>
              <div className="enroll_discl">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Architecto reiciendis consequuntur, sapiente itaque omnis
                tempore cupiditate eum quia fugit voluptate!
              </div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
