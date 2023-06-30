import AnlibreedersUtility from './utilities/anlibreeders.utility'
import autosize from "autosize/dist/autosize";
import numbro from "numbro"
import {cookies} from "brownies";
import PDFObject from "pdfobject";
import io from "socket.io-client";

const utility = new AnlibreedersUtility();

class AnlibreedersAnimal {
    loadAnlibreedersAnimal() {
        const loadAnimal = {

            setUploadAnimalCategorySelect(upload_animals_category_select_id = null) {
                let $uploadingAnimalCategorySelect = $('#uploading-animal-form .uploadingAnimalCategorySelect');
                let $uploadingAnimalCategoryId = $("#uploading-animal-form #uploadingAnimalCategoryId");
                let $uploadingAnimalCategoryIdName = $("#uploading-animal-form #uploadingAnimalCategoryIdName");

                let uploadingAnimalCategoryData;
                let uploadingAnimalCategoryLang;

                $.ajax({
                    type: "GET",
                    url: "/_get-category-select",
                    contentType: "application/json",
                    beforeSend: function (xhr) {
                    },
                    success: function (result, status, xhr) {
                        uploadingAnimalCategoryData = result['message']
                        uploadingAnimalCategoryLang = result['lang']
                    },
                    complete: function (xhr, status) {
                        $uploadingAnimalCategorySelect.selectpicker('destroy');

                        $uploadingAnimalCategorySelect.html("");

                        for (let i = 0; i < uploadingAnimalCategoryData.length; i++) {
                            if (uploadingAnimalCategoryData[i]['visibility'] !== "False" && uploadingAnimalCategoryData[i]['subcategory_count'] !== 0) {
                                $uploadingAnimalCategorySelect.append(
                                    "<option " +
                                    'value="' + uploadingAnimalCategoryData[i]['category_id'] + '"' + ' ' +
                                    'data-id="' + uploadingAnimalCategoryData[i]['category_id'] + '"' + ' ' +
                                    'data-tokens="' + uploadingAnimalCategoryData[i]['name_hu'] + '\xa0' + uploadingAnimalCategoryData[i]['name_en'] + '\xa0' + uploadingAnimalCategoryData[i]['name_de'] + '\xa0' + uploadingAnimalCategoryData[i]['name_fr'] + '\xa0' + uploadingAnimalCategoryData[i]['name_es'] + '"' + ' ' +
                                    'data-video-category="' + uploadingAnimalCategoryData[i]['name_en'] + '"' + ' ' +
                                    ">" +
                                    uploadingAnimalCategoryData[i]['name_' + uploadingAnimalCategoryLang] +
                                    "</option>"
                                );
                            }
                        }

                        $uploadingAnimalCategorySelect.selectpicker({
                            liveSearch: true
                        });

                        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                            $uploadingAnimalCategorySelect.selectpicker('mobile');
                        }

                        if (upload_animals_category_select_id !== null) {
                            $uploadingAnimalCategorySelect.val(upload_animals_category_select_id)
                        }

                        let allowedUploadingAnimalSelectUrl = window.location.pathname.split("/");
                        if (allowedUploadingAnimalSelectUrl[1] === 'edit-of-uploaded-animal') {
                            if ($uploadingAnimalCategoryId.val() !== null) {
                                $uploadingAnimalCategorySelect.val($uploadingAnimalCategoryId.val());
                                loadAnimal.setUploadAnimalSubcategorySelect($uploadingAnimalCategoryId.val());
                                loadAnimal.getCategoryAJAX($uploadingAnimalCategoryId.val());

                                if ($uploadingAnimalCategoryIdName.val() === "Horse") {
                                    $("#uploading-animal-form .rankingUrls").removeClass("d-none");
                                } else {
                                    $("#uploading-animal-form .rankingUrls").addClass("d-none");
                                }

                            }
                        }

                        $uploadingAnimalCategorySelect.selectpicker('refresh');
                        cookies.runAnimalSubcategory = true;
                    },
                    error: function (xhr, status, error) {
                    }
                });
            },

            setUploadAnimalSubcategorySelect(upload_animals_subcategory_select_id = null) {
                let $uploadingAnimalSubcategorySelect = $('#uploading-animal-form .uploadingAnimalSubcategorySelect');
                let $uploadingAnimalSubcategoryId = $("#uploading-animal-form #uploadingAnimalSubCategoryId");

                let uploadingAnimalSubcategoryData;
                let uploadingAnimalSubcategoryLang;

                $.ajax({
                    type: "POST",
                    url: "/_get-category-to-subcategories",
                    contentType: "application/json",
                    data: JSON.stringify({"category_id": upload_animals_subcategory_select_id}),
                    beforeSend: function (xhr) {
                    },
                    success: function (result, status, xhr) {
                        uploadingAnimalSubcategoryData = result['message']
                        uploadingAnimalSubcategoryLang = result['lang']
                    },
                    complete: function (xhr, status) {
                        $uploadingAnimalSubcategorySelect.selectpicker('destroy');

                        $uploadingAnimalSubcategorySelect.html("");

                        for (let i = 0; i < uploadingAnimalSubcategoryData.length; i++) {
                            if (uploadingAnimalSubcategoryData[i]['visibility'] !== "False") {
                                $uploadingAnimalSubcategorySelect.append(
                                    "<option " +
                                    // 'value="' + uploadingAnimalSubcategoryData[i]['name_' + uploadingAnimalSubcategoryLang] + '"' + ' ' +
                                    'value="' + uploadingAnimalSubcategoryData[i]['category_id'] + '"' + ' ' +
                                    "data-id=" + uploadingAnimalSubcategoryData[i]['subcategory_id'] + ' ' +
                                    'data-tokens="' + uploadingAnimalSubcategoryData[i]['name_hu'] + '\xa0' + uploadingAnimalSubcategoryData[i]['name_en'] + '\xa0' + uploadingAnimalSubcategoryData[i]['name_de'] + '\xa0' + uploadingAnimalSubcategoryData[i]['name_fr'] + '\xa0' + uploadingAnimalSubcategoryData[i]['name_es'] + '"' + ' ' +
                                    'data-video-subcategory="' + uploadingAnimalSubcategoryData[i]['name_en'] + '"' + ' ' +
                                    ">" +
                                    uploadingAnimalSubcategoryData[i]['name_' + uploadingAnimalSubcategoryLang] +
                                    "</option>"
                                );
                            }
                        }

                        $uploadingAnimalSubcategorySelect.selectpicker({
                            liveSearch: true
                        });

                        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                            $uploadingAnimalSubcategorySelect.selectpicker('mobile');
                        }

                        if (upload_animals_subcategory_select_id !== null) {
                            // $uploadingAnimalSubcategorySelect.val(upload_animals_subcategory_select_id);
                        }

                        let allowedUploadingAnimalSelectUrl = window.location.pathname.split("/");

                        if (allowedUploadingAnimalSelectUrl[1] === 'edit-of-uploaded-animal' && cookies.runAnimalSubcategory !== false) {
                            if ($uploadingAnimalSubcategoryId.val() !== null) {
                                $uploadingAnimalSubcategorySelect.val(upload_animals_subcategory_select_id);
                            }
                        }

                        $uploadingAnimalSubcategorySelect.prop('disabled', false);
                        $uploadingAnimalSubcategorySelect.selectpicker('refresh');
                    },
                    error: function (xhr, status, error) {
                    }
                });
            },

