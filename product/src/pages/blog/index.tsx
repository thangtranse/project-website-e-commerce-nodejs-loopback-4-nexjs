import { Modal } from '@redq/reuse-modal';
import {
  ContentSection, MainContentArea,



  OfferSection
} from 'assets/styles/pages.style';
import Carousel from 'components/carousel/carousel';
import { SEO } from 'components/seo';
import { SHOP_NAME } from "environment";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
// Static Data Import Here
import { siteOffers } from 'site-settings/site-offers';
const Products = dynamic(() =>
  import('components/product-grid/item-blog')
);
const PAGE_TYPE = 'restaurant';

function RestaurantPage({ deviceType }) {
  const { query } = useRouter();
  const targetRef = React.useRef(null);

  React.useEffect(() => {
    if ((query.text || query.category) && targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 110,
        behavior: 'smooth',
      });
    }
  }, [query]);

  return (
    <>
      <SEO title={`Blog - ${SHOP_NAME}`} description='Blog Details' />
      <Modal>
        <OfferSection>
          <div style={{ margin: '0 -10px' }}>
            <Carousel deviceType={deviceType} data={siteOffers} />
          </div>
        </OfferSection>
        <MainContentArea>
          <div style={{ display: 'flex', justifyContent: 'center', width: `100%` }}>
            <ContentSection>
              <div ref={targetRef}>
                <Products
                  type={PAGE_TYPE}
                  deviceType={deviceType}
                  fetchLimit={16}
                />
              </div>
            </ContentSection>
          </div>
        </MainContentArea>
      </Modal>
    </>
  );
}

export default RestaurantPage;
