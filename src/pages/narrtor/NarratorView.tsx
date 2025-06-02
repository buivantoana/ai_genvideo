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

const modelOptions1 = ["Klling", "FramePack", "Wan"];
const modelOptions2 = ["1080p", "720p", "480p"];

const NarratorView = () => {
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
      <StepComponent />
      {/* Toggle Tabs */}
      <ResponsiveBox />

      <VideoEditorPage />
    </Box>
  );
};

export default NarratorView;

import { Card, CardMedia, Stack, Slider } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import DownloadIcon from "@mui/icons-material/Download";
import { RiPlayFill } from "react-icons/ri";
import ResponsiveBox from "../../components/ResponsiveBox";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ sceneNumber, imageUrl, narrationText }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant='h5'
        color='white'
        sx={{ fontSize: isMobile ? "1.2rem" : "1.5rem" }}
        fontWeight={"bold"}
        gutterBottom>
        Video phân cảnh {sceneNumber}:
      </Typography>
      <Box
        sx={{
          margin: "30px 0 !important",
          position: "relative",
          width: isMobile ? "100%" : "80%",
          borderRadius: 1,
          overflow: "hidden",
        }}>
        <Box sx={{ position: "absolute", bottom: 15, right: 15 }}>
          <img src={download} alt='' />
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
      {sceneNumber === 1 && (
        <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: "30px" }}>
          <Typography
            variant='h6'
            fontSize={isMobile ? "1.1rem" : "1.25rem"}
            color='white'>
            Hiệu ứng chuyển màn
          </Typography>
          <Button
            size='small'
            sx={{
              borderRadius: 1,
              background: "rgba(89, 50, 234, 1)",
              px: 2.5,
            }}
            variant='contained'>
            Mờ dần
          </Button>
        </Box>
      )}
      <Typography
        variant='subtitle2'
        sx={{ fontStyle: "italic", my: 2 }}
        color='white'
        gutterBottom>
        Lời dẫn
      </Typography>
      <ul>
        <li style={{ color: "rgba(139, 139, 168, 1)", marginLeft: "20px" }}>
          <Typography fontSize={isMobile ? ".8rem" : "1rem"}>
            {" "}
            {narrationText}
          </Typography>
        </li>
      </ul>
    </Box>
  );
};

const SettingsPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        height: "fit-content",
        color: "white",
        px: { xs: 1.5, md: 4 },
      }}>
      <Typography
        variant='h6'
        mb={5}
        color='white'
        fontWeight={"bold"}
        gutterBottom>
        Cài đặt hệ thông số và âm thanh
      </Typography>
      <Stack spacing={6}>
        <FormControl fullWidth>
          <InputLabel sx={{ color: "#aaa" }}>Mô hình</InputLabel>
          <Select
            defaultValue='Dia'
            label='Mô hình'
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
              color: "white",
              ".MuiSelect-icon": { color: "white" },
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              height: isMobile ? "38px" : "unset",
            }}>
            <MenuItem value='Dia'>Dia</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel sx={{ color: "#aaa" }}>Giọng đọc</InputLabel>
          <Select
            defaultValue='MC Tùng Bùi'
            label='Giọng đọc'
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
              color: "white",
              ".MuiSelect-icon": { color: "white" },
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              height: isMobile ? "38px" : "unset",
            }}>
            <MenuItem value='MC Tùng Bùi'>MC Tùng Bùi</MenuItem>
          </Select>
        </FormControl>

        <Box
          sx={{
            bgcolor: "#2c2e4f",
            p: 2,
            borderRadius: 2,
            fontSize: 16,
            color: "rgba(253, 181, 42, 1)",
            lineHeight: "2",
          }}>
          Mô tả giọng đọc: Giọng nói được đặc trưng bởi một giai điệu thân thiện
          và tích cực, phù hợp với nội dung chung tham gia và cộng hưởng với
          khán giả.
        </Box>

        <Box>
          <Typography gutterBottom color='white'>
            Tốc độ đọc
          </Typography>
          <Slider
            defaultValue={1}
            min={0.5}
            max={2}
            step={0.25}
            marks={[
              { value: 0.5, label: "0.5" },
              { value: 1, label: "1.0" },

              { value: 1.5, label: "1.5" },
              { value: 2, label: "2.0" },
            ]}
            valueLabelDisplay='auto'
            sx={{
              color: "#6b5bfc",
              "& .MuiSlider-markLabel": {
                color: "white",
              },
            }}
          />
        </Box>

        <FormControl fullWidth>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            my={1}>
            <Typography variant='h6' sx={{ color: "white", my: 2 }}>
              Số tối đa trên mỗi dòng
            </Typography>
            <Button
              variant='contained'
              sx={{
                border: "1px solid white",
                borderRadius: 1,
                background: "transparent",
              }}>
              Tự động
            </Button>
          </Box>
          <Select
            defaultValue='4 từ'
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
              color: "white",
              ".MuiSelect-icon": { color: "white" },
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              height: isMobile ? "38px" : "unset",
            }}>
            <MenuItem value='4 từ'>4 từ</MenuItem>
            <MenuItem value='5 từ'>5 từ</MenuItem>
          </Select>
          <Typography sx={{ color: "rgba(139, 139, 168, 1)", mt: 1 }}>
            Tùy thuộc vào tỉ lệ khung hình
          </Typography>
        </FormControl>
      </Stack>
    </Box>
  );
};

function VideoEditorPage() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();
  return (
    <Box sx={{ py: { xs: 2, md: 5 }  }}>
      <Stack direction={isMobile ? "column" : "row"} spacing={4}>
        <Box flex={1} px={isMobile?1.5:0}>
          <VideoCard
            sceneNumber={1}
            imageUrl={image}
            narrationText='Từ bé, tụi mình đã bên nhau. Một chiếc ghế đã cũ, hai thằng nhóc và cả một tuổi thơ trọn vẹn.'
          />
          <VideoCard
            sceneNumber={2}
            imageUrl={image1}
            narrationText='Từ bé, tụi mình đã bên nhau. Một chiếc ghế đã cũ, hai thằng nhóc và cả một tuổi thơ trọn vẹn.'
          />
        </Box>

        <Box flex={1}>
          <SettingsPanel />
        </Box>
      </Stack>

      <Box mt={4} textAlign='center'>
        <Button
          variant='contained'
          onClick={() => navigate("/sub")}
          sx={{
            bgcolor: "#6b5bfc",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 2,
            px: 4,
            py: 1.5,
            width: isMobile ? "100%" : "30%",
            height: isMobile?40 :50,
          }}>
          Bước tiếp theo
        </Button>
      </Box>
    </Box>
  );
}
