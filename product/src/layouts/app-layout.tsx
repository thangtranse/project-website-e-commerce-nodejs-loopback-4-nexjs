import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useAppState } from 'contexts/app/app.provider';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Sticky from 'react-stickynode';
import Header from './header/header';
import { isCategoryPage } from './is-home-page';
import { LayoutWrapper } from './layout.style';
import Container from '@material-ui/core/Container';
import { SocialLink, SocialProvider } from '@mui-treasury/components/socialLink';
import { useRoundSocialLinkStyles } from '@mui-treasury/styles/socialLink/round';

const MobileHeader = dynamic(() => import('./header/mobile-header'), {
  ssr: false,
});

type LayoutProps = {
  className?: string;
  token?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
  token,
}) => {
  const { pathname, query } = useRouter();

  const isSticky =
    useAppState('isSticky') ||
    pathname === '/furniture-two' ||
    pathname === '/grocery-two';

  const isHomePage = isCategoryPage(query.type) || pathname === '/bakery';
  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <Sticky enabled={isSticky} innerZ={1001}>
        <MobileHeader
          className={`${isSticky ? 'sticky' : 'unSticky'} ${isHomePage ? 'home' : ''
            } desktop`}
        />
        <Header
          className={`${isSticky ? 'sticky' : 'unSticky'} ${isHomePage ? 'home' : ''
            }`}
        />
      </Sticky>
      {children}
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={4}>
          <Grid item xs={6} md={4} sm={4}>
            <div style={{ width: "100%", padding: 10 }}>
              <h5>Chính sách mua hàng</h5>
              <br />
              <p>- Nhận hàng sau 1-3 ngày từ ngày chốt đơn</p>
              <p>- Miễn phí đổi trả nếu hàng lỗi</p>
              <p>- bảo hành 3 tháng với đồ điện</p>
            </div>
          </Grid>
          <Grid item xs={6} md={4} sm={4}>
            <h5>Hỗ trợ và tư vấn</h5>
            <br />
            <p>Email: <a style={{ color: "#636363" }} href="mailto:tuyetmyjp@gmail.com">tuyetmyjp@gmail.com</a></p>
            <p>Điện thoại: 07048034903</p>
          </Grid>
          <Grid item xs={6} md={4} sm={4}>
            <h5>Kết nối với chúng tôi</h5>
            <br />

            <SocialProvider useStyles={useRoundSocialLinkStyles}>
              <SocialLink
                brand={'FacebookCircle'}
                href={'https://www.facebook.com/trangsuctuyetmy'}
              />
              <SocialLink
                brand={'Instagram'}
                href={'https://www.instagram.com/ky.nguyenhong.9'}
              />
            </SocialProvider>

          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center">
          <p>
            <FormattedMessage id="loadNextButton" defaultMessage="Designed by" /> <a style={{ color: "#636363" }} href="mailto:Thangtran.se@gmail.com">Thangtran.se@gmail.com</a>
          </p>
        </Grid>
      </Container>
    </LayoutWrapper>
  );
};

export default Layout;
