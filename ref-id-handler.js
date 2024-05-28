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
    const refId = getQueryParam('ref_id');
    if (refId) {
        const existingCookie = getCookie('ref_id');
        if (!existingCookie) {
            setCookie('ref_id', refId, 30); // Set cookie for 30 days
        }
    }
}

// Function to set ref_id value in the form's hidden field
function setRefIdInForm() {
    const refId = getCookie('ref_id');
    if (refId) {
        const form = document.getElementById('wf-form-Lead-Form'); // Using the provided form ID
        if (form) {
            const hiddenField = form.querySelector('input[name="ref_id"]');
            if (hiddenField) {
                hiddenField.value = refId;
            }
        }
    }
}

// Run the functions on page load
window.onload = function() {
    checkAndSetRefIdCookie();
    setRefIdInForm();
};
