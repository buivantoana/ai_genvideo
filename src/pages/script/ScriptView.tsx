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
  Switch
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import StepComponent from "../../components/StepComponent";

const modelOptions = ["ChatGPT", "Qwen", "DeepSeek"];
const styleOptions = ["Thuyết minh", "Có hội thoại"];

const ScriptView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      className="hidden-add-voice"
      sx={{
        bgcolor: "#0D0C2B",
        p: isMobile ? 4 : 6,
        
        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        overflowY: "scroll",
        height: "100vh"
      }}
    >
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
            gap: 2
          }}
        >
          <Box
            sx={{
              bgcolor: "#2A274B",
              px: 2,
              py: 1.5,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
              minWidth: 150,
            }}
          >
            <Box
              sx={{ width: 18, height: 18, bgcolor: "#fff", borderRadius: 0.5 }}
            />
            <Typography sx={{ fontSize: 13, color: "#fff", fontWeight: "600" }}>Tạo video img - img</Typography>
          </Box>

          <Box
            sx={{

              px: 2,
              py: 1.5,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
              minWidth: 150,
            }}
          >
            <Box
              sx={{ width: 18, height: 18, bgcolor: "#fff", borderRadius: 0.5 }}
            />
            <Typography sx={{ fontSize: 13, color: "#fff", fontWeight: "600" }}>Tạo video img - video</Typography>
          </Box>

          <Box
            sx={{

              px: 2,
              py: 1.5,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: "center",
              minWidth: 150,
            }}
          >
            <Box
              sx={{ width: 18, height: 18, bgcolor: "#fff", borderRadius: 0.5 }}
            />
            <Typography sx={{ fontSize: 13, color: "#fff", fontWeight: "600" }}>Kiểu 04</Typography>
          </Box>
        </Box>
      </Box>
      <PromptEditorUI/>
    </Box>
  );
};

export default ScriptView;


import {
  IconButton,
 
} from "@mui/material";
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
    <Box px={isMobile ? 2 : 6} py={4} bgcolor="#0D0C2B" color="#fff">
      <FormControl
        variant="outlined"
        sx={{ width: isMobile ? "100%" : 200, mb: 4 }}
        size="small"
      >
        <Select
          defaultValue="ChatGPT"
          IconComponent={ArrowDropDownIcon}
          sx={{
            background: "#2A274B",
            color: "#fff",
            borderRadius: 2,
            ".MuiSelect-icon": { color: "#fff" },
          }}
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
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#4B3A79",
                  },
                },
              },
            },
          }}
        >
          {['ChatGPT', 'Qwen', 'DeepSeek'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {scenes.map((scene, index) => (
        <Box
          key={index}
          mb={4}
          p={3}
          borderRadius={2}
          bgcolor="#1A1833"
        >
          <Typography fontWeight="bold" mb={1.5}>
            Phần cảnh {index + 1}
          </Typography>
          <Typography fontSize={14} color="#A3A4B5" mb={1}>
            Mô tả cảnh
          </Typography>
          <Box position="relative">
            <TextField
              multiline
              fullWidth
              minRows={2}
              maxRows={5}
              value={scene.description}
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: "#2A274B",
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
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography fontSize={14} color="#A3A4B5" mt={2} mb={1}>
            Lời thoại/narration:
          </Typography>
          <Box position="relative">
            <TextField
              multiline
              fullWidth
              minRows={2}
              maxRows={4}
              value={scene.narration}
              variant="outlined"
              InputProps={{
                style: {
                  backgroundColor: "#2A274B",
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
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}

      <Typography fontSize={13} mt={2} color="#A3A4B5">
        🎵 Gợi ý nhạc Background: Piano nhẹ nhàng: “River Flows in You”
      </Typography>

      <Box
        mt={4}
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        alignItems={isMobile ? "stretch" : "center"}
        gap={2}
      >
        <Button
          fullWidth={isMobile}
          variant="contained"
          sx={{
            background: "#6E00FF",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 4,
            py: 1.5,
            ":hover": {
              background: "#9D00FF",
            },
          }}
        >
          Xác nhận tạo kịch bản
        </Button>

        <FormControl size="small">
          <Select
            defaultValue="Tải xuống dạng CSV"
            IconComponent={ArrowDropDownIcon}
            sx={{
              background: "#2A274B",
              color: "#fff",
              borderRadius: 2,
              ".MuiSelect-icon": { color: "#fff" },
              px: 2,
              py: 1.5,
              minWidth: 200,
            }}
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
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#4B3A79",
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="Tải xuống dạng CSV">Tải xuống dạng CSV</MenuItem>
            <MenuItem value="Tải xuống dạng TXT">Tải xuống dạng TXT</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};



