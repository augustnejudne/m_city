import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout.js';

import FormField from '../../UI/FormField';
import { validate } from '../../UI/misc';
import { CircularProgress } from '@material-ui/core';

import { firebaseMatches, firebaseTeams, firebaseDB } from '../../../firebase';
import { firebaseLooper } from '../../UI/misc';

class AddEditMatch extends Component {
  state = {
    isLoading: true,
    matchId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    teams: [],
    formData: {
      final: {
        element: 'select',
        value: '',
        config: {
          label: 'Game played',
          name: 'select_played',
          type: 'select',
          options: [{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      result: {
        element: 'select',
        value: '',
        config: {
          label: 'Team results',
          name: 'select_result',
          type: 'select',
          options: [
            { key: 'W', value: 'W' },
            { key: 'L', value: 'L' },
            { key: 'D', value: 'D' },
            { key: 'n/a', value: 'n/a' },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      stadium: {
        element: 'input',
        value: '',
        config: {
          label: 'Stadium',
          name: 'input_stadium',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      referee: {
        element: 'input',
        value: '',
        config: {
          label: 'Referee',
          name: 'input_referee',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      date: {
        element: 'input',
        value: '',
        config: {
          label: 'Event date',
          name: 'input_date',
          type: 'date',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: true,
      },
      local: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a local team',
          name: 'select_local',
          type: 'select',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      resultLocal: {
        element: 'input',
        value: '',
        config: {
          label: 'Result local',
          name: 'input_result_local',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      away: {
        element: 'select',
        value: '',
        config: {
          label: 'Select an away team',
          name: 'select_away',
          type: 'select',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
      resultAway: {
        element: 'input',
        value: '',
        config: {
          label: 'Result away',
          name: 'input_result_away',
          type: 'text',
        },
        validation: {
          required: true,
        },
        valid: false,
        validationMessage: '',
        showLabel: false,
      },
    },
  };

  componentDidMount() {
    const matchId = this.props.match.params.id;
    const getTeams = (match, type) => {
      firebaseTeams.once('value').then(snapshot => {
        const teams = firebaseLooper(snapshot);
        const teamOptions = [];
        snapshot.forEach(childSnapshot => {
          teamOptions.push({
            key: childSnapshot.val().shortName,
            value: childSnapshot.val().name,
          });
        });

        this.updateFields(match, teamOptions, teams, type, matchId);
        this.setState({ isLoading: false });
      });
    };

    if (!matchId) {
      getTeams(null, 'Add Match');
    } else {
      firebaseDB
        .ref(`matches/${matchId}`)
        .once('value')
        .then(snapshot => {
          const match = snapshot.val();
          console.log(match);
          getTeams(match, 'Edit Match');
        });
    }
  }

  updateFields = (match, teamOptions, teams, type, matchId) => {
    const newFormData = { ...this.state.formData };
    for (let key in newFormData) {
      if (match) {
        newFormData[key].value = match[key];
        newFormData[key].valid = true;
      }
      if (key === 'local' || key === 'away') {
        newFormData[key].config.options = teamOptions;
      }
    }

    this.setState({
      matchId,
      formType: type,
      teams,
      formData: newFormData,
    });
  };

  updateForm = element => {
    const newFormData = { ...this.state.formData };
    const newElement = { ...newFormData[element.id] };
    const myTeam = 'Man.City';

    newElement.value = element.event.target.value;

    const validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
    newFormData[element.id] = newElement;

    const resultLocal = newFormData.resultLocal.value;
    const resultAway = newFormData.resultAway.value;

    if (newFormData[element.id].config.name === 'select_local') {
      if (newElement.value !== myTeam) {
        newFormData.away.value = myTeam;
      }
    }

    if (newFormData[element.id].config.name === 'select_away') {
      if (newElement.value !== myTeam) {
        newFormData.local.value = myTeam;
      }
    }

    if (
      resultLocal &&
      resultAway &&
      newFormData.local.value &&
      newFormData.away.value
    ) {
      if (newFormData.local.value === myTeam) {
        if (resultLocal > resultAway) {
          // win
          newFormData.result.value = 'W';
        } else if (resultLocal < resultAway) {
          // lose
          newFormData.result.value = 'L';
        } else if (resultLocal === resultAway) {
          // draw
          newFormData.result.value = 'D';
        } else {
          //
        }
      } else {
        if (resultLocal > resultAway) {
          // win
          newFormData.result.value = 'L';
        } else if (resultLocal < resultAway) {
          // lose
          newFormData.result.value = 'W';
        } else if (resultLocal === resultAway) {
          // draw
          newFormData.result.value = 'D';
        } else {
          //
        }
      }
    }

    console.log(newFormData);

    this.setState({
      formError: false,
      formData: newFormData,
    });
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

    this.state.teams.forEach(team => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit['localThmb'] = team.thmb;
      }
      if (team.shortName === dataToSubmit.away) {
        dataToSubmit['awayThmb'] = team.thmb;
      }
    });

    if (formIsValid) {
      if (this.state.formType === 'Edit Match') {
        firebaseDB
          .ref(`matches/${this.state.matchId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Updated correctly');
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      } else {
        firebaseMatches
          .push(dataToSubmit)
          .then(() => {
            this.successForm('Match successfully added');
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    return (
      <AdminLayout>
        <div className="editmatch_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          {this.state.isLoading ? (
            <div className="admin_progress">
              <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
            </div>
          ) : (
            <div>
              <form onSubmit={e => this.handleSubmit(e)}>
                <FormField
                  id={'date'}
                  formData={this.state.formData.date}
                  change={element => this.updateForm(element)}
                />

                <div className="select_team_layout">
                  <div className="label_inputs">Local</div>
                  <div className="wrapper">
                    <div className="left">
                      <FormField
                        id={'local'}
                        formData={this.state.formData.local}
                        change={element => this.updateForm(element)}
                      />
                    </div>
                    <div>
                      <FormField
                        id={'resultLocal'}
                        formData={this.state.formData.resultLocal}
                        change={element => this.updateForm(element)}
                      />
                    </div>
                  </div>
                </div>

                <div className="select_team_layout">
                  <div className="label_inputs">Away</div>
                  <div className="wrapper">
                    <div className="left">
                      <FormField
                        id={'away'}
                        formData={this.state.formData.away}
                        change={element => this.updateForm(element)}
                      />
                    </div>
                    <div>
                      <FormField
                        id={'resultAway'}
                        formData={this.state.formData.resultAway}
                        change={element => this.updateForm(element)}
                      />
                    </div>
                  </div>
                </div>

                <div className="split_fields">
                  <FormField
                    id={'referee'}
                    formData={this.state.formData.referee}
                    change={element => this.updateForm(element)}
                  />
                  <FormField
                    id={'stadium'}
                    formData={this.state.formData.stadium}
                    change={element => this.updateForm(element)}
                  />
                </div>

                <div className="split_fields last">
                  <FormField
                    id={'result'}
                    formData={this.state.formData.result}
                    change={element => this.updateForm(element)}
                  />
                  <FormField
                    id={'final'}
                    formData={this.state.formData.final}
                    change={element => this.updateForm(element)}
                  />
                </div>

                <div className="admin_submit">
                  <button type="submit">
                    {this.state.formType.toUpperCase() || 'Submit'}
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

export default AddEditMatch;
