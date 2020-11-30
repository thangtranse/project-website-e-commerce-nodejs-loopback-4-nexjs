
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import MenuDraw from '../Menu';

const useStyles = makeStyles((theme) => ({
    toolbarSecondary: {
        justifyContent: 'space-between',
        position: 'fixed',
        width: '100%',
        minHeight: 83,
        top: 0,
        left: 0,
        zIndex: 1000,
        transitionDuration: '0.2s',
        background: "#fff",
        color: "#111111"
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'center'
    },
    toolbarLinkBox: {
        padding: '0 5px'
    }
}));

export default function Header({
    sections = [],
    sectionLogo = '/static/images/logo/Logo-favicon.png',
    mobileOnClick = () => { }
}) {
    const classes = useStyles();
    const ref = useRef(null);

    const [hideOnScroll, setHideOnScroll] = useState(true)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    })

    useScrollPosition(
        ({ prevPos, currPos }) => {
            let isShowAnimation = currPos.y > (height * -1);
            if (isShowAnimation !== hideOnScroll) {
                setHideOnScroll(isShowAnimation)
            }
        },
        [hideOnScroll],
        null,
        false,
        300
    )

    return useMemo(() => (
        <div className={classes.root} ref={ref}>
            <Toolbar component="nav" variant="dense" className={`${classes.toolbarSecondary}`}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}>
                    <Hidden smUp>
                        <Grid item xs={12}>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>
                                <IconButton aria-label="delete" className={classes.margin} onClick={mobileOnClick}
                                >
                                    <MenuOpenIcon fontSize="small" />
                                </IconButton>
                                <Typography
                                    color="inherit"
                                    align="center"
                                >
                                    <Link
                                        key={"Trang chủ"}
                                        href={`/`}
                                    >
                                        <img src={sectionLogo} width="70" />
                                    </Link>
                                </Typography>
                                <IconButton aria-label="delete" style={{ visibility: 'hidden' }}>
                                    <MenuOpenIcon fontSize="small" />
                                </IconButton>
                            </div>
                        </Grid>
                    </Hidden>
                    <Hidden xsDown>
                        <Grid item xs={12} sm={2} md={1}>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
                                <Link
                                    key={"Trang chủ"}
                                    href={`/`}
                                >
                                    <img src={sectionLogo} width="60" />
                                </Link>
                            </div>
                        </Grid>
                        <Grid item xs md sm wrap="nowrap">
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center', flexWrap: 'wrap' }}>
                                {
                                    sections.map((section, index) => (
                                        <MenuDraw menuContent={section}></MenuDraw>
                                    ))
                                }
                            </div>
                        </Grid>
                        <Hidden smDown>
                            <Grid item xs={12} md={1}>
                            </Grid>
                        </Hidden>
                    </Hidden>
                </Grid>
            </Toolbar>
        </div >
    ));
}

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};