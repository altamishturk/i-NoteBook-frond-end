import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NotesState from './Context/note/NoteState'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotesState>
    <App />
    </NotesState>
  </React.StrictMode>
);


