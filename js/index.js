const aboutMsg =
`markdown.doctor (md) editor
version 0.02 alpha

By Andrew Lee <andrew@imperialfamily.com>

MIT LICENSED
`;

function dom(id) { return document.getElementById(id) }
function prepare(e) {
  let pos = getCaretPosition('editor_preview');
  let offset1 = calcOffset(pos[0]);
  let offset2 = calcOffset(pos[1]);
  setCaretPosition('editor',pos[0]+offset1,pos[1]+offset2);  
}
function main(e) {
  if(e.ctrlKey) {
    switch(e.key) {
      case '1':
        update();
        toggle();
        break;
      case '2':
        invert();
        break;
      case '3':
        downloadFile();
        break;
      case '4':
        let x = confirm("You will lose all the data you have put down here.  Are you sure?");
        if(x)
          newFile();
        break;
      case '5':
        alert(aboutMsg);
        break;
      case '6':
        window.open("https://github.com/realrasengan/markdown.doctor","_newwindow");
        break;
      default:
        break;
    }
  }
  else {
    save();
    update();
  }
}
function update() { 
  dom('editor_preview').innerHTML = marked.parse(dom('editor').value);
}
function save() { window.localStorage.setItem('data',dom('editor').value) }
function newFile() {
  window.localStorage.removeItem('data');
  dom('editor').value='';
  dom('editor_preview').innerHTML='';
}
function downloadFile() {
  const tmp = document.createElement('a');
  tmp.style.display = 'none';
  tmp.href = window.URL.createObjectURL(new Blob([dom('editor').value],{type:"text/plain"}));
  tmp.setAttribute("download","doctor-"+Date.now()+".md");
  document.body.appendChild(tmp);
  tmp.click();
  window.URL.revokeObjectURL(tmp.href);
  document.body.removeChild(tmp);
}
function isVisible() {
  return !dom('editor_preview').classList.contains('invisible');
}
function toggle() {
  if(dom('editor_preview').classList.contains('invisible')) {
    dom('editor_preview').classList.remove('invisible');
    dom('editor_preview').scrollTop = dom('editor').scrollTop;
  }
  else {
    dom('editor').scrollTop = dom('editor_preview').scrollTop;
    dom('editor_preview').classList.add('invisible');
  }
}
function invert() {
  if(!document.body.classList.contains('inverted'))
    for(var els = document.getElementsByTagName("*"), i = 0, all = els.length; i < all; i++) els[i].classList.add('inverted');
  else
    for(var els = document.getElementsByTagName("*"), i = 0, all = els.length; i < all; i++) els[i].classList.remove('inverted');
}

