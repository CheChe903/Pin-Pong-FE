import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Mypage.css';
import {
  getUserGithubImage,
  getUserPins,
  getUserTechStacks,
  getUserPosts,
  getTechStacksList,
  updateUserTechStacks
} from '../services/userService';
import { useAuth } from '../context/AuthContext';
import TechStackIcon from '../components/TechStackIcon';  // TechStackIcon 컴포넌트 가져오기

const MyPage = () => {
  const { githubId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [githubImage, setGithubImage] = useState('');
  const [techStacks, setTechStacks] = useState([]); // techStacks를 빈 배열로 초기화
  const [posts, setPosts] = useState([]); // posts를 빈 배열로 초기화
  const [pin, setPin] = useState(0);
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
          setTechStacks(userTechStacks);
          setSelectedTechStacks(userTechStacks);
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
      try {
        const userPostsResponse = await getUserPosts(githubId);
        const userPosts = Array.isArray(userPostsResponse.data) ? userPostsResponse.data : [];
        setPosts(userPosts);
      } catch (error) {
        console.error('사용자 글 목록을 가져오는 중 오류가 발생했습니다:', error);
      }
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
    navigate(`/post/${postId}`);
  };

  const handleTechStackClick = (stack) => {
    if (selectedTechStacks.includes(stack)) {
      setSelectedTechStacks(selectedTechStacks.filter(item => item !== stack));
    } else {
      setSelectedTechStacks([...selectedTechStacks, stack]);
    }
  };

  const handleTechStackUpdate = async () => {
    try {
      const updated = await updateUserTechStacks(githubId, selectedTechStacks);
      if (updated && updated.code === 'success') {
        alert('기술 스택이 성공적으로 업데이트되었습니다.');
        setTechStacks(selectedTechStacks);
        setIsEditing(false);
      } else {
        alert('기술 스택 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('기술 스택 업데이트 중 오류가 발생했습니다:', error);
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
        <p className="pins">📌 {pin}</p>
        {user && user.githubId === githubId && (
          <>
            <Button 
              variant="secondary" 
              className="tech-stack-modify-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? '취소' : '나의 기술 수정하기'}
            </Button>
          </>
        )}
      </div>
      {isEditing && (
        <>
          <h3>나의 기술 수정하기</h3>
          <div className="tech-stack-selector">
            {allTechStacks.map((stack, index) => (
              <div
                key={index}
                className={`tech-stack-option ${selectedTechStacks.includes(stack) ? 'selected' : ''}`}
                onClick={() => handleTechStackClick(stack)}
              >
                <TechStackIcon stack={stack} />
              </div>
            ))}
          </div>
          <Button 
            variant="primary" 
            className='tech-stack-modify-update-button' 
            onClick={handleTechStackUpdate}
          >
            업데이트
          </Button>
        </>
      )}
      <h3>글 목록</h3>
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
                  {post.postSelected ? '채택 완료' : '채택 전'}
                </p>
                <p className="post-item-likes">👍 {post.likedMemberCount}</p>
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
        ))}
      </ListGroup>
    </Container>
  );
};

export default MyPage;
