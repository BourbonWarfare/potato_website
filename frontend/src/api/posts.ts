import axios from 'axios';

export const authCheck = async ({ userName, userPass }: any) => {
  console.log(`authCheck username: ${userName}, password: ${userPass}`);
  const load = await axios
    .post(`/auth/login`, {
      username: userName,
      password: userPass,
    })
    .then((response: any) => {
      console.log('response from authCheck: ', response);
      try {
        // set context here
        return JSON.parse(atob(response.data.access_token.split('.')[1]));
      } catch (e) {
        return e;
      }
    })
    .catch((error: any) => {
      console.log('error from authcheck: ', error);
      // put a navigate redirect in here
    });
  const data = await load;
  return data;
};

export const userLogin = async (values: any) => {
  const load = await axios
    .post('/users/login', {
      username: values.username,
      password: values.password,
    })
    .then((response: any) => {
      console.log('response from userLogin: ', response);
      try {
        return response;
      } catch (err) {
        return err;
      }
    })
    .catch((error: any) => {
      console.log('error from userLogin: ', error);
      return error;
      // set auth to false
    });
  const data = await load;
  console.log('data from userLogin: ', data);
  return data;
};

export const newPost = (values: any) => {
  axios.post('/posts', {
    title: values.title,
    text: values.text,
    type: values.type,
    category: values.category,
    author: values.author,
    url: values.url || '',
  });
};
