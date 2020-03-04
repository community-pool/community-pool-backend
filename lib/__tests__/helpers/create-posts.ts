import Post from '../../lib/models/Post';

export const createPosts = async () => {
  const post0 = {
    userName: 'jack',
    title: 'jackTitle',
    content: 'jackContent'
  };
  const post1 = {
    userName: 'jose',
    title: 'joseTitle',
    content: 'joseContent'
  };
  const post2 = {
    userName: 'ethan',
    title: 'ethanTitle',
    content: 'ethanContent'
  };

  return await Post.insertMany([post0, post1, post2]);
};
