import AnlibreedersUtility from './utilities/anlibreeders.utility'

const utility = new AnlibreedersUtility();

class AnlibreedersSignUp {
    loadAnlibreedersSignUp() {
        const loadSignUp = {

            signUp: function () {

                let $signUpPinForm = $("#sign-up-pin-form");
                let $signUpPinInput = $signUpPinForm.find("#signUpPin");

                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);

                if (urlParams.has('pin')) {
                    $signUpPinInput.val(urlParams.get('pin'));
                }

                $("body").on("click", "#sign-up-form #sign-up-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let signUpFormData;

                    $.ajax({
                        type: "POST",
                        url: "/_sign-up",
                        contentType: "application/json",
                        data: JSON.stringify($("#sign-up-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("body").css({"filter": "grayscale(100%)"});
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            let statusCode = xhr['status'];
                            signUpFormData = result['message'];
                        },
                        complete: function (xhr, status) {

                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let $signUpForm = $("#sign-up-form");
                                let $signUpFormInputError = $("#sign-up-form .input-error");
                                $signUpFormInputError.each(function () {
                                    $(this).addClass("d-none");
                                    $(this).find("span").removeData("i18n");
                                    $(this).find("span").text("");
                                });

                                $signUpForm.find(".form-alert-danger").addClass("d-none");

                                setTimeout(
                                    function () {
                                        window.location.href = utility.getURL() + "/sign-up-pin?code=" + signUpFormData['code'];
                                    }, 1500);

                            }
                        },
                        error: function (xhr, status, error) {
                            setTimeout(
                                function () {
                                    let result = xhr['responseJSON']
                                    let statusCode = xhr['status'];

                                    if (statusCode === 400) {
                                        let $signUpForm = $("#sign-up-form");
                                        $signUpForm.find(".form-alert-danger").removeClass("d-none");

                                        if (result['message']['message']['email']) {
                                            $signUpForm.find(".sign-up-email-error span").removeData("i18n");
                                            $signUpForm.find(".sign-up-email-error span").text("");
                                            $signUpForm.find(".sign-up-email-error span").attr("data-i18n", result['message']['message']['email']);
                                            $signUpForm.find(".sign-up-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $signUpForm.find(".sign-up-email-error span").removeData("i18n");
                                            $signUpForm.find(".sign-up-email-error span").text("");
                                            $signUpForm.find(".sign-up-email-error").addClass("d-none");
                                            $('body').i18n();
                                        }
                                    }
                                    //$("body").css({"filter": "grayscale(0%)"});
                                    $("#post-loader").toggleClass("inactive active");
                                    $("body").removeAttr("style");
                                    _this.attr('disabled', false);
                                    _this.removeClass("action");
                                }, 1500);
                        }
                    });
                });
            },

            signUpPin: function () {
                $("body").on("click", "#sign-up-pin-form #sign-up-pin-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let signUpPinFormData;

                    $.ajax({
                        type: "POST",
                        url: "/_sign-up-pin",
                        contentType: "application/json",
                        data: JSON.stringify($("#sign-up-pin-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("body").css({"filter": "grayscale(100%)"});
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            let statusCode = xhr['status'];
                            signUpPinFormData = result['message'];
                        },
                        complete: function (xhr, status) {

                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let $signUpPinForm = $("#sign-up-pin-form");
                                let $signUpPinFormInputError = $("#sign-up-pin-form .input-error");

                                $signUpPinFormInputError.each(function () {
                                    $(this).addClass("d-none");
                                    $(this).find("span").removeData("i18n");
                                    $(this).find("span").text("");
                                });

                                $signUpPinForm.find(".form-alert-danger").addClass("d-none");

                                setTimeout(
                                    function () {
                                        window.location.href = utility.getURL() + "/sign-up-data?code=" + signUpPinFormData['code'];
                                    }, 1500);

                            }
                        },
                        error: function (xhr, status, error) {
                            setTimeout(
                                function () {
                                    let result = xhr['responseJSON']
                                    let statusCode = xhr['status'];

                                    if (statusCode === 400) {
                                        let $signUpPinForm = $("#sign-up-pin-form");
                                        $signUpPinForm.find(".form-alert-danger").removeClass("d-none");

                                        if (result['message']['message']['email']) {
                                            $signUpPinForm.find(".sign-up-email-error span").removeData("i18n");
                                            $signUpPinForm.find(".sign-up-email-error span").text("");
                                            $signUpPinForm.find(".sign-up-email-error span").attr("data-i18n", result['message']['message']['email']);
                                            $signUpPinForm.find(".sign-up-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $signUpPinForm.find(".sign-up-email-error span").removeData("i18n");
                                            $signUpPinForm.find(".sign-up-email-error span").text("");
                                            $signUpPinForm.find(".sign-up-email-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['pin']) {
                                            $signUpPinForm.find(".sign-up-pin-error span").removeData("i18n");
                                            $signUpPinForm.find(".sign-up-pin-error span").text("");
                                            $signUpPinForm.find(".sign-up-pin-error span").attr("data-i18n", result['message']['message']['pin']);
                                            $signUpPinForm.find(".sign-up-pin-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $signUpPinForm.find(".sign-up-pin-error span").removeData("i18n");
                                            $signUpPinForm.find(".sign-up-pin-error span").text("");
                                            $signUpPinForm.find(".sign-up-pin-error").addClass("d-none");
                                            $('body').i18n();
                                        }
                                    }
                                    //$("body").css({"filter": "grayscale(0%)"});
                                    $("#post-loader").toggleClass("inactive active");
                                    $("body").removeAttr("style");
                                    _this.attr('disabled', false);
                                    _this.removeClass("action");
                                }, 1500);
                        }
                    });
                });
            },

            signUpData: function () {

                $("body").on("click", "#sign-up-data-form .input-group-text.password.plus-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const $eyeIcon = $("#sign-up-data-form .input-group-text.password.eye-icon")

                    let $passwordInput = $("#sign-up-data-form #signUpPassword");
                    let $passwordConfirmInput = $("#sign-up-data-form #signUpPasswordConfirm");

                    let getRandomPassword = utility.getRandomPassword();

                    $passwordInput.attr("type", "text");
                    $passwordInput.val(getRandomPassword);

                    $passwordConfirmInput.attr("type", "text");
                    $passwordConfirmInput.val(getRandomPassword);

                    $eyeIcon.removeClass("inactive").addClass("active");
                });

                $("body").on("click", "#sign-up-data-form .input-group-text.password.eye-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let $passwordInput = $("#sign-up-data-form #signUpPassword");
                    let $passwordConfirmInput = $("#sign-up-data-form #signUpPasswordConfirm");

                    if (_this.hasClass("inactive")) {
                        $passwordInput.attr("type", "text");
                        $passwordConfirmInput.attr("type", "text");
                    } else {
                        $passwordInput.attr("type", "password");
                        $passwordConfirmInput.attr("type", "password");
                    }
                    _this.toggleClass("inactive active")
                });

                $("input[class='privacy-checkbox']").checkbox({
                    // toggle: true
                });

                $("body").on("change", "#sign-up-data-form #signUpCheckboxPrivacy", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.is(':checked')) {
                        $("#sign-up-data-form #signUpPrivacy").val("True");
                    } else {
                        $("#sign-up-data-form #signUpPrivacy").val("False");
                    }

                });

