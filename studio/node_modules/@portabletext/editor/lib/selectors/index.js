import { getSelectionEndPoint } from "../_chunks-es/selector.is-selecting-entire-blocks.js";
import { getActiveAnnotations, getActiveListItem, getActiveStyle, getCaretWordSelection, getFirstBlock, getFocusBlockObject, getFocusInlineObject, getFocusListBlock, getLastBlock, getNextBlock, getNextInlineObject, getPreviousBlock, getSelectedBlocks, getSelectedSpans, getSelectedTextBlocks, getSelectionEndBlock, getSelectionStartBlock, getTrimmedSelection, isActiveAnnotation, isActiveDecorator, isActiveListItem, isActiveStyle, isAtTheEndOfBlock, isAtTheStartOfBlock, isOverlappingSelection, isPointAfterSelection, isPointBeforeSelection, isSelectingEntireBlocks } from "../_chunks-es/selector.is-selecting-entire-blocks.js";
import { getBlockKeyFromSelectionPoint, isTextBlock, getChildKeyFromSelectionPoint, spanSelectionPointToBlockOffset, getSelectionEndPoint as getSelectionEndPoint$1, getSelectionStartPoint as getSelectionStartPoint$1 } from "../_chunks-es/util.slice-blocks.js";
import { isPortableTextSpan } from "@sanity/types";
import { getSelectionStartPoint, getFocusTextBlock, getSelectedValue, getFocusChild } from "../_chunks-es/selector.is-selection-expanded.js";
import { getFocusBlock, getFocusSpan, getPreviousInlineObject, getSelectionText, isSelectionCollapsed, isSelectionExpanded } from "../_chunks-es/selector.is-selection-expanded.js";
import { getBlockTextBefore } from "../_chunks-es/selector.get-text-before.js";
const getAnchorBlock = (snapshot) => {
  if (!snapshot.context.selection)
    return;
  const key = getBlockKeyFromSelectionPoint(snapshot.context.selection.anchor), index = key ? snapshot.blockIndexMap.get(key) : void 0, node = index !== void 0 ? snapshot.context.value.at(index) : void 0;
  return node && key ? {
    node,
    path: [{
      _key: key
    }]
  } : void 0;
}, getAnchorTextBlock = (snapshot) => {
  const anchorBlock = getAnchorBlock(snapshot);
  return anchorBlock && isTextBlock(snapshot.context, anchorBlock.node) ? {
    node: anchorBlock.node,
    path: anchorBlock.path
  } : void 0;
}, getAnchorChild = (snapshot) => {
  if (!snapshot.context.selection)
    return;
  const anchorBlock = getAnchorTextBlock(snapshot);
  if (!anchorBlock)
    return;
  const key = getChildKeyFromSelectionPoint(snapshot.context.selection.anchor), node = key ? anchorBlock.node.children.find((span) => span._key === key) : void 0;
  return node && key ? {
    node,
    path: [...anchorBlock.path, "children", {
      _key: key
    }]
  } : void 0;
}, getAnchorSpan = (snapshot) => {
  const anchorChild = getAnchorChild(snapshot);
  return anchorChild && isPortableTextSpan(anchorChild.node) ? {
    node: anchorChild.node,
    path: anchorChild.path
  } : void 0;
}, getBlockOffsets = (snapshot) => {
  if (!snapshot.context.selection)
    return;
  const selectionStartPoint = getSelectionStartPoint(snapshot), selectionEndPoint = getSelectionEndPoint(snapshot);
  if (!selectionStartPoint || !selectionEndPoint)
    return;
  const start = spanSelectionPointToBlockOffset({
    context: snapshot.context,
    selectionPoint: selectionStartPoint
  }), end = spanSelectionPointToBlockOffset({
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
    }, focusTextBlock = getFocusTextBlock({
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
      if (!isTextBlock(snapshot.context, block) || block.listItem === void 0 || block.level === void 0 || block.listItem !== targetListItem || block.level < targetLevel)
        break;
      block.level === targetLevel && listIndex++;
    }
    return listIndex;
  };
}
const getSelectedSlice = (snapshot) => getSelectedValue(snapshot), getSelection = (snapshot) => snapshot.context.selection, getSelectionEndChild = (snapshot) => {
  const endPoint = getSelectionEndPoint$1(snapshot.context.selection);
  if (endPoint)
    return getFocusChild({
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
  const startPoint = getSelectionStartPoint$1(snapshot.context.selection);
  if (startPoint)
    return getFocusChild({
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
export {
  getActiveAnnotations,
  getActiveListItem,
  getActiveStyle,
  getAnchorBlock,
  getAnchorChild,
  getAnchorSpan,
  getAnchorTextBlock,
  getBlockOffsets,
  getBlockTextBefore,
  getCaretWordSelection,
  getFirstBlock,
  getFocusBlock,
  getFocusBlockObject,
  getFocusChild,
  getFocusInlineObject,
  getFocusListBlock,
  getFocusSpan,
  getFocusTextBlock,
  getLastBlock,
  getListIndex,
  getNextBlock,
  getNextInlineObject,
  getPreviousBlock,
  getPreviousInlineObject,
  getSelectedBlocks,
  getSelectedSlice,
  getSelectedSpans,
  getSelectedTextBlocks,
  getSelectedValue,
  getSelection,
  getSelectionEndBlock,
  getSelectionEndChild,
  getSelectionEndPoint,
  getSelectionStartBlock,
  getSelectionStartChild,
  getSelectionStartPoint,
  getSelectionText,
  getTrimmedSelection,
  getValue,
  isActiveAnnotation,
  isActiveDecorator,
  isActiveListItem,
  isActiveStyle,
  isAtTheEndOfBlock,
  isAtTheStartOfBlock,
  isOverlappingSelection,
  isPointAfterSelection,
  isPointBeforeSelection,
  isSelectingEntireBlocks,
  isSelectionCollapsed,
  isSelectionExpanded
};
//# sourceMappingURL=index.js.map
