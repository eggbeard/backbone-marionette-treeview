// ---------------------------
// TreeModel without children
// ---------------------------
test("getNbChildren when model has no children", function() {
  var treeModel = new TreeModel({ label: "test", id: "1"});
  equal(treeModel.getNbTotalChildren(), 1, "No children so it's itself a child");
});

test("getNbChildrenChecked when model has no children checked", function() {
  var treeModel = new TreeModel({ label: "test", id: "1"});
  equal(treeModel.getNbChildrenChecked(), 0, "No children checked");
});

test("getNbChildrenChecked when model is checked and has no children", function() {
  var treeModel = new TreeModel({ label: "test", id: "1", isChecked: 1});
  equal(treeModel.getNbChildrenChecked(), 1, "One child checked");
});

test("getChildrenChecked when model is checked and has no children", function() {
  var treeModel = new TreeModel({ label: "test", id: "1", isChecked: 1});
  equal(treeModel.getChildrenChecked().length, 1, "One child checked");
  equal(treeModel.getChildrenChecked()[0].get("id"), treeModel.get("id"), "One child checked");
});

test("getChildrenChecked when model is not checked and has no children", function() {
  var treeModel = new TreeModel({ label: "test", id: "1", isChecked: false});
  equal(treeModel.getChildrenChecked().length, 0, "One child checked");
});

test("allChildrenChecked when model is checked and has no children", function() {
  var treeModel = new TreeModel({ label: "test", id: "1", isChecked: 1});
  equal(treeModel.allChildrenChecked(), 1, "One child checked");
});

test("hasChildren when model is checked and has no children", function() {
  var treeModel = new TreeModel({ label: "test", id: "1", isChecked: 1});
  equal(treeModel.hasChildren(), false, "No children");
});

test("toggleCheck to false when model is checked and has no children", function() {
  var treeModel = new TreeModel({ label: "test", id: "1"});
  treeModel.toggleCheck(false);
  equal(treeModel.get("isChecked"), false, "Not checked");
});

test("toggleCheck to true when model is checked and has no children", function() {
  var treeModel = new TreeModel({ label: "test", id: "1", isChecked: 1});
  treeModel.toggleCheck(true);
  equal(treeModel.get("isChecked"), true, "Not checked");
});

// ---------------------------
// Empty TreeCollection
// ---------------------------

test("getChildrenChecked when collection is empty", function() {
  var treeCollection = new TreeCollection();
  equal(treeCollection.getChildrenChecked().length, 0, "Empty array");
});

test("getNbChildrenChecked when collection is empty", function() {
  var treeCollection = new TreeCollection();
  equal(treeCollection.getNbChildrenChecked(), 0, "No children checked because collection has no models");
});

// ---------------------------
// TreeModel with children
// ---------------------------
test("getNbChildren when model has children", function() {
  var treeModels = new TreeCollection([
    new TreeModel({ label: "test", id: "2"}),
    new TreeModel({ label: "test", id: "3"}),
    new TreeModel({ label: "test", id: "5"})
  ]);
  var treeModel = new TreeModel({ label: "test", id: "1", children: treeModels});
  equal(treeModel.getNbTotalChildren(), 3, "> 0");
});

test("getNbChildrenChecked when model has no children checked", function() {
  var treeModels = new TreeCollection([
    new TreeModel({ label: "test", id: "2"}),
    new TreeModel({ label: "test", id: "3"}),
    new TreeModel({ label: "test", id: "5"})
  ]);
  var treeModel = new TreeModel({ label: "test", id: "1", children: treeModels});
  equal(treeModel.getNbChildrenChecked(), 0, "No children checked");
});

test("getNbChildrenChecked when model has children checked", function() {
  var treeModels = new TreeCollection([
    new TreeModel({ label: "test", id: "2", isChecked: true}),
    new TreeModel({ label: "test", id: "3", isChecked: true}),
    new TreeModel({ label: "test", id: "5"})
  ]);
  var treeModel = new TreeModel({ label: "test", id: "1", children: treeModels});
  equal(treeModel.getNbChildrenChecked(), 2, "Two child checked");
});

