import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/Posts.css';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Simulate fetching Post details from an API
    setPost({
      title: `Post Title ${id}`,
      content: `This is the detailed content of post number ${id}.`
    });

    // Simulate fetching comments from an API
    setComments([
      { id: 1, text: 'This is the first comment.' },
      { id: 2, text: 'This is the second comment.' }
    ]);
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
      setNewComment('');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="post-detail-container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <hr />
      <h4>Comments</h4>
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
            placeholder="Add a comment"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddComment}>
          Add Comment
        </Button>
      </Form>
    </Container>
  );
};

export default PostDetail;
