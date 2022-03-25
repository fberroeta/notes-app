import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';
import loginService from './services/login';

import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';

const App = () => {
	const [notes, setNotes] = useState([]);
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	//TODO limpiar username y pass de App.js
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	//para leer el localstorage
	useEffect(() => {
		const loggedUserJSON = localStorage.getItem('loggedNoteAppUser');
		if(loggedUserJSON){
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			noteService.setToken(user.token);
		}
	},[]);
	//TODO logout
	const handleLogOut = () => {
		setUser(null);
		noteService.setToken(user.token);
		localStorage.removeItem('loggedNoteAppUser');
	};

	const addNote = (noteObject) => {			
    
		noteService
			.create(noteObject)
			.then((returnedNote) => {
				setNotes(notes.concat(returnedNote));
			});
	};

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
			})
			.catch((error) => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			});
	};



	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password,
			});
      
			//guardar token 
			localStorage.setItem(
				'loggedNoteAppUser', JSON.stringify(user)
			);

			noteService.setToken(user.token);

			setUser(user);
			setUsername('');
			setPassword('');
		} catch (error) {
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  
	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />
			{
				user 
					? <NoteForm
						handleLogOut={handleLogOut}
						addNote={addNote}
					/> 
					: <LoginForm
						username={username}
						password={password}
						handleUsernameChange={(event) => setUsername(event.target.value)}
						handlePasswordChange={(event) => setPassword(event.target.value)}
						handleSubmit={handleLogin}
					/>
			}

			<div>
				<button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map((note, i) => (
					<Note
						key={i}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>
      
		</div>
	);
};

export default App;
