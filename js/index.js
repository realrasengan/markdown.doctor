const aboutMsg =
`markdown.doctor (md) editor
version 0.01 alpha

By Andrew Lee <andrew@imperialfamily.com>

MIT LICENSED
`;

function dom(id) { return document.getElementById(id) }
function main(e) {
  if(e.ctrlKey) {
    switch(e.key) {
      case 'm':
        update();
        toggle();
        break;
      case 'i':
        invert();
        break;
      case 's':
        downloadFile();
        break;
      case 'n':
        let x = confirm("You will lose all the data you have put down here.  Are you sure?");
        if(x)
          newFile();
        break;
      case 'r':
        alert(aboutMsg);
        break;
      case 'g':
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
function update() { setTimeout(()=>{ dom('editor_preview').innerHTML = marked.parse(dom('editor').value) },1) }
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
function toggle() {
  setTimeout(()=>{
    if(dom('editor_preview').classList.contains('invisible')) {
      dom('editor_preview').classList.remove('invisible');
      dom('editor_preview').scrollTop = dom('editor').scrollTop;
    }
    else {
      dom('editor').scrollTop = dom('editor_preview').scrollTop;
      dom('editor_preview').classList.add('invisible');
    }
  },1);
}
function invert() {
  if(!document.body.classList.contains('inverted'))
    for(var els = document.getElementsByTagName("*"), i = 0, all = els.length; i < all; i++) els[i].classList.add('inverted');
  else
    for(var els = document.getElementsByTagName("*"), i = 0, all = els.length; i < all; i++) els[i].classList.remove('inverted');
}

