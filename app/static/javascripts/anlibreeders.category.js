import AnlibreedersUtility from './utilities/anlibreeders.utility'
import autosize from "autosize/dist/autosize";

const utility = new AnlibreedersUtility();

class AnlibreedersCategory {
    loadAnlibreedersCategory() {
        const loadCategory = {

            categoryInputClear() {

                let $addCategoryForm = $("#add-category-form");
                let $categoryProgress = $("#add-category-form .category.progress");
                let $categoryProgressBar = $categoryProgress.find(".progress-bar");
                let $categoryProgressBarFilePercent = $categoryProgressBar.find(".file-percent");
                let $categoryProgressBarFileSize = $categoryProgressBar.find(".file-size");
                let $categoryCropperImg = $("#add-category-form .category.cropper-img");
                let $categoryCropperImgEdit = $("#add-category-form .category.cropper-img-edit");
                let $categoryCropperBackIcon = $("#add-category-form .category.crop-back-icon");
                let $categoryTrashIcon = $("#add-category-form .category.trash-icon");
                let $categoryImgIcon = $("#add-category-form .category.img-icon");
                let $categoryCropIcon = $("#add-category-form .category.crop-icon");
                let $categoryEditImgPreview = $("#add-category-form .category-edit-img-preview");
                let $deleteCategoryFormButton = $("#add-category-form #delete-category-form-button");
                let $addCategoryFormInputError = $("#add-category-form .input-error");


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

                $("#add-category-form input").val(null);
                $("#add-category-form textarea").val(null);
                $("#add-category-form #categoryIsEditImg").val(null);
                $("#add-category-form #categoryIsRmImg").val(null);
                $("#add-category-form #categoryIsNewImg").val(null);
                $("#add-category-form #categoryImg, #add-category-form .category.img-icon").removeClass("pointer-events-none");

                $deleteCategoryFormButton.find(".delete-lock").removeClass("inactive d-none").addClass("active");
                $deleteCategoryFormButton.find(".delete-unlock").removeClass("active").addClass("inactive d-none");
                $deleteCategoryFormButton.addClass("btn-danger").removeClass("btn-primary");

                $(".cropper-container.cropper-bg").each(function () {
                    $(this).detach();
                });

                $addCategoryFormInputError.each(function () {
                    $(this).addClass("d-none");
                    $(this).find("span").removeData("i18n");
                    $(this).find("span").text("");
                });

                $addCategoryForm.find(".form-alert-danger").addClass("d-none");
            },

            deeplCategory: function () {

                $("body").on("click", "#addCategory .translate-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataTranslate = _this.attr("data-translate");

                    let $categoryNameHU = $("#categoryNameHU");
                    let $categoryNameEN = $("#categoryNameEN");
                    let $categoryNameDE = $("#categoryNameDE");
                    let $categoryNameFR = $("#categoryNameFR");
                    let $categoryNameES = $("#categoryNameES");

                    let text;

                    if (dataTranslate === "HU") {
                        text = $categoryNameHU.val();
                    }

                    if (dataTranslate === "EN") {
                        text = $categoryNameEN.val();
                    }

                    if (dataTranslate === "DE") {
                        text = $categoryNameDE.val();
                    }

                    if (dataTranslate === "FR") {
                        text = $categoryNameFR.val();
                    }

                    if (dataTranslate === "ES") {
                        text = $categoryNameES.val();
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
                            //$("#addCategory").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                            $("#addCategory .translate-icon").addClass("pointer-events-none");
                        },
                        success: function (result, status, xhr) {
                            $categoryNameHU.val(result['message']['HU']);
                            $categoryNameEN.val(result['message']['EN']);
                            $categoryNameDE.val(result['message']['DE']);
                            $categoryNameFR.val(result['message']['FR']);
                            $categoryNameES.val(result['message']['ES']);
                        },
                        complete: function (xhr, status) {
                            //$("#addCategory").removeClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("inactive active");
                            $("body").removeAttr("style");
                            $("#addCategory .translate-icon").removeClass("pointer-events-none");
                        },
                        error: function (xhr, status, error) {
                        }
                    });

                });

