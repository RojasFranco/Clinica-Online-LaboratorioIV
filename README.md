# Clinica Online

En esta aplicacion se evalua todos los mecanismos y conocimientos adquiridos en la cursada de la materia, utilizando codigo abierto y la documentacion WEB como bibliografia.

[Link aplicacion](https://clinica-online-rojas-franco.herokuapp.com).

## Descripcion

La clínica OnLine, especialista en salud, cuenta
actualmente con consultorios (6 en la actualidad),
dos laboratorios (físicos en la clínica), y una sala
de espera general. Está abierta al público de lunes
a viernes en el horario de 8:00 a 19:00, y los
sábados en el horario de 8:00 a 14:00

Trabajan en ella profesionales de diversas
especialidades, que ocupan los consultorios acorde a su disponibilidad, y reciben en ellos
pacientes con turno para consulta o tratamiento. Dichos turnos son pedidos por la web
seleccionando el profesional o la especialidad .La duración mínima de un turno es 30 minutos.”
pero los profesionales pueden cambiar la duración según su especialidad. un profesional puede
tener más de una especialidad

## Tipos de usuarios

- Profesional: Puede tener más de una especialidad y el registro lo hace el profesional, necesitando la aprobación de un administrador para empezar a atender en la clinica.
- Paciente: ingresa con dos imágenes de perfil y se verifica la dirección de email.
- Administrador: se carga solamente por otro administrador,
además de poder agregar una nueva especialidad en el alta de profesional.

## Login y Registro

Para ingresar a la web debe ingresar su correo y contraseña

![opc](https://github.com/RojasFranco/Clinica-Online-LaboratorioIV/blob/master/imagenes%20Readme/login.png)

Para registrarse debe completar sus datos, al elegir perfil si elije paciente se habilitara la opcion para cargar sus dos imagenes, si elije profesional se habilitaran las especialidades.

![opc](https://github.com/RojasFranco/Clinica-Online-LaboratorioIV/blob/master/imagenes%20Readme/registro.png)

## Administrador

Al ingresar como administrador tendra disponible las siguientes opciones en la cabecera:

- Ver profesionales actuales

![opc](https://github.com/RojasFranco/Clinica-Online-LaboratorioIV/blob/master/imagenes%20Readme/admin-profesionales.png)

- Ver profesionales pendientes, y poder aprobarlo al seleccionar alguno

![opc](https://github.com/RojasFranco/Clinica-Online-LaboratorioIV/blob/master/imagenes%20Readme/admin-habilitar-prof.png)

- Agregar nueva especialidad, ademas podra observar las especialidades actuales

![opc](https://github.com/RojasFranco/Clinica-Online-LaboratorioIV/blob/master/imagenes%20Readme/admin-agregar-especialidad.png)

- Agregar nuevo administrador

![opc](https://github.com/RojasFranco/Clinica-Online-LaboratorioIV/blob/master/imagenes%20Readme/admin-agregarAdmin.png)

## Paciente

Al ingresar como paciente tendra disponible las siguientes opciones en la cabecera:

- Cambiar foto, al clickear cambiara a su foto alternativa

![opc](https://github.com/RojasFranco/Clinica-Online-LaboratorioIV/blob/master/imagenes%20Readme/paciente-cambiar-foto.png)

- Ver sus turnos con su estado actual. Al clickearlo podra ver su detalle. En caso de estar confirmado o pendiente se habilitara opcion de cancelar. En caso de estar ya atendido podra ver reseña del profesional y cargar una encuesta.

![opc](https://github.com/RojasFranco/Clinica-Online-LaboratorioIV/blob/master/imagenes%20Readme/paciente-turnos.png)

- Pedir turno en el cual debe seleccionar especialidad, luego profesional y por ultimo elegir horario; o bien, podra elegir por apellido de profesional y luego horario.

![opc](https://github.com/RojasFranco/Clinica-Online-LaboratorioIV/blob/master/imagenes%20Readme/paciente-pedir-turno.png)