import AnlibreedersUtility from './utilities/anlibreeders.utility'
import io from 'socket.io-client';
import {cookies} from "brownies";

const utility = new AnlibreedersUtility();

class AnlibreedersSocket {
    loadAnlibreedersSocket() {
        const loadSocket = {
            socketAB: function () {
                if (cookies.abToken != null) {

                    let namespace = utility.getSocketURL() + '/connect';
                    let socket = io(namespace);

                    // Start Connect
                    socket.on('connect', function () {
                        socket.emit('connect_user', {'token': cookies.abToken});
                    });
                    // End Connect

                    // Start send_message
                    socket.on("send_message", function (data) {
                        const $chatModal = $("#chatmodal");
                        const $chatModalBody = $chatModal.find(".modal-body");
                        const $messages = $chatModal.find("#messages .messages");
                        const message_id = data['message_id']

                        let room = $("#messages input#room").val();
                        let from_username = $("#messages input#from_username").val();
                        let to_username = $("#messages input#to_username").val();

                        if ($chatModal.hasClass("show") && from_username === data['to_username'] && to_username === data['from_username']) {
                            let ChatTimeSetTimeout = undefined;
                            let rClass = utility.getGenerateClass();

                            $messages.append(
                                '<div class="data sender ' + rClass + '" data-message_id="' + message_id + '">' +
                                '<div class="avatar-helper"></div>' +
                                '<div class="avatar">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>' +
                                '<div class="status ' + data['partner_online'] + '"></div>' +
                                '</div>' + // End avatar
                                '<div class="message">' +
                                '<span class="msg">' + utility.urlify(data['message'].replace(/\n/g, '<br />')) + '</span>' +
                                '<span class="time relative active pointer-events-none"></span>' +
                                '</div>' + // End message
                                '</div>' // End data sender
                            ).promise().done(function () {

                                if ($("." + rClass + " .msg img").length === 1) {
                                    $(".data." + rClass + " .message").addClass("chat-img");
                                }

                                const $typingActionsWrap = $("#typing-actions-wrap");
                                $typingActionsWrap.css({"visibility": "hidden"});

                                let start_time = utility.getClientDatetime().now.format();
                                setTimeout(
                                    function () {
                                        ChatTimeSetTimeout = utility.getChatRelativeTime(start_time, $('.data.sender.' + rClass + ' .time'), 10);
                                    }, 10);
                                utility.modalScrollBottom();

                                $(".sender .status").removeClass("online offline").addClass("online");

                                // if (data['partner_online'] === "online") {$(".sender .status").each(function () {$(this).removeClass("online offline").addClass("online");});}

                                function sendReceived() {
                                    let namespace = utility.getSocketURL() + '/connect';
                                    let socket = io(namespace);

                                    socket.emit('send_received', {
                                        "room": $("#messages input#room").val(),
                                        "from_username": $("#messages input#from_username").val(),
                                        "to_username": $("#messages input#to_username").val(),
                                    });
                                }

                                sendReceived();

                            });

                            // Start Received
                            $.ajax({
                                type: "POST",
                                url: "/_received",
                                contentType: "application/json",
                                data: JSON.stringify({"message_id": message_id}),
                                cache: false,
                                beforeSend: function (xhr) {
                                },
                                success: function (result, status, xhr) {
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
                            // End Received
                        } else {
                            // Start Bell Received
                            const $searchUserNotification = $("#search-user-notification");
                            let getUserData;
                            $.ajax({
                                type: "POST",
                                url: "/_get-user-data",
                                contentType: "application/json",
                                cache: false,
                                beforeSend: function (xhr) {
                                },
                                success: function (result, status, xhr) {
                                    getUserData = result['message']['payload']
                                },
                                complete: function (xhr, status) {
                                    let statusCode = xhr['status'];

                                    if (statusCode === 200) {
                                        let bellReceived = getUserData['messages_received']['received'];
                                        if (bellReceived === 0) {
                                            $("#search-user-notification .badge.bell").hide();
                                        } else {
                                            $searchUserNotification.find(".badge.bell").show();
                                            $searchUserNotification.find(".badge.bell").html(bellReceived);
                                        }

                                        $('body').i18n();
                                    } else {
                                    }
                                },
                                error: function (xhr, status, error) {
                                }
                            });
                            // End Bell Received

                            // Start Chat List Update
                            const $bell = $("#search-user-notification");

                            if ($bell.hasClass("success")) {
                                let senderId = data['sender_id'];
                                let hostId = data['host_id'];
                                let message = data['message'];
                                let created_at = data['created_at'];

                                const $notificationWrap = $("#notification-wrap #notification");
                                const $notificationContentList = $notificationWrap.find("#content-list");
                                const $notificationBox = $notificationWrap.find(".box");

                                let start_time = utility.getClientDatetime().now.format("YYYY-MM-DD HH:mm:ss.SSS");
                                let start_time_relative = utility.getDateTimeRelative(start_time);

                                let $is_img = $.parseHTML(message);

                                $notificationBox.each(function () {
                                    if ($('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').length !== 0) {

                                        $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg span").removeData("i18n");
                                        $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg span").attr("data-i18n", "");


                                        $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg span").html("");
                                        $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg span").detach();
                                        $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg").append('<span></span>');
                                        $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg span").html(message.replace(/(.{64})..+/, "$1…"));
                                        $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".time").attr("data-time-relative", utility.getClientDatetime().now.format());
                                        $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".time").html(start_time_relative);
                                        $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".status").removeClass("offline").addClass("online");

                                        $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".badge").detach();

                                        if ($is_img[0].nodeName === "IMG") {
                                            $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg span").text("");
                                            $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg span").attr("data-i18n", "anlihouse-A243");
                                        }

                                        $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".name").append(
                                            '<span class="badge text-bg-warning"><span data-i18n="anlihouse-A240"></span> <span class="count"></span></span>'
                                        ).promise().done(function () {
                                            $('body').i18n();

                                            let boxClone = $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').clone();
                                            $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').detach();
                                            $notificationContentList.prepend(boxClone);
                                        });


                                    }
                                    if ($('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').length !== 0) {

                                        $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".msg span").removeData("i18n");
                                        $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".msg span").attr("data-i18n", "");

                                        $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".msg span").html("");
                                        $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".msg span").detach();
                                        $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".msg").append('<span></span>');
                                        $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".msg span").html(message.replace(/(.{64})..+/, "$1…"));
                                        $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".time").attr("data-time-relative", utility.getClientDatetime().now.format());
                                        $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".time").html(start_time_relative);
                                        $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".status").removeClass("offline").addClass("online");

