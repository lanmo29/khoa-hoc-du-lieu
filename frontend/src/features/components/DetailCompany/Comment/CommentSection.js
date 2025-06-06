import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, addComment, deleteComment, editComment } from '../../../admin/Slice/commentSlice';
import { Rate, Pagination, Modal, Input, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; // Icon cho nút sửa và xóa
import checkLoginApi from '../../../../api/checkLogin';
import "../../../scss/DetailCompany/CommentSection.scss";

export default function CommentSection({ companyId }) {
    const dispatch = useDispatch();
    const { comments, loading, error, reload } = useSelector(state => state.comments);

    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);
    const [page, setPage] = useState(1);
    const [editingComment, setEditingComment] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const [user, setUser] = useState(null);
    const [isLoad, setIsLoad] = useState(true)
    useEffect(() => {
        checkLoginApi.checkLogin().then((ok) => {
            setUser(ok.data.user);
        }).catch((err) => { });
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(fetchComments({ companyId, page }));
    }, [isLoad, reload, companyId, page, dispatch]);

    const handleAddComment = () => {
        dispatch(addComment({ companyId, userId: user.id, content: newComment, rating }));
        setNewComment('');
        setRating(0);
        setTimeout(() => {
            setIsLoad(!isLoad);
        }, 500);
    };

    const handleEditComment = (commentId, content, rating) => {
        setEditingComment(commentId);
        setEditedContent(content);
        setRating(rating)
    };

    const handleSaveEdit = () => {
        dispatch(editComment({ id: editingComment, content: editedContent, rating }));
        setEditingComment(null);
    };

    const handleDeleteComment = (commentId) => {
        dispatch(deleteComment(commentId));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="comment-section">
            <h3>Đánh giá</h3>
            {user?.role === 'user' && !Array.from(comments).find(c => c.userId === user.id) && <div className="comment-input">
                <Rate onChange={setRating} value={rating} />
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Thêm bình luận của bạn..." />
                <button onClick={handleAddComment}>Gửi</button>
            </div>}

            <div className="comment-list">
                {comments.length > 0 ? comments.map((comment) => (
                    <div key={comment?.id} className="comment-item">
                        <div className="comment-header">
                            <div className="avatar-name">
                                <div>
                                    <img src={comment.user?.avatar} alt={comment.user?.name} className="avatar" />

                                </div>
                                <div className="author-name">
                                    <small>{comment.user?.name}</small>
                                </div>
                            </div>
                            {comment?.userId === user?.id && (
                                <div className="comment-actions">
                                    <Button type="link" icon={<EditOutlined />} onClick={() => handleEditComment(comment?.id, comment?.content, comment?.rating)} />
                                    <Popconfirm
                                        title="Bạn có chắc muốn xóa bình luận này?"
                                        onConfirm={() => handleDeleteComment(comment?.id)}
                                        okText="Xóa"
                                        cancelText="Hủy"
                                    >
                                        <Button type="link" icon={<DeleteOutlined />} />
                                    </Popconfirm>
                                </div>
                            )}
                        </div>


                        {editingComment === comment.id ? (
                            <>
                                <div className="rate-time">
                                    <Rate onChange={setRating} value={rating} />
                                </div>

                                <div className="edit-comment">
                                    <Input.TextArea
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                        rows={3}
                                        cols={12}
                                        onPressEnter={handleSaveEdit}
                                    />
                                    <button onClick={handleSaveEdit}>Lưu</button>
                                </div></>
                        ) : (
                            <>
                                <div className="rate-time">
                                    <Rate disabled value={comment.rating} />
                                    <p className="comment-time">{new Date(comment.updatedAt).toLocaleString('vi-VN')}</p>
                                </div>
                                <p>{comment.content}</p>
                            </>
                        )}


                    </div>
                )) : <p>Chưa có bình luận nào.</p>}
            </div>

            <Pagination
                style={{ marginTop: "1rem", marginBottom: "1.5rem" }}
                defaultCurrent={page}
                pageSize={5}
                total={comments.total}
                onChange={setPage}
            />
        </div>
    );
}
