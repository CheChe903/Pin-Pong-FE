import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/PostDetail.css';
import { getPostDetail, addComment, likePost, adoptComment } from '../services/postService';
import TechStackIcon from '../components/TechStackIcon';
import { useAuth } from '../context/AuthContext';
import Thumbsup from '../assets/Thumbsup.svg'; // Import the SVG

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user: currentUser } = useAuth();
  const [likedMemberCount, setLikedMemberCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [selectedCommit, setSelectedCommit] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setIsLoading(true);
        const response = await getPostDetail(postId);
        setPost({
          ...response,
          likedMembersGithubId: response.likedMembersGithubId || []
        });
        setLikedMemberCount(response.likedMembersGithubId.length);
        setHasLiked(response.likedMembersGithubId.includes(currentUser?.githubId));
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError("게시물을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostDetail();
  }, [postId, currentUser?.githubId]);

  const reloadPost = async () => {
    try {
      const response = await getPostDetail(postId);
      setPost({
        ...response,
        likedMembersGithubId: response.likedMembersGithubId || []
      });
      setLikedMemberCount(response.likedMembersGithubId.length);
      setHasLiked(response.likedMembersGithubId.includes(currentUser?.githubId));
    } catch (err) {
      console.error("Error fetching post details:", err);
      setError("게시물을 불러오는 데 실패했습니다.");
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        await addComment(postId, newComment);
        setNewComment('');
        await reloadPost();
      } catch (err) {
        console.error("Error adding comment:", err);
        // 사용자에게 오류 메시지 표시
      }
    }
  };

  const handleUserClick = (authorGithubId) => {
    navigate(`/mypage/${authorGithubId}`);
  };

  const handleLikePost = async () => {
    try {
      await likePost(postId);
      await reloadPost();
    } catch (err) {
      console.error("Error liking post:", err);
      // 사용자에게 오류 메시지 표시
    }
  };

  const handleAdoptComment = async (commentId) => {
    try {
      await adoptComment(postId, commentId);
      await reloadPost();
    } catch (err) {
      console.error("Error adopting comment:", err);
      // 사용자에게 오류 메시지 표시
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAddComment();
    }
  };

  const handleCommitClick = (commitId) => {
    setSelectedCommit(commitId === selectedCommit ? null : commitId);
  };

  const handleCommentAuthorClick = (githubId) => {
    navigate(`/mypage/${githubId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <Container className="posts-detail-container">
      <div className="post-detail-item">
        <h2>{post.postTitle}</h2>
      </div>
      <hr />
      <div className="post-detail-item post-author">
        <div className="author-info">
          <p className="post-item-nickname" onClick={() => handleUserClick(post.authorGithubId)}>
            {post.authorGithubId}
          </p>
          <img src={post.authorGithubImage} alt="작성자 사진" className="post-item-photo" onClick={() => handleUserClick(post.authorGithubId)} />
        </div>
      </div>
      <div className="post-detail-item">
      <img src={Thumbsup} alt="Thumbs up" className="thumbsup-icon"  onClick={!hasLiked ? handleLikePost : null}/>
      <span>{likedMemberCount}</span>
      </div>
      <div className="post-detail-item post-tags">
        {post.techStacks && post.techStacks
          .sort((a, b) => a.techName.localeCompare(b.techName)) // techStacks를 이름순으로 정렬
          .map(tech => (
            <TechStackIcon key={tech.id} stack={tech.techName} />
          ))}
      </div>
      <div className="post-detail-item post-content">
        <h4>Commit List:</h4>
        <ul className="commit-list">
          {post.commitList && Object.entries(post.commitList).map(([commitId, commitContent]) => (
            <li
              key={commitId}
              className={`commit-list-item ${commitId === selectedCommit ? 'selected' : ''}`}
              onClick={() => handleCommitClick(commitId)}
            >
              {commitId}
            </li>
          ))}
        </ul>
        {selectedCommit && post.commitList[selectedCommit] && (
          <div className="commit-item">
            <strong>{selectedCommit}</strong>
            <pre>
              <code>
                {post.commitList[selectedCommit].split('\n').map((line, index) => (
                  <div key={index} className={line.startsWith('-') ? 'diff-removed' : line.startsWith('+') ? 'diff-added' : ''}>
                    {line}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        )}
      </div>
      <div className="post-detail-item post-content">
        <p>{post.content}</p>
      </div>
      <hr />
      <div className="comments-section">
        <h4>댓글</h4>
        <Form className="comment-form">
          <Form.Group controlId="comment">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="댓글 추가"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
              className="comment-textarea"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddComment}>
            댓글 추가
          </Button>
        </Form>
        <ul className="comments-list">
          {post.comments && post.comments.map(comment => (
            <li key={comment.commentId} className="comment-item">
              <div className="comment-header">
                <div className="comment-author-info">
                  <img src={comment.githubImage} alt="작성자 사진" className="comment-author-photo" onClick={() => handleCommentAuthorClick(comment.githubId)} />
                  <span onClick={() => handleCommentAuthorClick(comment.githubId)} className="comment-author">
                    {comment.githubId || 'Unknown User'}
                  </span>
                </div>
                {currentUser && currentUser.githubId === post.authorGithubId && !comment.selected && post.comments.every(c => !c.selected) && currentUser.githubId !== comment.githubId && (
                  <Button variant="outline-success" onClick={() => handleAdoptComment(comment.commentId)} className="adopt-button">
                    채택
                  </Button>
                )}
                {comment.selected && <span className="adopted-comment">채택된 댓글</span>}
              </div>
              <hr />
              <div className="comment-content">
                {comment.content}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default PostDetail;
