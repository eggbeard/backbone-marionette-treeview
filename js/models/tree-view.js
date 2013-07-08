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
