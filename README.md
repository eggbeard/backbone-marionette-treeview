backbone-marionette-treeview
============================

Nice tree view built on top of Backbone &amp; Backbone Marionette. Optimized for lazy rendering - only visible nodes are rendered.

## Requirements
   - jQuery
   - Underscore
   - Backbone
   - Marionette

## Installation
1. Clone the project or download it
2. Add the js and css from the bin folder
3. Don't forget to add the dependencies (see Requirements section)

## Usage
1. Instantiate a collection of Tree models

```javascript
var trees = new Trees([
   new Tree({ label: "test1", id: "1"}),
   new Tree({ label: "test2", id: "2"}),
   new Tree({ label: "test3", id: "3"})
]);
```

2. Create your TreeView

```javascript
var treeView = new TreeView({ collection: trees });
```

3. Render where you want!

```javascript
$("...").html(treeView.render().el)
```

## Recursive
If you want a recursive structure, add a Trees collection as a "children" field on your Tree model:

```javascript
var trees = new Trees([
  new Tree({ label: "test1", id: "1"}),
  new Tree({ label: "test2", id: "2"}),
  new Tree({ label: "test3", id: "3"})
]);
```

```javascript
var rootNode = new Tree({ label: "rootNode", id: "10", children: trees });
```

## Checkbox
By default, you have a checkbox for each node. To indicate that the node is checked or unchecked, use the `isChecked` attribute:

```javascript
var node = new Tree({ label: "node", id: "1", isChecked: true }); // Default: isChecked = false
```

## Checkbox Events

When a checkbox becomes checked or unchecked, a "checked" event is triggered on your `TreeView` collection.

```javascript
trees.on("checked", method, context)
```

If you want to capture all checkbox changes, you should bind to your collection's "change:isChecked" event.

## Build & Run
First, make sure you have grunt and all the dependencies installed:

```javascript
sudo npm install -g grunt-cli
sudo npm install -g
grunt
```

To run the tests, simply open `/test/index.html` in your browser, or use the `grunt test` command.

## More
Read the source code and tests for more details.
