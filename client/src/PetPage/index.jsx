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
  Button,
  Loader,
} from 'semantic-ui-react';
import { config } from "../config";
import Header from '../Shared/Header'
import { getAuthHeader } from "../Auth/firebaseService";
import { bindActionCreators } from 'redux';
import InfoModal from './InfoModal';
import { findByImage } from '../MainPageComponent/petActions';

const PetPage = ({findByImage}) => {

  const [card, setCard] = useState({});
  const [loading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const url = new URL(`${config.hostname}/pet/${id}`);
    fetch(url, {
      headers: {
        Authorization: getAuthHeader(),
      },
    }).then(async (response) => {
      if (response.ok) {
        const c = await response.json()
        console.log(c);
        setCard(c);
        setIsLoading(false)
      } else {
        console.log(response);
      }
    });
  }, []);

  return loading ? (<></>) : (
    <>
      <Header />
      <Container className={styles.mainContainer}>
        <Grid container textAlign="center" style={{ paddingTop: 30 }}>

          {loading ? (
            <Loader type="Puff" color="#2b2b2bd9" height={100} width={100} />
          ) : (
              <>
                <Grid.Row>
                  <Grid.Column width={7}>
                    <Image centered src={card.animalImageLink} size="middle" rounded />
                    <Grid.Column>
                    <Button className={styles.searchButton} onClick={()=>findByImage(card._id)} color="primary" fluid size="large">
								Знайти схожчі за фото
							</Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button className={styles.searchButton} onClick={() => setShowModal(true)} color="green" fluid size="large">
                        Зконтактувати з заявником
							</Button>
                    </Grid.Column>

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
                      {card.award} 	₴
        </div>
                    <div className={styles.profileInfoText}>
                      {card.animalDescription}
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <div style={{ width: "100%", height: "300px" }}>
                    <Map center={card.lossLocationCoordinates} radius={card.allowedRadius} zoom={13 - 0.45 * (card.allowedRadius / 1000)} />
                  </div>
                </Grid.Row>
              </>

            )}

        </Grid>
      </Container>
      {showModal ? <InfoModal userId={card.userId} setClose={() => { setShowModal(false) }}></InfoModal> : <></>}
    </>
  )
};

PetPage.defaultProps = {
  user: {}
};

const mapStateToProps = state => {
  return {
    user: state.auth.currentUser
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  findByImage
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PetPage);
