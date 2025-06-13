document.getElementById('registerform').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const nombre_2 = document.getElementById('nombre_2').value;
    const app_paterno = document.getElementById('app_paterno').value;
    const app_materno = document.getElementById('app_materno').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_pwd = document.getElementById('confirm_pwd').value;

    try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, nombre_2, app_paterno, app_materno, email, password, confirm_pwd })
        });

        const data = await res.json();
        if (res.ok) {
            alert(data.message || 'Usuario Registrado');
            window.location.href = 'index.html';
        } else {
            alert(data.error || 'Error al registrar');
        }
    } catch (err) {
        console.log('Error en la petición del registro', err);
        alert('Error en la red o el servicio');
    }
});
