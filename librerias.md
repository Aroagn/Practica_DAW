
VENTAJAS Y DESVENTAJAS DE IMPORTAR LIBRERÍAS DESCARGÁNDOLAS EN LOCAL:

1. No necesitar conexión a internet y poder trabajar desde cualquier lugar en cualquier momento.

2. Velocidad: Aunque cuentes con buena conexión, siempre es mucho más rápido guardar y ejecutar en local que tener que estar subiendo los cambios para poder ver el resultado.

3. Versión de desarrollo de una web: Cuando preparamos una web nueva, no hay inconveniente en hacerlo directamente en el servidor, ya que puede estar en mantenimiento o con acceso restringido. Pero una vez la web está online, un duplicado en local nos permite hacer pruebas y cambios sin afectar a la web en producción.



VENTAJAS Y DESVENTAJAS DE IMPORTAR LIBRERÍAS UTILIZANDO UN CDN:

1. Actualización: Te puedes asegurar de que siempre tienes la última versión de cierta librería (por ejemplo jQuery)

2. Rapidez: Mientras tu servidor dialoga con el cliente atendiendo una a una las peticiones HTTP, con un CDN son dos servidores, por lo que la transferencia es más veloz

3. Posibilidad de descargar a un servidor de proceso de entrega de contenido estático (por ejemplo, podemos tener Apache sirviendo contenido dinámico y a Nginx limitándose a ofrecer contenido estático)

4. Si usamos un CDN externo puede haber un coste extra 

5. Los CDN suelen tener un uptime mayor que el nuestro, sin embargo, no deja de ser un riesgo que el CDN caiga