var optinCheckbox = document.querySelector('#optin');
optinCheckbox.checked = true;

ga("set", "ab_optin", "var_optin-checked");
ga("send", "event", "AB-test", "optin", "Control", {nonInteraction: 1});