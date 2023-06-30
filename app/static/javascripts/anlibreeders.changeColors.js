import {cookies} from "brownies";

class AnlibreedersChangeColors {
    loadAnlibreedersChangeColors() {
        const loadChangeColors = {

            input: function () {
                const $inputFormControl = $("input.form-control");
                const $textareaFormControl = $("textarea.form-control");

                $inputFormControl.on("focus", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if ($("body").hasClass("dark")) {
                        _this.prevAll(".input-group-text").css({
                            "background-color": "transparent",
                            "border-color": "#00aafffc",
                            "color": "#ffffff"
                        });
                        _this.prevAll(".input-group-text").children().css({"fill": "#ffffff"});

                        _this.nextAll(".input-group-text").css({
                            "background-color": "transparent",
                            "border-color": "#00aafffc"
                        });
                        _this.nextAll(".input-group-text").children().css({"fill": "#ffffff"});
                    }

                    if ($("body").hasClass("light")) {
                        _this.prevAll(".input-group-text").css({
                            "background-color": "transparent",
                            "border-color": "#000000",
                            "color": "#000000"
                        });
                        _this.prevAll(".input-group-text").children().css({"fill": "#000000"});

                        _this.nextAll(".input-group-text").css({
                            "background-color": "transparent",
                            "border-color": "#000000"
                        });
                        _this.nextAll(".input-group-text").children().css({"fill": "#000000"});
                    }
                });

                $inputFormControl.on("blur", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if ($("body").hasClass("dark")) {
                        _this.prevAll(".input-group-text").css({
                            "background-color": "transparent",
                            "border-color": "#282828",
                            "color": "#ffffffe6"
                        });
                        _this.prevAll(".input-group-text").children().removeAttr("style");

                        _this.nextAll(".input-group-text").css({
                            "background-color": "transparent",
                            "border-color": "#282828"
                        });
                        _this.nextAll(".input-group-text").children().removeAttr("style");
                        _this.nextAll(".talking-input-btn").children().removeAttr("style");
                    }

                    if ($("body").hasClass("light")) {
                        _this.prevAll(".input-group-text").css({
                            "background-color": "transparent",
                            "border-color": "#83807d",
                            "color": "#1c1c1c"
                        });
                        _this.prevAll(".input-group-text").children().removeAttr("style");

                        _this.nextAll(".input-group-text").css({
                            "background-color": "transparent",
                            "border-color": "#83807d"
                        });
                        _this.nextAll(".input-group-text").children().removeAttr("style");
                        _this.nextAll(".talking-input-btn").children().removeAttr("style");
                    }
                });

                $("body").on("focus", "textarea.form-control", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if ($("body").hasClass("dark")) {
                        _this.next(".input-group-text").css({
                            "background-color": "transparent",
                            "border-color": "#00aafffc"
                        });
                        _this.next(".input-group-text").children().css({"fill": "#ffffff"});

                        _this.nextAll(".answer-input-btn, .question-input-btn, .talking-input-btn, .talking-answer-input-btn, .chat-emoji-btn, .chat-img-btn").css({
                            "background-color": "transparent",
                            "border-color": "#00aafffc"
                        });
                    }

                    if ($("body").hasClass("light")) {
                        _this.next(".input-group-text").css({
                            "background-color": "transparent",
                            "border-color": "#000000"
                        });
                        _this.next(".input-group-text").children().css({"fill": "#000000"});

                        _this.nextAll(".answer-input-btn, .question-input-btn, .talking-input-btn, .talking-answer-input-btn, .chat-emoji-btn, .chat-img-btn").css({
                            "background-color": "transparent",
                            "border-color": "#000000"
                        });
                    }

                    if ($("body").hasClass("color")) {
                        _this.next(".input-group-text").css({
                            "background-color": "transparent",
                            "border-color": "#d8765d"
                        });
                        _this.next(".input-group-text").children().css({"fill": "#000000"});

                        _this.nextAll(".answer-input-btn, .question-input-btn, .talking-input-btn, .talking-answer-input-btn, .chat-emoji-btn, .chat-img-btn").css({
                            "background-color": "transparent",
                            "border-color": "#d8765d"
                        });
                    }
                });

