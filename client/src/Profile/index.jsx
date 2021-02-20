import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles.module.css'; 
import {
  Button,
  Form,
  Grid,
  Image,
  Icon
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';

const Profile = ({ user}) => {
  const [editMode, setEditMode] = useState(true);
  const [username, setUserName] = useState('');
  const [status, setStatus] = useState('');

  const disableEditMode = () => {
    setEditMode({ disabled: true });
  };

  const update = async () => {
    if (!username) {
      return;
    }
    try {
      disableEditMode();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid container textAlign="center" style={{ paddingTop: 30 }}>
      <Grid.Row>
        <Grid.Column width={6}>
          <Image centered src={'download.png'} size="medium" rounded />
          <br />
          <br />
        </Grid.Column>
        <Grid.Column width={10}>

          {editMode.disabled && (
            <>
              <div className={styles.profileInfoRow} onDoubleClick={() => setEditMode({ disabled: false })}>
                <Icon disabled name='user' size="large" />
                <p className={styles.profileInfoText}>Слободяник Максим</p>
              </div>
              <br/>
              <div className={styles.profileInfoRow} onDoubleClick={() => setEditMode({ disabled: false })}>
                <Icon disabled name='at' size="big" />
                <p className={styles.profileInfoText}>maxslobodianyk@gmail.com</p>
              </div>
              <br/>
              <div className={styles.profileInfoRow} onDoubleClick={() => setEditMode({ disabled: false })}>
                <Icon disabled name='phone' size="large" />
                <p className={styles.profileInfoText}>+38(095)305-09-11</p>
              </div>
            </>
          )}
          {!editMode.disabled && (
            <Form onSubmit={update}>
              <Form.Input
                icon="user"
                iconPosition="left"
                placeholder="Ім'я користувача"
                type="text"
                value={username}
                onChange={ev => setUserName(ev.target.value)}
                isabled={editMode}
              />
              <Form.Input
                icon="at"
                iconPosition="left"
                placeholder="Електронна пошта"
                type="email"
                value={status}
                onChange={ev => setStatus(ev.target.value)}
                isabled={editMode}
              />
              <Form.Input
                icon="phone"
                iconPosition="left"
                placeholder="Номер телефону"
                type="text"
                disabled
                value={''}
                disabled={editMode}
              />
              <br />
                <div className={styles.buttonContainer}>
                  <Button color="teal" type="submit">Зберегти</Button>
                  <Button className={styles.button} onClick={() => disableEditMode}>Відмінити</Button>
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

Profile.propTypes = {

};

Profile.defaultProps = {
  user: {}
};

const mapStateToProps = state => {
  console.log(state)
  return {
  user: state.auth.currentUser
}};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
