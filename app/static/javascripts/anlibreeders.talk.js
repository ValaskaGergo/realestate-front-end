import AnlibreedersUtility from './utilities/anlibreeders.utility'
import autosize from "autosize/dist/autosize";
import numbro from "numbro";
import shortAndSweet from "short-and-sweet/dist/short-and-sweet.min"
import {cookies} from "brownies";

const utility = new AnlibreedersUtility();

class AnlibreedersTalk {
    loadAnlibreedersTalk() {
        const loadTalk = {

            talkRule: function () {
                const $full = $("#full");
                const $talk = $full.find("#talk");
                const $sendTalkGuide = $talk.find(".send-talk-guide .text");

                $sendTalkGuide.on("click", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#talkRule').modal('show');
                });

                $("body").on("click", ".modal#talkRule .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#talkRule').modal('hide');
                });
            },

            talkInput: function () {
                const $talk = $("#talk");

                autosize($("#talk .talking-button-wrap #talking-input.talking-input"));
            },

            talkingPost: function () {
                const $talk = $("#talk");
                const $talkingInput = $("#talk .talking-button-wrap #talking-input.talking-input");
                const $talkings = $talk.find("#talk-wrap #talkings.talkings-ajax");

                $("body").on("click", "#talk .talking-button-wrap .talking-button .talking-input-btn", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataCategoryId = _this.attr("data-category_id");
                    const dataSubcategoryId = _this.attr("data-subcategory_id");
                    const dataUserId = _this.attr("data-user_id");
                    let talkingInputVal = $talkingInput.val();

                    let talkingData;
                    $.ajax({
                        type: "POST",
                        url: "/_post-talking",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "category_id": dataCategoryId,
                            "subcategory_id": dataSubcategoryId,
                            "user_id": dataUserId,
                            "experience": talkingInputVal
                        }),
                        beforeSend: function (xhr) {
                            _this.addClass("pointer-events-none");
                        },
                        success: function (result, status, xhr) {
                            talkingData = result['message']['talking_data']
                        },
                        complete: function (xhr, status) {
                            _this.removeClass("pointer-events-none");
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                const id = talkingData['id']
                                const category_id = talkingData['category_id']
                                const subcategory_id = talkingData['subcategory_id']
                                const user_id = talkingData['user_id']
                                const experience = talkingData['experience']
                                const experience_detect_lang = talkingData['experience_detect_lang']
                                const sender_last_name = talkingData['sender_last_name']
                                const sender_id = talkingData['sender_id']
                                const created_at = talkingData['created_at']
                                const updated_at = talkingData['updated_at']
                                const is_editing = talkingData['is_editing']
                                const talking_count = talkingData['talking_count']

                                $talk.find("#talk-wrap .talking-error span").removeData("i18n");
                                $talk.find("#talk-wrap .talking-error span").text("");
                                $talk.find("#talk-wrap .talking-error").addClass("d-none");
                                $('body').i18n();
                                $talkingInput.val("").css({"height": "auto"});

                                let edit = "";
                                let reply = "";
                                let name = "";
                                let report = "";
                                let translation = "";
                                edit = '<span class="edit" data-i18n="anlihouse-A338" data-experience="' + experience.replace(/<br *\/?>/gi, '\n') + '" data-talking_id="' + id + '"></span>';
                                name = '<span class="who"><span data-i18n="anlihouse-A350"></span> <span data-i18n="anlihouse-A337"></span></span>';

                                $talkings.append(
                                    '<div class="talk-box talk-box-' + id + '">' +
                                    '<div class="talk">' +
                                    '<div class="before">' +
                                    '<div class="up" style="pointer-events:none;opacity:0.5" data-talking_id="' + id + '" data-vote="up">' +
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="bi bi-caret-up" viewBox="0 0 16 16"><path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/></svg>' +
                                    '</div>' + // End .up
                                    '<div class="counter">0' +
                                    '</div>' + // End .counter
                                    '<div class="down" style="pointer-events:none;opacity:0.5" data-talking_id="' + id + '" data-vote="down">' +
                                    '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="bi bi-caret-down" viewBox="0 0 16 16"> <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/></svg>' +
                                    '</div>' + // End .down
                                    '</div>' + // End .before
                                    '<div class="after">' +
                                    '<div class="talk-by">' +
                                    name +
                                    '<span class="time active" data-time-relative="' + created_at + '">' + utility.getDateTimeRelative(created_at) + '</span>' +
                                    edit +
                                    reply +
                                    report +
                                    translation +
                                    '</div>' + // End .talk-by
                                    '<div class="text talk-box-text-' + id + '">' +
                                    experience.replace(/\r?\n/g, '<br />') +
                                    '</div>' + // End .text
                                    '</div>' + // End .after
                                    '</div>' + // End .talk
                                    '<div class="talk-answer-wrap">' +
                                    '</div>' + // End .talk-answer-wrap
                                    '</div>' // End .talk-box
                                ).ready(function () {
                                    $talk.find(".talking-counter .count").html($.i18n("anlihouse-A358"));
                                    $('body').i18n();

                                    let $fullDataInfoBox = $("#full-data-info-box");
                                    let $fullDataInfoBoxTalkCount = $fullDataInfoBox.find("#talk .count");

                                    if (talking_count !== 0) {
                                        $fullDataInfoBoxTalkCount.css({"margin-left": "7px"});
                                        $fullDataInfoBoxTalkCount.html(talking_count);
                                    } else {
                                        $fullDataInfoBoxTalkCount.css({"margin-left": "0px"});
                                        $fullDataInfoBoxTalkCount.html("");
                                    }

                                });
                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                            _this.removeClass("pointer-events-none");
                            error = xhr['responseJSON']

                            if (error['message']['message']['talking']) {
                                $talk.find("#talk-wrap .talking-error span").removeData("i18n");
                                $talk.find("#talk-wrap .talking-error span").text("");
                                $talk.find("#talk-wrap .talking-error span").attr("data-i18n", error['message']['message']['talking']);
                                $talk.find("#talk-wrap .talking-error").removeClass("d-none");

                                $('body').i18n();
                            } else {
                                $talk.find("#talk-wrap .talking-error span").removeData("i18n");
                                $talk.find("#talk-wrap .talking-error span").text("");
                                $talk.find("#talk-wrap .talking-error").addClass("d-none");
                                $('body').i18n();
                            }
                        }
                    });
                });

                $talkingInput.on("keyup", function (event) {
                    event.stopPropagation();

                    $talk.find("#talk-wrap .talking-error span").removeData("i18n");
                    $talk.find("#talk-wrap .talking-error span").text("");
                    $talk.find("#talk-wrap .talking-error").addClass("d-none");
                    $('body').i18n();
                });
            },

            talkingGet: function () {
                const $talk = $("#talk");

                const $talkLoader = $talk.find("#talk-wrap #talk-loader");
                const $talkLoaderWrap = $talkLoader.find(".loader-wrap");

                const $talkings = $talk.find("#talk-wrap #talkings.talkings-ajax");

                let arrowUpEmpty = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="bi bi-caret-up" viewBox="0 0 16 16"><path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/></svg>';
                let arrowDownEmpty = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="bi bi-caret-down" viewBox="0 0 16 16"><path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/></svg>';

                let arrowUpFull = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="bi bi-caret-up-fill" viewBox="0 0 16 16"><path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/></svg>';
                let arrowDownFull = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>';

                const detailsCollapseSeven = document.getElementById('detailsCollapseSeven');

                if (detailsCollapseSeven !== undefined && detailsCollapseSeven !== null) {
                    detailsCollapseSeven.addEventListener('hidden.bs.collapse', event => {
                        $talkings.html("");
                        $talkLoader.addClass("closed").removeClass("open");
                        $talkLoaderWrap.addClass("closed").removeClass("open");
                    });
                }

                detailsCollapseSeven?.addEventListener('shown.bs.collapse', event => {

                    const dataSubcategoryId = event.target.getAttribute("data-subcategory_id");

                    let talkingData;
                    $.ajax({
                        type: "POST",
                        url: "/_get-talking",
                        contentType: "application/json",
                        data: JSON.stringify({"subcategory_id": dataSubcategoryId}),
                        beforeSend: function (xhr) {
                            $talkLoader.removeClass("closed").addClass("open");
                            $talkLoaderWrap.removeClass("closed").addClass("open");
                        },
                        success: function (result, status, xhr) {
                            talkingData = result['message']['talking_list']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {

                                if (talkingData.length !== 0) {
                                    let id,
                                        category_id,
                                        subcategory_id,
                                        sender_user_id,
                                        sender_user_last_name,
                                        experience,
                                        experience_detect_lang,
                                        editing,
                                        deleted,
                                        visibility,
                                        created_at,
                                        updated_at,
                                        user_id,
                                        talking_history,
                                        talking_answer,
                                        vote,
                                        talking_user_vote,
                                        browser_lang;

                                    for (let i = 0; i < talkingData.length; i++) {

                                        id = talkingData[i]['id'];
                                        category_id = talkingData[i]['category_id'];
                                        subcategory_id = talkingData[i]['subcategory_id'];
                                        sender_user_id = talkingData[i]['sender_user_id'];
                                        sender_user_last_name = talkingData[i]['sender_user_last_name'];
                                        experience = talkingData[i]['experience'];
                                        experience_detect_lang = talkingData[i]['experience_detect_lang'];
                                        editing = talkingData[i]['editing'];
                                        deleted = talkingData[i]['deleted'];
                                        visibility = talkingData[i]['visibility'];
                                        created_at = talkingData[i]['created_at'];
                                        updated_at = talkingData[i]['updated_at'];
                                        user_id = talkingData[i]['user_id'];
                                        talking_history = talkingData[i]['talking_history'];
                                        talking_answer = talkingData[i]['talking_answer'];
                                        vote = talkingData[i]['vote'];
                                        talking_user_vote = talkingData[i]['talking_user_vote'];
                                        browser_lang = talkingData[i]['browser_lang'];

                                        let edit = "";
                                        let reply = "";
                                        let name = "";
                                        let report = "";
                                        let translation = "";
                                        let history = "";
                                        let voteStylePointerEvents = "";
                                        let upIcon = "";
                                        let downIcon = "";
                                        let talkingVoteStyle = "";

                                        if (sender_user_id === user_id) {
                                            edit = '<span class="edit" data-i18n="anlihouse-A338" data-experience="' + experience.replace(/<br *\/?>/gi, '\n') + '" data-talking_id="' + id + '"></span>';
                                            name = '<span class="who"><span data-i18n="anlihouse-A350"></span> <span data-i18n="anlihouse-A337"></span></span>';
                                            voteStylePointerEvents = "pointer-events:none;opacity:0.5";
                                        } else {
                                            reply = '<span class="reply" data-i18n="anlihouse-A351" data-talk_id="' + id + '" data-type-answer="talking"></span>';
                                            name = '<span class="who"><span data-i18n="anlihouse-A350"></span> ' + sender_user_last_name + '</span>';
                                            if (browser_lang !== experience_detect_lang) {
                                                report = '<span class="report" data-i18n="anlihouse-A339"></span>';
                                                translation = '<span class="translation inactive" data-type="talking" data-talking_id="' + id + '" data-i18n="anlihouse-A340"></span>';
                                            } else {
                                                report = '<span class="report2" data-i18n="anlihouse-A339"></span>';
                                            }
                                            if (editing === true) {
                                                history = '<span class="history" data-sender_name="' + sender_user_last_name + '" data-talk_id="' + id + '" data-i18n="anlihouse-A345"></span>';
                                            }
                                        }

                                        let talkingAnswerWrap = "";
                                        for (let j = 0; j < talkingData[i]['talking_answer'].length; j++) {

                                            let who = "";
                                            let time = '<span class="time active" data-time-relative="' + talkingData[i]['talking_answer'][j]['created_at'] + '">' + utility.getDateTimeRelative(talkingData[i]['talking_answer'][j]['created_at']) + '</span>';
                                            let reply = "";
                                            let report = "";
                                            let translation = "";
                                            let edit = "";
                                            let history = "";

                                            // console.log("--- --- --- ---")
                                            // console.log(talkingData[i]['talking_answer'][j]['user_id'] + " user_id")
                                            // console.log(talkingData[i]['talking_answer'][j]['talking_user_id'] + " talking_user_id")
                                            // console.log(talkingData[i]['talking_answer'][j]['host_user_id'] + " host_user_id")
                                            // console.log(talkingData[i]['talking_answer'][j]['sender_user_id'] + " sender_user_id")

                                            if (talkingData[i]['talking_answer'][j]['user_id'] !== talkingData[i]['talking_answer'][j]['sender_user_id']) {
                                                if (talkingData[i]['talking_answer'][j]['answer_type'] === "talking") {
                                                    who = '<span>' + talkingData[i]['talking_answer'][j]['sender_user_last_name'] + '</span> <span data-i18n="anlihouse-A352"></span> <span>' + sender_user_last_name + '</span> <span class="for" data-i18n="anlihouse-A353"></span>';
                                                } else {
                                                    who = '<span>' + talkingData[i]['talking_answer'][j]['sender_user_last_name'] + '</span> <span data-i18n="anlihouse-A352"></span> <span>' + talkingData[i]['talking_answer'][j]['host_user_last_name'] + '</span> <span class="for" data-i18n="anlihouse-A353"></span>';
                                                }
                                                reply = '<span class="reply" data-talk_answer_id="' + talkingData[i]['talking_answer'][j]['id'] + '" data-type-answer="talkinganswer" data-sender_user_last_name="' + talkingData[i]['talking_answer'][j]['sender_user_last_name'] + '" data-i18n="anlihouse-A351"></span>';
                                                if (browser_lang !== talkingData[i]['talking_answer'][j]['answer_detect_lang']) {
                                                    report = '<span class="report" data-i18n="anlihouse-A339"></span>';
                                                    translation = '<span class="translation inactive" data-type="talkinganswer" data-answer_id="' + talkingData[i]['talking_answer'][j]['id'] + '" data-i18n="anlihouse-A340">';
                                                } else {
                                                    report = '<span class="report2" data-i18n="anlihouse-A339"></span>';
                                                }
                                                if (talkingData[i]['talking_answer'][j]['editing'] === true) {
                                                    history = '<span class="history" data-sender_name="' + talkingData[i]['talking_answer'][j]['sender_user_last_name'] + '" data-talk_answer_id="' + talkingData[i]['talking_answer'][j]['id'] + '" data-i18n="anlihouse-A345"></span>';
                                                }
                                            } else if (talkingData[i]['talking_answer'][j]['user_id'] === talkingData[i]['talking_answer'][j]['sender_user_id']) {
                                                who = '<span class="who"><span data-i18n="anlihouse-A337"></span></span>';
                                                edit = '<span class="edit" data-i18n="anlihouse-A338" data-answer="' + talkingData[i]['talking_answer'][j]['answer'].replace(/<br *\/?>/gi, '\n') + '" data-answer_id="' + talkingData[i]['talking_answer'][j]['id'] + '" data-talking_id="' + id + '"></span>';
                                            } else {
                                            }

                                            talkingAnswerWrap += '<div class="talk-answer talk-answer-' + talkingData[i]['talking_answer'][j]['id'] + '">' +
                                                '<div class="talk-answer-by">' +
                                                who +
                                                time +
                                                history +
                                                reply +
                                                report +
                                                translation +
                                                edit +
                                                '</div>' + // End .talk-answer-by
                                                '<div class="talking-answer-input-group inactive mb-3" data-talk-answer-box-id="' + talkingData[i]['talking_answer'][j]['id'] + '">' +
                                                '<div class="input-group talking-answer-answer-input-group mt-3">' +
                                                '<textarea class="form-control talking-answer-answer-input talking-answer-answer-id-input-' + talkingData[i]['talking_answer'][j]['id'] + '" data-counter-label="" id="talking-answer-answer-id-input-' + talkingData[i]['talking_answer'][j]['id'] + '" maxlength="1024" name="answer_input" placeholder="" rows="1" style="" aria-controls=""></textarea>' +
                                                '<span class="talking-answer-answer-emoji-btn" style="display:none;"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" class="bi bi-emoji-smile-fill" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"></path></svg></span>' +
                                                '<span class="talking-answer-answer-input-btn" data-talking_id="' + id + '" data-talking_answer_id="' + talkingData[i]['talking_answer'][j]['id'] + '" data-type-answer="talkinganswer"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" class="bi bi-send-fill" viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"></path></svg></span>' +
                                                '</div>' + // End .talking-answer-answer-input-group
                                                '<small class="text-danger input-error talking-answer-answer-error d-none" style=""><span data-i18n=""></span></small>' +
                                                '<small class="talking-answer-answer-counter talking-answer-id-elem-' + talkingData[i]['talking_answer'][j]['id'] + '" style=""></small>' +
                                                '</div>' + // End .talking-answer-input-group
                                                '<div class="text talk-answer-text-' + talkingData[i]['talking_answer'][j]['id'] + '" data-answer_id="' + talkingData[i]['talking_answer'][j]['id'] + '" data-answer_detect_lang="' + talkingData[i]['talking_answer'][j]['answer_detect_lang'] + '" data-source="" data-target="" data-subcategory_id="' + subcategory_id + '">' +
                                                talkingData[i]['talking_answer'][j]['answer'].replace(/\r?\n/g, '<br />') +
                                                '</div>' + // End .text
                                                '</div>' // End .talk-answer;
                                        }

                                        if (talking_user_vote == null) {
                                            upIcon = arrowUpEmpty;
                                            downIcon = arrowDownEmpty;
                                        } else if (talking_user_vote === "up") {
                                            upIcon = arrowUpFull;
                                            downIcon = arrowDownEmpty;
                                        } else if (talking_user_vote === "down") {
                                            upIcon = arrowUpEmpty;
                                            downIcon = arrowDownFull;
                                        } else {
                                            upIcon = arrowUpEmpty;
                                            downIcon = arrowDownEmpty;
                                        }

                                        if (vote <= -3) {
                                            talkingVoteStyle = "opacity:0.5";
                                        } else {
                                            talkingVoteStyle = "opacity:1";
                                        }

                                        $talkings.append(
                                            '<div class="talk-box talk-box-' + id + '">' +
                                            '<div class="talk">' +
                                            '<div class="before">' +
                                            '<div class="up" style="' + voteStylePointerEvents + '" data-talking_id="' + id + '" data-vote="up">' +
                                            upIcon +
                                            '</div>' + // End .up
                                            '<div class="counter">' +
                                            vote +
                                            '</div>' + // End .counter
                                            '<div class="down" style="' + voteStylePointerEvents + '" data-talking_id="' + id + '" data-vote="down">' +
                                            downIcon +
                                            '</div>' + // End .down
                                            '</div>' + // End .before
                                            '<div class="after">' +
                                            '<div class="talk-by">' +
                                            name +
                                            '<span class="time active" data-time-relative="' + created_at + '">' + utility.getDateTimeRelative(created_at) + '</span>' +
                                            history +
                                            edit +
                                            reply +
                                            report +
                                            translation +
                                            '</div>' + // End .talk-by
                                            '<div class="talking-input-group inactive mb-3" data-talk-box-id="' + id + '">' +
                                            '<div class="input-group talking-answer-input-group mt-3">' +
                                            '<textarea class="form-control talking-answer-input talking-answer-id-input-' + id + '" data-counter-label="" id="talking-answer-id-input-' + id + '" maxlength="1024" name="answer_input" placeholder="" rows="1" style="" aria-controls="short-and-sweet-counter-1"></textarea>' +
                                            '<span class="talking-answer-emoji-btn" style="display:none;"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-emoji-smile-fill" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"></path></svg></span>' +
                                            '<span class="talking-answer-input-btn" data-talking_id="' + id + '" data-type-answer="talking"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"></path></svg></span>' +
                                            '</div>' + // End .talking-answer-input-group
                                            '<small class="text-danger input-error talking-answer-error d-none" style=""><span data-i18n=""></span></small>' +
                                            '<small class="talking-answer-counter talking-id-elem-' + id + '" style=""></small>' +
                                            '</div>' + // End .talking-input-group
                                            '<div class="text talk-box-text-' + id + '" style="' + talkingVoteStyle + '" data-talking_id="' + id + '" data-experience_detect_lang="' + experience_detect_lang + '" data-source="" data-target="" data-subcategory_id="' + subcategory_id + '">' +
                                            experience.replace(/\r?\n/g, '<br />') +
                                            '</div>' + // End .text
                                            '</div>' + // End .after
                                            '</div>' + // End .talk
                                            '<div class="talk-answer-wrap">' +
                                            talkingAnswerWrap +
                                            '</div>' + // End .talk-answer-wrap
                                            '</div>' // End .talk-box
                                        ).ready(function () {
                                            $('body').i18n();
                                            $talkLoader.addClass("closed").removeClass("open");
                                            $talkLoaderWrap.addClass("closed").removeClass("open");
                                        });
                                    }
                                } else {
                                    $talkings.html("");
                                    $talkLoader.addClass("closed").removeClass("open");
                                    $talkLoaderWrap.addClass("closed").removeClass("open");
                                }

                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                });
            },

            talkingDataFormatting: function () {
                $("body").on("click", "#talk #talk-wrap #talkings .talk-by .time, #talk #talk-wrap #talkings .talk-answer-by .time", function (event) {
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

            talkingEditing: function () {

                autosize($("#editingTalkingModal #talking-edit-input.talking-edit-input"));

                $("body").on("click", "#talk #talkings .talk-by .edit", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataTalkingId = _this.attr("data-talking_id");
                    const dataExperience = _this.attr("data-experience");

                    $("#editingTalkingModal #talking-edit-input.talking-edit-input").val("");
                    $("#editingTalkingModal #talking-edit-input.talking-edit-input").val(dataExperience);

                    $("#editingTalkingModal .talking-edit-counter").html("");
                    shortAndSweet("#editingTalkingModal #talking-edit-input.talking-edit-input", {
                        counterLabel: '{length}/{maxlength}',
                        counterClassName: 'count',
                        append: (el, counter) => {
                            const count = document.querySelector('#editingTalkingModal .talking-edit-counter');
                            count.appendChild(counter);
                        }
                    });

                    $("#editingTalkingModal #talking-edit-form #talkingEditId").val("");
                    autosize.destroy($("#editingTalkingModal #talking-edit-input.talking-edit-input"));

                    $("#editingTalkingModal #talking-edit-form #talkingEditId").val(dataTalkingId);
                    setTimeout(
                        function () {
                            autosize($("#editingTalkingModal #talking-edit-input.talking-edit-input"));
                        }, 500);

                    $(".modal#editingTalkingModal #delete-talking-form-button").removeClass("btn-primary action").addClass("btn-danger").attr('disabled', false);
                    $(".modal#editingTalkingModal #delete-talking-form-button .delete-lock").removeClass("inactive d-none").addClass("active");
                    $(".modal#editingTalkingModal #delete-talking-form-button .delete-unlock").removeClass("active").addClass("inactive d-none");

                    $("#editingTalkingModal").find(".talking-edit-error span").removeData("i18n");
                    $("#editingTalkingModal").find(".talking-edit-error span").text("");
                    $("#editingTalkingModal").find(".talking-edit-error").removeClass("d-none");
                    $("#editingTalkingModal").find(".form-alert-danger").addClass("d-none");

                    $('#editingTalkingModal').modal('show');
                });

                $("body").on("click", ".modal#editingTalkingModal .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#editingTalkingModal').modal('hide');
                });

                $("body").on("click", ".modal#editingTalkingModal #delete-talking-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);
                    let $lock = _this.find(".delete-lock");
                    let $unlock = _this.find(".delete-unlock");

                    if ($unlock.hasClass("active")) {
                        let talkingCallback;
                        $.ajax({
                            type: "POST",
                            url: "/_talking-delete",
                            contentType: "application/json",
                            data: JSON.stringify($("#talking-edit-form").serializeObject()),
                            beforeSend: function (xhr) {
                                _this.attr('disabled', true);
                                _this.addClass("action");
                                //$("#editingTalkingModal").removeClass("filter-grayscale-0");
                                //$("#editingTalkingModal").addClass("filter-grayscale-100");
                                $("#post-loader").toggleClass("active inactive");
                                $("body").css({"overflow": "hidden"});
                            },
                            success: function (result, status, xhr) {
                                talkingCallback = result['message']
                            },
                            complete: function (xhr, status) {
                                let statusCode = xhr['status'];

                                if (statusCode === 200) {
                                    let talking_id = talkingCallback['talking_id'];
                                    let talking_count = talkingCallback['talking_count'];
                                    setTimeout(
                                        function () {
                                            $("#talk-wrap #talkings.talkings-ajax .talk-box.talk-box-" + talking_id).detach();
                                            _this.attr('disabled', false);
                                            _this.removeClass("action");
                                            //$("#editingTalkingModal").removeClass("filter-grayscale-100");
                                            //$("#editingTalkingModal").addClass("filter-grayscale-0");
                                            $("#post-loader").toggleClass("inactive active");
                                            $("body").removeAttr("style");
                                            $('#editingTalkingModal').modal('hide');

                                            let $fullDataInfoBox = $("#full-data-info-box");
                                            let $fullDataInfoBoxTalkCount = $fullDataInfoBox.find("#talk .count");

                                            if (talking_count !== 0) {
                                                $fullDataInfoBoxTalkCount.css({"margin-left": "7px"});
                                                $fullDataInfoBoxTalkCount.html(talking_count);
                                            } else {
                                                $fullDataInfoBoxTalkCount.css({"margin-left": "0px"});
                                                $fullDataInfoBoxTalkCount.html("");
                                            }

                                        }, 1500);
                                }
                            },
                            error: function (xhr, status, error) {
                                $("#editingTalkingModal").addClass("filter-grayscale-0");
                                _this.attr('disabled', false);
                                _this.removeClass("action");
                            }
                        });
                    }

                    if ($lock.hasClass("active")) {
                        $lock.removeClass("active").addClass("inactive d-none");
                        $unlock.removeClass("inactive d-none").addClass("active");
                        _this.removeClass("btn-danger").addClass("btn-primary");
                    }
                });

                $("body").on("click", ".modal#editingTalkingModal #edit-talking-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let talkingCallback;
                    $.ajax({
                        type: "POST",
                        url: "/_talking-edit",
                        contentType: "application/json",
                        data: JSON.stringify($("#talking-edit-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("#editingTalkingModal").removeClass("filter-grayscale-0");
                            //$("#editingTalkingModal").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            talkingCallback = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let talking_id = talkingCallback['talking_id'];
                                let experience = talkingCallback['experience'];
                                let experience_detect_lang = talkingCallback['experience_detect_lang'];
                                setTimeout(
                                    function () {
                                        $("#talk-wrap #talkings.talkings-ajax .talk-box.talk-box-" + talking_id).find(".text.talk-box-text-" + talking_id).html(experience.replace(/\r?\n/g, '<br />'));
                                        $("#talk-wrap #talkings.talkings-ajax .talk-box.talk-box-" + talking_id).find(".edit").attr("data-experience", experience.replace(/<br *\/?>/gi, '\n'))
                                        _this.attr('disabled', false);
                                        _this.removeClass("action");
                                        //$("#editingTalkingModal").removeClass("filter-grayscale-100");
                                        //$("#editingTalkingModal").addClass("filter-grayscale-0");
                                        $("#post-loader").toggleClass("inactive active");
                                        $("body").removeAttr("style");
                                        $('#editingTalkingModal').modal('hide');
                                    }, 1500);
                            }
                        },
                        error: function (xhr, status, error) {
                            //$("#editingTalkingModal").removeClass("filter-grayscale-100");
                            //$("#editingTalkingModal").addClass("filter-grayscale-0");
                            $("#post-loader").toggleClass("inactive active");
                            $("body").removeAttr("style");
                            _this.attr('disabled', false);
                            _this.removeClass("action");
                        }
                    });
                });

            },

            talkingHistory: function () {
                $("body").on("click", "#talk #talkings .talk-by .history", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataTalkId = _this.attr("data-talk_id");
                    const dataSenderName = _this.attr("data-sender_name");

                    let talkingHistoryCallback;
                    $.ajax({
                        type: "POST",
                        url: "/_get-talking-history",
                        contentType: "application/json",
                        data: JSON.stringify({"talking_id": dataTalkId}),
                        beforeSend: function (xhr) {
                        },
                        success: function (result, status, xhr) {
                            talkingHistoryCallback = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let talking_history = talkingHistoryCallback['talking_history']

                                if (Array.isArray(talking_history) && talking_history.length) {
                                    $("#historyTalking #talking-history").html("");

                                    for (let i = 0; i < talking_history.length; i++) {
                                        $("#historyTalking #talking-history").append(
                                            '<figure>' +
                                            '<blockquote class="blockquote">' +
                                            '<p>' +
                                            talking_history[i]['experience'].replace(/\r?\n/g, '<br />') +
                                            '</p>' +
                                            '</blockquote>' +
                                            '<figcaption class="blockquote-footer">' +
                                            dataSenderName + ' <cite title="Source Title">' + utility.getDateTimeLLLL(talking_history[i]['created_at']) + '</cite>' +
                                            '</figcaption>' +
                                            '</figure>'
                                        ).ready(function () {
                                            $('#historyTalking').modal('show');
                                        });
                                    }
                                }
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });

                });

                $("body").on("click", ".modal#historyTalking .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#historyTalking').modal('hide');
                });
            },

            talkingAnswer: function () {

                $("body").on("click", "#talk #talkings .talk-by .reply", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataTalkId = _this.attr("data-talk_id");
                    const dataTypeAnswer = _this.attr("data-type-answer");

                    autosize($("#talkings .talking-input-group #talking-answer-id-input-" + dataTalkId));

                    $("#talkings .talking-input-group #talking-answer-id-input-" + dataTalkId).prop("placeholder", $.i18n("anlihouse-A359"));
                    $("#talkings .talking-input-group #talking-answer-id-input-" + dataTalkId).attr("data-counter-label", $.i18n("anlihouse-A327"));

                    $("#talkings .talk-box.talk-box-" + dataTalkId).find(".talking-answer-counter.talking-id-elem-" + dataTalkId).html("");
                    shortAndSweet('#talkings .talking-input-group #talking-answer-id-input-' + dataTalkId, {
                        counterLabel: '{length}/{maxlength}',
                        counterClassName: 'count',
                        append: (el, counter) => {
                            const count = document.querySelector(".talking-answer-counter.talking-id-elem-" + dataTalkId);
                            count.appendChild(counter);
                        }
                    });

                    const $talkingAnswerInputGroup = $("#talkings .talk-box.talk-box-" + dataTalkId).find('.talking-input-group[data-talk-box-id="' + dataTalkId + '"]');
                    if ($talkingAnswerInputGroup.hasClass("inactive")) {
                        $talkingAnswerInputGroup.removeClass("inactive").addClass("active");
                    } else {
                        $talkingAnswerInputGroup.removeClass("active").addClass("inactive");
                    }
                });

                $("body").on("click", "#talk #talkings .talking-answer-input-group .talking-answer-input-btn", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataTalkingId = _this.attr("data-talking_id");
                    const dataTypeAnswer = _this.attr("data-type-answer");

                    const $talkingAnswerInput = $("#talk #talkings .talking-answer-input-group #talking-answer-id-input-" + dataTalkingId);
                    const talkingAnswerInputVal = $talkingAnswerInput.val();

                    let talkingAnswerCallback;
                    $.ajax({
                        type: "POST",
                        url: "/_post-talking-answer",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "talking_id": dataTalkingId,
                            "talking_answer_id": null,
                            "answer": talkingAnswerInputVal,
                            "answer_type": dataTypeAnswer
                        }),
                        beforeSend: function (xhr) {
                            _this.addClass("pointer-events-none");
                        },
                        success: function (result, status, xhr) {
                            talkingAnswerCallback = result['message']['talking_answer_data']
                        },
                        complete: function (xhr, status) {
                            _this.removeClass("pointer-events-none");
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let id = talkingAnswerCallback['id'];
                                let talking_id = talkingAnswerCallback['talking_id'];
                                let answer = talkingAnswerCallback['answer'];
                                let answerDetectLang = talkingAnswerCallback['answer_detect_lang'];
                                let answerType = talkingAnswerCallback['answer_type'];
                                let senderLastName = talkingAnswerCallback['sender_last_name'];
                                let senderId = talkingAnswerCallback['sender_id'];
                                let talkingSenderLastName = talkingAnswerCallback['talking_sender_last_name'];
                                let talkingSenderUserId = talkingAnswerCallback['talking_sender_user_id'];
                                let createdAt = talkingAnswerCallback['created_at'];
                                let updatedAt = talkingAnswerCallback['updated_at'];
                                let isEditing = talkingAnswerCallback['is_editing'];

                                $("#talk #talkings .talking-answer-input-group #talking-answer-id-input-" + dataTalkingId).val("");
                                autosize.destroy($("#talk #talkings .talking-answer-input-group #talking-answer-id-input-" + dataTalkingId));
                                setTimeout(
                                    function () {
                                        autosize($("#talk #talkings .talking-answer-input-group #talking-answer-id-input-" + dataTalkingId));
                                        $('*[data-talk-box-id=' + dataTalkingId + ']').removeClass("active").addClass("inactive");

                                        $('#talk #talkings .talk-box.talk-box-' + talking_id + ' .talk-answer-wrap').prepend(
                                            '<div id="talk-answer-' + id + '" class="talk-answer talk-answer-' + id + '">' +
                                            '<div class="talk-answer-by">' +
                                            '<span class="who"><span data-i18n="anlihouse-A337"></span></span>' +
                                            '<span class="time active" data-time-relative="' + createdAt + '">' + utility.getDateTimeRelative(createdAt) + '</span>' +
                                            '<span class="edit" data-i18n="anlihouse-A338" data-answer="' + answer.replace(/<br *\/?>/gi, '\n') + '" data-answer_id="' + id + '" data-talking_id="' + talking_id + '"></span>' +
                                            '</div>' + // End .talk-answer-by
                                            '<div class="text talk-answer-text-' + id + '">' +
                                            answer.replace(/\r?\n/g, '<br />') +
                                            '</div>' +
                                            '</div>' // End .talk-answer
                                        ).ready(function () {
                                            $('body').i18n();
                                        });

                                    }, 500);
                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                            _this.removeClass("pointer-events-none");
                            error = xhr['responseJSON'];

                            if (error['message']['message']['answer']) {
                                $('*[data-talk-box-id=' + dataTalkingId + ']').find(".talking-answer-error span").removeData("i18n");
                                $('*[data-talk-box-id=' + dataTalkingId + ']').find(".talking-answer-error span").text("");
                                $('*[data-talk-box-id=' + dataTalkingId + ']').find(".talking-answer-error span").attr("data-i18n", error['message']['message']['answer']);
                                $('*[data-talk-box-id=' + dataTalkingId + ']').find(".talking-answer-error").removeClass("d-none");

                                $('body').i18n();
                            } else {
                                $('*[data-talk-box-id=' + dataTalkingId + ']').find(".talking-answer-error span").removeData("i18n");
                                $('*[data-talk-box-id=' + dataTalkingId + ']').find(".talking-answer-error span").text("");
                                $('*[data-talk-box-id=' + dataTalkingId + ']').find(".talking-answer-error").addClass("d-none");
                                $('body').i18n();
                            }

                            $talkingAnswerInput.on("keyup", function (event) {
                                event.stopPropagation();

                                $('*[data-talk-box-id=' + dataTalkingId + ']').find(".talking-answer-error span").removeData("i18n");
                                $('*[data-talk-box-id=' + dataTalkingId + ']').find(".talking-answer-error span").text("");
                                $('*[data-talk-box-id=' + dataTalkingId + ']').find(".talking-answer-error").addClass("d-none");
                                $('body').i18n();
                            });
                        }
                    });

                });
            },

            talkingEditingAnswer: function () {
                autosize($("#editingTalkingAnswerModal #talking-answer-edit-input.talking-answer-edit-input"));

                $("body").on("click", "#talk #talkings .talk-answer-by .edit", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataTalkingId = _this.attr("data-talking_id");
                    const dataAnswerId = _this.attr("data-answer_id");
                    const dataAnswer = _this.attr("data-answer");

                    $("#editingTalkingAnswerModal #talking-answer-edit-input.talking-answer-edit-input").val("");
                    $("#editingTalkingAnswerModal #talking-answer-edit-input.talking-answer-edit-input").val(dataAnswer);

                    $("#editingTalkingAnswerModal .talking-answer-edit-counter").html("");
                    shortAndSweet("#editingTalkingAnswerModal #talking-answer-edit-input.talking-answer-edit-input", {
                        counterLabel: '{length}/{maxlength}',
                        counterClassName: 'count',
                        append: (el, counter) => {
                            const count = document.querySelector('#editingTalkingAnswerModal .talking-answer-edit-counter');
                            count.appendChild(counter);
                        }
                    });

                    $("#editingTalkingAnswerModal #talking-answer-edit-form #talkingAnswerEditId").val("");
                    autosize.destroy($("#editingTalkingAnswerModal #talking-answer-edit-input.talking-answer-edit-input"));

                    $("#editingTalkingAnswerModal #talking-answer-edit-form #talkingAnswerEditId").val(dataAnswerId);
                    setTimeout(
                        function () {
                            autosize($("#editingTalkingAnswerModal #talking-answer-edit-input.talking-answer-edit-input"));
                        }, 500);

                    $(".modal#editingTalkingAnswerModal #delete-talking-answer-form-button").removeClass("btn-primary action").addClass("btn-danger").attr('disabled', false);
                    $(".modal#editingTalkingAnswerModal #delete-talking-answer-form-button .delete-lock").removeClass("inactive d-none").addClass("active");
                    $(".modal#editingTalkingAnswerModal #delete-talking-answer-form-button .delete-unlock").removeClass("active").addClass("inactive d-none");

                    $('#editingTalkingAnswerModal').modal('show');
                });

                $("body").on("click", ".modal#editingTalkingAnswerModal .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#editingTalkingAnswerModal').modal('hide');
                });

                $("body").on("click", ".modal#editingTalkingAnswerModal #delete-talking-answer-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);
                    let $lock = _this.find(".delete-lock");
                    let $unlock = _this.find(".delete-unlock");

                    if ($unlock.hasClass("active")) {
                        let talkingAnswerCallback;
                        $.ajax({
                            type: "POST",
                            url: "/_talking-answer-delete",
                            contentType: "application/json",
                            data: JSON.stringify($("#talking-answer-edit-form").serializeObject()),
                            beforeSend: function (xhr) {
                                _this.attr('disabled', true);
                                _this.addClass("action");
                                //$("#editingTalkingAnswerModal").removeClass("filter-grayscale-0");
                                //$("#editingTalkingAnswerModal").addClass("filter-grayscale-100");
                                $("#post-loader").toggleClass("active inactive");
                                $("body").css({"overflow": "hidden"});
                            },
                            success: function (result, status, xhr) {
                                talkingAnswerCallback = result['message']
                            },
                            complete: function (xhr, status) {
                                let statusCode = xhr['status'];

                                if (statusCode === 200) {
                                    let talking_answer_id = talkingAnswerCallback['talking_answer_id'];
                                    setTimeout(
                                        function () {
                                            $("#talk-wrap #talkings.talkings-ajax .talk-answer-wrap .talk-answer.talk-answer-" + talking_answer_id).detach();
                                            _this.attr('disabled', false);
                                            _this.removeClass("action");
                                            //$("#editingTalkingAnswerModal").removeClass("filter-grayscale-100");
                                            //$("#editingTalkingAnswerModal").addClass("filter-grayscale-0");
                                            $("#post-loader").toggleClass("inactive active");
                                            $("body").removeAttr("style");
                                            $('#editingTalkingAnswerModal').modal('hide');
                                        }, 1500);
                                }
                            },
                            error: function (xhr, status, error) {
                                $("#editingTalkingAnswerModal").addClass("filter-grayscale-0");
                                _this.attr('disabled', false);
                                _this.removeClass("action");
                            }
                        });
                    }

                    if ($lock.hasClass("active")) {
                        $lock.removeClass("active").addClass("inactive d-none");
                        $unlock.removeClass("inactive d-none").addClass("active");
                        _this.removeClass("btn-danger").addClass("btn-primary");
                    }
                });

                $("body").on("click", ".modal#editingTalkingAnswerModal #edit-talking-answer-form-button", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let talkingAnswerCallback;
                    $.ajax({
                        type: "POST",
                        url: "/_talking-answer-edit",
                        contentType: "application/json",
                        data: JSON.stringify($("#talking-answer-edit-form").serializeObject()),
                        beforeSend: function (xhr) {
                            _this.attr('disabled', true);
                            _this.addClass("action");
                            //$("#editingTalkingAnswerModal").removeClass("filter-grayscale-0");
                            //$("#editingTalkingAnswerModal").addClass("filter-grayscale-100");
                            $("#post-loader").toggleClass("active inactive");
                            $("body").css({"overflow": "hidden"});
                        },
                        success: function (result, status, xhr) {
                            talkingAnswerCallback = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let talking_answer_id = talkingAnswerCallback['talking_answer_id'];
                                let answer = talkingAnswerCallback['answer'];
                                let answer_detect_lang = talkingAnswerCallback['answer_detect_lang'];
                                setTimeout(
                                    function () {
                                        $("#talk-wrap #talkings.talkings-ajax .talk-answer-wrap .talk-answer.talk-answer-" + talking_answer_id).find(".text.talk-answer-text-" + talking_answer_id).html(answer.replace(/\r?\n/g, '<br />'));
                                        $("#talk #talkings .talk-answer-by").find('.edit[data-answer_id=' + talking_answer_id + ']').attr("data-answer", answer.replace(/<br *\/?>/gi, '\n'))
                                        _this.attr('disabled', false);
                                        _this.removeClass("action");
                                        //$("#editingTalkingAnswerModal").removeClass("filter-grayscale-100");
                                        //$("#editingTalkingAnswerModal").addClass("filter-grayscale-0");
                                        $("#post-loader").toggleClass("inactive active");
                                        $("body").removeAttr("style");
                                        $('#editingTalkingAnswerModal').modal('hide');
                                    }, 1500);
                            }
                        },
                        error: function (xhr, status, error) {
                            //$("#editingTalkingAnswerModal").removeClass("filter-grayscale-100");
                            //$("#editingTalkingAnswerModal").addClass("filter-grayscale-0");
                            $("#post-loader").toggleClass("inactive active");
                            $("body").removeAttr("style");
                            _this.attr('disabled', false);
                            _this.removeClass("action");
                        }
                    });
                });
            },

            talkingAnswerHistory: function () {
                $("body").on("click", "#talk #talkings .talk-answer-by .history", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataTalkAnswerId = _this.attr("data-talk_answer_id");
                    const dataSenderName = _this.attr("data-sender_name");

                    let talkingAnswerHistoryCallback;
                    $.ajax({
                        type: "POST",
                        url: "/_get-talking-answer-history",
                        contentType: "application/json",
                        data: JSON.stringify({"talking_answer_id": dataTalkAnswerId}),
                        beforeSend: function (xhr) {
                        },
                        success: function (result, status, xhr) {
                            talkingAnswerHistoryCallback = result['message']
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let talking_answer_history = talkingAnswerHistoryCallback['talking_answer_history']

                                if (Array.isArray(talking_answer_history) && talking_answer_history.length) {
                                    $("#historyTalkingAnswer #talking-answer-history").html("");

                                    for (let i = 0; i < talking_answer_history.length; i++) {
                                        $("#historyTalkingAnswer #talking-answer-history").append(
                                            '<figure>' +
                                            '<blockquote class="blockquote">' +
                                            '<p>' +
                                            talking_answer_history[i]['answer'].replace(/\r?\n/g, '<br />') +
                                            '</p>' +
                                            '</blockquote>' +
                                            '<figcaption class="blockquote-footer">' +
                                            dataSenderName + ' <cite title="Source Title">' + utility.getDateTimeLLLL(talking_answer_history[i]['created_at']) + '</cite>' +
                                            '</figcaption>' +
                                            '</figure>'
                                        ).ready(function () {
                                            $('#historyTalkingAnswer').modal('show');
                                        });
                                    }
                                }
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });

                });

                $("body").on("click", ".modal#historyTalking .modal-close", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    $('#historyTalking').modal('hide');
                });
            },

            talkingAnswerAnswer: function () {
                $("body").on("click", "#talk #talkings .talk-answer-by .reply", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataTalkAnswerId = _this.attr("data-talk_answer_id");
                    const dataTypeAnswer = _this.attr("data-type-answer");
                    const dataSenderUserLastName = _this.attr("data-sender_user_last_name");

                    autosize($("#talkings .talking-answer-answer-input-group #talking-answer-answer-id-input-" + dataTalkAnswerId));

                    $("#talkings .talking-answer-answer-input-group #talking-answer-answer-id-input-" + dataTalkAnswerId).prop("placeholder", $.i18n("anlihouse-A359"));
                    $("#talkings .talking-answer-answer-input-group #talking-answer-answer-id-input-" + dataTalkAnswerId).attr("data-counter-label", $.i18n("anlihouse-A327"));

                    if (dataTypeAnswer === "talkinganswer") {
                        $("#talkings .talking-answer-answer-input-group #talking-answer-answer-id-input-" + dataTalkAnswerId).val("@" + dataSenderUserLastName + " ");
                    }

                    $("#talkings .talking-answer-answer-counter.talking-answer-id-elem-" + dataTalkAnswerId).html("");
                    shortAndSweet("#talkings .talking-answer-answer-input-group #talking-answer-answer-id-input-" + dataTalkAnswerId, {
                        counterLabel: '{length}/{maxlength}',
                        counterClassName: 'count',
                        append: (el, counter) => {
                            const count = document.querySelector("#talkings .talking-answer-answer-counter.talking-answer-id-elem-" + dataTalkAnswerId);
                            count.appendChild(counter);
                        }
                    });

                    const $talkingAnswerInputGroup = $("#talkings .talk-answer-wrap").find('.talking-answer-input-group[data-talk-answer-box-id="' + dataTalkAnswerId + '"]');
                    if ($talkingAnswerInputGroup.hasClass("inactive")) {
                        $talkingAnswerInputGroup.removeClass("inactive").addClass("active");
                    } else {
                        $talkingAnswerInputGroup.removeClass("active").addClass("inactive");
                    }
                });

                $("body").on("click", "#talk #talkings .talking-answer-answer-input-group .talking-answer-answer-input-btn", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    const dataTalkingId = _this.attr("data-talking_id");
                    const dataTalkingAnswerId = _this.attr("data-talking_answer_id");
                    const dataTypeAnswer = _this.attr("data-type-answer");

                    const $talkingAnswerInput = $("#talkings .talking-answer-answer-input-group #talking-answer-answer-id-input-" + dataTalkingAnswerId);
                    const talkingAnswerInputVal = $talkingAnswerInput.val();

                    let talkingAnswerCallback;
                    $.ajax({
                        type: "POST",
                        url: "/_post-talking-answer",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "talking_id": dataTalkingId,
                            "talking_answer_id": dataTalkingAnswerId,
                            "answer": talkingAnswerInputVal,
                            "answer_type": dataTypeAnswer
                        }),
                        beforeSend: function (xhr) {
                            _this.addClass("pointer-events-none");
                        },
                        success: function (result, status, xhr) {
                            talkingAnswerCallback = result['message']['talking_answer_data']
                        },
                        complete: function (xhr, status) {
                            _this.removeClass("pointer-events-none");
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                let id = talkingAnswerCallback['id'];
                                let talking_id = talkingAnswerCallback['talking_id'];
                                let answer = talkingAnswerCallback['answer'];
                                let answerDetectLang = talkingAnswerCallback['answer_detect_lang'];
                                let answerType = talkingAnswerCallback['answer_type'];
                                let senderLastName = talkingAnswerCallback['sender_last_name'];
                                let senderId = talkingAnswerCallback['sender_id'];
                                let talkingSenderLastName = talkingAnswerCallback['talking_sender_last_name'];
                                let talkingSenderUserId = talkingAnswerCallback['talking_sender_user_id'];
                                let createdAt = talkingAnswerCallback['created_at'];
                                let updatedAt = talkingAnswerCallback['updated_at'];
                                let isEditing = talkingAnswerCallback['is_editing'];

                                $("#talkings .talking-answer-answer-input-group #talking-answer-answer-id-input-" + dataTalkingAnswerId).val("");
                                autosize.destroy($("#talkings .talking-answer-answer-input-group #talking-answer-answer-id-input-" + dataTalkingAnswerId));
                                setTimeout(
                                    function () {
                                        autosize($("#talkings .talking-answer-answer-input-group #talking-answer-answer-id-input-" + dataTalkingAnswerId));
                                        $("#talkings .talk-answer-wrap").find('.talking-answer-input-group[data-talk-answer-box-id="' + dataTalkingAnswerId + '"]').removeClass("active").addClass("inactive");

                                        $('#talk #talkings .talk-box.talk-box-' + talking_id + ' .talk-answer-wrap .talk-answer.talk-answer-' + dataTalkingAnswerId).append(
                                            '<div id="talk-answer-' + id + '" class="talk-answer talk-answer-' + id + '">' +
                                            '<div class="talk-answer-by">' +
                                            '<span class="who"><span data-i18n="anlihouse-A337"></span></span>' +
                                            '<span class="time active" data-time-relative="' + createdAt + '">' + utility.getDateTimeRelative(createdAt) + '</span>' +
                                            '<span class="edit" data-i18n="anlihouse-A338" data-answer="' + answer.replace(/<br *\/?>/gi, '\n') + '" data-answer_id="' + id + '" data-talking_id="' + talking_id + '"></span>' +
                                            '</div>' + // End .talk-answer-by
                                            '<div class="text talk-answer-text-' + id + '">' +
                                            answer.replace(/\r?\n/g, '<br />') +
                                            '</div>' +
                                            '</div>' // End .talk-answer
                                        ).ready(function () {
                                            $('body').i18n();
                                        });

                                    }, 500);
                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                            _this.removeClass("pointer-events-none");
                            error = xhr['responseJSON'];

                            if (error['message']['message']['answer']) {
                                $('*[data-talk-answer-box-id=' + dataTalkingAnswerId + ']').find(".talking-answer-answer-error span").removeData("i18n");
                                $('*[data-talk-answer-box-id=' + dataTalkingAnswerId + ']').find(".talking-answer-answer-error span").text("");
                                $('*[data-talk-answer-box-id=' + dataTalkingAnswerId + ']').find(".talking-answer-answer-error span").attr("data-i18n", error['message']['message']['answer']);
                                $('*[data-talk-answer-box-id=' + dataTalkingAnswerId + ']').find(".talking-answer-answer-error").removeClass("d-none");

                                $('body').i18n();
                            } else {
                                $('*[data-talk-answer-box-id=' + dataTalkingAnswerId + ']').find(".talking-answer-answer-error span").removeData("i18n");
                                $('*[data-talk-answer-box-id=' + dataTalkingAnswerId + ']').find(".talking-answer-answer-error span").text("");
                                $('*[data-talk-answer-box-id=' + dataTalkingAnswerId + ']').find(".talking-answer-answer-error").addClass("d-none");
                                $('body').i18n();
                            }

                            $talkingAnswerInput.on("keyup", function (event) {
                                event.stopPropagation();

                                $('*[data-talk-answer-box-id=' + dataTalkingAnswerId + ']').find(".talking-answer-answer-error span").removeData("i18n");
                                $('*[data-talk-answer-box-id=' + dataTalkingAnswerId + ']').find(".talking-answer-answer-error span").text("");
                                $('*[data-talk-answer-box-id=' + dataTalkingAnswerId + ']').find(".talking-answer-answer-error").addClass("d-none");
                                $('body').i18n();
                            });
                        }
                    });

                });
            },

            talkingVote: function () {

                let arrowUpEmpty = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="bi bi-caret-up" viewBox="0 0 16 16"><path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/></svg>';
                let arrowDownEmpty = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="bi bi-caret-down" viewBox="0 0 16 16"><path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/></svg>';

                let arrowUpFull = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="bi bi-caret-up-fill" viewBox="0 0 16 16"><path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/></svg>';
                let arrowDownFull = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" class="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>';

                function voteShow(elem, count, user_vote, user_vote_action) {
                    let $talkingsTalkBox = $("#talkings .talk-box.talk-box-" + elem);

                    if (user_vote_action === "added") {
                        if (user_vote === "up") {
                            $talkingsTalkBox.find(".up").html(arrowUpFull);
                            $talkingsTalkBox.find(".down").html(arrowDownEmpty);
                        } else if (user_vote === "down") {
                            $talkingsTalkBox.find(".up").html(arrowUpEmpty);
                            $talkingsTalkBox.find(".down").html(arrowDownFull);
                        } else {
                            $talkingsTalkBox.find(".up").html(arrowUpEmpty);
                            $talkingsTalkBox.find(".down").html(arrowDownEmpty);
                        }
                    } else if (user_vote_action === "rm") {
                        $talkingsTalkBox.find(".up").html(arrowUpEmpty);
                        $talkingsTalkBox.find(".down").html(arrowDownEmpty);
                    } else {
                        $talkingsTalkBox.find(".up").html(arrowUpEmpty);
                        $talkingsTalkBox.find(".down").html(arrowDownEmpty);
                    }

                    $talkingsTalkBox.find(".counter").html(count);

                    if (count <= -3) {
                        $talkingsTalkBox.find(".after .text").css({"opacity": "0.5"});
                    } else {
                        $talkingsTalkBox.find(".after .text").css({"opacity": "1"});
                    }
                }

                $("body").on("click", "#talk #talkings .talk .before .up", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataTalkingId = _this.attr("data-talking_id");
                    let dataVote = _this.attr("data-vote");

                    let talkingVoteCount,
                        user_vote,
                        user_vote_action;

                    let postTalkVoteData;
                    $.ajax({
                        type: "POST",
                        url: "/_post-talk-vote",
                        contentType: "application/json",
                        data: JSON.stringify({"talking_id": dataTalkingId, "vote": dataVote}),
                        beforeSend: function (xhr) {
                            let $talkingsTalkBox = $("#talkings .talk-box.talk-box-" + dataTalkingId);
                            $talkingsTalkBox.find(".up").html(arrowUpFull);
                            $talkingsTalkBox.find(".down").html(arrowDownEmpty);
                        },
                        success: function (result, status, xhr) {
                            postTalkVoteData = result['message']

                            talkingVoteCount = postTalkVoteData['talking_vote_count'];
                            user_vote = postTalkVoteData['user_vote'];
                            user_vote_action = postTalkVoteData['user_vote_action'];
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                voteShow(dataTalkingId, talkingVoteCount, user_vote, user_vote_action);
                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });

                });

                $("body").on("click", "#talk #talkings .talk .before .down", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataTalkingId = _this.attr("data-talking_id");
                    let dataVote = _this.attr("data-vote");

                    let talkingVoteCount,
                        user_vote,
                        user_vote_action;

                    let postTalkVoteData;
                    $.ajax({
                        type: "POST",
                        url: "/_post-talk-vote",
                        contentType: "application/json",
                        data: JSON.stringify({"talking_id": dataTalkingId, "vote": dataVote}),
                        beforeSend: function (xhr) {
                            let $talkingsTalkBox = $("#talkings .talk-box.talk-box-" + dataTalkingId);
                            $talkingsTalkBox.find(".up").html(arrowUpEmpty);
                            $talkingsTalkBox.find(".down").html(arrowDownFull);
                        },
                        success: function (result, status, xhr) {
                            postTalkVoteData = result['message'];

                            talkingVoteCount = postTalkVoteData['talking_vote_count'];
                            user_vote = postTalkVoteData['user_vote'];
                            user_vote_action = postTalkVoteData['user_vote_action'];
                        },
                        complete: function (xhr, status) {
                            let statusCode = xhr['status'];

                            if (statusCode === 200) {
                                voteShow(dataTalkingId, talkingVoteCount, user_vote, user_vote_action);
                            } else {
                            }
                        },
                        error: function (xhr, status, error) {
                        }
                    });

                });

            },

            translateTalking: function () {

                // Start Talking
                $("body").on("click", "#talkings .talk .translation[data-type='talking']", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataTalkingId = _this.attr("data-talking_id");
                    let $talkingElem = $('#talkings .talk .after .text[data-talking_id=' + dataTalkingId + ']');
                    let talkingElemData = $talkingElem.html().trim();

                    if (_this.hasClass("inactive")) {
                        let translateCallback;
                        $.ajax({
                            type: "POST",
                            url: "/_translate",
                            contentType: "application/json",
                            data: JSON.stringify({
                                    "source": cookies.abBrowserLang,
                                    "target": $talkingElem.attr("data-experience_detect_lang"),
                                    "sourceData": talkingElemData,
                                    "translateType": "talking",
                                    "translateTypeID": $talkingElem.attr("data-subcategory_id"),
                                    "translateTypeData": "talking"
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
                                    $talkingElem.attr("data-source", translateCallback['source_data']);
                                    $talkingElem.attr("data-target", translateCallback['target_data']);

                                    _this.removeData("i18n");
                                    _this.text("");
                                    _this.attr("data-i18n", "anlihouse-A366");

                                    $talkingElem.html(translateCallback['target_data']);
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
                        if ($talkingElem.attr("data-source") !== "") {
                            _this.removeData("i18n");
                            _this.text("");
                            _this.attr("data-i18n", "anlihouse-A340");
                            $('body').i18n();

                            $talkingElem.html($talkingElem.attr("data-source"));
                        }
                        _this.toggleClass("active inactive");
                    } else {
                    }
                });
                // End Talking

                // Start Talking Answer
                $("body").on("click", "#talkings .talk-answer-wrap .translation[data-type='talkinganswer']", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataTalkingAnswerId = _this.attr("data-answer_id");
                    let $talkingAnswerElem = $('#talkings .talk-answer-wrap .text[data-answer_id=' + dataTalkingAnswerId + ']');
                    let talkingAnswerElemData = $talkingAnswerElem.html().trim();

                    if (_this.hasClass("inactive")) {
                        let translateCallback;
                        $.ajax({
                            type: "POST",
                            url: "/_translate",
                            contentType: "application/json",
                            data: JSON.stringify({
                                    "source": cookies.abBrowserLang,
                                    "target": $talkingAnswerElem.attr("data-answer_detect_lang"),
                                    "sourceData": talkingAnswerElemData,
                                    "translateType": "talking",
                                    "translateTypeID": $talkingAnswerElem.attr("data-subcategory_id"),
                                    "translateTypeData": "talkinganswer"
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
                                    $talkingAnswerElem.attr("data-source", translateCallback['source_data']);
                                    $talkingAnswerElem.attr("data-target", translateCallback['target_data']);

                                    _this.removeData("i18n");
                                    _this.text("");
                                    _this.attr("data-i18n", "anlihouse-A366");

                                    $talkingAnswerElem.html(translateCallback['target_data']);
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
                        if ($talkingAnswerElem.attr("data-source") !== "") {
                            _this.removeData("i18n");
                            _this.text("");
                            _this.attr("data-i18n", "anlihouse-A340");
                            $('body').i18n();

                            $talkingAnswerElem.html($talkingAnswerElem.attr("data-source"));
                        }
                        _this.toggleClass("active inactive");
                    } else {
                    }
                });
                // End Talking Answer

            },

            initializ: function () {
                loadTalk.talkRule();
                loadTalk.talkInput();
                loadTalk.talkingPost();
                loadTalk.talkingGet();
                loadTalk.talkingDataFormatting();
                loadTalk.talkingEditing();
                loadTalk.talkingHistory();
                loadTalk.talkingAnswer();
                loadTalk.talkingEditingAnswer();
                loadTalk.talkingAnswerHistory();
                loadTalk.talkingAnswerAnswer();
                loadTalk.talkingVote();
                loadTalk.translateTalking();
            }

        };

        $(function () {
            loadTalk.initializ()
        });
    }
}

export let anlibreedersTalk = new AnlibreedersTalk();