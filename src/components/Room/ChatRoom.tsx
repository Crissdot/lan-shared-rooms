import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { io } from "socket.io-client";
import { postService } from '../../services/postService';
import { IFetchedPost, IFilePost } from '../../types/IPost';
import { ChatInput } from './ChatInput';
import { config } from '../../config';

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
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 90%;
  min-height: 2rem;
  margin: 0.5rem;
  background-color: ${props => props.theme.colors.alternative};
  border-radius: 1rem;
`;

const ChatMessageListItemText = styled.span`
  padding: 0.5rem;
  color: black;
`;

const FileItemContainer = styled.div`
  padding: 0.5rem;
  border-top: 2px solid black;
`;

const FileItemText = styled.p`
  color: black;
`;

const FileItemButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
`;

const FileItemButton = styled.a`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const socket = io(config.backendDomain);

const ChatRoom = () => {
  const [fetchedPosts, setFetchedPosts] = useState<IFetchedPost[]>([]);

  useEffect(() => {
    fetchPosts();

    socket.on('new_post', () => {
      fetchPosts();
    });

    return () => {
      socket.off('new_post');
    };
  }, []);

  const fetchPosts = useCallback(async () => {
    const posts = await postService.get();
    setFetchedPosts(posts);
  }, []);

  const renderFilePost = (file: IFilePost | null) => {
    if (!file) {
      return null;
    }

    const renderImageIfRequired = () => {
      if (file.mimeType.endsWith('jpeg')) {
        return <img src={file.path} alt={file.name} />;
      }

      return <FileItemText>{file.name}</FileItemText>;
    }

    return (
      <FileItemContainer>
        {renderImageIfRequired()}
        <FileItemButtonContainer>
          <FileItemButton href={file.path} target='_blank'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          </FileItemButton>
          <FileItemButton>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
              <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
          </FileItemButton>
        </FileItemButtonContainer>
      </FileItemContainer>
    );
  }

  return (
    <ChatRoomContainer>
      <ChatInput />
      <ChatMessageListContainer>
        {fetchedPosts.map((post, idx) => {
          return (
            <ChatMessageListItem key={idx}>
              <ChatMessageListItemText>
                {post.message}
              </ChatMessageListItemText>
              {renderFilePost(post.filePost)}
            </ChatMessageListItem>
          );
        })}
      </ChatMessageListContainer>
    </ChatRoomContainer>
  );
}

export { ChatRoom };
