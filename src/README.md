# Welcome to my frontend app  

<div>
    <p align="center">
  <img src="./Images/zaharia_logo.png" width="50%">
</p>
<div>
<br></br>
<div>
<a href = "antonioinsa@tutanota.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/antonioinsa/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>
</div>
<br></br>
<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#objetivo-🎯">Objetivo</a></li>
    <li><a href="#sobre-el-proyecto-🔎">Sobre el proyecto</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#animaciones">Animaciones</a></li>
    <li><a href="#vistas">Vistas</a></li>
    <li><a href="#futuras-funcionalidadesmejoras">Futuras funcionalidades\mejoras</a></li>
    <li><a href="#licencia">Licencia</a></li>
  </ol>
</details>

## Objetivo 🎯
Este proyecto requería conexión a una API funcional y usar react para crear una web.

## Sobre el proyecto 🔎
En este proyecto, se ha realizado la maquetación del proyecto anterior (backend Estudio de tatuajes).
Se puede observar, sin estar registrado, a los tatuadores y sus creaciones.
Si desea registrarse, puede crear, actualizar y eliminar citas propias de cada cliente, al igual que consultar todas sus citas con su/s tatuador/es.
Por parte de los trabajadores, pueden actualizar el precio de sus propias citas con sus diferentes clientes y pueden visualizar todas las citas que tienen con los diferentes clientes.
Por parte del SuperAdmin, se puede consultar todas las citas tomadas por los clientes y todos los datos de los clientes en detalle.
    

## Stack
<div align="center">
<a href="https://www.reactjs.com/">
    <img src= "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black"/>
</a>
 </div>

## Instalación en local
1. Clonar el repositorio
2. ` $ npm install `
3. ``` $ npm run dev ```

## Animaciones

<div style="text-align: center;">
  <div style="display: inline-block; margin:3em;">
    <img src="../src/Images/homeTattoArtist.gif" alt="Role superAdmin" width="320" height="240">
    <figcaption>Home</figcaption>
  </div>
  
  <div style="display: inline-block; margin: 3em;">
    <img src="../src/Images/registerLogin.gif" alt="Role superAdmin" width="320" height="240">
    <figcaption>Register and Login clients</figcaption>
  </div>
</div>

<div style="text-align: center;">
  <div style="display: inline-block; margin: 3em;">
    <img src="../src/Images/workers.gif" alt="Role superAdmin" width="320" height="240">
    <figcaption>Login workers and update price appointment</figcaption>
  </div>
  
  <div style="display: inline-block; margin: 3em;">
    <img src="../src/Images/superAdmin.gif" alt="Role superAdmin" width="320" height="240">
    <figcaption>SuperAdmin profile</figcaption>
  </div>
</div>

<script>
  function playGif(id) {
    var gif = document.getElementById(id);
    gif.play();
  }

  function pauseGif(id) {
    var gif = document.getElementById(id);
    gif.pause();
    gif.currentTime = 0;
  }
</script>


## Vistas
<br></br>
<h4>Home
<div>
<p align="center">
<img src="./Images/Home.png" width=50%> 
</div> 

Login
<div>
<p align="center">
<img src="./Images/Login.png" width=50%>
</div>

Profile (client)
<div>
<p align="center">
<img src="./Images/Client_profile.png" width=50%>
</div>

Edit profile (client)
<div>
<p align="center">
<img src="./Images/Client_update.png" width=20%>
<img src="./Images/Client_update_enable.png" width=20%>
</div>

Profile (worker)
<div>
<p align="center">
<img src="./Images/Worker_profile.png" width=50%>
</div>

Profile (superAdmin)
<div>
<p align="center">
<img src="./Images/SuperAdmin_profile.png" width=50%>
</div>

SuperAdmin can view all clients 
<div>
<p align="center">
<img src="./Images/superAdmin_allClients.png" width=50%>
</div>

SuperAdmin can view all appointments 
<div>
<p align="center">
<img src="./Images/superAdmin_allAppointments.png" width=50%>
</div>
</h4>

## Futuras funcionalidades\mejoras
✅ Al hacer clic en cada tatuador, se deben mostrar unicamente sus propios trabajos.

✅ Filtrar por tipo de intervención.

✅ Aplicar mayor seguridad.

✅ Insertar mensajes de error provenientes de la repuesta del backend para mayor detalle.

✅ Eliminación del input de ID a la hora de actualizar las citas, para unicamente seleccionar fecha y hacer click en update appointment.


## Licencia
Proyecto desarrollado por Antonio Insa Benavent, bajo licencia MIT.

Consulta el archivo <a href="./LICENSE">`LICENSE`</a> para más información.