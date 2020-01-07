import React from 'react'
import styled from '@emotion/styled'

const StyledDiv = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

export const Section: React.FC<{}> = ({ children }) => (
  <StyledDiv>
    {children}
  </StyledDiv>
)
