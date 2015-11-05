(function() {
    var expandScript = function($div, data) {
        $div.css({padding: '15px', border: 'solid 1px #aaa', borderRadius: '5px'});
        var page_url = $div.attr('data-url');
        if (page_url == 'this') {
            appendPage($div, data, true);
            return;
        }
        $.get(page_url, function(data) {
            appendPage($div, data, false);
        });
    };
    var appendPage = function($div, data, self) {
        if (self) {
            appendChildPages($div, data);
        } else {
            var $data = $(data);
            var $content = $data.find('div#main-content');
            $div.append($data.find('h1#title-text'));
            $div.append($content);
            expandScripts($content, data);
        }
        if (window.SyntaxHighlighter) {
            window.SyntaxHighlighter.highlight();
        }
    };
    var expandScripts = function($div, data) {
        $div.find('div.w-child-pages').each(function(){
            expandScript($(this), data);
        });
    };
    var appendChildPages = function($div, data) {
        $(data).find('li.child-item').each(function() {
            var $content = $('<div>').css({marginBottom: '10px'});;
            $div.append($content);
            $.get($(this).find('a').attr('href'), function(data) {
                appendPage($content, data, false);
            });
        });
    };
    var scriptTags = document.getElementsByTagName('script');
    var $div = $(scriptTags[scriptTags.length - 1]).prev();
    $(function(){
        if (location.pathname != '/pages/viewpage.action') {
            return;
        }
        expandScript($div, $('html')[0].outerHTML);
    });
})();
