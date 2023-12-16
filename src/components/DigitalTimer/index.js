import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {limit: 25, start: true, counter: 0, disable: false, someVar: 25}

  componentWillUnmount() {
    clearInterval(this.id)
  }

  onClickReset = () => {
    this.setState({
      limit: 25,
      start: true,
      counter: 0,
      someVar: 25,
      disable: false,
    })
    clearInterval(this.id)
  }

  onClickPlus = () => {
    const {limit, disable} = this.state
    if (disable === false) {
      if (limit + 1 < 60) this.setState({limit: limit + 1, someVar: limit + 1})
    }
  }

  onClickMinus = () => {
    const {limit, disable} = this.state
    if (disable === false) {
      if (limit - 1 > 0) this.setState({limit: limit - 1, someVar: limit - 1})
    }
  }

  onClickStart = () => {
    const {start} = this.state
    this.setState(prevState => ({
      start: !prevState.start,
      disable: true,
    }))
    if (start) this.id = setInterval(this.tick, 1000)
    else clearInterval(this.id)
  }

  tick = () => {
    let {limit, counter} = this.state
    if (counter === 0) {
      limit -= 1
      counter = 60
    }
    if (counter - 1 >= 0) counter -= 1
    else if (counter === 0 && limit === 0) {
      clearInterval(this.id)
      this.setState({
        limit: 25,
        counter: 60,
        disable: false,
        someVar: 25,
        start: true,
      })
    }
    this.setState({limit, counter})
  }

  render() {
    const {limit, start, counter, someVar} = this.state
    const imageUrl = start
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const imageAltText = start ? 'play icon' : 'pause icon'
    const mainText = start ? 'Start' : 'Pause'
    const disText = start ? 'Paused' : 'Running'
    const stringifiedMinutes = limit > 9 ? limit : `0${limit}`
    let stringifiedSeconds = counter > 9 ? counter : `0${counter}`
    if (counter === 60) stringifiedSeconds = `00`

    return (
      <div className="bg">
        <h1 className="heading">Digital Timer</h1>
        <div className="flexi">
          <div className="card">
            <div className="timer-display">
              <div>
                <h1 className="timer">
                  {stringifiedMinutes}:{stringifiedSeconds}
                </h1>
                <p className="fi">{disText}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flexi1">
              <button
                onClick={this.onClickStart}
                className="start-button"
                type="button"
              >
                <img className="image" src={imageUrl} alt={imageAltText} />
                <p className="par1">{mainText}</p>
              </button>
              <button
                onClick={this.onClickReset}
                className="start-button"
                type="button"
              >
                <img
                  className="image"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p className="par1">Reset</p>
              </button>
            </div>
            <div>
              <p>Set Timer Limit</p>
              <div className="flexi1">
                <button
                  onClick={this.onClickMinus}
                  type="button"
                  className="plus-button"
                >
                  -
                </button>
                <div className="displayText">
                  <p>{someVar}</p>
                </div>
                <button
                  onClick={this.onClickPlus}
                  type="button"
                  className="plus-button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
