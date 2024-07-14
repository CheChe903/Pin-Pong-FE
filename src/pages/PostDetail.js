import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/Posts.css';
import { getPostDetail, addComment } from '../services/postService';
import TechStackIcon from '../components/TechStackIcon';  // Import the TechStackIcon component

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

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

  if (!post) {
    return <div>Loading...</div>;
  }

  console.log('Post Tags:', post.tags); // Debug statement to check post.tags

  return (
    <Container className="posts-detail-container">
      <h2>{post.title}</h2>
      <div className="post-meta">
        <img src={post.githubImage} alt="작성자 사진" className="post-item-photo" onClick={() => handleUserClick(post.githubId)} />
        <div>
          <p className="post-item-nickname" onClick={() => handleUserClick(post.githubId)}>{post.githubId}</p>
          <p className="post-item-prurl"><a href={post.prUrl} target="_blank" rel="noopener noreferrer">PR 링크</a></p>
        </div>
      </div>
      <div className="post-tags">
        {post.tags && post.tags.split(', ').map((tag, index) => (
          <TechStackIcon key={index} stack={tag.trim()} />
        ))}
      </div>
      <p>{post.content}</p>
      <hr />
      <h4>댓글</h4>
      <ul className="comments-list">
        {comments.map(comment => (
          <li key={comment.id} className="comment-item">
            {comment.text}
          </li>
        ))}
      </ul>
      <Form className="comment-form">
        <Form.Group controlId="comment">
          <Form.Control
            type="text"
            placeholder="댓글 추가"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddComment}>
          댓글 추가
        </Button>
      </Form>
    </Container>
  );
};

export default PostDetail;
