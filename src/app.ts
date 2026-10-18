import { mount } from 'svelte';
import './app.css';
import Home from './routes/Home.svelte';

const target = document.getElementById('app');
if (!target) {
  throw new Error('Élément #app introuvable.');
}

mount(Home, { target });
