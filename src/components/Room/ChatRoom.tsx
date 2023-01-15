import React, { useCallback, useEffect, useState } from 'react';
import { postService } from '../../services/postService';
import { IFetchedPost } from '../../types/IPost';
import { ChatInput } from './ChatInput';

const ChatRoom = () => {
  const [fetchedPosts, setFetchedPosts] = useState<IFetchedPost[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = useCallback(async () => {
    const posts = await postService.get();
    setFetchedPosts(posts);
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
      <ChatInput reloadPosts={fetchPosts} />
    </div>
  );
}

export { ChatRoom };
