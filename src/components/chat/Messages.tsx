import React, { useEffect, useContext, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { StateContext } from '../../state/StateProvider'

const fadeIn = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`

const Wrapper = styled.div`
  display: flex;
  height: 1fr;
  flex-direction: column;
  overflow-y: auto;
  padding: ${p => p.theme.spacing.unit * 3}px;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
`

const Container = styled.div`
  position: relative;
  animation: ${fadeIn} ease-in-out 0.15s;
  padding: 7px 10px;
  background: blue;
  border-radius: 10px;
  width: fit-content;
  margin: ${(p: { user: boolean }) =>
    p.user ? '0 0px 10px 40px' : '0 40px 10px 0px'};
  align-self: ${(p: { user: boolean }) => p.user && 'flex-end'};
  background: ${(p: { user: boolean }) => (p.user ? '#333333;' : '#f3f3f3')};
  color: ${(p: { user: boolean }) => (p.user ? '#fff' : '#000')};
  float: ${(p: { user: boolean }) => p.user && 'right'};
  :after {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    ${(p: { user: boolean }) => (p.user ? 'right: -10px' : 'left: -10px')};
    top: 0px;
    bottom: auto;
    border: 10px solid;
    border-color: ${(p: { user: boolean }) =>
      p.user
        ? '#333333 transparent transparent transparent;'
        : '#f3f3f3 transparent transparent transparent;'};
  }
`

export default () => {
  const { state, dispatch } = useContext(StateContext)
  const messageArea = useRef<HTMLDivElement>(null)

  useEffect(() => {
    state.messages.map((msg, i) => {
      if (!msg.isVisible && (i === 0 || state.messages[i - 1].isVisible)) {
        setTimeout(() => {
          dispatch({
            type: 'SHOW_MESSAGE',
            index: i,
          })
        }, !msg.user && (msg.delay || 1750))
      }
    })
    if (state.isLoading && state.messages.every(msg => msg.isVisible)) {
      dispatch({ type: 'SET_READY' })
    }

    if (state.isLoading && messageArea.current) {
      messageArea.current.scrollTop = messageArea.current.scrollHeight
    }
  }),
    [state.messages]
  return (
    <Wrapper ref={messageArea}>
      {state.messages.map(
        (msg, i) =>
          msg.isVisible && (
            <Container
              key={i}
              user={msg.user}
              dangerouslySetInnerHTML={{ __html: msg.content }}
            ></Container>
          )
      )}
    </Wrapper>
  )
}
