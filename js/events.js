dom('editor_preview').onkeydown = prepare;
window.onkeyup = main;

window.onload = () => {
  const data = window.localStorage.getItem('data');
  if(data && data.length>0) {
    dom('editor').value=data;
    update();
  }
}
