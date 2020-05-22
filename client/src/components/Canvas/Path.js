import * as PIXI from "pixi.js"

import { PATH_COLOR } from "./constants"

class Path {
  constructor(points) {
    if (!points || points.length <= 0) {
      console.error("Path require at least one point on init")
    }
    this.path = null
    this._points = points

    this._init()
  }

  _init() {
    this.path = new PIXI.Graphics()

    this._updatePath()
  }

  _updatePath() {
    this.path.clear()
    this.path.lineStyle(2, PATH_COLOR, 1)
    this.path.moveTo(this._points[0].x, this._points[0].y)

    this._points.forEach(({ x, y }) => {
      this.path.lineTo(x, y)
    })
  }

  get points() {
    return this._points
  }

  get lastPoint() {
    return this._points[this._points.length - 1]
  }

  get pixiObject() {
    return this.path
  }

  set addPoint({ x, y }) {
    this._points.push({ x, y })

    this._updatePath()
  }
}

export default Path
