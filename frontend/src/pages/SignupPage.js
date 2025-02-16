import React, {useContext, useState} from 'react'
import AuthContext from '../context/AuthContext'

function SignupPage()
{
  let {signupUser} = useContext(AuthContext)

  const [errors, setErrors] = useState({
    username: [],
    password: [],
    non_field_errors: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.username.value === '' ||  e.target.password.value === '' ||
      e.target.full_name.value === '' || e.target.password2.value === ''  
    ) {
      return;
    }

    let user = {
      username:e.target.username.value,
      password:e.target.password.value,
      password2:e.target.password2.value,
      full_name:e.target.full_name.value
    }
    
    const response = await signupUser(user);

    if (response.ok) {
      return
    }
    
    console.log(response);
    
    setErrors({
      username: response.username || [],
      password: response.password || [],
      non_field_errors: response.non_field_errors || []
    });


  };

  return (
    <div className='w-100 h-100 d-flex justify-content-around align-items-center' style={{background: "rgb(64,224,208)"}}>
        <form onSubmit={handleSubmit} className='mb-3'>
          <div>
            <input 
              type='text' 
              name='username' 
              className='form-control ml-3 mt-5 mb-3' 
              placeholder='username' 
            />
            {errors.username.map((error, index) => (
              <p key={`username-error-${index}`} className="error">
              {error}
              </p>
            ))}
          </div>
          <div>
            <input 
              type='text' 
              name='full_name' 
              className='form-control ml-3 mb-3' 
              placeholder='full name' 
            />
          </div>
          <div>
            <input 
              type='password' 
              name='password' 
              className='form-control ml-3 mb-3' 
              placeholder='password' 
            />
            <input 
              type='password' 
              name='password2' 
              className='form-control ml-3 mb-3' 
              placeholder='Confirm password' 
            />
            {errors.password.map((error, index) => (
              <p key={`password-error-${index}`} className="error">
                {error}
              </p>
            ))}
          </div>

            {errors.non_field_errors.map((error, index) => (
              <p key={`general-error-${index}`} className="error">
                {error}
              </p>
            ))}
            <button type='submit' className='btn btn-primary mb-3 ml-3'>Sign up</button>
        </form>
    </div>
  );
}


export default SignupPage