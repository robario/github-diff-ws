// ==UserScript==
// @match https://github.com/*/*/commit/*
// ==/UserScript==
(function() {
    var toc = document.getElementById('toc');
    if (!toc) {
        return;
    }

    var updateUI = function(toc) {
        var a = document.createElement('a');
        a.setAttribute('class', 'minibutton');
        if (/[&?]w=/.test(location.search)) {
            a.innerText = 'Cognize WS';
            a.onclick = function() {
                var search = location.search.replace(/[&?]w=/g, '');
                if (search) {
                    location.search = search;
                } else {
                    location.href = location.pathname + location.hash;
                }
            };
        } else {
            a.innerText = 'Ignore WS';
            a.onclick = function() {
                location.search += location.search ? '&w=' : '?w=';
            };
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
