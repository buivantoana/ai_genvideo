import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import image from "../../images/d41a47523c00877863dde87ddff31bd8dba053a3.png";
const Background = styled(Box)(({ theme }) => ({
  backgroundImage: `url("${image}")`, // Thay bằng đường dẫn ảnh nền
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const FormBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "12px",
  maxWidth: "500px",
  width: "100%",
  color: "#fff",
}));

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "#565698",
    color: "#fff",
    borderRadius: "8px",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  height: "72px",
});

export default function LoginView({
  setPassword,
  setEmail,
  email,
  password,
  handleLogin,
}: any) {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Background>
      <FormBox>
        <Typography
          variant='h4'
          fontSize={isMobile ? "1.7rem" : "2.125rem"}
          fontWeight={600}
          mb={1}>
          Đăng nhập tài khoản 👋
        </Typography>
        <Typography variant='body2' color='#ccc' mb={3}>
          Hôm nay là một ngày mới. Đó là ngày của bạn.
          <br />
          Đăng nhập để bắt đầu quản lý các dự án của bạn.
        </Typography>
        <Typography color='#BCBCE0' fontWeight={"500"}>
          Tên đăng nhập
        </Typography>
        <StyledTextField
          label='Tên đăng nhập'
          placeholder='Example@email.com'
          fullWidth
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography color='#BCBCE0' fontWeight={"500"}>
          Mật khẩu
        </Typography>
        <StyledTextField
          label='Mật khẩu'
          placeholder='Ít nhất 8 ký tự'
          type='password'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Box textAlign='right' mt={1} mb={3}>
          <Link
            href='#'
            underline='hover'
            sx={{ fontSize: "0.875rem", color: "#aaa" }}>
            Quên mật khẩu
          </Link>
        </Box>

        <Button
          fullWidth
          variant='contained'
          onClick={handleLogin}
          sx={{
            backgroundColor: "#6C63FF",
            borderRadius: "12px",
            padding: 0,
            fontWeight: "600",
            fontSize: "1rem",
            height: "55px",
          }}>
          Đăng nhập
        </Button>
      </FormBox>
    </Background>
  );
}
