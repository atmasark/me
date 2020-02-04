import React, { useReducer, useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: white;
`

const MessageContainer = styled.div`
  position: relative;
  padding: 7px 10px;
  background: blue;
  border-radius: 10px;
  width: fit-content;
  margin: ${(p: { user: boolean }) =>
    p.user ? '0 20px 10px 40px' : '0 40px 10px 20px'};
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

const Message = styled.p`
  margin: 0;
`

const initialState = {
  messages: [
    {
      user: false,
      isVisible: false,
      content: 'Hello there!',
    },
    {
      user: false,
      isVisible: false,
      content: "I'm Atte",
    },
    {
      user: false,
      isVisible: false,
      content: 'Wonder how you got here..',
    },
    {
      user: false,
      isVisible: false,
      content: "Anyway, what'cha want?",
    },
  ],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return {
        messages: state.messages.map((msg, i) => {
          if (i === action.index) {
            return { ...msg, isVisible: true }
          }
          return msg
        }),
      }
    default:
      throw new Error()
  }
}

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    state.messages.map((msg, i) => {
      if (
        (!msg.isVisible && i === 0) ||
        (!msg.isVisible && state.messages[i - 1].isVisible)
      ) {
        setTimeout(() => {
          dispatch({
            type: 'SHOW_MESSAGE',
            index: i,
          })
        }, 1750)
      }
    })
  })
  return (
    <Wrapper>
      {state.messages.map(
        (msg, i) =>
          msg.isVisible && (
            <MessageContainer key={i} user={msg.user}>
              <Message>{msg.content}</Message>
            </MessageContainer>
          )
      )}
    </Wrapper>
  )
}
