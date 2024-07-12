import React from 'react';
import { onClickGithubLogin } from '../services/githubLoginService';

const LoginButton = () => {
  return (
    <div>
      <button onClick={onClickGithubLogin}>GitHub 로그인</button>
    </div>
  );
};

export default LoginButton;
