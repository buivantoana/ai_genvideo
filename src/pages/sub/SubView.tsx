import React, { useCallback, useState } from "react";
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
  Card,
  CircularProgress,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import StepComponent from "../../components/StepComponent";
import EditIcon from "@mui/icons-material/Edit";
import group from "../../images/Group 13.png";
import download from "../../images/maximize-3.png";

import image from "../../images/adbe6e126ef5ad889784e0f288edfd8329fed5c7.png";
import image1 from "../../images/A B C.png";
import image2 from "../../images/A B C (1).png";
import image3 from "../../images/AB C.png";

import image4 from "../../images/Group 1171275725.png";
const modelOptions1 = ["Klling", "FramePack", "Wan"];
const modelOptions2 = ["1080p", "720p", "480p"];
const dynamicSteps = [
  { label: "Ý tưởng", status: "completed" },
  { label: "Tạo kịch bản", status: "completed" },
  { label: "Tạo ảnh", status: "completed" },
  { label: "Tạo Video", status: "completed" },
  { label: "Tạo Voice", status: "completed" },
  { label: "Nhạc nền và sub", status: "active" },
  { label: "Hoàn thành", status: "pending" },
];
const SubView = ({ model, genScript, setLoading, id }) => {
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

      <SubtitleSettings
        id={id}
        setLoading={setLoading}
        genScript={genScript}
        model={model}
      />
    </Box>
  );
};

export default SubView;

