import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { postService } from '../../services/postService';
import { ICreateNewPost } from '../../types/IPost';

const Form = styled.form`
  position: relative;
  width: 100%;
  max-width: 600px;
`;

const Input = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0 1rem;
  border-radius: 1rem;
  border: 1px solid black;
`;

const Button = styled.button`
  position: absolute;
  top: calc(50% - 12px);
  right: 4px;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const SVG = styled.svg`
  width: 24px;
  height: 24px;
`;

interface Props {
  reloadPosts: () => Promise<void>;
}

const ChatInput = ({reloadPosts}: Props) => {
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const { register, handleSubmit, reset } = useForm<ICreateNewPost>();
  const onSubmit: SubmitHandler<ICreateNewPost> = async (data) => {
    if (isSendingMessage || data.message.length === 0) return;
    setIsSendingMessage(true);
    try {
      const newPost = await postService.create(data.message);
      await reloadPosts();
      reset();
      setIsSendingMessage(false);
    } catch (e) {
      // TODO
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('message')} type='text' />
      <Button onClick={handleSubmit(onSubmit)} disabled={isSendingMessage} >
        <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue">
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </SVG>
      </Button>
    </Form>
  );
}

export { ChatInput };
