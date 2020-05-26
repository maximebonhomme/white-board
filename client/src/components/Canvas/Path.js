import * as PIXI from "pixi.js"

import { PATH_COLOR, PATH_WIDTH } from "./constants"

class Path {
  constructor(points) {
    if (!points || points.length <= 0) {
      console.error("Path requires at least one point on init")
    }
    this.path = null
    this.start = null
    this.finish = null

    this._points = points

    this.gameRunning = true
    this.inStart = false
    this.inFinish = false
    this.inPath = false

    this._init()
  }

  _init() {
    this.path = new PIXI.Graphics()
    this.path.interactive = true

    this._updatePath()
    this._createStartFinish()
  }

  _updatePath() {
    this.path.clear()
    this.path.lineStyle(PATH_WIDTH, PATH_COLOR, 1)
    this.path.moveTo(this._points[0].x, this._points[0].y)

    this._points.forEach(({ x, y }) => {
      this.path.lineTo(x, y)
    })
  }

  _handleStartIn() {
    if (!this.gameRunning) return

    console.log("_handleStartIn")
    this.inStart = true
  }

  _handleStartOut() {
    if (!this.gameRunning) return

    console.log("_handleStartOut")
    this.inStart = false
  }

  _handleFinishIn() {
    if (!this.gameRunning) return

    console.log("_handleFinishIn")
    this.inFinish = true
  }

  _handleFinishOut() {
    if (!this.gameRunning) return

    console.log("_handleFinishOut")
    this.inFinish = false
  }

  _createStartFinish() {
    this.start = new PIXI.Graphics()
    this.finish = new PIXI.Graphics()

    this.start.lineStyle(2, 0x00ff28, 1)
    this.start.drawCircle(0, 0, PATH_WIDTH)
    this.start.interactive = true
    this.start.hitArea = new PIXI.Rectangle(
      -PATH_WIDTH,
      -PATH_WIDTH,
      PATH_WIDTH * 2,
      PATH_WIDTH * 2
    )

    this.finish.lineStyle(2, 0xee1010, 1)
    this.finish.drawCircle(0, 0, PATH_WIDTH)
    this.finish.interactive = true
    this.finish.hitArea = new PIXI.Rectangle(
      -PATH_WIDTH,
      -PATH_WIDTH,
      PATH_WIDTH * 2,
      PATH_WIDTH * 2
    )

    this.start.on("pointerover", this._handleStartIn.bind(this))
    this.start.on("pointerout", this._handleStartOut.bind(this))

    this.finish.on("pointerover", this._handleFinishIn.bind(this))
    this.finish.on("pointerout", this._handleFinishOut.bind(this))
  }

  get points() {
    return this._points
  }

  get lastPoint() {
    return this._points[this._points.length - 1]
  }

  set createPath(points) {
    this._points = points

    this._updatePath()
  }

  set addPoint({ x, y }) {
    this._points.push({ x, y })

    this._updatePath()
  }

  addToScene(scene) {
    scene.addChild(this.path)
    scene.addChild(this.finish)
    scene.addChild(this.start)
  }

  showStartFinish() {
    const start = this._points[0]
    const finish = this._points[this._points.length - 1]

    this.start.position.set(start.x, start.y)
    this.finish.position.set(finish.x, finish.y)
    this.start.alpha = 1
    this.finish.alpha = 1
  }

  clear() {
    this.path.clear()
    this.start.clear()
    this.finish.clear()
  }
}

export default Path
