import AnlibreedersUtility from './utilities/anlibreeders.utility'

const utility = new AnlibreedersUtility();

class AnlibreedersPasswordReset {
    loadAnlibreedersPasswordReset() {
        const loadPasswordReset = {

            passwordReset: function () {

                let $passwordResetPinForm = $("#password-reset-pin-form");
                let $passwordResetPinInput = $passwordResetPinForm.find("#passwordResetPin");

                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);

                if (urlParams.has('pin')) {
                    $passwordResetPinInput.val(urlParams.get('pin'));
                }

                $("body").on("click", "#password-reset-form #password-reset-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let passwordResetFormData;

                    $.ajax({
                        type: "POST",
                        url: "/_password-reset",
                        contentType: "application/json",
                        data: JSON.stringify($("#password-reset-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("body").css({"filter": "grayscale(100%)"});
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            let statusCode = xhr['status'];
                            passwordResetFormData = result['message'];
                        },
                        complete: function (xhr, status) {

                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let $passwordResetForm = $("#password-reset-form");
                                let $passwordResetFormInputError = $("#password-reset-form .input-error");
                                $passwordResetFormInputError.each(function () {
                                    $(this).addClass("d-none");
                                    $(this).find("span").removeData("i18n");
                                    $(this).find("span").text("");
                                });

                                $passwordResetForm.find(".form-alert-danger").addClass("d-none");

                                setTimeout(
                                    function () {
                                        window.location.href = utility.getURL() + "/password-reset-pin?code=" + passwordResetFormData['code'];
                                    }, 1500);

                            }
                        },
                        error: function (xhr, status, error) {
                            setTimeout(
                                function () {
                                    let result = xhr['responseJSON']
                                    let statusCode = xhr['status'];

                                    if (statusCode === 400) {
                                        let $passwordResetForm = $("#password-reset-form");
                                        $passwordResetForm.find(".form-alert-danger").removeClass("d-none");

                                        if (result['message']['message']['email']) {
                                            $passwordResetForm.find(".password-reset-email-error span").removeData("i18n");
                                            $passwordResetForm.find(".password-reset-email-error span").text("");
                                            $passwordResetForm.find(".password-reset-email-error span").attr("data-i18n", result['message']['message']['email']);
                                            $passwordResetForm.find(".password-reset-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $passwordResetForm.find(".password-reset-email-error span").removeData("i18n");
                                            $passwordResetForm.find(".password-reset-email-error span").text("");
                                            $passwordResetForm.find(".password-reset-email-error").addClass("d-none");
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

            passwordResetPin: function () {

                $("body").on("click", "#password-reset-pin-form #password-reset-pin-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let passwordResetPinFormData;

                    $.ajax({
                        type: "POST",
                        url: "/_password-reset-pin",
                        contentType: "application/json",
                        data: JSON.stringify($("#password-reset-pin-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("body").css({"filter": "grayscale(100%)"});
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            let statusCode = xhr['status'];
                            passwordResetPinFormData = result['message'];
                        },
                        complete: function (xhr, status) {

                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let $passwordResetPinForm = $("#password-reset-pin-form");
                                let $passwordResetPinFormInputError = $("#password-reset-pin-form .input-error");

                                $passwordResetPinFormInputError.each(function () {
                                    $(this).addClass("d-none");
                                    $(this).find("span").removeData("i18n");
                                    $(this).find("span").text("");
                                });

                                $passwordResetPinForm.find(".form-alert-danger").addClass("d-none");

                                setTimeout(
                                    function () {
                                        window.location.href = utility.getURL() + "/password-reset-data?code=" + passwordResetPinFormData['code'];
                                    }, 1500);

                            }
                        },
                        error: function (xhr, status, error) {
                            setTimeout(
                                function () {
                                    let result = xhr['responseJSON']
                                    let statusCode = xhr['status'];

                                    if (statusCode === 400) {
                                        let $passwordResetPinForm = $("#password-reset-pin-form");
                                        $passwordResetPinForm.find(".form-alert-danger").removeClass("d-none");

                                        if (result['message']['message']['email']) {
                                            $passwordResetPinForm.find(".password-reset-email-error span").removeData("i18n");
                                            $passwordResetPinForm.find(".password-reset-email-error span").text("");
                                            $passwordResetPinForm.find(".password-reset-email-error span").attr("data-i18n", result['message']['message']['email']);
                                            $passwordResetPinForm.find(".password-reset-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $passwordResetPinForm.find(".password-reset-email-error span").removeData("i18n");
                                            $passwordResetPinForm.find(".password-reset-email-error span").text("");
                                            $passwordResetPinForm.find(".password-reset-email-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['pin']) {
                                            $passwordResetPinForm.find(".password-reset-pin-error span").removeData("i18n");
                                            $passwordResetPinForm.find(".password-reset-pin-error span").text("");
                                            $passwordResetPinForm.find(".password-reset-pin-error span").attr("data-i18n", result['message']['message']['pin']);
                                            $passwordResetPinForm.find(".password-reset-pin-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $passwordResetPinForm.find(".password-reset-pin-error span").removeData("i18n");
                                            $passwordResetPinForm.find(".password-reset-pin-error span").text("");
                                            $passwordResetPinForm.find(".password-reset-pin-error").addClass("d-none");
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

            passwordResetData: function () {

                $("body").on("click", "#password-reset-data-form .input-group-text.password.plus-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const $eyeIcon = $("#password-reset-data-form .input-group-text.password.eye-icon")

                    let $passwordInput = $("#password-reset-data-form #passwordResetPassword");
                    let $passwordConfirmInput = $("#password-reset-data-form #passwordResetPasswordConfirm");

                    let getRandomPassword = utility.getRandomPassword();

                    $passwordInput.attr("type", "text");
                    $passwordInput.val(getRandomPassword);

                    $passwordConfirmInput.attr("type", "text");
                    $passwordConfirmInput.val(getRandomPassword);

                    $eyeIcon.removeClass("inactive").addClass("active");
                });

                $("body").on("click", "#password-reset-data-form .input-group-text.password.eye-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let $passwordInput = $("#password-reset-data-form #passwordResetPassword");
                    let $passwordConfirmInput = $("#password-reset-data-form #passwordResetPasswordConfirm");

                    if (_this.hasClass("inactive")) {
                        $passwordInput.attr("type", "text");
                        $passwordConfirmInput.attr("type", "text");
                    } else {
                        $passwordInput.attr("type", "password");
                        $passwordConfirmInput.attr("type", "password");
                    }
                    _this.toggleClass("inactive active")
                });

                $("body").on("click", "#password-reset-data-form #password-reset-data-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let passwordResetDataFormData;
                    $.ajax({
                        type: "POST",
                        url: "/_password-reset-data",
                        contentType: "application/json",
                        data: JSON.stringify($("#password-reset-data-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("body").css({"filter": "grayscale(100%)"});
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            let statusCode = xhr['status'];
                            passwordResetDataFormData = result['message'];
                        },
                        complete: function (xhr, status) {

                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let $passwordResetDataForm = $("#password-reset-data-form");
                                let $passwordResetDataFormInputError = $("#password-reset-data-form .input-error");

                                $passwordResetDataFormInputError.each(function () {
                                    $(this).addClass("d-none");
                                    $(this).find("span").removeData("i18n");
                                    $(this).find("span").text("");
                                });

                                $passwordResetDataForm.find(".form-alert-danger").addClass("d-none");

                                setTimeout(
                                    function () {
                                        window.location.href = utility.getURL();
                                    }, 1500);

                            }
                        },
                        error: function (xhr, status, error) {
                            setTimeout(
                                function () {
                                    let result = xhr['responseJSON']
                                    let statusCode = xhr['status'];

                                    if (statusCode === 400) {
                                        let $passwordResetDataForm = $("#password-reset-data-form");
                                        $passwordResetDataForm.find(".form-alert-danger").removeClass("d-none");

                                        if (result['message']['message']['email']) {
                                            $passwordResetDataForm.find(".password-reset-email-error span").removeData("i18n");
                                            $passwordResetDataForm.find(".password-reset-email-error span").text("");
                                            $passwordResetDataForm.find(".password-reset-email-error span").attr("data-i18n", result['message']['message']['email']);
                                            $passwordResetDataForm.find(".password-reset-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $passwordResetDataForm.find(".password-reset-email-error span").removeData("i18n");
                                            $passwordResetDataForm.find(".password-reset-email-error span").text("");
                                            $passwordResetDataForm.find(".password-reset-email-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['code']) {
                                            $passwordResetDataForm.find(".password-reset-email-error span").removeData("i18n");
                                            $passwordResetDataForm.find(".password-reset-email-error span").text("");
                                            $passwordResetDataForm.find(".password-reset-email-error span").attr("data-i18n", result['message']['message']['code']);
                                            $passwordResetDataForm.find(".password-reset-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $passwordResetDataForm.find(".password-reset-email-error span").removeData("i18n");
                                            $passwordResetDataForm.find(".password-reset-email-error span").text("");
                                            $passwordResetDataForm.find(".password-reset-email-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['password']) {
                                            $passwordResetDataForm.find(".password-reset-password-error span").removeData("i18n");
                                            $passwordResetDataForm.find(".password-reset-password-error span").text("");
                                            $passwordResetDataForm.find(".password-reset-password-error span").attr("data-i18n", result['message']['message']['password']);
                                            $passwordResetDataForm.find(".password-reset-password-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $passwordResetDataForm.find(".password-reset-password-error span").removeData("i18n");
                                            $passwordResetDataForm.find(".password-reset-password-error span").text("");
                                            $passwordResetDataForm.find(".password-reset-password-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['password_confirm']) {
                                            $passwordResetDataForm.find(".password-reset-password-confirm-error span").removeData("i18n");
                                            $passwordResetDataForm.find(".password-reset-password-confirm-error span").text("");
                                            $passwordResetDataForm.find(".password-reset-password-confirm-error span").attr("data-i18n", result['message']['message']['password_confirm']);
                                            $passwordResetDataForm.find(".password-reset-password-confirm-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $passwordResetDataForm.find(".password-reset-password-confirm-error span").removeData("i18n");
                                            $passwordResetDataForm.find(".password-reset-password-confirm-error span").text("");
                                            $passwordResetDataForm.find(".password-reset-password-confirm-error").addClass("d-none");
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
                loadPasswordReset.passwordReset();
                loadPasswordReset.passwordResetPin();
                loadPasswordReset.passwordResetData();
            }

        };

        $(function () {
            loadPasswordReset.initializ()
        });
    }
}

export let anlibreedersPasswordReset = new AnlibreedersPasswordReset();