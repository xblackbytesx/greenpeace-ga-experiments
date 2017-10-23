var experiments = {
    "kiXvaD1bQgihHyOCZ-2Buw": [
        function () {
            console.log('Control');
        },
        function () {
            document.getElementById('optin').checked = true;
            console.log('Variation 1');
        }
    ]
};

function getExperiment() {
    var greenpeaceExp = localStorage.getItem("greenpeaceExperiments");

    // Get a new experiment
    if (greenpeaceExp == null) {
        var expKeys = Object.keys(experiments);
        greenpeaceExp = expKeys[Math.floor(Math.random() * expKeys.length)];

        localStorage.setItem("greenpeaceExperiments", greenpeaceExp);
        return greenpeaceExp;
    }

    // Check if experiment is still running, if it is get it.
    if (greenpeaceExp in experiments) {
        return greenpeaceExp;
    }

    // Remove the existing experiment and recurse so we can get the new experiment.
    localStorage.removeItem("greenpeaceExperiments");
    return getExperiment();
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$.getScript("https://www.google-analytics.com/cx/api.js?experiment=" + getExperiment(), function () {
    <!-- Force variation by URL argument -->
    var varID = getParameterByName('var');
    var chosenVariation = null;

    if (!varID) {
        chosenVariation = cxApi.chooseVariation();
    }
    else {
        chosenVariation = varID;
    }

    experiments[getExperiment()][chosenVariation]();
});