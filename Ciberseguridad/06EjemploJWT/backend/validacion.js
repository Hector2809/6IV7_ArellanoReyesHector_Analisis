document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nombre = document.getElementById('nombre').value.trim();
    const apellidoPaterno = document.getElementById('apellidoPaterno').value.trim();
    const apellidoMaterno = document.getElementById('apellidoMaterno').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errores = [];
  
    if(nombre === '') errores.push("El nombre es obligatorio.");
    if(apellidoPaterno === '') errores.push("El apellido paterno es obligatorio.");
    if(apellidoMaterno === '') errores.push("El apellido materno es obligatorio.");
    if(password.length < 6) errores.push("La contraseña debe tener al menos 6 caracteres.");
    if(password !== confirmPassword) errores.push("Las contraseñas no coinciden.");
    if(password === '') errores,push("La contraseña es obligatoria");

    const errorDiv = document.getElementById('errores');
    if(errores.length > 0) {
      errorDiv.innerHTML = errores.join('<br>');
    } else {
      errorDiv.innerHTML = '';
      alert("Formulario éxitoso.");
    }
  });
  