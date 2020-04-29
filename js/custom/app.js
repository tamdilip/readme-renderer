$(document).ready(function () {
    grabLocation();
    $(window).on('hashchange', function (e) {
        if (window.location.href.indexOf('#') == -1 || window.location.href === window.location.origin + window.location.pathname)
            window.location = window.location.origin;
        else
            grabLocation();
    });
    $(".goIcon").click(function () {
        var repoUrl = $('#search').val();
        repoUrl && (window.location = window.location.origin + "#" + repoUrl);
    });
    $(".backToHome").click(function () {
        window.location = window.location.origin;
    });
});

function grabLocation() {
    var repoUrl = getRepoUrl(), repoName;
    repoUrl && (repoName = getRepoName(repoUrl));
    repoName && renderPage(repoName);
}
function getRepoUrl() {
    var repoUrl;
    var locationSplits = window.location.href.split('#');
    if (locationSplits.length > 1 && locationSplits[1] !== "")
        repoUrl = locationSplits[1];
    return repoUrl;
}
function getRepoName(repoUrl) {
    var gitSplits = repoUrl.split('https://github.com/')[1], repoName;
    gitSplits && (repoName = gitSplits.split('/').slice(0, 2).join('/'));
    return repoName;
}
function renderPage(repo) {
    $(".search-box").addClass("d-none");
    $(".loading").removeClass("d-none");
    $.ajax({
        url: "https://raw.githubusercontent.com/" + repo + "/master/README.md", success: function (markdownContent) {
            $.post("https://api.github.com/markdown",
                JSON.stringify({ text: markdownContent }),
                function (data) {
                    $(".loading").addClass("d-none");
                    $(".render-page").removeClass("d-none");
                    $("#renderContent").html(data);
                });
        }, error: function () {
            $(".search-page").addClass("d-none");
            $(".render-page").addClass("d-none");
            $(".errorPage").removeClass("d-none");
        }
    });
}
