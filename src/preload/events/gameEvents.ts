import games from './games';

export function onGameMessageReceived(): void {
  window.addEventListener('message', (e: MessageEvent) => {
    const eventType = e.data.type;

    if (eventType === 'request-games-list') {
      window.postMessage(
        {
          type: 'games',
          value: games,
        },
        '*'
      );
    }
  });
}
