import { getSelectionStartPoint, getBlockStartPoint } from "./util.slice-blocks.js";
import { getFocusBlock, getSelectionText } from "./selector.is-selection-expanded.js";
const getBlockTextBefore = (snapshot) => {
  if (!snapshot.context.selection)
    return "";
  const startPoint = getSelectionStartPoint(snapshot.context.selection), block = getFocusBlock({
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
  const startOfBlock = getBlockStartPoint({
    context: snapshot.context,
    block
  });
  return getSelectionText({
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
export {
  getBlockTextBefore
};
//# sourceMappingURL=selector.get-text-before.js.map
