import AnlibreedersUtility from './utilities/anlibreeders.utility'
import io from 'socket.io-client';
import {local, session, cookies} from 'brownies';
import autosize from "autosize/dist/autosize";
import PerfectScrollbar from "perfect-scrollbar";
import numbro from "numbro";

const utility = new AnlibreedersUtility();

class AnlibreedersNotification {
    loadAnlibreedersNotification() {
        const loadNotification = {

            toast: function () {

                /*
                $.toast({
                    heading: 'Infó',
                    text: 'Lorem ipsum dolor sit amet!',
                    icon: 'info',
                    loader: true,
                    loaderBg: '#4c6180',
                    bgColor: '#ffffff',
                    textColor: '#4c6180',
                    position: 'top-right',
                    hideAfter: 5000, // 5000
                });

                $.toast({
                    heading: 'Hiba',
                    text: 'Lorem ipsum dolor sit amet!',
                    icon: 'error',
                    loader: true,
                    loaderBg: '#ffffff',
                    bgColor: '##b50b1b',
                    textColor: '#ffffff',
                    position: 'top-right',
                    hideAfter: 5000, // 5000
                });
                */

            },

            chatList: function () {
                const $bell = $("#search-user-notification");
                const $notification = $("#notification");
                const $loader = $notification.find(".loader-wrap");
                const $notificationContainer = $notification.find("#notification-container");
                const $contentList = $notificationContainer.find("#content-list");
                const $chatListAdditional = $notification.find("#chat-list-additional");

                $bell.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    try {
                        $("#notification-wrap #notification .ps__rail-x").each(function () {
                            $(this).detach();
                        });

                        $("#notification-wrap #notification .ps__rail-y").each(function () {
                            $(this).detach();
                        });
                    } catch (error) {
                        // console.error(error);
                    }

                    $notificationContainer.find(".dropdown-menu.settings-ul .dropdown-item.archive-chat-list-link").detach();
                    $notificationContainer.find(".dropdown-menu.settings-ul .dropdown-item.active-chat-list-link").detach();
                    $notificationContainer.find(".dropdown-menu.settings-ul").append(
                        '<li class="dropdown-item archive-chat-list-link" data-i18n="anlihouse-A404"></li>'
                    );
                    $('body').i18n();

                    const notification_content = document.querySelector('#notification', {});
                    let ps_notification = new PerfectScrollbar(notification_content, {});

                    $contentList.html("");
                    $notificationContainer.addClass("d-none");

                    $chatListAdditional.show();

                    if (_this.hasClass("closed") && !_this.hasClass("action")) {
                        _this.addClass("action");

                        const $bell = $("#search-user-notification");
                        utility.notificationOpen();
                        // Start AJAX
                        let messagesList;
                        cookies.abChatListPageNumberStart = 0;
                        cookies.abChatListPageNumberStop = 1;
                        $.ajax({
                            type: "POST",
                            url: "/_chat-list",
                            contentType: "application/json",
                            data: JSON.stringify({
                                "page_number_start": cookies.abChatListPageNumberStart,
                                "page_number_stop": cookies.abChatListPageNumberStop
                            }),
                            cache: false,
                            beforeSend: function (xhr) {
                            },
                            success: function (result, status, xhr) {
                                messagesList = result['message']['data']['messages_list'];
                            },
                            complete: function (xhr, status) {
                                if (status === "success") {

                                    cookies.abChatListPageNumberStart += 1;
                                    cookies.abChatListPageNumberStop += 1;

                                    $.each(messagesList, function (index) {
                                        let room = messagesList[index]['room'];
                                        let partner_online = messagesList[index]['partner_online'];
                                        let from_username = messagesList[index]['from_username'];
                                        let to_username = messagesList[index]['to_username'];
                                        let title_name = messagesList[index]['title_name'];
                                        let message_id = messagesList[index]['message_id'];
                                        let sender_id = messagesList[index]['sender_id'];
                                        let sender_first_name = messagesList[index]['sender_first_name'];
                                        let sender_last_name = messagesList[index]['sender_last_name'];
                                        let sender_online = messagesList[index]['sender_online'];
                                        let sender_assistant = messagesList[index]['sender_assistant'];
                                        let host_id = messagesList[index]['host_id'];
                                        let host_first_name = messagesList[index]['host_first_name'];
                                        let host_last_name = messagesList[index]['host_last_name'];
                                        let host_online = messagesList[index]['host_online'];
                                        let message = messagesList[index]['message'];
                                        let received = messagesList[index]['received'];
                                        let received_count = messagesList[index]['received_count'];
                                        let sender_you = messagesList[index]['sender_you'];
                                        let is_sender_worker = messagesList[index]['is_sender_worker'];
                                        let is_host_worker = messagesList[index]['is_host_worker'];
                                        let created_at = messagesList[index]['created_at'];
                                        let updated_at = messagesList[index]['updated_at'];

                                        if (partner_online === "True") {
                                            partner_online = "online"
                                        } else {
                                            partner_online = "offline"
                                        }

                                        let youWrap;
                                        let receivedWrap = "";
                                        let archiveSenderId;
                                        let archiveHostId;
                                        if (sender_you === "True") {
                                            youWrap = '<span data-i18n="anlihouse-A239"></span> ';
                                            archiveSenderId = sender_id;
                                            archiveHostId = host_id;
                                        } else {
                                            youWrap = ""
                                            if (received_count !== 0) {
                                                receivedWrap = '<span class="badge text-bg-warning"><span data-i18n="anlihouse-A234"></span> <span class="count">' + received_count + '</span></span>';
                                            } else {
                                                receivedWrap = ""
                                            }
                                            archiveSenderId = host_id;
                                            archiveHostId = sender_id;
                                        }

                                        let $is_img = $.parseHTML(messagesList[index]['message']);
                                        if ($is_img[0].nodeName === "IMG") {
                                            sender_assistant = "True";
                                            if (sender_you === "True") {
                                                message = "anlihouse-A242"
                                            } else {
                                                message = "anlihouse-A243"
                                            }
                                        }

                                        let msg;
                                        if (sender_assistant === "True") {
                                            msg = '<span class="msg">' +
                                                youWrap +
                                                '<span data-i18n="' + message.replace(/(.{64})..+/, "$1…") + '"></span>' +
                                                '</span>' // End msg
                                        } else {
                                            msg = '<span class="msg">' +
                                                youWrap +
                                                '<span>' + message.replace(/(.{64})..+/, "$1…") + '</span>' +
                                                '</span>' // End msg
                                        }

                                        let support = '';
                                        if (sender_you === "False" && is_sender_worker === "True") {
                                            support = ' <span style="font-size:10px;" data-i18n="anlihouse-A444"></span>'
                                        }

                                        if (sender_you === "True" && is_host_worker === "True") {
                                            support = ' <span style="font-size:10px;" data-i18n="anlihouse-A444"></span>'
                                        }

                                        let rClass = utility.getGenerateClass();

                                        $contentList.append(
                                            '<div class="box ' + rClass + '" data-message_id="' + message_id + '" data-sender_id="' + sender_id + '" data-host_id="' + host_id + '">' +
                                            '<div class="avatar">' +
                                            '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>' +
                                            '<div class="status ' + partner_online + '"></div>' +
                                            '<div class="chat-list-action" data-bs-toggle="dropdown">' +
                                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16"><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>' +
                                            '</div>' + // End chat-list-action
                                            '<ul class="dropdown-menu shadow">' +
                                            '<li class="dropdown-item chat-list-archive" data-sender_id="' + archiveSenderId + '" data-host_id="' + archiveHostId + '" data-action_type="true" data-i18n="anlihouse-A402">Archive</li>' +
                                            '</ul>' + // End dropdown-menu
                                            '</div>' + // End avatar
                                            '<div class="name">' +
                                            '<span>' + title_name + '</span>' + support +
                                            receivedWrap +
                                            '</div>' + // End name
                                            '<div class="message">' +
                                            msg +
                                            '<span class="time" data-time-relative="' + created_at + '">' + utility.getDateTimeRelative(created_at) + '</span>' +
                                            '</div>' + // End message
                                            '</div>' // End box
                                        ).promise().done(function () {
                                            $('body').i18n();
                                        });
                                    });

                                    setTimeout(
                                        function () {
                                            $notificationContainer.find("#head #title").removeData("i18n");
                                            $notificationContainer.find("#head #title").text("");
                                            $notificationContainer.find("#head #title").attr("data-i18n", "anlihouse-A233");
                                            $('body').i18n();

                                            $loader.removeClass("open").addClass("closed");
                                            $notificationContainer.removeClass("d-none");
                                        }, 10);

                                    _this.removeClass("action");
                                }

                                $bell.addClass("success");
                            },
                            error: function (xhr, status, error) {
                            }
                        });
                        // End AJAX
                    } else {
                        if (!_this.hasClass("action")) {
                            utility.notificationClosed();
                        }
                    }
                });

                $(document).on('click', function (event) {
                    if (!$("#search-user-notification").hasClass("action")) {
                        utility.notificationClosed();
                    }
                });

                $("#notification, #search-user-notification").on('click', function (event) {
                    event.stopPropagation();
                });
            },

