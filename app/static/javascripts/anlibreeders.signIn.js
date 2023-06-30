import AnlibreedersUtility from './utilities/anlibreeders.utility'

const utility = new AnlibreedersUtility();

class AnlibreedersSignIn {
    loadAnlibreedersSignIn() {
        const loadSignIn = {

            signInIcon: function () {
                $("body").on("click", "#sign-in-form .input-group-text.password.eye-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let $passwordInput = $("#sign-in-form #signInPassword");

                    if (_this.hasClass("inactive")) {
                        $passwordInput.attr("type", "text");
                    } else {
                        $passwordInput.attr("type", "password");
                    }
                    _this.toggleClass("inactive active")
                });

                $("body").on("click", "#sign-in-form .input-group-text.clock-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let $RememberInput = $("#sign-in-form #signInRemember");
                    let $RememberInfo = $("#sign-in-form .rememberInfo");

                    $RememberInput.removeData("i18n");
                    $RememberInput.text("");

                    if (_this.hasClass("inactive")) {
                        $RememberInput.val("True");
                        $RememberInfo.data("i18n", "anlihouse-A39");
                        $RememberInfo.removeClass("text-secondary").addClass("text-success");
                    } else {
                        $RememberInput.val("False");
                        $RememberInfo.data("i18n", "anlihouse-A40");
                        $RememberInfo.removeClass("text-success").addClass("text-secondary");
                    }
                    _this.toggleClass("inactive active");
                    $('body').i18n();
                });

            },

            signIn: function () {
                $("body").on("click", "#sign-in-form #sign-in-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let inputObject = $("#sign-in-form").serializeObject();
                    let userAgent = utility.getUserAgent();

                    inputObject['browser'] = userAgent['browser']
                    inputObject['os'] = userAgent['os']
                    inputObject['platform'] = userAgent['platform']

                    let signInFormData;

                    $.ajax({
                        type: "POST",
                        url: "/_sign-in",
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
                            signInFormData = result['message'];
                        },
                        complete: function (xhr, status) {

                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let $sigInForm = $("#sign-in-form");
                                let $signInFormInputError = $("#sign-in-form .input-error");

                                $signInFormInputError.each(function () {
                                    $(this).addClass("d-none");
                                    $(this).find("span").removeData("i18n");
                                    $(this).find("span").text("");
                                });

                                $sigInForm.find(".form-alert-danger").addClass("d-none");

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
                                        let $signInForm = $("#sign-in-form");
                                        $signInForm.find(".form-alert-danger").removeClass("d-none");

                                        if (result['message']['message']['email']) {
                                            $signInForm.find(".sign-in-email-error span").removeData("i18n");
                                            $signInForm.find(".sign-in-email-error span").text("");
                                            $signInForm.find(".sign-in-email-error span").attr("data-i18n", result['message']['message']['email']);
                                            $signInForm.find(".sign-in-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $signInForm.find(".sign-in-email-error span").removeData("i18n");
                                            $signInForm.find(".sign-in-email-error span").text("");
                                            $signInForm.find(".sign-in-email-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['password']) {
                                            $signInForm.find(".sign-in-password-error span").removeData("i18n");
                                            $signInForm.find(".sign-in-password-error span").text("");
                                            $signInForm.find(".sign-in-password-error span").attr("data-i18n", result['message']['message']['password']);
                                            $signInForm.find(".sign-in-password-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $signInForm.find(".sign-in-password-error span").removeData("i18n");
                                            $signInForm.find(".sign-in-password-error span").text("");
                                            $signInForm.find(".sign-in-password-error").addClass("d-none");
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
                loadSignIn.signInIcon()
                loadSignIn.signIn();
            }

        };

        $(function () {
            loadSignIn.initializ()
        });
    }
}

export let anlibreedersSignIn = new AnlibreedersSignIn();