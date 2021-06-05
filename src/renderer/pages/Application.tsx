import React, { useReducer } from 'react';
import { CurrentWindow } from '../../@types';
import ContentSection from '../components/ContentSection/ContentSection';
import FooterBar from '../components/FooterBar/FooterBar';
import HeaderBar from '../components/HeaderBar/HeaderBar';
import WindowContext, {
  initialWindowSettings,
  useWindowContext,
  windowReducer,
} from '../contexts/currentWindow';
import FilterContext, { filterReducer, initialFilter } from '../contexts/filteredGame';
import SelectedGameContext, {
  initialGameSelected,
  selectedGameReducer,
  useSelectedGameContext,
} from '../contexts/selectedGame';
import styles from './app.module.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Application: React.FC = () => {
  const [state, dispatch] = useReducer(filterReducer, initialFilter);
  const [selectedGameState, selectedGameDispatch] = useReducer(
    selectedGameReducer,
    initialGameSelected
  );
  const [windowState, windowDispatch] = useReducer(windowReducer, initialWindowSettings);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      <SelectedGameContext.Provider
        value={{ state: selectedGameState, dispatch: selectedGameDispatch }}
      >
        <WindowContext.Provider value={{ state: windowState, dispatch: windowDispatch }}>
          <div className={styles['app-container']}>
            <BackgroundImageContainer />
            <HeaderBar title="Kiwi Launcher" />
            <ContentSection />
            <FooterBar />
          </div>
        </WindowContext.Provider>
      </SelectedGameContext.Provider>
    </FilterContext.Provider>
  );
};

const BackgroundImageContainer: React.FC = () => {
  const { state: selectedGame } = useSelectedGameContext();
  const { state: windowState } = useWindowContext();

  if (windowState.currentWindow === CurrentWindow.HOME) return null;

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={selectedGame ? `${selectedGame.id}-background` : ''}
        timeout={350}
        classNames={'fade'}
      >
        <div
          className={styles.background}
          style={selectedGame && { backgroundImage: `url(${selectedGame.backgroundUrl})` }}
        />
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Application;
