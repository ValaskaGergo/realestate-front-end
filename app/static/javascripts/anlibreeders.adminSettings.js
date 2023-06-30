import AnlibreedersUtility from './utilities/anlibreeders.utility'
import autosize from "autosize/dist/autosize";

const utility = new AnlibreedersUtility();

class AnlibreedersAdminSettings {
    loadAnlibreedersAdminSettings() {
        const loadAdminSettings = {

            addSettings: function () {

                autosize(document.querySelector("#addSettingsName"));

                $("body").on("click", ".adminSettings #addSettingsIcon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#addSettings').modal('show');
                });

                $("body").on("click", ".modal#addSettings .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#addSettings').modal('hide');
                });

                $('.modal#addSettings').on('hidden.bs.modal', function (event) {
                    const $addSettingsForm = $("#add-settings-form");
                    const $addSettingsName = $addSettingsForm.find("#addSettingsName");
                    const $addSettingsValue = $addSettingsForm.find("#addSettingsValue");

                    $addSettingsName.val(null);
                    $addSettingsValue.val(null);

                    $addSettingsForm.find(".add-settings-name-error").addClass("d-none");
                    $addSettingsForm.find(".add-settings-value-error").addClass("d-none");
                    $addSettingsForm.find(".form-alert-danger").addClass("d-none");
                });

                $("input[class='addSettingsTypeText']").checkbox();
                $("input[class='addSettingsTypeInteger']").checkbox();

                $("body").on("change", "#add-settings-form #addSettingsTypeText", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.is(':checked')) {
                        $("#add-settings-form #addSettingsType").val("string");
                    }
                });

                $("body").on("change", "#add-settings-form #addSettingsTypeInteger", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.is(':checked')) {
                        $("#add-settings-form #addSettingsType").val("number");
                    }
                });

                $("body").on("click", "#add-settings-form #add-settings-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let addSettingsFormData;

                    $.ajax({
                        type: "POST",
                        url: "/_add-settings",
                        contentType: "application/json",
                        data: JSON.stringify($("#add-settings-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("#addSettings").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            let statusCode = xhr['status'];
                            addSettingsFormData = result['message'];
                        },
                        complete: function (xhr, status) {

                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let $addSettingsForm = $("#add-settings-form");
                                let $addSettingsFormInputError = $("#add-settings-form .input-error");

                                $addSettingsFormInputError.each(function () {
                                    $(this).addClass("d-none");
                                    $(this).find("span").removeData("i18n");
                                    $(this).find("span").text("");
                                });

                                $addSettingsForm.find(".form-alert-danger").addClass("d-none");

                                setTimeout(
                                    function () {
                                        window.location.href = utility.getURL() + "/admin-settings";
                                    }, 1500);

                            }
                        },
                        error: function (xhr, status, error) {
                            setTimeout(
                                function () {
                                    let result = xhr['responseJSON']
                                    let statusCode = xhr['status'];

                                    if (statusCode === 400) {
                                        let $addSettingsForm = $("#add-settings-form");
                                        $addSettingsForm.find(".form-alert-danger").removeClass("d-none");

                                        if (result['message']['message']['settings_name']) {
                                            $addSettingsForm.find(".add-settings-name-error span").removeData("i18n");
                                            $addSettingsForm.find(".add-settings-name-error span").text("");
                                            $addSettingsForm.find(".add-settings-name-error span").attr("data-i18n", result['message']['message']['settings_name']);
                                            $addSettingsForm.find(".add-settings-name-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addSettingsForm.find(".add-settings-name-error span").removeData("i18n");
                                            $addSettingsForm.find(".add-settings-name-error span").text("");
                                            $addSettingsForm.find(".add-settings-name-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['settings_type']) {
                                            $addSettingsForm.find(".add-settings-type-error span").removeData("i18n");
                                            $addSettingsForm.find(".add-settings-type-error span").text("");
                                            $addSettingsForm.find(".add-settings-type-error span").attr("data-i18n", result['message']['message']['settings_type']);
                                            $addSettingsForm.find(".add-settings-type-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addSettingsForm.find(".add-settings-type-error span").removeData("i18n");
                                            $addSettingsForm.find(".add-settings-type-error span").text("");
                                            $addSettingsForm.find(".add-settings-type-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['settings_value']) {
                                            $addSettingsForm.find(".add-settings-value-error span").removeData("i18n");
                                            $addSettingsForm.find(".add-settings-value-error span").text("");
                                            $addSettingsForm.find(".add-settings-value-error span").attr("data-i18n", result['message']['message']['settings_value']);
                                            $addSettingsForm.find(".add-settings-value-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addSettingsForm.find(".add-settings-value-error span").removeData("i18n");
                                            $addSettingsForm.find(".add-settings-value-error span").text("");
                                            $addSettingsForm.find(".add-settings-value-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                    }
                                    //$("#addSettings").removeClass("filter-grayscale-100");
                                    $("#post-loader").toggleClass("inactive active");
                                    $("body").removeAttr("style");
                                    _this.attr('disabled', false);
                                    _this.removeClass("action");
                                }, 1500);
                        }
                    });
                });

            },

            editSettings: function () {

                autosize(document.querySelector("#editSettingsName"));

                $("body").on("click", ".modal#editSettings .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#editSettings').modal('hide');
                });

                $("input[class='editSettingsTypeText']").checkbox();
                $("input[class='editSettingsTypeInteger']").checkbox();

                $("body").on("change", "#edit-settings-form #editSettingsTypeText", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.is(':checked')) {
                        $("#edit-settings-form #editSettingsType").val("string");
                    }
                });

                $("body").on("change", "#edit-settings-form #editSettingsTypeInteger", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.is(':checked')) {
                        $("#edit-settings-form #editSettingsType").val("number");
                    }
                });

                $("body").on("click", ".adminSettings table .icon-click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataId = _this.attr("data-id");

                    let getSettingsData;
                    $.ajax({
                        type: "POST",
                        url: "/_get-admin-settings",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "settings_id": dataId,
                        }),
                        beforeSend: function (xhr) {
                        },
                        success: function (result, status, xhr) {
                            getSettingsData = result['message'];
                        },
                        complete: function (xhr, status) {

                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let settings_id = getSettingsData['data'][0]['settings_id'];
                                let settings_user_id = getSettingsData['data'][0]['settings_user_id'];
                                let settings_user_name = getSettingsData['data'][0]['settings_user_name'];
                                let settings_name = getSettingsData['data'][0]['settings_name'];
                                let settings_type = getSettingsData['data'][0]['settings_type'];
                                let settings_value = getSettingsData['data'][0]['settings_value'];
                                let created_at = getSettingsData['data'][0]['created_at'];
                                let updated_at = getSettingsData['data'][0]['updated_at'];

                                let $editSettingsIdInput = $("#editSettingsId");
                                let $editSettingsNameInput = $("#editSettingsName");
                                let $editSettingsTypeInput = $("#editSettingsType");
                                let $editSettingsValueInput = $("#editSettingsValue");

                                $editSettingsIdInput.val(settings_id);
                                $editSettingsNameInput.val(settings_name);
                                $editSettingsTypeInput.val(settings_type);
                                $editSettingsValueInput.val(settings_value);

                                if (settings_type === "string") {
                                    $("#editSettingsTypeText").trigger("click");
                                } else {
                                    $("#editSettingsTypeInteger").trigger("click");
                                }

                                autosize.update($("#editSettingsName"));

                                $('#editSettings').modal('show');

                                $("body").on("click", "#edit-settings-form #edit-settings-form-button", function (event) {
                                    event.preventDefault();
                                    const _this = $(this);

                                    let editSettingsFormData;

                                    $.ajax({
                                        type: "POST",
                                        url: "/_edit-settings",
                                        contentType: "application/json",
                                        data: JSON.stringify($("#edit-settings-form").serializeObject()),
                                        beforeSend: function (xhr) {
                                            _this.attr('disabled', true);
                                            _this.addClass("action");
                                            //$("#editSettings").addClass("filter-grayscale-100");
                                            $("#post-loader").toggleClass("active inactive");
                                            $("body").css({"overflow": "hidden"});
                                        },
                                        success: function (result, status, xhr) {
                                            let statusCode = xhr['status'];
                                            editSettingsFormData = result['message'];
                                        },
                                        complete: function (xhr, status) {

                                            let statusCode = xhr['status'];

                                            if (statusCode === 200) {
                                                let $editSettingsForm = $("#edit-settings-form");
                                                let $editSettingsFormInputError = $("#edit-settings-form .input-error");

                                                $editSettingsFormInputError.each(function () {
                                                    $(this).addClass("d-none");
                                                    $(this).find("span").removeData("i18n");
                                                    $(this).find("span").text("");
                                                });

                                                $editSettingsForm.find(".form-alert-danger").addClass("d-none");

                                                setTimeout(
                                                    function () {
                                                        window.location.href = utility.getURL() + "/admin-settings";
                                                    }, 1500);

                                            }
                                        },
                                        error: function (xhr, status, error) {
                                            setTimeout(
                                                function () {
                                                    let result = xhr['responseJSON']
                                                    let statusCode = xhr['status'];

                                                    if (statusCode === 400) {
                                                        let $editSettingsForm = $("#edit-settings-form");
                                                        $editSettingsForm.find(".form-alert-danger").removeClass("d-none");

                                                        if (result['message']['message']['settings_name']) {
                                                            $editSettingsForm.find(".edit-settings-name-error span").removeData("i18n");
                                                            $editSettingsForm.find(".edit-settings-name-error span").text("");
                                                            $editSettingsForm.find(".edit-settings-name-error span").attr("data-i18n", result['message']['message']['settings_name']);
                                                            $editSettingsForm.find(".edit-settings-name-error").removeClass("d-none");
                                                            $('body').i18n();
                                                        } else {
                                                            $editSettingsForm.find(".edit-settings-name-error span").removeData("i18n");
                                                            $editSettingsForm.find(".edit-settings-name-error span").text("");
                                                            $editSettingsForm.find(".edit-settings-name-error").addClass("d-none");
                                                            $('body').i18n();
                                                        }

                                                        if (result['message']['message']['settings_type']) {
                                                            $editSettingsForm.find(".edit-settings-type-error span").removeData("i18n");
                                                            $editSettingsForm.find(".edit-settings-type-error span").text("");
                                                            $editSettingsForm.find(".edit-settings-type-error span").attr("data-i18n", result['message']['message']['settings_type']);
                                                            $editSettingsForm.find(".edit-settings-type-error").removeClass("d-none");
                                                            $('body').i18n();
                                                        } else {
                                                            $editSettingsForm.find(".edit-settings-type-error span").removeData("i18n");
                                                            $editSettingsForm.find(".edit-settings-type-error span").text("");
                                                            $editSettingsForm.find(".edit-settings-type-error").addClass("d-none");
                                                            $('body').i18n();
                                                        }

                                                        if (result['message']['message']['settings_value']) {
                                                            $editSettingsForm.find(".edit-settings-value-error span").removeData("i18n");
                                                            $editSettingsForm.find(".edit-settings-value-error span").text("");
                                                            $editSettingsForm.find(".edit-settings-value-error span").attr("data-i18n", result['message']['message']['settings_value']);
                                                            $editSettingsForm.find(".edit-settings-value-error").removeClass("d-none");
                                                            $('body').i18n();
                                                        } else {
                                                            $editSettingsForm.find(".edit-settings-value-error span").removeData("i18n");
                                                            $editSettingsForm.find(".edit-settings-value-error span").text("");
                                                            $editSettingsForm.find(".edit-settings-value-error").addClass("d-none");
                                                            $('body').i18n();
                                                        }

                                                    }
                                                    // $("#editSettings").removeClass("filter-grayscale-100");
                                                    $("#post-loader").toggleClass("inactive active");
                                                    $("body").removeAttr("style");
                                                    _this.attr('disabled', false);
                                                    _this.removeClass("action");
                                                }, 1500);
                                        }
                                    });
                                });

                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });

                });

            },

            initializ: function () {
                loadAdminSettings.addSettings();
                loadAdminSettings.editSettings();
            }

        };

        $(function () {
            loadAdminSettings.initializ()
        });
    }
}

export let anlibreedersAdminSettings = new AnlibreedersAdminSettings();