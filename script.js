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
        new TypeIt("#typerHtml", {
                cursor: false,
                speed: 50,
                waitUntilVisible: true,
                afterStep: function(instance) {
                    Prism.highlightElement(typerHtml)
                    let typer = typerHtml.innerText
                    document.getElementById("iframe").contentDocument.body.innerHTML = typer
                        // typerCss.scrollTop = 9999999
                },
                afterComplete: function(instance) {
                    // preparCss()
                },
            }).type(codehtml)
            .go()
    });
}

// CSS
function css() {
    getdata("style.css").then(css => {
        let iframHaveThisCode = iframe.contentDocument.body.innerHTML
        new TypeIt("#typerCss", {
                cursor: false,
                speed: 50,
                waitUntilVisible: true,
                afterStep: function(instance) {
                    Prism.highlightElement(typerCss)
                    let typer = typerCss.innerText
                    document.getElementById("iframe").contentDocument.body.innerHTML = iframHaveThisCode + "<style>" + typer + "</style>"
                        // typerCss.scrollTop = 9999999
                },
                afterComplete: function(instance) {
                    // preparCss()
                },
            }).type(css)
            .go()
    });
}
// Javascript
function javascript() {
    getdata("script.js").then(jss => {
        let iframHaveThisCode = iframe.contentDocument.body.innerHTML
        new TypeIt("#typerjs", {
                cursor: false,
                speed: 50,
                waitUntilVisible: true,
                afterStep: function(instance) {
                    Prism.highlightElement(typerjs)
                    let typer = typerjs.innerText
                    evalContent = typer
                    iframe.contentDocument.body.innerHTML = iframHaveThisCode + "<script>" + typer + "</script>"
                },
                afterComplete: function(instance) {
                    iframe.contentWindow.eval(evalContent)
                    console.log("done")
                },
            }).type(jss)
            .go()
    });
}