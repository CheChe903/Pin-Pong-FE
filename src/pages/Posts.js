import React, { useState, useEffect } from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Posts.css';
import { getPosts } from '../services/postService'; // 서비스 함수 가져오기
import TechStackIcon from '../components/TechStackIcon'; // TechStackIcon 컴포넌트 가져오기
import Thumbsup from '../assets/Thumbsup.svg'; // Import the SVG

const Posts = () => {
  const [posts, setPosts] = useState([]); // 빈 배열로 초기화
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        console.log(fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleItemClick = (postId) => {
    navigate(`/post/${postId}`);
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
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <ListGroup.Item
              key={post.postId}
              className="posts-list-item"
              onClick={() => handleItemClick(post.postId)}
            >
              <div className="post-item-header">
                <div className="post-item-header-content">
                  <h5>{post.postTitle}</h5>
                  <p className="post-item-status">
                    {post.postSelected ? '채택 완료' : '채택 전'}
                  </p>
                  <div className="post-item-likes">
                    <img src={Thumbsup} alt="Thumbs up" className="thumbsup-icon" />
                    <span>{post.likedMemberCount}</span>
                  </div>
                </div>
                <div className="post-item-header-right">
                  <img src={post.githubImage} alt="작성자 사진" className="post-item-photo" />
                  <p className="post-item-nickname">{post.githubId}</p>
                </div>
              </div>
              <div className="post-item-tags">
                {post.techStacks && post.techStacks
                  .sort((a, b) => a.techName.localeCompare(b.techName)) // techStacks를 이름순으로 정렬
                  .map(tech => (
                    <TechStackIcon key={tech.id} stack={tech.techName} />
                  ))}
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <p>게시물이 없습니다.</p>
        )}
      </ListGroup>
    </Container>
  );
};

export default Posts;
