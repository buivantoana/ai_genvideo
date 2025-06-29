import React from "react";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

// Mapping giữa label và route tương ứng
const stepRouteMap = {
  "Ý tưởng": "", // Nếu dùng route /idea thì đổi thành "idea"
  gen_script: "script",
  gen_image: "create-image",
  gen_video: "create-video",
  gen_voice: "narrator",
  gen_audio_sub: "sub",
  complete: "success",
};

// Mapping giữa label và permission tương ứng
const stepPermissionMap = {
  "Ý tưởng": "idea",
  "Tạo kịch bản": "gen_script",
  "Tạo ảnh": "gen_image",
  "Tạo Video": "gen_video",
  "Tạo Voice": "gen_voice",
  "Nhạc nền và sub": "gen_audio_sub",
  "Hoàn thành": "complete",
};

// Thứ tự workflow không bao gồm "Ý tưởng"
const workflowSteps = [
  "gen_script",
  "gen_image",
  "gen_video",
  "gen_voice",
  "gen_audio_sub",
  "complete",
];

const StepComponent = ({ steps = [] }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const navigate = useNavigate();

  const genScriptData = JSON.parse(localStorage.getItem("gen_script") || "{}");
  const currentStep = genScriptData?.current_step || "gen_script";
  const userPermissions = genScriptData?.members?.[0]?.functions || [];

  const currentStepIndex = workflowSteps.indexOf(currentStep);
  const isCreateMode = id === null;

  // Gán trạng thái cho từng bước
  const processedSteps = steps.map((step, index) => {
    const stepPermission = stepPermissionMap[step.label];

    // Xử lý đặc biệt cho "Ý tưởng"
    if (step.label === "Ý tưởng") {
      return {
        ...step,
        status: isCreateMode ? "active" : "completed",
        permission: stepPermission,
        route: stepRouteMap[step.label],
      };
    }

    // Nếu là chế độ tạo mới, tất cả các bước khác là pending
    if (isCreateMode) {
      return {
        ...step,
        status: "pending",
        permission: stepPermission,
        route: stepRouteMap[stepPermission],
      };
    }

    const stepIndex = workflowSteps.indexOf(stepPermission);
    let status = "pending";

    if (stepIndex < currentStepIndex) status = "completed";
    else if (stepIndex === currentStepIndex) status = "active";

    return {
      ...step,
      status,
      permission: stepPermission,
      route: stepRouteMap[stepPermission],
    };
  });

  // Lọc step theo quyền nhưng giữ "Ý tưởng"
  const filteredSteps = processedSteps.filter((step) => {
    if (step.label === "Ý tưởng") return true;
    return userPermissions.includes(step.permission);
  });

  const handleStepClick = (step) => {
    if (typeof step.route === "undefined") return;

    if (step.label === "Ý tưởng") {
      navigate(`/${step.route}${id ? `?id=${id}` : ""}`);
      return;
    }

    // Trong chế độ tạo mới, chỉ cho phép click vào Ý tưởng
    if (isCreateMode) return;

    const clickedStepIndex = workflowSteps.indexOf(step.permission);
    if (clickedStepIndex <= currentStepIndex) {
      navigate(`/${step.route}?id=${id}`);
    }
  };

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
              onClick={() => handleStepClick(step)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: { xs: "4px", md: "6px" },
                cursor:
                  (step.status !== "pending" || step.label === "Ý tưởng") &&
                  !isCreateMode
                    ? "pointer"
                    : step.label === "Ý tưởng"
                    ? "pointer"
                    : "default",
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

            {index < filteredSteps.length - 1 && (
              <Box
                sx={{
                  width: { xs: 16, md: 60 },
                  height: { xs: 11, md: 22 },
                  mx: { xs: 1, md: 2 },
                  borderTop:
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
