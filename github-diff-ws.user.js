// ==UserScript==
// @name github-diff-ws.user.js
// @namespace http://www.robario.com/
// @version 0.2.0
// @author robario <webmaster@robario.com>
// @description Add a button to be able to toggle whitespace ignoring.
// @updateURL https://raw.githubusercontent.com/robario/github-diff-ws/master/github-diff-ws.user.js
// @match https://github.com/*/*/commit/*
// @match https://github.com/*/*/compare/*
// @match https://github.com/*/*/pull/*/files*
// ==/UserScript==
(function() {
    var toc = document.getElementById('toc');
    if (!toc) {
        return;
    }

    var updateUI = function(toc) {
        var a = document.createElement('a');
        a.innerText = 'Ignore WS';
        a.className = 'minibutton';
        var search = location.search.replace(/[&?]w=1(&|$)/g, '$1').replace(/^&/, '?');
        if (search == location.search) {
            search += (search ? '&' : '?') + 'w=1';
        } else {
            a.className += ' selected';
        }
        a.onclick = function() {
            location.href = location.protocol + '//' + location.host + location.pathname + search + location.hash;
        };
        toc.getElementsByClassName('button-group')[0].appendChild(a);
    };

    document.getElementById('js-repo-pjax-container').addEventListener('DOMNodeInserted', function(event) {
        if (event.target.id == 'toc') {
            updateUI(event.target);
        }
    }, false);
    updateUI(toc);
})();
