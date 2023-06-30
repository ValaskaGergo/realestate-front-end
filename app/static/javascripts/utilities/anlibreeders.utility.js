const axios = require('axios');
import {local, session, cookies} from 'brownies';
import Bowser from "bowser";
import moment from "moment";
import 'moment-timezone';
import io from 'socket.io-client';

export default class AnlibreedersUtility {

    getURL() {
        let url;
        if (process.env.NODE_ENV === "production") {
            url = process.env.PRUDUCTION_URL
        } else {
            url = process.env.DEVELOPMENT_URL
        }
        return url
    }

    getApiURL() {
        let url;
        if (process.env.NODE_ENV === "production") {
            url = process.env.API_PRUDUCTION_URL
        } else {
            url = process.env.API_DEVELOPMENT_URL
        }
        return url
    }

    getSocketURL() {
        let url;
        if (process.env.NODE_ENV === "production") {
            url = process.env.SOCKET_PRUDUCTION_URL
        } else {
            url = process.env.SOCKET_DEVELOPMENT_URL
        }
        return url
    }

    getWindowSize() {
        let intViewportWidth = window.innerWidth;
        let intViewportHeight = window.innerHeight;
        $(window).resize(function () {
            intViewportWidth = window.innerWidth;
            intViewportHeight = window.innerHeight;
        });
        return {width: intViewportWidth, height: intViewportHeight};
    }

    menuOpen() {
        const $body = $("body");
        const $menu = $("#menu");
        const $wrapper = $("#wrapper");
        const $footer = $("#footer");
        const $hamburger = $("#header #hamburger");
        const $bg = $(".bg1");
        const $menuWindowColor = $("#menu-window-color");

        $menu.animate(
            {
                right: "0px",
                queue: "menu-open"
            },
            {
                duration: 500
            }
        );

        $wrapper.animate(
            {
                left: "-360px",
                queue: "menu-open"
            },
            {
                duration: 500
            }
        );

        $footer.animate(
            {
                left: "-360px",
                queue: "menu-open"
            },
            {
                duration: 500
            }
        )
        $bg.animate(
            {
                'background-position-x': "-360px",
                queue: "menu-open"
            },
            {
                duration: 500
            }
        ).dequeue('menu-open').promise().done(function () {
            $hamburger.toggleClass("open closed");
            $body.css({"overflow-y": "hidden"});
            $menuWindowColor.show();
        });
    }

    menuClosed() {
        const $body = $("body");
        const $menu = $("#menu");
        const $wrapper = $("#wrapper");
        const $footer = $("#footer");
        const $hamburger = $("#header #hamburger");
        const $bg = $(".bg1");
        const $menuWindowColor = $("#menu-window-color");

        $menu.animate(
            {
                right: "-360px",
                queue: "menu-closed"
            },
            {
                duration: 500
            }
        );

        $wrapper.animate(
            {
                left: "0px",
                queue: "menu-closed"
            },
            {
                duration: 500
            }
        );

        $footer.animate(
            {
                left: "0px",
                queue: "menu-closed"
            },
            {
                duration: 500
            }
        )
        $bg.animate(
            {
                'background-position-x': "0px",
                queue: "menu-open"
            },
            {
                duration: 500
            }
        ).dequeue('menu-open').promise().done(function () {
            $hamburger.toggleClass("closed open");
            $body.css({"overflow-y": "auto"});
            $menuWindowColor.hide();

            if (cookies.abMatchMedia !== null) {
                $("body").removeClass("light dark color").addClass(cookies.abMatchMedia);
                $('body').i18n();
            }

        });
    }

    notificationOpen() {
        const $bell = $("#search-user-notification");
        const $notification = $("#notification-wrap");
        const $loader = $notification.find(".loader-wrap");

        $notification.animate(
            {
                queue: "notification-open"
            },
            {
                duration: 10
            }
        ).dequeue('notification-open').promise().done(function () {
            $bell.removeClass("closed").addClass("open");
            $notification.removeClass("closed").addClass("open");
            $loader.removeClass("closed").addClass("open");
        });
    }

    notificationClosed() {
        const $bell = $("#search-user-notification");
        const $notification = $("#notification-wrap");
        const $loader = $notification.find(".loader-wrap");

        $notification.animate(
            {
                queue: "notification-closed"
            },
            {
                duration: 10
            }
        ).dequeue('notification-closed').promise().done(function () {
            $bell.removeClass("open success").addClass("closed");
            $notification.removeClass("open").addClass("closed");
            $loader.removeClass("open").addClass("closed");
        });
    }

