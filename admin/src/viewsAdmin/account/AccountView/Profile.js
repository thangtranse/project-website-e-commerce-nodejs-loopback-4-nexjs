import {
  Avatar,
  Box,

  Card,
  CardActions,
  CardContent,
  Divider,

  makeStyles, Typography
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import * as SELECTOR from 'src/saga/redux-selector';
import { SETTING } from 'src/constants';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  avatar: {
    height: 100,
    width: 100
  },
  input: {
    display: 'none',
  },
}));

const Profile = () => {

  const classes = useStyles();

  const userProfile = useSelector(state => SELECTOR.getUserProfile(state));

  return (
    <Card
      className={clsx(classes.root, classes)} s
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={SETTING.URL_IMAGE_PATH_SERVER + "/" + userProfile.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {userProfile.firstName}{` `}{userProfile.lastName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${userProfile.email}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};


export default Profile
