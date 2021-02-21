import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import {
  Modal,
  Grid
} from 'semantic-ui-react';
import { config } from "../config";
import { getAuthHeader } from "../Auth/firebaseService";
import { bindActionCreators } from 'redux';

const InfoModal = ({ userId, setClose }) => {
  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    firstName:'Maksym',
    lastName:'Slobodianyk',
    email:'gmail.com',
    phone:'23423535'
  });

  useEffect(() => {
    const url = new URL(`${config.hostname}/user/${userId}`);
    fetch(url, {
      headers: {
        Authorization: getAuthHeader(),
      },
    }).then(async (response) => {
      if (response.ok) {
        const u = await response.json()
        console.log(u);
        setUser(u);
        setIsLoading(false)
      } else {
        console.log(response);
      }
    });
  }, []);

  return loading ? (<></>) : (
    <Modal
      onClose={() => setClose(false)}
      open={true}
    >
      <Modal.Header>Контактна інформація</Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Column width={8}>
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
          <Grid.Column width={8}>
            <div className={styles.profileInfoText}>
              {user.firstName}
            </div>
            <div className={styles.profileInfoText}>
              {user.lastName}
            </div>
            <div className={styles.profileInfoText}>
              {user.email}
            </div>
            <div className={styles.profileInfoText}>
              {user.phone}
            </div>
          </Grid.Column>

        </Grid>
      </Modal.Content>
    </Modal>
  )
};

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoModal);
