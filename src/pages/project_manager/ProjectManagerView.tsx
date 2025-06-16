import {
  Box,
  Button,
  Collapse,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const ProjectManagerView = ({
  project,
  functions,
  setLoading,
  getAll,
}: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [action, setAction] = useState("manage");
  console.log("project", project);
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
      }}>
      <ProjectList
        project={project}
        setLoading={setLoading}
        functions={functions}
        getAll={getAll}
      />
    </Box>
  );
};

export default ProjectManagerView;

const ProjectList = ({ project, functions, setLoading, getAll }: any) => {
  const [open, setOpen] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [member, setMember] = React.useState([]);
  const [idProject, setIdProject] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (idProject) {
      setMember(
        project.find((item) => item.id == idProject).members
          ? project.find((item) => item.id == idProject).members
          : member
      );
    }
  }, [idProject, project]);
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
      <Typography
        variant='h5'
        fontSize={isMobile ? "1.2rem" : "1.5rem"}
        fontWeight='bold'
        mb={isMobile ? 1 : 3}>
        Quản lý dự án
      </Typography>
      <Grid container mt={isMobile ? 1 : 2} spacing={3}>
        {project.map((project) => (
          <Grid key={project.id} item xs={12} sm={6} style={{ height: "100%" }}>
            <ProjectCard
              title={project.name}
              description={project.prompt}
              members={
                project.members && project.members.length > 0
                  ? project.members
                  : []
              }
              onDetailClick={() => alert(`Xem chi tiết ${project.title}`)}
              setOpen={setOpen}
              setOpenDetail={setOpenDetail}
              setMember={setMember}
              setIdProject={() => setIdProject(project.id)}
              project={project}
            />
          </Grid>
        ))}
      </Grid>
      <Member
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        member={member}
        functions={functions}
        idProject={idProject}
        setLoading={setLoading}
        getAll={getAll}
      />
      <DetailProject
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        onConfirm={handleCloseDetail}
        functions={functions}
      />
    </Box>
  );
};

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Card, CardContent, Grid } from "@mui/material";

const ProjectCard = ({
  title,
  description,
  members,
  onDetailClick,
  setOpen,
  setOpenDetail,
  setMember,
  setIdProject,
  project,
}: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        backgroundColor: "rgba(29, 29, 65, 1)",
        color: "#fff",
        borderRadius: "16px",
        p: isMobile ? 0.5 : 2,
        height: "21vh",
      }}>
      <CardContent>
        <Typography
          variant='h6'
          fontSize={isMobile ? "1rem" : "1.25rem"}
          fontWeight='bold'
          gutterBottom>
          {title}
        </Typography>
        <Typography
          variant='body2'
          sx={{ opacity: 0.7, height: 50 }}
          gutterBottom>
          {description.split(" ").slice(0, 30).join(" ") +
            (description.split(" ").length > 30 ? "..." : "")}
        </Typography>

        <Box
          mt={isMobile ? 2 : 4}
          display='flex'
          alignItems='center'
          justifyContent='space-between'>
          {/* Thành viên */}
          <Box
            display='flex'
            onClick={() => {
              setIdProject();
              setMember(members);
              setOpen(true);
            }}
            alignItems='center'
            gap={1}>
            <Typography
              variant='body2'
              display='flex'
              alignItems='center'
              gap={0.5}>
              {members.length} thành viên{" "}
              <EditOutlinedIcon sx={{ fontSize: 16 }} />
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
            onClick={() => {
              console.log("pro",project)
              if (project?.current_step == "gen_script") {
                navigate(`/create-image?id=${project.id}`);
              }
              if (project?.current_step == "gen_image") {
                navigate(`/create-video?id=${project.id}`);
              }
              if (project?.current_step == "gen_video") {
                navigate(`/narrator?id=${project.id}`);
              }
              if (!project?.current_step) {
                navigate(`/script?id=${project.id}`);
              }
            }}>
            Chi tiết dự án
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

import { ExpandMore } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { RiAddCircleLine, RiDeleteBin5Line } from "react-icons/ri";
import { updateProjectMember } from "../../service/project";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Member = ({
  open,
  onClose,
  onConfirm,
  member,
  functions,
  idProject,
  setLoading,
  getAll,
}: any) => {
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
          minWidth: { xs: "90vw", sm: 600, md: 800, lg: 900 },
        },
      }}>
      <DialogContent sx={{ p: { xs: 0.5, md: "unset" } }}>
        <AccountManager
          member={member}
          functions={functions}
          setLoading={setLoading}
          idProject={idProject}
          getAll={getAll}
        />
      </DialogContent>
    </Dialog>
  );
};

