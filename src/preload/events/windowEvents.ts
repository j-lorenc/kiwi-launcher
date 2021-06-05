import { ipcRenderer } from 'electron';

const closeWindow = (): void => {
  ipcRenderer.send('close-main-window');
};

const minimizeWindow = (): void => {
  ipcRenderer.send('minimize-main-window');
};

const maximizeWindow = (): void => {
  ipcRenderer.send('maximize-main-window');
};

export function onMessageReceived(): void {
  window.addEventListener('message', (e: MessageEvent) => {
    const eventType = e.data.type;

    if (eventType === 'close-window') {
      closeWindow();
    }

    if (eventType === 'minimize-window') {
      minimizeWindow();
    }

    if (eventType === 'maximize-window') {
      maximizeWindow();
    }
  });
}
