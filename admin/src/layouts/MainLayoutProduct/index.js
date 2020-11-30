import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { settingWebsite } from "../../saga/action";
import Hidden from '@material-ui/core/Hidden';


const anchor = 'left' // 'left', 'right', 'top', 'bottom'

const useStyles = makeStyles((theme) => ({
  backgroundIntro: {
    backgroundImage: `url(${"images/background/3225797-background.png"}) !important`,
    backgroundSize: 'cover !important',
    backgroundRepeat: 'no-repeat !important',
    backgroundPosition: 'center !important',
    width: '100%'
  }
}));

const Destination = [
  { title: 'NORTH', url: '/destination?category=nhung-tour-mien-bac' },
  { title: 'CENTRAL', url: '/destination?category=nhung-tour-mien-trung' },
  { title: 'SOUTH', url: '/destination?category=nhung-tour-mien-nam' }
]

const DailyLocalTours = [
  { title: 'NORTH', url: '/daily-local-tours?category=nhung-tour-mien-bac' },
  { title: 'CENTRAL', url: '/daily-local-tours?category=nhung-tour-mien-trung' },
  { title: 'SOUTH', url: '/daily-local-tours?category=nhung-tour-mien-nam' }
]

const sections = [
  { title: 'DESTINATION', url: '/destination', child: Destination },
  { title: 'DAILY LOCAL TOURS', url: '/daily-local-tours', child: DailyLocalTours },
  { title: 'UNIQUE EXPERIENCE', url: '/unique-experience' },
  { title: 'BLOG', url: '/blog' },
  { title: 'WRITE TO US', url: '/write-to-us' },
  { title: 'TESTIMONIAL', url: '/testimonial' },
  { title: 'AGENT HUB', url: '/agent-hub' },
  { title: 'ABOUT US', url: '/about-us' },
];

const MainLayout = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const router = useLocation();

  const addressCompany = useSelector(state => state.website.addressCompany);
  const addressFacebook = useSelector(state => state.website.addressFacebook);
  const addressInstagram = useSelector(state => state.website.addressInstagram);

  useEffect(() => {
    dispatch(settingWebsite({}))
  }, [])

  const { pathname } = router;
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  sections.map(data => {
    if (data.url.length === 1 && data.url === pathname) {
      return data.checked = true
    }
    if (data.url === pathname.slice(0, data.url.length) && data.url.length > 1) {
      return data.checked = true
    } else
      return data.checked = false
  })

  /**
   * Tắt mở menu left ỏ chế độ mobile
   * @param {*} anchor 
   * @param {*} open 
   */
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setState({ ...state, [anchor]: open });
  };

  return (
    <React.Fragment>
      <div style={{ background: "#fff" }}>
        <CssBaseline />
        <Container maxWidth="xl">
          <Header
            sections={sections}
            mobileOnClick={toggleDrawer(anchor, true)} // Sự kiện click khi ở chế độ Mobile
          />
        </Container>
        <Hidden mdUp>
          <Hidden xsDown>
            <div style={{ height: 81 }}>{`1112323 `}</div>
          </Hidden>
        </Hidden>
        <main style={{ marginTop: 81 }}>
          <Outlet />
        </main>
        <div
          className={classes.backgroundIntro}
          style={{ width: '100%' }}>
          <Container maxWidth="md">
            <Footer
              addressCompany={addressCompany}
              addressFacebook={addressFacebook}
              addressInstagram={addressInstagram} />
          </Container>
        </div>
        {/* MOBILE */}
        <div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div
              className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
              })}
              role="presentation"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <List>
                {
                  sections && sections.length > 0 ? (
                    <>
                      {
                        sections.map((section) => (
                          <Link
                            color={`${section.checked ? '' : 'inherit'}`}
                            noWrap
                            key={section.title}
                            variant="body2"
                            href={section.url}
                            className={`${classes.toolbarLink}`}
                          >
                            <ListItem
                              button
                              // selected={selectedIndex === 1}
                              className={`${classes.toolbarLink}`}
                            >
                              <ListItemText primary={section.title} className={`${classes.toolbarLink} thangtmMenuItem`} />
                            </ListItem>
                          </Link>
                        ))
                      }
                      <hr />
                    </>
                  ) : ""
                }
              </List>
            </div>
          </Drawer>
        </div>
        {/* END - MOBILE */}
      </div>
    </React.Fragment>
  );
};

export default MainLayout;
