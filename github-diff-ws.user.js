// ==UserScript==
// @name github-diff-ws.user.js
// @namespace http://www.robario.com/
// @version 0.4.2
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
            a.className = 'btn btn-sm BtnGroup-item';
            toc.getElementsByClassName('BtnGroup')[0].appendChild(a);
        } else if (location.pathname.match(new RegExp('^/.+?/.+?/pull/.+?/(?:commits/.+|files)'))) {
            // hide contents of deleted files
            var jsFiles = document.getElementsByClassName('js-file');
            var changeEvent = new Event('change');
            for (var i = 0; i < jsFiles.length; ++i) {
                if (jsFiles[i].getElementsByClassName('show-file-contents').length) {
                    continue;
                }
                var diffstat = jsFiles[i].getElementsByClassName('diffstat')[0];
                if (!/0 additions & (\d+) deletions/.test(jsFiles[i].getElementsByClassName('diffstat')[0].getAttribute('aria-label'))) {
                    continue;
                }
                if (RegExp.$1 !== jsFiles[i].querySelector('.diff-table tr:last-child td').getAttribute('data-line-number')) {
                    continue;
                }
                var notesAction = jsFiles[i].getElementsByClassName('show-file-notes')[0];
                var contentsAction = notesAction.cloneNode(true);
                contentsAction.classList.remove('show-file-notes');
                contentsAction.classList.add('show-file-contents');
                contentsAction.style.display = 'inline';

                var contentsActionInput = contentsAction.getElementsByTagName('input')[0];
                contentsActionInput.classList.remove('js-toggle-file-notes');
                contentsActionInput.classList.add('js-toggle-file-contents');
                contentsActionInput.nextSibling.nodeValue = 'Show deleted file contents';
                contentsActionInput.addEventListener('change', (function (jsFileContent) {
                    return function () {
                        jsFileContent.style.display = this.checked ? 'block' : 'none';
                    };
                })(jsFiles[i].getElementsByClassName('js-file-content')[0]), false);
                contentsActionInput.removeAttribute('checked');
                contentsActionInput.dispatchEvent(changeEvent);

                notesAction.parentElement.insertBefore(contentsAction, notesAction);
            }

            if (document.getElementById('ignore-ws-dropdown-item')) {
                return;
            }
            var files_bucket = document.getElementById('files_bucket');
            if (!files_bucket) {
                return;
            }
            a.id = 'ignore-ws-dropdown-item';
            a.className = 'btn btn-sm btn-outline BtnGroup-item';
            files_bucket
                .getElementsByClassName('BtnGroup')[0]
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

    // https://github.com/defunkt/jquery-pjax
    document.addEventListener('pjax:end', updateUI, false);
    var observer = new MutationObserver(function (mutations) {
        for (var i = 0; i < mutations.length; ++i) {
            if (mutations[i].type === 'childList' && 0 < mutations[i].addedNodes.length) {
                updateUI();
                break;
            }
        }
    });
    observer.observe(document.getElementById('js-repo-pjax-container'),
                     {
                         attributes: true,
                         characterData: true,
                         childList: true,
                         subtree: true,
                     });
})();
