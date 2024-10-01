import React, { useState } from 'react';
import './App.css';
import InputField from './InputField';

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
	return (
        <form onSubmit={handleSubmit}>
            <InputField
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
            />
            <InputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />
            <InputField
                label="Phone Number"
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                error={errors.phoneNo}
            />
            <InputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
            />
            <InputField
                label="Confirm Password"
                type="password"
                name="confirmPass"
                value={formData.confirmPass}
                onChange={handleChange}
                error={errors.confirmPass}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default FormValidation;
