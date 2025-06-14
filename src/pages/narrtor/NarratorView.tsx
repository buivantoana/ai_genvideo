// import React from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   Select,
//   InputLabel,
//   FormControl,
//   useMediaQuery,
//   useTheme,
//   Switch,
// } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import StepComponent from "../../components/StepComponent";
// import EditIcon from "@mui/icons-material/Edit";
// import group from "../../images/Group 13.png";
// import download from "../../images/maximize-3.png";

// import image from "../../images/adbe6e126ef5ad889784e0f288edfd8329fed5c7.png";
// import image1 from "../../images/bf053d80d9782e45442f9fd54f729b5a17616751.png";

// const modelOptions1 = ["Klling", "FramePack", "Wan"];
// const modelOptions2 = ["1080p", "720p", "480p"];
// const dynamicSteps = [
//   { label: "Ý tưởng", status: "completed" },
//   { label: "Tạo kịch bản", status: "completed" },
//   { label: "Tạo ảnh", status: "completed" },
//   { label: "Tạo Video", status: "completed" },
//   { label: "Voice", status: "active" },
// ];
// const NarratorView = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <Box
//       className='hidden-add-voice'
//       sx={{
//         bgcolor: "#0D0C2B",
//         p: isMobile ? 1.5 : 6,

//         color: "white",
//         display: "flex",
//         flexDirection: "column",
//         gap: isMobile ? 2 : 4,

//       }}>
//       <StepComponent steps={dynamicSteps} />
//       {/* Toggle Tabs */}
//       <ResponsiveBox />

//       <VideoEditorPage />
//     </Box>
//   );
// };

// export default NarratorView;

// import { Card, CardMedia, Stack, Slider } from "@mui/material";
// import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
// import DownloadIcon from "@mui/icons-material/Download";
// import { RiPlayFill } from "react-icons/ri";
// import ResponsiveBox from "../../components/ResponsiveBox";
// import { useNavigate } from "react-router-dom";

// const VideoCard = ({ sceneNumber, imageUrl, narrationText }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   return (
//     <Box sx={{ mb: 4 }}>
//       <Typography
//         variant='h5'
//         color='white'
//         sx={{ fontSize: isMobile ? "1.2rem" : "1.5rem" }}
//         fontWeight={"bold"}
//         gutterBottom>
//         Video phân cảnh {sceneNumber}:
//       </Typography>
//       <Box
//         sx={{
//           margin: "30px 0 !important",
//           position: "relative",
//           width: isMobile ? "100%" : "80%",
//           borderRadius: 1,
//           overflow: "hidden",
//         }}>
//         <Box sx={{ position: "absolute", bottom: 15, right: 15 }}>
//           <img src={download} alt='' />
//         </Box>
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}>
//           <Box
//             display={"flex"}
//             justifyContent={"center"}
//             alignItems={"center"}
//             width={"50px"}
//             height={"50px"}
//             sx={{
//               borderRadius: "50%",
//               border: "1px solid white",
//               background: "rgba(0,0,0,.5)",
//             }}>
//             <RiPlayFill size={40} />
//           </Box>
//         </Box>
//         <img
//           src={imageUrl}
//           width={"100%"}
//           style={{ borderRadius: "8px" }}
//           height={"100%"}
//           alt=''
//         />
//       </Box>
//       {sceneNumber === 1 && (
//         <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: "30px" }}>
//           <Typography
//             variant='h6'
//             fontSize={isMobile ? "1.1rem" : "1.25rem"}
//             color='white'>
//             Hiệu ứng chuyển màn
//           </Typography>
//           <Button
//             size='small'
//             sx={{
//               borderRadius: 1,
//               background: "rgba(89, 50, 234, 1)",
//               px: 2.5,
//             }}
//             variant='contained'>
//             Mờ dần
//           </Button>
//         </Box>
//       )}
//       <Typography
//         variant='subtitle2'
//         sx={{ fontStyle: "italic", my: 2 }}
//         color='white'
//         gutterBottom>
//         Lời dẫn
//       </Typography>
//       <ul>
//         <li style={{ color: "rgba(139, 139, 168, 1)", marginLeft: "20px" }}>
//           <Typography fontSize={isMobile ? ".8rem" : "1rem"}>
//             {" "}
//             {narrationText}
//           </Typography>
//         </li>
//       </ul>
//     </Box>
//   );
// };

