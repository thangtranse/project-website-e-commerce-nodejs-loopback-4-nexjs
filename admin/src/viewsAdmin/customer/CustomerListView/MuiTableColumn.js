import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';


export default ({ deleteUser }) => {
  return [
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "firstName",
      label: "First Name",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "lastName",
      label: "Last Name",
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: "roles",
      label: "Permission",
      options: {
        filter: true,
        sort: true
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
            <IconButton aria-label="edit" onClick={deleteUser({ type: 'edit', dataIndex, rowIndex })}>
              <DeleteIcon />
            </IconButton>
          );
        }
      }
    }
  ];
}