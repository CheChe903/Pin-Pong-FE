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
  const [postTitle, setPostTitle] = useState('');
  const [content, setContent] = useState('무엇을 구현하였나요?\n\n\n\n\n궁금한 점이 구체적으로 무엇인가요?\n');
  const [githubRepoUrl, setGithubRepoUrl] = useState('');
  const [techStacks, setTechStacks] = useState([]); // State for selected tech stacks
  const navigate = useNavigate();

  const handleTechStackClick = (stack) => {
    const updatedTechStacks = techStacks.includes(stack)
      ? techStacks.filter((item) => item !== stack)
      : [...techStacks, stack];
    setTechStacks(updatedTechStacks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postTitle.trim() && techStacks.length > 0 && content.trim() && githubRepoUrl.trim()) {
      const tags = techStacks.join(', ');
      const post = { postTitle: postTitle, techStacks, content, githubRepoUrl: githubRepoUrl };

      const addedPost = await addPostService(post);
      if (addedPost) {
        navigate('/');
      } else {
        // Handle error (e.g., show error message to the user)
      }
    }
  };

  return (
    <Container className="add-post-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="postTitle">
          <Form.Label>질문 제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </Form.Group>
        <hr/>
        <Form.Group controlId="githubRepoUrl">
          <Form.Label>코드 리뷰 받을 PR 주소</Form.Label>
          <Form.Control
            type="url"
            placeholder="PR 주소를 입력하세요"
            value={githubRepoUrl}
            onChange={(e) => setGithubRepoUrl(e.target.value)}
          />
        </Form.Group>
        <hr/>
        <Form.Group controlId="techStacks">
          <Form.Label>기술 스택 태그</Form.Label>
          <div className="selected-tech-stack-icons">
            {techStacks.map((stack, index) => (
              <TechStackIcon key={index} stack={stack} />
            ))}
          </div>
        </Form.Group>
        <hr/>
        <div className="tech-stack-selector">
          {dummyTechStacksList.map((stack, index) => (
            <div
              key={index}
              className={`tech-stack-option ${techStacks.includes(stack) ? 'selected' : ''}`}
              onClick={() => handleTechStackClick(stack)}
            >
              <TechStackIcon stack={stack} />
            </div>
          ))}
        </div>
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
