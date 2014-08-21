/**
 *
 * David Benavides
 * dabedablin@gmail.com
 *
 * @title : rogue.js
 * @version : 1.0
 *
 * How to use by Porfirio on 19/08/14.
 */

/**********************************************************************************
 *
 *  ROGUE COMBO BOX COMPONENT
 *
 *********************************************************************************/
(function ($) {
    "use strict";
    $.comboBox = function (element, options) {
        //PROPERTIES
        var self = this,
            defaults = {
                id: null,
                name: null,
                //Configuracion General
                dataValues: null,
                selected: null,
                dataFields: {
                    value: 'value',
                    text: 'text'
                },
                //AJAX
                dataAjax: {
                    url: null,
                    index: null
                },
                //Textos
                initialText: "-- seleccione una opción --",
                loadingText: "-- cargando opciones -- ",
                displayInitialText: true,
                displayLoadingText: true,
                translateValues: null,
                //CallBacks
                onBeforeAjaxCall : function(){},
                onAfterAjaxCall : function(){}
            },

        //PRIVATE METHODS
            buildComboBox = function () {
                var options = "",
                    selectedValue = null;

                element.attr('data-type', 'comboBox');
                if (self.settings.selected === null && self.settings.displayInitialText) {
                    options += '<option value="">' + self.settings.initialText + '</option>';
                }

                selectedValue = (self.settings.selected !== null) ? self.settings.selected : 0;

                self.settings.dataValues.forEach(function (item) {
                    if (self.settings.displayInitialText || item[self.settings.dataFields.value] !== 0) {
                        var text = "";
                        //Se obtienen los datos por si se desean traducir
                        if (self.settings.translateValues !== null) {
                            text = window[self.settings.translateValues][item[self.settings.dataFields.text]];
                        } else {
                            text = item[self.settings.dataFields.text];
                        }
                        if (selectedValue === item[self.settings.dataFields.value]) {
                            options += '<option value="' + item[self.settings.dataFields.value] + '" selected>' + text + '</option>';
                        } else {
                            options += '<option value="' + item[self.settings.dataFields.value] + '">' + text + '</option>';
                        }
                    }
                });
                element.html(options);
            };

        self.settings = {};

        //CONSTRUCTOR
        self.init = function () {
            self.settings = $.extend({}, defaults, options);
            self.settings.id = (element.attr('id') !== undefined) ? '#' + element.attr('id') : '.' + element.attr('class');
            self.settings.name = (element.attr('id') !== undefined) ? element.attr('id') : element.attr('class');

            if (self.settings.dataValues !== null) {
                buildComboBox();
            } else if (self.settings.dataAjax.url !== null) {
                $.ajax({
                    url: self.settings.dataAjax.url,
                    type: 'post',
                    dataType: 'json',
                    beforeSend: function () {
                        self.settings.onBeforeAjaxCall.call(this);
                        element.prop("disabled", true);
                        if(self.settings.displayLoadingText){
                            element.html('<option val="">' + self.settings.loadingText + '</option>');
                        }
                    },
                    success: function (returnedData) {
                        self.settings.dataValues = (self.settings.dataAjax.index !== undefined) ? returnedData[self.settings.dataAjax.index] : returnedData;
                        if (returnedData.error === null || returnedData.error === undefined) {
                            buildComboBox();
                        }
                    },
                    complete: function(){
                        self.settings.onAfterAjaxCall.call(this);
                        element.prop("disabled", false);
                    },
                    error: function (jqXHR, textStatus) {
                        console.error('.:Rogue comboBox ' + self.settings.id + ' error : ' + textStatus);
                    }
                });
            }

        };

        //PUBLIC METHODS
        self.getValue = function () {
            return element.val();
        };

        self.getSelectedText = function () {
            return $(self.settings.id + ' option:selected').html();
        };

        self.selectItem = function (id) {
            element.val(id);
        };

        self.refresh = function () {
            if (self.settings.dataAjax.url !== null) {
                $.ajax({
                    url: self.settings.dataAjax.url,
                    type: 'post',
                    dataType: 'json',
                    beforeSend: function () {
                        self.settings.onBeforeAjaxCall.call(this);
                        element.prop("disabled", true);
                        if(self.settings.displayLoadingText){
                            element.html('<option val="">' + self.settings.loadingText + '</option>');
                        }
                    },
                    success: function (returnedData) {
                        self.settings.dataValues = (self.settings.dataAjax.index !== undefined) ? returnedData[self.settings.dataAjax.index] : returnedData;
                        if (returnedData.error === null || returnedData.error === undefined){
                            //self.settings.content = returnedData;
                            buildComboBox();
                        }
                    },
                    complete: function(){
                        self.settings.onAfterAjaxCall.call(this);
                        element.prop("disabled", false);
                    },
                    error: function (jqXHR, textStatus) {
                        console.error('.:Rogue comboBox ' + self.settings.id + ' error : ' + textStatus);
                    }
                });
            }
        };

        self.rebuild = function (data) {
            if (data !== null) {
                self.settings.dataValues = data;
                buildComboBox();
            }
        };

        self.init();
        window[self.settings.name] = self;

        return self;
    };

    $.fn.comboBox = function (options) {
        return new $.comboBox(this, options);
    };

}(jQuery));