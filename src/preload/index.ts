import { onGameMessageReceived } from './events/gameEvents';
import { applyMigrations } from './events/migrationEvents';
import { onMessageReceived } from './events/windowEvents';

applyMigrations();

window.addEventListener('DOMContentLoaded', () => {
  onGameMessageReceived();
  onMessageReceived();
});
