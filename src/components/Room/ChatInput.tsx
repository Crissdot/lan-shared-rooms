import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled, { useTheme } from 'styled-components';
import { postService } from '../../services/postService';
import { ICreateNewPost } from '../../types/IPost';
import { ITheme } from '../../types/ITheme';
import { Input } from '../StyledComponents/Input';

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

const Button = styled.button`
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  opacity: ${props => props.disabled ? 0.5 : 1};
  cursor: pointer;
`;

const RemoveFileButton = styled(Button)`
  color: red;
  font-size: 1.3rem;
  font-weight: bold;
`;

const SVG = styled.svg`
  width: 24px;
  height: 24px;
`;

const ChatInput = () => {
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isAFileSelected, setIsAFileSelected] = useState(false);
  const theme = useTheme() as ITheme;

  const { register, handleSubmit, reset, resetField } = useForm<ICreateNewPost>();
  const onSubmit: SubmitHandler<ICreateNewPost> = async (data) => {
    const files = data.files as FileList;
    if (isSendingMessage || (data.message.length === 0 && files.length === 0)) return;
    setIsSendingMessage(true);
    try {
      const file = files[0];
      await postService.create(data.message, file);
      reset();
    } catch (e) {
      // TODO
    } finally {
      setIsSendingMessage(false);
      setIsAFileSelected(false);
    }
  }

  const onSelectFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAFileSelected(true);
  };

  const onRemoveFileHandler = () => {
    resetField('files');
    setIsAFileSelected(false);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('message')} type='text' />
      <ButtonContainer>
        {isAFileSelected && <RemoveFileButton onClick={onRemoveFileHandler} type='button'>X</RemoveFileButton>}
        <InputFile {...register('files')} type='file' onChange={onSelectFileHandler} disabled={isSendingMessage} />
        <Button onClick={handleSubmit(onSubmit)} disabled={isSendingMessage} >
          <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={theme.colors.secondary}>
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </SVG>
        </Button>
      </ButtonContainer>
    </Form>
  );
}

export { ChatInput };
