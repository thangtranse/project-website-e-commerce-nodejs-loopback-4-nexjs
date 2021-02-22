import { CartIcon } from 'assets/icons/CartIcon';
// import { closeModal } from '@redq/reuse-modal';
import { Button } from 'components/button/button';
import { Counter } from 'components/counter/counter';
import CarouselWithCustomDots from 'components/multi-carousel/multi-carousel';
import ReadMore from 'components/truncate/truncate';
import { useCart } from 'contexts/cart/use-cart';
import { useLocale } from 'contexts/language/language.provider';
import Router from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CURRENCY } from 'utils/constant';
import {
  ButtonText, DiscountPercent,














  MetaItem, MetaSingle, ProductCartBtn, ProductCartWrapper, ProductDescription, ProductDetailsWrapper,



  ProductInfo, ProductInfoWrapper,






  ProductMeta, ProductPreview,











  ProductPrice, ProductPriceWrapper, ProductTitle, ProductTitlePriceWrapper,

  ProductWeight, QuickViewWrapper,














  SalePrice
} from './quick-view.style';


type QuickViewProps = {
  modalProps: any;
  onModalClose?: any;
  hideModal: () => void;
  deviceType: any;
};

const QuickViewMobile: React.FunctionComponent<QuickViewProps> = ({
  modalProps,
  onModalClose,
  hideModal,
  deviceType,
}) => {
  const { addItem, removeItem, isInCart, getItem } = useCart();
  const {
    id,
    type,
    title,
    unit,
    price,
    discountInPercent,
    salePrice,
    description,
    gallery,
    categories,
    slug
  } = modalProps;

  const { isRtl } = useLocale();

  const handleAddClick = (e: any) => {
    e.stopPropagation();
    addItem(modalProps);
  };

  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItem(modalProps);
  };

  function onCategoryClick(slug) {
    Router.push({
      pathname: `/${type && type[0] ? type[0].key : ""}`,
      query: { category: slug },
    }).then(() => window.scrollTo(0, 0));
    hideModal();
  }

  return (
    <>
      {/* <ModalClose onClick={onModalClose}>
        <CloseIcon />
      </ModalClose> */}
      <QuickViewWrapper className='quick-view-mobile-wrapper'>
        <ProductDetailsWrapper className='product-card' dir='ltr'>
          {
            !isRtl && (
              <ProductPreview>
                <CarouselWithCustomDots items={gallery} deviceType={deviceType} />
                {!!discountInPercent && (
                  <DiscountPercent>{discountInPercent}%</DiscountPercent>
                )}
              </ProductPreview>
            )
          }
          <ProductInfoWrapper dir={isRtl ? 'rtl' : 'ltr'}>
            <ProductInfo>
              <ProductTitlePriceWrapper>
                <ProductTitle
                  onClick={() => {
                    hideModal();
                    Router.push("/product/" + slug)
                  }}>{title}</ProductTitle>
              </ProductTitlePriceWrapper>

              <ProductWeight>{unit}</ProductWeight>
              <ProductDescription>
                {/* <ReadMore character={600}>{cleanTag(description)}</ReadMore> */}
                <ReadMore character={600}>
                </ReadMore>
                <div className={`contentPage`} dangerouslySetInnerHTML={{ __html: description.replace(/(<? *script)/gi, 'illegalscript') }} ></div>

              </ProductDescription>

              <ProductMeta>
                <MetaSingle>
                  {
                    categories
                      ? categories.map((item: any) => (
                        <MetaItem
                          onClick={() => onCategoryClick(item.slug)}
                          key={item.id}
                        >
                          {item.title}
                        </MetaItem>
                      ))
                      : ''
                  }
                </MetaSingle>
              </ProductMeta>

              <ProductCartWrapper>
                <ProductPriceWrapper>
                  <ProductPrice>
                    {CURRENCY}
                    {salePrice ? salePrice : price}
                  </ProductPrice>
                  {
                    discountInPercent ? (
                      <SalePrice>
                        {CURRENCY}
                        {price}
                      </SalePrice>
                    ) : null
                  }
                </ProductPriceWrapper>

                <ProductCartBtn>
                  {!isInCart(id) ? (
                    <Button
                      className='cart-button'
                      variant='secondary'
                      borderRadius={100}
                      onClick={handleAddClick}
                    >
                      <CartIcon mr={2} />
                      <ButtonText>
                        <FormattedMessage
                          id='addCartButton'
                          defaultMessage='Cart'
                        />
                      </ButtonText>
                    </Button>
                  ) : (
                    <Counter
                      value={getItem(id).quantity}
                      onDecrement={handleRemoveClick}
                      onIncrement={handleAddClick}
                    />
                  )}
                </ProductCartBtn>
              </ProductCartWrapper>
            </ProductInfo>
          </ProductInfoWrapper>

          {isRtl && (
            <ProductPreview>
              <CarouselWithCustomDots items={gallery} deviceType={deviceType} />
              {!!discountInPercent && (
                <DiscountPercent>{discountInPercent}%</DiscountPercent>
              )}
            </ProductPreview>
          )}
        </ProductDetailsWrapper>
      </QuickViewWrapper>
    </>
  );
};

export default QuickViewMobile;
