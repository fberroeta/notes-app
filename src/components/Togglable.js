import React, { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import i18n from '../i18n/index';
const Togglable = forwardRef(({children, buttonLabel}, ref) => {
	const [visible, setVisible] = useState(false);

	//Renderizar elementos pero ocultarlos
	const hideWhenVisible = { display: visible && 'none'};
	const showWhenVisible = { display: !visible && 'none'};
    
	const toggleVisibility = () => setVisible(!visible);

	useImperativeHandle(ref, ()=>{
		return{
			toggleVisibility
		};
	});

	return (
		<div data-testid='Togglable'>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{ buttonLabel }</button>
			</div>

			<div style={showWhenVisible}>
				{children}	
				<button onClick={toggleVisibility}>{i18n.TOGGLABLE.CANCEL_BUTTON}</button>
			</div>
		</div>
	);
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
	buttonLabel : PropTypes.string.isRequired

};
export default Togglable;