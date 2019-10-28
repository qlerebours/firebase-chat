import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import {
  Button,
  Card,
  Elevation,
  FileInput,
  FormGroup,
  InputGroup,
  ProgressBar,
  Toaster
} from "@blueprintjs/core";
import Layout from "../components/layout";
import {setUserInStorage} from "../services/storage";
import firebase from 'firebase';

const Login = () => {
  let toaster;
  let fileInput;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  const handleImageUpload = (evt) => {
    console.log(evt.target.files);
    const task = firebase.storage().ref(`/users/avatar/${email}`).put(evt.target.files[0]);
    task.on('state_changed', handleTransfer, handleUploadFailed, () => handleUploadSucceed(task));
    // TODO upload the image (with evt.target.files[0])
    // TODO handle task change
  };

  const handleTransfer = (transfer) => {
    setFileUploadProgress((transfer.bytesTransferred / transfer.totalBytes) * 100);
  };

  const handleUploadFailed = () => {
    toaster = Toaster.create();
    toaster.show({ intent: 'danger', message: 'Couldnt upload the file' });
  };

  const handleUploadSucceed = async (task) => {
    const downloadUrl = await task.snapshot.ref.getDownloadURL();
    console.log(downloadUrl);
    setProfilePictureUrl(downloadUrl);
    toaster = Toaster.create();
    toaster.show({ intent: 'primary', message: 'File uploaded successfully' });
  };

  const submit = async () => {
    toaster = Toaster.create();
    if(!email || !password || password !== passwordConfirm) {
      toaster.show({ intent: 'danger', message: 'Invalid data' });
      return;
    }

    // TODO
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const firebaseUser = firebase.auth().currentUser;

    console.log(firebaseUser);
    await addUserInDatabase(firebaseUser);
  };

  const addUserInDatabase = async (firebaseUser) => {
    const user = {
      uid: firebaseUser.uid,
      email,
      profilePictureUrl,
    };

    // TODO
    // await firebase.database().ref('/users').push(user);
    setUserInStorage(user);
    Router.push('/chat');
  };

  return (
    <Layout>
      <div className="flex-center page-full-height background-nature">
        <Card elevation={Elevation.TWO}>
          <div className="flex-center">
            <h2 className="text-center">Login</h2>
          </div>

          <FormGroup
            label="Email address"
            labelFor="password"
            labelInfo="(required)"
          >
            <InputGroup
              id="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              leftIcon="envelope"
              placeholder="Email address..."
            />
          </FormGroup>

          <FormGroup
            label="Password"
            labelFor="password"
            labelInfo="(required)"
          >
            <InputGroup
              id="password"
              type="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              leftIcon="lock"
              placeholder="Password..."
            />
          </FormGroup>

          <FormGroup
            label="Confirm password"
            labelFor="password-confirm"
            labelInfo="(required)"
          >
            <InputGroup
              id="password-confirm"
              value={passwordConfirm}
              type="password"
              onChange={(evt) => setPasswordConfirm(evt.target.value)}
              leftIcon="lock"
              placeholder="Confirm password..."
            />
          </FormGroup>

          <FormGroup
            label="Avatar"
            labelFor="avatar"
          >
            <FileInput
              text="Select a picture..."
              onInputChange={handleImageUpload}
              ref={(ref) => fileInput = ref}
            />
          </FormGroup>

          <FormGroup>
            <ProgressBar intent="primary" value={fileUploadProgress / 100} stripes={false} />
            {
              fileUploadProgress > 0 && <p className="text-center">{Math.round(fileUploadProgress)}%</p>
            }
          </FormGroup>

          <div className="flex-center">
            <Button onClick={submit} intent="primary">Submit</Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
