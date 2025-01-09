import React from 'react'
import { Table, Stack, Typography, TextField, TableContainer, TableRow, TableBody, TableCell, Paper} from '@mui/material';

import DiaryRow from './DiaryRow';

const diaries = [
    { date: '10/10/2024', name: 'Huỳnh Hồng Sơn', state: "Online", activity: "Chuyển hệ thống sang tự động" },
    { date: '13/10/2024', name: 'Nguyễn Khánh Vi', state: "Online", activity: "Tắt toàn bộ hệ thống" }
]

const ControlDiary = () => {
    return (
        <Stack alignItems="center">
            <Typography variant="h5" sx={{ textTransform: "uppercase", pb: 2 }}>Nhật ký hoạt động</Typography>
            <TableContainer component={Paper} sx={{maxHeight: '200px'}}>
                <Table>
                    <TableRow>
                        <TableCell>Ngày</TableCell>
                        <TableCell>Tài khoản</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Hoạt động</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableBody>
                        {diaries.map(x => <DiaryRow diary={x} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    )
}

export default ControlDiary