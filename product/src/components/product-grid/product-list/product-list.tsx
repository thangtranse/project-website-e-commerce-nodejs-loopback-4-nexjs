import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  ProductsRow,
  ProductsCol,
  ButtonWrapper,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from './product-list.style';
import { CURRENCY } from 'utils/constant';
import Placeholder from 'components/placeholder/placeholder';
import Fade from 'react-reveal/Fade';
import NoResultFound from 'components/no-result/no-result';
import { FormattedMessage } from 'react-intl';
import { Button } from 'components/button/button';
import useProducts from 'data/use-products';
import { flex } from 'styled-system';
const ErrorMessage = dynamic(() =>
  import('components/error-message/error-message')
);
const GeneralCard = dynamic(
  import('components/product-card/product-card-one/product-card-one')
);
const BookCard = dynamic(
  import('components/product-card/product-card-two/product-card-two')
);
const FurnitureCard = dynamic(
  import('components/product-card/product-card-three/product-card-three')
);
const MedicineCard = dynamic(
  import('components/product-card/product-card-five/product-card-five')
);

const URL_FILE = process.env.NEXT_PUBLIC_REST_API_ENDPOINT_FILE

type ProductsProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  fetchLimit?: number;
  loadMore?: boolean;
  type?: string;
};

export const Products: React.FC<ProductsProps> = ({
  deviceType,
  fetchLimit = 20,
  type,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { data, error, fetchMore, formattedData, offset, limit, dataCount } = useProducts({
    type,
    text: router.query.text,
    category: router.query.category,
    offset: 0,
    limit: fetchLimit,
  });

  if (error) return <ErrorMessage message={error.message} />;

  if (!data) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <Placeholder uniqueKey="1" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="2" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="3" />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (data.length === 0) {
    return <NoResultFound />;
  }

  console.log("thangtran.dataCount", dataCount)
  console.log("thangtran.offset + limit", offset + limit)

  const handleLoadMore = async () => {
    setLoading(true);
    fetchMore(limit, offset + limit)
    setLoading(false);
  };

  const handleLoadBack = async () => {
    setLoading(true);
    fetchMore(limit, offset - limit)
    setLoading(false);
  };

  const renderCard = (productType, props) => {
    switch (productType) {
      case 'book':
        return (
          <BookCard
            title={props.title}
            image={URL_FILE + props.image}
            name={props?.author?.name}
            data={props}
            deviceType={deviceType}
            onClick={() => {
              router.push('/product/[slug]', `/product/${props.slug}`);
              if (typeof window !== 'undefined') {
                window.scrollTo(0, 0);
              }
            }}
          />
        );
      case 'medicine':
        return (
          <MedicineCard
            title={props.title}
            currency={CURRENCY}
            image={URL_FILE + props.image}
            price={props.price}
            weight={props.unit}
            data={props}
          />
        );
      case 'furniture':
        return (
          <FurnitureCard
            title={props.title}
            image={URL_FILE + props.gallery[0].url}
            discountInPercent={props.discountInPercent}
            data={props}
            deviceType={deviceType}
          />
        );
      default:
        return (
          <GeneralCard
            title={props.title}
            description={props.description}
            image={URL_FILE + props.image}
            weight={props.unit}
            currency={CURRENCY}
            price={props.price}
            salePrice={props.salePrice}
            discountInPercent={props.discountInPercent}
            data={props}
            deviceType={deviceType}
          />
        );
    }
  };
  return (
    <>
      <ProductsRow>
        {
          data.map((item: any, index: number) => (
            <ProductsCol
              key={index}
              style={type === 'book' ? { paddingLeft: 0, paddingRight: 1 } : {}}
            >
              <ProductCardWrapper>
                <Fade
                  duration={800}
                  delay={index * 10}
                  style={{ height: '100%' }}
                >
                  {renderCard(type, item)}
                </Fade>
              </ProductCardWrapper>
            </ProductsCol>
          ))
        }
      </ProductsRow>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
        {
          (dataCount && (offset !== 0)) && (
            <ButtonWrapper>
              <Button
                onClick={handleLoadBack}
                loading={loading}
                variant="secondary"
                style={{
                  fontSize: 14,
                }}
                border="1px solid #f1f1f1"
              >
                <FormattedMessage id="loadBackButton" defaultMessage="Back" />
              </Button>
            </ButtonWrapper>
          )
        }
        {
          (dataCount && !(dataCount.count <= (limit + offset))) && (
            <ButtonWrapper>
              <Button
                onClick={handleLoadMore}
                loading={loading}
                variant="secondary"
                style={{
                  fontSize: 14,
                }}
                border="1px solid #f1f1f1"
              >
                <FormattedMessage id="loadNextButton" defaultMessage="Next" />
              </Button>
            </ButtonWrapper>
          )
        }
      </div>
    </>
  );
};
export default Products;
