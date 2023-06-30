import AnlibreedersUtility from './utilities/anlibreeders.utility'

const utility = new AnlibreedersUtility();

class AnlibreedersSecurity {
    loadAnlibreedersSecurity() {
        const loadSecurity = {

            password: function () {

                $("body").on("click", "#security-password-form .input-group-text.current-password.eye-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let $passwordInput = $("#security-password-form #securityCurrentPassword");

                    if (_this.hasClass("inactive")) {
                        $passwordInput.attr("type", "text");
                    } else {
                        $passwordInput.attr("type", "password");
                    }
                    _this.toggleClass("inactive active")
                });

                $("body").on("click", "#security-password-form .input-group-text.password.eye-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let $passwordInput = $("#security-password-form #securityPassword");
                    let $passwordConfirmInput = $("#security-password-form #securityPasswordConfirm");

                    if (_this.hasClass("inactive")) {
                        $passwordInput.attr("type", "text");
                        $passwordConfirmInput.attr("type", "text");
                    } else {
                        $passwordInput.attr("type", "password");
                        $passwordConfirmInput.attr("type", "password");
                    }
                    _this.toggleClass("inactive active")
                });

                $("body").on("click", "#security-password-form .input-group-text.password.plus-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const $eyeIcon = $("#security-password-form .input-group-text.password.eye-icon")

                    let $passwordInput = $("#security-password-form #securityPassword");
                    let $passwordConfirmInput = $("#security-password-form #securityPasswordConfirm");

                    let getRandomPassword = utility.getRandomPassword();

                    $passwordInput.attr("type", "text");
                    $passwordInput.val(getRandomPassword);

                    $passwordConfirmInput.attr("type", "text");
                    $passwordConfirmInput.val(getRandomPassword);

                    $eyeIcon.removeClass("inactive").addClass("active");
                });

