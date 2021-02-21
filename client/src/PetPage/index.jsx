import React, { useState } from 'react';
import Map from '../GoogleMap/Map'
import {
  useParams
} from "@reach/router";
import { connect } from 'react-redux';
import styles from './styles.module.css';
import {
  Image,
  Container,
  Grid
} from 'semantic-ui-react';
import Header from '../Shared/Header'
import { bindActionCreators } from 'redux';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const PetPage = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [username, setUserName] = useState('');
  const [status, setStatus] = useState('');

  const disableEditMode = () => {
    setEditMode({ disabled: true });
  };

  const { id } = useParams();

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
    <>
      <Header />
      <Container className={styles.mainContainer}>
        <Grid container textAlign="center" style={{ paddingTop: 30 }}>

          <Grid.Row>
            <Grid.Column width={7}>
              <Image centered src={'mock-avatar.png'} size="middle" rounded />
              <br />
              {!editMode && (
                <p className={styles.editButton}>Редагувати оголошення</p>)}
              <br />
            </Grid.Column>
            <Grid.Column width={3}>
              <div className={styles.profileInfoTextTitle}>
                Кличка:
        </div>
              <div className={styles.profileInfoTextTitle}>
                Вид тварини:
        </div>
              <div className={styles.profileInfoTextTitle}>
                Порода:
        </div>
              <div className={styles.profileInfoTextTitle}>
                Колір:
        </div>
              <div className={styles.profileInfoTextTitle}>
                Дата втрати:
        </div>
              <div className={styles.profileInfoTextTitle}>
                Винагорода:
        </div>
              <div className={styles.profileInfoTextTitle}>
                Опис:
        </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <div className={styles.profileInfoText}>
                Бобік
        </div>
              <div className={styles.profileInfoText}>
                Собакен
        </div>
              <div className={styles.profileInfoText}>
                Лабрадор
        </div>
              <div className={styles.profileInfoText}>
                Коричневий
        </div>
              <div className={styles.profileInfoText}>
                02.12.2020
        </div>
              <div className={styles.profileInfoText}>
                100$
        </div>
              <div className={styles.profileInfoText}>
                Красивий песик без лапок
        </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <div style={{ width: "100%", height: "300px" }}>
              <Map center={{ lat: 49.8699409, lng: 24.0089085 }} zoom={13} />
            </div>
          </Grid.Row>
        </Grid>
      </Container>
    </>

  );
};

PetPage.propTypes = {

};

PetPage.defaultProps = {
  user: {}
};

const mapStateToProps = state => {
  return {
    user: state.auth.currentUser
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PetPage);
