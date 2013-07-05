TreeView = Marionette.CollectionView.extend({
  itemView: views.NodeView,
  tagName: "ul",
  className: "tree-view-root",

  expand: function() { this.children.each(function(child) { child.expand(); }); },
  collapse: function() { this.children.each(function(child) { child.collapse(); }); },
  toggleView: function() { this.children.each(function(child) { child.toggleView(); }); }
});