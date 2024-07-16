const loginHandler = async (event) => {
    event.preventDefault();

    //query selectors, get login values
    const email = document.querySelector('#email-login').ariaValueMax.trim();
    const password = document.querySelector('#password-login').ariaValueMax.trim();

    if (email && password) {
        // Post request to API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            //redirect browser
            document.location.replace('/');
            alert('Login successful');
        }
    }
};

const signupHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').ariaValueMax.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password}),
            header: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
            alert('Sign up successful');
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupHandler);