var input = document.querySelector(".contact");
window.intlTelInput(input, {
    allowDropdown: true,
    autoHideDialCode: false,
    autoPlaceholder: "off",
    // dropdownContainer: document.body,
    // excludeCountries: ["us"],
    // formatOnDisplay: false,
    geoIpLookup: function(callback) {
        $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
        });
    },
    hiddenInput: "full_number",
    // initialCountry: "auto",
    // localizedCountries: { 'de': 'Deutschland' },
    nationalMode: false,
    // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
    placeholderNumberType: "MOBILE",
    // preferredCountries: ['cn', 'jp'],
    separateDialCode: true,
    utilsScript: "/build/js/utils.js",
});


jQuery(document).ready(function($) {

    $('.editBtn').click(function() {
        $(this).attr('hidden', true);
        $('input').removeAttr('disabled');
        $('.updateProfile').removeAttr('hidden');
    });

    $('.password').focusout(function() {
        let password = $(this).val().trim();
        if (password.length < 6) {
            $('.password_error').removeAttr('hidden');
        } else {
            $('.password_error').attr('hidden', true);
        }
    });

    $('.confirm_password').focusout(function() {
        let confirm_val = $(this).val().trim();
        let password = $('.password').val().trim();
        if (confirm_val !== password) {
            $('.confirm_password_error').removeAttr('hidden');
        } else {
            $('.confirm_password_error').attr('hidden', true);
        }
    });

});