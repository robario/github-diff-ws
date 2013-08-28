// ==UserScript==
// @match https://github.com/*/*/commit/*
// ==/UserScript==
(function() {
    var toc = document.getElementById('toc');
    if (!toc) {
        return;
    }
    var a = document.createElement('a');
    a.innerText = 'Ignore WS';
    a.setAttribute('class', 'minibutton');
    a.onclick = function() {
        location.search += location.search ? '&w=' : '?w=';
    };
    toc.getElementsByClassName('explain')[0].insertBefore(a, toc.getElementsByClassName('show-diff-stats')[0]);
})();
