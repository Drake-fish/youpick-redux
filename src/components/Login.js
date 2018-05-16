import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPreferences } from '../actions/preferenceActions';
import {
	googleLogin,
	twitterLogin,
	loginEmail,
	registerEmail
} from '../actions/userActions';
import '../styles/login.css';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			register: false
		};
	}
	componentWillMount() {
		if (this.props.user !== null) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user !== null) {
			this.props.getPreferences(nextProps.user.uid);
			nextProps.history.push('/');
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		let email = this.state.email;
		let password = this.state.password;
		this.props.loginEmail(email, password);
		this.setState({
			email: '',
			password: ''
		});
	};
	handleRegister = e => {
		const { registerEmail } = this.props;
		e.preventDefault();
		let email = this.state.email;
		let password = this.state.password;
		let confirmPassword = this.state.confirmPassword;
		if (password === confirmPassword) {
			registerEmail(email, password);
		} else {
			alert('Passwords DO NOT MATCH');
			this.setState({
				password: '',
				confirmPassword: ''
			});
		}

		this.props.history.push('/preferences');
	};
	toggleForm = () => {
		this.setState({ register: !this.state.register });
	};
	render() {
		return (
			<div className="login-container">
				{this.state.register ? (
					<div className="login">
						<form onSubmit={this.handleSubmit} className="login-form hidden">
							<h2 className="form-title">LOGIN</h2>
							<input
								type="text"
								value={this.state.email}
								placeholder="Username"
								onChange={this.handleChange}
								name="name"
								required
							/>
							<input
								type="password"
								value={this.state.password}
								placeholder="Password"
								name="password"
								onChange={this.handleChange}
								required
							/>
							<button className="submit">LOGIN</button>
							<p className="register-text">
								No account?{' '}
								<span onClick={this.registerForm} className="register-link">
									Sign-up
								</span>
							</p>
							<button onClick={this.props.googleLogin} className="google">
								<i className="fab fa-google" />GOOGLE
							</button>
							<button onClick={this.props.twitterLogin} className="twitter">
								<i className="fab fa-twitter" />TWITTER
							</button>
						</form>
						<form onSubmit={this.handleRegister} className="register-form">
							<h2 className="form-title">REGISTER</h2>
							<input
								type="email"
								value={this.state.name}
								placeholder="Email"
								name="email"
								onChange={this.handleChange}
								required
							/>
							<input
								type="password"
								value={this.state.password}
								name="password"
								placeholder="Password"
								onChange={this.handleChange}
								required
							/>
							<input
								type="password"
								value={this.state.confirmPassword}
								name="confirmPassword"
								placeholder="Confirm Password"
								onChange={this.handleChange}
								required
							/>
							<button className="submit">REGISTER</button>
							<p className="register-text">
								Already have an account?{' '}
								<span onClick={this.toggleForm} className="register-link">
									Login
								</span>
							</p>
						</form>
					</div>
				) : (
					<div className="login">
						<form onSubmit={this.handleSubmit} className="login-form">
							<h2 className="form-title">LOGIN</h2>
							<input
								type="email"
								value={this.state.email}
								placeholder="Email"
								name="email"
								onChange={this.handleChange}
								required
							/>
							<input
								type="password"
								value={this.state.password}
								name="password"
								placeholder="Password"
								onChange={this.handleChange}
								required
							/>
							<button className="submit">LOGIN</button>
							<p className="register-text">
								No account?{' '}
								<span onClick={this.toggleForm} className="register-link">
									Sign-up
								</span>
							</p>
							<button onClick={this.props.googleLogin} className="google">
								<i className="fab fa-google" />GOOGLE
							</button>
							<button onClick={this.props.twitterLogin} className="twitter">
								<i className="fab fa-twitter" />TWITTER
							</button>
						</form>
						<form
							onSubmit={this.handleRegister}
							className="register-form hidden">
							<h2 className="form-title">REGISTER</h2>
							<input
								type="email"
								value={this.state.email}
								name="email"
								placeholder="Email"
								onChange={this.handleChange}
								required
							/>
							<input
								type="password"
								name="password"
								value={this.state.password}
								placeholder="Password"
								onChange={this.handleChange}
								required
							/>
							<input
								type="password"
								name="confirmPassword"
								value={this.state.confirmPassword}
								placeholder="Confirm Password"
								onChange={this.handleChange}
								required
							/>
							<button className="submit">REGISTER</button>
							<p className="register-text">
								Already have an account?{' '}
								<span onClick={this.toggleForm} className="register-link">
									Login
								</span>
							</p>
						</form>
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(state, onwProps) {
	console.log('loading state stuff', state);
	return {
		user: state.user,
		preferences: state.preferences,
		loadingUser: state.loading.user
	};
}

export default connect(mapStateToProps, {
	googleLogin,
	twitterLogin,
	loginEmail,
	registerEmail,
	getPreferences
})(Login);
