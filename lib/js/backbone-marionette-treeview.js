

/***  js/models/tree-view  ***/

/*

Copyright (C) 2013 Acquisio Inc. V0.1.1

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

models.TreeViews = Backbone.Collection.extend({
  getChildrenChecked: function() {
    var modelsChecked = this.map(function(model) {
      return model.getChildrenChecked();
    }, this);
    return _.flatten(modelsChecked);
  },

  getNbChildrenChecked: function() {
    return this.getChildrenChecked().length;
  }

});

models.TreeView = Backbone.Model.extend({
  defaults: {
    id: 0,
    label: "Default",
    isChecked: false
  },

  initialize: function() {
    if (!this.get("children")) this.set("children", new models.TreeViews());
  },

  // Helpers
  getNbTotalChildren: function() {
    return this._getNbChildrenFor($.proxy(this._inc, this));
  },

  getChildrenChecked: function() {
    if (this.get("isChecked") !== 0 && !this.hasChildren()) return [this];

    var modelsChecked = this.get("children").map(function(child) {
      if (child.hasChildren())
        return child.getChildrenChecked();
      else if (child.get("isChecked"))
        return child;
      else
        return [];
    }, this);

    return _.flatten(modelsChecked);
  },

  getNbChildrenChecked: function() {
    return this._getNbChildrenFor($.proxy(this._isChecked, this));
  },

  allChildrenChecked: function() {
    return this.getNbChildrenChecked() === this.getNbTotalChildren();
  },

  hasChildren: function() {
    return this.get("children").size() > 0;
  },

  toggleCheck: function(isChecked) {
    this.set("isChecked", isChecked);
    this.get("children").each(function(child) { child.toggleCheck(isChecked); });
  },

  // Internals methods
  _getNbChildrenFor: function(callback) {
    if (!this.hasChildren()) return callback(this, 0);
    return this.get("children").reduce(function(total, child) {
      if (child.hasChildren())
        return total + child._getNbChildrenFor(callback);
      else
        return total + callback(child, total);
    }, 0, this);
  },

  // Callbacks
  _inc: function() { return 1; },

  _isChecked: function(model) {
    return model.get("isChecked");
  }

});

// Define model for treeViews
models.TreeViews.model = models.TreeViews;



/***  js/views/node-view  ***/

/*

Copyright (C) 2013 Acquisio Inc. V0.1.1

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

var templateNode = '\
  <a>\
    <%=(hasChildren ? "<span class=\"tree-view-chevron\">&#9658</span>" : "")%>\
    <input id="<%=autoId%>"type="checkbox" <%=(isChecked ? "checked" : "")%> class="tree-view-checkbox" data-id="<%=id%>"/>\
    <label for="<%=autoId%>" class="tree-view-label"><%=label%></label>\
  </a>\
  <ul class="tree-view-list">\
  </ul>\
  ';

NodeView = Marionette.CompositeView.extend({
  tagName: "li",
  className: "tree-view-node",
  template: templateNode,
  chevronRight: "&#9658;",
  chevronDown: "&#9660;",

  ui: {
    chevron: ".tree-view-chevron",
    label: ".tree-view-label",
    checkbox: ".tree-view-checkbox",
    list: ".tree-view-list"
  },

  initialize: function() {
    this.collection = this.model.get("children");

    if (this.model.hasChildren())
      this.$el.addClass("tree-view-branch");
    else
      this.$el.addClass("tree-view-leaf") ;

    // Bubble change
    this.collection.on("checked", this.triggerChange, this);
    this.collection.on("checked", this.toggleMyself, this);
  },

  triggerChange: function() {
    this.model.trigger("checked");
  },

  onRender: function() {
    if (this.model.get("isChecked")) this.triggerChange();
  },

  appendHtml: function(collectionView, itemView){
    collectionView.ui.list.append(itemView.el);
  },

  serializeData: function() {
    return {
      autoId: Math.random() * 1000000 + 10000,
      hasChildren: this.model.hasChildren(),
      label: this.model.get("label"),
      isChecked: this.model.get("isChecked"),
      id: this.model.id
    };
  },

  events: {
    "click .tree-view-chevron": "toggleView",
    "click .tree-view-checkbox": "onCheck"
  },

  modelEvents: {
    "change:isChecked": "toggleCheck"
  },

  toggleMyself: function() {
    if (this.model.allChildrenChecked()) {
      this.ui.checkbox.prop("checked", true);
      this.ui.checkbox.prop("indeterminate", false);
    } else if (this.model.getNbChildrenChecked() > 0) {
      this.ui.checkbox.prop("indeterminate", true);
    } else {
      this.ui.checkbox.prop("checked", false);
      this.ui.checkbox.prop("indeterminate", false);
    }
  },

  toggleCheck: function() {
    this.ui.checkbox.prop("checked", this.model.get("isChecked"));
    this.ui.checkbox.prop("indeterminate", false);
    return false;
  },

  toggleView: function() {
    this.$el.toggleClass("open");
    this.switchChevron();
    return false;
  },

  switchChevron: function() {
    if (!this.model.hasChildren()) return;

    if (this.$el.hasClass("open")) {
      this.ui.chevron.html(this.chevronDown);
    } else {
      this.ui.chevron.html(this.chevronRight);
    }
  },

  onCheck: function(event) {
    this.model.toggleCheck(this.ui.checkbox.prop("checked"));
    this.model.collection.trigger("checked");
    event.stopPropagation();
  },

  expand: function() {
    this.$el.addClass("open");
    this.switchChevron();
    this.children.each(function(child) { child.expand(); });
  },

  collapse: function() {
    this.$el.removeClass("open");
    this.switchChevron();
    this.children.each(function(child) { child.collapse(); });
  }
});


/***  js/views/tree-view  ***/

/*

Copyright (C) 2013 Acquisio Inc. V0.1.1

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

TreeView = Marionette.CollectionView.extend({
  itemView: views.NodeView,
  tagName: "ul",
  className: "tree-view-root",

  expand: function() { this.children.each(function(child) { child.expand(); }); },
  collapse: function() { this.children.each(function(child) { child.collapse(); }); },
  toggleView: function() { this.children.each(function(child) { child.toggleView(); }); }
});


/***  js/views/main  ***/


;


/***  js/main  ***/


;