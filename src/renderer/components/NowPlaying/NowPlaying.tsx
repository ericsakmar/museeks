import React from 'react';
import { useSelector } from 'react-redux';

import { getStatus } from '../../lib/utils-library';
import { RootState } from '../../store/reducers';
import Queue from '../Queue/Queue';
import PlayingBar from '../PlayingBar/PlayingBar';
import PlayerControls from '../PlayerControls/PlayerControls';
import * as QueueActions from '../../store/actions/QueueActions';
import Button from '../../elements/Button/Button';

import styles from './NowPlaying.module.css';

interface Props {
  progress?: number;
  animated?: boolean;
}

const NowPlaying: React.FC<Props> = () => {
  const queue = useSelector((state: RootState) => state.player.queue);
  const queueCursor = useSelector((state: RootState) => state.player.queueCursor);
  const shuffle = useSelector((state: RootState) => state.player.shuffle);
  const repeat = useSelector((state: RootState) => state.player.repeat);
  const playerStatus = useSelector((state: RootState) => state.player.playerStatus);

  const incomingQueue = queue.slice(queueCursor + 1);

  return (
    <div className={styles.now_playing}>
      <PlayingBar queue={queue} queueCursor={queueCursor} shuffle={shuffle} repeat={repeat} />

      <Queue queue={queue} queueCursor={queueCursor} />

      <div className={styles.footer}>
        <Button bSize='small' onClick={QueueActions.clear}>
          clear queue
        </Button>

        <div className={styles.footerInfo}>{getStatus(incomingQueue)}</div>
      </div>

      <PlayerControls playerStatus={playerStatus} />
    </div>
  );
};

export default NowPlaying;
