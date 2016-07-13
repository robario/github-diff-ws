// ==UserScript==
// @name github-diff-ws.user.js
// @namespace http://www.robario.com/
// @version 0.3.1
// @author robario <webmaster@robario.com>
// @description Add a button to be able to toggle whitespace ignoring.
// @updateURL https://raw.githubusercontent.com/robario/github-diff-ws/master/github-diff-ws.user.js
// @match https://github.com/*
// @grant none
// ==/UserScript==
(function() {
    var updateUI = function() {
        var a = document.createElement('a');
        if (location.pathname.match(new RegExp('^/.+?/.+?/(?:commit|compare)/'))) {
            if (document.getElementById('ignore-ws-btn')) {
                return;
            }
            var toc = document.getElementById('toc');
            if (!toc) {
                return;
            }
            a.id = 'ignore-ws-btn';
            a.className = 'btn btn-sm';
            toc.getElementsByClassName('btn-group')[0].appendChild(a);
        } else if (location.pathname.match(new RegExp('^/.+?/.+?/pull/.+?/(?:commits/.+|files)'))) {
            if (document.getElementById('ignore-ws-dropdown-item')) {
                return;
            }
            var files_bucket = document.getElementById('files_bucket');
            if (!files_bucket) {
                return;
            }
            a.id = 'ignore-ws-dropdown-item';
            a.className = 'dropdown-item';
            files_bucket
                .getElementsByClassName('diff-options-content')[0]
                .getElementsByClassName('dropdown-menu')[0]
                .appendChild(a);
        } else {
            return;
        }
        a.innerText = 'Ignore WS';
        var search = location.search.replace(/[&?]w=1(&|$)/g, '$1').replace(/^&/, '?');
        if (search == location.search) {
            search += (search ? '&' : '?') + 'w=1';
        } else {
            a.className += ' selected';
            if (a.id === 'ignore-ws-dropdown-item') {
                var div = document.createElement('div');
                div.innerHTML = '<svg aria-hidden="true" class="octicon octicon-check" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>';
                a.insertBefore(div.firstChild, a.firstChild);
            }
        }
        a.onclick = function() {
            location.href = location.protocol + '//' + location.host + location.pathname + search + location.hash;
        };
    };

    document.addEventListener('pjax:end', updateUI, false);
    updateUI();
})();
