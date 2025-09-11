"use strict";
var util_sliceBlocks = require("./util.slice-blocks.cjs"), selector_isSelectionExpanded = require("./selector.is-selection-expanded.cjs");
const getBlockTextBefore = (snapshot) => {
  if (!snapshot.context.selection)
    return "";
  const startPoint = util_sliceBlocks.getSelectionStartPoint(snapshot.context.selection), block = selector_isSelectionExpanded.getFocusBlock({
    ...snapshot,
    context: {
      ...snapshot.context,
      selection: {
        anchor: startPoint,
        focus: startPoint
      }
    }
  });
  if (!block)
    return "";
  const startOfBlock = util_sliceBlocks.getBlockStartPoint({
    context: snapshot.context,
    block
  });
  return selector_isSelectionExpanded.getSelectionText({
    ...snapshot,
    context: {
      ...snapshot.context,
      selection: {
        anchor: startOfBlock,
        focus: startPoint
      }
    }
  });
};
exports.getBlockTextBefore = getBlockTextBefore;
//# sourceMappingURL=selector.get-text-before.cjs.map
