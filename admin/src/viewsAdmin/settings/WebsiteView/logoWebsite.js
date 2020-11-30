import {
    Button,

    makeStyles
} from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SETTING } from "src/constants";
import {
    actionUploadFile
} from 'src/saga/action';

const useStyles = makeStyles(({
    root: {},
}));

const initLogoImage = {
    default: "",
    favicon: ""
}

const LogoWebsite = ({
    logoImage = {
        ...initLogoImage
    },
    onSubmit = () => {}
}) => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const [openDropzoneDialog, setOpenDropzoneDialog] = React.useState(false);
    const [logoImageState, setLogoImageState] = React.useState({ ...initLogoImage });

    // useEffect(() => {
    //     if (logoImage) {
    //         let data = []
    //         if (typeof schema === 'string') {
    //             let dataTemp = JSON.parse(logoImage)
    //             data = [...dataTemp]
    //         } else {
    //             data = [...logoImage]
    //         }
    //         setLogoImageState({ ...data })
    //     }
    // }, [logoImage])

    /**
     * handle upload file open popup
     * @param {*} event 
     */
    const handleOpenDropzoneDialog = (event) => {
        setOpenDropzoneDialog(!openDropzoneDialog)
    }

    /**
     * Handle when submit file
     * @param {*} files 
     */
    const handleSaveDropzoneDialog = async (files) => {
        dispatch(actionUploadFile(files))
        setOpenDropzoneDialog(false)
    }

    return (
        <>

            <Button onClick={handleOpenDropzoneDialog}>Thêm hình ảnh</Button>
            <DropzoneDialog
                open={openDropzoneDialog}
                onSave={handleSaveDropzoneDialog}
                acceptedFiles={SETTING.FILE_UPLOAD_IMAGE}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={handleOpenDropzoneDialog}
            />
        </>
    );
};

export default LogoWebsite;
