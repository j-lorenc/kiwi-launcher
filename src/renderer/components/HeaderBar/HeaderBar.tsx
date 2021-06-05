import * as React from 'react';
import icon from '../../../../resources/icon.png';
import styles from './header.module.scss';

import { ListButton } from './ViewButtons/ListButton';
import { HomeButton } from './ViewButtons/HomeButton';
import { GameFilterInput } from './GameFilterInput/GameFilterInput';
import { WindowButtons } from './WindowButtons/WindowButtons';

const DragBar: React.FC<{ title: string }> = ({ title }) => (
  <>
    <img className={styles['title-bar__title__icon']} src={icon} />
    <div className={styles['settings-bar']}>
      <GameFilterInput />
      <div className={styles['icon-list']}>
        <HomeButton />
        <ListButton />
      </div>
    </div>
    <div className={styles['title-bar__drag-bar']}></div>
  </>
);

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className={styles['header-bar']}>
      <div className={styles['title-bar']}>
        <DragBar title={title} />
        <WindowButtons />
      </div>
    </header>
  );
};

export default Header;
