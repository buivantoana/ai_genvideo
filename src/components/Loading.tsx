import { Box, CircularProgress } from "@mui/material";
import logo from "../images/Spin@1x-1.0s-200px-200px.gif";
const Loading = (props: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: props.width ? props.width : "100%",
        height: props.height ? props.height : "100vh",
        position: props.position ? props.position : "fixed",
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,.8)",
        zIndex: 10000,
      }}>
      <Box>
        <img src={logo} width={"60px"} alt='' />
      </Box>
    </Box>
  );
};

export default Loading;
