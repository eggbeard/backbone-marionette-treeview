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
    if (this.get("isChecked") === true && !this.hasChildren()) return [this];

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
  _inc: function(model, total) { return 1; },

  _isChecked: function(model, total) {
    return model.get("isChecked");
  }

});

// Define model for treeViews
models.TreeViews.model = models.TreeViews;
