import React, { useState } from 'react';
import './App.css';

const FormValidation = () => {
    const [formData, setFormData] = useState({
		username: '',
		email: '',
		phoneNo: '',
		password: '',
		confirmPass: ''
    })

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData({
			...formData, [name] : value
		})
	}

	const [errors, setErrors] = useState({})

	const handleSubmit = (e) => {

		e.preventDefault()

		const validationErrors = {}

		if(!formData.username.trim())	{
			validationErrors.username = "Username is a required field."
		}

		if(!formData.email.trim())	{
			validationErrors.email = "Email is a required field."
		}
		else if(!/^[^\s@]+@[^\s@]{3,}\.[^\s@]{2,3}$/.test(formData.email)){
			validationErrors.email = "Invalid email entered."
		}

		if(!formData.phoneNo.trim())	{
			validationErrors.phoneNo = "Phone Number is a required field."
		}
		else if(!/^\d{10}$/.test(formData.phoneNo))	{
			validationErrors.phoneNo = "Phone number should be 10 digits.";
		}

		if(!formData.password.trim())	{
			validationErrors.password = "Password is a required field."
		}
		else if(!/^(?=.*[A-Z])(?=.*\d)(?=.*[&$#@]).{7,}$/.test(formData.password))	{
			validationErrors.password = "Password must be at least 7 characters long and contain at least one capital letter, one digit, and one special character from the set (&,$,#,@)."
		}

		if(!formData.confirmPass.trim())	{
			validationErrors.confirmPass = "Confirm Password is a required field."
		}
		else if(formData.password !== formData.confirmPass)	{
			validationErrors.confirmPass = "Password does not match."
		}

		setErrors(validationErrors)

		if(Object.keys(validationErrors).length === 0)	{
			alert("Form Submitted Successfully")
		}

	}
	return(
		<form onSubmit={handleSubmit}>
			<div>
				<label>Username: </label>
				<input type='text' name='username' placeholder='Username' autoComplete='off' onChange={handleChange}></input>
			</div>

			{errors.username && <span>{errors.username}</span>}

			<div>
				<label>Email: </label>
				<input type='email' name='email' placeholder='example@gmail.com' autoComplete='off' onChange={handleChange}></input>
			</div>

			{errors.email && <span>{errors.email}</span>}

			<div>
				<label>Phone Number: </label>
				<input type='text' name='phoneNo' placeholder='Phone Number' autoComplete='off' onChange={handleChange}></input>
			</div>

			{errors.phoneNo && <span>{errors.phoneNo}</span>}

			<div>
				<label>Password: </label>
				<input type='password' name='password' placeholder='********' onChange={handleChange}></input>
			</div>

			{errors.password && <span>{errors.password}</span>}

			<div>
				<label>Username: </label>
				<input type='password' name='confirmPass' placeholder='********' onChange={handleChange}></input>
			</div>

			{errors.confirmPass && <span>{errors.confirmPass}</span>}

			<button type='submit'>Submit</button>
		</form>
	)
}

export default FormValidation;
