import React, { useState } from 'react';
import LibraryIcon from 'feather-icons/dist/icons/tool.svg';

import SteamCredModal from '../../../components/Modal/SteamCredModal';

export const ShowSteamCredButton: React.FC = () => {
  const [showSteamCredModal, setShowSteamCredModal] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => {
          setShowSteamCredModal(!showSteamCredModal);
        }}
      >
        <LibraryIcon viewBox="2 -2 24 24" />
      </button>
      <SteamCredModal active={showSteamCredModal} onClose={setShowSteamCredModal} />
    </>
  );
};
