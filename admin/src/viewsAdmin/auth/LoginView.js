import {
  Box,
  Button,
  Container,




  makeStyles, TextField,
  Typography
} from '@material-ui/core';
import { Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Page from 'src/components/Page';
import { fetchLogin } from 'src/saga/action';
import * as SELECTOR from 'src/saga/redux-selector';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {

  const dispatch = useDispatch();
  const classes = useStyles();

  const isAuth = useSelector(state => SELECTOR.isAuthSelector(state));
  
  if (isAuth) return <Navigate to="/" />

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'admin@example.com',
              password: 'admin12345678'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(e, { setSubmitting }) => {
              dispatch(fetchLogin({ username: e.email, password: e.password }))
              setSubmitting(false);
            }}
          >
            {
              (
                {
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values
                }
              ) => (
                  <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                      <Typography
                        color="textPrimary"
                        variant="h2"
                      >

                      </Typography>
                    </Box>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Password"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    <Box my={2}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Đăng nhập
                  </Button>
                    </Box>
                  </form>
                )
            }
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView
