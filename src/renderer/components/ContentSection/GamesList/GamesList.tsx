import React from 'react';
import { Game } from '../../../../@types/models';
import { useSelectedGameContext } from '../../../contexts/selectedGame';
import { useFilterContext } from '../../../contexts/filteredGame';

import styles from './games-list.module.scss';

import cs from 'classnames';

const sanitizeGames = (games: Game[], gameNameFilter: string) => {
  return games
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    .filter((game) => {
      return game.name.toLocaleLowerCase().includes(gameNameFilter.toLocaleLowerCase());
    });
};

export const GamesList: React.FC<{
  games: Game[];
}> = ({ games }) => {
  const { state: filterState } = useFilterContext();

  return (
    <aside className={styles['games-list-container']}>
      <Library header={'PC'} games={sanitizeGames(games, filterState.gameName)} />
    </aside>
  );
};

const Library: React.FC<{
  games: Game[];
  header: string;
}> = ({ games, header }) => {
  if (games.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className={styles['games-list__header']}>{header}</div>
      <div className={styles['games-list__section']}>
        <ul className={styles['games-list']}>
          {games.map((game) => (
            <li key={game.id} className={styles['games-list__list-item']}>
              <GameButton game={game} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const GameButton: React.FC<{
  game: Game;
}> = ({ game }) => {
  const { state: selectedGame, dispatch: setSelectedGame } = useSelectedGameContext();

  const buttonClasses = cs({
    [styles['games-list__game']]: true,
    [styles['games-list__game--active']]: selectedGame.id === game.id,
    [styles['games-list__game--installed']]: game.installed,
  });

  return (
    <button
      className={buttonClasses}
      onClick={() => {
        setSelectedGame({ type: 'setSelectedGame', payload: game });
      }}
    >
      <img className={styles['games-list__game__icon']} src={game.iconUrl} />
      {game.name}
    </button>
  );
};
