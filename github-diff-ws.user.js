// ==UserScript==
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
        a.setAttribute('class', 'minibutton');
        var search = location.search.replace(/[&?]w=1(&|$)/g, '$1').replace(/^&/, '?');
        if (search == location.search) {
            a.innerText = 'Ignore WS';
            search += (search ? '&' : '?') + 'w=1';
        } else {
            a.innerText = 'Cognize WS';
        }
        a.onclick = function() {
            location.href = location.protocol + '//' + location.host + location.pathname + search + location.hash;
        }
        toc.getElementsByClassName('explain')[0].insertBefore(a, toc.getElementsByClassName('show-diff-stats')[0]);
    };

    document.getElementById('js-repo-pjax-container').addEventListener('DOMNodeInserted', function(event) {
        if (event.target.id == 'toc') {
            updateUI(event.target);
        }
    }, false);
    updateUI(toc);
})();
