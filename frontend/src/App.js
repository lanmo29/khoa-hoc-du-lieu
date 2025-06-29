import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import "./App.scss";
import Home from "./features/components/Home/Home";
import Jobs from "./features/components/Jobs/Jobs";
import { checkBar } from "./features/container/Functionjs";
import "antd/dist/antd.css";
import DetailJob from "./features/components/DetailJob/DetailJob";
import ListNews from "./features/components/ListNews/ListNews";
import DetailNew from "./features/components/DetailNew/DetailNew";
import Company from "./features/components/company/Company";
import DetailCompany from "./features/components/DetailCompany/DetailCompany";
import Candidates from "./features/components/Candidates/Candidates";
import DetailCandidate from "./features/components/DetailCandidate/DetailCandidate";
import Login from "./features/components/Login/Login";
import Admin from "./app/Admin";
import Register from "./features/components/Register/Register";
import InforCompany from "./features/components/inforCompany/InforCompany";
import InforUser from "./features/components/inforUser/InforUser";
import CreateCv from "./features/components/CreateCv/CreateCv";
import DetailFormCV from "./features/components/DetaiFormCV/DetaiFormCV";
import InforCV from "./features/components/CreateCv/InforCV/InforCV";
import checkLoginApi from "./api/checkLogin";
import Empty from "./features/components/Empty/Empty";
import Menu from "./features/components/Home/Menu/Menu";
import CheckMenu from "./features/components/CheckMenu/CheckMenu";
import ForgetPassword from "./features/components/ForgetPassword/ForgetPassword";
function App() {
  useEffect(() => {
    checkBar();
  }, []);

  const [isLoad, setIsLoad] = useState(true);

  const handleLogin = () => {
    setIsLoad(!isLoad);
  };

  const [checkAdmin, setCheckAdmin] = useState();
  useEffect(() => {
    checkLoginApi.checkLogin().then((ok) => {
      let user = ok.data.user.role;
      console.log(user);
      // console.log("ddddd");
      if (user === "admin" || user === "grant") {
        setCheckAdmin(
          <Route path="/admin">
            <Ladmin />
          </Route>
        );
      } else {
        setCheckAdmin(
          <Route path="/admin">
            <Empty />
          </Route>
        );
      }
    }).catch((err) => { });
  }, [isLoad]);

  return (
    <div>
      <Router>
        <Switch>
          <Route
            path={[
              "/admin",
              "/",
              // "/register", "/Login", "/ForgetPassword",
            ]}
          >
            <CheckMenu />
          </Route>
        </Switch>
        {checkAdmin}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/jobs">
            <Jobs />
          </Route>
          <Route exact path="/news">
            <ListNews />
          </Route>
          <Route exact path="/news/detailNew/:id">
            <DetailNew />
          </Route>
          <Route exact path="/jobs/work/:id">
            <DetailJob />
          </Route>
          <Route exact path="/companys">
            <Company />
          </Route>
          <Route exact path="/companys/:id">
            <DetailCompany />
          </Route>
          <Route exact path="/candidates">
            <Candidates />
          </Route>
          <Route exact path="/candidates/:id">
            <DetailCandidate />
          </Route>
          <Route exact path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/forgetPassword">
            <ForgetPassword />
          </Route>
          <Route exact path="/inforCompany">
            <InforCompany />
          </Route>
          <Route exact path="/inforUser">
            <InforUser />
          </Route>
          {/* <Route exact path="/createCv">
            <CreateCv />
          </Route> */}
          <Route exact path="/detaiFormCV/:id">
            <DetailFormCV />
          </Route>
          <Route exact path="/inforCV">
            <InforCV />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
function Ladmin() {
  let { path, url } = useRouteMatch();

  return <Admin path={path} url={url} />;
}
export default App;
