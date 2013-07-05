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
    this.model.hasChildren() ? this.$el.addClass("tree-view-branch") : this.$el.addClass("tree-view-leaf") ;

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

  appendHtml: function(collectionView, itemView, index){
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

  toggleView: function(event) {
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