// src/App.js
import React, { useState } from 'react';
import './App.css';


function App() {
	return (
    	<div className="container">
			<div className='calculator'>
				<form action=''>
					<div>
						<input type='text'></input>
					</div>
					<div>
						<input type='button' value="Clear"></input>
						<input type='button' value="⌫"></input>
						<input type='button' value="." onClick={displayName}></input>
						<input type='button' value="/" onClick={displayName}></input>
 					</div>
					<div>
						<input type='button' value="7" onClick={displayName}></input>
						<input type='button' value="8" onClick={displayName}></input>
						<input type='button' value="9" onClick={displayName}></input>
						<input type='button' value="*" onClick={displayName}></input>
 					</div>
					<div>
						<input type='button' value="4" onClick={displayName}></input>
						<input type='button' value="5" onClick={displayName}></input>
						<input type='button' value="6" onClick={displayName}></input>
						<input type='button' value="+" onClick={displayName}></input>
 					</div>
					<div>
						<input type='button' value="1" onClick={displayName}></input>
						<input type='button' value="2" onClick={displayName}></input>
						<input type='button' value="3" onClick={displayName}></input>
						<input type='button' value="-" onClick={displayName}></input>
 					</div>
					<div>
						<input type='button' value="00" onClick={displayName}></input>
						<input type='button' value="0" onClick={displayName}></input>
						<input type='button' value="="></input>
 					</div>
				</form>
			</div>
    	</div>
  	);
}

export default App;
