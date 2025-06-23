import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
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
  Modal,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import StepComponent from "../../components/StepComponent";
import EditIcon from "@mui/icons-material/Edit";
import group from "../../images/Group 13.png";
import CheckIcon from "@mui/icons-material/Check";

const modelOptions2 = ["ChatGPT", "Runpod"];
const modelOptions4 = ["Local"];
const modelOptions3 = [
  "1920x1080 (16:9)",
  "1280x720 (16:9)",
  "1024x1024 (1:1)",
];
const dynamicSteps = [
  { label: "Ý tưởng", status: "completed" },
  { label: "Tạo kịch bản", status: "completed" },
  { label: "Tạo ảnh", status: "active" },
  { label: "Tạo Video", status: "pending" },
  { label: "Tạo Voice", status: "pending" },
  { label: "Nhạc nền và sub", status: "pending" },
  { label: "Hoàn thành ", status: "pending" },
];
const CreateImageView = ({
  genScript,
  setLoading,
  id,
  modelList,
  modelAdd,
  getModels,
  setModelAdd,
  setModelList,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedTab, setSelectedTab]: any = useState(
    genScript && genScript.video_type == "video2video" ? 1 : 0
  );
  const [model, setModel] = useState(modelList[0]?.key || "");
  const [px, setPx] = useState("1920x1080 (16:9)");
  const [openModal, setOpenModal] = useState(false);
  const [newModel, setNewModel] = useState({
    name: "",
    type: "",
    link: "",
  });
  console.log("modelList[0]?.key ", modelList[0]?.key);
  console.log("modelList ", modelList);
  const handleChange = (e) => {
    const selected = e.target.value;
    if (selected === "add_new") {
      setOpenModal(true);
    } else {
      setModel(selected);
    }
  };
  useEffect(() => {
    setModel(modelList[0]?.key);
  }, [modelList]);
  useEffect(() => {
    setNewModel((prev) => ({ ...prev, type: modelAdd[0]?.key }));
  }, [modelAdd]);
  useEffect(() => {
    if (genScript) {
      setSelectedTab(genScript?.video_type == "video2video" ? 1 : 0);
    }
  }, [genScript]);
  const handleAddModel = async () => {
    setLoading(true);
    const { name, type, link } = newModel;

    if (!name.trim() || !type.trim() || !link.trim()) {
      toast.warning("Vui lòng điền đầy đủ thông tin");
      return;
    }
    try {
      let result = await addModelImage({
        sub_type: type,
        name: name,
        model: link,
      });
      if (result) {
        setNewModel({ name: "", type: "", link: "" });
        setOpenModal(false);
        getModels();
      } else {
        toast.warning(result.detail);
      }
    } catch (error) {}

    setLoading(false);
  };
  return (
    <Box
      className='hidden-add-voice'
      sx={{
        bgcolor: "#0D0C2B",
        p: isMobile ? 1.5 : 6,
        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 4 },
      }}>
      <StepComponent steps={dynamicSteps} />
      {/* Toggle Tabs */}
      {/* <ResponsiveBox
        selectedTab={selectedTab}
        onTabChange={(index) => setSelectedTab(index)}
      /> */}
      <Box display={"flex"} flexWrap={"wrap"} gap={isMobile ? 1 : 3}>
        <FormControl variant='outlined' size='small'>
          <Select
            value={model}
            onChange={handleChange}
            IconComponent={ArrowDropDownIcon}
            renderValue={(selected) => {
              const selectedOption = modelList.find(
                (item) => item.key === selected
              );
              return selectedOption?.value || "Chọn model";
            }}
            sx={{
              background: "transparent",
              color: "#fff",
              borderRadius: 2,
              height: "48px",
              width: "max-content",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3A375F",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
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
                <Box
                  display='flex'
                  justifyContent='space-between'
                  gap={3}
                  width='100%'>
                  {option.value}
                  {model === option.key && <CheckIcon fontSize='small' />}
                </Box>
              </MenuItem>
            ))}
            <MenuItem value='add_new'>Thêm mới</MenuItem>
          </Select>

          {/* Modal thêm model */}
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box
              sx={{
                backgroundColor: "#1E1C34",
                color: "#fff",
                p: 4,
                width: isMobile ? "unset" : 600,
                mx: "auto",
                mt: "15%",
                borderRadius: 2,
              }}>
              <Typography variant='h6' mb={2}>
                Thêm mới model
              </Typography>
              <Box
                display={isMobile ? "unset" : "flex"}
                justifyContent={"space-between"}>
                <Box width={isMobile ? "100%" : "48%"}>
                  <Typography>Tên</Typography>
                  <TextField
                    value={newModel.name}
                    onChange={(e) =>
                      setNewModel((prev) => ({ ...prev, name: e.target.value }))
                    }
                    fullWidth
                    variant='outlined'
                    size='small'
                    sx={{
                      backgroundColor: "#1A1836",
                      borderRadius: 2,
                      input: { color: "white" },
                      "& .MuiOutlinedInput-root": {
                        height: isMobile ? "40px" : "50px", // 👈 Đặt ở đây mới ăn
                        alignItems: "center", // Canh giữa input text
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid",
                        borderColor: "#414188",
                      },
                    }}
                  />
                </Box>
                <Box width={isMobile ? "100%" : "48%"}>
                  {" "}
                  <Typography>Kiểu</Typography>{" "}
                  <Select
                    value={newModel.type}
                    onChange={(e) =>
                      setNewModel((prev) => ({ ...prev, type: e.target.value }))
                    }
                    sx={{
                      background: "transparent",
                      color: "#fff",
                      borderRadius: 1,
                      height: isMobile ? "38px" : "48px",
                      width: "100%", // 👈 Chiều cao mong muốn
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid",
                        borderColor: "#414188", // 👈 Viền mặc định
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid",
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
                    {modelAdd.map((option) => (
                      <MenuItem key={option} value={option.key}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>
              <Typography sx={{ mt: 1 }}>Link</Typography>{" "}
              <TextField
                value={newModel.link}
                onChange={(e) =>
                  setNewModel((prev) => ({ ...prev, link: e.target.value }))
                }
                fullWidth
                variant='outlined'
                size='small'
                sx={{
                  backgroundColor: "#1A1836",
                  borderRadius: 2,
                  input: { color: "white" },
                  "& .MuiOutlinedInput-root": {
                    height: isMobile ? "40px" : "50px", // 👈 Đặt ở đây mới ăn
                    alignItems: "center", // Canh giữa input text
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid",
                    borderColor: "#414188",
                  },
                }}
              />
              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: "rgba(89, 50, 234, 1)",
                    borderRadius: 1,
                    mt: 3,
                    width: "max-content",
                    height: isMobile ? "40px" : "50px",
                  }}
                  onClick={handleAddModel}>
                  Thêm mới model
                </Button>
              </Box>
            </Box>
          </Modal>
        </FormControl>
        {/* <FormControl variant='outlined' size='small'>
          <Select
            defaultValue='ChatGPT'
            sx={{
              background: "transparent",
              color: "#fff",
              borderRadius: 2,
              height: isMobile ? "38px" : "48px",
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
        </FormControl> */}
        {/* <FormControl variant='outlined' size='small'>
          <Select
            defaultValue='Local'
            sx={{
              background: "transparent",
              color: "#fff",
              borderRadius: 2,
              height: isMobile ? "38px" : "48px",
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
        </FormControl> */}
        <FormControl variant='outlined' size='small'>
          <Select
            defaultValue='1920x1080 (16:9)'
            value={px}
            onChange={(e) => setPx(e.target.value)}
            sx={{
              background: "transparent",
              color: "#fff",
              borderRadius: 2,
              width: "max-content",
              height: isMobile ? "38px" : "48px", // 👈 Chiều cao mong muốn
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

export default CreateImageView;

import { IconButton, Card, CardMedia, Grid, Stack } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { RiArrowRightSLine, RiRefreshLine } from "react-icons/ri";
import ResponsiveBox from "../../components/ResponsiveBox";
import { useNavigate } from "react-router-dom";
import {
  addModelImage,
  genScriptImage,
  genScriptImageStatus,
  updateProject,
  upload,
} from "../../service/project";
import { toast } from "react-toastify";

const SceneCard = forwardRef((props, ref) => {
  const { scene, values, setValues, model, px }: any = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const sceneData = values.find((v) => v.scene === scene);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Tạo URL từ file để hiển thị trực tiếp
      const imageUrl = URL.createObjectURL(file);

      // Cập nhật state với ảnh mới
      setValues((prev) =>
        prev.map((item) =>
          item.scene === scene
            ? {
                ...item,
                image: {
                  ...item.image,
                  imageUrls: [...(item.image.imageUrls || []), imageUrl],
                  file: file,
                  selected:
                    (item.image.imageUrls?.length || 0) === 0
                      ? 0
                      : item.image.selected,
                },
              }
            : item
        )
      );

      // Cập nhật localStorage nếu cần
      let script: any = localStorage.getItem("gen_script");
      if (script) {
        script = JSON.parse(script);
        script.prompts = script.prompts.map((item) =>
          item.scene === scene
            ? {
                ...item,
                image: {
                  ...item.image,
                  imageUrls: [...(item.image.imageUrls || []), imageUrl],
                  selected:
                    (item.image.imageUrls?.length || 0) === 0
                      ? 0
                      : item.image.selected,
                },
              }
            : item
        );
        localStorage.setItem("gen_script", JSON.stringify(script));
      }

      event.target.value = ""; // reset input
    }
  };
  // useEffect(() => {
  //   return () => {
  //     // Dọn dẹp các object URL khi component unmount
  //     if (sceneData?.image?.imageUrls) {
  //       sceneData.image.imageUrls.forEach((url) => {
  //         if (url.startsWith("blob:")) {
  //           URL.revokeObjectURL(url);
  //         }
  //       });
  //     }
  //     if (intervalId) clearInterval(intervalId);
  //   };
  // }, [intervalId, sceneData?.image?.imageUrls]);
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
              image: {
                ...item.image,
                selected: item.image.selected == index ? null : index,
              },
            }
          : item
      )
    );

    let script: any = localStorage.getItem("gen_script");
    if (script) {
      script = JSON.parse(script);
      script.prompts = script.prompts.map((item) =>
        item.scene === scene
          ? {
              ...item,
              image: {
                ...item.image,
                selected: item.image.selected == index ? null : index,
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
    let image = values.find((item) => item.scene == scene)?.image;
    if (
      image &&
      Object.keys(image).length > 0 &&
      typeof image.selected == "number" &&
      image?.imageUrls &&
      image?.imageUrls.length > 0
    ) {
      image = image?.imageUrls[image?.selected];
    }
    console.log("image", image);
    const [width, height] = px.split(" ")[0].split("x").map(Number);
    let formData = new FormData();
    formData.append("width", width);
    formData.append("height", height);
    formData.append("prompt", sceneData.image.prompt);
    formData.append("n_prompt", sceneData.image.n_prompt);
    formData.append("model", model);
    const isUploadedImage = (url) => {
      return typeof url === "string" && url.startsWith("blob:");
    };
    if (image) {
      if (isUploadedImage(image)) {
        const uploadResult = await upload({
          file: sceneData.image.file,
          folder: "images",
        });

        if (!uploadResult || !uploadResult.url) {
          throw new Error("Failed to upload audio file");
        }
        let script: any = localStorage.getItem("gen_script");
        if (script) {
          script = JSON.parse(script);
          script.script.scenes = values.map((item) => {
            if (item.scene == scene) {
              return {
                ...item,
                image: {
                  ...item.image,
                  ids: [...(item.image.ids || []), uploadResult.id],
                  imageUrls: [
                    ...(item.image.imageUrls || []),
                    uploadResult.url,
                  ].filter((item) => item != image),
                  selected:
                    (item.image.imageUrls?.length || 0) === 0
                      ? 0
                      : item.image.selected,
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
                  image: {
                    ...item.image,
                    ids: [...(item.image.ids || []), uploadResult.id],
                    imageUrls: [
                      ...(item.image.imageUrls || []),
                      uploadResult.url,
                    ].filter((item) => item != image),
                    selected:
                      (item.image.imageUrls?.length || 0) === 0
                        ? 0
                        : item.image.selected,
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
        return;
      } else {
        formData.append("input_image_url", image);
      }
    }
    if (fileImage) {
      formData.append("input_image_file", fileImage);
    }
    try {
      let result = await genScriptImage(formData);

      if (result && result.code === 2) {
        const poll = setInterval(async () => {
          const status = await genScriptImageStatus(result.id);
          if (status?.code === 0 && status?.image_url) {
            let script: any = localStorage.getItem("gen_script");
            if (script) {
              script = JSON.parse(script);
              script.script.scenes = values.map((item) => {
                if (item.scene == scene) {
                  return {
                    ...item,
                    image: {
                      ...item.image,
                      ids: [...(item.image.ids || []), result.id],
                      imageUrls: [
                        ...(item.image.imageUrls || []),
                        status.image_url,
                      ],
                      selected:
                        (item.image.imageUrls?.length || 0) === 0
                          ? 0
                          : item.image.selected,
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
                      image: {
                        ...item.image,
                        ids: [...(item.image.ids || []), result.id],
                        imageUrls: [
                          ...(item.image.imageUrls || []),
                          status.image_url,
                        ],
                        selected:
                          (item.image.imageUrls?.length || 0) === 0
                            ? 0
                            : item.image.selected,
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
                image: {
                  ...item.image,
                  ids: [...(item.image.ids || []), result.id],
                  imageUrls: [
                    ...(item.image.imageUrls || []),
                    result.image_url,
                  ],
                  selected:
                    (item.image.imageUrls?.length || 0) === 0
                      ? 0
                      : item.image.selected,
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
                  image: {
                    ...item.image,
                    ids: [...(item.image.ids || []), result.id],
                    imageUrls: [...(item.image.imageUrls || []), newImageUrl],
                    selected:
                      (item.image.imageUrls?.length || 0) === 0
                        ? 0
                        : item.image.selected,
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
            Phần lời kể:
          </Typography>
          {sceneData?.image?.imageUrls?.length > 0 && (
            <Button
              startIcon={loading ? <></> : <RiRefreshLine />}
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
                  <span>Đang tạo ảnh...</span>
                </Stack>
              ) : (
                "Tạo ảnh mới"
              )}
            </Button>
          )}
        </Stack>
        <Typography mb={2}>Prompt:</Typography>
        <Box position='relative'>
          <TextField
            multiline
            fullWidth
            minRows={2}
            maxRows={5}
            value={sceneData?.image?.prompt}
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
        <Typography mb={2}>Negative Prompt:</Typography>
        <Box position='relative'>
          <TextField
            multiline
            fullWidth
            minRows={2}
            maxRows={5}
            value={sceneData?.image?.n_prompt}
            onChange={(e) => handleChange("n_prompt", e.target.value)}
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
            {sceneData?.image?.imageUrls?.length > 0 ? (
              <>
                {sceneData.image.imageUrls.map((item, index) => {
                  let selected = sceneData.image.selected == index;
                  return (
                    <ImageGridItem
                      index={index}
                      handleSelectedImage={handleSelectedImage}
                      isMobile={isMobile}
                      item={item}
                      selected={selected}
                    />
                  );
                })}{" "}
              </>
            ) : (
              <Grid
                item
                xs={5}
                sx={{ mr: isMobile ? "0px" : "20px" }}
                sm={4}
                md={3}>
                <Card
                  sx={{
                    bgcolor: "#292a45",
                    height: isMobile ? 150 : 220,

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
                      minWidth: isMobile ? 120 : 150, // để text và spinner không bị co
                      height: 36,
                      opacity: loading ? 0.8 : 1,
                      pointerEvents: loading ? "none" : "unset",
                    }}>
                    {loading ? (
                      <Stack direction='row' alignItems='center' spacing={1}>
                        <CircularProgress size={16} color='inherit' />
                        <span>Đang tạo ảnh...</span>
                      </Stack>
                    ) : (
                      "Xác nhận tạo ảnh"
                    )}
                  </Button>
                </Card>
              </Grid>
            )}
            <Grid item xs={5} sm={4} md={3}>
              <Card
                onClick={handleUploadClick}
                sx={{
                  bgcolor: "#292a45",
                  height: isMobile ? 150 : 220,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  cursor: "pointer",
                  opacity: loadingUpload ? 0.7 : 1,
                  pointerEvents: loadingUpload ? "none" : "auto",
                }}>
                {loadingUpload ? (
                  <Stack direction='row' alignItems='center' spacing={1}>
                    <CircularProgress size={20} color='inherit' />
                    <Typography color='white'>Đang tải ảnh...</Typography>
                  </Stack>
                ) : (
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
                )}
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  hidden
                  onChange={handleFileChange}
                />
              </Card>
            </Grid>
          </Grid>
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
              <Typography> {sceneData.image.n_prompt}</Typography>
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
            />
          ))}
      </Stack>
    </Box>
  );
});
const SceneCardDialogue = forwardRef((props, ref) => {
  const { scene, values, setValues, model, px, index, parentScene }: any =
    props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Tìm scene cha
  const parentSceneData = values.find((v) => v.scene === parentScene);
  // Lấy dialogue item dựa vào index
  const dialogueItem = parentSceneData?.dialogue?.[index] || {};

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      // Cập nhật state với ảnh mới vào đúng dialogue item
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
                          imageUrls: [...(d.image?.imageUrls || []), imageUrl],
                          file: file,
                          selected:
                            (d.image?.imageUrls?.length || 0) === 0
                              ? 0
                              : d.image?.selected,
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
                        image: {
                          ...d.image,
                          imageUrls: [...(d.image?.imageUrls || []), imageUrl],
                          selected:
                            (d.image?.imageUrls?.length || 0) === 0
                              ? 0
                              : d.image?.selected,
                        },
                      }
                    : d
                ),
              }
            : item
        );
        localStorage.setItem("gen_script", JSON.stringify(script));
      }

      event.target.value = "";
    }
  };

  // useEffect(() => {
  //   return () => {
  //     // Dọn dẹp các object URL
  //     if (dialogueItem?.image?.imageUrls) {
  //       dialogueItem.image.imageUrls.forEach((url) => {
  //         if (url.startsWith("blob:")) {
  //           URL.revokeObjectURL(url);
  //         }
  //       });
  //     }
  //     if (intervalId) clearInterval(intervalId);
  //   };
  // }, [intervalId, dialogueItem?.image?.imageUrls]);

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
                      image: {
                        ...d.image,
                        selected:
                          d.image?.selected === selectedIndex
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
                      image: {
                        ...d.image,
                        selected:
                          d.image?.selected === selectedIndex
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

    let image = dialogueItem?.image;
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
    formData.append("prompt", dialogueItem.image?.prompt || "");
    formData.append("n_prompt", dialogueItem.image?.n_prompt || "");
    formData.append("model", model);

    const isUploadedImage = (url) => {
      return typeof url === "string" && url.startsWith("blob:");
    };

    if (image) {
      if (isUploadedImage(image)) {
        const uploadResult = await upload({
          file: dialogueItem.image.file,
          folder: "images",
        });

        if (!uploadResult || !uploadResult.url) {
          throw new Error("Failed to upload audio file");
        }

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
                            ids: [...(d.image?.ids || []), uploadResult.id],
                            imageUrls: [
                              ...(d.image?.imageUrls || []),
                              uploadResult.url,
                            ].filter((item) => item != image),
                            selected:
                              (d.image?.imageUrls?.length || 0) === 0
                                ? 0
                                : d.image?.selected,
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
                          image: {
                            ...d.image,
                            ids: [...(d.image?.ids || []), uploadResult.id],
                            imageUrls: [
                              ...(d.image?.imageUrls || []),
                              uploadResult.url,
                            ].filter((item) => item != image),
                            selected:
                              (d.image?.imageUrls?.length || 0) === 0
                                ? 0
                                : d.image?.selected,
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
        return;
      } else {
        formData.append("input_image_url", image);
      }
    }
    if (fileImage) {
      formData.append("input_image_file", fileImage);
    }

    try {
      let result = await genScriptImage(formData);

      if (result && result.code === 2) {
        const poll = setInterval(async () => {
          const status = await genScriptImageStatus(result.id);
          if (status?.code === 0 && status?.image_url) {
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
                              image: {
                                ...d.image,
                                ids: [...(d.image?.ids || []), result.id],
                                imageUrls: [
                                  ...(d.image?.imageUrls || []),
                                  status.image_url,
                                ],
                                selected:
                                  (d.image?.imageUrls?.length || 0) === 0
                                    ? 0
                                    : d.image?.selected,
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
                              image: {
                                ...d.image,
                                ids: [...(d.image?.ids || []), result.id],
                                imageUrls: [
                                  ...(d.image?.imageUrls || []),
                                  status.image_url,
                                ],
                                selected:
                                  (d.image?.imageUrls?.length || 0) === 0
                                    ? 0
                                    : d.image?.selected,
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
                          image: {
                            ...d.image,
                            ids: [...(d.image?.ids || []), result.id],
                            imageUrls: [
                              ...(d.image?.imageUrls || []),
                              result.image_url,
                            ],
                            selected:
                              (d.image?.imageUrls?.length || 0) === 0
                                ? 0
                                : d.image?.selected,
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
                          image: {
                            ...d.image,
                            ids: [...(d.image?.ids || []), result.id],
                            imageUrls: [
                              ...(d.image?.imageUrls || []),
                              result.image_url,
                            ],
                            selected:
                              (d.image?.imageUrls?.length || 0) === 0
                                ? 0
                                : d.image?.selected,
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

  console.log("dialogueItem", dialogueItem);
  return (
    <Box sx={{ borderRadius: 2, mb: 4 }}>
      <Stack spacing={2}>
        <Stack direction='row' gap='30px' alignItems='center'>
          <Typography
            variant='h6'
            fontSize={{ xs: ".8rem", md: "1.15rem" }}
            fontStyle={"italic"}
            color='white'>
            Lời thoại {index + 1}:
          </Typography>
          {dialogueItem?.image?.imageUrls?.length > 0 && (
            <Button
              startIcon={loading ? <></> : <RiRefreshLine />}
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
                  <span>Đang tạo ảnh...</span>
                </Stack>
              ) : (
                "Tạo ảnh mới"
              )}
            </Button>
          )}
        </Stack>

        <Typography mb={2}>Prompt:</Typography>
        <Box position='relative'>
          <TextField
            multiline
            fullWidth
            minRows={2}
            maxRows={5}
            value={dialogueItem?.image?.prompt || ""}
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

        <Typography mb={2}>Negative Prompt:</Typography>
        <Box position='relative'>
          <TextField
            multiline
            fullWidth
            minRows={2}
            maxRows={5}
            value={dialogueItem?.image?.n_prompt || ""}
            onChange={(e) => handleChange("n_prompt", e.target.value)}
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
            {dialogueItem.image?.imageUrls?.length > 0 ? (
              dialogueItem.image.imageUrls.map((item, idx) => (
                <ImageGridItem
                  key={idx}
                  index={idx}
                  handleSelectedImage={handleSelectedImage}
                  isMobile={isMobile}
                  item={item}
                  selected={dialogueItem.image?.selected === idx}
                />
              ))
            ) : (
              <Grid
                item
                xs={5}
                sx={{ mr: isMobile ? "0px" : "20px" }}
                sm={4}
                md={3}>
                <Card
                  sx={{
                    bgcolor: "#292a45",
                    height: isMobile ? 150 : 220,
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
                        <span>Đang tạo ảnh...</span>
                      </Stack>
                    ) : (
                      "Xác nhận tạo ảnh"
                    )}
                  </Button>
                </Card>
              </Grid>
            )}
            <Grid item xs={5} sm={4} md={3}>
              <Card
                onClick={handleUploadClick}
                sx={{
                  bgcolor: "#292a45",
                  height: isMobile ? 150 : 220,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  cursor: "pointer",
                  opacity: loadingUpload ? 0.7 : 1,
                  pointerEvents: loadingUpload ? "none" : "auto",
                }}>
                {loadingUpload ? (
                  <Stack direction='row' alignItems='center' spacing={1}>
                    <CircularProgress size={20} color='inherit' />
                    <Typography color='white'>Đang tải ảnh...</Typography>
                  </Stack>
                ) : (
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
                )}
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  hidden
                  onChange={handleFileChange}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
});

function SceneEditor({ genScript, model, px, setLoading, id }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const [values, setValues] = useState(genScript?.script?.scenes || []);
  const [check, setCheck] = useState(false);
  const sceneRefs: any = useRef([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  // ví dụ: { 0: { field: 'description' } }
  useEffect(() => {
    if (genScript) {
      const scenesData = genScript?.script?.scenes || [];
      localStorage.setItem("gen_script", JSON.stringify(genScript));
      setValues(scenesData);
    }
  }, [genScript]);

  useEffect(() => {
    if (check) {
      let script: any = localStorage.getItem("gen_script");
      if (script) {
        console.log("toan update", values);
        script = JSON.parse(script);
        script.script.scenes = values;
        localStorage.setItem("gen_script", JSON.stringify(script));
      }
      setCheck(false);
    }
  }, [check]);
  const handleGenerateAllImages = async () => {
    setLoading(true);
    try {
      console.log(
        "Bắt đầu quá trình tạo tất cả ảnh, tổng số phân cảnh:",
        sceneRefs.current.length
      );

      let completedScenes = 0;

      // Tạo một bản sao của values để làm việc
      const updatedValues = [...values];

      for (let i = 0; i < updatedValues.length; i++) {
        const sceneData = updatedValues[i];

        // Xử lý ảnh chính của scene
        if (sceneData.image && !sceneData.image.ids) {
          console.log(`Bắt đầu tạo ảnh chính cho phân cảnh ${sceneData.scene}`);
          try {
            const [width, height] = px.split(" ")[0].split("x").map(Number);
            let formData = new FormData();
            formData.append("width", width);
            formData.append("height", height);
            formData.append("prompt", sceneData.image.prompt);
            formData.append("n_prompt", sceneData.image.n_prompt);
            formData.append("model", model);

            const result = await genScriptImage(formData);

            if (result && result.code === 2) {
              const pollResult = await new Promise((resolve, reject) => {
                const poll = setInterval(async () => {
                  try {
                    const status = await genScriptImageStatus(result.id);
                    if (status?.code === 0 && status?.image_url) {
                      sceneData.image.ids = [
                        ...(sceneData.image.ids || []),
                        result.id,
                      ];
                      sceneData.image.imageUrls = [
                        ...(sceneData.image.imageUrls || []),
                        status.image_url,
                      ];
                      sceneData.image.selected =
                        (sceneData.image.imageUrls?.length || 0) === 0
                          ? 0
                          : sceneData.image.selected;
                      clearInterval(poll);
                      resolve(status);
                    }
                  } catch (error) {
                    clearInterval(poll);
                    reject(error);
                  }
                }, 2000);

                setTimeout(() => {
                  clearInterval(poll);
                  reject(new Error("Hết thời gian chờ trạng thái ảnh"));
                }, 60000);
              });
            } else if (result.code === 0) {
              const newImageUrl = result?.image_url || "";
              sceneData.image.ids = [...(sceneData.image.ids || []), result.id];
              sceneData.image.imageUrls = [
                ...(sceneData.image.imageUrls || []),
                newImageUrl,
              ];
              sceneData.image.selected =
                (sceneData.image.imageUrls?.length || 0) === 0
                  ? 0
                  : sceneData.image.selected;
            }

            console.log(
              `Hoàn tất tạo ảnh chính cho phân cảnh ${sceneData.scene}`
            );
            completedScenes++;
          } catch (error) {
            console.error(
              `Lỗi khi tạo ảnh chính cho phân cảnh ${sceneData.scene}:`,
              error
            );
          }
        }

        // Xử lý ảnh trong dialogue nếu có
        if (sceneData.dialogue && sceneData.dialogue.length > 0) {
          for (let j = 0; j < sceneData.dialogue.length; j++) {
            const dialogueItem = sceneData.dialogue[j];

            if (dialogueItem.image && !dialogueItem.image.ids) {
              console.log(
                `Bắt đầu tạo ảnh dialogue ${j + 1} cho phân cảnh ${
                  sceneData.scene
                }`
              );
              try {
                const [width, height] = px.split(" ")[0].split("x").map(Number);
                let formData = new FormData();
                formData.append("width", width);
                formData.append("height", height);
                formData.append("prompt", dialogueItem.image.prompt);
                formData.append("n_prompt", dialogueItem.image.n_prompt);
                formData.append("model", model);

                const result = await genScriptImage(formData);

                if (result && result.code === 2) {
                  const pollResult = await new Promise((resolve, reject) => {
                    const poll = setInterval(async () => {
                      try {
                        const status = await genScriptImageStatus(result.id);
                        if (status?.code === 0 && status?.image_url) {
                          dialogueItem.image.ids = [
                            ...(dialogueItem?.image?.ids || []),
                            result.id,
                          ];
                          dialogueItem.image.imageUrls = [
                            ...(dialogueItem?.image?.imageUrls || []),
                            status.image_url,
                          ];
                          dialogueItem.image.selected =
                            dialogueItem.image.imageUrls.length - 1;
                          clearInterval(poll);
                          resolve(status);
                        }
                      } catch (error) {
                        clearInterval(poll);
                        reject(error);
                      }
                    }, 2000);

                    setTimeout(() => {
                      clearInterval(poll);
                      reject(new Error("Hết thời gian chờ trạng thái ảnh"));
                    }, 60000);
                  });
                } else if (result.code === 0) {
                  const newImageUrl = result?.image_url || "";
                  dialogueItem.image.ids = [
                    ...(dialogueItem.image.ids || []),
                    result.id,
                  ];
                  dialogueItem.image.imageUrls = [
                    ...(dialogueItem.image.imageUrls || []),
                    newImageUrl,
                  ];
                  dialogueItem.image.selected =
                    dialogueItem.image.imageUrls.length - 1;
                }

                console.log(
                  `Hoàn tất tạo ảnh dialogue ${j + 1} cho phân cảnh ${
                    sceneData.scene
                  }`
                );
                completedScenes++;
              } catch (error) {
                console.error(
                  `Lỗi khi tạo ảnh dialogue ${j + 1} cho phân cảnh ${
                    sceneData.scene
                  }:`,
                  error
                );
              }
            }
          }
        }
      }

      // Cập nhật state với dữ liệu mới
      setValues(updatedValues);

      // Lưu vào localStorage theo đúng cấu trúc
      localStorage.setItem(
        "gen_script",
        JSON.stringify({
          ...genScript,
          script: {
            ...genScript.script,
            scenes: updatedValues,
          },
        })
      );

      setTimeout(() => {
        setCheck(true);
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error("Lỗi chung khi tạo toàn bộ ảnh:", error);
    }
  };
  const downloadImage = async ({ imageUrl }) => {
    setLoading(true);

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Không thể tải ảnh. Kiểm tra lại URL.");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "downloaded-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box display={"flex"} alignItems={"center"} gap={"20px"}>
        <Typography
          variant='h5'
          fontSize={isMobile ? "1rem" : "1.5rem"}
          fontWeight={"bold"}>
          Tạo ảnh
        </Typography>
        <Button
          variant='contained'
          onClick={handleGenerateAllImages}
          sx={{
            background: " linear-gradient(135deg, #FDD819 0%, #E80505 100%)",
            borderRadius: 1,
            fontSize: isMobile ? "0.675rem" : "0.875rem",
          }}>
          Tạo toàn bộ ảnh
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 1, mt: 1, mb: 1, overflowX: "auto" }}>
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
            }}>
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
              }}>
              Phân cảnh {index + 1}
              <Box
                sx={{
                  position: "absolute",
                  bottom: "0px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}>
                <Box
                  sx={{
                    width: "80%",
                    height: "2px",
                    bgcolor:
                      index == currentSceneIndex
                        ? "rgba(89, 50, 234, 1)"
                        : "unset",
                  }}></Box>
              </Box>
            </Typography>
            {!(index == values.length - 1) && (
              <RiArrowRightSLine size={isMobile ? 20 : 30} />
            )}
          </Box>
        ))}
      </Box>
      <Box sx={{ minHeight: "100vh", pb: 3 }}>
        {values && values.length > 0 && (
          <SceneCard
            key={currentSceneIndex}
            scene={values[currentSceneIndex].scene}
            values={values}
            setValues={setValues}
            model={model}
            px={px}
            ref={(el) => (sceneRefs.current[currentSceneIndex] = el)}
          />
        )}

        <Box textAlign='center'>
          {/* <Box
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
                width: isMobile ? "100%" : "38%",
                fontWeight: 600,
                border: "2px dashed rgba(89, 50, 234, 1)",
                "&:hover": {
                  background: "#5900cc",
                },
                height: isMobile ? 40 : 50,
                fontSize: isMobile ? "15px" : "18px",
              }}>
              + Thêm màn mới
            </Button>
          </Box> */}

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
                // Kiểm tra ảnh chính và ảnh trong dialogue
                const hasMissingImage = values.some((item) => {
                  // Kiểm tra video chính
                  const mainImageMissing = !item.image?.imageUrls || 
                                         (typeof item.image.selected !== "number") || 
                                         !item.image.imageUrls[item.image.selected];
                
                  // Kiểm tra video trong dialogue (nếu có)
                  const dialogueImageMissing = item.dialogue?.some((dialogueItem) => {
                    return dialogueItem.image && 
                           (!dialogueItem.image.imageUrls || 
                            (typeof dialogueItem.image.selected !== "number") || 
                            !dialogueItem.image.imageUrls[dialogueItem.image.selected]);
                  });
                
                  return mainImageMissing || dialogueImageMissing;
                });
                
                if (hasMissingImage) {
                  toast.warning("Bạn cần tạo Video cho mỗi phân cảnh và dialogue");
                  return;
                }

                try {
                  setLoading(true);
                  if (!id) {
                    throw new Error("ID dự án không tồn tại");
                  }

                  const isUploadedImage = (url) => {
                    return typeof url === "string" && url.startsWith("blob:");
                  };

                  // Hàm xử lý upload ảnh
                  const handleImageUpload = async (
                    imageData,
                    width,
                    height
                  ) => {
                    if (
                      isUploadedImage(imageData.imageUrls[imageData.selected])
                    ) {
                      const uploadResult = await upload({
                        file: imageData.file,
                        folder: "images",
                      });

                      if (!uploadResult || !uploadResult.url) {
                        throw new Error("Failed to upload audio file");
                      }

                      return {
                        id: uploadResult.id,
                        image_url: uploadResult.url,
                        n_prompt: imageData.n_prompt,
                        prompt: imageData.prompt,
                      };
                    }
                    return {
                      id: imageData.ids[imageData.selected],
                      n_prompt: imageData.n_prompt,
                      prompt: imageData.prompt,
                      url: imageData.imageUrls[imageData.selected],
                    };
                  };

                  const [width, height] = px
                    .split(" ")[0]
                    .split("x")
                    .map(Number);

                  // Chờ tất cả Promise từ map hoàn thành
                  const updatedValues = await Promise.all(
                    values.map(async (item) => {
                      // Xử lý ảnh chính
                      const updatedImage = await handleImageUpload(
                        item.image,
                        width,
                        height
                      );

                      // Xử lý ảnh trong dialogue
                      const updatedDialogue = await Promise.all(
                        (item.dialogue || []).map(async (dlg) => {
                          if (dlg.image) {
                            const dialogueImage = await handleImageUpload(
                              dlg.image,
                              width,
                              height
                            );
                            return {
                              ...dlg,
                              image: dialogueImage,
                            };
                          }
                          return dlg;
                        })
                      );

                      // Xử lý video
                      const updatedVideo = Object.fromEntries(
                        Object.entries(item.video || {}).filter(
                          ([_, value]) => value !== null
                        )
                      );

                      return {
                        ...item,
                        image: updatedImage,
                        video: updatedVideo,
                        dialogue: updatedDialogue,
                      };
                    })
                  );

                  const result = await updateProject(id, {
                    current_step: "gen_image",
                    script: {
                      ...genScript.script,
                      scenes: updatedValues,
                    },
                  });

                  if (result && result.name) {
                    localStorage.setItem("gen_script", JSON.stringify(result));
                    setTimeout(() => {
                      navigate(`/create-video?id=${id}`);
                    }, 500);
                  } else {
                    throw new Error("Cập nhật dự án thất bại");
                  }
                } catch (error) {
                  console.error("Lỗi:", error);
                  toast.error(
                    error.message || "Có lỗi xảy ra khi xác nhận ảnh"
                  );
                } finally {
                  setLoading(false);
                }
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
              Xác nhận ảnh
            </Button>

            <Button
              variant='contained'
              onClick={() => {
                //  for (let i = 0; i < values.length; i++) {
                //    const element = values[i];
                //    console.log(element);
                //    if (
                //      element.image &&
                //      element.image.imageUrls &&
                //      typeof element.image.selected == "number" &&
                //      element.image.imageUrls[element.image.selected]
                //    ) {
                //      downloadImage({
                //        imageUrl:
                //          element.image.imageUrls[element.image.selected],
                //      });
                //    }
                //  }
                downloadImage({
                  imageUrl:
                    "https://dev.zeezoo.mobi:8082/results/images/219.jpg",
                });
              }}
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
              Tải hàng loạt (
              {values &&
                values?.filter(
                  (item) => typeof item?.image?.selected == "number"
                ).length}
              )
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

import { Dialog } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Close } from "@mui/icons-material";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
const ImageGridItem = ({
  item,
  index,
  handleSelectedImage,
  isMobile,
  selected,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid
        onClick={() => handleSelectedImage(index)}
        item
        xs={5}
        sx={{
          mr: isMobile ? "0px" : "20px",
          display: "flex",
          gap: "10px",
          position: "relative", // Added to position the icon relative to the Grid
        }}
        sm={4}
        md={3}>
        <CardMedia
          component='img'
          height={isMobile ? "150px" : "220px"}
          sx={{
            objectFit: "cover",
            borderRadius: 1,
            border: selected ? "3px solid green" : "none",
          }}
          image={item}
          alt='uploaded'
        />
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // Prevent Grid's onClick from firing
            handleOpen();
          }}
          sx={{
            position: "absolute",
            top: "10px", // Position in top-right corner
            right: "10px",
            color: "white", // White icon for visibility
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}>
          <ZoomOutMapIcon />
        </IconButton>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='lg'
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "transparent", // Transparent background for dialog
            boxShadow: "none",
          },
        }}>
        <CardMedia
          component='img'
          sx={{
            width: "100%",
            height: "90vh", // Full viewport height
            objectFit: "contain", // Fit image without cropping
            backgroundColor: "black", // Black background for better contrast
          }}
          image={item}
          alt='uploaded full screen'
        />
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}>
          <Close /> {/* You can replace with a CloseIcon if preferred */}
        </IconButton>
      </Dialog>
    </>
  );
};
