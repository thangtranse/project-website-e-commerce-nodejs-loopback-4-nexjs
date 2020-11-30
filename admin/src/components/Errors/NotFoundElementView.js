import {
  Box,



  Button, Container,

  makeStyles, Typography
} from '@material-ui/core';
import React from 'react';
import Page from 'src/components/Page';
import { WEBSITE_NAME } from 'src/environment';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    width: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFoundView = (
  {
    direactURL = "/",
    button = "Go Home",
    title = "Product not found",
    content = "..."
  }
) => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title={WEBSITE_NAME}
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            {title}
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            {content}
          </Typography>
          <br />
          <Box textAlign="center">
            <Button
              color="primary"
              component="a"
              href={direactURL}
              variant="contained"
            >
              {
                button
              }
            </Button>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFoundView;
