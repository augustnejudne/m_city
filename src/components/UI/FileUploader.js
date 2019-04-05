import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FirebaseFileUploader from 'react-firebase-file-uploader';

import { CircularProgress } from '@material-ui/core';

class FileUploader extends Component {
  state = {
    name: '',
    isUploading: false,
    fileURL: '',
  };

  static getDerivedStateFromProps = (props, state) => {
    if (props.defaultImg) {
      return (state = {
        name: props.defaultImgName,
        fileURL: props.defaultImg,
      });
    }
    return null;
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
    });
  };

  handleUploadError = () => {
    this.setState({
      isUploading: false,
    });
  };

  handleUploadSuccess = filename => {
    this.setState({
      name: filename,
    });

    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        this.setState({
          isUploading: false,
          fileURL: url,
        });
      });

    this.props.fileName(filename);
  };

  uploadAgain = () => {
    this.setState({
      name: '',
      isUploading: true,
    });

    firebase
      .storage()
      .ref(this.props.dir)
      .child(this.state.name)
      .delete()
      .then(() => {
        this.setState({
          isUploading: false,
          fileURL: '',
        });
        this.props.resetImage();
      })
      .catch(e => console.log(e));
  };

  renderFileUploader = () => {
    if (this.state.isUploading) {
      return (
        <div
          className="progress"
          style={{ textAlign: 'center', margin: '30px 0' }}
        >
          <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
        </div>
      );
    } else {
      if (!this.state.fileURL) {
        return (
          <div>
            <FirebaseFileUploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>
        );
      } else {
        return (
          <div className="image_upload_container">
            <img
              src={this.state.fileURL}
              alt={this.state.name}
              style={{ width: '100%' }}
            />
            <div className="remove" style={{cursor: 'pointer'}} onClick={() => this.uploadAgain()}>
              Remove
            </div>
          </div>
        );
      }
    }
  };

  render() {
    return (
      <div>
        <div className="label_inputs">{this.props.tag}</div>
        {this.renderFileUploader()}
      </div>
    );
  }
}

export default FileUploader;
