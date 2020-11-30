import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import GetStringHtmlTag from 'src/utils/getStringHtmlTag';


export default ({ handleTableOnlick }) => {
  return [
    {
      name: "title",
      label: "Tiêu đề sản phẩm",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "description",
      label: "Mô tả sản phẩm",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return GetStringHtmlTag(value)
        }
      }
    },
    {
      name: "type",
      label: "Sản phẩm",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          let renderValue = []
          if (value) {
            renderValue = value.map(data => data.title)
          }
          return renderValue.toString()
        }
      }
    },
    {
      name: "bestSelling",
      label: "Bán chạy",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value ? (
            <Tooltip title="Sản phẩm được đánh dấu bán chạy" aria-label="add">
              <IconButton aria-label="seling">
                <DirectionsRunIcon />
              </IconButton>
            </Tooltip>
          ) : ""
        }
      }
    },
    {
      name: "priceSales",
      label: "Giá giảm",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "price",
      label: "Giá",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "Xóa",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <IconButton aria-label="delete" onClick={handleTableOnlick({ type: 'delete', dataIndex })}>
              <DeleteIcon />
            </IconButton>
          );
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