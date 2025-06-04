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
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import StepComponent from "../../components/StepComponent";
import EditIcon from "@mui/icons-material/Edit";
import group from "../../images/Group 13.png";
const modelOptions1 = ["Stabledifution", "Flux"];
const modelOptions2 = ["ChatGPT", "Runpod"];
const modelOptions4 = ["Local"];
const modelOptions3 = [
  "1920x1080 (16:9)",
  "1280x720 (16:9)",
  "1024x1024 (1:1)",
];
const dynamicSteps = [
  { label: "Ý tưởng", status: "completed" },
  { label: "Tạo kịch bản", status: "completed" },
  { label: "Tạo ảnh", status: "active" },
  { label: "Tạo Video", status: "pending" },
  { label: "Voice", status: "pending" },
];
const CreateImageView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      className='hidden-add-voice'
      sx={{
        bgcolor: "#0D0C2B",
        p: isMobile ? 1.5 : 6,
        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 4 },
      }}>
      <StepComponent steps={dynamicSteps} />
      {/* Toggle Tabs */}
      <ResponsiveBox />
      <Box display={"flex"} flexWrap={"wrap"} gap={isMobile ? 1 : 3}>
        <FormControl variant='outlined' size='small'>
          <Select
            defaultValue='Stabledifution'
            sx={{
              background: "transparent",
              color: "#fff",
              borderRadius: 2,
              height: isMobile ? "38px" : "48px",
              width: "max-content", // 👈 Chiều cao mong muốn
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3A375F", // 👈 Viền mặc định
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#414188", // 👈 Viền khi focus
              },
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                height: "100%", // Chiếm hết chiều cao wrapper
                padding: "0 14px",
              },
              ".MuiSelect-icon": { color: "#fff" },
            }}
            IconComponent={ArrowDropDownIcon}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#2A274B",
                  color: "#fff",
                  borderRadius: 1,
                  mt: 1,
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      backgroundColor: "#3A375F",
                      borderRadius: 1,
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#4B3A79",
                      borderRadius: 1,
                      border: "2px solid",
                      borderColor: "#414188",
                    },
                  },
                },
              },
            }}>
            {modelOptions1.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='outlined' size='small'>
          <Select
            defaultValue='ChatGPT'
            sx={{
              background: "transparent",
              color: "#fff",
              borderRadius: 2,
              height: isMobile ? "38px" : "48px",
              width: "max-content", // 👈 Chiều cao mong muốn
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3A375F", // 👈 Viền mặc định
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#414188", // 👈 Viền khi focus
              },
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                height: "100%", // Chiếm hết chiều cao wrapper
                padding: "0 14px",
              },
              ".MuiSelect-icon": { color: "#fff" },
            }}
            IconComponent={ArrowDropDownIcon}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#2A274B",
                  color: "#fff",
                  borderRadius: 1,
                  mt: 1,
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      backgroundColor: "#3A375F",
                      borderRadius: 1,
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#4B3A79",
                      borderRadius: 1,
                      border: "2px solid",
                      borderColor: "#414188",
                    },
                  },
                },
              },
            }}>
            {modelOptions2.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='outlined' size='small'>
          <Select
            defaultValue='Local'
            sx={{
              background: "transparent",
              color: "#fff",
              borderRadius: 2,
              height: isMobile ? "38px" : "48px",
              width: "max-content", // 👈 Chiều cao mong muốn
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3A375F", // 👈 Viền mặc định
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#414188", // 👈 Viền khi focus
              },
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                height: "100%", // Chiếm hết chiều cao wrapper
                padding: "0 14px",
              },
              ".MuiSelect-icon": { color: "#fff" },
            }}
            IconComponent={ArrowDropDownIcon}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#2A274B",
                  color: "#fff",
                  borderRadius: 1,
                  mt: 1,
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      backgroundColor: "#3A375F",
                      borderRadius: 1,
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#4B3A79",
                      borderRadius: 1,
                      border: "2px solid",
                      borderColor: "#414188",
                    },
                  },
                },
              },
            }}>
            {modelOptions4.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='outlined' size='small'>
          <Select
            defaultValue='1920x1080 (16:9)'
            sx={{
              background: "transparent",
              color: "#fff",
              borderRadius: 2,
              width: "max-content",
              height: isMobile ? "38px" : "48px", // 👈 Chiều cao mong muốn
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3A375F", // 👈 Viền mặc định
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#414188", // 👈 Viền khi focus
              },
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                height: "100%", // Chiếm hết chiều cao wrapper
                padding: "0 14px",
              },
              ".MuiSelect-icon": { color: "#fff" },
            }}
            IconComponent={ArrowDropDownIcon}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#2A274B",
                  color: "#fff",
                  borderRadius: 1,
                  mt: 1,
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      backgroundColor: "#3A375F",
                      borderRadius: 1,
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#4B3A79",
                      borderRadius: 1,
                      border: "2px solid",
                      borderColor: "#414188",
                    },
                  },
                },
              },
            }}>
            {modelOptions3.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box display={"flex"} alignItems={"center"} gap={"20px"}>
        <Typography
          variant='h5'
          fontSize={isMobile ? "1rem" : "1.5rem"}
          fontWeight={"bold"}>
          Tạo phân cảnh
        </Typography>
        <Button
          variant='contained'
          sx={{
            background: " linear-gradient(135deg, #FDD819 0%, #E80505 100%)",
            borderRadius: 1,
            fontSize: isMobile ? "0.675rem" : "0.875rem",
          }}>
          Tạo toàn bộ ảnh từ phân cảnh
        </Button>
      </Box>
      <SceneEditor />
    </Box>
  );
};

