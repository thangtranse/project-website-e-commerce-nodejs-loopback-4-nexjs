
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,

  makeStyles, TextField
} from '@material-ui/core';
import clsx from 'clsx';
import { Formik } from 'formik';
import { DropzoneDialog } from 'material-ui-dropzone';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SETTING } from 'src/constants';
import {
  actionUploadFile,
  actionUploadFileClearStorage,

  fetchUpdateProfile
} from 'src/saga/action';
import * as SELECTOR from 'src/saga/redux-selector';
import * as Yup from 'yup';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();

  const userProfile = useSelector(state => SELECTOR.getUserProfile(state));
  const userID = useSelector(state => SELECTOR.getUserID(state));
  const fileUpload = useSelector(state => SELECTOR.ListFileUpload(state));

  const [valuesFrom, setValues] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    email: userProfile.email,
    phone: userProfile.phone,
    avatar: userProfile.avatar
  });

  const dispatch = useDispatch();
  const [openDropzoneDialog, setOpenDropzoneDialog] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(actionUploadFileClearStorage())
    }
  }, [])

  /**
 * handle upload file open popup
 * @param {*} event 
 */
  const handleOpenDropzoneDialog = (event) => {
    setOpenDropzoneDialog(!openDropzoneDialog)
  }

  /**
   * Handle when submit file
   * @param {*} files 
   */
  const handleSaveDropzoneDialog = async (files) => {
    dispatch(actionUploadFile(files))
    setOpenDropzoneDialog(false)
  }

  return (
    <Formik
      className={clsx(classes.root, className)}
      initialValues={valuesFrom}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          firstName: Yup.string().max(255).required('First name is required'),
          lastName: Yup.string().max(255).required('Last name is required'),
          phone: Yup.string().max(255).required('Phone is required'),
          avatar: Yup.string().max(255)
        })
      }
      onSubmit={(e, { setSubmitting }) => {
        if (fileUpload && fileUpload.length > 0) {
          e.avatar = fileUpload[0].title
        }
        dispatch(fetchUpdateProfile({ data: e, _id: userID }))
        setSubmitting(false);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
          <form
            onSubmit={handleSubmit}
          >
            <Card>
              <CardHeader
                subheader="The information can be edited"
                title="Profile"
              />
              <Divider />
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="First name"
                      name="firstName"
                      variant="outlined"
                      value={values.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      helperText={touched.firstName && errors.firstName}
                      error={Boolean(touched.firstName && errors.firstName)}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Last name"
                      name="lastName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      variant="outlined"
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      variant="outlined"
                      value={values.email}
                      disabled
                      type="email"
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      variant="outlined"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>

                </Grid>
              </CardContent>
              <Divider />
              <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
              >
                <Button onClick={handleOpenDropzoneDialog}
                  color="primary" variant="outlined">Thay đổi Avatar</Button>
                <DropzoneDialog
                  open={openDropzoneDialog}
                  onSave={handleSaveDropzoneDialog}
                  acceptedFiles={SETTING.FILE_UPLOAD_IMAGE}
                  showPreviews={true}
                  maxFileSize={5000000}
                  onClose={handleOpenDropzoneDialog}
                />
                <div style={{ marginRight: 5 }}></div>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >Save details</Button>
              </Box>
            </Card>
          </form>
        )
      }
    </Formik>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
