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

const styleOptions = ["Tải xuống dạng CSV", "Tải xuống dạng TXT"];
const dynamicSteps = [
  { label: "Ý tưởng", status: "completed" },
  { label: "Tạo kịch bản", status: "active" },
  { label: "Tạo ảnh", status: "pending" },
  { label: "Tạo Video", status: "pending" },
  { label: "Tạo Voice", status: "pending" },
  { label: "Nhạc nền và sub", status: "pending" },
  { label: "Hoàn thành ", status: "pending" },
];
const ScriptView = ({
  script,
  setLoading,
  id,
  genScriptFun,
  modelList,
}: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTab, setSelectedTab]: any = useState(
    script && script.video_type == "video2video" ? 1 : 0
  );
  const [role,setRole] = useState([])
  useEffect(()=>{
    let userRaw = localStorage.getItem("user");
    let user = userRaw ? JSON.parse(userRaw) : null;
    let role = script?.members
      .find((item) => item.username == user?.username)
      ?.functions
      if(role && role.length>0){
        setRole(role)
      }
  },[script])
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
      <StepComponent steps={dynamicSteps}  userPermissions={role} />
      {/* Toggle Tabs */}
      {/* <ResponsiveBox
        selectedTab={selectedTab}
        onTabChange={(index) => setSelectedTab(index)}
      /> */}
      <PromptEditorUI
        id={id}
        setSelectedTab={setSelectedTab}
        script={script}
        setLoading={setLoading}
        genScriptFun={genScriptFun}
        modelList={modelList}
      />
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
import { RiRecordCircleFill } from "react-icons/ri";

const PromptEditorUI = ({
  script,
  setLoading,
  id,
  setSelectedTab,
  genScriptFun,
  modelList,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [initialScenes, setInitialScenes] = useState([]);
  const [model, setModel] = useState("openai");
  // Tạo bản copy để chỉnh sửa
  const [scenes, setScenes] = useState(script?.script?.scenes || []);
  const [editingField, setEditingField] = useState({}); // ví dụ: { 0: { field: 'description' } }
  useEffect(() => {
    if (script) {
      const scenesData = script?.script?.scenes || [];
      setScenes(scenesData);
      setSelectedTab(script?.video_type == "video2video" ? 1 : 0);
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
  function removeNullKeys(data) {
    return data.map((scene) => {
      const cleanedScene = {};
      for (const key in scene) {
        if (scene[key] !== null) {
          cleanedScene[key] = scene[key];
        }
      }
      return cleanedScene;
    });
  }
  const handleDialogueChange = (sceneIndex, dialogueIndex, value) => {
    const updatedScenes = [...scenes];
    updatedScenes[sceneIndex].dialogue[dialogueIndex].description = value;
    setScenes(updatedScenes);
  };
  const handleCreate = async () => {
    const hasChanged = !isEqualScenes(scenes, initialScenes);
    console.log("Người dùng đã chỉnh sửa?", hasChanged);
    
    if (hasChanged) {
      setLoading(true);
      const cleanedData = removeNullKeys(script?.script?.scenes);
      
      try {
        // Lấy thông tin user từ localStorage
        const userRaw = localStorage.getItem("user");
        const user = userRaw ? JSON.parse(userRaw) : null;
  
        // Kiểm tra quyền của user trong dự án
        const userRole = script?.members.find(
          (item) => item.username === user?.username
        )?.functions || [];
        // Thứ tự các bước workflow
        const workflowSteps = [
          "gen_script",
          "gen_image",
          "gen_video",
          "gen_voice",
          "gen_audio_sub",
          "complete"
        ];
  
        
        if (!userRole.includes("gen_script")) {
          toast.error("Bạn không có quyền chỉnh sửa kịch bản");
          setLoading(false);
          return;
        }
  
        // 2. Cập nhật dữ liệu nếu có thay đổi
        const updateData = {
          current_step: "gen_script",
          script: { ...script.script, scenes: cleanedData },
        };
  
        const result = await updateProject(id, updateData);
  
        if (!result || !result.name) {
          toast.warning(result?.detail || "Cập nhật thất bại");
          setLoading(false);
          return;
        }
  
        localStorage.setItem("gen_script", JSON.stringify(result));
  
        // 3. Kiểm tra quyền trước khi chuyển trang
        const nextStep = "gen_image";
        const hasNextStepPermission = userRole.includes(nextStep);
        const isNextStepInOrder = 
          workflowSteps.indexOf(nextStep) > workflowSteps.indexOf("gen_script");
  
        if (hasNextStepPermission && isNextStepInOrder) {
          setTimeout(() => {
            navigate(`/create-image?id=${id}`);
          }, 500);
        } else {
          toast.success("Cập nhật thành công");
          // Hoặc điều hướng về trang hiện tại nếu không có quyền
          // navigate(`/script?id=${id}`);
        }
  
      } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
        toast.error("Đã xảy ra lỗi khi xử lý");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Không có thay đổi");
      // Kiểm tra quyền trước khi chuyển trang khi không có thay đổi
      const userRaw = localStorage.getItem("user");
      const user = userRaw ? JSON.parse(userRaw) : null;
      const userRole = script?.members.find(
        (item) => item.username === user?.username
      )?.functions || [];
  
      if (userRole.includes("gen_image")) {
        navigate(`/create-image?id=${id}`);
      } else {
        toast.warning("Bạn không có quyền truy cập bước tiếp theo");
      }
    }
  };
  console.log(modelList, "aaa");
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
          value={model}
          onChange={(e) => setModel(e.target.value)}
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
          {modelList.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.value}
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
            Phần cảnh {index + 1} : {scene.title}
          </Typography>

          {/* Description */}
          <Typography
            fontSize={14}
            sx={{ fontStyle: "italic" }}
            color='#A3A4B5'
            mb={1}>
            Mô tả cảnh (phục vụ cho tạo prompt)
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
            Lời kể:
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

          {scene.dialogue && scene.dialogue.length > 0 && script.style_type && (
            <>
              <Typography
                fontSize={14}
                sx={{ fontStyle: "italic" }}
                color='#A3A4B5'
                mt={2}
                mb={1}>
                Lời thoại/narration:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {scene.dialogue.map((item, dIndex) => {
                  return (
                    <Box width={"100%"} position='relative'>
                      <TextField
                        multiline
                        fullWidth
                        minRows={2}
                        maxRows={4}
                        value={item.talk}
                        onChange={(e) =>
                          handleDialogueChange(index, dIndex, e.target.value)
                        }
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
                            alignItems: "start",
                            gap: 10,
                          },
                          startAdornment: (
                            <ul>
                              <li
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 10,
                                }}>
                                <RiRecordCircleFill size={10} />
                                <Typography width={"max-content"}>
                                  {item.charactor} {` : `}{" "}
                                </Typography>
                              </li>
                            </ul>
                          ),
                        }}
                      />
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          color: "white",
                        }}
                        onClick={() => handleEdit(index, "narrator")}>
                        <EditIcon fontSize='small' />
                      </IconButton>
                    </Box>
                  );
                })}
              </Box>
            </>
          )}
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
          onClick={genScriptFun}
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
