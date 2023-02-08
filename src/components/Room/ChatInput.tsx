import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled, { useTheme } from 'styled-components';
import { postService } from '../../services/postService';
import { ICreateNewPost } from '../../types/IPost';
import { ITheme } from '../../types/ITheme';
import { TransparentButton } from '../StyledComponents/Button';
import { Input } from '../StyledComponents/Input';
import { SVG } from '../StyledComponents/SVG';
import { DarkNormalText } from '../StyledComponents/Texts';

const Form = styled.form`
  position: relative;
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: calc(50% - 12px);
  right: 4px;
`;

const InputFile = styled.input`
  width: 100px;
`;

const FileBubble = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 1.5rem;
  margin: 0 0.5rem;
  padding: 0 0.5rem;
  border: 1px solid black;
  border-radius: 1rem;
  background-color: ${props => props.theme.colors.alternative};
`;

const RemoveFileButton = styled(TransparentButton)`
  width: fit-content;
  margin-left: 0.25rem;
  color: red;
  font-size: 1.3rem;
  font-weight: bold;
`;

const ChatInput = () => {
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const theme = useTheme() as ITheme;

  const { register, handleSubmit, reset } = useForm<ICreateNewPost>();
  const onSubmit: SubmitHandler<ICreateNewPost> = async (data) => {
    if (isSendingMessage || (data.message.length === 0 && selectedFiles.length === 0)) return;
    setIsSendingMessage(true);
    try {
      await postService.create(data.message, selectedFiles);
      reset();
      setSelectedFiles([]);
    } catch (e) {
      // TODO
    } finally {
      setIsSendingMessage(false);
    }
  }

  const onSelectFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(Array.from(event.target.files ?? []));
  };

  const onRemoveFileHandler = (index: number) => {
    if (selectedFiles) {
      const newSelectedFiles = selectedFiles.slice(0, index).concat(selectedFiles.slice(index+1));
      setSelectedFiles(newSelectedFiles);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('message')} type='text' />
      <ButtonContainer>
        {selectedFiles && selectedFiles.map((selectedFile, index) => {
          return (
            <FileBubble key={index}>
              <DarkNormalText>{selectedFile.name}</DarkNormalText>
              <RemoveFileButton onClick={() => onRemoveFileHandler(index)} type='button'>X</RemoveFileButton>
            </FileBubble>
          );
        })}
        <InputFile {...register('files')} type='file' onChange={onSelectFileHandler} disabled={isSendingMessage} multiple />
        <TransparentButton onClick={handleSubmit(onSubmit)} disabled={isSendingMessage} >
          <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={theme.colors.secondary}>
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </SVG>
        </TransparentButton>
      </ButtonContainer>
    </Form>
  );
}

export { ChatInput };
