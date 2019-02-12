import { h, Color, Component, Fragment, StatelessComponent } from 'ink'
import { Change, diffLines } from 'diff'
import * as chokidar from 'chokidar'

import * as fs from 'fs-extra'
import { read } from '../utils'
import { paths } from '../config'
const { worldGameFile, worldOkFile, worldPath } = paths

type Props = {
  stage: string
}
type GameState =
  | {
      process: 'init'
    }
  | {
      process: 'play'
      startTime: number
      gameText: string
      okText: string
      diffs: Change[]
    }
  | {
      process: 'finish'
      time: number
    }
type State = {
  game: GameState
}

class App extends Component<Props, State> {
  timer = null as ReturnType<typeof setInterval> | null
  watcher = null as chokidar.FSWatcher | null
  state = {
    game: {
      process: 'init',
    } as GameState,
  }

  componentDidMount() {
    this.initialize()
  }
  async initialize() {
    const { stage } = this.props
    const sourceStagePath = paths.stages.root + '/' + stage
    fs.removeSync(worldPath)
    fs.copySync(sourceStagePath, worldPath)
    const gameText = read(worldGameFile)
    const okText = read(worldOkFile)
    const diffs = diffLines(gameText, okText)
    this.setState({
      game: { process: 'play', startTime: Date.now(), gameText, okText, diffs },
    })

    this.watcher = chokidar.watch(worldGameFile, { persistent: true })
    this.watcher.on('all', (event, path) => {
      const { game } = this.state
      if (game.process !== 'play') {
        return
      }
      const gameText = read(worldGameFile)
      const diffs = diffLines(gameText, okText)
      if (diffs.length > 1) {
        this.setState({
          game: { ...game, gameText, okText, diffs },
        })
      } else {
        clearInterval(this.timer!)
        const time = Date.now() - game.startTime
        this.setState({
          game: { process: 'finish', time },
        })
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer!)
    if (this.watcher) {
      this.watcher.close()
    }
  }

  render() {
    const { game } = this.state
    switch (game.process) {
      case 'init':
        return (
          <Fragment>
            <Color green>loading ...</Color>
          </Fragment>
        )
      case 'play':
        const { diffs } = game
        return (
          <Fragment>
            <div>--------------------</div>
            <div>{worldGameFile}</div>
            <div>--------------------</div>
            <DiffView changes={diffs} />
          </Fragment>
        )
      case 'finish':
        return (
          <Fragment>
            <div>
              <Color white>Finish</Color>
            </div>
            <div>
              <Color green>Time: {toSecondTime(game.time)}</Color>
            </div>
            <div>
              <Color white>gg!</Color>
            </div>
          </Fragment>
        )
    }
  }
}

const toSecondTime = (time: number): string => {
  return `${Math.floor(time / 1000)}.${time % 1000}`
}

const DiffView: StatelessComponent<{ changes: Change[] }> = props => {
  return (
    <div>
      <Fragment>
        {props.changes.map(change => {
          const color = change.added ? 'green' : change.removed ? 'red' : 'gray'
          return <Color keyword={color}>{change.value}</Color>
        })}
      </Fragment>
    </div>
  )
}

export default App
