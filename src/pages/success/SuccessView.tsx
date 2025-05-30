import React, { useState } from "react";
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

const SuccessView = () => {
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
      <VideoProjectUI />

    </Box>
  );
};

export default SuccessView;


import { CardMedia, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUploadOutlined';
import { RiPlayFill } from "react-icons/ri";

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: '#1a1a2e',
  color: 'white',
  padding: '2rem',
  borderRadius: '12px',
  maxWidth: '900px',
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: '1rem',
  },
}));

const VideoCard = styled(Card)({
  borderRadius: '16px',
  overflow: 'hidden',
  position: 'relative',
});

const SideInfo = styled(Box)(({ theme }) => ({
  backgroundColor: '#222244',
  borderRadius: '12px',
  padding: '1rem',
  marginLeft: '1rem',
  height:"max-content",

  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    marginTop: '1rem',
  },
}));

const MetaRow = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
    <Box display={"flex"}>

      <Typography variant="body2" sx={{ color: '#bbb' }}>{label}</Typography>
      <Typography variant="body2" sx={{ color: 'white' }}>{value}</Typography>
    </Box>
    <Box display="flex" alignItems="center" gap={1}>

      <FileCopyIcon sx={{ fontSize: 16, color: '#888' }} />
    </Box>
  </Box>
);

const ActionButton = styled(Button)(({ theme }) => ({
  padding: '10px 24px',
  borderRadius: '12px',
  fontWeight: '500',
  fontSize: '14px',
  textTransform: 'none',
}));

function VideoProjectUI() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box>
      <Typography variant="h5" my={4} fontWeight={600} gutterBottom>
        Dự án: Cuộc phiêu lưu cùng những người bạn
      </Typography>

      <Box display={isMobile ? 'block' : 'flex'} justifyContent={"space-between"}>
        <Box
          sx={{
            margin: "0px 0 !important",
            position: "relative",
            width: "60%",
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

        <SideInfo sx={{ width: "30%" }}>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Typography variant="h6" fontWeight={600}>Tiêu đề: Phiêu lưu</Typography>
            <MetaRow label="Tên file:" value="Phieu-luu.mp4" />
            <MetaRow label="Key word:" value="Phiêu lưu" />
            <MetaRow label="Mô tả:" value="Có 2 người bạn" />
            <MetaRow label="Tag/Hashtag:" value="phieu luu, tham hiem" />
            <MetaRow label="Ảnh thumbnail:" value="" />

          </Box>
        </SideInfo>
      </Box>

      <Box mt={4} display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={2}>
            <ActionButton variant="contained" fullWidth={!isMobile} sx={{ backgroundColor: '#6C63FF' }}>
              Tải video xuống
            </ActionButton>
            <ActionButton variant="contained" fullWidth={!isMobile} sx={{ backgroundColor: '#fff', color: '#5932EA' }}>
              Upload lên Driver
            </ActionButton>
          </Box>

      
    </Box>
  );
}
