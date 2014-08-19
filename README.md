# Rogue JS Framework #

-- más información próximamente --

### Requerimientos ###

- jQuery 1.11.x o superior

## Notification Component ##

Genera una ventana de notificación "Tipo Alerta", se puede configurar para generar una notificación de confirmación "Tipo Confirm", donde cada acción puede activar un evento CallBack

### Uso Básico ###

```javascript
$.notification({
            title : 'Titulo de la Alerta',
            message : 'Mensaje con Información de la Alerta',
        });
```

### Opciones ###

| Opción        | Descripción y Parámetros           |
| ------------- |-------------|
| title   | `String` - Mensaje que se muestra como titulo del cuadro de notificación |
| message | `String` - Mensaje con descripción de la notificación      |
| type    | `alert`  - Tipo del cuadro de notificación con el botón cerrar |
|         | `confirm` - Incluye los botones de Aceptar y Cancelar|
| confirmText | `String` - Texto boton Aceptar |
| cancelText | `String` - Texto boton Cancelar |
| closeText | `String` - Texto boton Cerrar |

### Callbacks ###

| Tipo        | Ejecución           |
| ------------- |-------------|
| onCancel   | Después de presionar el botón Cancelar |
| onClose    | Después de presionar el botón Cerrar     |
| onConfirm  | Después de presionar el botón Aceptar     |

#### Ejemplo ####

```javascript
$.notification({
            title : '¿Desea confirmar?',
            message : 'Este es un mensaje que solicita una confirmación',
            type : 'confirm',
            onCancel : function(){console.error("Has cancelado la misión");},
            onConfirm : function(){console.log("Awww yeah");}
        });
```