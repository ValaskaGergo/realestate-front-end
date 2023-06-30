import AnlibreedersUtility from './utilities/anlibreeders.utility'
import printJS from "print-js";

const utility = new AnlibreedersUtility();

class AnlibreedersFullAction {
    loadAnlibreedersFullAction() {
        const loadFullAction = {

            wishlist: function () {
                const $full = $("#full");
                const $fullActionWrap = $full.find("#full-action-wrap");
                const $actionThreeWrap = $fullActionWrap.find("#action-three-wrap");
                const $actionThreeWrapText = $actionThreeWrap.find(".data .text");

                $actionThreeWrapText.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataAnimalId = _this.attr("data-animal_id");
                    const dataUserId = _this.attr("data-user_id");
                    const dataWishlistStatus = _this.attr("data-wishlist_status");

                    let wishlistCallback;
                    $.ajax({
                        type: "POST",
                        url: "/_wishlist",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "animal_id": dataAnimalId,
                            "user_id": dataUserId,
                            "wishlist_status": dataWishlistStatus
                        }),
                        beforeSend: function (xhr) {
                            _this.removeClass("pointer-events-auto").addClass("pointer-events-none");
                        },
                        success: function (result, status, xhr) {
                            wishlistCallback = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                _this.attr("data-wishlist_status", wishlistCallback['wishlist_status']);
                                _this.removeData("i18n");
                                _this.text("");
                                if (wishlistCallback['wishlist_status'] === "inactive") {
                                    _this.attr("data-i18n", "anlihouse-A370");
                                } else if (wishlistCallback['wishlist_status'] === "active") {
                                    _this.attr("data-i18n", "anlihouse-A376");
                                } else {
                                }
                                $('body').i18n();
                            } else {
                            }
                            _this.removeClass("pointer-events-none").addClass("pointer-events-auto");
                        },
                        error: function (xhr, status, error) {
                            _this.removeClass("pointer-events-none").addClass("pointer-events-auto");
                        }
                    });
                });
            },

            animalPDF: function () {
                const $full = $("#full");
                const $fullActionWrap = $full.find("#full-action-wrap");
                const $actionFourWrap = $fullActionWrap.find("#action-four-wrap");
                const $actionPdf = $actionFourWrap.find(".social.full-data-pdf");

                const $price = $full.find("#price");

                const priceEurCurrency = $price.find(".eur .currency").html();
                const priceEurdata = $price.find(".eur .price").html();

                const priceEurToCurrency = $price.find(".eur-to-currency .currency").html();
                const priceEurTodata = $price.find(".eur-to-currency .price").html();

                const $detailsCollapseOne = $full.find("#detailsCollapseOne");
                const yearMonthDay = $detailsCollapseOne.find(".year-month-day").html();

                const nowDate = $("#full #full-page-now-date-reload").html();

                $actionPdf.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataPdfAction = _this.attr("data-pdf_action");

                    let dataPageId = _this.attr("data-page_id");
                    let briefDescription = $full.find("#brief-description").html();
                    let description;
                    if ($("#full .truncateStringMore").hasClass('active')) {
                        if ($("#full .truncateStringMore").css('display') != 'none') {
                            description = $full.find(".full-description-translate").attr("data-not-truncute");
                        } else {
                            description = $full.find(".full-description-translate").html();
                        }
                    } else {
                        description = $full.find(".full-description-translate").html();
                    }

                    let animalPdfCallback;
                    let dataAction;
                    $.ajax({
                        type: "POST",
                        url: "/_animal-pdf",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "page_id": dataPageId,
                            "page_url": window.location.href,
                            "priceEurCurrency": priceEurCurrency,
                            "priceEurdata": priceEurdata,
                            "priceEurToCurrency": priceEurToCurrency,
                            "priceEurTodata": priceEurTodata,
                            "yearMonthDay": yearMonthDay,
                            "nowDate": nowDate,
                            "briefDescription": briefDescription,
                            "description": description,
                            "dataPdfAction": dataPdfAction
                        }),
                        beforeSend: function (xhr) {
                            _this.removeClass("pointer-events-auto").addClass("pointer-events-none");
                        },
                        success: function (result, status, xhr) {
                            animalPdfCallback = result['message']
                            dataAction = result['data_pdf_action']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                if (dataAction === "pdf") {
                                    window.open(animalPdfCallback, '_blank');
                                } else {
                                    printJS(animalPdfCallback, 'pdf')
                                }
                            } else {
                            }
                            _this.removeClass("pointer-events-none").addClass("pointer-events-auto");
                        },
                        error: function (xhr, status, error) {
                            _this.removeClass("pointer-events-none").addClass("pointer-events-auto");
                        }
                    });
                });
            },

            facebook: function () {
                const $full = $("#full");
                const $fullActionWrap = $full.find("#full-action-wrap");
                const $actionFourWrap = $fullActionWrap.find("#action-four-wrap");
                const $actionFacebook = $actionFourWrap.find(".social.facebook");
                const $fbShareButton = $actionFourWrap.find(".fb-share-button");

                $actionFacebook.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    FB.ui({
                        method: 'share',
                        href: window.location.href,
                    }, function (response) {
                    });
                });
            },

            clicked: function () {

                const $full = $("#full");
                const $createdAt = $full.find("#full-action-wrap #action-seven-wrap .time");
                const $advertisementId = $full.find("#full-action-wrap #action-six-wrap .text");

                $createdAt.on("click", function (event) {
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

                $advertisementId.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataAdvertisementId = document.getElementById("advertisementId");
                    dataAdvertisementId.select();
                    dataAdvertisementId.setSelectionRange(0, 99999);
                    navigator.clipboard.writeText(dataAdvertisementId.value);

                    $.toast({
                        heading: 'Hirdetés azonosító',
                        text: 'A vágólapodra másolva: ' + dataAdvertisementId.value,
                        icon: 'info',
                        loader: true,
                        loaderBg: '#4c6180',
                        bgColor: '#ffffff',
                        textColor: '#4c6180',
                        position: 'top-right',
                        hideAfter: 5000, // 5000
                    });

                });

            },

            initializ: function () {
                loadFullAction.wishlist();
                loadFullAction.animalPDF();
                loadFullAction.facebook();
                loadFullAction.clicked();
            }

        };

        $(function () {
            loadFullAction.initializ()
        });
    }
}

export let anlibreedersFullAction = new AnlibreedersFullAction();