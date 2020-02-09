import React from 'react'
import styled from 'styled-components'

import Messages from './chat/Messages'
import Questions from './chat/Questions'

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-rows: 70px;
  border: 40px solid #2e2e2e;
  width: 411px;
  height: 800px;
  border-width: 55px 7px;
  border-radius: 40px;
  box-shadow: 0px 3px 0 #101010, 0px 4px 0 #101010, 0px 5px 0 #101010,
    0px 7px 0 #101010, 0px 10px 20px #1a1a1a;
  overflow: hidden;
  @media screen and (max-height: 850px), (max-width: 768px) {
    border: none;
    border-radius: unset;
    height: 100%;
    width: 100%;
  }
`

export default () => {
  return (
    <Wrapper>
      <Messages />
      <Questions />
    </Wrapper>
  )
}