                $("body").on("click", "#addCategory .translate-gender-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataTranslate = _this.attr("data-translate");

                    let $categoryGenderHU = $("#categoryGenderHU");
                    let $categoryGenderEN = $("#categoryGenderEN");
                    let $categoryGenderDE = $("#categoryGenderDE");
                    let $categoryGenderFR = $("#categoryGenderFR");
                    let $categoryGenderES = $("#categoryGenderES");

                    let text;

                    if (dataTranslate === "HU") {
                        text = $categoryGenderHU.val();
                    }

                    if (dataTranslate === "EN") {
                        text = $categoryGenderEN.val();
                    }

                    if (dataTranslate === "DE") {
                        text = $categoryGenderDE.val();
                    }

                    if (dataTranslate === "FR") {
                        text = $categoryGenderFR.val();
                    }

                    if (dataTranslate === "ES") {
                        text = $categoryGenderES.val();
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
                            //$("#addCategory").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                            $("#addCategory .translate-icon").addClass("pointer-events-none");
                        },
                        success: function (result, status, xhr) {
                            $categoryGenderHU.val(result['message']['HU']);
                            $categoryGenderEN.val(result['message']['EN']);
                            $categoryGenderDE.val(result['message']['DE']);
                            $categoryGenderFR.val(result['message']['FR']);
                            $categoryGenderES.val(result['message']['ES']);

                            autosize.update($("#categoryGenderHU"));
                            autosize.update($("#categoryGenderEN"));
                            autosize.update($("#categoryGenderDE"));
                            autosize.update($("#categoryGenderFR"));
                            autosize.update($("#categoryGenderES"));
                        },
                        complete: function (xhr, status) {
                            //$("#addCategory").removeClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("inactive active");
                            $("body").removeAttr("style");
                            $("#addCategory .translate-icon").removeClass("pointer-events-none");
                        },
                        error: function (xhr, status, error) {
                        }
                    });

                });

                $("body").on("click", "#addCategory .translate-be-used-for-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataTranslate = _this.attr("data-translate");

                    let $categoryBeUsedForHU = $("#categoryBeUsedForHU");
                    let $categoryBeUsedForEN = $("#categoryBeUsedForEN");
                    let $categoryBeUsedForDE = $("#categoryBeUsedForDE");
                    let $categoryBeUsedForFR = $("#categoryBeUsedForFR");
                    let $categoryBeUsedForES = $("#categoryBeUsedForES");

                    let text;

                    if (dataTranslate === "HU") {
                        text = $categoryBeUsedForHU.val();
                    }

                    if (dataTranslate === "EN") {
                        text = $categoryBeUsedForEN.val();
                    }

                    if (dataTranslate === "DE") {
                        text = $categoryBeUsedForDE.val();
                    }

                    if (dataTranslate === "FR") {
                        text = $categoryBeUsedForFR.val();
                    }

                    if (dataTranslate === "ES") {
                        text = $categoryBeUsedForES.val();
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
                            //$("#addCategory").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                            $("#addCategory .translate-icon").addClass("pointer-events-none");
                        },
                        success: function (result, status, xhr) {
                            $categoryBeUsedForHU.val(result['message']['HU']);
                            $categoryBeUsedForEN.val(result['message']['EN']);
                            $categoryBeUsedForDE.val(result['message']['DE']);
                            $categoryBeUsedForFR.val(result['message']['FR']);
                            $categoryBeUsedForES.val(result['message']['ES']);

                            autosize.update($("#categoryBeUsedForHU"));
                            autosize.update($("#categoryBeUsedForEN"));
                            autosize.update($("#categoryBeUsedForDE"));
                            autosize.update($("#categoryBeUsedForFR"));
                            autosize.update($("#categoryBeUsedForES"));
                        },
                        complete: function (xhr, status) {
                            //$("#addCategory").removeClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("inactive active");
                            $("body").removeAttr("style");
                            $("#addCategory .translate-icon").removeClass("pointer-events-none");
                        },
                        error: function (xhr, status, error) {
                        }
                    });

                });

                $("body").on("click", "#addCategory .translate-color-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataTranslate = _this.attr("data-translate");

                    let $categoryColorHU = $("#categoryColorHU");
                    let $categoryColorEN = $("#categoryColorEN");
                    let $categoryColorDE = $("#categoryColorDE");
                    let $categoryColorFR = $("#categoryColorFR");
                    let $categoryColorES = $("#categoryColorES");

                    let text;

                    if (dataTranslate === "HU") {
                        text = $categoryColorHU.val();
                    }

                    if (dataTranslate === "EN") {
                        text = $categoryColorEN.val();
                    }

                    if (dataTranslate === "DE") {
                        text = $categoryColorDE.val();
                    }

                    if (dataTranslate === "FR") {
                        text = $categoryColorFR.val();
                    }

                    if (dataTranslate === "ES") {
                        text = $categoryColorES.val();
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
                            //$("#addCategory").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                            $("#addCategory .translate-icon").addClass("pointer-events-none");
                        },
                        success: function (result, status, xhr) {
                            $categoryColorHU.val(result['message']['HU']);
                            $categoryColorEN.val(result['message']['EN']);
                            $categoryColorDE.val(result['message']['DE']);
                            $categoryColorFR.val(result['message']['FR']);
                            $categoryColorES.val(result['message']['ES']);

                            autosize.update($("#categoryColorHU"));
                            autosize.update($("#categoryColorEN"));
                            autosize.update($("#categoryColorDE"));
                            autosize.update($("#categoryColorFR"));
                            autosize.update($("#categoryColorES"));
                        },
                        complete: function (xhr, status) {
                            //$("#addCategory").removeClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("inactive active");
                            $("body").removeAttr("style");
                            $("#addCategory .translate-icon").removeClass("pointer-events-none");
                        },
                        error: function (xhr, status, error) {
                        }
                    });

                });

            },

            addCategory: function () {
                $("input[class='category-visibility-checkbox']").checkbox({
                    // toggle: true
                });

                autosize(document.querySelector("#categoryGenderHU"));
                autosize(document.querySelector("#categoryGenderEN"));
                autosize(document.querySelector("#categoryGenderDE"));
                autosize(document.querySelector("#categoryGenderFR"));
                autosize(document.querySelector("#categoryGenderES"));

                autosize(document.querySelector("#categoryBeUsedForHU"));
                autosize(document.querySelector("#categoryBeUsedForEN"));
                autosize(document.querySelector("#categoryBeUsedForDE"));
                autosize(document.querySelector("#categoryBeUsedForFR"));
                autosize(document.querySelector("#categoryBeUsedForES"));

                autosize(document.querySelector("#categoryColorHU"));
                autosize(document.querySelector("#categoryColorEN"));
                autosize(document.querySelector("#categoryColorDE"));
                autosize(document.querySelector("#categoryColorFR"));
                autosize(document.querySelector("#categoryColorES"));

                $("body").on("click", ".CategoryWrap #addCategoryIcon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    loadCategory.categoryInputClear();

                    $("#add-category-form #categoryVisibility").val("True");
                    $("#CategoryCheckboxVisibility").prop("checked", true);
                    $("#CategoryCheckboxVisibility").checkbox("update");

                    $('#addCategory').modal('show');
                });

                $("body").on("click", ".modal#addCategory .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#addCategory').modal('hide');

                    loadCategory.categoryInputClear();
                });

                $("body").on("change", "#add-category-form #CategoryCheckboxVisibility", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.is(':checked')) {
                        $("#add-category-form #categoryVisibility").val("True");
                    } else {
                        $("#add-category-form #categoryVisibility").val("False");
                    }
                });

                $("body").on("click", "#add-category-form #add-category-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $.ajax({
                        type: "POST",
                        url: "/_add-category",
                        contentType: "application/json",
                        data: JSON.stringify($("#add-category-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("#addCategory").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let $addCategoryForm = $("#add-category-form");
                                let $addCategoryFormInputError = $("#add-category-form .input-error");

                                $addCategoryFormInputError.each(function () {
                                    $(this).addClass("d-none");
                                    $(this).find("span").removeData("i18n");
                                    $(this).find("span").text("");
                                });

                                $addCategoryForm.find(".form-alert-danger").addClass("d-none");

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
                                        let $addCategoryForm = $("#add-category-form");
                                        $addCategoryForm.find(".form-alert-danger").removeClass("d-none");

                                        $(".modal#addCategory").animate({scrollTop: 0}, 500);

                                        if (result['message']['message']['name_hu']) {
                                            $addCategoryForm.find(".add-category-name-hu-error span").removeData("i18n");
                                            $addCategoryForm.find(".add-category-name-hu-error span").text("");
                                            $addCategoryForm.find(".add-category-name-hu-error span").attr("data-i18n", result['message']['message']['name_hu']);
                                            $addCategoryForm.find(".add-category-name-hu-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addCategoryForm.find(".add-category-name-hu-error span").removeData("i18n");
                                            $addCategoryForm.find(".add-category-name-hu-error span").text("");
                                            $addCategoryForm.find(".add-category-name-hu-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['name_en']) {
                                            $addCategoryForm.find(".add-category-name-en-error span").removeData("i18n");
                                            $addCategoryForm.find(".add-category-name-en-error span").text("");
                                            $addCategoryForm.find(".add-category-name-en-error span").attr("data-i18n", result['message']['message']['name_en']);
                                            $addCategoryForm.find(".add-category-name-en-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addCategoryForm.find(".add-category-name-en-error span").removeData("i18n");
                                            $addCategoryForm.find(".add-category-name-en-error span").text("");
                                            $addCategoryForm.find(".add-category-name-en-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['name_de']) {
                                            $addCategoryForm.find(".add-category-name-de-error span").removeData("i18n");
                                            $addCategoryForm.find(".add-category-name-de-error span").text("");
                                            $addCategoryForm.find(".add-category-name-de-error span").attr("data-i18n", result['message']['message']['name_de']);
                                            $addCategoryForm.find(".add-category-name-de-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addCategoryForm.find(".add-category-name-de-error span").removeData("i18n");
                                            $addCategoryForm.find(".add-category-name-de-error span").text("");
                                            $addCategoryForm.find(".add-category-name-de-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['name_fr']) {
                                            $addCategoryForm.find(".add-category-name-fr-error span").removeData("i18n");
                                            $addCategoryForm.find(".add-category-name-fr-error span").text("");
                                            $addCategoryForm.find(".add-category-name-fr-error span").attr("data-i18n", result['message']['message']['name_fr']);
                                            $addCategoryForm.find(".add-category-name-fr-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addCategoryForm.find(".add-category-name-fr-error span").removeData("i18n");
                                            $addCategoryForm.find(".add-category-name-fr-error span").text("");
                                            $addCategoryForm.find(".add-category-name-fr-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['name_es']) {
                                            $addCategoryForm.find(".add-category-name-es-error span").removeData("i18n");
                                            $addCategoryForm.find(".add-category-name-es-error span").text("");
                                            $addCategoryForm.find(".add-category-name-es-error span").attr("data-i18n", result['message']['message']['name_es']);
                                            $addCategoryForm.find(".add-category-name-es-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $addCategoryForm.find(".add-category-name-es-error span").removeData("i18n");
                                            $addCategoryForm.find(".add-category-name-es-error span").text("");
                                            $addCategoryForm.find(".add-category-name-es-error").addClass("d-none");
                                            $('body').i18n();
                                        }


                                    }
                                    $("#addCategory").removeClass("filter-grayscale-100");
                                    $("#post-loader").toggleClass("inactive active");
                                    $("body").removeAttr("style");
                                    _this.attr('disabled', false);
                                    _this.removeClass("action");
                                }, 1500);
                        }
                    });

                });

            },

            editCategory: function () {
                let cropperEdit;
                let categoryCropEditData;
                let img_data;
                let img_data_json;

                $("body").on("click", ".container .CategoryWrap .icon-click.edit-category", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperEdit) {
                        cropperEdit.destroy();
                    }

                    loadCategory.categoryInputClear();

                    let dataId = _this.attr("data-id");
                    let getCategoryData;

                    $.ajax({
                        type: "POST",
                        url: "/_get-category",
                        contentType: "application/json",
                        data: JSON.stringify({"id": dataId}),
                        beforeSend: function (xhr) {
                        },
                        success: function (result, status, xhr) {
                            getCategoryData = result['message'][0];
                        },
                        complete: function (xhr, status) {
                            let category_id = getCategoryData['category_id']
                            let visibility = getCategoryData['visibility']
                            img_data = getCategoryData['img_data'];
                            img_data_json = JSON.parse(img_data);
                            let name_hu = getCategoryData['name_hu']
                            let name_en = getCategoryData['name_en']
                            let name_de = getCategoryData['name_de']
                            let name_fr = getCategoryData['name_fr']
                            let name_es = getCategoryData['name_es']
                            let gender_hu = getCategoryData['gender_hu']
                            let gender_en = getCategoryData['gender_en']
                            let gender_de = getCategoryData['gender_de']
                            let gender_fr = getCategoryData['gender_fr']
                            let gender_es = getCategoryData['gender_es']
                            let be_used_for_hu = getCategoryData['be_used_for_hu']
                            let be_used_for_en = getCategoryData['be_used_for_en']
                            let be_used_for_de = getCategoryData['be_used_for_de']
                            let be_used_for_fr = getCategoryData['be_used_for_fr']
                            let be_used_for_es = getCategoryData['be_used_for_es']
                            let color_hu = getCategoryData['color_hu']
                            let color_en = getCategoryData['color_en']
                            let color_de = getCategoryData['color_de']
                            let color_fr = getCategoryData['color_fr']
                            let color_es = getCategoryData['color_es']
                            let img = getCategoryData['img']
                            let category_user_id = getCategoryData['category_user_id']
                            let category_user_name = getCategoryData['category_user_name']
                            let created_at = getCategoryData['created_at']
                            let updated_at = getCategoryData['updated_at']

                            if (visibility === "True") {
                                $("#add-category-form #CategoryCheckboxVisibility").prop("checked", true);
                                $("#CategoryCheckboxVisibility").checkbox("update");
                            } else {
                                $("#add-category-form #CategoryCheckboxVisibility").prop("checked", false);
                                $("#CategoryCheckboxVisibility").checkbox("update");
                            }

                            if (img !== null) {
                                $("#add-category-form .category.crop-icon").removeClass("d-none");
                                $("#add-category-form .category.trash-icon").removeClass("d-none");
                                $("#add-category-form .category.img-icon").addClass("d-none");
                                $("#add-category-form #categoryImg, #add-category-form .category.img-icon").addClass("pointer-events-none");

                                let img_preview = document.getElementById('category-edit-img-preview');
                                img_preview.src = "/static/images/category/" + img_data_json['folder'] + "/cropped/" + img_data_json['filename'];
                                $("#add-category-form .category-edit-img-preview").removeClass("d-none");
                            } else {
                                $("#add-category-form .category.crop-icon").addClass("d-none");
                                $("#add-category-form .category.crop-back-icon").addClass("d-none");
                                $("#add-category-form .category.trash-icon").addClass("d-none");
                                $("#add-category-form .category.img-icon").removeClass("d-none");
                                $("#add-category-form #categoryImg, #add-category-form .category.img-icon").removeClass("pointer-events-none");

                                $("#add-category-form .category-edit-img-preview").addClass("d-none");
                            }

                            $("#add-category-form #categoryId").val(category_id);
                            $("#add-category-form #categoryVisibility").val(visibility);
                            $("#add-category-form #categoryImgData").val(img_data);
                            $("#add-category-form #categoryImgDataOld").val(img_data);
                            $("#add-category-form #categoryNameHU").val(name_hu);
                            $("#add-category-form #categoryNameEN").val(name_en);
                            $("#add-category-form #categoryNameDE").val(name_de);
                            $("#add-category-form #categoryNameFR").val(name_fr);
                            $("#add-category-form #categoryNameES").val(name_es);
                            $("#add-category-form #categoryGenderHU").val(gender_hu);
                            $("#add-category-form #categoryGenderEN").val(gender_en);
                            $("#add-category-form #categoryGenderDE").val(gender_de);
                            $("#add-category-form #categoryGenderFR").val(gender_fr);
                            $("#add-category-form #categoryGenderES").val(gender_es);
                            $("#add-category-form #categoryBeUsedForHU").val(be_used_for_hu);
                            $("#add-category-form #categoryBeUsedForEN").val(be_used_for_en);
                            $("#add-category-form #categoryBeUsedForDE").val(be_used_for_de);
                            $("#add-category-form #categoryBeUsedForFR").val(be_used_for_fr);
                            $("#add-category-form #categoryBeUsedForES").val(be_used_for_es);
                            $("#add-category-form #categoryColorHU").val(color_hu);
                            $("#add-category-form #categoryColorEN").val(color_en);
                            $("#add-category-form #categoryColorDE").val(color_de);
                            $("#add-category-form #categoryColorFR").val(color_fr);
                            $("#add-category-form #categoryColorES").val(color_es);
                            if (img_data_json !== null) {
                                $("#add-category-form #categoryImg").val(img_data_json['filename']);
                            } else {
                                $("#add-category-form #categoryImg").val(null);
                            }

                            $("#add-category-form #delete-category-form-button").removeClass("d-none");

                            $('#addCategory').modal('show');
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                });

                $("body").on("click", "#add-category-form .category.crop-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#add-category-form .category.crop-back-icon").removeClass("d-none");
                    $("#add-category-form .category.trash-icon").addClass("d-none");
                    $("#add-category-form #categoryIsEditImg").val("True");

                    if (cropperEdit) {
                        cropperEdit.destroy();
                    }

                    let img_edit = document.getElementById('category-new-img-cropper-edit');
                    img_edit.src = "/static/images/category/" + img_data_json['folder'] + "/origin/" + img_data_json['filename'];

                    setTimeout(
                        function () {
                            $("#add-category-form .category-edit-img-preview").addClass("d-none");
                            $("#add-category-form .category.cropper-img-edit").removeClass("d-none");

                            setTimeout(
                                function () {
                                    cropperEdit = new Cropper(img_edit, {
                                        viewMode: 1,
                                        aspectRatio: 1,
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
                                            categoryCropEditData = {
                                                "aspectRatio": 1,
                                                "width": width,
                                                "height": height,
                                                "x": x,
                                                "y": y,
                                                "x2": x2,
                                                "y2": y2,
                                                "rotate": rotate,
                                                "scaleX": scaleX,
                                                "scaleY": scaleY,
                                                "folder": img_data_json['folder'],
                                                "filename": img_data_json['filename'],
                                            };
                                            $("#categoryImgData").val(JSON.stringify(categoryCropEditData));
                                        }
                                    });
                                }, 500);

                        }, 500);


                });

                $("body").on("click", "#add-category-form .category.crop-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#add-category-form .category.crop-icon").removeClass("d-none");
                    $("#add-category-form .category.trash-icon").removeClass("d-none");
                    $("#add-category-form #categoryImgData").val(img_data);
                    $("#add-category-form #categoryIsEditImg").val(null);

                    if (cropperEdit) {
                        cropperEdit.destroy();
                    }

                    $("#add-category-form .category.cropper-img-edit").addClass("d-none");
                    $("#add-category-form .category-edit-img-preview").removeClass("d-none");
                });
            },

            categoryImg: function () {
                let cropper;
                let categoryCropData;
                let fileError;

                $("body").on("click", "#add-category-form .category.trash-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropper) {
                        cropper.destroy();
                        categoryCropData = {};
                    }

                    $(".cropper-container.cropper-bg").each(function () {
                        $(this).detach();
                    });

                    $("#add-category-form #categoryImgData").val(null);
                    $("#add-category-form #categoryImg").val(null);
                    $("#add-category-form #categoryIsNewImg").val(null);
                    $("#add-category-form #categoryIsRmImg").val("True");
                    $("#add-category-form .category.trash-icon").addClass("d-none");
                    $("#add-category-form .category.crop-icon").addClass("d-none");
                    $("#add-category-form .category.crop-back-icon").addClass("d-none");
                    $("#add-category-form .category.img-icon").removeClass("d-none");
                    $("#add-category-form .category.cropper-img").addClass("d-none");
                    $("#add-category-form .category.category-edit-img-preview").addClass("d-none");
                    $("#add-category-form #categoryImg, #add-category-form .category.img-icon").removeClass("pointer-events-none");
                    if ($("#add-category-form #categoryImgDataOld").val() !== "") {
                        $("#add-category-form .category.trash-back-icon").removeClass("d-none");
                    }
                });

                $("body").on("click", "#add-category-form .category.trash-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#add-category-form .category.crop-icon").removeClass("d-none");
                    $("#add-category-form #categoryIsRmImg").val(null);
                    $("#add-category-form #categoryImgData").val($("#add-category-form #categoryImgDataOld").val());

                    let $uploadingCategoryImgShow = $("#add-category-form .uploadingCategoryImgShow");

                    if (cropper) {
                        cropper.destroy();
                        categoryCropData = {};
                    }

                    $uploadingCategoryImgShow.find(".category.cropper-img-edit").addClass("d-none");
                    $uploadingCategoryImgShow.find(".category.img-icon").addClass("d-none");
                    $uploadingCategoryImgShow.find(".category.trash-icon").removeClass("d-none");

                    let categoryImgDataOld = JSON.parse($("#add-category-form #categoryImgDataOld").val());

                    $uploadingCategoryImgShow.find(".category.category-edit-img-preview #category-edit-img-preview").attr("src", "/static/images/category/" + categoryImgDataOld['folder'] + "/cropped/" + categoryImgDataOld['filename']);
                    $uploadingCategoryImgShow.find(".category.category-edit-img-preview").removeClass("d-none");
                    $("#add-category-form #categoryImg").addClass("pointer-events-none");
                    $("#add-category-form #categoryImg").val(categoryImgDataOld['filename']);
                });

                $("body").on("click", "#add-category-form #categoryImg, #add-category-form .category.img-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropper) {
                        cropper.destroy();
                        categoryCropData = {};
                    }

                    let maxSize;
                    if (process.env.NODE_ENV === "production") {
                        maxSize = process.env.PRODUCTION_IMG_MAX_SIZE // Bytes == 25 Megabytes
                    } else {
                        maxSize = process.env.DEVELOPMENT_IMG_MAX_SIZE // Bytes == 250 Megabytes
                    }

                    $("#add-category-form .category.img-icon").upload({
                        "action": "category-img-upload",
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

                    $("#add-category-form").off("click", ".img-cancel.progress-rm");
                    $("#add-category-form").on("click", ".img-cancel.progress-rm", onCancel);

                    function onCancel(e) {
                        $("#add-category-form .category.img-icon").upload("abort");
                        $("#add-category-form .category.progress").addClass("d-none");
                        $("#add-category-form .category.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                        $("#add-category-form .category.progress .progress-bar .file-percent").html("0%");
                        $("#add-category-form .category.progress .progress-bar .file-size").html("");
                        $("#add-category-form .category.progress .progress-bar").css({"width": "0"});
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
                        $("#add-category-form .category.progress").removeClass("d-none");
                        $("#add-category-form .category.progress .progress-bar .file-percent").html("0%");
                        $("#add-category-form .category.progress .progress-bar").css({"width": "0"});
                    }

                    function onFileProgress(event, file, percent) {
                        $("#add-category-form .category.progress .progress-bar .file-percent").html(percent + "%");
                        $("#add-category-form .category.progress .progress-bar").css({"width": percent + "%"})
                    }

                    function onFileComplete(event, file, response) {
                        let fileSize = utility.getFormatBytes(file['size']);
                        $("#add-category-form .category.progress .progress-bar").removeClass("progress-bar-striped").addClass("bg-success");
                        $("#add-category-form .category.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                        let img = document.getElementById('category-new-img-cropper');
                        img.src = JSON.parse(response).data;

                        setTimeout(
                            function () {
                                $("#add-category-form .category.progress").addClass("d-none");
                                $("#add-category-form .category.cropper-img").removeClass("d-none");
                                $("#add-category-form .category.trash-icon").removeClass("d-none");
                                $("#add-category-form .category.img-icon").addClass("d-none");
                                $("#add-category-form #categoryImg").val(JSON.parse(response).filename);
                                $("#add-category-form #categoryIsNewImg").val("True");
                                $("#add-category-form #categoryImg, #add-category-form .category.img-icon").addClass("pointer-events-none");

                                $("#add-category-form").find(".add-category-img-error span").removeData("i18n");
                                $("#add-category-form").find(".add-category-img-error span").text("");
                                $("#add-category-form").find(".add-category-img-error").addClass("d-none");

                                $("#add-category-form .category.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                                $("#add-category-form .category.progress .progress-bar .file-percent").html("0%");
                                $("#add-category-form .category.progress .progress-bar .file-size").html("");
                                $("#add-category-form .category.progress .progress-bar").css({"width": "0"});
                                $("#add-category-form .category.trash-back-icon").addClass("d-none");

                                setTimeout(
                                    function () {
                                        cropper = new Cropper(img, {
                                            viewMode: 1,
                                            aspectRatio: 1,
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
                                                categoryCropData = {
                                                    "aspectRatio": 1,
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
                                                $("#categoryImgData").val(JSON.stringify(categoryCropData));
                                            }
                                        });
                                    }, 500);

                            }, 2000);
                    }

                    function onFileError(event, file, error) {
                        if (error) {
                            fileError = {"fileSize": utility.getFormatBytes(file['size']), "error": error}

                            $("#add-category-form .category.progress").addClass("d-none");
                            $("#add-category-form .category.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                            $("#add-category-form .category.progress .progress-bar .file-percent").html("0%");
                            $("#add-category-form .category.progress .progress-bar .file-size").html("");
                            $("#add-category-form .category.progress .progress-bar").css({"width": "0"});

                            let $addCategoryForm = $("#add-category-form");

                            if (fileError['error'] === "Request Entity Too Large") {
                                $addCategoryForm.find(".add-category-img-error span").removeData("i18n");
                                $addCategoryForm.find(".add-category-img-error span").text("");
                                $addCategoryForm.find(".add-category-img-error span").attr("data-i18n", "anlihouse-A136");
                                $addCategoryForm.find(".add-category-img-error").removeClass("d-none");
                                $('body').i18n();
                            } else if (fileError['error'] === "Unsupported Media Type") {
                                $addCategoryForm.find(".add-category-img-error span").removeData("i18n");
                                $addCategoryForm.find(".add-category-img-error span").text("");
                                $addCategoryForm.find(".add-category-img-error span").attr("data-i18n", "anlihouse-A134");
                                $addCategoryForm.find(".add-category-img-error").removeClass("d-none");
                                $('body').i18n();
                            }

                        }
                    }

                    $("#add-category-form .category.img-icon .fs-upload-target").trigger("click");
                });

            },

            deleteCategory: function () {
                $("body").on("click", "#delete-category-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);
                    let $lock = _this.find(".delete-lock");
                    let $unlock = _this.find(".delete-unlock");

                    if ($unlock.hasClass("active")) {
                        $.ajax({
                            type: "POST",
                            url: "/_delete-category",
                            contentType: "application/json",
                            data: JSON.stringify($("#add-category-form").serializeObject()),
                            beforeSend: function (xhr) {
                                _this.attr('disabled', true);
                                _this.addClass("action");
                                //$("#addCategory").addClass("filter-grayscale-100");
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

            categoryToSubcategories: function () {
                let $subcategoryWrap = $("#SubCategoryWrap");


                function toggleOn(_this = null, dataId) {
                    if (_this !== null) {
                        $(".category-toggle-on").each(function () {
                            $(this).removeClass("category-toggle-on").addClass("category-toggle-off");
                            $(this).attr("style", "cursor:pointer;pointer-events:auto;")
                            $(this).html("<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentGender' class='bi bi-toggle-off' viewBox='0 0 16 16'><path d='M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z'/></svg>")
                        });

                        _this.removeClass("category-toggle-off").addClass("category-toggle-on");
                        _this.attr("style", "cursor:default;pointer-events:none;");
                        _this.html("<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' class='bi bi-toggle-on' viewBox='0 0 16 16'><path d='M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z'/></svg>")
                    }

                    let subcategoriesData;
                    let subcategoriesLang;
                    $.ajax({
                        type: "POST",
                        url: "/_get-category-to-subcategories",
                        contentType: "application/json",
                        data: JSON.stringify({"category_id": dataId}),
                        beforeSend: function (xhr) {
                            // $("body").addClass("filter-grayscale-100");
                        },
                        success: function (result, status, xhr) {
                            subcategoriesData = result['message']
                            subcategoriesLang = result['lang']
                        },
                        complete: function (xhr, status) {
                            let $tbodySubcategory = $(".SubCategoryWrap .tbody-subcategory");

                            $tbodySubcategory.html("");

                            for (let i = 0; i < subcategoriesData.length; i++) {

                                let img_svg;
                                if (subcategoriesData[i]['img'] !== null) {
                                    img_svg = "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' class='bi bi-check-lg' viewBox='0 0 16 16'><path d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z'/></svg>"
                                } else {
                                    img_svg = "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='#dc3545' class='bi bi-x' viewBox='0 0 16 16'><path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/></svg>"
                                }

                                let visibility_svg;
                                if (subcategoriesData[i]['visibility'] === "True") {
                                    visibility_svg = "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' class='bi bi-check-lg' viewBox='0 0 16 16'><path d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z'/></svg>"
                                } else {
                                    visibility_svg = "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' class='bi bi-x' viewBox='0 0 16 16'><path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/></svg>"
                                }

                                $tbodySubcategory.append(
                                    "<tr>" +
                                    "<th scope='row'>#" +
                                    subcategoriesData[i]['subcategory_id'] +
                                    "</th>" +
                                    "<td>" +
                                    subcategoriesData[i]['name_' + subcategoriesLang] +
                                    "</td>" +
                                    "<td>" +
                                    img_svg +
                                    "</td>" +
                                    "<td>" +
                                    visibility_svg +
                                    "</td>" +
                                    "<td>" +
                                    "<a target='_blank' href='/user-management/user/" + subcategoriesData[i]['category_user_id'] + "'>" +
                                    subcategoriesData[i]['category_user_name'] +
                                    "</a>" +
                                    "</td>" +
                                    "<td data-time-llll='" + subcategoriesData[i]['updated_at'] + "'>" +
                                    utility.getDateTimeLLLL(subcategoriesData[i]['updated_at']) +
                                    "</td>" +
                                    "<td class='text-center'>" +
                                    "<span class='icon-click edit-subcategory' data-id='" + subcategoriesData[i]['subcategory_id'] + "'>" +
                                    "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentGender' class='bi bi-pencil-fill' viewBox='0 0 16 16'><path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z'/></svg>" +
                                    "</span>" +
                                    "</td>" +
                                    "</tr>"
                                );

                            }

                            setTimeout(
                                function () {
                                    if (_this !== null) {
                                        $('html,body').animate(
                                            {
                                                scrollTop: $subcategoryWrap.offset().top,
                                                queue: "scroll-subcategory"
                                            },
                                            {
                                                duration: 500,
                                                complete() {
                                                }
                                            }
                                        ).dequeue('scroll-subcategory').promise().done(function () {
                                            setTimeout(
                                                function () {
                                                    // $("body").removeClass("filter-grayscale-100");
                                                }, 500);
                                        });
                                    } else {
                                        // $("body").removeClass("filter-grayscale-100");
                                    }
                                }, 10);
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                }


                $("body").on("click", ".CategoryWrap .category-toggle-off", function (event) {
                        event.preventDefault();
                        const _this = $(this);

                        let dataCategoryId = _this.attr("data-id");
                        toggleOn(_this, dataCategoryId);

                    }
                );

                if ($(".CategoryWrap .category-toggle-on").attr("data-subcategory-run-id")) {
                    let dataSubcategoryRunId = $(".CategoryWrap .category-toggle-on").attr("data-subcategory-run-id");
                    toggleOn(null, dataSubcategoryRunId)
                }
            },

            initializ: function () {
                loadCategory.deeplCategory();
                loadCategory.addCategory();
                loadCategory.editCategory();
                loadCategory.categoryImg();
                loadCategory.deleteCategory();
                loadCategory.categoryToSubcategories();
            }

        };

        $(
            function () {
                loadCategory.initializ()
            }
        )
        ;
    }
}

export let anlibreedersCategory = new AnlibreedersCategory();