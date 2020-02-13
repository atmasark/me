import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { StateContext } from '../../state/StateProvider'

import { Question as QuestionType } from '../../state/types'

// Animations for questions
const slideIn = keyframes`
  0% {
    margin-left: 100%;
    width: 300%;
    opacity: 0;
  }
  100% {
    margin-left: 0%;
    width: 100%;
    opacity: 1;
  }
`

const slideOut = keyframes`
  0% {
    margin-left: 0%;
    width: 100%;
    opacity: 1;
  }
  100% {
    margin-left: 100%;
    width: 300%;
    opacity: 0;
  }
`

// Animations for wrapper
const fadeIn = keyframes`
  from {
    bottom: -100px;
  }
  to {
    bottom: 0;
  }
`

const fadeOut = keyframes`
  from {
    bottom: 0;
  }
  to {
    bottom: -100px;
  }
`

const Wrapper = styled.div`
  border-top: 3px solid #e9e9e9;
  position: relative;
  display: ${(p: { isInit: boolean; isDone: boolean; isLoading: boolean }) =>
    ((p.isLoading && p.isInit) || p.isDone) && 'none'};
  animation: ${(p: { isInit: boolean; isDone: boolean; isLoading: boolean }) =>
      (!p.isLoading && p.isInit && fadeIn) || (p.isDone && fadeOut)}
    ease-in-out 0.5s forwards;
  bottom: 0;
  overflow: hidden;
`

const ScrollableQuestions = styled.div`
  padding: 0px ${p => p.theme.spacing.unit}px;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  overflow-x: auto;
  display: flex;
  height: 100%;
`

const Question = styled.p`
  font-size: 16px;
  max-width: fit-content;
  display: flex;
  padding: 5px 10px;
  align-self: center;
  color: black;
  border-radius: 25px;
  border: 1px solid #e6e6e6;
  white-space: nowrap;
  margin: 0px 10px;
  opacity: 0;
  animation: ${(p: { isLoading: boolean }) =>
      !p.isLoading ? slideIn : slideOut}
    ease-out 0.5s forwards;
  animation-delay: ${(p: { isLoading: boolean }) =>
    !p.isLoading ? '0.5s' : '0s'};
`

export default () => {
  const { state, dispatch } = useContext(StateContext)
  const handleOnClick = (question: QuestionType, isLoading: boolean) =>
    !isLoading &&
    dispatch({
      type: 'ADD_MESSAGE',
      key: question.key,
      content: question.content,
      answers: question.answers,
    })
  return (
    <Wrapper
      isInit={state.messages.length === 4}
      isDone={!state.questions.length}
      isLoading={state.isLoading}
    >
      <ScrollableQuestions>
        {state.questions.map((question, i) => (
          <Question
            isLoading={state.isLoading}
            onClick={() => handleOnClick(question, state.isLoading)}
            key={i}
          >
            {question.content}
          </Question>
        ))}
      </ScrollableQuestions>
    </Wrapper>
  )
}
