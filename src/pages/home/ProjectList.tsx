import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import img from "../../images/snapedit_1733996450113.png";
import { useNavigate } from "react-router-dom";
const projects = [{ name: "Thêm Dự án +", image: null }];

const ProjectList = ({ project }: any) => {
  console.log("img", project);
  const navigate = useNavigate();
  return (
    <Box>
      <Typography
        variant='h5'
        sx={{
          color: "white",
          mb: 3,
          fontWeight: "600",
          fontSize: { xs: "1.25rem", md: "1.5rem" },
        }}>
        Danh sách dự án
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          flexWrap: "wrap",
        }}>
        {projects.map((project, index) => (
          <Card
            onClick={() => navigate("/idea")}
            key={index}
            sx={{
              width: { xs: "100%", md: "23%" },
              backgroundImage: `url(${project.image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "120%",
              backgroundPosition: "20% 20%",
              height: "180px",
              bgcolor: "#1b1835",
              color: "white",
              border: "2px solid #3D3D79",
              padding: 0,
              borderRadius: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}>
            <Typography
              fontSize={"24px"}
              fontWeight={"700"}
              sx={{ WebkitTextStroke: "1px #2b2b85" }}>
              {project.name}
            </Typography>
          </Card>
        ))}
        {project.map((item, index) => {
          return (
            <Card
              onClick={() => {
                localStorage.setItem("gen_script", JSON.stringify(item));
                setTimeout(() => {
                  navigate(`/idea?id=${item.id}`);
                }, 200);
              }}
              key={index}
              sx={{
                width: { xs: "100%", md: "23%" },
                backgroundImage: `url(${img})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "120%",
                backgroundPosition: "20% 20%",
                height: "180px",
                bgcolor: "#1b1835",
                color: "white",
                border: "2px solid #3D3D79",
                padding: 0,
                borderRadius: "16px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}>
              <Typography
                fontSize={"24px"}
                fontWeight={"700"}
                sx={{ WebkitTextStroke: "1px #2b2b85" }}>
                {item.name}
              </Typography>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProjectList;
