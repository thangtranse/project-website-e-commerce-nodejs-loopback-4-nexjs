import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,

  makeStyles, Typography
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { setAuthIs } from 'src/saga/action';
import ContentMenuLeft from './ContentMenuLeft';
import { ROOT_PATH } from './ContentMenuLeft';
import NavItem from './NavItem';

const items = ContentMenuLeft()

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

/**
 * Menu Left for UI Admin Page
 * All config in file "ContentMenuLeft"
 * @param {*} param0 
 */
const NavBar = ({ onMobileClose, openMobile, lastName, firstName, name, roles, avatar, dispatch }) => {

  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={avatar}
          to={`${ROOT_PATH}/account`}
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {`${firstName ? firstName : ''} ${lastName ? lastName : ''}`}
          {`${name ? name : ''}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {roles && roles.toString() ? roles.toString() : ''}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {
            items.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))
          }
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box
        p={2}
        bgcolor="background.dark"
      >
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          <Button
            color="primary"
            component="a"
            variant="contained"
            onClick={() => dispatch(setAuthIs())}
          >
            <IconButton color="inherit">
              <InputIcon />
            </IconButton>
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
