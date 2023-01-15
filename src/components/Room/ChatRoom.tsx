import React, { useEffect, useState } from 'react';
import { postService } from '../../services/postService';
import { IFetchedPost } from '../../types/IPost';
import { ChatInput } from './ChatInput';

const ChatRoom = () => {
  const [fetchedPosts, setFetchedPosts] = useState<IFetchedPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await postService.get();
      setFetchedPosts(posts);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <ul>
        {fetchedPosts.map((post, idx) => {
          return (
            <li key={idx}>
              {post.message}
            </li>
          );
        })}
      </ul>
      <ChatInput />
    </div>
  );
}

export { ChatRoom };
