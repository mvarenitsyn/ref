// Log a message to indicate that the script is loaded
console.log("ref-id-handler.js script loaded");

// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Main function to check and set the cookie
function checkAndSetRefIdCookie() {
    console.log("checkAndSetRefIdCookie called");
    const refId = getQueryParam('ref_id');
    console.log('ref_id from URL:', refId); // Debugging statement
    if (refId) {
        const existingCookie = getCookie('ref_id');
        console.log('Existing cookie:', existingCookie); // Debugging statement
        if (!existingCookie) {
            setCookie('ref_id', refId, 30); // Set cookie for 30 days
            console.log('Cookie set:', document.cookie); // Debugging statement
        }
    }
}

// Function to set ref_id value in the form's hidden field
function setRefIdInForm() {
    console.log("setRefIdInForm called");
    const refId = getCookie('ref_id');
    console.log('ref_id from cookie:', refId); // Debugging statement
    if (refId) {
        const form = document.getElementById('wf-form-Lead-Form'); // Using the provided form ID
        if (form) {
            console.log('Form found:', form); // Debugging statement
            const hiddenField = form.querySelector('input[name="Ref_id"]');
            if (hiddenField) {
                console.log('Hidden field found:', hiddenField); // Debugging statement
                hiddenField.value = refId;
                console.log('Hidden field value set:', hiddenField.value); // Debugging statement
            } else {
                console.log('Hidden field not found'); // Debugging statement
            }
        } else {
            console.log('Form not found'); // Debugging statement
        }
    }
}

// Run the functions on page load
window.onload = function() {
    console.log("window.onload called");
    checkAndSetRefIdCookie();
    setRefIdInForm();
};
