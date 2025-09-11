"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var util_sliceBlocks = require("../_chunks-cjs/util.slice-blocks.cjs"), util_childSelectionPointToBlockOffset = require("../_chunks-cjs/util.child-selection-point-to-block-offset.cjs"), util_isSelectionCollapsed = require("../_chunks-cjs/util.is-selection-collapsed.cjs"), util_mergeTextBlocks = require("../_chunks-cjs/util.merge-text-blocks.cjs"), util_sliceTextBlock = require("../_chunks-cjs/util.slice-text-block.cjs");
function isEqualSelections(a, b) {
  return !a && !b ? !0 : !a || !b ? !1 : util_isSelectionCollapsed.isEqualSelectionPoints(a.anchor, b.anchor) && util_isSelectionCollapsed.isEqualSelectionPoints(a.focus, b.focus);
}
function reverseSelection(selection) {
  return selection && (selection.backward ? {
    anchor: selection.focus,
    focus: selection.anchor,
    backward: !1
  } : {
    anchor: selection.focus,
    focus: selection.anchor,
    backward: !0
  });
}
function splitTextBlock({
  context,
  block,
  point
}) {
  const firstChild = block.children.at(0), lastChild = block.children.at(block.children.length - 1);
  if (!firstChild || !lastChild)
    return;
  const before = util_sliceTextBlock.sliceTextBlock({
    context: {
      schema: context.schema,
      selection: {
        anchor: {
          path: [{
            _key: block._key
          }, "children", {
            _key: firstChild._key
          }],
          offset: 0
        },
        focus: point
      }
    },
    block
  }), after = util_sliceTextBlock.sliceTextBlock({
    context: {
      schema: context.schema,
      selection: {
        anchor: point,
        focus: {
          path: [{
            _key: block._key
          }, "children", {
            _key: lastChild._key
          }],
          offset: util_sliceBlocks.isSpan$1(context, lastChild) ? lastChild.text.length : 0
        }
      }
    },
    block
  });
  return {
    before,
    after
  };
}
exports.blockOffsetToSpanSelectionPoint = util_sliceBlocks.blockOffsetToSpanSelectionPoint;
exports.getBlockStartPoint = util_sliceBlocks.getBlockStartPoint;
exports.getSelectionEndPoint = util_sliceBlocks.getSelectionEndPoint;
exports.getSelectionStartPoint = util_sliceBlocks.getSelectionStartPoint;
exports.getTextBlockText = util_sliceBlocks.getTextBlockText;
exports.isKeyedSegment = util_sliceBlocks.isKeyedSegment;
exports.isSpan = util_sliceBlocks.isSpan$1;
exports.sliceBlocks = util_sliceBlocks.sliceBlocks;
exports.spanSelectionPointToBlockOffset = util_sliceBlocks.spanSelectionPointToBlockOffset;
exports.blockOffsetToBlockSelectionPoint = util_childSelectionPointToBlockOffset.blockOffsetToBlockSelectionPoint;
exports.blockOffsetToSelectionPoint = util_childSelectionPointToBlockOffset.blockOffsetToSelectionPoint;
exports.blockOffsetsToSelection = util_childSelectionPointToBlockOffset.blockOffsetsToSelection;
exports.childSelectionPointToBlockOffset = util_childSelectionPointToBlockOffset.childSelectionPointToBlockOffset;
exports.getBlockEndPoint = util_isSelectionCollapsed.getBlockEndPoint;
exports.isEmptyTextBlock = util_isSelectionCollapsed.isEmptyTextBlock;
exports.isEqualSelectionPoints = util_isSelectionCollapsed.isEqualSelectionPoints;
exports.isSelectionCollapsed = util_isSelectionCollapsed.isSelectionCollapsed;
exports.isTextBlock = util_mergeTextBlocks.isTextBlock;
exports.mergeTextBlocks = util_mergeTextBlocks.mergeTextBlocks;
exports.selectionPointToBlockOffset = util_sliceTextBlock.selectionPointToBlockOffset;
exports.isEqualSelections = isEqualSelections;
exports.reverseSelection = reverseSelection;
exports.splitTextBlock = splitTextBlock;
//# sourceMappingURL=index.cjs.map
