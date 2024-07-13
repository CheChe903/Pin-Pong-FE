import React, { useState, useEffect } from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Questions.css';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const initialQuestions = [
      { title: '첫 번째 질문입니다.', tags: 'React, JavaScript', content: '첫 번째 질문의 내용입니다.', prUrl: 'https://github.com/user/repo/pull/1' },
      { title: '두 번째 질문입니다.', tags: 'Node.js, Express', content: '두 번째 질문의 내용입니다.', prUrl: 'https://github.com/user/repo/pull/2' },
      { title: '세 번째 질문입니다.', tags: 'CSS, HTML', content: '세 번째 질문의 내용입니다.', prUrl: 'https://github.com/user/repo/pull/3' },
    ];
    setQuestions(initialQuestions);
  }, []);

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const handleItemClick = (index) => {
    navigate(`/questions/${index + 1}`);
  };

  return (
    <Container className="questions-container">
      <Button
        variant="primary"
        onClick={() => navigate('/add-question')}
        className="questions-button"
      >
        핀 꽂으러 가기
      </Button>
      <ListGroup className="questions-list">
        {questions.map((question, index) => (
          <ListGroup.Item
            key={index}
            className="questions-list-item"
            onClick={() => handleItemClick(index)}
          >
            {question.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Questions;
