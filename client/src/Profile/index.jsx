import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import {
  Button,
  Form,
  Grid,
  Image,
  Icon
} from 'semantic-ui-react';
import {toast } from 'react-toastify';
import { bindActionCreators } from 'redux';

const Profile = ({ user }) => {
  const [editMode, setEditMode] = useState(true);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  console.log(user)
  const toggleEditMode = () => {
    console.log(editMode)
    setEditMode(!editMode);
  };

  const update = async () => {
    if (!firstName||!lastName) {
      toast.warn(`Для збереження необхідно заповнити поля ім'я та прізвища`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    try {
      toggleEditMode();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid container textAlign="center" style={{ paddingTop: 30 }}>
      <Grid.Row>
        <Grid.Column width={6}>
          <Image centered src={'mock-avatar.png'} size="small" rounded />
          <br />
          <br />
        </Grid.Column>
        <Grid.Column width={10}>

          {editMode.disabled && (
            <>
              <div className={styles.profileInfoRow} onDoubleClick={toggleEditMode}>
                <Icon disabled name='user' size="large" />
                <p className={styles.profileInfoText}>{firstName}</p>
              </div>
              <br />
              <div className={styles.profileInfoRow} onDoubleClick={toggleEditMode}>
                <Icon disabled name='user' size="large" />
                <p className={styles.profileInfoText}>{lastName}</p>
              </div>
              <br />
              <div className={styles.profileInfoRow} onDoubleClick={toggleEditMode}>
                <Icon disabled name='at' size="big" />
                <p className={styles.profileInfoText}>{email}</p>
              </div>
              <br />
              <div className={styles.profileInfoRow} onDoubleClick={toggleEditMode}>
                <Icon disabled name='phone' size="large" />
                <p className={styles.profileInfoText}>{phone}</p>
              </div>
            </>
          )}
          {!editMode.disabled && (
            <Form onSubmit={update}>
              <Form.Input
                icon="address card"
                iconPosition="left"
                placeholder="Ім'я користувача"
                type="text"
                value={user.firstName}
                onChange={ev => setFirstName(ev.target.value)}
              />
              <Form.Input
                icon="address card"
                iconPosition="left"
                placeholder="Прізвище користувача"
                type="text"
                value={lastName}
                onChange={ev => setLastName(ev.target.value)}
              />
              <Form.Input
                icon="at"
                iconPosition="left"
                placeholder="Електронна пошта"
                type="email"
                value={email}
                onChange={ev => setEmail(ev.target.value)}
              />
              <Form.Input
                icon="phone"
                iconPosition="left"
                placeholder="Номер телефону"
                type="text"
                value={phone}
                onChange={ev => setPhone(ev.target.value)}
              />
              <br />
              <div className={styles.buttonContainer}>
                <Button color="teal" type="submit" onClick={process}>Зберегти</Button>
                <Button className={styles.button} onClick={toggleEditMode}>Відмінити</Button>
              </div>
            </Form>
          )}

        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <p className={styles.myAnnouncements}>Мої оголошення</p>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.currentUser
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
