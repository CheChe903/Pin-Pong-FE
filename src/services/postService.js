import axiosInstance from './axiosInstance';

// 새로운 포스트를 추가하는 함수
export const addPost = async (post) => {
  const url = '/api/v1/post/write';
  try {
    const response = await axiosInstance.post(url, post);
    const data = response.data;
    console.log(response);
    if (response.data.code === 'success') {
      console.log("qqq");
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
  const url = '/api/v1/post/list';
  try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    if (data.code === 'success') {
      return data.data; // 포스트 목록 데이터 반환
    } else {
      console.error('포스트를 가져오는 중 오류 발생:', data.message);
      return null;
    }
  } catch (error) {
    console.error('포스트를 가져오는 중 오류 발생:', error);
    return null;
  }
};

// 내 태그에 해당하는 포스트 목록을 가져오는 함수
export const getPostsWithMyTag = async () => {
  const url = '/api/v1/post/list/withmytag';
  try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    if (data.code === 'success') {
      return data.data; // 포스트 목록 데이터 반환
    } else {
      console.error('포스트를 가져오는 중 오류 발생:', data.message);
      return null;
    }
  } catch (error) {
    console.error('포스트를 가져오는 중 오류 발생:', error);
    return null;
  }
};

// 포스트 상세 정보를 가져오는 함수
export const getPostDetail = async (postId) => {
  const url = `/api/v1/post/${postId}`;
  try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    if (data.code === 'success') {
      return data.data; // 포스트 상세 정보 반환
    } else {
      console.error('포스트 상세 정보를 가져오는 중 오류 발생:', data.message);
      return null;
    }
  } catch (error) {
    console.error('포스트 상세 정보를 가져오는 중 오류 발생:', error);
    return null;
  }
};

// 포스트에 좋아요를 추가하는 함수
export const likePost = async (postId) => {
  const url = `/api/v1/post/${postId}/like`;
  try {
    const response = await axiosInstance.post(url);
    const data = response.data;
    if (data.code === 'success') {
      return data.data; // 업데이트된 포스트 데이터 반환
    } else {
      console.error('좋아요 추가 중 오류 발생:', data.message);
      return null;
    }
  } catch (error) {
    console.error('좋아요 추가 중 오류 발생:', error);
    return null;
  }
};

// 새로운 댓글을 추가하는 함수
export const addComment = async (postId, content) => {
  const url = `/api/v1/post/${postId}/comment/add`;
  try {
    const response = await axiosInstance.post(url, content);
    console.log(content);
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

// 댓글을 채택하는 함수
export const adoptComment = async (postId, commentId) => {
  const url = `/api/v1/post/${postId}/${commentId}/select`;
  try {
    const response = await axiosInstance.patch(url);
    const data = response.data;
    if (data.code === 'success') {
      return data.data; // 업데이트된 댓글 데이터 반환
    } else {
      console.error('댓글 채택 중 오류 발생:', data.message);
      return null;
    }
  } catch (error) {
    console.error('댓글 채택 중 오류 발생:', error);
    return null;
  }
};
