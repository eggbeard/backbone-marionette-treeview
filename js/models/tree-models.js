/*

Copyright (C) 2013 Acquisio Inc. V0.1.1

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

var Tree = Backbone.Tree = Backbone.Model.extend({
  defaults: {
    id: 0,
    label: "Default",
    isChecked: false
  },

  initialize: function() {
    if (!this.get("children")) this.set("children", new Backbone.Trees());
  },

  toggleCheckFromIds: function(ids) {
    var isChecked = !this.get("isChecked");
    this._setIsCheckedFromIds(ids, isChecked);
  },

  checkFromIds: function(ids) {
    this._setIsCheckedFromIds(ids, true);
  },

  uncheckFromIds: function(ids) {
    this._setIsCheckedFromIds(ids, false);
  },

  getChildrenIds: function() {
    if (!this.hasChildren()) return [this.id];

    var modelsId = this.get("children").map(function(child) {
      if (child.hasChildren())
        return child.getChildrenIds();
      else
        return child.id;
    }, this);

    return _.flatten(modelsId);
  },

  // Helpers
  countLeaves: function() {
    return this._countLeavesFor($.proxy(this._inc, this));
  },

  getLeavesChecked: function() {
    if (this.get("isChecked") && !this.hasChildren()) return [this];

    var modelsChecked = this.get("children").map(function(child) {
      if (child.hasChildren())
        return child.getLeavesChecked();
      else if (child.get("isChecked"))
        return child;
      else
        return [];
    }, this);

    return _.flatten(modelsChecked);
  },

  countLeavesChecked: function() {
    return this._countLeavesFor($.proxy(this._isChecked, this));
  },

  areLeavesAllChecked: function() {
    return this.countLeavesChecked() === this.countLeaves();
  },

  hasChildren: function() {
    return this.get("children").size() > 0;
  },

  toggleCheck: function() {
    var isChecked = !this.get("isChecked");
    this._setIsChecked(isChecked);
  },

  check: function() {
    this._setIsChecked(true);
  },

  uncheck: function() {
    this._setIsChecked(false);
  },

  // Internals methods
  _countLeavesFor: function(callback) {
    if (!this.hasChildren()) return callback(this, 0);
    return this.get("children").reduce(function(total, child) {
      if (child.hasChildren())
        return total + child._countLeavesFor(callback);
      else
        return total + callback(child, total);
    }, 0, this);
  },

  _setIsCheckedFromIds: function(ids, isChecked) {
    if (_.contains(ids, this.id)) this.set("isChecked", isChecked);
    this.get("children").each(function(child) { child._setIsCheckedFromIds(ids, isChecked); });
  },

  _setIsChecked: function(isChecked) {
    this.set("isChecked", isChecked);
    this.get("children").each(function(child) { child._setIsChecked(isChecked); });
  },

  // Callbacks
  _inc: function() { return 1; },

  _isChecked: function(model) {
    return model.get("isChecked");
  }

});

var Trees = Backbone.Trees = Backbone.Collection.extend({
  model: Tree,

  getLeavesChecked: function() {
    var modelsChecked = this.map(function(model) {
      return model.getLeavesChecked();
    }, this);
    return _.flatten(modelsChecked);
  },

  getChildrenIds: function() {
    var modelsId = this.map(function(model) {
      return model.getChildrenIds();
    }, this);
    return _.flatten(modelsId);
  },

  countLeavesChecked: function() {
    return this.getLeavesChecked().length;
  },

  checkFromIds: function(ids) {
    this._setIsCheckedFromIds(ids, true);
  },

  uncheckFromIds: function(ids) {
    this._setIsCheckedFromIds(ids, false);
  },

  _setIsCheckedFromIds: function(ids, isChecked) {
    this.each(function(child) { child._setIsCheckedFromIds(ids, isChecked); });
  }
});