                $("body").on("click", "#security-password-form #security-password-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let securityPasswordData;

                    $.ajax({
                        type: "POST",
                        url: "/_security-password",
                        contentType: "application/json",
                        data: JSON.stringify($("#security-password-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("body").css({"filter": "grayscale(100%)"});
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            let statusCode = xhr['status'];
                            securityPasswordData = result['message'];
                        },
                        complete: function (xhr, status) {

                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let $securityPasswordForm = $("#security-password-form");
                                let $securityPasswordFormInputError = $("#security-password-form .input-error");

                                $securityPasswordFormInputError.each(function () {
                                    $(this).addClass("d-none");
                                    $(this).find("span").removeData("i18n");
                                    $(this).find("span").text("");
                                });

                                $securityPasswordForm.find(".form-alert-danger").addClass("d-none");

                                setTimeout(
                                    function () {
                                        window.location.href = utility.getURL() + "/security";
                                    }, 1500);

                            }
                        },
                        error: function (xhr, status, error) {
                            setTimeout(
                                function () {
                                    let result = xhr['responseJSON']
                                    let statusCode = xhr['status'];

                                    if (statusCode === 400) {
                                        let $securityPasswordForm = $("#security-password-form");
                                        $securityPasswordForm.find(".form-alert-danger").removeClass("d-none");

                                        if (result['message']['message']['current_password']) {
                                            $securityPasswordForm.find(".security-current-password-error span").removeData("i18n");
                                            $securityPasswordForm.find(".security-current-password-error span").text("");
                                            $securityPasswordForm.find(".security-current-password-error span").attr("data-i18n", result['message']['message']['current_password']);
                                            $securityPasswordForm.find(".security-current-password-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $securityPasswordForm.find(".security-current-password-error span").removeData("i18n");
                                            $securityPasswordForm.find(".security-current-password-error span").text("");
                                            $securityPasswordForm.find(".security-current-password-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['password']) {
                                            $securityPasswordForm.find(".security-password-error span").removeData("i18n");
                                            $securityPasswordForm.find(".security-password-error span").text("");
                                            $securityPasswordForm.find(".security-password-error span").attr("data-i18n", result['message']['message']['password']);
                                            $securityPasswordForm.find(".security-password-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $securityPasswordForm.find(".security-password-error span").removeData("i18n");
                                            $securityPasswordForm.find(".security-password-error span").text("");
                                            $securityPasswordForm.find(".security-password-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['password_confirm']) {
                                            $securityPasswordForm.find(".security-password-confirm-error span").removeData("i18n");
                                            $securityPasswordForm.find(".security-password-confirm-error span").text("");
                                            $securityPasswordForm.find(".security-password-confirm-error span").attr("data-i18n", result['message']['message']['password_confirm']);
                                            $securityPasswordForm.find(".security-password-confirm-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $securityPasswordForm.find(".security-password-confirm-error span").removeData("i18n");
                                            $securityPasswordForm.find(".security-password-confirm-error span").text("");
                                            $securityPasswordForm.find(".security-password-confirm-error").addClass("d-none");
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

            email: function () {

                let $securityEmailForm = $("#security-email-form");
                let $securityEmailSecretKeyInput = $securityEmailForm.find("#securityEmailSecretKey");

                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);

                if (urlParams.has('secret-key')) {
                    $securityEmailSecretKeyInput.val(urlParams.get('secret-key'));
                }

                $("body").on("click", "#security-email-form #security-email-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let securityEmailData;

                    $.ajax({
                        type: "POST",
                        url: "/_security-email",
                        contentType: "application/json",
                        data: JSON.stringify($("#security-email-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("body").css({"filter": "grayscale(100%)"});
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            let statusCode = xhr['status'];
                            securityEmailData = result['message'];
                        },
                        complete: function (xhr, status) {

                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let $securityEmailForm = $("#security-email-form");
                                let $securityEmailFormInputError = $("#security-email-form .input-error");

                                $securityEmailFormInputError.each(function () {
                                    $(this).addClass("d-none");
                                    $(this).find("span").removeData("i18n");
                                    $(this).find("span").text("");
                                });

                                $securityEmailForm.find(".form-alert-danger").addClass("d-none");

                                setTimeout(
                                    function () {
                                        if (securityEmailData['payload']['sign-in'] === "True") {
                                            window.location.href = utility.getURL() + "/sign-in";
                                        } else {
                                            window.location.href = utility.getURL() + "/security";
                                        }
                                    }, 1500);

                            }
                        },
                        error: function (xhr, status, error) {
                            setTimeout(
                                function () {
                                    let result = xhr['responseJSON']
                                    let statusCode = xhr['status'];

                                    if (statusCode === 400) {
                                        let $securityEmailForm = $("#security-email-form");
                                        $securityEmailForm.find(".form-alert-danger").removeClass("d-none");

                                        if (result['message']['message']['user_email']) {
                                            $securityEmailForm.find(".security-user-email-error span").removeData("i18n");
                                            $securityEmailForm.find(".security-user-email-error span").text("");
                                            $securityEmailForm.find(".security-user-email-error span").attr("data-i18n", result['message']['message']['user_email']);
                                            $securityEmailForm.find(".security-user-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $securityEmailForm.find(".security-user-email-error span").removeData("i18n");
                                            $securityEmailForm.find(".security-user-email-error span").text("");
                                            $securityEmailForm.find(".security-user-email-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['check_email']) {
                                            $securityEmailForm.find(".security-check-email-error span").removeData("i18n");
                                            $securityEmailForm.find(".security-check-email-error span").text("");
                                            $securityEmailForm.find(".security-check-email-error span").attr("data-i18n", result['message']['message']['check_email']);
                                            $securityEmailForm.find(".security-check-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $securityEmailForm.find(".security-check-email-error span").removeData("i18n");
                                            $securityEmailForm.find(".security-check-email-error span").text("");
                                            $securityEmailForm.find(".security-check-email-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['email']) {
                                            $securityEmailForm.find(".security-email-error span").removeData("i18n");
                                            $securityEmailForm.find(".security-email-error span").text("");
                                            $securityEmailForm.find(".security-email-error span").attr("data-i18n", result['message']['message']['email']);
                                            $securityEmailForm.find(".security-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $securityEmailForm.find(".security-email-error span").removeData("i18n");
                                            $securityEmailForm.find(".security-email-error span").text("");
                                            $securityEmailForm.find(".security-email-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['secret_key']) {
                                            $securityEmailForm.find(".security-email-secret-key-error span").removeData("i18n");
                                            $securityEmailForm.find(".security-email-secret-key-error span").text("");
                                            $securityEmailForm.find(".security-email-secret-key-error span").attr("data-i18n", result['message']['message']['secret_key']);
                                            $securityEmailForm.find(".security-email-secret-key-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $securityEmailForm.find(".security-email-secret-key-error span").removeData("i18n");
                                            $securityEmailForm.find(".security-email-secret-key-error span").text("");
                                            $securityEmailForm.find(".security-email-secret-key-error").addClass("d-none");
                                            $('body').i18n();
                                        }
                                    }

                                    if (statusCode === 401) {
                                        let $securityEmailForm = $("#security-email-form");
                                        $securityEmailForm.find(".form-alert-danger").removeClass("d-none");

                                        let seconds = xhr['responseJSON']['message']['seconds'];
                                        let minutes = Math.floor(seconds / 60);
                                        if (result['message']['seconds']) {
                                            $securityEmailForm.find(".security-email-error span").removeData("i18n");
                                            $securityEmailForm.find(".security-email-error span").text("");
                                            $securityEmailForm.find(".security-email-error span").text($.i18n('anlihouse-A100', minutes));
                                            $securityEmailForm.find(".security-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $securityEmailForm.find(".security-email-error span").removeData("i18n");
                                            $securityEmailForm.find(".security-email-error span").text("");
                                            $securityEmailForm.find(".security-email-error").addClass("d-none");
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

            securityDeleteUser: function () {

                $("body").on("click", "#security-delete-user-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);
                    let $lock = _this.find(".delete-lock");
                    let $unlock = _this.find(".delete-unlock");

                    if ($unlock.hasClass("active")) {
                        $.ajax({
                            type: "POST",
                            url: "/_security-delete-user",
                            contentType: "application/json",
                            data: JSON.stringify($("#security-delete-user-form").serializeObject()),
                            beforeSend: function (xhr) {
                                _this.attr('disabled', true);
                                _this.addClass("action");
                                //$("body").addClass("filter-grayscale-100");
                                $("#post-loader").toggleClass("active inactive");
                                $("body").css({"overflow": "hidden"});
                            },
                            success: function (result, status, xhr) {
                            },
                            complete: function (xhr, status) {
                                let statusCode = xhr['status'];

                                if (statusCode === 200) {
                                    let $securityDeleteUserForm = $("#security-delete-user-form");
                                    let $securityDeleteUserFormInputError = $("#security-delete-user-form .input-error");

                                    $securityDeleteUserFormInputError.each(function () {
                                        $(this).addClass("d-none");
                                        $(this).find("span").removeData("i18n");
                                        $(this).find("span").text("");
                                    });

                                    $securityDeleteUserForm.find(".form-alert-danger").addClass("d-none");

                                    setTimeout(
                                        function () {
                                            window.location.href = utility.getURL() + "/";
                                        }, 1500);
                                }
                            },
                            error: function (xhr, status, error) {
                                setTimeout(
                                    function () {
                                        let result = xhr['responseJSON']
                                        let statusCode = xhr['status'];

                                        if (statusCode === 400) {
                                            let $securityDeleteUserForm = $("#security-delete-user-form");
                                            $securityDeleteUserForm.find(".form-alert-danger").removeClass("d-none");

                                            if (result['message']['message']['password'] || result['message']['message']['email']) {
                                                $securityDeleteUserForm.find(".security-delete-user-error span").removeData("i18n");
                                                $securityDeleteUserForm.find(".security-delete-user-error span").text("");
                                                if (result['message']['message']['password']) {
                                                    $securityDeleteUserForm.find(".security-delete-user-error span").attr("data-i18n", result['message']['message']['password']);
                                                } else if (result['message']['message']['email']) {
                                                    $securityDeleteUserForm.find(".security-delete-user-error span").attr("data-i18n", result['message']['message']['email']);
                                                }
                                                $securityDeleteUserForm.find(".security-delete-user-error").removeClass("d-none");
                                                $('body').i18n();
                                            } else {
                                                $securityDeleteUserForm.find(".security-delete-user-error span").removeData("i18n");
                                                $securityDeleteUserForm.find(".security-delete-user-error span").text("");
                                                $securityDeleteUserForm.find(".security-delete-user-error").addClass("d-none");
                                                $('body').i18n();
                                            }

                                        }
                                        _this.find(".delete-lock").removeClass("inactive d-none").addClass("active");
                                        _this.find(".delete-unlock").removeClass("active").addClass("inactive d-none");
                                        _this.addClass("btn-danger").removeClass("btn-primary");

                                        //$("body").css({"filter": "grayscale(0%)"});
                                        $("#post-loader").toggleClass("inactive active");
                                        $("body").removeAttr("style");
                                        _this.attr('disabled', false);
                                        _this.removeClass("action");
                                    }, 1500);
                            }
                        });
                    }

                    if ($lock.hasClass("active")) {
                        $lock.removeClass("active").addClass("inactive d-none");
                        $unlock.removeClass("inactive d-none").addClass("active");
                        _this.removeClass("btn-danger").addClass("btn-primary");
                    }

                })

            },

            initializ: function () {
                loadSecurity.password();
                loadSecurity.email();
                loadSecurity.securityDeleteUser();
            }

        };

        $(function () {
            loadSecurity.initializ()
        });
    }
}

export let anlibreedersSecurity = new AnlibreedersSecurity();