import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const Copyright = (props) => {
    return (
        <>
            <Typography variant="body2" color="textSecondary" align="center">
                {' © '} {new Date().getFullYear()}{' '}Bản quyền thuộc Vuonhoahong.vn{' - '}® Ghi rõ nguồn "vuonhoahong.vn" khi sử dụng lại bất kỳ thông tin nào từ website này
            </Typography>
            <br />
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="mailto:thangtran.se@gmail.com">
                    Thangtran.se@gmail.com - Thiết kế, xây dựng hệ thống Website -
            </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </>
    )
}

export default Copyright