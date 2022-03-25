import React,{ useState, useRef} from 'react';
import Toggable from './Toggable';

const NoteForm = ({ handleLogOut, addNote }) => {
	const [newNote, setNewNote] = useState('');
	const toggleRef = useRef();
	const handleChange = (event) => {
		setNewNote(event.target.value);
	};
	const handleSubmit = (event) =>{
		event.preventDefault();       

		const noteObject = {
			content: newNote,
			important: Math.random() > 0.5,
		};

		addNote(noteObject);
		setNewNote('');
		toggleRef.current.toggleVisibility();
	};  
	return ( 
		<Toggable buttonLabel='New Note' ref={toggleRef}>       
			<h3 >Create a new note</h3> 

			<form onSubmit={handleSubmit}>
				<input 
					placeholder='Write your content note'
					value={newNote} 
					onChange={handleChange} 
				/>
				<button type="submit">save</button>
			</form>
            
			<div>
				<button onClick={handleLogOut}>Logout</button>
			</div>
		</Toggable>
	);
};



export default NoteForm;