                                        $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".badge").detach();

                                        if ($is_img[0].nodeName === "IMG") {
                                            $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg span").text("");
                                            $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg span").attr("data-i18n", "anlihouse-A242");
                                        }

                                        $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".name").append(
                                            '<span class="badge text-bg-warning"><span data-i18n="anlihouse-A240"></span> <span class="count"></span></span>'
                                        ).promise().done(function () {
                                            $('body').i18n();

                                            let boxClone = $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').clone();
                                            $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').detach();
                                            $notificationContentList.prepend(boxClone);
                                        });
                                    }
                                });
                            }
                            // End Chat List Update
                        }
                    });
                    // End send_message

                    // Start Typing
                    socket.on("send_typing", function (data) {
                        const $chatModal = $("#chatmodal");

                        let room = $("#messages input#room").val();
                        let from_username = $("#messages input#from_username").val();
                        let to_username = $("#messages input#to_username").val();

                        if ($chatModal.hasClass("show") && from_username === data['to_username'] && to_username === data['from_username']) {
                            const $typingActionsWrap = $("#typing-actions-wrap");

                            $typingActionsWrap.css({"visibility": "visible"});

                            setTimeout(
                                function () {
                                    $typingActionsWrap.css({"visibility": "hidden"});
                                }, 3000);
                        }
                    });
                    // End Typing

                    // Start Send Received
                    socket.on("send_received", function (data) {
                        const $chatModal = $("#chatmodal");

                        let room = $("#messages input#room").val();
                        let from_username = $("#messages input#from_username").val();
                        let to_username = $("#messages input#to_username").val();

                        if ($chatModal.hasClass("show") && from_username === data['to_username'] && to_username === data['from_username']) {
                            setTimeout(
                                function () {

                                    $('.data.host[data-received="False"]').each(function () {
                                        $('.data.host[data-received="False"]').find(".message .is-received .received-false").removeClass("active").addClass("inactive");
                                        $('.data.host[data-received="False"]').attr("data-received", "True")
                                    });

                                    $('.data.host[data-received="True"]').find(".message .is-received .received-true").removeClass("active").addClass("inactive");
                                    $('.data.host[data-received="False"]').find(".message .is-received .received-false").removeClass("active").addClass("inactive");

                                    $('.data.host[data-received="True"]').find(".message .is-received .received-true").last().removeClass("inactive").addClass("active");
                                    $('.data.host[data-received="False"]').find(".message .is-received .received-false").last().removeClass("inactive").addClass("active");
                                }, 2000);
                        }
                    });
                    // End Send Received

                    // Start RM Message
                    socket.on("rm_message", function (data) {
                        const $chatModal = $("#chatmodal");
                        const $chatModalBody = $chatModal.find(".modal-body");
                        const $messages = $chatModal.find("#messages .messages");
                        const message_id = data['message_id']

                        let room = $("#messages input#room").val();
                        let from_username = $("#messages input#from_username").val();
                        let to_username = $("#messages input#to_username").val();

                        if ($chatModal.hasClass("show") && from_username === data['to_username'] && to_username === data['from_username']) {

                            $("#messages .data.sender[data-message_id='" + message_id + "']").addClass("rm-message");
                            $("#messages .data.sender[data-message_id='" + message_id + "']").find(".message").removeClass("chat-img");

                            $("#messages .data.sender[data-message_id='" + message_id + "']").find(".message .msg").removeData("i18n");
                            $("#messages .data.sender[data-message_id='" + message_id + "']").find(".message .msg").text("");
                            $("#messages .data.sender[data-message_id='" + message_id + "']").find(".message .msg").attr("data-i18n", "anlihouse-A245");
                            $('body').i18n();
                        }

                        const $bell = $("#search-user-notification");

                        if ($bell.hasClass("success")) {
                            let senderId = data['sender_id'];
                            let hostId = data['host_id'];
                            let message = data['message'];
                            let created_at = data['created_at'];

                            const $notificationWrap = $("#notification-wrap #notification");
                            const $notificationContentList = $notificationWrap.find("#content-list");
                            const $notificationBox = $notificationWrap.find(".box");

                            let start_time = utility.getClientDatetime().now.format("YYYY-MM-DD HH:mm:ss.SSS");
                            let start_time_relative = utility.getDateTimeRelative(start_time);

                            $notificationBox.each(function () {

                                if ($('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').length !== 0) {

                                    $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg span").removeData("i18n");
                                    $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg span").attr("data-i18n", "");


                                    $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg span").html("");
                                    $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg span").detach();
                                    $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg").append('<span></span>');
                                    $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".msg span").attr("data-i18n", "anlihouse-A245");
                                    $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".time").attr("data-time-relative", utility.getClientDatetime().now.format());
                                    $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".time").html(start_time_relative);
                                    $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".status").removeClass("offline").addClass("online");

                                    $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".badge").detach();

                                    $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').find(".name").append(
                                        '<span class="badge text-bg-warning"><span data-i18n="anlihouse-A240"></span> <span class="count"></span></span>'
                                    ).promise().done(function () {
                                        $('body').i18n();

                                        let boxClone = $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').clone();
                                        $('.box[data-sender_id="' + senderId + '"][data-host_id="' + hostId + '"]').detach();
                                        $notificationContentList.prepend(boxClone);
                                    });


                                }
                                if ($('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').length !== 0) {

                                    $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".msg span").removeData("i18n");
                                    $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".msg span").attr("data-i18n", "");

                                    $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".msg span").html("");
                                    $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".msg span").detach();
                                    $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".msg").append('<span></span>');
                                    $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".msg span").attr("data-i18n", "anlihouse-A245");
                                    $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".time").attr("data-time-relative", utility.getClientDatetime().now.format());
                                    $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".time").html(start_time_relative);
                                    $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".status").removeClass("offline").addClass("online");

                                    $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".badge").detach();

                                    $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').find(".name").append(
                                        '<span class="badge text-bg-warning"><span data-i18n="anlihouse-A240"></span> <span class="count"></span></span>'
                                    ).promise().done(function () {
                                        $('body').i18n();

                                        let boxClone = $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').clone();
                                        $('.box[data-sender_id="' + hostId + '"][data-host_id="' + senderId + '"]').detach();
                                        $notificationContentList.prepend(boxClone);
                                    });
                                }


                            });
                        }
                    });
                    // End RM Message

                    // Start chat_error_handler
                    socket.on("chat_error_handler", function (error) {
                        console.log(error)
                    });
                    // End chat_error_handler

                    // Start error_handler
                    socket.on("error_handler", function (error) {
                        console.log(error)
                    });
                    // End error_handler

                    // Start Video Logger Percentage
                    socket.on("video_logger", function (data) {
                        $("#uploading-animal-form .animal.video01.progress .progress-bar .file-percent").html(data['percentage'] + "%");
                        $("#uploading-animal-form .animal.video01.progress .progress-bar").css({"width": data['percentage'] + "%"});

                        if ($("#post-loader").hasClass("active")) {
                            $("#post-loader .post-loader-percent.video span.percent").html(data['percentage'] + "%");
                            setTimeout(
                                function () {
                                    $("#post-loader .post-loader-percent.video").addClass("d-block").removeClass("d-none");
                                }, 2000);
                            $("#uploading-animal-form .animal.video01.progress .progress-bar .file-percent").html(data['percentage'] + "%");
                            $("#uploading-animal-form .animal.video01.progress .progress-bar").css({"width": data['percentage'] + "%"});
                        }
                    });
                    // End Video Logger Percentage
                }
            },

            initializ: function () {
                loadSocket.socketAB()
            }

        };

        $(function () {
            loadSocket.initializ()
        });
    }
}

export let anlibreedersSocket = new AnlibreedersSocket();