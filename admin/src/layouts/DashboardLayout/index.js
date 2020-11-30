import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { SETTING } from "src/constants";
import { fetchProfileUser } from 'src/saga/action';
import * as SELECTOR from 'src/saga/redux-selector';
import NavBar from './NavBar';
import TopBar from './TopBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const profile = useSelector(state => SELECTOR.getUserProfile(state));
  const isAuth = useSelector(state => SELECTOR.isAuthSelector(state));

  useEffect(() => {
    dispatch(fetchProfileUser())
  }, [])

  if (!isAuth) return <Navigate to="/login" />

  return (
    <div className={classes.root}>
      <TopBar
        onMobileNavOpen={() => setMobileNavOpen(true)}
        dispatch={dispatch} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        lastName={profile.lastName ? profile.lastName : ''}
        firstName={profile.firstName ? profile.firstName : ''}
        name={profile.name ? profile.name : ''}
        roles={profile.roles ? profile.roles : []}
        avatar={profile.avatar ? profile.avatar : SETTING.PROFILE_AVATAR}
        dispatch={dispatch}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout
