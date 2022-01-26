# markdown.doctor (md) editor
### Web based, client side markdown editor with live previews

I was looking for a nice markdown editor, and I couldn't find one that did all the things I wanted.  I figured this was something I could whip together in a quick hackathon-style sitting.  markdown.doctor is the result.

## Installation

1. Visit [markdown.doctor](https://markdown.doctor/)

or

1. Download from git
```
git clone https://github.com/realrasengan/markdown.doctor
```

2. Install in your webroot folder or in a local folder.

3. Open `index.html`

## Features

- Press ^m to see a live preview
- Press ^i to invert colors (light/dark mode)
- Press ^s to download the .md file
- Press ^n to start over
- Every keypress triggers a localStorage save, so your work should be there when you return. [1]

[1] localStorage isn't always persistent.  Make sure you save (^s) your work often!

## TODO

- Fix cursor in live preview mode

## License and Copyright

Copyright (c) 2022 Andrew Lee <andrew@imperialfamily.com>

All Rights Reserved.

MIT LICENSED

