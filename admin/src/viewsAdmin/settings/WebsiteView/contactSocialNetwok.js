import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,

  Divider,


  Grid,

  makeStyles,


  Typography
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { SETTING } from "../../../constants";
import { checkUrlFacebook, checkUrlInstagram, checkUrlTwitter } from "../../../utils/checkUrl";
import { toast } from "react-toastify";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}


const useStyles = makeStyles(({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  },
  fullWidthTextField: {
    width: '100%'
  }
}));

const ContactSocialNetwok = ({
  className,
  CardTitle = "", // Tiêu đề Card
  CardDiscription = "", // Mô tả nhỏ cho tiên đề Card
  initFacebook = {
    name: ''
  },
  initInstagram = {
    name: ''
  },
  initTwitter = {
    name: ''
  },
  fnSubmit = () => { },
  optionSetting = {
    settingLoading: true,
    settingSuccess: false
  },
  ...rest
}) => {
  const timer = React.useRef();
  const classes = useStyles();

  const [valueTable, setValueTable] = React.useState(0);

  const handleChangeTable = (event, newValue) => {
    setValueTable(newValue);
  };

  const [loading, setLoading] = React.useState(optionSetting.settingLoading);
  const [success, setSuccess] = React.useState(optionSetting.settingSuccess);

  const [facebookUrl, setFacebookUrl] = React.useState('');
  const [twitterUrl, setTwitterUrl] = React.useState('');
  const [instagramUrl, setInstagramUrl] = React.useState('');

  const [errorFacebookUrl, setErrorFacebookUrl] = React.useState(false);
  const [errorTwitterUrl, setErrorTwitterUrl] = React.useState(false);
  const [errorInstagramUrl, setErrorInstagramUrl] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  useEffect(() => {
    setSuccess(true);
    setLoading(false);
  }, [])

  useEffect(() => {
    if (initFacebook && initFacebook.name) {
      setFacebookUrl(initFacebook.name)
    }
    if (twitterUrl && initTwitter.name) {
      setTwitterUrl(initTwitter.name)
    }
    if (instagramUrl && initInstagram.name) {
      setInstagramUrl(initInstagram.name)
    }
  }, [initFacebook, initInstagram, initTwitter])

  const handleButtonClick = () => {

    if (!loading) {
      setSuccess(false);
      setLoading(true);
      let statusModify = false;
      let dataResponse = {}

      if (initFacebook.name !== facebookUrl && facebookUrl !== '') {
        if (checkUrlFacebook(facebookUrl)) {
          statusModify = true;
          dataResponse.facebookUrl = facebookUrl
        } else {
          toast.error("Địa chỉ Facebook không hợp lệ, bạn có thể để trống để bỏ qua!")
          setErrorFacebookUrl(true)
        }
      }

      if (initInstagram.name !== instagramUrl && instagramUrl !== '') {
        if (checkUrlInstagram(instagramUrl)) {
          statusModify = true;
          dataResponse.instagramUrl = instagramUrl
        } else {
          toast.error("Địa chỉ Instagram không hợp lệ, bạn có thể để trống để bỏ qua! ")
          setErrorFacebookUrl(true)
        }
      }

      if (initTwitter.name !== twitterUrl && twitterUrl !== '') {
        if (checkUrlTwitter(twitterUrl)) {
          statusModify = true;
          dataResponse.twitterUrl = twitterUrl
        } else {
          toast.error("Địa chỉ Twitter không hợp lệ, bạn có thể để trống để bỏ qua!")
          setErrorTwitterUrl(true)
        }
      }

      if (!statusModify) {
        setSuccess(true);
        setLoading(false);
      } else {
        fnSubmit({ ...dataResponse })
      }

      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, SETTING.TIME_AWATING_SERVER_RESPONSE);

    }
  }

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader={CardDiscription}
          title={CardTitle}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={12}
              sm={12}
              xs={12}
            >
              <div className={classes.root}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={valueTable}
                    onChange={handleChangeTable}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs"
                    centered
                  >
                    <Tab icon={<FacebookIcon />} {...a11yProps(0)} />
                    <Tab icon={<TwitterIcon />} {...a11yProps(1)} />
                    <Tab icon={<InstagramIcon />} {...a11yProps(2)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={valueTable} index={0}>
                  <TextField
                    id="facebookInpurTextFiel"
                    label="Địa chỉ Facebook"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    error={errorFacebookUrl}
                    placeholder="https://www.facebook.com/thangtranse"
                    multiline
                    className={classes.fullWidthTextField}
                  />
                </TabPanel>
                <TabPanel value={valueTable} index={1}>
                  <TextField
                    id="TwiiterInpurTextFiel"
                    label="Địa chỉ Twiiter"
                    value={twitterUrl}
                    error={errorTwitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    placeholder="https://twitter.com/TranThang365"
                    multiline
                    className={classes.fullWidthTextField}
                  />
                </TabPanel>
                <TabPanel value={valueTable} index={2}>
                  <TextField
                    id="InstagramInpurTextFiel"
                    label="Địa chỉ Instagram"
                    value={instagramUrl}
                    error={errorInstagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://www.instagram.com/thangtran.se/"
                    multiline
                    className={classes.fullWidthTextField}
                  />
                </TabPanel>
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <div className={classes.wrapper}>
            <Button
              color="primary"
              className={buttonClassname}
              disabled={loading}
              onClick={handleButtonClick}
            >Thay đổi</Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </Box>
      </Card>
    </form >
  );
};
export default ContactSocialNetwok;
