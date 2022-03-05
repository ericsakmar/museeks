import React from 'react';

import PlayingBarInfos from '../PlayingBarInfo/PlayingBarInfo';
import Cover from '../Cover/Cover';
import { TrackModel, Repeat } from '../../../shared/types/museeks';

import styles from './PlayingBar.module.css';

interface Props {
  queue: TrackModel[];
  queueCursor: number | null;
  shuffle: boolean;
  repeat: Repeat;
}

interface State {
  queueOpen: boolean;
}

export default class PlayingBar extends React.Component<Props, State> {
  state = {
    queueOpen: false
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { queue, queueCursor, repeat, shuffle } = this.props;

    if (queueCursor === null) return null;

    const trackPlaying = queue[queueCursor];

    return (
      <div className={styles.playingBar}>
        <Cover path={trackPlaying.path} />
        <PlayingBarInfos trackPlaying={trackPlaying} shuffle={shuffle} repeat={repeat} />
      </div>
    );
  }
}
