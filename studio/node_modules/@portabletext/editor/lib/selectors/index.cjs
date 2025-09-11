"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var selector_isSelectingEntireBlocks = require("../_chunks-cjs/selector.is-selecting-entire-blocks.cjs"), util_sliceBlocks = require("../_chunks-cjs/util.slice-blocks.cjs"), types = require("@sanity/types"), selector_isSelectionExpanded = require("../_chunks-cjs/selector.is-selection-expanded.cjs"), selector_getTextBefore = require("../_chunks-cjs/selector.get-text-before.cjs");
const getAnchorBlock = (snapshot) => {
  if (!snapshot.context.selection)
    return;
  const key = util_sliceBlocks.getBlockKeyFromSelectionPoint(snapshot.context.selection.anchor), index = key ? snapshot.blockIndexMap.get(key) : void 0, node = index !== void 0 ? snapshot.context.value.at(index) : void 0;
  return node && key ? {
    node,
    path: [{
      _key: key
    }]
  } : void 0;
}, getAnchorTextBlock = (snapshot) => {
  const anchorBlock = getAnchorBlock(snapshot);
  return anchorBlock && util_sliceBlocks.isTextBlock(snapshot.context, anchorBlock.node) ? {
    node: anchorBlock.node,
    path: anchorBlock.path
  } : void 0;
}, getAnchorChild = (snapshot) => {
  if (!snapshot.context.selection)
    return;
  const anchorBlock = getAnchorTextBlock(snapshot);
  if (!anchorBlock)
    return;
  const key = util_sliceBlocks.getChildKeyFromSelectionPoint(snapshot.context.selection.anchor), node = key ? anchorBlock.node.children.find((span) => span._key === key) : void 0;
  return node && key ? {
    node,
    path: [...anchorBlock.path, "children", {
      _key: key
    }]
  } : void 0;
}, getAnchorSpan = (snapshot) => {
  const anchorChild = getAnchorChild(snapshot);
  return anchorChild && types.isPortableTextSpan(anchorChild.node) ? {
    node: anchorChild.node,
    path: anchorChild.path
  } : void 0;
}, getBlockOffsets = (snapshot) => {
  if (!snapshot.context.selection)
    return;
  const selectionStartPoint = selector_isSelectionExpanded.getSelectionStartPoint(snapshot), selectionEndPoint = selector_isSelectingEntireBlocks.getSelectionEndPoint(snapshot);
  if (!selectionStartPoint || !selectionEndPoint)
    return;
  const start = util_sliceBlocks.spanSelectionPointToBlockOffset({
    context: snapshot.context,
    selectionPoint: selectionStartPoint
  }), end = util_sliceBlocks.spanSelectionPointToBlockOffset({
    context: snapshot.context,
    selectionPoint: selectionEndPoint
  });
  return start && end ? {
    start,
    end
  } : void 0;
};
function getListIndex({
  path
}) {
  return (snapshot) => {
    const selection = {
      anchor: {
        path,
        offset: 0
      },
      focus: {
        path,
        offset: 0
      }
    }, focusTextBlock = selector_isSelectionExpanded.getFocusTextBlock({
      ...snapshot,
      context: {
        ...snapshot.context,
        selection
      }
    });
    if (!focusTextBlock || focusTextBlock.node.listItem === void 0 || focusTextBlock.node.level === void 0)
      return;
    const targetListItem = focusTextBlock.node.listItem, targetLevel = focusTextBlock.node.level, targetKey = focusTextBlock.node._key, targetIndex = snapshot.blockIndexMap.get(targetKey);
    if (targetIndex === void 0)
      return;
    let listIndex = 1;
    for (let i = targetIndex - 1; i >= 0; i--) {
      const block = snapshot.context.value[i];
      if (!util_sliceBlocks.isTextBlock(snapshot.context, block) || block.listItem === void 0 || block.level === void 0 || block.listItem !== targetListItem || block.level < targetLevel)
        break;
      block.level === targetLevel && listIndex++;
    }
    return listIndex;
  };
}
const getSelectedSlice = (snapshot) => selector_isSelectionExpanded.getSelectedValue(snapshot), getSelection = (snapshot) => snapshot.context.selection, getSelectionEndChild = (snapshot) => {
  const endPoint = util_sliceBlocks.getSelectionEndPoint(snapshot.context.selection);
  if (endPoint)
    return selector_isSelectionExpanded.getFocusChild({
      ...snapshot,
      context: {
        ...snapshot.context,
        selection: {
          anchor: endPoint,
          focus: endPoint
        }
      }
    });
}, getSelectionStartChild = (snapshot) => {
  const startPoint = util_sliceBlocks.getSelectionStartPoint(snapshot.context.selection);
  if (startPoint)
    return selector_isSelectionExpanded.getFocusChild({
      ...snapshot,
      context: {
        ...snapshot.context,
        selection: {
          anchor: startPoint,
          focus: startPoint
        }
      }
    });
}, getValue = (snapshot) => snapshot.context.value;
exports.getActiveAnnotations = selector_isSelectingEntireBlocks.getActiveAnnotations;
exports.getActiveListItem = selector_isSelectingEntireBlocks.getActiveListItem;
exports.getActiveStyle = selector_isSelectingEntireBlocks.getActiveStyle;
exports.getCaretWordSelection = selector_isSelectingEntireBlocks.getCaretWordSelection;
exports.getFirstBlock = selector_isSelectingEntireBlocks.getFirstBlock;
exports.getFocusBlockObject = selector_isSelectingEntireBlocks.getFocusBlockObject;
exports.getFocusInlineObject = selector_isSelectingEntireBlocks.getFocusInlineObject;
exports.getFocusListBlock = selector_isSelectingEntireBlocks.getFocusListBlock;
exports.getLastBlock = selector_isSelectingEntireBlocks.getLastBlock;
exports.getNextBlock = selector_isSelectingEntireBlocks.getNextBlock;
exports.getNextInlineObject = selector_isSelectingEntireBlocks.getNextInlineObject;
exports.getPreviousBlock = selector_isSelectingEntireBlocks.getPreviousBlock;
exports.getSelectedBlocks = selector_isSelectingEntireBlocks.getSelectedBlocks;
exports.getSelectedSpans = selector_isSelectingEntireBlocks.getSelectedSpans;
exports.getSelectedTextBlocks = selector_isSelectingEntireBlocks.getSelectedTextBlocks;
exports.getSelectionEndBlock = selector_isSelectingEntireBlocks.getSelectionEndBlock;
exports.getSelectionEndPoint = selector_isSelectingEntireBlocks.getSelectionEndPoint;
exports.getSelectionStartBlock = selector_isSelectingEntireBlocks.getSelectionStartBlock;
exports.getTrimmedSelection = selector_isSelectingEntireBlocks.getTrimmedSelection;
exports.isActiveAnnotation = selector_isSelectingEntireBlocks.isActiveAnnotation;
exports.isActiveDecorator = selector_isSelectingEntireBlocks.isActiveDecorator;
exports.isActiveListItem = selector_isSelectingEntireBlocks.isActiveListItem;
exports.isActiveStyle = selector_isSelectingEntireBlocks.isActiveStyle;
exports.isAtTheEndOfBlock = selector_isSelectingEntireBlocks.isAtTheEndOfBlock;
exports.isAtTheStartOfBlock = selector_isSelectingEntireBlocks.isAtTheStartOfBlock;
exports.isOverlappingSelection = selector_isSelectingEntireBlocks.isOverlappingSelection;
exports.isPointAfterSelection = selector_isSelectingEntireBlocks.isPointAfterSelection;
exports.isPointBeforeSelection = selector_isSelectingEntireBlocks.isPointBeforeSelection;
exports.isSelectingEntireBlocks = selector_isSelectingEntireBlocks.isSelectingEntireBlocks;
exports.getFocusBlock = selector_isSelectionExpanded.getFocusBlock;
exports.getFocusChild = selector_isSelectionExpanded.getFocusChild;
exports.getFocusSpan = selector_isSelectionExpanded.getFocusSpan;
exports.getFocusTextBlock = selector_isSelectionExpanded.getFocusTextBlock;
exports.getPreviousInlineObject = selector_isSelectionExpanded.getPreviousInlineObject;
exports.getSelectedValue = selector_isSelectionExpanded.getSelectedValue;
exports.getSelectionStartPoint = selector_isSelectionExpanded.getSelectionStartPoint;
exports.getSelectionText = selector_isSelectionExpanded.getSelectionText;
exports.isSelectionCollapsed = selector_isSelectionExpanded.isSelectionCollapsed;
exports.isSelectionExpanded = selector_isSelectionExpanded.isSelectionExpanded;
exports.getBlockTextBefore = selector_getTextBefore.getBlockTextBefore;
exports.getAnchorBlock = getAnchorBlock;
exports.getAnchorChild = getAnchorChild;
exports.getAnchorSpan = getAnchorSpan;
exports.getAnchorTextBlock = getAnchorTextBlock;
exports.getBlockOffsets = getBlockOffsets;
exports.getListIndex = getListIndex;
exports.getSelectedSlice = getSelectedSlice;
exports.getSelection = getSelection;
exports.getSelectionEndChild = getSelectionEndChild;
exports.getSelectionStartChild = getSelectionStartChild;
exports.getValue = getValue;
//# sourceMappingURL=index.cjs.map
