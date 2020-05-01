(() => {
    grabLocation();
    window.onhashchange = () => {
        if (window.location.href.indexOf('#') == -1 || window.location.href === window.location.origin + window.location.pathname)
            window.location = window.location.origin + window.location.pathname;
        else
            grabLocation();
    };
    document.getElementById('goIcon').onclick = () => {
        let repoUrl = document.getElementById("search").value;
        repoUrl && (window.location = window.location.origin + window.location.pathname + "#" + repoUrl);
    };
    document.getElementById('backToHome').onclick = () => {
        window.location = window.location.origin + window.location.pathname;
    };
    document.getElementById("search").onkeypress = (e) => {
        if (e.which == 13) {
            e.preventDefault();
            document.getElementById('goIcon').click();
        }
    };
    document.getElementById("search").onfocus = () => {
        document.querySelector('.search-box').classList.add("border-searching");
        document.querySelector('.search-icon').classList.add("si-rotate");
    };
    document.getElementById("search").onblur = () => {
        document.querySelector('.search-box').classList.remove("border-searching");
        document.querySelector('.search-icon').classList.remove("si-rotate");
    };
    document.getElementById("search").onkeyup = (e) => {
        if (e.target.value.length > 0)
            document.getElementById('goIcon').classList.add("go-in");
        else
            document.getElementById('goIcon').classList.remove("go-in");
    };
})("docReady", window);

function grabLocation() {
    let repoUrl = getRepoUrl(), repoName;
    repoUrl && (repoName = getRepoName(repoUrl));
    repoName && renderPage(repoName);
}
function getRepoUrl() {
    let repoUrl, locationSplits = window.location.href.split('#');
    if (locationSplits.length > 1 && locationSplits[1] !== "")
        repoUrl = locationSplits[1];
    return repoUrl;
}
function getRepoName(repoUrl) {
    let repoName, gitSplits = repoUrl.split('https://github.com/')[1];
    gitSplits && (repoName = gitSplits.split('/').slice(0, 2).join('/'));
    return repoName;
}
function renderPage(repo) {
    document.querySelector('.search-box').classList.add("d-none");
    document.querySelector('.loading').classList.remove("d-none");
    fetch("https://raw.githubusercontent.com/" + repo + "/master/README.md").then(handleErrors)
        .then((markdown) => {
            fetch("https://api.github.com/markdown", { method: 'POST', body: JSON.stringify({ text: markdown }) }).then(handleErrors)
                .then((response) => {
                    document.querySelector('.errorPage').classList.add("d-none");
                    document.querySelector('.loading').classList.add("d-none");
                    document.querySelector('.render-page').classList.remove("d-none");
                    document.getElementById("renderContent").innerHTML = response;
                }).catch((e) => {
                    document.querySelector('.search-page').classList.add("d-none");
                    document.querySelector('.render-page').classList.add("d-none");
                    document.querySelector('.errorPage').classList.remove("d-none");
                });
        })
        .catch((e) => {
            document.querySelector('.search-page').classList.add("d-none");
            document.querySelector('.render-page').classList.add("d-none");
            document.querySelector('.errorPage').classList.remove("d-none");
        });
}
function handleErrors(response) {
    if (!response.ok)
        throw Error(response.statusText);
    return response.text();
}