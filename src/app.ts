import { mount } from 'svelte';
import './app.css';
import { registerSW } from 'virtual:pwa-register';
import App from './App.svelte';
import { installPrompt } from './lib/pwa/install.svelte';

const target = document.getElementById('app');
if (!target) {
  throw new Error('Élément #app introuvable.');
}

installPrompt.listen();
// Mise à jour silencieuse : la progression est enregistrée à chaque action, rien ne se perd.
registerSW({ immediate: true });

mount(App, { target });