            archiveChatList: function () {
                const $bell = $("#search-user-notification");
                const $notification = $("#notification");
                const $loader = $notification.find(".loader-wrap");
                const $notificationContainer = $notification.find("#notification-container");
                const $contentList = $notificationContainer.find("#content-list");
                const $chatListAdditional = $notification.find("#chat-list-additional");

                const $archiveChatListLink = $notificationContainer.find(".dropdown-item.archive-chat-list-link");

                $("#notification-container").on("click", ".dropdown-item.archive-chat-list-link", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    try {
                        $("#notification-wrap #notification .ps__rail-x").each(function () {
                            $(this).detach();
                        });

                        $("#notification-wrap #notification .ps__rail-y").each(function () {
                            $(this).detach();
                        });
                    } catch (error) {
                        // console.error(error);
                    }

                    // Start AJAX
                    let messagesList;
                    cookies.abChatListPageNumberStart = 0;
                    cookies.abChatListPageNumberStop = 1;
                    $.ajax({
                        type: "POST",
                        url: "/_archive-chat-list",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "page_number_start": cookies.abChatListPageNumberStart,
                            "page_number_stop": cookies.abChatListPageNumberStop
                        }),
                        cache: false,
                        beforeSend: function (xhr) {
                        },
                        success: function (result, status, xhr) {
                            messagesList = result['message']['data']['messages_list'];
                        },
                        complete: function (xhr, status) {
                            if (status === "success") {

                                if (messagesList.length !== 0) {
                                    $notificationContainer.find("#settings").trigger("click");

                                    $contentList.html("");
                                    $notificationContainer.addClass("d-none");

                                    $chatListAdditional.show();

                                    utility.notificationOpen();

                                    cookies.abChatListPageNumberStart += 1;
                                    cookies.abChatListPageNumberStop += 1;

                                    $.each(messagesList, function (index) {
                                        let room = messagesList[index]['room'];
                                        let partner_online = messagesList[index]['partner_online'];
                                        let from_username = messagesList[index]['from_username'];
                                        let to_username = messagesList[index]['to_username'];
                                        let title_name = messagesList[index]['title_name'];
                                        let message_id = messagesList[index]['message_id'];
                                        let sender_id = messagesList[index]['sender_id'];
                                        let sender_first_name = messagesList[index]['sender_first_name'];
                                        let sender_last_name = messagesList[index]['sender_last_name'];
                                        let sender_online = messagesList[index]['sender_online'];
                                        let sender_assistant = messagesList[index]['sender_assistant'];
                                        let host_id = messagesList[index]['host_id'];
                                        let host_first_name = messagesList[index]['host_first_name'];
                                        let host_last_name = messagesList[index]['host_last_name'];
                                        let host_online = messagesList[index]['host_online'];
                                        let message = messagesList[index]['message'];
                                        let received = messagesList[index]['received'];
                                        let received_count = messagesList[index]['received_count'];
                                        let sender_you = messagesList[index]['sender_you'];
                                        let created_at = messagesList[index]['created_at'];
                                        let updated_at = messagesList[index]['updated_at'];

                                        if (partner_online === "True") {
                                            partner_online = "online"
                                        } else {
                                            partner_online = "offline"
                                        }

                                        let youWrap;
                                        let receivedWrap = "";
                                        let archiveSenderId;
                                        let archiveHostId;
                                        if (sender_you === "True") {
                                            youWrap = '<span data-i18n="anlihouse-A239"></span> ';
                                            archiveSenderId = sender_id;
                                            archiveHostId = host_id;
                                        } else {
                                            youWrap = ""
                                            if (received_count !== 0) {
                                                receivedWrap = '<span class="badge text-bg-warning"><span data-i18n="anlihouse-A234"></span> <span class="count">' + received_count + '</span></span>';
                                            } else {
                                                receivedWrap = ""
                                            }
                                            archiveSenderId = host_id;
                                            archiveHostId = sender_id;
                                        }

                                        let $is_img = $.parseHTML(messagesList[index]['message']);
                                        if ($is_img[0].nodeName === "IMG") {
                                            sender_assistant = "True";
                                            if (sender_you === "True") {
                                                message = "anlihouse-A242"
                                            } else {
                                                message = "anlihouse-A243"
                                            }
                                        }

                                        let msg;
                                        if (sender_assistant === "True") {
                                            msg = '<span class="msg">' +
                                                youWrap +
                                                '<span data-i18n="' + message.replace(/(.{64})..+/, "$1…") + '"></span>' +
                                                '</span>' // End msg
                                        } else {
                                            msg = '<span class="msg">' +
                                                youWrap +
                                                '<span>' + message.replace(/(.{64})..+/, "$1…") + '</span>' +
                                                '</span>' // End msg
                                        }

                                        let rClass = utility.getGenerateClass();

                                        $contentList.append(
                                            '<div class="box ' + rClass + '" data-message_id="' + message_id + '" data-sender_id="' + sender_id + '" data-host_id="' + host_id + '">' +
                                            '<div class="avatar">' +
                                            '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>' +
                                            '<div class="status ' + partner_online + '"></div>' +
                                            '<div class="chat-list-action" data-bs-toggle="dropdown">' +
                                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16"><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>' +
                                            '</div>' + // End chat-list-action
                                            '<ul class="dropdown-menu shadow">' +
                                            '<li class="dropdown-item chat-list-archive" data-sender_id="' + archiveSenderId + '" data-host_id="' + archiveHostId + '" data-action_type="false" data-i18n="anlihouse-A406">Archive</li>' +
                                            '</ul>' + // End dropdown-menu
                                            '</div>' + // End avatar
                                            '<div class="name">' +
                                            '<span>' + title_name + '</span>' +
                                            receivedWrap +
                                            '</div>' + // End name
                                            '<div class="message">' +
                                            msg +
                                            '<span class="time" data-time-relative="' + created_at + '">' + utility.getDateTimeRelative(created_at) + '</span>' +
                                            '</div>' + // End message
                                            '</div>' // End box
                                        ).promise().done(function () {
                                            $('body').i18n();
                                        });
                                    });

                                    setTimeout(
                                        function () {
                                            $notificationContainer.find("#head #title").removeData("i18n");
                                            $notificationContainer.find("#head #title").text("");
                                            $notificationContainer.find("#head #title").attr("data-i18n", "anlihouse-A404");

                                            $notificationContainer.find(".dropdown-menu.settings-ul .dropdown-item.archive-chat-list-link").detach();
                                            $notificationContainer.find(".dropdown-menu.settings-ul .dropdown-item.active-chat-list-link").detach();
                                            $notificationContainer.find(".dropdown-menu.settings-ul").append(
                                                '<li class="dropdown-item active-chat-list-link" data-i18n="anlihouse-A405"></li>'
                                            );
                                            $('body').i18n();

                                            $loader.removeClass("open").addClass("closed");
                                            $notificationContainer.removeClass("d-none");
                                        }, 10);

                                    _this.removeClass("action");
                                } else {
                                    $notificationContainer.find("#settings").trigger("click");

                                    $.toast({
                                        heading: 'Infó',
                                        text: 'Jelenleg nincs archivált beszélgetésed.',
                                        icon: 'info',
                                        loader: true,
                                        loaderBg: '#4c6180',
                                        bgColor: '#ffffff',
                                        textColor: '#4c6180',
                                        position: 'top-right',
                                        hideAfter: 5000, // 5000
                                    });
                                }
                            }

                            $bell.addClass("success");
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                    // End AJAX
                });

                $("#notification-container").on("click", ".dropdown-item.active-chat-list-link", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $notificationContainer.find("#settings").trigger("click");
                    $bell.trigger("click");
                    setTimeout(
                        function () {
                            $bell.trigger("click");
                        }, 100);

                    $notificationContainer.find(".dropdown-menu.settings-ul .dropdown-item.active-chat-list-link").detach();
                });