export default CreateImageView;

import { IconButton, Card, CardMedia, Grid, Stack } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { RiRefreshLine } from "react-icons/ri";
import ResponsiveBox from "../../components/ResponsiveBox";
import { useNavigate } from "react-router-dom";

const SceneCard = ({ sceneNumber, imageUrl, narrationText, dialogText }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        borderRadius: 2,
        mb: 4,
      }}>
      <Stack spacing={2}>
        <Stack direction='row' gap={"30px"} alignItems='center'>
          <Typography
            variant='h6'
            fontSize={{ xs: ".9rem", md: "1.25rem" }}
            color='white'>
            Phân cảnh {sceneNumber}:
          </Typography>
          <Button
            startIcon={<RiRefreshLine />}
            size='small'
            sx={{
              borderRadius: 1,
              background: "rgba(89, 50, 234, 1)",
              fontSize: isMobile ? "0.675rem" : "0.875rem",
            }}
            variant='contained'>
            Tạo lại ảnh
          </Button>
        </Stack>

        <Box position='relative'>
          <TextField
            multiline
            fullWidth
            minRows={2}
            maxRows={5}
            value={narrationText}
            variant='outlined'
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "#414188",
              },
              fontSize: "11px",
            }}
            InputProps={{
              style: {
                backgroundColor: "#1A1836",
                color: "#fff",
                borderRadius: 10,
              },
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#A3A4B5",
            }}>
            <EditIcon fontSize='small' />
          </IconButton>
        </Box>

        <Box sx={{ margin: "30px 0 !important" }}>
          <Grid container gap={isMobile ? 2 : 0}>
            <Grid
              item
              xs={5}
              sx={{
                mr: isMobile ? "0px" : "20px",
              }}
              sm={4}
              md={3}>
              {imageUrl ? (
                <CardMedia
                  component='img'
                  height={isMobile ? "150px" : "220px"}
                  sx={{ objectFit: "cover", borderRadius: 1 }}
                  image={imageUrl}
                  alt='uploaded'
                />
              ) : (
                <Card
                  sx={{
                    bgcolor: "#292a45",
                    height: isMobile ? 150 : 220,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}>
                  <Button
                    variant='contained'
                    sx={{
                      background: "rgba(89, 50, 234, 1)",
                      borderRadius: 1,
                      fontSize: isMobile ? "0.675rem" : "0.875rem",
                    }}>
                    Xác nhận tạo ảnh
                  </Button>
                </Card>
              )}
            </Grid>
            <Grid item xs={5} sm={4} md={3}>
              <Card
                sx={{
                  bgcolor: "#292a45",
                  height: isMobile ? 150 : 220,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 0.5,
                  }}>
                  <UploadFileIcon sx={{ color: "white" }} fontSize='large' />

                  <Typography color='white'>Tải ảnh của bạn lên</Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Typography
            variant='subtitle1'
            sx={{ fontStyle: "italic" }}
            color='white'
            gutterBottom>
            Lời thoại/narration:
          </Typography>
          <ul>
            <li style={{ color: "rgba(139, 139, 168, 1)", marginLeft: "50px" }}>
              <Typography> {dialogText}</Typography>
            </li>
          </ul>
        </Box>
      </Stack>
    </Box>
  );
};

function SceneEditor() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: "100vh", pb: 3 }}>
      <SceneCard
        sceneNumber={1}
        narrationText='Hai cậu bé học sinh Nam, Giang, mặc đồng phục...'
        dialogText='Từ bé, tụi mình đã bên nhau...'
      />
      <SceneCard
        sceneNumber={2}
        imageUrl={group}
        narrationText='Cảnh Nam buồn bã nhìn bài kiểm tra điểm kém...'
        dialogText='Nam: tôi chào bạn nhé'
      />

      <Box textAlign='center'>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            mt: 4,
            justifyContent: "center",
          }}>
          <Button
            variant='contained'
            sx={{
              background: "rgba(89, 50, 234, 0.3)",
              textTransform: "none",
              borderRadius: 1,
              width: isMobile ? "100%" : "38%",
              fontWeight: 600,
              border: "2px dashed rgba(89, 50, 234, 1)",
              "&:hover": {
                background: "#5900cc",
              },
              height: isMobile?40 :50,
              fontSize: isMobile ? "15px" : "18px",
            }}>
            + Thêm màn mới
          </Button>
        </Box>

        <Box
          paddingBottom={4}
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            mt: 2,
            justifyContent: "center",
          }}>
          <Button
            variant='contained'
            onClick={() => navigate("/create-video")}
            sx={{
              background: "#6E00FF",
              textTransform: "none",
              borderRadius: 1,
              width: isMobile ? "100%" : "38%",
              fontWeight: 600,
              "&:hover": {
                background: "#5900cc",
              },
               height: isMobile?40 :50,
              fontSize: isMobile ? "15px" : "18px",
            }}>
            Xác nhận ảnh
          </Button>

          <Button
            variant='contained'
            sx={{
              background: "white",
              textTransform: "none",
              borderRadius: 1,
              width: isMobile ? "100%" : "38%",
              fontWeight: 600,
              "&:hover": {
                background: "white",
              },
               height: isMobile?40 :50,
              fontSize: isMobile ? "15px" : "18px",
              color: "black",
            }}>
            Tải hàng loạt (2)
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
