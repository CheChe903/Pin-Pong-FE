// src/components/LoginPage.js
import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { getGithubLoginUrl } from '../services/api';
import logo from '../assets/logo.svg'; // 로고 파일 import
import githubLogo from '../assets/github-logo.svg'; // 깃허브 로고 파일 import
import '../styles/Login.css'; // CSS 파일 import

const onClickGithubLogin = async () => {
  const loginUrl = await getGithubLoginUrl();
  if (loginUrl) {
    window.location.href = loginUrl;
  } else {
    console.error('Failed to get GitHub login URL');
  }
};

const LoginPage = () => (
  <Container className="container-custom">
    <Row className="mb-4 text-center-custom">
      <Col className="d-flex flex-column align-items-center">
        <img src={logo} alt="Pin-Pong logo" width="150" className="mr-3" />
        <h1>PIN-PONG</h1>
      </Col>
    </Row>
    <Row className="w-100 d-flex justify-content-center align-items-center">
      <Col xs={12} md={6}>
        <Card className="p-4 text-center-custom">
          <Card.Body>
            <Card.Title>PIN-PONG을 이용하기 위해서는 깃허브 로그인이 필요해요.</Card.Title>
            <Button variant="outline-dark" onClick={onClickGithubLogin} className="mt-3 d-flex align-items-center justify-content-center mx-auto">
              <img src={githubLogo} alt="GitHub logo" width="20" className="mr-2" />
              GitHub로 로그인하기
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default LoginPage;
