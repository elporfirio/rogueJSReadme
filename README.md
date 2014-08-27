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

## Drag and Drop Component ##

Genera un componente que permite elegir optiones de una lista y arrastrarlas a otra a modo de establecer una selección.

### Drag and Drop uso básico ###

```javascript
$('#dragSelect').dragdrop({
      'dataFields': {
          'text': 'alias',
          'value': 'idFruit'
      },
      'dataValues': JSONObject.frutas
  });
```

Donde `dataValues` es un Objeto tipo JSON (para este ejemplo):

```javascript
var JSONObject = {"frutas": [
      {"alias": "Apple", "description": "Apple", "idFruit": 839 },
      {"alias": "Orange", "description": "Orange", "idFruit": 840 },
      {"alias": "Strawberry", "description" : "Strawberry", "idFruit": 841}
  ]};
```

### Drag and Drop Propiedades ###


| Propiedad | Descripción y Parámetros |
| ------------- | ------------- |
| itemsToShow   | `int` - Cantidad de elementos que se muestran en las áreas de arraste (en caso de que los elementos sean mayores se activa la propiedad overflow). Default` 5`|
| width         | `String` - Tamaño del contenedor de elementos. Default: `200px` |
| itemHeight    | `String` - Altura de cada elemento dentro del contenedor. Default: `15px` |
| dataValues    | `JSON Object` - Objeto con los datos que se van a mostrar en el elemento |
| dataFields    | `Array` - Permite especificar los nombres de los indices para los valores y el texto que se muestra en los contenedores. Ejemplo: `{'value': 'id', 'text': 'name'}` |
| selected      | `JSON Object` - Establece el valor o valores seleccionados, **_Debe tener los indices que se establecen en `dataFields`_**|
| disabled      | `Boolean` - Estado del componente |
| required      | `Boolean`- Establece si es necesario que se elija al menos un elemento |
| errorMessage  | `String` - Texto de error |
| avaiableText  | `String` - Texto cabecera de los elementos disponibles |
| asiggnedText  | `String` - Texto cabecera de los elementos asignados |
| titleText     | `String` - Texto tipo Label que se muestra antes de los contenedores |

### Drag and Drop Métodos ###

| Método     | Retorno      | Descripción y Parámetros        |
| ---------- |--------------| --------------------------------|
| `addNewItem(object)` | none         | Agrega un nuevo elemento al contenedor de "disponibles". `{"name": "someText" , "id" : 999}` **Es importante que el Objeto este construido con los indices que se establecen en `dataFields` |
| `getId()`    | String         | Obtiene el id del element al que se aplico el componente (incluye la almoadilla), `"#elementID"` |
| `deleteItem(id:String)` | none | Elimina el elemento del componente, por su número de ID `Ejemplo: deleteItem(299)`, en caso de no ingresar esté parametro, elimina el elemento seleccionado|
| `getActiveItemValue()`  | String | Obtiene la propiedad `data-value` del elemento seleccionado |
| `getActiveItemIndex()`  | String | Obtiene la propiedad `data-index` del elemento seleccionado |
| `getActiveItemData()`   | JSON Object | Obtiene el Objeto JSON del elemento seleccionado (el objeto proviene del de los `dataValues`|
| `setRequired(boolean)`  | none  | Establece si se debe elegir al menos un elemento |
| `validate()`    |   Boolean | Comprueba si al menos se ha elegido un elemento   |
| `throwError(message:String)` | none | Sin parametros muestra el mensaje definido en la propiedad errorMessage, el parámetro `message` permite ingresar un texto personalizado  |
| `getSelectedItems()`    | `array[String]` | Devuelve un arreglo con los valores de la propiedad `data-value` de los elementos que estan en el contenedor "Asignados" |
| `getAvailableItems()`    | `array[String]` | Devuelve un arreglo con los valores de la propiedad `data-value` de los elementos que estan en el contenedor "Disponibles" |
| `getSelectedData()`     | `array[JSON Objects]` | Devuelve un arreglo con toda la información contenida en `dataValues`de los elementos que estan en el contenedor "Asignados" |
| `getAvailableData()`     | `array[JSON Objects]` | Devuelve un arreglo con toda la información contenida en `dataValues`de los elementos que estan en el contenedor "Disponibles" |
| `selectItems(object)`   | none  | Dado un objeto Json contruido con la forma de `dataFields`, cambia los elementos contenidos en ese objeto del contenedor "Disponibles" a "Asignados" |
| `resetSelectedItems()` | none | Restablece todos los elementos seleccionados al contenedor de "Disponibles" |
| `disable(option:Boolean)` | none | Habilita y deshabilita el componente |


### Drag and Drop Callbacks ###


| Tipo        | Ejecución           |
| ------------- |-------------|
| `onDragStartItem`   | Al comenzar el arrastre de un elemento|
| `onDragEndItem`   | Al finalizar el arrastre de un elemento|
| `onClickItem`     | Al elegir un elemento |