                $("body").on("blur", "textarea.form-control", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if ($("body").hasClass("dark")) {
                        _this.next(".input-group-text").css({
                            "background-color": "transparent",
                            "border-color": "#282828"
                        });
                        _this.next(".input-group-text").children().removeAttr("style");

                        _this.nextAll(".answer-input-btn, .question-input-btn, .talking-input-btn, .talking-answer-input-btn, .chat-emoji-btn, .chat-img-btn").css({
                            "background-color": "transparent",
                            "border-color": "#282828"
                        });
                    }

                    if ($("body").hasClass("light")) {
                        _this.next(".input-group-text").css({
                            "background-color": "transparent",
                            "border-color": "#83807d"
                        });
                        _this.next(".input-group-text").children().removeAttr("style");

                        _this.nextAll(".answer-input-btn, .question-input-btn, .talking-input-btn, .talking-answer-input-btn, .chat-emoji-btn, .chat-img-btn").css({
                            "background-color": "transparent",
                            "border-color": "#83807d"
                        });
                    }

                    if ($("body").hasClass("color")) {
                        _this.next(".input-group-text").css({
                            "background-color": "transparent",
                            "border-color": "rgba(255, 255, 255, 0.9)"
                        });
                        _this.next(".input-group-text").children().css({"fill": "#000000"});

                        _this.nextAll(".answer-input-btn, .question-input-btn, .talking-input-btn, .talking-answer-input-btn, .chat-emoji-btn, .chat-img-btn").css({
                            "background-color": "transparent",
                            "border-color": "rgba(255, 255, 255, 0.9)"
                        });
                    }
                });
            },

            setColorScheme: function () {
                if (cookies.abMatchMedia === null) {
                    if (window.matchMedia) {
                        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                            $("body").addClass("dark").removeClass("light");
                            $("#light-dark-change #light").removeClass("d-none d-block").addClass("d-none");
                            $("#light-dark-change #color").removeClass("d-none d-block").addClass("d-none");
                            $("#light-dark-change #dark").removeClass("d-none d-block").addClass("d-block");
                            cookies.abMatchMedia = "dark";
                        } else {
                            $("body").addClass("light").removeClass("dark");
                            $("#light-dark-change #dark").removeClass("d-none d-block").addClass("d-none");
                            $("#light-dark-change #color").removeClass("d-none d-block").addClass("d-none");
                            $("#light-dark-change #light").removeClass("d-none d-block").addClass("d-block");
                            cookies.abMatchMedia = "light";
                        }
                    } else {
                        $("body").addClass("dark").removeClass("light");
                        $("#light-dark-change #light").removeClass("d-none d-block").addClass("d-none");
                        $("#light-dark-change #color").removeClass("d-none d-block").addClass("d-none");
                        $("#light-dark-change #dark").removeClass("d-none d-block").addClass("d-block");
                        cookies.abMatchMedia = "dark";
                    }
                } else {
                    $("body").removeClass("light dark color").addClass(cookies.abMatchMedia);
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

                $("#menu .getColorMode").removeData("data-i18n");
                $("#menu .getColorMode").html("");
                $("#menu .getColorMode").text("");
                $("#menu .getColorMode").data("i18n", "anlihouse-" + cookies.abMatchMedia);
                $('body').i18n();

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
                    $('body').i18n();
                }

                setColorMode();

                $("body").on("click", ".click-light-mode", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $("body").removeClass("dark light color").addClass("light").css({"z-index": "1"}); //.css({"transform": "translateZ(0)"});
                    //$("#light-dark-change #dark").removeClass("d-none d-block").addClass("d-none");
                    //$("#light-dark-change #light").removeClass("d-none d-block").addClass("d-block");
                    //$("#light-dark-change #color").removeClass("d-none d-block").addClass("d-none");
                    $("#menu #navigation ul li a.color-mode-item.light").trigger("click");
                    $("#header #hamburger").toggleClass("closed open");
                    cookies.abMatchMedia = "light";
                });

                $("body").on("click", ".click-dark-mode", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $("body").removeClass("dark light color").addClass("dark").css({"z-index": "1"}); // .css({"transform": "translateZ(0)"});
                    //$("#light-dark-change #light").removeClass("d-none d-block").addClass("d-none");
                    //$("#light-dark-change #dark").removeClass("d-none d-block").addClass("d-block");
                    //$("#light-dark-change #color").removeClass("d-none d-block").addClass("d-none");
                    $("#menu #navigation ul li a.color-mode-item.dark").trigger("click");
                    $("#header #hamburger").toggleClass("closed open");
                    cookies.abMatchMedia = "dark";
                });

                $("body").on("click", ".click-color-mode", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $("body").removeClass("dark light color").addClass("color").css({"z-index": "1"}); // .css({"transform": "translateZ(0)"});
                    //$("#light-dark-change #light").removeClass("d-none d-block").addClass("d-none");
                    //$("#light-dark-change #dark").removeClass("d-none d-block").addClass("d-none");
                    //$("#light-dark-change #color").removeClass("d-none d-block").addClass("d-block");
                    $("#menu #navigation ul li a.color-mode-item.color").trigger("click");
                    $("#header #hamburger").toggleClass("closed open");
                    cookies.abMatchMedia = "color";
                });
            },

            initializ: function () {
                loadChangeColors.input()
                loadChangeColors.setColorScheme();
            }

        };

        $(function () {
            loadChangeColors.initializ()
        });
    }
}

export let anlibreedersChangeColors = new AnlibreedersChangeColors();