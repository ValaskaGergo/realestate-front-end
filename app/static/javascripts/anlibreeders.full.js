import AnlibreedersUtility from './utilities/anlibreeders.utility'
import PDFObject from "pdfobject";
import autosize from "autosize/dist/autosize";
import {Fancybox, Carousel, Panzoom} from "@fancyapps/ui";
import numbro from "numbro";
import {cookies} from "brownies";
import shortAndSweet from "short-and-sweet/dist/short-and-sweet.min"

const utility = new AnlibreedersUtility();

class AnlibreedersFull {
    loadAnlibreedersFull() {
        const loadFull = {

            gallery: function () {
            },

            documents: function () {
                const $full = $("#full");
                const $accordionItemDocuments = $full.find(".accordion-item.documents");
                const $breedRegistry = $accordionItemDocuments.find(".breed-registry");
                const $breedRegistryData = $accordionItemDocuments.find(".breed-registry .data");
                const $xRay = $accordionItemDocuments.find(".x-ray");
                const $xRayData = $accordionItemDocuments.find(".x-ray .data");
                const $isPdfYes = $accordionItemDocuments.find(".is-pdf-yes");
                const $isPdfNo = $accordionItemDocuments.find(".is-pdf-no");

                const breedRegistryFolder = $breedRegistry.attr("data-breed_registry_folder");
                const breedRegistryFile = $breedRegistry.attr("data-breed_registry_file");

                const xRayFolder = $xRay.attr("data-x_ray_folder");
                const xRayFile = $xRay.attr("data-x_ray_file");

                const pdfOptions = {
                    height: "500px",
                    pdfOpenParams: {
                        pagemode: 'none'
                    }
                };

                if (PDFObject.supportsPDFs) {
                    $isPdfNo.hide();
                    $isPdfYes.show();


                    if ($breedRegistryData.length !== 0) {
                        PDFObject.embed("/static/pdf/animal/" + breedRegistryFolder + "/" + breedRegistryFile, $breedRegistryData, pdfOptions);
                    }

                    if ($xRayData.length !== 0) {
                        PDFObject.embed("/static/pdf/animal/" + xRayFolder + "/" + xRayFile, $xRayData, pdfOptions);
                    }
                } else {
                    $isPdfYes.hide();
                    $isPdfNo.show();
                }
            },

            familyTree: function () {

                function familyCenter() {
                    setTimeout(
                        function () {

                            try {
                                let containerMother = document.querySelector(".tf-mother-mobile-center");
                                let middleMother = containerMother.children[Math.floor((containerMother.children.length - 1) / 2)];
                                containerMother.scrollLeft = middleMother.offsetLeft + middleMother.offsetWidth / 2 - containerMother.offsetWidth / 2;

                                let containerFather = document.querySelector(".tf-father-mobile-center");
                                let middleFather = containerFather.children[Math.floor((containerFather.children.length - 1) / 2)];
                                containerFather.scrollLeft = middleFather.offsetLeft + middleFather.offsetWidth / 2 - containerFather.offsetWidth / 2;
                            } catch (err) {
                            }

                        }, 2000);
                }

                familyCenter();

                window.addEventListener('resize', function (event) {
                    familyCenter();
                }, true);

            },

            fullDescription: function () {
                const $full = $("#full");
                const $accordionItemDescription = $full.find(".accordion-item.description");
                const $accordionBodyDescription = $accordionItemDescription.find(".accordion-body");
                const $accordionBodyDescriptionText = $accordionBodyDescription.find(".text.full-description-translate");
                const $accordionBodyDescriptionTextClone = $accordionBodyDescriptionText.clone();
                const $accordionBodyDescriptionTruncateStringMore = $accordionItemDescription.find(".accordion-body .truncateStringMore");

                $accordionBodyDescriptionText.attr("data-not-truncute", $accordionBodyDescriptionTextClone.html());

                if (typeof $accordionBodyDescriptionText.html() === 'string') {
                    if ($accordionBodyDescriptionText.html().length > 256) {
                        $accordionBodyDescriptionText.html(utility.truncateStringMore($accordionBodyDescriptionText.html(), 256));
                        $accordionBodyDescriptionTruncateStringMore.removeClass("inactive").addClass("active");
                    }
                }

                $accordionBodyDescriptionTruncateStringMore.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $accordionBodyDescriptionTruncateStringMore.removeClass("active").addClass("inactive");

                    $accordionBodyDescriptionText.html($accordionBodyDescriptionText.attr("data-not-truncute"));
                });
            },

