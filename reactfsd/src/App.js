// src/App.js
import React, { useState } from 'react';
import './App.css';
import Button from './Button';


function App() {
	const [value, setValue] = useState('');

	const handleClick = (val) => {
		if (val === '=') {
			try
			{
				setValue(eval(value).toString());
			}
			catch
			{
				setValue('Error');
			}
			}
			else
			{
				setValue(value + val);
			}
	};
	return (
		<div className="container">
			<div className='calculator'>
				<form action=''>
					<div className='display'>
						<input type='text' value={value} readOnly></input>
					</div>
					<div>
						<Button value="Clear" onClick={() => setValue('')}/>
						<Button value="⌫" onClick={() => setValue(value.slice(0, -1))}/>
						<Button value="." onClick={() => handleClick('.')}/>
						<Button value="/" onClick={() => handleClick('/')}/>
					</div>
					<div>
						<Button value="7" onClick={() => handleClick('7')}/>
						<Button value="8" onClick={() => handleClick('8')}/>
						<Button value="9" onClick={() => handleClick('9')}/>
						<Button value="*" onClick={() => handleClick('*')}/>
					</div>
					<div>
						<Button value="4" onClick={() => handleClick('4')}/>
						<Button value="5" onClick={() => handleClick('5')}/>
						<Button value="6" onClick={() => handleClick('6')}/>
						<Button value="+" onClick={() => handleClick('+')}/>
					</div>
					<div>
						<Button value="1" onClick={() => handleClick('1')}/>
						<Button value="2" onClick={() => handleClick('2')}/>
						<Button value="3" onClick={() => handleClick('3')}/>
						<Button value="-" onClick={() => handleClick('-')}/>
					</div>
					<div>
						<Button value="00" onClick={() => handleClick('00')}/>
						<Button value="0" onClick={() => handleClick('0')}/>
						<Button value="=" className='equal' onClick={() => handleClick('=')}/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default App;