    userinfoOpen() {
        const $bell = $("#search-user-info");
        const $notification = $("#userinfo-wrap");
        const $loader = $notification.find(".loader-wrap");

        $notification.animate(
            {
                queue: "userinfo-open"
            },
            {
                duration: 10
            }
        ).dequeue('userinfo-open').promise().done(function () {
            $bell.removeClass("closed").addClass("open");
            $notification.removeClass("closed").addClass("open");
            $loader.removeClass("closed").addClass("open");
        });
    }

    userinfoClosed() {
        const $bell = $("#search-user-info");
        const $notification = $("#userinfo-wrap");
        const $loader = $notification.find(".loader-wrap");

        $notification.animate(
            {
                queue: "userinfo-closed"
            },
            {
                duration: 10
            }
        ).dequeue('userinfo-closed').promise().done(function () {
            $bell.removeClass("open success").addClass("closed");
            $notification.removeClass("open").addClass("closed");
            $loader.removeClass("open").addClass("closed");
        });
    }

    getRandomPassword() {
        let pattern1 = "123456789";
        let pattern2 = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
        let pattern3 = "abcdefghijklmnpqrstuvwxyz";
        let pattern4 = '?!%-/._#&*$^@';

        let randPassword = "";
        let randPassword1 = [];
        let randPassword2 = [];
        let randPassword3 = [];
        let randPassword4 = [];

        let shuffled0 = "";
        let shuffled1 = "";

        randPassword1 = Array(3).fill(pattern1).map(function (x) {
            return x[Math.floor(Math.random() * x.length)]
        }).join('');

        randPassword2 = Array(3).fill(pattern2).map(function (x) {
            return x[Math.floor(Math.random() * x.length)]
        }).join('');

        randPassword3 = Array(3).fill(pattern3).map(function (x) {
            return x[Math.floor(Math.random() * x.length)]
        }).join('');

        randPassword4 = Array(3).fill(pattern4).map(function (x) {
            return x[Math.floor(Math.random() * x.length)]
        }).join('');

        randPassword = randPassword1 + randPassword2 + randPassword3 + randPassword4;

        shuffled0 = randPassword.split('').sort(function () {
            return 0.5 - Math.random()
        }).join('');
        shuffled1 = shuffled0.split('').sort(function () {
            return 0.5 - Math.random()
        }).join('');

        return shuffled1;
    }

    getUserAgent() {
        const user_agent = Bowser.parse(window.navigator.userAgent);
        const browser = user_agent['browser'];
        const os = user_agent['os'];
        const platform = user_agent['platform'];
        return {"browser": browser, "os": os, "platform": platform}
    }

    getClientDatetime() {
        moment.locale(cookies.abBrowserLang);
        let now = moment();
        return {"now": now}
    }

    getDateTimeLLLL(data) {
        moment.locale(cookies.abBrowserLang);
        let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let created = moment.utc(data).format("YYYY-MM-DD HH:mm:ss.SSS");

        created = moment.tz(created, timeZone).format('LLLL');
        return created
    }

    getDateTimeLL(data) {
        moment.locale(cookies.abBrowserLang);
        let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let created = moment.utc(data).format("YYYY-MM-DD HH:mm:ss.SSS");

        created = moment.tz(created, timeZone).format('LL');
        return created
    }

    getDateTimeRelative(data) {
        moment.locale(cookies.abBrowserLang);
        let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let created = moment.utc(data).format("YYYY-MM-DD HH:mm:ss.SSS");

        created = moment.tz(created, timeZone).fromNow();
        return created
    }

    getChatRelativeTime(startTime, timeClass, timeOut) {
        return setInterval(function () {
            moment.locale(cookies.abBrowserLang);
            timeClass.html(moment(startTime).fromNow());
        }, timeOut);
    }

    getEuTaxNumberValidation(data) {
        let taxNumber;

        let hunTaxNumberPattern = new RegExp("([0-9]{8})-([12345])-([0-9]{2})");
        let result = data.match(hunTaxNumberPattern);

        if (result) {
            taxNumber = "hu" + result[1]
        } else {
            taxNumber = data;
        }

        let url = process.env.VATLAYER_API_URL + '/validate' + '?access_key=' + process.env.VATLAYER_API_KEY + '&vat_number=' + taxNumber;
        return axios.get(url)
            .then(response => {
                return response.data
            });
    }

