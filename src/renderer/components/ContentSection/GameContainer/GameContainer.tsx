import React from 'react';
import { Game } from '../../../../@types/models';
import withAnimation from '../../../hocs/withAnimation';
import { AnimeProps } from 'react-anime';
import styles from './game-container.module.scss';
import { CoverImage } from '../../../components/CoverImage/CoverImage';
import { InstallButton, PlayButton } from '../../../components/GameButton/GameButton';
import { dateMillisToString, playtimeMillisToString } from '../../../utilities/dateUtilities';

export const GameDetails: React.FC<{ game: Game }> = ({ game }) => {
  console.log(game);

  return (
    <main className={styles['card-container']}>
      <div className={styles['card-wrapper']}>
        <AnimatedCard game={game} />
      </div>
    </main>
  );
};

const Card: React.FC<{ game: Game }> = ({ game }) => {
  console.log('Card');
  return (
    <div className={`${styles.card}`}>
      <AnimatedInnerCard game={game} />
    </div>
  );
};

const InnerCard: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <div className={styles['card__card-grid']}>
      <div className={styles['card__card-grid__row']}>
        {game.coverUrl ? (
          <CoverImage className={styles['card__cover-image']} coverSrc={game.coverUrl} />
        ) : (
          <div></div>
        )}
        <h1 className={`${styles['card__header']}`}> {game.name}</h1>
      </div>
      <div className={styles['card__card-grid__row']}>
        {game.installed ? (
          <PlayButton id={game.originalId} />
        ) : (
          <InstallButton id={game.originalId} />
        )}
        <LiveData className={styles['card__live-data']} game={game} />
      </div>
    </div>
  );
};

const LiveData: React.FC<{ className: string; game: Game }> = ({ className, game }) => {
  return (
    <div className={className}>
      <span className={styles['card__live-data__header']}>Launcher</span>
      <span>Steam</span>
      {!!game.playtime && (
        <>
          <span className={styles['card__live-data__header']}>Played for</span>
          <span>{playtimeMillisToString(game.playtime)}</span>
        </>
      )}
      {game.lastPlayed && (
        <>
          <span className={styles['card__live-data__header']}>Last Played</span>
          <span>{dateMillisToString(game.lastPlayed)}</span>
        </>
      )}
    </div>
  );
};

const AnimatedCard = withAnimation<{ game: Game }>([
  { translateY: [50, 0], duration: 400, easing: 'easeInSine' } as AnimeProps,
])(Card);

const AnimatedInnerCard = withAnimation<{ game: Game }>([
  { delay: 100, opacity: [0, 1], duration: 300, easing: 'linear' } as AnimeProps,
])(InnerCard);