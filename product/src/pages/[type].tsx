import { Modal } from '@redq/reuse-modal';
import {
  ContentSection, MainContentArea,
  SidebarSection
} from 'assets/styles/pages.style';
import { SEO } from 'components/seo';
import { ModalProvider } from 'contexts/modal/modal.provider';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { sitePages } from 'site-settings/site-pages';
import { useRefScroll } from 'utils/use-ref-scroll';

const Sidebar = dynamic(() => import('layouts/sidebar/sidebar'));

const Products = dynamic(() =>
  import('components/product-grid/product-list/product-list')
);

const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
  ssr: false,
});

const CategoryPage: React.FC<any> = ({ deviceType }) => {
  const { query } = useRouter();
  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });

  React.useEffect(() => {
    if (query.text || query.category) {
      scroll();
    }
  }, [query.text, query.category]);

  const PAGE_TYPE: any = query.type;

  const page = sitePages[PAGE_TYPE];

  if (!page) return null;

  return (
    <>
      <SEO title={page.page_title} description={page.page_description} />
      <ModalProvider>
        <Modal>
          <div style={{height: '70px'}}>
          </div>
          <MainContentArea>
            <SidebarSection>
              <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
            </SidebarSection>
            <ContentSection>
              <div ref={targetRef}>
                <Products
                  type={PAGE_TYPE}
                  deviceType={deviceType}
                  fetchLimit={10}
                />
              </div>
            </ContentSection>
          </MainContentArea>
          <CartPopUp deviceType={deviceType} />
        </Modal>
      </ModalProvider>
    </>
  );
};

export default CategoryPage;
