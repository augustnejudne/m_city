import React from 'react';

const FormField = ({ formData, id, change }) => {
  const showError = () => {
    const errorMessage = (<div className="error_label">
        {
          formData.validation && !formData.valid
            ? formData.validationMessage
            : null
        }
      </div>)

    return errorMessage;
  }

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formData.element) {
      case 'input':
        formTemplate = (
          <div>
            {
              formData.showLabel
              ? <div className="label_inputs">{formData.config.label}</div>
              : null
            }
            <input
              {...formData.config}
              value={formData.value}
              onChange={event => change({ event, id })}
              style={{textAlign: formData.center ? 'center' : 'left' }}
            />
            {showError()}
          </div>
        );
        break;
      case 'select':
        formTemplate = (
          <div>
            {
              formData.showLabel
              ? <div className="label_inputs">{formData.config.label}</div>
              : null
            }
            <select
              {...formData.config}
              value={formData.value}
              onChange={event => change({ event, id })}
            >
              <option value="" default disabled>Select one</option>
              {
                formData.config.options.map((item, i) => {
                  return (
                    <option key={item.key} value={item.key}>{item.value}</option>
                  )
                })
              }
            </select>
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormField;