            uploadAnimal: function () {
                let allowedUploadingAnimalSelectUrl = window.location.pathname.split("/");
                if (allowedUploadingAnimalSelectUrl[1] === 'uploading-animal' || allowedUploadingAnimalSelectUrl[1] === 'edit-of-uploaded-animal') {
                    loadAnimal.setUploadAnimalCategorySelect();
                }

                // Start Category Select
                $("body").on('changed.bs.select', '#uploading-animal-form .uploadingAnimalCategorySelect', function (event, clickedIndex) {
                    event.stopImmediatePropagation()
                    let dataCategoryId = $(event['target'][clickedIndex]).attr("data-id");
                    $("#uploading-animal-form #uploadingAnimalCategoryIdName").val($(event['target'][clickedIndex]).attr("data-video-category"));
                    $("#uploading-animal-form #uploadingAnimalCategoryIdName").trigger("change");
                    $("#uploading-animal-form #uploadingAnimalCategoryId").val(dataCategoryId);
                    $("#uploading-animal-form #uploadingAnimalSubCategoryId").val(null);
                    $("#uploading-animal-form #uploadingAnimalSubCategoryIdName").val(null);

                    let $uploadingAnimalSubcategorySelect = $('#uploading-animal-form .uploadingAnimalSubcategorySelect');
                    $uploadingAnimalSubcategorySelect.prop('disabled', true);
                    $uploadingAnimalSubcategorySelect.selectpicker('refresh');

                    loadAnimal.setUploadAnimalSubcategorySelect(dataCategoryId);

                    // Start Set Category Data
                    loadAnimal.getCategoryAJAX(dataCategoryId);
                    // End Set Category Data

                    cookies.runAnimalSubcategory = false;
                });

                $("body").on("change", "#uploading-animal-form #uploadingAnimalCategoryIdName", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.val() === "Horse") {
                        $("#uploading-animal-form .rankingUrls").removeClass("d-none");
                    } else {
                        $("#uploading-animal-form .rankingUrls").addClass("d-none");
                    }

                });

                $("body").on('changed.bs.select', '#uploading-animal-form .uploadingAnimalSubcategorySelect', function (event, clickedIndex) {
                    event.stopImmediatePropagation()
                    let dataSubcategoryId = $(event['target'][clickedIndex]).attr("data-id");
                    $("#uploading-animal-form #uploadingAnimalSubCategoryIdName").val($(event['target'][clickedIndex]).attr("data-video-subcategory"));
                    $("#uploading-animal-form #uploadingAnimalSubCategoryId").val(dataSubcategoryId);
                });
                // End Category Select

                // Start Age Select
                let $uploadingAnimalYearSelect = $('#uploading-animal-form .uploadingAnimalYearSelect');
                let $uploadingAnimalMonthSelect = $('#uploading-animal-form .uploadingAnimalMonthSelect');
                let $uploadingAnimalDaySelect = $('#uploading-animal-form .uploadingAnimalDaySelect');

                $uploadingAnimalYearSelect.selectpicker({
                    liveSearch: true
                });

                $uploadingAnimalMonthSelect.selectpicker({
                    liveSearch: true
                });

                $uploadingAnimalDaySelect.selectpicker({
                    liveSearch: true
                });

                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    $uploadingAnimalYearSelect.selectpicker('mobile');
                    $uploadingAnimalMonthSelect.selectpicker('mobile');
                    $uploadingAnimalDaySelect.selectpicker('mobile');
                }

                $("body").on('changed.bs.select', '#uploading-animal-form .uploadingAnimalYearSelect', function (event, clickedIndex) {
                    event.stopImmediatePropagation()
                    let dataYear = $(event['target'][clickedIndex]).attr("value");
                    $("#uploading-animal-form #uploadingAnimalYear").val(dataYear);
                });

                $("body").on('changed.bs.select', '#uploading-animal-form .uploadingAnimalMonthSelect', function (event, clickedIndex) {
                    event.stopImmediatePropagation()
                    let dataMonth = $(event['target'][clickedIndex]).attr("value");
                    $("#uploading-animal-form #uploadingAnimalMonth").val(dataMonth);
                });

                $("body").on('changed.bs.select', '#uploading-animal-form .uploadingAnimalDaySelect', function (event, clickedIndex) {
                    event.stopImmediatePropagation()
                    let dataDay = $(event['target'][clickedIndex]).attr("value");
                    $("#uploading-animal-form #uploadingAnimalDay").val(dataDay);
                });
                // End Age Select

                // Start Country Origin Select
                let $uploadingAnimalCountryOriginSelect = $('#uploading-animal-form .uploadingAnimalCountryOriginSelect');
                $uploadingAnimalCountryOriginSelect.selectpicker({
                    liveSearch: true
                });
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    $uploadingAnimalCountryOriginSelect.selectpicker('mobile');
                }

                $uploadingAnimalCountryOriginSelect.on('changed.bs.select', function (event, clickedIndex) {
                    event.stopImmediatePropagation()
                    let dataCountryOriginCode = $(event['target'][clickedIndex]).attr("data-country-code");
                    $("#uploading-animal-form #uploadingAnimalCountryOrigin").val(dataCountryOriginCode);

                    let dataRegionOriginCode = $(event['target'][clickedIndex]).attr("data-region-code");
                    $("#uploading-animal-form #uploadingAnimalRegionOrigin").val(dataRegionOriginCode);
                });
                // End Country Origin Select

                // Start Country Origin Select
                let $uploadingAnimalCountryResidenceSelect = $('#uploading-animal-form .uploadingAnimalCountryResidenceSelect');
                $uploadingAnimalCountryResidenceSelect.selectpicker({
                    liveSearch: true
                });
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    $uploadingAnimalCountryResidenceSelect.selectpicker('mobile');
                }

                $uploadingAnimalCountryResidenceSelect.on('changed.bs.select', function (event, clickedIndex) {
                    event.stopImmediatePropagation()
                    let dataCountryResidenceCode = $(event['target'][clickedIndex]).attr("data-country-code");
                    $("#uploading-animal-form #uploadingAnimalCountryResidence").val(dataCountryResidenceCode);

                    let dataRegionResidenceCode = $(event['target'][clickedIndex]).attr("data-region-code");
                    $("#uploading-animal-form #uploadingAnimalRegionResidence").val(dataRegionResidenceCode);
                });
                // End Country Origin Select

                // Start Description
                autosize(document.querySelector("#uploadingAnimalDescription"));
                // End Description

                // Start Family Tree
                $("#uploading-animal-form #uploadingAnimalName").on("change", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.val() !== "") {
                        $("#uploading-animal-form .tf-upload-animal .tf-name").text(_this.val());
                        $("#uploading-animal-form .tf-upload-animal .tf-name").removeClass("d-none");
                    } else {
                        $("#uploading-animal-form .tf-upload-animal .tf-name").text("");
                        $("#uploading-animal-form .tf-upload-animal .tf-name").addClass("d-none");
                    }
                });

                $("#uploading-animal-form .tf-tree.tf-upload-animal .tf-nc.mother").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("active")) {
                        _this.removeClass("active");
                        $("#uploading-animal-form .inp.mother").addClass("d-none");
                    } else {
                        _this.addClass("active");
                        $("#uploading-animal-form .inp.mother").removeClass("d-none");
                    }
                });

                $("#uploading-animal-form .tf-tree.tf-upload-animal .tf-nc.mother_mother").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("active")) {
                        _this.removeClass("active");
                        $("#uploading-animal-form .inp.mother_mother").addClass("d-none");
                    } else {
                        _this.addClass("active");
                        $("#uploading-animal-form .inp.mother_mother").removeClass("d-none");
                    }
                });

                $("#uploading-animal-form .tf-tree.tf-upload-animal .tf-nc.mother_mother_mother").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("active")) {
                        _this.removeClass("active");
                        $("#uploading-animal-form .inp.mother_mother_mother").addClass("d-none");
                    } else {
                        _this.addClass("active");
                        $("#uploading-animal-form .inp.mother_mother_mother").removeClass("d-none");
                    }
                });

                $("#uploading-animal-form .tf-tree.tf-upload-animal .tf-nc.mother_mother_father").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("active")) {
                        _this.removeClass("active");
                        $("#uploading-animal-form .inp.mother_mother_father").addClass("d-none");
                    } else {
                        _this.addClass("active");
                        $("#uploading-animal-form .inp.mother_mother_father").removeClass("d-none");
                    }
                });

                $("#uploading-animal-form .tf-tree.tf-upload-animal .tf-nc.mother_father").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("active")) {
                        _this.removeClass("active");
                        $("#uploading-animal-form .inp.mother_father").addClass("d-none");
                    } else {
                        _this.addClass("active");
                        $("#uploading-animal-form .inp.mother_father").removeClass("d-none");
                    }
                });

                $("#uploading-animal-form .tf-tree.tf-upload-animal .tf-nc.mother_father_mother").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("active")) {
                        _this.removeClass("active");
                        $("#uploading-animal-form .inp.mother_father_mother").addClass("d-none");
                    } else {
                        _this.addClass("active");
                        $("#uploading-animal-form .inp.mother_father_mother").removeClass("d-none");
                    }
                });

                $("#uploading-animal-form .tf-tree.tf-upload-animal .tf-nc.mother_father_father").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("active")) {
                        _this.removeClass("active");
                        $("#uploading-animal-form .inp.mother_father_father").addClass("d-none");
                    } else {
                        _this.addClass("active");
                        $("#uploading-animal-form .inp.mother_father_father").removeClass("d-none");
                    }
                });

                $("#uploading-animal-form .tf-tree.tf-upload-animal .tf-nc.father").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("active")) {
                        _this.removeClass("active");
                        $("#uploading-animal-form .inp.father").addClass("d-none");
                    } else {
                        _this.addClass("active");
                        $("#uploading-animal-form .inp.father").removeClass("d-none");
                    }
                });

                $("#uploading-animal-form .tf-tree.tf-upload-animal .tf-nc.father_mother").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("active")) {
                        _this.removeClass("active");
                        $("#uploading-animal-form .inp.father_mother").addClass("d-none");
                    } else {
                        _this.addClass("active");
                        $("#uploading-animal-form .inp.father_mother").removeClass("d-none");
                    }
                });

                $("#uploading-animal-form .tf-tree.tf-upload-animal .tf-nc.father_mother_mother").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("active")) {
                        _this.removeClass("active");
                        $("#uploading-animal-form .inp.father_mother_mother").addClass("d-none");
                    } else {
                        _this.addClass("active");
                        $("#uploading-animal-form .inp.father_mother_mother").removeClass("d-none");
                    }
                });

                $("#uploading-animal-form .tf-tree.tf-upload-animal .tf-nc.father_mother_father").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("active")) {
                        _this.removeClass("active");
                        $("#uploading-animal-form .inp.father_mother_father").addClass("d-none");
                    } else {
                        _this.addClass("active");
                        $("#uploading-animal-form .inp.father_mother_father").removeClass("d-none");
                    }
                });

                $("#uploading-animal-form .tf-tree.tf-upload-animal .tf-nc.father_father").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("active")) {
                        _this.removeClass("active");
                        $("#uploading-animal-form .inp.father_father").addClass("d-none");
                    } else {
                        _this.addClass("active");
                        $("#uploading-animal-form .inp.father_father").removeClass("d-none");
                    }
                });

                $("#uploading-animal-form .tf-tree.tf-upload-animal .tf-nc.father_father_mother").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("active")) {
                        _this.removeClass("active");
                        $("#uploading-animal-form .inp.father_father_mother").addClass("d-none");
                    } else {
                        _this.addClass("active");
                        $("#uploading-animal-form .inp.father_father_mother").removeClass("d-none");
                    }
                });

                $("#uploading-animal-form .tf-tree.tf-upload-animal .tf-nc.father_father_father").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("active")) {
                        _this.removeClass("active");
                        $("#uploading-animal-form .inp.father_father_father").addClass("d-none");
                    } else {
                        _this.addClass("active");
                        $("#uploading-animal-form .inp.father_father_father").removeClass("d-none");
                    }
                });
                // End Family Tree

                // Start EUR To User Currency
                $("#uploading-animal-form #uploadingAnimalPrice").on("keyup paste focusout change", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let eur1ToCurrency = $("#uploading-animal-form #uploadingAnimalEUR1ToCurrency").val();
                    let userCurrency = $("#uploading-animal-form #uploadingAnimalUserCurrency").val();
                    let $eur1ToCurrencyShow = $("#uploading-animal-form .animal.eur1-to-currency-show");

                    let inputValue = parseInt(_this.val().replaceAll(' ', ''));
                    let priceCurrency = inputValue * eur1ToCurrency;

                    numbro.languageData().delimiters.thousands = " ";
                    let number = numbro(priceCurrency);

                    if (isNaN(inputValue) !== true && userCurrency !== "EUR") {

                        $eur1ToCurrencyShow.text(number.format({
                            thousandSeparated: true,
                            mantissa: 0
                        }) + " " + userCurrency).removeClass("d-none");

                    } else {
                        $eur1ToCurrencyShow.text("").addClass("d-none");
                    }

                    if (isNaN(inputValue) !== true) {
                        let inpNumber = numbro(_this.val());
                        _this.val(inpNumber.format({
                            thousandSeparated: true,
                            mantissa: 0
                        }));
                    }
                });

                $("#uploading-animal-form #uploadingAnimalPrice").on("paste focusout", function (event) {
                });
                // Start EUR To User Currency

                // Start AJAX POST data
                $("body").on("click", "#uploading-animal-form #uploading-animal-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let namespace = utility.getSocketURL() + '/connect';
                    let socket = io(namespace);

                    let uploadingAnimalData;
                    let movieLoggerInterval;
                    $.ajax({
                        type: "POST",
                        url: "/_uploading-animal",
                        contentType: "application/json",
                        data: JSON.stringify($("#uploading-animal-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("body").css({"filter": "grayscale(100%)"});
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});

                            /*
                            if ($("#uploading-animal-form #uploadingAnimalVideo01Data").val() !== "") {
                                $("#uploading-animal-form .uploading-animal-video-create-button-info").removeClass("d-none");
                            }
                            */
                            $("#uploading-animal-form .uploading-animal-video-create-button-info").removeClass("d-none");

                            // Start setTimeout AJAX
                            setTimeout(
                                function () {
                                    let count = 0;
                                    movieLoggerInterval = setInterval(() => {
                                        // Start AJAX
                                        /*
                                        let movieLoggerData;
                                        $.ajax({
                                            type: "GET",
                                            url: "/_movie-logger",
                                            contentType: "application/json",
                                            beforeSend: function (xhr) {
                                            },
                                            success: function (result, status, xhr) {
                                                movieLoggerData = result['message']
                                            },
                                            complete: function (xhr, status) {
                                                let statusCode = xhr['status'];

                                                if (statusCode === 200) {
                                                    $("#post-loader .post-loader-percent.video span.percent").html(movieLoggerData['percentage'] + "%");
                                                    setTimeout(
                                                        function () {
                                                            $("#post-loader .post-loader-percent.video").addClass("d-block").removeClass("d-none");
                                                        }, 2000);
                                                    $("#uploading-animal-form .animal.video01.progress .progress-bar .file-percent").html(movieLoggerData['percentage'] + "%");
                                                    $("#uploading-animal-form .animal.video01.progress .progress-bar").css({"width": movieLoggerData['percentage'] + "%"});
                                                } else if (statusCode === 202) {
                                                }
                                            },
                                            error: function (xhr, status, error) {
                                                count++;
                                                if (count === 10) {
                                                    clearInterval(movieLoggerInterval);
                                                }
                                            }
                                        });
                                         */
                                        // End AJAX
                                        // Start Video Logger Percentage
                                        socket.emit('video_logger', {
                                            "room": $("#filter-form input#room").val()
                                        });
                                        // End Video Logger Percentage
                                    }, 1000);
                                }, 1000);
                            // End setTimeout AJAX
                        },
                        success: function (result, status, xhr) {
                            uploadingAnimalData = result;
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let $uploadingAnimalForm = $("#uploading-animal-form");
                                let $uploadingAnimalFormInputError = $("#uploading-animal-form .input-error");
                                $uploadingAnimalFormInputError.each(function () {
                                    $(this).addClass("d-none");
                                    $(this).find("span").removeData("i18n");
                                    $(this).find("span").text("");
                                });

                                $uploadingAnimalForm.find(".form-alert-danger").addClass("d-none");

                                $("#uploading-animal-form .uploading-animal-video-create-button-info").addClass("d-none");

                                setTimeout(
                                    function () {

                                        const queryString = window.location.search;
                                        const urlParams = new URLSearchParams(queryString);

                                        clearInterval(movieLoggerInterval);
                                        $("#post-loader .post-loader-percent.video span.percent").html("");
                                        $("#post-loader .post-loader-percent.video").addClass("d-none").removeClass("d-block")

                                        if (urlParams.has('id')) {
                                            window.location.href = utility.getURL() + "/user-management/user/" + urlParams.get('id');
                                        } else {
                                            window.location.href = utility.getURL() + "/list-of-uploaded-animals";
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
                                        let $uploadingAnimalForm = $("#uploading-animal-form");
                                        $uploadingAnimalForm.find(".form-alert-danger").removeClass("d-none");

                                        $("#uploading-animal-form .uploading-animal-video-create-button-info").addClass("d-none");

                                        $("html, body").animate({scrollTop: 0}, 500);

                                        if (result['message']['message']['category_id']) {
                                            $uploadingAnimalForm.find(".uploading-animal-category-select-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-category-select-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-category-select-error span").attr("data-i18n", result['message']['message']['category_id']);
                                            $uploadingAnimalForm.find(".uploading-animal-category-select-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-category-select-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-category-select-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-category-select-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['subcategory_id']) {
                                            $uploadingAnimalForm.find(".uploading-animal-subcategory-select-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-subcategory-select-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-subcategory-select-error span").attr("data-i18n", result['message']['message']['subcategory_id']);
                                            $uploadingAnimalForm.find(".uploading-animal-subcategory-select-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-subcategory-select-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-subcategory-select-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-subcategory-select-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['name']) {
                                            $uploadingAnimalForm.find(".uploading-animal-name-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-name-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-name-error span").attr("data-i18n", result['message']['message']['name']);
                                            $uploadingAnimalForm.find(".uploading-animal-name-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-name-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-name-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-name-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['chip']) {
                                            $uploadingAnimalForm.find(".uploading-animal-chip-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-chip-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-chip-error span").attr("data-i18n", result['message']['message']['chip']);
                                            $uploadingAnimalForm.find(".uploading-animal-chip-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-chip-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-chip-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-chip-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['height']) {
                                            $uploadingAnimalForm.find(".uploading-animal-height-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-height-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-height-error span").attr("data-i18n", result['message']['message']['height']);
                                            $uploadingAnimalForm.find(".uploading-animal-height-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-height-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-height-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-height-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['age_year']) {
                                            $uploadingAnimalForm.find(".uploading-animal-year-select-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-year-select-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-year-select-error span").attr("data-i18n", result['message']['message']['age_year']);
                                            $uploadingAnimalForm.find(".uploading-animal-year-select-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-year-select-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-year-select-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-year-select-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['age_month']) {
                                            $uploadingAnimalForm.find(".uploading-animal-month-select-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-month-select-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-month-select-error span").attr("data-i18n", result['message']['message']['age_month']);
                                            $uploadingAnimalForm.find(".uploading-animal-month-select-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-month-select-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-month-select-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-month-select-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['age_day']) {
                                            $uploadingAnimalForm.find(".uploading-animal-day-select-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-day-select-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-day-select-error span").attr("data-i18n", result['message']['message']['age_day']);
                                            $uploadingAnimalForm.find(".uploading-animal-day-select-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-day-select-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-day-select-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-day-select-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['country_origin']) {
                                            $uploadingAnimalForm.find(".uploading-animal-country-origin-select-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-country-origin-select-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-country-origin-select-error span").attr("data-i18n", result['message']['message']['country_origin']);
                                            $uploadingAnimalForm.find(".uploading-animal-country-origin-select-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-country-origin-select-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-country-origin-select-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-country-origin-select-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['country_residence']) {
                                            $uploadingAnimalForm.find(".uploading-animal-country-residence-select-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-country-residence-select-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-country-residence-select-error span").attr("data-i18n", result['message']['message']['country_residence']);
                                            $uploadingAnimalForm.find(".uploading-animal-country-residence-select-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-country-residence-select-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-country-residence-select-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-country-residence-select-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['be_used_for']) {
                                            $uploadingAnimalForm.find(".uploading-animal-be-used-for-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-be-used-for-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-be-used-for-error span").attr("data-i18n", result['message']['message']['be_used_for']);
                                            $uploadingAnimalForm.find(".uploading-animal-be-used-for-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-be-used-for-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-be-used-for-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-be-used-for-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['gender']) {
                                            $uploadingAnimalForm.find(".uploading-animal-gender-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-gender-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-gender-error span").attr("data-i18n", result['message']['message']['gender']);
                                            $uploadingAnimalForm.find(".uploading-animal-gender-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-gender-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-gender-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-gender-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['color']) {
                                            $uploadingAnimalForm.find(".uploading-animal-color-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-color-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-color-error span").attr("data-i18n", result['message']['message']['color']);
                                            $uploadingAnimalForm.find(".uploading-animal-color-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-color-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-color-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-color-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['brief_description']) {
                                            $uploadingAnimalForm.find(".uploading-animal-brief-description-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-brief-description-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-brief-description-error span").attr("data-i18n", result['message']['message']['brief_description']);
                                            $uploadingAnimalForm.find(".uploading-animal-brief-description-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-brief-description-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-brief-description-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-brief-description-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['description']) {
                                            $uploadingAnimalForm.find(".uploading-animal-description-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-description-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-description-error span").attr("data-i18n", result['message']['message']['description']);
                                            $uploadingAnimalForm.find(".uploading-animal-description-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-description-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-description-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-description-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['mother']) {
                                            $uploadingAnimalForm.find(".tf-nc.mother").addClass("tf-error-border");
                                        } else {
                                            $uploadingAnimalForm.find(".tf-nc.mother").removeClass("tf-error-border");
                                        }

                                        if (result['message']['message']['mother_mother']) {
                                            $uploadingAnimalForm.find(".tf-nc.mother_mother").addClass("tf-error-border");
                                        } else {
                                            $uploadingAnimalForm.find(".tf-nc.mother_mother").removeClass("tf-error-border");
                                        }

                                        if (result['message']['message']['mother_mother_mother']) {
                                            $uploadingAnimalForm.find(".tf-nc.mother_mother_mother").addClass("tf-error-border");
                                        } else {
                                            $uploadingAnimalForm.find(".tf-nc.mother_mother_mother").removeClass("tf-error-border");
                                        }

                                        if (result['message']['message']['mother_mother_father']) {
                                            $uploadingAnimalForm.find(".tf-nc.mother_mother_father").addClass("tf-error-border");
                                        } else {
                                            $uploadingAnimalForm.find(".tf-nc.mother_mother_father").removeClass("tf-error-border");
                                        }

                                        if (result['message']['message']['mother_father']) {
                                            $uploadingAnimalForm.find(".tf-nc.mother_father").addClass("tf-error-border");
                                        } else {
                                            $uploadingAnimalForm.find(".tf-nc.mother_father").removeClass("tf-error-border");
                                        }

                                        if (result['message']['message']['mother_father_mother']) {
                                            $uploadingAnimalForm.find(".tf-nc.mother_father_mother").addClass("tf-error-border");
                                        } else {
                                            $uploadingAnimalForm.find(".tf-nc.mother_father_mother").removeClass("tf-error-border");
                                        }

                                        if (result['message']['message']['mother_father_father']) {
                                            $uploadingAnimalForm.find(".tf-nc.mother_father_father").addClass("tf-error-border");
                                        } else {
                                            $uploadingAnimalForm.find(".tf-nc.mother_father_father").removeClass("tf-error-border");
                                        }

                                        if (result['message']['message']['father']) {
                                            $uploadingAnimalForm.find(".tf-nc.father").addClass("tf-error-border");
                                        } else {
                                            $uploadingAnimalForm.find(".tf-nc.father").removeClass("tf-error-border");
                                        }

                                        if (result['message']['message']['father_mother']) {
                                            $uploadingAnimalForm.find(".tf-nc.father_mother").addClass("tf-error-border");
                                        } else {
                                            $uploadingAnimalForm.find(".tf-nc.father_mother").removeClass("tf-error-border");
                                        }

                                        if (result['message']['message']['father_mother_mother']) {
                                            $uploadingAnimalForm.find(".tf-nc.father_mother_mother").addClass("tf-error-border");
                                        } else {
                                            $uploadingAnimalForm.find(".tf-nc.father_mother_mother").removeClass("tf-error-border");
                                        }

                                        if (result['message']['message']['father_mother_father']) {
                                            $uploadingAnimalForm.find(".tf-nc.father_mother_father").addClass("tf-error-border");
                                        } else {
                                            $uploadingAnimalForm.find(".tf-nc.father_mother_father").removeClass("tf-error-border");
                                        }

                                        if (result['message']['message']['father_father']) {
                                            $uploadingAnimalForm.find(".tf-nc.father_father").addClass("tf-error-border");
                                        } else {
                                            $uploadingAnimalForm.find(".tf-nc.father_father").removeClass("tf-error-border");
                                        }

                                        if (result['message']['message']['father_father_mother']) {
                                            $uploadingAnimalForm.find(".tf-nc.father_father_mother").addClass("tf-error-border");
                                        } else {
                                            $uploadingAnimalForm.find(".tf-nc.father_father_mother").removeClass("tf-error-border");
                                        }

                                        if (result['message']['message']['father_father_father']) {
                                            $uploadingAnimalForm.find(".tf-nc.father_father_father").addClass("tf-error-border");
                                        } else {
                                            $uploadingAnimalForm.find(".tf-nc.father_father_father").removeClass("tf-error-border");
                                        }

                                        if (result['message']['message']['mother']) {
                                            $uploadingAnimalForm.find(".uploading-animal-mother-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-error span").attr("data-i18n", result['message']['message']['mother']);
                                            $uploadingAnimalForm.find(".uploading-animal-mother-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-mother-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['mother_mother']) {
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-error span").attr("data-i18n", result['message']['message']['mother_mother']);
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['mother_mother_mother']) {
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-mother-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-mother-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-mother-error span").attr("data-i18n", result['message']['message']['mother_mother_mother']);
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-mother-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-mother-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-mother-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-mother-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['mother_mother_father']) {
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-father-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-father-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-father-error span").attr("data-i18n", result['message']['message']['mother_mother_father']);
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-father-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-father-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-father-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-mother-father-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['mother_father']) {
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-error span").attr("data-i18n", result['message']['message']['mother_father']);
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['mother_father_mother']) {
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-mother-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-mother-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-mother-error span").attr("data-i18n", result['message']['message']['mother_father_mother']);
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-mother-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-mother-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-mother-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-mother-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['mother_father_father']) {
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-father-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-father-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-father-error span").attr("data-i18n", result['message']['message']['mother_father_father']);
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-father-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-father-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-father-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-mother-father-father-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['father']) {
                                            $uploadingAnimalForm.find(".uploading-animal-father-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-father-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-father-error span").attr("data-i18n", result['message']['message']['father']);
                                            $uploadingAnimalForm.find(".uploading-animal-father-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-father-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-father-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-father-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['father_mother']) {
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-error span").attr("data-i18n", result['message']['message']['father_mother']);
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['father_mother_mother']) {
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-mother-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-mother-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-mother-error span").attr("data-i18n", result['message']['message']['father_mother_mother']);
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-mother-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-mother-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-mother-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-mother-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['father_mother_father']) {
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-father-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-father-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-father-error span").attr("data-i18n", result['message']['message']['father_mother_father']);
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-father-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-father-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-father-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-father-mother-father-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['father_father']) {
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-error span").attr("data-i18n", result['message']['message']['father_father']);
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['father_father_mother']) {
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-mother-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-mother-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-mother-error span").attr("data-i18n", result['message']['message']['father_father_mother']);
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-mother-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-mother-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-mother-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-mother-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['father_father_father']) {
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-father-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-father-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-father-error span").attr("data-i18n", result['message']['message']['father_father_father']);
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-father-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-father-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-father-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-father-father-father-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['img_01_data']) {
                                            $uploadingAnimalForm.find(".uploading-animal-img01-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-img01-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-img01-error span").attr("data-i18n", result['message']['message']['img_01_data']);
                                            $uploadingAnimalForm.find(".uploading-animal-img01-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-img01-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-img01-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-img01-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['img_02_data']) {
                                            $uploadingAnimalForm.find(".uploading-animal-img02-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-img02-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-img02-error span").attr("data-i18n", result['message']['message']['img_02_data']);
                                            $uploadingAnimalForm.find(".uploading-animal-img02-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-img02-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-img02-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-img02-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['img_03_data']) {
                                            $uploadingAnimalForm.find(".uploading-animal-img03-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-img03-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-img03-error span").attr("data-i18n", result['message']['message']['img_03_data']);
                                            $uploadingAnimalForm.find(".uploading-animal-img03-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-img03-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-img03-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-img03-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['img_04_data']) {
                                            $uploadingAnimalForm.find(".uploading-animal-img04-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-img04-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-img04-error span").attr("data-i18n", result['message']['message']['img_04_data']);
                                            $uploadingAnimalForm.find(".uploading-animal-img04-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-img04-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-img04-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-img04-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        /*
                                        if (result['message']['message']['img_01_data'] || result['message']['message']['img_02_data'] || result['message']['message']['img_03_data'] || result['message']['message']['img_04_data']) {
                                            $uploadingAnimalForm.find(".uploading-animal-img-all-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-img-all-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-img-all-error span").attr("data-i18n", "anlihouse-A197");
                                            $uploadingAnimalForm.find(".uploading-animal-img-all-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-img-all-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-img-all-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-img-all-error").addClass("d-none");
                                            $('body').i18n();
                                        }
                                        */

                                        if (result['message']['message']['video_01_data']) {
                                            $uploadingAnimalForm.find(".uploading-animal-video01-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-video01-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-video01-error span").attr("data-i18n", result['message']['message']['video_01_data']);
                                            $uploadingAnimalForm.find(".uploading-animal-video01-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-video01-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-video01-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-video01-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['url_01']) {
                                            $uploadingAnimalForm.find(".uploading-animal-url01-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-url01-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-url01-error span").attr("data-i18n", result['message']['message']['url_01']);
                                            $uploadingAnimalForm.find(".uploading-animal-url01-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-url01-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-url01-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-url01-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['url_02']) {
                                            $uploadingAnimalForm.find(".uploading-animal-url02-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-url02-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-url02-error span").attr("data-i18n", result['message']['message']['url_02']);
                                            $uploadingAnimalForm.find(".uploading-animal-url02-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-url02-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-url02-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-url02-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['medical_paper_data']) {
                                            $uploadingAnimalForm.find(".uploading-animal-medical-paper-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-medical-paper-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-medical-paper-error span").attr("data-i18n", result['message']['message']['medical_paper_data']);
                                            $uploadingAnimalForm.find(".uploading-animal-medical-paper-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-medical-paper-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-medical-paper-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-medical-paper-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['breed_registry_data']) {
                                            $uploadingAnimalForm.find(".uploading-animal-breed-registry-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-breed-registry-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-breed-registry-error span").attr("data-i18n", result['message']['message']['breed_registry_data']);
                                            $uploadingAnimalForm.find(".uploading-animal-breed-registry-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-breed-registry-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-breed-registry-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-breed-registry-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['x_ray_data']) {
                                            $uploadingAnimalForm.find(".uploading-animal-x-ray-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-x-ray-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-x-ray-error span").attr("data-i18n", result['message']['message']['x_ray_data']);
                                            $uploadingAnimalForm.find(".uploading-animal-x-ray-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-x-ray-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-x-ray-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-x-ray-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                        if (result['message']['message']['price']) {
                                            $uploadingAnimalForm.find(".uploading-animal-price-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-price-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-price-error span").attr("data-i18n", result['message']['message']['price']);
                                            $uploadingAnimalForm.find(".uploading-animal-price-error").removeClass("d-none");
                                            $('body').i18n();
                                        } else {
                                            $uploadingAnimalForm.find(".uploading-animal-price-error span").removeData("i18n");
                                            $uploadingAnimalForm.find(".uploading-animal-price-error span").text("");
                                            $uploadingAnimalForm.find(".uploading-animal-price-error").addClass("d-none");
                                            $('body').i18n();
                                        }

                                    }
                                    //$("body").css({"filter": "grayscale(0%)"});
                                    $("#post-loader").toggleClass("inactive active");
                                    clearInterval(movieLoggerInterval);
                                    $("#post-loader .post-loader-percent.video span.percent").html("");
                                    $("#post-loader .post-loader-percent.video").addClass("d-none").removeClass("d-block")
                                    $("body").removeAttr("style");
                                    _this.attr('disabled', false);
                                    _this.removeClass("action");
                                }, 1500);
                        }
                    });
                });
                // End AJAX POST Data

            },

            getCategoryAJAX: function (dataCategoryId) {
                let getCategoryData;
                let categoryLang;
                $.ajax({
                    type: "POST",
                    url: "/_get-category",
                    contentType: "application/json",
                    data: JSON.stringify({"id": dataCategoryId}),
                    beforeSend: function (xhr) {
                    },
                    success: function (result, status, xhr) {
                        getCategoryData = result['message'][0];
                        categoryLang = result['lang']

                        $("#uploading-animal-form .uploadingAnimalBeUsedForShow").addClass("d-none");
                        $("#uploading-animal-form #uploadingAnimalIsBeUsedFor").val("False");
                        $("#uploading-animal-form #uploadingAnimalBeUsedForValHU").val(null);
                        $("#uploading-animal-form #uploadingAnimalBeUsedForValEN").val(null);
                        $("#uploading-animal-form #uploadingAnimalBeUsedForValDE").val(null);
                        $("#uploading-animal-form #uploadingAnimalBeUsedForValFR").val(null);
                        $("#uploading-animal-form #uploadingAnimalBeUsedForValES").val(null);


                        $("#uploading-animal-form .uploadingAnimalGenderShow").addClass("d-none");
                        $("#uploading-animal-form #uploadingAnimalIsGender").val("False");
                        $("#uploading-animal-form #uploadingAnimalGenderValHU").val(null);
                        $("#uploading-animal-form #uploadingAnimalGenderValEN").val(null);
                        $("#uploading-animal-form #uploadingAnimalGenderValDE").val(null);
                        $("#uploading-animal-form #uploadingAnimalGenderValFR").val(null);
                        $("#uploading-animal-form #uploadingAnimalGenderValES").val(null);

                        $("#uploading-animal-form .uploadingAnimalColorShow").addClass("d-none");
                        $("#uploading-animal-form #uploadingAnimalIsColor").val("False");
                        $("#uploading-animal-form #uploadingAnimalColorValHU").val(null);
                        $("#uploading-animal-form #uploadingAnimalColorValEN").val(null);
                        $("#uploading-animal-form #uploadingAnimalColorValDE").val(null);
                        $("#uploading-animal-form #uploadingAnimalColorValFR").val(null);
                        $("#uploading-animal-form #uploadingAnimalColorValES").val(null);

                        let $uploadingAnimalForm = $("#uploading-animal-form");
                        let $uploadingAnimalFormInputError = $("#uploading-animal-form .input-error");
                        $uploadingAnimalFormInputError.each(function () {
                            $(this).addClass("d-none");
                            $(this).find("span").removeData("i18n");
                            $(this).find("span").text("");
                        });
                        $uploadingAnimalForm.find(".form-alert-danger").addClass("d-none");
                        $uploadingAnimalForm.find(".tf-nc").removeClass("tf-error-border");
                    },
                    complete: function (xhr, status) {
                        let category_id = getCategoryData['category_id']
                        let visibility = getCategoryData['visibility']
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

                        // Start Set Be Used For
                        if (be_used_for_hu !== "" && be_used_for_en !== "" && be_used_for_de !== "" && be_used_for_fr !== "" && be_used_for_es !== "") {
                            $("#uploading-animal-form #uploadingAnimalIsBeUsedFor").val("True");
                            let $uploadingAnimalBeUsedForRadioWrap = $("#uploading-animal-form #uploadingAnimalBeUsedForRadioWrap");
                            let beUsedForList = getCategoryData['be_used_for_' + categoryLang].split(',');
                            let beUsedForListHU = getCategoryData['be_used_for_hu'].split(',');
                            let beUsedForListEN = getCategoryData['be_used_for_en'].split(',');
                            let beUsedForListDE = getCategoryData['be_used_for_de'].split(',');
                            let beUsedForListFR = getCategoryData['be_used_for_fr'].split(',');
                            let beUsedForListES = getCategoryData['be_used_for_es'].split(',');

                            $uploadingAnimalBeUsedForRadioWrap.html("");

                            for (let i = 0; i < beUsedForList.length; i++) {
                                let beUsedForId = "uploadingAnimalBeUsedForRadio".concat(String(i));
                                $uploadingAnimalBeUsedForRadioWrap.append(
                                    "<div style='line-height:20px;margin-right:1rem;' class='radio-input float-left' data-name='" + $.trim(beUsedForList[i]) + "'>" +
                                    "<input id=" + beUsedForId + ' ' + "data-index=" + i + ' ' +
                                    " class='uploadingAnimalBeUsedForRadio' type='checkbox' name='uploadingAnimalBeUsedForRadio'>" +
                                    "<label class='d-content' style='margin-left:0.3rem;display:contents;' for=" + beUsedForId + ' >' +
                                    $.trim(beUsedForList[i]) +
                                    "</label>" +
                                    "</div>"
                                ).ready(function () {
                                    $("input[class='uploadingAnimalBeUsedForRadio']").checkbox();
                                    $("#uploading-animal-form .uploadingAnimalBeUsedForShow").removeClass("d-none");
                                });
                            }

                            $("body").on("change", "#uploading-animal-form .uploadingAnimalBeUsedForRadio", function (event) {
                                // event.preventDefault();
                                const _this = $(this);
                                let dataIndex = _this.attr("data-index");

                                let beUsedForListHUList = []
                                let beUsedForListENList = []
                                let beUsedForListDEList = []
                                let beUsedForListFRList = []
                                let beUsedForListESList = []

                                $("#uploading-animal-form .uploadingAnimalBeUsedForRadio").each(function (index) {

                                    if ($("#uploadingAnimalBeUsedForRadio" + String(index)).is(":checked") === true) {
                                        beUsedForListHUList.push(beUsedForListHU[$("#uploadingAnimalBeUsedForRadio" + String(index)).attr("data-index")]);
                                        beUsedForListENList.push(beUsedForListEN[$("#uploadingAnimalBeUsedForRadio" + String(index)).attr("data-index")]);
                                        beUsedForListDEList.push(beUsedForListDE[$("#uploadingAnimalBeUsedForRadio" + String(index)).attr("data-index")]);
                                        beUsedForListFRList.push(beUsedForListFR[$("#uploadingAnimalBeUsedForRadio" + String(index)).attr("data-index")]);
                                        beUsedForListESList.push(beUsedForListES[$("#uploadingAnimalBeUsedForRadio" + String(index)).attr("data-index")]);
                                    }

                                });

                                if (beUsedForListHUList !== []) {
                                    $("#uploading-animal-form #uploadingAnimalBeUsedForValHU").val(beUsedForListHUList);
                                } else {
                                    $("#uploading-animal-form #uploadingAnimalBeUsedForValHU").val(null);
                                }

                                if (beUsedForListENList !== []) {
                                    $("#uploading-animal-form #uploadingAnimalBeUsedForValEN").val(beUsedForListENList);
                                } else {
                                    $("#uploading-animal-form #uploadingAnimalBeUsedForValEN").val(null);
                                }

                                if (beUsedForListDEList !== []) {
                                    $("#uploading-animal-form #uploadingAnimalBeUsedForValDE").val(beUsedForListDEList);
                                } else {
                                    $("#uploading-animal-form #uploadingAnimalBeUsedForValDE").val(null);
                                }

                                if (beUsedForListFRList !== []) {
                                    $("#uploading-animal-form #uploadingAnimalBeUsedForValFR").val(beUsedForListFRList);
                                } else {
                                    $("#uploading-animal-form #uploadingAnimalBeUsedForValFR").val(null);
                                }

                                if (beUsedForListESList !== []) {
                                    $("#uploading-animal-form #uploadingAnimalBeUsedForValES").val(beUsedForListESList);
                                } else {
                                    $("#uploading-animal-form #uploadingAnimalBeUsedForValES").val(null);
                                }
                            });

                        } else {
                            $("#uploading-animal-form .uploadingAnimalBeUsedForShow").addClass("d-none");
                            $("#uploading-animal-form #uploadingAnimalIsBeUsedFor").val("False");
                            $("#uploading-animal-form #uploadingAnimalBeUsedForValHU").val(null);
                            $("#uploading-animal-form #uploadingAnimalBeUsedForValEN").val(null);
                            $("#uploading-animal-form #uploadingAnimalBeUsedForValDE").val(null);
                            $("#uploading-animal-form #uploadingAnimalBeUsedForValFR").val(null);
                            $("#uploading-animal-form #uploadingAnimalBeUsedForValES").val(null);
                        }

                        $("#uploading-animal-form #uploadingAnimalBeUsedForValHU").val($("#uploading-animal-form #uploadingAnimalBeUsedForValHUData").attr("data-items"));
                        $("#uploading-animal-form #uploadingAnimalBeUsedForValEN").val($("#uploading-animal-form #uploadingAnimalBeUsedForValENData").attr("data-items"));
                        $("#uploading-animal-form #uploadingAnimalBeUsedForValDE").val($("#uploading-animal-form #uploadingAnimalBeUsedForValDEData").attr("data-items"));
                        $("#uploading-animal-form #uploadingAnimalBeUsedForValFR").val($("#uploading-animal-form #uploadingAnimalBeUsedForValFRData").attr("data-items"));
                        $("#uploading-animal-form #uploadingAnimalBeUsedForValES").val($("#uploading-animal-form #uploadingAnimalBeUsedForValESData").attr("data-items"));

                        let $uploadingAnimalBeUsedForValDataList = $("#uploading-animal-form #uploadingAnimalBeUsedForValData").attr("data-items").split(',');

                        for (let i = 0; i < $uploadingAnimalBeUsedForValDataList.length; i++) {
                            $("#uploadingAnimalBeUsedForRadioWrap .radio-input").each(function () {
                                if ($(this).attr("data-name") === $uploadingAnimalBeUsedForValDataList[i].trim()) {
                                    $(this).find(".uploadingAnimalBeUsedForRadio").prop("checked", true);
                                    $(this).find(".uploadingAnimalBeUsedForRadio").checkbox("update");
                                }
                            });
                        }
                        // End Set Be Used For

                        // Start Set Gender
                        if (gender_hu !== "" && gender_en !== "" && gender_de !== "" && gender_fr !== "" && gender_es !== "") {
                            $("#uploading-animal-form #uploadingAnimalIsGender").val("True");
                            let $uploadingAnimalGenderRadioWrap = $("#uploading-animal-form #uploadingAnimalGenderRadioWrap");
                            let genderList = getCategoryData['gender_' + categoryLang].split(',');
                            let genderListHU = getCategoryData['gender_hu'].split(',');
                            let genderListEN = getCategoryData['gender_en'].split(',');
                            let genderListDE = getCategoryData['gender_de'].split(',');
                            let genderListFR = getCategoryData['gender_fr'].split(',');
                            let genderListES = getCategoryData['gender_es'].split(',');

                            $uploadingAnimalGenderRadioWrap.html("");

                            for (let i = 0; i < genderList.length; i++) {
                                let genderId = "uploadingAnimalGenderRadio".concat(String(i));
                                $uploadingAnimalGenderRadioWrap.append(
                                    "<div style='line-height:20px;margin-right:1rem;' class='radio-input float-left' data-name='" + $.trim(genderList[i]) + "'>" +
                                    "<input id=" + genderId + ' ' + "data-index=" + i + ' ' +
                                    " class='uploadingAnimalGenderRadio' type='radio' name='uploadingAnimalGenderRadio'>" +
                                    "<label class='d-content' style='margin-left:0.3rem;' for=" + genderId + ' >' +
                                    $.trim(genderList[i]) +
                                    "</label>" +
                                    "</div>"
                                ).ready(function () {
                                    $("input[class='uploadingAnimalGenderRadio']").checkbox();
                                    $("#uploading-animal-form .uploadingAnimalGenderShow").removeClass("d-none");
                                });
                            }

                            $("body").on("change", "#uploading-animal-form .uploadingAnimalGenderRadio", function (event) {
                                event.preventDefault();
                                const _this = $(this);
                                let dataIndex = _this.attr("data-index");

                                $("#uploading-animal-form #uploadingAnimalGenderValHU").val(genderListHU[dataIndex]);
                                $("#uploading-animal-form #uploadingAnimalGenderValEN").val(genderListEN[dataIndex]);
                                $("#uploading-animal-form #uploadingAnimalGenderValDE").val(genderListDE[dataIndex]);
                                $("#uploading-animal-form #uploadingAnimalGenderValFR").val(genderListFR[dataIndex]);
                                $("#uploading-animal-form #uploadingAnimalGenderValES").val(genderListES[dataIndex]);
                            });
                        } else {
                            $("#uploading-animal-form .uploadingAnimalGenderShow").addClass("d-none");
                            $("#uploading-animal-form #uploadingAnimalIsGender").val("False");
                            $("#uploading-animal-form #uploadingAnimalGenderValHU").val(null);
                            $("#uploading-animal-form #uploadingAnimalGenderValEN").val(null);
                            $("#uploading-animal-form #uploadingAnimalGenderValDE").val(null);
                            $("#uploading-animal-form #uploadingAnimalGenderValFR").val(null);
                            $("#uploading-animal-form #uploadingAnimalGenderValES").val(null);
                        }

                        $("#uploading-animal-form #uploadingAnimalGenderValHU").val($("#uploading-animal-form #uploadingAnimalGenderValHUData").attr("data-items"));
                        $("#uploading-animal-form #uploadingAnimalGenderValEN").val($("#uploading-animal-form #uploadingAnimalGenderValENData").attr("data-items"));
                        $("#uploading-animal-form #uploadingAnimalGenderValDE").val($("#uploading-animal-form #uploadingAnimalGenderValDEData").attr("data-items"));
                        $("#uploading-animal-form #uploadingAnimalGenderValFR").val($("#uploading-animal-form #uploadingAnimalGenderValFRData").attr("data-items"));
                        $("#uploading-animal-form #uploadingAnimalGenderValES").val($("#uploading-animal-form #uploadingAnimalGenderValESData").attr("data-items"));

                        let $uploadingAnimalGenderValDataList = $("#uploading-animal-form #uploadingAnimalGenderValData").attr("data-items").split(',');

                        for (let i = 0; i < $uploadingAnimalGenderValDataList.length; i++) {
                            $("#uploadingAnimalGenderRadioWrap .radio-input").each(function () {
                                if ($(this).attr("data-name") === $uploadingAnimalGenderValDataList[i].trim()) {
                                    $(this).find(".uploadingAnimalGenderRadio").prop("checked", true);
                                    $(this).find(".uploadingAnimalGenderRadio").checkbox("update");
                                }
                            });
                        }

                        // End Set Gender

                        // Start Set Color
                        if (color_hu !== "" && color_en !== "" && color_de !== "" && color_fr !== "" && color_es !== "") {
                            $("#uploading-animal-form #uploadingAnimalIsColor").val("True");
                            let $uploadingAnimalColorRadioWrap = $("#uploading-animal-form #uploadingAnimalColorRadioWrap");
                            let colorList = getCategoryData['color_' + categoryLang].split(',');
                            let colorListHU = getCategoryData['color_hu'].split(',');
                            let colorListEN = getCategoryData['color_en'].split(',');
                            let colorListDE = getCategoryData['color_de'].split(',');
                            let colorListFR = getCategoryData['color_fr'].split(',');
                            let colorListES = getCategoryData['color_es'].split(',');

                            $uploadingAnimalColorRadioWrap.html("");

                            for (let i = 0; i < colorList.length; i++) {
                                let colorId = "uploadingAnimalColorRadio".concat(String(i));
                                $uploadingAnimalColorRadioWrap.append(
                                    "<div style='line-height:20px;margin-right:1rem;' class='radio-input float-left' data-name='" + $.trim(colorList[i]) + "'>" +
                                    "<input id=" + colorId + ' ' + "data-index=" + i + ' ' +
                                    " class='uploadingAnimalColorRadio' type='radio' name='uploadingAnimalColorRadio'>" +
                                    "<label class='d-content' style='margin-left:0.3rem;' for=" + colorId + ' >' +
                                    $.trim(colorList[i]) +
                                    "</label>" +
                                    "</div>"
                                ).ready(function () {
                                    $("input[class='uploadingAnimalColorRadio']").checkbox();
                                    $("#uploading-animal-form .uploadingAnimalColorShow").removeClass("d-none");
                                });
                            }

                            $("body").on("change", "#uploading-animal-form .uploadingAnimalColorRadio", function (event) {
                                event.preventDefault();
                                const _this = $(this);
                                let dataIndex = _this.attr("data-index");

                                $("#uploading-animal-form #uploadingAnimalColorValHU").val(colorListHU[dataIndex]);
                                $("#uploading-animal-form #uploadingAnimalColorValEN").val(colorListEN[dataIndex]);
                                $("#uploading-animal-form #uploadingAnimalColorValDE").val(colorListDE[dataIndex]);
                                $("#uploading-animal-form #uploadingAnimalColorValFR").val(colorListFR[dataIndex]);
                                $("#uploading-animal-form #uploadingAnimalColorValES").val(colorListES[dataIndex]);
                            });
                        } else {
                            $("#uploading-animal-form .uploadingAnimalColorShow").addClass("d-none");
                            $("#uploading-animal-form #uploadingAnimalIsColor").val("False");
                            $("#uploading-animal-form #uploadingAnimalColorValHU").val(null);
                            $("#uploading-animal-form #uploadingAnimalColorValEN").val(null);
                            $("#uploading-animal-form #uploadingAnimalColorValDE").val(null);
                            $("#uploading-animal-form #uploadingAnimalColorValFR").val(null);
                            $("#uploading-animal-form #uploadingAnimalColorValES").val(null);
                        }

                        $("#uploading-animal-form #uploadingAnimalColorValHU").val($("#uploading-animal-form #uploadingAnimalColorValHUData").attr("data-items"));
                        $("#uploading-animal-form #uploadingAnimalColorValEN").val($("#uploading-animal-form #uploadingAnimalColorValENData").attr("data-items"));
                        $("#uploading-animal-form #uploadingAnimalColorValDE").val($("#uploading-animal-form #uploadingAnimalColorValDEData").attr("data-items"));
                        $("#uploading-animal-form #uploadingAnimalColorValFR").val($("#uploading-animal-form #uploadingAnimalColorValFRData").attr("data-items"));
                        $("#uploading-animal-form #uploadingAnimalColorValES").val($("#uploading-animal-form #uploadingAnimalColorValESData").attr("data-items"));

                        let $uploadingAnimalColorValDataList = $("#uploading-animal-form #uploadingAnimalColorValData").attr("data-items").split(',');

                        for (let i = 0; i < $uploadingAnimalColorValDataList.length; i++) {
                            $("#uploadingAnimalColorRadioWrap .radio-input").each(function () {
                                if ($(this).attr("data-name") === $uploadingAnimalColorValDataList[i].trim()) {
                                    $(this).find(".uploadingAnimalColorRadio").prop("checked", true);
                                    $(this).find(".uploadingAnimalColorRadio").checkbox("update");
                                }
                            });
                        }
                        // End Set Color

                    },
                    error: function (xhr, status, error) {
                    }
                });
            },

            listOfUploadedAnimals() {

                /*
                $(".container.list-of-uploaded-animals .icon-click.edit-animal").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataId = _this.attr("data-id");

                    let editOfUploadedAnimalData;
                    $.ajax({
                        type: "POST",
                        url: "/_edit-of-uploaded-animal",
                        contentType: "application/json",
                        data: JSON.stringify({"animal_id": dataId}),
                        beforeSend: function (xhr) {
                        },
                        success: function (result, status, xhr) {
                            editOfUploadedAnimalData = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                });
                 */

            },

            editOfUploadedAnimal() {
                let allowedUploadingAnimalSelectUrl = window.location.pathname.split("/");

                if (allowedUploadingAnimalSelectUrl[1] === 'edit-of-uploaded-animal' && cookies.runAnimalSubcategory !== false) {

                    // Start Age
                    let $uploadingAnimalYearValue = $("#uploading-animal-form #uploadingAnimalYear").val();
                    let $uploadingAnimalYearSelect = $("#uploading-animal-form .uploadingAnimalYearSelect");
                    $uploadingAnimalYearSelect.val($uploadingAnimalYearValue);
                    $uploadingAnimalYearSelect.selectpicker('refresh');

                    let $uploadingAnimalMonthValue = $("#uploading-animal-form #uploadingAnimalMonth").val();
                    let $uploadingAnimalMonthSelect = $("#uploading-animal-form .uploadingAnimalMonthSelect");
                    $uploadingAnimalMonthSelect.val($uploadingAnimalMonthValue);
                    $uploadingAnimalMonthSelect.selectpicker('refresh');

                    let $uploadingAnimalDayValue = $("#uploading-animal-form #uploadingAnimalDay").val();
                    let $uploadingAnimalDaySelect = $("#uploading-animal-form .uploadingAnimalDaySelect");
                    $uploadingAnimalDaySelect.val($uploadingAnimalDayValue);
                    $uploadingAnimalDaySelect.selectpicker('refresh');
                    // End Age

                    // Start Country
                    let $uploadingAnimalCountryOriginValue = $("#uploading-animal-form #uploadingAnimalCountryOrigin").val();
                    let $uploadingAnimalCountryOriginSelect = $("#uploading-animal-form .uploadingAnimalCountryOriginSelect");
                    $uploadingAnimalCountryOriginSelect.val($uploadingAnimalCountryOriginValue);
                    $uploadingAnimalCountryOriginSelect.selectpicker('refresh');

                    let $uploadingAnimalCountryResidenceValue = $("#uploading-animal-form #uploadingAnimalCountryResidence").val();
                    let $uploadingAnimalCountryResidenceSelect = $("#uploading-animal-form .uploadingAnimalCountryResidenceSelect");
                    $uploadingAnimalCountryResidenceSelect.val($uploadingAnimalCountryResidenceValue);
                    $uploadingAnimalCountryResidenceSelect.selectpicker('refresh');
                    // End Country

                    // Start Name
                    let $uploadingAnimalNameVal = $("#uploading-animal-form #uploadingAnimalName").val();

                    if ($uploadingAnimalNameVal !== "") {
                        $("#uploading-animal-form .tf-upload-animal .tf-name").text($uploadingAnimalNameVal);
                        $("#uploading-animal-form .tf-upload-animal .tf-name").removeClass("d-none");
                    }
                    // End Name

                    // Start Family
                    let $uploadingAnimalMotherVal = $("#uploading-animal-form #uploadingAnimalMother").val();
                    let $uploadingAnimalMotherMotherVal = $("#uploading-animal-form #uploadingAnimalMotherMother").val();
                    let $uploadingAnimalMotherMotherMotherVal = $("#uploading-animal-form #uploadingAnimalMotherMotherMother").val();
                    let $uploadingAnimalMotherMotherFatherVal = $("#uploading-animal-form #uploadingAnimalMotherMotherFather").val();
                    let $uploadingAnimalMotherFatherVal = $("#uploading-animal-form #uploadingAnimalMotherFather").val();
                    let $uploadingAnimalMotherFatherMotherVal = $("#uploading-animal-form #uploadingAnimalMotherFatherMother").val();
                    let $uploadingAnimalMotherFatherFatherVal = $("#uploading-animal-form #uploadingAnimalMotherFatherFather").val();

                    let $uploadingAnimalFatherVal = $("#uploading-animal-form #uploadingAnimalFather").val();
                    let $uploadingAnimalFatherMotherVal = $("#uploading-animal-form #uploadingAnimalFatherMother").val();
                    let $uploadingAnimalFatherMotherMotherVal = $("#uploading-animal-form #uploadingAnimalFatherMotherMother").val();
                    let $uploadingAnimalFatherMotherfatherVal = $("#uploading-animal-form #uploadingAnimalFatherMotherfather").val();
                    let $uploadingAnimalFatherFatherVal = $("#uploading-animal-form #uploadingAnimalFatherFather").val();
                    let $uploadingAnimalFatherFatherMotherVal = $("#uploading-animal-form #uploadingAnimalFatherFatherMother").val();
                    let $uploadingAnimalFatherFatherFatherVal = $("#uploading-animal-form #uploadingAnimalFatherFatherFather").val();

                    let $uploadingAnimalFamilyTree = $("#uploading-animal-form #uploading-animal-family-tree");
                    let $tfUploadAnimal = $("#uploading-animal-form .tf-upload-animal");

                    if ($uploadingAnimalMotherVal !== "") {
                        $tfUploadAnimal.find(".tf-nc.mother").addClass("active");
                        $uploadingAnimalFamilyTree.find(".inp.mother").removeClass("d-none");
                    }

                    if ($uploadingAnimalMotherMotherVal !== "") {
                        $tfUploadAnimal.find(".tf-nc.mother_mother").addClass("active");
                        $uploadingAnimalFamilyTree.find(".inp.mother_mother").removeClass("d-none");
                    }

                    if ($uploadingAnimalMotherMotherMotherVal !== "") {
                        $tfUploadAnimal.find(".tf-nc.mother_mother_mother").addClass("active");
                        $uploadingAnimalFamilyTree.find(".inp.mother_mother_mother").removeClass("d-none");
                    }

                    if ($uploadingAnimalMotherMotherFatherVal !== "") {
                        $tfUploadAnimal.find(".tf-nc.mother_mother_father").addClass("active");
                        $uploadingAnimalFamilyTree.find(".inp.mother_mother_father").removeClass("d-none");
                    }

                    if ($uploadingAnimalMotherFatherVal !== "") {
                        $tfUploadAnimal.find(".tf-nc.mother_father").addClass("active");
                        $uploadingAnimalFamilyTree.find(".inp.mother_father").removeClass("d-none");
                    }

                    if ($uploadingAnimalMotherFatherMotherVal !== "") {
                        $tfUploadAnimal.find(".tf-nc.mother_father_mother").addClass("active");
                        $uploadingAnimalFamilyTree.find(".inp.mother_father_mother").removeClass("d-none");
                    }

                    if ($uploadingAnimalMotherFatherFatherVal !== "") {
                        $tfUploadAnimal.find(".tf-nc.mother_father_father").addClass("active");
                        $uploadingAnimalFamilyTree.find(".inp.mother_father_father").removeClass("d-none");
                    }

                    if ($uploadingAnimalFatherVal !== "") {
                        $tfUploadAnimal.find(".tf-nc.father").addClass("active");
                        $uploadingAnimalFamilyTree.find(".inp.father").removeClass("d-none");
                    }

                    if ($uploadingAnimalFatherMotherVal !== "") {
                        $tfUploadAnimal.find(".tf-nc.father_mother").addClass("active");
                        $uploadingAnimalFamilyTree.find(".inp.father_mother").removeClass("d-none");
                    }

                    if ($uploadingAnimalFatherMotherMotherVal !== "") {
                        $tfUploadAnimal.find(".tf-nc.father_mother_mother").addClass("active");
                        $uploadingAnimalFamilyTree.find(".inp.father_mother_mother").removeClass("d-none");
                    }

                    if ($uploadingAnimalFatherMotherfatherVal !== "") {
                        $tfUploadAnimal.find(".tf-nc.father_mother_father").addClass("active");
                        $uploadingAnimalFamilyTree.find(".inp.father_mother_father").removeClass("d-none");
                    }

                    if ($uploadingAnimalFatherFatherVal !== "") {
                        $tfUploadAnimal.find(".tf-nc.father_father").addClass("active");
                        $uploadingAnimalFamilyTree.find(".inp.father_father").removeClass("d-none");
                    }

                    if ($uploadingAnimalFatherFatherMotherVal !== "") {
                        $tfUploadAnimal.find(".tf-nc.father_father_mother").addClass("active");
                        $uploadingAnimalFamilyTree.find(".inp.father_father_mother").removeClass("d-none");
                    }

                    if ($uploadingAnimalFatherFatherFatherVal !== "") {
                        $tfUploadAnimal.find(".tf-nc.father_father_father").addClass("active");
                        $uploadingAnimalFamilyTree.find(".inp.father_father_father").removeClass("d-none");
                    }
                    // End Family

                    // Start img01
                    let $uploadingAnimalImg01Show = $("#uploading-animal-form .uploadingAnimalImg01Show");
                    let $uploadingAnimalImg01 = $uploadingAnimalImg01Show.find("#uploadingAnimalImg01");

                    if ($uploadingAnimalImg01.val() !== "") {
                        $uploadingAnimalImg01.addClass("pointer-events-none");
                        $uploadingAnimalImg01Show.find(".animal.img01.img-icon").addClass("d-none");
                        $uploadingAnimalImg01Show.find(".animal.img01.crop-icon").removeClass("d-none");
                        $uploadingAnimalImg01Show.find(".animal.img01.trash-icon").removeClass("d-none");

                        let $uploadingAnimalImg01DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg01DataOld").val());

                        $uploadingAnimalImg01Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + $uploadingAnimalImg01DataOld['folder'] + "/cropped/" + $uploadingAnimalImg01DataOld['filename']);
                        $uploadingAnimalImg01Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                    }
                    // End img01

                    // Start img02
                    let $uploadingAnimalImg02Show = $("#uploading-animal-form .uploadingAnimalImg02Show");
                    let $uploadingAnimalImg02 = $uploadingAnimalImg02Show.find("#uploadingAnimalImg02");

                    if ($uploadingAnimalImg02.val() !== "") {
                        $uploadingAnimalImg02.addClass("pointer-events-none");
                        $uploadingAnimalImg02Show.find(".animal.img02.img-icon").addClass("d-none");
                        $uploadingAnimalImg02Show.find(".animal.img02.crop-icon").removeClass("d-none");
                        $uploadingAnimalImg02Show.find(".animal.img02.trash-icon").removeClass("d-none");

                        let $uploadingAnimalImg02DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg02DataOld").val());

                        $uploadingAnimalImg02Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + $uploadingAnimalImg02DataOld['folder'] + "/cropped/" + $uploadingAnimalImg02DataOld['filename']);
                        $uploadingAnimalImg02Show.find(".animal.animal-edit-img-preview").removeClass("d-none");

                        $("#uploading-animal-form .uploadingAnimalImg01Show").removeClass("d-none");
                        $("#uploading-animal-form .uploadingAnimalImg01ShowIcon").addClass("d-none");
                    }
                    // End img02

                    // Start img03
                    let $uploadingAnimalImg03Show = $("#uploading-animal-form .uploadingAnimalImg03Show");
                    let $uploadingAnimalImg03 = $uploadingAnimalImg03Show.find("#uploadingAnimalImg03");

                    if ($uploadingAnimalImg03.val() !== "") {
                        $uploadingAnimalImg03.addClass("pointer-events-none");
                        $uploadingAnimalImg03Show.find(".animal.img03.img-icon").addClass("d-none");
                        $uploadingAnimalImg03Show.find(".animal.img03.crop-icon").removeClass("d-none");
                        $uploadingAnimalImg03Show.find(".animal.img03.trash-icon").removeClass("d-none");

                        let $uploadingAnimalImg03DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg03DataOld").val());

                        $uploadingAnimalImg03Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + $uploadingAnimalImg03DataOld['folder'] + "/cropped/" + $uploadingAnimalImg03DataOld['filename']);
                        $uploadingAnimalImg03Show.find(".animal.animal-edit-img-preview").removeClass("d-none");

                        $("#uploading-animal-form .uploadingAnimalImg02Show").removeClass("d-none");
                        $("#uploading-animal-form .uploadingAnimalImg02ShowIcon").addClass("d-none");
                    }
                    // End img03

                    // Start img04
                    let $uploadingAnimalImg04Show = $("#uploading-animal-form .uploadingAnimalImg04Show");
                    let $uploadingAnimalImg04 = $uploadingAnimalImg04Show.find("#uploadingAnimalImg04");

                    if ($uploadingAnimalImg04.val() !== "") {
                        $uploadingAnimalImg04.addClass("pointer-events-none");
                        $uploadingAnimalImg04Show.find(".animal.img04.img-icon").addClass("d-none");
                        $uploadingAnimalImg04Show.find(".animal.img04.crop-icon").removeClass("d-none");
                        $uploadingAnimalImg04Show.find(".animal.img04.trash-icon").removeClass("d-none");

                        let $uploadingAnimalImg04DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg04DataOld").val());

                        $uploadingAnimalImg04Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + $uploadingAnimalImg04DataOld['folder'] + "/cropped/" + $uploadingAnimalImg04DataOld['filename']);
                        $uploadingAnimalImg04Show.find(".animal.animal-edit-img-preview").removeClass("d-none");

                        $("#uploading-animal-form .uploadingAnimalImg03Show").removeClass("d-none");
                        $("#uploading-animal-form .uploadingAnimalImg03ShowIcon").addClass("d-none");
                    }
                    // End img04

                    // Start img05
                    let $uploadingAnimalImg05Show = $("#uploading-animal-form .uploadingAnimalImg05Show");
                    let $uploadingAnimalImg05 = $uploadingAnimalImg05Show.find("#uploadingAnimalImg05");

                    if ($uploadingAnimalImg05.val() !== "") {
                        $(".uploadingAnimalImg05ShowIcon").addClass("d-none");
                        $uploadingAnimalImg05Show.removeClass("d-none");
                        $uploadingAnimalImg05.addClass("pointer-events-none");
                        $uploadingAnimalImg05Show.find(".animal.img05.img-icon").addClass("d-none");
                        $uploadingAnimalImg05Show.find(".animal.img05.crop-icon").removeClass("d-none");
                        $uploadingAnimalImg05Show.find(".animal.img05.trash-icon").removeClass("d-none");

                        let $uploadingAnimalImg05DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg05DataOld").val());

                        $uploadingAnimalImg05Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + $uploadingAnimalImg05DataOld['folder'] + "/cropped/" + $uploadingAnimalImg05DataOld['filename']);
                        $uploadingAnimalImg05Show.find(".animal.animal-edit-img-preview").removeClass("d-none");

                        $("#uploading-animal-form .uploadingAnimalImg04Show").removeClass("d-none");
                        $("#uploading-animal-form .uploadingAnimalImg04ShowIcon").addClass("d-none");
                    }
                    // End img05

                    // Start img06
                    let $uploadingAnimalImg06Show = $("#uploading-animal-form .uploadingAnimalImg06Show");
                    let $uploadingAnimalImg06 = $uploadingAnimalImg06Show.find("#uploadingAnimalImg06");

                    if ($uploadingAnimalImg06.val() !== "") {
                        $(".uploadingAnimalImg06ShowIcon").addClass("d-none");
                        $uploadingAnimalImg06Show.removeClass("d-none");
                        $uploadingAnimalImg06.addClass("pointer-events-none");
                        $uploadingAnimalImg06Show.find(".animal.img06.img-icon").addClass("d-none");
                        $uploadingAnimalImg06Show.find(".animal.img06.crop-icon").removeClass("d-none");
                        $uploadingAnimalImg06Show.find(".animal.img06.trash-icon").removeClass("d-none");

                        let $uploadingAnimalImg06DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg06DataOld").val());

                        $uploadingAnimalImg06Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + $uploadingAnimalImg06DataOld['folder'] + "/cropped/" + $uploadingAnimalImg06DataOld['filename']);
                        $uploadingAnimalImg06Show.find(".animal.animal-edit-img-preview").removeClass("d-none");

                        $("#uploading-animal-form .uploadingAnimalImg05Show").removeClass("d-none");
                        $("#uploading-animal-form .uploadingAnimalImg05ShowIcon").addClass("d-none");
                    }
                    // End img06

                    // Start img07
                    let $uploadingAnimalImg07Show = $("#uploading-animal-form .uploadingAnimalImg07Show");
                    let $uploadingAnimalImg07 = $uploadingAnimalImg07Show.find("#uploadingAnimalImg07");

                    if ($uploadingAnimalImg07.val() !== "") {
                        $(".uploadingAnimalImg07ShowIcon").addClass("d-none");
                        $uploadingAnimalImg07Show.removeClass("d-none");
                        $uploadingAnimalImg07.addClass("pointer-events-none");
                        $uploadingAnimalImg07Show.find(".animal.img07.img-icon").addClass("d-none");
                        $uploadingAnimalImg07Show.find(".animal.img07.crop-icon").removeClass("d-none");
                        $uploadingAnimalImg07Show.find(".animal.img07.trash-icon").removeClass("d-none");

                        let $uploadingAnimalImg07DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg07DataOld").val());

                        $uploadingAnimalImg07Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + $uploadingAnimalImg07DataOld['folder'] + "/cropped/" + $uploadingAnimalImg07DataOld['filename']);
                        $uploadingAnimalImg07Show.find(".animal.animal-edit-img-preview").removeClass("d-none");

                        $("#uploading-animal-form .uploadingAnimalImg06Show").removeClass("d-none");
                        $("#uploading-animal-form .uploadingAnimalImg06ShowIcon").addClass("d-none");
                    }
                    // End img07

                    // Start img08
                    let $uploadingAnimalImg08Show = $("#uploading-animal-form .uploadingAnimalImg08Show");
                    let $uploadingAnimalImg08 = $uploadingAnimalImg08Show.find("#uploadingAnimalImg08");

                    if ($uploadingAnimalImg08.val() !== "") {
                        $(".uploadingAnimalImg08ShowIcon").addClass("d-none");
                        $uploadingAnimalImg08Show.removeClass("d-none");
                        $uploadingAnimalImg08.addClass("pointer-events-none");
                        $uploadingAnimalImg08Show.find(".animal.img08.img-icon").addClass("d-none");
                        $uploadingAnimalImg08Show.find(".animal.img08.crop-icon").removeClass("d-none");
                        $uploadingAnimalImg08Show.find(".animal.img08.trash-icon").removeClass("d-none");

                        let $uploadingAnimalImg08DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg08DataOld").val());

                        $uploadingAnimalImg08Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + $uploadingAnimalImg08DataOld['folder'] + "/cropped/" + $uploadingAnimalImg08DataOld['filename']);
                        $uploadingAnimalImg08Show.find(".animal.animal-edit-img-preview").removeClass("d-none");

                        $("#uploading-animal-form .uploadingAnimalImg07Show").removeClass("d-none");
                        $("#uploading-animal-form .uploadingAnimalImg07ShowIcon").addClass("d-none");
                    }
                    // End img08

                    // Start img09
                    let $uploadingAnimalImg09Show = $("#uploading-animal-form .uploadingAnimalImg09Show");
                    let $uploadingAnimalImg09 = $uploadingAnimalImg09Show.find("#uploadingAnimalImg09");

                    if ($uploadingAnimalImg09.val() !== "") {
                        $(".uploadingAnimalImg09ShowIcon").addClass("d-none");
                        $uploadingAnimalImg09Show.removeClass("d-none");
                        $uploadingAnimalImg09.addClass("pointer-events-none");
                        $uploadingAnimalImg09Show.find(".animal.img09.img-icon").addClass("d-none");
                        $uploadingAnimalImg09Show.find(".animal.img09.crop-icon").removeClass("d-none");
                        $uploadingAnimalImg09Show.find(".animal.img09.trash-icon").removeClass("d-none");

                        let $uploadingAnimalImg09DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg09DataOld").val());

                        $uploadingAnimalImg09Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + $uploadingAnimalImg09DataOld['folder'] + "/cropped/" + $uploadingAnimalImg09DataOld['filename']);
                        $uploadingAnimalImg09Show.find(".animal.animal-edit-img-preview").removeClass("d-none");

                        $("#uploading-animal-form .uploadingAnimalImg08Show").removeClass("d-none");
                        $("#uploading-animal-form .uploadingAnimalImg08ShowIcon").addClass("d-none");
                    }
                    // End img09

                    // Start img10
                    let $uploadingAnimalImg10Show = $("#uploading-animal-form .uploadingAnimalImg10Show");
                    let $uploadingAnimalImg10 = $uploadingAnimalImg10Show.find("#uploadingAnimalImg10");

                    if ($uploadingAnimalImg10.val() !== "") {
                        $(".uploadingAnimalImg10ShowIcon").addClass("d-none");
                        $uploadingAnimalImg10Show.removeClass("d-none");
                        $uploadingAnimalImg10.addClass("pointer-events-none");
                        $uploadingAnimalImg10Show.find(".animal.img10.img-icon").addClass("d-none");
                        $uploadingAnimalImg10Show.find(".animal.img10.crop-icon").removeClass("d-none");
                        $uploadingAnimalImg10Show.find(".animal.img10.trash-icon").removeClass("d-none");

                        let $uploadingAnimalImg10DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg10DataOld").val());

                        $uploadingAnimalImg10Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + $uploadingAnimalImg10DataOld['folder'] + "/cropped/" + $uploadingAnimalImg10DataOld['filename']);
                        $uploadingAnimalImg10Show.find(".animal.animal-edit-img-preview").removeClass("d-none");

                        $("#uploading-animal-form .uploadingAnimalImg09Show").removeClass("d-none");
                        $("#uploading-animal-form .uploadingAnimalImg09ShowIcon").addClass("d-none");
                    }
                    // End img10

                    // Start Video01
                    let $uploadingAnimalVideo01Show = $("#uploading-animal-form .uploadingAnimalVideo01Show");
                    let $uploadingAnimalVideo01 = $("#uploading-animal-form #uploadingAnimalVideo01");

                    if ($uploadingAnimalVideo01.val() !== "") {
                        $uploadingAnimalVideo01.addClass("pointer-events-none");
                        $uploadingAnimalVideo01Show.find(".animal.video01.video-icon").addClass("d-none");
                        $uploadingAnimalVideo01Show.find(".animal.video01.trash-icon").removeClass("d-none");

                        let $uploadingAnimalVideo01DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalVideo01DataOld").val());

                        $uploadingAnimalVideo01Show.find(".animal.video01.cropped-video #animalUploadingVideo01Video").attr("src", "/static/videos/animal/" + $uploadingAnimalVideo01DataOld['folder'] + "/cropped/" + $uploadingAnimalVideo01DataOld['filename']);
                        $uploadingAnimalVideo01Show.find(".animal.video01.cropped-video").removeClass("d-none");
                    }
                    // End Video01

                    // Start Medical paper
                    const pdfOptions = {
                        height: "500px",
                        pdfOpenParams: {
                            pagemode: 'none'
                        }
                    };

                    let $uploadingAnimalMedicalPaperShow = $("#uploading-animal-form .uploadingAnimalMedicalPaperShow");
                    let $uploadingAnimalMedicalPaperPdf = $uploadingAnimalMedicalPaperShow.find("#uploadingAnimalMedicalPaperPdf");

                    if ($uploadingAnimalMedicalPaperPdf.val() !== "") {
                        $uploadingAnimalMedicalPaperPdf.addClass("pointer-events-none");
                        $uploadingAnimalMedicalPaperShow.find(".animal.medicalPaper.img-icon").addClass("d-none");
                        $uploadingAnimalMedicalPaperShow.find(".animal.medicalPaper.trash-icon").removeClass("d-none");

                        let $uploadingAnimalMedicalPaperPdfData = JSON.parse($("#uploading-animal-form #uploadingAnimalMedicalPaperPdfDataOld").val());

                        if (PDFObject.supportsPDFs) {
                            PDFObject.embed("/static/pdf/animal/" + $uploadingAnimalMedicalPaperPdfData['folder'] + "/" + $uploadingAnimalMedicalPaperPdfData['filename'], "#animal-new-medical-paper-cropper", pdfOptions);
                            $uploadingAnimalMedicalPaperShow.find(".animal.medicalPaper.cropper-img").removeClass("d-none");
                        } else {
                            console.log("Not supported by this browser.");
                        }
                    }
                    // End Medical Paper

                    // Start Breed Registry
                    let $uploadingAnimalBreedRegistryShow = $("#uploading-animal-form .uploadingAnimalBreedRegistryShow");
                    let $uploadingAnimalBreedRegistryPdf = $uploadingAnimalBreedRegistryShow.find("#uploadingAnimalBreedRegistryPdf");

                    if ($uploadingAnimalBreedRegistryPdf.val() !== "") {
                        $uploadingAnimalBreedRegistryPdf.addClass("pointer-events-none");
                        $uploadingAnimalBreedRegistryShow.find(".animal.breedRegistry.img-icon").addClass("d-none");
                        $uploadingAnimalBreedRegistryShow.find(".animal.breedRegistry.trash-icon").removeClass("d-none");

                        let $uploadingAnimalBreedregistryPdfData = JSON.parse($("#uploading-animal-form #uploadingAnimalBreedRegistryPdfDataOld").val());

                        if (PDFObject.supportsPDFs) {
                            PDFObject.embed("/static/pdf/animal/" + $uploadingAnimalBreedregistryPdfData['folder'] + "/" + $uploadingAnimalBreedregistryPdfData['filename'], "#animal-new-breed-registry-cropper", pdfOptions);
                            $uploadingAnimalBreedRegistryShow.find(".animal.breedRegistry.cropper-img").removeClass("d-none");
                        } else {
                            console.log("Not supported by this browser.");
                        }
                    }
                    // End Breed Registry

                    // Start X Ray
                    let $uploadingAnimalXRayShow = $("#uploading-animal-form .uploadingAnimalXRayShow");
                    let $uploadingAnimalXRayPdf = $uploadingAnimalXRayShow.find("#uploadingAnimalXRayPdf");

                    if ($uploadingAnimalXRayPdf.val() !== "") {
                        $uploadingAnimalXRayPdf.addClass("pointer-events-none");
                        $uploadingAnimalXRayShow.find(".animal.xRay.img-icon").addClass("d-none");
                        $uploadingAnimalXRayShow.find(".animal.xRay.trash-icon").removeClass("d-none");

                        let $uploadingAnimalXRayPdfData = JSON.parse($("#uploading-animal-form #uploadingAnimalXRayPdfDataOld").val());

                        if (PDFObject.supportsPDFs) {
                            PDFObject.embed("/static/pdf/animal/" + $uploadingAnimalXRayPdfData['folder'] + "/" + $uploadingAnimalXRayPdfData['filename'], "#animal-new-x-ray-cropper", pdfOptions);
                            $uploadingAnimalXRayShow.find(".animal.xRay.cropper-img").removeClass("d-none");
                        } else {
                            console.log("Not supported by this browser.");
                        }
                    }
                    // End X Ray

                    // Start price
                    $("#uploading-animal-form #uploadingAnimalPrice").trigger("change");
                    // End Price

                }
            },

            delOfUploadedAnimal: function () {

                $("#uploading-animal-form #delete-animal-form-button").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let $lock = _this.find(".delete-lock");
                    let $unlock = _this.find(".delete-unlock");

                    if ($unlock.hasClass("active")) {
                        let delOfUploadedAnimalData;
                        $.ajax({
                            type: "POST",
                            url: "/_del-of-uploaded-animal",
                            contentType: "application/json",
                            data: JSON.stringify($("#uploading-animal-form").serializeObject()),
                            beforeSend: function (xhr) {
                                _this.attr('disabled', true);
                                _this.addClass("action");
                                //$("body").addClass("filter-grayscale-100");
                                $("#post-loader").toggleClass("active inactive");
                                $("body").css({"overflow": "hidden"});
                            },
                            success: function (result, status, xhr) {
                                delOfUploadedAnimalData = result;
                            },
                            complete: function (xhr, status) {
                                let statusCode = xhr['status'];

                                if (statusCode === 200) {
                                    let isWorker = delOfUploadedAnimalData['is_worker'];
                                    let userId = delOfUploadedAnimalData['user_id']
                                    setTimeout(
                                        function () {
                                            if (isWorker === "False") {
                                                window.location.href = utility.getURL() + "/list-of-uploaded-animals";
                                            }
                                            if (isWorker === "True") {
                                                window.location.href = utility.getURL() + "/user-management/user/" + userId;
                                            }
                                        }, 1500);
                                } else {
                                    //$("body").css({"filter": "grayscale(0%)"});
                                    $("#post-loader").toggleClass("inactive active");
                                    $("body").removeAttr("style");
                                    _this.attr('disabled', false);
                                    _this.removeClass("action");
                                }
                            },
                            error: function (xhr, status, error) {
                            }
                        });
                    }

                    if ($lock.hasClass("active")) {
                        $(".dropdown-menu.animal.action li span.dropdown-item." + _this.attr("data-btn")).css({"background-color": "#0d6efd"});
                        $lock.removeClass("active").addClass("inactive d-none");
                        $unlock.removeClass("inactive d-none").addClass("active");
                        _this.removeClass("btn-danger").addClass("btn-primary");
                    }
                });

            },

            inactivateOfUploadedAnimal: function () {

                $("#uploading-animal-form #inactivate-animal-form-button").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let $lock = _this.find(".delete-lock");
                    let $unlock = _this.find(".delete-unlock");

                    if ($unlock.hasClass("active")) {
                        let delOfUploadedAnimalData;
                        let uploadAnimalFormJson = $("#uploading-animal-form").serializeObject();
                        uploadAnimalFormJson.btn = _this.attr("data-btn");
                        $.ajax({
                            type: "POST",
                            url: "/_inactivate-of-uploaded-animal",
                            contentType: "application/json",
                            data: JSON.stringify(uploadAnimalFormJson),
                            beforeSend: function (xhr) {
                                _this.attr('disabled', true);
                                _this.addClass("action");
                                //$("body").addClass("filter-grayscale-100");
                                $("#post-loader").toggleClass("active inactive");
                                $("body").css({"overflow": "hidden"});
                            },
                            success: function (result, status, xhr) {
                                delOfUploadedAnimalData = result;
                            },
                            complete: function (xhr, status) {
                                let statusCode = xhr['status'];

                                if (statusCode === 200) {
                                    let isWorker = delOfUploadedAnimalData['is_worker'];
                                    let userId = delOfUploadedAnimalData['user_id']
                                    setTimeout(
                                        function () {
                                            if (isWorker === "False") {
                                                window.location.href = utility.getURL() + "/list-of-uploaded-animals";
                                            }
                                            if (isWorker === "True") {
                                                window.location.href = utility.getURL() + "/user-management/user/" + userId;
                                            }
                                        }, 1500);
                                } else {
                                    //$("body").css({"filter": "grayscale(0%)"});
                                    $("#post-loader").toggleClass("inactive active");
                                    $("body").removeAttr("style");
                                    _this.attr('disabled', false);
                                    _this.removeClass("action");
                                }
                            },
                            error: function (xhr, status, error) {
                            }
                        });
                    }

                    if ($lock.hasClass("active")) {
                        $(".dropdown-menu.animal.action li span.dropdown-item." + _this.attr("data-btn")).css({"background-color": "#0d6efd"});
                        $lock.removeClass("active").addClass("inactive d-none");
                        $unlock.removeClass("inactive d-none").addClass("active");
                        _this.removeClass("btn-danger").addClass("btn-primary");
                    }
                });

            },

            activateOfUploadedAnimal: function () {

                $("#uploading-animal-form #activate-animal-form-button").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let $lock = _this.find(".delete-lock");
                    let $unlock = _this.find(".delete-unlock");

                    if ($unlock.hasClass("active")) {
                        let delOfUploadedAnimalData;
                        let uploadAnimalFormJson = $("#uploading-animal-form").serializeObject();
                        uploadAnimalFormJson.btn = _this.attr("data-btn");
                        $.ajax({
                            type: "POST",
                            url: "/_activate-of-uploaded-animal",
                            contentType: "application/json",
                            data: JSON.stringify(uploadAnimalFormJson),
                            beforeSend: function (xhr) {
                                _this.attr('disabled', true);
                                _this.addClass("action");
                                //$("body").addClass("filter-grayscale-100");
                                $("#post-loader").toggleClass("active inactive");
                                $("body").css({"overflow": "hidden"});
                            },
                            success: function (result, status, xhr) {
                                delOfUploadedAnimalData = result;
                            },
                            complete: function (xhr, status) {
                                let statusCode = xhr['status'];

                                if (statusCode === 200) {
                                    let isWorker = delOfUploadedAnimalData['is_worker'];
                                    let userId = delOfUploadedAnimalData['user_id']
                                    setTimeout(
                                        function () {
                                            if (isWorker === "False") {
                                                window.location.href = utility.getURL() + "/list-of-uploaded-animals";
                                            }
                                            if (isWorker === "True") {
                                                window.location.href = utility.getURL() + "/user-management/user/" + userId;
                                            }
                                        }, 1500);
                                } else {
                                    //$("body").css({"filter": "grayscale(0%)"});
                                    $("#post-loader").toggleClass("inactive active");
                                    $("body").removeAttr("style");
                                    _this.attr('disabled', false);
                                    _this.removeClass("action");
                                }
                            },
                            error: function (xhr, status, error) {
                            }
                        });
                    }

                    if ($lock.hasClass("active")) {
                        $(".dropdown-menu.animal.action li span.dropdown-item." + _this.attr("data-btn")).css({"background-color": "#0d6efd"});
                        $lock.removeClass("active").addClass("inactive d-none");
                        $unlock.removeClass("inactive d-none").addClass("active");
                        _this.removeClass("btn-danger").addClass("btn-primary");
                    }
                });

            },

            initializ: function () {
                loadAnimal.uploadAnimal();
                loadAnimal.listOfUploadedAnimals();
                loadAnimal.editOfUploadedAnimal();
                loadAnimal.delOfUploadedAnimal();
                loadAnimal.inactivateOfUploadedAnimal();
                loadAnimal.activateOfUploadedAnimal();
            }

        };

        $(function () {
            loadAnimal.initializ()
        });
    }
}

export let anlibreedersAnimal = new AnlibreedersAnimal();