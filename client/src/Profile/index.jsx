import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
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
import { loadPetsWithQuery } from '../MainPageComponent/petActions';

const Profile = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  
  const dispatch=useDispatch();
  const pets=useSelector(state=>state.pets.pets);
  console.log(pets);
  
  useEffect(()=>{
    console.log(user.uid);
    dispatch(loadPetsWithQuery({userId:user.uid}))
  }, []);
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const update = async () => {
    const url = new URL(`${config.hostname}/user/update`);
    const updatedUser = { ...user, firstName, lastName, email, phone }
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
          <Grid.Column width={7}>
            <Image centered src={'mock-avatar.png'} size="small" rounded />
            <br />
            {!editMode && (
              <p className={styles.editButton} onClick={toggleEditMode}>Редагувати профіль</p>)}
            <br />
          </Grid.Column>
          {!editMode && (
            <>
              <Grid.Column width={3}>
                <div className={styles.profileInfoTextTitle}>
                  Ім'я:
        </div>
                <div className={styles.profileInfoTextTitle}>
                  Прізвище:
        </div>
                <div className={styles.profileInfoTextTitle}>
                  Email:
        </div>
                <div className={styles.profileInfoTextTitle}>
                  Номер телефону:
        </div>
              </Grid.Column>
              <Grid.Column width={6}>
                <div className={styles.profileInfoText}>
                  {firstName}
        </div>
                <div className={styles.profileInfoText}>
                {lastName}
        </div>
                <div className={styles.profileInfoText}>
                {email}
        </div>
                <div className={styles.profileInfoText}>
                {phone}
        </div>
              </Grid.Column>
            </>
          )}
          {editMode && (
            <>
              <Grid.Column width={9}>
                <Form onSubmit={update}>
                  <Form.Input
                    icon="address card"
                    iconPosition="left"
                    placeholder="Ім'я користувача"
                    type="text"
                    value={firstName}
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
            </>
          )}
        </Grid.Row>
        <Grid.Row>
          <p className={styles.myAnnouncements}>Мої оголошення</p>
        </Grid.Row>
        <PostList list={pets}></PostList>
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
