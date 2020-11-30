import {
  Container,
  makeStyles
} from '@material-ui/core';
import _ from "lodash";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'src/components/Page';
import { SETTING } from "src/constants";
import {
  getInforWebsite as getItem,
  updateContactWebsite as fetchUpdate
} from 'src/saga/action';
import { websiteInfor } from 'src/saga/redux-selector';
import Contacts from './contacts';
import ContactSocialNetwok from './contactSocialNetwok';
import UserContact from './userContact';
import LogoWebsite from './logoWebsite';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const timer = React.useRef();

  const website = useSelector(state => websiteInfor(state));

  const [addressCompany, setAddressCompany] = React.useState([]);
  const [deputy, setDeputy] = React.useState([]);
  const [socialNetwork, setSocialNetwork] = React.useState({});

  useEffect(() => {
    dispatch(getItem())
  }, [])

  useEffect(() => {
    if (website) {
      if (website.socialNetwork) {
        setSocialNetwork({
          ...website.socialNetwork
        })
      }
      if (website.addressCompany) {
        let data = []
        if (typeof website.addressCompany === 'string') {
          data = JSON.parse(website.addressCompany)
        } else {
          data = [...website.addressCompany]
        }
        setAddressCompany([...data])
      }
      if (website.deputy) {
        let data = []
        if (typeof website.deputy === 'string') {
          data = JSON.parse(website.deputy)
        } else {
          data = [...website.deputy]
        }
        setDeputy([...data])
      }
    }
  }, [website])

  /**
   * Xử lý sự kiện submit dữ liệu về server của component CONTACT 
   * @param {*} data dữ liệu COMPONENT trả về
   */
  const handlChangeContact = (data) => {
    let temp = _.difference(data, addressCompany);
    if (temp.length > 0 || data.length !== addressCompany.length) {
      setAddressCompany([...data])
      dispatch(fetchUpdate({ data: { addressCompany: data, deputy, socialNetwork } }))
      timer.current = setTimeout(() => {
        dispatch(getItem())
      }, SETTING.TIME_AWATING_SERVER_RESPONSE);
    }
  }

  /**
   * 
   * @param {*} data 
   */
  const handlChangeUserContact = (data) => {
    let temp = _.difference(data, deputy);
    if (temp.length > 0) {
      setDeputy([...deputy])
      dispatch(fetchUpdate({ data: { addressCompany, deputy: data, socialNetwork } }))
      timer.current = setTimeout(() => {
        dispatch(getItem())
      }, SETTING.TIME_AWATING_SERVER_RESPONSE);
    }
  }

  /**
   * Xử lý sự kiện thay đổi thông tin Social Network
   * @param {*} data 
   */
  const handlChangeSocialNetwork = (data) => {
    let temp = _.isEqual(data, socialNetwork);
    if (!temp) {
      setSocialNetwork({ ...data })
      dispatch(fetchUpdate({ data: { addressCompany, deputy, socialNetwork: { ...data } } }))
      timer.current = setTimeout(() => {
        dispatch(getItem())
      }, SETTING.TIME_AWATING_SERVER_RESPONSE);
    }
  }

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth="lg">
        <ContactSocialNetwok
          CardTitle="Thiết lập Social Network"
          CardDiscription="Tùy chọn thông tin Social Network cho Website"
          fnSubmit={handlChangeSocialNetwork}
          initFacebook={{ name: socialNetwork.facebookUrl ? socialNetwork.facebookUrl : "" }}
          initInstagram={{ name: socialNetwork.twitterUrl ? socialNetwork.twitterUrl : "" }}
          initTwitter={{ name: socialNetwork.instagramUrl ? socialNetwork.instagramUrl : "" }}
        />
        <br />
        <Contacts addressCompany={website.addressCompany} fnSubmit={handlChangeContact} />
        <br />
        <UserContact
          schema={website.deputy}
          fnSubmit={handlChangeUserContact}
        />
        <br />
        {/* <LogoWebsite /> */}
      </Container>
    </Page>
  );
};

export default SettingsView;
