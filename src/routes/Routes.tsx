import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCoursesContext } from "../App";
import LayoutWebsite from "../components/layouts/LayoutWebsite";
import NotFound from "../components/NotFound";
import HomeController from "../pages/home/HomeController";
import IdeaController from "../pages/idea/IdeaController";
import ScriptController from "../pages/script/ScriptController";
import CreateImageController from "../pages/create_image/CreateImageController";
import CreateVideoController from "../pages/create_video/CreateVideoController";
import NarratorController from "../pages/narrtor/NarratorController";
import SubController from "../pages/sub/SubController";
import SuccessController from "../pages/success/SuccessController";
import LoginController from "../pages/login/LoginController";
import AccountController from "../pages/account/AccountController";
import ProjectManagerController from "../pages/project_manager/ProjectManagerController";

const Router = () => {
  const context: any = useCoursesContext();
  return (
    <Routes>
      <Route path='/' element={<LayoutWebsite />}>
        <Route path='' element={<HomeController />} />
        <Route path='/idea' element={<IdeaController />} />
        <Route path='/script' element={<ScriptController />} />
        <Route path='/create-image' element={<CreateImageController />} />
        <Route path='/create-video' element={<CreateVideoController />} />
        <Route path='/narrator' element={<NarratorController />} />
        <Route path='/sub' element={<SubController />} />
        <Route path='/success' element={<SuccessController />} />
        <Route path='/account' element={<AccountController />} />
        <Route path='/project-manager' element={<ProjectManagerController />} />
      </Route>
      {/* <Route path='/admin' element={<LayoutAdmin />}>
        <Route path='' element={<DashBoardController />} />
      </Route> */}
      <Route path='login' element={<LoginController />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Router;
