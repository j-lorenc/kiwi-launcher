import React from 'react';
import { refreshGamesList } from '../../../events/game';
import SyncIcon from 'feather-icons/dist/icons/refresh-cw.svg';

export const RefreshButton: React.FC = () => {
  return (
    <button
      title="Sync"
      onClick={() => {
        refreshGamesList();
      }}
    >
      <SyncIcon viewBox="2 -2 24 24" />
    </button>
  );
};
