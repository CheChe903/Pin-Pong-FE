import React, { useState, useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import '../styles/Mypage.css'; // Import the new CSS file

const MyPage = () => {
  const [nickname, setNickname] = useState('사용자 닉네임');
  const [photo, setPhoto] = useState('https://via.placeholder.com/150'); // Placeholder image URL
  const [techStack, setTechStack] = useState('React, JavaScript, Node.js');
  const [posts, setPosts] = useState([]);
  const [pins, setPins] = useState(0); // State for the number of pins

  useEffect(() => {
    // Simulate fetching user posts from an API
    const userPosts = [
      { title: '첫 번째 질문입니다.', tags: 'React, JavaScript', content: '첫 번째 질문의 내용입니다.', prUrl: 'https://github.com/user/repo/pull/1' },
      { title: '두 번째 질문입니다.', tags: 'Node.js, Express', content: '두 번째 질문의 내용입니다.', prUrl: 'https://github.com/user/repo/pull/2' },
      { title: '세 번째 질문입니다.', tags: 'CSS, HTML', content: '세 번째 질문의 내용입니다.', prUrl: 'https://github.com/user/repo/pull/3' },
    ];
    setPosts(userPosts);
    setPins(3); // Simulate fetching the pin count from an API
  }, []);

  const handleItemClick = (index) => {
    // Handle item click (e.g., navigate to post detail page)
    console.log(`Navigate to post ${index + 1}`);
  };

  return (
    <Container className="my-page-container">
      <div className="profile-section">
        <img src={photo} alt="프로필 사진" className="profile-photo" />
        <h2 className="nickname">{nickname}</h2>
        <p className="tech-stack">{techStack}</p>
        <p className="pins">Pins: {pins}</p>
      </div>
      <h3>내가 쓴 글</h3>
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

export default MyPage;
