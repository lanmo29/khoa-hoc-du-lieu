import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { message, Button, Input } from "antd";
import axios from "axios";
import "../../scss/ForgetPassword/ForgetPassword.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function ForgetPassword() {
    const [step, setStep] = useState(1); // Bước hiện tại trong quy trình (1: Nhập email, 2: Xác nhận OTP, 3: Nhập mật khẩu mới)
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const { register, handleSubmit } = useForm();

    const sendOTP = () => {
        axios
            .get(`http://localhost:777/${type == 0 ? "users" : "companys"}/checkEmail/${email}`)
            .then(() => {
                axios
                    .post("http://localhost:777/otp/createOTP", { email }) // Endpoint để gửi OTP
                    .then(() => {
                        setStep(2); // Chuyển sang bước xác nhận OTP
                        message.success("OTP đã được gửi!");
                    })
                    .catch((err) => {
                        message.error("Lỗi khi gửi OTP");
                        console.error(err);
                    });
            })
            .catch((err) => {
                message.error("Không tìm thấy Email phù hợp");
                console.error(err);
            });

    };

    const verifyOTP = () => {
        axios
            .post("http://localhost:777/otp/checkOTP", { email, otp }) // Endpoint để kiểm tra OTP
            .then(() => {
                setStep(3); // Chuyển sang bước nhập mật khẩu mới
                message.success("OTP đã được xác nhận!");
            })
            .catch((err) => {
                message.error("OTP không chính xác hoặc đã hết hạn");
                console.error(err);
            });
    };
    const resetPassword = () => {
        if (password.length < 4 || password.length > 20)
            message.error("Mật khẩu ít nhất 4 ký tự và không quá 20 ký tự");
        if (password !== rePassword)
            message.error("Mật khẩu không khớp");
        const data = { email, password };
        axios
            .put(`http://localhost:777/${type == 0 ? "users" : "companys"}/changePassword`, data)
            .then(() => {
                message.success("Mật khẩu đã được thay đổi!");
                window.location.pathname = "/login"
            })
            .catch((err) => {
                message.error("Lỗi khi thay đổi mật khẩu");
                console.error(err);
            });
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className="title">Nhập email để đặt lại mật khẩu</div>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <Button onClick={sendOTP}>Gửi OTP</Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="title">Nhập OTP đã được gửi đến email của bạn</div>
                        <Input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="OTP"
                        />
                        <Button onClick={verifyOTP}>Xác nhận OTP</Button>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="title">Nhập mật khẩu mới</div>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu mới"
                        />
                        <Input
                            type="password"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            placeholder="Nhập lại mật khẩu mới"
                        />
                        <Button onClick={resetPassword}>Thay đổi mật khẩu</Button>
                    </>
                );
            default:
                return null;
        }
    };

    const [type, setType] = useState(0)

    return (
        <div className="register">
            <div className="register__title">Việc làm tốt</div>
            <div className="register__box">
                <div className="line__register"></div>
                <div className="register__box__left">
                    <div className="register__box__left--account">
                        <button
                            className={`account ${type == 0 ? "active" : ""}`}
                            onClick={(e) => { if (step == 1) setType(0) }}
                            id="user"
                        >
                            Tài khoản người dùng
                        </button>
                        <button
                            className={`account ${type == 1 ? "active" : ""}`}
                            onClick={(e) => { if (step == 1) setType(1) }}
                            id="company"
                        >
                            Tài khoản công ty
                        </button>
                    </div>
                    <div className="forget-password-container">
                        <form onSubmit={handleSubmit(renderStep)}>
                            {renderStep()}
                        </form>
                    </div>
                </div>
                <div className="register__box__right">
                    <div className="right">
                        <div className="register__box__right__text">Hoặc đăng nhập với</div>
                        <button className="fb">Đăng nhập với facebook</button>
                        <button className="in">Đăng nhập với instagram</button>
                        <div className="register__box__right__text">
                            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link> ở đây
                        </div>
                        <div className="register__box__right__text">
                            Bạn quên mật khẩu? <Link to="/forgetPassword">Quên mật khẩu</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
