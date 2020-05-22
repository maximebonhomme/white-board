import styled, { css } from "@xstyled/styled-components"

export const full = css`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const Container = styled.div`
  position: fixed;
  ${full}
`

export const StyledCanvas = styled.div`
  position: absolute;
  ${full}
`
