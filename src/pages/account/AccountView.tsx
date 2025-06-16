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

const AccountView = ({ setLoading, users, getAllUser }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [action, setAction] = useState("manage");
  const [open, setOpen] = React.useState(false);
  const [idUser, setIdUser] = useState(null);
  const handleDeleteUser = (id) => {
    setOpen(true);
    setIdUser(id);
  };
  const handleDelete = async () => {
    try {
      if (idUser) {
        let result = await deleteUser(idUser);
        if (result && result.message) {
          toast.success(result.message);
          getAllUser();
        } else {
          toast.warning(result.detail);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
      {action == "reset" && <ResetPassword setAction={setAction} />}
      {action == "add" && (
        <AddUser
          setLoading={setLoading}
          setAction={setAction}
          getAllUser={getAllUser}
        />
      )}
      {action == "manage" && (
        <AccountManager
          handleDeleteUser={handleDeleteUser}
          users={users}
          setAction={setAction}
        />
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
import {
  RiAddCircleLine,
  RiArrowLeftLine,
  RiDeleteBin5Line,
} from "react-icons/ri";

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

function AccountManager({ setAction, users, handleDeleteUser }) {
  const [expanded, setExpanded] = useState(null);

  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <Box>
      <Box display='flex' justifyContent='flex-start' gap={2} mb={2}>
        {JSON.parse(localStorage.getItem("user")).role == "admin" && (
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
        )}
        <Button
          variant='contained'
          onClick={() => setAction("reset")}
          sx={{
            color: "white",
            background: "rgba(89, 50, 234, 0.3)",
            borderRadius: 1,
          }}>
          Đổi mật khẩu
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            localStorage.removeItem("token");
            setTimeout(() => {
              navigate("/login");
            }, 200);
          }}
          sx={{
            color: "black",
            background: "white",
            borderRadius: 1,
          }}>
          Logout
        </Button>
      </Box>

      <Box
        bgcolor={"rgba(29, 29, 65, 1)"}
        p={isMobile ? 1 : 3}
        sx={{ borderRadius: 2 }}>
        <Typography
          variant='h6'
          fontSize={isMobile ? "1rem" : "1.25rem"}
          mb={2}>
          Quản lý tài khoản
        </Typography>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          px={isMobile ? "8px" : "16px"}
          mb={1}>
          <Typography
            width={isMobile ? "25%" : "20%"}
            fontSize={isMobile ? ".7rem" : "1rem"}>
            Tên đăng nhập
          </Typography>
          <Typography
            width={isMobile ? "25%" : "20%"}
            fontSize={isMobile ? ".7rem" : "1rem"}>
            Vai trò
          </Typography>
          <Typography
            width={isMobile ? "25%" : "20%"}
            fontSize={isMobile ? ".7rem" : "1rem"}>
            Địa chỉ mail
          </Typography>
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
              <Typography
                width={isMobile ? "25%" : "20%"}
                fontSize={isMobile ? ".7rem" : "1rem"}>
                {user.username}
              </Typography>
              <Typography
                width={isMobile ? "25%" : "20%"}
                fontSize={isMobile ? ".7rem" : "1rem"}>
                {user.role}
              </Typography>
              <Typography
                width={isMobile ? "25%" : "20%"}
                fontSize={isMobile ? ".7rem" : "1rem"}>
                {user.email}
              </Typography>
              <Box
                sx={{
                  width: isMobile ? "25%" : "20%",
                  display: "flex",
                  gap: isMobile ? "2px" : "10px",
                  alignItems: "center",
                  justifyContent: "end",
                }}>
                <RiDeleteBin5Line
                  onClick={() => handleDeleteUser(user)}
                  size={20}
                  color='rgba(115, 115, 151, 1)'
                />
                <IconButton sx={{}} onClick={() => handleExpand(user.id)}>
                  <ExpandMore sx={{ color: "#fff" }} />
                </IconButton>
              </Box>
            </Box>

            <Collapse in={expanded === user.id}>
              <Box
                mt={2}
                display='flex'
                flexDirection='column'
                gap={isMobile ? 1 : 2}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box width={isMobile ? "49%" : "47%"}>
                    <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"}>
                      Địa chỉ email
                    </Typography>
                    <Field
                      sx={{
                        "& .MuiInputBase-root": {
                          height: { xs: "35px", md: "45px" },
                        },
                      }}
                      fullWidth
                      placeholder='Example123'
                    />
                  </Box>
                  <Box width={isMobile ? "49%" : "47%"}>
                    <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"}>
                      Mật khẩu cũ
                    </Typography>
                    <Field
                      sx={{
                        "& .MuiInputBase-root": {
                          height: { xs: "35px", md: "45px" },
                        },
                      }}
                      fullWidth
                      placeholder='Ít nhất 8 ký tự'
                    />
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box width={isMobile ? "49%" : "47%"}>
                    <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"}>
                      Mật khẩu mới
                    </Typography>
                    <Field
                      sx={{
                        "& .MuiInputBase-root": {
                          height: { xs: "35px", md: "45px" },
                        },
                      }}
                      fullWidth
                      placeholder='Example123'
                    />
                  </Box>
                  <Box width={isMobile ? "49%" : "47%"}>
                    <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"}>
                      Xác nhận lại mật khẩu
                    </Typography>
                    <Field
                      sx={{
                        "& .MuiInputBase-root": {
                          height: { xs: "35px", md: "45px" },
                        },
                      }}
                      fullWidth
                      placeholder='Example123'
                    />
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"end"}>
                  <Box width={isMobile ? "49%" : "47%"}>
                    <Typography fontSize={isMobile ? ".7rem" : "1rem"} mb={1}>
                      Vai trò
                    </Typography>
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
                        height: isMobile ? "35px" : "45px",
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
                        height: isMobile ? "35px" : "45px",
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

function AddUser({ setLoading, setAction, getAllUser }: any) {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");

  // Error states
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  });

  const validate = () => {
    const newErrors = {
      username: "",
      password: "",
      email: "",
    };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = "Tên tài khoản là bắt buộc";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Mật khẩu là bắt buộc";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Mật khẩu phải từ 8 ký tự trở lên";
      isValid = false;
    } else if (password.length > 16) {
      newErrors.password = "Mật khẩu không vượt quá 16 ký tự";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email là bắt buộc";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    const userData = {
      username,
      password,
      email,
      role,
    };
    try {
      let result = await Register(userData);
      if (result && result.message) {
        toast.success(result.message);
        setUsername("");
        setPassword("");
        setEmail("");
        getAllUser();
      } else {
        toast.warning(result.detail);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <Box>
      <Box
        onClick={() => setAction("manage")}
        display={"flex"}
        alignItems={"center"}
        gap={"5px"}
        sx={{ cursor: "pointer" }}>
        <RiArrowLeftLine />
        <Typography>Quay lại</Typography>
      </Box>
      <Typography
        variant='h5'
        my={3}
        fontSize={isMobile ? "1.2rem" : "1.5rem"}
        fontWeight={"bold"}>
        Thêm người dùng
      </Typography>

      <Box
        display={"flex"}
        my={2}
        gap={isMobile ? 1 : 0}
        flexDirection={isMobile ? "column" : "row"}
        justifyContent={"space-between"}>
        <Box width={isMobile ? "100%" : "47%"}>
          <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"}>
            Tên tài khoản
          </Typography>
          <Field
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
            sx={{
              "& .MuiInputBase-root": { height: { xs: "35px", md: "45px" } },
            }}
            placeholder='Example123'
          />
        </Box>

        <Box width={isMobile ? "100%" : "47%"}>
          <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"}>
            Mật khẩu
          </Typography>
          <Field
            fullWidth
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            sx={{
              "& .MuiInputBase-root": { height: { xs: "35px", md: "45px" } },
            }}
            placeholder='8-16 ký tự'
          />
        </Box>
      </Box>

      <Box
        display={"flex"}
        gap={isMobile ? 1 : 0}
        flexDirection={isMobile ? "column" : "row"}
        my={2}
        justifyContent={"space-between"}>
        <Box width={isMobile ? "100%" : "47%"}>
          <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"}>
            Email
          </Typography>
          <Field
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              "& .MuiInputBase-root": { height: { xs: "35px", md: "45px" } },
            }}
            placeholder='example@example.com'
          />
        </Box>

        <Box width={isMobile ? "100%" : "47%"}>
          <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"}>
            Vai trò
          </Typography>
          <Select
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#2A274B",
                  color: "#fff",
                  borderRadius: 2,
                  mt: 1,
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      backgroundColor: "#3A375F",
                      borderRadius: 1,
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#4B3A79",
                      borderRadius: 1,
                    },
                  },
                },
              },
            }}
            sx={{
              backgroundColor: "rgba(29, 29, 65, 1)",
              color: "#fff",
              height: isMobile ? "35px" : "45px",
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "#414188",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#414188",
              },
              ".MuiSelect-icon": { color: "#fff" },
            }}>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='editor'>Editor</MenuItem>
          </Select>
        </Box>
      </Box>

      <Box textAlign={"center"} my={4}>
        <Button
          variant='contained'
          onClick={handleRegister}
          sx={{
            backgroundColor: "rgba(89, 50, 234, 1)",
            borderRadius: "12px",
            alignSelf: "flex-end",
            height: isMobile ? "35px" : "45px",
            width: isMobile ? "100%" : "47%",
          }}>
          Xác nhận thêm người dùng
        </Button>
      </Box>
    </Box>
  );
}

