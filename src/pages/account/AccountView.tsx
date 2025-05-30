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
  const [action, setAction] = useState("manage");
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    // Xử lý xóa tài khoản
    console.log("Đã xóa tài khoản!");
    setOpen(false);
  };
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
      {action == "reset" && <ResetPassword />}
      {action == "add" && <AddUser />}
      {action == "manage" && (
        <AccountManager setOpen={setOpen} setAction={setAction} />
      )}
      <DeleteAccountModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default AccountView;

import { useState } from "react";
import { Collapse } from "@mui/material";
import { border, styled } from "@mui/system";
import { ExpandMore, Delete, Edit } from "@mui/icons-material";
import { RiAddCircleLine, RiDeleteBin5Line } from "react-icons/ri";

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a1a2e",
  padding: theme.spacing(3),
  borderRadius: "12px",
  maxWidth: "800px",
  margin: "auto",
  color: "#fff",
}));

const UserCard = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(39, 39, 85, 1)",
  borderRadius: "12px",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const Field = styled(TextField)({
  "& .MuiInputBase-root": {
    backgroundColor: "rgba(29, 29, 65, 1)",
    color: "#fff",
    borderRadius: "8px",
    height: "45px",
  },
  "& .MuiInputLabel-root": {
    color: "#aaa",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "2px solid",
    borderColor: "#414188",
  },
});

function AccountManager({ setAction, setOpen }) {
  const [expanded, setExpanded] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const users = [
    { id: 1, username: "ABC123", role: "Admin", email: "ABC@gmail.com" },
    { id: 2, username: "XYZ456", role: "Editor", email: "XYZ@gmail.com" },
    { id: 3, username: "LMN789", role: "Viewer", email: "LMN@gmail.com" },
  ];

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <Box>
      <Box display='flex' justifyContent='flex-start' gap={2} mb={2}>
        <Button
          variant='contained'
          onClick={() => setAction("add")}
          startIcon={<RiAddCircleLine />}
          sx={{
            color: "white",
            background: "rgba(89, 50, 234, 1)",

            borderRadius: 1,
          }}>
          Thêm người dùng
        </Button>
        <Button
          variant='contained'
          onClick={() => setAction("reset")}
          sx={{
            color: "wwhite",
            background: "rgba(89, 50, 234, 0.3)",
            borderRadius: 1,
          }}>
          Đổi mật khẩu
        </Button>
      </Box>

      <Box bgcolor={"rgba(29, 29, 65, 1)"} p={3} sx={{ borderRadius: 2 }}>
        <Typography variant='h6' mb={2}>
          Quản lý tài khoản
        </Typography>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={1}>
          <Typography width={"20%"}>Tên đăng nhập</Typography>
          <Typography width={"20%"}>Vai trò</Typography>
          <Typography width={"20%"}>Địa chỉ mail</Typography>
          <IconButton
            sx={{ display: "flex", gap: "10px", width: "20%" }}></IconButton>
        </Box>
        {users.map((user) => (
          <UserCard key={user.id}>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mb={1}>
              <Typography width={"20%"}>{user.username}</Typography>
              <Typography width={"20%"}>{user.role}</Typography>
              <Typography width={"20%"}>{user.email}</Typography>
              <Box
                sx={{
                  width: "20%",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "end",
                }}>
                <RiDeleteBin5Line
                  onClick={() => setOpen(true)}
                  size={20}
                  color='rgba(115, 115, 151, 1)'
                />
                <IconButton sx={{}} onClick={() => handleExpand(user.id)}>
                  <ExpandMore sx={{ color: "#fff" }} />
                </IconButton>
              </Box>
            </Box>

            <Collapse in={expanded === user.id}>
              <Box mt={2} display='flex' flexDirection='column' gap={2}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box width={"47%"}>
                    <Typography mb={1}>Địa chỉ email</Typography>
                    <Field fullWidth placeholder='Example123' />
                  </Box>
                  <Box width={"47%"}>
                    <Typography mb={1}>Mật khẩu cũ</Typography>
                    <Field fullWidth placeholder='Ít nhất 8 ký tự' />
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box width={"47%"}>
                    <Typography mb={1}>Mật khẩu mới</Typography>
                    <Field fullWidth placeholder='Example123' />
                  </Box>
                  <Box width={"47%"}>
                    <Typography mb={1}>Xác nhận lại mật khẩu</Typography>
                    <Field fullWidth placeholder='Example123' />
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"end"}>
                  <Box width={"47%"}>
                    <Typography mb={1}>Vai trò</Typography>
                    <Select
                      fullWidth
                      defaultValue={user.role}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            backgroundColor: "#2A274B", // nền của dropdown list
                            color: "#fff",
                            borderRadius: 2,
                            mt: 1,
                            "& .MuiMenuItem-root": {
                              "&:hover": {
                                backgroundColor: "#3A375F", // màu hover
                                borderRadius: 1,
                              },
                              "&.Mui-selected": {
                                backgroundColor: "#4B3A79", // màu selected
                                borderRadius: 1,
                              },
                            },
                          },
                        },
                      }}
                      sx={{
                        backgroundColor: "rgba(29, 29, 65, 1)",
                        color: "#fff",
                        height: "45px",
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "2px solid",
                          borderColor: "#414188", // 👈 Viền mặc định
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "2px solid",
                          borderColor: "#414188", // 👈 Viền khi focus
                        },
                        ".MuiSelect-icon": { color: "#fff" },
                      }}>
                      <MenuItem value='Admin'>Admin</MenuItem>
                      <MenuItem value='Editor'>Editor</MenuItem>
                      <MenuItem value='Viewer'>Viewer</MenuItem>
                    </Select>
                  </Box>
                  <Box width={"47%"} textAlign={"end"}>
                    <Button
                      variant='contained'
                      sx={{
                        backgroundColor: "rgba(89, 50, 234, 1)",
                        borderRadius: "12px",
                        alignSelf: "flex-end",
                        height: "45px",
                      }}>
                      Cập nhật thông tin
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Collapse>
          </UserCard>
        ))}
      </Box>
    </Box>
  );
}

