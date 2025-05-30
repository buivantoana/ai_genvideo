import React from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  useMediaQuery,
  useTheme,
  Switch,
  Tooltip,
  IconButton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import StepComponent from "../../components/StepComponent";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const modelOptions = ["ChatGPT", "Qwen", "DeepSeek"];
const styleOptions = ["Thuyết minh", "Có hội thoại"];

const AccountView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      className='hidden-add-voice'
      sx={{
        bgcolor: "#0D0C2B",
        p: isMobile ? 4 : 6,

        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        overflowY: "scroll",
        height: "100vh",
      }}>
      <AccountManager />
    </Box>
  );
};

export default AccountView;


import { useState } from 'react';
import {
  Collapse,

} from '@mui/material';
import { styled } from '@mui/system';
import { ExpandMore, Delete, Edit } from '@mui/icons-material';

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: '#1a1a2e',
  padding: theme.spacing(3),
  borderRadius: '12px',
  maxWidth: '800px',
  margin: 'auto',
  color: '#fff',
}));

const UserCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#222244',
  borderRadius: '12px',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const Field = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: '#1f1f3a',
    color: '#fff',
    borderRadius: '8px',
  },
  '& .MuiInputLabel-root': {
    color: '#aaa',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#333',
  },
});

function AccountManager() {
  const [expanded, setExpanded] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  const users = [
    { id: 1, username: 'ABC123', role: 'Admin', email: 'ABC@gmail.com' },
    { id: 2, username: 'XYZ456', role: 'Editor', email: 'XYZ@gmail.com' },
    { id: 3, username: 'LMN789', role: 'Viewer', email: 'LMN@gmail.com' },
  ];

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-start" gap={2} mb={2}>
        <Button variant="outlined" sx={{ color: '#fff', borderColor: '#6C63FF' }}>
          Thêm người dùng
        </Button>
        <Button variant="outlined" sx={{ color: '#fff', borderColor: '#6C63FF' }}>
          Đổi mật khẩu
        </Button>
      </Box>

      <Typography variant="h6" mb={2}>
        Quản lý tài khoản
      </Typography>

      {users.map((user) => (
        <UserCard key={user.id}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography>{user.username}</Typography>
            <Typography>{user.role}</Typography>
            <Typography>{user.email}</Typography>
            <IconButton onClick={() => handleExpand(user.id)}>
              <ExpandMore sx={{ color: '#fff' }} />
            </IconButton>
          </Box>

          <Collapse in={expanded === user.id}>
            <Box mt={2} display="flex" flexDirection="column" gap={2}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box width={"47%"}>
                  <Typography>Địa chỉ email</Typography>
                  <Field fullWidth placeholder="Example123" />
                </Box>
                <Box width={"47%"}>
                  <Typography>Mật khẩu cũ</Typography>
                  <Field fullWidth placeholder="Example123" />
                </Box>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box width={"47%"}>
                  <Typography>Mật khẩu mới</Typography>
                  <Field fullWidth placeholder="Example123" />
                </Box>
                <Box width={"47%"}>
                  <Typography>Mật khẩu mới</Typography>
                  <Field fullWidth placeholder="Example123" />
                </Box>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box width={"47%"}>
                  <Select
                    fullWidth
                    defaultValue={user.role}
                    sx={{ backgroundColor: '#1f1f3a', color: '#fff', borderRadius: '8px' }}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Editor">Editor</MenuItem>
                    <MenuItem value="Viewer">Viewer</MenuItem>
                  </Select>
                </Box>
                <Box width={"47%"}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#6C63FF', borderRadius: '12px', alignSelf: 'flex-end' }}
                  >
                    Cập nhật thông tin
                  </Button>
                </Box>
              </Box>


            </Box>
          </Collapse>
        </UserCard>
      ))}
    </Box>
  );
}
