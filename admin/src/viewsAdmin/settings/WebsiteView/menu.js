import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,

  Divider,

  Grid,

  makeStyles, Typography
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Tabs from '@mui-treasury/components/tabs/twitterIcon';
import Home from '@material-ui/icons/Home';
import Search from '@material-ui/icons/Search';
import Notifications from '@material-ui/icons/Notifications';
import MailOutlineRounded from '@material-ui/icons/MailOutlineRounded';

import { Editor } from 'react-draft-wysiwyg';
import { SETTING } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));


const MenuComponent = ({ className, menuComponent = [""], fnSubmit = () => { }, settingLoading = true, settingSuccess = false, ...rest }) => {
  const classes = useStyles();

  const [menuComponent, setMenuComponent] = React.useState(menuComponent);
  // Tab
  const [index, setIndex] = React.useState(0);
  // END - TAB

  return (
    <>
      <form
        className={clsx(classes.root, className)}
        {...rest}
      >

      </form>
      <Tabs
        tabs={[
          { icon: <Home />, badgeProps: { badgeContent: '' } },
          { icon: <Search /> },
          { icon: <Notifications />, badgeProps: { badgeContent: 99 } },
          { icon: <MailOutlineRounded /> },
        ]}
        value={index}
        onChange={(e, i) => setIndex(i)}
      />
    </>
  );
};

Contacts.propTypes = {
  className: PropTypes.string
};

export default MenuComponent;
