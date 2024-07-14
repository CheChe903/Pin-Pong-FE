import axiosInstance from './axiosInstance';

// 새로운 포스트를 추가하는 함수
export const addPost = async (post) => {
  const url = '/api/v1/post/write';
  try {
    const response = await axiosInstance.post(url, post);
    const data = response.data;
    if (data.code === 'success') {
      return data.data; // 추가된 포스트 데이터를 반환
    } else {
      console.error('포스트 추가 중 오류 발생:', data.message);
      return null;
    }
  } catch (error) {
    console.error('포스트 추가 중 오류 발생:', error);
    return null;
  }
};

// 포스트 목록을 가져오는 함수
export const getPosts = async () => {
  const url = '/api/v1/posts';
  const dummyPosts = [
    { postId: 1, title: '첫 번째 질문입니다.', nickname: '사용자1', photo: 'https://via.placeholder.com/150', tags: 'React, JavaScript' },
    { postId: 2, title: '두 번째 질문입니다.', nickname: '사용자2', photo: 'https://via.placeholder.com/150', tags: 'Node.js, Express' },
    { postId: 3, title: '세 번째 질문입니다.', nickname: '사용자3', photo: 'https://via.placeholder.com/150', tags: 'CSS, HTML' },
  ];

  try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    if (data.code === 'success') {
      return data.data; // 포스트 목록 데이터 반환
    } else {
      console.error('포스트를 가져오는 중 오류 발생:', data.message);
      return dummyPosts;
    }
  } catch (error) {
    console.error('포스트를 가져오는 중 오류 발생:', error);
    return dummyPosts;
  }
};

// 포스트 상세 정보를 가져오는 함수
export const getPostDetail = async (postId) => {
  const url = `/api/v1/posts/${postId}`;
  const dummyPost = {
    postId,
    title: `Post Title ${postId}`,
    content: `This is the detailed content of post number ${postId}.`,
    nickname: `사용자${postId}`,
    photo: 'https://via.placeholder.com/150',
    prUrl: `https://github.com/user/repo/pull/${postId}`,
    tags: 'React, JavaScript', // Add tags here
    comments: [
      { id: 1, text: 'This is the first comment.' },
      { id: 2, text: 'This is the second comment.' }
    ]
  };

  try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    if (data.code === 'success') {
      return data.data; // 포스트 상세 정보 반환
    } else {
      console.error('포스트 상세 정보를 가져오는 중 오류 발생:', data.message);
      return dummyPost;
    }
  } catch (error) {
    console.error('포스트 상세 정보를 가져오는 중 오류 발생:', error);
    return dummyPost;
  }
};

// 새로운 댓글을 추가하는 함수
export const addComment = async (postId, comment) => {
  const url = `/api/v1/posts/${postId}/comments`;
  try {
    const response = await axiosInstance.post(url, { text: comment });
    const data = response.data;
    if (data.code === 'success') {
      return data.data; // 추가된 댓글 데이터를 반환
    } else {
      console.error('댓글 추가 중 오류 발생:', data.message);
      return null;
    }
  } catch (error) {
    console.error('댓글 추가 중 오류 발생:', error);
    return null;
  }
};
