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
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import StepComponent from "../../components/StepComponent";

const modelOptions = ["ChatGPT", "Qwen", "DeepSeek"];
const styleOptions = ["Tải xuống dạng CSV", "Tải xuống dạng TXT"];
const dynamicSteps = [
  { label: "Ý tưởng", status: "completed" },
  { label: "Tạo kịch bản", status: "active" },
  { label: "Tạo ảnh", status: "pending" },
  { label: "Tạo Video", status: "pending" },
  { label: "Voice", status: "pending" },
];
const ScriptView = ({ script, setLoading, id }) => {
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
      <PromptEditorUI id={id} script={script} setLoading={setLoading} />
    </Box>
  );
};

export default ScriptView;

import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ResponsiveBox from "../../components/ResponsiveBox";
import { useNavigate } from "react-router-dom";
import { createProject, updateProject } from "../../service/project";
import { toast } from "react-toastify";

const PromptEditorUI = ({ script, setLoading, id }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [initialScenes, setInitialScenes] = useState([]);

  // Tạo bản copy để chỉnh sửa
  const [scenes, setScenes] = useState(script?.script?.scenes || []);
  const [editingField, setEditingField] = useState({}); // ví dụ: { 0: { field: 'description' } }
  useEffect(() => {
    if (script) {
      const scenesData = script?.script?.scenes || [];
      setScenes(scenesData);
      setInitialScenes(JSON.parse(JSON.stringify(scenesData))); // Deep clone
    }
  }, [script]);
  const handleEdit = (index, field) => {
    setEditingField({ index, field });
  };

  const handleChange = (index, field, value) => {
    const updatedScenes = [...scenes];
    updatedScenes[index][field] = value;
    setScenes(updatedScenes);
  };
  const normalizeScenes = (scenes) =>
    scenes.map((scene) => ({
      ...scene,
      description: scene.description?.trim(),
      narrator: scene.narrator?.trim(),
    }));

  const isEqualScenes = (a, b) =>
    JSON.stringify(normalizeScenes(a)) === JSON.stringify(normalizeScenes(b));
  const isEditing = (index, field) =>
    editingField.index === index && editingField.field === field;

  const handleCreate = async () => {
    const hasChanged = !isEqualScenes(scenes, initialScenes);
    console.log("Người dùng đã chỉnh sửa?", hasChanged);
    if (hasChanged) {
      setLoading(true);
      try {
        let result = await updateProject(id, {
          script: script.script,
        });

        if (result && result.name) {
          localStorage.setItem("gen_script", JSON.stringify(result));
          setTimeout(() => {
            navigate(`/create-image?id=${id}`);
          }, 500);
        } else {
          toast.warning(result.detail);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    } else {
      navigate(`/create-image?id=${id}`);
    }
  };

  return (
    <Box
      px={isMobile ? 1.5 : 0}
      py={isMobile ? 2 : 4}
      bgcolor='#0D0C2B'
      color='#fff'>
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

          {/* Description */}
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
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              variant='outlined'
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid",
                  borderColor: "#414188",
                },
                opacity: !isEditing(index, "description") ? 0.7 : 1,
              }}
              InputProps={{
                readOnly: !isEditing(index, "description"),
                style: {
                  backgroundColor: "#1A1836",
                  color: "#fff",
                  borderRadius: 10,
                },
              }}
            />
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
              onClick={() => handleEdit(index, "description")}>
              <EditIcon fontSize='small' />
            </IconButton>
          </Box>

          {/* Narrator */}
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
              value={scene.narrator}
              onChange={(e) => handleChange(index, "narrator", e.target.value)}
              variant='outlined'
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid",
                  borderColor: "#414188",
                },
                opacity: !isEditing(index, "narrator") ? 0.7 : 1,
              }}
              InputProps={{
                readOnly: !isEditing(index, "narrator"),
                style: {
                  backgroundColor: "#1A1836",
                  color: "#fff",
                  borderRadius: 10,
                },
              }}
            />
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
              onClick={() => handleEdit(index, "narrator")}>
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
          onClick={handleCreate}
          sx={{
            background: "#6E00FF",
            textTransform: "none",
            borderRadius: 1,
            width: isMobile ? "100%" : "48%",
            fontWeight: 600,
            "&:hover": {
              background: "#5900cc",
            },
            height: 50,
            fontSize: isMobile ? "15px" : "18px",
            display: isMobile ? "none" : "block",
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
            width: isMobile ? "100%" : "48%",
            height: isMobile ? 40 : 50, // 👈 Chiều cao mong muốn
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
        <Button
          variant='contained'
          onClick={handleCreate}
          sx={{
            background: "#6E00FF",
            textTransform: "none",
            borderRadius: 1,
            width: isMobile ? "100%" : "48%",
            fontWeight: 600,
            "&:hover": {
              background: "#5900cc",
            },
            height: isMobile ? 40 : 50,
            fontSize: isMobile ? "15px" : "18px",
            display: isMobile ? "block" : "none",
          }}>
          Xác nhận tạo kịch bản
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          mt: isMobile ? 2 : 4,
          justifyContent: "center",
        }}>
        <Button
          variant='contained'
          sx={{
            background: "rgba(89, 50, 234, 0.3)",
            textTransform: "none",
            borderRadius: 1,
            width: isMobile ? "100%" : "48%",
            fontWeight: 600,
            border: "2px dashed rgba(89, 50, 234, 1)",
            "&:hover": {
              background: "#5900cc",
            },
            height: isMobile ? 40 : 50,
            fontSize: isMobile ? "15px" : "18px",
          }}>
          Tạo lại kịch bản khác
        </Button>
      </Box>
    </Box>
  );
};
