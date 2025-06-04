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
import download from "../../images/maximize-3.png";

import image from "../../images/adbe6e126ef5ad889784e0f288edfd8329fed5c7.png";
import image1 from "../../images/bf053d80d9782e45442f9fd54f729b5a17616751.png";
const dynamicSteps = [
  { label: "Ý tưởng", status: "completed" },
  { label: "Tạo kịch bản", status: "completed" },
  { label: "Tạo ảnh", status: "completed" },
  { label: "Tạo Video", status: "active" },
  { label: "Voice", status: "pending" },
];
const modelOptions1 = ["Klling", "FramePack", "Wan"];
const modelOptions2 = ["1080p", "720p", "480p"];

const CreateVideoView = () => {
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
        gap: isMobile ? 2 : 4,
      }}>
      <StepComponent steps={dynamicSteps} />
      {/* Toggle Tabs */}
      <ResponsiveBox />
      <Box display={"flex"} gap={3}>
        <FormControl variant='outlined' size='small'>
          <Select
            defaultValue='Klling'
            sx={{
              background: "transparent",
              color: "#fff",
              borderRadius: 2,
              height: "48px",
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
            defaultValue='1080p'
            sx={{
              background: "transparent",
              color: "#fff",
              borderRadius: 2,
              height: "48px",
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
      </Box>

      {/* <Box display={"flex"} alignItems={"center"} gap={"20px"}>
        <Typography variant='h5' fontWeight={"bold"}>
          Tạo phân cảnh
        </Typography>
        <Button
          variant='contained'
          sx={{
            background: " linear-gradient(135deg, #FDD819 0%, #E80505 100%)",
            borderRadius: 1,
          }}>
          Tạo toàn bộ ảnh từ phân cảnh
        </Button>
      </Box> */}
      <SceneEditor />
    </Box>
  );
};

export default CreateVideoView;

import { IconButton, Card, CardMedia, Grid, Stack } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { RiPlayFill, RiRefreshLine } from "react-icons/ri";
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
          <Typography variant='h6' color='white'>
            Video phân cảnh {sceneNumber}:
          </Typography>
          <Button
            startIcon={<RiRefreshLine />}
            size='small'
            sx={{ borderRadius: 1, background: "rgba(89, 50, 234, 1)" }}
            variant='contained'>
            Tạo lại video
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

        <Box
          sx={{
            margin: "30px 0 !important",
            position: "relative",
            width: "50%",
            borderRadius: 1,
            overflow: "hidden",
          }}>
          <Box
            sx={{
              position: "absolute",
              bottom: 15,
              right: 15,
              width: isMobile ? "25px" : "unset",
            }}>
            <img src={download} width={isMobile ? "100%" : "unset"} alt='' />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"50px"}
              height={"50px"}
              sx={{
                borderRadius: "50%",
                border: "1px solid white",
                background: "rgba(0,0,0,.5)",
              }}>
              <RiPlayFill size={40} />
            </Box>
          </Box>
          <img
            src={imageUrl}
            width={"100%"}
            style={{ borderRadius: "8px" }}
            height={"100%"}
            alt=''
          />
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
        imageUrl={image}
        narrationText='Hai cậu bé học sinh Nam, Giang, mặc đồng phục...'
        dialogText='Từ bé, tụi mình đã bên nhau...'
      />
      <SceneCard
        sceneNumber={2}
        imageUrl={image1}
        narrationText='Cảnh Nam buồn bã nhìn bài kiểm tra điểm kém...'
        dialogText='Nam: tôi chào bạn nhé'
      />

      <Box textAlign='center'>
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
            onClick={() => navigate("/narrator")}
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
            Xác nhận tạo xong
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
