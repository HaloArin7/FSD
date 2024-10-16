// import React, { useState } from 'react';
// import './App.css';
// import InputField from './InputField';

// const FormValidation = () => {
// 	const [formData, setFormData] = useState({
// 		username: '',
// 		email: '',
// 		phoneNo: '',
// 		password: '',
// 		confirmPass: ''
// 	})

// 	const handleChange = (e) => {
// 		const {name, value} = e.target;
// 		setFormData({
// 			...formData, [name] : value
// 		})
// 	}

// 	const [errors, setErrors] = useState({})

// 	const handleSubmit = async (e) => {

// 		e.preventDefault()

// 		const validationErrors = {}

// 		if(!formData.username.trim())	{
// 			validationErrors.username = "Username is a required field."
// 		}

// 		if(!formData.email.trim())	{
// 			validationErrors.email = "Email is a required field."
// 		}
// 		else if(!/^[^\s@]+@[^\s@]{3,}\.[^\s@]{2,3}$/.test(formData.email)){
// 			validationErrors.email = "Invalid email entered."
// 		}

// 		if(!formData.phoneNo.trim())	{
// 			validationErrors.phoneNo = "Phone Number is a required field."
// 		}
// 		else if(!/^\d{10}$/.test(formData.phoneNo))	{
// 			validationErrors.phoneNo = "Phone number should be 10 digits.";
// 		}

// 		if(!formData.password.trim())	{
// 			validationErrors.password = "Password is a required field."
// 		}
// 		else if(!/^(?=.*[A-Z])(?=.*\d)(?=.*[&$#@]).{7,}$/.test(formData.password))	{
// 			validationErrors.password = "Password must be at least 7 characters long and contain at least one capital letter, one digit, and one special character from the set (&,$,#,@)."
// 		}

// 		if(!formData.confirmPass.trim())	{
// 			validationErrors.confirmPass = "Confirm Password is a required field."
// 		}
// 		else if(formData.password !== formData.confirmPass)	{
// 			validationErrors.confirmPass = "Password does not match."
// 		}

// 		setErrors(validationErrors)

// 		if (Object.keys(validationErrors).length === 0) {
// 			try {
// 				const response = await fetch('http://localhost:5050/record', {
// 					method: 'POST',
// 					headers: {
// 						'Content-Type': 'application/json'
// 					},
// 					body: JSON.stringify(formData)
// 				});

// 				if (response.ok) {
// 					alert("Form Submitted Successfully");
// 					// Optionally, reset the form
// 					setFormData({
// 						username: '',
// 						email: '',
// 						phoneNo: '',
// 						password: '',
// 						confirmPass: ''
// 					});
// 				}
// 				else
// 				{
// 					alert("Failed to submit form");
// 				}
// 			}
// 			catch (error)
// 			{
// 				alert("An error occurred: " + error.message);
// 			}
// 		}
// 	};

// 	return (
//         <form onSubmit={handleSubmit}>
//             <InputField
//                 label="Username"
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 error={errors.username}
//             />
//             <InputField
//                 label="Email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={errors.email}
//             />
//             <InputField
//                 label="Phone Number"
//                 type="text"
//                 name="phoneNo"
//                 value={formData.phoneNo}
//                 onChange={handleChange}
//                 error={errors.phoneNo}
//             />
//             <InputField
//                 label="Password"
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 error={errors.password}
//             />
//             <InputField
//                 label="Confirm Password"
//                 type="password"
//                 name="confirmPass"
//                 value={formData.confirmPass}
//                 onChange={handleChange}
//                 error={errors.confirmPass}
//             />
//             <button type="submit">Submit</button>
//         </form>
//     );
// }
// export default FormValidation;
import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './InputField';

