import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCoursesContext } from "../App";
import LayoutWebsite from "../components/layouts/LayoutWebsite";
import NotFound from "../components/NotFound";
import HomeController from "../pages/home/HomeController";
import IdeaController from "../pages/idea/IdeaController";
import ScriptController from "../pages/script/ScriptController";

const Router = () => {
  const context: any = useCoursesContext();
  return (
    <Routes>
      <Route path='/' element={<LayoutWebsite />}>
        <Route path='' element={<HomeController />} />
        <Route path='/idea' element={<IdeaController />} />
        <Route path='/script' element={<ScriptController />} />
      </Route>
      {/* <Route path='/admin' element={<LayoutAdmin />}>
        <Route path='' element={<DashBoardController />} />
      </Route> */}
      {/* <Route path='reset-password' element={<ResetPasswordController />} /> */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Router;
