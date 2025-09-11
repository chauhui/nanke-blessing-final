"use strict";
var util_sliceBlocks = require("./util.slice-blocks.cjs"), types = require("@sanity/types");
const getFocusBlock = (snapshot) => {
  if (!snapshot.context.selection)
    return;
  const key = util_sliceBlocks.getBlockKeyFromSelectionPoint(snapshot.context.selection.focus), index = key ? snapshot.blockIndexMap.get(key) : void 0, node = index !== void 0 ? snapshot.context.value.at(index) : void 0;
  return node && key ? {
    node,
    path: [{
      _key: key
    }]
  } : void 0;
}, getFocusTextBlock = (snapshot) => {
  const focusBlock = getFocusBlock(snapshot);
  return focusBlock && util_sliceBlocks.isTextBlock(snapshot.context, focusBlock.node) ? {
    node: focusBlock.node,
    path: focusBlock.path
  } : void 0;
}, getFocusChild = (snapshot) => {
  if (!snapshot.context.selection)
    return;
  const focusBlock = getFocusTextBlock(snapshot);
  if (!focusBlock)
    return;
  const key = util_sliceBlocks.getChildKeyFromSelectionPoint(snapshot.context.selection.focus), node = key ? focusBlock.node.children.find((span) => span._key === key) : void 0;
  return node && key ? {
    node,
    path: [...focusBlock.path, "children", {
      _key: key
    }]
  } : void 0;
}, getFocusSpan = (snapshot) => {
  const focusChild = getFocusChild(snapshot);
  return focusChild && util_sliceBlocks.isSpan(snapshot.context, focusChild.node) ? {
    node: focusChild.node,
    path: focusChild.path
  } : void 0;
}, getSelectionStartPoint = (snapshot) => {
  if (snapshot.context.selection)
    return snapshot.context.selection.backward ? snapshot.context.selection.focus : snapshot.context.selection.anchor;
}, getPreviousInlineObject = (snapshot) => {
  const focusTextBlock = getFocusTextBlock(snapshot), selectionStartPoint = getSelectionStartPoint(snapshot), selectionStartPointChildKey = selectionStartPoint && types.isKeySegment(selectionStartPoint.path[2]) ? selectionStartPoint.path[2]._key : void 0;
  if (!focusTextBlock || !selectionStartPointChildKey)
    return;
  let inlineObject;
  for (const child of focusTextBlock.node.children) {
    if (child._key === selectionStartPointChildKey)
      break;
    util_sliceBlocks.isSpan$1(snapshot.context, child) || (inlineObject = {
      node: child,
      path: [...focusTextBlock.path, "children", {
        _key: child._key
      }]
    });
  }
  return inlineObject;
}, getSelectedValue = (snapshot) => {
  const selection = snapshot.context.selection;
  if (!selection)
    return [];
  const startPoint = util_sliceBlocks.getSelectionStartPoint(selection), endPoint = util_sliceBlocks.getSelectionEndPoint(selection), startBlockKey = util_sliceBlocks.getBlockKeyFromSelectionPoint(startPoint), endBlockKey = util_sliceBlocks.getBlockKeyFromSelectionPoint(endPoint);
  if (!startBlockKey || !endBlockKey)
    return [];
  const startBlockIndex = snapshot.blockIndexMap.get(startBlockKey), endBlockIndex = snapshot.blockIndexMap.get(endBlockKey);
  if (startBlockIndex === void 0 || endBlockIndex === void 0)
    return [];
  const slicedValue = snapshot.context.value.slice(startBlockIndex, endBlockIndex + 1);
  return util_sliceBlocks.sliceBlocks({
    context: snapshot.context,
    blocks: slicedValue
  });
}, getSelectionText = (snapshot) => getSelectedValue(snapshot).reduce((text, block) => util_sliceBlocks.isTextBlock(snapshot.context, block) ? text + block.children.reduce((text2, child) => util_sliceBlocks.isSpan(snapshot.context, child) ? text2 + child.text : text2, "") : text, ""), isSelectionCollapsed = (snapshot) => snapshot.context.selection ? JSON.stringify(snapshot.context.selection.anchor.path) === JSON.stringify(snapshot.context.selection.focus.path) && snapshot.context.selection?.anchor.offset === snapshot.context.selection?.focus.offset : !1, isSelectionExpanded = (snapshot) => !isSelectionCollapsed(snapshot);
exports.getFocusBlock = getFocusBlock;
exports.getFocusChild = getFocusChild;
exports.getFocusSpan = getFocusSpan;
exports.getFocusTextBlock = getFocusTextBlock;
exports.getPreviousInlineObject = getPreviousInlineObject;
exports.getSelectedValue = getSelectedValue;
exports.getSelectionStartPoint = getSelectionStartPoint;
exports.getSelectionText = getSelectionText;
exports.isSelectionCollapsed = isSelectionCollapsed;
exports.isSelectionExpanded = isSelectionExpanded;
//# sourceMappingURL=selector.is-selection-expanded.cjs.map
