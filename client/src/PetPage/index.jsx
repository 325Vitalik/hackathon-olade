import React, { useState } from 'react';
import {
  useParams
} from "@reach/router";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import {
  Button,
  Grid
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';


const PetPage = ({ user }) => {
  const [editMode, setEditMode] = useState(true);
  const [username, setUserName] = useState('');
  const [status, setStatus] = useState('');

  const disableEditMode = () => {
    setEditMode({ disabled: true });
  };

  const {id} = useParams();

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
  <p>Entered id: {id}</p>
        <Button>Знайти схожі оголошення</Button>
      </Grid.Row>
    </Grid>
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
