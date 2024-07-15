import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Mypage.css';
import { getUserGithubImage, getUserPins, getUserTechStacks, getUserPosts, getTechStacksList, updateUserTechStacks } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import TechStackIcon from '../components/TechStackIcon';  // Import the TechStackIcon component

const MyPage = () => {
  const { githubId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [githubImage, setGithubImage] = useState('');
  const [techStacks, setTechStacks] = useState([]); // Initialize techStacks as an empty array
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array
  const [pin, setPin] = useState();
  const [allTechStacks, setAllTechStacks] = useState([]);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const [githubImageResponse, pinResponse, userTechStacksResponse] = await Promise.all([
          getUserGithubImage(githubId),
          getUserPins(githubId),
          getUserTechStacks(githubId),
        ]);
    
        if (githubImageResponse.code === 'success' && githubImageResponse.data.githubImage) {
          setGithubImage(githubImageResponse.data.githubImage);
        } else {
          console.error('GitHub 이미지를 가져오는 데 실패했습니다');
          setGithubImage(''); // 기본값 설정
        }
    
        if (pinResponse.code === 'success' && typeof pinResponse.data.pin === 'number') {
          setPin(pinResponse.data.pin);
        } else {
          console.error('Pin 데이터를 가져오는 데 실패했습니다');
          setPin(0); // 기본값 설정
        }
    
        if (userTechStacksResponse.code === 'success' && Array.isArray(userTechStacksResponse.data.techStacks)) {
          const userTechStacks = userTechStacksResponse.data.techStacks;
          setTechStacks(userTechStacks.map(stack => stack.techName));
          setSelectedTechStacks(userTechStacks.map(stack => stack.techName));
        } else {
          console.error('기술 스택 데이터를 가져오는 데 실패했습니다');
          setTechStacks([]);
          setSelectedTechStacks([]);
        }
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류가 발생했습니다:', error);
        // 오류 처리 로직 (예: 에러 상태 설정, 사용자에게 알림 등)
      }
    };
    const fetchUserPosts = async () => {
      const userPostsResponse = await getUserPosts(githubId); // Ensure it returns an array
      const userPosts = Array.isArray(userPostsResponse.data) ? userPostsResponse.data : [];
      setPosts(userPosts); // Fallback to empty array if not an array
    };

    const fetchTechStacksList = async () => {
      try {
        const techStacksListResponse = await getTechStacksList();
        if (techStacksListResponse.code === 'success' && Array.isArray(techStacksListResponse.data.techStacks)) {
          setAllTechStacks(techStacksListResponse.data.techStacks);
        } else {
          console.error('기술 스택 목록을 가져오는 데 실패했습니다');
          setAllTechStacks([]);
        }
      } catch (error) {
        console.error('기술 스택 목록을 가져오는 중 오류가 발생했습니다:', error);
        setAllTechStacks([]);
      }
    };

    fetchUserInfo();
    fetchUserPosts();
    fetchTechStacksList();
  }, [githubId]);

  const handleItemClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleTechStackClick = (stack) => {
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
      setTechStacks(selectedTechStacks);
      setIsEditing(false);
    } else {
      alert('기술 스택 업데이트에 실패했습니다.');
    }
  };

  return (
    <Container className="my-page-container">
      <div className="profile-section">
        <img src={githubImage} alt="프로필 사진" className="profile-photo" />
        <h2 className="nickname">{githubId}</h2>
        <div className="tech-stack-icons">
          {techStacks.map((stack, index) => (
            <TechStackIcon key={index} stack={stack} />
          ))}
        </div>
        <p className="pins">Pins: {pin || 0}</p>
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
      {allTechStacks.map((stack) => (
        <div
          key={stack.id}
          className={`tech-stack-option ${selectedTechStacks.includes(stack.techName) ? 'selected' : ''}`}
          onClick={() => handleTechStackClick(stack.techName)}
        >
          <TechStackIcon stack={stack.techName} />
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
              <div className="post-item-header-content">
                <h5>{post.title}</h5>
                <p className="post-item-status">
                  {post.isAdopted ? '채택 완료' : '채택 전'}
                </p>
                <p className="post-item-likes">좋아요: {post.likes}</p>
              </div>
              <div className="post-item-header-right">
                <img src={post.photo} alt="작성자 사진" className="post-item-photo" />
                <p className="post-item-nickname">{post.githubId}</p>
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

export default MyPage;
