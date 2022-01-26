dom('editor').onkeydown = main;
dom('editor_preview').onclick = (e) => {
  let pos = getCaretPosition('editor_preview');
  let offset1 = calcOffset(pos[0]);
  let offset2 = calcOffset(pos[1]);
  setCaretPosition('editor',pos[0]+offset1,pos[1]+offset2);
}
window.onload = () => {
  const data = window.localStorage.getItem('data');
  if(data && data.length>0)
    dom('editor').value=data;
}
setInterval(()=>{update()},1000);
