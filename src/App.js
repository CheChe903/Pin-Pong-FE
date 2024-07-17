import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // 스타일 파일 import
import Ranking from './pages/Ranking';
import MyPage from './pages/MyPage';
import Login from './pages/Login'; // LoginPage 컴포넌트 import
import OAuthCallback from './components/OAuthCallback'; // OAuthCallback 컴포넌트 import
import logo from './assets/logo.svg'; // 로고 파일 import
import PostDetail from './pages/PostDetail';
import AddPost from './pages/AddPost';
import Posts from './pages/Posts';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // 로그아웃 후 홈 페이지로 이동
  };

  return (
    <div className="App">
      <Navbar bg="white" variant="light" expand="lg" className="navbar-custom fixed-top">
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
              <Nav.Link as={Link} to={user ? `/mypage/${user.githubId}` : "/login"}>마이페이지</Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <Nav.Link as={Link} to="/" onClick={handleLogout}>로그아웃</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">로그인</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-3">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/mypage/:githubId" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/api/v1/oauth/github/callback" element={<OAuthCallback />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/add-post" element={<AddPost />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
