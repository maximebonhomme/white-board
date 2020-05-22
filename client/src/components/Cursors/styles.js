import styled from "@xstyled/styled-components"

import { CURSOR_SIZE } from "./constants"

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const Cursor = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: ${CURSOR_SIZE}px;
  height: ${CURSOR_SIZE}px;
  border-radius: 50%;
  background-color: ${(p) => p.color};
`
