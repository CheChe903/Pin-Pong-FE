import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/Questions.css';

const AddQuestion = ({ addQuestion }) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState(`무엇을 구현하였나요?\n\n\n\n\n궁금한 점이 구체적으로 무엇인가요?`);
  const [prUrl, setPrUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && tags.trim() && content.trim() && prUrl.trim()) {
      addQuestion({ title, tags, content, prUrl });
      navigate('/questions');
    }
  };

  return (
    <Container className="add-question-container">
      <h2>새로운 질문 추가</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>질문 제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="prUrl">
          <Form.Label>코드 리뷰 받을 PR 주소</Form.Label>
          <Form.Control
            type="url"
            placeholder="PR 주소를 입력하세요"
            value={prUrl}
            onChange={(e) => setPrUrl(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="tags">
          <Form.Label>기술 스택 태그</Form.Label>
          <Form.Control
            type="text"
            placeholder="태그를 쉼표로 구분하여 입력하세요"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>질문 내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <div className="add-question-button-container">
          <Button variant="primary" type="submit" className='add-question-button'>
            핀 꽂기!
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddQuestion;
