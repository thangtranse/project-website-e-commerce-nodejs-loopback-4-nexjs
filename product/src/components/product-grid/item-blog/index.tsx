import { Button } from 'components/button/button';
import ErrorMessage from 'components/error-message/error-message';
import NoResultFound from 'components/no-result/no-result';
import Placeholder from 'components/placeholder/placeholder';
import FoodCard from 'components/product-card/product-card-four/product-card-four';
import useVendors from 'data/use-vendors';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Fade from 'react-reveal/Fade';
import {
  ButtonWrapper,

  LoaderItem, LoaderWrapper,

  ProductCardWrapper, ProductsCol, ProductsRow
} from '../product-list/product-list.style';

const URL_FILE = process.env.NEXT_PUBLIC_REST_API_ENDPOINT_FILE

type ProductsProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  type: string;
  fetchLimit?: number;
  loadMore?: boolean;
};
export const Products: React.FC<ProductsProps> = ({
  deviceType,
  type,
  fetchLimit = 10,
  loadMore = true,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { data, error, fetchMore, offset, limit } = useVendors({
    type: type,
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
  const handleLoadMore = () => {
    setLoading(true);
    fetchMore(fetchLimit + limit, 0)
    setLoading(false);
  };

  return (
    <>
      <ProductsRow>
        {data?.map((item: any, index: number) => (
          <ProductsCol key={index} className="food-col">
            <ProductCardWrapper>
              <Fade
                duration={800}
                delay={index * 10}
                style={{ height: '100%' }}
              >
                <FoodCard
                  name={item.name}
                  image={URL_FILE + "/" + item.thumbnailUrl}
                  restaurantType={item?.categories.join(', ')}
                  delivery={item.description}
                  isFree={true}
                  discountInPercent={"new"} // chử nhỏ gốc trên bên phải
                  data={item}
                  onClick={() =>
                    router.push(
                      '/blog/[slug]',
                      `/blog/${item.slug}`
                    )
                  }
                />
              </Fade>
            </ProductCardWrapper>
          </ProductsCol>
        ))}
      </ProductsRow>
      {loadMore && data && (
        <ButtonWrapper>
          <Button
            onClick={handleLoadMore}
            loading={loading}
            variant="secondary"
            border="1px solid #f1f1f1"
          >
            <FormattedMessage id="loadMoreButton" defaultMessage="Load More" />
          </Button>
        </ButtonWrapper>
      )}
      {/* {loadMore && data?.hasMore && (
        <ButtonWrapper>
          <Button
            onClick={handleLoadMore}
            loading={loading}
            variant="secondary"
            border="1px solid #f1f1f1"
          >
            <FormattedMessage id="loadMoreButton" defaultMessage="Load More" />
          </Button>
        </ButtonWrapper>
      )} */}
    </>
  );
};
export default Products;
