import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SETTING } from 'src/constants';
import * as SELECTOR from 'src/saga/redux-selector';

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

const PATH_DIRECT_PRODUCT = "/products"

const LatestProducts = ({ className, ...rest }) => {
  const classes = useStyles();
  const products = useSelector(state => SELECTOR.websiteDashboardLatestProducts(state)); // Tổng số lượng danh sách item

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Sản phẩm mới được tạo"
      />
      <Divider />
      <List>
        {products.map((product, i) => (
          <ListItem
            divider={i < products.length - 1}
            key={product.productId}
          >
            <ListItemAvatar>
              <img
                alt="Product"
                className={classes.image}
                src={/(http(s?):)([/|.|\w|\s|-])*/.test(product.image) ? product.image : (SETTING.URL_IMAGE_PATH_SERVER + '/' + product.image)}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.title}
              secondary={`Thời gian tạo ${product.createAt}`}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          href={PATH_DIRECT_PRODUCT}
          component={'a'}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
