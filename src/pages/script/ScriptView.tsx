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

const modelOptions = ["ChatGPT", "Qwen", "DeepSeek"];
const styleOptions = ["Tải xuống dạng CSV", "Tải xuống dạng TXT"];

const ScriptView = () => {
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
      <StepComponent />
      {/* Toggle Tabs */}
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            bgcolor: "#1A1836",
            width: "max-content",
            p: 1.5,
            borderRadius: 2,
            gap: 2,
          }}>
          <Box
            sx={{
              bgcolor: "#2A274B",
              px: 4,
              py: 2,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
              minWidth: 150,
            }}>
            <Box
              sx={{ width: 22, height: 22, bgcolor: "#fff", borderRadius: 0.5 }}
            />
            <Typography sx={{ fontSize: 16, color: "#fff", fontWeight: "600" }}>
              Tạo video img - img
            </Typography>
          </Box>

          <Box
            sx={{
              px: 4,
              py: 2,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
              minWidth: 150,
            }}>
            <Box
              sx={{
                width: 22,
                height: 22,
                bgcolor: "#A6A6C2",
                borderRadius: 0.5,
              }}
            />
            <Typography
              sx={{ fontSize: 16, color: "#A6A6C2", fontWeight: "600" }}>
              Tạo video img - video
            </Typography>
          </Box>

          <Box
            sx={{
              px: 4,
              py: 2,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
              minWidth: 150,
            }}>
            <Box
              sx={{
                width: 22,
                height: 22,
                bgcolor: "#A6A6C2",
                borderRadius: 0.5,
              }}
            />
            <Typography
              sx={{ fontSize: 16, color: "#A6A6C2", fontWeight: "600" }}>
              Kiểu 04
            </Typography>
          </Box>
        </Box>
      </Box>
      <PromptEditorUI />
    </Box>
  );
};

export default ScriptView;

import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const scenes = [
  {
    description:
      "Hai cậu bé học sinh mặc đồng phục, chạy trong công viên, người lớn chửi ghế đá, cửa hàng và cảnh vật mùa hè.",
    narration:
      "Từ bé, tui nhìn đã bần nheo. Một chiếc ghế đã cũ, hai thằng nhóc và cả một tuổi thơ trọn vẹn.",
  },
  {
    description:
      "Cảnh Nam buồn bã nhìn bài kiểm tra điểm kém. Sau đó là cảnh Giang đứng trước mặt Nam, nhận lỗi thay bạn.",
    narration: "Nam: tới chào bạn nè",
  },
  {
    description:
      "Nam xách vali ra bến xe. Giang đứng vẫy tay chào, cố giấu vẻ buồn. Cảnh chuyển nhanh qua các đoạn từ nhân dân tệ.",
    narration:
      "Tớ đã đi thật xa... nhưng trái tim vẫn quay lại nơi từng thuộc về.",
  },
];

const PromptEditorUI = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box px={isMobile ? 2 : 6} py={4} bgcolor='#0D0C2B' color='#fff'>
      <FormControl
        variant='outlined'
        sx={{ width: isMobile ? "100%" : 200 }}
        size='small'>
        <Select
          defaultValue='ChatGPT'
          sx={{
            background: "transparent",
            color: "#fff",
            borderRadius: 2,
            height: "48px", // 👈 Chiều cao mong muốn
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
          {modelOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant='h6' fontWeight={"bold"} my={3}>
        Soạn kịch bản
      </Typography>
      {scenes.map((scene, index) => (
        <Box key={index} mb={4} borderRadius={2}>
          <Typography fontWeight='bold' mb={1.5}>
            Phần cảnh {index + 1}
          </Typography>
          <Typography
            fontSize={14}
            sx={{ fontStyle: "italic" }}
            color='#A3A4B5'
            mb={1}>
            Mô tả cảnh
          </Typography>
          <Box position='relative'>
            <TextField
              multiline
              fullWidth
              minRows={2}
              maxRows={5}
              value={scene.description}
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

          <Typography
            fontSize={14}
            sx={{ fontStyle: "italic" }}
            color='#A3A4B5'
            mt={2}
            mb={1}>
            Lời thoại/narration:
          </Typography>
          <Box position='relative'>
            <TextField
              multiline
              fullWidth
              minRows={2}
              maxRows={4}
              value={scene.narration}
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
        </Box>
      ))}

      <Typography fontSize={13} mt={2} color='#A3A4B5'>
        🎵 Gợi ý nhạc Background: Piano nhẹ nhàng: “River Flows in You”
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          mt: 4,
          justifyContent: "space-between",
        }}>
        <Button
          variant='contained'
          sx={{
            background: "#6E00FF",
            textTransform: "none",
            borderRadius: 1,
            width: "48%",
            fontWeight: 600,
            "&:hover": {
              background: "#5900cc",
            },
            height: 50,
            fontSize: "18px",
          }}>
          Xác nhận tạo kịch bản
        </Button>

        <Select
          defaultValue='Tải xuống dạng CSV'
          IconComponent={ArrowDropDownIcon}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "#2A274B", // nền của dropdown list
                color: "#fff",
                borderRadius: 2,
                mt: 1,
                textAlign: "center",
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
            background: "transparent",
            color: "#fff",
            borderRadius: 2,
            width: "48%",
            height: "50px", // 👈 Chiều cao mong muốn
            "& .MuiOutlinedInput-notchedOutline": {
              border: "2px solid",
              borderColor: "#414188", // 👈 Viền mặc định
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "2px solid",
              borderColor: "#414188", // 👈 Viền khi focus
            },
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              height: "100%", // Chiếm hết chiều cao wrapper
              padding: "0 14px",
            },
            ".MuiSelect-icon": { color: "#fff" },
          }}>
          {styleOptions.map((style) => (
            <MenuItem key={style} value={style}>
              {style}
            </MenuItem>
          ))}
        </Select>
      </Box>
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
            width: "48%",
            fontWeight: 600,
            border: "2px dashed rgba(89, 50, 234, 1)",
            "&:hover": {
              background: "#5900cc",
            },
            height: 50,
            fontSize: "18px",
          }}>
          Tạo lại kịch bản khác
        </Button>
      </Box>
    </Box>
  );
};