// const SettingsPanel = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   return (
//     <Box
//       sx={{
//         height: "fit-content",
//         color: "white",
//         px: { xs: 1.5, md: 4 },
//       }}>
//       <Typography
//         variant='h6'
//         mb={5}
//         color='white'
//         fontWeight={"bold"}
//         gutterBottom>
//         Cài đặt hệ thông số và âm thanh
//       </Typography>
//       <Stack spacing={6}>
//         <FormControl fullWidth>
//           <InputLabel sx={{ color: "#aaa" }}>Mô hình</InputLabel>
//           <Select
//             defaultValue='Dia'
//             label='Mô hình'
//             MenuProps={{
//               PaperProps: {
//                 sx: {
//                   backgroundColor: "#2A274B", // nền của dropdown list
//                   color: "#fff",
//                   borderRadius: 2,
//                   mt: 1,
//                   "& .MuiMenuItem-root": {
//                     "&:hover": {
//                       backgroundColor: "#3A375F", // màu hover
//                       borderRadius: 1,
//                     },
//                     "&.Mui-selected": {
//                       backgroundColor: "#4B3A79", // màu selected
//                       borderRadius: 1,
//                     },
//                   },
//                 },
//               },
//             }}
//             sx={{
//               color: "white",
//               ".MuiSelect-icon": { color: "white" },
//               ".MuiOutlinedInput-notchedOutline": {
//                 borderColor: "white",
//               },
//               "&:hover .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "white",
//               },
//               "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "white",
//               },
//               height: isMobile ? "38px" : "unset",
//             }}>
//             <MenuItem value='Dia'>Dia</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl fullWidth>
//           <InputLabel sx={{ color: "#aaa" }}>Giọng đọc</InputLabel>
//           <Select
//             defaultValue='MC Tùng Bùi'
//             label='Giọng đọc'
//             MenuProps={{
//               PaperProps: {
//                 sx: {
//                   backgroundColor: "#2A274B", // nền của dropdown list
//                   color: "#fff",
//                   borderRadius: 2,
//                   mt: 1,
//                   "& .MuiMenuItem-root": {
//                     "&:hover": {
//                       backgroundColor: "#3A375F", // màu hover
//                       borderRadius: 1,
//                     },
//                     "&.Mui-selected": {
//                       backgroundColor: "#4B3A79", // màu selected
//                       borderRadius: 1,
//                     },
//                   },
//                 },
//               },
//             }}
//             sx={{
//               color: "white",
//               ".MuiSelect-icon": { color: "white" },
//               ".MuiOutlinedInput-notchedOutline": {
//                 borderColor: "white",
//               },
//               "&:hover .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "white",
//               },
//               "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "white",
//               },
//               height: isMobile ? "38px" : "unset",
//             }}>
//             <MenuItem value='MC Tùng Bùi'>MC Tùng Bùi</MenuItem>
//           </Select>
//         </FormControl>

//         <Box
//           sx={{
//             bgcolor: "#2c2e4f",
//             p: 2,
//             borderRadius: 2,
//             fontSize: 16,
//             color: "rgba(253, 181, 42, 1)",
//             lineHeight: "2",
//           }}>
//           Mô tả giọng đọc: Giọng nói được đặc trưng bởi một giai điệu thân thiện
//           và tích cực, phù hợp với nội dung chung tham gia và cộng hưởng với
//           khán giả.
//         </Box>

//         <Box>
//           <Typography gutterBottom color='white'>
//             Tốc độ đọc
//           </Typography>
//           <Slider
//             defaultValue={1}
//             min={0.5}
//             max={2}
//             step={0.25}
//             marks={[
//               { value: 0.5, label: "0.5" },
//               { value: 1, label: "1.0" },

//               { value: 1.5, label: "1.5" },
//               { value: 2, label: "2.0" },
//             ]}
//             valueLabelDisplay='auto'
//             sx={{
//               color: "#6b5bfc",
//               "& .MuiSlider-markLabel": {
//                 color: "white",
//               },
//             }}
//           />
//         </Box>

