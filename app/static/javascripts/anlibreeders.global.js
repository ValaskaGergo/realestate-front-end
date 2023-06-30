import AnlibreedersUtility from './utilities/anlibreeders.utility'
import {local, session, cookies, options} from 'brownies';
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import gsap from "gsap";

const utility = new AnlibreedersUtility();
const ResizeSensor = require('css-element-queries/src/ResizeSensor');

class AnlibreedersGlobal {
    loadAnlibreedersGlobal() {
        const loadGlobal = {
            resizeSensor: function () {
                let $wrapper = document.getElementById('wrapper');
                let $bodyColor = $("#body-color");
                new ResizeSensor($wrapper, function () {
                    $bodyColor.css({"height": $wrapper.clientHeight + "px"});
                });
            },

            previousUrlClickElem: function () {

                $(".add-previous-url-cookie").on("click", function (event) {
                    // event.preventDefault();
                    const _this = $(this);

                    cookies.abPreviousUrl = window.location.href;
                });

                $(".previous-click").on("click", function (event) {
                    const _this = $(this);

                    if (cookies.abPreviousUrl !== null) {
                        event.preventDefault();
                        window.location.href = cookies.abPreviousUrl;
                    }
                });

                try {
                    let page_id = window.location.href.match(/\/(\d+)+[\/]?/);
                    if (
                        (window.location.href !== window.location.protocol + "//" + window.location.hostname + "/user-management/user" + page_id[0]) &&
                        (window.location.href !== window.location.protocol + "//" + window.location.hostname + "/edit-of-uploaded-animal" + page_id[0])
                    ) {
                        cookies.abPreviousUrl = null;
                    }
                } catch (error) {
                    cookies.abPreviousUrl = null;
                }

            },

            scrollPercentage: function () {

                const $scrollPercentage = $("#scroll-percentage");
                const $scrollPercentageProgress = $scrollPercentage.find(".progress");
                const $scrollPercentageProgressBar = $scrollPercentage.find(".progress-bar");

                const $scrollPercentageUp = $("#scroll-percentage-up");
                const $scrollPercentageUpCircle2 = $("#scroll-percentage-up .circle2");

                let documentHeight;

                function scrollPercentage(event) {

                    let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

                    documentHeight = $(document).height();
                    let scrollPositionRelative = scrollPosition / (documentHeight - viewportHeight);
                    let scrollPercentage = scrollPositionRelative * 100;

                    if (scrollPercentage > 0) {
                        $scrollPercentage.removeClass("inactive").addClass("active");
                        $scrollPercentageUp.removeClass("inactive").addClass("active");
                    } else {
                        $scrollPercentage.removeClass("active").addClass("inactive");
                        $scrollPercentageUp.removeClass("active").addClass("inactive");
                    }

                    $scrollPercentageProgress.attr("aria-valuenow", scrollPercentage);
                    $scrollPercentageProgressBar.css({"width": scrollPercentage + "%"});

                    $scrollPercentageUpCircle2.attr("stroke-dasharray", scrollPercentage + " 100");
                }

                //window.addEventListener("wheel", event => {
                $(document.body).scroll(function () {
                    scrollPercentage(event)
                });

                // window.addEventListener("touchmove", event => {scrollPercentage(event)});

                gsap.registerPlugin(ScrollToPlugin);

                gsap.config({
                    nullTargetWarn: true,
                    trialWarn: true,
                });

                /*
                $scrollPercentage.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let percent = event.offsetX / _this.width() * 100;
                    let pos = ((percent / 100) * documentHeight).toFixed(2)

                    $scrollPercentageProgress.attr("aria-valuenow", percent);
                    $scrollPercentageProgressBar.css({"width": percent + "%"});
                    gsap.to(document.body, {duration: 0.5, scrollTo: {y: pos, offsetY: 24, autoKill: false}});
                });
                */

                $scrollPercentageUp.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);
                    gsap.to(document.body, {duration: 0.6, scrollTo: {y: 0, offsetY: 24, autoKill: false}});
                });
            },

            cookiesOptions: function () {
                cookies[options] = {};
            },

            initializ: function () {
                loadGlobal.previousUrlClickElem();
                loadGlobal.resizeSensor();
                loadGlobal.scrollPercentage();
                loadGlobal.cookiesOptions();
            }

        };

        $(function () {
            loadGlobal.initializ()
        });
    }
}

export let anlibreedersGlobal = new AnlibreedersGlobal();