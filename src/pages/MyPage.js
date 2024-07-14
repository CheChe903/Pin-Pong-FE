import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Mypage.css';
import { getUserGithubImage, getUserPins, getUserTechStacks, getUserPosts, getTechStacksList, updateUserTechStacks } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import TechStackIcon from '../components/TechStackIcon';  // Import the TechStackIcon component

const MyPage = () => {
  const { githubId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [posts, setPosts] = useState([]);
  const [pins, setPins] = useState(0);
  const [allTechStacks, setAllTechStacks] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const [userImage, userPins, userTechStacks] = await Promise.all([
        getUserGithubImage(githubId),
        getUserPins(githubId),
        getUserTechStacks(githubId),
      ]);

      setPhoto(userImage);
      setPins(userPins);
      setTechStack(userTechStacks);
      setSelectedTechStacks(userTechStacks);
    };

    const fetchUserPosts = async () => {
      const userPosts = await getUserPosts(githubId);
      setPosts(userPosts);
    };

    const fetchTechStacksList = async () => {
      const techStacksList = await getTechStacksList();
      setAllTechStacks(techStacksList);
    };

    fetchUserInfo();
    fetchUserPosts();
    fetchTechStacksList();
  }, [githubId]);

  const handleItemClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleTechStackChange = (stack) => {
    if (selectedTechStacks.includes(stack)) {
      setSelectedTechStacks(selectedTechStacks.filter(item => item !== stack));
    } else {
      setSelectedTechStacks([...selectedTechStacks, stack]);
    }
  };

  const handleTechStackUpdate = async () => {
    const updated = await updateUserTechStacks(githubId, selectedTechStacks);
    if (updated && updated.code === 'success') {
      alert('기술 스택이 성공적으로 업데이트되었습니다.');
      setTechStack(selectedTechStacks);
      setIsEditing(false);
    } else {
      alert('기술 스택 업데이트에 실패했습니다.');
    }
  };

  return (
    <Container className="my-page-container">
      <div className="profile-section">
        <img src={photo} alt="프로필 사진" className="profile-photo" />
        <h2 className="nickname">{githubId}</h2>
        <div className="tech-stack-icons">
          {techStack.map((stack, index) => (
            <TechStackIcon key={index} stack={stack} />
          ))}
        </div>
        <p className="pins">Pins: {pins}</p>
        {user && user.githubId === githubId && (
          <>
            <Button variant="secondary" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? '취소' : '기술 스택 수정'}
            </Button>
          </>
        )}
      </div>
      {isEditing && (
        <>
          <h3>기술 스택 수정</h3>
          <div className="tech-stack-selector">
            {allTechStacks.map((stack, index) => (
              <div key={index} className="tech-stack-option">
                <input
                  type="checkbox"
                  id={`stack-${index}`}
                  value={stack}
                  checked={selectedTechStacks.includes(stack)}
                  onChange={() => handleTechStackChange(stack)}
                />
                <label htmlFor={`stack-${index}`}>
                  <TechStackIcon stack={stack} />
                </label>
              </div>
            ))}
          </div>
          <Button variant="primary" onClick={handleTechStackUpdate}>
            업데이트
          </Button>
        </>
      )}
      <h3>내가 쓴 글</h3>
      <ListGroup className="posts-list">
        {posts.map((post) => (
          <ListGroup.Item
            key={post.postId}
            className="posts-list-item"
            onClick={() => handleItemClick(post.postId)}
          >
            <div className="post-item-header">
              <h5>{post.title}</h5>
              <div className="post-item-tech-stack">
                {post.tags && post.tags.split(', ').map((tag, index) => (
                  <TechStackIcon key={index} stack={tag.trim()} />
                ))}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default MyPage;
