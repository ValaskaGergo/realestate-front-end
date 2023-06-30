import {local, session, cookies} from 'brownies';
import numbro from "numbro";

class AnlibreedersAdvertisement {
    loadAnlibreedersAdvertisement() {
        const loadAdvertisement = {

            indexList: function () {

                if ($("#content #list .row .box").hasClass("index-list")) {
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

                    const $contentListRowBox = $("#content #list .row .box.index-list:nth-child(4n)");
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
                        data: {"category": searchCategoryList, "limit": 100},
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
                                        '<span class="shadow badge name" style="white-space:normal;text-align:left;">' + name + '</span>' +
                                        '<span class="shadow badge default price-currency"><span class="price" style="">' + price + '</span> <span class="currency">' + currency + '</span></span>' +
                                        '</div>' + // End box-data
                                        '<div class="ribbon ribbon-top-right"><span>ANLI Shop</span></div>' +
                                        '</div>' + // End box-wrap
                                        '</div>' // End box
                                    ).insertAfter($("#content #list .row .box.index-list.elem-" + index)).ready(function () {
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

            initializ: function () {
                loadAdvertisement.indexList()
            }

        };

        $(function () {
            loadAdvertisement.initializ()
        });
    }
}

export let anlibreedersAdvertisement = new AnlibreedersAdvertisement();