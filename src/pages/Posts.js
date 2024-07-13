import React, { useState, useEffect } from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const initialPosts = [
      { title: '첫 번째 질문입니다.', tags: 'React, JavaScript', content: '첫 번째 질문의 내용입니다.', prUrl: 'https://github.com/user/repo/pull/1' },
      { title: '두 번째 질문입니다.', tags: 'Node.js, Express', content: '두 번째 질문의 내용입니다.', prUrl: 'https://github.com/user/repo/pull/2' },
      { title: '세 번째 질문입니다.', tags: 'CSS, HTML', content: '세 번째 질문의 내용입니다.', prUrl: 'https://github.com/user/repo/pull/3' },
    ];
    setPosts(initialPosts);
  }, []);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  const handleItemClick = (index) => {
    navigate(`/posts/${index + 1}`);
  };

  return (
    <Container className="posts-container">
      <Button
        variant="primary"
        onClick={() => navigate('/add-post')}
        className="posts-button"
      >
        핀 꽂으러 가기
      </Button>
      <ListGroup className="posts-list">
        {posts.map((post, index) => (
          <ListGroup.Item
            key={index}
            className="posts-list-item"
            onClick={() => handleItemClick(index)}
          >
            {post.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Posts;
