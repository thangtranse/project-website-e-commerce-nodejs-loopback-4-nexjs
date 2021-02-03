// product card for food
import Image from 'components/image/image';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CURRENCY } from 'utils/constant';
import {
  Category,


  DeliveryOpt,
  DiscountPercent, Duration, FoodCardWrapper,
  FoodImageWrapper,
  ProductInfo,


  ProductMeta
} from '../product-card.style';

type CardProps = {
  name: string;
  image: any;
  restaurantType: string;
  delivery?: string;
  isFree?: boolean;
  discountInPercent?: string;
  data: any;
  onClick?: (e: any) => void;
};

const ProductCard: React.FC<CardProps> = ({
  name,
  image,
  restaurantType,
  delivery,
  isFree,
  discountInPercent,
  data,
  onClick,
  ...props
}) => {
  return (
    <FoodCardWrapper onClick={onClick} className='food-card'>
      <FoodImageWrapper>
        <Image
          url={image}
          className='product-image'
          style={{ position: 'relative' }}
          alt={name}
        />
        {discountInPercent && (
          <DiscountPercent>{discountInPercent}</DiscountPercent>
        )}
      </FoodImageWrapper>
      <ProductInfo
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <h3 className='product-title'>{name}</h3>
        <Category style={{ marginBottom: 20, display: 'inline-block' }}>
          {restaurantType}
        </Category>
        <ProductMeta style={{ marginTop: 'auto' }}>
          <DeliveryOpt>
            {!isFree && CURRENCY}
            <div className={`contentPage`} dangerouslySetInnerHTML={{ __html: delivery.replace(/(<? *script)/gi, 'illegalscript') }} ></div>
            {' '}
          </DeliveryOpt>
          <Duration>
            <FormattedMessage id="detialButton" defaultMessage="Detail" />
          </Duration>
        </ProductMeta>
      </ProductInfo>
    </FoodCardWrapper>
  );
};

export default ProductCard;
