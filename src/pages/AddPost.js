import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/Posts.css';
import { addPost as addPostService } from '../services/postService'; // Import the service function
import TechStackIcon from '../components/TechStackIcon'; // Import the TechStackIcon component

const dummyTechStacksList = [
  'React', 'JavaScript', 'Node.js', 'Express', 'CSS', 'HTML',
  'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Go', 'Rust', 'TypeScript',
  'Angular', 'Vue.js', 'Django', 'Flask', 'Spring', 'MongoDB', 'MySQL', 'PostgreSQL', 'Redis',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Firebase', 'Git', 'Jenkins', 'Jira', 'Confluence'
];

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(`무엇을 구현하였나요?\n\n\n\n\n궁금한 점이 구체적으로 무엇인가요?`);
  const [prUrl, setPrUrl] = useState('');
  const [showTechStackSelector, setShowTechStackSelector] = useState(false); // State to toggle tech stack selector
  const [selectedTechStacks, setSelectedTechStacks] = useState([]); // State for selected tech stacks
  const navigate = useNavigate();

  const handleTechStackClick = (stack) => {
    const updatedSelectedTechStacks = selectedTechStacks.includes(stack)
      ? selectedTechStacks.filter((item) => item !== stack)
      : [...selectedTechStacks, stack];
    setSelectedTechStacks(updatedSelectedTechStacks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && selectedTechStacks.length > 0 && content.trim() && prUrl.trim()) {
      const tags = selectedTechStacks.join(', ');
      const post = { title, tags, content, prUrl };
      const addedPost = await addPostService(post);
      if (addedPost) {
        navigate('/posts');
      } else {
        // Handle error (e.g., show error message to the user)
      }
    }
  };

  return (
    <Container className="add-post-container">
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
          <div className="selected-tech-stack-icons">
            {selectedTechStacks.map((stack, index) => (
              <TechStackIcon key={index} stack={stack} />
            ))}
          </div>
          <Button variant="secondary" onClick={() => setShowTechStackSelector(!showTechStackSelector)}>
            {showTechStackSelector ? '닫기' : '기술 스택 추가'}
          </Button>
        </Form.Group>
        {showTechStackSelector && (
          <div className="tech-stack-selector">
            {dummyTechStacksList.map((stack, index) => (
              <div
                key={index}
                className={`tech-stack-option ${selectedTechStacks.includes(stack) ? 'selected' : ''}`}
                onClick={() => handleTechStackClick(stack)}
              >
                <TechStackIcon stack={stack} />
              </div>
            ))}
          </div>
        )}
        <Form.Group controlId="content">
          <Form.Label>질문 내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <div className="add-post-button-container">
          <Button variant="primary" type="submit" className='add-post-button'>
            핀 꽂기!
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddPost;
