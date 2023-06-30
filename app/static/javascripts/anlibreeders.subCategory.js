import AnlibreedersUtility from './utilities/anlibreeders.utility'
import autosize from "autosize/dist/autosize";

const utility = new AnlibreedersUtility();

class AnlibreedersSubCategory {
    loadAnlibreedersSubCategory() {
        const loadSubCategory = {

            subCategoryInputClear() {
                let $addSubCategoryForm = $("#add-subcategory-form");
                let $categoryProgress = $("#add-subcategory-form .subcategory.progress");
                let $categoryProgressBar = $categoryProgress.find(".progress-bar");
                let $categoryProgressBarFilePercent = $categoryProgressBar.find(".file-percent");
                let $categoryProgressBarFileSize = $categoryProgressBar.find(".file-size");
                let $categoryCropperImg = $("#add-subcategory-form .subcategory.cropper-img");
                let $categoryCropperImgEdit = $("#add-subcategory-form .subcategory.cropper-img-edit");
                let $categoryCropperBackIcon = $("#add-subcategory-form .subcategory.crop-back-icon");
                let $categoryTrashIcon = $("#add-subcategory-form .subcategory.trash-icon");
                let $categoryImgIcon = $("#add-subcategory-form .subcategory.img-icon");
                let $categoryCropIcon = $("#add-subcategory-form .subcategory.crop-icon");
                let $categoryEditImgPreview = $("#add-subcategory-form .subcategory-edit-img-preview");
                let $deleteCategoryFormButton = $("#add-subcategory-form #delete-subcategory-form-button");
                let $addSubCategoryFormInputError = $("#add-subcategory-form .input-error");


                $categoryProgress.addClass("d-none");
                $categoryProgressBar.removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                $categoryProgressBarFilePercent.html("0%");
                $categoryProgressBarFileSize.html("");
                $categoryProgressBar.css({"width": "0"});
                $categoryCropperImg.addClass("d-none");
                $categoryCropperImgEdit.addClass("d-none");
                $categoryCropperBackIcon.addClass("d-none");
                $categoryTrashIcon.addClass("d-none");
                $categoryImgIcon.removeClass("d-none");
                $categoryCropIcon.addClass("d-none");
                $categoryEditImgPreview.addClass("d-none");
                $deleteCategoryFormButton.addClass("d-none");

                $("#add-subcategory-form input").val(null);
                $("#add-subcategory-form textarea").val(null);
                $("#add-subcategory-form #categoryIsEditImg").val(null);
                $("#add-subcategory-form #categoryIsRmImg").val(null);
                $("#add-subcategory-form #categoryIsNewImg").val(null);
                $("#add-subcategory-form #subCategoryImg, #add-subcategory-form .subcategory.img-icon").removeClass("pointer-events-none");

                $deleteCategoryFormButton.find(".delete-lock").removeClass("inactive d-none").addClass("active");
                $deleteCategoryFormButton.find(".delete-unlock").removeClass("active").addClass("inactive d-none");
                $deleteCategoryFormButton.addClass("btn-danger").removeClass("btn-primary");

                $(".cropper-container.cropper-bg").each(function () {
                    $(this).detach();
                });

                $addSubCategoryFormInputError.each(function () {
                    $(this).addClass("d-none");
                    $(this).find("span").removeData("i18n");
                    $(this).find("span").text("");
                });

                $addSubCategoryForm.find(".form-alert-danger").addClass("d-none");
            },

            setCategorySelect(selected_id = null) {
                let $categorySelect = $('#add-subcategory-form .subCategorySelect');

                let categoryData;
                let categoryLang;
                $.ajax({
                    type: "GET",
                    url: "/_get-category-select",
                    contentType: "application/json",
                    beforeSend: function (xhr) {
                    },
                    success: function (result, status, xhr) {
                        categoryData = result['message']
                        categoryLang = result['lang']
                    },
                    complete: function (xhr, status) {
                        $categorySelect.selectpicker('destroy');

                        $categorySelect.html("");

                        for (let i = 0; i < categoryData.length; i++) {
                            $categorySelect.append(
                                "<option " +
                                "value=" + categoryData[i]['category_id'] + ' ' +
                                "data-id=" + categoryData[i]['category_id'] + ' ' +
                                "data-name=" + categoryData[i]['name_' + categoryLang] + ' ' +
                                "data-tokens=" + categoryData[i]['name_hu'] + '\xa0' + categoryData[i]['name_en'] + '\xa0' + categoryData[i]['name_de'] + '\xa0' + categoryData[i]['name_fr'] + '\xa0' + categoryData[i]['name_es'] +
                                ">" +
                                categoryData[i]['name_' + categoryLang] +
                                "</option>"
                            );
                        }

                        $categorySelect.selectpicker({
                            liveSearch: true
                        });

                        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                            $categorySelect.selectpicker('mobile');
                        }

                        if (selected_id !== null) {
                            $categorySelect.val(selected_id)
                        }
                        $categorySelect.selectpicker('refresh');
                    },
                    error: function (xhr, status, error) {
                    }
                });

                $("body").on('changed.bs.select', '#add-subcategory-form .subCategorySelect', function (event, clickedIndex) {
                    event.stopImmediatePropagation()
                    let dataCategoryId = $(event['target'][clickedIndex]).attr("data-id");
                    $("#add-subcategory-form #CategoryIdSelect").val(dataCategoryId);
                });
            },

            deeplSubCategory: function () {

                $("body").on("click", "#addSubCategory .translate-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataTranslate = _this.attr("data-translate");

                    let $subCategoryNameHU = $("#subCategoryNameHU");
                    let $subCategoryNameEN = $("#subCategoryNameEN");
                    let $subCategoryNameDE = $("#subCategoryNameDE");
                    let $subCategoryNameFR = $("#subCategoryNameFR");
                    let $subCategoryNameES = $("#subCategoryNameES");

                    let text;

                    if (dataTranslate === "HU") {
                        text = $subCategoryNameHU.val();
                    }

                    if (dataTranslate === "EN") {
                        text = $subCategoryNameEN.val();
                    }

                    if (dataTranslate === "DE") {
                        text = $subCategoryNameDE.val();
                    }

                    if (dataTranslate === "FR") {
                        text = $subCategoryNameFR.val();
                    }

                    if (dataTranslate === "ES") {
                        text = $subCategoryNameES.val();
                    }

                    $.ajax({
                        type: "POST",
                        url: "/_deepl-category",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "lang": dataTranslate,
                            "text": text
                        }),
                        beforeSend: function (xhr) {
                            //$("#addSubCategory").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                            $("#addSubCategory .translate-icon").addClass("pointer-events-none");
                        },
                        success: function (result, status, xhr) {
                            $subCategoryNameHU.val(result['message']['HU']);
                            $subCategoryNameEN.val(result['message']['EN']);
                            $subCategoryNameDE.val(result['message']['DE']);
                            $subCategoryNameFR.val(result['message']['FR']);
                            $subCategoryNameES.val(result['message']['ES']);
                        },
                        complete: function (xhr, status) {
                            //$("#addSubCategory").removeClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("inactive active");
                            $("body").removeAttr("style");
                            $("#addSubCategory .translate-icon").removeClass("pointer-events-none");
                        },
                        error: function (xhr, status, error) {
                        }
                    });

                });

                $("body").on("click", "#addSubCategory .translate-description-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataTranslate = _this.attr("data-translate");

                    let $subCategoryDescriptionHU = $("#subCategoryDescriptionHU");
                    let $subCategoryDescriptionEN = $("#subCategoryDescriptionEN");
                    let $subCategoryDescriptionDE = $("#subCategoryDescriptionDE");
                    let $subCategoryDescriptionFR = $("#subCategoryDescriptionFR");
                    let $subCategoryDescriptionES = $("#subCategoryDescriptionES");

                    let text;

                    if (dataTranslate === "HU") {
                        text = $subCategoryDescriptionHU.val();
                    }

                    if (dataTranslate === "EN") {
                        text = $subCategoryDescriptionEN.val();
                    }

                    if (dataTranslate === "DE") {
                        text = $subCategoryDescriptionDE.val();
                    }

                    if (dataTranslate === "FR") {
                        text = $subCategoryDescriptionFR.val();
                    }

                    if (dataTranslate === "ES") {
                        text = $subCategoryDescriptionES.val();
                    }

                    $.ajax({
                        type: "POST",
                        url: "/_deepl-category",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "lang": dataTranslate,
                            "text": text
                        }),
                        beforeSend: function (xhr) {
                            //$("#addSubCategory").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                            $("#addSubCategory .translate-icon").addClass("pointer-events-none");
                        },
                        success: function (result, status, xhr) {
                            $subCategoryDescriptionHU.val(result['message']['HU']);
                            $subCategoryDescriptionEN.val(result['message']['EN']);
                            $subCategoryDescriptionDE.val(result['message']['DE']);
                            $subCategoryDescriptionFR.val(result['message']['FR']);
                            $subCategoryDescriptionES.val(result['message']['ES']);

                            autosize.update($("#subCategoryDescriptionHU"));
                            autosize.update($("#subCategoryDescriptionEN"));
                            autosize.update($("#subCategoryDescriptionDE"));
                            autosize.update($("#subCategoryDescriptionFR"));
                            autosize.update($("#subCategoryDescriptionES"));
                        },
                        complete: function (xhr, status) {
                            //$("#addSubCategory").removeClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("inactive active");
                            $("body").removeAttr("style");
                            $("#addSubCategory .translate-icon").removeClass("pointer-events-none");
                        },
                        error: function (xhr, status, error) {
                        }
                    });

                });

            },

            addSubCategory: function () {
                $("input[class='subcategory-visibility-checkbox']").checkbox({
                    // toggle: true
                });

                autosize(document.querySelector("#subCategoryDescriptionHU"));
                autosize(document.querySelector("#subCategoryDescriptionEN"));
                autosize(document.querySelector("#subCategoryDescriptionDE"));
                autosize(document.querySelector("#subCategoryDescriptionFR"));
                autosize(document.querySelector("#subCategoryDescriptionES"));


                $("body").on("click", ".SubCategoryWrap #addSubCategoryIcon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    loadSubCategory.subCategoryInputClear();

                    $("#add-subcategory-form #subCategoryVisibility").val("True");
                    $("#SubCategoryCheckboxVisibility").prop("checked", true);
                    $("#SubCategoryCheckboxVisibility").checkbox("update");

                    loadSubCategory.setCategorySelect();
                    $('#addSubCategory').modal('show');
                });

                $("body").on("click", ".modal#addSubCategory .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#addSubCategory').modal('hide');

                    loadSubCategory.subCategoryInputClear();
                });

                $("body").on("change", "#add-subcategory-form #SubCategoryCheckboxVisibility", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.is(':checked')) {
                        $("#add-subcategory-form #subCategoryVisibility").val("True");
                    } else {
                        $("#add-subcategory-form #subCategoryVisibility").val("False");
                    }
                });

                $("body").on("click", "#add-subcategory-form #add-subcategory-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $.ajax({
                        type: "POST",
                        url: "/_add-subcategory",
                        contentType: "application/json",
                        data: JSON.stringify($("#add-subcategory-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("#addSubCategory").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let $addSubCategoryForm = $("#add-subcategory-form");
                                let $addSubCategoryFormInputError = $("#add-subcategory-form .input-error");

                                $addSubCategoryFormInputError.each(function () {
                                    $(this).addClass("d-none");
                                    $(this).find("span").removeData("i18n");
                                    $(this).find("span").text("");
                                });

                                $addSubCategoryForm.find(".form-alert-danger").addClass("d-none");

                                setTimeout(
                                    function () {
                                        window.location.href = utility.getURL() + "/category";
                                    }, 1500);
                            }
                        },
                        error: function (xhr, status, error) {
                            setTimeout(
                                function () {
                                    let result = xhr['responseJSON']
                                    let statusCode = xhr['status'];

                                    if (statusCode === 400) {
                                        let $addSubCategoryForm = $("#add-subcategory-form");
                                        $addSubCategoryForm.find(".form-alert-danger").removeClass("d-none");

                                        $(".modal#addSubCategory").animate({scrollTop: 0}, 500);

                                        if (result['message']['message']['category_id_select']) {
                                            $addSubCategoryForm.find(".add-subcategory-select-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-select-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-select-error span").attr("data-i18n", result['message']['message']['category_id_select']);
                                            $addSubCategoryForm.find(".add-subcategory-select-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addSubCategoryForm.find(".add-subcategory-select-errorspan").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-select-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-select-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['name_hu']) {
                                            $addSubCategoryForm.find(".add-subcategory-name-hu-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-name-hu-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-name-hu-error span").attr("data-i18n", result['message']['message']['name_hu']);
                                            $addSubCategoryForm.find(".add-subcategory-name-hu-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addSubCategoryForm.find(".add-subcategory-name-hu-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-name-hu-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-name-hu-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['name_en']) {
                                            $addSubCategoryForm.find(".add-subcategory-name-en-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-name-en-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-name-en-error span").attr("data-i18n", result['message']['message']['name_en']);
                                            $addSubCategoryForm.find(".add-subcategory-name-en-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addSubCategoryForm.find(".add-subcategory-name-en-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-name-en-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-name-en-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['name_de']) {
                                            $addSubCategoryForm.find(".add-subcategory-name-de-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-name-de-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-name-de-error span").attr("data-i18n", result['message']['message']['name_de']);
                                            $addSubCategoryForm.find(".add-subcategory-name-de-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addSubCategoryForm.find(".add-subcategory-name-de-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-name-de-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-name-de-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['name_fr']) {
                                            $addSubCategoryForm.find(".add-subcategory-name-fr-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-name-fr-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-name-fr-error span").attr("data-i18n", result['message']['message']['name_fr']);
                                            $addSubCategoryForm.find(".add-subcategory-name-fr-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addSubCategoryForm.find(".add-subcategory-name-fr-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-name-fr-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-name-fr-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['name_es']) {
                                            $addSubCategoryForm.find(".add-subcategory-name-es-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-name-es-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-name-es-error span").attr("data-i18n", result['message']['message']['name_es']);
                                            $addSubCategoryForm.find(".add-subcategory-name-es-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addSubCategoryForm.find(".add-subcategory-name-es-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-name-es-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-name-es-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['description_hu']) {
                                            $addSubCategoryForm.find(".add-subcategory-description-hu-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-description-hu-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-description-hu-error span").attr("data-i18n", result['message']['message']['description_hu']);
                                            $addSubCategoryForm.find(".add-subcategory-description-hu-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addSubCategoryForm.find(".add-subcategory-description-hu-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-description-hu-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-description-hu-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['description_en']) {
                                            $addSubCategoryForm.find(".add-subcategory-description-en-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-description-en-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-description-en-error span").attr("data-i18n", result['message']['message']['description_en']);
                                            $addSubCategoryForm.find(".add-subcategory-description-en-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addSubCategoryForm.find(".add-subcategory-description-en-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-description-en-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-description-en-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['description_de']) {
                                            $addSubCategoryForm.find(".add-subcategory-description-de-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-description-de-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-description-de-error span").attr("data-i18n", result['message']['message']['description_de']);
                                            $addSubCategoryForm.find(".add-subcategory-description-de-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addSubCategoryForm.find(".add-subcategory-description-de-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-description-de-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-description-de-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['description_fr']) {
                                            $addSubCategoryForm.find(".add-subcategory-description-fr-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-description-fr-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-description-fr-error span").attr("data-i18n", result['message']['message']['description_fr']);
                                            $addSubCategoryForm.find(".add-subcategory-description-fr-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addSubCategoryForm.find(".add-subcategory-description-fr-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-description-fr-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-description-fr-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['description_es']) {
                                            $addSubCategoryForm.find(".add-subcategory-description-es-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-description-es-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-description-es-error span").attr("data-i18n", result['message']['message']['description_es']);
                                            $addSubCategoryForm.find(".add-subcategory-description-es-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addSubCategoryForm.find(".add-subcategory-description-es-error span").removeData("i18n");
                                            $addSubCategoryForm.find(".add-subcategory-description-es-error span").text("");
                                            $addSubCategoryForm.find(".add-subcategory-description-es-error").addClass("d-none");
                                            $('body').i18n();
                                        }


                                    }
                                    //$("#addSubCategory").removeClass("filter-grayscale-100");
                                    $("#post-loader").toggleClass("inactive active");
                                    $("body").removeAttr("style");
                                    _this.attr('disabled', false);
                                    _this.removeClass("action");
                                }, 1500);
                        }
                    });

                });
            },

            editSubCategory: function () {
                let subCropperEdit;
                let subCategoryCropEditData;
                let sub_img_data;
                let sub_img_data_json;

                $("body").on("click", ".SubCategoryWrap .icon-click.edit-subcategory", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (subCropperEdit) {
                        subCropperEdit.destroy();
                    }

                    loadSubCategory.subCategoryInputClear();

                    let dataId = _this.attr("data-id");
                    let getSubCategoryData;

                    $.ajax({
                        type: "POST",
                        url: "/_get-subcategory",
                        contentType: "application/json",
                        data: JSON.stringify({"id": dataId}),
                        beforeSend: function (xhr) {
                        },
                        success: function (result, status, xhr) {
                            getSubCategoryData = result['message']['data'][0];
                        },
                        complete: function (xhr, status) {
                            let subcategory_id = getSubCategoryData['subcategory_id']
                            let category_id = getSubCategoryData['category_id']
                            let visibility = getSubCategoryData['visibility']
                            sub_img_data = getSubCategoryData['img_data'];
                            sub_img_data_json = JSON.parse(sub_img_data);
                            let name_hu = getSubCategoryData['name_hu']
                            let name_en = getSubCategoryData['name_en']
                            let name_de = getSubCategoryData['name_de']
                            let name_fr = getSubCategoryData['name_fr']
                            let name_es = getSubCategoryData['name_es']
                            let description_hu = getSubCategoryData['description_hu']
                            let description_en = getSubCategoryData['description_en']
                            let description_de = getSubCategoryData['description_de']
                            let description_fr = getSubCategoryData['description_fr']
                            let description_es = getSubCategoryData['description_es']
                            let img = getSubCategoryData['img']
                            let category_user_id = getSubCategoryData['category_user_id']
                            let category_user_name = getSubCategoryData['category_user_name']
                            let created_at = getSubCategoryData['created_at']
                            let updated_at = getSubCategoryData['updated_at']

                            if (visibility === "True") {
                                $("#add-subcategory-form #SubCategoryCheckboxVisibility").prop("checked", true);
                                $("#SubCategoryCheckboxVisibility").checkbox("update");
                            } else {
                                $("#add-subcategory-form #SubCategoryCheckboxVisibility").prop("checked", false);
                                $("#SubCategoryCheckboxVisibility").checkbox("update");
                            }

                            if (img !== null) {
                                $("#add-subcategory-form .subcategory.crop-icon").removeClass("d-none");
                                $("#add-subcategory-form .subcategory.trash-icon").removeClass("d-none");
                                $("#add-subcategory-form .subcategory.img-icon").addClass("d-none");
                                $("#add-subcategory-form #subCategoryImg, #add-subcategory-form .subcategory.img-icon").addClass("pointer-events-none");

                                let sub_img_preview = document.getElementById('subcategory-edit-img-preview');
                                sub_img_preview.src = "/static/images/subcategory/" + sub_img_data_json['folder'] + "/cropped/" + sub_img_data_json['filename'];
                                $("#add-subcategory-form .subcategory-edit-img-preview").removeClass("d-none");
                            } else {
                                $("#add-subcategory-form .subcategory.crop-icon").addClass("d-none");
                                $("#add-subcategory-form .subcategory.crop-back-icon").addClass("d-none");
                                $("#add-subcategory-form .subcategory.trash-icon").addClass("d-none");
                                $("#add-subcategory-form .subcategory.img-icon").removeClass("d-none");
                                $("#add-subcategory-form #subCategoryImg, #add-subcategory-form .subcategory.img-icon").removeClass("pointer-events-none");

                                $("#add-subcategory-form .subcategory-edit-img-preview").addClass("d-none");
                            }

                            $("#add-subcategory-form #subCategoryId").val(subcategory_id);
                            $("#add-subcategory-form #CategoryIdSelect").val(category_id);
                            $("#add-subcategory-form #subCategoryVisibility").val(visibility);
                            $("#add-subcategory-form #subCategoryImgData").val(sub_img_data);
                            $("#add-subcategory-form #subCategoryImgDataOld").val(sub_img_data);
                            $("#add-subcategory-form #subCategoryNameHU").val(name_hu);
                            $("#add-subcategory-form #subCategoryNameEN").val(name_en);
                            $("#add-subcategory-form #subCategoryNameDE").val(name_de);
                            $("#add-subcategory-form #subCategoryNameFR").val(name_fr);
                            $("#add-subcategory-form #subCategoryNameES").val(name_es);
                            $("#add-subcategory-form #subCategoryDescriptionHU").val(description_hu);
                            $("#add-subcategory-form #subCategoryDescriptionEN").val(description_en);
                            $("#add-subcategory-form #subCategoryDescriptionDE").val(description_de);
                            $("#add-subcategory-form #subCategoryDescriptionFR").val(description_fr);
                            $("#add-subcategory-form #subCategoryDescriptionES").val(description_es);
                            if (sub_img_data_json !== null) {
                                $("#add-subcategory-form #subCategoryImg").val(sub_img_data_json['filename']);
                            } else {
                                $("#add-subcategory-form #subCategoryImg").val(null);
                            }

                            $("#add-subcategory-form #delete-subcategory-form-button").removeClass("d-none");

                            loadSubCategory.setCategorySelect(category_id);

                            $('#addSubCategory').modal('show');
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                });

                $("body").on("click", "#add-subcategory-form .subcategory.crop-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#add-subcategory-form .subcategory.crop-back-icon").removeClass("d-none");
                    $("#add-subcategory-form .subcategory.trash-icon").addClass("d-none");
                    $("#add-subcategory-form #subCategoryIsEditImg").val("True");

                    if (subCropperEdit) {
                        subCropperEdit.destroy();
                    }

                    let sub_img_edit = document.getElementById('subcategory-new-img-cropper-edit');
                    sub_img_edit.src = "/static/images/subcategory/" + sub_img_data_json['folder'] + "/origin/" + sub_img_data_json['filename'];

                    setTimeout(
                        function () {
                            $("#add-subcategory-form .subcategory-edit-img-preview").addClass("d-none");
                            $("#add-subcategory-form .subcategory.cropper-img-edit").removeClass("d-none");

                            setTimeout(
                                function () {
                                    subCropperEdit = new Cropper(sub_img_edit, {
                                        viewMode: 1,
                                        aspectRatio: 16 / 9,
                                        dragMode: 'move',
                                        cropBoxMovable: false,
                                        cropBoxResizable: false,
                                        toggleDragModeOnDblclick: false,
                                        responsive: true,
                                        crop: function (event) {
                                            let width = event.detail.width,
                                                height = event.detail.height,
                                                x = event.detail.x,
                                                y = event.detail.y,
                                                x2 = (Math.round(x) + Math.round(width)),
                                                y2 = (Math.round(y) + Math.round(height)),
                                                rotate = event.detail.rotate,
                                                scaleX = event.detail.scaleX,
                                                scaleY = event.detail.scaleY;
                                            subCategoryCropEditData = {
                                                "aspectRatio": 16 / 9,
                                                "width": width,
                                                "height": height,
                                                "x": x,
                                                "y": y,
                                                "x2": x2,
                                                "y2": y2,
                                                "rotate": rotate,
                                                "scaleX": scaleX,
                                                "scaleY": scaleY,
                                                "folder": sub_img_data_json['folder'],
                                                "filename": sub_img_data_json['filename'],
                                            };
                                            $("#subCategoryImgData").val(JSON.stringify(subCategoryCropEditData));
                                        }
                                    });
                                }, 500);

                        }, 500);


                });

                $("body").on("click", "#add-subcategory-form .subcategory.crop-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#add-subcategory-form .subcategory.crop-icon").removeClass("d-none");
                    $("#add-subcategory-form .subcategory.trash-icon").removeClass("d-none");
                    $("#add-subcategory-form #subCategoryImgData").val(sub_img_data);
                    $("#add-subcategory-form #subCategoryIsEditImg").val(null);

                    if (subCropperEdit) {
                        subCropperEdit.destroy();
                    }

                    $("#add-subcategory-form .subcategory.cropper-img-edit").addClass("d-none");
                    $("#add-subcategory-form .subcategory-edit-img-preview").removeClass("d-none");
                });
            },

            subCategoryImg: function () {
                let subCropper;
                let subCategoryCropData;
                let subFileError;

                $("body").on("click", "#add-subcategory-form .subcategory.trash-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (subCropper) {
                        subCropper.destroy();
                        subCategoryCropData = {};
                    }

                    $(".cropper-container.cropper-bg").each(function () {
                        $(this).detach();
                    });

                    $("#add-subcategory-form #subCategoryImgData").val(null);
                    $("#add-subcategory-form #subCategoryImg").val(null);
                    $("#add-subcategory-form #subCategoryIsNewImg").val(null);
                    $("#add-subcategory-form #subCategoryIsRmImg").val("True");
                    $("#add-subcategory-form .subcategory.trash-icon").addClass("d-none");
                    $("#add-subcategory-form .subcategory.crop-icon").addClass("d-none");
                    $("#add-subcategory-form .subcategory.crop-back-icon").addClass("d-none");
                    $("#add-subcategory-form .subcategory.img-icon").removeClass("d-none");
                    $("#add-subcategory-form .subcategory.cropper-img").addClass("d-none");
                    $("#add-subcategory-form .subcategory.subcategory-edit-img-preview").addClass("d-none");
                    $("#add-subcategory-form #subCategoryImg, #add-subcategory-form .subcategory.img-icon").removeClass("pointer-events-none");
                    if ($("#add-subcategory-form #subCategoryImgDataOld").val() !== "") {
                        $("#add-subcategory-form .subcategory.trash-back-icon").removeClass("d-none");
                    }
                });

                $("body").on("click", "#add-subcategory-form .subcategory.trash-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#add-subcategory-form .subcategory.crop-icon").removeClass("d-none");
                    $("#add-subcategory-form #subCategoryIsRmImg").val(null);
                    $("#add-subcategory-form #subCategoryImg").val($("#add-subcategory-form #subCategoryImgDataOld").val());

                    let $uploadingSubcategoryImgShow = $("#add-subcategory-form .uploadingSubcategoryImgShow");

                    if (subCropper) {
                        subCropper.destroy();
                        subCategoryCropData = {};
                    }

                    $uploadingSubcategoryImgShow.find(".subcategory.cropper-img-edit").addClass("d-none");
                    $uploadingSubcategoryImgShow.find(".subcategory.img-icon").addClass("d-none");
                    $uploadingSubcategoryImgShow.find(".subcategory.trash-icon").removeClass("d-none");

                    let subcategoryImgDataOld = JSON.parse($("#add-subcategory-form #subCategoryImgDataOld").val());

                    $uploadingSubcategoryImgShow.find(".subcategory.subcategory-edit-img-preview #subcategory-edit-img-preview").attr("src", "/static/images/subcategory/" + subcategoryImgDataOld['folder'] + "/cropped/" + subcategoryImgDataOld['filename']);
                    $uploadingSubcategoryImgShow.find(".subcategory.subcategory-edit-img-preview").removeClass("d-none");
                    $("#add-subcategory-form #subCategoryImg").addClass("pointer-events-none");
                    $("#add-subcategory-form #subCategoryImg").val(subcategoryImgDataOld['filename']);
                });

                $("body").on("click", "#add-subcategory-form #subCategoryImg, #add-subcategory-form .subcategory.img-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (subCropper) {
                        subCropper.destroy();
                        subCategoryCropData = {};
                    }

                    let maxSize;
                    if (process.env.NODE_ENV === "production") {
                        maxSize = process.env.PRODUCTION_IMG_MAX_SIZE // Bytes == 25 Megabytes
                    } else {
                        maxSize = process.env.DEVELOPMENT_IMG_MAX_SIZE // Bytes == 250 Megabytes
                    }

                    $("#add-subcategory-form .subcategory.img-icon").upload({
                        "action": "subcategory-img-upload",
                        "label": "",
                        "multiple": false,
                        "maxSize": maxSize,
                        "theme": "",
                        beforeSend: onBeforeSend
                    }).on("start.upload", onStart)
                        .on("complete.upload", onComplete)
                        .on("filestart.upload", onFileStart)
                        .on("fileprogress.upload", onFileProgress)
                        .on("filecomplete.upload", onFileComplete)
                        .on("fileerror.upload", onFileError)
                        .on("queued.upload", onQueued);

                    $("#add-subcategory-form").off("click", ".img-cancel.progress-rm");
                    $("#add-subcategory-form").on("click", ".img-cancel.progress-rm", onCancel);

                    function onCancel(e) {
                        $("#add-subcategory-form .subcategory.img-icon").upload("abort");
                        $("#add-subcategory-form .subcategory.progress").addClass("d-none");
                        $("#add-subcategory-form .subcategory.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                        $("#add-subcategory-form .subcategory.progress .progress-bar .file-percent").html("0%");
                        $("#add-subcategory-form .subcategory.progress .progress-bar .file-size").html("");
                        $("#add-subcategory-form .subcategory.progress .progress-bar").css({"width": "0"});
                    }

                    function onBeforeSend(formData) {
                        return formData;
                    }

                    function onQueued(event, files) {
                    }

                    function onStart(event) {
                    }

                    function onComplete(event) {
                    }

                    function onFileStart(event, file) {
                        $("#add-subcategory-form .subcategory.progress").removeClass("d-none");
                        $("#add-subcategory-form .subcategory.progress .progress-bar .file-percent").html("0%");
                        $("#add-subcategory-form .subcategory.progress .progress-bar").css({"width": "0"});
                    }

                    function onFileProgress(event, file, percent) {
                        $("#add-subcategory-form .subcategory.progress .progress-bar .file-percent").html(percent + "%");
                        $("#add-subcategory-form .subcategory.progress .progress-bar").css({"width": percent + "%"})
                    }

                    function onFileComplete(event, file, response) {
                        let fileSize = utility.getFormatBytes(file['size']);
                        $("#add-subcategory-form .subcategory.progress .progress-bar").removeClass("progress-bar-striped").addClass("bg-success");
                        $("#add-subcategory-form .subcategory.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                        let sub_img = document.getElementById('subcategory-new-img-cropper');
                        sub_img.src = JSON.parse(response).data;

                        setTimeout(
                            function () {
                                $("#add-subcategory-form .subcategory.progress").addClass("d-none");
                                $("#add-subcategory-form .subcategory.cropper-img").removeClass("d-none");
                                $("#add-subcategory-form .subcategory.trash-icon").removeClass("d-none");
                                $("#add-subcategory-form .subcategory.img-icon").addClass("d-none");
                                $("#add-subcategory-form #subCategoryImg").val(JSON.parse(response).filename);
                                $("#add-subcategory-form #subCategoryIsNewImg").val("True");
                                $("#add-subcategory-form #subCategoryImg, #add-subcategory-form .subcategory.img-icon").addClass("pointer-events-none");

                                $("#add-subcategory-form").find(".add-subcategory-img-error span").removeData("i18n");
                                $("#add-subcategory-form").find(".add-subcategory-img-error span").text("");
                                $("#add-subcategory-form").find(".add-subcategory-img-error").addClass("d-none");

                                $("#add-subcategory-form .subcategory.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                                $("#add-subcategory-form .subcategory.progress .progress-bar .file-percent").html("0%");
                                $("#add-subcategory-form .subcategory.progress .progress-bar .file-size").html("");
                                $("#add-subcategory-form .subcategory.progress .progress-bar").css({"width": "0"});
                                $("#add-subcategory-form .subcategory.trash-back-icon").addClass("d-none");

                                setTimeout(
                                    function () {
                                        subCropper = new Cropper(sub_img, {
                                            viewMode: 1,
                                            aspectRatio: 16 / 9,
                                            dragMode: 'move',
                                            cropBoxMovable: false,
                                            cropBoxResizable: false,
                                            toggleDragModeOnDblclick: false,
                                            responsive: true,
                                            crop: function (event) {
                                                let width = event.detail.width,
                                                    height = event.detail.height,
                                                    x = event.detail.x,
                                                    y = event.detail.y,
                                                    x2 = (Math.round(x) + Math.round(width)),
                                                    y2 = (Math.round(y) + Math.round(height)),
                                                    rotate = event.detail.rotate,
                                                    scaleX = event.detail.scaleX,
                                                    scaleY = event.detail.scaleY;
                                                subCategoryCropData = {
                                                    "aspectRatio": 16 / 9,
                                                    "width": width,
                                                    "height": height,
                                                    "x": x,
                                                    "y": y,
                                                    "x2": x2,
                                                    "y2": y2,
                                                    "rotate": rotate,
                                                    "scaleX": scaleX,
                                                    "scaleY": scaleY,
                                                    "folder": JSON.parse(response).folder,
                                                    "filename": JSON.parse(response).filename,
                                                };
                                                $("#subCategoryImgData").val(JSON.stringify(subCategoryCropData));
                                            }
                                        });
                                    }, 500);

                            }, 2000);
                    }

                    function onFileError(event, file, error) {
                        if (error) {
                            subFileError = {"fileSize": utility.getFormatBytes(file['size']), "error": error}

                            $("#add-subcategory-form .subcategory.progress").addClass("d-none");
                            $("#add-subcategory-form .subcategory.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                            $("#add-subcategory-form .subcategory.progress .progress-bar .file-percent").html("0%");
                            $("#add-subcategory-form .subcategory.progress .progress-bar .file-size").html("");
                            $("#add-subcategory-form .subcategory.progress .progress-bar").css({"width": "0"});

                            let $addSubCategoryForm = $("#add-subcategory-form");

                            if (subFileError['error'] === "Request Entity Too Large") {
                                $addSubCategoryForm.find(".add-subcategory-img-error span").removeData("i18n");
                                $addSubCategoryForm.find(".add-subcategory-img-error span").text("");
                                $addSubCategoryForm.find(".add-subcategory-img-error span").attr("data-i18n", "anlihouse-A136");
                                $addSubCategoryForm.find(".add-subcategory-img-error").removeClass("d-none");
                                $('body').i18n();
                            } else if (subFileError['error'] === "Unsupported Media Type") {
                                $addSubCategoryForm.find(".add-subcategory-img-error span").removeData("i18n");
                                $addSubCategoryForm.find(".add-subcategory-img-error span").text("");
                                $addSubCategoryForm.find(".add-subcategory-img-error span").attr("data-i18n", "anlihouse-A134");
                                $addSubCategoryForm.find(".add-subcategory-img-error").removeClass("d-none");
                                $('body').i18n();
                            }

                        }
                    }

                    $("#add-subcategory-form .subcategory.img-icon .fs-upload-target").trigger("click");
                });

            },

            deleteSubCategory: function () {
                $("body").on("click", "#delete-subcategory-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);
                    let $lock = _this.find(".delete-lock");
                    let $unlock = _this.find(".delete-unlock");

                    if ($unlock.hasClass("active")) {
                        $.ajax({
                            type: "POST",
                            url: "/_delete-subcategory",
                            contentType: "application/json",
                            data: JSON.stringify($("#add-subcategory-form").serializeObject()),
                            beforeSend: function (xhr) {
                                _this.attr('disabled', true);
                                _this.addClass("action");
                                //$("#addSubCategory").addClass("filter-grayscale-100");
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
                                            window.location.href = utility.getURL() + "/category";
                                        }, 1500);
                                }
                            },
                            error: function (xhr, status, error) {
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
                loadSubCategory.deeplSubCategory();
                loadSubCategory.addSubCategory();
                loadSubCategory.editSubCategory();
                loadSubCategory.subCategoryImg();
                loadSubCategory.deleteSubCategory();
            }

        };

        $(function () {
            loadSubCategory.initializ()
        });
    }
}

export let anlibreedersSubCategory = new AnlibreedersSubCategory();