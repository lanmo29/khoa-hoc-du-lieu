import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentApi from "../../../api/commentApi";

// Tạo các async thunk cho các thao tác thêm, sửa, xóa
export const fetchComments = createAsyncThunk('comments/fetchComments', async (params) => {
    const response = await commentApi.findComment(params);
    return response.data;
});

export const addComment = createAsyncThunk('comments/addComment', async (commentData) => {
    const response = await commentApi.addComment(commentData);
    // return response.data;  // Trả về comment mới sau khi thêm thành công
    return commentData;
});

export const editComment = createAsyncThunk('comments/editComment', async ({ id, content, rating }) => {
    const response = await commentApi.editComment({ id, content, rating });
    return { id, content, rating, updatedAt: new Date() };  // Trả về comment đã sửa
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId) => {
    await commentApi.deleteComment(commentId);
    return commentId; // Trả về ID của comment đã xóa
});

const comment = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        reload: true,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.loading = false;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                // Thêm comment mới vào đầu danh sách
                // state.comments = state.comments.unshift(action.payload);
                state.reload = !state.reload
            })
            .addCase(editComment.fulfilled, (state, action) => {
                // Cập nhật nội dung của comment đã sửa trong danh sách
                state.comments = state.comments.map(c => {
                    if (c.id === action.payload.id)
                        return { ...c, content: action.payload.content, rating: action.payload.rating, updatedAt: action.payload.updatedAt };
                    return c;
                })
                state.reload = !state.reload;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                // Xóa comment khỏi danh sách
                state.comments = state.comments.filter(comment => comment.id !== action.payload);
                state.reload = !state.reload;
            });
    }
});

export default comment.reducer;
