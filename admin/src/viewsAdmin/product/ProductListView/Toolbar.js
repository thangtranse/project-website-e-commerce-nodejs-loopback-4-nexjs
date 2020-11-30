import {
  Box,
  Button,











  makeStyles
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ pathRedirect = '/', className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => { navigate(pathRedirect, { replace: true }) }}
        >
          Add product
        </Button>
      </Box>
      <Box mt={3}>
        {/* <Card>
          <CardActions disableSpacing>
            <Grid
              container
              spacing={3}
              direction="row"
              justify="center"
              alignItems="center">
              <Grid item xs={12} md>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Tìm kiếm"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography align={'center'} variant="body2" color="textSecondary" component="p">
                  <IconButton color="secondary" aria-label="add an alarm">
                    <AppsIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="add an alarm">
                    <ReorderIcon />
                  </IconButton>
                </Typography>
              </Grid>
            </Grid>
          </CardActions>
        </Card> */}
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
