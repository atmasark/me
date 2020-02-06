import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'

import Messages from './chat/Messages'
import Questions from './chat/Questions'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: #e6e6e6;
`

export default () => {
  return (
    <Wrapper>
      <Messages />
      <Questions />
    </Wrapper>
  )
}
