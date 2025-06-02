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
        p: isMobile ? 1.5 : 6,

        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 2 : 4,
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

      <Box
        bgcolor={"rgba(29, 29, 65, 1)"}
        p={isMobile ? 1 : 3}
        sx={{ borderRadius: 2 }}>
        <Typography variant='h6' fontSize={isMobile ? "1rem" : "1.25rem"} mb={2}>
          Quản lý tài khoản
        </Typography>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          px={isMobile ? "8px" : "16px"}
          mb={1}>
          <Typography width={isMobile ? "25%" : "20%"} fontSize={isMobile ? ".7rem" : "1rem"}>Tên đăng nhập</Typography>
          <Typography width={isMobile ? "25%" : "20%"} fontSize={isMobile ? ".7rem" : "1rem"}>Vai trò</Typography>
          <Typography width={isMobile ? "25%" : "20%"} fontSize={isMobile ? ".7rem" : "1rem"}>Địa chỉ mail</Typography>
          <IconButton
            sx={{ display: "flex", gap: "10px", width: "20%" }}></IconButton>
        </Box>
        {users.map((user) => (
          <UserCard key={user.id} sx={{ p: { xs: 1, md: 2 } }}>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mb={1}>
              <Typography width={isMobile ? "25%" : "20%"} fontSize={isMobile ? ".7rem" : "1rem"}>{user.username}</Typography>
              <Typography width={isMobile ? "25%" : "20%"} fontSize={isMobile ? ".7rem" : "1rem"}>{user.role}</Typography>
              <Typography width={isMobile ? "25%" : "20%"} fontSize={isMobile ? ".7rem" : "1rem"}>{user.email}</Typography>
              <Box
                sx={{
                  width: isMobile ? "25%" : "20%",
                  display: "flex",
                  gap: isMobile ? "2px" : "10px",
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
              <Box mt={2} display='flex' flexDirection='column' gap={isMobile?1:2}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box width={isMobile ? "49%" : "47%"}>
                    <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"} >Địa chỉ email</Typography>
                    <Field sx={{ "& .MuiInputBase-root": { height: { xs: "35px", md: "unset" } } }} fullWidth placeholder='Example123' />
                  </Box>
                  <Box width={isMobile ? "49%" : "47%"}>
                    <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"} >Mật khẩu cũ</Typography>
                    <Field sx={{ "& .MuiInputBase-root": { height: { xs: "35px", md: "unset" } } }} fullWidth placeholder='Ít nhất 8 ký tự' />
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box width={isMobile ? "49%" : "47%"}>
                    <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"} >Mật khẩu mới</Typography>
                    <Field sx={{ "& .MuiInputBase-root": { height: { xs: "35px", md: "unset" } } }} fullWidth placeholder='Example123' />
                  </Box>
                  <Box width={isMobile ? "49%" : "47%"}>
                    <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"} >Xác nhận lại mật khẩu</Typography>
                    <Field sx={{ "& .MuiInputBase-root": { height: { xs: "35px", md: "unset" } } }} fullWidth placeholder='Example123' />
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"end"}>
                  <Box width={isMobile ? "49%" : "47%"}>
                    <Typography fontSize={isMobile ? ".7rem" : "1rem"} mb={1}>Vai trò</Typography>
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
                        height: isMobile?"35px":"45px",
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
                        height: isMobile?"35px":"45px",
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
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box>
      <Typography variant='h5' my={3} fontSize={isMobile?"1.2rem":"1.5rem"}  fontWeight={"bold"}>
        Thêm người dùng
      </Typography>
      <Box display={"flex"} my={2} gap={isMobile?1:0} flexDirection={isMobile?"column":"row"} justifyContent={"space-between"}>
        <Box width={isMobile?"100%":"47%"}>
          <Typography mb={1} fontSize={isMobile?".7rem":"1rem"}>Tên tài khoản</Typography>
          <Field fullWidth sx={{ "& .MuiInputBase-root": { height: { xs: "35px", md: "unset" } } }} placeholder='Example123' />
        </Box>
        <Box width={isMobile?"100%":"47%"}>
          <Typography mb={1} fontSize={isMobile?".7rem":"1rem"}>Mật khẩu </Typography>
          <Field fullWidth sx={{ "& .MuiInputBase-root": { height: { xs: "35px", md: "unset" } } }} placeholder='Ít nhất 8 ký tự' />
        </Box>
      </Box>
      <Box display={"flex"} gap={isMobile?1:0} flexDirection={isMobile?"column":"row"} my={2} justifyContent={"space-between"}>
        <Box width={isMobile?"100%":"47%"}>
          <Typography mb={1} fontSize={isMobile?".7rem":"1rem"}>Email</Typography>
          <Field fullWidth sx={{ "& .MuiInputBase-root": { height: { xs: "35px", md: "unset" } } }} placeholder='Example123' />
        </Box>
        <Box width={isMobile?"100%":"47%"}>
          <Typography mb={1} fontSize={isMobile?".7rem":"1rem"}>Vai trò</Typography>
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
              height: isMobile ? "35px":"45px",
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
            height: isMobile ? "35px":"45px",
            width: isMobile?"100%":"47%",
          }}>
          Xác nhận thêm người dùng
        </Button>
      </Box>
    </Box>
  );
}

function ResetPassword() {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box>
      <Typography variant='h5' my={3} fontSize={isMobile?"1.2rem":"1.5rem"}  fontWeight={"bold"}>
        Đổi mật khẩu
      </Typography>
      <Box display={"flex"} gap={2} flexDirection={"column"}>
        <Box width={"100%"}>
          <Typography mb={1} fontSize={isMobile?".7rem":"1rem"}>Mật khẩu cũ</Typography>
          <Field sx={{ "& .MuiInputBase-root": { height: { xs: "35px", md: "unset" } } }} fullWidth placeholder='Example123' />
        </Box>
        <Box width={"100%"}>
          <Typography mb={1} fontSize={isMobile?".7rem":"1rem"}>Mật khẩu mới </Typography>
          <Field sx={{ "& .MuiInputBase-root": { height: { xs: "35px", md: "unset" } } }} fullWidth placeholder='Ít nhất 8 ký tự' />
        </Box>
        <Box width={"100%"}>
          <Typography mb={1} fontSize={isMobile?".7rem":"1rem"}>Xác nhận mật khẩu mới</Typography>
          <Field sx={{ "& .MuiInputBase-root": { height: { xs: "35px", md: "unset" } } }} fullWidth placeholder='Ít nhất 8 ký tự' />
        </Box>
      </Box>

      <Box textAlign={"center"} my={4}>
        <Button
          variant='contained'
          sx={{
            backgroundColor: "rgba(89, 50, 234, 1)",
            borderRadius: "12px",
            alignSelf: "flex-end",
            height: isMobile?"35px":"45px",
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
          minWidth: 300,
        },
      }}>
      <DialogTitle
        sx={{ position: "relative", textAlign: "center", fontWeight: "bold",fontSize:{xs:"1rem",md:"1.25rem"}  }}>
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
        <Typography color='rgba(255, 255, 255, .8)' sx={{fontSize:{xs:".7rem",md:"1rem"}}}>
          Bạn có muốn xóa tài khoản này ngay bây giờ không?
          <br />
          Bạn không thể hoàn tác hành động này.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onClose}
          variant='contained'
          sx={{
            borderColor: "#7F7EFF",
            color: "#fff",
            backgroundColor: "rgba(47, 35, 116, 1)",
            borderRadius: "12px",
            px: 4,
            height:{xs:"30px",md:"unset"},
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
            height:{xs:"30px",md:"unset"},
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
