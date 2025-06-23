import React, { useEffect, useRef, useState } from "react";
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
const dynamicSteps = [
  { label: "Ý tưởng", status: "completed" },
  { label: "Tạo kịch bản", status: "completed" },
  { label: "Tạo ảnh", status: "completed" },
  { label: "Tạo Video", status: "completed" },
  { label: "Tạo Voice", status: "completed" },
  { label: "Nhạc nền và sub", status: "completed" },
  { label: "Hoàn thành", status: "active" },
];
const SuccessView = ({ genScript, setLoading }) => {
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
      <VideoProjectUI genScript={genScript} setLoading={setLoading} />
    </Box>
  );
};

export default SuccessView;

import { CardMedia, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUploadOutlined";
import { RiPlayFill } from "react-icons/ri";
import ResponsiveBox from "../../components/ResponsiveBox";
import { uploadDrive } from "../../service/project";
import { toast } from "react-toastify";

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a1a2e",
  color: "white",
  padding: "2rem",
  borderRadius: "12px",
  maxWidth: "900px",
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    padding: "1rem",
  },
}));

const VideoCard = styled(Card)({
  borderRadius: "16px",
  overflow: "hidden",
  position: "relative",
});

const SideInfo = styled(Box)(({ theme }) => ({
  backgroundColor: "#222244",
  borderRadius: "12px",
  padding: "1rem",
  marginLeft: "1rem",
  height: "max-content",

  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    marginTop: "1rem",
  },
}));

const MetaRow = ({ label, value }) => (
  <Box display='flex' justifyContent='space-between' alignItems='start' mt={1}>
    <Box display={"flex"} gap={1}>
      <Box width={"max-content"}>
        <Typography
          variant='body2'
          sx={{ color: "#bbb", whiteSpace: "nowrap" }}>
          {label}{" "}
        </Typography>
      </Box>
      <Typography
        variant='body2'
        sx={{ color: "white", whiteSpace: "pre-line" }}>
        {value}
      </Typography>
    </Box>
    <Box display='flex' alignItems='center' gap={1}>
      <FileCopyIcon sx={{ fontSize: 16, color: "#888" }} />
    </Box>
  </Box>
);

const ActionButton = styled(Button)(({ theme }) => ({
  padding: "10px 24px",
  borderRadius: "12px",
  fontWeight: "500",
  fontSize: "14px",
  textTransform: "none",
}));

function VideoProjectUI({ genScript, setLoading }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const videoRef = useRef(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState(
    genScript?.output_video_url ? genScript?.output_video_url : ""
  );
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
  return (
    <Box>
      <Typography
        variant='h5'
        fontSize={isMobile ? "1.2rem" : "1.5rem"}
        my={4}
        fontWeight={600}
        gutterBottom>
        Dự án: {genScript?.name}
      </Typography>

      <Box
        display={isMobile ? "block" : "flex"}
        justifyContent={"space-between"}>
        <Box
          sx={{
            margin: "0px 0 !important",
            position: "relative",
            width: isMobile ? "100%" : "60%",
            borderRadius: 1,
            overflow: "hidden",
          }}>
          <Box sx={{ position: "relative", width: "100%" }}>
            {videoUrl && (
              <video
                ref={videoRef}
                width='100%'
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
        </Box>

        <SideInfo sx={{ width: isMobile ? "90%" : "30%" }}>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Typography variant='h6' fontWeight={600}>
              Tiêu đề: {genScript?.name}
            </Typography>
            <MetaRow
              label={`Phong cách: `}
              value={genScript?.script?.info?.style}
            />
            <MetaRow label={`Độ tuổi: `} value={genScript?.script?.info?.age} />
            <MetaRow
              label={`Thông điệp: `}
              value={genScript?.script?.info?.message}
            />
            <MetaRow
              label={`Thời lượng: `}
              value={genScript?.script?.info?.time}
            />
            <MetaRow
              label={`Tag/Hashtag: `}
              value={genScript?.script?.info?.hashtag}
            />
          </Box>
        </SideInfo>
      </Box>

      <Box
        mt={4}
        display='flex'
        flexDirection={isMobile ? "column" : "row"}
        gap={2}>
        <ActionButton
          variant='contained'
          fullWidth={!isMobile}
          sx={{ backgroundColor: "#6C63FF", height: { xs: 40, md: 50 } }}>
          Tải video xuống
        </ActionButton>
        <ActionButton
          onClick={async () => {
            setLoading(true);
            try {
              let formdata = new FormData();
              formdata.append("url", genScript.output_video_url);
              let result = await uploadDrive(formdata);
              console.log("result", result);
              toast.success("Upload success");
            } catch (error) {
              console.log(error);
            }
            setLoading(false);
          }}
          variant='contained'
          fullWidth={!isMobile}
          sx={{
            backgroundColor: "#fff",
            color: "#5932EA",
            height: { xs: 40, md: 50 },
          }}>
          Upload lên Driver
        </ActionButton>
      </Box>
    </Box>
  );
}
