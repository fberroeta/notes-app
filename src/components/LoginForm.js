import React  from 'react';
import Toggable from './Toggable';
import PropTypes from 'prop-types';

//para tener un valor por defecto de una funcion 
const NO_OP = () => {};

const LoginForm = ({username, password, handleSubmit = NO_OP, handleUsernameChange, handlePasswordChange}) => {

	return ( 
		<Toggable buttonLabel='Show Login'>
			<div>
				<form onSubmit={handleSubmit}>
					<div>
						<input
							type="text"
							value={username}
							name="Username"
							onChange={handleUsernameChange}
						/>
					</div>
					<div>
						<input
							type="password"
							value={password}
							name="Password"
							onChange={handlePasswordChange}
						/>
					</div>
					<button>Login</button>
				</form>

			</div>
		</Toggable>		
		
	);
};

LoginForm.propTypes = {
	username: PropTypes.string,
	password: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
};
export default LoginForm;