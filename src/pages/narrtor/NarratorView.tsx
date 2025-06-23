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

const dynamicSteps = [
  { label: "Ý tưởng", status: "completed" },
  { label: "Tạo kịch bản", status: "completed" },
  { label: "Tạo ảnh", status: "completed" },
  { label: "Tạo Video", status: "completed" },
  { label: "Tạo Voice", status: "active" },
  { label: "Nhạc nền và sub", status: "pending" },
  { label: "Hoàn thành ", status: "pending" },
];
const NarratorView = ({ model, genScript, setLoading, id }) => {
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
      {/* <ResponsiveBox /> */}

      <VoiceScene
        model={model}
        genScript={genScript}
        setLoading={setLoading}
        id={id}
      />
    </Box>
  );
};

export default NarratorView;

import React, { useEffect, useRef, useState } from "react";
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
import speed from "../../images/speedometer.png";
import voice_high from "../../images/volume-high.png";
import StepComponent from "../../components/StepComponent";
import ResponsiveBox from "../../components/ResponsiveBox";
import {
  genScriptVoice,
  genScriptVoiceStatus,
  updateProject,
} from "../../service/project";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RiPlayFill } from "react-icons/ri";

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

  // State for form inputs
  const [selectedModel, setSelectedModel] = useState(
    values.find((item) => item.scene === scene)?.voice?.model ||
      model[0]?.id ||
      "dia"
  );
  const sceneData = values.find((v) => v.scene === scene);
  const [selectedCharacter, setSelectedCharacter] = useState(
    (values.find((item) => item.scene === scene)?.charactors &&
      values.find((item) => item.scene === scene)?.charactors.length > 0 &&
      values.find((item) => item.scene === scene)?.charactors[0]) ||
      ""
  );

  const [readingSpeed, setReadingSpeed] = useState(
    values.find((item) => item.scene === scene)?.voice?.speed || 1
  );

  const [duration, setDuration] = useState(
    values.find((item) => item.scene === scene)?.voice?.delay || "0.5"
  );
  const [selectedVoice, setSelectedVoice] = useState(""); // Voice for "Lời thoại"
  const [videoUrl, setVideoUrl] = useState("");

  const [narrationText, setNarrationText] = useState(text); // Narration text input
  const [intervalId, setIntervalId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [currentTime, setCurrentTime] = useState(0);
  const selectedModelData = model.find((m) => m.id === selectedModel);
  const voices = Array.isArray(selectedModelData?.voices)
    ? selectedModelData.voices.length > 0 &&
      Array.isArray(selectedModelData.voices[0])
      ? selectedModelData.voices[0]
      : selectedModelData.voices
    : [];
  const character = values.find((item) => item.scene === scene)?.charactors
    ? values.find((item) => item.scene === scene)?.charactors &&
      values
        .find((item) => item.scene === scene)
        ?.charactors.map((item) => {
          return {
            id: item,
            value: item,
          };
        })
    : [];
  console.log("character", character);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const currentScene = values.find((item) => item.scene === scene);
    if (currentScene?.voice) {
      // Điền model nếu có
      if (currentScene.voice.model) {
        setSelectedModel(currentScene.voice.model);
      }

      // Điền nhân vật nếu có
      if (currentScene.voice.voice) {
        setSelectedVoice(currentScene.voice.voice);
      }

      // Điền tốc độ nếu có
      if (currentScene.voice.speed) {
        setReadingSpeed(currentScene.voice.speed);
      }

      // Điền độ trễ nếu có
      if (currentScene.voice.delay) {
        setDuration(currentScene.voice.delay);
      }
    }
  }, [scene, values]);
  const handlePlayAudio = () => {
    const voiceData = values.find((item) => item.scene === scene)?.voice;

    if (!voiceData?.url) return;

    if (isPlaying && currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
    }

    const audio = new Audio(voiceData.url);

    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0); // Reset khi kết thúc
    };

    // Thêm sự kiện cập nhật thời gian
    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio
      .play()
      .then(() => {
        setCurrentAudio(audio);
      })
      .catch((error) => {
        console.error("Lỗi khi phát audio:", error);
      });
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  // useEffect(() => {
  //   return () => {
  //     if (currentAudio) {
  //       currentAudio.pause();
  //       currentAudio.ontimeupdate = null; // Xóa sự kiện
  //     }
  //   };
  // }, [currentAudio]);
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
    formData.append("delay", duration);
    if (voice) {
      formData.append("sample_url", voice);
    }

    try {
      let result = await genScriptVoice(formData);

      if (result && result.code === 2) {
        let retryCount = 0;
        const maxRetries = 150;
        const poll = setInterval(async () => {
          retryCount++;
          if (retryCount > maxRetries) {
            clearInterval(poll);
            setLoading(false);
            toast.warning("Quá thời gian chờ 2 phút. Vui lòng thử lại sau.");
            return;
          }
          const status = await genScriptVoiceStatus(result.id);
          if (status?.code === 0 && status?.imageimage_url) {
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
                      delay: duration,
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
                        delay: duration,
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
                  delay: duration,
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
                    delay: duration,
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

  const videoRef = useRef(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    const currentScene = values?.find((item) => item.scene === scene);
    setVideoUrl(currentScene?.video ? currentScene?.video?.url : "");
  }, [values, scene]);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    // Dừng cả video và audio hiện tại nếu đang phát
    if (isPlayingVideo || isPlaying) {
      video.pause();
      if (currentAudio) {
        currentAudio.pause();
      }
      setIsPlayingVideo(false);
      setIsPlaying(false);
      return;
    }

    // Phát video
    video
      .play()
      .then(() => {
        setIsPlayingVideo(true);

        // Nếu có voice URL thì phát voice cùng lúc
        const voiceUrl = values.find((item) => item.scene === scene)?.voice
          ?.url;
        if (voiceUrl) {
          if (currentAudio) {
            currentAudio.pause();
          }

          const audio = new Audio(voiceUrl);
          audio.onplay = () => setIsPlaying(true);
          audio.onpause = () => setIsPlaying(false);
          audio.onended = () => setIsPlaying(false);
          audio.ontimeupdate = () => setCurrentTime(audio.currentTime);

          audio
            .play()
            .then(() => {
              setCurrentAudio(audio);
            })
            .catch((error) => {
              console.error("Lỗi khi phát audio:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Lỗi khi phát video:", error);
      });
  };

  // Thêm sự kiện khi video kết thúc
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setIsPlayingVideo(false);
      // Dừng audio khi video kết thúc
      if (currentAudio) {
        currentAudio.pause();
        setIsPlaying(false);
      }
    };

    video.addEventListener("ended", handleVideoEnd);

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, [currentAudio]);
  return (
    <>
      <Typography fontSize={isMobile ? 20 : 24} fontWeight='bold' mb={2}>
        Video phân cảnh {scene}:
      </Typography>
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
          gap={2}
          p={2}
          sx={{ cursor: "pointer" }}>
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
          <Box
            display='flex'
            alignItems='center'
            flexWrap={isMobile ? "wrap" : "nowrap"}
            gap={3}>
            <Box sx={{ position: "relative", width: 250, height: 150 }}>
              {videoUrl && (
                <video
                  ref={videoRef}
                  width='250'
                  height='150'
                  style={{ borderRadius: "15px" }}
                  onClick={handleTogglePlay}
                  controls={isPlayingVideo} // 👈 Chỉ hiện controls khi đang phát
                  onEnded={() => setIsPlayingVideo(false)} // Khi phát xong thì tắt controls
                >
                  <source src={videoUrl} />
                  Trình duyệt của bạn không hỗ trợ video HTML5.
                </video>
              )}

              {!isPlayingVideo && (
                <Box
                  onClick={handleTogglePlay}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}>
                  <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    width='50px'
                    height='50px'
                    sx={{
                      borderRadius: "50%",
                      border: "1px solid white",
                      background: "rgba(0,0,0,.5)",
                    }}>
                    <RiPlayFill size={40} color='white' />
                  </Box>
                </Box>
              )}
            </Box>
            {values &&
              values.find((item) => item.scene === scene)?.voice &&
              values.find((item) => item.scene === scene)?.voice.url && (
                <Box
                  sx={{
                    border: "1px solid rgba(139, 139, 168, 1)",
                    borderRadius: "16px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px 8px",
                    gap: 1,
                  }}>
                  <img src={voice_high} alt='' />
                  <Typography color='rgba(139, 139, 168, 1)'>
                    {(values &&
                      values.find((item) => item.scene === scene)?.voice
                        ?.delay) ||
                      0}
                    s
                  </Typography>
                </Box>
              )}
            {selectedCharacter &&
              character.find((item) => item.id == selectedCharacter) &&
              character.find((item) => item.id == selectedCharacter).value && (
                <Box
                  sx={{
                    border: "1px solid rgba(139, 139, 168, 1)",
                    borderRadius: "16px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px 8px",
                    width: "max-content",
                  }}>
                  <Typography>
                    {selectedCharacter &&
                      character.find((item) => item.id == selectedCharacter) &&
                      character.find((item) => item.id == selectedCharacter)
                        .value}
                  </Typography>
                </Box>
              )}
            <Box
              sx={{
                border: "1px solid rgba(139, 139, 168, 1)",
                borderRadius: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "5px 8px",
              }}>
              <img src={speed} alt='' />
              <Typography color='rgba(139, 139, 168, 1)'>
                {Math.floor(readingSpeed)}x
              </Typography>
            </Box>
            <IconButton onClick={() => setOpen(!open)}>
              {open ? (
                <ExpandLessIcon sx={{ color: "#fff" }} />
              ) : (
                <ExpandMoreIcon sx={{ color: "#fff" }} />
              )}
            </IconButton>
          </Box>
        </Box>

        <Collapse
          in={open}
          sx={{ borderTop: "2px solid rgba(65, 65, 136, 1)" }}>
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
                      // Reset character when model changes
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
                      <MenuItem key={m.id} value={m.id}>
                        {m.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "white" }}>Giọng đọc</InputLabel>
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
                    {voices.length > 0 ? (
                      voices.map((voice) => (
                        <MenuItem key={voice.id} value={voice.id}>
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
                  <InputLabel sx={{ color: "white" }}>Nhân vật</InputLabel>
                  <Select
                    value={selectedCharacter}
                    onChange={(e) => setSelectedCharacter(e.target.value)}
                    // Disable if no voices available
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
                    {character.length > 0 ? (
                      character.map((voice) => (
                        <MenuItem key={voice.id} value={voice.id}>
                          {voice.value}
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
                    label='Độ trễ (s)'
                    variant='outlined'
                    size='small'
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    sx={{
                      backgroundColor: "#1A1836",
                      borderRadius: 2,

                      input: { color: "white" },
                      "& .MuiInputLabel-root": {
                        color: "white", // Label màu trắng
                      },
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
      {sceneData &&
        sceneData.dialogue &&
        sceneData.dialogue.length > 0 &&
        sceneData.dialogue.map((dialogue, idx) => (
          <VoiceItemDialog
            key={idx}
            title={
              dialogue.charactor
                ? `Nhân vật ${dialogue.charactor} nói:`
                : "Nhân vật"
            }
            text={dialogue.talk || ""} // Sử dụng dialogue.talk
            isOpenDefault={false}
            model={model}
            scene={scene}
            dialogueIndex={idx} // Truyền thêm index để cập nhật đúng dialogue
            values={values}
            setValues={setValues}
          />
        ))}
    </>
  );
};

const VoiceItemDialog = ({
  title,
  text,
  isOpenDefault = false,
  model,
  setValues,
  values,
  scene,
  dialogueIndex,
}) => {
  const [open, setOpen] = useState(isOpenDefault);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Lấy scene hiện tại
  const currentScene = values.find((item) => item.scene === scene);
  const dialogueData = currentScene?.dialogue?.[dialogueIndex];

  // State cho form inputs
  const [selectedModel, setSelectedModel] = useState(
    dialogueData?.voice?.model || model[0]?.id || "dia"
  );
  const [selectedCharacter, setSelectedCharacter] = useState(
    dialogueData?.charactor || ""
  );
  const [readingSpeed, setReadingSpeed] = useState(
    dialogueData?.voice?.speed || 1
  );
  const [duration, setDuration] = useState(dialogueData?.voice?.delay || "0.5");
  const [selectedVoice, setSelectedVoice] = useState(
    dialogueData?.voice?.voice || ""
  );
  const [narrationText, setNarrationText] = useState(
    dialogueData?.talk || text
  );
  const [videoUrl, setVideoUrl] = useState(dialogueData?.video?.url || "");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);

  const selectedModelData = model.find((m) => m.id === selectedModel);
  const voices = Array.isArray(selectedModelData?.voices)
    ? selectedModelData.voices.flat()
    : [];
  const characters = [
    { id: dialogueData?.charactor, value: dialogueData?.charactor },
  ];

  console.log("selectedCharacter111111111", characters);
  // Cập nhật state khi dialogueData thay đổi
  useEffect(() => {
    if (dialogueData?.voice) {
      setSelectedModel(dialogueData.voice.model || model[0]?.id || "dia");
      setSelectedVoice(dialogueData.voice.voice || "");
      setReadingSpeed(dialogueData.voice.speed || 1);
      setDuration(dialogueData.voice.delay || "0.5");
    }
    setNarrationText(dialogueData?.talk || text);
    setVideoUrl(dialogueData?.video?.url || "");
    setSelectedCharacter(dialogueData?.charactor || "");
  }, [dialogueData, text, currentScene, model]);

  // Phát audio
  const handlePlayAudio = () => {
    if (!dialogueData?.voice?.url) return;

    if (isPlaying && currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
    }

    const audio = new Audio(dialogueData.voice.url);
    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);

    audio
      .play()
      .then(() => setCurrentAudio(audio))
      .catch((error) => console.error("Lỗi khi phát audio:", error));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Tạo lời thoại
  const handleGenerateDialogue = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("text", narrationText);
    formData.append("model", selectedModel);
    formData.append("speed", String(readingSpeed));
    formData.append("voice", selectedVoice);
    formData.append("delay", duration);
    if (dialogueData?.voice?.url) {
      formData.append("sample_url", dialogueData.voice.url);
    }

    try {
      const result = await genScriptVoice(formData);

      if (result && result.code === 2) {
        let retryCount = 0;
        const maxRetries = 150;
        const poll = setInterval(async () => {
          retryCount++;
          if (retryCount > maxRetries) {
            clearInterval(poll);
            setLoading(false);
            toast.warning("Quá thời gian chờ 2 phút. Vui lòng thử lại sau.");
            return;
          }
          const status = await genScriptVoiceStatus(result.id);
          if (status?.code === 0 && status?.voice_url) {
            updateDialogueVoice(status);
            clearInterval(poll);
            setLoading(false);
          }
        }, 2000);
      } else if (result.code === 0) {
        updateDialogueVoice(result);
        setLoading(false);
      }
    } catch (error) {
      console.error("Lỗi khi tạo lời thoại:", error);
      setLoading(false);
    }
  };

  // Cập nhật voice cho dialogue
  const updateDialogueVoice = (result) => {
    setValues((prev) =>
      prev.map((item) =>
        item.scene === scene
          ? {
              ...item,
              dialogue: item.dialogue.map((dlg, idx) =>
                idx === dialogueIndex
                  ? {
                      ...dlg,
                      talk: narrationText,
                      charactor: selectedCharacter,
                      voice: {
                        id: result.id,
                        url: result.voice_url,
                        text: narrationText,
                        voice: selectedVoice,
                        model: selectedModel,
                        speed: readingSpeed,
                        delay: duration,
                      },
                    }
                  : dlg
              ),
            }
          : item
      )
    );

    // Cập nhật localStorage
    let script = JSON.parse(localStorage.getItem("gen_script") || "{}");
    if (script) {
      script.script.scenes = script.script.scenes.map((item) =>
        item.scene === scene
          ? {
              ...item,
              dialogue: item.dialogue.map((dlg, idx) =>
                idx === dialogueIndex
                  ? {
                      ...dlg,
                      talk: narrationText,
                      charactor: selectedCharacter,
                      voice: {
                        id: result.id,
                        url: result.voice_url,
                        text: narrationText,
                        voice: selectedVoice,
                        model: selectedModel,
                        speed: readingSpeed,
                        delay: duration,
                      },
                    }
                  : dlg
              ),
            }
          : item
      );
      localStorage.setItem("gen_script", JSON.stringify(script));
    }
  };

  const videoRef = useRef(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingVideo || isPlaying) {
      video.pause();
      if (currentAudio) currentAudio.pause();
      setIsPlayingVideo(false);
      setIsPlaying(false);
      return;
    }

    video
      .play()
      .then(() => {
        setIsPlayingVideo(true);
        if (dialogueData?.voice?.url) {
          if (currentAudio) currentAudio.pause();
          const audio = new Audio(dialogueData.voice.url);
          audio.onplay = () => setIsPlaying(true);
          audio.onpause = () => setIsPlaying(false);
          audio.onended = () => setIsPlaying(false);
          audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
          audio
            .play()
            .then(() => setCurrentAudio(audio))
            .catch((error) => console.error("Lỗi khi phát audio:", error));
        }
      })
      .catch((error) => console.error("Lỗi khi phát video:", error));
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setIsPlayingVideo(false);
      if (currentAudio) {
        currentAudio.pause();
        setIsPlaying(false);
      }
    };

    video.addEventListener("ended", handleVideoEnd);
    return () => video.removeEventListener("ended", handleVideoEnd);
  }, [currentAudio]);

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
        gap={2}
        p={2}
        sx={{ cursor: "pointer" }}>
        <Box display='flex' alignItems={isMobile ? "left" : "center"} gap={2}>
          <Box>
            <Typography variant='h6' fontWeight='bold'>
              {title}
            </Typography>
            <Typography my={2} sx={{ fontStyle: "italic" }}>
              {narrationText}
            </Typography>
          </Box>
        </Box>
        <Box
          display='flex'
          alignItems='center'
          flexWrap={isMobile ? "wrap" : "nowrap"}
          gap={3}>
          <Box sx={{ position: "relative", width: 250, height: 150 }}>
            {videoUrl && (
              <video
                ref={videoRef}
                width='250'
                height='150'
                style={{ borderRadius: "15px" }}
                onClick={handleTogglePlay}
                controls={isPlayingVideo}
                onEnded={() => setIsPlayingVideo(false)}>
                <source src={videoUrl} />
                Trình duyệt của bạn không hỗ trợ video HTML5.
              </video>
            )}
            {!isPlayingVideo && (
              <Box
                onClick={handleTogglePlay}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}>
                <Box
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  width='50px'
                  height='50px'
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid white",
                    background: "rgba(0,0,0,.5)",
                  }}>
                  <RiPlayFill size={40} color='white' />
                </Box>
              </Box>
            )}
          </Box>
          {dialogueData?.voice?.url && (
            <Box
              sx={{
                border: "1px solid rgba(139, 139, 168, 1)",
                borderRadius: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "5px 8px",
                gap: 1,
              }}>
              <img src={voice_high} alt='' />
              <Typography color='rgba(139, 139, 168, 1)'>
                {dialogueData?.voice?.delay || 0}s
              </Typography>
            </Box>
          )}
          {selectedCharacter &&
            characters.find((item) => item.id === selectedCharacter) && (
              <Box
                sx={{
                  border: "1px solid rgba(139, 139, 168, 1)",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px 8px",
                  width: "max-content",
                }}>
                <Typography>
                  {
                    characters.find((item) => item.id === selectedCharacter)
                      ?.value
                  }
                </Typography>
              </Box>
            )}
          <Box
            sx={{
              border: "1px solid rgba(139, 139, 168, 1)",
              borderRadius: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px 8px",
            }}>
            <img src={speed} alt='' />
            <Typography color='rgba(139, 139, 168, 1)'>
              {Math.floor(readingSpeed)}x
            </Typography>
          </Box>
          <IconButton onClick={() => setOpen(!open)}>
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
            Lời thoại
          </Typography>
          <TextField
            fullWidth
            placeholder='Nhập lời thoại'
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
                  onChange={(e) => setSelectedModel(e.target.value)}
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
                    <MenuItem key={m.id} value={m.id}>
                      {m.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "white" }}>Giọng đọc</InputLabel>
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
                  label='Giọng đọc'>
                  {voices.length > 0 ? (
                    voices.map((voice) => (
                      <MenuItem key={voice.id} value={voice.id}>
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
                <InputLabel sx={{ color: "white" }}>Nhân vật</InputLabel>
                <Select
                  value={selectedCharacter}
                  onChange={(e) => setSelectedCharacter(e.target.value)}
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
                  {characters.length > 0 ? (
                    characters.map((char) => (
                      <MenuItem key={char.id} value={char.id}>
                        {char.value}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value='' disabled>
                      No characters available
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  placeholder='Thời lượng'
                  label='Độ trễ (s)'
                  variant='outlined'
                  size='small'
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  sx={{
                    backgroundColor: "#1A1836",
                    borderRadius: 2,
                    input: { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
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
              display='flex'
              sx={{ flexDirection: isMobile ? "column" : "row" }}
              justifyContent='space-between'
              alignItems='center'>
              <Box width={isMobile ? "100%" : "60%"}>
                <Typography gutterBottom>Tốc độ đọc</Typography>
                <Slider
                  value={readingSpeed}
                  onChange={(e, newValue) => setReadingSpeed(newValue)}
                  step={0.25}
                  min={0.5}
                  max={3}
                  marks={[
                    { value: 0.5, label: "0.5" },
                    { value: 1, label: "1.0" },
                    { value: 1.5, label: "1.5" },
                    { value: 2, label: "2.0" },
                    { value: 3, label: "3.0" },
                  ]}
                  valueLabelDisplay='auto'
                  sx={{
                    color: "#6b5bfc",
                    "& .MuiSlider-markLabel": { color: "#fff" },
                    "& .MuiSlider-valueLabel": {
                      backgroundColor: "#6b5bfc",
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
                    px: "&",
                    "&:hover": { background: "#5900cc" },
                    height: "&",
                    fontSize: isMobile ? "13px" : "16px",
                    width: "100%",
                    opacity: loading ? 0.8 : 1,
                    pointerEvents: loading ? "none" : "auto",
                  }}>
                  {loading ? (
                    <Stack direction='row' alignItems='center' spacing={2}>
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
const VoiceScene = ({ model, genScript, setLoading, id }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [values, setValues] = useState(genScript?.script.scenes || []);
  const navigate = useNavigate();
  useEffect(() => {
    if (genScript) {
      const scenesData = genScript?.script.scenes || [];
      localStorage.setItem("gen_script", JSON.stringify(genScript));
      setValues(scenesData);
    }
  }, [genScript]);
  return (
    <Box sx={{ p: isMobile ? 2 : 4, color: "#fff", background: "#0D0C2B" }}>
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
          onClick={async () => {
            setLoading(true);
            try {
              // Kiểm tra xem có scene nào thiếu voice hoặc dialogue nào thiếu voice
              const hasMissingVoice = values.some((item) => {
                // Kiểm tra voice của scene
                if (!item.voice) {
                  return true;
                }
                // Kiểm tra voice của từng dialogue trong scene
                if (item.dialogue && item.dialogue.length > 0) {
                  return item.dialogue.some((dialogue) => !dialogue.voice);
                }
                return false;
              });

              if (hasMissingVoice) {
                toast.warning("Cần tạo đủ voice cho tất cả scene và dialogue");
                setLoading(false);
                return;
              }

              const result = await updateProject(id, {
                current_step: "gen_voice",
                script: {
                  ...genScript.script,
                  scenes: values.map((item) => ({
                    ...item,
                    voice: item.voice,
                    dialogue: item.dialogue.map((ix) => {
                      delete ix.text;
                      return ix;
                    }),
                  })),
                },
              });

              if (result && result.name) {
                localStorage.setItem("gen_script", JSON.stringify(result));
                setTimeout(() => {
                  navigate(`/sub?id=${id}`);
                }, 500);
              } else {
                throw new Error("Cập nhật dự án thất bại");
              }
            } catch (error) {
              console.error("Lỗi khi cập nhật dự án:", error);
              toast.error("Cập nhật dự án thất bại");
            }
            setLoading(false);
          }}
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
