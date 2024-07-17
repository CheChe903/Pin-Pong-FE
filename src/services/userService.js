import axiosInstance from './axiosInstance';

// 더미 데이터
const dummyGithubImage = 'https://via.placeholder.com/150';
const dummyPins = 5;
const dummyTechStacks = ['React', 'JavaScript', 'Node.js'];
const dummyPosts = [
  { postId: 1, title: '첫 번째 질문입니다.', githubId: 'testuser' },
  { postId: 2, title: '두 번째 질문입니다.', githubId: 'testuser' },
  { postId: 3, title: '세 번째 질문입니다.', githubId: 'testuser' },
];
const dummyTechStacksList = [
  'React', 'JavaScript', 'Node.js', 'Express', 'CSS', 'HTML',
  'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Go', 'Rust', 'TypeScript',
  'Angular', 'Vue.js', 'Django', 'Flask', 'Spring', 'MongoDB', 'MySQL', 'PostgreSQL', 'Redis',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Firebase', 'Git', 'Jenkins', 'Jira', 'Confluence'
];

export const getUserGithubImage = async (githubId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/member/githubimage/${githubId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub image:', error);
    return dummyGithubImage;
  }
};

export const getUserPins = async (githubId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/member/pin/${githubId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching pins:', error);
    return dummyPins;
  }
};

export const getUserTechStacks = async (githubId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/member/techstacks/${githubId}`);
    console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tech stacks:', error);
    return dummyTechStacks;
  }
};

export const getUserPosts = async (githubId) => {
  try {
    const response = await axiosInstance.get(`/api/v1/post/${githubId}/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return dummyPosts;
  }
};

export const getTechStacksList = async () => {
  try {
    const response = await axiosInstance.get('/api/v1/post/alltechstacks/list');
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching tech stacks list:', error);
    return dummyTechStacksList;
  }
};

export const updateUserTechStacks = async (githubId, techStacks) => {
  try {
    const response = await axiosInstance.patch(`/api/v1/member/techstacks/update`, {
      githubId,
      techStacks
    });
    return response.data;
  } catch (error) {
    console.error('Error updating tech stacks:', error);
    return { code: 'failure' };
  }
};
