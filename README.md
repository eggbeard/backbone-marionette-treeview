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

  <pre>
    var trees = new Trees([
      new Tree({ label: "test1", id: "1"}),
      new Tree({ label: "test2", id: "2"}),
      new Tree({ label: "test3", id: "3"})
    ]);
  </pre>

2. Create your TreeView

  <pre>var treeView = new TreeView({ collection: trees });</pre>

3. Render where you want!

  <pre>$("...").html(treeView.render().el)</pre>


## Recursive
If you want a recursive structure, add a Trees collection as a "children" field on your Tree model:

<pre>var trees = new Trees([
  new Tree({ label: "test1", id: "1"}),
  new Tree({ label: "test2", id: "2"}),
  new Tree({ label: "test3", id: "3"})
]);</pre>

<pre>var rootNode = new Tree({ label: "rootNode", id: "10", children: trees });</pre>

## Checkbox
By default, you have a checkbox for each node. To indicate that the node is checked or unchecked, use the `isChecked` attribute:

<pre>var node = new Tree({ label: "node", id: "1", isChecked: true }); // Default: isChecked = false</pre>

## Checkbox Events
When a checkbox becomes checked or unchecked, a "checked" event is triggered on your `TreeView` collection.

<pre>trees.on("checked", method, context)</pre>

If you want to capture all checkbox changes, you should bind to your collection's "change:isChecked" event.

## Build & Run
First, make sure you have grunt and all the dependencies installed:
<pre>
sudo npm install -g grunt-cli
sudo npm install -g
grunt
</pre>

To run the tests, simply open `/test/index.html` in your browser, or use the `grunt test` command.

## More
Read the source code and tests for more details.
