backbone-marionette-treeview
============================

Nice tree view built on top of Backbone &amp; Backbone Marionette. Optimizated for lazy rendering (render only visible node).

## Requirements
   - JQuery
   - Underscore
   - Backbone
   - Marionette

## Installation
1. Clone the project or download it
2. Add the js and css from the bin folder
3. Don't forget to add the dependencies (see Requirements section)

## Usage
1. Setup your collection of Tree models (alias Trees)

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
If you want a recursive structure, just add a new Trees collection as "children" field to your Tree model:

<pre>var trees = new Trees([
  new Tree({ label: "test1", id: "1"}), 
  new Tree({ label: "test2", id: "2"}), 
  new Tree({ label: "test3", id: "3"})
]);</pre>
  
<pre>var rootNode = new Tree({ label: "rootNode", id: "10", children: trees });</pre>
  
## Checkbox
By default, you have a checkbox in each node, so you can decide if they will be check or uncheck at start:

<pre>var node = new Tree({ label: "node", id: "1", isChecked: true }); // Default: isChecked = false</pre>

## Checkbox Events
When a checkbox change of state, a "checked" event is trigger on the top collection of your structure. It's the same collection that you pass through your TreeView to render.

<pre>trees.on("checked", method, context)</pre>

If you want to catch any checkbox changes, you have to bind your collection on "change:isChecked".

## Build & Run
In order to run properly the test, you need to have setup a server web. You can use it inside the project folder.
<pre>python -m SimpleHTTPServer</pre>

You have access from localhost:8000 now and you can run build and test:
<pre>
sudo npm install -g grunt-cli
sudo npm install -g
grunt</pre>

## More
You can check the source code or tests if you want have more details.

