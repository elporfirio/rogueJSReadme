# Rogue JS Framework #

-- más información próximamente --

### Requerimientos ###

- jQuery 1.11.x o superior

## Notification Component ##

Genera una ventana de notificación "Tipo Alerta", se puede configurar para generar una notificación de confirmación "Tipo Confirm", donde cada acción puede activar un evento CallBack

### Notification Uso Básico ###

```javascript
$.notification({
            title : 'Titulo de la Alerta',
            message : 'Mensaje con Información de la Alerta',
        });
```

### Notification Propiedades ###

| Propiedad      | Descripción y Parámetros           |
| ------------- |-------------|
| title   | `String` - Mensaje que se muestra como titulo del cuadro de notificación |
| message | `String` - Mensaje con descripción de la notificación      |
| type    | `alert`  - Tipo del cuadro de notificación con el botón cerrar |
|         | `confirm` - Incluye los botones de Aceptar y Cancelar|
| confirmText | `String` - Texto boton Aceptar |
| cancelText | `String` - Texto boton Cancelar |
| closeText | `String` - Texto boton Cerrar |

### Notification Callbacks ###

| Tipo        | Ejecución           |
| ------------- |-------------|
| onCancel   | Después de presionar el botón Cancelar |
| onClose    | Después de presionar el botón Cerrar     |
| onConfirm  | Después de presionar el botón Aceptar     |

#### Notification Ejemplo ####

```javascript
$.notification({
            title : '¿Desea confirmar?',
            message : 'Este es un mensaje que solicita una confirmación',
            type : 'confirm',
            onCancel : function(){console.error("Has cancelado la misión");},
            onConfirm : function(){console.log("Awww yeah");}
        });
```

## ComboBox Component ##

Genera los `<option>` de un elemento `<select>` a partir de un objeto JSON.

### ComboBox Uso Básico ###

```javascript
$("#ElementUnique").comboBox({
            dataValues: jsonData.index,
            dataFields: {value : "valueIndex", text : "textIndex"}
        });
```

Donde `dataValues` debe tener un arreglo tipo JSON con la siguiente estructura:

```javascript
 var jsonData = {
        "index": [
            {"textIndex" : "Banana", "valueIndex" : 10},
            {"textIndex" : "Remolacha", "valueIndex" : 15},
            {"textIndex" : "Guayaba", "valueIndex" : 12},
        ]
    };
```

### ComboBox Propiedades ###

| Propiedad     | Descripción y Parámetros        |
| ------------- |-------------|
| dataValues   | `JSON Object` - Objeto con los datos que se van a mostrar en el elemento |
| selected | `String` - Establece el valor seleccionado      |
| dataFields | `Array` - Permite especificar los nombres de los indices para el atributo `value=""` y para el texto que se mostrará entre las etiquetas `<option>` |
| dataAjax | `Array` - Permite especificar la URL de consulta donde se obtiene un JSON como el de dataValues, además de poder especificar el index por si el JSON contiene más de un tipo |
| initialText | `String` - Texto que se muestra cuando el `<select>` no tien eun valor establecido por defecto |
| loadingText | `String` - Texto que se muesta cuando se está esperando respuesta del tipo AJAX en `dataAjax`|
| displayInitialText | `Boolean`- Establece si se muestra el `InitialText` en el `<select>`|
| displayLoadingText | `Boolean`- Establece si se muestra el `loadingText` mientras se espera una respuesta AJAX |
| translateValues | `String` - Nombre del indice de un objeto JSON, permite traducir el texto que se muestra en el `<option>`|

Para la propiedad de translateValues se necesita formar como el siguiente objeto:

```javascript
//suponiendo:  translateValues : "datosTraducción",

var datosTraduccion = {
        "TextoOriginal" : 'Nuevo Texto',
        "Remolacha" : 'Betabel'
        //Sucesivamente hasta incluir todas las traducciones necesarias
    }
```

### ComboBox Métodos ###

| Método     | Descripción y Parámetros        |
| ------------- |-------------|
| getValue | `return` - Valor del `<option>` seleccionado |
| getSelectedText | `return`- Texto del `<option>` seleccionado |
| selectItem | `param: string` - Valor para seleccionar el `<option>` correspondiente |
| refresh | Actualiza los valores del `<select>`. **_requiere las propiedades de `dataAjax`_** |
| rebuild | Genera los valores del `<select>` a partir de `dataValues`|

_Ejemplo para ajecutar los métodos_

```javascript
var oComboBox = $("#ajaxIndexSelected").comboBox({
        dataFields: {value : "valor", text : "nombre"},
        dataAjax: {
            url : "dataGenerator.php?custom=true",
            index : "sinteticas"
        }
    });

    oComboBox.refresh();
```

### ComboBox Callbacks ###

| Tipo        | Ejecución           |
| ------------- |-------------|
| onBeforeAjaxCall   | Antes de una petición de información AJAX |
| onAfterAjaxCall    | Después de completar la petición AJAX (incluso si hay un error en la petición) |

### ComboBox Ejemplo ###

```html
<select id="customSelect"></select>
```

```javascript
var oMyCombo = $("#customSelect").comboBox({
    dataFields: {value : "valor", text : "nombre"},
    dataAjax: {
        url : "dataGenerator.php?custom=true",
        index : "sinteticas"
    },
    selected : 62,
    displayInitialText: true,
    translateValues: "datosTraduccion"
});
```