                $("body").on("click", "#sign-up-data-form #sign-up-data-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let inputObject = $("#sign-up-data-form").serializeObject();
                    let userAgent = utility.getUserAgent();

                    inputObject['browser'] = userAgent['browser']
                    inputObject['os'] = userAgent['os']
                    inputObject['platform'] = userAgent['platform']

                    let signUpDataFormData;
                    $.ajax({
                        type: "POST",
                        url: "/_sign-up-data",
                        contentType: "application/json",
                        data: JSON.stringify(inputObject),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("body").css({"filter": "grayscale(100%)"});
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            let statusCode = xhr['status'];
                            signUpDataFormData = result['message'];
                        },
                        complete: function (xhr, status) {

                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let $signUpDataForm = $("#sign-up-data-form");
                                let $signUpDataFormInputError = $("#sign-up-data-form .input-error");

                                $signUpDataFormInputError.each(function () {
                                    $(this).addClass("d-none");
                                    $(this).find("span").removeData("i18n");
                                    $(this).find("span").text("");
                                });

                                $signUpDataForm.find(".form-alert-danger").addClass("d-none");

                                setTimeout(
                                    function () {
                                        window.location.href = utility.getURL() + "/billing-and-shipping-address";
                                    }, 1500);

                            }
                        },
                        error: function (xhr, status, error) {
                            setTimeout(
                                function () {
                                    let result = xhr['responseJSON']
                                    let statusCode = xhr['status'];

                                    if (statusCode === 400) {
                                        let $signUpDataForm = $("#sign-up-data-form");
                                        $signUpDataForm.find(".form-alert-danger").removeClass("d-none");

                                        if (result['message']['message']['email']) {
                                            $signUpDataForm.find(".sign-up-email-error span").removeData("i18n");
                                            $signUpDataForm.find(".sign-up-email-error span").text("");
                                            $signUpDataForm.find(".sign-up-email-error span").attr("data-i18n", result['message']['message']['email']);
                                            $signUpDataForm.find(".sign-up-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $signUpDataForm.find(".sign-up-email-error span").removeData("i18n");
                                            $signUpDataForm.find(".sign-up-email-error span").text("");
                                            $signUpDataForm.find(".sign-up-email-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['code']) {
                                            $signUpDataForm.find(".sign-up-email-error span").removeData("i18n");
                                            $signUpDataForm.find(".sign-up-email-error span").text("");
                                            $signUpDataForm.find(".sign-up-email-error span").attr("data-i18n", result['message']['message']['code']);
                                            $signUpDataForm.find(".sign-up-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $signUpDataForm.find(".sign-up-email-error span").removeData("i18n");
                                            $signUpDataForm.find(".sign-up-email-error span").text("");
                                            $signUpDataForm.find(".sign-up-email-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['username']) {
                                            $signUpDataForm.find(".sign-up-username-error span").removeData("i18n");
                                            $signUpDataForm.find(".sign-up-username-error span").text("");
                                            $signUpDataForm.find(".sign-up-username-error span").attr("data-i18n", result['message']['message']['username']);
                                            $signUpDataForm.find(".sign-up-username-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $signUpDataForm.find(".sign-up-username-error span").removeData("i18n");
                                            $signUpDataForm.find(".sign-up-username-error span").text("");
                                            $signUpDataForm.find(".sign-up-username-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['password']) {
                                            $signUpDataForm.find(".sign-up-password-error span").removeData("i18n");
                                            $signUpDataForm.find(".sign-up-password-error span").text("");
                                            $signUpDataForm.find(".sign-up-password-error span").attr("data-i18n", result['message']['message']['password']);
                                            $signUpDataForm.find(".sign-up-password-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $signUpDataForm.find(".sign-up-password-error span").removeData("i18n");
                                            $signUpDataForm.find(".sign-up-password-error span").text("");
                                            $signUpDataForm.find(".sign-up-password-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['password_confirm']) {
                                            $signUpDataForm.find(".sign-up-password-confirm-error span").removeData("i18n");
                                            $signUpDataForm.find(".sign-up-password-confirm-error span").text("");
                                            $signUpDataForm.find(".sign-up-password-confirm-error span").attr("data-i18n", result['message']['message']['password_confirm']);
                                            $signUpDataForm.find(".sign-up-password-confirm-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $signUpDataForm.find(".sign-up-password-confirm-error span").removeData("i18n");
                                            $signUpDataForm.find(".sign-up-password-confirm-error span").text("");
                                            $signUpDataForm.find(".sign-up-password-confirm-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['privacy']) {
                                            $signUpDataForm.find(".sign-up-privacy-error span").removeData("i18n");
                                            $signUpDataForm.find(".sign-up-privacy-error span").text("");
                                            $signUpDataForm.find(".sign-up-privacy-error span").attr("data-i18n", result['message']['message']['privacy']);
                                            $signUpDataForm.find(".sign-up-privacy-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $signUpDataForm.find(".sign-up-privacy-error span").removeData("i18n");
                                            $signUpDataForm.find(".sign-up-privacy-error span").text("");
                                            $signUpDataForm.find(".sign-up-privacy-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                    }
                                    //$("body").css({"filter": "grayscale(0%)"});
                                    $("#post-loader").toggleClass("inactive active");
                                    $("body").removeAttr("style");
                                    _this.attr('disabled', false);
                                    _this.removeClass("action");
                                }, 1500);
                        }
                    });

                });
            },

            initializ: function () {
                loadSignUp.signUp()
                loadSignUp.signUpPin();
                loadSignUp.signUpData();
            }

        };

        $(function () {
            loadSignUp.initializ()
        });
    }
}

export let anlibreedersSignUp = new AnlibreedersSignUp();