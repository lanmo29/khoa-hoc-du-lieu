// import { yupResolver } from "@hookform/resolvers/yup";
// import { message } from "antd";
// import axios from "axios";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import * as yup from "yup";
// import { companyData } from "../../admin/Slice/companySlice";
// export default function RegisterCompany() {
//   const schema = yup.object().shape({
//     userName: yup.string().email().required(),
//     name: yup.string().required(),
//     password: yup.string().min(4).max(20).required(),
//     rePassword: yup.string().oneOf([yup.ref("password"), null]),
//   });
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });
//   const banner =
//     "https://phuoc-associates.com/wp-content/uploads/2019/10/5-Things-To-Keep-In-Mind-When-Opening-A-Company-In-Vietnam.jpg";
//   const avatar =
//     "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg";
//   const address = "Hà Nội";
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const actionResult = async () => {
//     await dispatch(companyData());
//   };

//   const onSubmit = (data) => {
//     const dataCompany = {
//       address,
//       banner,
//       avatar,
//       name: data.name,
//       email: data.userName,
//       password: data.password,
//       status: 0,
//     };
//     const link = "http://localhost:777/companys";
//     axios
//       .post(link, dataCompany)
//       .then((ok) => {
//         if (ok.data.data === "email đã tồn tại!") {
//           message.info("Email đã được đăng ký!");
//         } else {
//           message.success("Đăng ký tài khoản thành công!");
//           setTimeout(() => {
//             actionResult();
//           }, 700);
//           history.push("/login");
//         }
//       })
//       .catch((er) => {
//         console.log(er);
//       });
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="register__box__left__title">Email công ty</div>
//         <input type="text" {...register("userName")} placeholder="Email" />
//         <p className="text-danger">
//           {errors.userName ? "Email không đúng định dạng" : ""}
//         </p>
//         <div className="register__box__left__title">Tên công ty</div>
//         <input type="text" {...register("name")} placeholder="Tên công ty" />
//         <p className="text-danger">
//           {errors.name ? "Tên côn ty không phù hợp" : ""}
//         </p>
//         <div className="register__box__left__title">Mật khẩu</div>
//         <input
//           type="password"
//           {...register("password")}
//           placeholder="Mật khẩu"
//         />
//         <p className="text-danger">
//           {errors.password
//             ? "Mật khẩu ít nhất 4 ký tự và không quá 20 ký tự"
//             : ""}
//         </p>
//         <div className="register__box__left__title">Nhập lại mật khẩu</div>
//         <input
//           type="password"
//           {...register("rePassword")}
//           placeholder="Mật khẩu"
//         />
//         <p className="text-danger">
//           {errors.rePassword ? "Mật khẩu không trùng khớp" : ""}
//         </p>
//         <div className="register__box__left__button">
//           <input type="submit" value="Đăng ký" />
//         </div>
//       </form>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { message, Button, Input } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function RegisterCompany() {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const schema = yup.object().shape({
    userName: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().min(4).max(20).required(),
    rePassword: yup.string().oneOf([yup.ref("password"), null]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const emailValue = watch("userName"); // Watching the email field for changes

  const banner =
    "https://phuoc-associates.com/wp-content/uploads/2019/10/5-Things-To-Keep-In-Mind-When-Opening-A-Company-In-Vietnam.jpg";
  const avatar =
    "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg";
  const address = "Hà Nội";
  const history = useHistory();
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);
  const sendOTP = (email) => {
    axios
      .post("http://localhost:777/otp/createOTP", { email })
      .then(() => {
        setCountdown(60);
        setOtpSent(true);
        message.success("OTP đã được gửi!");
      })
      .catch((err) => {
        message.error("Lỗi khi gửi OTP");
        console.error(err);
      });
  };

  const verifyOTP = (email, otp) => {
    axios
      .post("http://localhost:777/otp/checkOTP", { email, otp })
      .then(() => {
        setOtpVerified(true);
        message.success("OTP đã được xác nhận!");
      })
      .catch((err) => {
        message.error("OTP không chính xác hoặc đã hết hạn");
        console.error(err);
      });
  };

  const onSubmit = (data) => {
    if (!otpVerified) {
      message.error("Vui lòng xác nhận OTP trước khi đăng ký");
      return;
    }

    const dataCompany = {
      address,
      banner,
      avatar,
      name: data.name,
      email: data.userName,
      password: data.password,
      status: 0,
    };
    const link = "http://localhost:777/companys";
    axios
      .post(link, dataCompany)
      .then((ok) => {
        if (ok.data.data === "email đã tồn tại!") {
          message.info("Email đã được đăng ký!");
        } else {
          message.success("Đăng ký tài khoản thành công!");
          history.push("/login");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="register__box__left__title">Email công ty</div>
        <input type="text" {...register("userName")} placeholder="Email" />
        <p className="text-danger">
          {errors.userName ? "Email không đúng định dạng" : ""}
        </p>
        <Button
          onClick={() => sendOTP(emailValue)}
          disabled={!emailValue || countdown > 0}
        >
          Gửi OTP {countdown > 0 && `(${countdown}s)`}
        </Button>
        {otpSent && (
          <>
            <div className="register__box__left__title">Nhập OTP</div>
            <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
            <Button
              onClick={() => verifyOTP(emailValue, otp)}
              disabled={!otp}
            >
              Xác nhận OTP
            </Button>
          </>
        )}
        <div className="register__box__left__title">Tên công ty</div>
        <input type="text" {...register("name")} placeholder="Tên công ty" />
        <p className="text-danger">
          {errors.name ? "Tên công ty không phù hợp" : ""}
        </p>
        <div className="register__box__left__title">Mật khẩu</div>
        <input
          type="password"
          {...register("password")}
          placeholder="Mật khẩu"
        />
        <p className="text-danger">
          {errors.password ? "Mật khẩu không phù hợp" : ""}
        </p>
        <div className="register__box__left__title">Nhập lại mật khẩu</div>
        <input
          type="password"
          {...register("rePassword")}
          placeholder="Mật khẩu"
        />
        <p className="text-danger">
          {errors.rePassword ? "Mật khẩu không khớp" : ""}
        </p>
        <Button htmlType="submit" disabled={!otpVerified}>
          Đăng ký
        </Button>
      </form>
    </>
  );
}
