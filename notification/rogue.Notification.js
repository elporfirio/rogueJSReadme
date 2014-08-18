/**
 *
 * David Benavides
 * dabedablin@gmail.com
 *
 * @title : rogue.js
 * @version : 1.0
 *
 * How to use by Porfirio on 18/08/14.
 */

/**********************************************************************************
 *
 *  ROGUE NOTIFICATION COMPONENT
 *
 *********************************************************************************/
(function ($) {
    "use strict";
    $.notification = function (options) {
        var defaults = {
            //configuración general
            title: 'Notificación',
            type: 'alert',
            message: null,
            //Textos
            confirmText : "Aceptar",
            cancelText : "Cancelar",
            closeText : "Cerrar",
            //CallBacks
            onCancel: function(){},
            onClose: function(){},
            onConfirm: function(){}
            },

            self = this,

            //PRIVATE METHODS
            /** Cambia el tamaño para centrar el componente en pantalla */
            resizeComponent = function () {
                var windowWidth = $(window).width(),
                    windowHeight = $(window).height();
                $('#' + self.settings.id + ' .notification-wrapper, #' + self.settings.id + ' .notification-bg').css({'width': windowWidth, 'height': windowHeight});
                $('#' + self.settings.id + ' .notification-content').css({'top': ((windowHeight - $('#' + self.settings.id + ' .notification-contentBody').height()) / 2) + 'px', 'left': ((windowWidth - $('#' + self.settings.id + ' .notification-contentBody').width()) / 2) + 'px'});
            },

            /** Cierra el componente */
            closeAction = function () {
                $('#' + self.settings.id + ' .btn-close').unbind('click');
                $('#' + self.settings.id + ', .notification-wrapper').remove();

                self.settings.onClose.call(this);
            },

            confirmAction = function () {
                $('#' + self.settings.id + ' .btn-cancel').unbind('click');
                $('#' + self.settings.id + ' .btn-confirm').unbind('click');
                $('#' + self.settings.id + ', .notification-wrapper').remove();

                self.settings.onConfirm.call(this);
                //self.settings.action();
            },

            cancelAction = function(){
                $('#' + self.settings.id + ' .btn-cancel').unbind('click');
                $('#' + self.settings.id + ' .btn-confirm').unbind('click');
                $('#' + self.settings.id + ', .notification-wrapper').remove();

                self.settings.onCancel().call(this);
            },

            /** Constructor principal */
            buildComponent = function () {
                var html = "";

                //HTML del componente
                html += '<div id="' + self.settings.id + '" class="notification-wrapper">';
                html += '   <div class="notification-bg"></div>';
                html += '   <div class="notification-content">';
                html += '       <div class="notification-header">';
                html += '           <span>' + self.settings.title + '</span>';
                html += '       </div>';
                html += '       <div class="notification-contentBody">';
                switch (self.settings.type) {
                    case 'confirm':
                        html += '<div class="notification-contentMessage"><span>' + self.settings.message + '</span></div>';
                        html += '<div class="notification-action">';
                        html += '   <button class="btn-cancel">' + self.settings.cancelText + '</button>';
                        html += '   <button class="btn-confirm">' + self.settings.confirmText + '</button>';
                        html += '</div>';
                        break;
                    default:
                        html += '<div class="notification-contentMessage"><span>' + self.settings.message + '</span></div>';
                        html += '<div class="notification-action">';
                        html += '   <button class="btn-close">' + self.settings.closeText + '</button>';
                        html += '</div>';
                        break;
                }
                html += '       </div>';
                html += '   </div>';
                html += '</div>';

                $('body').append(html);

                //RESIZE THE POPUP
                resizeComponent();

                $('#' + self.settings.id + ' .btn-cancel').bind('click', function () {
                    cancelAction();
                });

                $('#' + self.settings.id + ' .btn-confirm').bind('click', function () {
                    confirmAction();
                });

                $('#' + self.settings.id + ' .btn-close').bind('click', function () {
                    closeAction();
                });
            };

        self.settings = {};

        //CONSTRUCTOR
        self.init = function () {
            self.settings = $.extend({}, defaults, options);
            self.settings.id = 'notification_' + Math.floor(Math.random() * 10000);

            if (self.settings.message !== null) {
                buildComponent();
            } else {
                return false;
            }
        };

        self.init();
    };

    $.fn.notification = function (options) {
        return new $.notification(options);
    };

}(jQuery));