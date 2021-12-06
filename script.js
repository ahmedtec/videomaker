let shorts = document.getElementById("shorts")
let iframe = document.getElementById("iframe")
let start = document.getElementById("start")
let typerHtml = document.getElementById("typerHtml")
let typerCss = document.getElementById("typerCss")
let typerjs = document.getElementById("typerjs")


let html0 = document.getElementsByClassName("html")[0]
let css0 = document.getElementsByClassName("css")[0]
let js0 = document.getElementsByClassName("js")[0]

// fatchfile 
async function getdata(filename) {
    let file = await fetch("RecordFiles/" + filename)
    let res = await file.text()
    return res
}

// HTML
function html() {
    getdata("home.txt").then(html => {
        let codehtml = html.replace(/</g, `&lt;`)
            .replace(/>/g, `&gt;`)
            .replace(/"/g, `&quot;`)
        // console.log(html)
        let typo = new TypeIt("#typerHtml", {
            cursor: true,
            speed: 150,
            waitUntilVisible: true,
            afterStep: function (instance) {
                // Prism.highlightElement(typerHtml)
                let typer = typerHtml.innerText
                document.getElementById("iframe").contentDocument.body.innerHTML = typer
                // typerCss.scrollTop = 9999999
            },
            afterComplete: function (instance) {
                // preparCss()
            },
        })

        // typo.type(codehtml.substr(0, 10))
        // typo.move(-5, { delay: 500 })
        // typo.type(codehtml.substr(10, 20))
        startTypeHtml(typo, html, 0, '-');
        typo.go()
    });
}

keyworks = { '{': '}', '(': ')', '"': '"', '<div>': '</div>', '-a-': '-/a-' }
let all_kays = Object.keys(keyworks)

let text_ = "<a>s</a>"
// text_.substring(text_.indexOf("<a>") - 3, text_.lastIndexOf("</a>"))

console.log(text_.substring(text_.indexOf("<a>") + 3, text_.lastIndexOf("</a>")));

function kays(text,index) {
    let the_text = text.substring(index)
    for(let key of all_kays){
        if (the_text.startsWith(key)) {
            console.log("ffffffound", key);
            return key
        }
    }
    return ''
}

function hasKayClose(text,index, key) {
    let the_text = text.substring(index)
    
        if (the_text.startsWith(keyworks[key])) {
            return true;
        }
    
    return false;
}

function startTypeHtml(typo, text, index, mainKey) {
    
    let count = 0;
    for (let i = index; i < text.length; i++) {
        count++;

        if (hasKayClose(text,i,mainKey)) {

            return count + keyworks[mainKey].length +1;
        }
        let key = kays(text,i);
        if (key.length > 0) {
            console.log('found key',key,keyworks[key]);
            typo.type(key);
            typo.type(keyworks[key]);
            typo.move(keyworks[key].length * -1, { delay: 500 });
            let c = startTypeHtml(typo, text, i + key.length , key);
            typo.move(keyworks[key].length);
            count += c;
            i += c;
        } else {
            typo.type(text[i]);
        }
    }
    return count;
}


// CSS
function css() {
    getdata("style.css").then(css => {
        let iframHaveThisCode = iframe.contentDocument.body.innerHTML
        let typo = new TypeIt("#typerCss", {
            cursor: true,
            speed: 100,
            waitUntilVisible: true,
            afterStep: function (instance) {
                // Prism.highlightElement(typerCss)
                let typer = typerCss.innerText
                document.getElementById("iframe").contentDocument.body.innerHTML = iframHaveThisCode + "<style>" + typer + "</style>"
                // typerCss.scrollTop = 9999999
            },
            afterComplete: function (instance) {
                // preparCss()
            },
        })
        // typo.type(css)
        startTypeCss(typo, css, 0, '-');
        typo.go()
    });
}

function startTypeCss(typo, text, index, key) {
    let count = 0;
    for (let i = index; i < text.length; i++) {
        count++;
        if(text[i] == '\r')continue;
        if (keyworks[key] == text[i]) {
            return count;
        }
        if (Object.keys(keyworks).indexOf(text[i]) >= 0) {
            typo.type(text[i]);
            typo.type(keyworks[text[i]]);
            typo.move(keyworks[text[i]].length * -1, { delay: 1000 });
            typo.type(`
`);
            typo.move(-1);
            let c = startTypeCss(typo, text, i + keyworks[text[i]].length, text[i]);
            typo.move(keyworks[text[i]].length);
            count += c;
            i += c;
        } else {
            console.log(text[i])
            typo.type(text[i]);
        }
    }
    return count;
}


//  funtcion {"Name(val)contnue"} hello 

// keyworks = { '{': '}', '(': ')', '"': '"', '<div>': '</div>' ,'<a>': '</a>' }

// Javascript
function javascript() {
    getdata("script.js").then(jss => {
        let iframHaveThisCode = iframe.contentDocument.body.innerHTML
        let typo = new TypeIt("#typerjs", {
            cursor: true,
            speed: Math.floor(Math.random() * 99),
            waitUntilVisible: true,
            afterStep: function (instance) {
                // Prism.highlightElement(typerjs)
                let typer = typerjs.innerText
                evalContent = typer
                iframe.contentDocument.body.innerHTML = iframHaveThisCode + "<script>" + typer + "</script>"
            },
            afterComplete: function (instance) {
                iframe.contentWindow.eval(evalContent)
                console.log("done")
            },
        })

        // typo.type(jss)
        startType(typo, jss, 0, '-');
        typo.go()
    });
}

function startType(typo, text, index, key) {
    let count = 0;
    for (let i = index; i < text.length; i++) {
        count++;
        if (keyworks[key] == text[i]) {
            return count;
        }
        if (Object.keys(keyworks).indexOf(text[i]) >= 0) {
            typo.type(text[i]);
            typo.type(keyworks[text[i]]);
            typo.move(keyworks[text[i]].length * -1, { delay: Math.floor(Math.random() * 999) });
            let c = startType(typo, text, i + keyworks[text[i]].length, text[i]);
            typo.move(keyworks[text[i]].length);
            count += c;
            i += c;
        } else {
            typo.type(text[i]);
        }
    }
    return count;
}
