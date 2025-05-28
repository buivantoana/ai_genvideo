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

const IdeaView = () => {
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
      <Typography color='#FDB52A'>
        Lưu ý rằng AI phân biệt giữa chữ hoa và chữ thường ( yêu cầu nhập đúng
        chính tả ) <br />
        Ví dụ: nhập 'ai' thì sẽ đọc là 'ai' nhưng nếu nhập 'AI' thì sẽ đọc là
        'ây ai'
      </Typography>
      <Typography variant='h4' fontWeight={"600"}>
        Chọn mô hình tạo Prompt
      </Typography>
      {/* Model Dropdown */}
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
      <Typography variant='h6' fontWeight={"600"}>
        Tên dự án
      </Typography>
      {/* Project Name */}
      <TextField
        fullWidth
        placeholder='Nhập tên dự án'
        variant='outlined'
        size='small'
        sx={{
          backgroundColor: "#1A1836",
          borderRadius: 2,
          input: { color: "white" },
          "& .MuiOutlinedInput-root": {
            height: "72px", // 👈 Đặt ở đây mới ăn
            alignItems: "center", // Canh giữa input text
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid",
            borderColor: "#414188",
          },
        }}
      />
      <Typography variant='h6' fontWeight={"600"}>
        Nhập nội dung mong muốn -Tối đa 4000 ký tự
      </Typography>
      {/* Prompt Text Area */}
      <Box sx={{ position: "relative", width: "100%" }}>
        <TextField
          fullWidth
          multiline
          minRows={5}
          placeholder='Mô tả chi tiết nội dung bạn muốn tạo. Sau đó AI sẽ biên kịch lại nội dung'
          variant='outlined'
          sx={{
            bgcolor: "#1b1c34", // nền tối
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              color: "#fff",
            },
            "& .MuiInputBase-input": {
              color: "#fff",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "2px solid",
              borderColor: "#414188",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#414188",
            },
          }}
        />
        <Tooltip title='Copy'>
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#aaa",
            }}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Scene Count + Style Selection */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
        }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant='h6' mb={1} fontWeight={"600"}>
            Nhập số phân cảnh cần biên kịch
          </Typography>
          <TextField
            type='number'
            placeholder='Nhập số cảnh'
            variant='outlined'
            size='small'
            sx={{
              backgroundColor: "#1A1836",
              borderRadius: 2,
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                height: "72px", // 👈 Đặt ở đây mới ăn
                alignItems: "center", // Canh giữa input text
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "#414188",
              },
              width: "100%",
            }}
          />
        </Box>

        <FormControl
          variant='outlined'
          size='small'
          sx={{ flex: 1, borderRadius: 2 }}>
          <Typography variant='h6' mb={1} fontWeight={"600"}>
            Chọn kiểu
          </Typography>
          <Select
            defaultValue='Thuyết minh'
            IconComponent={ArrowDropDownIcon}
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
              background: "transparent",
              color: "#fff",
              borderRadius: 2,
              height: "72px", // 👈 Chiều cao mong muốn
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
        </FormControl>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          mt: 2,
        }}>
        <Button
          variant='contained'
          sx={{
            background: "#6E00FF",
            textTransform: "none",
            borderRadius: 1,
            flex: 1,
            fontWeight: 600,
            "&:hover": {
              background: "#5900cc",
            },
            height: 50,
            fontSize: "18px",
          }}>
          Xác nhận tạo kịch bản từ Prompt
        </Button>

        <Button
          variant='contained'
          sx={{
            background: "linear-gradient(90deg, #FF7A00 0%, #FF3D00 100%)",
            textTransform: "none",
            borderRadius: 1,
            flex: 1,
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(90deg, #e86e00 0%, #e13400 100%)",
            },
            height: 50,
            fontSize: "18px",
          }}>
          Tự động tạo toàn bộ
        </Button>
      </Box>
    </Box>
  );
};

export default IdeaView;
