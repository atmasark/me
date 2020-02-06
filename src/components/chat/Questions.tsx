import React, { useEffect, useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { StateContext } from '../../state/StateProvider'

const slideIn = keyframes`
  0% {
    margin-left: 100%;
    width: 300%;
  }
  100% {
    margin-left: 0%;
    width: 100%;
    opacity: 1;
  }
`

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
  width: 100%;
  height: 9%;
  background: white;
  display: flex;
  padding: 0px ${p => p.theme.spacing.unit}px;
  overflow-x: scroll;
  position: absolute;
  display: ${(p: { isInit: boolean; isDone: boolean; isLoading: boolean }) =>
    ((p.isLoading && p.isInit) || p.isDone) && 'none'};
  animation: ${(p: { isInit: boolean; isDone: boolean; isLoading: boolean }) =>
      (!p.isLoading && p.isInit && fadeIn) || (p.isDone && fadeOut)}
    ease-in-out 0.5s forwards;
  bottom: 0;
`

const Question = styled.p`
  font-size: 15px;
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
  animation: ${(p: { isLoading: boolean }) => !p.isLoading && slideIn} 0.5s
    ease-out 0.75s forwards;
`

export default () => {
  const { state, dispatch } = useContext(StateContext)
  const handleOnClick = question =>
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
      {state.questions.map((question, i) => (
        <Question
          isLoading={state.isLoading}
          onClick={() => handleOnClick(question)}
          key={i}
        >
          {question.content}
        </Question>
      ))}
    </Wrapper>
  )
}
