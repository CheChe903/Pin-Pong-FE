// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // 스타일 파일 import
import Questions from './pages/Questions';
import Ranking from './pages/Ranking';
import MyPage from './pages/MyPage';
import Login from './pages/Login'; // LoginPage 컴포넌트 import
import OAuthCallback from './components/OAuthCallback'; // OAuthCallback 컴포넌트 import
import logo from './assets/logo.svg'; // 로고 파일 import
import QuestionDetail from './pages/QuestionDetail';
import AddQuestion from './pages/AddQuestion';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="white" variant="light" expand="lg" className="navbar-custom">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Pin-Pong logo"
              />{' '}
              PIN-PONG
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">질문</Nav.Link>
                <Nav.Link as={Link} to="/ranking">랭킹</Nav.Link>
                <Nav.Link as={Link} to="/mypage">마이페이지</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={Link} to="/login">로그인</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="mt-3">
          <Routes>
            <Route path="/" element={<Questions />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/api/v1/oauth/github/callback" element={<OAuthCallback />} />
            <Route path="/questions/:id" element={<QuestionDetail />} />
            <Route path="/add-question" element={<AddQuestion />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
