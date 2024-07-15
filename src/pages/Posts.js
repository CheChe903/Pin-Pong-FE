import React, { useState, useEffect } from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Posts.css';
import { getPosts } from '../services/postService'; // 서비스 함수 가져오기
import TechStackIcon from '../components/TechStackIcon'; // Import the TechStackIcon component

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  const handleItemClick = (postId) => {
    navigate(`/posts/${postId}`);
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
        {posts.map((post) => (
          <ListGroup.Item
            key={post.postId}
            className="posts-list-item"
            onClick={() => handleItemClick(post.postId)}
          >
            <div className="post-item-header">
              <div className="post-item-header-content">
                <h5>{post.postTitle}</h5>
                <p className="post-item-status">
                  {post.isAdopted ? '채택 완료' : '채택 전'}
                </p>
                <p className="post-item-likes">좋아요: {post.likes}</p>
              </div>
              <div className="post-item-header-right">
                <img src={post.photo} alt="작성자 사진" className="post-item-photo" />
                <p className="post-item-nickname">{post.nickname}</p>
              </div>
            </div>
            <div className="post-item-tags">
              {post.tags && post.tags.split(', ').map((tag, index) => (
                <TechStackIcon key={index} stack={tag.trim()} />
              ))}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Posts;
