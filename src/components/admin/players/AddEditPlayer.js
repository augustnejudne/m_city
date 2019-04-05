import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';

import FileUploader from '../../UI/FileUploader';
import FormField from '../../UI/FormField';
import { validate } from '../../UI/misc';
import { CircularProgress } from '@material-ui/core';

import { firebasePlayers, firebaseDB, firebase } from '../../../firebase';

class AddEditPlayer extends Component {
  state = {
    isLoading: true,
    playerId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    defaultImg: '',
    formData: {
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Name',
          name: 'input_name',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Last Name',
          name: 'input_lastname',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      number: {
        element: 'input',
        value: '',
        config: {
          label: 'Player Number',
          name: 'input_number',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Player Position',
          name: 'select_Position',
          type: 'select',
          options: [
            { key: 'Keeper', value: 'Keeper' },
            { key: 'Defence', value: 'Defence' },
            { key: 'Midfield', value: 'Midfield' },
            { key: 'Striker', value: 'Striker' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
    },
  };

  componentDidMount() {
    const playerId = this.props.match.params.id;

    if (!playerId) {
      this.updateFields(null, 'Add Player', playerId);
      this.setState({ isLoading: false });
    } else {
      firebaseDB
        .ref(`players/${playerId}`)
        .once('value')
        .then(snapshot => {
          const playerData = snapshot.val();
          firebase
            .storage()
            .ref('players')
            .child(playerData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(playerData, 'Edit Player', playerId, url);
              this.setState({ isLoading: false });
            })
            .catch( e => {
              this.updateFields({...playerData, image: ''}, 'Edit Player', playerId, '');
              this.setState({ isLoading: false });
            })
        });
    }
  }

  updateFields = (player, formType, playerId, defaultImg) => {
    const newFormData = { ...this.state.formData };
    for (let key in newFormData) {
      if (player) {
        newFormData[key].value = player[key];
        newFormData[key].valid = true;
      }
    }

    this.setState({
      playerId,
      defaultImg,
      formType,
      formData: newFormData,
    });
  };

  updateForm = (element, content = '') => {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };

    if(content === '') {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content
    }

    const validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newFormData[element.id] = newElement;

    this.setState({
      formError: false,
      formData: newFormData,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      if (this.state.formData[key].valid === false) {
        formIsValid = false;
      }
    }

    if (formIsValid) {
      if (this.state.formType === 'Edit Player') {
        firebaseDB
          .ref(`players/${this.state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Updated correctly');
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      } else {
        firebasePlayers
          .push(dataToSubmit)
          .then(() => {
            this.successForm('Player successfully added');
            this.props.history.push('/admin/players');
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({ formError: true });
    }
  };

  successForm = message => {
    this.setState({
      formSuccess: message,
    });

    setTimeout(() => {
      this.setState({
        formSuccess: '',
      });
    }, 2000);
  };

  resetImage = () => {
    const newFormData = {...this.state.formData}
    newFormData['image'].value = '';
    newFormData['image'].valid = false;
    this.setState({
      defaultImg: '',
      formData: newFormData
    })
  }

  storeFileName = (fileName) => {
    this.updateForm({id: 'image'}, fileName)
  }

  render() {
    console.log(this.state.formData);
    return (
      <AdminLayout>
        <div className="editplayers_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          {this.state.isLoading ? (
            <div className="admin_progress">
              <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
            </div>
          ) : (
            <div>
              <form onSubmit={e => this.handleSubmit(e)}>
                <FileUploader
                  dir="players"
                  tag="Player Image"
                  defaultImg={this.state.defaultImg}
                  defaultImgName={this.state.formData.image.value}
                  resetImage={()=> this.resetImage()}
                  fileName={(fileName) => this.storeFileName(fileName)}
                />
                <FormField
                  id={'name'}
                  formData={this.state.formData.name}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={'lastname'}
                  formData={this.state.formData.lastname}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={'number'}
                  formData={this.state.formData.number}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={'position'}
                  formData={this.state.formData.position}
                  change={element => this.updateForm(element)}
                />
                <div className="admin_submit">
                  <button type="submit">
                    {this.state.formType || 'Submit'}
                  </button>
                </div>
                <div className="success_label">{this.state.formSuccess}</div>
                {this.state.formError ? (
                  <div className="error_label">Something is wrong</div>
                ) : null}
              </form>
            </div>
          )}
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditPlayer;