function ResetPassword({ setAction }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Hàm xử lý reset
  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      toast.warning("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }
    try {
      let result = await resetPassword({
        old_password: oldPassword,
        new_password: newPassword,
      });
      if (result && result.message) {
        toast.success(result.message);
      } else {
        toast.warning(result.detail);
      }
    } catch (error) {
      console.log(error);
    }
    // Gửi dữ liệu đi hoặc xử lý tiếp theo ở đây
  };

  return (
    <Box>
      <Box
        onClick={() => setAction("manage")}
        display={"flex"}
        alignItems={"center"}
        gap={"5px"}
        sx={{ cursor: "pointer" }}>
        <RiArrowLeftLine />
        <Typography>Quay lại</Typography>
      </Box>

      <Typography
        variant='h5'
        my={3}
        fontSize={isMobile ? "1.2rem" : "1.5rem"}
        fontWeight={"bold"}>
        Đổi mật khẩu
      </Typography>

      <Box display={"flex"} gap={2} flexDirection={"column"}>
        <Box width={"100%"}>
          <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"}>
            Mật khẩu cũ
          </Typography>
          <Field
            type='password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            sx={{
              "& .MuiInputBase-root": { height: { xs: "35px", md: "45px" } },
            }}
            fullWidth
            placeholder='Example123'
          />
        </Box>

        <Box width={"100%"}>
          <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"}>
            Mật khẩu mới
          </Typography>
          <Field
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{
              "& .MuiInputBase-root": { height: { xs: "35px", md: "45px" } },
            }}
            fullWidth
            placeholder='Ít nhất 8 ký tự'
          />
        </Box>

        <Box width={"100%"}>
          <Typography mb={1} fontSize={isMobile ? ".7rem" : "1rem"}>
            Xác nhận mật khẩu mới
          </Typography>
          <Field
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              "& .MuiInputBase-root": { height: { xs: "35px", md: "45px" } },
            }}
            fullWidth
            placeholder='Ít nhất 8 ký tự'
          />
        </Box>
      </Box>

      <Box textAlign={"center"} my={4}>
        <Button
          variant='contained'
          onClick={handleReset}
          sx={{
            backgroundColor: "rgba(89, 50, 234, 1)",
            borderRadius: "12px",
            alignSelf: "flex-end",
            height: isMobile ? "35px" : "45px",
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
import { deleteUser, Register, resetPassword } from "../../service/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        sx={{
          position: "relative",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: { xs: "1rem", md: "1.25rem" },
        }}>
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
        <Typography
          color='rgba(255, 255, 255, .8)'
          sx={{ fontSize: { xs: ".7rem", md: "1rem" } }}>
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
            height: { xs: "30px", md: "unset" },
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
            height: { xs: "30px", md: "unset" },
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
