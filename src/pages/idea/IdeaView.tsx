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

const IdeaView = () => {
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
      <Typography color="#FDB52A">
        Lưu ý rằng AI phân biệt giữa chữ hoa và chữ thường ( yêu cầu nhập đúng chính tả ) <br />
        Ví dụ: nhập 'ai' thì sẽ đọc là 'ai' nhưng nếu nhập 'AI' thì sẽ đọc là 'ây ai'
      </Typography>
      <Typography variant="h4" fontWeight={"600"}>
        Chọn mô hình tạo Prompt
      </Typography>
      {/* Model Dropdown */}
      <FormControl
        variant="outlined"
        sx={{ width: isMobile ? "100%" : 200 }}
        size="small"
      >
        <Select
          defaultValue="ChatGPT"
          sx={{
            background: "#2A274B",
            color: "#fff",
            borderRadius: 2,
            ".MuiSelect-icon": { color: "#fff" },
          }}
          IconComponent={ArrowDropDownIcon}
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
                    borderRadius:1
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#4B3A79", 
                    borderRadius:1
                  },
                },
              },
            },
          }}
        >
          {modelOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h6" fontWeight={"600"}>
        Tên dự án
      </Typography>
      {/* Project Name */}
      <TextField
        fullWidth
        placeholder="Nhập tên dự án"
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: "#1A1836",
          borderRadius: 2,
          input: { color: "white" },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3A375F"
          }
        }}
      />
      <Typography variant="h6" fontWeight={"600"}>
        Nhập nội dung mong muốn -Tối đa 4000 ký tự
      </Typography>
      {/* Prompt Text Area */}
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Mô tả chi tiết nội dung bạn muốn tạo..."
        variant="outlined"
        sx={{
          backgroundColor: "#1A1836",
          borderRadius: 2,
          textarea: { color: "white" },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3A375F"
          }
        }}
      />

      {/* Scene Count + Style Selection */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1,}}>
          <Typography variant="h6" mb={1} fontWeight={"600"}>
            Nhập số phân cảnh cần biên kịch
          </Typography>
          <TextField
            type="number"
            placeholder="Nhập số cảnh"
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: "#1A1836",
              borderRadius: 2,
              input: { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3A375F"
              },
              width:"90%"
            }}
          />
        </Box>

        <FormControl
          variant="outlined"
          size="small"
          sx={{ flex: 1, borderRadius: 2 }}
        >
          <Typography variant="h6" mb={1} fontWeight={"600"}>
            Chọn kiểu
          </Typography>
          <Select
            defaultValue="Thuyết minh"
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
                      borderRadius:1
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#4B3A79", // màu selected
                      borderRadius:1
                    },
                  },
                },
              },
            }}
            sx={{ background: "#2A274B",
            color: "#fff",
            borderRadius: 2,
            ".MuiSelect-icon": { color: "#fff" },}}
          >
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
        }}
      >
        <Button
          variant="contained"
          sx={{
            background: "#6E00FF",
            textTransform: "none",
            borderRadius: 1,
            flex: 1,
            fontWeight: 600,
            "&:hover": {
              background: "#5900cc",
            },
            height:50
          }}
        >
          Xác nhận tạo kịch bản từ Prompt
        </Button>

        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #FF7A00 0%, #FF3D00 100%)",
            textTransform: "none",
            borderRadius: 1,
            flex: 1,
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(90deg, #e86e00 0%, #e13400 100%)",
            },
            height:50
          }}
        >
          Tự động tạo toàn bộ
        </Button>
      </Box>
    </Box>
  );
};

export default IdeaView;
