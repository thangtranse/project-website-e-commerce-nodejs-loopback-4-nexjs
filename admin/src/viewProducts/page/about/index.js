import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { API } from 'src/constants';
import { fetchGet } from '../../../libs/apiApp';

const PageAgentHubLayout = () => {

    const [pageContent, setPageContent] = React.useState("");

    useEffect(() => {
        fetchGet({
            url: API.page + "/about-us"
        }).then(data => {
            if (data) {
                if (data.error) {
                    throw ("error")
                } else {
                    if (data.setting && data.setting.contentMain) {
                        setPageContent(data.setting.contentMain)
                    }
                }
            }
        }).catch(error => {
            console.log("thangtran.error", error)
        })
    }, []);


    return (
        <Container maxWidth="md" style={{ minHeight: '55vh' }}>
            {
                (pageContent && pageContent.indexOf('</') !== -1) ? (
                    <div className={`contentPage`} dangerouslySetInnerHTML={{ __html: pageContent.replace(/(<? *script)/gi, 'illegalscript') }} ></div>
                ) : (
                        <Typography variant="body2" color="textSecondary" component="h2">{pageContent}</Typography>
                    )
            }
        </Container>
    )
};

export default PageAgentHubLayout;