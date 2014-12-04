/*
 * twopane
 * https://github.com/giosh94mhz/twopane
 *
 * Copyright (c) 2014 Giorgio Premi
 * Licensed under the MIT license.
 */

(function($, undefined) {
    "user strict";

    // overridden options
    var optionsOverride = {
        handles: "w"
    };

    function trimMinMax(min, value, max) {
        if (min && value < min) {
            value = min;
        } else if (max && value > max) {
            value = max;
        }
        return value;
    }

    function resizeTo(newSize, axis) {
        if (axis === undefined) {
            axis = 'se';
        }
        var start = new $.Event("mousedown", { pageX: 0, pageY: 0 });
        this._mouseStart(start);
        this.axis = axis;

        var end = new $.Event("mouseup", {
            pageX: newSize.width - this.originalSize.width,
            pageY: newSize.height - this.originalSize.height
        });
        this._mouseDrag(end);
        this._mouseStop(end);
    }

    $.widget('giosh94mhz.twopane', {
        options: {
            left: '> *:nth-child(1)',
            right: '> *:nth-child(2)',
            resizable: {
                helper: "ui-resizable-helper ui-corner-all"
            }
        },

        _create: function () {
            this.element.addClass('giosh94mhz-twopane');

            this.oldContent = $('<div>');

            this.element.contents().appendTo(this.oldContent);

            // init panes
            this.left = this._createPane('left', this.options);
            this.right = this._createPane('right', this.options);

            this.right.resizable($.extend({}, this.options.resizable, optionsOverride));
            this._addResizeTo(this.right);

            // init shim
            this.shim = this._createShim();
            this._on(this.element, {
                resizestart: function() {
                    this.shim
                        .outerWidth( this.element.outerWidth() )
                        .outerHeight( this.element.outerHeight() )
                        .show();
                },
                resizestop: function() {
                    this.shim.hide();
                }
            });
        },

        _init: function() {
            this._ensureResizableSize();
        },

        _createPane: function (leftRight, options) {
            // try to find the element
            var content = null;
            if (options[leftRight] !== null) {
                content = this.oldContent.find(options[leftRight]);
            }

            if (content) {
                $('<div>').addClass('placeholder-' + leftRight).insertBefore(content);
            } else {
                content = $('<div>');
            }

            var pane = $('<div>').appendTo(this.element).addClass('giosh94mhz-' + leftRight[0] + '-pane');
            pane.append(content).appendTo(this.element);

            delete options[leftRight];

            return pane;
        },

        _createShim: function() {
            return $( "<div>" )
                .css({
                    "position": "absolute",
                    'z-index': 90
                })
                .addClass('ui-helper-hidden')
                .insertBefore( this.element )
                .outerWidth( this.element.outerWidth() )
                .outerHeight( this.element.outerHeight() )
                .offset( this.element.position() );
        },

        _addResizeTo: function(resizable) {
            // jQuery < 1.11 use data, otherwise instance
            var instance = null;
            try {
                instance = resizable.resizable("instance");
            } catch(e) {
                instance = resizable.data("ui-resizable");
            }
            instance.resizeTo = resizeTo;
        },

        _destroy: function () {
            this.right.resizable("destroy");
            this.oldContent.find('.placeholder-left').replaceWith(this.left.contents());
            this.oldContent.find('.placeholder-right').replaceWith(this.right.contents());
            this.element.contents().remove();
            this.element.append(this.oldContent.contents());
        },

        _setOption: function (key, value) {
            this._super(key, value);

            switch (key) {
            case 'iframeFix':
                this.options.iframeFix = value;
                break;
            case 'resizable':
                value = $.extend(this.options.resizable, value, {
                    handles: "w"
                });
                this.right.resizable("option", value);
                this.options.resizable = value;

                this._ensureResizableSize();
                break;
            }
        },

        _ensureResizableSize: function () {
            var size = {
                width: this.right.outerWidth(),
                height: this.right.outerHeight()
            };
            var resizable = this.options.resizable;
            var newSize = {
                width: trimMinMax(resizable.minWidth, size.width, resizable.maxWidth),
                height: trimMinMax(resizable.minHeight, size.height, resizable.maxHeight)
            };
            if (size.width !== newSize.width || size.height !== newSize.height) {
                this.right.resizable("resizeTo", newSize, "w");
            }
        }
    });

}(jQuery));
