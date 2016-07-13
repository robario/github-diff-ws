// ==UserScript==
// @name github-diff-ws.user.js
// @namespace http://www.robario.com/
// @version 0.2.3
// @author robario <webmaster@robario.com>
// @description Add a button to be able to toggle whitespace ignoring.
// @updateURL https://raw.githubusercontent.com/robario/github-diff-ws/master/github-diff-ws.user.js
// @match https://github.com/*
// @grant none
// ==/UserScript==
(function() {
    var a;
    var updateUI = function() {
        if (a) {
            return;
        }
        var toc = document.getElementById('toc');
        if (!toc) {
            return;
        }
        if (!location.pathname.match(new RegExp('^/.+?/.+?/(?:commit|compare)/'))) {
            return;
        }
        a = document.createElement('a');
        a.innerText = 'Ignore WS';
        a.className = 'btn btn-sm';
        var search = location.search.replace(/[&?]w=1(&|$)/g, '$1').replace(/^&/, '?');
        if (search == location.search) {
            search += (search ? '&' : '?') + 'w=1';
        } else {
            a.className += ' selected';
        }
        a.onclick = function() {
            location.href = location.protocol + '//' + location.host + location.pathname + search + location.hash;
        };
        toc.getElementsByClassName('btn-group')[0].appendChild(a);
    };

    document.addEventListener('pjax:end', updateUI, false);
    updateUI();
})();
