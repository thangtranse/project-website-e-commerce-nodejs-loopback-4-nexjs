/* eslint-disable no-use-before-define */
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Form from "@rjsf/material-ui";
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
    rootButton: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const log = (type) => console.log.bind(console, type);

const schemaDemo = {
    title: "Agent Hub",
    type: "object",
    required: ["fullname", "email"],
    properties: {
        fullname: { type: "string", title: "Full name" },
        email: { type: "string", title: "Email", format: "email" }
    }
};

export default ({
    schema = schemaDemo,
    uiSchema = {},
    formData = {},
    fnSubmit = (data) => { },
    fnReject = (data) => { },
    children
}) => {
    const classes = useStyles();
    const [buttonChange, setButtonChange] = React.useState(false);

    return (
        <div className={classes.root}>
            <Form
                schema={schema}
                uiSchema={uiSchema}
                onSubmit={(data) => {
                    fnSubmit(data)
                    setButtonChange(true)
                }}
                formData={formData}
                onError={log("errors")}>
                {
                    children ? children : (
                        <div className={classes.rootButton} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="outlined" onClick={(event) => { fnReject(event) }}>Hủy bỏ</Button>
                            <Button variant="outlined" color="primary" type="submit">Đồng ý</Button>
                        </div>
                    )
                }
            </Form>
        </div>
    );
}