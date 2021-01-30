import React from 'react';
import { NextPage } from 'next';
import { Modal } from '@redq/reuse-modal';
import { SEO } from 'components/seo';
import RequestMedicine from 'features/request-product/request-product';
import { ProfileProvider } from 'contexts/profile/profile.provider';
import ErrorMessage from 'components/error-message/error-message';
import Contact from 'features/contact/contact';
import useUser from 'data/use-user';
import { SHOP_NAME } from "environment";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const RequestMedicinePage: NextPage<Props> = ({ deviceType }) => {
  const { user, error } = useUser();
  if (!user) return <div>loading...</div>;

  if (error) return <ErrorMessage message={error.message} />;
  const token = true;

  return (
    <>
      <SEO
        title={`Request Medicine - ${SHOP_NAME}`}
        description="Request Medicine Details"
      />
      <ProfileProvider initData={user}>
        <Modal>
          <Contact />
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default RequestMedicinePage;