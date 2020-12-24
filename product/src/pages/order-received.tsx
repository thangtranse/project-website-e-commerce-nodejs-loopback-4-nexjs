import React from 'react';
import { SEO } from 'components/seo';
import OrderReceived from 'features/order-received/order-received';
import { SHOP_NAME } from "environment";

const OrderReceivedPage = () => {
  return (
    <>
      <SEO title={`Invoice - ${SHOP_NAME}`} description="Invoice Details" />
      <OrderReceived />
    </>
  );
};

export default OrderReceivedPage;
