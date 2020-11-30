import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,

  Divider,


  Grid,

  makeStyles, TextField,


  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SETTING } from "src/constants";

const useStyles = makeStyles(({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Contacts = ({
  className,
  initSchema = {
    fullname: '',
    description: '',
    phone: '',
    address: '',
    email: ''
  },
  schema = [
    initSchema
  ],
  schemaDescription = [
    { type: 'string', name: 'fullname', description: 'Họ và tên' },
    { type: 'string', name: 'description', description: 'Chức danh' },
    { type: 'string', name: 'phone', description: 'Số điện thoại' },
    { type: 'string', name: 'address', description: 'Họ và tên' },
    { type: 'string', name: 'email', description: 'Địa chỉ email' },
  ],
  fnSubmit = () => { },
  optionSetting = {
    addmore: true,
    settingLoading: true,
    settingSuccess: false
  },
  ...rest
}) => {
  const timer = React.useRef();
  const classes = useStyles();

  const [loading, setLoading] = React.useState(optionSetting.settingLoading);
  const [success, setSuccess] = React.useState(optionSetting.settingSuccess);
  const [stateDataMain, setDataMain] = React.useState([]);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  useEffect(() => {
    setSuccess(true);
    setLoading(false);
  }, [])

  useEffect(() => {
    if (schema) {
      let data = []
      if (typeof schema === 'string') {
        data = JSON.parse(schema)
      } else {
        data = [...schema]
      }
      setDataMain([...data])
    }
  }, [schema])

  /**
   * handle change value files input
   * @param {*} index 
   * @param {*} key 
   */
  const onChangeHanld = (index, key) => (event) => {
    let dataTemp = stateDataMain;
    dataTemp[index][key] = event.target.value
    setDataMain([...dataTemp])
  }

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);

      fnSubmit(stateDataMain)

      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, SETTING.TIME_AWATING_SERVER_RESPONSE);

    }
  }

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Người đại diện"
          title="Website"
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
                stateDataMain.map((dataMain, indexMain) => {
                  return (
                    <div key={'viewAutoAdd-' + indexMain} style={{
                      paddingBottom: '20px',
                      paddingRight: '20px'
                    }}>
                      <Typography
                        align="left"
                        color="textPrimary"
                        variant="caption" display="block" gutterBottom
                      >Thông tin {indexMain + 1}</Typography>
                      {
                        schemaDescription.map(objectData => {
                          switch (objectData.type) {
                            case 'string':
                              return (
                                <TextField
                                  key={'viewAutoAdd-' + indexMain + objectData.name}
                                  id={objectData.name}
                                  label={objectData.description}
                                  style={{ margin: 8 }}
                                  placeholder={'Vui lòng nhập ' + objectData.description}
                                  fullWidth
                                  margin="normal"
                                  value={dataMain[objectData.name]}
                                  onChange={onChangeHanld(indexMain, objectData.name)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              )
                              break;
                            default:
                              break;
                          }
                        })
                      }
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                      }}>
                        <Button
                          style={{ color: 'red' }}
                          onClick={() => {
                            let dataDelete = stateDataMain;
                            dataDelete.splice(indexMain, 1)
                            setDataMain([...dataDelete])
                          }}
                        >Xóa</Button>
                      </div>
                    </div>
                  )
                })
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
          {
            optionSetting.addmore ? (
              <Button
                color="primary"
                onClick={() => { setDataMain([...stateDataMain, initSchema]) }}
              >Thêm</Button>
            ) : ""
          }
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
    </form >
  );
};

Contacts.propTypes = {
  className: PropTypes.string,
  schema: PropTypes.array,
  schemaDescription: PropTypes.array,
};

export default Contacts;
