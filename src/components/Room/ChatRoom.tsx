import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { postService } from '../../services/postService';
import { IFetchedPost } from '../../types/IPost';
import { ChatInput } from './ChatInput';

const ChatRoomContainer = styled.div`
  max-width: ${props => props.theme.sizes.maxWidth};
  margin: 30px auto 0;
  border: 2px solid ${props => props.theme.colors.alternative};
  border-radius: 1rem;
`;

const ChatMessageListContainer = styled.ul`
  height: 50vh;
  overflow-y: scroll;
  list-style: none;

`;

const ChatMessageListItem = styled.li`
  display: block;
  width: max-content;
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: ${props => props.theme.colors.alternative};
  color: black;
  border-radius: 1rem;
`;

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
    <ChatRoomContainer>
      <ChatMessageListContainer>
        {fetchedPosts.map((post, idx) => {
          return (
            <ChatMessageListItem key={idx}>
              {post.message}
            </ChatMessageListItem>
          );
        })}
      </ChatMessageListContainer>
      <ChatInput reloadPosts={fetchPosts} />
    </ChatRoomContainer>
  );
}

export { ChatRoom };
