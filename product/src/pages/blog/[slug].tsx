import { Modal } from '@redq/reuse-modal';
import ProductSingleWrapper, {
  ProductSingleContainer
} from 'assets/styles/product-single.style';
import { SEO } from 'components/seo';
import { SHOP_NAME } from "environment";
import { ModalProvider } from 'contexts/modal/modal.provider';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getAllVendors, getVendorBySlug } from 'utils/api/vendor';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { FormattedMessage } from 'react-intl';
import Products from 'components/product-grid/product-list/product-list';

export const ProductDetailsWrapper = styled.div`
  background-color: ${themeGet('colors.white', '#ffffff')};
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  box-sizing: border-box;
  padding: 30px 15px;
  * {
    box-sizing: border-box;
  }
  @media (min-width: 991px) {
    margin: 30px 50px;
  }
`;


export const RelatedItems = styled.div`
  margin-top: 70px;
  margin-left: 55px;
  margin-right: 55px;

  @media (max-width: 990px) {
    margin-top: 50px;
    margin-left: 15px;
    margin-right: 15px;
  }
  > h2 {
    font-family: ${themeGet('fonts.heading', 'sans-serif')};
    font-size: ${themeGet('fontSizes.lg', '21')}px;
    font-weight: ${themeGet('fontWeights.semiBold', '600')};
    color: ${themeGet('colors.text.bold', '#0D1136')};
    line-height: 1.2;
    margin-bottom: 30px;
    @media (max-width: 767px) {
      margin-left: 0;
      margin-bottom: 25px;
    }
  }

  > div > div {
    flex: 0 0 20%;
    max-width: 20%;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;

    @media (max-width: 1500px) {
      flex: 0 0 20%;
      max-width: 20%;
    }
    @media (max-width: 1400px) {
      flex: 0 0 25%;
      max-width: 25%;
    }
    @media (max-width: 1060px) {
      flex: 0 0 33.3333333%;
      max-width: 33.3333333%;
    }
    @media (max-width: 1199px) and (min-width: 991px) {
      padding-left: 10px;
      padding-right: 10px;
    }
    @media (max-width: 768px) {
      padding-left: 7.5px;
      padding-right: 7.5px;
      margin-bottom: 15px;
    }
    @media (max-width: 767px) {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
`;

const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
  ssr: false,
});
type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
};

const ProductPage: NextPage<Props> = ({ data, deviceType }) => {

  const router = useRouter();

  if (router.isFallback) return <p>Loading...</p>;
  if (!data) return <p>Loading...</p>;
  if (!data[0]) return <p>Loading...</p>;
  data = data[0]

  return (
    <>
      <SEO
        title={`${data?.name} - ${SHOP_NAME}`}
        description={`${data?.name} Details`}
      />
      <ModalProvider>
        <Modal>
          <ProductSingleWrapper>
            <ProductSingleContainer>
              <ProductDetailsWrapper>
                <h2>{data.title}</h2>
                <br />
                <div
                  className="html-content"
                  dangerouslySetInnerHTML={{
                    __html: data.details,
                  }}
                />
              </ProductDetailsWrapper>
              <CartPopUp deviceType={deviceType} />
            </ProductSingleContainer>
          </ProductSingleWrapper>
          <RelatedItems>
            <h2>
              <FormattedMessage
                id="intlReletedItems"
                defaultMessage="Related Items"
              />
            </h2>
            <Products
              type={"bag"}
              deviceType={deviceType}
              loadMore={false}
              fetchLimit={10}
            />
          </RelatedItems>
        </Modal>
      </ModalProvider>
    </>
  );
};

export async function getStaticProps({ params }) {
  const data = await getVendorBySlug(params.slug);
  return {
    props: {
      data,
    },
  };
}
export async function getStaticPaths() {
  const vendors = await getAllVendors();
  return {
    paths: vendors.slice(0, 10).map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
export default ProductPage;
