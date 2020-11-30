import Avatar from '@material-ui/core/Avatar';
import NoSsr from '@material-ui/core/NoSsr';
import { Item, Row } from '@mui-treasury/components/flex';
import {
    Info,


    InfoCaption, InfoSubtitle, InfoTitle
} from '@mui-treasury/components/info';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import { usePopularInfoStyles } from '@mui-treasury/styles/info/popular';
import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import { ClearHTMLTag } from '../../../libs/Functions';
import { SETTING } from '../../../constants';

const URL_IMAGE = SETTING.URL_IMAGE_PATH_SERVER

export const PopularListItem = React.memo(function PopularListItem({
    title = "Tiêu đề",
    description = "Mô tả",
    image = "https://freedesignfile.com/upload/2016/03/Abstract-geometric-petals-vector-graphic-03.jpg",
    updateAt = ""
}) {
    const avatarStyles = useDynamicAvatarStyles({
        height: 56,
        width: 64,
        radius: 8,
    });
    return (
        <>
            <NoSsr>
                <GoogleFontLoader fonts={[{ font: 'Poppins', weights: [400, 700] }]} />
            </NoSsr>
            <Row gap={3}>
                <Item>
                    <Avatar
                        variant={'rounded'}
                        classes={avatarStyles}
                        src={URL_IMAGE + "/" + image}
                    />
                </Item>
                <Info useStyles={usePopularInfoStyles}>
                    <InfoSubtitle>{ClearHTMLTag(title)}</InfoSubtitle>
                    <InfoTitle>{ClearHTMLTag(description)}</InfoTitle>
                    <InfoCaption>{updateAt}</InfoCaption>
                </Info>
            </Row>
        </>
    );
});