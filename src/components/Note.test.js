import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Note from './Note';
import {prettyDOM} from '@testing-library/dom';


test('note are returned as json', async () => {
	const note = { 
		content: 'This is a test',
		important: true
	};
	
	const component = render(<Note note={note} />);
	
	component.getAllByText('This is a test');
	component.getAllByText('make not important');

	//otra forma de hacerlo
	// expect(component.container).toHaveTextContent(note.content);

	const li = component.container.querySelector('li');
	console.log(prettyDOM(li));
});

test('clicking the button calls event handler once',() => {
	const note = { 
		content: 'This is a test',
		important: true
	};
	const mockHandler = jest.fn();

	const component = render(<Note note={note} toggleImportance={mockHandler} />);
	const button = component.getByText('make not important');
	fireEvent.click(button);

	expect(mockHandler).toHaveBeenCalledTimes(1);

});