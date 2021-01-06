import React, { useEffect } from 'react';
import Amplify from 'aws-amplify';
import FirstTimeLogin from '../FirstTimeLogin/FirstTimeLogin'
import Login

function App() {

useEffect(() => {
	Amplify.configure({
		Auth: {
			region: process.env.REACT_APP_REGION,
			userPoolId: process.env.REACT_APP_USER_POOL_ID,
			userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
		},
	});
});


  return (
    <div className="App">
      <FirstTimeLogin />
	  
    </div>
  );
}

export default App;
