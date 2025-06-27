import React from "react";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const linkStep = [
  "",
  "script",
  "create-image",
  "create-video",
  "narrator",
  "sub",
  "success",
];

// Mapping giữa label và permission tương ứng
const stepPermissionMap = {
  "Tạo kịch bản": "gen_script",
  "Tạo ảnh": "gen_image",
  "Tạo Video": "gen_video",
  "Tạo Voice": "gen_voice",
  "Nhạc nền và sub": "gen_audio_sub",
  "Hoàn thành": "complete"
};

const StepComponent = ({ steps = [], userPermissions = [] }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const navigate = useNavigate();

  // Lọc các step dựa trên quyền của user
  const filteredSteps = steps.filter(step => {
    // Luôn hiển thị step "Ý tưởng"
    if (step.label === "Ý tưởng") return true;
    
    // Kiểm tra quyền cho các step khác
    const requiredPermission = stepPermissionMap[step.label];
    return userPermissions.includes(requiredPermission);
  });

  return (
    <Box
      bgcolor='#0D0C2B'
      width='100%'
      py={2}
      sx={{ overflowX: { xs: "auto", md: "unset" }, whiteSpace: "nowrap" }}>
      <Box
        display='flex'
        alignItems='flex-start'
        justifyContent={{ xs: "flex-start", md: "center" }}
        sx={{ minWidth: "max-content" }}>
        {filteredSteps.map((step, index) => (
          <Box key={index} display='flex' alignItems='flex-start'>
            <Box
              onClick={
                step.status === "completed"
                  ? () => {
                      // Tìm index thực tế trong mảng steps ban đầu để lấy link chính xác
                      const originalIndex = steps.findIndex(s => s.label === step.label);
                      if (originalIndex >= 0) {
                        navigate(`/${linkStep[originalIndex]}?id=${id}`);
                      }
                    }
                  : undefined
              }
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: { xs: "4px", md: "6px" },
                cursor: step.status === "completed" ? "pointer" : "default",
              }}>
              <Box
                sx={{
                  width: { xs: 28, md: 44 },
                  height: { xs: 28, md: 44 },
                  borderRadius: "8px",
                  background:
                    step.status === "completed"
                      ? "#00CE7C"
                      : step.status === "active"
                      ? "linear-gradient(135deg, #6E00FF 0%, #9D00FF 100%)"
                      : "#1A1B3A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: { xs: 12, md: 16 },
                  boxShadow:
                    step.status === "completed"
                      ? "0px 0px 0px 4px rgba(0, 206, 124, 0.2)"
                      : step.status === "active"
                      ? "0px 0px 0px 6px rgba(157, 0, 255, 0.2)"
                      : "none",
                }}>
                <Typography>
                  {step.status === "completed" ? "✓" : index + 1}
                </Typography>
              </Box>
              <Typography
                sx={{
                  color:
                    step.status === "completed"
                      ? "#00CE7C"
                      : step.status === "active"
                      ? "#FFFFFF"
                      : "#8F91A5",
                  fontWeight: step.status === "active" ? 600 : 400,
                  fontSize: { xs: 9, md: 13 },
                  textAlign: "center",
                  maxWidth: 70,
                }}>
                {step.label}
              </Typography>
            </Box>

            {/* Line - chỉ hiển thị nếu không phải là step cuối cùng */}
            {index < filteredSteps.length - 1 && (
              <Box
                sx={{
                  width: { xs: 16, md: 60 },
                  height: { xs: 11, md: 22 },
                  mx: { xs: 1, md: 2 },
                  borderBottom:
                    filteredSteps[index + 1].status === "pending"
                      ? "2px dashed #4A4C6B"
                      : "2px solid #00CE7C",
                  alignSelf: "center",
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StepComponent;