import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import companyApi from "../../../api/companyApi";
import Footer from "../Home/Footer/Footer";
import Menu from "../MenuNotHome/MenuNotHome";
import Spin from "../Spin/Spin";
import BannerCompany from "./BannerCompany/BannerCompany";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import ContentCompany from "./Content/ContentCompany";
import { useDispatch, useSelector } from "react-redux";

export default function DetailCompany() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { reload } = useSelector(state => state.comments);


  useEffect(() => {
    if (data === null)
      window.scrollTo(0, 0);

    companyApi.getOne(id).then((data) => {
      setData(data);
    });

  }, [id, reload]);

  // console.log(data);
  return (
    <div>
      {/* <Menu /> */}
      {data ? (
        <div>
          <Breadcrumb name={data.name} />
          <BannerCompany
            avatar={data.avatar}
            banner={data.banner}
            name={data.name}
            address={data.address}
            averageRating={data.averageRating}
            commentCount={data.commentCount}
          />
          <ContentCompany data={data} />
        </div>
      ) : (
        <Spin />
      )}
      <Footer />
    </div>
  );
}
