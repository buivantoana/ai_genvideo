import React, { useState } from "react";
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
  styled,
  Collapse,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import StepComponent from "../../components/StepComponent";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const modelOptions = ["ChatGPT", "Qwen", "DeepSeek"];
const styleOptions = ["Thuyết minh", "Có hội thoại"];

const ProjectManagerView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [action, setAction] = useState("manage");

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
      <ProjectList />
    </Box>
  );
};

export default ProjectManagerView;

import { Container } from "@mui/material";

const projects = [
  {
    id: 1,
    title: "Dự án con thỏ 1",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s",
    members: 6,
  },
  {
    id: 2,
    title: "Dự án con thỏ 1",
    description:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s",
    members: 6,
  },
];

const ProjectList = () => {
  const [open, setOpen] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);

  const handleDelete = () => {
    // Xử lý xóa tài khoản
    console.log("Đã xóa tài khoản!");
    setOpen(false);
  };
  const handleCloseDetail = () => {
    // Xử lý xóa tài khoản
    console.log("Đã xóa tài khoản!");
    setOpenDetail(false);
  };
  return (
    <Box>
      <Typography variant='h5' fontWeight='bold' mb={3}>
        Quản lý dự án
      </Typography>
      <Grid container mt={2} spacing={3}>
        {projects.map((project) => (
          <Grid key={project.id} item xs={12} sm={6}>
            <ProjectCard
              title={project.title}
              description={project.description}
              members={project.members}
              onDetailClick={() => alert(`Xem chi tiết ${project.title}`)}
              setOpen={setOpen}
              setOpenDetail={setOpenDetail}
            />
          </Grid>
        ))}
      </Grid>
      <Member
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
      <DetailProject
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        onConfirm={handleCloseDetail}
      />
    </Box>
  );
};

import { Card, CardContent, Avatar, Grid } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const ProjectCard = ({
  title,
  description,
  members,
  onDetailClick,
  setOpen,
  setOpenDetail,
}) => {
  return (
    <Card
      sx={{
        backgroundColor: "rgba(29, 29, 65, 1)",
        color: "#fff",
        borderRadius: "16px",
        p: 2,
      }}>
      <CardContent>
        <Typography variant='h6' fontWeight='bold' gutterBottom>
          {title}
        </Typography>
        <Typography variant='body2' sx={{ opacity: 0.7 }} gutterBottom>
          {description}
        </Typography>

        <Box
          mt={4}
          display='flex'
          alignItems='center'
          justifyContent='space-between'>
          {/* Thành viên */}
          <Box
            display='flex'
            onClick={() => setOpen(true)}
            alignItems='center'
            gap={1}>
            <Typography
              variant='body2'
              display='flex'
              alignItems='center'
              gap={0.5}>
              {members} thành viên <EditOutlinedIcon sx={{ fontSize: 16 }} />
            </Typography>
          </Box>

          {/* Nút chi tiết */}
          <Button
            variant='contained'
            sx={{
              backgroundColor: "rgba(89, 50, 234, 1)",
              textTransform: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              px: 2,
              "&:hover": {
                backgroundColor: "#6A6AFF",
              },
            }}
            onClick={() => setOpenDetail(true)}>
            Chi tiết dự án
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RiAddCircleLine, RiDeleteBin5Line } from "react-icons/ri";
import { ExpandMore } from "@mui/icons-material";

const Member = ({ open, onClose, onConfirm }) => {
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
          minWidth: 900,
        },
      }}>
      <DialogContent>
        <AccountManager />
      </DialogContent>
    </Dialog>
  );
};

const DetailProject = ({ open, onClose, onConfirm }) => {
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
          minWidth: 900,
        },
      }}>
      <DialogContent>
        <DetailProjectManager />
      </DialogContent>
    </Dialog>
  );
};
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
      <Box display='flex' justifyContent='space-between' gap={2} mb={2}>
        <Typography variant='h6' mb={2}>
          Thành viên dự án
        </Typography>
        <Button
          variant='contained'
          onClick={() => setAction("add")}
          startIcon={<RiAddCircleLine />}
          sx={{
            color: "white",
            background: "rgba(89, 50, 234, 1)",

            borderRadius: 1,
          }}>
          Thêm thành viên
        </Button>
      </Box>

      <Box bgcolor={"rgba(29, 29, 65, 1)"} sx={{ borderRadius: 2 }}>
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
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"end"}>
                  <Box width={"47%"}>
                    <Typography mb={1}>Phân quyền dự án</Typography>
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

function DetailProjectManager({ setAction, setOpen }) {
  const [expanded, setExpanded] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleDelete = () => {
    // Xử lý xóa tài khoản
    console.log("Đã xóa tài khoản!");
    setOpenAdd(false);
  };
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
      <Box display='flex' justifyContent='space-between' gap={2} mb={2}>
        <Typography variant='h6' mb={2}>
          Chi tiết dự án
        </Typography>
        <Button
          variant='contained'
          onClick={() => setOpenAdd(true)}
          startIcon={<RiAddCircleLine />}
          sx={{
            color: "white",
            background: "rgba(89, 50, 234, 1)",

            borderRadius: 1,
          }}>
          Thêm thành viên
        </Button>
      </Box>

      <Box bgcolor={"rgba(29, 29, 65, 1)"} sx={{ borderRadius: 2 }}>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={1}>
          <Typography width={"20%"}>Tên đăng nhập</Typography>
          <Typography width={"20%"}>Vai trò</Typography>
          <Typography width={"20%"}>Tiến độ dự án </Typography>
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
              <Box width={"20%"}>
                <Typography
                  sx={{
                    position: "relative",
                    color: "green",
                    fontSize: "13px",
                    border: "1px solid green",
                    width: "max-content",
                    padding: "3px 5px",
                    paddingLeft: "1.5em",
                    borderRadius: 1,
                    "&::before": {
                      content: '"•"',
                      position: "absolute",
                      left: "5px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "20px",
                      color: "green",
                    },
                  }}>
                  Hoàn thành
                </Typography>
              </Box>

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
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"end"}>
                  <Box width={"47%"}>
                    <Typography mb={1}>Tiến độ dự án</Typography>
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
                      <MenuItem value='Admin'>Đang tiến hành</MenuItem>
                    </Select>
                  </Box>
                  <Box width={"47%"}>
                    <Typography mb={1}>Phân quyền</Typography>
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
                </Box>
                <Box width={"100%%"} textAlign={"center"}>
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
            </Collapse>
          </UserCard>
        ))}
      </Box>
      <AddMemberModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}

const AddMemberModal = ({ open, onClose, onConfirm }) => {
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
          minWidth: 900,
        },
      }}>
      <DialogTitle sx={{ position: "relative", fontWeight: "bold" }}>
        Thêm thành viên
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

      <DialogContent
        sx={{
          background: "rgba(39, 39, 85, 1)",
          p: "20px !important",
          borderRadius: 2,
        }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"end"}>
          <Box width={"47%"}>
            <Typography mb={1}>Tên đăng nhập</Typography>
            <Field fullWidth placeholder='Example123' />
          </Box>
          <Box width={"47%"}>
            <Typography mb={1}>Phân quyền cho dự án</Typography>
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
        <Box mt={3} textAlign={"center"}>
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
            Thêm thành viên
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
