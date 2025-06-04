import React, { useEffect, useState } from "react";
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
import ResponsiveBox from "../../components/ResponsiveBox";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { genScript, updateProject } from "../../service/project";
import { useLocation } from "react-router-dom";
const modelOptions = [
  { value: "ChatGPT", key: "openai" },
  { value: "Qwen", key: "qwen" },
  { value: "DeepSeek", key: "deepseekr1" },
];
const styleOptions = [
  { value: "Thuyết minh", key: "explanation" },
  { value: "Tường thuật", key: "narration" },
];

const dynamicSteps = [
  { label: "Ý tưởng", status: "active" },
  { label: "Tạo kịch bản", status: "pending" },
  { label: "Tạo ảnh", status: "pending" },
  { label: "Tạo Video", status: "pending" },
  { label: "Voice", status: "pending" },
];
const IdeaView = ({ setLoading }: any) => {
  const [genPromptAi, setGenPromptAi] = useState(false);
  const [model, setModel] = useState("openai");
  const [projectName, setProjectName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [sceneCount, setSceneCount] = useState("");
  const [style, setStyle] = useState("narration");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const id = query.get("id");
  useEffect(() => {
    if (id) {
      let data_update: any = localStorage.getItem("update_project");
      if (data_update) {
        data_update = JSON.parse(data_update);
        setModel(data_update.llm_model);
        setProjectName(data_update.name);
        setStyle(data_update.style_type);
        setPrompt(data_update.prompt);
        setSceneCount(data_update.scene_count);
      }
    }
  }, [id]);
  const navigate = useNavigate();

  const handleCreate = async () => {
    // Trim giá trị để tránh chuỗi rỗng có khoảng trắng
    const values = {
      model,
      projectName: projectName.trim(),
      prompt: prompt.trim(),
      sceneCount: sceneCount,
      style: style,
    };

    // Validate required
    if (!values.projectName) {
      toast.warning("Vui lòng nhập tên dự án");
      return;
    }

    if (!values.prompt) {
      toast.warning("Vui lòng nhập nội dung/prompt");
      return;
    }

    if (!values.sceneCount || isNaN(Number(values.sceneCount))) {
      toast.warning("Vui lòng nhập số phân cảnh hợp lệ");
      return;
    }

    if (values.prompt.length > 4000) {
      toast.warning("Nội dung/prompt vượt quá 4000 ký tự");
      return;
    }
    setLoading(true);
    try {
      let result = null;
      if (id) {
        result = await updateProject(id, {
          name: projectName.trim(),
          video_type: "video2video",
          llm_model: model,
          prompt: prompt.trim(),
          style_type: style,
          scene_count: sceneCount,
        });
      } else {
        result = await genScript({
          name: projectName.trim(),
          video_type: "video2video",
          llm_model: model,
          prompt: prompt.trim(),
          style_type: style,
          scene_count: sceneCount.trim(),
        });
      }

      if (result && result.name) {
        toast.success(result.message);
        if (id) {
          navigate("/");
        }else{
          localStorage.setItem("gen_script",JSON.stringify(result));
          setTimeout(()=>{
            navigate("/script");
          },500)
        }
      } else {
        toast.warning(result.detail);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
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
      }}>
      <StepComponent steps={dynamicSteps} />
      <ResponsiveBox />
      <Typography color='#FDB52A' fontSize={{ xs: ".8rem", md: "1rem" }}>
        Lưu ý rằng AI phân biệt giữa chữ hoa và chữ thường ( yêu cầu nhập đúng
        chính tả ) <br />
        Ví dụ: nhập 'ai' thì sẽ đọc là 'ai' nhưng nếu nhập 'AI' thì sẽ đọc là
        'ây ai'
      </Typography>
      <Typography
        variant='h4'
        sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}
        fontWeight={"600"}>
        Chọn mô hình tạo Prompt
      </Typography>
      {/* Model Dropdown */}
      <FormControl
        variant='outlined'
        sx={{ width: isMobile ? "50%" : 200 }}
        size='small'>
        <Select
          defaultValue='ChatGPT'
          value={model}
          onChange={(e) => setModel(e.target.value)}
          sx={{
            background: "transparent",
            color: "#fff",
            borderRadius: 2,
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
          {modelOptions.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography
        variant='h6'
        sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}
        fontWeight={"600"}>
        {genPromptAi ? "Nhập link video cần lấy nội dung" : "Tên dự án"}
      </Typography>
      {/* Project Name */}
      {genPromptAi ? (
        <Box display={"flex"} gap={1}>
          <TextField
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            fullWidth
            placeholder='Nhập tên dự án'
            variant='outlined'
            size='small'
            sx={{
              backgroundColor: "#1A1836",
              borderRadius: 2,
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                height: isMobile ? "40px" : "50px", // 👈 Đặt ở đây mới ăn
                alignItems: "center", // Canh giữa input text
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "#414188",
              },
            }}
          />
          <Button
            variant='contained'
            sx={{
              background: "#6E00FF",
              textTransform: "none",
              borderRadius: 1,

              fontWeight: 600,
              "&:hover": {
                background: "#5900cc",
              },
              height: isMobile ? "40px" : "50px",
              fontSize: isMobile ? "11px" : "18px",
              width: isMobile ? "50%" : "40%",
            }}>
            Lấy nội dung video
          </Button>
        </Box>
      ) : (
        <TextField
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          fullWidth
          placeholder='Nhập tên dự án'
          variant='outlined'
          size='small'
          sx={{
            backgroundColor: "#1A1836",
            borderRadius: 2,
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              height: isMobile ? "40px" : "50px", // 👈 Đặt ở đây mới ăn
              alignItems: "center", // Canh giữa input text
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "2px solid",
              borderColor: "#414188",
            },
          }}
        />
      )}
      <Typography
        variant='h6'
        sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}
        fontWeight={"600"}>
        {genPromptAi
          ? "Nội dung video"
          : "Nhập nội dung mong muốn -Tối đa 4000 ký tự"}
      </Typography>
      {/* Prompt Text Area */}
      <Box sx={{ position: "relative", width: "100%" }}>
        <TextField
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          fullWidth
          multiline
          minRows={5}
          placeholder={
            genPromptAi
              ? "Mô tả chi tiết nội dung video"
              : "Mô tả chi tiết nội dung bạn muốn tạo. Sau đó AI sẽ biên kịch lại nội dung"
          }
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
          <Typography
            variant='h6'
            sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}
            mb={1}
            fontWeight={"600"}>
            Nhập số phân cảnh cần biên kịch
          </Typography>
          <TextField
            type='number'
            value={sceneCount}
            onChange={(e) => setSceneCount(e.target.value)}
            placeholder='Nhập số cảnh'
            variant='outlined'
            size='small'
            sx={{
              backgroundColor: "#1A1836",
              borderRadius: 2,
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                height: isMobile ? "40px" : "50px", // 👈 Đặt ở đây mới ăn
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

        {!genPromptAi && (
          <FormControl
            variant='outlined'
            size='small'
            sx={{ flex: 1, borderRadius: 2 }}>
            <Typography
              variant='h6'
              sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}
              mb={1}
              fontWeight={"600"}>
              Chọn kiểu
            </Typography>
            <Select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
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
                height: isMobile ? "40px" : "50px", // 👈 Chiều cao mong muốn
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
                  padding: isMobile ? "0 8px" : "0 14px",
                },
                ".MuiSelect-icon": { color: "#fff" },
              }}>
              {styleOptions.map((style) => (
                <MenuItem key={style.key} value={style.key}>
                  {style.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
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
          onClick={handleCreate}
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
            fontSize: isMobile ? "15px" : "18px",
          }}>
          Xác nhận tạo kịch bản từ Prompt
        </Button>

        <Button
          variant='contained'
          onClick={() => setGenPromptAi(!genPromptAi)}
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
            fontSize: isMobile ? "15px" : "18px",
          }}>
          Tự động tạo toàn bộ
        </Button>
      </Box>
    </Box>
  );
};

export default IdeaView;
