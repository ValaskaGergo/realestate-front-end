import AnlibreedersUtility from './utilities/anlibreeders.utility'
import {Fancybox, Carousel, Panzoom} from "@fancyapps/ui";
import numbro from "numbro";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import {cookies} from "brownies";

const utility = new AnlibreedersUtility();

class AnlibreedersList {
    loadAnlibreedersList() {
        const loadList = {

            listGallery: function () {
                const $list = $("#list");
                const $listBoxImg = $list.find(".box-img");

                Fancybox.bind('[data-fancybox]', {});

                Fancybox.defaults.Hash = false;

                Fancybox.bind('[data-fancybox]', {
                    Html: {
                        video: {
                            autoplay: false,
                        },
                    },
                    Image: {
                        zoom: false,
                        // click: 'next',
                        Panzoom: {
                            zoomFriction: 0,
                            maxScale: function () {
                                return 0;
                            },
                        },
                    },
                    Thumbs: false,
                    Toolbar: {
                        display: [
                            {id: "close", position: "right"},
                            {id: "counter", position: "left"},
                            "slideshow"
                        ],
                    },
                    l10n: {
                        CLOSE: " ",
                        NEXT: " ",
                        PREV: " ",
                        MODAL: " ",
                        ERROR: "Something Went Wrong, Please Try Again Later",
                        IMAGE_ERROR: "Image Not Found",
                        ELEMENT_NOT_FOUND: "HTML Element Not Found",
                        AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
                        AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
                        IFRAME_ERROR: "Error Loading Page",
                    },
                    on: {
                        load: (event, fancybox, slide) => {

                            let dataBoxImgAnimalId = $(fancybox.$trigger).attr("data-box-img-animal_id");
                            let $bixImg = $("#list .box-img[data-box-img-animal_id='" + dataBoxImgAnimalId + "']");

                            let $boxRating = $bixImg.find(".box-rating").clone();
                            let $boxEye = $bixImg.find(".box-eye").clone();
                            let $boxTime = $bixImg.find(".box-time").clone();
                            let $boxJump = $bixImg.find(".full-data-sheet-link").clone();

                            $(".fancybox__content .fancy-box-rating").detach();
                            $(".fancybox__content .fancy-box-eye").detach();
                            $(".fancybox__content .fancy-box-time").detach();
                            $(".fancybox__content .fancy-box-jump").detach();

                            try {
                                $(".fancybox__content").append(
                                    '<div class="fancy-box-rating">' + $boxRating.get(0).outerHTML + '</div>' +
                                    '<div class="fancy-box-eye">' + $boxEye.get(0).outerHTML + '</div>' +
                                    '<div class="fancy-box-time">' + $boxTime.get(0).outerHTML + '</div>' +
                                    '<div class="fancy-box-jump">' + $boxJump.get(0).outerHTML + '</div>'
                                );
                            } catch (error) {
                                // pass
                            }

                            try {
                                let dataExternalUrl = $(fancybox.$trigger).attr("data-external_url");
                                $bixImg = $("#list .box-img[data-external_url='" + dataExternalUrl + "']");
                                $boxJump = $bixImg.find(".full-data-sheet-link").clone();
                                $(".fancybox__content").append(
                                    '<div class="fancy-box-jump">' + $boxJump.get(0).outerHTML + '</div>'
                                );
                            } catch (error) {
                            }
                        },
                        ready: (fancybox, slide) => {
                            Fancybox.getInstance().jumpTo(0, {friction: 0});
                        },
                    },
                });

                $("body").on("click", "#list .box-img", function (event) {
                    // $(".fancybox__content .foo:not(:first)").remove();
                });
            },

            listFullDataSheetLink: function () {
                const $list = $("#list");
                const $full = $list.find(".full-data-sheet-link");

                $full.on("click", function (event) {
                    event.stopPropagation();
                    const _this = $(this);
                });
            },

            listPlusIcon: function () {
                const $list = $("#list");
                const $plusIcon = $list.find(".plus .plus-icon");
                const $minusIcon = $list.find(".badge-group .minus-icon");

                $("body").on("click", "#list .plus .plus-icon", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    _this.parent('.plus').hide();
                    _this.parent('.plus').next(".badge-group").removeClass("inactive").addClass("active");
                });

                $("body").on("click", "#list .badge-group .minus-icon", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    _this.parent('.badge-group').removeClass("active").addClass("inactive");
                    _this.parent('.badge-group').prev(".plus").show();
                });
            },

            listDataFormatting: function () {
                const $list = $("#list");
                const $box = $list.find(".box-wrap");

                // Start Price
                const $priceCurrencyPrice = $box.find(".price-currency .price");
                numbro.languageData().delimiters.thousands = " ";
                $priceCurrencyPrice.each(function () {
                    let number = numbro($(this).text());
                    $(this).text("");
                    $(this).text(number.format({thousandSeparated: true, mantissa: 0}));
                });
                // End price

                // Start Country Origin Residence
                let $countryOriginResidenceElem = $box.find(".country-origin-residence-elem");

                $countryOriginResidenceElem.each(function () {
                    let countryResidence = $(this).find(".country-residence-elem").text();
                    $(this).find(".country-origin-residence").html( countryResidence);
                });

                // End Country Origin Residence

                // Start Filter Info
                const $filterInfoWrap = $list.find("#filter-info-wrap");
                const $filterInfoType = $filterInfoWrap.find(".filter-info-type");

                const $filterOrderByPriceVal = $("#filterOrderByPrice").val();
                const $filterOrderByRatingVal = $("#filterOrderByRating").val();

                $filterInfoType.removeData("i18n");
                $filterInfoType.text("");

                if ($filterOrderByPriceVal === "asc") {
                    $filterInfoType.attr("data-i18n", "anlihouse-A293");
                } else if ($filterOrderByPriceVal === "desc") {
                    $filterInfoType.attr("data-i18n", "anlihouse-A294");
                } else if ($filterOrderByAgeVal === "asc") {
                    $filterInfoType.attr("data-i18n", "anlihouse-A295");
                } else if ($filterOrderByAgeVal === "desc") {
                    $filterInfoType.attr("data-i18n", "anlihouse-A296");
                } else if ($filterOrderByHeightVal === "asc") {
                    $filterInfoType.attr("data-i18n", "anlihouse-A297");
                } else if ($filterOrderByHeightVal === "desc") {
                    $filterInfoType.attr("data-i18n", "anlihouse-A298");
                } else if ($filterOrderByRatingVal === "asc") {
                    $filterInfoType.attr("data-i18n", "anlihouse-A299");
                } else if ($filterOrderByRatingVal === "desc") {
                    $filterInfoType.attr("data-i18n", "anlihouse-A300");
                }

                $('body').i18n();
                // End Filter Info
            },

