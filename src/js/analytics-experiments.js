var experiments = {
    "-5jgBCpwTBGL2Rl44bDygw": [
        function () {
            console.log('Control'),
                ga("set", "dimensionX", "GTM-001_Control"),
                ga("send", "event", "AB-test", "GTM-001 Name of the test", "Control", {nonInteraction: 1});
        },
        function () {
            document.getElementById('optin').checked = true;
            console.log('Variation 1'),
                ga("set", "dimensionX", "GTM-001_Variation_1"),
                ga("send", "event", "AB-test", "GTM-001 Name of the test", "Variation 1", {nonInteraction: 1});
        }
    ]
};

function getExperiment() {
    var acksinExp = localStorage.getItem("acksinExperiments");

    // Get a new experiment
    if (acksinExp == null) {
        var expKeys = Object.keys(experiments);
        acksinExp = expKeys[Math.floor(Math.random() * expKeys.length)];

        localStorage.setItem("acksinExperiments", acksinExp);
        return acksinExp;
    }

    // Check if experiment is still running, if it is get it.
    if (acksinExp in experiments) {
        return acksinExp;
    }

    // Remove the existing experiment and recurse so we can get the new experiment.
    localStorage.removeItem("acksinExperiments");
    return getExperiment();
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

<!-- Force variation by URL argument -->
var varID = getParameterByName('var');
var chosenVariation = null;

if (!varID) {
    chosenVariation = cxApi.chooseVariation();
}
else {
    chosenVariation = varID;
}

$.getScript("https://www.google-analytics.com/cx/api.js?experiment=" + getExperiment(), function () {
    experiments[getExperiment()][chosenVariation]();
});