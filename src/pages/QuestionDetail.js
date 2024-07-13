import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/Questions.css';

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Simulate fetching question details from an API
    setQuestion({
      title: `Question Title ${id}`,
      content: `This is the detailed content of question number ${id}.`
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

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="question-detail-container">
      <h2>{question.title}</h2>
      <p>{question.content}</p>
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

export default QuestionDetail;
