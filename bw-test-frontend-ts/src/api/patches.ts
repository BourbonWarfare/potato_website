import axios from 'axios';

export const moveMissionsForward = async (
  postId: string,
  category: string | undefined,
) => {
  // debugger;
  if (category === 'untested') {
    await axios.patch(`/posts/${postId}`, { category: 'tested' });
  } else {
    await axios.patch(`/posts/${postId}`, { category: 'played' });
  }
};

export const moveMissionsBackward = async (
  postId: string,
  category: string | undefined,
) => {
  if (category === 'played') {
    await axios.patch(`/posts/${postId}`, { category: 'tested' });
  } else {
    await axios.patch(`/posts/${postId}`, { category: 'untested' });
  }
};