//         <FormControl fullWidth>
//           <Box
//             display={"flex"}
//             justifyContent={"space-between"}
//             alignItems={"center"}
//             my={1}>
//             <Typography variant='h6' sx={{ color: "white", my: 2 }}>
//               Số tối đa trên mỗi dòng
//             </Typography>
//             <Button
//               variant='contained'
//               sx={{
//                 border: "1px solid white",
//                 borderRadius: 1,
//                 background: "transparent",
//               }}>
//               Tự động
//             </Button>
//           </Box>
//           <Select
//             defaultValue='4 từ'
//             MenuProps={{
//               PaperProps: {
//                 sx: {
//                   backgroundColor: "#2A274B", // nền của dropdown list
//                   color: "#fff",
//                   borderRadius: 2,
//                   mt: 1,
//                   "& .MuiMenuItem-root": {
//                     "&:hover": {
//                       backgroundColor: "#3A375F", // màu hover
//                       borderRadius: 1,
//                     },
//                     "&.Mui-selected": {
//                       backgroundColor: "#4B3A79", // màu selected
//                       borderRadius: 1,
//                     },
//                   },
//                 },
//               },
//             }}
//             sx={{
//               color: "white",
//               ".MuiSelect-icon": { color: "white" },
//               ".MuiOutlinedInput-notchedOutline": {
//                 borderColor: "white",
//               },
//               "&:hover .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "white",
//               },
//               "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                 borderColor: "white",
//               },
//               height: isMobile ? "38px" : "unset",
//             }}>
//             <MenuItem value='4 từ'>4 từ</MenuItem>
//             <MenuItem value='5 từ'>5 từ</MenuItem>
//           </Select>
//           <Typography sx={{ color: "rgba(139, 139, 168, 1)", mt: 1 }}>
//             Tùy thuộc vào tỉ lệ khung hình
//           </Typography>
//         </FormControl>
//       </Stack>
//     </Box>
//   );
// };

// function VideoEditorPage() {
//   const isMobile = useMediaQuery("(max-width:768px)");
//   const navigate = useNavigate();
//   return (
//     <Box sx={{ py: { xs: 2, md: 5 }  }}>
//       <Stack direction={isMobile ? "column" : "row"} spacing={4}>
//         <Box flex={1} px={isMobile?1.5:0}>
//           <VideoCard
//             sceneNumber={1}
//             imageUrl={image}
//             narrationText='Từ bé, tụi mình đã bên nhau. Một chiếc ghế đã cũ, hai thằng nhóc và cả một tuổi thơ trọn vẹn.'
//           />
//           <VideoCard
//             sceneNumber={2}
//             imageUrl={image1}
//             narrationText='Từ bé, tụi mình đã bên nhau. Một chiếc ghế đã cũ, hai thằng nhóc và cả một tuổi thơ trọn vẹn.'
//           />
//         </Box>

//         <Box flex={1}>
//           <SettingsPanel />
//         </Box>
//       </Stack>

//       <Box mt={4} textAlign='center'>
//         <Button
//           variant='contained'
//           onClick={() => navigate("/sub")}
//           sx={{
//             bgcolor: "#6b5bfc",
//             color: "#fff",
//             fontWeight: "bold",
//             borderRadius: 2,
//             px: 4,
//             py: 1.5,
//             width: isMobile ? "100%" : "30%",
//             height: isMobile?40 :50,
//           }}>
//           Bước tiếp theo
//         </Button>
//       </Box>
//     </Box>
//   );
// }

import image from "../../images/adbe6e126ef5ad889784e0f288edfd8329fed5c7.png";

const dynamicSteps = [
  { label: "Ý tưởng", status: "completed" },
  { label: "Tạo kịch bản", status: "completed" },
  { label: "Tạo ảnh", status: "completed" },
  { label: "Tạo Video", status: "completed" },
  { label: "Voice", status: "active" },
];
const NarratorView = ({ model, genScript }) => {
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

      <VoiceScene model={model} genScript={genScript} />
    </Box>
  );
};

export default NarratorView;

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Slider,
  FormControl,
  InputLabel,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  Collapse,
  CircularProgress,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import image1 from "../../images/bf053d80d9782e45442f9fd54f729b5a17616751.png";
