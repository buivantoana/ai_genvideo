import React, { forwardRef, useEffect, useRef, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import StepComponent from "../../components/StepComponent";
import EditIcon from "@mui/icons-material/Edit";
import group from "../../images/Group 13.png";
import download from "../../images/maximize-3.png";

import image from "../../images/adbe6e126ef5ad889784e0f288edfd8329fed5c7.png";
import image1 from "../../images/bf053d80d9782e45442f9fd54f729b5a17616751.png";
const dynamicSteps = [
  { label: "Ý tưởng", status: "completed" },
  { label: "Tạo kịch bản", status: "completed" },
  { label: "Tạo ảnh", status: "completed" },
  { label: "Tạo Video", status: "active" },
  { label: "Tạo Voice", status: "pending" },
  { label: "Nhạc nền và sub", status: "pending" },
  { label: "Hoàn thành ", status: "pending" },
];
const modelOptions1 = ["Klling", "FramePack", "Wan"];
const modelOptions2 = [
  "1920x1080 (16:9)",
  "1280x720 (16:9)",
  "1024x1024 (1:1)",
];

const CreateVideoView = ({
  genScript,
  setLoading,
  modelList,
  id,
  effect,
}: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTab, setSelectedTab]: any = useState(
    genScript && genScript.video_type == "video2video" ? 1 : 0
  );
  const [model, setModel] = useState("framepack");
  const [px, setPx] = useState("1920x1080 (16:9)");
  useEffect(() => {
    if (genScript) {
      setSelectedTab(genScript?.video_type == "video2video" ? 1 : 0);
    }
  }, [genScript]);
  return (
    <Box
      className="hidden-add-voice"
      sx={{
        bgcolor: "#0D0C2B",
        p: isMobile ? 1.5 : 6,

        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 2 : 4,
      }}
    >
      <StepComponent steps={dynamicSteps} />
      {/* Toggle Tabs */}
      {/* <ResponsiveBox
        selectedTab={selectedTab}
        onTabChange={(index) => setSelectedTab(index)}
      /> */}
      <Box display={"flex"} gap={3}>
        <FormControl variant="outlined" size="small">
          <Select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            sx={{
              background: "transparent",
              color: "#fff",
              borderRadius: 2,
              height: "48px",
              width: "max-content", // 👈 Chiều cao mong muốn
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
            }}
          >
            {modelList.map((option) => (
              <MenuItem key={option.key} value={option.key}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <Select
            value={px}
            onChange={(e) => setPx(e.target.value)}
            sx={{
              background: "transparent",
              color: "#fff",
              borderRadius: 2,
              height: "48px",
              width: "max-content", // 👈 Chiều cao mong muốn
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
            }}
          >
            {modelOptions2.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* <Box display={"flex"} alignItems={"center"} gap={"20px"}>
        <Typography variant='h5' fontWeight={"bold"}>
          Tạo phân cảnh
        </Typography>
        <Button
          variant='contained'
          sx={{
            background: " linear-gradient(135deg, #FDD819 0%, #E80505 100%)",
            borderRadius: 1,
          }}>
          Tạo toàn bộ ảnh từ phân cảnh
        </Button>
      </Box> */}
      <SceneEditor
        genScript={genScript}
        model={model}
        px={px}
        setLoading={setLoading}
        id={id}
        effect={effect}
      />
    </Box>
  );
};

export default CreateVideoView;

import { IconButton, Card, CardMedia, Grid, Stack } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { RiArrowRightSLine, RiPlayFill, RiRefreshLine } from "react-icons/ri";
import ResponsiveBox from "../../components/ResponsiveBox";
import { useNavigate } from "react-router-dom";
import {
  genScriptVideo,
  genScriptVideoStatus,
  updateProject,
} from "../../service/project";
import { toast } from "react-toastify";

// const SceneCard = ({ sceneNumber, imageUrl, narrationText, dialogText }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <Box
//       sx={{
//         borderRadius: 2,
//         mb: 4,
//       }}>
//       <Stack spacing={2}>
//         <Stack direction='row' gap={"30px"} alignItems='center'>
//           <Typography variant='h6' color='white'>
//             Video phân cảnh {sceneNumber}:
//           </Typography>
//           <Button
//             startIcon={<RiRefreshLine />}
//             size='small'
//             sx={{ borderRadius: 1, background: "rgba(89, 50, 234, 1)" }}
//             variant='contained'>
//             Tạo lại video
//           </Button>
//         </Stack>

//         <Box position='relative'>
//           <TextField
//             multiline
//             fullWidth
//             minRows={2}
//             maxRows={5}
//             value={narrationText}
//             variant='outlined'
//             sx={{
//               "& .MuiOutlinedInput-notchedOutline": {
//                 border: "2px solid",
//                 borderColor: "#414188",
//               },
//             }}
//             InputProps={{
//               style: {
//                 backgroundColor: "#1A1836",
//                 color: "#fff",
//                 borderRadius: 10,
//               },
//             }}
//           />
//           <IconButton
//             sx={{
//               position: "absolute",
//               top: 8,
//               right: 8,
//               color: "#A3A4B5",
//             }}>
//             <EditIcon fontSize='small' />
//           </IconButton>
//         </Box>

//         <Box
//           sx={{
//             margin: "30px 0 !important",
//             position: "relative",
//             width: "50%",
//             borderRadius: 1,
//             overflow: "hidden",
//           }}>
//           <Box
//             sx={{
//               position: "absolute",
//               bottom: 15,
//               right: 15,
//               width: isMobile ? "25px" : "unset",
//             }}>
//             <img src={download} width={isMobile ? "100%" : "unset"} alt='' />
//           </Box>
//           <Box
//             sx={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}>
//             <Box
//               display={"flex"}
//               justifyContent={"center"}
//               alignItems={"center"}
//               width={"50px"}
//               height={"50px"}
//               sx={{
//                 borderRadius: "50%",
//                 border: "1px solid white",
//                 background: "rgba(0,0,0,.5)",
//               }}>
//               <RiPlayFill size={40} />
//             </Box>
//           </Box>
//           <img
//             src={imageUrl}
//             width={"100%"}
//             style={{ borderRadius: "8px" }}
//             height={"100%"}
//             alt=''
//           />
//         </Box>

//         <Box>
//           <Typography
//             variant='subtitle1'
//             sx={{ fontStyle: "italic" }}
//             color='white'
//             gutterBottom>
//             Lời thoại/narration:
//           </Typography>
//           <ul>
//             <li style={{ color: "rgba(139, 139, 168, 1)", marginLeft: "50px" }}>
//               <Typography> {dialogText}</Typography>
//             </li>
//           </ul>
//         </Box>
//       </Stack>
//     </Box>
//   );
// };
let durationData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const SceneCard = forwardRef((props, ref) => {
  const { scene, values, setValues, model, px, effect }: any = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [selectedEffect, setSelectedEffect] = useState(
    effect && effect.length > 0 && effect[0].id
  );
  const [duration, setDuration] = useState(1);
  const sceneData = values.find((v) => v.scene === scene);
  useEffect(() => {
    if (sceneData && Object.keys(sceneData).length > 0 && sceneData.video.id) {
      setSelectedEffect(sceneData.video.effect);
    } else {
      setSelectedEffect(effect && effect.length > 0 && effect[0].id);
    }
  }, [effect]);
  useEffect(() => {
    if (sceneData && Object.keys(sceneData).length > 0 && sceneData.video.id) {
      setDuration(sceneData.video.duration);
    } else {
      setDuration(``);
    }
  }, [duration]);
  const handleChange = (field, value) => {
    setValues((prev) =>
      prev.map((item) =>
        item.scene === scene
          ? {
              ...item,
              image: {
                ...item.image,
                [field]: value,
              },
            }
          : item
      )
    );
  };

  const handleSelectedImage = (index) => {
    setValues((prev) =>
      prev.map((item) =>
        item.scene === scene
          ? {
              ...item,
              video: {
                ...item.video,
                selected: index,
              },
            }
          : item
      )
    );

    let script: any = localStorage.getItem("gen_script");
    if (script) {
      script = JSON.parse(script);
      script.script.scenes = script.script.scenes.map((item) =>
        item.scene === scene
          ? {
              ...item,
              video: {
                ...item.video,
                selected: index,
              },
            }
          : item
      );
      localStorage.setItem("gen_script", JSON.stringify(script));
    }
  };

  const genImage = async (fileImage = null) => {
    if (fileImage) {
      setLoadingUpload(true);
    } else {
      setLoading(true);
    }
    const [width, height] = px.split(" ")[0].split("x").map(Number);
    let formData = new FormData();
    formData.append("width", width);
    formData.append("height", height);
    formData.append("prompt", sceneData.video.prompt);
    formData.append("n_prompt", sceneData.video.n_prompt);
    formData.append("model", model);
    if (sceneData && sceneData.image && sceneData.image.url) {
      formData.append("input_image_url", sceneData.image.url);
    }
    try {
      let result = await genScriptVideo(formData);

      if (result && result.code === 2) {
        const poll = setInterval(async () => {
          const status = await genScriptVideoStatus(result.id);
          if (status?.code === 0 && status?.video_url) {
            let script: any = localStorage.getItem("gen_script");
            if (script) {
              script = JSON.parse(script);
              script.script.scenes = values.map((item) => {
                if (item.scene == scene) {
                  return {
                    ...item,
                    video: {
                      ...item.video,
                      ids: [...(item.video.ids || []), result.id],
                      imageUrls: [
                        ...(item.video.imageUrls || []),
                        status.video_url,
                      ],
                      selected:
                        (item.video.imageUrls?.length || 0) === 0
                          ? 0
                          : item.video.selected,
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
                      video: {
                        ...item.video,
                        ids: [...(item.video.ids || []), result.id],
                        imageUrls: [
                          ...(item.video.imageUrls || []),
                          status.video_url,
                        ],
                        selected:
                          (item.video.imageUrls?.length || 0) === 0
                            ? 0
                            : item.video.selected,
                      },
                    }
                  : item
              )
            );
            if (fileImage) {
              setLoadingUpload(false);
            } else {
              setLoading(false);
            }
            clearInterval(poll);
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
                video: {
                  ...item.video,
                  ids: [...(item.video.ids || []), result.id],
                  imageUrls: [
                    ...(item.video.imageUrls || []),
                    result.video_url,
                  ],
                  selected:
                    (item.video.imageUrls?.length || 0) === 0
                      ? 0
                      : item.video.selected,
                },
              };
            }
            return item;
          });
          localStorage.setItem("gen_script", JSON.stringify(script));
        }
        const newImageUrl = result?.video_url || "";
        setValues((prev) =>
          prev.map((item) =>
            item.scene === scene
              ? {
                  ...item,
                  video: {
                    ...item.video,
                    ids: [...(item.video.ids || []), result.id],
                    imageUrls: [...(item.video.imageUrls || []), newImageUrl],
                    selected:
                      (item.video.imageUrls?.length || 0) === 0
                        ? 0
                        : item.video.selected,
                  },
                }
              : item
          )
        );
        if (fileImage) {
          setLoadingUpload(false);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Lỗi khi tạo ảnh:", error);
      if (fileImage) {
        setLoadingUpload(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);
  return (
    <Box
      sx={{
        borderRadius: 2,
        mb: 4,
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" gap={"30px"} alignItems="center">
          <Typography
            variant="h6"
            fontSize={{ xs: ".9rem", md: "1.25rem" }}
            color="white"
          >
            Phần lời kể:
          </Typography>
          {sceneData?.video?.imageUrls?.length > 0 && (
            <Button
              startIcon={loading ? <></> : <RiRefreshLine />}
              onClick={() => genImage()}
              size="small"
              sx={{
                borderRadius: 1,
                background: "rgba(89, 50, 234, 1)",
                fontSize: isMobile ? "0.675rem" : "0.875rem",
                opacity: loading ? 0.8 : 1,
                pointerEvents: loading ? "none" : "unset",
              }}
              variant="contained"
            >
              {loading ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircularProgress size={16} color="inherit" />
                  <span>Đang tạo video...</span>
                </Stack>
              ) : (
                "Tạo lại video"
              )}
            </Button>
          )}
        </Stack>

        <Typography mb={2}>Prompt:</Typography>
        <Box position="relative">
          <TextField
            multiline
            fullWidth
            minRows={2}
            maxRows={5}
            value={sceneData?.video?.prompt}
            onChange={(e) => handleChange("prompt", e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "#414188",
              },
              fontSize: "11px",
              opacity: !isEditing ? 0.7 : 1,
            }}
            InputProps={{
              readOnly: !isEditing,
              style: {
                backgroundColor: "#1A1836",
                color: "#fff",
                borderRadius: 10,
              },
            }}
          />
          <IconButton
            onClick={() => setIsEditing(!isEditing)}
            sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography mb={2}>Negative Prompt:</Typography>
        <Box position="relative">
          <TextField
            multiline
            fullWidth
            minRows={2}
            maxRows={5}
            value={sceneData?.video?.n_prompt}
            onChange={(e) => handleChange("n_prompt", e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "#414188",
              },
              fontSize: "11px",
              opacity: !isEditing ? 0.7 : 1,
            }}
            InputProps={{
              readOnly: !isEditing,
              style: {
                backgroundColor: "#1A1836",
                color: "#fff",
                borderRadius: 10,
              },
            }}
          />
          <IconButton
            onClick={() => setIsEditing(!isEditing)}
            sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ margin: "30px 0 !important" }}>
          <Grid container gap={isMobile ? 2 : 2}>
            {sceneData?.video?.imageUrls?.length > 0 ? (
              <>
                {sceneData.video.imageUrls.map((item, index) => {
                  let selected = sceneData.video.selected == index;
                  return (
                    <Grid
                      onClick={() => handleSelectedImage(index)}
                      item
                      xs={5}
                      sx={{
                        mr: isMobile ? "0px" : "20px",
                        display: "flex",
                        gap: "10px",
                      }}
                      sm={4}
                      md={6}
                    >
                      <>
                        <Box
                          height={isMobile ? "150px" : "250px"}
                          sx={{
                            objectFit: "cover",
                            borderRadius: 1,
                            border: selected ? "3px solid green" : "none",
                          }}
                        >
                          <video
                            width="100%"
                            height={"100%"}
                            controls
                            src={item}
                          >
                            Trình duyệt của bạn không hỗ trợ video.
                          </video>
                        </Box>
                      </>
                    </Grid>
                  );
                })}{" "}
              </>
            ) : (
              <Grid
                item
                xs={5}
                sx={{ mr: isMobile ? "0px" : "20px" }}
                sm={4}
                md={6}
              >
                <Card
                  sx={{
                    bgcolor: "#292a45",
                    height: isMobile ? 150 : 250,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  <Button
                    onClick={() => genImage()}
                    variant="contained"
                    sx={{
                      background: "rgba(89, 50, 234, 1)",
                      borderRadius: 1,
                      fontSize: isMobile ? "0.675rem" : "0.875rem",
                      minWidth: isMobile ? 120 : 150,
                      height: 36,
                      opacity: loading ? 0.8 : 1,
                      pointerEvents: loading ? "none" : "unset",
                    }}
                  >
                    {loading ? (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CircularProgress size={16} color="inherit" />
                        <span>Đang tạo video...</span>
                      </Stack>
                    ) : (
                      "Xác nhận tạo video"
                    )}
                  </Button>
                </Card>
              </Grid>
            )}
          </Grid>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box display={"flex"} mt={2} alignItems={"center"} gap={2}>
              <Typography variant="h6"> Thời lượng (s)</Typography>
              <FormControl variant="outlined" size="small">
                <Select
                  value={duration}
                  onChange={(e) => {
                    let script: any = localStorage.getItem("gen_script");
                    if (script) {
                      script = JSON.parse(script);
                      script.script.scenes = values.map((item) => {
                        if (item.scene == scene) {
                          return {
                            ...item,
                            video: {
                              ...item.video,
                              duration: e.target.value,
                            },
                          };
                        }
                        return item;
                      });
                      localStorage.setItem(
                        "gen_script",
                        JSON.stringify(script)
                      );
                    }
                    setValues((prev) =>
                      prev.map((item) =>
                        item.scene === scene
                          ? {
                              ...item,
                              video: {
                                ...item.video,
                                duration: e.target.value,
                              },
                            }
                          : item
                      )
                    );
                    setDuration(e.target.value);
                  }}
                  sx={{
                    background: "#6E00FF",
                    border: "none",
                    color: "#fff",
                    borderRadius: 2,
                    height: "48px",
                    width: "max-content", // 👈 Chiều cao mong muốn
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
                  }}
                >
                  {durationData.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box display={"flex"} mt={2} alignItems={"center"} gap={2}>
              <Typography variant="h6"> Hiệu ứng chuyển cảnh</Typography>
              <FormControl variant="outlined" size="small">
                <Select
                  value={selectedEffect}
                  onChange={(e) => {
                    let script: any = localStorage.getItem("gen_script");
                    if (script) {
                      script = JSON.parse(script);
                      script.script.scenes = values.map((item) => {
                        if (item.scene == scene) {
                          return {
                            ...item,
                            video: {
                              ...item.video,
                              effect: e.target.value,
                            },
                          };
                        }
                        return item;
                      });
                      localStorage.setItem(
                        "gen_script",
                        JSON.stringify(script)
                      );
                    }
                    setValues((prev) =>
                      prev.map((item) =>
                        item.scene === scene
                          ? {
                              ...item,
                              video: {
                                ...item.video,
                                effect: e.target.value,
                              },
                            }
                          : item
                      )
                    );
                    setSelectedEffect(e.target.value);
                  }}
                  sx={{
                    background: "#6E00FF",
                    border: "none",
                    color: "#fff",
                    borderRadius: 2,
                    height: "48px",
                    width: "max-content", // 👈 Chiều cao mong muốn
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
                  }}
                >
                  {effect.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        {/* <Box>
          <Typography
            variant='subtitle1'
            sx={{ fontStyle: "italic" }}
            color='white'
            gutterBottom>
            Lời thoại/narration:
          </Typography>
          <ul>
            <li style={{ color: "rgba(139, 139, 168, 1)", marginLeft: "50px" }}>
              <Typography> {sceneData.video.n_prompt}</Typography>
            </li>
          </ul>
        </Box> */}
        {sceneData &&
          sceneData.dialogue &&
          sceneData.dialogue.length > 0 &&
          sceneData.dialogue.map((dialogue, idx) => (
            <SceneCardDialogue
              key={idx}
              index={idx}
              parentScene={scene} // truyền scene cha
              values={values}
              setValues={setValues}
              model={model}
              px={px}
              effect={effect}
            />
          ))}
      </Stack>
    </Box>
  );
});
const SceneCardDialogue = forwardRef((props, ref) => {
  const {
    scene,
    values,
    setValues,
    model,
    px,
    index,
    parentScene,
    effect,
  }: any = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [selectedEffect, setSelectedEffect] = useState(
    effect && effect.length > 0 && effect[0].id
  );
  const [duration, setDuration] = useState(1);
  const parentSceneData = values.find((v) => v.scene === parentScene);
  // Lấy dialogue item dựa vào index
  const dialogueItem = parentSceneData?.dialogue?.[index] || {};
  useEffect(() => {
    if (
      dialogueItem &&
      Object.keys(dialogueItem).length > 0 &&
      dialogueItem.video.id
    ) {
      setDuration(dialogueItem.video.duration);
    } else {
      setDuration(1);
    }
  }, [duration]);

  useEffect(() => {
    if (
      dialogueItem &&
      Object.keys(dialogueItem).length > 0 &&
      dialogueItem.video.id
    ) {
      setSelectedEffect(dialogueItem.video.effect);
    } else {
      setSelectedEffect(effect && effect.length > 0 && effect[0].id);
    }
  }, [effect]);

  const handleChange = (field, value) => {
    setValues((prev) =>
      prev.map((item) =>
        item.scene === parentScene
          ? {
              ...item,
              dialogue: item.dialogue.map((d, i) =>
                i === index
                  ? {
                      ...d,
                      image: {
                        ...d.image,
                        [field]: value,
                      },
                    }
                  : d
              ),
            }
          : item
      )
    );
  };

  const handleSelectedImage = (selectedIndex) => {
    setValues((prev) =>
      prev.map((item) =>
        item.scene === parentScene
          ? {
              ...item,
              dialogue: item.dialogue.map((d, i) =>
                i === index
                  ? {
                      ...d,
                      video: {
                        ...d.video,
                        selected:
                          d.video?.selected === selectedIndex
                            ? null
                            : selectedIndex,
                      },
                    }
                  : d
              ),
            }
          : item
      )
    );

    // Cập nhật localStorage
    let script: any = localStorage.getItem("gen_script");
    if (script) {
      script = JSON.parse(script);
      script.script.scenes = script.script.scenes.map((item) =>
        item.scene === parentScene
          ? {
              ...item,
              dialogue: item.dialogue.map((d, i) =>
                i === index
                  ? {
                      ...d,
                      video: {
                        ...d.video,
                        selected:
                          d.video?.selected === selectedIndex
                            ? null
                            : selectedIndex,
                      },
                    }
                  : d
              ),
            }
          : item
      );
      localStorage.setItem("gen_script", JSON.stringify(script));
    }
  };

  const genImage = async (fileImage = null) => {
    if (fileImage) {
      setLoadingUpload(true);
    } else {
      setLoading(true);
    }

    let image = dialogueItem?.video;
    if (
      image &&
      typeof image.selected === "number" &&
      image?.imageUrls &&
      image.imageUrls.length > 0
    ) {
      image = image.imageUrls[image.selected];
    }

    const [width, height] = px.split(" ")[0].split("x").map(Number);
    let formData = new FormData();
    formData.append("width", width);
    formData.append("height", height);
    formData.append("prompt", dialogueItem.video?.prompt || "");
    formData.append("n_prompt", dialogueItem.video?.n_prompt || "");
    formData.append("model", model);
    if (dialogueItem && dialogueItem.image && dialogueItem.image.url) {
      formData.append("input_image_url", dialogueItem.image.url);
    }
    try {
      let result = await genScriptVideo(formData);

      if (result && result.code === 2) {
        const poll = setInterval(async () => {
          const status = await genScriptVideoStatus(result.id);
          if (status?.code === 0 && status?.video_url) {
            // Cập nhật state và localStorage
            setValues((prev) =>
              prev.map((item) =>
                item.scene === parentScene
                  ? {
                      ...item,
                      dialogue: item.dialogue.map((d, i) =>
                        i === index
                          ? {
                              ...d,
                              video: {
                                ...d.video,
                                ids: [...(d.video?.ids || []), result.id],
                                imageUrls: [
                                  ...(d.video?.imageUrls || []),
                                  status.video_url,
                                ],
                                selected:
                                  (d.video?.imageUrls?.length || 0) === 0
                                    ? 0
                                    : d.video?.selected,
                              },
                            }
                          : d
                      ),
                    }
                  : item
              )
            );

            // Cập nhật localStorage
            let script: any = localStorage.getItem("gen_script");
            if (script) {
              script = JSON.parse(script);
              script.script.scenes = script.script.scenes.map((item) =>
                item.scene === parentScene
                  ? {
                      ...item,
                      dialogue: item.dialogue.map((d, i) =>
                        i === index
                          ? {
                              ...d,
                              video: {
                                ...d.video,
                                ids: [...(d.video?.ids || []), result.id],
                                imageUrls: [
                                  ...(d.video?.imageUrls || []),
                                  status.video_url,
                                ],
                                selected:
                                  (d.video?.imageUrls?.length || 0) === 0
                                    ? 0
                                    : d.video?.selected,
                              },
                            }
                          : d
                      ),
                    }
                  : item
              );
              localStorage.setItem("gen_script", JSON.stringify(script));
            }

            if (fileImage) {
              setLoadingUpload(false);
            } else {
              setLoading(false);
            }
            clearInterval(poll);
          }
        }, 2000);
        setIntervalId(poll);
      } else if (result.code === 0) {
        // Fallback không cần chờ status
        setValues((prev) =>
          prev.map((item) =>
            item.scene === parentScene
              ? {
                  ...item,
                  dialogue: item.dialogue.map((d, i) =>
                    i === index
                      ? {
                          ...d,
                          video: {
                            ...d.video,
                            ids: [...(d.video?.ids || []), result.id],
                            imageUrls: [
                              ...(d.video?.imageUrls || []),
                              result.video_url,
                            ],
                            selected:
                              (d.video?.imageUrls?.length || 0) === 0
                                ? 0
                                : d.video?.selected,
                          },
                        }
                      : d
                  ),
                }
              : item
          )
        );

        // Cập nhật localStorage
        let script: any = localStorage.getItem("gen_script");
        if (script) {
          script = JSON.parse(script);
          script.script.scenes = script.script.scenes.map((item) =>
            item.scene === parentScene
              ? {
                  ...item,
                  dialogue: item.dialogue.map((d, i) =>
                    i === index
                      ? {
                          ...d,
                          video: {
                            ...d.video,
                            ids: [...(d.video?.ids || []), result.id],
                            imageUrls: [
                              ...(d.video?.imageUrls || []),
                              result.video_url,
                            ],
                            selected:
                              (d.video?.imageUrls?.length || 0) === 0
                                ? 0
                                : d.video?.selected,
                          },
                        }
                      : d
                  ),
                }
              : item
          );
          localStorage.setItem("gen_script", JSON.stringify(script));
        }

        if (fileImage) {
          setLoadingUpload(false);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Lỗi khi tạo ảnh:", error);
      if (fileImage) {
        setLoadingUpload(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  if (!dialogueItem) return null;

  return (
    <Box sx={{ borderRadius: 2, mb: 4 }}>
      <Stack spacing={2}>
        <Stack direction="row" gap={"30px"} alignItems="center">
          <Typography
            variant="h6"
            fontSize={{ xs: ".8rem", md: "1.15rem" }}
            fontStyle={"italic"}
            color="white"
          >
            Lời thoại {index + 1}:
          </Typography>
          {dialogueItem?.video?.imageUrls?.length > 0 && (
            <Button
              startIcon={loading ? <></> : <RiRefreshLine />}
              onClick={() => genImage()}
              size="small"
              sx={{
                borderRadius: 1,
                background: "rgba(89, 50, 234, 1)",
                fontSize: isMobile ? "0.675rem" : "0.875rem",
                opacity: loading ? 0.8 : 1,
                pointerEvents: loading ? "none" : "unset",
              }}
              variant="contained"
            >
              {loading ? (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircularProgress size={16} color="inherit" />
                  <span>Đang tạo video...</span>
                </Stack>
              ) : (
                "Tạo lại video"
              )}
            </Button>
          )}
        </Stack>

        <Typography mb={2}>Prompt:</Typography>
        <Box position="relative">
          <TextField
            multiline
            fullWidth
            minRows={2}
            maxRows={5}
            value={dialogueItem?.video?.prompt}
            onChange={(e) => handleChange("prompt", e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "#414188",
              },
              fontSize: "11px",
              opacity: !isEditing ? 0.7 : 1,
            }}
            InputProps={{
              readOnly: !isEditing,
              style: {
                backgroundColor: "#1A1836",
                color: "#fff",
                borderRadius: 10,
              },
            }}
          />
          <IconButton
            onClick={() => setIsEditing(!isEditing)}
            sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography mb={2}>Negative Prompt:</Typography>
        <Box position="relative">
          <TextField
            multiline
            fullWidth
            minRows={2}
            maxRows={5}
            value={dialogueItem?.video?.n_prompt}
            onChange={(e) => handleChange("n_prompt", e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "#414188",
              },
              fontSize: "11px",
              opacity: !isEditing ? 0.7 : 1,
            }}
            InputProps={{
              readOnly: !isEditing,
              style: {
                backgroundColor: "#1A1836",
                color: "#fff",
                borderRadius: 10,
              },
            }}
          />
          <IconButton
            onClick={() => setIsEditing(!isEditing)}
            sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ margin: "30px 0 !important" }}>
          <Grid container gap={isMobile ? 2 : 2}>
            {dialogueItem?.video?.imageUrls?.length > 0 ? (
              <>
                {dialogueItem.video.imageUrls.map((item, index) => {
                  let selected = dialogueItem.video.selected == index;
                  return (
                    <Grid
                      onClick={() => handleSelectedImage(index)}
                      item
                      xs={5}
                      sx={{
                        mr: isMobile ? "0px" : "20px",
                        display: "flex",
                        gap: "10px",
                      }}
                      sm={4}
                      md={6}
                    >
                      <>
                        <Box
                          height={isMobile ? "150px" : "250px"}
                          sx={{
                            objectFit: "cover",
                            borderRadius: 1,
                            border: selected ? "3px solid green" : "none",
                          }}
                        >
                          <video
                            width="100%"
                            height={"100%"}
                            controls
                            src={item}
                          >
                            Trình duyệt của bạn không hỗ trợ video.
                          </video>
                        </Box>
                      </>
                    </Grid>
                  );
                })}
              </>
            ) : (
              <Grid
                item
                xs={5}
                sx={{ mr: isMobile ? "0px" : "20px" }}
                sm={4}
                md={6}
              >
                <Card
                  sx={{
                    bgcolor: "#292a45",
                    height: isMobile ? 150 : 250,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  <Button
                    onClick={() => genImage()}
                    variant="contained"
                    sx={{
                      background: "rgba(89, 50, 234, 1)",
                      borderRadius: 1,
                      fontSize: isMobile ? "0.675rem" : "0.875rem",
                      minWidth: isMobile ? 120 : 150,
                      height: 36,
                      opacity: loading ? 0.8 : 1,
                      pointerEvents: loading ? "none" : "unset",
                    }}
                  >
                    {loading ? (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CircularProgress size={16} color="inherit" />
                        <span>Đang tạo video...</span>
                      </Stack>
                    ) : (
                      "Xác nhận tạo video"
                    )}
                  </Button>
                </Card>
              </Grid>
            )}
          </Grid>

          <Box sx={{ display: "flex", gap: 4 }}>
            <Box display={"flex"} mt={2} alignItems={"center"} gap={2}>
              <Typography variant="h6"> Thời lượng (s)</Typography>
              <FormControl variant="outlined" size="small">
                <Select
                  value={duration}
                  onChange={(e) => {
                    setValues((prev) =>
                      prev.map((item) =>
                        item.scene === parentScene
                          ? {
                              ...item,
                              dialogue: item.dialogue.map((d, i) =>
                                i === index
                                  ? {
                                      ...d,
                                      video: {
                                        ...d.video,
                                        duration: e.target.value,
                                      },
                                    }
                                  : d
                              ),
                            }
                          : item
                      )
                    );

                    // Cập nhật localStorage
                    let script: any = localStorage.getItem("gen_script");
                    if (script) {
                      script = JSON.parse(script);
                      script.script.scenes = script.script.scenes.map((item) =>
                        item.scene === parentScene
                          ? {
                              ...item,
                              dialogue: item.dialogue.map((d, i) =>
                                i === index
                                  ? {
                                      ...d,
                                      video: {
                                        ...d.video,
                                        duration: e.target.value,
                                      },
                                    }
                                  : d
                              ),
                            }
                          : item
                      );
                      localStorage.setItem(
                        "gen_script",
                        JSON.stringify(script)
                      );
                    }
                    setDuration(e.target.value);
                  }}
                  sx={{
                    background: "#6E00FF",
                    border: "none",
                    color: "#fff",
                    borderRadius: 2,
                    height: "48px",
                    width: "max-content", // 👈 Chiều cao mong muốn
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
                  }}
                >
                  {durationData.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box display={"flex"} mt={2} alignItems={"center"} gap={2}>
              <Typography variant="h6"> Hiệu ứng chuyển cảnh</Typography>
              <FormControl variant="outlined" size="small">
                <Select
                  value={selectedEffect}
                  onChange={(e) => {
                    setValues((prev) =>
                      prev.map((item) =>
                        item.scene === parentScene
                          ? {
                              ...item,
                              dialogue: item.dialogue.map((d, i) =>
                                i === index
                                  ? {
                                      ...d,
                                      video: {
                                        ...d.video,
                                        effect: e.target.value,
                                      },
                                    }
                                  : d
                              ),
                            }
                          : item
                      )
                    );

                    // Cập nhật localStorage
                    let script: any = localStorage.getItem("gen_script");
                    if (script) {
                      script = JSON.parse(script);
                      script.script.scenes = script.script.scenes.map((item) =>
                        item.scene === parentScene
                          ? {
                              ...item,
                              dialogue: item.dialogue.map((d, i) =>
                                i === index
                                  ? {
                                      ...d,
                                      video: {
                                        ...d.video,
                                        effect: e.target.value,
                                      },
                                    }
                                  : d
                              ),
                            }
                          : item
                      );
                      localStorage.setItem(
                        "gen_script",
                        JSON.stringify(script)
                      );
                    }
                    setSelectedEffect(e.target.value);
                  }}
                  sx={{
                    background: "#6E00FF",
                    border: "none",
                    color: "#fff",
                    borderRadius: 2,
                    height: "48px",
                    width: "max-content", // 👈 Chiều cao mong muốn
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
                  }}
                >
                  {effect.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
});

function SceneEditor({ genScript, model, px, setLoading, id, effect }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const [values, setValues] = useState(genScript?.script.scenes || []);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  useEffect(() => {
    if (genScript) {
      const scenesData = genScript?.script.scenes || [];
      localStorage.setItem("gen_script", JSON.stringify(genScript));
      setValues(scenesData);
    }
  }, [genScript]);
  return (
    <Box sx={{ minHeight: "100vh", pb: 3 }}>
      <Box sx={{ display: "flex", gap: 1, mt: 1, mb: 3, overflowX: "auto" }}>
        {values.map((scene, index) => (
          <Box
            key={index}
            onClick={() => {
              // Lưu giá trị hiện tại trước khi chuyển scene

              setCurrentSceneIndex(index);
            }}
            sx={{
              display: "flex",
              alignItems: "start",
              cursor: "pointer",
              gap: 2,
            }}
          >
            <Typography
              fontWeight={index == currentSceneIndex ? "bold" : 500}
              fontSize={isMobile ? "15px" : "20px"}
              sx={{
                position: "relative",
                pb: 1,
                color:
                  index == currentSceneIndex
                    ? "white"
                    : "rgba(255, 255, 255, .6)",
              }}
            >
              Phân cảnh {index + 1}
              <Box
                sx={{
                  position: "absolute",
                  bottom: "0px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: "80%",
                    height: "2px",
                    bgcolor:
                      index == currentSceneIndex
                        ? "rgba(89, 50, 234, 1)"
                        : "unset",
                  }}
                ></Box>
              </Box>
            </Typography>
            {!(index == values.length - 1) && (
              <RiArrowRightSLine size={isMobile ? 20 : 30} />
            )}
          </Box>
        ))}
      </Box>

      <Box>
        {values && values.length > 0 && (
          <SceneCard
            key={currentSceneIndex}
            scene={values[currentSceneIndex].scene}
            values={values}
            setValues={setValues}
            model={model}
            px={px}
            effect={effect}
          />
        )}
        <Box textAlign="center">
          <Box
            paddingBottom={4}
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
              mt: 2,
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={async () => {
                try {
                  // const hasMissingVideos = values.some((item) => {
                  //   // Kiểm tra video chính
                  //   const mainImageMissing =
                  //     !item.video?.imageUrls ||
                  //     typeof item.video.selected !== "number" ||
                  //     !item.video.imageUrls[item.video.selected];

                  //   // Kiểm tra video trong dialogue (nếu có)
                  //   const dialogueVideosMissing = item.dialogue?.some(
                  //     (dialogueItem) => {
                  //       return (
                  //         dialogueItem.video &&
                  //         (!dialogueItem.video.imageUrls ||
                  //           typeof dialogueItem.video.selected !== "number" ||
                  //           !dialogueItem.video.imageUrls[
                  //             dialogueItem.video.selected
                  //           ])
                  //       );
                  //     }
                  //   );

                  //   return mainImageMissing || dialogueVideosMissing;
                  // });

                  // if (hasMissingVideos) {
                  //   toast.warning(
                  //     "Bạn cần tạo Video cho mỗi phân cảnh và dialogue"
                  //   );
                  //   return;
                  // }
                  setLoading(true);
                  const result = await updateProject(id, {
                    current_step: "gen_video",
                    script: {
                      ...genScript.script,
                      scenes: values.map((item) => {
                        const dialogue =
                          item.dialogue?.length > 0
                            ? item.dialogue.map((ix) => {
                                const selected = ix.video?.selected ?? 0;
                                return {
                                  ...ix,
                                  video: {
                                    ...ix.video,
                                    id: ix.video?.ids?.[selected] ?? null,
                                    url:
                                      ix.video?.imageUrls?.[selected] ?? null,
                                  },
                                };
                              })
                            : [];

                        const selected = item.video?.selected ?? 0;

                        return {
                          ...item,
                          dialogue,
                          video: {
                            ...item.video,
                            id: item.video?.ids?.[selected] ?? null,
                            url: item.video?.imageUrls?.[selected] ?? null,
                          },
                        };
                      }),
                    },
                  });

                  if (result && result.name) {
                    localStorage.setItem("gen_script", JSON.stringify(result));
                    setTimeout(() => {
                      navigate(`/narrator?id=${id}`);
                    }, 500);
                  } else {
                    throw new Error("Cập nhật dự án thất bại");
                  }
                } catch (error) {
                  console.log(error);
                }
                setLoading(false);
              }}
              sx={{
                background: "#6E00FF",
                textTransform: "none",
                borderRadius: 1,
                width: isMobile ? "100%" : "38%",
                fontWeight: 600,
                "&:hover": {
                  background: "#5900cc",
                },
                height: isMobile ? 40 : 50,
                fontSize: isMobile ? "15px" : "18px",
              }}
            >
              Xác nhận tạo xong
            </Button>

            <Button
              variant="contained"
              sx={{
                background: "white",
                textTransform: "none",
                borderRadius: 1,
                width: isMobile ? "100%" : "38%",
                fontWeight: 600,
                "&:hover": {
                  background: "white",
                },
                height: isMobile ? 40 : 50,
                fontSize: isMobile ? "15px" : "18px",
                color: "black",
              }}
            >
              Tải hàng loạt (2)
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
