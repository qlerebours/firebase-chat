import React, {useEffect, useState} from 'react';
import {Button, Card, Elevation, FormGroup, H5, TextArea} from "@blueprintjs/core";
import Layout from "../components/layout";
import {Intent} from "@blueprintjs/core/lib/cjs/common/intent";
import {getUserInStorage} from "../services/storage";

const Login = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    const user = getUserInStorage();
    setCurrentUser(user);
    joinRoom(user);
    handleNewUsers();
    handleNewMessages();
  }, []);

  const joinRoom = (user) => {
    // TODO
  };

  const handleNewMessages = () => {
    // TODO
  };

  const handleNewUsers = () => {
    // TODO
  };

  const submitMessage = () => {
    // TODO
    setCurrentMessage("");
  };

  const onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      submitMessage();
    }
  };


  return (
    <Layout>
      <div className="flex-center page-full-height background-nature flex-column p-3">
        <Card elevation={Elevation.TWO} className="flex-1 full-width mb-2">
          <H5>
            Users
          </H5>
          <div className="d-flex">
            {
              users.map(u => (
                <div className="avatar-wrapper">
                  <img key={u.uid} src={u.profilePictureUrl} className="avatar" alt="user image" />
                </div>
              ))
            }
          </div>
          {
            users.length === 0 && <p>No one is in the chat :-(</p>
          }
        </Card>


        <Card elevation={Elevation.TWO} className="flex-4 full-width mb-2  d-flex flex-column">
          <H5>
            Messages
          </H5>
          <div className="d-flex flex-column justify-flex-end flex-1">
            {
              messages.map(m => (
                <div key={m.text} className={`message ${m.userUid === currentUser.uid ? 'as--mine' : ''}`}>{m.text}</div>
              ))
            }
          </div>
          {
            messages.length === 0 && <p>No messages right now</p>
          }
        </Card>


        <Card elevation={Elevation.TWO} className="flex-1 full-width">
            <FormGroup
              label="Type a message"
              labelFor="message"
            >
              <TextArea
                growVertically={true}
                large={true}
                intent={Intent.PRIMARY}
                onChange={(evt) => setCurrentMessage(evt.target.value)}
                value={currentMessage}
                className="full-width"
                onKeyDown={onEnterPress}
              />
            </FormGroup>

          <div className="flex-right">
            <Button onClick={submitMessage} intent="primary">Submit</Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
