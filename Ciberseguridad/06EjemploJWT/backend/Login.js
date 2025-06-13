document.getElementById('loginform').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Bienvenido');
            localStorage.setItem('token', data.token);
        } else {
            alert(data.err || 'Error desconocido');
        }
    } catch (err) {
        console.log('Error en la petición del login', err);
        alert('Error en la red o el servicio');
    }
});
