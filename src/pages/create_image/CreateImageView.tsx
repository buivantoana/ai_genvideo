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
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import StepComponent from "../../components/StepComponent";
import EditIcon from "@mui/icons-material/Edit";
import group from "../../images/Group 13.png";
const modelOptions1 = ["Stabledifution", "Flux"];
const modelOptions2 = ["ChatGPT", "Runpod"];
const modelOptions4 = ["Local"];
const modelOptions3 = [
  "1920x1080 (16:9)",
  "1280x720 (16:9)",
  "1024x1024 (1:1)",
];

const CreateImageView = () => {
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
      <Box display={"flex"} gap={3}>
        <FormControl variant='outlined' size='small'>
          <Select
            defaultValue='Stabledifution'
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
            {modelOptions1.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='outlined' size='small'>
          <Select
            defaultValue='ChatGPT'
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
        <FormControl variant='outlined' size='small'>
          <Select
            defaultValue='Local'
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
            {modelOptions4.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='outlined' size='small'>
          <Select
            defaultValue='1920x1080 (16:9)'
            sx={{
              background: "transparent",
              color: "#fff",
              borderRadius: 2,
              width: "max-content",
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
            {modelOptions3.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box display={"flex"} alignItems={"center"} gap={"20px"}>
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
      </Box>
      <SceneEditor />
    </Box>
  );
};

export default CreateImageView;

import { IconButton, Card, CardMedia, Grid, Stack } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { RiRefreshLine } from "react-icons/ri";

const SceneCard = ({ sceneNumber, imageUrl, narrationText, dialogText }) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        mb: 4,
      }}>
      <Stack spacing={2}>
        <Stack direction='row' gap={"30px"} alignItems='center'>
          <Typography variant='h6' color='white'>
            Phân cảnh {sceneNumber}:
          </Typography>
          <Button
            startIcon={<RiRefreshLine />}
            size='small'
            sx={{ borderRadius: 1, background: "rgba(89, 50, 234, 1)" }}
            variant='contained'>
            Tạo lại ảnh
          </Button>
        </Stack>

        <Box position='relative'>
          <TextField
            multiline
            fullWidth
            minRows={2}
            maxRows={5}
            value={narrationText}
            variant='outlined'
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid",
                borderColor: "#414188",
              },
            }}
            InputProps={{
              style: {
                backgroundColor: "#1A1836",
                color: "#fff",
                borderRadius: 10,
              },
            }}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#A3A4B5",
            }}>
            <EditIcon fontSize='small' />
          </IconButton>
        </Box>

        <Box sx={{ margin: "30px 0 !important" }}>
          <Grid container>
            <Grid
              item
              xs={6}
              sx={{
                mr: "20px",
              }}
              sm={4}
              md={3}>
              {imageUrl ? (
                <CardMedia
                  component='img'
                  height='220px'
                  sx={{ objectFit: "cover", borderRadius: 1 }}
                  image={imageUrl}
                  alt='uploaded'
                />
              ) : (
                <Card
                  sx={{
                    bgcolor: "#292a45",
                    height: 220,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}>
                  <Button
                    variant='contained'
                    sx={{
                      background: "rgba(89, 50, 234, 1)",
                      borderRadius: 1,
                    }}>
                    Xác nhận tạo ảnh
                  </Button>
                </Card>
              )}
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <Card
                sx={{
                  bgcolor: "#292a45",
                  height: 220,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 0.5,
                  }}>
                  <UploadFileIcon sx={{ color: "white" }} fontSize='large' />

                  <Typography color='white'>Tải ảnh của bạn lên</Typography>
                </Box>
              </Card>
            </Grid>
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
              <Typography> {dialogText}</Typography>
            </li>
          </ul>
        </Box>
      </Stack>
    </Box>
  );
};

function SceneEditor() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ minHeight: "100vh", pb: 3 }}>
      <SceneCard
        sceneNumber={1}
        narrationText='Hai cậu bé học sinh Nam, Giang, mặc đồng phục...'
        dialogText='Từ bé, tụi mình đã bên nhau...'
      />
      <SceneCard
        sceneNumber={2}
        imageUrl={group}
        narrationText='Cảnh Nam buồn bã nhìn bài kiểm tra điểm kém...'
        dialogText='Nam: tôi chào bạn nhé'
      />

      <Box textAlign='center'>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            mt: 4,
            justifyContent: "center",
          }}>
          <Button
            variant='contained'
            sx={{
              background: "rgba(89, 50, 234, 0.3)",
              textTransform: "none",
              borderRadius: 1,
              width: "38%",
              fontWeight: 600,
              border: "2px dashed rgba(89, 50, 234, 1)",
              "&:hover": {
                background: "#5900cc",
              },
              height: 50,
              fontSize: "18px",
            }}>
            + Thêm màn mới
          </Button>
        </Box>

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
            sx={{
              background: "#6E00FF",
              textTransform: "none",
              borderRadius: 1,
              width: "38%",
              fontWeight: 600,
              "&:hover": {
                background: "#5900cc",
              },
              height: 50,
              fontSize: "18px",
            }}>
            Xác nhận ảnh
          </Button>

          <Button
            variant='contained'
            sx={{
              background: "white",
              textTransform: "none",
              borderRadius: 1,
              width: "38%",
              fontWeight: 600,
              "&:hover": {
                background: "white",
              },
              height: 50,
              fontSize: "18px",
              color: "black",
            }}>
            Tải hàng loạt (2)
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
