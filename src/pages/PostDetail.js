import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/PostDetail.css';
import { getPostDetail, addComment, likePost, adoptComment } from '../services/postService';
import TechStackIcon from '../components/TechStackIcon';  // TechStackIcon 컴포넌트 가져오기
import { useAuth } from '../context/AuthContext';  // AuthContext 가져오기

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { currentUser } = useAuth();  // 현재 사용자 가져오기

  useEffect(() => {
    const fetchPostDetail = async () => {
      const postDetail = await getPostDetail(id);
      setPost(postDetail);
      setComments(postDetail.comments);
    };
    fetchPostDetail();
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const addedComment = await addComment(id, newComment);
      if (addedComment) {
        setComments([...comments, addedComment]);
        setNewComment('');
      }
    }
  };

  const handleUserClick = (githubId) => {
    navigate(`/mypage/${githubId}`);
  };

  const handleLikePost = async () => {
    const updatedPost = await likePost(id);
    if (updatedPost) {
      setPost(updatedPost);
    }
  };

  const handleAdoptComment = async (commentId) => {
    const updatedComment = await adoptComment(id, commentId);
    if (updatedComment) {
      setComments(comments.map(comment =>
        comment.id === commentId ? { ...comment, isAdopted: true } : { ...comment, isAdopted: false }
      ));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAddComment();
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="posts-detail-container">
      <div className="post-detail-item">
        <h2>{post.title}</h2>
      </div>
      <div className="post-detail-item">
        <img src={post.githubImage} alt="작성자 사진" className="post-item-photo" onClick={() => handleUserClick(post.githubId)} />
      </div>
      <div className="post-detail-item">
        <p className="post-item-nickname" onClick={() => handleUserClick(post.githubId)}>{post.githubId}</p>
      </div>
      <div className="post-detail-item">
        <p className="post-item-status">{post.isAdopted ? '채택 완료' : '채택 전'}</p>
      </div>
      <div className="post-detail-item">
        <p className="post-item-likes">좋아요: {post.likes}</p>
      </div>
      <div className="post-detail-item">
        <Button variant="outline-primary" onClick={handleLikePost} disabled={post.hasLiked}>
          좋아요
        </Button>
      </div>
      <div className="post-detail-item post-tags">
        {post.tags && post.tags.split(', ').map((tag, index) => (
          <TechStackIcon key={index} stack={tag.trim()} />
        ))}
      </div>
      <div className="post-detail-item post-content">
        <p>{post.content}</p>
      </div>
      <div className="comments-section">
        <h4>댓글</h4>
        <Form className="comment-form">
          <Form.Group controlId="comment">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="댓글 추가"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
              className="comment-textarea"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddComment}>
            댓글 추가
          </Button>
        </Form>
        <ul className="comments-list">
          {comments.map(comment => (
            <li key={comment.id} className="comment-item">
              {comment.text}
              {currentUser && currentUser.githubId === post.githubId && !post.isAdopted && !comment.isAdopted && (
                <Button variant="outline-success" onClick={() => handleAdoptComment(comment.id)}>
                  채택
                </Button>
              )}
              {comment.isAdopted && <span className="adopted-comment">채택된 댓글</span>}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default PostDetail;
