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
  Card,
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

const SubView = () => {
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

      <SubtitleSettings />
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

const SubtitleSettings = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Box
      sx={{
        py: 5,
        color: "white",
      }}>
      <Stack direction={isMobile ? "column" : "row"} spacing={4}>
        {/* Left Side */}
        <Box flex={1}>
          <Typography variant='h5' fontWeight={"bold"} mb={2}>
            Dự án: Cuộc phiêu lưu cùng những người bạn
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
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"50px"}
                height={"50px"}
                sx={{
                  borderRadius: "50%",
                  border: "1px solid white",
                  background: "rgba(0,0,0,.5)",
                }}>
                <RiPlayFill size={40} />
              </Box>
            </Box>
            <img
              src={image}
              width={"100%"}
              style={{ borderRadius: "8px" }}
              height={"100%"}
              alt=''
            />
          </Box>

          <Typography variant='h6' mb={1}>
            Độ dài video tổng
          </Typography>

          <Box sx={{ mt: 2 }}>
            {/* <AudioPanel /> */}
            <MusicPromptUI />
          </Box>

          <Box
            mt={4}
            sx={{
              border: "2px dashed #6b5bfc",
              borderRadius: 2,
              p: 2,
              textAlign: "center",
              cursor: "pointer",
              bgcolor: "rgba(89, 50, 234, 0.3)",
            }}>
            <Button
              startIcon={<AddIcon />}
              sx={{ color: "white", fontSize: "20px" }}>
              Thêm nhạc nền
            </Button>
          </Box>
        </Box>

        {/* Right Side */}
        <Box flex={1}>
          <Settings />
        </Box>
      </Stack>

      <Box mt={6} textAlign='center'>
        <Button
          variant='contained'
          sx={{
            bgcolor: "#6b5bfc",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 2,
            px: 4,
            py: 1.5,
            width: "30%",
          }}>
          Bước tiếp theo
        </Button>
      </Box>
    </Box>
  );
};

import { Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
import { Delete, ExpandMore, PlayArrow, VolumeUp } from "@mui/icons-material";

const Settings = () => {
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
              {[0, 1, 2, 3].map((i, index) => (
                <Box
                  key={i}
                  sx={{
                    width: "24%",
                    height: 150,
                    borderRadius: 2,
                    border: i === 1 ? "2px solid #00ffae" : "unset",
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
                      bottom: (10 * index + 1) * 3.5,
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Box>

          <Box display={"flex"} justifyContent={"space-between"}>
            <RadioControl label='Hiện thị phụ đề' defaultValue='yes' />
            <RadioControl label='Nhạc nền' defaultValue='yes' />
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <RadioControl
              label='Kiểu chữ'
              defaultValue='normal'
              options={[
                ["normal", "Chữ thường"],
                ["upper", "Chữ hoa"],
              ]}
            />
            <RadioControl label='Hiệu ứng động' defaultValue='yes' />
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
                Khi chọn các hiệu ứng không phải mặc định, hệ thống sẽ cần thêm
                thời gian để xử lý
              </Typography>
            </Box>
            <Box display={"flex"} mt={3} justifyContent={"space-between"}>
              <Box
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
                  bgcolor={"rgba(55, 55, 104, 1)"}
                  sx={{
                    border: "1px solid rgba(5, 193, 104, 1)",
                    borderRadius: 1,
                  }}
                  alignItems={"center"}>
                  <img src={image1} alt='' />
                </Box>
                <Typography>Mặc định</Typography>
              </Box>
              <Box
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
                    border: "1px solid ",
                    borderRadius: 1,
                  }}
                  alignItems={"center"}>
                  <img src={image2} alt='' />
                </Box>
                <Typography>Karaoke</Typography>
              </Box>
            </Box>
            <Box display={"flex"} mt={2} justifyContent={"space-between"}>
              <Box
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
                    border: "1px solid ",
                    borderRadius: 1,
                  }}
                  alignItems={"center"}>
                  <img src={image3} alt='' />
                </Box>
                <Typography>Gõ chữ</Typography>
              </Box>
              <Box
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
                    border: "1px solid ",
                    borderRadius: 1,
                  }}
                  alignItems={"center"}>
                  <img src={image4} alt='' />
                </Box>
                <Typography>Chữ nhún</Typography>
              </Box>
            </Box>
          </Box>

          {/* Color selection */}
          <Box>
            <Typography variant='body1' my={2} gutterBottom>
              Chọn màu
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"}>
              {colorOptions1.map(([bg, fg], i) => (
                <Box
                  key={i}
                  sx={{
                    width: 74,
                    height: 36,
                    borderRadius: 1,
                    border:
                      bg === "#1b1c34"
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
              ))}
            </Box>
            <Box display={"flex"} my={2} justifyContent={"space-between"}>
              {colorOptions2.map(([bg, fg], i) => (
                <Box
                  key={i}
                  sx={{
                    width: 74,
                    height: 36,
                    borderRadius: 1,
                    border:
                      bg === "#1b1c34"
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
              ))}
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

          {/* Font dropdown */}
          <FormControl fullWidth>
            <InputLabel sx={{ color: "#aaa" }}>Kiểu chữ</InputLabel>
            <Select
              defaultValue='SF Pro Display'
              label='Kiểu chữ'
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
              }}>
              <MenuItem value='SF Pro Display'>SF Pro Display</MenuItem>
            </Select>
          </FormControl>
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

const AudioPanel = () => (
  <Box>
    <Box
      display={"flex"}
      alignItems={"center"}
      sx={{ mb: 1, p: 1, borderRadius: 1 }}
      bgcolor={"rgba(29, 29, 65, 1)"}
      justifyContent={"space-between"}>
      <Typography variant='body2'>00:06</Typography>
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
            width: "5%",
            height: "100%",
            borderRadius: 3,
            bgcolor: "rgba(89, 50, 234, 1)",
          }}
        />
      </Box>
      <Typography variant='body2'>01:06</Typography>
    </Box>
    <Typography variant='h6' sx={{ my: 3 }}>
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
        <IconButton size='small' sx={{ color: "white" }}>
          <ExpandMore />
        </IconButton>
      </Box>
    </Box>
  </Box>
);
const RadioControl = ({
  label,
  defaultValue,
  options = [
    ["yes", "Có"],
    ["no", "không"],
  ],
}) => (
  <Box>
    <FormLabel component='legend' sx={{ mb: 1, color: "white" }}>
      {label}
    </FormLabel>
    <RadioGroup row defaultValue={defaultValue}>
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


import { CloudUpload } from '@mui/icons-material';
import { styled } from '@mui/system';

const Container = styled('div')(({ theme }) => ({
  backgroundColor: '#1a1a2e',
  color: '#fff',
  padding: '1rem',
  borderRadius: '12px',
  maxWidth: '400px',
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    padding: '0.5rem',
  },
}));

const TabGroup = styled('div')({
  display: 'flex',
  borderRadius: '9999px',
  backgroundColor: '#2d2d5a',
  padding: '4px',
  marginBottom: '1rem',
});

const TabButton = styled('button')(({ active }) => ({
  flex: 1,
  padding: '6px 12px',
  fontSize: '12px',
  borderRadius: '9999px',
  border: 'none',
  backgroundColor: active ? '#6C63FF' : 'transparent',
  color: active ? '#fff' : '#aaa',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
}));

const CustomCard = styled(Card)({
  backgroundColor: '#222244',
  borderRadius: '16px',
  padding: '1rem',
});

function MusicPromptUI() {
  const [tab, setTab] = React.useState(0);

  return (
    <Container>
      <TabGroup>
        <TabButton active={tab === 0} onClick={() => setTab(0)}>Prompt</TabButton>
        <TabButton active={tab === 1} onClick={() => setTab(1)}>Tải nhạc lên</TabButton>
      </TabGroup>

      {tab === 0 && (
        <>
          <FormControl fullWidth margin="normal">
            <Select
              value="Suno API"
              displayEmpty
              sx={{ backgroundColor: '#2d2d5a', color: '#fff', borderRadius: '8px' }}
            >
              <MenuItem value="Suno API">Suno API</MenuItem>
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
            placeholder="Hãy viết mô tả Prompt của bài nhạc"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: '#2d2d5a', borderRadius: '8px', color: 'white', '& .MuiInputBase-input': { color: 'white' } }}
          />

          <TextField
            placeholder="Nhập số giây"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: '#2d2d5a', borderRadius: '8px', color: 'white', '& .MuiInputBase-input': { color: 'white' } }}
          />
        </>
      )}

      {tab === 1 && (
        <Box mt={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={2} border="1px dashed #444" borderRadius={2}>
          <CloudUpload sx={{ fontSize: 40, color: '#888' }} />
          <Typography mt={1} variant="body2" color="gray">Kéo và thả hoặc bấm để tải tệp lên</Typography>
          <Button variant="contained" sx={{ mt: 2, backgroundColor: '#6C63FF', borderRadius: '12px' }}>Chọn tệp</Button>
        </Box>
      )}

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#6C63FF', borderRadius: '12px', px: 4 }}
        >
          Tạo nhạc nền
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#2d2d5a', borderRadius: '12px', px: 4 }}
        >
          Xóa
        </Button>
      </Box>
    </Container>
  );
}
