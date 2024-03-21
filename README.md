[![Project-Banner.png](https://i.postimg.cc/NjQHK15Z/Project-Banner.png)](https://postimg.cc/w7bvPR5k)

| índice    |
| --------- |
| [Tutorial de Uso](#tutorial-de-uso)    |
| [Descripción del Poyecto](#descripción-del-proyecto)  |
| [Características](#características)    |
| [Funcionalidad](#funcionalidad)    |
[Diseño Responsive](#diseño-responsive)    |
| [Tecnologías Utilizadas](#tecnologías-utilizadas)    |
| [Desarrolladores Contribuyentes](#desarrolladores-contribuyentes)     |

<div align="center">
    <h3>LIVE PREVIEW:</h3>
    <h3>https://spiffy-fenglisu-10c3b8.netlify.app</h3>
</div>


### Tutorial de Uso:
Para aprovechar al máximo todas las funcionalidades de "Drink Reservation", se recomienda seguir los pasos del siguiente tutorial: 
| Pasos a seguir | Indicaciones  |
| ---------| --------- |
| Login como "Proveedor" | 1. En la sección "Servicios", seleccionar los productos del Select, indicar su precio, y luego pulsar "Agregar Cóctel"  2. En la sección "Áreas", añadir las áreas de cobertura, por ejemplo "Mendoza"  3. En la Sección "Stock" indicar el stock de cada producto, para que luego pueda ser visualizado como "disponible"  4. Cuando el proveedor tenga "pedidos", se visualizarán en la sección "Pedidos".   |
| Login como "Cliente" | 1. Una vez logueado el cliente, debe indicar en el mapa su ubicación actual  2. En la sección "Proveedores" se visualizarán los proveedores que ofrecen cobertura (realizan envíos) en la ubicación del cliente, y deberá seleccionar uno  3. Aparecerán los datos del proveedor seleccionado, y los productos en una cartilla informativa, para que pueda añadir al carrito de compras  4. Sección "Carrito de Compras" aquí se mostrarán los productos añadidos al carrito, y podrá realizar el pedido 5. En la sección "Pedidos" podrá visualizar los pedidos de forma detallada.   |
### Descripción del Proyecto:
El presente proyecto, se ha desarrollado con fines educativos y de práctica, para implementar todos los conocimientos y tecnologías aprendidos durante la mentoría en desarrollo de aplicaciones web.
Con este proyecto concluye la mentoría, dando como aprendidos y aplicados los requerimientos mínimos necesarios para el desarrollo de este tipo de aplicaciones.

### Características:

La presente web app tiene 2 interfaces de visualización, ya que cuenta con 2 tipos de usuarios: 
- PROVEEDORES
- CLIENTES

La características principal, es que **Manso Bar delivery** impulsa la *conexión* entre los Proveedores de bebidas alcohólicas, y aquellos Clientes que deseen realizar pedidos de los mismos.
Mediante esta app, se pueda agilizar el *esfuerzo de venta* por parte de los proveedores, y los clientes pueden visualizar de forma eficiente aquellos proveedores cercanos, su información, y su oferta de coctelería y cervecería.
<div align="center">
  <a href="https://postimg.cc/svNnXyCJ">
    <img src="https://i.postimg.cc/8z1xZPyx/Dise-o-sin-t-tulo-6-removebg-preview.png" alt="Descripción de la imagen" width="300">
  </a>
</div>

De acuerdo al tipo de usuario, se van a desplegar ciertas funcionalidades establecidas para los mismos, diseñadas según los requerimientos que estos necesiten para la funcionalidad del "ecosistema" que provee la aplicación.

### Funcionalidad:
#### Interfaz de Usuarios No Registrados
Se dispone una pantalla para el registro de los nuevos usuarios, donde se debe seleccionar el tipo de usuario, y se deberá completar el formulario con los datos correspondientes.
[![usertype1.png](https://i.postimg.cc/63Hwt48s/usertype1.png)](https://postimg.cc/gX61KJy4)
#### Interfaz de Proveedores
Un usuario y/o empresa, luego de registrarse, se va a encontrar con las siguientes secciones:
##### Inicio
Da la bienvenida a los usuarios, y se recuerda las funcionalidades disponibles para proveedores.
##### Servicios
En esta sección se puede seleccionar los productos que luego serán mostrados a los clientes. Al tratarse de una web app con fines educativos, se muestran 2 tipos de componentes autocomplete, uno con un listado de cócteles provistos por la siguiente API: https://www.thecocktaildb.com/ y el otro con un listado de cervezas provistas por la siguiente API: https://punkapi.com/. El proveedor podrá seleccionar los productos que desee ofrecer a los clientes, además añadiendo el precio de venta de los mismos, para que luego sean mostrados en la interfaz de Cliente.
[![provider-menu.png](https://i.postimg.cc/L51yNhZK/provider-menu.png)](https://postimg.cc/5Qfqt43n)
##### Áreas
Mediante la implementación de la librería de Google Map React, se permite la geolocalización de aquellas áreas donde el proveedor va a ofrecer sus servicios, para que luego, los clientes al seleccionar su ubicación, puedan obtener un listado con los proveedores cercanos disponibles.
##### Stock
Luego de almacenarse en el estado del proveedor los productos que va a vender, en esta sección se debe configurar el stock de los mismos. Si no se configura el número de unidades de alguno de ellos, no se permite su visualización a los clientes. Lo mismo sucede con los productos con stock:"0".
##### Pedidos
Aquí se muestran en cards individuales, las órdenes realizadas por los clientes.  Cada una contiene: 
- Imagen y Nombre del cliente
- Fecha y Hora de la operación
- Tabla con los cócteles y/o cervezas, y las cantidades solicitadas
- Total de Compra.
[![provider-orders.png](https://i.postimg.cc/ydDNkC2r/provider-orders.png)](https://postimg.cc/S2p4v3SW)
#### Interfaz de Clientes
Un usuario y/o empresa, luego de registrarse, se va a encontrar con las siguientes secciones:
##### Inicio
Da la bienvenida a los usuarios, y se muestra un mapa de Google Map React para que el cliente seleccione su ubicación al momento de ingresar a la web app. 
##### Proveedores
De acuerdo a la localización del cliente, esta sección va a desplegar un listado de Proveedores cercanos, y a los cuales éste puede ingresar a ver su perfíl, ver sus productos, e ir añadiendo aquellos que desee comprar.
Al seleccionar un proveedor, se muestra una nueva pantalla con la información del proveedor y sus productos; al hacer click sobre uno de ellos, éste se añadirá automáticamente al carrito de compras:
[![client-provider-menu1.png](https://i.postimg.cc/pTQP9VqC/client-provider-menu1.png)](https://postimg.cc/zbfs6NmH)
##### Shopping Cart
En esta sección, se muestra los productos añadidos al mismo. Se puede seleccionar la cantidad de los mismos, y se muestra el total de la compra.
Además, hay 2 botones, uno para realizar la compra, y otro para vaciar el carrito de compras.
[![shopping-cart2.png](https://i.postimg.cc/sg2PwvWB/shopping-cart2.png)](https://postimg.cc/fJ60bWBZ)
Luego de realizada la compra, se muestra un componente Dialog, confirmando la compra:
##### Pedidos
Aquí se muestran en cards individuales, las compras realizadas a los proveedores. Cada una contiene:
- Imagen y Nombre del proveedor
- Fecha y Hora de la operación
- Tabla con los cócteles y/o cervezas, y las cantidades solicitadas
- Total de Compra.
[![client-purchases.png](https://i.postimg.cc/Qtzvx2rm/client-purchases.png)](https://postimg.cc/N91ddPF2)
### Diseño Responsive
Se han diseñado y configurado todas las pantallas, para que puedan adaptarse a pantallas de dispositivos móviles, mejorando el User Experience (UX) y User Interface (UI).
[![Responsive-Screens.png](https://i.postimg.cc/LXy9hdh9/Responsive-Screens.png)](https://postimg.cc/njDbwPvg)
### Tecnologías Utilizadas
Las tecnologías utilizadas para el desarrollo de esta web app fueron:
##### Lenguaje de Programación Base
- JavaScript 
- Framework de JavaScript: React
##### Tipado de Datos
- TypeScript
##### Enrutamiento de Componentes
- React-Router
##### Gestión de Formularios
- Formik
##### Estilos
- Material UI
##### Solicitudes HTTP a Apis
- Axios
##### Manejo y Control del Estado
- Redux Toolkit
##### Mapas
- Google Map React
##### Gestion de Versiones
- Git
### Desarrolladores Contribuyentes
##### Desarrollado por:
Emmanuel Ortiz, Junior Front-End Developer.
https://www.linkedin.com/in/emmanuel-ortiz-745427273/
##### Code-Review a cargo de:
Fernando A. Gonzalez, Software Lead Engineer.
https://www.linkedin.com/in/fernando-a-gonzalez/
