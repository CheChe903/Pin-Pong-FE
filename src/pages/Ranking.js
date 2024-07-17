// src/pages/Ranking.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ListGroup, Image, Badge } from 'react-bootstrap';
import { getRankingData } from '../services/rankingService';
import '../styles/Ranking.css';
import TechStackIcon from '../components/TechStackIcon'; // TechStackIcon 컴포넌트 가져오기


const Ranking = () => {
  const [rankings, setRankings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const data = await getRankingData();
        if (Array.isArray(data)) {
          setRankings(data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error("Error fetching ranking data:", err);
        setError("랭킹 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankingData();
  }, []);

  const handleItemClick = (githubId) => {
    navigate(`/mypage/${githubId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="ranking-container">
      <ListGroup>
        {rankings.map((member, index) => (
          <ListGroup.Item
            key={index}
            className="ranking-item"
            onClick={() => handleItemClick(member.githubId)}
            style={{ cursor: 'pointer' }}
          >
            <div className="ranking-info">
              <span className="ranking-position">{index + 1}위</span>
              <Image src={member.githubImage} roundedCircle className="ranking-image" />
              <div className="ranking-details">
                <h5>{member.githubId}</h5>
                <div>
                {rankings.techStacks && rankings.techStacks
                  .sort((a, b) => a.techName.localeCompare(b.techName)) // techStacks를 이름순으로 정렬
                  .map(tech => (
                    <TechStackIcon key={tech.id} stack={tech.techName} />
                  ))}
                </div>
              </div>
            </div>
            <div className="ranking-pin">
              <Badge className="custom-badge">
                📌 {member.pin}
              </Badge>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Ranking;