import {
  Stack,
  IconButton,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import DownloadIcon from "@mui/icons-material/Download";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { RiPlayFill } from "react-icons/ri";

const SubtitleSettings = ({ model, genScript, setLoading, id }) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [on, setOn] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoUrl, setVideoUrl] = useState(
    genScript?.output_video_url ? genScript?.output_video_url : ""
  );
  const [backgroundMusics, setBackgroundMusics] = useState([]);
  const [activeMusicId, setActiveMusicId] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [active, setActive]: any = useState(1);
  const [textTransform, setTextTransform] = useState("normal");
  const [fontFamily, setFontFamily] = useState("SF Pro Display");
  const [subtitleStyle, setSubtitleStyle] = useState("default"); // hoặc 'karaoke'
  const [selectedColor, setSelectedColor]: any = useState([
    "#1b1c34",
    "#ffffff",
  ]);
  console.log("backgroundMusics", backgroundMusics);
  // Thêm nhạc mới
  useEffect(() => {
    if (genScript?.script?.audios) {
      setBackgroundMusics(
        genScript.script.audios.map((item, index) => {
          return {
            ...item,
            index,
          };
        })
      );
    }
    if (genScript?.script?.subtitles) {
      let position = null;
      if (genScript?.script?.subtitles.position == "bottom") {
        position = 1;
      }
      if (genScript?.script?.subtitles.position == "middle") {
        position = 2;
      }
      if (genScript?.script?.subtitles.position == "middle") {
        position = 3;
      }
      if (genScript?.script?.subtitles.position == "top") {
        position = 4;
      }

      setFontFamily(genScript?.script?.subtitles.font);
      setTextTransform(genScript?.script?.subtitles.type);
      setActive(position);
      setSelectedColor([
        genScript?.script?.subtitles.color_base,
        genScript?.script?.subtitles.color_highlight,
      ]);
    } else {
      setActive(0);
    }
  }, [genScript]);
  const handleAddMusic = () => {
    const newMusic = {
      index: backgroundMusics.length,
      id: "",
      url: "",
      prompt: "",
      duration: 10,
      model: model[0]?.id,
      start_time: 0,
      end_time: 10,
    };

    setBackgroundMusics([...backgroundMusics, newMusic]);
    setActiveMusicId(backgroundMusics.length);
    setShowAddDialog(false);
  };

  // Cập nhật nhạc
  const handleUpdateMusic = (updatedMusic) => {
    setBackgroundMusics(
      backgroundMusics.map((music) =>
        music.index === updatedMusic.index ? updatedMusic : music
      )
    );
  };

  // Xóa nhạc
  const handleDeleteMusic = (index) => {
    setBackgroundMusics(
      backgroundMusics.filter((music) => music.index !== index)
    );
    if (activeMusicId === index) {
      setActiveMusicId(null);
    }
  };
  useEffect(() => {
    setVideoUrl(genScript?.output_video_url ? genScript?.output_video_url : "");
  }, [genScript]);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlayingVideo(true);
    } else {
      video.pause();
      setIsPlayingVideo(false);
    }
  };
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Box
      sx={{
        py: { xs: 2, md: 5 },
        color: "white",
      }}>
      <Stack direction={isMobile ? "column" : "row"} spacing={4}>
        {/* Left Side */}
        <Box flex={1}>
          <Typography
            variant='h5'
            fontSize={isMobile ? "1.2rem" : "1.5rem"}
            fontWeight={"bold"}
            mb={2}>
            Dự án: {genScript?.name}
          </Typography>
          <Box
            sx={{
              margin: "30px 0 !important",
              position: "relative",
              width: "100%",
              borderRadius: 1,
              overflow: "hidden",
            }}>
            <Box sx={{ position: "absolute", bottom: 15, right: 15 }}>
              <img src={download} alt='' />
            </Box>
            <Box sx={{ position: "relative", width: "100%" }}>
              {videoUrl && (
                <video
                  ref={videoRef}
                  width='100%'
                  style={{ borderRadius: "15px" }}
                  onClick={handleTogglePlay}
                  controls={isPlayingVideo}
                  onEnded={() => setIsPlayingVideo(false)}
                  onLoadedMetadata={(e) => setDuration(e.target.duration)}
                  onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}>
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
          </Box>

          <Typography
            variant='h6'
            fontSize={isMobile ? "1rem" : "1.25rem"}
            mb={1}>
            Độ dài video tổng
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{
                mb: 1,
                p: 1,
                borderRadius: 1,
                bgcolor: "rgba(29, 29, 65, 1)", // 👈 Cho vào sx
              }}>
              <Typography variant='body2'>{formatTime(currentTime)}</Typography>

              <Box
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: "rgba(217, 217, 217, 1)",
                  position: "relative",
                  width: "80%",
                }}>
                <Box
                  sx={{
                    width: `${(currentTime / duration) * 100 || 0}%`,
                    height: "100%",
                    borderRadius: 3,
                    bgcolor: "rgba(89, 50, 234, 1)",
                    transition: "width 0.1s linear",
                  }}
                />
              </Box>

              <Typography variant='body2'>{formatTime(duration)}</Typography>
            </Box>
            {/* {showMusicUI &&<>{!on ? (
              <><AudioPanel setOn={setOn} /></>
            ) : (
              <MusicPromptUI setOn={setOn} model={model} />
            )}</>} */}
            <Box>
              {backgroundMusics.map((music) => (
                <MusicPromptUI
                  key={music.index}
                  setOn={() => handleDeleteMusic(music.index)}
                  model={model}
                  musicData={music}
                  onUpdateMusic={handleUpdateMusic}
                  onDeleteMusic={handleDeleteMusic}
                  isActive={activeMusicId === music.index}
                  onSetActive={setActiveMusicId}
                  durationVideo={duration}
                />
              ))}
            </Box>
          </Box>
          <Box
            mt={4}
            onClick={handleAddMusic}
            sx={{
              border: "2px dashed #6b5bfc",
              borderRadius: 2,
              p: isMobile ? 1 : 2,
              textAlign: "center",
              cursor: "pointer",
              bgcolor: "rgba(89, 50, 234, 0.3)",
            }}>
            <Button
              startIcon={<AddIcon />}
              sx={{ color: "white", fontSize: isMobile ? "15px" : "20px" }}>
              Thêm nhạc nền
            </Button>
          </Box>
        </Box>

        {/* Right Side */}
        <Box flex={1}>
          <Settings
            active={active}
            fontFamily={fontFamily}
            setSelectedColor={setSelectedColor}
            selectedColor={selectedColor}
            setSubtitleStyle={setSubtitleStyle}
            setFontFamily={setFontFamily}
            subtitleStyle={subtitleStyle}
            setActive={setActive}
            textTransform={textTransform}
            setTextTransform={setTextTransform}
          />
        </Box>
      </Stack>

      <Box mt={6} textAlign='center'>
        <Button
          onClick={async () => {
            setLoading(true);
            try {
              const updatedBackgroundMusics = await Promise.all(
                backgroundMusics.map(async (music) => {
                  // Check if the URL is a blob (from file upload)
                  if (music.url && music.url.startsWith("blob:")) {
                    if (!music.file) {
                      throw new Error("File data missing for uploaded audio");
                    }

                    // Upload the audio file to server
                    const uploadResult = await upload({
                      file: music.file,
                      folder: "audios",
                    });

                    if (!uploadResult || !uploadResult.url) {
                      throw new Error("Failed to upload audio file");
                    }

                    // Return updated music data with server URL
                    return {
                      ...music,
                      start_time:Math.floor(music.start_time),
                      end_time:Math.floor(music.end_time),
                      url: uploadResult.url,
                      id: uploadResult.id,

                    };
                  }
                  return music;
                })
              );
              console.log("updatedBackgroundMusics", updatedBackgroundMusics);
              let body: any = {
                audios: updatedBackgroundMusics,
              };
              if (active != 0) {
                let position = null;
                if (active == 1) {
                  position = "bottom";
                }
                if (active == 2) {
                  position = "middle";
                }
                if (active == 3) {
                  position = "middle";
                }
                if (active == 4) {
                  position = "top";
                }
                body.subtitles = {
                  font: fontFamily,
                  size: 12,
                  color_base: selectedColor[0],
                  color_highlight: selectedColor[1],
                  type: textTransform,
                  position: position,
                };
              }

              let result = await updateProject(id, {
                current_step: "gen_audio_sub",
                script: {
                  ...genScript.script,
                  ...body,
                },
              });
              if (result && result.name) {
                localStorage.setItem("gen_script", JSON.stringify(result));
                setTimeout(() => {
                  navigate(`/success?id=${id}`);
                }, 500);
              } else {
                throw new Error("Cập nhật dự án thất bại");
              }
            } catch (error) {
              console.log(error);
            }
            setLoading(false);
          }}
          variant='contained'
          sx={{
            bgcolor: "#6b5bfc",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 2,
            px: 4,
            py: 1.5,
            width: isMobile ? "100%" : "30%",
            height: isMobile ? 40 : 50,
          }}>
          Bước tiếp theo
        </Button>
      </Box>
    </Box>
  );
};

import { Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
import iconNoSub from "../../images/message-remove.png";
import {
  ArrowDropUp,
  Delete,
  ExpandLess,
  ExpandMore,
  PlayArrow,
  VolumeDown,
  VolumeUp,
} from "@mui/icons-material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
const Settings = ({
  active,
  setActive,
  textTransform,
  setTextTransform,
  fontFamily,
  setFontFamily,
  subtitleStyle,
  setSubtitleStyle,
  selectedColor,
  setSelectedColor,
}) => {
  const isMobile = useMediaQuery("(max-width:768px)");

  const colorOptions1 = [
    ["#1b1c34", "#ffffff"],
    ["#000000", "#ffffff"],
    ["#00FF00", "#000000"],
    ["#FFD600", "#000000"],
  ];
  const colorOptions2 = [
    ["#ffffff", "#000000"],
    ["#00ffc8", "#000000"],
    ["#3d3dff", "#ffffff"],
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: "white",
        px: isMobile ? 2 : 4,
      }}>
      <Box sx={{}}>
        <Stack spacing={3}>
          {/* Toggle Sub Display Styles */}
          <Box>
            <Typography variant='body1' mb={1}>
              Chọn hiển thị phụ đề
            </Typography>
            <Stack direction='row' spacing={2}>
              {[0, 1, 2, 3, 4].map((i, index) => {
                if (index == 0) {
                  return (
                    <Box
                      key={i}
                      onClick={() => setActive(index)}
                      sx={{
                        width: "24%",
                        height: isMobile ? 100 : 150,
                        borderRadius: 2,
                        border: i === active ? "2px solid #00ffae" : "unset",
                        bgcolor: "rgba(55, 55, 104, 1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}>
                      <img src={iconNoSub} alt='' />
                    </Box>
                  );
                }
                return (
                  <Box
                    key={i}
                    onClick={() => setActive(index)}
                    sx={{
                      width: "24%",
                      height: isMobile ? 100 : 150,
                      borderRadius: 2,
                      border: i === active ? "2px solid #00ffae" : "unset",
                      bgcolor: "rgba(55, 55, 104, 1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}>
                    <Box
                      sx={{
                        width: "80%",
                        height: "2vh",
                        bgcolor: "rgba(152, 152, 219, 1)",
                        borderRadius: 1,
                        position: "absolute",
                        bottom: isMobile ? 10 * index * 1.6 : 10 * index * 3.2,
                      }}
                    />
                  </Box>
                );
              })}
            </Stack>
          </Box>

          {/* <Box display={"flex"} justifyContent={"space-between"}>
            <RadioControl label='Hiện thị phụ đề' defaultValue='yes' />
            <RadioControl label='Nhạc nền' defaultValue='yes' />
          </Box> */}
          {active != 0 && (
            <Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"end"}>
                <RadioControl
                  label='Kiểu chữ'
                  defaultValue='normal'
                  onChange={(val) => setTextTransform(val)}
                  options={[
                    ["normal", "Chữ thường"],
                    ["upper", "Chữ hoa"],
                  ]}
                />
                <FormControl sx={{ mb: "14px" }} fullWidth>
                  <InputLabel sx={{ color: "#aaa" }}>Font chữ</InputLabel>
                  <Select
                    defaultValue='SF Pro Display'
                    label='Font chữ'
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
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
                      color: "white",
                      ".MuiSelect-icon": { color: "white" },
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      height: isMobile ? "38px" : "unset",
                    }}>
                    <MenuItem value='SF Pro Display'>SF Pro Display</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Subtitle style selections */}
              <Box>
                <Typography variant='body1' gutterBottom>
                  Chọn kiểu phụ đề
                </Typography>
                <Box
                  sx={{
                    bgcolor: "#2c2e4f",
                    p: 2,
                    borderRadius: 2,
                    fontSize: 14,
                    color: "#f0c36d",
                    mb: 2,
                    my: 2,
                  }}>
                  <Typography variant='body2'>
                    {" "}
                    Khi chọn các hiệu ứng không phải mặc định, hệ thống sẽ cần
                    thêm thời gian để xử lý
                  </Typography>
                </Box>
                <Box display={"flex"} mt={3} justifyContent={"space-between"}>
                  <Box
                    width={"45%"}
                    onClick={() => setSubtitleStyle("default")}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={"10px"}>
                    <Box
                      width={"100%"}
                      height={108}
                      display={"flex"}
                      justifyContent={"center"}
                      bgcolor={"rgba(55, 55, 104, 1)"}
                      sx={{
                        border:
                          subtitleStyle === "default"
                            ? "2px solid #00ffae"
                            : "1px solid rgba(5, 193, 104, 1)",
                        borderRadius: 1,
                      }}
                      alignItems={"center"}>
                      <img src={image1} alt='' />
                    </Box>
                    <Typography>Mặc định</Typography>
                  </Box>
                  <Box
                    onClick={() => setSubtitleStyle("karaoke")}
                    width={"45%"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={"10px"}>
                    <Box
                      width={"100%"}
                      height={108}
                      display={"flex"}
                      justifyContent={"center"}
                      sx={{
                        border:
                          subtitleStyle === "karaoke"
                            ? "2px solid #00ffae"
                            : "1px solid rgba(5, 193, 104, 1)",
                        borderRadius: 1,
                      }}
                      alignItems={"center"}>
                      <img src={image2} alt='' />
                    </Box>
                    <Typography>Karaoke</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Color selection */}
              <Box>
                <Typography variant='body1' my={2} gutterBottom>
                  Chọn màu
                </Typography>
                <Box display={"flex"} gap={1} justifyContent={"space-between"}>
                  {colorOptions1.map(([bg, fg], i) => {
                    const isActive =
                      selectedColor[0] === bg && selectedColor[1] === fg;
                    return (
                      <Box
                        key={i}
                        onClick={() => setSelectedColor([bg, fg])}
                        sx={{
                          width: isMobile ? 64 : 74,
                          height: 36,
                          borderRadius: 1,

                          border: isActive
                            ? "2px solid #00ffae"
                            : "1px solid white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          px: 1,
                          backgroundColor: "#1b1c34",
                        }}>
                        <Box
                          sx={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            bgcolor: bg,
                          }}
                        />
                        <Box
                          sx={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            bgcolor: fg,
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
                <Box
                  display={"flex"}
                  gap={1}
                  my={2}
                  justifyContent={"space-between"}>
                  {colorOptions2.map(([bg, fg], i) => {
                    const isActive =
                      selectedColor[0] === bg && selectedColor[1] === fg;
                    return (
                      <Box
                        key={i}
                        onClick={() => setSelectedColor([bg, fg])}
                        sx={{
                          width: isMobile ? 64 : 74,
                          height: 36,
                          borderRadius: 1,

                          border: isActive
                            ? "2px solid #00ffae"
                            : "1px solid white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          px: 1,
                          backgroundColor: "#1b1c34",
                        }}>
                        <Box
                          sx={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            bgcolor: bg,
                          }}
                        />
                        <Box
                          sx={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            bgcolor: fg,
                          }}
                        />
                      </Box>
                    );
                  })}
                  <Box
                    sx={{
                      width: 92,
                      height: 36,
                      borderRadius: 1,
                      bgcolor: "#2c2e4f",
                      fontSize: 12,
                      border: "1px solid white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}>
                    Tuỳ chỉnh
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {/* Font dropdown */}
        </Stack>
      </Box>
    </Box>
  );
};

const subtitleBoxStyle = (active) => ({
  width: 100,
  height: 70,
  bgcolor: active ? "#2c2e4f" : "#1b1c34",
  border: active ? "2px solid #00ffae" : "1px solid #555",
  borderRadius: 2,
  p: 1,
  textAlign: "center",
  color: "white",
});

const AudioPanel = ({ setOn }) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <Box>
      <Typography
        variant='h6'
        sx={{ my: 3, fontSize: isMobile ? "1rem" : "1.25rem" }}>
        Nhạc nền số 1
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#1b1c34",
          borderRadius: 2,
          p: 1,
          justifyContent: "space-between",
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            size='small'
            sx={{
              color: "white",
              background: "rgba(89, 50, 234, 1)",
              width: 24,
              height: 24,
            }}>
            <PlayArrow fontSize='13' />
          </IconButton>
          <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Box
              width={100}
              sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontSize={10} color='rgba(130, 130, 130, 1)'>
                00:00
              </Typography>
              <Typography fontSize={10} color='rgba(130, 130, 130, 1)'>
                00:30
              </Typography>
            </Box>
            <Box
              sx={{
                height: 4,
                width: 100,
                bgcolor: "rgba(217, 217, 217, 1)",

                borderRadius: 2,
                position: "relative",
              }}>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "30%",
                  bgcolor: "rgba(89, 50, 234, 1)",
                  borderRadius: 2,
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size='small' sx={{ color: "white" }}>
            <VolumeUp />
          </IconButton>
          <IconButton size='small' sx={{ color: "white" }}>
            <Delete />
          </IconButton>
          <IconButton
            onClick={() => setOn(true)}
            size='small'
            sx={{ color: "white" }}>
            <ExpandMore />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
const RadioControl = ({
  label,
  defaultValue,
  options = [
    ["yes", "Có"],
    ["no", "không"],
  ],
}) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <Box width={isMobile ? "50%" : "unset"}>
      <FormLabel component='legend' sx={{ mb: 1, color: "white" }}>
        {label}
      </FormLabel>
      <RadioGroup
        row
        defaultValue={defaultValue}
        sx={{ flexDirection: isMobile ? "column" : "row" }}>
        {options.map(([value, label]) => (
          <FormControlLabel
            key={value}
            value={value}
            control={
              <Radio
                sx={{ color: "#00ffae", "&.Mui-checked": { color: "#00ffae" } }}
              />
            }
            label={label}
            sx={{ color: "white" }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/system";
import ResponsiveBox from "../../components/ResponsiveBox";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  genBackgroundMusic,
  genMusicStatus,
  updateProject,
  upload,
} from "../../service/project";

const Container = styled("div")(({ theme }) => ({
  backgroundColor: "#1a1a2e",
  color: "#fff",
  padding: "1rem",
  borderRadius: "12px",
  maxWidth: "400px",
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    padding: "0.5rem",
  },
}));

const TabGroup = styled("div")({
  display: "flex",
  borderRadius: "5px",
  padding: "4px",
  marginBottom: "1rem",
  border: "1px solid #6C63FF",
});

const TabButton = styled("button")(({ active }) => ({
  flex: 1,
  padding: "7px 12px",
  fontSize: "14px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: active ? "#6C63FF" : "transparent",
  color: active ? "#fff" : "#aaa",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  maxWidth: "max-content",
}));

const CustomCard = styled(Card)({
  backgroundColor: "#222244",
  borderRadius: "16px",
  padding: "1rem",
});
const styleOptions = ["Thuyết minh", "Có hội thoại"];
import { useRef, useEffect } from "react";

import { Pause, VolumeOff } from "@mui/icons-material";
function MusicPromptUI({
  setOn,
  model,
  musicData,
  onUpdateMusic,
  onDeleteMusic,
  isActive,
  onSetActive,
  durationVideo,
}) {
  const [selectedModel, setSelectedModel] = useState(
    musicData?.model || model[0]?.id
  );
  const [musicPrompt, setMusicPrompt] = useState(musicData?.prompt || "");
  const [duration, setDuration] = useState(
    musicData?.duration?.toString() || "10"
  );
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [timeline, setTimeline] = useState({
    start_time: musicData?.start_time || 0,
    end_time: musicData?.end_time || 0,
    duration: parseInt(musicData?.duration),
  });
  const [videoDuration, setVideoDuration] = useState(100);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:768px)");
  const audioDuration = musicData.duration;

  console.log("timeline",timeline)
  useEffect(() => {
    const newDuration = parseInt(duration);
    setTimeline((prev) => ({
      start_time: prev.start_time,
      end_time: Math.min(prev.end_time, newDuration),
      duration: newDuration,
    }));
  }, [duration]);

  // Khởi tạo audio khi URL thay đổi

  // Khởi tạo audio khi có URL
  useEffect(() => {
    if (musicData?.url) {
      // Xóa audio cũ nếu có
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      // Tạo audio mới
      audioRef.current = new Audio(musicData.url);
      audioRef.current.volume = 0.8; // Volume mặc định

      // Xử lý khi audio kết thúc
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicData?.url]);

  // Hàm phát/dừng đơn giản
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.error("Lỗi phát nhạc:", e));
    }
    setIsPlaying(!isPlaying);
  };

  // Hàm dừng hoàn toàn
  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset về đầu
      setIsPlaying(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match("audio.*")) {
      toast.error("Vui lòng chọn file audio");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const blobUrl = URL.createObjectURL(file);
      const duration = await getAudioDuration(file);
      console.log("duration", duration);
      const updatedMusic = {
        ...musicData,
        url: blobUrl,
        file: file,
        fileName: file.name,
        duration: duration,
        start_time: 0,
        end_time: duration,
        model: "uploaded",
        modelName: "Uploaded Audio",
        prompt: "Uploaded audio file",
      };

      onUpdateMusic(updatedMusic);
      setTimeline({
        start_time: 0,
        end_time: duration,
        duration: duration,
      });
      setVideoDuration(duration);
    } catch (error) {
      console.error("Error processing audio:", error);
      toast.error("Không thể xử lý file audio");
    } finally {
      setIsUploading(false);
      setTab(0);
    }
  };

  const getAudioDuration = (file) => {
    return new Promise((resolve, reject) => {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const reader = new FileReader();

      reader.onload = function (e) {
        const arrayBuffer = e.target.result;
        audioContext
          .decodeAudioData(arrayBuffer)
          .then((buffer) => {
            const duration = Math.floor(buffer.duration);
            resolve(duration);
          })
          .catch((error) => {
            reject(error);
          });
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Xử lý tạo nhạc (giữ nguyên logic API cũ)
  const handleGenerateMusic = async () => {
    console.log({ selectedModel, musicPrompt, duration });
    setLoading(true);

    let formData = new FormData();
    formData.append("prompt", musicPrompt);
    formData.append("model", selectedModel);
    formData.append("duration", duration);

    try {
      let result = await genBackgroundMusic(formData);

      if (result && result.code === 2) {
        let retryCount = 0;
        const maxRetries = 60;
        const poll = setInterval(async () => {
          retryCount++;
          if (retryCount > maxRetries) {
            clearInterval(poll);
            setLoading(false);
            toast.warning("Quá thời gian chờ 2 phút. Vui lòng thử lại sau.");
            return;
          }

          const status = await genMusicStatus(result.id);
          if (status?.code === 0 && status?.audio_url) {
            const updatedMusic = {
              ...musicData,
              url: status.audio_url,
              prompt: musicPrompt,
              duration: parseInt(duration),
              start_time: 0,
              end_time: parseInt(duration),
              model: selectedModel,
              modelName:
                model.find((m) => m.id === selectedModel)?.name ||
                selectedModel,
              id: status.id,
            };

            onUpdateMusic(updatedMusic);
            setTimeline({
              start_time: 0,
              end_time: parseInt(duration),
              duration: parseInt(duration),
            });

            clearInterval(poll);
            setLoading(false);
            toast.success("Tạo nhạc nền thành công!");
          }
        }, 2000);
      } else if (result.code === 0) {
        const updatedMusic = {
          ...musicData,
          url: result.audio_url,
          prompt: musicPrompt,
          duration: parseInt(duration),
          start_time: 0,
          end_time: parseInt(duration),
          model: selectedModel,
          modelName:
            model.find((m) => m.id === selectedModel)?.name || selectedModel,
          id: result.id,
        };

        onUpdateMusic(updatedMusic);
        setTimeline({
          start_time: 0,
          end_time: parseInt(duration),
          duration: parseInt(duration),
        });

        setLoading(false);
        toast.success("Tạo nhạc nền thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi tạo nhạc nền:", error);
      setLoading(false);
      toast.error("Có lỗi xảy ra khi tạo nhạc nền");
    }
  };

  return (
    <Box
      sx={{
        background: "#1D1D41",
        p: isMobile ? 1 : !musicData.url ? 3 : 1,
        borderRadius: 2,
        position: "relative",
        border: isActive ? "2px solid #6C63FF" : "1px solid #444",
        mb: 2,
      }}>
      <Box
        onClick={() => onSetActive(musicData.index)}
        sx={{ cursor: "pointer" }}>
        {!musicData.url && (
          <Box display='flex' justifyContent='center'>
            <Box width='max-content'>
              <TabGroup>
                <TabButton active={tab === 0} onClick={() => setTab(0)}>
                  Prompt
                </TabButton>
                <TabButton active={tab === 1} onClick={() => setTab(1)}>
                  Tải nhạc lên
                </TabButton>
              </TabGroup>
            </Box>
          </Box>
        )}

        {tab == 1 && (
          <Box
            mt={2}
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            p={2}
            border='1px dashed #444'
            borderRadius={2}
            onClick={triggerFileInput}
            sx={{ cursor: "pointer" }}>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept='audio/*'
              style={{ display: "none" }}
            />
            {isUploading ? (
              <>
                <CircularProgress
                  variant='determinate'
                  value={uploadProgress}
                />
                <Typography mt={1} variant='body2' color='gray'>
                  Đang tải lên... {uploadProgress}%
                </Typography>
              </>
            ) : (
              <>
                <CloudUpload sx={{ fontSize: 40, color: "#888" }} />
                <Typography mt={1} variant='body2' color='gray'>
                  Kéo và thả hoặc bấm để tải tệp lên
                </Typography>
                <Typography variant='caption' color='gray' mt={1}>
                  Hỗ trợ: MP3, WAV, AAC (tối đa 50MB)
                </Typography>
                <Button
                  variant='contained'
                  sx={{
                    mt: 2,
                    backgroundColor: "#6C63FF",
                    borderRadius: "12px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFileInput();
                  }}>
                  Chọn tệp
                </Button>
              </>
            )}
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            sx={{
              color: "white",
              background: "rgba(89, 50, 234, 1)",
              width: 24,
              height: 24,
            }}>
            {isPlaying ? <Pause fontSize='13' /> : <PlayArrow fontSize='13' />}
          </IconButton>

          <Box display='flex' flexDirection='column' gap='10px' flexGrow={1}>
            {/* <Typography fontSize={12} color="white">
              {musicData.modelName || selectedModel}
            </Typography>
            <Box
              width={100}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography fontSize={10} color="rgba(130, 130, 130, 1)">
                {formatTime(timeline.start_time + (progress * (timeline.end_time - timeline.start_time)) / 100)}
              </Typography>
              <Typography fontSize={10} color="rgba(130, 130, 130, 1)">
                {formatTime(timeline.end_time)}
              </Typography>
            </Box> */}
            <Box sx={{ width: "100%", p: 1, mt: 2.7 }}>
              {/* <Slider
                min={0}
                max={videoDuration}
                value={[
                  Math.min(timeline.start_time, videoDuration - 1),
                  Math.min(timeline.end_time, videoDuration),
                ]}
                onChange={(event, newValue) => {
                  let [start, end]: any = newValue;

                  // Chỉ cần đảm bảo khoảng cách tối thiểu 1 giây
                  if (end - start < 1) {
                    if (event.target?.dataset?.index === "0") {
                      start = end - 1; // Nếu kéo đầu trái
                    } else {
                      end = start + 1; // Nếu kéo đầu phải
                    }
                  }

                  setTimeline({
                    start_time: start,
                    end_time: end,
                    duration: end - start,
                  });
                }}
                onChangeCommitted={(event, newValue) => {
                  const [start, end] = newValue;
                  const updatedMusic = {
                    ...musicData,
                    start_time: start,
                    end_time: end,
                  };
                  onUpdateMusic(updatedMusic);

                  if (isPlaying && audioRef.current) {
                    audioRef.current.currentTime = updatedMusic.start_time;
                  }
                }}
                valueLabelDisplay='auto'
                valueLabelFormat={formatTime}
                disableSwap // Giữ nguyên để tránh start > end
                sx={{
                  "& .MuiSlider-track": {
                    backgroundColor: "rgba(89, 50, 234, 1)",
                    height: 6,
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "rgba(217, 217, 217, 1)",
                    height: 6,
                  },
                  "& .MuiSlider-thumb": {
                    width: 16,
                    height: 16,
                    backgroundColor: "#fff",
                    border: "2px solid rgba(89, 50, 234, 1)",
                  },
                }}
              /> */}
              <CustomSlider
                timeline={timeline}
                setTimeline={setTimeline}
                audioRef={audioRef}
                onUpdateMusic={onUpdateMusic}
                musicData={musicData}
                isPlaying={isPlaying}
                max={videoDuration}
                maxDuration={timeline.duration}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant='caption'>
                  Start:{" "}
                  {formatTime(Math.min(timeline.start_time, videoDuration))}
                </Typography>
                <Typography variant='caption'>
                  End: {formatTime(Math.min(timeline.end_time, videoDuration))}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              size='small'
              onClick={(e) => {
                e.stopPropagation();
                // handleToggleVolume();
              }}
              sx={{ color: "white" }}>
              <VolumeControl volume={volume} setVolume={setVolume} />
            </IconButton>
            {musicData.url && (
              <IconButton
                size='small'
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteMusic(musicData.index);
                }}
                sx={{ color: "white" }}>
                <Delete />
              </IconButton>
            )}
          </Box>
        </Box>

        {isActive && !musicData.url && (
          <>
            {tab !== 1 && (
              <>
                <FormControl
                  variant='outlined'
                  size='small'
                  sx={{ borderRadius: 2, width: "100%", mt: 2 }}>
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
                      height: isMobile ? "38px" : "50px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid",
                        borderColor: "white",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid",
                        borderColor: "white",
                      },
                      "& .MuiSelect-select": {
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                        padding: "0 14px",
                      },
                      ".MuiSelect-icon": { color: "#fff" },
                    }}>
                    {model.map((m) => (
                      <MenuItem key={m.id} value={m.id}>
                        {m.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  placeholder='Hãy viết mô tả Prompt của bài nhạc'
                  value={musicPrompt}
                  onChange={(e) => setMusicPrompt(e.target.value)}
                  variant='outlined'
                  multiline
                  rows={3}
                  fullWidth
                  margin='normal'
                  sx={{
                    borderRadius: "8px",
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid",
                      borderColor: "white",
                    },
                  }}
                />
                <Typography
                  variant='h6'
                  fontSize={isMobile ? "1rem" : "1.25rem"}
                  fontWeight='500'
                  my={1}>
                  Nhập số giây
                </Typography>
                <TextField
                  placeholder='Nhập số giây'
                  variant='outlined'
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  fullWidth
                  margin='normal'
                  sx={{
                    borderRadius: "8px",
                    color: "white",
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid",
                      borderColor: "white",
                    },
                  }}
                />
              </>
            )}

            <Box display='flex' justifyContent='end' gap={2} mt={3}>
              <Button
                variant='contained'
                onClick={handleGenerateMusic}
                sx={{
                  backgroundColor: "#6C63FF",
                  borderRadius: "12px",
                  px: 4,
                  opacity: loading ? 0.7 : 1,
                  pointerEvents: loading ? "none" : "unset",
                }}>
                {loading ? (
                  <>
                    <CircularProgress size={15} color='inherit' /> đang tạo...
                  </>
                ) : (
                  "Tạo nhạc nền"
                )}
              </Button>
              <Button
                variant='contained'
                onClick={() => onDeleteMusic(musicData.id)}
                sx={{
                  backgroundColor: "#2d2d5a",
                  borderRadius: "12px",
                  px: 4,
                }}>
                Xóa
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
function AddMusicPromptUI({ setOn }) {
  const [tab, setTab] = React.useState(0);

  return (
    <Box
      sx={{
        background: "#1D1D41",
        p: 3,
        borderRadius: 2,
        position: "relative",
      }}>
      <Box sx={{ position: "absolute", top: "30px", right: "30px" }}>
        <IconButton
          size='small'
          onClick={() => setOn(false)}
          sx={{ color: "white" }}>
          <ExpandLessIcon />
        </IconButton>
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Box width={"max-content"}>
          <TabGroup>
            <TabButton active={tab === 0} onClick={() => setTab(0)}>
              Prompt
            </TabButton>
            <TabButton active={tab === 1} onClick={() => setTab(1)}>
              Tải nhạc lên
            </TabButton>
          </TabGroup>
        </Box>
      </Box>

      {tab === 0 && (
        <>
          <FormControl
            variant='outlined'
            size='small'
            sx={{ borderRadius: 2, width: "100%" }}>
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
                height: "50px", // 👈 Chiều cao mong muốn
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid",
                  borderColor: "white", // 👈 Viền mặc định
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid",
                  borderColor: "white", // 👈 Viền khi focus
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

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#1b1c34",
              borderRadius: 2,
              p: 1,
              justifyContent: "space-between",
              my: 2,
              border: "1px solid rgba(89, 50, 234, 1)",
            }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                size='small'
                sx={{
                  color: "white",
                  background: "rgba(89, 50, 234, 1)",
                  width: 24,
                  height: 24,
                }}>
                <PlayArrow fontSize='13' />
              </IconButton>
              <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                <Box
                  width={100}
                  sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontSize={10} color='rgba(130, 130, 130, 1)'>
                    00:00
                  </Typography>
                  <Typography fontSize={10} color='rgba(130, 130, 130, 1)'>
                    00:30
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 4,
                    width: 100,
                    bgcolor: "rgba(217, 217, 217, 1)",

                    borderRadius: 2,
                    position: "relative",
                  }}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: "30%",
                      bgcolor: "rgba(89, 50, 234, 1)",
                      borderRadius: 2,
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton size='small' sx={{ color: "white" }}>
                <VolumeUp />
              </IconButton>
            </Box>
          </Box>

          <TextField
            placeholder='Hãy viết mô tả Prompt của bài nhạc'
            variant='outlined'
            multiline
            rows={3}
            fullWidth
            margin='normal'
            sx={{
              borderRadius: "8px",
              color: "white",
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid",
                borderColor: "white",
              },
            }}
          />
          <Typography variant='h6' fontWeight={"500"} my={1}>
            Nhập số giây
          </Typography>
          <TextField
            placeholder='Nhập số giây'
            variant='outlined'
            fullWidth
            margin='normal'
            sx={{
              borderRadius: "8px",
              color: "white",
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid",
                borderColor: "white",
              },
            }}
          />
        </>
      )}

      {tab === 1 && (
        <Box
          mt={2}
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          p={2}
          border='1px dashed #444'
          borderRadius={2}>
          <CloudUpload sx={{ fontSize: 40, color: "#888" }} />
          <Typography mt={1} variant='body2' color='gray'>
            Kéo và thả hoặc bấm để tải tệp lên
          </Typography>
          <Button
            variant='contained'
            sx={{ mt: 2, backgroundColor: "#6C63FF", borderRadius: "12px" }}>
            Chọn tệp
          </Button>
        </Box>
      )}

      <Box display='flex' justifyContent='end' gap={3} mt={2}>
        <Button
          variant='contained'
          sx={{ backgroundColor: "#6C63FF", borderRadius: "12px", px: 4 }}>
          Tạo nhạc nền
        </Button>
        <Button
          variant='contained'
          sx={{ backgroundColor: "#2d2d5a", borderRadius: "12px", px: 4 }}>
          Xóa
        </Button>
      </Box>
    </Box>
  );
}



const CustomSlider = ({
  max = 60,
  timeline,
  setTimeline,
  onUpdateMusic,
  isPlaying,
  audioRef,
  maxDuration,
  musicData
}) => {
  console.log("max", max);
  const durationMax = maxDuration || max;
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<null | "left" | "right" | "block">(null);
  const [startX, setStartX] = useState(0);
  const [initialTimeline, setInitialTimeline] = useState(timeline);
  console.log("max", {
    max,
    timeline,
    setTimeline,
    onUpdateMusic,
    isPlaying,
    audioRef,
    maxDuration,
    musicData
  });
  // Memoize các hàm tính toán
  const toPercent = useCallback((time: number) => {
    return Math.max(0, Math.min(100, (time / max) * 100));
  }, [max]);

  const onMouseDown = useCallback((e: React.MouseEvent, type: "left" | "right" | "block") => {
    e.stopPropagation();
    setDragging(type);
    setStartX(e.clientX);
    setInitialTimeline(timeline);
  }, [timeline]);

  // Kiểm tra xem timeline có hợp lệ không
  const isValidTimeline = useCallback((start: number, end: number) => {
    return (end - start) <= durationMax;
  }, [durationMax]);

  // Sử dụng requestAnimationFrame cho chuyển động mượt mà
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging || !sliderRef.current) return;
  
    requestAnimationFrame(() => {
      const deltaPx = e.clientX - startX;
      const sliderWidth = sliderRef.current?.offsetWidth || 1;
      const deltaSec = (deltaPx / sliderWidth) * max;
  
      let { start_time, end_time } = initialTimeline;
      const blockLength = end_time - start_time;
  
      if (dragging === "left") {
        const newStart = Math.max(0, start_time + deltaSec);
        // Luôn cho phép kéo vào (thu nhỏ)
        start_time = newStart;
      } 
      else if (dragging === "right") {
        const newEnd = Math.min(max, end_time + deltaSec);
        // Chỉ chặn nếu kéo ra làm tăng độ dài vượt quá durationMax
        if ((newEnd - start_time) > durationMax) return;
        end_time = newEnd;
      } 
      else if (dragging === "block") {
        // Block phải luôn nhỏ hơn hoặc bằng durationMax
        if (blockLength > durationMax) return;
  
        let newStart = start_time + deltaSec;
        let newEnd = end_time + deltaSec;
  
        // Xử lý vượt biên
        if (newStart < 0) {
          newEnd -= newStart;
          newStart = 0;
        } else if (newEnd > max) {
          newStart -= (newEnd - max);
          newEnd = max;
        }
  
        // Kiểm tra lại sau khi điều chỉnh biên
        if ((newEnd - newStart) > durationMax) return;
  
        start_time = newStart;
        end_time = newEnd;
      }
  
      // Đảm bảo timeline hợp lệ
      if (start_time >= end_time) {
        if (dragging === "left") start_time = Math.max(0, end_time - 1);
        else end_time = Math.min(max, start_time + 1);
      }
  
      setTimeline({
        start_time: Math.max(0, Math.min(max - 1, start_time)),
        end_time: Math.min(max, Math.max(1, end_time)),
        duration: end_time - start_time,
      });
    });
  }, [dragging, startX, initialTimeline, max, durationMax, setTimeline]);

  const onMouseUp = useCallback(() => {
    if (dragging) {
      // Final validation trước khi update
      if (isValidTimeline(timeline.start_time, timeline.end_time)) {
        const updatedMusic = {
          ...musicData,
          start_time: timeline.start_time,
          end_time: timeline.end_time,
        };
        onUpdateMusic(updatedMusic);
        
        if (isPlaying && audioRef.current) {
          audioRef.current.currentTime = timeline.start_time;
        }
      }
    }
    setDragging(null);
  }, [dragging, timeline, musicData, onUpdateMusic, isPlaying, audioRef, isValidTimeline]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [dragging, onMouseMove, onMouseUp]);

  return (
    <div className='slider-container' ref={sliderRef}>
      <div
        className='slider-range'
        style={{
          left: `${toPercent(timeline.start_time)}%`,
          width: `${toPercent(timeline.end_time - timeline.start_time)}%`,
          transition: dragging ? 'none' : 'left 0.1s, width 0.1s',
          // Thêm visual feedback khi vượt quá độ dài cho phép
          // backgroundColor: (timeline.end_time - timeline.start_time) > durationMax ? '#ff6b6b' : '#4a90e2'
        }}
        onMouseDown={(e) => onMouseDown(e, "block")}
      >
        <div
          className='slider-handle left'
          onMouseDown={(e) => onMouseDown(e, "left")}
        />
        <div
          className='slider-handle right'
          onMouseDown={(e) => onMouseDown(e, "right")}
        />
      </div>
    </div>
  );
};



function VolumeControl({ volume, setVolume }) {
  const [isHovered, setIsHovered] = useState(false);
  const volumeRef = useRef<HTMLDivElement>(null);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        height: "40px", // Thêm chiều cao cố định để đảm bảo slider không làm dịch chuyển layout
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={volumeRef}>
      <IconButton size='small' sx={{ color: "white" }}>
        {volume === 0 ? (
          <VolumeOff />
        ) : volume < 1 ? (
          <VolumeDown />
        ) : (
          <VolumeUp />
        )}
      </IconButton>

      {isHovered && (
        <Box
          sx={{
            position: "absolute",
            bottom: "100%", // Hiển thị phía trên icon
            left: "50%",
            transform: "translateX(-50%)",

            borderRadius: "4px",
            padding: "8px 8px",
            background: "rgba(255,255,255,.8)",
            zIndex: 10,
          }}>
          <Slider
            min={0}
            max={2}
            step={0.1}
            value={volume}
            onChange={handleVolumeChange}
            orientation='vertical' // Thay đổi thành dọc
            sx={{
              color: "#6C63FF",
              height: "100px", // Chiều cao slider
              "& .MuiSlider-thumb": {
                width: 12,
                height: 12,
                backgroundColor: "#fff",
              },
              mx: "auto", // Canh giữa
            }}
          />
        </Box>
      )}
    </Box>
  );
}
