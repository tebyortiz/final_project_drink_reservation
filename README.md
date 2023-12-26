[![Project-Banner.png](https://i.postimg.cc/NjQHK15Z/Project-Banner.png)](https://postimg.cc/w7bvPR5k)

| índice    |
| --------- |
| Descripción del Poyecto  |
| Características y Funcionalidad     |
| Tecnologías Utilizadas    |
| Desarrolladores Contribuyentes     |

### Descripción del Proyecto:
El presente proyecto, se ha desarrollado con fines educativos y de práctica, para implementar todos los conocimientos y tecnologías aprendidos durante la mentoría en desarrollo de aplicaciones web.
Con este proyecto concluye la mentoría, dando como aprendidos y aplicados los requerimientos mínimos necesarios para el desarrollo de este tipo de aplicaciones.

### Características:

La presente web app tiene 2 interfaces de visualización, ya que cuenta con 2 tipos de usuarios: 
- PROVEEDORES
- CLIENTES

La características principal, es que **Manso Bar delivery** impulsa la *conexión* entre los Proveedores de bebidas alcohólicas, y aquellos Clientes que deseen realizar pedidos de los mismos.
Mediante esta app, se pueda agilizar el *esfuerzo de venta* por parte de los proveedores, y los clientes poder visualizar de forma eficiente aquellos proveedores locales, y su oferta de coctelería y cervecería.
[![Dise-o-sin-t-tulo-6-removebg-preview.png](https://i.postimg.cc/8z1xZPyx/Dise-o-sin-t-tulo-6-removebg-preview.png)](https://postimg.cc/svNnXyCJ)

De acuerdo al tipo de usuario, se van a desplegar ciertas funcionalidades establecidas para los mismos, según los requerimientos que estos necesiten para la funcionalidad del "ecosistema" que provee la aplicación.

###Funcionalidad:
####Interfaz de Usuarios No Registrados
Se dispone una pantalla para el registro de los nuevos usuarios, donde se debe seleccionar el tipo de usuario, y se deberá completar el formulario.
[![usertype1.png](https://i.postimg.cc/63Hwt48s/usertype1.png)](https://postimg.cc/gX61KJy4)
[![users-forms.png](https://i.postimg.cc/t4yXdbQM/users-forms.png)](https://postimg.cc/D8jkFtzr)
####Interfaz de Proveedores
Un usuario y/o empresa, luego de registrarse, se va a encontrar con las siguientes secciones:
#####Inicio
Da la bienvenida a los usuarios, y se recuerda las funcionalidades disponibles para proveedores.
#####Servicios
En esta sección se puede seleccionar los productos que luego serán mostrados a los clientes. Al tratarse de una web app con fines educativos, se muestran 2 tipos de componentes autocomplete, uno con un listado de cócteles provistos por la siguiente API: https://www.thecocktaildb.com/ y el otro con un listado de cervezas provistas por la siguiente API: https://punkapi.com/ y seleccionar los productos que desee proveer a los clientes, además añadiendo el precio de venta de los mismos.
[![provider-menu.png](https://i.postimg.cc/L51yNhZK/provider-menu.png)](https://postimg.cc/5Qfqt43n)
#####Áreas
Mediante la implementación de la librería de Google Map React, se permite la geolocalización de aquellas áreas donde el proveedor va a ofrecer sus servicios, para que luego, los clientes al seleccionar su ubicación, puedan obtener un listado con los proveedores cercanos disponibles.
[![provider-areas.png](https://i.postimg.cc/W18PMfvm/provider-areas.png)](https://postimg.cc/tssfbk77)
#####Stock
Luego de almacenarse en el estado del proveedor los productos que va a vender, en esta sección se debe configurar el stock de los mismos. Si no se configura el número de unidades de alguno de ellos, no se permite su visualización a los clientes lo mismo con los productos con stock:"0".
[![provider-stock.png](https://i.postimg.cc/8zRLwMKm/provider-stock.png)](https://postimg.cc/Wd4D1FPd)
#####Pedidos
Aquí se muestran en cards individuales, las órdenes realizadas por los clientes.  Cada una contiene: 
- Imagen y Nombre del cliente
- Fecha y Hora de la operación
- Tabla con los cócteles y/o cervezas, y las cantidades solicitadas
- Total de Compra.
[![provider-orders.png](https://i.postimg.cc/ydDNkC2r/provider-orders.png)](https://postimg.cc/S2p4v3SW)
####Interfaz de Clientes
Un usuario y/o empresa, luego de registrarse, se va a encontrar con las siguientes secciones:
#####Inicio
Da la bienvenida a los usuarios, y se muestra un mapa de Google Map React para que el cliente seleccione su ubicación al momento de ingresar a la web app. 
[![client-location.png](https://i.postimg.cc/FFnjW991/client-location.png)](https://postimg.cc/DmLJm34K)
#####Proveedores
De acuerdo a la localización del cliente, esta sección va a desplegar un listado de Proveedores cercanos, y a los cuales éste puede ingresar a ver su perfíl, ver sus productos, e ir añadiendo aquellos que desee comprar.
[![client-local-providers.png](https://i.postimg.cc/sD4ZFszp/client-local-providers.png)](https://postimg.cc/kBD5KrB4)
Al seleccionar un proveedor, se muestra una nueva pantalla con la información del proveedor y sus productos:
[![client-provider-menu1.png](https://i.postimg.cc/pTQP9VqC/client-provider-menu1.png)](https://postimg.cc/zbfs6NmH)
[![client-provider-menu2.png](https://i.postimg.cc/6pCbx73M/client-provider-menu2.png)](https://postimg.cc/bZN9Qw1n)
#####Shopping Cart
En esta sección, se muestra los productos añadidos al mismo. se puede seleccionar la cantidad de los mismos, y se muestra el total de la compra.
Además, hay 2 botones, uno para realizar la compra, y otro para vaciar el carrito de compras.
[![shopping-cart1.png](https://i.postimg.cc/7hM1QzXz/shopping-cart1.png)](https://postimg.cc/N2FrK53G)
[![shopping-cart2.png](https://i.postimg.cc/sg2PwvWB/shopping-cart2.png)](https://postimg.cc/fJ60bWBZ)
Luego de realizada la compra, se muestra un componente Dialog, confirmando la compra:
[![purchase-completed.png](https://i.postimg.cc/QCxVhWh1/purchase-completed.png)](https://postimg.cc/ygt7TxJ8)
#####Pedidos
Aquí se muestran en cards individuales, las compras realizadas a los proveedores. Cada una contiene:
- Imagen y Nombre del proveedor
- Fecha y Hora de la operación
- Tabla con los cócteles y/o cervezas, y las cantidades solicitadas
- Total de Compra.
[![client-purchases.png](https://i.postimg.cc/Qtzvx2rm/client-purchases.png)](https://postimg.cc/N91ddPF2)
### Tecnologías Utilizadas
Las tecnologías utilizadas para el desarrollo de esta web app fueron:
#####Lenguaje de Programación Base
- JavaScript 
- Framework de JavaScript: React
#####Tipado de Datos
- TypeScript
#####Enrutamiento de Componentes
- React-Router
#####Estilos
- Material UI
#####Solicitudes HTTP a Apis
- Axios
#####Manejo y Control del Estado
- Redux Toolkit
#####Mapas
- Google Map React
#####Gestion de Versiones
- Git
### Desarrolladores Contribuyentes
#####Desarrollado por:
Emmanuel Ortiz, Junior Front-End Developer.
https://www.linkedin.com/in/emmanuel-ortiz-745427273/
#####Code Rewiev a cargo de: 
Fernando A. Gonzalez, Software Lead Engineer.
https://www.linkedin.com/in/fernando-a-gonzalez/
