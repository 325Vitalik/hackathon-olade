import React, { useEffect, useState } from 'react';
import Map from '../GoogleMap/Map'
import {
  useParams
} from "@reach/router";
import { connect } from 'react-redux';
import styles from './styles.module.css';
import {
  Image,
  Container,
  Grid,
  Button
} from 'semantic-ui-react';
import { config } from "../config";
import Header from '../Shared/Header'
import { getAuthHeader } from "../Auth/firebaseService";
import { bindActionCreators } from 'redux';

const PetPage = () => {

  const [card, setCard] = useState({animalImageLink: 'mock-avatar.png'});
  const { id } = useParams();
  
  useEffect(() => {
    const url = new URL(`${config.hostname}/pet/${id}`);
    fetch(url,{		headers: {
			Authorization: getAuthHeader(),
		},}).then(async (response) => {
      if (response.ok) {
        const c = await response.json()
        console.log(c);
        setCard(c);
      } else {
        console.log(response);
      }
    });
  },[]);

  return (
    <>
      <Header />
      <Container className={styles.mainContainer}>
        <Grid container textAlign="center" style={{ paddingTop: 30 }}>

          <Grid.Row>
            <Grid.Column width={7}>
              <Image centered src={card.animalImageLink} size="middle" rounded />

              <Button className={styles.searchButton} onClick={()=>{}} color="primary" fluid size="large">
								Знайти схожчі за фото
							</Button>
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
                {card.animalName}
        </div>
              <div className={styles.profileInfoText}>
              {card.animalType === 'dog' ? 'собака' : 'кіт'}
        </div>
              <div className={styles.profileInfoText}>
              {card.animalBreed}
        </div>
              <div className={styles.profileInfoText}>
                {card.animalColour}
        </div>
              <div className={styles.profileInfoText}>
                {card.lossDate}
        </div>
              <div className={styles.profileInfoText}>
                {card.award}
        </div>
              <div className={styles.profileInfoText}>
                {card.animalDescription}
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
