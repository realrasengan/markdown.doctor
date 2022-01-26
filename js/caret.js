function setCaretPosition(id,start,end) {
  dom(id).focus();
  dom(id).setSelectionRange(start, end);
}
function calcOffset(position) {
  const x = dom('editor').value.trim();
  const y = dom('editor_preview').textContent.trim();
  let t=0;
  for(let n=0,i=0;n<position;n++,i++)
    for(;x[i]!==y[n];i++,t++);
  return t;
}

/* Below from:
 * https://stackoverflow.com/questions/3972014/get-contenteditable-caret-position
 */
// node_walk: walk the element tree, stop when func(node) returns false
function node_walk(node, func) {
  var result = func(node);
  for(node = node.firstChild; result !== false && node; node = node.nextSibling)
    result = node_walk(node, func);
  return result;
}

// getCaretPosition: return [start, end] as offsets to elem.textContent that
//   correspond to the selected portion of text
//   (if start == end, caret is at given position and no text is selected)
function getCaretPosition(id) {
  const elem = dom(id);
  var sel = window.getSelection();
  var cum_length = [0, 0];

  if(sel.anchorNode == elem)
    cum_length = [sel.anchorOffset, sel.extentOffset];
  else {
    var nodes_to_find = [sel.anchorNode, sel.extentNode];
    if(!elem.contains(sel.anchorNode) || !elem.contains(sel.extentNode))
      return undefined;
    else {
      var found = [0,0];
      var i;
      node_walk(elem, function(node) {
        for(i = 0; i < 2; i++) {
          if(node == nodes_to_find[i]) {
            found[i] = true;
            if(found[i == 0 ? 1 : 0])
              return false; // all done
          }
        }
        if(node.textContent && !node.firstChild) {
          for(i = 0; i < 2; i++) {
            if(!found[i])
              cum_length[i] += node.textContent.length;
          }
        }
      });
      cum_length[0] += sel.anchorOffset;
      cum_length[1] += sel.extentOffset;
    }
  }
  if(cum_length[0] <= cum_length[1])
    return cum_length;
  return [cum_length[1], cum_length[0]];
}
