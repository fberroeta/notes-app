import React, { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const Toggable = forwardRef(({children, buttonLabel}, ref) => {
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
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{ buttonLabel }</button>
			</div>

			<div style={showWhenVisible}>
				{children}	
				<button onClick={toggleVisibility}>Cancel</button>
			</div>
		</div>
	);
});

Toggable.displayName = 'Toggable';

Toggable.propTypes = {
	buttonLabel : PropTypes.string.isRequired

};
export default Toggable;