    getFormatBytes(data) {
        let kb = 1024;
        let ndx = Math.floor(Math.log(data) / Math.log(kb));
        let fileSizeTypes = ["bytes", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"];

        return {
            size: +(data / kb / kb).toFixed(2),
            type: fileSizeTypes[ndx]
        };
    }

    getGenerateClass() {
        let r = Math.random().toString(36).substring(7);
        return "c" + r
    }

    getGenerateNumber() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    modalScrollBottom() {
        const $chatModal = $("#chatmodal");
        const $chatModalBody = $chatModal.find(".modal-body");
        $chatModal.animate({
            scrollTop: $chatModalBody.outerHeight() + 250
        }, 2000);
    }

    urlify(data) {
        let urlRegex = /(?:(?:(?:https?|ftp):\/\/)|ww)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?/gi;

        data = data.replace(urlRegex, function (url) {
            if (url.startsWith("www")) {
                url = "https://" + url;
            }
            return '<a target="_blank" href="' + url + '">' + url + '</a>';
        });

        data = data.replace(/([mailto:\w.\-pL]+@\w+.[\w.\-pL]+)/gi, '<a href=mailto:$1>$1</a>');

        return data
    }

    sendMessage(rClass, partner_online, start_time, msg) {
        let sendMessageData;
        let namespace = this.getSocketURL() + '/connect';
        $.ajax({
            type: "POST",
            url: "/_send-message",
            contentType: "application/json",
            data: JSON.stringify({
                "room": $("#messages input#room").val(),
                "from_username": $("#messages input#from_username").val(),
                "to_username": $("#messages input#to_username").val(),
                "partner_online": partner_online,
                "msg": msg
            }),
            cache: false,
            beforeSend: function (xhr) {
                const $messages = $("#chatmodal #messages");
                const $chatEmojiList = $messages.find("#chat-emoji-list-wrap");
                $chatEmojiList.removeClass("active").addClass("inactive");
            },
            success: function (result, status, xhr) {
                sendMessageData = result['message']
            },
            complete: function (xhr, status) {
                let statusCode = xhr['status'];

                if (statusCode === 200) {
                    let is_send_message = sendMessageData['is_send_message'];
                    // Start Socket

                    if (is_send_message === "True") {
                        let socket = io(namespace);

                        socket.emit('send_message', {
                            "room": $("#messages input#room").val(),
                            "from_username": $("#messages input#from_username").val(),
                            "to_username": $("#messages input#to_username").val(),
                            "partner_online": partner_online,
                            "created_at": start_time,
                            "message": sendMessageData['message'],
                            "message_id": sendMessageData['message_id'],
                            "sender_id": $("#messages input#sender_id").val(),
                            "host_id": $("#messages input#host_id").val(),
                        });
                        // End Socket

                        $(".data.host." + rClass + " .message .msg-action").attr({
                            "data-message_id": sendMessageData['message_id'],
                            "data-sender_id": sendMessageData['sender_id'],
                            "data-rclass": rClass
                        });

                        setTimeout(
                            function () {
                                $('.data.host[data-received="True"]').find(".message .is-received .received-true").removeClass("active").addClass("inactive");
                                $('.data.host[data-received="False"]').find(".message .is-received .received-false").removeClass("active").addClass("inactive");

                                $('.data.host[data-received="True"]').find(".message .is-received .received-true").last().removeClass("inactive").addClass("active");
                                $('.data.host[data-received="False"]').find(".message .is-received .received-false").last().removeClass("inactive").addClass("active");
                            }, 2000);
                    } else if (is_send_message === "False") {
                        $(".data.host." + rClass + " .message").css({"border-color": "red"});
                        $(".data.host." + rClass + " .message .msg").css({"color": "red"});
                        $(".data.host." + rClass + " .message .msg-action").detach();
                        $(".data.host." + rClass + " .message .msg").attr("data-i18n", "anlihouse-A443");
                        $('body').i18n();
                    }
                } else {
                }
            },
            error: function (xhr, status, error) {
            }
        });

    }

    heartEmpty() {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="" class="bi bi-heart" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>';
    }

    heartHalf() {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="" class="bi bi-heart-half" viewBox="0 0 16 16"><path d="M8 2.748v11.047c3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>';
    }

    heartFull() {
        return '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="" class="bi bi-heart-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>';
    }

    truncateStringMore(str, limit) {
        str = str.split(' ');
        let summ = 0
        for (let [index, value] of str.entries()) {
            summ += value.length
            if (summ > limit) {
                return str.slice(0, index).join(' ') + '...';
            }
        }
        return str.join(' ');
    }

}