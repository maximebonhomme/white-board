import * as PIXI from "pixi.js"

import { DRAG_COLOR } from "./constants"

class DragCircle {
  constructor(x, y, radius) {
    this.circle = null
    this.pos = {
      x,
      y,
    }
    this.radius = radius

    this.state = {
      canDraw: false,
    }

    this._init()
  }

  _init() {
    this.circle = new PIXI.Graphics()
    this.circle.lineStyle(2, DRAG_COLOR, 1)
    this.circle.drawCircle(this.x, this.y, this.radius)

    this.circle.interactive = true
    this.circle.buttonMode = true

    this.circle.hitArea = new PIXI.Rectangle(
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    )

    this.circle.on("pointerdown", this._handlePointerDown.bind(this))
    this.circle.on("pointerup", this._handlePointerUp.bind(this))
    this.circle.on("pointerupoutside", this._handlePointerUp.bind(this))
    this.circle.on("pointermove", this._handlePointerMove.bind(this))

    this._updatePosition(this.pos)
  }

  _handlePointerDown() {
    this.state.canDraw = true
    this._setAlpha(0.1)
  }

  _handlePointerUp() {
    this.state.canDraw = false
    this._setAlpha(1)
  }

  _handlePointerMove(e) {
    const { canDraw } = this.state
    if (!canDraw) return

    const { x, y } = e.data.global
    this.pos = { x, y }
    this._updatePosition(this.pos)
  }

  _setAlpha(a) {
    this.circle.alpha = a
  }

  _updatePosition({ x, y }) {
    this.circle.position.set(x, y)
  }

  get position() {
    return { ...this.pos }
  }

  set position({ x, y }) {
    this.pos = {
      x,
      y,
    }

    this._updatePosition(this.pos)
  }

  get pixiObject() {
    return this.circle
  }
}

export default DragCircle
