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
  { label: "Voice", status: "pending" },
];
const modelOptions1 = ["Klling", "FramePack", "Wan"];
const modelOptions2 = [
  "1920x1080 (16:9)",
  "1280x720 (16:9)",
  "1024x1024 (1:1)",
];

const CreateVideoView = ({ genScript, setLoading, modelList, id }: any) => {
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
      <ResponsiveBox
        selectedTab={selectedTab}
        onTabChange={(index) => setSelectedTab(index)}
      />
      <Box display={"flex"} gap={3}>
        <FormControl variant='outlined' size='small'>
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
            }}>
            {modelList.map((option) => (
              <MenuItem key={option.key} value={option.key}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='outlined' size='small'>
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
            }}>
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
      />
    </Box>
  );
};

export default CreateVideoView;

import { IconButton, Card, CardMedia, Grid, Stack } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { RiPlayFill, RiRefreshLine } from "react-icons/ri";
import ResponsiveBox from "../../components/ResponsiveBox";
import { useNavigate } from "react-router-dom";
import {
  genScriptVideo,
  genScriptVideoStatus,
  updateProject,
} from "../../service/project";

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

const SceneCard = forwardRef((props, ref) => {
  const { scene, values, setValues, model, px }: any = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const sceneData = values.find((v) => v.scene === scene);

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
    if (fileImage) {
      formData.append("input_image_file", fileImage);
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
      }}>
      <Stack spacing={2}>
        <Stack direction='row' gap={"30px"} alignItems='center'>
          <Typography
            variant='h6'
            fontSize={{ xs: ".9rem", md: "1.25rem" }}
            color='white'>
            Phân cảnh {sceneData.scene}:
          </Typography>
          {sceneData.video.ids && (
            <Button
              startIcon={<RiRefreshLine />}
              onClick={() => genImage()}
              size='small'
              sx={{
                borderRadius: 1,
                background: "rgba(89, 50, 234, 1)",
                fontSize: isMobile ? "0.675rem" : "0.875rem",
                opacity: loading ? 0.8 : 1,
                pointerEvents: loading ? "none" : "unset",
              }}
              variant='contained'>
              {loading ? (
                <Stack direction='row' alignItems='center' spacing={1}>
                  <CircularProgress size={16} color='inherit' />
                  <span>Đang tạo video...</span>
                </Stack>
              ) : (
                "Tạo lại video"
              )}
            </Button>
          )}
        </Stack>

        <Box position='relative'>
          <TextField
            multiline
            fullWidth
            minRows={2}
            maxRows={5}
            value={sceneData.video.prompt}
            onChange={(e) => handleChange("prompt", e.target.value)}
            variant='outlined'
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
            size='small'>
            <EditIcon fontSize='small' />
          </IconButton>
        </Box>

        <Box sx={{ margin: "30px 0 !important" }}>
          <Grid container gap={isMobile ? 2 : 2}>
            {sceneData.video.imageUrls?.length > 0 ? (
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
                      md={6}>
                      <>
                        <Box
                          height={isMobile ? "150px" : "250px"}
                          sx={{
                            objectFit: "cover",
                            borderRadius: 1,
                            border: selected ? "3px solid green" : "none",
                          }}>
                          <video
                            width='100%'
                            height={"100%"}
                            controls
                            src={item}>
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
                md={6}>
                <Card
                  sx={{
                    bgcolor: "#292a45",
                    height: isMobile ? 150 : 250,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}>
                  <Button
                    onClick={() => genImage()}
                    variant='contained'
                    sx={{
                      background: "rgba(89, 50, 234, 1)",
                      borderRadius: 1,
                      fontSize: isMobile ? "0.675rem" : "0.875rem",
                      minWidth: isMobile ? 120 : 150,
                      height: 36,
                      opacity: loading ? 0.8 : 1,
                      pointerEvents: loading ? "none" : "unset",
                    }}>
                    {loading ? (
                      <Stack direction='row' alignItems='center' spacing={1}>
                        <CircularProgress size={16} color='inherit' />
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
        </Box>

        <Box>
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
        </Box>
      </Stack>
    </Box>
  );
});

function SceneEditor({ genScript, model, px, setLoading, id }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const [values, setValues] = useState(genScript?.script.scenes || []);
  useEffect(() => {
    if (genScript) {
      const scenesData = genScript?.script.scenes || [];
      localStorage.setItem("gen_script", JSON.stringify(genScript));
      setValues(scenesData);
    }
  }, [genScript]);
  return (
    <Box sx={{ minHeight: "100vh", pb: 3 }}>
      {values &&
        values.length &&
        values.map((s, idx) => (
          <SceneCard
            key={idx}
            scene={s.scene}
            values={values}
            setValues={setValues}
            model={model}
            px={px}
          />
        ))}

      <Box textAlign='center'>
        <Box
          paddingBottom={4}
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            mt: 2,
            justifyContent: "center",
          }}>
          <Button
            variant='contained'
            onClick={async () => {
              setLoading(true);
              try {
                const result = await updateProject(id, {
                  current_step: "gen_video",
                  script: {
                    ...genScript.script,
                    scenes: values.map((item) => {
                      return {
                        ...item,
                        video: {
                          ...item.video,
                          id: item.video && item.video.ids[item.video.selected],
                          url:
                            item.video &&
                            item.video.imageUrls[item.video.selected],
                        },
                      };
                    }),
                  },
                });
                if (result && result.name) {
                  localStorage.setItem("gen_script", JSON.stringify(result));
                  // setTimeout(() => {
                  //   navigate(`/create-video?id=${id}`);
                  // }, 500);
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
            }}>
            Xác nhận tạo xong
          </Button>

          <Button
            variant='contained'
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
            }}>
            Tải hàng loạt (2)
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
