import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(5, 0),
        height: '100%'
    },
}));

export default function Footer({
    addressCompany = [],
    addressFacebook = "https://www.facebook.com/thangtranse",
    addressInstagram,
    addressTripadvisor = "https://www.tripadvisor.nl/Attraction_Review-g293925-d21319667-Reviews-DNV_TRAVEL_VIETNAM-Ho_Chi_Minh_City.html"
}) {

    const [addressCompanyState, setAddressCompanyState] = React.useState([]);

    useEffect(() => {
        if (addressCompany) {
            let tempAddressCompany = []
            if (typeof addressCompany === 'string') {
                tempAddressCompany = JSON.parse(addressCompany)
            } else {
                tempAddressCompany = [...addressCompany]
            }
            setAddressCompanyState(tempAddressCompany)
        }
    }, [addressCompany])

    console.log("thangtran.addressCompany.addressCompany ", addressCompany)
    console.log("thangtran.addressCompany.addressCompany ", typeof addressCompany)

    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                    spacing={0}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3} md={3}>
                            <Link
                                key={"Trang chủ"}
                                href={`/`}
                                className={classes.toolbarLink}
                            >
                                <img src="/static/images/logo/Logo.png" width="40%" /><br /><br />
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            {
                                addressCompanyState[0] ? (
                                    addressCompanyState[0].indexOf('</') !== -1 ?
                                        (
                                            <div dangerouslySetInnerHTML={{ __html: addressCompanyState[0].replace(/(<? *script)/gi, 'illegalscript') }} ></div>
                                        ) : (
                                            <Typography variant="body2" color="textSecondary" component="p">{addressCompanyState[0]}</Typography>
                                        )
                                ) : ""
                            }
                        </Grid>
                        <Grid item xs={12} sm={3} md={3}>
                            <Typography variant="h6" align="left" gutterBottom>
                                <b>FOLLOW US on Facebook</b><br />
                                <Link
                                    key={"addressFacebook"}
                                    href={addressFacebook}
                                    target="_blank"
                                >
                                    <img src="/static/images/icon/my-image-facebook-logo-with-words-hd-png.png" width="80" />
                                </Link>
                                <br />
                                <b>REVIEW US on Tripadvisor</b><br />
                                <Link
                                    key={"addressTripadvisor"}
                                    href={addressTripadvisor}
                                    target="_blank"
                                >
                                    <img src="/static/images/icon/Tripadvisor_lockup_horizontal_secondary_registered.svg" width="80" />
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}

Footer.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
};