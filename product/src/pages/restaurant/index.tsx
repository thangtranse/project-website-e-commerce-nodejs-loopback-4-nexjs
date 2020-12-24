import { Modal } from '@redq/reuse-modal';
import BannerImg from 'assets/images/banner/restaurant.png';
import {
  ContentSection, MainContentArea,



  MobileCarouselDropdown, OfferSection, SidebarSection
} from 'assets/styles/pages.style';
import { Banner } from 'components/banner/banner';
import { MobileBanner } from 'components/banner/mobile-banner';
import Carousel from 'components/carousel/carousel';
import { SEO } from 'components/seo';
import { SHOP_NAME } from "environment";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
// Static Data Import Here
import { siteOffers } from 'site-settings/site-offers';


const Sidebar = dynamic(() => import('layouts/sidebar/sidebar'));
const Products = dynamic(() =>
  import('components/product-grid/product-list-two/product-list-two')
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
      <SEO title={`Restaurant - ${SHOP_NAME}`} description='Restaurant Details' />
      <Modal>
        <MobileBanner intlTitleId='foodsTitle' type={PAGE_TYPE} />

        <Banner
          intlTitleId='foodsTitle'
          intlDescriptionId='foodsSubTitle'
          imageUrl={BannerImg}
        />

        <OfferSection>
          <div style={{ margin: '0 -10px' }}>
            <Carousel deviceType={deviceType} data={siteOffers} />
          </div>
        </OfferSection>

        <MobileCarouselDropdown>
          <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
        </MobileCarouselDropdown>

        <MainContentArea>
          <SidebarSection>
            <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
          </SidebarSection>
          <ContentSection>
            <div ref={targetRef}>
              <Products
                type={PAGE_TYPE}
                deviceType={deviceType}
                fetchLimit={16}
              />
            </div>
          </ContentSection>
        </MainContentArea>
      </Modal>
    </>
  );
}

export default RestaurantPage;
