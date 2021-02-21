import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import {
  Button,
  Form,
  Grid,
  Image,
  Container
} from 'semantic-ui-react';
import Header from '../Shared/Header'
import { PostList } from '../Shared/PostListComponent'
import { bindActionCreators } from 'redux';
import { config } from "../config";

const Profile = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const update = async () => {
    const url = new URL(`${config.hostname}/user/update`);
    const updatedUser = {...user, firstName,lastName,email,phone}
    try {
      fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ user: updatedUser }),
			}).then(async (postResponse) => {
				if (postResponse.ok) {

          toggleEditMode();
				} else {
					console.log(postResponse);
				}
			});
    } catch (e) {
      console.log(e);
    }
  };

  return (<>
    <Header />
    <Container className={styles.mainContainer}>
      <Grid container textAlign="center" style={{ paddingTop: 30 }}>
        <Grid.Row>
          <Grid.Column width={6}>
            <Image centered src={'mock-avatar.png'} size="small" rounded />
            <br />
            {!editMode && (
              <p className={styles.editButton} onClick={toggleEditMode}>Edit profile</p>)}
            <br />
          </Grid.Column>
          <Grid.Column width={10}>
            <Form onSubmit={update}>
              <Form.Input
                icon="address card"
                iconPosition="left"
                placeholder="Ім'я користувача"
                type="text"
                value={user.firstName}
                disabled={!editMode}
                onChange={ev => setFirstName(ev.target.value)}
              />
              <Form.Input
                icon="address card"
                iconPosition="left"
                placeholder="Прізвище користувача"
                type="text"
                value={lastName}
                disabled={!editMode}
                onChange={ev => setLastName(ev.target.value)}
              />
              <Form.Input
                icon="at"
                iconPosition="left"
                placeholder="Електронна пошта"
                type="email"
                value={email}
                disabled={!editMode}
                onChange={ev => setEmail(ev.target.value)}
              />
              <Form.Input className={styles.infoInput}
                icon="phone"
                iconPosition="left"
                placeholder="Номер телефону"
                type="text"
                value={phone}
                disabled={!editMode}
                onChange={ev => setPhone(ev.target.value)}
              />
              <br />
              {editMode && (
                <div className={styles.buttonContainer}>
                  <Button color="teal" type="submit">Зберегти</Button>
                  <Button className={styles.button} onClick={() => toggleEditMode()}>Відмінити</Button>
                </div>
              )}
            </Form>


          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <p className={styles.myAnnouncements}>Мої оголошення</p>
        </Grid.Row>
        <PostList list={[1, 2, 3, 4, 5, 6, 7, 8, 9]}></PostList>
      </Grid>
    </Container>
  </>

  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.currentUser
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
