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

const FileItem = styled.p`
  position: relative;
  padding: 0.5rem;
  color: black;
  border-top: 2px solid black;
`;

const DownloadFileButton = styled.a`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 2px;
  left: calc(100% + 0.25rem);
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

    return (
      <FileItem>
        {file.name}
        <DownloadFileButton href={file.path} target='_blank' download>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
            <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
        </DownloadFileButton>
      </FileItem>
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