import StepComponent from "../../components/StepComponent";
import ResponsiveBox from "../../components/ResponsiveBox";
import { genScriptVoice, genScriptVoiceStatus } from "../../service/project";

const VoiceItem = ({
  title,
  text,
  isOpenDefault = false,
  model,
  setValues,
  values,
  scene,
}) => {
  const [open, setOpen] = useState(isOpenDefault);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  console.log("model", model);
  // State for form inputs
  const [selectedModel, setSelectedModel] = useState(model[0]?.name || "Dia"); // Default to first model (Dia)
  const [selectedVoice, setSelectedVoice] = useState(""); // Voice for "Lời thoại"
  const [selectedCharacter, setSelectedCharacter] = useState(""); // Voice for "Nhân vật"
  const [duration, setDuration] = useState(""); // Duration input
  const [readingSpeed, setReadingSpeed] = useState(1); // Default reading speed
  const [narrationText, setNarrationText] = useState(text); // Narration text input
  const [intervalId, setIntervalId] = useState(null);
  const selectedModelData = model.find((m) => m.name === selectedModel);
  const voices = selectedModelData?.voices[0] || [];
  const [loading, setLoading] = useState(false);
  const handleGenerateDialogue = async () => {
    console.log({
      selectedModel,
      selectedVoice,
      selectedCharacter,
      duration,
      readingSpeed,
      narrationText,
    });
    setLoading(true);
    let voice = values.find((item) => item.scene == scene)?.voice;
    if (voice && Object.keys(voice).length > 0) {
      voice = voice?.url;
    }
    let formData = new FormData();
    formData.append("text", narrationText);
    formData.append("model", selectedModel);
    formData.append("speed", String(readingSpeed));
    formData.append("voice", selectedVoice);
    if (voice) {
      formData.append("sample_url", voice);
    }

    try {
      let result = await genScriptVoice(formData);

      if (result && result.code === 2) {
        const poll = setInterval(async () => {
          const status = await genScriptVoiceStatus(result.id);
          if (status?.code === 0 && status?.voice_url) {
            console.log(status);
            let script: any = localStorage.getItem("gen_script");
            if (script) {
              script = JSON.parse(script);
              script.script.scenes = values.map((item) => {
                if (item.scene == scene) {
                  return {
                    ...item,
                    voice: {
                      id: status.id,
                      url: status.voice_url,
                      text: narrationText,
                      voice: selectedVoice,
                      model: selectedModel,
                      speed: readingSpeed,
                    },
                  };
                }
                return item;
              });
              localStorage.setItem("gen_script", JSON.stringify(script));
            }
            setValues((prev) =>
              prev.map((item) =>
                item.scene === scene
                  ? {
                      ...item,
                      voice: {
                        id: status.id,
                        url: status.voice_url,
                        text: narrationText,
                        voice: selectedVoice,
                        model: selectedModel,
                        speed: readingSpeed,
                      },
                    }
                  : item
              )
            );

            clearInterval(poll);
            setLoading(false);
          }
        }, 2000);
        setIntervalId(poll);
      } else if (result.code == 0) {
        // fallback không cần chờ status
        let script: any = localStorage.getItem("gen_script");
        if (script) {
          script = JSON.parse(script);
          script.script.scenes = values.map((item) => {
            if (item.scene == scene) {
              return {
                ...item,
                voice: {
                  id: result.id,
                  url: result.voice_url,
                  text: narrationText,
                  voice: selectedVoice,
                  model: selectedModel,
                  speed: readingSpeed,
                },
              };
            }

            return item;
          });
          localStorage.setItem("gen_script", JSON.stringify(script));
        }
        const newImageUrl = result?.image_url || "";
        setValues((prev) =>
          prev.map((item) =>
            item.scene === scene
              ? {
                  ...item,
                  voice: {
                    id: result.id,
                    url: result.voice_url,
                    text: narrationText,
                    voice: selectedVoice,
                    model: selectedModel,
                    speed: readingSpeed,
                  },
                }
              : item
          )
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Lỗi khi tạo ảnh:", error);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #2A274B",
        borderRadius: 2,
        backgroundColor: "#1B1A3C",
        mb: 2,
      }}>
      <Box
        display='flex'
        alignItems={isMobile ? "start" : "center"}
        justifyContent='space-between'
        flexDirection={isMobile ? "column" : "row"}
        p={2}
        sx={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}>
        <Box display='flex' alignItems={isMobile ? "left" : "center"} gap={2}>
          <Box>
            <Typography variant='h6' fontWeight='bold'>
              {title}
            </Typography>
            <Typography my={2} sx={{ fontStyle: "italic" }}>
              {text}
            </Typography>
          </Box>
        </Box>
        <Box display='flex' alignItems='center' gap={3}>
          <img
            src={image1}
            alt='scene'
            style={{
              width: isMobile ? 100 : 201,
              height: isMobile ? 50 : 108,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
          <AccessTimeIcon sx={{ color: "#ccc" }} />
          <TagFacesIcon sx={{ color: "orange" }} />
          <Typography>1x</Typography>
          <IconButton>
            {open ? (
              <ExpandLessIcon sx={{ color: "#fff" }} />
            ) : (
              <ExpandMoreIcon sx={{ color: "#fff" }} />
            )}
          </IconButton>
        </Box>
      </Box>

      <Collapse in={open} sx={{ borderTop: "2px solid rgba(65, 65, 136, 1)" }}>
        <Box p={2}>
          <Typography fontWeight='bold' mb={3}>
            Lời dẫn truyện
          </Typography>
          <TextField
            fullWidth
            placeholder='Nhập lời dẫn truyện'
            variant='outlined'
            size='small'
            value={narrationText}
            onChange={(e) => setNarrationText(e.target.value)}
            sx={{
              backgroundColor: "#1A1836",
              borderRadius: 2,
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                height: isMobile ? "40px" : "50px",
                alignItems: "center",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "#414188",
              },
            }}
          />

          <Box mt={3}>
            <Typography fontWeight='bold' mb={3}>
              Cài đặt hệ thống và âm thanh
            </Typography>

            <Box
              display='flex'
              gap={2}
              sx={{ flexDirection: isMobile ? "column" : "row" }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "white" }}>Mô hình</InputLabel>
                <Select
                  value={selectedModel}
                  onChange={(e) => {
                    setSelectedModel(e.target.value);
                    setSelectedCharacter(""); // Reset character when model changes
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#2A274B",
                        color: "#fff",
                        borderRadius: 2,
                        mt: 1,
                        textAlign: "center",
                        "& .MuiMenuItem-root": {
                          "&:hover": {
                            backgroundColor: "#3A375F",
                            borderRadius: 1,
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#4B3A79",
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
                    width: isMobile ? "100%" : "unset",
                    height: isMobile ? 40 : 50,
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid",
                      borderColor: "#414188",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid",
                      borderColor: "#414188",
                    },
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      padding: "0 14px",
                    },
                    ".MuiSelect-icon": { color: "#fff" },
                  }}
                  label='Mô hình'>
                  {model.map((m) => (
                    <MenuItem key={m.id} value={m.name}>
                      {m.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "white" }}>Lời thoại</InputLabel>
                <Select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#2A274B",
                        color: "#fff",
                        borderRadius: 2,
                        mt: 1,
                        textAlign: "center",
                        "& .MuiMenuItem-root": {
                          "&:hover": {
                            backgroundColor: "#3A375F",
                            borderRadius: 1,
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#4B3A79",
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
                    width: isMobile ? "100%" : "unset",
                    height: isMobile ? 40 : 50,
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid",
                      borderColor: "#414188",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid",
                      borderColor: "#414188",
                    },
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      padding: "0 14px",
                    },
                    ".MuiSelect-icon": { color: "#fff" },
                  }}
                  label='Lời thoại'>
                  <MenuItem value='MC Tung'>MC Tung</MenuItem>
                  {/* Add more static voice options if needed */}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "white" }}>Nhân vật</InputLabel>
                <Select
                  value={selectedCharacter}
                  onChange={(e) => setSelectedCharacter(e.target.value)}
                  disabled={voices.length === 0} // Disable if no voices available
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#2A274B",
                        color: "#fff",
                        borderRadius: 2,
                        mt: 1,
                        textAlign: "center",
                        "& .MuiMenuItem-root": {
                          "&:hover": {
                            backgroundColor: "#3A375F",
                            borderRadius: 1,
                          },
                          "&.Mui-selected": {
                            backgroundColor: "#4B3A79",
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
                    width: isMobile ? "100%" : "unset",
                    height: isMobile ? 40 : 50,
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid",
                      borderColor: "#414188",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid",
                      borderColor: "#414188",
                    },
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      padding: "0 14px",
                    },
                    ".MuiSelect-icon": { color: "#fff" },
                  }}
                  label='Nhân vật'>
                  {voices.length > 0 ? (
                    voices.map((voice) => (
                      <MenuItem key={voice.id} value={voice.name}>
                        {voice.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value='' disabled>
                      No voices available
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  placeholder='Thời lượng'
                  variant='outlined'
                  size='small'
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  sx={{
                    backgroundColor: "#1A1836",
                    borderRadius: 2,
                    input: { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      height: isMobile ? "40px" : "50px",
                      alignItems: "center",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid",
                      borderColor: "#414188",
                    },
                  }}
                />
              </FormControl>
            </Box>
            <Box
              mt={3}
              display={"flex"}
              sx={{ flexDirection: isMobile ? "column" : "row" }}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Box width={isMobile ? "100%" : "60%"}>
                <Typography gutterBottom>Tốc độ đọc</Typography>
                <Slider
                  value={readingSpeed}
                  onChange={(e, newValue) => setReadingSpeed(newValue)}
                  step={0.25}
                  min={0.5}
                  max={2}
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
                      color: "#fff", // đổi màu label dưới thành trắng
                    },
                    "& .MuiSlider-valueLabel": {
                      backgroundColor: "#6b5bfc", // màu tooltip hiện khi kéo
                      color: "#fff",
                    },
                  }}
                />
              </Box>
              <Box textAlign='right' width={isMobile ? "100%" : "30%"}>
                <Button
                  variant='contained'
                  onClick={handleGenerateDialogue}
                  sx={{
                    background: "#6E00FF",
                    textTransform: "none",
                    borderRadius: 1,
                    flex: 1,
                    fontWeight: 600,
                    px: 3,
                    "&:hover": {
                      background: "#5900cc",
                    },
                    height: 40,
                    fontSize: isMobile ? "13px" : "16px",
                    width: "100%",
                    opacity: loading ? 0.8 : 1,
                    pointerEvents: loading ? "none" : "unset",
                  }}>
                  {loading ? (
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <CircularProgress size={16} color='inherit' />
                      <span>Tạo lời thoại...</span>
                    </Stack>
                  ) : (
                    "Tạo lời thoại"
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

const VoiceScene = ({ model, genScript }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [values, setValues] = useState(genScript?.script.scenes || []);
  useEffect(() => {
    if (genScript) {
      const scenesData = genScript?.script.scenes || [];
      localStorage.setItem("gen_script", JSON.stringify(genScript));
      setValues(scenesData);
    }
  }, [genScript]);
  return (
    <Box sx={{ p: isMobile ? 2 : 4, color: "#fff", background: "#0D0C2B" }}>
      <Typography fontSize={isMobile ? 20 : 24} fontWeight='bold' mb={2}>
        Video phân cảnh 1:
      </Typography>

      {values.map((item) => {
        return (
          <VoiceItem
            title={item.title}
            text={item.narrator}
            isOpenDefault={false}
            model={model}
            scene={item.scene}
            values={values}
            setValues={setValues}
          />
        );
      })}

      {/* Nhân vật A nói
      <VoiceItem
        title='Nhân vật A nói:'
        text='Hôm nay bạn đẹp thế'
        model={model}
      />
      <VoiceItem
        title='Nhân vật A nói:'
        text='Hôm nay bạn đẹp thế'
        model={model}
      /> */}

      <Box textAlign='center' mt={4}>
        <Button
          variant='contained'
          sx={{
            background: "#6E00FF",
            textTransform: "none",
            borderRadius: 1,
            flex: 1,
            fontWeight: 600,
            px: 3,
            "&:hover": {
              background: "#5900cc",
            },
            height: 50,
            fontSize: isMobile ? "15px" : "18px",
          }}>
          Bước tiếp theo
        </Button>
      </Box>
    </Box>
  );
};
