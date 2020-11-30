import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import GetStringHtmlTag from 'src/utils/getStringHtmlTag';


export default ({ handleTableOnlick }) => {
  return [
    {
      name: "title",
      label: "Page",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "content",
      label: "Mô tả",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return GetStringHtmlTag(value)
        }
      }
    },
    {
      name: "Chỉnh sửa",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <IconButton aria-label="edit" onClick={handleTableOnlick({ type: 'edit', dataIndex, rowIndex })}>
              <EditIcon />
            </IconButton>
          );
        }
      }
    }
  ];
}