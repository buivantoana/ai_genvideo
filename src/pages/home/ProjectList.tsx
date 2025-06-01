import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import img from "../../images/snapedit_1733996450113.png";
const projects = [
  { name: "Thêm Dự án +", image: null },
  { name: "Dự án 2", image: img },
];

const ProjectList = () => {
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
        }}>
        {projects.map((project, index) => (
          <Card
            key={index}
            sx={{
              width: 324,
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
            }}>
            <Typography
              fontSize={"24px"}
              fontWeight={"700"}
              sx={{ WebkitTextStroke: "1px #2b2b85" }}>
              {project.name}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectList;
