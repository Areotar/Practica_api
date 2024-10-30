# Practica-Api
Aplicación de backend con nodejs que implementa un API RESTful

1) Crea una app.js y un modelo con mongoose (y su configuración de conexión a mongodb,
con la uri en .env) para un comercio con, al menos, los siguientes campos:
(2 puntos)
- Nombre del comercio (String)
- CIF (String)
- Dirección (String)
- E-mail (String)
- Teléfono de contacto (String)
- Id de página (Number)

2) Crea rutas y sus respectivos controladores para:
- Obtener la lista de comercios y, opcionalmente (vía parámetro query,) ordenados por
el CIF ascendentemente.
- Obtener un comercio por su CIF
- Guardar un comercio
- Modificar un comercio a partir de su CIF
- Borrar un comercio a partir de su CIF, y permite elegir entre un borrado lógico o
físico (vía parámetro query)
(4 puntos)

3) Crea un cliente (tipo index.http o postman) para realizar las llamadas necesarias (GET de
todos los comercios, GET de uno, POST, PUT y DELETE)
(1 punto)

4) Con tus propias palabras, documenta cada una de las partes anteriores, con comentarios
en el código que expliquen teóricamente cada una de las funciones.
(2 puntos)

5) Súbelo a un repositorio de tu GitHub y comparte el enlace (añade a .gitignore: .env y
node_modules/)
(1 punto)


# Practica Api 2

Sobre el API de la aplicación anterior:
1) Crea validadores para las peticiones GET (de un elemento), PUT, POST y DELETE
 (2 puntos)

2) Crea un nuevo modelo con mongoose para una página web del comercio, tendrá al menos los siguientes campos:
- Ciudad
- Actividad
- Título
- Resumen
- Un array de textos
- Un array de imágenes (fotos)
- Un objeto con reseñas de los usuarios: 
         - Scoring (número de 0 a 5)
         - Número de puntuaciones totales
         - Reseñas (texto) 
(1 punto)

3) Crea rutas y sus respectivos validadores y controladores para:
- Visitar una página web por su id
- Crear una página web (con los datos del modelo)
- Modificar la página web
- Archivar la página web (borrado lógico)
- Eliminar la página web (borrado físico)
(5 puntos)

4) Crear una ruta PATCH para subir una foto al servidor y guardar la url en el array de imágenes de la webpage.
(1 punto)

3) Crea un cliente (tipo index.http o postman) para realizar las llamadas necesarias (GET de
todos las webpages: GET de uno, POST, PUT, DELETE y PATCH para subir una imagen)
(1 punto)

Súbelo a un repositorio de tu GitHub y comparte el enlace


# Practica Api 3

Sobre el API de las prácticas anteriores:

Crea un nuevo modelo con mongoose para usuarios con, al menos, los siguientes campos:
Nombre
E-mail  (debe ser único)
Password (en la base de datos se guardará hasheado)
Edad
Ciudad
Intereses (será un array de intereses)
PermiteRecibirOfertas (boolean)
Role (que será user o admin, user será el de por defecto, este campo no se envía  en el POST al crear el usuario)

Permite registrar usuarios y hacer login (devolviendo un JWT con su id). Con el JWT ahora podrá modificar los datos del usuario creado (excepto el role). Crea un validador tanto para la creación como para la actualización. El usuario también podrá borrarse de la base de datos (solo a él mismo, no a otros usuarios).
La creación, edición y visualización del comercio,solo podrá hacerla un admin (crea un usuario con una petición POST y modifica el rol en la base de datos). Al crear el comercio por el admin, se devolverá un JWT que contendrá en el payload (en los datos del JWT) un  identificador único (por ejemplo, el CIF del comercio o el e-mail). Guarda este token para que las siguientes peticiones que pueda hacer el comercio. Cada comercio tiene su propio JWT.
Un comercio puede crear su propia webpage (relación 1:1), también puede modificarla y borrarla (solo su propia página). También podrá subir imágenes y textos a su webpage (PATCH).  El comercio también podrá ver los emails de los usuarios interesados en su actividad y que tengan permitirRecibirOfertas a true
 Si hubiese cualquier error de servidor, se enviará un mensaje al Slack del webadmin. 
Documenta con Swagger todos los endpoints (rutas).
Opcional: Crea las pruebas con JEST para cada endpoint (en la práctica final, tendrás que hacerlo de manera obligatoria)