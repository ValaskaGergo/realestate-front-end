import AnlibreedersUtility from './utilities/anlibreeders.utility'

const utility = new AnlibreedersUtility();

class AnlibreedersUserManagement {
    loadAnlibreedersUserManagement() {
        const loadUserManagement = {

            userManagementDeleteUser: function () {
                $("body").on("click", "#user-management-delete-user-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);
                    let $lock = _this.find(".delete-lock");
                    let $unlock = _this.find(".delete-unlock");

                    if ($unlock.hasClass("active")) {
                        $.ajax({
                            type: "POST",
                            url: "/_user-management-delete-user",
                            contentType: "application/json",
                            data: JSON.stringify($("#billing-address-form").serializeObject()),
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
                                    setTimeout(
                                        function () {
                                            window.location.href = utility.getURL() + "/user-management/deleted";
                                        }, 1500);
                                }
                            },
                            error: function (xhr, status, error) {
                            }
                        });
                    }

                    if ($lock.hasClass("active")) {
                        $(".dropdown-menu.billing-shipping-address.action li span.dropdown-item." + _this.attr("data-btn")).css({"background-color": "#0d6efd"});
                        $lock.removeClass("active").addClass("inactive d-none");
                        $unlock.removeClass("inactive d-none").addClass("active");
                        _this.removeClass("btn-danger").addClass("btn-primary");
                    }

                })
            },

            userManagementBackDeleteUser: function () {
                $("body").on("click", "#user-management-back-delete-user-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);
                    let $lock = _this.find(".delete-lock");
                    let $unlock = _this.find(".delete-unlock");

                    if ($unlock.hasClass("active")) {
                        $.ajax({
                            type: "POST",
                            url: "/_user-management-back-delete-user",
                            contentType: "application/json",
                            data: JSON.stringify($("#billing-address-form").serializeObject()),
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
                                    setTimeout(
                                        function () {
                                            window.location.href = utility.getURL() + "/user-management/deleted";
                                        }, 1500);
                                }
                            },
                            error: function (xhr, status, error) {
                            }
                        });
                    }

                    if ($lock.hasClass("active")) {
                        $(".dropdown-menu.billing-shipping-address.action li span.dropdown-item." + _this.attr("data-btn")).css({"background-color": "#0d6efd"});
                        $lock.removeClass("active").addClass("inactive d-none");
                        $unlock.removeClass("inactive d-none").addClass("active");
                        _this.removeClass("btn-danger").addClass("btn-primary");
                    }

                })
            },

            userManagementForceDeleteUser: function () {
                $("body").on("click", "#user-management-force-delete-user-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);
                    let $lock = _this.find(".delete-lock");
                    let $unlock = _this.find(".delete-unlock");

                    if ($unlock.hasClass("active")) {
                        $.ajax({
                            type: "POST",
                            url: "/_user-management-force-delete-user",
                            contentType: "application/json",
                            data: JSON.stringify($("#billing-address-form").serializeObject()),
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
                                    setTimeout(
                                        function () {
                                            window.location.href = utility.getURL() + "/user-management/deleted";
                                        }, 1500);
                                }
                            },
                            error: function (xhr, status, error) {
                            }
                        });
                    }

                    if ($lock.hasClass("active")) {
                        $(".dropdown-menu.billing-shipping-address.action li span.dropdown-item." + _this.attr("data-btn")).css({"background-color": "#0d6efd"});
                        $lock.removeClass("active").addClass("inactive d-none");
                        $unlock.removeClass("inactive d-none").addClass("active");
                        _this.removeClass("btn-danger").addClass("btn-primary");
                    }

                })
            },

            userManagementPermission() {
                $("body").on("click", ".userManagementPermission .icon-click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataType = _this.attr("data-type");
                    let dataStatus = _this.attr("data-status");
                    let dataUserId = _this.attr("data-user-id");

                    let userManagementPermissionData;
                    $.ajax({
                        type: "POST",
                        url: "/_user-management-permission",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "data_type": dataType,
                            "data_status": dataStatus,
                            "data_user_id": dataUserId
                        }),
                        beforeSend: function (xhr) {
                            //$("body").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                            $("body").addClass("pointer-events-none");
                        },
                        success: function (result, status, xhr) {
                            userManagementPermissionData = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                setTimeout(
                                    function () {
                                        //$("body").removeClass("filter-grayscale-100");
                                        $("#post-loader").toggleClass("inactive active");
                                        $("body").removeAttr("style");
                                        $("body").removeClass("pointer-events-none");

                                        if (_this.attr("data-status") === "True") {
                                            _this.attr("data-status", "False");
                                            _this.html("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='#dc3545' class='bi bi-x' viewBox='0 0 16 16'><path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/></svg>");
                                        } else {
                                            _this.attr("data-status", "True");
                                            _this.html("<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' class='bi bi-check' viewBox='0 0 16 16'><path d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z'/></svg>\n");
                                        }

                                        $(".userManagementPermission .last_modification_user_name").attr("href", "/user-management/user/" + userManagementPermissionData['last_modification_user_id']);
                                        $(".userManagementPermission .last_modification_user_name").html(userManagementPermissionData['last_modification_user_name']);
                                        $(".userManagementPermission .updated_at").attr("data-time-llll", userManagementPermissionData['updated_at']);
                                        $(".userManagementPermission .updated_at").html(utility.getDateTimeLLLL(userManagementPermissionData['updated_at']));
                                    }, 1500);
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                });
            },

            userManagementAddUser: function () {

                $("body").on("click", ".userManagement #addUserIcon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const $addUserForm = $("#add-user-form");
                    const $addUserName = $addUserForm.find("#addUserName");

                    $addUserName.val("@AB" + utility.getGenerateNumber());

                    $('#addUser').modal('show');
                });

                $("body").on("click", ".modal#addUser .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#addUser').modal('hide');
                });

                $('.modal#addUser').on('hidden.bs.modal', function (event) {
                    const $addUserForm = $("#add-user-form");
                    const $addUserEmail = $addUserForm.find("#addUserEmail");
                    const $addUserPassword = $addUserForm.find("#addUserPassword");
                    const $addUserPasswordConfirm = $addUserForm.find("#addUserPasswordConfirm");

                    $addUserEmail.val(null);
                    $addUserPassword.val(null);
                    $addUserPasswordConfirm.val(null);

                    $addUserForm.find(".add-user-email-error").addClass("d-none");
                    $addUserForm.find(".add-user-name-error").addClass("d-none");
                    $addUserForm.find(".add-user-password-error").addClass("d-none");
                    $addUserForm.find(".add-user-password-confirm-error").addClass("d-none");
                    $addUserForm.find(".form-alert-danger").addClass("d-none");
                });

                $("body").on("click", "#add-user-form .input-group-text.password.plus-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const $eyeIcon = $("#add-user-form .input-group-text.password.eye-icon")

                    let $passwordInput = $("#add-user-form #addUserPassword");
                    let $passwordConfirmInput = $("#add-user-form #addUserPasswordConfirm");

                    let getRandomPassword = utility.getRandomPassword();

                    $passwordInput.attr("type", "text");
                    $passwordInput.val(getRandomPassword);

                    $passwordConfirmInput.attr("type", "text");
                    $passwordConfirmInput.val(getRandomPassword);

                    $eyeIcon.removeClass("inactive").addClass("active");
                });

                $("body").on("click", "#add-user-form .input-group-text.password.eye-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let $passwordInput = $("#add-user-form #addUserPassword");
                    let $passwordConfirmInput = $("#add-user-form #addUserPasswordConfirm");

                    if (_this.hasClass("inactive")) {
                        $passwordInput.attr("type", "text");
                        $passwordConfirmInput.attr("type", "text");
                    } else {
                        $passwordInput.attr("type", "password");
                        $passwordConfirmInput.attr("type", "password");
                    }
                    _this.toggleClass("inactive active")
                });

                $("body").on("click", "#add-user-form .btn#add-user-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let userManagementAddUserData;
                    $.ajax({
                        type: "POST",
                        url: "/_user-management-add-user",
                        contentType: "application/json",
                        data: JSON.stringify($("#add-user-form").serializeObject()),
                        beforeSend: function (xhr) {
                            //$("body").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                            $("body").addClass("pointer-events-none");
                            _this.attr('disabled', true);
                            _this.addClass("action");
                        },
                        success: function (result, status, xhr) {
                            userManagementAddUserData = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];
                            if (statusCode === 200) {

                                setTimeout(
                                    function () {
                                        window.location.href = utility.getURL() + "/user-management";
                                    }, 1500);

                            }
                        },
                        error: function (xhr, status, error) {

                            setTimeout(
                                function () {
                                    let result = xhr['responseJSON']
                                    let statusCode = xhr['status'];

                                    if (statusCode === 400) {
                                        let $addUserForm = $("#add-user-form");
                                        $addUserForm.find(".form-alert-danger").removeClass("d-none");

                                        if (result['message']['message']['email']) {
                                            $addUserForm.find(".add-user-email-error span").removeData("i18n");
                                            $addUserForm.find(".add-user-email-error span").text("");
                                            $addUserForm.find(".add-user-email-error span").attr("data-i18n", result['message']['message']['email']);
                                            $addUserForm.find(".add-user-email-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addUserForm.find(".add-user-email-error span").removeData("i18n");
                                            $addUserForm.find(".add-user-email-error span").text("");
                                            $addUserForm.find(".add-user-email-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['name']) {
                                            $addUserForm.find(".add-user-name-error span").removeData("i18n");
                                            $addUserForm.find(".add-user-name-error span").text("");
                                            $addUserForm.find(".add-user-name-error span").attr("data-i18n", result['message']['message']['name']);
                                            $addUserForm.find(".add-user-name-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addUserForm.find(".add-user-name-error span").removeData("i18n");
                                            $addUserForm.find(".add-user-name-error span").text("");
                                            $addUserForm.find(".add-user-name-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['password']) {
                                            $addUserForm.find(".add-user-password-error span").removeData("i18n");
                                            $addUserForm.find(".add-user-password-error span").text("");
                                            $addUserForm.find(".add-user-password-error span").attr("data-i18n", result['message']['message']['password']);
                                            $addUserForm.find(".add-user-password-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addUserForm.find(".add-user-password-error span").removeData("i18n");
                                            $addUserForm.find(".add-user-password-error span").text("");
                                            $addUserForm.find(".add-user-password-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['password_confirm']) {
                                            $addUserForm.find(".add-user-password-confirm-error span").removeData("i18n");
                                            $addUserForm.find(".add-user-password-confirm-error span").text("");
                                            $addUserForm.find(".add-user-password-confirm-error span").attr("data-i18n", result['message']['message']['password_confirm']);
                                            $addUserForm.find(".add-user-password-confirm-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addUserForm.find(".add-user-password-confirm-error span").removeData("i18n");
                                            $addUserForm.find(".add-user-password-confirm-error span").text("");
                                            $addUserForm.find(".add-user-password-confirm-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                    }
                                    //$("body").removeClass("filter-grayscale-100");
                                    $("#post-loader").toggleClass("inactive active");
                                    $("body").removeAttr("style");
                                    $("body").removeClass("pointer-events-none");
                                    _this.attr('disabled', false);
                                    _this.removeClass("action");
                                }, 1500);

                        }
                    });

                });

            },

            initializ: function () {
                loadUserManagement.userManagementDeleteUser();
                loadUserManagement.userManagementBackDeleteUser();
                loadUserManagement.userManagementForceDeleteUser();
                loadUserManagement.userManagementPermission();
                loadUserManagement.userManagementAddUser();
            }

        };

        $(function () {
            loadUserManagement.initializ()
        });
    }
}

export let anlibreedersUserManagement = new AnlibreedersUserManagement();