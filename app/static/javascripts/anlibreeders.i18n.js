import AnlibreedersUtility from './utilities/anlibreeders.utility'
import {local, session, cookies} from 'brownies';
import numbro from "numbro"
import shortAndSweet from "short-and-sweet/dist/short-and-sweet.min";

const utility = new AnlibreedersUtility();

class AnlibreedersI18n {
    loadAnlibreedersI18n() {
        const loadI18n = {

            i18nBrowserLang: function () {

                if (cookies.abBrowserLang == null) {
                    let availableLanguages = ['hu', 'en', 'de', 'fr', 'es'];

                    cookies.abBrowserLang =
                        [
                            ...(window.navigator.languages || []),
                            window.navigator.language
                        ]
                            .filter(Boolean)
                            .map(language => language.substr(0, 2))
                            .find(language => availableLanguages.includes(language)) || "en";
                }
            },

            i18n: function () {
                $.i18n.debug = false;

                $.i18n({locale: cookies.abBrowserLang}).load({
                    'hu': '/i18n/anlirealestate.hu.json',
                    'en': '/i18n/anlirealestate.en.json',
                    'de': '/i18n/anlirealestate.de.json',
                    'fr': '/i18n/anlirealestate.fr.json',
                    'es': '/i18n/anlirealestate.es.json'
                }).done(function () {
                    // Start Full Page Params
                    $("#full .accordion-item.reviews .reviews-count").text($.i18n('anlihouse-A319', $("#full .accordion-item.reviews .reviews-count").attr("data-reviews-count")));
                    // Start Full Page Params

                    // Start Rating Modal Params
                    $("#ratingModal .modal-body .rating-answer").text($.i18n('anlihouse-A322', $("#ratingModal .modal-body .rating-answer").attr("data-name")));
                    // End Rating Modal Params

                    // Start Filter
                    setTimeout(
                        function () {
                            if ($(".breadcrumb .breadcrumb-item").hasClass("seller_user_name")) {
                                $("#search #searchInput").attr("placeholder", $.i18n("anlihouse-A375", $(".breadcrumb .breadcrumb-item.seller_user_name").attr("data-seller_user_name")));
                            } else if ($(".breadcrumb .breadcrumb-item").hasClass("wishlist")) {
                                $("#search #searchInput").prop("placeholder", $.i18n("anlihouse-A378"));
                            } else {
                                $("#search #searchInput").prop("placeholder", $.i18n("anlihouse-A291"));
                            }
                        }, 1500);
                    // End Filter

                    // Start WishList
                    if ($(".breadcrumb .breadcrumb-item").hasClass("wishlist")) {
                        $("#search #searchInput").prop("placeholder", $.i18n("anlihouse-A378"));
                    } else {
                        $("#search #searchInput").prop("placeholder", $.i18n("anlihouse-A291"));
                    }
                    // End WishList

                    // Start Questions And Answers
                    // Start Question
                    $("#full .questions-and-answers .question-input").prop("placeholder", $.i18n("anlihouse-A326"));

                    $("#full .questions-and-answers .question-input").attr("data-counter-label", $.i18n("anlihouse-A327"));

                    shortAndSweet("#questions-and-answers .question-input-group .question-input", {
                        counterLabel: '{length}/{maxlength}',
                        counterClassName: 'count',
                        append: (el, counter) => {
                            const count = document.querySelector('#questions-and-answers .question-counter');
                            count.appendChild(counter);
                        }
                    });
                    // End question

                    // Start Edit question
                    $("#editingQuestion #question-edit-form .question-edit-input").prop("placeholder", $.i18n("anlihouse-A326"));

                    $("#editingQuestion #question-edit-form .question-edit-input").attr("data-counter-label", $.i18n("anlihouse-A327"));
                    // End Edit Question

                    // Start Answer
                    $("#full .questions-and-answers .answer-input").prop("placeholder", $.i18n("anlihouse-A333"));

                    $("#full .questions-and-answers .answer-input").attr("data-counter-label", $.i18n("anlihouse-A327"));

                    $("#questions-and-answers #questionId").each(function () {
                        let questionId = $(this).val();

                        shortAndSweet("#questions-and-answers .answer-input-group .answer-input.question-id-input-" + questionId, {
                            counterLabel: '{length}/{maxlength}',
                            counterClassName: 'count',
                            append: (el, counter) => {
                                const count = document.querySelector('#questions-and-answers .answer-counter.question-id-elem-' + questionId);
                                count.appendChild(counter);
                            }
                        });
                    });
                    // End Answer

                    // Start Edit Answer
                    $("#editingAnswer #answer-edit-form .answer-edit-input").prop("placeholder", $.i18n("anlihouse-A333"));

                    $("#editingAnswer #answer-edit-form .answer-edit-input").attr("data-counter-label", $.i18n("anlihouse-A327"));
                    // End Edit Answer

                    // End Questions And Answers

                    // Start Talking
                    $("#talk .talking-button-wrap #talking-input.talking-input").prop("placeholder", $.i18n("anlihouse-A354"));

                    $("#talk .talking-button-wrap #talking-input.talking-input").attr("data-counter-label", $.i18n("anlihouse-A327"));

                    shortAndSweet("#talk .talking-button-wrap #talking-input.talking-input", {
                        counterLabel: '{length}/{maxlength}',
                        counterClassName: 'count',
                        append: (el, counter) => {
                            const count = document.querySelector('#talk .talking-counter');
                            count.appendChild(counter);
                        }
                    });

                    $("#editingTalkingModal #talking-edit-input.talking-edit-input").prop("placeholder", $.i18n("anlihouse-A354"));

                    $("#editingTalkingModal #talking-edit-input.talking-edit-input").attr("data-counter-label", $.i18n("anlihouse-A327"));
                    // End Talking

                    // Start Talking Answer
                    $("#editingTalkingAnswerModal #talking-answer-edit-input.talking-answer-edit-input").prop("placeholder", $.i18n("anlihouse-A359"));

                    $("#editingTalkingAnswerModal #talking-answer-edit-input.talking-answer-edit-input").attr("data-counter-label", $.i18n("anlihouse-A327"));

                    $("#talkings .talking-answer-answer-input-group .talking-answer-answer-input").prop("placeholder", $.i18n("anlihouse-A359"));
                    $("#talkings .talking-answer-answer-input-group .talking-answer-answer-input").attr("data-counter-label", $.i18n("anlihouse-A327"));
                    // End Talking Answer

                    // Start Notifications
                    $("#notifications .notifications-i18n-email").text($.i18n("anlihouse-A389", $("#notifications .notifications-i18n-email").attr("data-email")));
                    // End Notifications

                    // Start Status
                    setTimeout(
                        function () {
                            let statusDays = $(".status-page .uptime-data").attr("data-days");
                            let statusHours = $(".status-page .uptime-data").attr("data-hours");
                            let statusMinutes = $(".status-page .uptime-data").attr("data-minutes");
                            let statusSeconds = $(".status-page .uptime-data").attr("data-seconds");
                            $(".status-page .uptime-data").text($.i18n("anlihouse-432", statusDays, statusHours, statusMinutes, statusSeconds));
                        }, 200)
                    // End Status

                    $('body').i18n();
                })
            },

            i18nSwitch: function () {
                const $menuNavigationLang = $("#menu #navigation #lang");
                const $menuNavigationLangItem = $menuNavigationLang.find(".lang-item");

                function setLang() {
                    $menuNavigationLangItem.each(function () {
                        if ($(this).hasClass(cookies.abBrowserLang)) {
                            $(this).addClass("d-none");
                        } else {
                            $(this).removeClass("d-none");
                        }
                    });

                    $menuNavigationLang.find(".inactive.lang").removeData("data-i18n");
                    $menuNavigationLang.find(".inactive.lang").html("");
                    $menuNavigationLang.find(".inactive.lang").text("");
                    $menuNavigationLang.find(".inactive.lang").data("i18n", "anlihouse-" + cookies.abBrowserLang);
                    $('body').i18n();
                }

                setLang();

                $menuNavigationLangItem.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    cookies.abBrowserLang = _this.attr("data-locale");
                    $.i18n().locale = _this.attr("data-locale");

                    setLang();

                    utility.menuClosed();

                    startDateTimeFormatter();

                    setPlaceholder();

                    setFullPageParams();

                    setRatingModalParams();

                    setTranslate();
                });

                // Start Color Mode
                const $menuNavigationColorMode = $("#menu #navigation #color-mode");
                const $menuNavigationColorModeItem = $menuNavigationColorMode.find(".color-mode-item");

                function setColorMode() {
                    $menuNavigationColorModeItem.each(function () {
                        if ($(this).hasClass(cookies.abMatchMedia)) {
                            $(this).addClass("d-none");
                        } else {
                            $(this).removeClass("d-none");
                        }
                    });

                    $menuNavigationColorMode.find(".inactive.color-mode").removeData("data-i18n");
                    $menuNavigationColorMode.find(".inactive.color-mode").html("");
                    $menuNavigationColorMode.find(".inactive.color-mode").text("");
                    $menuNavigationColorMode.find(".inactive.color-mode").data("i18n", "anlihouse-" + cookies.abMatchMedia);

                    $("#menu .getColorMode").removeData("data-i18n");
                    $("#menu .getColorMode").html("");
                    $("#menu .getColorMode").text("");
                    $("#menu .getColorMode").data("i18n", "anlihouse-" + cookies.abMatchMedia);

                    if (cookies.abMatchMedia === "dark") {
                        $("#light-dark-change #light").removeClass("d-none d-block").addClass("d-none");
                        $("#light-dark-change #dark").removeClass("d-none d-block").addClass("d-block");
                        $("#light-dark-change #color").removeClass("d-none d-block").addClass("d-none");
                    } else if (cookies.abMatchMedia === "light") {
                        $("#light-dark-change #dark").removeClass("d-none d-block").addClass("d-none");
                        $("#light-dark-change #light").removeClass("d-none d-block").addClass("d-block");
                        $("#light-dark-change #color").removeClass("d-none d-block").addClass("d-none");
                    } else if (cookies.abMatchMedia === "color") {
                        $("#light-dark-change #light").removeClass("d-none d-block").addClass("d-none");
                        $("#light-dark-change #dark").removeClass("d-none d-block").addClass("d-none");
                        $("#light-dark-change #color").removeClass("d-none d-block").addClass("d-block");
                    } else {
                        $("#light-dark-change #light").removeClass("d-none d-block").addClass("d-none");
                        $("#light-dark-change #dark").removeClass("d-none d-block").addClass("d-block");
                        $("#light-dark-change #color").removeClass("d-none d-block").addClass("d-none");
                    }
                }

                setColorMode();

                $menuNavigationColorModeItem.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    cookies.abMatchMedia = _this.attr("data-color-mode");

                    setColorMode();

                    utility.menuClosed();
                });
                // End Color Mode

                // Start Date Formatter
                function startDateTimeFormatter() {
                    $('[data-time-llll]').each(function () {
                        $(this).text(utility.getDateTimeLLLL($(this).attr("data-time-llll")));
                    });

                    $('[data-time-relative]').each(function () {
                        $(this).text(utility.getDateTimeRelative($(this).attr("data-time-relative")));
                    });
                }

                startDateTimeFormatter();
                // End Date Formatter

                // Start Number Formatter
                function startNumberFormatter() {
                    numbro.languageData().delimiters.thousands = " "

                    $('[data-number-format]').each(function () {
                        let numberInt = parseInt($(this).attr("data-number-format"));
                        let number = numbro(numberInt);
                        $(this).text(number.format({thousandSeparated: true, mantissa: 0}));
                    });
                }

                startNumberFormatter();
                // End Number Formatter

                // Start Placeholder
                function setPlaceholder() {

                    // Start Filter
                    setTimeout(
                        function () {
                            if ($(".breadcrumb .breadcrumb-item").hasClass("seller_user_name")) {
                                $("#search #searchInput").attr("placeholder", $.i18n("anlihouse-A375", $(".breadcrumb .breadcrumb-item.seller_user_name").attr("data-seller_user_name")));
                            } else if ($(".breadcrumb .breadcrumb-item").hasClass("wishlist")) {
                                $("#search #searchInput").prop("placeholder", $.i18n("anlihouse-A378"));
                            } else {
                                $("#search #searchInput").prop("placeholder", $.i18n("anlihouse-A291"));
                            }
                        }, 1500);
                    // End Filter

                    // Start Questions And Answers
                    $("#full .questions-and-answers .question-input").prop("placeholder", $.i18n("anlihouse-A326"));

                    $("#full .questions-and-answers .question-input").attr("data-counter-label", $.i18n("anlihouse-A327"));
                    // End Questions And Answers

                    // Start Talking
                    $("#talk .talking-button-wrap #talking-input.talking-input").prop("placeholder", $.i18n("anlihouse-A354"));
                    $("#editingTalkingModal #talking-edit-input.talking-edit-input").prop("placeholder", $.i18n("anlihouse-A354"));
                    // End Talking

                    // Start Talking Answer
                    $("#talk .talking-answer-input-group .talking-answer-input").prop("placeholder", $.i18n("anlihouse-A359"));
                    $("#editingTalkingAnswerModal #talking-answer-edit-input.talking-answer-edit-input").prop("placeholder", $.i18n("anlihouse-A359"));
                    $("#talkings .talking-answer-answer-input-group .talking-answer-answer-input").prop("placeholder", $.i18n("anlihouse-A359"));
                    // End Talking Answer

                    // Start Notifications
                    $("#notifications .notifications-i18n-email").text($.i18n("anlihouse-A389", $("#notifications .notifications-i18n-email").attr("data-email")));
                    // End Notifications

                    $('body').i18n();
                }

                // End Placeholder

                // Start Full Page Params
                function setFullPageParams() {
                    $("#full .accordion-item.reviews .reviews-count").text($.i18n('anlihouse-A319', $("#full .accordion-item.reviews .reviews-count").attr("data-reviews-count")));
                }

                // Start Full Page Params

                // Start Rating Modal Params
                function setRatingModalParams() {
                    $("#ratingModal .modal-body .rating-answer").text($.i18n('anlihouse-A322', $("#ratingModal .modal-body .rating-answer").attr("data-name")));
                }

                // End Rating Modal Params

                // Start Translate
                function setTranslate() {
                    // Start Brief Description
                    if (cookies.abBrowserLang !== $("#full #brief-description.brief-description-translate").attr("data-brief_description_detect_lang")) {
                        $("#full .translate.brief-description-show").removeClass("inactive").addClass("active");
                    } else {
                        $("#full .translate.brief-description-show").removeClass("active").addClass("inactive");
                    }
                    if ($("#full .translate.brief-description-show .text-link").hasClass("target")) {
                        $("#full #brief-description.brief-description-translate").html($("#full .translate.brief-description-show .text-link").attr("data-source"));
                        $("#full .translate.brief-description-show .text-link").toggleClass("target source");
                        $("#full .translate.brief-description-show .text-link").attr("data-source", "");
                        $("#full .translate.brief-description-show .text-link").attr("data-target", "");

                        $("#full .translate.brief-description-show .text").removeData("i18n");
                        $("#full .translate.brief-description-show .text").text("");
                        $("#full .translate.brief-description-show .text").attr("data-i18n", "anlihouse-A363");

                        $("#full .translate.brief-description-show .text-link").removeData("i18n");
                        $("#full .translate.brief-description-show .text-link").text("");
                        $("#full .translate.brief-description-show .text-link").attr("data-i18n", "anlihouse-A364");

                        $('body').i18n();
                    }
                    // End Brief Description

                    // Start Description
                    if (cookies.abBrowserLang !== $("#full .text.full-description-translate").attr("data-description_detect_lang")) {
                        $("#full .translate.full-description-show").removeClass("inactive").addClass("active");
                    } else {
                        $("#full .translate.full-description-show").removeClass("active").addClass("inactive");
                    }
                    if ($("#full .translate.full-description-show .text-link").hasClass("target")) {
                        $("#full .text.full-description-translate").html($("#full .translate.full-description-show .text-link").attr("data-source"));
                        $("#full .translate.full-description-show .text-link").removeClass("target").addClass("source");
                        $("#full .translate.full-description-show .text-link").attr("data-source", "");
                        $("#full .translate.full-description-show .text-link").attr("data-target", "");

                        $("#full .translate.full-description-show .text").removeData("i18n");
                        $("#full .translate.full-description-show .text").text("");
                        $("#full .translate.full-description-show .text").attr("data-i18n", "anlihouse-A363");

                        $("#full .translate.full-description-show .text-link").removeData("i18n");
                        $("#full .translate.full-description-show .text-link").text("");
                        $("#full .translate.full-description-show .text-link").attr("data-i18n", "anlihouse-A364");

                        $('body').i18n();
                    }
                    // End Description

                    // Start Status
                    setTimeout(
                        function () {
                            let statusDays = $(".status-page .uptime-data").attr("data-days");
                            let statusHours = $(".status-page .uptime-data").attr("data-hours");
                            let statusMinutes = $(".status-page .uptime-data").attr("data-minutes");
                            let statusSeconds = $(".status-page .uptime-data").attr("data-seconds");
                            $(".status-page .uptime-data").text($.i18n("anlihouse-432", statusDays, statusHours, statusMinutes, statusSeconds));
                        }, 200)
                    // End Status
                }

                // End Translate
            },

            initializ: function () {
                loadI18n.i18nBrowserLang()
                loadI18n.i18n()
                loadI18n.i18nSwitch();
            }

        };

        $(function () {
            loadI18n.initializ()
        });
    }
}

export let anlibreedersI18n = new AnlibreedersI18n();