            fullGallery: function () {
                Fancybox.bind('[data-fancybox="fullPage"]', {});

                Fancybox.defaults.Hash = false;

                Fancybox.bind('[data-fancybox="fullPage"]', {
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
                        ready: (fancybox, slide) => {
                            // Fancybox.getInstance().jumpTo(0, {friction: 0});
                        },
                    },
                });
            },

            fullDataFormatting: function () {
                const $full = $("#full");

                // Start Price
                let $price = $full.find("#price");

                let $priceEurPrice = $price.find(".eur .price");
                let priceEurPrice = $priceEurPrice.text();
                let $priceEurCurrency = $price.find(".eur .currency");

                let $priceEurToCurrencyPrice = $price.find(".eur-to-currency .price");
                let $priceEurToCurrencyCurrency = $price.find(".eur-to-currency .currency");

                numbro.languageData().delimiters.thousands = " ";
                $priceEurPrice.text("");
                if (priceEurPrice !== undefined && priceEurPrice !== null && priceEurPrice !== "") {
                    $priceEurPrice.text(numbro(priceEurPrice).format({thousandSeparated: true, mantissa: 0}));
                }

                let dataCurrency = $price.attr("data-currency");
                let dataEur1ToNetCurrency = $price.attr("data-eur1_to_net_currency");

                if (dataCurrency !== "EUR") {
                    $priceEurToCurrencyCurrency.text(dataCurrency);

                    let currencyPrice = priceEurPrice * dataEur1ToNetCurrency;
                    if (Number.isNaN(currencyPrice)) {
                        // $priceEurToCurrencyPrice.text("12 345");
                    } else {
                        currencyPrice = Math.round(currencyPrice);
                        $priceEurToCurrencyPrice.text("");
                        $priceEurToCurrencyPrice.text(numbro(currencyPrice).format({
                            thousandSeparated: true,
                            mantissa: 0
                        }));
                    }
                }
                if (dataCurrency === "None") {
                    //$priceEurToCurrencyCurrency.text("USD");
                    $priceEurToCurrencyCurrency.text("");
                }
                // End Price

                // Start Family
                let $fullFamilyTfNc = $full.find(".tf-nc");

                $fullFamilyTfNc.each(function () {
                    if ($(this).attr("data-type") === "") {
                        $(this).find(".gender-icon").css({"opacity": "0.5"});
                        $(this).find(".gender-info").css({"opacity": "0.5"});
                        $(this).find(".name").css({"opacity": "0.5"});
                        $(this).find(".name").attr("data-i18n", "anlihouse-A304");
                    }
                });
                $('body').i18n();
                // End Family

                // Start Price Details
                let $priceDetails = $full.find("#price-details");

                let $priceEurPriceDetails = $priceDetails.find(".eur .price");
                let priceEurPriceDetails = $priceEurPriceDetails.text();
                let $priceEurCurrencyDetails = $priceDetails.find(".eur .currency");

                let $priceEurToCurrencyPriceDetails = $priceDetails.find(".eur-to-currency .price");
                let $priceEurToCurrencyCurrencyDetails = $priceDetails.find(".eur-to-currency .currency");

                numbro.languageData().delimiters.thousands = " ";
                $priceEurPriceDetails.text("");
                if (priceEurPriceDetails !== undefined && priceEurPriceDetails !== null && priceEurPriceDetails !== "") {
                    $priceEurPriceDetails.text(numbro(priceEurPriceDetails).format({
                        thousandSeparated: true,
                        mantissa: 0
                    }));
                }

                let dataCurrencyDetails = $priceDetails.attr("data-currency");
                let dataEur1ToNetCurrencyDetails = $priceDetails.attr("data-eur1_to_net_currency");

                if (dataCurrencyDetails !== "EUR") {
                    $priceEurToCurrencyCurrencyDetails.text(dataCurrencyDetails);

                    let currencyPriceDetails = priceEurPriceDetails * dataEur1ToNetCurrencyDetails;
                    if (Number.isNaN(currencyPriceDetails)) {
                        // $priceEurToCurrencyPriceDetails.text("12 345");
                    } else {
                        currencyPriceDetails = Math.round(currencyPriceDetails);
                        $priceEurToCurrencyPriceDetails.text("");
                        $priceEurToCurrencyPriceDetails.text(numbro(currencyPriceDetails).format({
                            thousandSeparated: true,
                            mantissa: 0
                        }));
                    }
                }
                if (dataCurrencyDetails === "None") {
                    //$priceEurToCurrencyCurrencyDetails.text("USD");
                    $priceEurToCurrencyCurrencyDetails.text("");
                }
                // End Price Details
            },

            ratingModal: function () {
                const $full = $("#full");
                const $addRatingBtn = $full.find(".add-rating-btn");

                $addRatingBtn.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#ratingModal').modal('show');
                });

                $("body").on("click", ".modal#ratingModal .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#ratingModal').modal('hide');
                });

                $("body").on("click", "#ratingModal #rating-select .rating", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataNum = _this.attr("data-num");
                    let dataAnimalId = _this.attr("data-animal_id");

                    function clearHeartColor() {
                        $("#ratingModal #rating-select .rating").each(function () {
                            $(this).removeClass("active");
                            $(this).html(utility.heartEmpty());
                        });
                    }

                    function oneHeartColor() {
                        $("#ratingModal #rating-select .rating.one").html(utility.heartFull());
                    }

                    function twoHeartColor() {
                        $("#ratingModal #rating-select .rating.two").html(utility.heartFull());
                    }

                    function threeHeartColor() {
                        $("#ratingModal #rating-select .rating.three").html(utility.heartFull());
                    }

                    function fourHeartColor() {
                        $("#ratingModal #rating-select .rating.four").html(utility.heartFull());
                    }

                    function fiveHeartColor() {
                        $("#ratingModal #rating-select .rating.five").html(utility.heartFull());
                    }

                    if (_this.hasClass("active")) {
                        clearHeartColor();
                        postRating(dataAnimalId, 0);
                        return false;
                    }

                    if (dataNum === "one") {
                        clearHeartColor();
                        oneHeartColor();
                        $("#ratingModal #rating-select .rating.one").addClass("active");
                        postRating(dataAnimalId, 1);
                    } else if (dataNum === "two") {
                        clearHeartColor();
                        oneHeartColor();
                        twoHeartColor();
                        $("#ratingModal #rating-select .rating.two").addClass("active");
                        postRating(dataAnimalId, 2);
                    } else if (dataNum === "three") {
                        clearHeartColor();
                        oneHeartColor();
                        twoHeartColor();
                        threeHeartColor();
                        $("#ratingModal #rating-select .rating.three").addClass("active");
                        postRating(dataAnimalId, 3);
                    } else if (dataNum === "four") {
                        clearHeartColor();
                        oneHeartColor();
                        twoHeartColor();
                        threeHeartColor();
                        fourHeartColor();
                        $("#ratingModal #rating-select .rating.four").addClass("active");
                        postRating(dataAnimalId, 4);
                    } else if (dataNum === "five") {
                        clearHeartColor();
                        oneHeartColor();
                        twoHeartColor();
                        threeHeartColor();
                        fourHeartColor();
                        fiveHeartColor();
                        $("#ratingModal #rating-select .rating.five").addClass("active");
                        postRating(dataAnimalId, 5);
                    }

                    // Start POST Rating Ajax
                    function postRating(animal_id, rating) {
                        let ratingData;
                        $.ajax({
                            type: "POST",
                            url: "/_post-rating",
                            contentType: "application/json",
                            data: JSON.stringify({"animal_id": animal_id, "rating": rating}),
                            beforeSend: function (xhr) {
                                //$("#ratingModal").addClass("filter-grayscale-100");
                                $("#post-loader").toggleClass("active inactive");
                                $("body").css({"overflow": "hidden"});
                                $("#ratingModal #rating-select .rating").addClass("pointer-events-none");
                            },
                            success: function (result, status, xhr) {
                                ratingData = result['message']
                            },
                            complete: function (xhr, status) {
                                setTimeout(
                                    function () {
                                        //$("#ratingModal").removeClass("filter-grayscale-100");
                                        $("#post-loader").toggleClass("inactive active");
                                        $("body").removeAttr("style");
                                        $("#ratingModal #rating-select .rating").removeClass("pointer-events-none");
                                    }, 1000);

                                let statusCode = xhr['status'];

                                if (statusCode === 200) {
                                    let rating = parseFloat(ratingData['rating']);
                                    let rating_count_all = ratingData['rating_count_all'];
                                    let rating_count_one = ratingData['rating_count_one'];
                                    let rating_count_one_percent = ratingData['rating_count_one_percent'];
                                    let rating_count_two = ratingData['rating_count_two'];
                                    let rating_count_two_percent = ratingData['rating_count_two_percent'];
                                    let rating_count_three = ratingData['rating_count_three'];
                                    let rating_count_three_percent = ratingData['rating_count_three_percent'];
                                    let rating_count_four = ratingData['rating_count_four'];
                                    let rating_count_four_percent = ratingData['rating_count_four_percent'];
                                    let rating_count_five = ratingData['rating_count_five'];
                                    let rating_count_five_percent = ratingData['rating_count_five_percent'];

                                    let $ratingHeart = $full.find("#rating-wrap #rating .heart");
                                    let $ratingBasedOnReviews = $full.find("#rating-wrap #rating .based-on-reviews");

                                    let $ratingStat = $full.find(".rating-stat");
                                    let $ratingStatFiveProgressBar = $ratingStat.find(".five .progress-bar");
                                    let $ratingStatFourProgressBar = $ratingStat.find(".four .progress-bar");
                                    let $ratingStatThreeProgressBar = $ratingStat.find(".three .progress-bar");
                                    let $ratingStatTwoProgressBar = $ratingStat.find(".two .progress-bar");
                                    let $ratingStatOneProgressBar = $ratingStat.find(".one .progress-bar");

                                    $ratingStatFiveProgressBar.css({"width": rating_count_five_percent + "%"}).attr({"aria-valuenow": rating_count_five_percent}).text(rating_count_five);
                                    $ratingStatFourProgressBar.css({"width": rating_count_four_percent + "%"}).attr({"aria-valuenow": rating_count_four_percent}).text(rating_count_four);
                                    $ratingStatThreeProgressBar.css({"width": rating_count_three_percent + "%"}).attr({"aria-valuenow": rating_count_three_percent}).text(rating_count_three);
                                    $ratingStatTwoProgressBar.css({"width": rating_count_two_percent + "%"}).attr({"aria-valuenow": rating_count_two_percent}).text(rating_count_two);
                                    $ratingStatOneProgressBar.css({"width": rating_count_one_percent + "%"}).attr({"aria-valuenow": rating_count_one_percent}).text(rating_count_one);

                                    let $fullLeftRating = $full.find(".full-left-rating");

                                    if (rating === 0) {
                                        $ratingHeart.find(".rating.one").html(utility.heartEmpty());
                                        $ratingHeart.find(".rating.two").html(utility.heartEmpty());
                                        $ratingHeart.find(".rating.three").html(utility.heartEmpty());
                                        $ratingHeart.find(".rating.four").html(utility.heartEmpty());
                                        $ratingHeart.find(".rating.five").html(utility.heartEmpty());

                                        $fullLeftRating.find(".rating.one").html(utility.heartEmpty());
                                        $fullLeftRating.find(".rating.two").html(utility.heartEmpty());
                                        $fullLeftRating.find(".rating.three").html(utility.heartEmpty());
                                        $fullLeftRating.find(".rating.four").html(utility.heartEmpty());
                                        $fullLeftRating.find(".rating.five").html(utility.heartEmpty());
                                    } else if (rating === 1) {
                                        $ratingHeart.find(".rating.one").html(utility.heartFull());
                                        $ratingHeart.find(".rating.two").html(utility.heartEmpty());
                                        $ratingHeart.find(".rating.three").html(utility.heartEmpty());
                                        $ratingHeart.find(".rating.four").html(utility.heartEmpty());
                                        $ratingHeart.find(".rating.five").html(utility.heartEmpty());

                                        $fullLeftRating.find(".rating.one").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.two").html(utility.heartEmpty());
                                        $fullLeftRating.find(".rating.three").html(utility.heartEmpty());
                                        $fullLeftRating.find(".rating.four").html(utility.heartEmpty());
                                        $fullLeftRating.find(".rating.five").html(utility.heartEmpty());
                                    } else if (rating >= 1.1 && rating <= 1.9) {
                                        $ratingHeart.find(".rating.one").html(utility.heartFull());
                                        $ratingHeart.find(".rating.two").html(utility.heartHalf());
                                        $ratingHeart.find(".rating.three").html(utility.heartEmpty());
                                        $ratingHeart.find(".rating.four").html(utility.heartEmpty());
                                        $ratingHeart.find(".rating.five").html(utility.heartEmpty());

                                        $fullLeftRating.find(".rating.one").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.two").html(utility.heartHalf());
                                        $fullLeftRating.find(".rating.three").html(utility.heartEmpty());
                                        $fullLeftRating.find(".rating.four").html(utility.heartEmpty());
                                        $fullLeftRating.find(".rating.five").html(utility.heartEmpty());
                                    } else if (rating === 2.0) {
                                        $ratingHeart.find(".rating.one").html(utility.heartFull());
                                        $ratingHeart.find(".rating.two").html(utility.heartFull());
                                        $ratingHeart.find(".rating.three").html(utility.heartEmpty());
                                        $ratingHeart.find(".rating.four").html(utility.heartEmpty());
                                        $ratingHeart.find(".rating.five").html(utility.heartEmpty());

                                        $fullLeftRating.find(".rating.one").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.two").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.three").html(utility.heartEmpty());
                                        $fullLeftRating.find(".rating.four").html(utility.heartEmpty());
                                        $fullLeftRating.find(".rating.five").html(utility.heartEmpty());
                                    } else if (rating >= 2.1 && rating <= 2.9) {
                                        $ratingHeart.find(".rating.one").html(utility.heartFull());
                                        $ratingHeart.find(".rating.two").html(utility.heartFull());
                                        $ratingHeart.find(".rating.three").html(utility.heartHalf());
                                        $ratingHeart.find(".rating.four").html(utility.heartEmpty());
                                        $ratingHeart.find(".rating.five").html(utility.heartEmpty());

                                        $fullLeftRating.find(".rating.one").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.two").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.three").html(utility.heartHalf());
                                        $fullLeftRating.find(".rating.four").html(utility.heartEmpty());
                                        $fullLeftRating.find(".rating.five").html(utility.heartEmpty());
                                    } else if (rating === 3.0) {
                                        $ratingHeart.find(".rating.one").html(utility.heartFull());
                                        $ratingHeart.find(".rating.two").html(utility.heartFull());
                                        $ratingHeart.find(".rating.three").html(utility.heartFull());
                                        $ratingHeart.find(".rating.four").html(utility.heartEmpty());
                                        $ratingHeart.find(".rating.five").html(utility.heartEmpty());

                                        $fullLeftRating.find(".rating.one").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.two").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.three").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.four").html(utility.heartEmpty());
                                        $fullLeftRating.find(".rating.five").html(utility.heartEmpty());
                                    } else if (rating >= 3.1 && rating <= 3.9) {
                                        $ratingHeart.find(".rating.one").html(utility.heartFull());
                                        $ratingHeart.find(".rating.two").html(utility.heartFull());
                                        $ratingHeart.find(".rating.three").html(utility.heartFull());
                                        $ratingHeart.find(".rating.four").html(utility.heartHalf());
                                        $ratingHeart.find(".rating.five").html(utility.heartEmpty());

                                        $fullLeftRating.find(".rating.one").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.two").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.three").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.four").html(utility.heartHalf());
                                        $fullLeftRating.find(".rating.five").html(utility.heartEmpty());
                                    } else if (rating === 4.0) {
                                        $ratingHeart.find(".rating.one").html(utility.heartFull());
                                        $ratingHeart.find(".rating.two").html(utility.heartFull());
                                        $ratingHeart.find(".rating.three").html(utility.heartFull());
                                        $ratingHeart.find(".rating.four").html(utility.heartFull());
                                        $ratingHeart.find(".rating.five").html(utility.heartEmpty());

                                        $fullLeftRating.find(".rating.one").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.two").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.three").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.four").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.five").html(utility.heartEmpty());
                                    } else if (rating >= 4.1 && rating <= 4.9) {
                                        $ratingHeart.find(".rating.one").html(utility.heartFull());
                                        $ratingHeart.find(".rating.two").html(utility.heartFull());
                                        $ratingHeart.find(".rating.three").html(utility.heartFull());
                                        $ratingHeart.find(".rating.four").html(utility.heartFull());
                                        $ratingHeart.find(".rating.five").html(utility.heartHalf());

                                        $fullLeftRating.find(".rating.one").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.two").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.three").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.four").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.five").html(utility.heartHalf());
                                    } else if (rating === 5.0) {
                                        $ratingHeart.find(".rating.one").html(utility.heartFull());
                                        $ratingHeart.find(".rating.two").html(utility.heartFull());
                                        $ratingHeart.find(".rating.three").html(utility.heartFull());
                                        $ratingHeart.find(".rating.four").html(utility.heartFull());
                                        $ratingHeart.find(".rating.five").html(utility.heartFull());

                                        $fullLeftRating.find(".rating.one").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.two").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.three").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.four").html(utility.heartFull());
                                        $fullLeftRating.find(".rating.five").html(utility.heartFull());
                                    }

                                    let $fullDataInfoBox = $("#full-data-info-box");
                                    let $fullDataInfoBoxReviewsCount = $fullDataInfoBox.find("#reviews .count");

                                    if (rating > 0) {
                                        $ratingHeart.find(".count").html(rating.toFixed(1));
                                        $fullLeftRating.find(".count").html(rating.toFixed(1));
                                        $fullDataInfoBoxReviewsCount.css({"margin-left": "7px"});
                                        $fullDataInfoBoxReviewsCount.html(rating);
                                    } else {
                                        $ratingHeart.find(".count").html("");
                                        $fullLeftRating.find(".count").html("");
                                        $fullDataInfoBoxReviewsCount.css({"margin-left": "0px"});
                                        $fullDataInfoBoxReviewsCount.html("");
                                    }

                                    $ratingBasedOnReviews.find(".reviews-count").attr("data-reviews-count", rating_count_all);
                                    $ratingBasedOnReviews.find(".reviews-count").text($.i18n("anlihouse-A319", rating_count_all));
                                    $('body').i18n();
                                } else {
                                }
                            },
                            error: function (xhr, status, error) {
                                setTimeout(
                                    function () {
                                        //$("#ratingModal").removeClass("filter-grayscale-100");
                                        $("#post-loader").toggleClass("inactive active");
                                        $("body").removeAttr("style");
                                        $("#ratingModal #rating-select .rating").removeClass("pointer-events-none");
                                    }, 1000);
                            }
                        });
                    }

                    // Stop POST Rating Ajax
                });
            },

            questionsAndAnswersRule: function () {
                const $full = $("#full");
                const $questionsAndAnswers = $full.find(".questions-and-answers");
                const $sendQuestionGuide = $questionsAndAnswers.find(".send-question-guide .text");

                $sendQuestionGuide.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#questionsAndAnswersRule').modal('show');
                });

                $("body").on("click", ".modal#questionsAndAnswersRule .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#questionsAndAnswersRule').modal('hide');
                });
            },

            question: function () {
                autosize($("#questions-and-answers .question-input-group .question-input"));

                const $full = $("#full");
                const $questionInputBtn = $full.find(".questions-and-answers .question-input-btn");
                let $questionInput = $full.find(".questions-and-answers .question-input");

                $questionInputBtn.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const animal_id = _this.attr("data-animal_id");
                    let $questionInputVal = $questionInput.val();

                    let questionCallback;
                    $.ajax({
                        type: "POST",
                        url: "/_post-question",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "animal_id": animal_id,
                            "question": $questionInputVal
                        }),
                        beforeSend: function (xhr) {
                            _this.addClass("pointer-events-none");
                        },
                        success: function (result, status, xhr) {
                            questionCallback = result['message']
                        },
                        complete: function (xhr, status) {
                            _this.removeClass("pointer-events-none");
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                $full.find(".questions-and-answers .question-error span").removeData("i18n");
                                $full.find(".questions-and-answers .question-error span").text("");
                                $full.find(".questions-and-answers .question-error").addClass("d-none");
                                $('body').i18n();
                                $questionInput.val("").css({"height": "auto"});

                                $("#questions-and-answers .question-counter").html("");
                                shortAndSweet("#questions-and-answers .question-input-group .question-input", {
                                    counterLabel: '{length}/{maxlength}',
                                    counterClassName: 'count',
                                    append: (el, counter) => {
                                        const count = document.querySelector('#questions-and-answers .question-counter');
                                        count.appendChild(counter);
                                    }
                                });

                                let set_animal_id = questionCallback['question_data']['animal_id'];
                                let set_created_at = questionCallback['question_data']['created_at'];
                                let set_id = questionCallback['question_data']['id'];
                                let set_question = questionCallback['question_data']['question'];
                                let set_question_detect_lang = questionCallback['question_data']['question_detect_lang'];
                                let set_sender_id = questionCallback['question_data']['sender_id'];
                                let set_sender_last_name = questionCallback['question_data']['sender_last_name'];
                                let questions_count = questionCallback['question_data']['questions_count'];

                                let $questionAjax = $full.find("#questions-and-answers .questions-wrap .question-ajax-wrap");

                                $questionAjax.append(
                                    '<div class="box box-ajax d-none">' +
                                    '<input class="form-control" id="questionId" name="question_id" readonly="" type="hidden" value="' + set_id + '">' +
                                    '<div class="box-wrap">' +
                                    '<div class="question">' +
                                    '<span class="before" data-i18n="anlihouse-A330"></span> ' +
                                    '<span class="after">' + set_question + '</span>' +
                                    '<span class="asked-by">' +
                                    '<span data-i18n="anlihouse-A332"></span> ' +
                                    '<span class="name" data-sender_id="' + set_sender_id + '" data-i18n="anlihouse-A337">' + set_sender_last_name + '</span>' +
                                    '<span class="time active" data-time-relative="' + set_created_at + '">' + utility.getDateTimeRelative(set_created_at) + '</span>' +
                                    '<span class="edit" data-question_id="' + set_id + '" data-question="' + set_question + '" data-i18n="anlihouse-A338"></span>' +
                                    '</span>' + // End .asked-by
                                    '</div>' + // End .question
                                    '<div class="input-group answer-input-group mt-3 send">' +
                                    '<textarea class="form-control answer-input question-id-input-' + set_id + '" type="text" rows="1" placeholder="" maxlength="512" data-counter-label=""></textarea>' +
                                    '<span class="answer-emoji-btn" style="display:none;"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-emoji-smile-fill" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/></svg></span>' +
                                    '<span class="answer-input-btn" data-question_id="' + set_id + '"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/></svg></span>' +
                                    '</div>' + // End .answer-input-group
                                    '<small class="text-danger input-error answer-error d-none" style=""><span data-i18n=""></span></small>' +
                                    '<small class="answer-counter question-id-elem-' + set_id + '" style="display:block;margin-left:1.5rem;"></small>' +
                                    '<div class="answer-wrap">' +
                                    '<div class="answer-ajax-wrap"></div>' +
                                    '</div>' + // End .answer-wrap
                                    '</div>' + // End .box-wrap
                                    '</div>' // End .box
                                ).ready(function () {
                                    $("#full .questions-and-answers .question-ajax-wrap .box-ajax .answer-input").prop("placeholder", $.i18n("anlihouse-A333"));
                                    $("#full .questions-and-answers .question-ajax-wrap .box-ajax .answer-input").attr("data-counter-label", $.i18n("anlihouse-A327"));

                                    $('body').i18n();

                                    $("#questions-and-answers .box-ajax").addClass("box-question-" + set_id);

                                    autosize($("#questions-and-answers .box-ajax .answer-input-group .answer-input"));

                                    shortAndSweet("#questions-and-answers .box-ajax .answer-input-group .answer-input", {
                                        counterLabel: '{length}/{maxlength}',
                                        counterClassName: 'count',
                                        append: (el, counter) => {
                                            const count = document.querySelector('#questions-and-answers .box-ajax .answer-counter');
                                            count.appendChild(counter);
                                        }
                                    });

                                    $("#questions-and-answers .questions-wrap .question-ajax-wrap .box").each(function () {
                                        $(this).css({
                                            "border-bottom": "1px solid rgba(255, 255, 255, 0.2)",
                                            "padding-bottom": "2.6rem"
                                        })
                                    });

                                    $("#questions-and-answers .questions-wrap .box.box-ajax").removeClass("d-none");
                                    $("#questions-and-answers .questions-wrap .question-ajax-wrap .box.box-ajax").removeClass("box-ajax");

                                    let $fullDataInfoBox = $("#full-data-info-box");
                                    let $fullDataInfoBoxQuestionCount = $fullDataInfoBox.find("#question .count");

                                    if (questions_count !== 0) {
                                        $fullDataInfoBoxQuestionCount.css({"margin-left": "7px"});
                                        $fullDataInfoBoxQuestionCount.html(questions_count);
                                    } else {
                                        $fullDataInfoBoxQuestionCount.css({"margin-left": "0px"});
                                        $fullDataInfoBoxQuestionCount.html("");
                                    }
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            _this.removeClass("pointer-events-none");
                            error = xhr['responseJSON']
                            if (error['message']['message']['question']) {
                                $full.find(".questions-and-answers .question-error span").removeData("i18n");
                                $full.find(".questions-and-answers .question-error span").text("");
                                $full.find(".questions-and-answers .question-error span").attr("data-i18n", error['message']['message']['question']);
                                $full.find(".questions-and-answers .question-error").removeClass("d-none");
                                $('body').i18n();
                            } else {
                                $full.find(".questions-and-answers .question-error span").removeData("i18n");
                                $full.find(".questions-and-answers .question-error span").text("");
                                $full.find(".questions-and-answers .question-error").addClass("d-none");
                                $('body').i18n();
                            }
                        }
                    });
                });

                $questionInput.on("keyup", function (event) {
                    event.stopPropagation();

                    $full.find(".questions-and-answers .question-error span").removeData("i18n");
                    $full.find(".questions-and-answers .question-error span").text("");
                    $full.find(".questions-and-answers .question-error").addClass("d-none");
                    $('body').i18n();
                });
            },

            answer: function () {
                autosize($("#questions-and-answers .answer-input-group .answer-input"));

                const $full = $("#full");
                const $answerInputBtn = $full.find(".questions-and-answers .answer-input-btn");

                $("body").on("click", "#full .questions-and-answers .answer-input-btn", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let question_id = _this.attr("data-question_id");
                    let $answerInput = _this.parent(".answer-input-group").find(".answer-input");
                    let $answerInputVal = $answerInput.val();

                    let answerCallback;
                    $.ajax({
                        type: "POST",
                        url: "/_post-answer",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "question_id": question_id,
                            "answer": $answerInputVal
                        }),
                        beforeSend: function (xhr) {
                            _this.addClass("pointer-events-none");
                        },
                        success: function (result, status, xhr) {
                            answerCallback = result['message']
                        },
                        complete: function (xhr, status) {
                            _this.removeClass("pointer-events-none");
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let set_animal_id = answerCallback['answer_data']['animal_id'];
                                let set_answer = answerCallback['answer_data']['answer'];
                                let set_created_at = answerCallback['answer_data']['created_at'];
                                let set_id = answerCallback['answer_data']['id'];
                                let set_question_detect_lang = answerCallback['answer_data']['question_detect_lang'];
                                let set_sender_id = answerCallback['answer_data']['sender_id'];
                                let set_sender_last_name = answerCallback['answer_data']['sender_last_name'];
                                let set_question_id = answerCallback['answer_data']['question_id'];

                                // let $answerAjax = $full.find("#questions-and-answers .answer-wrap .answer-ajax-wrap");
                                let $answerAjax = _this.parents(".box").find(".answer-wrap .answer-ajax-wrap");

                                $answerAjax.prepend(
                                    '<div class="answer answer-ajax d-none box-answer-' + set_id + '" style="margin-bottom:2.3rem;">' +
                                    '<span class="answer-by">' +
                                    '<span data-i18n="anlihouse-A336"></span> ' +
                                    '<span class="name" data-i18n="anlihouse-A337"></span>' +
                                    '<span class="time active" data-time-relative="' + set_created_at + '">' + utility.getDateTimeRelative(set_created_at) + '</span>' +
                                    '<span class="edit" data-answer_id="' + set_id + '" data-answer="' + set_answer + '" data-i18n="anlihouse-A338"></span>' +
                                    '</span>' + // End .answer-by
                                    '<span class="before" data-i18n="anlihouse-A331"></span> ' +
                                    '<span class="after">' + set_answer.replace(/\r?\n/g, '<br />') + '</span>' +
                                    '</div>' // End .answer
                                ).ready(function () {
                                    _this.parents(".box").find('.answer-counter.question-id-elem-' + set_question_id + " .count").text($.i18n("anlihouse-A341"));
                                    $('body').i18n();

                                    _this.parents(".box").css({"padding-bottom": "0"});
                                    _this.parents(".box").find(".answer-input-group .answer-input").val("").css({"height": "auto"});

                                    $("#questions-and-answers .answer-wrap .answer-ajax-wrap .answer.answer-ajax").removeClass("d-none answer-ajax");
                                });

                            }
                        },
                        error: function (xhr, status, error) {
                            _this.removeClass("pointer-events-none");
                            error = xhr['responseJSON']
                            if (error['message']['message']['answer']) {
                                _this.parent(".answer-input-group").next(".answer-error").find("span").removeData("i18n");
                                _this.parent(".answer-input-group").next(".answer-error").find("span").text("");
                                _this.parent(".answer-input-group").next(".answer-error").find("span").attr("data-i18n", error['message']['message']['answer']);
                                _this.parent(".answer-input-group").next(".answer-error").removeClass("d-none");
                                $('body').i18n();
                            } else {
                                _this.parent(".answer-input-group").next(".answer-error").find("span").removeData("i18n");
                                _this.parent(".answer-input-group").next(".answer-error").find("span").text("");
                                _this.parent(".answer-input-group").next(".answer-error").addClass("d-none");
                                $('body').i18n();
                            }
                        }
                    });
                });

                $("body").on("keyup", ".questions-and-answers .answer-input-group .answer-input", function (event) {
                    event.stopPropagation();

                    $full.find(".questions-and-answers .answer-error span").removeData("i18n");
                    $full.find(".questions-and-answers .answer-error span").text("");
                    $full.find(".questions-and-answers .answer-error").addClass("d-none");
                    $('body').i18n();
                });
            },

            questionAnswer: function () {
                const $full = $("#full");
                const $askedByTime = $full.find(".asked-by .time");
                const $answerByTime = $full.find(".answer-by .time");

                $("body").on("click", "#full .asked-by .time", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataTimeRelative = _this.attr("data-time-relative");

                    if (_this.hasClass("active")) {
                        _this.text(utility.getDateTimeLLLL(dataTimeRelative));
                        _this.removeClass("active");
                    } else {
                        _this.text(utility.getDateTimeRelative(dataTimeRelative));
                        _this.addClass("active");
                    }
                });

                $("body").on("click", "#full .answer-by .time", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataTimeRelative = _this.attr("data-time-relative");

                    if (_this.hasClass("active")) {
                        _this.text(utility.getDateTimeLLLL(dataTimeRelative));
                        _this.removeClass("active");
                    } else {
                        _this.text(utility.getDateTimeRelative(dataTimeRelative));
                        _this.addClass("active");
                    }
                });
            },

            editingQuestion: function () {
                const $full = $("#full");
                const $editingLink = $full.find(".asked-by .edit");

                const dataAnimalId = $full.find(".questions-and-answers .question-input-btn").attr("data-animal_id");

                $("body").on("click", "#full .asked-by .edit", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataQuestionId = _this.attr("data-question_id");
                    const dataQuestion = _this.attr("data-question");

                    $("#editingQuestion .question-edit-input-group .question-edit-input").val("");
                    $("#editingQuestion .question-edit-input-group .question-edit-input").val(dataQuestion);

                    $("#editingQuestion .question-edit-counter").html("");
                    shortAndSweet("#editingQuestion .question-edit-input-group .question-edit-input", {
                        counterLabel: '{length}/{maxlength}',
                        counterClassName: 'count',
                        append: (el, counter) => {
                            const count = document.querySelector('#editingQuestion .question-edit-counter');
                            count.appendChild(counter);
                        }
                    });

                    $("#editingQuestion #question-edit-form #questionEditId").val("");
                    autosize.destroy($("#editingQuestion .question-edit-input-group .question-edit-input"));


                    $("#editingQuestion #question-edit-form #questionEditId").val(dataQuestionId);
                    setTimeout(
                        function () {
                            autosize($("#editingQuestion .question-edit-input-group .question-edit-input"));
                        }, 500);

                    $(".modal#editingQuestion #delete-question-form-button").removeClass("btn-primary action").addClass("btn-danger").attr('disabled', false);
                    $(".modal#editingQuestion #delete-question-form-button .delete-lock").removeClass("inactive d-none").addClass("active");
                    $(".modal#editingQuestion #delete-question-form-button .delete-unlock").removeClass("active").addClass("inactive d-none");

                    $("#editingQuestion").find(".question-edit-error span").removeData("i18n");
                    $("#editingQuestion").find(".question-edit-error span").text("");
                    $("#editingQuestion").find(".question-edit-error").removeClass("d-none");
                    $("#editingQuestion").find(".form-alert-danger").addClass("d-none");

                    $('#editingQuestion').modal('show');

                });

                $("body").on("click", ".modal#editingQuestion .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#editingQuestion').modal('hide');
                });

                $("body").on("click", ".modal#editingQuestion #delete-question-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);
                    let $lock = _this.find(".delete-lock");
                    let $unlock = _this.find(".delete-unlock");

                    if ($unlock.hasClass("active")) {
                        let questionCallback;
                        $.ajax({
                            type: "POST",
                            url: "/_question-delete",
                            contentType: "application/json",
                            data: JSON.stringify($("#question-edit-form").serializeObject()),
                            beforeSend: function (xhr) {
                                _this.attr('disabled', true);
                                _this.addClass("action");
                                //$("#editingQuestion").addClass("filter-grayscale-100");
                                $("#post-loader").toggleClass("active inactive");
                                $("body").css({"overflow": "hidden"});
                            },
                            success: function (result, status, xhr) {
                                questionCallback = result['message']
                            },
                            complete: function (xhr, status) {
                                let statusCode = xhr['status'];

                                if (statusCode === 200) {
                                    let question_id = questionCallback['question_id'];
                                    let questions_count = questionCallback['questions_count'];
                                    setTimeout(
                                        function () {
                                            $("#questions-and-answers .box-question-" + question_id).detach();
                                            _this.attr('disabled', false);
                                            _this.removeClass("action");
                                            $("#editingQuestion").addClass("filter-grayscale-0");
                                            $('#editingQuestion').modal('hide');

                                            let $fullDataInfoBox = $("#full-data-info-box");
                                            let $fullDataInfoBoxQuestionCount = $fullDataInfoBox.find("#question .count");

                                            if (questions_count !== 0) {
                                                $fullDataInfoBoxQuestionCount.css({"margin-left": "7px"});
                                                $fullDataInfoBoxQuestionCount.html(questions_count);
                                            } else {
                                                $fullDataInfoBoxQuestionCount.css({"margin-left": "0px"});
                                                $fullDataInfoBoxQuestionCount.html("");
                                            }
                                        }, 1500);
                                }
                            },
                            error: function (xhr, status, error) {
                                $("#editingQuestion").addClass("filter-grayscale-0");
                            }
                        });
                    }

                    if ($lock.hasClass("active")) {
                        $lock.removeClass("active").addClass("inactive d-none");
                        $unlock.removeClass("inactive d-none").addClass("active");
                        _this.removeClass("btn-danger").addClass("btn-primary");
                    }
                });

                $("body").on("click", ".modal#editingQuestion #edit-question-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let questionCallback;
                    $.ajax({
                        type: "POST",
                        url: "/_question-edit",
                        contentType: "application/json",
                        data: JSON.stringify($("#question-edit-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("#editingQuestion").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            questionCallback = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let question_id = questionCallback['question_data']['id'];
                                setTimeout(
                                    function () {
                                        _this.attr('disabled', false);
                                        _this.removeClass("action");
                                        $("#post-loader").toggleClass("inactive active");
                                        $("body").removeAttr("style");
                                        $('#editingQuestion').modal('hide');

                                        $("#questions-and-answers .box-question-" + question_id).find(".question .after").text(questionCallback['question_data']['question']);
                                        $("#questions-and-answers .box-question-" + question_id).find(".asked-by .edit").attr("data-question", questionCallback['question_data']['question']);

                                    }, 1500);
                            } else if (statusCode === 201) {
                                _this.attr('disabled', false);
                                _this.removeClass("action");
                                $("#post-loader").toggleClass("inactive active");
                                $("body").removeAttr("style");
                                $('#editingQuestion').modal('hide');
                            }
                        },
                        error: function (xhr, status, error) {
                            _this.attr('disabled', false);
                            _this.removeClass("action");
                            $("#post-loader").toggleClass("inactive active");
                            $("body").removeAttr("style");

                            error = xhr['responseJSON']

                            if (error['message']['message']['question']) {
                                $("#editingQuestion").find(".question-edit-error span").removeData("i18n");
                                $("#editingQuestion").find(".question-edit-error span").text("");
                                $("#editingQuestion").find(".question-edit-error span").attr("data-i18n", error['message']['message']['question']);
                                $("#editingQuestion").find(".question-edit-error").removeClass("d-none");
                                $("#editingQuestion").find(".form-alert-danger").removeClass("d-none");
                                $('body').i18n();
                            } else {
                                $("#editingQuestion").find(".question-edit-error span").removeData("i18n");
                                $("#editingQuestion").find(".question-edit-error span").text("");
                                $("#editingQuestion").find(".question-edit-error").addClass("d-none");
                                $("#editingQuestion").find(".form-alert-danger").addClass("d-none");
                                $('body').i18n();
                            }
                        }
                    });
                });

                $("body").on("keyup", "#editingQuestion .question-edit-input-group .question-edit-input", function (event) {
                    event.stopPropagation();

                    $("#editingQuestion").find(".question-edit-error span").removeData("i18n");
                    $("#editingQuestion").find(".question-edit-error span").text("");
                    $("#editingQuestion").find(".question-edit-error").removeClass("d-none");
                    $("#editingQuestion").find(".form-alert-danger").addClass("d-none");
                });
            },

            questionHistory: function () {
                const $full = $("#full");

                $("body").on("click", ".questions-and-answers .question .asked-by .history", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataHistory = _this.attr("data-history");
                    dataHistory = dataHistory.replace(/'/g, '"');
                    dataHistory = JSON.parse(dataHistory);

                    const dataSenderName = _this.attr("data-sender_name");

                    $("#historyQuestion #question-history").html("");

                    for (let i = 0; i < dataHistory.length; i++) {
                        $("#historyQuestion #question-history").append(
                            '<figure>' +
                            '<blockquote class="blockquote">' +
                            '<p>' +
                            dataHistory[i]['question'] +
                            '</p>' +
                            '</blockquote>' +
                            '<figcaption class="blockquote-footer">' +
                            dataSenderName + ' <cite title="Source Title">' + utility.getDateTimeLLLL(dataHistory[i]['created_at']) + '</cite>' +
                            '</figcaption>' +
                            '</figure>'
                        ).ready(function () {
                            $('#historyQuestion').modal('show');
                        });
                    }
                });

                $("body").on("click", ".modal#historyQuestion .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#historyQuestion').modal('hide');
                });
            },

            editingAnswer: function () {
                const $full = $("#full");
                const $editingLink = $full.find(".answer-by .edit");

                const dataAnimalId = $full.find(".questions-and-answers .question-input-btn").attr("data-animal_id");

                $("body").on("click", "#full .answer-by .edit", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataAnswerId = _this.attr("data-answer_id");
                    const dataAnswer = _this.attr("data-answer");

                    $("#editingAnswer .answer-edit-input-group .answer-edit-input").val("");
                    $("#editingAnswer .answer-edit-input-group .answer-edit-input").val(dataAnswer.replace(/<br *\/?>/gi, '\n'));

                    $("#editingAnswer .answer-edit-counter").html("");
                    shortAndSweet("#editingAnswer .answer-edit-input-group .answer-edit-input", {
                        counterLabel: '{length}/{maxlength}',
                        counterClassName: 'count',
                        append: (el, counter) => {
                            const count = document.querySelector('#editingAnswer .answer-edit-counter');
                            count.appendChild(counter);
                        }
                    });

                    $("#editingAnswer #answer-edit-form #answerEditId").val("");
                    autosize.destroy($("#editingAnswer .answer-edit-input-group .answer-edit-input"));

                    $("#editingAnswer #answer-edit-form #answerEditId").val(dataAnswerId);
                    setTimeout(
                        function () {
                            autosize($("#editingAnswer .answer-edit-input-group .answer-edit-input"));
                        }, 500);

                    $(".modal#editingAnswer #delete-answer-form-button").removeClass("btn-primary action").addClass("btn-danger").attr('disabled', false);
                    $(".modal#editingAnswer #delete-answer-form-button .delete-lock").removeClass("inactive d-none").addClass("active");
                    $(".modal#editingAnswer #delete-answer-form-button .delete-unlock").removeClass("active").addClass("inactive d-none");

                    $("#editingAnswer").find(".answer-edit-error span").removeData("i18n");
                    $("#editingAnswer").find(".answer-edit-error span").text("");
                    $("#editingAnswer").find(".answer-edit-error").removeClass("d-none");
                    $("#editingAnswer").find(".form-alert-danger").addClass("d-none");

                    $('#editingAnswer').modal('show');
                });

                $("body").on("click", ".modal#editingAnswer .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#editingAnswer').modal('hide');
                });

                $("body").on("click", ".modal#editingAnswer #delete-answer-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);
                    let $lock = _this.find(".delete-lock");
                    let $unlock = _this.find(".delete-unlock");

                    if ($unlock.hasClass("active")) {
                        let answerCallback;
                        $.ajax({
                            type: "POST",
                            url: "/_answer-delete",
                            contentType: "application/json",
                            data: JSON.stringify($("#answer-edit-form").serializeObject()),
                            beforeSend: function (xhr) {
                                _this.attr('disabled', true);
                                _this.addClass("action");
                                //$("#editingAnswer").addClass("filter-grayscale-100");
                                $("#post-loader").toggleClass("active inactive");
                                $("body").css({"overflow": "hidden"});
                            },
                            success: function (result, status, xhr) {
                                answerCallback = result['message']
                            },
                            complete: function (xhr, status) {
                                let statusCode = xhr['status'];

                                if (statusCode === 200) {
                                    let answer_id = answerCallback['answer_id'];
                                    let question_id = answerCallback['question_id'];

                                    setTimeout(
                                        function () {
                                            $("#questions-and-answers .box-answer-" + answer_id).detach();

                                            let answerCount = 0;
                                            $("#questions-and-answers .answer-wrap .answer").each(function () {
                                                answerCount++;
                                            });
                                            if (answerCount === 0) $("#questions-and-answers .box.box-question-" + question_id).css({"padding-bottom": "2.6rem"});

                                            _this.attr('disabled', false);
                                            _this.removeClass("action");
                                            $("#post-loader").toggleClass("inactive active");
                                            $("body").removeAttr("style");
                                            $('#editingAnswer').modal('hide');
                                        }, 1500);
                                }
                            },
                            error: function (xhr, status, error) {
                                $("#post-loader").toggleClass("inactive active");
                                $("body").removeAttr("style");
                            }
                        });
                    }

                    if ($lock.hasClass("active")) {
                        $lock.removeClass("active").addClass("inactive d-none");
                        $unlock.removeClass("inactive d-none").addClass("active");
                        _this.removeClass("btn-danger").addClass("btn-primary");
                    }
                });

                $("body").on("click", ".modal#editingAnswer #edit-answer-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let answerCallback;
                    $.ajax({
                        type: "POST",
                        url: "/_answer-edit",
                        contentType: "application/json",
                        data: JSON.stringify($("#answer-edit-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("#editingAnswer").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            answerCallback = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let answer_id = answerCallback['answer_data']['id'];
                                setTimeout(
                                    function () {
                                        _this.attr('disabled', false);
                                        _this.removeClass("action");
                                        $("#post-loader").toggleClass("inactive active");
                                        $("body").removeAttr("style");
                                        $('#editingAnswer').modal('hide');

                                        $("#questions-and-answers .box-answer-" + answer_id).find(".after").text(answerCallback['answer_data']['answer']);
                                        $("#questions-and-answers .box-answer-" + answer_id).find(".answer-by .edit").attr("data-answer", answerCallback['answer_data']['answer']);

                                    }, 1500);
                            } else if (statusCode === 201) {
                                _this.attr('disabled', false);
                                _this.removeClass("action");
                                $("#post-loader").toggleClass("inactive active");
                                $("body").removeAttr("style");
                                $('#editingAnswer').modal('hide');
                            }
                        },
                        error: function (xhr, status, error) {
                            _this.attr('disabled', false);
                            _this.removeClass("action");
                            $("#post-loader").toggleClass("inactive active");
                            $("body").removeAttr("style");

                            error = xhr['responseJSON']

                            if (error['message']['message']['question']) {
                                $("#editingAnswer").find(".answer-edit-error span").removeData("i18n");
                                $("#editingAnswer").find(".answer-edit-error span").text("");
                                $("#editingAnswer").find(".answer-edit-error span").attr("data-i18n", error['message']['message']['answer']);
                                $("#editingAnswer").find(".answer-edit-error").removeClass("d-none");
                                $("#editingAnswer").find(".form-alert-danger").removeClass("d-none");
                                $('body').i18n();
                            } else {
                                $("#editingAnswer").find(".answer-edit-error span").removeData("i18n");
                                $("#editingAnswer").find(".answer-edit-error span").text("");
                                $("#editingAnswer").find(".answer-edit-error").addClass("d-none");
                                $("#editingAnswer").find(".form-alert-danger").addClass("d-none");
                                $('body').i18n();
                            }
                        }
                    });
                });


            },

            answerHistory: function () {
                const $full = $("#full");

                $("body").on("click", "#full .answer-by .history", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataHistory = _this.attr("data-history");
                    dataHistory = dataHistory.replace(/'/g, '"');
                    dataHistory = JSON.parse(dataHistory);

                    const dataSenderName = _this.attr("data-sender_name");

                    $("#historyAnswer #answer-history").html("");

                    for (let i = 0; i < dataHistory.length; i++) {
                        $("#historyAnswer #answer-history").append(
                            '<figure>' +
                            '<blockquote class="blockquote">' +
                            '<p>' +
                            dataHistory[i]['answer'] +
                            '</p>' +
                            '</blockquote>' +
                            '<figcaption class="blockquote-footer">' +
                            dataSenderName + ' <cite title="Source Title">' + utility.getDateTimeLLLL(dataHistory[i]['created_at']) + '</cite>' +
                            '</figcaption>' +
                            '</figure>'
                        ).ready(function () {
                            $('#historyAnswer').modal('show');
                        });
                    }
                });

                $("body").on("click", ".modal#historyQuestion .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#historyQuestion').modal('hide');
                });
            },

            fullDataInfoBox: function () {

                let dataAnimalId = $("#full-data-info-box").attr("data-animal_id");

                if (dataAnimalId !== undefined) {

                    let $fullDataInfoBox = $("#full-data-info-box");

                    let $fullDataInfoBoxReviewsCount = $fullDataInfoBox.find("#reviews .count");
                    let $fullDataInfoBoxQuestionCount = $fullDataInfoBox.find("#question .count");
                    let $fullDataInfoBoxTalkCount = $fullDataInfoBox.find("#talk .count");

                    let rating,
                        questions_count,
                        talking_count;

                    let fullDataInfoBox;
                    $.ajax({
                        type: "POST",
                        url: "/_full-data-info-box",
                        contentType: "application/json",
                        data: JSON.stringify({"animal_id": dataAnimalId}),
                        beforeSend: function (xhr) {
                        },
                        success: function (result, status, xhr) {
                            fullDataInfoBox = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                rating = fullDataInfoBox['rating'];
                                questions_count = fullDataInfoBox['questions_count'];
                                talking_count = fullDataInfoBox['talking_count'];
                            } else {
                                rating = 0;
                                questions_count = 0;
                                talking_count = 0;
                            }

                            if (rating !== 0) {
                                $fullDataInfoBoxReviewsCount.css({"margin-left": "7px"});
                                $fullDataInfoBoxReviewsCount.html(rating);
                            } else {
                                $fullDataInfoBoxReviewsCount.css({"margin-left": "0px"});
                                $fullDataInfoBoxReviewsCount.html("");
                            }

                            if (questions_count !== 0) {
                                $fullDataInfoBoxQuestionCount.css({"margin-left": "7px"});
                                $fullDataInfoBoxQuestionCount.html(questions_count);
                            } else {
                                $fullDataInfoBoxQuestionCount.css({"margin-left": "0px"});
                                $fullDataInfoBoxQuestionCount.html("");
                            }

                            if (talking_count !== 0) {
                                $fullDataInfoBoxTalkCount.css({"margin-left": "7px"});
                                $fullDataInfoBoxTalkCount.html(talking_count);
                            } else {
                                $fullDataInfoBoxTalkCount.css({"margin-left": "0px"});
                                $fullDataInfoBoxTalkCount.html("");
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                }

            },

            translate: function () {

                // Start Brief Description
                let $translateTextLinkBriefDescription = $("#full .translate .text-link[data-translate-text='brief-description-translate']");
                let $briefDescription = $("#full #brief-description.brief-description-translate");
                let $briefDescriptionData = $briefDescription.html();
                if ($briefDescriptionData !== undefined) {
                    $briefDescriptionData = $briefDescription.html().trim();
                }

                if (cookies.abBrowserLang !== $briefDescription.attr("data-brief_description_detect_lang")) {
                    $("#full .translate.brief-description-show").removeClass("inactive").addClass("active");
                } else {
                    $("#full .translate.brief-description-show").removeClass("active").addClass("inactive");
                }

                $translateTextLinkBriefDescription.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("source")) {
                        if ($translateTextLinkBriefDescription.attr("data-source") === "") {
                            $translateTextLinkBriefDescription.attr("data-source", $briefDescriptionData);
                        }
                        if ($translateTextLinkBriefDescription.attr("data-target") === "") {
                            let translateCallback;
                            $.ajax({
                                type: "POST",
                                url: "/_translate",
                                contentType: "application/json",
                                data: JSON.stringify({
                                        "source": cookies.abBrowserLang,
                                        "target": $briefDescription.attr("data-brief_description_detect_lang"),
                                        "sourceData": $briefDescriptionData,
                                        "translateType": "full",
                                        "translateTypeID": $briefDescription.attr("data-animal_id"),
                                        "translateTypeData": "briefDescription"
                                    }
                                ),
                                beforeSend: function (xhr) {
                                    _this.removeClass("pointer-events-auto").addClass("pointer-events-none");
                                },
                                success: function (result, status, xhr) {
                                    translateCallback = result['message']
                                },
                                complete: function (xhr, status) {
                                    let statusCode = xhr['status'];

                                    if (statusCode === 200) {
                                        let source_data = translateCallback['source_data'];
                                        let target_data = translateCallback['target_data'];

                                        $translateTextLinkBriefDescription.attr("data-target", target_data);
                                        $("#full .translate.brief-description-show .text").removeData("i18n");
                                        $("#full .translate.brief-description-show .text").text("");
                                        $("#full .translate.brief-description-show .text").attr("data-i18n", "anlihouse-A365");

                                        $("#full .translate.brief-description-show .text-link").removeData("i18n");
                                        $("#full .translate.brief-description-show .text-link").text("");
                                        $("#full .translate.brief-description-show .text-link").attr("data-i18n", "anlihouse-A366");

                                        $('body').i18n();

                                        $briefDescription.html(target_data);
                                        _this.toggleClass("source target");
                                    } else {
                                    }
                                    _this.removeClass("pointer-events-none").addClass("pointer-events-auto");
                                },
                                error: function (xhr, status, error) {
                                    _this.removeClass("pointer-events-none").addClass("pointer-events-auto");
                                }
                            });
                        } else {
                            $briefDescription.html($translateTextLinkBriefDescription.attr("data-target"));

                            $("#full .translate.brief-description-show .text").removeData("i18n");
                            $("#full .translate.brief-description-show .text").text("");
                            $("#full .translate.brief-description-show .text").attr("data-i18n", "anlihouse-A365");

                            $("#full .translate.brief-description-show .text-link").removeData("i18n");
                            $("#full .translate.brief-description-show .text-link").text("");
                            $("#full .translate.brief-description-show .text-link").attr("data-i18n", "anlihouse-A366");

                            $('body').i18n();

                            _this.toggleClass("source target");
                        }
                    } else if (_this.hasClass("target")) {
                        $briefDescription.html($translateTextLinkBriefDescription.attr("data-source"));

                        $("#full .translate.brief-description-show .text").removeData("i18n");
                        $("#full .translate.brief-description-show .text").text("");
                        $("#full .translate.brief-description-show .text").attr("data-i18n", "anlihouse-A363");

                        $("#full .translate.brief-description-show .text-link").removeData("i18n");
                        $("#full .translate.brief-description-show .text-link").text("");
                        $("#full .translate.brief-description-show .text-link").attr("data-i18n", "anlihouse-A364");

                        $('body').i18n();

                        _this.toggleClass("target source");
                    } else {
                    }
                });
                // End Brief Description

                // Start Description
                let $translateTextLinkFullDescription = $("#full .translate .text-link[data-translate-text='full-description-translate']");
                let $fullDescription = $("#full .text.full-description-translate");
                let $fullDescriptionData = $fullDescription.attr("data-not-truncute");
                try {
                    if (typeof $fullDescriptionData !== undefined || $fullDescriptionData !== "") {
                        $fullDescriptionData = $fullDescription.attr("data-not-truncute").trim();
                    }
                } catch (err) {
                }

                if (cookies.abBrowserLang !== $fullDescription.attr("data-description_detect_lang")) {
                    $("#full .translate.full-description-show").removeClass("inactive").addClass("active");
                } else {
                    $("#full .translate.full-description-show").removeClass("active").addClass("inactive");
                }

                $translateTextLinkFullDescription.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.hasClass("source")) {
                        if ($translateTextLinkFullDescription.attr("data-source") === "") {
                            $translateTextLinkFullDescription.attr("data-source", $fullDescriptionData);
                        }
                        if ($translateTextLinkFullDescription.attr("data-target") === "") {
                            let translateCallback;
                            $.ajax({
                                type: "POST",
                                url: "/_translate",
                                contentType: "application/json",
                                data: JSON.stringify({
                                        "source": cookies.abBrowserLang,
                                        "target": $fullDescription.attr("data-description_detect_lang"),
                                        "sourceData": $fullDescriptionData,
                                        "translateType": "full",
                                        "translateTypeID": $fullDescription.attr("data-animal_id"),
                                        "translateTypeData": "fullDescription"
                                    }
                                ),
                                beforeSend: function (xhr) {
                                    _this.removeClass("pointer-events-auto").addClass("pointer-events-none");
                                },
                                success: function (result, status, xhr) {
                                    translateCallback = result['message']
                                },
                                complete: function (xhr, status) {
                                    let statusCode = xhr['status'];

                                    if (statusCode === 200) {
                                        let source_data = translateCallback['source_data'];
                                        let target_data = translateCallback['target_data'];

                                        $translateTextLinkFullDescription.attr("data-target", target_data);
                                        $("#full .translate.full-description-show .text").removeData("i18n");
                                        $("#full .translate.full-description-show .text").text("");
                                        $("#full .translate.full-description-show .text").attr("data-i18n", "anlihouse-A365");

                                        $("#full .translate.full-description-show .text-link").removeData("i18n");
                                        $("#full .translate.full-description-show .text-link").text("");
                                        $("#full .translate.full-description-show .text-link").attr("data-i18n", "anlihouse-A366");

                                        $('body').i18n();

                                        $fullDescription.attr("data-not-truncute", target_data);
                                        $("#details-description .truncateStringMore").hide();

                                        $fullDescription.html(target_data);
                                        _this.toggleClass("source target");
                                    } else {
                                    }
                                    _this.removeClass("pointer-events-none").addClass("pointer-events-auto");
                                },
                                error: function (xhr, status, error) {
                                    _this.removeClass("pointer-events-none").addClass("pointer-events-auto");
                                }
                            });
                        } else {
                            $fullDescription.html($translateTextLinkFullDescription.attr("data-target"));

                            $("#full .translate.full-description-show .text").removeData("i18n");
                            $("#full .translate.full-description-show .text").text("");
                            $("#full .translate.full-description-show .text").attr("data-i18n", "anlihouse-A365");

                            $("#full .translate.full-description-show .text-link").removeData("i18n");
                            $("#full .translate.full-description-show .text-link").text("");
                            $("#full .translate.full-description-show .text-link").attr("data-i18n", "anlihouse-A366");

                            $('body').i18n();

                            _this.toggleClass("source target");
                        }
                    } else if (_this.hasClass("target")) {
                        $fullDescription.html($translateTextLinkFullDescription.attr("data-source"));

                        $("#full .translate.full-description-show .text").removeData("i18n");
                        $("#full .translate.full-description-show .text").text("");
                        $("#full .translate.full-description-show .text").attr("data-i18n", "anlihouse-A363");

                        $("#full .translate.full-description-show .text-link").removeData("i18n");
                        $("#full .translate.full-description-show .text-link").text("");
                        $("#full .translate.full-description-show .text-link").attr("data-i18n", "anlihouse-A364");

                        $('body').i18n();

                        _this.toggleClass("target source");
                    } else {
                    }
                });
                // End Description

                // Start Question
                $("#question-and-answer-form .translation[data-type='question']").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataQuestionId = _this.attr("data-question_id");
                    let $questionElem = $('.question .after[data-question_id=' + dataQuestionId + ']');
                    let questionElemData = $questionElem.html().trim();

                    if (_this.hasClass("inactive")) {
                        let translateCallback;
                        $.ajax({
                            type: "POST",
                            url: "/_translate",
                            contentType: "application/json",
                            data: JSON.stringify({
                                    "source": cookies.abBrowserLang,
                                    "target": $questionElem.attr("data-question_detect_lang"),
                                    "sourceData": questionElemData,
                                    "translateType": "full",
                                    "translateTypeID": $questionElem.attr("data-animal_id"),
                                    "translateTypeData": "question"
                                }
                            ),
                            beforeSend: function (xhr) {
                                _this.removeClass("pointer-events-auto").addClass("pointer-events-none");
                            },
                            success: function (result, status, xhr) {
                                translateCallback = result['message']
                            },
                            complete: function (xhr, status) {
                                let statusCode = xhr['status'];

                                if (statusCode === 200) {
                                    $questionElem.attr("data-source", translateCallback['source_data']);
                                    $questionElem.attr("data-target", translateCallback['target_data']);

                                    _this.removeData("i18n");
                                    _this.text("");
                                    _this.attr("data-i18n", "anlihouse-A366");

                                    $questionElem.html(translateCallback['target_data']);
                                } else {
                                }
                                _this.removeClass("pointer-events-none").addClass("pointer-events-auto");
                                _this.toggleClass("inactive active");
                                $('body').i18n();
                            },
                            error: function (xhr, status, error) {
                                _this.removeClass("pointer-events-none").addClass("pointer-events-auto");
                            }
                        });
                    } else if (_this.hasClass("active")) {
                        if ($questionElem.attr("data-source") !== "") {
                            _this.removeData("i18n");
                            _this.text("");
                            _this.attr("data-i18n", "anlihouse-A340");
                            $('body').i18n();

                            $questionElem.html($questionElem.attr("data-source"));
                        }
                        _this.toggleClass("active inactive");
                    } else {
                    }
                });
                // End Question

                // Start Question Answer
                $("#question-and-answer-form .translation[data-type='questionanswer']").on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataQuestionAnswerId = _this.attr("data-answer_id");
                    let $questionAnswerElem = $('.answer .after[data-answer_id=' + dataQuestionAnswerId + ']');
                    let questionAnswerElemData = $questionAnswerElem.html().trim();

                    if (_this.hasClass("inactive")) {
                        let translateCallback;
                        $.ajax({
                            type: "POST",
                            url: "/_translate",
                            contentType: "application/json",
                            data: JSON.stringify({
                                    "source": cookies.abBrowserLang,
                                    "target": $questionAnswerElem.attr("data-answer_detect_lang"),
                                    "sourceData": questionAnswerElemData,
                                    "translateType": "full",
                                    "translateTypeID": $questionAnswerElem.attr("data-animal_id"),
                                    "translateTypeData": "questionanswer"
                                }
                            ),
                            beforeSend: function (xhr) {
                                _this.removeClass("pointer-events-auto").addClass("pointer-events-none");
                            },
                            success: function (result, status, xhr) {
                                translateCallback = result['message']
                            },
                            complete: function (xhr, status) {
                                let statusCode = xhr['status'];

                                if (statusCode === 200) {
                                    $questionAnswerElem.attr("data-source", translateCallback['source_data']);
                                    $questionAnswerElem.attr("data-target", translateCallback['target_data']);

                                    _this.removeData("i18n");
                                    _this.text("");
                                    _this.attr("data-i18n", "anlihouse-A366");

                                    $questionAnswerElem.html(translateCallback['target_data']);
                                } else {
                                }
                                _this.removeClass("pointer-events-none").addClass("pointer-events-auto");
                                _this.toggleClass("inactive active");
                                $('body').i18n();
                            },
                            error: function (xhr, status, error) {
                                _this.removeClass("pointer-events-none").addClass("pointer-events-auto");
                            }
                        });
                    } else if (_this.hasClass("active")) {
                        if ($questionAnswerElem.attr("data-source") !== "") {
                            _this.removeData("i18n");
                            _this.text("");
                            _this.attr("data-i18n", "anlihouse-A340");
                            $('body').i18n();

                            $questionAnswerElem.html($questionAnswerElem.attr("data-source"));
                        }
                        _this.toggleClass("active inactive");
                    } else {
                    }
                });
                // End Question Answer
            },

            alike: function () {
                const $alike = $("#list.alike");
                if ($alike.hasClass("alike")) {
                    numbro.languageData().delimiters.thousands = " ";
                    const subcategoryIdData = $alike.attr("data-subcategory_id");
                    const animalIdData = $alike.attr("data-animal_id");

                    const $subcategoryName = $alike.find(".subcategoryName");

                    let alikeData;
                    $.ajax({
                        type: "POST",
                        url: "/_alike",
                        contentType: "application/json",
                        data: JSON.stringify({"subcategory_id": subcategoryIdData, "animal_id": animalIdData}),
                        beforeSend: function (xhr) {
                        },
                        success: function (result, status, xhr) {
                            alikeData = result['message']['animal']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (alikeData.length === 0) {
                                $("#list.alike").hide();
                            }
                            if (statusCode === 200 && alikeData.length !== 0) {
                                for (let i = 0; i < alikeData.length; i++) {
                                    let lang = alikeData[i]['lang']['lang'];
                                    //console.log(alikeData[i]['animal']['rating'])

                                    let animal = alikeData[i]['animal'];
                                    let photo = alikeData[i]['photo'];

                                    // Start Photo
                                    let img_count = 0;

                                    let img_01_elem = "";
                                    if (photo['img_01'] !== null) {
                                        img_count++;
                                        let img_01_folder = photo['img_01'].replace(".jpg", "");
                                        let img_01 = utility.getURL() + "/static/images/animal/" + img_01_folder + "/cropped/" + photo['img_01'];
                                        img_01_elem = '<a href="' + img_01 + '" data-fancybox="' + alikeData[i]['animal']['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + alikeData[i]['animal']['id'] + '">' +
                                            '<img class="shadow img-fluid img-first" src="' + img_01 + '">' +
                                            '</a>'
                                    }

                                    let img_02_elem = "";
                                    if (photo['img_02'] !== null) {
                                        img_count++;
                                        let img_02_folder = photo['img_02'].replace(".jpg", "");
                                        let img_02 = utility.getURL() + "/static/images/animal/" + img_02_folder + "/cropped/" + photo['img_02'];
                                        img_02_elem = '<a href="' + img_02 + '" data-fancybox="' + alikeData[i]['animal']['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + alikeData[i]['animal']['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_02 + '">' +
                                            '</a>'
                                    }

                                    let img_03_elem = "";
                                    if (photo['img_03'] !== null) {
                                        img_count++;
                                        let img_03_folder = photo['img_03'].replace(".jpg", "");
                                        let img_03 = utility.getURL() + "/static/images/animal/" + img_03_folder + "/cropped/" + photo['img_03'];
                                        img_03_elem = '<a href="' + img_03 + '" data-fancybox="' + alikeData[i]['animal']['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + alikeData[i]['animal']['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_03 + '">' +
                                            '</a>'
                                    }

                                    let img_04_elem = "";
                                    if (photo['img_04'] !== null) {
                                        img_count++;
                                        let img_04_folder = photo['img_04'].replace(".jpg", "");
                                        let img_04 = utility.getURL() + "/static/images/animal/" + img_04_folder + "/cropped/" + photo['img_04'];
                                        img_04_elem = '<a href="' + img_04 + '" data-fancybox="' + alikeData[i]['animal']['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + alikeData[i]['animal']['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_04 + '">' +
                                            '</a>'
                                    }

                                    let img_05_elem = "";
                                    if (photo['img_05'] !== null) {
                                        img_count++;
                                        let img_05_folder = photo['img_05'].replace(".jpg", "");
                                        let img_05 = utility.getURL() + "/static/images/animal/" + img_05_folder + "/cropped/" + photo['img_05'];
                                        img_05_elem = '<a href="' + img_05 + '" data-fancybox="' + alikeData[i]['animal']['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + alikeData[i]['animal']['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_05 + '">' +
                                            '</a>'
                                    }

                                    let img_06_elem = "";
                                    if (photo['img_06'] !== null) {
                                        img_count++;
                                        let img_06_folder = photo['img_06'].replace(".jpg", "");
                                        let img_06 = utility.getURL() + "/static/images/animal/" + img_06_folder + "/cropped/" + photo['img_06'];
                                        img_06_elem = '<a href="' + img_06 + '" data-fancybox="' + alikeData[i]['animal']['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + alikeData[i]['animal']['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_06 + '">' +
                                            '</a>'
                                    }

                                    let img_07_elem = "";
                                    if (photo['img_07'] !== null) {
                                        img_count++;
                                        let img_07_folder = photo['img_07'].replace(".jpg", "");
                                        let img_07 = utility.getURL() + "/static/images/animal/" + img_07_folder + "/cropped/" + photo['img_07'];
                                        img_07_elem = '<a href="' + img_07 + '" data-fancybox="' + alikeData[i]['animal']['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + alikeData[i]['animal']['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_07 + '">' +
                                            '</a>'
                                    }

                                    let img_08_elem = "";
                                    if (photo['img_08'] !== null) {
                                        img_count++;
                                        let img_08_folder = photo['img_08'].replace(".jpg", "");
                                        let img_08 = utility.getURL() + "/static/images/animal/" + img_08_folder + "/cropped/" + photo['img_08'];
                                        img_08_elem = '<a href="' + img_08 + '" data-fancybox="' + alikeData[i]['animal']['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + alikeData[i]['animal']['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_08 + '">' +
                                            '</a>'
                                    }

                                    let img_09_elem = "";
                                    if (photo['img_09'] !== null) {
                                        img_count++;
                                        let img_09_folder = photo['img_09'].replace(".jpg", "");
                                        let img_09 = utility.getURL() + "/static/images/animal/" + img_09_folder + "/cropped/" + photo['img_09'];
                                        img_09_elem = '<a href="' + img_09 + '" data-fancybox="' + alikeData[i]['animal']['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + alikeData[i]['animal']['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_09 + '">' +
                                            '</a>'
                                    }

                                    let img_10_elem = "";
                                    if (photo['img_10'] !== null) {
                                        img_count++;
                                        let img_10_folder = photo['img_10'].replace(".jpg", "");
                                        let img_10 = utility.getURL() + "/static/images/animal/" + img_10_folder + "/cropped/" + photo['img_10'];
                                        img_10_elem = '<a href="' + img_10 + '" data-fancybox="' + alikeData[i]['animal']['id'] + '" class="shadow img-fluid" data-box-img-animal_id="' + alikeData[i]['animal']['id'] + '">' +
                                            '<img class="shadow img-fluid img-last" src="' + img_10 + '">' +
                                            '</a>'
                                    }
                                    // End Photo

                                    // Start Rating
                                    let ratingOne;
                                    let ratingTwo;
                                    let ratingThree;
                                    let ratingFour;
                                    let ratingFive;
                                    let ratingCount;

                                    if (alikeData[i]['animal']['rating'] !== 0) {
                                        if (alikeData[i]['animal']['rating'] === 1) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartEmpty() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartEmpty() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartEmpty() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (alikeData[i]['animal']['rating'] >= 1.1 && alikeData[i]['animal']['rating'] <= 1.9) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartHalf() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartEmpty() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartEmpty() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (alikeData[i]['animal']['rating'] === 2.0) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartFull() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartEmpty() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartEmpty() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (alikeData[i]['animal']['rating'] >= 2.1 && alikeData[i]['animal']['rating'] <= 2.9) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartFull() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartHalf() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartEmpty() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (alikeData[i]['animal']['rating'] === 3.0) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartFull() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartFull() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartEmpty() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (alikeData[i]['animal']['rating'] >= 3.1 && alikeData[i]['animal']['rating'] <= 3.9) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartFull() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartFull() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartHalf() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (alikeData[i]['animal']['rating'] === 4.0) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartFull() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartFull() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartFull() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (alikeData[i]['animal']['rating'] >= 4.1 && alikeData[i]['animal']['rating'] <= 4.9) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartFull() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartFull() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartHalf() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        } else if (alikeData[i]['animal']['rating'] === 5.0) {
                                            ratingOne = '<div class="rating one">' + utility.heartFull() + '</div>';
                                            ratingTwo = '<div class="rating two">' + utility.heartFull() + '</div>';
                                            ratingThree = '<div class="rating three">' + utility.heartFull() + '</div>';
                                            ratingFour = '<div class="rating four">' + utility.heartFull() + '</div>';
                                            ratingFive = '<div class="rating five">' + utility.heartFull() + '</div>';
                                        }
                                        ratingCount = '<div class="count">' + alikeData[i]['animal']['rating'].toFixed(1) + '</div>'
                                    } else {
                                        ratingOne = '<div class="rating one">' + utility.heartEmpty() + '</div>';
                                        ratingTwo = '<div class="rating two">' + utility.heartEmpty() + '</div>';
                                        ratingThree = '<div class="rating three">' + utility.heartEmpty() + '</div>';
                                        ratingFour = '<div class="rating four">' + utility.heartEmpty() + '</div>';
                                        ratingFive = '<div class="rating five">' + utility.heartEmpty() + '</div>';
                                        ratingCount = ''
                                    }

                                    // End Rating

                                    // Start Price Show
                                    let price_eur_show_elem = "";
                                    let price_show_elem = "";
                                    if (alikeData[i]['animal']['price_show'] === true) {
                                        let price_eur = numbro(alikeData[i]['animal']['price']).format({
                                            thousandSeparated: true,
                                            mantissa: 0
                                        });

                                        let price = numbro(alikeData[i]['animal']['price_exchange']).format({
                                            thousandSeparated: true,
                                            mantissa: 0
                                        });

                                        price_eur_show_elem = '<span class="shadow badge default price-currency"><span class="price">' + price_eur + '</span> <span class="currency">EUR</span> <span style="opacity:0.5"><span class="price">' + price + '</span> <span class="currency">' + alikeData[i]['animal']['price_exchange_currency'] + '</span></span></span>';
                                        // price_show_elem = '<span class="shadow badge default price-currency"><span class="price">' + price + '</span> <span class="currency">' + alikeData[i]['animal']['price_exchange_currency'] + '</span></span>';
                                    } else {
                                        // price_show_elem = '<span class="shadow badge default price-currency"><span class="price" style="filter: blur(3px)">12 345</span> <span class="currency">EUR</span></span>';
                                        let price_eur = numbro(alikeData[i]['animal']['price']).format({
                                            thousandSeparated: true,
                                            mantissa: 0
                                        });
                                        price_eur_show_elem = '<span class="shadow badge default price-currency"><span class="price">' + price_eur + '</span> <span class="currency">EUR</span></span>';
                                    }
                                    // End Price Show

                                    // Start Lang
                                    let subcategory;
                                    if (lang === "hu") {
                                        subcategory = alikeData[i]['subcategory']['name_hu'];
                                    } else if (lang === "en") {
                                        subcategory = alikeData[i]['subcategory']['name_en'];
                                    } else if (lang === "de") {
                                        subcategory = alikeData[i]['subcategory']['name_de'];
                                    } else if (lang === "fr") {
                                        subcategory = alikeData[i]['subcategory']['name_fr'];
                                    } else if (lang === "es") {
                                        subcategory = alikeData[i]['subcategory']['name_es'];
                                    } else {
                                        subcategory = alikeData[i]['subcategory']['name_en'];
                                    }
                                    $subcategoryName.text(subcategory);
                                    // End Lang

                                    $("#list.alike .row.alike-row-box").append(
                                        '<div class="box col-xxl-4 col-xl-4 col-lg-4 col-md-12 alike-list">' +
                                        '<div class="box-wrap">' +
                                        '<div class="box-img shadow" data-box-img-animal_id="' + alikeData[i]['animal']['id'] + '">' +
                                        '<img class="img-fluid img-wrap" src="/static/images/dummy/dummy.png">' +
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
                                        '</div>' + // End display:none
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
                                        '<a href="' + utility.getURL() + '/' + alikeData[i]['category']['name_en_slug'] + '/' + alikeData[i]['subcategory']['name_en_slug'] + '/' + alikeData[i]['animal']['page_url'] + '/' + alikeData[i]['animal']['id'] + '" target="_blank" class="full-data-sheet-link">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16"><path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/></svg>' +
                                        '</a>' + // End .full-data-sheet-link
                                        '<div class="box-time">' +
                                        '<div class="count">1 nap, 2 óra, 33 per, 24 másodperc múlva vége</div>' +
                                        '</div>' + // End .box-time
                                        '</div>' + // End box-img shadow
                                        '<div class="box-data">' +
                                        '<span class="shadow badge name">' + alikeData[i]['animal']['name'] + '</span>' +
                                        price_eur_show_elem +
                                        price_show_elem +
                                        '</div>' + // End box-data
                                        '</div>' + // End box-wrap
                                        '</div>'
                                    ).ready(function () {
                                    });
                                }
                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                }
            },

            alikeShop: function () {
                const $alikeshop = $(".alikeshop");
                if ($alikeshop) {
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

                    let searchCategoryList = []
                    searchCategoryList.push($alikeshop.attr("data-subcategory_id"));
                    searchCategoryList = JSON.stringify(searchCategoryList);

                    $.ajax({
                        type: "GET",
                        url: 'https://anlihouse.com/feed/breeders/product.json',
                        data: {"category": searchCategoryList, "limit": 3},
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

                                    price = numbro(price).format({thousandSeparated: true, mantissa: 0});

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

                                    $("#list.alikeshop .row.alikeshop-row-box").append(
                                        '<div class="box col-xxl-4 col-xl-4 col-lg-4 col-md-12">' +
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
                                        '<span class="shadow badge name" style="white-space:normal;text-align:left;">' + name + '</span>' +
                                        '<span class="shadow badge default price-currency"><span class="price" style="">' + price + '</span> <span class="currency">' + currency + '</span></span>' +
                                        '</div>' + // End box-data
                                        '<div class="ribbon ribbon-top-right"><span>ANLI Shop</span></div>' +
                                        '</div>' + // End box-wrap
                                        '</div>' // End box
                                    ).ready(function () {
                                    });

                                });
                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                }
            },

            userToUserMessage: function () {
                const $fullActionWrap = $("#full-action-wrap");
                const $actionTwoWrap = $fullActionWrap.find("#action-two-wrap");
                const $actionTwoWrapText = $actionTwoWrap.find(".text");

                $actionTwoWrapText.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataHostId = _this.attr("data-host_id");

                    let userToUserMessageData;
                    $.ajax({
                        type: "POST",
                        url: "/_user-to-user-message",
                        contentType: "application/json",
                        data: JSON.stringify({"host_id": dataHostId}),
                        beforeSend: function (xhr) {
                            _this.css({"pointer-events": "none"});
                        },
                        success: function (result, status, xhr) {
                            userToUserMessageData = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            _this.css({"pointer-events": "auto"});

                            if (statusCode === 200) {
                                let host_id = userToUserMessageData['host_id'];
                                let sender_id = userToUserMessageData['sender_id'];
                                let message_id = userToUserMessageData['message_id'];
                                let message = userToUserMessageData['message'];

                                $('body').append('<div class="user-to-user-message"><div class="box" data-message_id="" data-sender_id="" data-host_id="" data-message=""></div></div>');

                                $('.user-to-user-message .box').attr('data-host_id', host_id);
                                $('.user-to-user-message .box').attr('data-sender_id', sender_id);
                                $('.user-to-user-message .box').attr('data-message_id', message_id);
                                $('.user-to-user-message .box').attr('data-message', message);

                                $('.user-to-user-message .box[data-message_id="'+message_id+'"][data-sender_id="'+sender_id+'"][data-host_id="'+host_id+'"]').trigger('click');
                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                            _this.css({"pointer-events": "auto"});
                        }
                    });
                });
            },

            initializ: function () {
                loadFull.gallery();
                loadFull.documents();
                loadFull.familyTree();
                loadFull.fullDescription();
                loadFull.fullGallery();
                loadFull.fullDataFormatting();
                loadFull.ratingModal();
                loadFull.questionsAndAnswersRule();
                loadFull.question();
                loadFull.answer();
                loadFull.questionAnswer();
                loadFull.editingQuestion();
                loadFull.questionHistory();
                loadFull.editingAnswer();
                loadFull.answerHistory();
                loadFull.fullDataInfoBox();
                loadFull.translate();
                loadFull.alike();
                loadFull.alikeShop();
                loadFull.userToUserMessage();
            }

        };

        $(function () {
            loadFull.initializ();
        });
    }
}

export let anlibreedersFull = new AnlibreedersFull();