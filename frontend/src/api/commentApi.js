import { message } from "antd";
import axiosClient from "./axiosClient";

class CommentApi {
    findComment = (params) => axiosClient.get('/comments', { params });
    addComment = (params) => axiosClient.post('/comments', params).then(() => {
        message.success("Bình luận thành công!");
    }).catch(() => {
        message.error("Có lỗi xảy ra!");
    });
    deleteComment = (id) => axiosClient.delete(`/comments/${id}`).then(() => {
        message.success("Xóa thành công!");
    }).catch(() => {
        message.error("Có lỗi xảy ra!");
    });
    editComment = (params) => axiosClient.patch(`/comments/${params.id}`, params).then(() => {
        message.success("Sửa thành công!");
    }).catch(() => {
        message.error("Có lỗi xảy ra!");
    });
}
const commentApi = new CommentApi();
export default commentApi;
