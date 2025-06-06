import { message } from "antd";
import axiosClient from "./axiosClient";

class OtpApi {
    createOTP = (params) => {
        const url = '/otp/createOTP';
        return axiosClient.post(url, params);
    };
    checkOTP = (params) => {
        const url = '/otp/checkOTP';
        return axiosClient.post(url, params);
    };
}
const otpApi = new OtpApi();
export default otpApi;