function AddUser() {
  return (
    <Box>
      <Typography variant='h5' my={3} fontWeight={"bold"}>
        Thêm người dùng
      </Typography>
      <Box display={"flex"} my={2} justifyContent={"space-between"}>
        <Box width={"47%"}>
          <Typography mb={1}>Tên tài khoản</Typography>
          <Field fullWidth placeholder='Example123' />
        </Box>
        <Box width={"47%"}>
          <Typography mb={1}>Mật khẩu </Typography>
          <Field fullWidth placeholder='Ít nhất 8 ký tự' />
        </Box>
      </Box>
      <Box display={"flex"} my={2} justifyContent={"space-between"}>
        <Box width={"47%"}>
          <Typography mb={1}>Email</Typography>
          <Field fullWidth placeholder='Example123' />
        </Box>
        <Box width={"47%"}>
          <Typography mb={1}>Vai trò</Typography>
          <Select
            fullWidth
            defaultValue={"Admin"}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#2A274B", // nền của dropdown list
                  color: "#fff",
                  borderRadius: 2,
                  mt: 1,
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      backgroundColor: "#3A375F", // màu hover
                      borderRadius: 1,
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#4B3A79", // màu selected
                      borderRadius: 1,
                    },
                  },
                },
              },
            }}
            sx={{
              backgroundColor: "rgba(29, 29, 65, 1)",
              color: "#fff",
              height: "45px",
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "#414188", // 👈 Viền mặc định
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "#414188", // 👈 Viền khi focus
              },
              ".MuiSelect-icon": { color: "#fff" },
            }}>
            <MenuItem value='Admin'>Admin</MenuItem>
            <MenuItem value='Editor'>Editor</MenuItem>
            <MenuItem value='Viewer'>Viewer</MenuItem>
          </Select>
        </Box>
      </Box>
      <Box textAlign={"center"} my={4}>
        <Button
          variant='contained'
          sx={{
            backgroundColor: "rgba(89, 50, 234, 1)",
            borderRadius: "12px",
            alignSelf: "flex-end",
            height: "45px",
            width: "47%",
          }}>
          Xác nhận thêm người dùng
        </Button>
      </Box>
    </Box>
  );
}

function ResetPassword() {
  return (
    <Box>
      <Typography variant='h5' my={3} fontWeight={"bold"}>
        Đổi mật khẩu
      </Typography>
      <Box display={"flex"} gap={2} flexDirection={"column"}>
        <Box width={"100%"}>
          <Typography mb={1}>Mật khẩu cũ</Typography>
          <Field fullWidth placeholder='Example123' />
        </Box>
        <Box width={"100%"}>
          <Typography mb={1}>Mật khẩu mới </Typography>
          <Field fullWidth placeholder='Ít nhất 8 ký tự' />
        </Box>
        <Box width={"100%"}>
          <Typography mb={1}>Xác nhận mật khẩu mới</Typography>
          <Field fullWidth placeholder='Ít nhất 8 ký tự' />
        </Box>
      </Box>

      <Box textAlign={"center"} my={4}>
        <Button
          variant='contained'
          sx={{
            backgroundColor: "rgba(89, 50, 234, 1)",
            borderRadius: "12px",
            alignSelf: "flex-end",
            height: "45px",
            width: "47%",
          }}>
          Cập nhật mật khẩu
        </Button>
      </Box>
    </Box>
  );
}

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DeleteAccountModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "rgba(29, 29, 65, 1)",
          color: "#fff",
          borderRadius: "16px",
          padding: 2,
          minWidth: 400,
        },
      }}>
      <DialogTitle
        sx={{ position: "relative", textAlign: "center", fontWeight: "bold" }}>
        Bạn muốn xóa tài khoản này?
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            color: "white",
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center" }}>
        <Typography color='rgba(255, 255, 255, .8)'>
          Bạn có muốn xóa tài khoản này ngay bây giờ không?
          <br />
          Bạn không thể hoàn tác hành động này.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onClose}
          variant='outlined'
          sx={{
            borderColor: "#7F7EFF",
            color: "#fff",
            backgroundColor: "rgba(47, 35, 116, 1)",
            borderRadius: "12px",
            px: 4,
            "&:hover": {
              backgroundColor: "#3A3960",
            },
          }}>
          Hủy bỏ
        </Button>
        <Button
          onClick={onConfirm}
          variant='contained'
          sx={{
            backgroundColor: "rgba(89, 50, 234, 1)",
            color: "#fff",
            borderRadius: "12px",
            px: 4,
            ml: 2,
            "&:hover": {
              backgroundColor: "#6F6EFF",
            },
          }}>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};
