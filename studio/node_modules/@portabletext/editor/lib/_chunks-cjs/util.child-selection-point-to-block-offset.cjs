"use strict";
var util_sliceBlocks = require("./util.slice-blocks.cjs");
function blockOffsetToBlockSelectionPoint({
  context,
  blockOffset
}) {
  let selectionPoint;
  for (const block of context.value)
    if (block._key === blockOffset.path[0]._key) {
      selectionPoint = {
        path: [{
          _key: block._key
        }],
        offset: blockOffset.offset
      };
      break;
    }
  return selectionPoint;
}
function blockOffsetToSelectionPoint({
  context,
  blockOffset,
  direction
}) {
  return util_sliceBlocks.blockOffsetToSpanSelectionPoint({
    context,
    blockOffset,
    direction
  }) || blockOffsetToBlockSelectionPoint({
    context,
    blockOffset
  });
}
function blockOffsetsToSelection({
  context,
  offsets,
  backward
}) {
  const anchor = blockOffsetToSelectionPoint({
    context,
    blockOffset: offsets.anchor,
    direction: backward ? "backward" : "forward"
  }), focus = blockOffsetToSelectionPoint({
    context,
    blockOffset: offsets.focus,
    direction: backward ? "forward" : "backward"
  });
  return !anchor || !focus ? null : {
    anchor,
    focus,
    backward
  };
}
function childSelectionPointToBlockOffset({
  context,
  selectionPoint
}) {
  let offset = 0;
  const blockKey = util_sliceBlocks.getBlockKeyFromSelectionPoint(selectionPoint), childKey = util_sliceBlocks.getChildKeyFromSelectionPoint(selectionPoint);
  if (!(!blockKey || !childKey)) {
    for (const block of context.value)
      if (block._key === blockKey && util_sliceBlocks.isTextBlock(context, block))
        for (const child of block.children) {
          if (child._key === childKey)
            return {
              path: [{
                _key: block._key
              }],
              offset: offset + selectionPoint.offset
            };
          util_sliceBlocks.isSpan(context, child) && (offset += child.text.length);
        }
  }
}
exports.blockOffsetToBlockSelectionPoint = blockOffsetToBlockSelectionPoint;
exports.blockOffsetToSelectionPoint = blockOffsetToSelectionPoint;
exports.blockOffsetsToSelection = blockOffsetsToSelection;
exports.childSelectionPointToBlockOffset = childSelectionPointToBlockOffset;
//# sourceMappingURL=util.child-selection-point-to-block-offset.cjs.map
