/** @jsx jsx */
import { jsx, css } from '@emotion/core'

export default ({ children }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}
  >
    {children}
  </div>
)
