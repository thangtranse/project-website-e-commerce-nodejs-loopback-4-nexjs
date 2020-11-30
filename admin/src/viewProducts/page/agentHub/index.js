import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import Form from "@rjsf/material-ui";
import cx from 'clsx';
import React, { useEffect } from 'react';
import { API } from 'src/constants';
import { fetchGet, fetchPost } from '../../../libs/apiApp';

const schema = {
    title: "Agent Hub",
    type: "object",
    required: ["fullname", "email"],
    properties: {
        companyName: { type: "string", title: "Company name" },
        fullname: { type: "string", title: "Full name" },
        position: { type: "string", title: "Position" },
        country: { type: "string", title: "Country" },
        email: { type: "string", title: "Email", format: "email" },
        phone: { type: "string", title: "Phone" },
        message: { type: "string", title: "Message" }
    }
};

const uiSchema = {
    message: {
        "ui:widget": "textarea"
    }
};

const log = (type) => console.log.bind(console, type);

const useStyles = makeStyles((theme) => ({
    rootButton: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    root: {
        width: '100%',
        margin: 'auto',
        boxShadow: 'none',
        borderRadius: 0,
    },
    cta: {
        marginTop: 24,
        textTransform: 'initial',
    },
}));

const PageAgentHubLayout = () => {
    const styles = useStyles();

    const mediaStyles = useWideCardMediaStyles();
    const shadowStyles = useBouncyShadowStyles();

    const [pageContent, setPageContent] = React.useState("");
    const [buttonChange, setButtonChange] = React.useState(false);

    useEffect(() => {
        fetchGet({
            url: API.page + "/agent-hub"
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
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={7}>
                    {
                        (pageContent && pageContent.indexOf('</') !== -1) ? (
                            <div className={`contentPage`} dangerouslySetInnerHTML={{ __html: pageContent.replace(/(<? *script)/gi, 'illegalscript') }} ></div>
                        ) : (
                                <Typography variant="body2" color="textSecondary" component="h2">{pageContent}</Typography>
                            )
                    }
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Card className={cx(styles.root, shadowStyles.root)}>
                        <CardMedia
                            classes={mediaStyles}
                            image={
                                'https://images.unsplash.com/photo-1468774871041-fc64dd5522f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80'
                            }
                        />
                        <CardContent className={styles.content}>
                            {
                                localStorage.getItem("saveFrom") ? <Typography variant="body2" color="textSecondary" component="h2">{"Thanks you for register"}</Typography> : (
                                    <Form
                                        schema={schema}
                                        uiSchema={uiSchema}
                                        onSubmit={(data) => {
                                            fetchPost({
                                                url: API.crmAgentHubs,
                                                dataRequest: {
                                                    ...data.formData
                                                }
                                            }).then(data => {
                                                if (data && data.error) {
                                                    throw "Có lỗi trong quá trình lấy dữ liệu từ Server!"
                                                } else {
                                                    localStorage.setItem("saveFrom", true)
                                                    window.location.reload()
                                                }
                                            }).catch(error => {
                                                console.log("thangtran.error", error)
                                            })
                                            setButtonChange(true)
                                        }}
                                        onError={log("errors")}>
                                        <div className={styles.rootButton} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button variant="outlined" color="primary" type="submit">Submit</Button>
                                        </div>
                                    </Form>
                                )
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
};

export default PageAgentHubLayout;