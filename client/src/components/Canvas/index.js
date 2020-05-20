import React, { useRef } from "react"
import styled, { css } from "@xstyled/styled-components"
import { useWindowSize } from "react-use"

import Cursors from "../Cursors"

const full = css`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  position: fixed;
  ${full}
`

const StyledCanvas = styled.canvas`
  position: absolute;
  ${full}
`

const Canvas = () => {
  const canvasRef = useRef(null)
  const { width, height } = useWindowSize()

  return (
    <Container>
      <Cursors />
      <StyledCanvas width={width} height={height} ref={canvasRef} />
    </Container>
  )
}

export default Canvas