            listAjaxPagination: function () {
                const $list = $("#list");
                const $listAjaxWrap = $list.find(".row.list-ajax-wrap");
                const $listAjaxPaginationBtn = $list.find("#list-ajax-pagination .btn");
                const $spinnerGrow = $listAjaxPaginationBtn.find(".spinner-grow");

                const $listPagination = $("#list-pagination");
                const $listPaginationPageItem = $listPagination.find(".page-item");
                const $listPaginationPageItemPrevious = $listPagination.find(".page-item.previous");
                const $listPaginationPageItemNext = $listPagination.find(".page-item.next");

                let dataPageNumber = parseInt($listPagination.attr("data-page_number"));
                let dataPaginationLast = parseInt($listPagination.attr("data-pagination_last"));

                if (dataPageNumber === dataPaginationLast) {
                    $listAjaxPaginationBtn.hide();
                }

                $listAjaxPaginationBtn.on("click", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    dataPageNumber = parseInt($listPagination.attr("data-page_number"));
                    dataPaginationLast = parseInt($listPagination.attr("data-pagination_last"));

                    let filterFormAjaxData = $("#filter-form").serializeObject();
                    filterFormAjaxData['dataPageNumber'] = dataPageNumber
                    filterFormAjaxData['dataPaginationLast'] = dataPaginationLast
                    filterFormAjaxData = JSON.stringify(filterFormAjaxData);

                    function doesFileExist(urlToFile) {
                        let xhr = new XMLHttpRequest();
                        xhr.open('HEAD', urlToFile, false);
                        xhr.send();

                        if (xhr.status == "404") {
                            return false;
                        } else {
                            return true;
                        }
                    }

                    let filterFormData;
                    let filterFormEncode;
                    let browserLang;
                    let countries;
                    let price_show;
                    $.ajax({
                        type: "POST",
                        url: "/_list-ajax-pagination",
                        contentType: "application/json",
                        data: filterFormAjaxData,
                        beforeSend: function (xhr) {
                            _this.addClass("pointer-events-none");
                            $spinnerGrow.removeClass("inactive").addClass("active");
                        },
                        success: function (result, status, xhr) {
                            filterFormData = result['message']
                            filterFormEncode = result['encode']
                            browserLang = filterFormData['lang'];
                            countries = result['countries']['data'];
                            price_show = result['price_show']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let filterEncodeInputVal = $("#search #filterEncode").val();

                                // Start Pagination Numbers
                                let dataPageNumberAction = dataPageNumber + 1;
                                $listPaginationPageItem.each(function () {
                                    if ($(this).attr("data-number")) {
                                        $(this).removeClass("disabled");
                                    }
                                    if (parseInt($(this).attr("data-number")) === dataPageNumberAction) {
                                        $(this).addClass("disabled");
                                    }
                                });
                                // End Pagination Numbers

                                // Start Pagination Previous
                                let listPaginationPageItemPrevious = parseInt($listPaginationPageItemPrevious.attr("data-pagination_previous")) + 1;
                                $listPaginationPageItemPrevious.attr("data-pagination_previous", listPaginationPageItemPrevious);
                                if (listPaginationPageItemPrevious >= 1) {
                                    $listPaginationPageItemPrevious.removeClass("disabled");
                                }

                                if (filterEncodeInputVal === "None") {
                                    $listPaginationPageItemPrevious.find(".page-link").attr("href", "/query/" + listPaginationPageItemPrevious)
                                } else {
                                    $listPaginationPageItemPrevious.find(".page-link").attr("href", "/query/" + listPaginationPageItemPrevious + "/" + filterEncodeInputVal);
                                }
                                // End Pagination Previous

                                // Start Pagination Next
                                let $listPaginationPageItemNextDataPlusOne = parseInt($listPaginationPageItemNext.attr("data-pagination_next")) + 1;
                                $listPaginationPageItemNext.attr("data-pagination_next", $listPaginationPageItemNextDataPlusOne);

                                if (filterEncodeInputVal === "None") {
                                    $listPaginationPageItemNext.find(".page-link").attr("href", "/query/" + $listPaginationPageItemNextDataPlusOne)
                                } else {
                                    $listPaginationPageItemNext.find(".page-link").attr("href", "/query/" + $listPaginationPageItemNextDataPlusOne + "/" + filterEncodeInputVal);
                                }

                                let dataPageNumberNext = dataPageNumber + 1;
                                if (parseInt($listPaginationPageItemNext.attr("data-pagination_next")) > parseInt($listPaginationPageItemNext.attr("data-pagination_last"))) {
                                    $listPaginationPageItemNext.addClass("disabled");
                                }
                                // End pagination Next

                                // Start Pagination URL
                                if (filterEncodeInputVal === "None") {
                                    // window.location.hash = "/query/" + dataPageNumberAction
                                    window.history.replaceState({}, "", "/query/" + dataPageNumberAction);
                                } else {
                                    window.history.replaceState({}, "", "/query/" + dataPageNumberAction + "/" + filterEncodeInputVal);
                                }
                                // End Pagination URL

                                // Start List Ajax Wrap
                                let animalsList = filterFormData['animals_list'];

                                let animalsListRandomClass = utility.getGenerateClass();

                                for (let i = 0; i < animalsList.length; i++) {
                                    let animal = animalsList[i]['animal'];
                                    let photo = animalsList[i]['photo'];
                                    let video = animalsList[i]['video'];
                                    let pdf = animalsList[i]['pdf'];
                                    let category = animalsList[i]['category'];
                                    let subcategory = animalsList[i]['subcategory'];
                                    let rating = parseFloat(animalsList[i]['rating']['rating']);

                                    // Start Photo
                                    let img_count = 0;

                                    let video_01_origin = "";
                                    let video_01_elem = "";
                                    if (video['video_01'] !== null) {
                                        let video_01_folder = video['video_01'].replace(".mp4", "");
                                        video_01_origin = utility.getURL() + "/static/videos/animal/" + video_01_folder + "/origin/" + video['video_01'];
                                    }

                                    let video_01_origin_result = doesFileExist(video_01_origin);

                                    if (video_01_origin_result == true) {
                                        video_01_elem = '<span class="shadow badge default"><span>1</span> <span data-i18n="anlihouse-A285"></span></span>'
                                    } else {
                                        video_01_elem = "";
                                    }

                                    let img_01_elem = "";
                                    if (photo['img_01'] !== null) {
                                        img_count++;
                                        let img_01_folder = photo['img_01'].replace(".jpg", "");
                                        let img_01 = utility.getURL() + "/static/images/animal/" + img_01_folder + "/cropped/" + photo['img_01'];
                                        img_01_elem = '<a href="' + img_01 + '" data-fancybox="' + animal['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + animal['id'] + '">' +
                                            '<img class="shadow img-fluid img-first" src="' + img_01 + '">' +
                                            '</a>'
                                    }

                                    let img_02_elem = "";
                                    if (photo['img_02'] !== null) {
                                        img_count++;
                                        let img_02_folder = photo['img_02'].replace(".jpg", "");
                                        let img_02 = utility.getURL() + "/static/images/animal/" + img_02_folder + "/cropped/" + photo['img_02'];
                                        img_02_elem = '<a href="' + img_02 + '" data-fancybox="' + animal['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + animal['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_02 + '">' +
                                            '</a>'
                                    }

                                    let img_03_elem = "";
                                    if (photo['img_03'] !== null) {
                                        img_count++;
                                        let img_03_folder = photo['img_03'].replace(".jpg", "");
                                        let img_03 = utility.getURL() + "/static/images/animal/" + img_03_folder + "/cropped/" + photo['img_03'];
                                        img_03_elem = '<a href="' + img_03 + '" data-fancybox="' + animal['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + animal['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_03 + '">' +
                                            '</a>'
                                    }

                                    let img_04_elem = "";
                                    if (photo['img_04'] !== null) {
                                        img_count++;
                                        let img_04_folder = photo['img_04'].replace(".jpg", "");
                                        let img_04 = utility.getURL() + "/static/images/animal/" + img_04_folder + "/cropped/" + photo['img_04'];
                                        img_04_elem = '<a href="' + img_04 + '" data-fancybox="' + animal['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + animal['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_04 + '">' +
                                            '</a>'
                                    }

                                    let img_05_elem = "";
                                    if (photo['img_05'] !== null) {
                                        img_count++;
                                        let img_05_folder = photo['img_05'].replace(".jpg", "");
                                        let img_05 = utility.getURL() + "/static/images/animal/" + img_05_folder + "/cropped/" + photo['img_05'];
                                        img_05_elem = '<a href="' + img_05 + '" data-fancybox="' + animal['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + animal['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_05 + '">' +
                                            '</a>'
                                    }

                                    let img_06_elem = "";
                                    if (photo['img_06'] !== null) {
                                        img_count++;
                                        let img_06_folder = photo['img_06'].replace(".jpg", "");
                                        let img_06 = utility.getURL() + "/static/images/animal/" + img_06_folder + "/cropped/" + photo['img_06'];
                                        img_06_elem = '<a href="' + img_06 + '" data-fancybox="' + animal['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + animal['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_06 + '">' +
                                            '</a>'
                                    }

                                    let img_07_elem = "";
                                    if (photo['img_07'] !== null) {
                                        img_count++;
                                        let img_07_folder = photo['img_07'].replace(".jpg", "");
                                        let img_07 = utility.getURL() + "/static/images/animal/" + img_07_folder + "/cropped/" + photo['img_07'];
                                        img_07_elem = '<a href="' + img_07 + '" data-fancybox="' + animal['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + animal['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_07 + '">' +
                                            '</a>'
                                    }

                                    let img_08_elem = "";
                                    if (photo['img_08'] !== null) {
                                        img_count++;
                                        let img_08_folder = photo['img_08'].replace(".jpg", "");
                                        let img_08 = utility.getURL() + "/static/images/animal/" + img_08_folder + "/cropped/" + photo['img_08'];
                                        img_08_elem = '<a href="' + img_08 + '" data-fancybox="' + animal['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + animal['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_08 + '">' +
                                            '</a>'
                                    }

                                    let img_09_elem = "";
                                    if (photo['img_09'] !== null) {
                                        img_count++;
                                        let img_09_folder = photo['img_09'].replace(".jpg", "");
                                        let img_09 = utility.getURL() + "/static/images/animal/" + img_09_folder + "/cropped/" + photo['img_09'];
                                        img_09_elem = '<a href="' + img_09 + '" data-fancybox="' + animal['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + animal['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_09 + '">' +
                                            '</a>'
                                    }

                                    let img_10_elem = "";
                                    if (photo['img_10'] !== null) {
                                        img_count++;
                                        let img_10_folder = photo['img_10'].replace(".jpg", "");
                                        let img_10 = utility.getURL() + "/static/images/animal/" + img_10_folder + "/cropped/" + photo['img_10'];
                                        img_10_elem = '<a href="' + img_10 + '" data-fancybox="' + animal['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + animal['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_10 + '">' +
                                            '</a>'
                                    }
                                    // End Photo

                                    // Start Lang
                                    let category_name = "";
                                    let subcategory_name = "";
                                    let color_name = "";
                                    let gender_name = "";
                                    let be_used_for = "";
                                    if (browserLang === "hu") {
                                        category_name = category["name_hu"];
                                        subcategory_name = subcategory["name_hu"];
                                        color_name = animal['color_hu'];
                                        gender_name = animal['gender_hu'];
                                        be_used_for = animal['be_used_for_hu']
                                    } else if (browserLang === "en") {
                                        category_name = category["name_en"];
                                        subcategory_name = subcategory["name_en"];
                                        color_name = animal['color_en'];
                                        gender_name = animal['gender_en'];
                                        be_used_for = animal['be_used_for_en']
                                    } else if (browserLang === "de") {
                                        category_name = category["name_de"];
                                        subcategory_name = subcategory["name_de"];
                                        color_name = animal['color_de'];
                                        gender_name = animal['gender_de'];
                                        be_used_for = animal['be_used_for_de']
                                    } else if (browserLang === "fr") {
                                        category_name = category["name_fr"];
                                        subcategory_name = subcategory["name_fr"];
                                        color_name = animal['color_fr'];
                                        gender_name = animal['gender_fr'];
                                        be_used_for = animal['be_used_for_fr']
                                    } else if (browserLang === "es") {
                                        category_name = category["name_es"];
                                        subcategory_name = subcategory["name_es"];
                                        color_name = animal['color_es'];
                                        gender_name = animal['gender_es'];
                                        be_used_for = animal['be_used_for_es']
                                    }
                                    // End Lang



                                    // Start Countries
                                    let country_residence = "";
                                    for (let country = 0; country < countries.length; country++) {
                                        if (countries[country]['country_code'] === animal['country_residence']) {
                                            country_residence = countries[country]['country'];
                                        }
                                    }
                                    // End Countries

                                    // Start PDF


                                    let x_ray = "";
                                    if (pdf['x_ray'] !== null) {
                                        x_ray = '<span class="shadow badge default" data-i18n="anlihouse-A288"></span>';
                                    }
                                    // End PDF

                                    // Start HorseTelex - Hippomundo
                                    let url_01 = "";
                                    if (animal['url_01'] !== "") {
                                        url_01 = '<span class="shadow badge default" data-i18n="anlihouse-A289"></span>';
                                    }

                                    let url_02 = "";
                                    if (animal['url_02'] !== "") {
                                        url_02 = '<span class="shadow badge default" data-i18n="anlihouse-A290"></span>';
                                    }
                                    // End HorseTelex - Hippomundo

                                    // Start Price Show
                                    let price_show_elem = "";
                                    if (price_show === true) {
                                        if (animal['price_exchange_currency'] !== "EUR") {
                                            price_show_elem = '<span class="shadow badge default price-currency"><span class="price">' + animal['price'] + '</span> <span class="currency">EUR</span> <span class="price" style="opacity:0.5;">' + animal['price_exchange'] + '</span> <span class="currency" style="opacity:0.5;">' + animal['price_exchange_currency'] + '</span></span>';
                                        } else {
                                            price_show_elem = '<span class="shadow badge default price-currency"><span class="price">' + animal['price'] + '</span> <span class="currency">EUR</span></span>';
                                        }
                                    } else {
                                        // price_show_elem = '<span class="shadow badge default price-currency OMG"><span class="price" style="filter: blur(3px)">12 345</span> <span class="currency">EUR</span></span>';
                                        price_show_elem = '<span class="shadow badge default price-currency"><span class="price">' + animal['price'] + '</span> <span class="currency">EUR</span></span>';
                                    }
                                    // End Price Show

                                    // Start Rating
                                    let ratingOne;
                                    let ratingTwo;
                                    let ratingThree;
                                    let ratingFour;
                                    let ratingFive;
                                    let ratingCount;

                                    if (rating !== 0) {
                                        if (rating === 1) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartEmpty() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartEmpty() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartEmpty() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (rating >= 1.1 && rating <= 1.9) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartHalf() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartEmpty() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartEmpty() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (rating === 2.0) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartFull() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartEmpty() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartEmpty() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (rating >= 2.1 && rating <= 2.9) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartFull() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartHalf() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartEmpty() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (rating === 3.0) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartFull() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartFull() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartEmpty() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (rating >= 3.1 && rating <= 3.9) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartFull() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartFull() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartHalf() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (rating === 4.0) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartFull() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartFull() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartFull() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (rating >= 4.1 && rating <= 4.9) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartFull() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartFull() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartHalf() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (rating === 5.0) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartFull() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartFull() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartFull() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartFull() + '</div>';
                                        }
                                        ratingCount = '<div class="count">' + rating.toFixed(1) + '</div>'
                                    } else {
                                        ratingOne = '<div class="rating one">' + utility.heartEmpty() + '</div>';
                                        ratingTwo = '<div class="rating two">' + utility.heartEmpty() + '</div>';
                                        ratingThree = '<div class="rating three">' + utility.heartEmpty() + '</div>';
                                        ratingFour = '<div class="rating four">' + utility.heartEmpty() + '</div>';
                                        ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        ratingCount = ''
                                    }

                                    // End Rating

                                    $listAjaxWrap.append(
                                        '<div class="box ajax-box col-xxl-6 col-xl-6 col-lg-6 col-md-12 d-none index-list ' + animalsListRandomClass + '">' +
                                        '<div class="box-wrap">' +
                                        '<div class="box-img shadow" data-box-img-animal_id="' + animal['id'] + '">' +
                                        '<img class="img-fluid img-wrap" src="' + utility.getURL() + '/static/images/dummy/dummy.png">' +
                                        img_01_elem +
                                        img_02_elem +
                                        '<div style="display:none">' +
                                        img_03_elem +
                                        img_04_elem +
                                        img_05_elem +
                                        img_06_elem +
                                        img_07_elem +
                                        img_08_elem +
                                        img_09_elem +
                                        img_10_elem +
                                        '</div>' + // End img_03 - img_10
                                        '<div class="box-rating">' +
                                        ratingOne +
                                        ratingTwo +
                                        ratingThree +
                                        ratingFour +
                                        ratingFive +
                                        ratingCount +
                                        '</div>' + // End box-rating
                                        '<div class="box-eye">' +
                                        '<div class="eye"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="#ffffff" class="bi bi-eye-fill" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg></div>' +
                                        '<div class="count">2.6k</div>' +
                                        '</div>' +  // End .box-eye
                                        '<a href="' + utility.getURL() + '/' + category['name_en_slug'] + '/' + subcategory['name_en_slug'] + '/' + animal['page_url'] + '/' + animal['id'] + '" target="_blank" class="full-data-sheet-link">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16"><path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/></svg>' +
                                        '</a>' + // End .full-data-sheet-link
                                        '<div class="box-time">' +
                                        '<div class="count">1 nap, 2 óra, 33 per, 24 másodperc múlva vége</div>' +
                                        '</div>' + // End .box-time
                                        '</div>' + // End .box-img
                                        '<div class="box-data">' +
                                        '<span class="shadow badge name">' + animal['name'] + '</span>' +
                                        '<span class="plus">' +
                                        price_show_elem +
                                        '<span class="shadow badge plus-icon"><svg width="16" height="16" viewBox="0 0 752 752" xmlns="http://www.w3.org/2000/svg"><defs><clipPath class="p"><path d="m139.21 139.21h473.58v473.58h-473.58z"/></clipPath></defs><g clip-path="url(.p)"><path d="m318.6 139.21h114.8v179.39h179.39v114.8h-179.39v179.39h-114.8v-179.39h-179.39v-114.8h179.39z" fill-rule="evenodd"/></g></svg></span>' +
                                        '</span>' + // End .plus
                                        '<div class="badge-group inactive">' +
                                        price_show_elem +
                                        '<span class="shadow badge default">' + category_name + '</span>' +
                                        '<span class="shadow badge default">' + subcategory_name + '</span>' +
                                        '<span class="shadow badge default">' + years_elem + months_elem + days_elem + '</span>' +
                                        '<span class="shadow badge default">' + color_name + '</span>' +
                                        '<span class="shadow badge default">' + gender_name + '</span>' +
                                        '<span class="shadow badge default"><span>' + animal['height'] + '</span> <span data-i18n="anlihouse-A283"></span></span>' +
                                        '<span class="shadow badge default">' + be_used_for + '</span>' +
                                        '<span class="country-origin-residence-elem">' +
                                        '<span class="shadow badge default country-origin-residence">' + ' ~ ' + country_residence + '</span>' +
                                        '</span>' + // End .country-origin-residence-elem
                                        video_01_elem +
                                        '<span class="shadow badge default"><span>' + img_count + '</span> <span data-i18n="anlihouse-A284"></span></span>' +
                                        x_ray +
                                        url_01 +
                                        url_02 +
                                        '<span class="shadow badge minus-icon"><svg width="16" height="716" viewBox="0 0 752 752" xmlns="http://www.w3.org/2000/svg"><path d="m538.79 376c0 32.695-32.695 59.199-59.199 59.199h-207.19c-32.695 0-59.199-26.504-59.199-59.199s32.695-59.199 59.199-59.199h207.19c32.695 0 59.199 26.504 59.199 59.199z"/></svg></span>' +
                                        '</div>' + // End .badge-group
                                        '</div>' + // End .box-data
                                        '</div>' + // End .box-wrap
                                        '</div>' // End .box
                                    ).ready(function () {
                                        $('body').i18n();

                                        // Start Price
                                        let $priceCurrencyPrice = $listAjaxWrap.find(".price-currency .price");
                                        numbro.languageData().delimiters.thousands = " ";
                                        $priceCurrencyPrice.each(function () {
                                            let number = numbro($(this).text());
                                            $(this).text("");
                                            $(this).text(number.format({thousandSeparated: true, mantissa: 0}));
                                        });
                                        // End price

                                        setTimeout(
                                            function () {
                                                $listAjaxWrap.find(".box.ajax-box").removeClass("d-none");

                                                // Start List Ajax pagination Button
                                                _this.removeClass("pointer-events-none");

                                                $listPagination.attr("data-page_number", dataPageNumber + 1);
                                                if (dataPageNumber === dataPaginationLast - 1) {
                                                    $listAjaxPaginationBtn.hide();
                                                }
                                                // End List Ajax pagination Button

                                                $spinnerGrow.removeClass("active").addClass("inactive");

                                            }, 200);

                                        // Start Adverisement - API GetFilterData animals_limit -1
                                        if (i === 4) {
                                            if ($("#content #list .row .box.ajax-box").hasClass(animalsListRandomClass)) {
                                                numbro.languageData().delimiters.thousands = " ";
                                                let anliShopData;
                                                let lang = cookies.abBrowserLang;
                                                let id;
                                                let anli_id;
                                                let name_hu;
                                                let name_en;
                                                let name_de;
                                                let name_fr;
                                                let name_es;
                                                let name;
                                                let img_1;
                                                let img1;
                                                let img_2;
                                                let img2;
                                                let img_3;
                                                let img3;
                                                let img_4;
                                                let img4;
                                                let img_5;
                                                let img5;
                                                let img_6;
                                                let img6;
                                                let gross_price_huf;
                                                let gross_price_eur;
                                                let currency;
                                                let price;
                                                let url;

                                                // animalsListRandomClass :nth-child(4n)
                                                const $contentListRowBox = $("#content #list .row .box.index-list.ajax-box." + animalsListRandomClass + ":nth-child(5n)");
                                                $.each($contentListRowBox, function (index, elem) {
                                                    $(elem).addClass("elem-" + index)
                                                });

                                                let searchCategoryList = []
                                                const $searchCategory = $("#search #filter #category .badge-group .badge.elem.multiple.active");

                                                $.each($searchCategory, function (index, elem) {
                                                    searchCategoryList.push($(elem).attr("data-name"));
                                                });

                                                searchCategoryList = JSON.stringify(searchCategoryList)

                                                $.ajax({
                                                    type: "GET",
                                                    url: 'https://anlihouse.com/feed/breeders/product.json',
                                                    data: {"category": searchCategoryList},
                                                    beforeSend: function (xhr) {
                                                    },
                                                    success: function (result, status, xhr) {
                                                        anliShopData = result;
                                                    },
                                                    complete: function (xhr, status) {
                                                        let statusCode = xhr['status'];

                                                        if (statusCode === 200) {
                                                            $.each(anliShopData, function (index, value) {
                                                                id = value['id'];
                                                                anli_id = value['anli_id'];
                                                                name_hu = value['name_hu'];
                                                                name_en = value['name_en'];
                                                                name_de = value['name_de'];
                                                                name_fr = value['name_fr'];
                                                                name_es = value['name_es'];
                                                                img_1 = value['img_1'];
                                                                img_2 = value['img_2'];
                                                                img_3 = value['img_3'];
                                                                img_4 = value['img_4'];
                                                                img_5 = value['img_5'];
                                                                img_6 = value['img_6'];
                                                                gross_price_huf = value['gross_price_huf'];
                                                                gross_price_eur = value['gross_price_eur'];
                                                                url = value['url'];

                                                                if (lang === "hu") {
                                                                    name = name_hu;
                                                                    price = gross_price_huf;
                                                                    currency = "HUF";
                                                                } else if (lang === "en") {
                                                                    name = name_en;
                                                                    price = gross_price_eur;
                                                                    currency = "EUR";
                                                                } else if (lang === "de") {
                                                                    name = name_de;
                                                                    price = gross_price_eur;
                                                                    currency = "EUR";
                                                                } else if (lang === "fr") {
                                                                    name = name_fr;
                                                                    price = gross_price_eur;
                                                                    currency = "EUR";
                                                                } else if (lang === "es") {
                                                                    name = name_es;
                                                                    price = gross_price_eur;
                                                                    currency = "EUR";
                                                                } else {
                                                                    name = name_en;
                                                                    price = gross_price_eur;
                                                                    currency = "EUR";
                                                                }

                                                                price = numbro(price).format({
                                                                    thousandSeparated: true,
                                                                    mantissa: 0
                                                                });

                                                                if (img_1 !== "") {
                                                                    img1 = '<a class="shadow img-fluid" href="' + img_1 + '" data-fancybox="' + id + '" data-external_url="' + url + '">' +
                                                                        '<img class="shadow img-fluid img-first" src="' + img_1 + '">' +
                                                                        '</a>';
                                                                } else {
                                                                    img1 = "";
                                                                }

                                                                if (img_2 !== "") {
                                                                    img2 = '<a class="shadow img-fluid" href="' + img_2 + '" data-fancybox="' + id + '" data-external_url="' + url + '">' +
                                                                        '<img class="shadow img-fluid img-last" src="' + img_2 + '">' +
                                                                        '</a>';
                                                                } else {
                                                                    img2 = "";
                                                                }

                                                                if (img_3 !== "") {
                                                                    img3 = '<a class="shadow img-fluid" href="' + img_3 + '" data-fancybox="' + id + '" data-external_url="' + url + '">' +
                                                                        '<img class="shadow img-fluid img-last" src="' + img_3 + '">' +
                                                                        '</a>';
                                                                } else {
                                                                    img3 = "";
                                                                }

                                                                if (img_4 !== "") {
                                                                    img4 = '<a class="shadow img-fluid" href="' + img_4 + '" data-fancybox="' + id + '" data-external_url="' + url + '">' +
                                                                        '<img class="shadow img-fluid img-last" src="' + img_4 + '">' +
                                                                        '</a>';
                                                                } else {
                                                                    img4 = "";
                                                                }

                                                                if (img_5 !== "") {
                                                                    img5 = '<a class="shadow img-fluid" href="' + img_5 + '" data-fancybox="' + id + '" data-external_url="' + url + '">' +
                                                                        '<img class="shadow img-fluid img-last" src="' + img_5 + '">' +
                                                                        '</a>';
                                                                } else {
                                                                    img5 = "";
                                                                }

                                                                if (img_6 !== "") {
                                                                    img6 = '<a class="shadow img-fluid" href="' + img_6 + '" data-fancybox="' + id + '" data-external_url="' + url + '">' +
                                                                        '<img class="shadow img-fluid img-last" src="' + img_6 + '">' +
                                                                        '</a>';
                                                                } else {
                                                                    img6 = "";
                                                                }

                                                                $(
                                                                    '<div class="box col-xxl-6 col-xl-6 col-lg-6 col-md-12">' +
                                                                    '<div class="box-wrap">' +
                                                                    '<div class="box-img shadow" data-external_url="' + url + '">' +
                                                                    '<img class="img-fluid img-wrap" src="/static/images/dummy/dummy.png">' +
                                                                    img1 + // End First a
                                                                    img2 + // End Last a
                                                                    '<div style="display:none">' +
                                                                    img3 +
                                                                    img4 +
                                                                    img5 +
                                                                    img6 +
                                                                    '</div>' + // End display none
                                                                    '<a class="full-data-sheet-link" target="_blank" href="' + url + '">' +
                                                                    '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16"><path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/></svg>' +
                                                                    '</a>' + // End full-data-sheet-link
                                                                    '</div>' + // End box-img
                                                                    '<div class="box-data">' +
                                                                    '<span class="shadow badge name">' + name + '</span>' +
                                                                    '<span class="shadow badge default price-currency"><span class="price" style="">' + price + '</span> <span class="currency">' + currency + '</span></span>' +
                                                                    '</div>' + // End box-data
                                                                    '<div class="ribbon ribbon-top-right"><span>ANLI Shop</span></div>' +
                                                                    '</div>' + // End box-wrap
                                                                    '</div>' // End box
                                                                ).insertAfter($("#content #list .row .box.index-list.elem-" + index + "." + animalsListRandomClass)).ready(function () {
                                                                });

                                                            });
                                                        } else {
                                                        }
                                                    },
                                                    error: function (xhr, status, error) {
                                                    }
                                                });
                                            }
                                        }
                                        // End Advertisement
                                    });
                                }

                                // End List Ajax Wrap

                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                });
            },

            listRatingShow: function () {
                const $list = $("#list");
                const $listBoxRating = $list.find(".box-rating");
                const $listBoxRatingHeartOne = $listBoxRating.find(".rating.one");
                const $listBoxRatingHeartTwo = $listBoxRating.find(".rating.two");
                const $listBoxRatingHeartThree = $listBoxRating.find(".rating.three");
                const $listBoxRatingHeartFour = $listBoxRating.find(".rating.four");
                const $listBoxRatingHeartFive = $listBoxRating.find(".rating.five");
                const $listBoxRatingCount = $listBoxRating.find(".count");

                $listBoxRating.each(function () {
                    let rating = parseFloat($(this).attr("data-rating"));

                    if (rating !== 0) {
                        if (rating === 1.0) {
                            $(this).find($listBoxRatingHeartOne).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartTwo).html(utility.heartEmpty());
                            $(this).find($listBoxRatingHeartThree).html(utility.heartEmpty());
                            $(this).find($listBoxRatingHeartFour).html(utility.heartEmpty());
                            $(this).find($listBoxRatingHeartFive).html(utility.heartEmpty());
                        } else if (rating >= 1.1 && rating <= 1.9) {
                            $(this).find($listBoxRatingHeartOne).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartTwo).html(utility.heartHalf());
                            $(this).find($listBoxRatingHeartThree).html(utility.heartEmpty());
                            $(this).find($listBoxRatingHeartFour).html(utility.heartEmpty());
                            $(this).find($listBoxRatingHeartFive).html(utility.heartEmpty());
                        } else if (rating === 2.0) {
                            $(this).find($listBoxRatingHeartOne).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartTwo).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartThree).html(utility.heartEmpty());
                            $(this).find($listBoxRatingHeartFour).html(utility.heartEmpty());
                            $(this).find($listBoxRatingHeartFive).html(utility.heartEmpty());
                        } else if (rating >= 2.1 && rating <= 2.9) {
                            $(this).find($listBoxRatingHeartOne).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartTwo).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartThree).html(utility.heartHalf());
                            $(this).find($listBoxRatingHeartFour).html(utility.heartEmpty());
                            $(this).find($listBoxRatingHeartFive).html(utility.heartEmpty());
                        } else if (rating === 3.0) {
                            $(this).find($listBoxRatingHeartOne).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartTwo).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartThree).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartFour).html(utility.heartEmpty());
                            $(this).find($listBoxRatingHeartFive).html(utility.heartEmpty());
                        } else if (rating >= 3.1 && rating <= 3.9) {
                            $(this).find($listBoxRatingHeartOne).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartTwo).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartThree).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartFour).html(utility.heartHalf());
                            $(this).find($listBoxRatingHeartFive).html(utility.heartEmpty());
                        } else if (rating === 4.0) {
                            $(this).find($listBoxRatingHeartOne).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartTwo).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartThree).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartFour).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartFive).html(utility.heartEmpty());
                        } else if (rating >= 4.1 && rating <= 4.9) {
                            $(this).find($listBoxRatingHeartOne).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartTwo).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartThree).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartFour).html(utility.heartHalf());
                            $(this).find($listBoxRatingHeartFive).html(utility.heartEmpty());
                        } else if (rating === 5.0) {
                            $(this).find($listBoxRatingHeartOne).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartTwo).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartThree).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartFour).html(utility.heartFull());
                            $(this).find($listBoxRatingHeartFive).html(utility.heartFull());
                        }
                        $(this).find(".count").html(rating.toFixed(1));
                    }
                });
            },

            snap: function () {
                const $list = $("#list");
                const $snapWrap = $list.find("#snap-wrap");
                const $snapWrapRowRow = $snapWrap.find(".row");
                const $snapWrapRowBox = $snapWrap.find(".row .box");
                let coverImgHeight = $snapWrap.find(".row .box .cover-wrap .cover").height();
                const $snapAjaxPagination = $snapWrap.find("#snap-ajax-pagination");
                const $snapAjaxPaginationBtn = $snapAjaxPagination.find(".btn");
                const $spinnerGrow = $snapAjaxPaginationBtn.find(".spinner-grow");
                let snapAjaxPaginationPageNumber = $snapAjaxPagination.attr("data-page_number");
                let snapAjaxPaginationPaginationLast = $snapAjaxPagination.attr("data-pagination_last");

                $snapWrapRowBox.css({"height": coverImgHeight + "px"});

                $(window).resize(function () {
                    coverImgHeight = $snapWrap.find(".row .box .cover-wrap .cover").height();
                    $snapWrapRowBox.css({"height": coverImgHeight + "px"});
                });

                if (snapAjaxPaginationPageNumber === snapAjaxPaginationPaginationLast) {
                    $snapAjaxPagination.hide()
                }

                // Start Price
                $.each($snapWrapRowBox, function () {
                    let euroPrice = $(this).find(".action-wrap .action-five .eur .price").attr("data-animal_price");
                    euroPrice = parseInt(euroPrice);
                    let euroToCurrencyPrice = $(this).find(".action-wrap .action-five .eur-to-currency .price").attr("data-animal_price_exchange");
                    euroToCurrencyPrice = parseInt(euroToCurrencyPrice);

                    numbro.languageData().delimiters.thousands = " ";

                    $(this).find(".action-wrap .action-five .eur .price").text(numbro(euroPrice).format({
                        thousandSeparated: true,
                        mantissa: 0
                    }));
                    $(this).find(".action-wrap .action-five .eur-to-currency .price").text(numbro(euroToCurrencyPrice).format({
                        thousandSeparated: true,
                        mantissa: 0
                    }));

                });

                // End Price

                // Start Snap Scroll
                function snapScrollRun() {
                    gsap.registerPlugin(ScrollTrigger);
                    gsap.registerPlugin(ScrollToPlugin);

                    gsap.config({
                        nullTargetWarn: true,
                        trialWarn: true,
                    });

                    function goToSectionSkipForward(id) {
                        let sectionID = "#" + id;
                        gsap.to(document.body, {duration: 0.5, scrollTo: {y: sectionID, offsetY: 24, autoKill: false}});

                        let $videoControlWrapSkipForward = $("#list #snap-wrap #video-control-wrap #skip-forward");
                        $videoControlWrapSkipForward.removeClass('pointer-events-none');
                    }

                    function goToSectionSkipBackward(id) {
                        let sectionID = "#" + id;
                        gsap.to(document.body, {duration: 0.5, scrollTo: {y: sectionID, offsetY: 24, autoKill: false}});

                        let $videoControlWrapSkipBackward = $("#list #snap-wrap #video-control-wrap #skip-backward");
                        $videoControlWrapSkipBackward.removeClass('pointer-events-none');
                    }

                    const containers = gsap.utils.toArray("#snap-wrap .row .box");
                    containers.forEach(function (container, index) {
                        if (container.ST) {
                            container.ST.refresh();
                        } else {
                            container.ST = ScrollTrigger.create(
                                {
                                    trigger: container,
                                    start: "top center",
                                    end: "bottom center",
                                    toggleClass: "active",
                                    // markers: true,
                                    onEnter: (self) => {
                                        snapOnEnter(self)
                                    },
                                    onLeave: (self) => {
                                        snapOnLeave(self)
                                    },
                                    onEnterBack: (self) => {
                                        snapOnEnter(self)
                                    },
                                    onLeaveBack: (self) => {
                                        snapOnLeave(self)
                                    },
                                    onRefresh: (self) => {
                                        // console.log("onRefresh")
                                    },
                                    onUpdate: () => {
                                        // console.log("onUpdate")
                                    },
                                }
                            );
                        }
                    });

                    function snapOnEnter(self) {
                        let $elem;
                        let videoID;
                        let video;
                        let autoPlay;

                        let $videoControlWrap = $("#list #snap-wrap #video-control-wrap");
                        let $videoControlWrapSkipBackward = $("#list #snap-wrap #video-control-wrap #skip-backward");
                        let $videoControlWrapRewind = $("#list #snap-wrap #video-control-wrap #rewind");
                        let $videoControlWrapPlay = $("#list #snap-wrap #video-control-wrap #play");
                        let $videoControlWrapPause = $("#list #snap-wrap #video-control-wrap #pause");
                        let $videoControlWrapForward = $("#list #snap-wrap #video-control-wrap #forward");
                        let $videoControlWrapSkipForward = $("#list #snap-wrap #video-control-wrap #skip-forward");

                        let $allIsNotActiveBox = $("#snap-wrap .row .box").not(".active");
                        let $allIsNotActiveVideo = $allIsNotActiveBox.find(".cover-wrap .cover");

                        $elem = $("#" + self.trigger.id + ".box");
                        videoID = $elem.find(".cover-wrap .cover").attr("id");
                        video = document.getElementById(videoID);

                        let $loaderWrap = $elem.find(".cover-wrap .loader-wrap");

                        // Start Current Video
                        $loaderWrap.removeClass("closed").addClass("open");
                        try {
                            $elem.find(".cover-wrap .cover").get(0).load()

                            function loadedDataEvent(event) {
                                if (event.type === "loadeddata") {
                                    autoPlay = $elem.find(".cover-wrap .cover").get(0).play();
                                    if (autoPlay !== undefined) {
                                        autoPlay.then(_ => {
                                            $loaderWrap.removeClass("open").addClass("closed");
                                        }).catch(error => {
                                        });
                                    }
                                }
                            }

                            video.addEventListener('loadeddata', loadedDataEvent);
                        } catch (err) {
                            // pass
                        }
                        // End Current Video

                        // Start Video Control
                        $videoControlWrapPlay.addClass("d-none");
                        $videoControlWrapPause.removeClass("d-none");

                        if (videoID !== undefined) {
                            $videoControlWrap.removeClass("d-none");
                            $videoControlWrap.attr("data-video_id", videoID);

                            // Start Skip Backward
                            try {
                                $videoControlWrapSkipBackward.off("click");
                                $videoControlWrapSkipBackward.on("click", function (event) {
                                    event.stopPropagation();
                                    const _this = $(this);
                                    $videoControlWrapSkipBackward.addClass('pointer-events-none');

                                    try {
                                        goToSectionSkipBackward(self.trigger.previousElementSibling.id);
                                    } catch (err) {
                                        $videoControlWrapSkipBackward.removeClass('pointer-events-none');
                                    }
                                });
                            } catch (err) {
                                // pass
                            }
                            // End Skip Backward

                            // Start Rewind
                            try {
                                $videoControlWrapRewind.off("click");
                                $videoControlWrapRewind.on("click", function (event) {
                                    event.stopPropagation();
                                    const _this = $(this);
                                    let dataVideoID = _this.parent("#video-control-wrap").attr("data-video_id");

                                    let currentTime = $("#" + dataVideoID).get(0).currentTime;
                                    $("#" + dataVideoID).get(0).currentTime = currentTime - 10;
                                    $("#" + dataVideoID).get(0).play();

                                    $videoControlWrapPlay.addClass("d-none");
                                    $videoControlWrapPause.removeClass("d-none");
                                });
                            } catch (err) {
                                // pass
                            }
                            // End Rewind

                            // Start Play
                            try {
                                $videoControlWrapPlay.off("click");
                                $videoControlWrapPlay.on("click", function (event) {
                                    event.stopPropagation();
                                    const _this = $(this);
                                    let dataVideoID = _this.parent("#video-control-wrap").attr("data-video_id");
                                    $("#" + dataVideoID).get(0).play();
                                    _this.addClass("d-none");
                                    $videoControlWrapPause.removeClass("d-none");
                                });
                            } catch (err) {
                                // pass
                            }
                            // End Play

                            // Start Pause
                            try {
                                $videoControlWrapPause.off("click");
                                $videoControlWrapPause.on("click", function (event) {
                                    event.stopPropagation();
                                    const _this = $(this);
                                    let dataVideoID = _this.parent("#video-control-wrap").attr("data-video_id");
                                    $("#" + dataVideoID).get(0).pause();
                                    _this.addClass("d-none");
                                    $videoControlWrapPlay.removeClass("d-none");
                                });
                            } catch (err) {
                                // pass
                            }
                            // End Pause

                            // Start Forward
                            try {
                                $videoControlWrapForward.off("click");
                                $videoControlWrapForward.on("click", function (event) {
                                    event.stopPropagation();
                                    const _this = $(this);
                                    let dataVideoID = _this.parent("#video-control-wrap").attr("data-video_id");

                                    let currentTime = $("#" + dataVideoID).get(0).currentTime;
                                    $("#" + dataVideoID).get(0).currentTime = currentTime + 10;
                                    $("#" + dataVideoID).get(0).play();

                                    $videoControlWrapPlay.addClass("d-none");
                                    $videoControlWrapPause.removeClass("d-none");
                                });
                            } catch (err) {
                                // pass
                            }
                            // End Forward

                            // Start Skip Forward
                            try {
                                $videoControlWrapSkipForward.off("click");
                                $videoControlWrapSkipForward.on("click", function (event) {
                                    event.preventDefault();
                                    const _this = $(this);
                                    $videoControlWrapSkipForward.addClass('pointer-events-none');

                                    try {
                                        goToSectionSkipForward(self.trigger.nextElementSibling.id);
                                    } catch (err) {
                                        $videoControlWrapSkipForward.removeClass('pointer-events-none');
                                    }
                                });
                            } catch (err) {
                                // pass
                            }
                            // End Skip Forward

                            // Start Progress
                            $elem.find(".cover-wrap .video-progress").removeClass("opacity0");
                            try {
                                function progressEvent(event) {
                                    if (event.type === "timeupdate") {
                                        try {
                                            const bufferedDuration = video.duration;
                                            let bufferedPercent;
                                            if (bufferedDuration > 0) {
                                                for (let i = 0; i < video.buffered.length; i++) {
                                                    if (
                                                        video.buffered.start(video.buffered.length - 1 - i) <
                                                        video.currentTime
                                                    ) {
                                                        bufferedPercent = Math.ceil((video.buffered.end(video.buffered.length - 1 - i) * 100) / bufferedDuration)
                                                        $elem.find(".cover-wrap .video-progress .progress.buffer").attr("aria-valuenow", bufferedPercent);
                                                        $elem.find(".cover-wrap .video-progress .progress.buffer .progress-bar").css({"width": bufferedPercent + "%"});
                                                        break;
                                                    }
                                                }
                                            }
                                        } catch (err) {
                                        }
                                    }

                                    if (event.type === "timeupdate") {
                                        try {
                                            const timeDuration = video.duration;
                                            if (timeDuration > 0) {
                                                $elem.find(".cover-wrap .video-progress .progress.time").attr("aria-valuenow", video.currentTime / timeDuration * 100);
                                                $elem.find(".cover-wrap .video-progress .progress.time .progress-bar").css({"width": video.currentTime / timeDuration * 100 + "%"});
                                            }
                                        } catch (err) {
                                        }
                                    }
                                }

                                video.addEventListener('timeupdate', progressEvent);
                            } catch (err) {
                                // pass
                            }
                            // End Progress
                        } else {
                            $videoControlWrap.addClass("d-none");
                            $videoControlWrap.removeAttr("data-video_id");
                        }

                        // End Video Control

                        if (self.trigger.nextElementSibling === null) {
                            $snapAjaxPaginationBtn.trigger("click");
                            setTimeout(
                                function () {
                                    snapScrollRun()
                                }, 1000);
                        }

                        setTimeout(
                            function () {
                                // $allIsNotActiveVideo
                                $allIsNotActiveVideo.each(function () {
                                    $(this).get(0).pause();
                                    $(this).get(0).currentTime = 5;
                                });

                            }, 10);
                    }

                    function snapOnLeave(self) {
                        let $elem;
                        let videoID;
                        let video;
                        let autoPlay;

                        let $videoControlWrap = $("#list #snap-wrap #video-control-wrap");

                        $elem = $("#" + self.trigger.id + ".box");
                        videoID = $elem.find(".cover-wrap .cover").attr("id");
                        video = document.getElementById(videoID);

                        $elem.find(".cover-wrap .cover").get(0).pause();
                        $elem.find(".cover-wrap .cover").get(0).currentTime = 5;

                        $elem.find(".cover-wrap .video-progress").addClass("opacity0");

                        $videoControlWrap.addClass("d-none");
                        $videoControlWrap.attr("data-video_id", "");
                    }

                }

                if (!Formstone.isMobile) {
                    snapScrollRun()
                }

                function snapScrollMobileRun() {
                    const $snapWrap = $list.find("#snap-wrap");
                    const $snapAjaxPagination = $snapWrap.find("#snap-ajax-pagination");
                    const $snapAjaxPaginationBtn = $snapAjaxPagination.find(".btn");
                    const $spinnerGrow = $snapAjaxPaginationBtn.find(".spinner-grow");
                    let snapAjaxPaginationPageNumber = $snapAjaxPagination.attr("data-page_number");
                    let snapAjaxPaginationPaginationLast = $snapAjaxPagination.attr("data-pagination_last");

                    $snapAjaxPagination.removeClass("d-none");

                    $("#snap-wrap .row .box .cover-wrap .cover").off("click");
                    $("body").on("click", "#snap-wrap .row .box .cover-wrap .cover", function (event) {
                        event.stopPropagation();
                        const _this = $(this);

                        $("#snap-wrap .row .box .cover-wrap .cover").each(function (index, elem) {
                            $(this).get(0).pause();
                            $(this).get(0).currentTime = 5;
                            $(this).next(".video-progress").addClass("opacity0");
                            $(this).next().next(".loader-wrap").removeClass("open").addClass("closed");
                            // $(this).removeAttr("controls");
                        });

                        _this.addClass("playing");

                        // _this.attr("controls", "controls")
                        _this.get(0).load();
                        _this.get(0).play();

                        // Start Progress
                        let $elem = _this.next(".video-progress");
                        $elem.removeClass("opacity0");

                        let $loaderWrap = _this.next().next(".loader-wrap");
                        $loaderWrap.removeClass("closed").addClass("open");

                        setTimeout(
                            function () {

                                function progressEvent(event) {

                                    if (_this[0].played.length === 1) {
                                        $loaderWrap.removeClass("open").addClass("closed");
                                    }

                                    if (event.type === "timeupdate") {
                                        try {
                                            const bufferedDuration = _this[0].duration;

                                            let bufferedPercent;
                                            if (bufferedDuration > 0) {
                                                for (let i = 0; i < _this[0].buffered.length; i++) {
                                                    if (
                                                        _this[0].buffered.start(_this[0].buffered.length - 1 - i) <
                                                        _this[0].currentTime
                                                    ) {
                                                        bufferedPercent = Math.ceil((_this[0].buffered.end(_this[0].buffered.length - 1 - i) * 100) / bufferedDuration)
                                                        $elem.find(".progress.buffer").attr("aria-valuenow", bufferedPercent);
                                                        $elem.find(".progress.buffer .progress-bar").css({"width": bufferedPercent + "%"});
                                                        break;
                                                    }
                                                }
                                            }
                                        } catch (err) {
                                        }
                                    }

                                    if (event.type === "timeupdate") {
                                        try {
                                            const timeDuration = _this[0].duration;
                                            if (timeDuration > 0) {
                                                $loaderWrap.removeClass("open").addClass("closed");
                                                $elem.find(".progress.time").attr("aria-valuenow", _this[0].currentTime / timeDuration * 100);
                                                $elem.find(".progress.time .progress-bar").css({"width": _this[0].currentTime / timeDuration * 100 + "%"});
                                            }
                                        } catch (err) {
                                        }
                                    }
                                }

                                _this[0].addEventListener('timeupdate', progressEvent);

                            }, 10);
                        // End Progress
                    });

                    function IntersectionObserverRun() {
                        let callback = (entries, observer) => {
                            entries.forEach((entry, index) => {
                                if (entry.intersectionRatio !== 1) {
                                    $("#" + entry.target.id + " .cover-wrap .cover").each(function (index, elem) {
                                        $(this).removeClass("playing");
                                    });

                                    let $allNotPlayBoxElemVideo = $("#snap-wrap .row .box").not(".playing");
                                    let $allNotPlayElemVideo = $("#snap-wrap .row .box .cover-wrap .cover").not(".playing");

                                    $allNotPlayElemVideo.each(function (index, elem) {
                                        $(this).get(0).pause();
                                        $(this).get(0).currentTime = 5;
                                        $(this).removeAttr("controls");
                                    });
                                } else {
                                }
                            });
                        };

                        let options = {
                            root: null,
                            threshold: [0, 1],
                        }
                        let observer = new IntersectionObserver(callback, options);

                        for (const target of document.querySelectorAll('#snap-wrap .row .box')) {
                            observer.observe(target);
                        }
                    }

                    addEventListener('touchmove', (event) => { // touchmove or wheel for Desktop
                        IntersectionObserverRun()
                    });
                }

                if (Formstone.isMobile) {
                    snapScrollMobileRun()
                }

                // End Snap Scroll


                $snapAjaxPaginationBtn.on("click", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    snapAjaxPaginationPageNumber = $snapAjaxPagination.attr("data-page_number");
                    snapAjaxPaginationPageNumber = parseInt($snapAjaxPagination.attr("data-page_number"));
                    snapAjaxPaginationPaginationLast = parseInt($snapAjaxPagination.attr("data-pagination_last"));

                    if (snapAjaxPaginationPageNumber === snapAjaxPaginationPaginationLast) {
                        $snapAjaxPagination.hide()
                    }

                    let filterFormAjaxData = $("#filter-form").serializeObject();
                    filterFormAjaxData['dataPageNumber'] = snapAjaxPaginationPageNumber
                    filterFormAjaxData['dataPaginationLast'] = snapAjaxPaginationPaginationLast
                    filterFormAjaxData['snap'] = "True";
                    filterFormAjaxData = JSON.stringify(filterFormAjaxData);

                    function doesFileExist(urlToFile) {
                        let xhr = new XMLHttpRequest();
                        xhr.open('HEAD', urlToFile, false);
                        xhr.send();

                        if (xhr.status == "404") {
                            return false;
                        } else {
                            return true;
                        }
                    }

                    let filterFormData;
                    let filterFormEncode;
                    let browserLang;
                    let countries;
                    let price_show;
                    $.ajax({
                        type: "POST",
                        url: "/_list-ajax-pagination",
                        contentType: "application/json",
                        data: filterFormAjaxData,
                        beforeSend: function (xhr) {
                            _this.addClass("pointer-events-none");
                            $spinnerGrow.removeClass("inactive").addClass("active");
                        },
                        success: function (result, status, xhr) {
                            filterFormData = result['message']
                            filterFormEncode = result['encode']
                            browserLang = filterFormData['lang'];
                            countries = result['countries']['data'];
                            price_show = result['price_show']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let filterEncodeInputVal = $("#search #filterEncode").val();

                                let animalsList = filterFormData['animals_list'];

                                for (let i = 0; i < animalsList.length; i++) {
                                    let animal = animalsList[i]['animal'];
                                    let video = animalsList[i]['video'];
                                    let rating = parseFloat(animalsList[i]['rating']['rating']);

                                    // Start Video Cover
                                    let coverIMG = utility.getURL() + "/static/videos/animal/" + video['video_01_folder'] + "/cropped/video-cover.png";
                                    let coverVideo = utility.getURL() + "/static/videos/animal/" + video['video_01_folder'] + "/cropped/" + video['video_01_folder'] + ".mp4#t=05";
                                    // End Video Cover

                                    // Start Price
                                    let price = "";
                                    let price_exchange = "";
                                    let price_exchange_currency = "";
                                    numbro.languageData().delimiters.thousands = " ";
                                    price = parseInt(animal['price']);
                                    if (price_show === true) {
                                        if (animal['price_exchange_currency'] !== "EUR") {
                                            price_exchange = parseInt(animal['price_exchange']);
                                            price_exchange_currency = animal['price_exchange_currency'];

                                            price = numbro(price).format({thousandSeparated: true, mantissa: 0});
                                            price_exchange = numbro(price_exchange).format({
                                                thousandSeparated: true,
                                                mantissa: 0
                                            });
                                            price = '<span class="eur"><span class="price">' + price + '</span> <span class="currency">EUR</span></span>';
                                            price_exchange = '<span class="eur-to-currency"><span class="price">' + price_exchange + '</span> <span class="currency">' + price_exchange_currency + '</span></span>';
                                        } else {
                                            price_exchange = "";
                                            price_exchange_currency = "";
                                        }
                                    } else {
                                        /*
                                        price = numbro(12345).format({thousandSeparated: true, mantissa: 0});
                                        price_exchange = numbro(12345).format({
                                            thousandSeparated: true,
                                            mantissa: 0
                                        });
                                        price_exchange_currency = "USD";

                                        price = '<span class="eur"><span class="price" style="filter:blur(3px)">' + price + '</span> <span class="currency">EUR</span></span>';
                                        price_exchange = '<span class="eur-to-currency"><span class="price" style="filter:blur(3px)">' + price_exchange + '</span> <span class="currency">' + price_exchange_currency + '</span></span>';
                                         */
                                        price = numbro(price).format({thousandSeparated: true, mantissa: 0});
                                        price = '<span class="eur"><span class="price">' + price + '</span> <span class="currency">EUR</span></span>';
                                    }
                                    // End price

                                    $snapWrapRowRow.append(
                                        '<div id="snap-' + animalsList[i]['animal']['id'] + '" class="box col-12 infinite-item" data-section-name="' + animalsList[i]['animal']['id'] + '">' +
                                        '<div class="cover-wrap" style="background-image: url(' + coverIMG + ')">' +
                                        '<video id="cover-' + animalsList[i]['animal']['id'] + '" class="cover" width="100%" height="100%" preload="none" muted loop poster="' + coverIMG + '">' +
                                        '<source src="' + coverVideo + '" type="video/mp4">' +
                                        '</video>' + // End video
                                        '<div id="progress-' + animalsList[i]['animal']['id'] + '" class="video-progress opacity0">' +
                                        '<div class="progress buffer" role="progressbar" aria-label="" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"><div class="progress-bar" style="width: 0%"></div></div>' +
                                        '<div class="progress time" role="progressbar" aria-label="" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"><div class="progress-bar" style="width: 0%"></div></div>' +
                                        '</div>' + // End video-progress
                                        '<div class="loader-wrap closed">' +
                                        '<div class="loader"></div>' +
                                        '</div>' + // End loader-wrap
                                        '<a href="' + utility.getURL() + "/" + animalsList[i]['category']['name_en_slug'] + "/" + animalsList[i]['subcategory']['name_en_slug'] + "/" + animalsList[i]['animal']['page_url'] + "/" + animalsList[i]['animal']['id'] + '" class="data-link" target="_blank">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16"><path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"></svg>' +
                                        '</a>' + // End data-link
                                        '</div>' + // End cover-wrap
                                        '<div class="action-wrap">' +
                                        '<div class="action-one">' +
                                        '<div class="icon">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path></svg>' +
                                        '</div>' + // End icon
                                        '<div class="data">' +
                                        '<a target="_blank" href="' + utility.getURL() + '/list/' + animalsList[i]['snap']['snap_seller_last_name_slug'] + '/' + animalsList[i]['snap']['snap_seller_id'] + '">' + animalsList[i]['snap']['snap_seller_last_name'] + '</a>' +
                                        '</div>' + // End data
                                        '</div>' + // End action-one
                                        '<div class="action-two">' +
                                        '<div class="icon">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path></svg>' +
                                        '</div>' + // End icon
                                        '<div class="data">' +
                                        rating +
                                        '</div>' + // End data
                                        '</div>' + // End action-two
                                        '<div class="action-three">' +
                                        '<div class="icon">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/></svg>' +
                                        '</div>' + // End icon
                                        '<div class="data">' +
                                        animalsList[i]['questions']['questions_count'] +
                                        '</div>' + // End data
                                        '</div>' + // End action-three
                                        '<div class="action-four">' +
                                        '<div class="icon">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cup-hot-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6H.5ZM13 12.5a2.01 2.01 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5Z"/><path d="m4.4.8-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 3.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8Zm3 0-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 6.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8Zm3 0-.003.004-.014.019a4.077 4.077 0 0 0-.204.31 2.337 2.337 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.198 3.198 0 0 1-.202.388 5.385 5.385 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 9.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8Z"/></svg>' +
                                        '</div>' + // End icon
                                        '<div class="data">' +
                                        animalsList[i]['talking']['talking_count'] +
                                        '</div>' + // End data
                                        '</div>' + // End action-four
                                        '<div class="action-five">' +
                                        '<div class="icon">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-currency-exchange" viewBox="0 0 16 16"><path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z"/></svg>' +
                                        '</div>' + // End icon
                                        '<div class="data">' +
                                        price +
                                        price_exchange +
                                        '</div>' + // End data
                                        '</div>' + // End action-five
                                        '<div class="action-six">' +
                                        '<div class="icon link">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16"><path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/></svg>' +
                                        '</div>' + // End icon link
                                        '<div class="data">' +
                                        '<a href="' + utility.getURL() + "/" + animalsList[i]['category']['name_en_slug'] + "/" + animalsList[i]['subcategory']['name_en_slug'] + "/" + animalsList[i]['animal']['page_url'] + "/" + animalsList[i]['animal']['id'] + '" target="_blank" data-i18n="anlihouse-A305"></a>' +
                                        '</div>' + // End data
                                        '</div>' + // End action-six
                                        '</div>' + // End action-wrap
                                        '</div>' // End infinite-item
                                    ).ready(function () {
                                        $snapWrapRowRow.find(".box.infinite-item").css({"height": coverImgHeight + "px"});
                                        $(window).resize(function () {
                                            coverImgHeight = $snapWrap.find(".row .box .cover-wrap .cover").height();
                                            $snapWrapRowRow.find(".box.infinite-item").css({"height": coverImgHeight + "px"});
                                        });
                                        setTimeout(
                                            function () {
                                                $snapAjaxPagination.attr("data-page_number", snapAjaxPaginationPageNumber + 1);
                                                if (snapAjaxPaginationPageNumber === snapAjaxPaginationPaginationLast - 1) {
                                                    $snapAjaxPagination.hide()
                                                }
                                                _this.removeClass("pointer-events-none");
                                                $spinnerGrow.removeClass("active").addClass("inactive");
                                                // IntersectionObserverRun()
                                            }, 200);
                                        $('body').i18n();
                                    });
                                }
                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                });
            }

            ,

            initializ: function () {
                loadList.listGallery();
                loadList.listFullDataSheetLink();
                loadList.listPlusIcon();
                loadList.listDataFormatting();
                loadList.listAjaxPagination();
                loadList.listRatingShow();
                loadList.snap();
            }

        };

        $(function () {
                loadList.initializ()
            }
        )
        ;
    }
}

export let
    anlibreedersList = new AnlibreedersList();