const DetailProject = ({ open, onClose, onConfirm, functions }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "rgba(29, 29, 65, 1)",
          color: "#fff",
          borderRadius: "16px",
          padding: { xs: 0.5, md: 2 },
          minWidth: { xs: "90vw", sm: 600, md: 800, lg: 900 },
        },
      }}>
      <DialogContent sx={{ p: { xs: 0.5, md: "unset" } }}>
        <DetailProjectManager functions={functions} />
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

import {
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  OutlinedInput
} from "@mui/material";


const options = ["Voice", "Video", "Lorem"];

function RolePermissionSelect() {
  const [selected, setSelected] = useState(["Voice", "Video"]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setSelected(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel sx={{ color: "#fff" }}>Phân quyền</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label="Phân quyền" />}
        renderValue={(selected) => selected.join(", ")}
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
                  borderRadius: 1
                },
                "&.Mui-selected": {
                  backgroundColor: "#4B3A79",
                  borderRadius: 1
                }
              }
            }
          }
        }}
        sx={{
          backgroundColor: "rgba(29, 29, 65, 1)",
          color: "#fff",
          borderRadius: "8px",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid",
            borderColor: "#414188"
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#414188"
          },
          ".MuiSelect-icon": { color: "#fff" }
        }}
      >
        {options.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox
              checked={selected.indexOf(name) > -1}
              sx={{
                color: "#888",
                "&.Mui-checked": {
                  color: "#8A6EFF"
                }
              }}
            />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
function AccountManager({
  setAction,
  setOpen,
  member,
  functions,
  idProject,
  setLoading,
  getAll,
}) {
  const [expanded, setExpanded] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openAdd, setOpenAdd] = React.useState(false);
  console.log("member", member);
  const handleClose = async (body) => {
    if (!body.userName.trim()) {
      toast.warning("Tên tài khoản là bắt buộc");
      return;
    }
    if (body.selectedFunctions.length == 0) {
      toast.warning("Chức năng là bắt buộc");
      return;
    }
    setLoading(true);
    try {
      let result = await updateProjectMember({
        project_id: idProject,
        username: body.userName,
        functions: body.selectedFunctions,
      });
      if (result && result.message) {
        toast.success(result.message);
        getAll();
      } else {
        toast.warning(result.detail);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setOpenAdd(false);
  };

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <Box>
      <AddMemberModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onConfirm={handleClose}
        functions={functions}
      />
      <Box display='flex' justifyContent='space-between' gap={2} mb={2}>
        <Typography
          variant='h6'
          fontSize={isMobile ? "1rem" : "1.25rem"}
          mb={2}>
          Thành viên dự án
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
        {member.map((user) => (
          <UserCard key={user.id}>
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
                  gap: isMobile ? "5px" : "10px",
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
                  flexDirection={isMobile ? "column" : "row"}
                  gap={isMobile ? 1 : 0}
                  alignItems={"end"}>
                  <Box width={isMobile ? "100%" : "47%"}>
                   <RolePermissionSelect/>
                  </Box>
                  <Box width={isMobile ? "100%" : "47%"} textAlign={"end"}>
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

function DetailProjectManager({ setAction, setOpen, functions }) {
  const [expanded, setExpanded] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleDelete = (body) => {
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
        <Typography
          variant='h6'
          fontSize={isMobile ? "1rem" : "1.25rem"}
          mb={2}>
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
            height: isMobile ? "33px" : "unset",
          }}>
          Thêm thành viên
        </Button>
      </Box>

      <Box bgcolor={"rgba(29, 29, 65, 1)"} sx={{ borderRadius: 2 }}>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          sx={{ p: { xs: 1, md: 2 } }}
          mb={1}>
          <Typography
            width={isMobile ? "25%" : "20%"}
            fontSize={isMobile ? ".7rem" : "1rem"}>
            Tên đăng nhập
          </Typography>
          {!isMobile && (
            <Typography
              width={isMobile ? "25%" : "20%"}
              fontSize={isMobile ? ".7rem" : "1rem"}>
              Vai trò
            </Typography>
          )}
          <Typography
            width={isMobile ? "25%" : "20%"}
            fontSize={isMobile ? ".7rem" : "1rem"}>
            Tiến độ dự án{" "}
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
          <UserCard sx={{ p: { xs: 1, md: 2 } }} key={user.id}>
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
              {!isMobile && (
                <Typography
                  width={isMobile ? "25%" : "20%"}
                  fontSize={isMobile ? ".7rem" : "1rem"}>
                  {user.role}
                </Typography>
              )}
              {!isMobile && (
                <Box width={isMobile ? "25%" : "20%"}>
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
              )}
              {isMobile && (
                <Typography
                  width={isMobile ? "25%" : "20%"}
                  sx={{
                    position: "relative",
                    color: "green",
                    fontSize: "13px",
                    width: "max-content",
                  }}>
                  Hoàn thành
                </Typography>
              )}
              <Typography
                width={isMobile ? "25%" : "20%"}
                fontSize={isMobile ? ".7rem" : "1rem"}>
                {user.email}
              </Typography>
              <Box
                sx={{
                  width: "20%",
                  display: "flex",
                  gap: isMobile ? 0 : "10px",
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
                  flexDirection={isMobile ? "column" : "row"}
                  gap={isMobile ? 1 : 0}
                  alignItems={"end"}>
                  <Box width={isMobile ? "100%" : "47%"}>
                    <Typography
                      fontSize={isMobile ? ".7rem" : "1rem"}
                      mb={isMobile ? 0.5 : 1}>
                      Tiến độ dự án
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
                            mt: isMobile ? 0.5 : 1,
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
                        fontSize: isMobile ? "12px" : "unset",
                      }}>
                      <MenuItem value='Admin'>Đang tiến hành</MenuItem>
                    </Select>
                  </Box>
                  <Box width={isMobile ? "100%" : "47%"}>
                    <Typography
                      fontSize={isMobile ? ".7rem" : "1rem"}
                      mb={isMobile ? 0.5 : 1}>
                      Phân quyền
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
                            mt: isMobile ? 0.5 : 1,
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
                        fontSize: isMobile ? "12px" : "unset",
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
                      height: isMobile ? "35px" : "45px",
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
        functions={functions}
      />
    </Box>
  );
}

const AddMemberModal = ({ open, onClose, onConfirm, functions }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  console.log("functions", functions);
  const [selectedFunctions, setSelectedFunctions] = useState([]);
  const [userName, setUserName] = useState("");

  const handleChange = (event) => {
    setSelectedFunctions(event.target.value);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "rgba(29, 29, 65, 1)",
          color: "#fff",
          borderRadius: "16px",
          padding: { xs: 0.5, md: 2 },
          minWidth: { xs: "90vw", sm: 600, md: 800, lg: 900 },
        },
      }}>
      <DialogTitle
        sx={{
          position: "relative",
          fontWeight: "bold",
          fontSize: isMobile ? "1rem" : "1.25rem",
        }}>
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
          flexDirection={isMobile ? "column" : "row"}
          gap={isMobile ? 1 : 0}
          alignItems={"end"}>
          <Box width={isMobile ? "100%" : "47%"}>
            <Typography mb={1}>Tên đăng nhập</Typography>
            <Field
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              fullWidth
              placeholder='Example123'
            />
          </Box>
          <Box width={isMobile ? "100%" : "47%"}>
            <Typography mb={1}>Chức năng</Typography>
            <Select
              multiple
              fullWidth
              value={selectedFunctions}
              onChange={handleChange}
              renderValue={(selected: any) =>
                selected
                  .map(
                    (code) =>
                      functions.find((item) => item.code === code)?.name || code
                  )
                  .join(", ")
              }
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
              {functions.map((item) => {
                return <MenuItem value={item.code}>{item.name}</MenuItem>;
              })}
            </Select>
          </Box>
          {/* <Box width={isMobile?"100%": "47%"}>
            <Typography mb={1}>Phân quyền cho dự án</Typography>
            <Select
              fullWidth
              defaultValue={"admin"}
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
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='editor'>Editor</MenuItem>
            </Select>
          </Box> */}
        </Box>
        <Box mt={3} textAlign={"center"}>
          <Button
            onClick={() => onConfirm({ selectedFunctions, userName })}
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
