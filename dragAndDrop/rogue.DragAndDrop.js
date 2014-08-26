/**********************************************************************************
 *
 *  ROGUE DRAG AND DROP COMPONENT
 *
 *********************************************************************************/
(function ($) {
    "use strict";
    $.dragdrop = function (element, options) {
        var defaults = {
                id: null,
                name: null,
                //Configuración General
                itemsToShow: 5,
                width: '200px',
                itemHeight: '15px',

                dataValues: null,
                fields: {
                    'value': 'id',
                    'text': 'name'
                },
                selected: null,
                disabled: false,
                required: true,
                activeItemIndex: null,
                activeItemValue: null,
                currentItem: {
                    id: null,
                    inside: false,
                    target: null
                },
                //TEXTOS
                errorMessage: 'Debes seleccionar un elemento.',
                avaiableText: "Disponibles",
                asiggnedText: "Asignados",
                title: null,
                //CALLBACKS
                onDragStartItem: function(){},
                onDragEndItem: function(){},
                onClickItem: function(){}
            },
            self = this,

        //PRIVATE PROPERTIES
            leftDragContainer = null,
            rightDragContainer = null,

        //PRIVATE METHODS
            /** FIREFOX FIXES =========== */
            addDragStart = function(event){
                event.dataTransfer.setData('Text', this.id);
            },

            addDragEnd = function(event){
                //No hacemos nada por ahora
            },
            /** ======================== */

            //Deprecado, próximo a eliminar
            /*
            fixForFirefox = function () {
                var dragItems = document.querySelectorAll('[draggable=true]'),
                    i;
                for (i = 0; i < dragItems.length; i + 1) {
                    dragItems[i].addEventListener('dragstart', function (event) {
                        event.dataTransfer.setData('Text', this.id);
                    }, false);

                    dragItems[i].addEventListener('dragend', function (event) {
                    });
                }
            },*/

            resizeItems = function () {
                var thisItem = $(".dItem"),
                    thisItemTitle = $('.lDragTitle'),
                    itemPadding, itemHeight, titleHeight, itemsContainer;

                itemPadding = (thisItem.size() > 0) ? parseInt(thisItem.css('padding-top').replace('px', ''),10) : 1;
                itemHeight = (parseInt(self.settings.itemHeight.replace('px', ''),10) + (itemPadding * 2));
                titleHeight = (parseInt(self.settings.itemHeight.replace('px', ''),10) + parseInt(thisItemTitle.css('padding-top').replace('px', ''),10) + parseInt(thisItemTitle.css('padding-bottom').replace('px', ''),10));
                itemsContainer = ((self.settings.itemsToShow * itemHeight) + titleHeight);

                leftDragContainer.add(rightDragContainer).css({'height': itemsContainer + 'px', 'width': self.settings.width});
                $(self.settings.id).find('.dragContent').css('height', (self.settings.itemsToShow * itemHeight));
            },

            buildDragAndDrop = function () {
                var dHeader = (self.settings.title !== null) ? '<div class="dHeader dUnselect">' + self.settings.title + ' : </div>' : '',
                    //dError = '<div class="dErrorMessage dUnselect">*' + self.settings.errorMessage + '</div>',
                    htmlComponent = '',
                    draggableItem,
                    dragItems,
                    i;

                element.addClass('dWrapper');
                element.attr('data-type', 'dragdrop');
                htmlComponent += '<div class="dContent">';
                htmlComponent += '    <div class="dHeader dUnselect">';
                htmlComponent += (self.settings.title !== null) ? self.settings.title : '';
                htmlComponent += '    </div>';
                htmlComponent += '    <div class="dErrorMessage dUnselect">' + self.settings.errorMessage + '</div>';
                /** Drag Area Izquierda */
                htmlComponent += '    <div data-name="lDrag" class="lDrag">' +
                                 '        <div class="dDisabled"></div>' +
                                 '        <div class="lDragTitle">' + self.settings.avaiableText + '</div>' +
                                 '        <div class="dragContent">';
                if (self.settings.dataValues !== null) {
                    self.settings.dataValues.forEach(function (item, i) {
                        htmlComponent += '    <div id="dItem_' + item[self.settings.fields.value] + '" data-index="' + i + '" draggable="true" data-value="' + item[self.settings.fields.value] + '" class="dItem">' +
                                    '        <span>' + item[self.settings.fields.text] + '</span>'+
                                    '    </div>';
                    });
                }
                htmlComponent += '    </div>'+
                            '</div>';

                /** Drag Area Derecha */
                htmlComponent += '    <div data-name="rDrag" class="rDrag">' +
                            '        <div class="dDisabled"></div>' +
                            '        <div class="rDragTitle">' + self.settings.asiggnedText + '</div>' +
                            '        <div class="dragContent">';
                if (self.settings.selected !== null) {
                    self.settings.selected.forEach(function (item, i) {
                        htmlComponent += '   <div id="dItem_' + item[self.settings.fields.value] + '" data-index="' + i + '" data-value="' + item[self.settings.fields.value] + '" draggable="true" class="dItem">' +
                                    '       <span>' + item[self.settings.fields.text] + '</span>' +
                                    '   </div>';
                    });
                }
                htmlComponent += '       </div>' +
                            '   </div>' +
                            '</div>';
                element.append(htmlComponent);

                if (self.settings.disabled) {
                    self.disabled();
                }

                /** Listeners de Items y Containers */
                draggableItem = $(self.settings.id).find(".dItem");
                //Containers
                leftDragContainer = $(self.settings.id).find(".lDrag");
                rightDragContainer = $(self.settings.id).find(".rDrag");

                //Click Event
                draggableItem.on('click', function () {
                    //Se quitan todos lo activos antes de establecer el nuevo elemento activo
                    $(self.settings.id).find(".active").removeClass("active");
                    //$(self.settings.id + ' .dContent .active').removeClass('active');
                    $(this).addClass('active');

                    self.settings.activeItemIndex = $(this).attr('data-index');
                    self.settings.activeItemValue = $(this).attr('data-value');
                    self.settings.onClickItem.call(this);
                });

                //DragStart Event
                draggableItem.on('dragstart', function () {
                    self.settings.currentItem.id = $(this).attr('data-value');
                    self.settings.onDragStartItem.call(this);
                });

                //DragEnd event
                draggableItem.on('dragend', function () {
                    if (self.settings.currentItem.inside) {
                        $(self.settings.id + ' .' + self.settings.currentItem.target + ' .dragContent').append($(self.settings.id + ' #dItem_' + self.settings.currentItem.id));
                    }
                    self.settings.currentItem.id = null;
                    self.settings.onDragEndItem.call(this);
                });

                leftDragContainer.add(rightDragContainer).on('dragover', function (e) {
                    if (e.preventDefault()) {
                        e.preventDefault();
                    }
                    self.settings.currentItem.inside = true;
                    self.settings.currentItem.target = $(this).attr('data-name');

                    return false;
                });

                leftDragContainer.add(rightDragContainer).on('drop', function (e) {
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                    return false;
                });

                leftDragContainer.add(rightDragContainer).on('dragleave', function () {
                    self.settings.currentItem.inside = false;
                    self.settings.currentItem.target = null;
                });

                if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                    //fixForFirefox();
                    dragItems = document.querySelectorAll('[draggable=true]');

                    for (i = 0; i < dragItems.length; i += 1) {
                        dragItems[i].addEventListener('dragstart', addDragStart, false);
                        dragItems[i].addEventListener('dragend', addDragEnd);
                    }
                }

                /** Ajusta el tamaño de los items conforme a configuración*/
                resizeItems();

            };

        self.settings = {};


        //CONSTRUCTOR
        self.init = function () {
            self.settings = $.extend({}, defaults, options);
            self.settings.id = (element.attr('id') !== undefined) ? '#' + element.attr('id') : '.' + element.attr('class');
            self.settings.name = (element.attr('id') !== undefined) ? element.attr('id') : element.attr('class');

            if (self.settings.dataValues !== null) {
                buildDragAndDrop();
            }

        };

        //PUBLIC METHODS
        self.updateItem = function (item) {
            var index, dContent, dragItems, i,
                itemToUpdate = $('#dItem_' + item[self.settings.fields.value]);
            if (itemToUpdate.size() > 0) {
                self.settings.dataValues[self.settings.activeItemIndex] = item;
                $(self.settings.id + ' #dItem_' + item[self.settings.fields.value]).find('span').html(item[self.settings.fields.text]);
            } else {
                index = (self.settings.dataValues.push(item) - 1);
                dContent = '<div id="dItem_' + item[self.settings.fields.value] + '" data-index="' + index + '" draggable="true" data-value="' + item[self.settings.fields.value] + '" class="dItem">' +
                                '<span>' + item[self.settings.fields.text] + '</span>' +
                           '</div>';

                $(self.settings.id + ' .dContent .lDrag .dragContent').append(dContent);

                //Quitar Activo
                itemToUpdate.on('click', function () {
                    $(self.settings.id).find(".active").removeClass('active');
                    $(this).addClass('active');

                    self.settings.activeItemIndex = $(this).attr('data-index');
                    self.settings.activeItemValue = $(this).attr('data-value');
                });

                itemToUpdate.on('dragstart', function () {
                    self.settings.currentItem.id = $(this).attr('data-value');
                });

                itemToUpdate.on('dragend', function () {
                    if (self.settings.currentItem.inside) {
                        $(self.settings.id + ' .' + self.settings.currentItem.target + ' .dragContent').append($(self.settings.id + ' #dItem_' + self.settings.currentItem.id));
                    }
                    self.settings.currentItem.id = null;
                });
            }

            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                //fixForFirefox();
                dragItems = document.querySelectorAll('[draggable=true]');

                for (i = 0; i < dragItems.length; i += 1) {
                    dragItems[i].addEventListener('dragstart', addDragStart, false);
                    dragItems[i].addEventListener('dragend', addDragEnd);
                }
            }

        };

        self.getId = function(){
            return self.settings.id;
        };

        self.deleteItem = function (id) {
            if (id !== undefined) {
                $(self.settings.id + ' #dItem_' + id).remove();
            } else {
                $(self.settings.id + ' #dItem_' + self.settings.activeItemValue).remove();
                self.settings.activeItemIndex = null;
                self.settings.activeItemValue = null;
            }
        };

        self.getActiveItemValue = function () {
            return self.settings.activeItemValue;
        };

        self.getActiveItemIndex = function () {
            return self.settings.activeItemIndex;
        };

        self.getActiveItemData = function () {
            return self.settings.dataValues[self.settings.activeItemIndex];
        };

        self.setRequired = function (b) {
            self.settings.required = b;
        };

        self.validate = function () {
            var response = true;

            $(self.settings.id + ' .dErrorDrag').removeClass('dErrorDrag');
            $(self.settings.id + ' .dErrorMessage').slideUp();

            if (!self.settings.disabled && self.settings.required) {
                if (self.getSelectedItems() === 0) {
                    self.throwError();
                    response = false;
                }
            }
            return response;
        };

        self.throwError = function () {
            $(self.settings.id + ' .rDrag').addClass('dErrorDrag');
            $(self.settings.id + ' .dErrorMessage').slideDown();
        };

        self.getSelectedItems = function () {
            var response = [];
            $(self.settings.id).find('.rDrag').find('.dItem').each(function () {
                response.push($(this).attr('data-value'));
            });
            return response;
        };

        self.getAvailableItems = function(){
            var response = [];
            $(self.settings.id).find('.lDrag').find('.dItem').each(function(){
                response.push($(this).attr('data-value'));
            });
            return response;
        };

        self.getSelectedData = function () {
            var response = [];
            $(self.settings.id).find('.rDrag').find('.dItem').each(function () {
                response.push(self.settings.dataValues[$(this).attr('data-index')]);
            });
            return response;
        };

        self.getAvailableData = function() {
          var response = [];
          $(self.settings.id).find(".lDrag").find(".dItem").each(function(){
              response.push(self.settings.dataValues[$(this).attr('data-index')]);
          });
          return response;
        };

        self.selectItems = function (data) {
            var index;
            for (index in data) {
                if (data.hasOwnProperty(index)) {
                    $(self.settings.id + ' .rDrag .dragContent').append($(self.settings.id + ' #dItem_' + data[index][self.settings.fields.value]));
                }
            }
        };

        self.resetSelectedItems = function () {
            $(self.settings.id + ' .rDrag').removeClass('dErrorDrag');
            $(self.settings.id + ' .dErrorMessage').hide();

            $(self.settings.id + ' .rDrag .dItem').each(function () {
                $(self.settings.id).find('.lDrag').find('.dragContent').append($(this));
            });
        };

        self.activate = function () {
            $(self.settings.id + ' .dDisabled').hide();
            self.settings.disabled = false;
        };

        self.disable = function () {
            $(self.settings.id + ' .dDisabled').show();
            self.settings.disabled = true;
        };

        self.init();

        window[self.settings.name] = self;

        return self;
    };

    $.fn.dragdrop = function (options) {
        return new $.dragdrop(this, options);
    };

}(jQuery));