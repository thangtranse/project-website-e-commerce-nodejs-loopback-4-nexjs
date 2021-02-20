import ErrorMessage from 'components/error-message/error-message';
import { SEO } from 'components/seo';
import useAbout from 'data/use-about';
import { SHOP_NAME } from "environment";
import {
  StyledContainer,
  StyledContent,




  StyledContentHeading, StyledLeftContent,
  StyledLeftInnerContent, StyledLink,


  StyledRightContent
} from 'features/terms-and-services/terms-and-services';
import { NextPage } from 'next';
import { Element } from 'react-scroll';
import Sticky from 'react-stickynode';
import { useMedia } from 'utils/use-media';

const PrivacyPage: NextPage<{}> = () => {

  const { data: dataAbout, error } = useAbout();

  const mobile = useMedia('(max-width: 580px)');

  const menuItems: string[] = [];


  if (!dataAbout) return <div>loading...</div>;
  if (error) return <ErrorMessage message={error.message} />;

  const { title, element: content } = dataAbout;
  content.forEach((item) => {
    menuItems.push(item.title);
  });

  console.log("thangtran.dataAbout", dataAbout)
  return (
    <>
      <SEO title={title} description={`${SHOP_NAME} about page`} />
      <StyledContainer>
        {/* <Heading title={title} subtitle={`Last update: ${date}`} /> */}
        <StyledContent>
          <StyledLeftContent>
            <Sticky top={mobile ? 68 : 150} innerZ="1">
              <StyledLeftInnerContent>
                {menuItems.map((item) => (
                  <StyledLink
                    key={item}
                    activeClass="active"
                    to={item}
                    spy={true}
                    smooth={true}
                    offset={-276}
                    duration={500}
                  >
                    {item}
                  </StyledLink>
                ))}
              </StyledLeftInnerContent>
            </Sticky>
          </StyledLeftContent>
          <StyledRightContent>
            {content.map((item, idx) => {
              return (
                <Element
                  name={item.title}
                  style={{ paddingBottom: 40 }}
                  key={idx}
                >
                  <StyledContentHeading>{item.title}</StyledContentHeading>
                  <div
                    className="html-content"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />
                </Element>
              );
            })}
          </StyledRightContent>
        </StyledContent>
      </StyledContainer>
    </>
  );
};

export default PrivacyPage;
