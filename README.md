# Practica-Api
Aplicación de backend con nodejs que implementa un API RESTful

1 ) Crea una app.js y un modelo con mongoose (y su configuración de conexión a mongodb,
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