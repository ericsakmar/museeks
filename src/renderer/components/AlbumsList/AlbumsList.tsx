import React from 'react';
import { useSelector } from 'react-redux';
import { groupBy } from 'lodash-es';

import { RootState } from '../../store/reducers';
import * as PlayerActions from '../../store/actions/PlayerActions';

import TrackCover from '../Cover/Cover';

import styles from './AlbumsList.module.css';

const AlbumsList: React.FC = () => {
  const tracks = useSelector((state: RootState) => state.library.tracks.library);

  const artists = Object.entries(
    groupBy(
      tracks.map((t) => ({ ...t, artist: t.artist.join(', ') })),
      'artist'
    )
  )
    .map(([artist, tracks]) => ({
      name: artist,
      albums: Object.entries(groupBy(tracks, 'album'))
        .map(([album, tracks]) => ({
          name: album,
          tracks,
          coverPath: tracks[0].path
        }))
        .sort((a, b) => (a.tracks[0].year ?? 0) - (b.tracks[0].year ?? 0))
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleDoubleClick = (album: string) => {
    PlayerActions.startAlbum(album);
  };

  const content = artists.map((artist) => (
    <div key={artist.name} className={styles.artistGroup}>
      <div className={styles.artistName}>{artist.name}</div>

      <div className={styles.albumGroup}>
        {artist.albums.map((album) => (
          <div key={album.name} className={styles.album} onDoubleClick={() => handleDoubleClick(album.name)}>
            <TrackCover path={album.coverPath} />
            <div className={styles.albumName}>{album.name}</div>
          </div>
        ))}
      </div>
    </div>
  ));

  const content2 = artists.map((artist) => (
    <React.Fragment key={artist.name}>
      {artist.albums.map((album) => (
        <div key={album.name} className={styles.album} onDoubleClick={() => handleDoubleClick(album.name)}>
          <TrackCover path={album.coverPath} />
          <div className={styles.artistName}>{artist.name}</div>
          <div className={styles.albumName}>{album.name}</div>
        </div>
      ))}
    </React.Fragment>
  ));

  return <div className={styles.albumsList}>{content2}</div>;
};

export default AlbumsList;
