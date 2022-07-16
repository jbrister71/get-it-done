var issuesContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayIssues(data);

                if(response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        }
        else {
            alert("There was a problem with your request!");
        }
    });
};

var displayIssues = function(issues) {
    if(issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issuesEl = document.createElement("a");
        issuesEl.classList = "list-item flex-row justify-space-between align-center";
        issuesEl.setAttribute("href", issues[i].html_url);
        issuesEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issuesEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if(issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issuesEl.appendChild(typeEl);

        issuesContainerEl.appendChild(issuesEl);
    }
};

var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    limitWarningEl.appendChild(linkEl);
};

getRepoIssues("4ian/GDevelop");