const FormValidation = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNo: '',
        password: '',
        confirmPass: ''
    });
    const [users, setUsers] = useState([]);
    const [editingEmail, setEditingEmail] = useState(''); // State to track email for editing and deleting
    const [editingUserId, setEditingUserId] = useState(null); // State to track the user being edited
    const [viewing, setViewing] = useState(false); // State to track whether to show users

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch(`http://localhost:5050/record${editingUserId ? `/${editingUserId}` : ''}`, {
                    method: editingUserId ? 'PATCH' : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert(editingUserId ? "User Updated Successfully" : "Form Submitted Successfully");
                    resetForm(); // Reset form after submission
                    fetchUsers(); // Fetch updated user list
                } else {
                    alert("Failed to submit form");
                }
            } catch (error) {
                alert("An error occurred: " + error.message);
            }
        }
    };

    const resetForm = () => {
		setFormData({
			username: '',
			email: '',
			phoneNo: '',
			password: '',
			confirmPass: ''
		});
		setEditingUserId(null); // Reset editing state
		setEditingEmail(''); // Clear the email for editing/deleting
		setViewing(false); // Hide user list when resetting
	};

    const validateForm = (data) => {
        const errors = {};
        if (!data.username.trim()) errors.username = "Username is a required field.";
        if (!data.email.trim()) {
            errors.email = "Email is a required field.";
        } else if (!/^[^\s@]+@[^\s@]{3,}\.[^\s@]{2,3}$/.test(data.email)) {
            errors.email = "Invalid email entered.";
        }
        if (!data.phoneNo.trim()) {
            errors.phoneNo = "Phone Number is a required field.";
        } else if (!/^\d{10}$/.test(data.phoneNo)) {
            errors.phoneNo = "Phone number should be 10 digits.";
        }
        if (!data.password.trim()) {
            errors.password = "Password is a required field.";
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[&$#@]).{7,}$/.test(data.password)) {
            errors.password = "Password must be at least 7 characters long and contain at least one capital letter, one digit, and one special character from the set (&,$,#,@).";
        }
        if (!data.confirmPass.trim()) {
            errors.confirmPass = "Confirm Password is a required field.";
        } else if (data.password !== data.confirmPass) {
            errors.confirmPass = "Password does not match.";
        }
        return errors;
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5050/record');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (error) {
            alert("Error fetching users: " + error.message);
        }
    };

    const handleEdit = async () => {
        if (!editingEmail) {
            alert("Please enter an email to edit a user.");
            return;
        }
        const userToEdit = users.find(user => user.email === editingEmail);
        if (userToEdit) {
            setEditingUserId(userToEdit._id);
            setFormData({
                username: userToEdit.username,
                email: userToEdit.email,
                phoneNo: userToEdit.phoneNo,
                password: userToEdit.password, // Set to empty to prevent showing the password
                confirmPass: userToEdit.confirmPass // Set to empty to prevent showing the password
            });
        } else {
            alert("User not found.");
        }
    };

    const handleDelete = async () => {
        if (!editingEmail) {
            alert("Please enter an email to delete a user.");
            return;
        }
        const userToDelete = users.find(user => user.email === editingEmail);
        if (userToDelete) {
            if (window.confirm("Are you sure you want to delete this user?")) {
                try {
                    const response = await fetch(`http://localhost:5050/record/${userToDelete._id}`, {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        alert("User Deleted Successfully");
                        fetchUsers(); // Refresh user list
                    } else {
                        alert("Failed to delete user");
                    }
                } catch (error) {
                    alert("An error occurred: " + error.message);
                }
            }
        } else {
            alert("User not found.");
        }
    };

    const handleView = () => {
		setViewing(true);
		fetchUsers(); // Fetch users when viewing
	};

    useEffect(() => {
        fetchUsers(); // Fetch users on component mount
    }, []);

    return (
        <>
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
                <button type="submit">{editingUserId ? "Update" : "Submit"}</button>
            </form>

            <h2>Email Operations</h2>
            <InputField
                label="Email"
                type="email"
                value={editingEmail}
                onChange={(e) => setEditingEmail(e.target.value)}
                error={null} // No error for this specific field
            />
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleView}>View Users</button>
            <button onClick={resetForm}>Cancel</button> {/* New button to reset form and cancel editing/deleting */}

            {viewing && (
                <>
                    <h2>User List</h2>
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                                {user.username} - {user.email}
                                {/* Password is not displayed */}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}

export default FormValidation;