                $(document).on('click', function (event) {
                    if (!$("#search-user-notification").hasClass("action")) {
                        utility.notificationClosed();
                    }
                });

                $("#notification, #search-user-notification").on('click', function (event) {
                    event.stopPropagation();
                });
            },

            chatModal: function () {
                const $notification = $("#notification");

                const $chatModal = $("#chatmodal");
                const $chatModalBody = $chatModal.find(".modal-body");
                const $messages = $chatModal.find("#messages .messages");
                const $titleName = $chatModal.find(".chat-modal-title-name");

                const $typingActionsWrap = $("#typing-actions-wrap");
                const $chatInputGroup = $(".chat-input-group");
                const $loader = $chatModalBody.find(".loader-wrap");

                function chatModalRun(_this) {
                    $loader.removeClass("closed").addClass("open");

                    $messages.html("");
                    autosize($("#messages .chat-input-group #chat-input"));
                    $typingActionsWrap.hide();
                    $chatInputGroup.hide();

                    let dataMessageId = _this.attr("data-message_id");
                    let dataSenderId = _this.attr("data-sender_id");
                    let dataHostId = _this.attr("data-host_id");
                    let dataMessage = _this.attr("data-message");
                    let dataRclass = _this.attr("data-rclass");

                    $titleName.text("");

                    $chatModal.modal('show');

                    // Start AJAX
                    let messagesListRoom;
                    $.ajax({
                        type: "POST",
                        url: "/_chat-modal",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "message_id": dataMessageId,
                            "sender_id": dataSenderId,
                            "host_id": dataHostId
                        }),
                        cache: false,
                        beforeSend: function (xhr) {
                            utility.notificationClosed();
                        },
                        success: function (result, status, xhr) {
                            messagesListRoom = result['message'];
                            $loader.removeClass("open").addClass("closed");
                        },
                        complete: function (xhr, status) {
                            if (status === "success") {

                                let partner_online;
                                let from_username;
                                let to_username;
                                let sender_id;
                                let host_id;
                                let received_count;

                                let msgCount = messagesListRoom['data'].length;

                                $.each(messagesListRoom['data'], function (index) {
                                    let room = messagesListRoom['data'][index]['room'];
                                    partner_online = messagesListRoom['data'][index]['partner_online'];
                                    from_username = messagesListRoom['data'][index]['from_username'];
                                    to_username = messagesListRoom['data'][index]['to_username'];
                                    let title_name = messagesListRoom['data'][index]['title_name'];
                                    let message_id = messagesListRoom['data'][index]['message_id'];
                                    sender_id = messagesListRoom['data'][index]['sender_id'];
                                    let sender_first_name = messagesListRoom['data'][index]['sender_first_name'];
                                    let sender_last_name = messagesListRoom['data'][index]['sender_last_name'];
                                    let sender_online = messagesListRoom['data'][index]['sender_online'];
                                    let sender_assistant = messagesListRoom['data'][index]['sender_assistant'];
                                    host_id = messagesListRoom['data'][index]['host_id'];
                                    let host_first_name = messagesListRoom['data'][index]['host_first_name'];
                                    let host_last_name = messagesListRoom['data'][index]['host_last_name'];
                                    let host_online = messagesListRoom['data'][index]['host_online'];
                                    let message = messagesListRoom['data'][index]['message'];
                                    let received = messagesListRoom['data'][index]['received'];
                                    received_count = messagesListRoom['data'][index]['received_count'];
                                    let sender_you = messagesListRoom['data'][index]['sender_you'];
                                    let created_at = messagesListRoom['data'][index]['created_at'];
                                    let updated_at = messagesListRoom['data'][index]['updated_at'];

                                    $titleName.text(title_name);

                                    $("#messages input#room").val(to_username);
                                    $("#messages input#from_username").val(from_username);
                                    $("#messages input#to_username").val(to_username);
                                    $("#messages input#sender_id").val(sender_id);
                                    $("#messages input#host_id").val(host_id);

                                    let rClass = utility.getGenerateClass();

                                    if (partner_online === "True") {
                                        partner_online = "online"
                                    } else {
                                        partner_online = "offline"
                                    }

                                    let msgType;
                                    let avatar;
                                    if (sender_you === "True") {
                                        msgType = "host";
                                        avatar = "";
                                    } else {
                                        msgType = "sender";
                                        if (to_username !== sender_first_name) {
                                            avatar = '<a class="avatar" href="' + utility.getURL() + '/list/' + sender_first_name.toLowerCase() + '/' + sender_id + '" target="_blank">' +
                                                '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>' +
                                                '<div class="status ' + partner_online + '"></div>' +
                                                '</a>';
                                        } else {
                                            avatar = '<a class="avatar" style="cursor:default">' +
                                                '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>' +
                                                '<div class="status ' + partner_online + '"></div>' +
                                                '</a>';
                                        }
                                    }

                                    let msg;
                                    if (sender_assistant === "True") {
                                        msg = '<span class="msg" data-i18n="' + message + '"></span>'
                                    } else {
                                        msg = '<span class="msg">' + message + '</span>'
                                    }

                                    let avatarHelper = "";
                                    let msgAction = "";
                                    let msgActionDropdown = "";
                                    let isReceived = "";
                                    if (msgType === "sender") {
                                        avatarHelper = '<div class="avatar-helper"></div>';
                                    } else {
                                        msgAction = '<div class="msg-action" data-message_id="' + message_id + '" data-sender_id="' + sender_id + '" data-rclass="' + rClass + '" data-bs-toggle="dropdown" aria-expanded="false"><span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg></span></div>';
                                        msgActionDropdown = '<ul class="dropdown-menu"><li class="rm-message" data-message_id="" data-sender_id="" data-rclass="" style="cursor:pointer;"><span class="dropdown-item" data-i18n="anlihouse-A244"></span></li></ul>';
                                        isReceived = '<span class="is-received">' +
                                            '<div class="received-true inactive">' +
                                            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16"><path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/></svg>' +
                                            '</div>' + // End received-true
                                            '<div class="received-false inactive">' +
                                            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>' +
                                            '</div>' +
                                            '</span>'
                                    }

                                    $messages.append(
                                        '<div class="data ' + msgType + " " + rClass + '" data-message_id="' + message_id + '" data-received="' + received + '">' +
                                        avatarHelper +
                                        avatar +
                                        '<div class="message">' +
                                        '<div id="msg-action-wrap">' +
                                        msgAction +
                                        msgActionDropdown +
                                        '</div>' +
                                        utility.urlify(msg.replace(/\n/g, '<br />')) +
                                        '<span class="time relative active" data-time-relative="' + created_at + '">' + utility.getDateTimeRelative(created_at) + '</span>' +
                                        '<span class="time absolute inactive" data-time-llll="' + created_at + '">' + utility.getDateTimeLLLL(created_at) + '</span>' +
                                        isReceived +
                                        '</div>' + // End message
                                        '</div>' // End data
                                    ).promise().done(function () {
                                        if ($("." + rClass + " .msg img").length === 1) {
                                            $(".data." + rClass + " .message").addClass("chat-img");
                                        }

                                        $typingActionsWrap.show();
                                        $chatInputGroup.show();

                                        $("." + rClass + " .time.relative").on("click", function () {
                                            $(this).removeClass("active").addClass("inactive");
                                            $(this).next(".time.absolute").removeClass("inactive").addClass("active");
                                        });

                                        $("." + rClass + " .time.absolute").on("click", function () {
                                            $(this).removeClass("active").addClass("inactive");
                                            $(this).prev(".time.relative").removeClass("inactive").addClass("active");
                                        });

                                        if (message === "anlihouse-A245") {
                                            $(".data." + rClass + " .msg-action").detach();
                                            $(".data." + rClass + "").addClass("rm-message");
                                        }

                                        if (message === process.env.USER_TO_USER_FIRST_MESSAGE) {
                                            $(".data." + rClass + "").detach();
                                            $("body").find(".user-to-user-message").detach();
                                        }

                                        $('.data.host[data-received="True"]').find(".message .is-received .received-true").removeClass("active").addClass("inactive");
                                        $('.data.host[data-received="False"]').find(".message .is-received .received-false").removeClass("active").addClass("inactive");
                                        setTimeout(
                                            function () {
                                                $('.data.host[data-received="True"]').find(".message .is-received .received-true").last().removeClass("inactive").addClass("active");
                                                $('.data.host[data-received="False"]').find(".message .is-received .received-false").last().removeClass("inactive").addClass("active");
                                            }, 2000);

                                        // Start Each End
                                        if (!--msgCount) {
                                            $(
                                                '<div class="received-wrap">' +
                                                '<div class="line"></div>' +
                                                '<div class="false-received" data-i18n="anlihouse-A246"></div>' +
                                                '<div class="line"></div>' +
                                                '</div>'
                                            ).insertBefore($('.data.sender[data-received="False"]').eq(0));

                                            sendReceived();
                                        }
                                        // End Each End

                                    });
                                });

                                // Start MSG Action
                                $("body").on("click", ".msg-action", function (event) {
                                    event.preventDefault();
                                    const _this = $(this);

                                    let messageId = _this.attr("data-message_id");
                                    let senderId = _this.attr("data-sender_id");
                                    let rClass = _this.attr("data-rclass");

                                    _this.next("ul").find("li.rm-message").attr({
                                        "data-message_id": messageId,
                                        "data-sender_id": senderId,
                                        "data-rclass": rClass
                                    });
                                });

                                $("body").on("click", "ul li.rm-message", function (event) {
                                    event.preventDefault();
                                    const _this = $(this);

                                    let dataMessageId = _this.attr("data-message_id");
                                    let dataSenderId = _this.attr("data-sender_id");
                                    let dataRclass = _this.attr("data-rclass");

                                    let rm_img = "False";

                                    let $is_img = $.parseHTML($(".data." + dataRclass + " .message .msg").html());
                                    if ($is_img[0].nodeName === "IMG") {
                                        rm_img = $(".data." + dataRclass + " .message .msg img").attr("src");
                                    }

                                    let rmMessageData;
                                    $.ajax({
                                        type: "POST",
                                        url: "/_rm-message",
                                        contentType: "application/json",
                                        data: JSON.stringify({
                                            "message_id": dataMessageId,
                                            "sender_id": dataSenderId,
                                            "rm_img": rm_img
                                        }),
                                        cache: false,
                                        beforeSend: function (xhr) {
                                        },
                                        success: function (result, status, xhr) {
                                            rmMessageData = result['message']
                                        },
                                        complete: function (xhr, status) {
                                            let statusCode = xhr['status'];

                                            if (statusCode === 200) {
                                                $(".data." + dataRclass + " .msg-action").detach();
                                                $(".data." + dataRclass + "").addClass("rm-message");
                                                $(".data." + dataRclass + " .message").removeClass("chat-img");

                                                $(".data." + dataRclass + " .message .msg").removeData("i18n");
                                                $(".data." + dataRclass + " .message .msg").text("");
                                                $(".data." + dataRclass + " .message .msg").attr("data-i18n", "anlihouse-A245");
                                                $('body').i18n();

                                                _this.attr({
                                                    "data-message_id": "",
                                                    "data-sender_id": "",
                                                    "data-rclass": ""
                                                });

                                                let namespace = utility.getSocketURL() + '/connect';
                                                let socket = io(namespace);

                                                socket.emit('rm_message', {
                                                    "room": $("#messages input#room").val(),
                                                    "from_username": $("#messages input#from_username").val(),
                                                    "to_username": $("#messages input#to_username").val(),
                                                    "message_id": rmMessageData['message_id'],
                                                    "sender_id": $("#messages input#sender_id").val(),
                                                    "host_id": $("#messages input#host_id").val(),
                                                });
                                            }
                                        },
                                        error: function (xhr, status, error) {
                                        }
                                    });
                                });
                                // End MSG Action

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

                                // Start Scroll Bottom
                                Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => {
                                    img.onload = img.onerror = resolve;
                                }))).then(() => {
                                    setTimeout(
                                        function () {
                                            $chatModal.animate({
                                                scrollTop: $chatModalBody.outerHeight() + 250
                                            });
                                        }, 1200);
                                });
                                // End Scroll Bottom

                                setTimeout(
                                    function () {
                                        $("#messages .chat-input-group #chat-input").focus();
                                    }, 1500);

                                // Start Chat Input
                                const $messageChatInput = $("#messages .chat-input-group #chat-input");
                                const $messageChatInputButton = $("#messages .chat-input-group .chat-input-btn");

                                let ChatTimeSetTimeout = undefined;

                                $messageChatInput.on("keypress", function (event) {
                                    const _this = $(this);
                                    let rClass = utility.getGenerateClass();
                                    let msg = _this.val();

                                    if (event.key === "Enter" && !event.shiftKey) {
                                        if (msg !== '' && msg.trim().length !== 0) {
                                            event.preventDefault();
                                            _this.val("");
                                            _this.css({"height": "40px"});

                                            $messages.append(
                                                '<div class="data host ' + rClass + '" data-received="False">' +
                                                '<div class="message">' +
                                                '<div id="msg-action-wrap">' +
                                                '<div class="msg-action" data-message_id="" data-sender_id="" data-rclass="" data-bs-toggle="dropdown" aria-expanded="false"><span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg></span></div>' +
                                                '<ul class="dropdown-menu"><li class="rm-message" data-message_id="" data-sender_id="" data-rclass="" style="cursor:pointer;"><span class="dropdown-item" data-i18n="anlihouse-A244"></span></li></ul>' +
                                                '</div>' +
                                                '<div class="msg">' + utility.urlify(msg.replace(/\n/g, '<br />')) +
                                                '</div>' +
                                                '<span class="time relative active pointer-events-none"></span>' +
                                                '<span class="is-received">' +
                                                '<div class="received-true inactive">' +
                                                '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16"><path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/></svg>' +
                                                '</div>' + // End received-true
                                                '<div class="received-false inactive">' +
                                                '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>' +
                                                '</div>' +
                                                '</span>' + // End is-received
                                                '</div>' + // End message
                                                '</div>' // End data
                                            ).promise().done(function () {
                                                let start_time = utility.getClientDatetime().now.format();
                                                setTimeout(
                                                    function () {
                                                        ChatTimeSetTimeout = utility.getChatRelativeTime(start_time, $('.data.host.' + rClass + ' .time'), 10);
                                                    }, 10);
                                                utility.modalScrollBottom();

                                                // Start Send Message
                                                utility.sendMessage(rClass, partner_online, start_time, msg)
                                                // End Send Message
                                                $('body').i18n();
                                            });
                                        } else {
                                            event.preventDefault();
                                        }
                                    }
                                });

                                $messageChatInputButton.on("click", function (event) {
                                    const _this = $messageChatInput;
                                    let rClass = utility.getGenerateClass();
                                    let msg = _this.val();

                                    if (msg !== '') {
                                        event.preventDefault();
                                        _this.val("");
                                        _this.css({"height": "40px"});

                                        $messages.append(
                                            '<div class="data host ' + rClass + '" data-received="False">' +
                                            '<div class="message">' +
                                            '<div id="msg-action-wrap">' +
                                            '<div class="msg-action" data-message_id="" data-sender_id="" data-rclass="" data-bs-toggle="dropdown" aria-expanded="false"><span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg></span></div>' +
                                            '<ul class="dropdown-menu"><li class="rm-message" data-message_id="" data-sender_id="" data-rclass="" style="cursor:pointer;"><span class="dropdown-item" data-i18n="anlihouse-A244"></span></li></ul>' +
                                            '</div>' +
                                            '<div class="msg">' + utility.urlify(msg.replace(/\n/g, '<br />')) +
                                            '</div>' +
                                            '<span class="time relative active pointer-events-none"></span>' +
                                            '<span class="is-received">' +
                                            '<div class="received-true inactive">' +
                                            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16"><path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/></svg>' +
                                            '</div>' + // End received-true
                                            '<div class="received-false inactive">' +
                                            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>' +
                                            '</div>' +
                                            '</span>' + // End is-received
                                            '</div>' + // End message
                                            '</div>' // End data
                                        ).promise().done(function () {
                                            let start_time = utility.getClientDatetime().now.format();
                                            setTimeout(
                                                function () {
                                                    ChatTimeSetTimeout = utility.getChatRelativeTime(start_time, $('.data.host.' + rClass + ' .time'), 10);
                                                }, 10);
                                            utility.modalScrollBottom();

                                            // Start Send Message
                                            utility.sendMessage(rClass, partner_online, start_time, msg)
                                            // End Send Message
                                            $('body').i18n();
                                        });
                                    }
                                });
                                // End Chat Input

                                // Start Typing
                                function sendTyping() {
                                    let namespace = utility.getSocketURL() + '/connect';
                                    let socket = io(namespace);

                                    let typeRun = true
                                    $messageChatInput.on("keyup", function (event) {
                                        if (event.key !== "Enter" && !event.shiftKey) {

                                            if (typeRun === true) {
                                                socket.emit('send_typing', {
                                                    "room": $("#messages input#room").val(),
                                                    "from_username": $("#messages input#from_username").val(),
                                                    "to_username": $("#messages input#to_username").val(),
                                                });
                                                typeRun = false
                                            }

                                            setTimeout(
                                                function () {
                                                    typeRun = true
                                                }, 3000);

                                        }
                                    });
                                }

                                sendTyping()

                                // End Typing

                                // Start Send Received
                                function sendReceived() {
                                    let namespace = utility.getSocketURL() + '/connect';
                                    let socket = io(namespace);

                                    socket.emit('send_received', {
                                        "room": $("#messages input#room").val(),
                                        "from_username": $("#messages input#from_username").val(),
                                        "to_username": $("#messages input#to_username").val(),
                                    });
                                }

                                // End Send Received
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                    // End AJAX
                }

                $("#notification").on("click", ".box", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    chatModalRun(_this);
                });

                $("body").on("click", ".user-to-user-message .box", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    chatModalRun(_this);
                });

                $("#full-action-wrap").on("click", "#action-five-wrap .data .text", function (event) {
                    event.preventDefault();
                    const _this = $(this);

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
                                _this.attr("data-message_id", "1")
                                _this.attr("data-sender_id", getUserData['user']['id'])
                                _this.attr("data-host_id", getUserData['user_notification_settings']['assistant'])

                                chatModalRun(_this);
                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });

                });

                $("body").on("click", ".modal#chatmodal .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $chatModal.modal('hide');
                });

                $('.modal#chatmodal').on('hidden.bs.modal', function (event) {
                    // Start Chat Emoji Closed
                    const $messages = $("#chatmodal #messages");
                    const $chatEmojiList = $messages.find("#chat-emoji-list-wrap");
                    $chatEmojiList.removeClass("active").addClass("inactive");
                    // End Chat Emoji Closed
                });

                $('.modal#chatmodal').on('show.bs.modal', function () {
                    const el = document.getElementById("chatmodal");
                    let lastScrollTop = el.scrollTop;

                    const $modalScrollDown = $chatModal.find(".modal-scroll-down");

                    el.addEventListener("scroll", function (event) {

                        const st = el.scrollTop;
                        const element = event.target;

                        if (st > lastScrollTop) {
                            // console.log("down scroll");
                        } else if (st < lastScrollTop) {
                            // console.log("up scroll");
                            if (element.scrollHeight - element.scrollTop > element.clientHeight + 512) {
                                $modalScrollDown.removeClass("inactive").addClass("active");
                            }
                        } else {
                            // console.log("horizontal scroll");
                        }

                        lastScrollTop = Math.max(st, 0); // For mobile or negative scrolling

                        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
                            // console.log("down");
                            $modalScrollDown.removeClass("active").addClass("inactive");
                        }

                    });

                    $modalScrollDown.on("click", function (event) {
                        utility.modalScrollBottom();
                    })

                });


            },

            emoji: function () {
                const $messages = $("#chatmodal #messages");
                const $emojiButton = $messages.find(".chat-emoji-btn");
                const $chatEmojiList = $messages.find("#chat-emoji-list-wrap");
                const $emoji = $chatEmojiList.find(".emoji");
                const $chatTextarea = $("#chatmodal #messages textarea");

                $emojiButton.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if ($chatEmojiList.hasClass("inactive")) {
                        $chatEmojiList.removeClass("inactive").addClass("active");
                    } else {
                        $chatEmojiList.removeClass("active").addClass("inactive");
                    }
                });

                $(document).on('click', function () {
                    $chatEmojiList.removeClass("active").addClass("inactive");
                });

                $emojiButton.on('click', function (event) {
                    event.stopPropagation();
                });

                $emoji.on('click', function (event) {
                    event.stopPropagation();
                });

                $chatTextarea.on('click', function (event) {
                    event.stopPropagation();
                });

                $emoji.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let emoji = _this.find(".text").html()
                    let emojiInput = $chatTextarea[0];

                    let start = emojiInput.selectionStart;
                    let end = emojiInput.selectionEnd;

                    emojiInput.setRangeText(emoji, start, end);
                    emojiInput.setSelectionRange(start + 2, start + 2);
                    emojiInput.focus();
                });
            },

            chatListAdditional: function () {
                const $notification = $("#notification");
                const $loader = $notification.find(".loader-wrap.additional");
                const $notificationContainer = $notification.find("#notification-container");
                const $contentList = $notificationContainer.find("#content-list");

                const $chatListAdditional = $notification.find("#chat-list-additional");

                $chatListAdditional.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let messagesList;
                    $.ajax({
                        type: "POST",
                        url: "/_chat-list",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "page_number_start": cookies.abChatListPageNumberStart,
                            "page_number_stop": cookies.abChatListPageNumberStop
                        }),
                        cache: false,
                        beforeSend: function (xhr) {
                            _this.hide();
                            $loader.removeClass("closed").addClass("open");
                        },
                        success: function (result, status, xhr) {
                            messagesList = result['message']['data']['messages_list'];
                        },
                        complete: function (xhr, status) {
                            if (status === "success") {
                                cookies.abChatListPageNumberStart += 1;
                                cookies.abChatListPageNumberStop += 1;

                                $.each(messagesList, function (index) {
                                    let room = messagesList[index]['room'];
                                    let partner_online = messagesList[index]['partner_online'];
                                    let from_username = messagesList[index]['from_username'];
                                    let to_username = messagesList[index]['to_username'];
                                    let title_name = messagesList[index]['title_name'];
                                    let message_id = messagesList[index]['message_id'];
                                    let sender_id = messagesList[index]['sender_id'];
                                    let sender_first_name = messagesList[index]['sender_first_name'];
                                    let sender_last_name = messagesList[index]['sender_last_name'];
                                    let sender_online = messagesList[index]['sender_online'];
                                    let sender_assistant = messagesList[index]['sender_assistant'];
                                    let host_id = messagesList[index]['host_id'];
                                    let host_first_name = messagesList[index]['host_first_name'];
                                    let host_last_name = messagesList[index]['host_last_name'];
                                    let host_online = messagesList[index]['host_online'];
                                    let message = messagesList[index]['message'];
                                    let received = messagesList[index]['received'];
                                    let received_count = messagesList[index]['received_count'];
                                    let sender_you = messagesList[index]['sender_you'];
                                    let created_at = messagesList[index]['created_at'];
                                    let updated_at = messagesList[index]['updated_at'];

                                    if (partner_online === "True") {
                                        partner_online = "online"
                                    } else {
                                        partner_online = "offline"
                                    }

                                    let youWrap;
                                    let receivedWrap = "";
                                    if (sender_you === "True") {
                                        youWrap = '<span data-i18n="anlihouse-A239"></span> '
                                    } else {
                                        youWrap = ""
                                        if (received_count !== 0) {
                                            receivedWrap = '<span class="badge text-bg-warning"><span data-i18n="anlihouse-A234"></span> <span class="count">' + received_count + '</span></span>';
                                        } else {
                                            receivedWrap = ""
                                        }
                                    }

                                    let msg;
                                    if (sender_assistant === "True") {
                                        msg = '<span class="msg">' +
                                            youWrap +
                                            '<span data-i18n="' + message.replace(/(.{64})..+/, "$1…") + '"></span>' +
                                            '</span>' // End msg
                                    } else {
                                        msg = '<span class="msg">' +
                                            youWrap +
                                            '<span>' + message.replace(/(.{64})..+/, "$1…") + '</span>' +
                                            '</span>' // End msg
                                    }

                                    $contentList.append(
                                        '<div class="box" data-message_id="' + message_id + '" data-sender_id="' + sender_id + '" data-host_id="' + host_id + '">' +
                                        '<div class="avatar">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>' +
                                        '<div class="status ' + partner_online + '"></div>' +
                                        '</div>' + // End avatar
                                        '<div class="name">' +
                                        '<span>' + title_name + '</span>' +
                                        receivedWrap +
                                        '</div>' + // End name
                                        '<div class="message">' +
                                        msg +
                                        '<span class="time" data-time-relative="' + updated_at + '">' + utility.getDateTimeRelative(updated_at) + '</span>' +
                                        '</div>' + // End message
                                        '</div>' // End box
                                    ).promise().done(function () {
                                        $('body').i18n();

                                        $loader.removeClass("open").addClass("closed");
                                        _this.show();
                                    });
                                });

                                if (messagesList.length === 0) {
                                    $loader.removeClass("open").addClass("closed");
                                    _this.hide();
                                }
                            } else {
                                $loader.removeClass("open").addClass("closed");
                                _this.show();
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                });
            },

            chatImg: function () {
                let fileError;
                const $messages = $("#chatmodal #messages");
                const $imgButton = $messages.find(".chat-img-btn");

                $imgButton.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let maxSize;
                    if (process.env.NODE_ENV === "production") {
                        maxSize = process.env.PRODUCTION_IMG_MAX_SIZE // Bytes == 25 Megabytes
                    } else {
                        maxSize = process.env.DEVELOPMENT_IMG_MAX_SIZE // Bytes == 250 Megabytes
                    }

                    $("#chatmodal #messages .chat-img-btn").upload("disable");
                    $("#chatmodal #messages .chat-img-btn").upload("destroy");
                    $("#chatmodal #messages .chat-img-btn").upload("enable");

                    $imgButton.find("svg").detach();

                    $imgButton.prepend(
                        '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 16 16"><path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path><path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"></path></svg>'
                    )

                    $("#chatmodal #messages .chat-img-btn").upload({
                        "action": "/chat-img-upload",
                        "label": "",
                        "multiple": false,
                        "maxSize": maxSize,
                        "theme": "",
                        beforeSend: onBeforeSend
                    }).on("start.upload", onStart)
                        .on("complete.upload", onComplete)
                        .on("filestart.upload", onFileStart)
                        .on("fileprogress.upload", onFileProgress)
                        .on("filecomplete.upload", onFileComplete)
                        .on("fileerror.upload", onFileError)
                        .on("queued.upload", onQueued);

                    function onCancel(e) {
                    }

                    function onBeforeSend(formData) {
                        return formData;
                    }

                    function onQueued(event, files) {
                    }

                    function onStart(event) {
                    }

                    function onComplete(event) {
                    }

                    function onFileStart(event, file) {
                        $("#chatmodal #messages .chat.progress").removeClass("d-none");
                        $("#chatmodal #messages .chat.progress .progress-bar .file-percent").html("0%");
                        $("#chatmodal #messages .chat.progress .progress-bar").css({"width": "0"});
                    }

                    function onFileProgress(event, file, percent) {
                        $("#chatmodal #messages .chat.progress .progress-bar .file-percent").html(percent + "%");
                        $("#chatmodal #messages .chat.progress .progress-bar").css({"width": percent + "%"})
                    }

                    function onFileComplete(event, file, response) {
                        let fileSize = utility.getFormatBytes(file['size']);
                        $("#chatmodal #messages .chat.progress .progress-bar").removeClass("progress-bar-striped").addClass("bg-success");
                        $("#chatmodal #messages .chat.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                        let rClass = utility.getGenerateClass();
                        let ChatTimeSetTimeout = undefined;

                        $("#chatmodal #messages .messages").append(
                            '<div class="data host ' + rClass + '" data-received="False">' +
                            '<div class="message chat-img">' +
                            '<div id="msg-action-wrap">' +
                            '<div class="msg-action" data-message_id="" data-sender_id="" data-rclass="" data-bs-toggle="dropdown" aria-expanded="false"><span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg></span></div>' +
                            '<ul class="dropdown-menu"><li class="rm-message" data-message_id="" data-sender_id="" data-rclass="" style="cursor:pointer;"><span class="dropdown-item" data-i18n="anlihouse-A244"></span></li></ul>' +
                            '</div>' +
                            '<div class="msg"><img src="' + JSON.parse(response).data + '" alt=""></div>' +
                            '<span class="time relative active pointer-events-none"></span>' +
                            '<span class="is-received">' +
                            '<div class="received-true inactive">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16"><path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/></svg>' +
                            '</div>' + // End received-true
                            '<div class="received-false inactive">' +
                            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>' +
                            '</div>' + // End received-false
                            '</span>' + // End is-receivent
                            '</div>' + // End message
                            '</div>' // End data
                        ).promise().done(function () {
                            let start_time = utility.getClientDatetime().now.format();
                            setTimeout(
                                function () {
                                    ChatTimeSetTimeout = utility.getChatRelativeTime(start_time, $('.data.host.' + rClass + ' .time'), 10);
                                }, 10);
                            utility.modalScrollBottom();

                            // Start Send Message
                            let msg = '<img src="' + JSON.parse(response).data + '" alt="" />';
                            utility.sendMessage(rClass, "True", start_time, msg);
                            // End Send Message
                        });

                        setTimeout(
                            function () {
                                $("#chatmodal #messages .chat.progress").addClass("d-none");

                                $("#chatmodal #messages .chat.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                                $("#chatmodal #messages .chat.progress .progress-bar .file-percent").html("0%");
                                $("#chatmodal #messages .chat.progress .progress-bar .file-size").html("");
                                $("#chatmodal #messages .chat.progress .progress-bar").css({"width": "0"});

                                const $errorWrap = $("#chatmodal #messages");
                                $errorWrap.find(".chat-img-error span").removeData("i18n");
                                $errorWrap.find(".chat-img-error span").text("");
                                $errorWrap.find(".chat-img-error span").attr("data-i18n", "");
                                $errorWrap.find(".chat-img-error").removeClass("d-none");
                                $('body').i18n();
                            }, 500);
                    }

                    function onFileError(event, file, error) {
                        if (error) {
                            fileError = {"fileSize": utility.getFormatBytes(file['size']), "error": error}
                            $("#chatmodal #messages .chat-img-error").removeClass("d-none");

                            $("#chatmodal #messages .chat.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                            $("#chatmodal #messages .chat.progress .progress-bar .file-percent").html("0%");
                            $("#chatmodal #messages .chat.progress .progress-bar .file-size").html("");
                            $("#chatmodal #messages .chat.progress .progress-bar").css({"width": "0"});
                            $("#chatmodal #messages .chat.progress").addClass("d-none");

                            const $errorWrap = $("#chatmodal #messages");

                            if (fileError['error'] === "Request Entity Too Large" || fileError['error'] === "size") {
                                $errorWrap.find(".chat-img-error span").removeData("i18n");
                                $errorWrap.find(".chat-img-error span").text("");
                                $errorWrap.find(".chat-img-error span").attr("data-i18n", "anlihouse-A136");
                                $errorWrap.find(".chat-img-error").removeClass("d-none");
                                $('body').i18n();
                            } else if (fileError['error'] === "Unsupported Media Type") {
                                $errorWrap.find(".chat-img-error span").removeData("i18n");
                                $errorWrap.find(".chat-img-error span").text("");
                                $errorWrap.find(".chat-img-error span").attr("data-i18n", "anlihouse-A134");
                                $errorWrap.find(".chat-img-error").removeClass("d-none");
                                $('body').i18n();
                            }
                        }
                    }

                    $("#chatmodal #messages .chat-img-btn .fs-upload-target").trigger("click");
                });
            },

            notifications: function () {

                $('input[data-switch="notifications"]').on("change", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (_this.prop('checked') === true) {
                        notificationSettingsAjax(_this.attr("id"), true);
                    } else {
                        notificationSettingsAjax(_this.attr("id"), false)
                    }

                    function notificationSettingsAjax(notification_type, notification_data) {
                        let notificationsSettingsData;
                        $.ajax({
                            type: "POST",
                            url: "/_notifications",
                            contentType: "application/json",
                            data: JSON.stringify({
                                "notification_type": notification_type,
                                "notification_data": notification_data
                            }),
                            beforeSend: function (xhr) {
                            },
                            success: function (result, status, xhr) {
                                notificationsSettingsData = result
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
                    }

                });

            },

            chatListAction: function () {
                $("#content-list").on("click", ".chat-list-action", function (event) {
                    event.stopPropagation();
                    const _this = $(this);
                });

                $("#content-list").on("click", ".chat-list-archive", function (event) {
                    event.stopPropagation();
                    const _this = $(this);

                    let dataSenderId = _this.attr("data-sender_id");
                    let dataHostId = _this.attr("data-host_id");
                    let dataActionType = _this.attr("data-action_type");

                    if (dataActionType === "true") {
                        dataActionType = true
                    } else {
                        dataActionType = false
                    }

                    let chatListArchiveData;
                    $.ajax({
                        type: "POST",
                        url: "/_chat-archive",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "sender_id": dataSenderId,
                            "host_id": dataHostId,
                            "action_type": dataActionType
                        }),
                        beforeSend: function (xhr) {
                        },
                        success: function (result, status, xhr) {
                            chatListArchiveData = result
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                _this.parents(".box").detach();

                                if (dataActionType) {
                                    $.toast({
                                        heading: 'Infó',
                                        text: 'Beszélgetés hozzáadva az archivumhoz.',
                                        icon: 'info',
                                        loader: true,
                                        loaderBg: '#4c6180',
                                        bgColor: '#ffffff',
                                        textColor: '#4c6180',
                                        position: 'top-right',
                                        hideAfter: 8000, // 5000
                                    });
                                } else {
                                    $.toast({
                                        heading: 'Infó',
                                        text: 'Beszélgetés eltávolítva az archivumból.',
                                        icon: 'info',
                                        loader: true,
                                        loaderBg: '#4c6180',
                                        bgColor: '#ffffff',
                                        textColor: '#4c6180',
                                        position: 'top-right',
                                        hideAfter: 8000, // 5000
                                    });
                                }
                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                });
            },

            userInfo: function () {
                const $searchUserInfo = $("#search-user-info");
                const $userinfo = $("#userinfo");
                const $loader = $userinfo.find(".loader-wrap");
                const $userinfoContainer = $userinfo.find("#userinfo-container");
                const $contentList = $userinfoContainer.find("#content-list");

                $searchUserInfo.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    try {
                        $("#userinfo-wrap #userinfo .ps__rail-x").each(function () {
                            $(this).detach();
                        });

                        $("#userinfo-wrap #userinfo .ps__rail-y").each(function () {
                            $(this).detach();
                        });
                    } catch (error) {
                        // console.error(error);
                    }

                    const userinfo_content = document.querySelector('#userinfo', {});
                    let ps_userinfo = new PerfectScrollbar(userinfo_content, {});

                    if (_this.hasClass("closed") && !_this.hasClass("action")) {
                        _this.addClass("action");
                        utility.userinfoOpen();

                        let getUserData;
                        $.ajax({
                            type: "POST",
                            url: "/_get-user-data",
                            contentType: "application/json",
                            cache: false,
                            beforeSend: function (xhr) {
                                $userinfoContainer.html("");
                            },
                            success: function (result, status, xhr) {
                                getUserData = result['message']['payload']
                                console.log(getUserData)
                            },
                            complete: function (xhr, status) {
                                let statusCode = xhr['status'];

                                if (statusCode === 200) {
                                    $loader.removeClass("open").addClass("closed");

                                    let first_name = getUserData['user_billing_information']['first_name'];
                                    let last_name = getUserData['user_billing_information']['last_name'];
                                    let username = getUserData['user_profile']['username'];
                                    let email = getUserData['user']['email'];

                                    if (first_name !== null) {
                                        username = first_name + " " + last_name
                                    }

                                    let subscribed_type = getUserData['user_permission']['subscribed_type'];
                                    let subscribed_type_value,
                                        subscribed_type_upgrade;

                                    let subscribed_start,
                                        subscribed_monthly,
                                        days,
                                        hours,
                                        minutes,
                                        seconds,
                                        subscribed_ads,
                                        subscribed_ads_default,
                                        subscribed_chat,
                                        subscribed_chat_default_1,
                                        subscribed_chat_default_3,
                                        subscribed_chat_default_12;

                                    subscribed_start = getUserData['user_permission']['subscribed_start'];

                                    if (subscribed_start !== null) {

                                        if (subscribed_type === "1" || subscribed_type === "4" || subscribed_type === "7") {
                                            subscribed_type_value = $.i18n('anlihouse-A407').toString();
                                            subscribed_type_upgrade = "d-block"
                                        } else if (subscribed_type === "2" || subscribed_type === "5" || subscribed_type === "8") {
                                            subscribed_type_value = $.i18n('anlihouse-A408').toString();
                                            subscribed_type_upgrade = "d-block"
                                        } else if (subscribed_type === "3" || subscribed_type === "6" || subscribed_type === "9") {
                                            subscribed_type_value = $.i18n('anlihouse-A409').toString();
                                            subscribed_type_upgrade = "d-none"
                                        }

                                        subscribed_monthly = getUserData['user_permission']['subscribed_monthly'];
                                        let subscribed_start_end_difference = getUserData['user_permission']['subscribed_start_end_difference'];

                                        if (subscribed_start_end_difference !== null) {
                                            days = subscribed_start_end_difference['days'];
                                            hours = subscribed_start_end_difference['hours'];
                                            minutes = subscribed_start_end_difference['minutes'];
                                            seconds = subscribed_start_end_difference['seconds'];
                                        }

                                        subscribed_ads_default = getUserData['user_permission']['subscribed_ads_default'];
                                        subscribed_ads = getUserData['user_permission']['subscribed_ads'];

                                        subscribed_chat_default_1 = parseInt(getUserData['user_permission']['subscribed_chat_default']);
                                        subscribed_chat_default_3 = parseInt(getUserData['user_permission']['subscribed_chat_default']) * 3;
                                        subscribed_chat_default_12 = parseInt(getUserData['user_permission']['subscribed_chat_default']) * 12;
                                        subscribed_chat = getUserData['user_permission']['subscribed_chat'];
                                    }

                                    let pd5 = $.parseHTML($.i18n('anlihouse-419').toString());
                                    pd5 = pd5[0]['nodeValue'] + pd5[1]['outerHTML'] + pd5[2]['nodeValue'];

                                    let pd6 = $.parseHTML($.i18n('anlihouse-420').toString());
                                    pd6 = pd6[0]['nodeValue'] + pd6[1]['outerHTML'] + pd6[2]['nodeValue'];

                                    $userinfoContainer.append(
                                        '<div id="head">' +
                                        '<div id="title">' + username + '</div>' +
                                        '<div id="subtitle">' + email + '</div>' +
                                        '</div>' + // end head
                                        '<div id="content-list">' +
                                        '<p class="pd1"></p>' +
                                        '<p class="pd2"></p>' +
                                        '<p class="pd3"></p>' +
                                        '<p class="pd4"></p>' +
                                        '<hr class="dropdown-divider ' + subscribed_type_upgrade + '">' +
                                        '<p class="pd5 mb-0 ' + subscribed_type_upgrade + '">' + pd5 + '</p>' +
                                        '</div>' // end content-list
                                    ).promise().done(function () {
                                        if (subscribed_start !== null && getUserData['user_permission']['is_worker'] !== "True") {
                                            $userinfoContainer.find(".pd1").text($.i18n("anlihouse-415", utility.getDateTimeLLLL(subscribed_start), subscribed_type_value));
                                            $userinfoContainer.find(".pd2").text($.i18n("anlihouse-416", subscribed_monthly, days, hours, minutes, seconds));
                                            if (subscribed_type !== "3" && subscribed_type !== "6" && subscribed_type !== "9") {
                                                $userinfoContainer.find(".pd3").text($.i18n("anlihouse-417", subscribed_ads, subscribed_ads_default));
                                                if (subscribed_type === "1" || subscribed_type === "2") {
                                                    $userinfoContainer.find(".pd4").text($.i18n("anlihouse-418", subscribed_chat, subscribed_chat_default_1));
                                                }
                                                if (subscribed_type === "4" || subscribed_type === "5") {
                                                    $userinfoContainer.find(".pd4").text($.i18n("anlihouse-418", subscribed_chat, subscribed_chat_default_3));
                                                }
                                                if (subscribed_type === "7" || subscribed_type === "8") {
                                                    $userinfoContainer.find(".pd4").text($.i18n("anlihouse-418", subscribed_chat, subscribed_chat_default_12));
                                                }
                                            } else {
                                                $userinfoContainer.find(".pd3").text($.i18n("anlihouse-439"));
                                                $userinfoContainer.find(".pd4").text($.i18n("anlihouse-440"));
                                            }
                                            if (subscribed_type_upgrade === "d-none") {
                                                $userinfoContainer.find(".pd4").addClass("mb-0");
                                            }
                                        } else {
                                            $userinfoContainer.find("#content-list").html("");

                                            let is_worker = getUserData['user_permission']['is_worker'];
                                            let is_admin = getUserData['user_permission']['is_admin'];
                                            let is_admin_settings_management = getUserData['user_permission']['is_admin_settings_management'];
                                            let is_user_management = getUserData['user_permission']['is_user_management'];
                                            let is_category_management = getUserData['user_permission']['is_category_management'];
                                            let is_notifications = getUserData['user_permission']['is_notifications'];

                                            let is_worker_item = "";
                                            if (is_worker === "True") {
                                                is_worker_item = '<li class="list-group-item" data-i18n="anlihouse-421"></li>'
                                            }

                                            let is_admin_item = "";
                                            if (is_admin === "True") {
                                                is_admin_item = '<li class="list-group-item" data-i18n="anlihouse-422"></li>'
                                            }

                                            let is_admin_settings_management_item = "";
                                            if (is_admin_settings_management === "True") {
                                                is_admin_settings_management_item = '<li class="list-group-item" data-i18n="anlihouse-423"></li>'
                                            }

                                            let is_user_management_item = "";
                                            if (is_user_management === "True") {
                                                is_user_management_item = '<li class="list-group-item" data-i18n="anlihouse-424"></li>'
                                            }

                                            let is_category_management_item = "";
                                            if (is_category_management === "True") {
                                                is_category_management_item = '<li class="list-group-item" data-i18n="anlihouse-425"></li>'
                                            }

                                            let is_notifications_item = "";
                                            if (is_notifications === "True") {
                                                is_notifications_item = '<li class="list-group-item" data-i18n="anlihouse-426"></li>'
                                            }

                                            if (is_worker !== "True") {
                                                $userinfoContainer.find("#content-list").append(
                                                    '<p class="pd6 mb-0">' + pd6 + '</p>'
                                                ).promise().done(function () {
                                                });
                                            } else {
                                                $userinfoContainer.find("#content-list").append(
                                                    '<ul class="list-group list-group-flush mb-0">' +
                                                    is_worker_item +
                                                    is_admin_item +
                                                    is_admin_settings_management_item +
                                                    is_user_management_item +
                                                    is_category_management_item +
                                                    is_notifications_item +
                                                    '</ul>'
                                                ).promise().done(function () {
                                                });
                                            }
                                        }

                                        $userinfoContainer.find(".upgrade").attr("href", utility.getURL() + "/account-payment")

                                        $('body').i18n();

                                        setTimeout(
                                            function () {
                                                $loader.removeClass("open").addClass("closed");
                                                $userinfoContainer.removeClass("d-none");
                                            }, 10);

                                    });

                                    _this.removeClass("action");
                                }
                                $searchUserInfo.addClass("success");
                            },
                            error: function (xhr, status, error) {
                            }
                        });

                    } else {
                        if (!_this.hasClass("action")) {
                            utility.userinfoClosed();
                        }
                    }

                });

                $(document).on('click', function (event) {
                    if (!$("#search-user-info").hasClass("action")) {
                        utility.userinfoClosed();
                    }
                });

                $("#userinfo, #search-user-info").on('click', function (event) {
                    event.stopPropagation();
                });

            },

            initializ: function () {
                loadNotification.chatList();
                loadNotification.archiveChatList();
                loadNotification.chatModal();
                loadNotification.emoji();
                loadNotification.chatListAdditional();
                loadNotification.chatImg();
                loadNotification.notifications();
                loadNotification.chatListAction();
                loadNotification.userInfo();
            }

        };

        $(function () {
            loadNotification.initializ()
        });
    }
}

export let anlibreedersNotification = new AnlibreedersNotification();