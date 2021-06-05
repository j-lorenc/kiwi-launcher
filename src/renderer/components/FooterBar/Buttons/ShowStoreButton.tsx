import React from 'react';
import { showSteamStore } from '../../../events/game';
import StoreIcon from 'feather-icons/dist/icons/shopping-bag.svg';

export const ShowStoreButton: React.FC = () => {
  return (
    <button
      onClick={() => {
        showSteamStore();
      }}
    >
      <StoreIcon viewBox="2 -2 24 24" />
    </button>
  );
};
