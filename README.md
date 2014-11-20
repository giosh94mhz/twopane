# TwoPane Plugin

jQuery UI plugin to handle a resizable two-pane view (commander-like :)

## Getting Started
Download the required sources:
* production version: [JS][min-js], [CSS][min-css];
* development version: [JS][max-js], [CSS][max-css].

In your web page:

```html
<link href="jqueryui.min.css" rel="stylesheet">
<link href="dist/twopane.jqueryui.min.css" rel="stylesheet">
<script src="jquery.js"></script>
<script src="jquery-ui.js"></script>
<script src="dist/twopane.min.js"></script>
<script>
jQuery(function($) {
  $('.selector').twopane();
});
</script>
```

Then add a nice jQuery/CSS effect on resize for a better look! (see [the demo](#demo))

## Documentation

The plugin initialize a twopane view (commander-like) inside the selected element. The elements used for the left
and right pane can be explicitly selected, otherwise the first two children (if any) will be used. Note that all
the children not selected for the pane will be hidden by the widget (and restored on destruction).


### Options reference

| option    | type | default | description |
| --------- | ---- | ------- | ----------- |
| left      | `selector` | `'> *:nth-child(1)'` | selector for the left pane element |
| right     | `selector` | `'> *:nth-child(2)'` | selector for the right pane element |
| resizable | `object` | `{ helper: "ui-resizable-helper ui-corner-all" }` | [Whetever is accepted by a jQueryUI resizable][jqueryui-resizable] (but `handles`) |
| iframeFix | `selector` or `boolean` | `false` | allow resize with cursor over iframes |

[resizable-api]: 

### Event reference

| event | description |
| ----- | ----------- |
| create | [Standard jQuery Widget event][jqueryui-widget-event] |

## Demo
This is a [simple demo][demo], which show the look that can be achieved.

## Release History
0.1.0 First release

[min-js]: https://raw.github.com/giosh94mhz/twopane/master/dist/twopane.jqueryui.min.js
[max-js]: https://raw.github.com/giosh94mhz/twopane/master/dist/twopane.jqueryui.js
[min-css]: https://raw.github.com/giosh94mhz/twopane/master/dist/twopane.jqueryui.min.css
[max-css]: https://raw.github.com/giosh94mhz/twopane/master/dist/twopane.jqueryui.css
[demo]: http://htmlpreview.github.io/?https://github.com/giosh94mhz/twopane/blob/master/demo/demo.html
[jqueryui-widget-event]: http://api.jqueryui.com/jquery.widget/#event-create
[jqueryui-resizable]: http://api.jqueryui.com/resizable/
