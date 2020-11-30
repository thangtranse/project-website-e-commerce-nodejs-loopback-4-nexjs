import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,

  Divider,

  Grid,

  makeStyles, Typography
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { SETTING } from "src/constants";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));


const Contacts = ({
  className,
  addressCompany = [""],
  fnSubmit = () => { },
  settingLoading = true,
  settingSuccess = false,
  ...rest
}) => {

  const classes = useStyles();
  const [stateAddressCompany, setAddressCompany] = React.useState([]);
  const [loading, setLoading] = React.useState(settingLoading);
  const [success, setSuccess] = React.useState(settingSuccess);

  const timer = React.useRef();


  /**
   * Change content wysiwyg
   * @param {*} data: key work
   * @param {*} editorState: 
   */
  const onEditorStateChange = index => (editorState) => {
    let listData = stateAddressCompany;
    listData[index] = editorState
    setAddressCompany([...listData])
  };

  /**
   * INPUT conver theo định dạng
   * @param {*} dataRaw 
   */
  const converValueToHtml = (dataRaw = stateAddressCompany) => {
    let data = []
    if (typeof dataRaw === 'string') {
      data = JSON.parse(dataRaw)
    } else {
      data = [...dataRaw]
    }
    if (!data) return setAddressCompany([...data])
    if (data && data.length <= 0) return setAddressCompany([...data])
    let tempAddressCompany = data.map(data => {
      if (typeof data === 'string') {
        const contentDetailsBlock = htmlToDraft(data);
        if (contentDetailsBlock) {
          const contentState = ContentState.createFromBlockArray(contentDetailsBlock.contentBlocks);
          return EditorState.createWithContent(contentState)
        }
        return data
      }
      return data
    });
    setAddressCompany([...tempAddressCompany])
  }

  useEffect(() => {
    if (addressCompany) {
      converValueToHtml(addressCompany)
      setSuccess(true);
      setLoading(false);
    }
  }, [addressCompany])

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      let data = stateAddressCompany.map(data => draftToHtml(convertToRaw(data.getCurrentContent())))
      data = data.filter(ft => !(/^<p><\/p>/.test(ft) && ft.length <= 9))
      converValueToHtml(data)
      fnSubmit(data)
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, SETTING.TIME_AWATING_SERVER_RESPONSE);
    }
  };

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Địa chỉ công ty"
          title="Công ty"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={12}
              sm={12}
              xs={12}
            >
              {
                stateAddressCompany && stateAddressCompany.map((data, index) => (
                  <div key={`keyContact_${index}`} style={{ paddingBottom: 5 }}>
                    <Typography
                      align="left"
                      color="textPrimary"
                      variant="caption" display="block" gutterBottom
                    >Địa chỉ {index + 1}:</Typography>
                    <Editor
                      toolbarOnFocus
                      toolbarClassName="rdw-storybook-toolbar-absolute"
                      wrapperClassName="rdw-storybook-wrapper-margined"
                      editorClassName="thangtm13_editor"
                      onEditorStateChange={onEditorStateChange(index)}
                      editorState={typeof data === 'string' ? EditorState.createEmpty() : data}
                      toolbar={{
                        options: ['inline', 'fontSize', 'fontFamily'],
                        inline: {
                          options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                          bold: { className: 'bordered-option-classname' },
                          italic: { className: 'bordered-option-classname' },
                          underline: { className: 'bordered-option-classname' },
                          strikethrough: { className: 'bordered-option-classname' },
                          code: { className: 'bordered-option-classname' },
                        },
                        blockType: {
                          className: 'bordered-option-classname',
                        },
                        fontSize: {
                          className: 'bordered-option-classname',
                        },
                        fontFamily: {
                          className: 'bordered-option-classname',
                        },
                      }}
                    />
                  </div>
                ))
              }
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            onClick={() => { setAddressCompany([...stateAddressCompany, EditorState.createEmpty()]) }}
          >Thêm</Button>
          <div className={classes.wrapper}>
            <Button
              color="primary"
              className={buttonClassname}
              disabled={loading}
              onClick={handleButtonClick}
            >Thay đổi</Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </Box>
      </Card>
    </form>
  );
};

Contacts.propTypes = {
  className: PropTypes.string
};

export default Contacts;
