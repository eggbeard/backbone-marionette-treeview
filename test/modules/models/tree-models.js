// ---------------------------
// Tree without children
// ---------------------------
test("getNbChildren when model has no children", function() {
  var tree = new Tree({ label: "test", id: "1"});
  equal(tree.getNbTotalChildren(), 1, "No children so it's itself a child");
});

test("getNbChildrenChecked when model has no children checked", function() {
  var tree = new Tree({ label: "test", id: "1"});
  equal(tree.getNbChildrenChecked(), 0, "No children checked");
});

test("getNbChildrenChecked when model is checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: 1});
  equal(tree.getNbChildrenChecked(), 1, "One child checked");
});

test("getChildrenChecked when model is checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: 1});
  equal(tree.getChildrenChecked().length, 1, "One child checked");
  equal(tree.getChildrenChecked()[0].get("id"), tree.get("id"), "One child checked");
});

test("getChildrenChecked when model is not checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: false});
  equal(tree.getChildrenChecked().length, 0, "One child checked");
});

test("allChildrenChecked when model is checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: 1});
  equal(tree.allChildrenChecked(), 1, "One child checked");
});

test("hasChildren when model is checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: 1});
  equal(tree.hasChildren(), false, "No children");
});

test("toggleCheck to false when model is checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1"});
  tree.toggleCheck(false);
  equal(tree.get("isChecked"), false, "Not checked");
});

test("toggleCheck to true when model is checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: 1});
  tree.toggleCheck(true);
  equal(tree.get("isChecked"), true, "Not checked");
});

test("toggleFromIds to false when model is checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: 1});
  tree.toggleFromIds(["1"], false);
  equal(tree.get("isChecked"), false, "Not checked");
});

test("toggleFromIds to true when model is checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: false});
  tree.toggleFromIds(["1"], true);
  equal(tree.get("isChecked"), true, "Not checked");
});

// ---------------------------
// Empty Trees
// ---------------------------

test("getChildrenChecked when collection is empty", function() {
  var trees = new Trees();
  equal(trees.getChildrenChecked().length, 0, "Empty array");
});

test("getNbChildrenChecked when collection is empty", function() {
  var trees = new Trees();
  equal(trees.getNbChildrenChecked(), 0, "No children checked because collection has no models");
});

// ---------------------------
// Tree with children
// ---------------------------
test("getNbChildren when model has children", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2"}),
    new Tree({ label: "test", id: "3"}),
    new Tree({ label: "test", id: "5"})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  equal(tree.getNbTotalChildren(), 3, "> 0");
});

test("getNbChildrenChecked when model has no children checked", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2"}),
    new Tree({ label: "test", id: "3"}),
    new Tree({ label: "test", id: "5"})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  equal(tree.getNbChildrenChecked(), 0, "No children checked");
});

test("getNbChildrenChecked when model has children checked", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5"})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  equal(tree.getNbChildrenChecked(), 2, "Two child checked");
});

test("getChildrenChecked when two children are checked", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5"})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  equal(tree.getChildrenChecked().length, 2, "One child checked");
  equal(tree.getChildrenChecked()[0].get("id"), "2", "One child checked");
  equal(tree.getChildrenChecked()[1].get("id"), "3", "One child checked");
});

test("allChildrenChecked when has not all children checked", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5"})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  equal(tree.allChildrenChecked(), false, "Not all");
});

test("allChildrenChecked when model has all children checked", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5", isChecked: true})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  equal(tree.allChildrenChecked(), true, "All");
});

test("hasChildren when model is checked and has no children", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5", isChecked: true})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  equal(tree.hasChildren(), true, "Has children");
});

test("toggleCheck to false when model is checked and has no children", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5", isChecked: true})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  tree.toggleCheck(false);
  equal(tree.getNbChildrenChecked(), 0, "Not one checked");
});

test("toggleCheck to true when model is checked and has no children", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2"}),
    new Tree({ label: "test", id: "3"}),
    new Tree({ label: "test", id: "5"})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  tree.toggleCheck(true);
  equal(tree.getNbChildrenChecked(), 3, "All children checked");
});

test("toggleFromIds to false when model has children", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5", isChecked: true})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  tree.toggleFromIds(["5"], false);
  equal(tree.getNbChildrenChecked(), 2, "Two checked");
});

test("toggleFromIds to true when model has children", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2"}),
    new Tree({ label: "test", id: "3"}),
    new Tree({ label: "test", id: "5"})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  tree.toggleFromIds(["2", "3"], true);
  equal(tree.getNbChildrenChecked(), 2, "Two checked");
});

// ---------------------------
// Filled Trees
// ---------------------------

test("getChildrenChecked when collection is filled", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5"})
  ]);
  equal(trees.getChildrenChecked().length, 2, "Return two children checked");
});

test("getNbChildrenChecked when collection is filled", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5"})
  ]);
  equal(trees.getNbChildrenChecked(), 2, "Two children are checked");
});