test("getChildrenChecked when two children are checked", function() {
  var treeModels = new TreeCollection([
    new TreeModel({ label: "test", id: "2", isChecked: true}),
    new TreeModel({ label: "test", id: "3", isChecked: true}),
    new TreeModel({ label: "test", id: "5"})
  ]);
  var treeModel = new TreeModel({ label: "test", id: "1", children: treeModels});
  equal(treeModel.getChildrenChecked().length, 2, "One child checked");
  equal(treeModel.getChildrenChecked()[0].get("id"), "2", "One child checked");
  equal(treeModel.getChildrenChecked()[1].get("id"), "3", "One child checked");
});

test("allChildrenChecked when has not all children checked", function() {
  var treeModels = new TreeCollection([
    new TreeModel({ label: "test", id: "2", isChecked: true}),
    new TreeModel({ label: "test", id: "3", isChecked: true}),
    new TreeModel({ label: "test", id: "5"})
  ]);
  var treeModel = new TreeModel({ label: "test", id: "1", children: treeModels});
  equal(treeModel.allChildrenChecked(), false, "Not all");
});

test("allChildrenChecked when model has all children checked", function() {
  var treeModels = new TreeCollection([
    new TreeModel({ label: "test", id: "2", isChecked: true}),
    new TreeModel({ label: "test", id: "3", isChecked: true}),
    new TreeModel({ label: "test", id: "5", isChecked: true})
  ]);
  var treeModel = new TreeModel({ label: "test", id: "1", children: treeModels});
  equal(treeModel.allChildrenChecked(), true, "All");
});

test("hasChildren when model is checked and has no children", function() {
  var treeModels = new TreeCollection([
    new TreeModel({ label: "test", id: "2", isChecked: true}),
    new TreeModel({ label: "test", id: "3", isChecked: true}),
    new TreeModel({ label: "test", id: "5", isChecked: true})
  ]);
  var treeModel = new TreeModel({ label: "test", id: "1", children: treeModels});
  equal(treeModel.hasChildren(), true, "Has children");
});

test("toggleCheck to false when model is checked and has no children", function() {
  var treeModels = new TreeCollection([
    new TreeModel({ label: "test", id: "2", isChecked: true}),
    new TreeModel({ label: "test", id: "3", isChecked: true}),
    new TreeModel({ label: "test", id: "5", isChecked: true})
  ]);
  var treeModel = new TreeModel({ label: "test", id: "1", children: treeModels});
  treeModel.toggleCheck(false);
  equal(treeModel.getNbChildrenChecked(), 0, "Not one checked");
});

test("toggleCheck to true when model is checked and has no children", function() {
  var treeModels = new TreeCollection([
    new TreeModel({ label: "test", id: "2"}),
    new TreeModel({ label: "test", id: "3"}),
    new TreeModel({ label: "test", id: "5"})
  ]);
  var treeModel = new TreeModel({ label: "test", id: "1", children: treeModels});
  treeModel.toggleCheck(true);
  equal(treeModel.getNbChildrenChecked(), 3, "All children checked");
});

// ---------------------------
// Filled TreeCollection
// ---------------------------

test("getChildrenChecked when collection is filled", function() {
  var treeCollection = new TreeCollection([
    new TreeModel({ label: "test", id: "2", isChecked: true}),
    new TreeModel({ label: "test", id: "3", isChecked: true}),
    new TreeModel({ label: "test", id: "5"})
  ]);
  equal(treeCollection.getChildrenChecked().length, 2, "Return two children checked");
});

test("getNbChildrenChecked when collection is filled", function() {
  var treeCollection = new TreeCollection([
    new TreeModel({ label: "test", id: "2", isChecked: true}),
    new TreeModel({ label: "test", id: "3", isChecked: true}),
    new TreeModel({ label: "test", id: "5"})
  ]);
  equal(treeCollection.getNbChildrenChecked(), 2, "Two children are checked");
});