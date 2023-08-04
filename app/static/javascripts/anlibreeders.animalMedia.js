import AnlibreedersUtility from './utilities/anlibreeders.utility'
import {cookies} from "brownies";
import PDFObject from "pdfobject/pdfobject"
import io from 'socket.io-client';

const utility = new AnlibreedersUtility();

class AnlibreedersAnimalMedia {
    loadAnlibreedersAnimalMedia() {
        const loadAnimalMedia = {

            uploadingAnimalImages: function () {
                let cropperImg01;
                let img01CropData;
                let file01Error;

                let cropperImg02;
                let img02CropData;
                let file02Error;

                let cropperImg03;
                let img03CropData;
                let file03Error;

                let cropperImg04;
                let img04CropData;
                let file04Error;

                let cropperImg05;
                let img05CropData;
                let file05Error;

                let cropperImg06;
                let img06CropData;
                let file06Error;

                let cropperImg07;
                let img07CropData;
                let file07Error;

                let cropperImg08;
                let img08CropData;
                let file08Error;

                let cropperImg09;
                let img09CropData;
                let file09Error;

                let cropperImg10;
                let img10CropData;
                let file10Error;

                let maxSizeImg;
                if (process.env.NODE_ENV === "production") {
                    maxSizeImg = process.env.PRODUCTION_IMG_MAX_SIZE
                } else {
                    maxSizeImg = process.env.DEVELOPMENT_IMG_MAX_SIZE
                }

                // Start IMG 01
                $("body").on("click", "#uploading-animal-form #uploadingAnimalImg01, #uploading-animal-form .animal.img01.img-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg01) {
                        cropperImg01.destroy();
                        img01CropData = {};
                    }

                    $("#uploading-animal-form .animal.img01.img-icon").upload({
                        "action": "/uploading-animal-img-upload",
                        "label": "",
                        "multiple": false,
                        "maxSize": maxSizeImg,
                        "theme": "",
                        beforeSend: onBeforeSend
                    }).on("start.upload", onStart)
                        .on("complete.upload", onComplete)
                        .on("filestart.upload", onFileStart)
                        .on("fileprogress.upload", onFileProgress)
                        .on("filecomplete.upload", onFileComplete)
                        .on("fileerror.upload", onFileError)
                        .on("queued.upload", onQueued);

                    $("#uploading-animal-form").off("click", ".img-cancel.progress-rm.img01");
                    $("#uploading-animal-form").on("click", ".img-cancel.progress-rm.img01", onCancel);

                    function onCancel(e) {
                        $("#uploading-animal-form .animal.img01.img-icon").upload("abort");
                        $("#uploading-animal-form .animal.img01.progress").addClass("d-none");
                        $("#uploading-animal-form .animal.img01.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                        $("#uploading-animal-form .animal.img01.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img01.progress .progress-bar .file-size").html("");
                        $("#uploading-animal-form .animal.img01.progress .progress-bar").css({"width": "0"});
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
                        $("#uploading-animal-form .animal.img01.progress").removeClass("d-none");
                        $("#uploading-animal-form .animal.img01.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img01.progress .progress-bar").css({"width": "0"});
                    }

                    function onFileProgress(event, file, percent) {
                        $("#uploading-animal-form .animal.img01.progress .progress-bar .file-percent").html(percent + "%");
                        $("#uploading-animal-form .animal.img01.progress .progress-bar").css({"width": percent + "%"})
                    }

                    function onFileComplete(event, file, response) {
                        let fileSize = utility.getFormatBytes(file['size']);
                        $("#uploading-animal-form .animal.img01.progress .progress-bar").removeClass("progress-bar-striped").addClass("bg-success");
                        $("#uploading-animal-form .animal.img01.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                        let img = document.getElementById('animal-new-img01-cropper');
                        img.src = JSON.parse(response).data;

                        setTimeout(
                            function () {
                                $("#uploading-animal-form .animal.img01.progress").addClass("d-none");
                                $("#uploading-animal-form .animal.img01.cropper-img").removeClass("d-none");
                                $("#uploading-animal-form .animal.img01.trash-icon").removeClass("d-none");
                                $("#uploading-animal-form .animal.img01.img-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg01").val(JSON.parse(response).filename);
                                $("#uploading-animal-form #uploadingAnimalImg01, #uploading-animal-form .animal.img01.img-icon").addClass("pointer-events-none");
                                $("#uploading-animal-form .animal.img01.trash-back-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg01Status").val("new");

                                $("#uploading-animal-form").find(".uploading-animal-img01-error span").removeData("i18n");
                                $("#uploading-animal-form").find(".uploading-animal-img01-error span").text("");
                                $("#uploading-animal-form").find(".uploading-animal-img01-error").addClass("d-none");

                                $("#uploading-animal-form .animal.img01.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                                $("#uploading-animal-form .animal.img01.progress .progress-bar .file-percent").html("0%");
                                $("#uploading-animal-form .animal.img01.progress .progress-bar .file-size").html("");
                                $("#uploading-animal-form .animal.img01.progress .progress-bar").css({"width": "0"});

                                setTimeout(
                                    function () {
                                        cropperImg01 = new Cropper(img, {
                                            viewMode: 1,
                                            aspectRatio: 16 / 9,
                                            dragMode: 'move',
                                            cropBoxMovable: false,
                                            cropBoxResizable: false,
                                            toggleDragModeOnDblclick: false,
                                            responsive: true,
                                            crop: function (event) {
                                                let width = event.detail.width,
                                                    height = event.detail.height,
                                                    x = event.detail.x,
                                                    y = event.detail.y,
                                                    x2 = (Math.round(x) + Math.round(width)),
                                                    y2 = (Math.round(y) + Math.round(height)),
                                                    rotate = event.detail.rotate,
                                                    scaleX = event.detail.scaleX,
                                                    scaleY = event.detail.scaleY;
                                                img01CropData = {
                                                    "aspectRatio": 16 / 9,
                                                    "width": width,
                                                    "height": height,
                                                    "x": x,
                                                    "y": y,
                                                    "x2": x2,
                                                    "y2": y2,
                                                    "rotate": rotate,
                                                    "scaleX": scaleX,
                                                    "scaleY": scaleY,
                                                    "folder": JSON.parse(response).folder,
                                                    "filename": JSON.parse(response).filename,
                                                };
                                                $("#uploadingAnimalImg01Data").val(JSON.stringify(img01CropData));
                                            }
                                        });
                                    }, 500);

                            }, 2000);
                    }

                    function onFileError(event, file, error) {
                        if (error) {
                            file01Error = {"fileSize": utility.getFormatBytes(file['size']), "error": error}

                            $("#uploading-animal-form .animal.img01.progress").addClass("d-none");
                            $("#uploading-animal-form .animal.img01.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                            $("#uploading-animal-form .animal.img01.progress .progress-bar .file-percent").html("0%");
                            $("#uploading-animal-form .animal.img01.progress .progress-bar .file-size").html("");
                            $("#uploading-animal-form .animal.img01.progress .progress-bar").css({"width": "0"});

                            let $uploadingAnimalForm = $("#uploading-animal-form");

                            if (file01Error['error'] === "Request Entity Too Large" || file01Error['error'] === "size") {
                                $uploadingAnimalForm.find(".uploading-animal-img01-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img01-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img01-error span").attr("data-i18n", "anlihouse-A136");
                                $uploadingAnimalForm.find(".uploading-animal-img01-error").removeClass("d-none");
                                $('body').i18n();
                            } else if (file01Error['error'] === "Unsupported Media Type") {
                                $uploadingAnimalForm.find(".uploading-animal-img01-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img01-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img01-error span").attr("data-i18n", "anlihouse-A134");
                                $uploadingAnimalForm.find(".uploading-animal-img01-error").removeClass("d-none");
                                $('body').i18n();
                            }

                        }
                    }

                    $("#uploading-animal-form .animal.img01.img-icon .fs-upload-target").trigger("click");
                });

                $("body").on("click", "#uploading-animal-form .animal.img01.trash-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg01) {
                        cropperImg01.destroy();
                        img01CropData = {};
                    }

                    $("#uploading-animal-form .animal.img01 .cropper-container.cropper-bg").each(function () {
                        $(this).detach();
                    });

                    $("#uploading-animal-form #uploadingAnimalImg01Data").val(null);
                    $("#uploading-animal-form #uploadingAnimalImg01").val(null);
                    $("#uploading-animal-form .animal.img01.trash-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img01.crop-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img01.crop-back-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img01.img-icon").removeClass("d-none");
                    $("#uploading-animal-form .animal.img01.cropper-img").addClass("d-none");
                    $("#uploading-animal-form .animal.img01.animal-edit-img01-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg01, #uploading-animal-form .animal.img01.img-icon").removeClass("pointer-events-none");

                    $("#uploading-animal-form .uploadingAnimalImg01Show").find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "");
                    $("#uploading-animal-form .uploadingAnimalImg01Show").find(".animal.animal-edit-img-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg01Status").val("rm");
                    if ($("#uploading-animal-form #uploadingAnimalImg01DataOld").val() !== "") {
                        $("#uploading-animal-form .animal.img01.trash-back-icon").removeClass("d-none");
                    }
                });

                $("body").on("click", "#uploading-animal-form .animal.img01.crop-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img01.crop-back-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg01Status").val("editing");

                    if (cropperImg01) {
                        cropperImg01.destroy();
                    }

                    let $uploadingAnimalImg01Show = $("#uploading-animal-form .uploadingAnimalImg01Show");
                    let $uploadingAnimalImg01 = $uploadingAnimalImg01Show.find("#uploadingAnimalImg01");
                    $uploadingAnimalImg01Show.find(".animal.img01.trash-icon").addClass("d-none");
                    let uploadingAnimalImg01DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg01DataOld").val());

                    let img_edit = document.getElementById('animal-new-img01-cropper-edit');
                    img_edit.src = "/static/images/animal/" + uploadingAnimalImg01DataOld['folder'] + "/origin/" + uploadingAnimalImg01DataOld['filename'];

                    setTimeout(
                        function () {
                            $uploadingAnimalImg01Show.find(".animal.animal-edit-img-preview").addClass("d-none");
                            $uploadingAnimalImg01Show.find(".animal.cropper-img-edit").removeClass("d-none");

                            setTimeout(
                                function () {
                                    cropperImg01 = new Cropper(img_edit, {
                                        viewMode: 1,
                                        aspectRatio: 16 / 9,
                                        dragMode: 'move',
                                        cropBoxMovable: false,
                                        cropBoxResizable: false,
                                        toggleDragModeOnDblclick: false,
                                        responsive: true,
                                        crop: function (event) {
                                            let width = event.detail.width,
                                                height = event.detail.height,
                                                x = event.detail.x,
                                                y = event.detail.y,
                                                x2 = (Math.round(x) + Math.round(width)),
                                                y2 = (Math.round(y) + Math.round(height)),
                                                rotate = event.detail.rotate,
                                                scaleX = event.detail.scaleX,
                                                scaleY = event.detail.scaleY;
                                            img01CropData = {
                                                "aspectRatio": 16 / 9,
                                                "width": width,
                                                "height": height,
                                                "x": x,
                                                "y": y,
                                                "x2": x2,
                                                "y2": y2,
                                                "rotate": rotate,
                                                "scaleX": scaleX,
                                                "scaleY": scaleY,
                                                "folder": uploadingAnimalImg01DataOld['folder'],
                                                "filename": uploadingAnimalImg01DataOld['filename'],
                                            };
                                            $("#uploading-animal-form #uploadingAnimalImg01Data").val(JSON.stringify(img01CropData));
                                        }
                                    });
                                }, 500);

                        }, 500);


                });

                $("body").on("click", "#uploading-animal-form .animal.img01.crop-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img01.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg01Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg01Data").val($("#uploading-animal-form #uploadingAnimalImg01DataOld").val());

                    let $uploadingAnimalImg01Show = $("#uploading-animal-form .uploadingAnimalImg01Show");
                    let $uploadingAnimalImg01 = $uploadingAnimalImg01Show.find("#uploadingAnimalImg01");

                    if (cropperImg01) {
                        cropperImg01.destroy();
                    }

                    $uploadingAnimalImg01Show.find(".animal.img01.trash-icon").removeClass("d-none");
                    $uploadingAnimalImg01Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg01Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                });

                $("body").on("click", "#uploading-animal-form .animal.img01.trash-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img01.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg01Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg01Data").val($("#uploading-animal-form #uploadingAnimalImg01DataOld").val());

                    let $uploadingAnimalImg01Show = $("#uploading-animal-form .uploadingAnimalImg01Show");
                    let $uploadingAnimalImg01 = $uploadingAnimalImg01Show.find("#uploadingAnimalImg01");

                    if (cropperImg01) {
                        cropperImg01.destroy();
                    }

                    $uploadingAnimalImg01Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg01Show.find(".animal.img01.img-icon").addClass("d-none");
                    $uploadingAnimalImg01Show.find(".animal.img01.trash-icon").removeClass("d-none");

                    let uploadingAnimalImg01DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg01DataOld").val());

                    $uploadingAnimalImg01Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + uploadingAnimalImg01DataOld['folder'] + "/cropped/" + uploadingAnimalImg01DataOld['filename']);
                    $uploadingAnimalImg01Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg01").addClass("pointer-events-none");
                    $("#uploading-animal-form #uploadingAnimalImg01").val(uploadingAnimalImg01DataOld['filename']);
                });
                // End IMG 01

                // Start IMG 02
                $("body").on("click", "#uploading-animal-form #uploadingAnimalImg02, #uploading-animal-form .animal.img02.img-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg02) {
                        cropperImg02.destroy();
                        img02CropData = {};
                    }

                    $("#uploading-animal-form .animal.img02.img-icon").upload({
                        "action": "/uploading-animal-img-upload",
                        "label": "",
                        "multiple": false,
                        "maxSize": maxSizeImg,
                        "theme": "",
                        beforeSend: onBeforeSend
                    }).on("start.upload", onStart)
                        .on("complete.upload", onComplete)
                        .on("filestart.upload", onFileStart)
                        .on("fileprogress.upload", onFileProgress)
                        .on("filecomplete.upload", onFileComplete)
                        .on("fileerror.upload", onFileError)
                        .on("queued.upload", onQueued);

                    $("#uploading-animal-form").off("click", ".img-cancel.progress-rm.img02");
                    $("#uploading-animal-form").on("click", ".img-cancel.progress-rm.img02", onCancel);

                    function onCancel(e) {
                        $("#uploading-animal-form .animal.img02.img-icon").upload("abort");
                        $("#uploading-animal-form .animal.img02.progress").addClass("d-none");
                        $("#uploading-animal-form .animal.img02.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                        $("#uploading-animal-form .animal.img02.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img02.progress .progress-bar .file-size").html("");
                        $("#uploading-animal-form .animal.img02.progress .progress-bar").css({"width": "0"});
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
                        $("#uploading-animal-form .animal.img02.progress").removeClass("d-none");
                        $("#uploading-animal-form .animal.img02.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img02.progress .progress-bar").css({"width": "0"});
                    }

                    function onFileProgress(event, file, percent) {
                        $("#uploading-animal-form .animal.img02.progress .progress-bar .file-percent").html(percent + "%");
                        $("#uploading-animal-form .animal.img02.progress .progress-bar").css({"width": percent + "%"})
                    }

                    function onFileComplete(event, file, response) {
                        let fileSize = utility.getFormatBytes(file['size']);
                        $("#uploading-animal-form .animal.img02.progress .progress-bar").removeClass("progress-bar-striped").addClass("bg-success");
                        $("#uploading-animal-form .animal.img02.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                        let img = document.getElementById('animal-new-img02-cropper');
                        img.src = JSON.parse(response).data;

                        setTimeout(
                            function () {
                                $("#uploading-animal-form .animal.img02.progress").addClass("d-none");
                                $("#uploading-animal-form .animal.img02.cropper-img").removeClass("d-none");
                                $("#uploading-animal-form .animal.img02.trash-icon").removeClass("d-none");
                                $("#uploading-animal-form .animal.img02.img-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg02").val(JSON.parse(response).filename);
                                $("#uploading-animal-form #uploadingAnimalImg02, #uploading-animal-form .animal.img02.img-icon").addClass("pointer-events-none");
                                $("#uploading-animal-form .animal.img02.trash-back-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg02Status").val("new");

                                $("#uploading-animal-form").find(".uploading-animal-img02-error span").removeData("i18n");
                                $("#uploading-animal-form").find(".uploading-animal-img02-error span").text("");
                                $("#uploading-animal-form").find(".uploading-animal-img02-error").addClass("d-none");

                                $("#uploading-animal-form .animal.img02.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                                $("#uploading-animal-form .animal.img02.progress .progress-bar .file-percent").html("0%");
                                $("#uploading-animal-form .animal.img02.progress .progress-bar .file-size").html("");
                                $("#uploading-animal-form .animal.img02.progress .progress-bar").css({"width": "0"});

                                setTimeout(
                                    function () {
                                        cropperImg02 = new Cropper(img, {
                                            viewMode: 1,
                                            aspectRatio: 16 / 9,
                                            dragMode: 'move',
                                            cropBoxMovable: false,
                                            cropBoxResizable: false,
                                            toggleDragModeOnDblclick: false,
                                            responsive: true,
                                            crop: function (event) {
                                                let width = event.detail.width,
                                                    height = event.detail.height,
                                                    x = event.detail.x,
                                                    y = event.detail.y,
                                                    x2 = (Math.round(x) + Math.round(width)),
                                                    y2 = (Math.round(y) + Math.round(height)),
                                                    rotate = event.detail.rotate,
                                                    scaleX = event.detail.scaleX,
                                                    scaleY = event.detail.scaleY;
                                                img02CropData = {
                                                    "aspectRatio": 16 / 9,
                                                    "width": width,
                                                    "height": height,
                                                    "x": x,
                                                    "y": y,
                                                    "x2": x2,
                                                    "y2": y2,
                                                    "rotate": rotate,
                                                    "scaleX": scaleX,
                                                    "scaleY": scaleY,
                                                    "folder": JSON.parse(response).folder,
                                                    "filename": JSON.parse(response).filename,
                                                };
                                                $("#uploadingAnimalImg02Data").val(JSON.stringify(img02CropData));
                                            }
                                        });
                                    }, 500);

                            }, 2000);
                    }

                    function onFileError(event, file, error) {
                        if (error) {
                            file02Error = {"fileSize": utility.getFormatBytes(file['size']), "error": error}

                            $("#uploading-animal-form .animal.img02.progress").addClass("d-none");
                            $("#uploading-animal-form .animal.img02.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                            $("#uploading-animal-form .animal.img02.progress .progress-bar .file-percent").html("0%");
                            $("#uploading-animal-form .animal.img02.progress .progress-bar .file-size").html("");
                            $("#uploading-animal-form .animal.img02.progress .progress-bar").css({"width": "0"});

                            let $uploadingAnimalForm = $("#uploading-animal-form");

                            if (file02Error['error'] === "Request Entity Too Large" || file02Error['error'] === "size") {
                                $uploadingAnimalForm.find(".uploading-animal-img02-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img02-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img02-error span").attr("data-i18n", "anlihouse-A136");
                                $uploadingAnimalForm.find(".uploading-animal-img02-error").removeClass("d-none");
                                $('body').i18n();
                            } else if (file02Error['error'] === "Unsupported Media Type") {
                                $uploadingAnimalForm.find(".uploading-animal-img02-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img02-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img02-error span").attr("data-i18n", "anlihouse-A134");
                                $uploadingAnimalForm.find(".uploading-animal-img02-error").removeClass("d-none");
                                $('body').i18n();
                            }

                        }
                    }

                    $("#uploading-animal-form .animal.img02.img-icon .fs-upload-target").trigger("click");
                });

                $("body").on("click", "#uploading-animal-form .animal.img02.trash-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg02) {
                        cropperImg02.destroy();
                        img02CropData = {};
                    }

                    $("#uploading-animal-form .animal.img02 .cropper-container.cropper-bg").each(function () {
                        $(this).detach();
                    });

                    $("#uploading-animal-form #uploadingAnimalImg02Data").val(null);
                    $("#uploading-animal-form #uploadingAnimalImg02").val(null);
                    $("#uploading-animal-form .animal.img02.trash-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img02.crop-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img02.crop-back-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img02.img-icon").removeClass("d-none");
                    $("#uploading-animal-form .animal.img02.cropper-img").addClass("d-none");
                    $("#uploading-animal-form .animal.img02.animal-edit-img02-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg02, #uploading-animal-form .animal.img02.img-icon").removeClass("pointer-events-none");

                    $("#uploading-animal-form .uploadingAnimalImg02Show").find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "");
                    $("#uploading-animal-form .uploadingAnimalImg02Show").find(".animal.animal-edit-img-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg02Status").val("rm");
                    if ($("#uploading-animal-form #uploadingAnimalImg02DataOld").val() !== "") {
                        $("#uploading-animal-form .animal.img02.trash-back-icon").removeClass("d-none");
                    }
                });

                $("body").on("click", "#uploading-animal-form .animal.img02.crop-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img02.crop-back-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg02Status").val("editing");

                    if (cropperImg02) {
                        cropperImg02.destroy();
                    }

                    let $uploadingAnimalImg02Show = $("#uploading-animal-form .uploadingAnimalImg02Show");
                    let $uploadingAnimalImg02 = $uploadingAnimalImg02Show.find("#uploadingAnimalImg02");
                    $uploadingAnimalImg02Show.find(".animal.img02.trash-icon").addClass("d-none");
                    let uploadingAnimalImg02DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg02DataOld").val());

                    let img_edit = document.getElementById('animal-new-img02-cropper-edit');
                    img_edit.src = "/static/images/animal/" + uploadingAnimalImg02DataOld['folder'] + "/origin/" + uploadingAnimalImg02DataOld['filename'];

                    setTimeout(
                        function () {
                            $uploadingAnimalImg02Show.find(".animal.animal-edit-img-preview").addClass("d-none");
                            $uploadingAnimalImg02Show.find(".animal.cropper-img-edit").removeClass("d-none");

                            setTimeout(
                                function () {
                                    cropperImg02 = new Cropper(img_edit, {
                                        viewMode: 1,
                                        aspectRatio: 16 / 9,
                                        dragMode: 'move',
                                        cropBoxMovable: false,
                                        cropBoxResizable: false,
                                        toggleDragModeOnDblclick: false,
                                        responsive: true,
                                        crop: function (event) {
                                            let width = event.detail.width,
                                                height = event.detail.height,
                                                x = event.detail.x,
                                                y = event.detail.y,
                                                x2 = (Math.round(x) + Math.round(width)),
                                                y2 = (Math.round(y) + Math.round(height)),
                                                rotate = event.detail.rotate,
                                                scaleX = event.detail.scaleX,
                                                scaleY = event.detail.scaleY;
                                            img02CropData = {
                                                "aspectRatio": 16 / 9,
                                                "width": width,
                                                "height": height,
                                                "x": x,
                                                "y": y,
                                                "x2": x2,
                                                "y2": y2,
                                                "rotate": rotate,
                                                "scaleX": scaleX,
                                                "scaleY": scaleY,
                                                "folder": uploadingAnimalImg02DataOld['folder'],
                                                "filename": uploadingAnimalImg02DataOld['filename'],
                                            };
                                            $("#uploading-animal-form #uploadingAnimalImg02Data").val(JSON.stringify(img02CropData));
                                        }
                                    });
                                }, 500);

                        }, 500);


                });

                $("body").on("click", "#uploading-animal-form .animal.img02.crop-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img02.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg02Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg02Data").val($("#uploading-animal-form #uploadingAnimalImg02DataOld").val());

                    let $uploadingAnimalImg02Show = $("#uploading-animal-form .uploadingAnimalImg02Show");
                    let $uploadingAnimalImg02 = $uploadingAnimalImg02Show.find("#uploadingAnimalImg02");

                    if (cropperImg02) {
                        cropperImg02.destroy();
                    }

                    $uploadingAnimalImg02Show.find(".animal.img02.trash-icon").removeClass("d-none");
                    $uploadingAnimalImg02Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg02Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                });

                $("body").on("click", "#uploading-animal-form .animal.img02.trash-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img02.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg02Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg02Data").val($("#uploading-animal-form #uploadingAnimalImg02DataOld").val());

                    let $uploadingAnimalImg02Show = $("#uploading-animal-form .uploadingAnimalImg02Show");
                    let $uploadingAnimalImg02 = $uploadingAnimalImg02Show.find("#uploadingAnimalImg02");

                    if (cropperImg02) {
                        cropperImg02.destroy();
                    }

                    $uploadingAnimalImg02Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg02Show.find(".animal.img02.img-icon").addClass("d-none");
                    $uploadingAnimalImg02Show.find(".animal.img02.trash-icon").removeClass("d-none");

                    let uploadingAnimalImg02DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg02DataOld").val());

                    $uploadingAnimalImg02Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + uploadingAnimalImg02DataOld['folder'] + "/cropped/" + uploadingAnimalImg02DataOld['filename']);
                    $uploadingAnimalImg02Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg02").addClass("pointer-events-none");
                    $("#uploading-animal-form #uploadingAnimalImg02").val(uploadingAnimalImg02DataOld['filename']);
                });
                // End IMG 02

                // Start IMG 03
                $("body").on("click", "#uploading-animal-form #uploadingAnimalImg03, #uploading-animal-form .animal.img03.img-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg03) {
                        cropperImg03.destroy();
                        img03CropData = {};
                    }

                    $("#uploading-animal-form .animal.img03.img-icon").upload({
                        "action": "/uploading-animal-img-upload",
                        "label": "",
                        "multiple": false,
                        "maxSize": maxSizeImg,
                        "theme": "",
                        beforeSend: onBeforeSend
                    }).on("start.upload", onStart)
                        .on("complete.upload", onComplete)
                        .on("filestart.upload", onFileStart)
                        .on("fileprogress.upload", onFileProgress)
                        .on("filecomplete.upload", onFileComplete)
                        .on("fileerror.upload", onFileError)
                        .on("queued.upload", onQueued);

                    $("#uploading-animal-form").off("click", ".img-cancel.progress-rm.img03");
                    $("#uploading-animal-form").on("click", ".img-cancel.progress-rm.img03", onCancel);

                    function onCancel(e) {
                        $("#uploading-animal-form .animal.img03.img-icon").upload("abort");
                        $("#uploading-animal-form .animal.img03.progress").addClass("d-none");
                        $("#uploading-animal-form .animal.img03.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                        $("#uploading-animal-form .animal.img03.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img03.progress .progress-bar .file-size").html("");
                        $("#uploading-animal-form .animal.img03.progress .progress-bar").css({"width": "0"});
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
                        $("#uploading-animal-form .animal.img03.progress").removeClass("d-none");
                        $("#uploading-animal-form .animal.img03.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img03.progress .progress-bar").css({"width": "0"});
                    }

                    function onFileProgress(event, file, percent) {
                        $("#uploading-animal-form .animal.img03.progress .progress-bar .file-percent").html(percent + "%");
                        $("#uploading-animal-form .animal.img03.progress .progress-bar").css({"width": percent + "%"})
                    }

                    function onFileComplete(event, file, response) {
                        let fileSize = utility.getFormatBytes(file['size']);
                        $("#uploading-animal-form .animal.img03.progress .progress-bar").removeClass("progress-bar-striped").addClass("bg-success");
                        $("#uploading-animal-form .animal.img03.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                        let img = document.getElementById('animal-new-img03-cropper');
                        img.src = JSON.parse(response).data;

                        setTimeout(
                            function () {
                                $("#uploading-animal-form .animal.img03.progress").addClass("d-none");
                                $("#uploading-animal-form .animal.img03.cropper-img").removeClass("d-none");
                                $("#uploading-animal-form .animal.img03.trash-icon").removeClass("d-none");
                                $("#uploading-animal-form .animal.img03.img-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg03").val(JSON.parse(response).filename);
                                $("#uploading-animal-form #uploadingAnimalImg03, #uploading-animal-form .animal.img03.img-icon").addClass("pointer-events-none");
                                $("#uploading-animal-form .animal.img03.trash-back-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg03Status").val("new");

                                $("#uploading-animal-form").find(".uploading-animal-img03-error span").removeData("i18n");
                                $("#uploading-animal-form").find(".uploading-animal-img03-error span").text("");
                                $("#uploading-animal-form").find(".uploading-animal-img03-error").addClass("d-none");

                                $("#uploading-animal-form .animal.img03.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                                $("#uploading-animal-form .animal.img03.progress .progress-bar .file-percent").html("0%");
                                $("#uploading-animal-form .animal.img03.progress .progress-bar .file-size").html("");
                                $("#uploading-animal-form .animal.img03.progress .progress-bar").css({"width": "0"});

                                setTimeout(
                                    function () {
                                        cropperImg03 = new Cropper(img, {
                                            viewMode: 1,
                                            aspectRatio: 16 / 9,
                                            dragMode: 'move',
                                            cropBoxMovable: false,
                                            cropBoxResizable: false,
                                            toggleDragModeOnDblclick: false,
                                            responsive: true,
                                            crop: function (event) {
                                                let width = event.detail.width,
                                                    height = event.detail.height,
                                                    x = event.detail.x,
                                                    y = event.detail.y,
                                                    x2 = (Math.round(x) + Math.round(width)),
                                                    y2 = (Math.round(y) + Math.round(height)),
                                                    rotate = event.detail.rotate,
                                                    scaleX = event.detail.scaleX,
                                                    scaleY = event.detail.scaleY;
                                                img03CropData = {
                                                    "aspectRatio": 16 / 9,
                                                    "width": width,
                                                    "height": height,
                                                    "x": x,
                                                    "y": y,
                                                    "x2": x2,
                                                    "y2": y2,
                                                    "rotate": rotate,
                                                    "scaleX": scaleX,
                                                    "scaleY": scaleY,
                                                    "folder": JSON.parse(response).folder,
                                                    "filename": JSON.parse(response).filename,
                                                };
                                                $("#uploadingAnimalImg03Data").val(JSON.stringify(img03CropData));
                                            }
                                        });
                                    }, 500);

                            }, 2000);
                    }

                    function onFileError(event, file, error) {
                        if (error) {
                            file03Error = {"fileSize": utility.getFormatBytes(file['size']), "error": error}

                            $("#uploading-animal-form .animal.img03.progress").addClass("d-none");
                            $("#uploading-animal-form .animal.img03.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                            $("#uploading-animal-form .animal.img03.progress .progress-bar .file-percent").html("0%");
                            $("#uploading-animal-form .animal.img03.progress .progress-bar .file-size").html("");
                            $("#uploading-animal-form .animal.img03.progress .progress-bar").css({"width": "0"});

                            let $uploadingAnimalForm = $("#uploading-animal-form");

                            if (file03Error['error'] === "Request Entity Too Large" || file03Error['error'] === "size") {
                                $uploadingAnimalForm.find(".uploading-animal-img03-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img03-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img03-error span").attr("data-i18n", "anlihouse-A136");
                                $uploadingAnimalForm.find(".uploading-animal-img03-error").removeClass("d-none");
                                $('body').i18n();
                            } else if (file03Error['error'] === "Unsupported Media Type") {
                                $uploadingAnimalForm.find(".uploading-animal-img03-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img03-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img03-error span").attr("data-i18n", "anlihouse-A134");
                                $uploadingAnimalForm.find(".uploading-animal-img03-error").removeClass("d-none");
                                $('body').i18n();
                            }

                        }
                    }

                    $("#uploading-animal-form .animal.img03.img-icon .fs-upload-target").trigger("click");
                });

                $("body").on("click", "#uploading-animal-form .animal.img03.trash-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg03) {
                        cropperImg03.destroy();
                        img03CropData = {};
                    }

                    $("#uploading-animal-form .animal.img03 .cropper-container.cropper-bg").each(function () {
                        $(this).detach();
                    });

                    $("#uploading-animal-form #uploadingAnimalImg03Data").val(null);
                    $("#uploading-animal-form #uploadingAnimalImg03").val(null);
                    $("#uploading-animal-form .animal.img03.trash-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img03.crop-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img03.crop-back-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img03.img-icon").removeClass("d-none");
                    $("#uploading-animal-form .animal.img03.cropper-img").addClass("d-none");
                    $("#uploading-animal-form .animal.img03.animal-edit-img03-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg03, #uploading-animal-form .animal.img03.img-icon").removeClass("pointer-events-none");

                    $("#uploading-animal-form .uploadingAnimalImg03Show").find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "");
                    $("#uploading-animal-form .uploadingAnimalImg03Show").find(".animal.animal-edit-img-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg03Status").val("rm");
                    if ($("#uploading-animal-form #uploadingAnimalImg03DataOld").val() !== "") {
                        $("#uploading-animal-form .animal.img03.trash-back-icon").removeClass("d-none");
                    }
                });

                $("body").on("click", "#uploading-animal-form .animal.img03.crop-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img03.crop-back-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg03Status").val("editing");

                    if (cropperImg03) {
                        cropperImg03.destroy();
                    }

                    let $uploadingAnimalImg03Show = $("#uploading-animal-form .uploadingAnimalImg03Show");
                    let $uploadingAnimalImg03 = $uploadingAnimalImg03Show.find("#uploadingAnimalImg03");
                    $uploadingAnimalImg03Show.find(".animal.img03.trash-icon").addClass("d-none");
                    let uploadingAnimalImg03DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg03DataOld").val());

                    let img_edit = document.getElementById('animal-new-img03-cropper-edit');
                    img_edit.src = "/static/images/animal/" + uploadingAnimalImg03DataOld['folder'] + "/origin/" + uploadingAnimalImg03DataOld['filename'];

                    setTimeout(
                        function () {
                            $uploadingAnimalImg03Show.find(".animal.animal-edit-img-preview").addClass("d-none");
                            $uploadingAnimalImg03Show.find(".animal.cropper-img-edit").removeClass("d-none");

                            setTimeout(
                                function () {
                                    cropperImg03 = new Cropper(img_edit, {
                                        viewMode: 1,
                                        aspectRatio: 16 / 9,
                                        dragMode: 'move',
                                        cropBoxMovable: false,
                                        cropBoxResizable: false,
                                        toggleDragModeOnDblclick: false,
                                        responsive: true,
                                        crop: function (event) {
                                            let width = event.detail.width,
                                                height = event.detail.height,
                                                x = event.detail.x,
                                                y = event.detail.y,
                                                x2 = (Math.round(x) + Math.round(width)),
                                                y2 = (Math.round(y) + Math.round(height)),
                                                rotate = event.detail.rotate,
                                                scaleX = event.detail.scaleX,
                                                scaleY = event.detail.scaleY;
                                            img03CropData = {
                                                "aspectRatio": 16 / 9,
                                                "width": width,
                                                "height": height,
                                                "x": x,
                                                "y": y,
                                                "x2": x2,
                                                "y2": y2,
                                                "rotate": rotate,
                                                "scaleX": scaleX,
                                                "scaleY": scaleY,
                                                "folder": uploadingAnimalImg03DataOld['folder'],
                                                "filename": uploadingAnimalImg03DataOld['filename'],
                                            };
                                            $("#uploading-animal-form #uploadingAnimalImg03Data").val(JSON.stringify(img03CropData));
                                        }
                                    });
                                }, 500);

                        }, 500);


                });

                $("body").on("click", "#uploading-animal-form .animal.img03.crop-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img03.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg03Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg03Data").val($("#uploading-animal-form #uploadingAnimalImg03DataOld").val());

                    let $uploadingAnimalImg03Show = $("#uploading-animal-form .uploadingAnimalImg03Show");
                    let $uploadingAnimalImg03 = $uploadingAnimalImg03Show.find("#uploadingAnimalImg03");

                    if (cropperImg03) {
                        cropperImg03.destroy();
                    }

                    $uploadingAnimalImg03Show.find(".animal.img03.trash-icon").removeClass("d-none");
                    $uploadingAnimalImg03Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg03Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                });

                $("body").on("click", "#uploading-animal-form .animal.img03.trash-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img03.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg03Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg03Data").val($("#uploading-animal-form #uploadingAnimalImg03DataOld").val());

                    let $uploadingAnimalImg03Show = $("#uploading-animal-form .uploadingAnimalImg03Show");
                    let $uploadingAnimalImg03 = $uploadingAnimalImg03Show.find("#uploadingAnimalImg03");

                    if (cropperImg03) {
                        cropperImg03.destroy();
                    }

                    $uploadingAnimalImg03Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg03Show.find(".animal.img03.img-icon").addClass("d-none");
                    $uploadingAnimalImg03Show.find(".animal.img03.trash-icon").removeClass("d-none");

                    let uploadingAnimalImg03DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg03DataOld").val());

                    $uploadingAnimalImg03Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + uploadingAnimalImg03DataOld['folder'] + "/cropped/" + uploadingAnimalImg03DataOld['filename']);
                    $uploadingAnimalImg03Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg03").addClass("pointer-events-none");
                    $("#uploading-animal-form #uploadingAnimalImg03").val(uploadingAnimalImg03DataOld['filename']);
                });
                // End IMG 03

                // Start IMG 04
                $("body").on("click", "#uploading-animal-form #uploadingAnimalImg04, #uploading-animal-form .animal.img04.img-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg04) {
                        cropperImg04.destroy();
                        img04CropData = {};
                    }

                    $("#uploading-animal-form .animal.img04.img-icon").upload({
                        "action": "/uploading-animal-img-upload",
                        "label": "",
                        "multiple": false,
                        "maxSize": maxSizeImg,
                        "theme": "",
                        beforeSend: onBeforeSend
                    }).on("start.upload", onStart)
                        .on("complete.upload", onComplete)
                        .on("filestart.upload", onFileStart)
                        .on("fileprogress.upload", onFileProgress)
                        .on("filecomplete.upload", onFileComplete)
                        .on("fileerror.upload", onFileError)
                        .on("queued.upload", onQueued);

                    $("#uploading-animal-form").off("click", ".img-cancel.progress-rm.img04");
                    $("#uploading-animal-form").on("click", ".img-cancel.progress-rm.img04", onCancel);

                    function onCancel(e) {
                        $("#uploading-animal-form .animal.img04.img-icon").upload("abort");
                        $("#uploading-animal-form .animal.img04.progress").addClass("d-none");
                        $("#uploading-animal-form .animal.img04.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                        $("#uploading-animal-form .animal.img04.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img04.progress .progress-bar .file-size").html("");
                        $("#uploading-animal-form .animal.img04.progress .progress-bar").css({"width": "0"});
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
                        $("#uploading-animal-form .animal.img04.progress").removeClass("d-none");
                        $("#uploading-animal-form .animal.img04.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img04.progress .progress-bar").css({"width": "0"});
                    }

                    function onFileProgress(event, file, percent) {
                        $("#uploading-animal-form .animal.img04.progress .progress-bar .file-percent").html(percent + "%");
                        $("#uploading-animal-form .animal.img04.progress .progress-bar").css({"width": percent + "%"})
                    }

                    function onFileComplete(event, file, response) {
                        let fileSize = utility.getFormatBytes(file['size']);
                        $("#uploading-animal-form .animal.img04.progress .progress-bar").removeClass("progress-bar-striped").addClass("bg-success");
                        $("#uploading-animal-form .animal.img04.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                        let img = document.getElementById('animal-new-img04-cropper');
                        img.src = JSON.parse(response).data;

                        setTimeout(
                            function () {
                                $("#uploading-animal-form .animal.img04.progress").addClass("d-none");
                                $("#uploading-animal-form .animal.img04.cropper-img").removeClass("d-none");
                                $("#uploading-animal-form .animal.img04.trash-icon").removeClass("d-none");
                                $("#uploading-animal-form .animal.img04.img-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg04").val(JSON.parse(response).filename);
                                $("#uploading-animal-form #uploadingAnimalImg04, #uploading-animal-form .animal.img04.img-icon").addClass("pointer-events-none");
                                $("#uploading-animal-form .animal.img04.trash-back-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg04Status").val("new");

                                $("#uploading-animal-form").find(".uploading-animal-img04-error span").removeData("i18n");
                                $("#uploading-animal-form").find(".uploading-animal-img04-error span").text("");
                                $("#uploading-animal-form").find(".uploading-animal-img04-error").addClass("d-none");

                                $("#uploading-animal-form .animal.img04.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                                $("#uploading-animal-form .animal.img04.progress .progress-bar .file-percent").html("0%");
                                $("#uploading-animal-form .animal.img04.progress .progress-bar .file-size").html("");
                                $("#uploading-animal-form .animal.img04.progress .progress-bar").css({"width": "0"});

                                setTimeout(
                                    function () {
                                        cropperImg04 = new Cropper(img, {
                                            viewMode: 1,
                                            aspectRatio: 16 / 9,
                                            dragMode: 'move',
                                            cropBoxMovable: false,
                                            cropBoxResizable: false,
                                            toggleDragModeOnDblclick: false,
                                            responsive: true,
                                            crop: function (event) {
                                                let width = event.detail.width,
                                                    height = event.detail.height,
                                                    x = event.detail.x,
                                                    y = event.detail.y,
                                                    x2 = (Math.round(x) + Math.round(width)),
                                                    y2 = (Math.round(y) + Math.round(height)),
                                                    rotate = event.detail.rotate,
                                                    scaleX = event.detail.scaleX,
                                                    scaleY = event.detail.scaleY;
                                                img04CropData = {
                                                    "aspectRatio": 16 / 9,
                                                    "width": width,
                                                    "height": height,
                                                    "x": x,
                                                    "y": y,
                                                    "x2": x2,
                                                    "y2": y2,
                                                    "rotate": rotate,
                                                    "scaleX": scaleX,
                                                    "scaleY": scaleY,
                                                    "folder": JSON.parse(response).folder,
                                                    "filename": JSON.parse(response).filename,
                                                };
                                                $("#uploadingAnimalImg04Data").val(JSON.stringify(img04CropData));
                                            }
                                        });
                                    }, 500);

                            }, 2000);
                    }

                    function onFileError(event, file, error) {
                        if (error) {
                            file04Error = {"fileSize": utility.getFormatBytes(file['size']), "error": error}

                            $("#uploading-animal-form .animal.img04.progress").addClass("d-none");
                            $("#uploading-animal-form .animal.img04.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                            $("#uploading-animal-form .animal.img04.progress .progress-bar .file-percent").html("0%");
                            $("#uploading-animal-form .animal.img04.progress .progress-bar .file-size").html("");
                            $("#uploading-animal-form .animal.img04.progress .progress-bar").css({"width": "0"});

                            let $uploadingAnimalForm = $("#uploading-animal-form");

                            if (file04Error['error'] === "Request Entity Too Large" || file04Error['error'] === "size") {
                                $uploadingAnimalForm.find(".uploading-animal-img04-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img04-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img04-error span").attr("data-i18n", "anlihouse-A136");
                                $uploadingAnimalForm.find(".uploading-animal-img04-error").removeClass("d-none");
                                $('body').i18n();
                            } else if (file04Error['error'] === "Unsupported Media Type") {
                                $uploadingAnimalForm.find(".uploading-animal-img04-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img04-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img04-error span").attr("data-i18n", "anlihouse-A134");
                                $uploadingAnimalForm.find(".uploading-animal-img04-error").removeClass("d-none");
                                $('body').i18n();
                            }

                        }
                    }

                    $("#uploading-animal-form .animal.img04.img-icon .fs-upload-target").trigger("click");
                });

                $("body").on("click", "#uploading-animal-form .animal.img04.trash-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg04) {
                        cropperImg04.destroy();
                        img04CropData = {};
                    }

                    $("#uploading-animal-form .animal.img04 .cropper-container.cropper-bg").each(function () {
                        $(this).detach();
                    });

                    $("#uploading-animal-form #uploadingAnimalImg04Data").val(null);
                    $("#uploading-animal-form #uploadingAnimalImg04").val(null);
                    $("#uploading-animal-form .animal.img04.trash-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img04.crop-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img04.crop-back-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img04.img-icon").removeClass("d-none");
                    $("#uploading-animal-form .animal.img04.cropper-img").addClass("d-none");
                    $("#uploading-animal-form .animal.img04.animal-edit-img04-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg04, #uploading-animal-form .animal.img04.img-icon").removeClass("pointer-events-none");

                    $("#uploading-animal-form .uploadingAnimalImg04Show").find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "");
                    $("#uploading-animal-form .uploadingAnimalImg04Show").find(".animal.animal-edit-img-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg04Status").val("rm");
                    if ($("#uploading-animal-form #uploadingAnimalImg04DataOld").val() !== "") {
                        $("#uploading-animal-form .animal.img04.trash-back-icon").removeClass("d-none");
                    }
                });

                $("body").on("click", "#uploading-animal-form .animal.img04.crop-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img04.crop-back-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg04Status").val("editing");

                    if (cropperImg04) {
                        cropperImg04.destroy();
                    }

                    let $uploadingAnimalImg04Show = $("#uploading-animal-form .uploadingAnimalImg04Show");
                    let $uploadingAnimalImg04 = $uploadingAnimalImg04Show.find("#uploadingAnimalImg04");
                    $uploadingAnimalImg04Show.find(".animal.img04.trash-icon").addClass("d-none");
                    let uploadingAnimalImg04DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg04DataOld").val());

                    let img_edit = document.getElementById('animal-new-img04-cropper-edit');
                    img_edit.src = "/static/images/animal/" + uploadingAnimalImg04DataOld['folder'] + "/origin/" + uploadingAnimalImg04DataOld['filename'];

                    setTimeout(
                        function () {
                            $uploadingAnimalImg04Show.find(".animal.animal-edit-img-preview").addClass("d-none");
                            $uploadingAnimalImg04Show.find(".animal.cropper-img-edit").removeClass("d-none");

                            setTimeout(
                                function () {
                                    cropperImg04 = new Cropper(img_edit, {
                                        viewMode: 1,
                                        aspectRatio: 16 / 9,
                                        dragMode: 'move',
                                        cropBoxMovable: false,
                                        cropBoxResizable: false,
                                        toggleDragModeOnDblclick: false,
                                        responsive: true,
                                        crop: function (event) {
                                            let width = event.detail.width,
                                                height = event.detail.height,
                                                x = event.detail.x,
                                                y = event.detail.y,
                                                x2 = (Math.round(x) + Math.round(width)),
                                                y2 = (Math.round(y) + Math.round(height)),
                                                rotate = event.detail.rotate,
                                                scaleX = event.detail.scaleX,
                                                scaleY = event.detail.scaleY;
                                            img04CropData = {
                                                "aspectRatio": 16 / 9,
                                                "width": width,
                                                "height": height,
                                                "x": x,
                                                "y": y,
                                                "x2": x2,
                                                "y2": y2,
                                                "rotate": rotate,
                                                "scaleX": scaleX,
                                                "scaleY": scaleY,
                                                "folder": uploadingAnimalImg04DataOld['folder'],
                                                "filename": uploadingAnimalImg04DataOld['filename'],
                                            };
                                            $("#uploading-animal-form #uploadingAnimalImg04Data").val(JSON.stringify(img04CropData));
                                        }
                                    });
                                }, 500);

                        }, 500);


                });

                $("body").on("click", "#uploading-animal-form .animal.img04.crop-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img04.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg04Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg04Data").val($("#uploading-animal-form #uploadingAnimalImg04DataOld").val());

                    let $uploadingAnimalImg04Show = $("#uploading-animal-form .uploadingAnimalImg04Show");
                    let $uploadingAnimalImg04 = $uploadingAnimalImg04Show.find("#uploadingAnimalImg04");

                    if (cropperImg04) {
                        cropperImg04.destroy();
                    }

                    $uploadingAnimalImg04Show.find(".animal.img04.trash-icon").removeClass("d-none");
                    $uploadingAnimalImg04Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg04Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                });

                $("body").on("click", "#uploading-animal-form .animal.img04.trash-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img04.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg04Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg04Data").val($("#uploading-animal-form #uploadingAnimalImg04DataOld").val());

                    let $uploadingAnimalImg04Show = $("#uploading-animal-form .uploadingAnimalImg04Show");
                    let $uploadingAnimalImg04 = $uploadingAnimalImg04Show.find("#uploadingAnimalImg04");

                    if (cropperImg04) {
                        cropperImg04.destroy();
                    }

                    $uploadingAnimalImg04Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg04Show.find(".animal.img04.img-icon").addClass("d-none");
                    $uploadingAnimalImg04Show.find(".animal.img04.trash-icon").removeClass("d-none");

                    let uploadingAnimalImg04DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg04DataOld").val());

                    $uploadingAnimalImg04Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + uploadingAnimalImg04DataOld['folder'] + "/cropped/" + uploadingAnimalImg04DataOld['filename']);
                    $uploadingAnimalImg04Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg04").addClass("pointer-events-none");
                    $("#uploading-animal-form #uploadingAnimalImg04").val(uploadingAnimalImg04DataOld['filename']);
                });
                // End IMG 04

                // Start IMG 05
                $("body").on("click", "#uploading-animal-form #uploadingAnimalImg05, #uploading-animal-form .animal.img05.img-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg05) {
                        cropperImg05.destroy();
                        img05CropData = {};
                    }

                    $("#uploading-animal-form .animal.img05.img-icon").upload({
                        "action": "/uploading-animal-img-upload",
                        "label": "",
                        "multiple": false,
                        "maxSize": maxSizeImg,
                        "theme": "",
                        beforeSend: onBeforeSend
                    }).on("start.upload", onStart)
                        .on("complete.upload", onComplete)
                        .on("filestart.upload", onFileStart)
                        .on("fileprogress.upload", onFileProgress)
                        .on("filecomplete.upload", onFileComplete)
                        .on("fileerror.upload", onFileError)
                        .on("queued.upload", onQueued);

                    $("#uploading-animal-form").off("click", ".img-cancel.progress-rm.img05");
                    $("#uploading-animal-form").on("click", ".img-cancel.progress-rm.img05", onCancel);

                    function onCancel(e) {
                        $("#uploading-animal-form .animal.img05.img-icon").upload("abort");
                        $("#uploading-animal-form .animal.img05.progress").addClass("d-none");
                        $("#uploading-animal-form .animal.img05.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                        $("#uploading-animal-form .animal.img05.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img05.progress .progress-bar .file-size").html("");
                        $("#uploading-animal-form .animal.img05.progress .progress-bar").css({"width": "0"});
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
                        $("#uploading-animal-form .animal.img05.progress").removeClass("d-none");
                        $("#uploading-animal-form .animal.img05.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img05.progress .progress-bar").css({"width": "0"});
                    }

                    function onFileProgress(event, file, percent) {
                        $("#uploading-animal-form .animal.img05.progress .progress-bar .file-percent").html(percent + "%");
                        $("#uploading-animal-form .animal.img05.progress .progress-bar").css({"width": percent + "%"})
                    }

                    function onFileComplete(event, file, response) {
                        let fileSize = utility.getFormatBytes(file['size']);
                        $("#uploading-animal-form .animal.img05.progress .progress-bar").removeClass("progress-bar-striped").addClass("bg-success");
                        $("#uploading-animal-form .animal.img05.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                        let img = document.getElementById('animal-new-img05-cropper');
                        img.src = JSON.parse(response).data;

                        setTimeout(
                            function () {
                                $("#uploading-animal-form .animal.img05.progress").addClass("d-none");
                                $("#uploading-animal-form .animal.img05.cropper-img").removeClass("d-none");
                                $("#uploading-animal-form .animal.img05.trash-icon").removeClass("d-none");
                                $("#uploading-animal-form .animal.img05.img-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg05").val(JSON.parse(response).filename);
                                $("#uploading-animal-form #uploadingAnimalImg05, #uploading-animal-form .animal.img05.img-icon").addClass("pointer-events-none");
                                $("#uploading-animal-form .animal.img05.trash-back-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg05Status").val("new");

                                $("#uploading-animal-form").find(".uploading-animal-img05-error span").removeData("i18n");
                                $("#uploading-animal-form").find(".uploading-animal-img05-error span").text("");
                                $("#uploading-animal-form").find(".uploading-animal-img05-error").addClass("d-none");

                                $("#uploading-animal-form .animal.img05.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                                $("#uploading-animal-form .animal.img05.progress .progress-bar .file-percent").html("0%");
                                $("#uploading-animal-form .animal.img05.progress .progress-bar .file-size").html("");
                                $("#uploading-animal-form .animal.img05.progress .progress-bar").css({"width": "0"});

                                setTimeout(
                                    function () {
                                        cropperImg05 = new Cropper(img, {
                                            viewMode: 1,
                                            aspectRatio: 16 / 9,
                                            dragMode: 'move',
                                            cropBoxMovable: false,
                                            cropBoxResizable: false,
                                            toggleDragModeOnDblclick: false,
                                            responsive: true,
                                            crop: function (event) {
                                                let width = event.detail.width,
                                                    height = event.detail.height,
                                                    x = event.detail.x,
                                                    y = event.detail.y,
                                                    x2 = (Math.round(x) + Math.round(width)),
                                                    y2 = (Math.round(y) + Math.round(height)),
                                                    rotate = event.detail.rotate,
                                                    scaleX = event.detail.scaleX,
                                                    scaleY = event.detail.scaleY;
                                                img05CropData = {
                                                    "aspectRatio": 16 / 9,
                                                    "width": width,
                                                    "height": height,
                                                    "x": x,
                                                    "y": y,
                                                    "x2": x2,
                                                    "y2": y2,
                                                    "rotate": rotate,
                                                    "scaleX": scaleX,
                                                    "scaleY": scaleY,
                                                    "folder": JSON.parse(response).folder,
                                                    "filename": JSON.parse(response).filename,
                                                };
                                                $("#uploadingAnimalImg05Data").val(JSON.stringify(img05CropData));
                                            }
                                        });
                                    }, 500);

                            }, 2000);
                    }

                    function onFileError(event, file, error) {
                        if (error) {
                            file05Error = {"fileSize": utility.getFormatBytes(file['size']), "error": error}

                            $("#uploading-animal-form .animal.img05.progress").addClass("d-none");
                            $("#uploading-animal-form .animal.img05.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                            $("#uploading-animal-form .animal.img05.progress .progress-bar .file-percent").html("0%");
                            $("#uploading-animal-form .animal.img05.progress .progress-bar .file-size").html("");
                            $("#uploading-animal-form .animal.img05.progress .progress-bar").css({"width": "0"});

                            let $uploadingAnimalForm = $("#uploading-animal-form");

                            if (file05Error['error'] === "Request Entity Too Large" || file05Error['error'] === "size") {
                                $uploadingAnimalForm.find(".uploading-animal-img05-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img05-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img05-error span").attr("data-i18n", "anlihouse-A136");
                                $uploadingAnimalForm.find(".uploading-animal-img05-error").removeClass("d-none");
                                $('body').i18n();
                            } else if (file05Error['error'] === "Unsupported Media Type") {
                                $uploadingAnimalForm.find(".uploading-animal-img05-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img05-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img05-error span").attr("data-i18n", "anlihouse-A134");
                                $uploadingAnimalForm.find(".uploading-animal-img05-error").removeClass("d-none");
                                $('body').i18n();
                            }

                        }
                    }

                    $("#uploading-animal-form .animal.img05.img-icon .fs-upload-target").trigger("click");
                });

                $("body").on("click", "#uploading-animal-form .animal.img05.trash-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg05) {
                        cropperImg05.destroy();
                        img05CropData = {};
                    }

                    $("#uploading-animal-form .animal.img05 .cropper-container.cropper-bg").each(function () {
                        $(this).detach();
                    });

                    $("#uploading-animal-form #uploadingAnimalImg05Data").val(null);
                    $("#uploading-animal-form #uploadingAnimalImg05").val(null);
                    $("#uploading-animal-form .animal.img05.trash-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img05.crop-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img05.crop-back-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img05.img-icon").removeClass("d-none");
                    $("#uploading-animal-form .animal.img05.cropper-img").addClass("d-none");
                    $("#uploading-animal-form .animal.img05.animal-edit-img05-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg05, #uploading-animal-form .animal.img05.img-icon").removeClass("pointer-events-none");

                    $("#uploading-animal-form .uploadingAnimalImg05Show").find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "");
                    $("#uploading-animal-form .uploadingAnimalImg05Show").find(".animal.animal-edit-img-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg05Status").val("rm");
                    if ($("#uploading-animal-form #uploadingAnimalImg05DataOld").val() !== "") {
                        $("#uploading-animal-form .animal.img05.trash-back-icon").removeClass("d-none");
                    }
                });

                $("body").on("click", "#uploading-animal-form .animal.img05.crop-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img05.crop-back-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg05Status").val("editing");

                    if (cropperImg05) {
                        cropperImg05.destroy();
                    }

                    let $uploadingAnimalImg05Show = $("#uploading-animal-form .uploadingAnimalImg05Show");
                    let $uploadingAnimalImg05 = $uploadingAnimalImg05Show.find("#uploadingAnimalImg05");
                    $uploadingAnimalImg05Show.find(".animal.img05.trash-icon").addClass("d-none");
                    let uploadingAnimalImg05DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg05DataOld").val());

                    let img_edit = document.getElementById('animal-new-img05-cropper-edit');
                    img_edit.src = "/static/images/animal/" + uploadingAnimalImg05DataOld['folder'] + "/origin/" + uploadingAnimalImg05DataOld['filename'];

                    setTimeout(
                        function () {
                            $uploadingAnimalImg05Show.find(".animal.animal-edit-img-preview").addClass("d-none");
                            $uploadingAnimalImg05Show.find(".animal.cropper-img-edit").removeClass("d-none");

                            setTimeout(
                                function () {
                                    cropperImg05 = new Cropper(img_edit, {
                                        viewMode: 1,
                                        aspectRatio: 16 / 9,
                                        dragMode: 'move',
                                        cropBoxMovable: false,
                                        cropBoxResizable: false,
                                        toggleDragModeOnDblclick: false,
                                        responsive: true,
                                        crop: function (event) {
                                            let width = event.detail.width,
                                                height = event.detail.height,
                                                x = event.detail.x,
                                                y = event.detail.y,
                                                x2 = (Math.round(x) + Math.round(width)),
                                                y2 = (Math.round(y) + Math.round(height)),
                                                rotate = event.detail.rotate,
                                                scaleX = event.detail.scaleX,
                                                scaleY = event.detail.scaleY;
                                            img05CropData = {
                                                "aspectRatio": 16 / 9,
                                                "width": width,
                                                "height": height,
                                                "x": x,
                                                "y": y,
                                                "x2": x2,
                                                "y2": y2,
                                                "rotate": rotate,
                                                "scaleX": scaleX,
                                                "scaleY": scaleY,
                                                "folder": uploadingAnimalImg05DataOld['folder'],
                                                "filename": uploadingAnimalImg05DataOld['filename'],
                                            };
                                            $("#uploading-animal-form #uploadingAnimalImg05Data").val(JSON.stringify(img05CropData));
                                        }
                                    });
                                }, 500);

                        }, 500);


                });

                $("body").on("click", "#uploading-animal-form .animal.img05.crop-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img05.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg05Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg05Data").val($("#uploading-animal-form #uploadingAnimalImg05DataOld").val());

                    let $uploadingAnimalImg05Show = $("#uploading-animal-form .uploadingAnimalImg05Show");
                    let $uploadingAnimalImg05 = $uploadingAnimalImg05Show.find("#uploadingAnimalImg05");

                    if (cropperImg05) {
                        cropperImg05.destroy();
                    }

                    $uploadingAnimalImg05Show.find(".animal.img05.trash-icon").removeClass("d-none");
                    $uploadingAnimalImg05Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg05Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                });

                $("body").on("click", "#uploading-animal-form .animal.img05.trash-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img05.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg05Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg05Data").val($("#uploading-animal-form #uploadingAnimalImg05DataOld").val());

                    let $uploadingAnimalImg05Show = $("#uploading-animal-form .uploadingAnimalImg05Show");
                    let $uploadingAnimalImg05 = $uploadingAnimalImg05Show.find("#uploadingAnimalImg05");

                    if (cropperImg05) {
                        cropperImg05.destroy();
                    }

                    $uploadingAnimalImg05Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg05Show.find(".animal.img05.img-icon").addClass("d-none");
                    $uploadingAnimalImg05Show.find(".animal.img05.trash-icon").removeClass("d-none");

                    let uploadingAnimalImg05DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg05DataOld").val());

                    $uploadingAnimalImg05Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + uploadingAnimalImg05DataOld['folder'] + "/cropped/" + uploadingAnimalImg05DataOld['filename']);
                    $uploadingAnimalImg05Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg05").addClass("pointer-events-none");
                    $("#uploading-animal-form #uploadingAnimalImg05").val(uploadingAnimalImg05DataOld['filename']);
                });
                // End IMG 05

                // Start IMG 06
                $("body").on("click", "#uploading-animal-form #uploadingAnimalImg06, #uploading-animal-form .animal.img06.img-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg06) {
                        cropperImg06.destroy();
                        img06CropData = {};
                    }

                    $("#uploading-animal-form .animal.img06.img-icon").upload({
                        "action": "/uploading-animal-img-upload",
                        "label": "",
                        "multiple": false,
                        "maxSize": maxSizeImg,
                        "theme": "",
                        beforeSend: onBeforeSend
                    }).on("start.upload", onStart)
                        .on("complete.upload", onComplete)
                        .on("filestart.upload", onFileStart)
                        .on("fileprogress.upload", onFileProgress)
                        .on("filecomplete.upload", onFileComplete)
                        .on("fileerror.upload", onFileError)
                        .on("queued.upload", onQueued);

                    $("#uploading-animal-form").off("click", ".img-cancel.progress-rm.img06");
                    $("#uploading-animal-form").on("click", ".img-cancel.progress-rm.img06", onCancel);

                    function onCancel(e) {
                        $("#uploading-animal-form .animal.img06.img-icon").upload("abort");
                        $("#uploading-animal-form .animal.img06.progress").addClass("d-none");
                        $("#uploading-animal-form .animal.img06.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                        $("#uploading-animal-form .animal.img06.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img06.progress .progress-bar .file-size").html("");
                        $("#uploading-animal-form .animal.img06.progress .progress-bar").css({"width": "0"});
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
                        $("#uploading-animal-form .animal.img06.progress").removeClass("d-none");
                        $("#uploading-animal-form .animal.img06.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img06.progress .progress-bar").css({"width": "0"});
                    }

                    function onFileProgress(event, file, percent) {
                        $("#uploading-animal-form .animal.img06.progress .progress-bar .file-percent").html(percent + "%");
                        $("#uploading-animal-form .animal.img06.progress .progress-bar").css({"width": percent + "%"})
                    }

                    function onFileComplete(event, file, response) {
                        let fileSize = utility.getFormatBytes(file['size']);
                        $("#uploading-animal-form .animal.img06.progress .progress-bar").removeClass("progress-bar-striped").addClass("bg-success");
                        $("#uploading-animal-form .animal.img06.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                        let img = document.getElementById('animal-new-img06-cropper');
                        img.src = JSON.parse(response).data;

                        setTimeout(
                            function () {
                                $("#uploading-animal-form .animal.img06.progress").addClass("d-none");
                                $("#uploading-animal-form .animal.img06.cropper-img").removeClass("d-none");
                                $("#uploading-animal-form .animal.img06.trash-icon").removeClass("d-none");
                                $("#uploading-animal-form .animal.img06.img-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg06").val(JSON.parse(response).filename);
                                $("#uploading-animal-form #uploadingAnimalImg06, #uploading-animal-form .animal.img06.img-icon").addClass("pointer-events-none");
                                $("#uploading-animal-form .animal.img06.trash-back-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg06Status").val("new");

                                $("#uploading-animal-form").find(".uploading-animal-img06-error span").removeData("i18n");
                                $("#uploading-animal-form").find(".uploading-animal-img06-error span").text("");
                                $("#uploading-animal-form").find(".uploading-animal-img06-error").addClass("d-none");

                                $("#uploading-animal-form .animal.img06.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                                $("#uploading-animal-form .animal.img06.progress .progress-bar .file-percent").html("0%");
                                $("#uploading-animal-form .animal.img06.progress .progress-bar .file-size").html("");
                                $("#uploading-animal-form .animal.img06.progress .progress-bar").css({"width": "0"});

                                setTimeout(
                                    function () {
                                        cropperImg06 = new Cropper(img, {
                                            viewMode: 1,
                                            aspectRatio: 16 / 9,
                                            dragMode: 'move',
                                            cropBoxMovable: false,
                                            cropBoxResizable: false,
                                            toggleDragModeOnDblclick: false,
                                            responsive: true,
                                            crop: function (event) {
                                                let width = event.detail.width,
                                                    height = event.detail.height,
                                                    x = event.detail.x,
                                                    y = event.detail.y,
                                                    x2 = (Math.round(x) + Math.round(width)),
                                                    y2 = (Math.round(y) + Math.round(height)),
                                                    rotate = event.detail.rotate,
                                                    scaleX = event.detail.scaleX,
                                                    scaleY = event.detail.scaleY;
                                                img06CropData = {
                                                    "aspectRatio": 16 / 9,
                                                    "width": width,
                                                    "height": height,
                                                    "x": x,
                                                    "y": y,
                                                    "x2": x2,
                                                    "y2": y2,
                                                    "rotate": rotate,
                                                    "scaleX": scaleX,
                                                    "scaleY": scaleY,
                                                    "folder": JSON.parse(response).folder,
                                                    "filename": JSON.parse(response).filename,
                                                };
                                                $("#uploadingAnimalImg06Data").val(JSON.stringify(img06CropData));
                                            }
                                        });
                                    }, 500);

                            }, 2000);
                    }

                    function onFileError(event, file, error) {
                        if (error) {
                            file06Error = {"fileSize": utility.getFormatBytes(file['size']), "error": error}

                            $("#uploading-animal-form .animal.img06.progress").addClass("d-none");
                            $("#uploading-animal-form .animal.img06.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                            $("#uploading-animal-form .animal.img06.progress .progress-bar .file-percent").html("0%");
                            $("#uploading-animal-form .animal.img06.progress .progress-bar .file-size").html("");
                            $("#uploading-animal-form .animal.img06.progress .progress-bar").css({"width": "0"});

                            let $uploadingAnimalForm = $("#uploading-animal-form");

                            if (file06Error['error'] === "Request Entity Too Large" || file06Error['error'] === "size") {
                                $uploadingAnimalForm.find(".uploading-animal-img06-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img06-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img06-error span").attr("data-i18n", "anlihouse-A136");
                                $uploadingAnimalForm.find(".uploading-animal-img06-error").removeClass("d-none");
                                $('body').i18n();
                            } else if (file06Error['error'] === "Unsupported Media Type") {
                                $uploadingAnimalForm.find(".uploading-animal-img06-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img06-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img06-error span").attr("data-i18n", "anlihouse-A134");
                                $uploadingAnimalForm.find(".uploading-animal-img06-error").removeClass("d-none");
                                $('body').i18n();
                            }

                        }
                    }

                    $("#uploading-animal-form .animal.img06.img-icon .fs-upload-target").trigger("click");
                });

                $("body").on("click", "#uploading-animal-form .animal.img06.trash-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg06) {
                        cropperImg06.destroy();
                        img06CropData = {};
                    }

                    $("#uploading-animal-form .animal.img06 .cropper-container.cropper-bg").each(function () {
                        $(this).detach();
                    });

                    $("#uploading-animal-form #uploadingAnimalImg06Data").val(null);
                    $("#uploading-animal-form #uploadingAnimalImg06").val(null);
                    $("#uploading-animal-form .animal.img06.trash-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img06.crop-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img06.crop-back-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img06.img-icon").removeClass("d-none");
                    $("#uploading-animal-form .animal.img06.cropper-img").addClass("d-none");
                    $("#uploading-animal-form .animal.img06.animal-edit-img06-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg06, #uploading-animal-form .animal.img06.img-icon").removeClass("pointer-events-none");

                    $("#uploading-animal-form .uploadingAnimalImg06Show").find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "");
                    $("#uploading-animal-form .uploadingAnimalImg06Show").find(".animal.animal-edit-img-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg06Status").val("rm");
                    if ($("#uploading-animal-form #uploadingAnimalImg06DataOld").val() !== "") {
                        $("#uploading-animal-form .animal.img06.trash-back-icon").removeClass("d-none");
                    }
                });

                $("body").on("click", "#uploading-animal-form .animal.img06.crop-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img06.crop-back-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg06Status").val("editing");

                    if (cropperImg06) {
                        cropperImg06.destroy();
                    }

                    let $uploadingAnimalImg06Show = $("#uploading-animal-form .uploadingAnimalImg06Show");
                    let $uploadingAnimalImg06 = $uploadingAnimalImg06Show.find("#uploadingAnimalImg06");
                    $uploadingAnimalImg06Show.find(".animal.img06.trash-icon").addClass("d-none");
                    let uploadingAnimalImg06DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg06DataOld").val());

                    let img_edit = document.getElementById('animal-new-img06-cropper-edit');
                    img_edit.src = "/static/images/animal/" + uploadingAnimalImg06DataOld['folder'] + "/origin/" + uploadingAnimalImg06DataOld['filename'];

                    setTimeout(
                        function () {
                            $uploadingAnimalImg06Show.find(".animal.animal-edit-img-preview").addClass("d-none");
                            $uploadingAnimalImg06Show.find(".animal.cropper-img-edit").removeClass("d-none");

                            setTimeout(
                                function () {
                                    cropperImg06 = new Cropper(img_edit, {
                                        viewMode: 1,
                                        aspectRatio: 16 / 9,
                                        dragMode: 'move',
                                        cropBoxMovable: false,
                                        cropBoxResizable: false,
                                        toggleDragModeOnDblclick: false,
                                        responsive: true,
                                        crop: function (event) {
                                            let width = event.detail.width,
                                                height = event.detail.height,
                                                x = event.detail.x,
                                                y = event.detail.y,
                                                x2 = (Math.round(x) + Math.round(width)),
                                                y2 = (Math.round(y) + Math.round(height)),
                                                rotate = event.detail.rotate,
                                                scaleX = event.detail.scaleX,
                                                scaleY = event.detail.scaleY;
                                            img06CropData = {
                                                "aspectRatio": 16 / 9,
                                                "width": width,
                                                "height": height,
                                                "x": x,
                                                "y": y,
                                                "x2": x2,
                                                "y2": y2,
                                                "rotate": rotate,
                                                "scaleX": scaleX,
                                                "scaleY": scaleY,
                                                "folder": uploadingAnimalImg06DataOld['folder'],
                                                "filename": uploadingAnimalImg06DataOld['filename'],
                                            };
                                            $("#uploading-animal-form #uploadingAnimalImg06Data").val(JSON.stringify(img06CropData));
                                        }
                                    });
                                }, 500);

                        }, 500);


                });

                $("body").on("click", "#uploading-animal-form .animal.img06.crop-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img06.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg06Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg06Data").val($("#uploading-animal-form #uploadingAnimalImg06DataOld").val());

                    let $uploadingAnimalImg06Show = $("#uploading-animal-form .uploadingAnimalImg06Show");
                    let $uploadingAnimalImg06 = $uploadingAnimalImg06Show.find("#uploadingAnimalImg06");

                    if (cropperImg06) {
                        cropperImg06.destroy();
                    }

                    $uploadingAnimalImg06Show.find(".animal.img06.trash-icon").removeClass("d-none");
                    $uploadingAnimalImg06Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg06Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                });

                $("body").on("click", "#uploading-animal-form .animal.img06.trash-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img06.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg06Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg06Data").val($("#uploading-animal-form #uploadingAnimalImg06DataOld").val());

                    let $uploadingAnimalImg06Show = $("#uploading-animal-form .uploadingAnimalImg06Show");
                    let $uploadingAnimalImg06 = $uploadingAnimalImg06Show.find("#uploadingAnimalImg06");

                    if (cropperImg06) {
                        cropperImg06.destroy();
                    }

                    $uploadingAnimalImg06Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg06Show.find(".animal.img06.img-icon").addClass("d-none");
                    $uploadingAnimalImg06Show.find(".animal.img06.trash-icon").removeClass("d-none");

                    let uploadingAnimalImg06DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg06DataOld").val());

                    $uploadingAnimalImg06Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + uploadingAnimalImg06DataOld['folder'] + "/cropped/" + uploadingAnimalImg06DataOld['filename']);
                    $uploadingAnimalImg06Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg06").addClass("pointer-events-none");
                    $("#uploading-animal-form #uploadingAnimalImg06").val(uploadingAnimalImg06DataOld['filename']);
                });
                // End IMG 06

                // Start IMG 07
                $("body").on("click", "#uploading-animal-form #uploadingAnimalImg07, #uploading-animal-form .animal.img07.img-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg07) {
                        cropperImg07.destroy();
                        img07CropData = {};
                    }

                    $("#uploading-animal-form .animal.img07.img-icon").upload({
                        "action": "/uploading-animal-img-upload",
                        "label": "",
                        "multiple": false,
                        "maxSize": maxSizeImg,
                        "theme": "",
                        beforeSend: onBeforeSend
                    }).on("start.upload", onStart)
                        .on("complete.upload", onComplete)
                        .on("filestart.upload", onFileStart)
                        .on("fileprogress.upload", onFileProgress)
                        .on("filecomplete.upload", onFileComplete)
                        .on("fileerror.upload", onFileError)
                        .on("queued.upload", onQueued);

                    $("#uploading-animal-form").off("click", ".img-cancel.progress-rm.img07");
                    $("#uploading-animal-form").on("click", ".img-cancel.progress-rm.img07", onCancel);

                    function onCancel(e) {
                        $("#uploading-animal-form .animal.img07.img-icon").upload("abort");
                        $("#uploading-animal-form .animal.img07.progress").addClass("d-none");
                        $("#uploading-animal-form .animal.img07.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                        $("#uploading-animal-form .animal.img07.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img07.progress .progress-bar .file-size").html("");
                        $("#uploading-animal-form .animal.img07.progress .progress-bar").css({"width": "0"});
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
                        $("#uploading-animal-form .animal.img07.progress").removeClass("d-none");
                        $("#uploading-animal-form .animal.img07.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img07.progress .progress-bar").css({"width": "0"});
                    }

                    function onFileProgress(event, file, percent) {
                        $("#uploading-animal-form .animal.img07.progress .progress-bar .file-percent").html(percent + "%");
                        $("#uploading-animal-form .animal.img07.progress .progress-bar").css({"width": percent + "%"})
                    }

                    function onFileComplete(event, file, response) {
                        let fileSize = utility.getFormatBytes(file['size']);
                        $("#uploading-animal-form .animal.img07.progress .progress-bar").removeClass("progress-bar-striped").addClass("bg-success");
                        $("#uploading-animal-form .animal.img07.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                        let img = document.getElementById('animal-new-img07-cropper');
                        img.src = JSON.parse(response).data;

                        setTimeout(
                            function () {
                                $("#uploading-animal-form .animal.img07.progress").addClass("d-none");
                                $("#uploading-animal-form .animal.img07.cropper-img").removeClass("d-none");
                                $("#uploading-animal-form .animal.img07.trash-icon").removeClass("d-none");
                                $("#uploading-animal-form .animal.img07.img-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg07").val(JSON.parse(response).filename);
                                $("#uploading-animal-form #uploadingAnimalImg07, #uploading-animal-form .animal.img07.img-icon").addClass("pointer-events-none");
                                $("#uploading-animal-form .animal.img07.trash-back-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg07Status").val("new");

                                $("#uploading-animal-form").find(".uploading-animal-img07-error span").removeData("i18n");
                                $("#uploading-animal-form").find(".uploading-animal-img07-error span").text("");
                                $("#uploading-animal-form").find(".uploading-animal-img07-error").addClass("d-none");

                                $("#uploading-animal-form .animal.img07.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                                $("#uploading-animal-form .animal.img07.progress .progress-bar .file-percent").html("0%");
                                $("#uploading-animal-form .animal.img07.progress .progress-bar .file-size").html("");
                                $("#uploading-animal-form .animal.img07.progress .progress-bar").css({"width": "0"});

                                setTimeout(
                                    function () {
                                        cropperImg07 = new Cropper(img, {
                                            viewMode: 1,
                                            aspectRatio: 16 / 9,
                                            dragMode: 'move',
                                            cropBoxMovable: false,
                                            cropBoxResizable: false,
                                            toggleDragModeOnDblclick: false,
                                            responsive: true,
                                            crop: function (event) {
                                                let width = event.detail.width,
                                                    height = event.detail.height,
                                                    x = event.detail.x,
                                                    y = event.detail.y,
                                                    x2 = (Math.round(x) + Math.round(width)),
                                                    y2 = (Math.round(y) + Math.round(height)),
                                                    rotate = event.detail.rotate,
                                                    scaleX = event.detail.scaleX,
                                                    scaleY = event.detail.scaleY;
                                                img07CropData = {
                                                    "aspectRatio": 16 / 9,
                                                    "width": width,
                                                    "height": height,
                                                    "x": x,
                                                    "y": y,
                                                    "x2": x2,
                                                    "y2": y2,
                                                    "rotate": rotate,
                                                    "scaleX": scaleX,
                                                    "scaleY": scaleY,
                                                    "folder": JSON.parse(response).folder,
                                                    "filename": JSON.parse(response).filename,
                                                };
                                                $("#uploadingAnimalImg07Data").val(JSON.stringify(img07CropData));
                                            }
                                        });
                                    }, 500);

                            }, 2000);
                    }

                    function onFileError(event, file, error) {
                        if (error) {
                            file07Error = {"fileSize": utility.getFormatBytes(file['size']), "error": error}

                            $("#uploading-animal-form .animal.img07.progress").addClass("d-none");
                            $("#uploading-animal-form .animal.img07.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                            $("#uploading-animal-form .animal.img07.progress .progress-bar .file-percent").html("0%");
                            $("#uploading-animal-form .animal.img07.progress .progress-bar .file-size").html("");
                            $("#uploading-animal-form .animal.img07.progress .progress-bar").css({"width": "0"});

                            let $uploadingAnimalForm = $("#uploading-animal-form");

                            if (file07Error['error'] === "Request Entity Too Large" || file07Error['error'] === "size") {
                                $uploadingAnimalForm.find(".uploading-animal-img07-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img07-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img07-error span").attr("data-i18n", "anlihouse-A136");
                                $uploadingAnimalForm.find(".uploading-animal-img07-error").removeClass("d-none");
                                $('body').i18n();
                            } else if (file07Error['error'] === "Unsupported Media Type") {
                                $uploadingAnimalForm.find(".uploading-animal-img07-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img07-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img07-error span").attr("data-i18n", "anlihouse-A134");
                                $uploadingAnimalForm.find(".uploading-animal-img07-error").removeClass("d-none");
                                $('body').i18n();
                            }

                        }
                    }

                    $("#uploading-animal-form .animal.img07.img-icon .fs-upload-target").trigger("click");
                });

                $("body").on("click", "#uploading-animal-form .animal.img07.trash-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg07) {
                        cropperImg07.destroy();
                        img07CropData = {};
                    }

                    $("#uploading-animal-form .animal.img07 .cropper-container.cropper-bg").each(function () {
                        $(this).detach();
                    });

                    $("#uploading-animal-form #uploadingAnimalImg07Data").val(null);
                    $("#uploading-animal-form #uploadingAnimalImg07").val(null);
                    $("#uploading-animal-form .animal.img07.trash-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img07.crop-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img07.crop-back-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img07.img-icon").removeClass("d-none");
                    $("#uploading-animal-form .animal.img07.cropper-img").addClass("d-none");
                    $("#uploading-animal-form .animal.img07.animal-edit-img07-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg07, #uploading-animal-form .animal.img07.img-icon").removeClass("pointer-events-none");

                    $("#uploading-animal-form .uploadingAnimalImg07Show").find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "");
                    $("#uploading-animal-form .uploadingAnimalImg07Show").find(".animal.animal-edit-img-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg07Status").val("rm");
                    if ($("#uploading-animal-form #uploadingAnimalImg07DataOld").val() !== "") {
                        $("#uploading-animal-form .animal.img07.trash-back-icon").removeClass("d-none");
                    }
                });

                $("body").on("click", "#uploading-animal-form .animal.img07.crop-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img07.crop-back-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg07Status").val("editing");

                    if (cropperImg07) {
                        cropperImg07.destroy();
                    }

                    let $uploadingAnimalImg07Show = $("#uploading-animal-form .uploadingAnimalImg07Show");
                    let $uploadingAnimalImg07 = $uploadingAnimalImg07Show.find("#uploadingAnimalImg07");
                    $uploadingAnimalImg07Show.find(".animal.img07.trash-icon").addClass("d-none");
                    let uploadingAnimalImg07DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg07DataOld").val());

                    let img_edit = document.getElementById('animal-new-img07-cropper-edit');
                    img_edit.src = "/static/images/animal/" + uploadingAnimalImg07DataOld['folder'] + "/origin/" + uploadingAnimalImg07DataOld['filename'];

                    setTimeout(
                        function () {
                            $uploadingAnimalImg07Show.find(".animal.animal-edit-img-preview").addClass("d-none");
                            $uploadingAnimalImg07Show.find(".animal.cropper-img-edit").removeClass("d-none");

                            setTimeout(
                                function () {
                                    cropperImg07 = new Cropper(img_edit, {
                                        viewMode: 1,
                                        aspectRatio: 16 / 9,
                                        dragMode: 'move',
                                        cropBoxMovable: false,
                                        cropBoxResizable: false,
                                        toggleDragModeOnDblclick: false,
                                        responsive: true,
                                        crop: function (event) {
                                            let width = event.detail.width,
                                                height = event.detail.height,
                                                x = event.detail.x,
                                                y = event.detail.y,
                                                x2 = (Math.round(x) + Math.round(width)),
                                                y2 = (Math.round(y) + Math.round(height)),
                                                rotate = event.detail.rotate,
                                                scaleX = event.detail.scaleX,
                                                scaleY = event.detail.scaleY;
                                            img07CropData = {
                                                "aspectRatio": 16 / 9,
                                                "width": width,
                                                "height": height,
                                                "x": x,
                                                "y": y,
                                                "x2": x2,
                                                "y2": y2,
                                                "rotate": rotate,
                                                "scaleX": scaleX,
                                                "scaleY": scaleY,
                                                "folder": uploadingAnimalImg07DataOld['folder'],
                                                "filename": uploadingAnimalImg07DataOld['filename'],
                                            };
                                            $("#uploading-animal-form #uploadingAnimalImg07Data").val(JSON.stringify(img07CropData));
                                        }
                                    });
                                }, 500);

                        }, 500);


                });

                $("body").on("click", "#uploading-animal-form .animal.img07.crop-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img07.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg07Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg07Data").val($("#uploading-animal-form #uploadingAnimalImg07DataOld").val());

                    let $uploadingAnimalImg07Show = $("#uploading-animal-form .uploadingAnimalImg07Show");
                    let $uploadingAnimalImg07 = $uploadingAnimalImg07Show.find("#uploadingAnimalImg07");

                    if (cropperImg07) {
                        cropperImg07.destroy();
                    }

                    $uploadingAnimalImg07Show.find(".animal.img07.trash-icon").removeClass("d-none");
                    $uploadingAnimalImg07Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg07Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                });

                $("body").on("click", "#uploading-animal-form .animal.img07.trash-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img07.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg07Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg07Data").val($("#uploading-animal-form #uploadingAnimalImg07DataOld").val());

                    let $uploadingAnimalImg07Show = $("#uploading-animal-form .uploadingAnimalImg07Show");
                    let $uploadingAnimalImg07 = $uploadingAnimalImg07Show.find("#uploadingAnimalImg07");

                    if (cropperImg07) {
                        cropperImg07.destroy();
                    }

                    $uploadingAnimalImg07Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg07Show.find(".animal.img07.img-icon").addClass("d-none");
                    $uploadingAnimalImg07Show.find(".animal.img07.trash-icon").removeClass("d-none");

                    let uploadingAnimalImg07DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg07DataOld").val());

                    $uploadingAnimalImg07Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + uploadingAnimalImg07DataOld['folder'] + "/cropped/" + uploadingAnimalImg07DataOld['filename']);
                    $uploadingAnimalImg07Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg07").addClass("pointer-events-none");
                    $("#uploading-animal-form #uploadingAnimalImg07").val(uploadingAnimalImg07DataOld['filename']);
                });
                // End IMG 07

                // Start IMG 08
                $("body").on("click", "#uploading-animal-form #uploadingAnimalImg08, #uploading-animal-form .animal.img08.img-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg08) {
                        cropperImg08.destroy();
                        img08CropData = {};
                    }

                    $("#uploading-animal-form .animal.img08.img-icon").upload({
                        "action": "/uploading-animal-img-upload",
                        "label": "",
                        "multiple": false,
                        "maxSize": maxSizeImg,
                        "theme": "",
                        beforeSend: onBeforeSend
                    }).on("start.upload", onStart)
                        .on("complete.upload", onComplete)
                        .on("filestart.upload", onFileStart)
                        .on("fileprogress.upload", onFileProgress)
                        .on("filecomplete.upload", onFileComplete)
                        .on("fileerror.upload", onFileError)
                        .on("queued.upload", onQueued);

                    $("#uploading-animal-form").off("click", ".img-cancel.progress-rm.img08");
                    $("#uploading-animal-form").on("click", ".img-cancel.progress-rm.img08", onCancel);

                    function onCancel(e) {
                        $("#uploading-animal-form .animal.img08.img-icon").upload("abort");
                        $("#uploading-animal-form .animal.img08.progress").addClass("d-none");
                        $("#uploading-animal-form .animal.img08.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                        $("#uploading-animal-form .animal.img08.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img08.progress .progress-bar .file-size").html("");
                        $("#uploading-animal-form .animal.img08.progress .progress-bar").css({"width": "0"});
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
                        $("#uploading-animal-form .animal.img08.progress").removeClass("d-none");
                        $("#uploading-animal-form .animal.img08.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img08.progress .progress-bar").css({"width": "0"});
                    }

                    function onFileProgress(event, file, percent) {
                        $("#uploading-animal-form .animal.img08.progress .progress-bar .file-percent").html(percent + "%");
                        $("#uploading-animal-form .animal.img08.progress .progress-bar").css({"width": percent + "%"})
                    }

                    function onFileComplete(event, file, response) {
                        let fileSize = utility.getFormatBytes(file['size']);
                        $("#uploading-animal-form .animal.img08.progress .progress-bar").removeClass("progress-bar-striped").addClass("bg-success");
                        $("#uploading-animal-form .animal.img08.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                        let img = document.getElementById('animal-new-img08-cropper');
                        img.src = JSON.parse(response).data;

                        setTimeout(
                            function () {
                                $("#uploading-animal-form .animal.img08.progress").addClass("d-none");
                                $("#uploading-animal-form .animal.img08.cropper-img").removeClass("d-none");
                                $("#uploading-animal-form .animal.img08.trash-icon").removeClass("d-none");
                                $("#uploading-animal-form .animal.img08.img-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg08").val(JSON.parse(response).filename);
                                $("#uploading-animal-form #uploadingAnimalImg08, #uploading-animal-form .animal.img08.img-icon").addClass("pointer-events-none");
                                $("#uploading-animal-form .animal.img08.trash-back-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg08Status").val("new");

                                $("#uploading-animal-form").find(".uploading-animal-img08-error span").removeData("i18n");
                                $("#uploading-animal-form").find(".uploading-animal-img08-error span").text("");
                                $("#uploading-animal-form").find(".uploading-animal-img08-error").addClass("d-none");

                                $("#uploading-animal-form .animal.img08.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                                $("#uploading-animal-form .animal.img08.progress .progress-bar .file-percent").html("0%");
                                $("#uploading-animal-form .animal.img08.progress .progress-bar .file-size").html("");
                                $("#uploading-animal-form .animal.img08.progress .progress-bar").css({"width": "0"});

                                setTimeout(
                                    function () {
                                        cropperImg08 = new Cropper(img, {
                                            viewMode: 1,
                                            aspectRatio: 16 / 9,
                                            dragMode: 'move',
                                            cropBoxMovable: false,
                                            cropBoxResizable: false,
                                            toggleDragModeOnDblclick: false,
                                            responsive: true,
                                            crop: function (event) {
                                                let width = event.detail.width,
                                                    height = event.detail.height,
                                                    x = event.detail.x,
                                                    y = event.detail.y,
                                                    x2 = (Math.round(x) + Math.round(width)),
                                                    y2 = (Math.round(y) + Math.round(height)),
                                                    rotate = event.detail.rotate,
                                                    scaleX = event.detail.scaleX,
                                                    scaleY = event.detail.scaleY;
                                                img08CropData = {
                                                    "aspectRatio": 16 / 9,
                                                    "width": width,
                                                    "height": height,
                                                    "x": x,
                                                    "y": y,
                                                    "x2": x2,
                                                    "y2": y2,
                                                    "rotate": rotate,
                                                    "scaleX": scaleX,
                                                    "scaleY": scaleY,
                                                    "folder": JSON.parse(response).folder,
                                                    "filename": JSON.parse(response).filename,
                                                };
                                                $("#uploadingAnimalImg08Data").val(JSON.stringify(img08CropData));
                                            }
                                        });
                                    }, 500);

                            }, 2000);
                    }

                    function onFileError(event, file, error) {
                        if (error) {
                            file08Error = {"fileSize": utility.getFormatBytes(file['size']), "error": error}

                            $("#uploading-animal-form .animal.img08.progress").addClass("d-none");
                            $("#uploading-animal-form .animal.img08.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                            $("#uploading-animal-form .animal.img08.progress .progress-bar .file-percent").html("0%");
                            $("#uploading-animal-form .animal.img08.progress .progress-bar .file-size").html("");
                            $("#uploading-animal-form .animal.img08.progress .progress-bar").css({"width": "0"});

                            let $uploadingAnimalForm = $("#uploading-animal-form");

                            if (file08Error['error'] === "Request Entity Too Large" || file08Error['error'] === "size") {
                                $uploadingAnimalForm.find(".uploading-animal-img08-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img08-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img08-error span").attr("data-i18n", "anlihouse-A136");
                                $uploadingAnimalForm.find(".uploading-animal-img08-error").removeClass("d-none");
                                $('body').i18n();
                            } else if (file08Error['error'] === "Unsupported Media Type") {
                                $uploadingAnimalForm.find(".uploading-animal-img08-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img08-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img08-error span").attr("data-i18n", "anlihouse-A134");
                                $uploadingAnimalForm.find(".uploading-animal-img08-error").removeClass("d-none");
                                $('body').i18n();
                            }

                        }
                    }

                    $("#uploading-animal-form .animal.img08.img-icon .fs-upload-target").trigger("click");
                });

                $("body").on("click", "#uploading-animal-form .animal.img08.trash-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg08) {
                        cropperImg08.destroy();
                        img08CropData = {};
                    }

                    $("#uploading-animal-form .animal.img08 .cropper-container.cropper-bg").each(function () {
                        $(this).detach();
                    });

                    $("#uploading-animal-form #uploadingAnimalImg08Data").val(null);
                    $("#uploading-animal-form #uploadingAnimalImg08").val(null);
                    $("#uploading-animal-form .animal.img08.trash-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img08.crop-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img08.crop-back-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img08.img-icon").removeClass("d-none");
                    $("#uploading-animal-form .animal.img08.cropper-img").addClass("d-none");
                    $("#uploading-animal-form .animal.img08.animal-edit-img08-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg08, #uploading-animal-form .animal.img08.img-icon").removeClass("pointer-events-none");

                    $("#uploading-animal-form .uploadingAnimalImg08Show").find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "");
                    $("#uploading-animal-form .uploadingAnimalImg08Show").find(".animal.animal-edit-img-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg08Status").val("rm");
                    if ($("#uploading-animal-form #uploadingAnimalImg08DataOld").val() !== "") {
                        $("#uploading-animal-form .animal.img08.trash-back-icon").removeClass("d-none");
                    }
                });

                $("body").on("click", "#uploading-animal-form .animal.img08.crop-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img08.crop-back-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg08Status").val("editing");

                    if (cropperImg08) {
                        cropperImg08.destroy();
                    }

                    let $uploadingAnimalImg08Show = $("#uploading-animal-form .uploadingAnimalImg08Show");
                    let $uploadingAnimalImg08 = $uploadingAnimalImg08Show.find("#uploadingAnimalImg08");
                    $uploadingAnimalImg08Show.find(".animal.img08.trash-icon").addClass("d-none");
                    let uploadingAnimalImg08DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg08DataOld").val());

                    let img_edit = document.getElementById('animal-new-img08-cropper-edit');
                    img_edit.src = "/static/images/animal/" + uploadingAnimalImg08DataOld['folder'] + "/origin/" + uploadingAnimalImg08DataOld['filename'];

                    setTimeout(
                        function () {
                            $uploadingAnimalImg08Show.find(".animal.animal-edit-img-preview").addClass("d-none");
                            $uploadingAnimalImg08Show.find(".animal.cropper-img-edit").removeClass("d-none");

                            setTimeout(
                                function () {
                                    cropperImg08 = new Cropper(img_edit, {
                                        viewMode: 1,
                                        aspectRatio: 16 / 9,
                                        dragMode: 'move',
                                        cropBoxMovable: false,
                                        cropBoxResizable: false,
                                        toggleDragModeOnDblclick: false,
                                        responsive: true,
                                        crop: function (event) {
                                            let width = event.detail.width,
                                                height = event.detail.height,
                                                x = event.detail.x,
                                                y = event.detail.y,
                                                x2 = (Math.round(x) + Math.round(width)),
                                                y2 = (Math.round(y) + Math.round(height)),
                                                rotate = event.detail.rotate,
                                                scaleX = event.detail.scaleX,
                                                scaleY = event.detail.scaleY;
                                            img08CropData = {
                                                "aspectRatio": 16 / 9,
                                                "width": width,
                                                "height": height,
                                                "x": x,
                                                "y": y,
                                                "x2": x2,
                                                "y2": y2,
                                                "rotate": rotate,
                                                "scaleX": scaleX,
                                                "scaleY": scaleY,
                                                "folder": uploadingAnimalImg08DataOld['folder'],
                                                "filename": uploadingAnimalImg08DataOld['filename'],
                                            };
                                            $("#uploading-animal-form #uploadingAnimalImg08Data").val(JSON.stringify(img08CropData));
                                        }
                                    });
                                }, 500);

                        }, 500);


                });

                $("body").on("click", "#uploading-animal-form .animal.img08.crop-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img08.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg08Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg08Data").val($("#uploading-animal-form #uploadingAnimalImg08DataOld").val());

                    let $uploadingAnimalImg08Show = $("#uploading-animal-form .uploadingAnimalImg08Show");
                    let $uploadingAnimalImg08 = $uploadingAnimalImg08Show.find("#uploadingAnimalImg08");

                    if (cropperImg08) {
                        cropperImg08.destroy();
                    }

                    $uploadingAnimalImg08Show.find(".animal.img08.trash-icon").removeClass("d-none");
                    $uploadingAnimalImg08Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg08Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                });

                $("body").on("click", "#uploading-animal-form .animal.img08.trash-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img08.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg08Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg08Data").val($("#uploading-animal-form #uploadingAnimalImg08DataOld").val());

                    let $uploadingAnimalImg08Show = $("#uploading-animal-form .uploadingAnimalImg08Show");
                    let $uploadingAnimalImg08 = $uploadingAnimalImg08Show.find("#uploadingAnimalImg08");

                    if (cropperImg08) {
                        cropperImg08.destroy();
                    }

                    $uploadingAnimalImg08Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg08Show.find(".animal.img08.img-icon").addClass("d-none");
                    $uploadingAnimalImg08Show.find(".animal.img08.trash-icon").removeClass("d-none");

                    let uploadingAnimalImg08DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg08DataOld").val());

                    $uploadingAnimalImg08Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + uploadingAnimalImg08DataOld['folder'] + "/cropped/" + uploadingAnimalImg08DataOld['filename']);
                    $uploadingAnimalImg08Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg08").addClass("pointer-events-none");
                    $("#uploading-animal-form #uploadingAnimalImg08").val(uploadingAnimalImg08DataOld['filename']);
                });
                // End IMG 08

                // Start IMG 09
                $("body").on("click", "#uploading-animal-form #uploadingAnimalImg09, #uploading-animal-form .animal.img09.img-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg09) {
                        cropperImg09.destroy();
                        img09CropData = {};
                    }

                    $("#uploading-animal-form .animal.img09.img-icon").upload({
                        "action": "/uploading-animal-img-upload",
                        "label": "",
                        "multiple": false,
                        "maxSize": maxSizeImg,
                        "theme": "",
                        beforeSend: onBeforeSend
                    }).on("start.upload", onStart)
                        .on("complete.upload", onComplete)
                        .on("filestart.upload", onFileStart)
                        .on("fileprogress.upload", onFileProgress)
                        .on("filecomplete.upload", onFileComplete)
                        .on("fileerror.upload", onFileError)
                        .on("queued.upload", onQueued);

                    $("#uploading-animal-form").off("click", ".img-cancel.progress-rm.img09");
                    $("#uploading-animal-form").on("click", ".img-cancel.progress-rm.img09", onCancel);

                    function onCancel(e) {
                        $("#uploading-animal-form .animal.img09.img-icon").upload("abort");
                        $("#uploading-animal-form .animal.img09.progress").addClass("d-none");
                        $("#uploading-animal-form .animal.img09.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                        $("#uploading-animal-form .animal.img09.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img09.progress .progress-bar .file-size").html("");
                        $("#uploading-animal-form .animal.img09.progress .progress-bar").css({"width": "0"});
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
                        $("#uploading-animal-form .animal.img09.progress").removeClass("d-none");
                        $("#uploading-animal-form .animal.img09.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img09.progress .progress-bar").css({"width": "0"});
                    }

                    function onFileProgress(event, file, percent) {
                        $("#uploading-animal-form .animal.img09.progress .progress-bar .file-percent").html(percent + "%");
                        $("#uploading-animal-form .animal.img09.progress .progress-bar").css({"width": percent + "%"})
                    }

                    function onFileComplete(event, file, response) {
                        let fileSize = utility.getFormatBytes(file['size']);
                        $("#uploading-animal-form .animal.img09.progress .progress-bar").removeClass("progress-bar-striped").addClass("bg-success");
                        $("#uploading-animal-form .animal.img09.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                        let img = document.getElementById('animal-new-img09-cropper');
                        img.src = JSON.parse(response).data;

                        setTimeout(
                            function () {
                                $("#uploading-animal-form .animal.img09.progress").addClass("d-none");
                                $("#uploading-animal-form .animal.img09.cropper-img").removeClass("d-none");
                                $("#uploading-animal-form .animal.img09.trash-icon").removeClass("d-none");
                                $("#uploading-animal-form .animal.img09.img-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg09").val(JSON.parse(response).filename);
                                $("#uploading-animal-form #uploadingAnimalImg09, #uploading-animal-form .animal.img09.img-icon").addClass("pointer-events-none");
                                $("#uploading-animal-form .animal.img09.trash-back-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg09Status").val("new");

                                $("#uploading-animal-form").find(".uploading-animal-img09-error span").removeData("i18n");
                                $("#uploading-animal-form").find(".uploading-animal-img09-error span").text("");
                                $("#uploading-animal-form").find(".uploading-animal-img09-error").addClass("d-none");

                                $("#uploading-animal-form .animal.img09.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                                $("#uploading-animal-form .animal.img09.progress .progress-bar .file-percent").html("0%");
                                $("#uploading-animal-form .animal.img09.progress .progress-bar .file-size").html("");
                                $("#uploading-animal-form .animal.img09.progress .progress-bar").css({"width": "0"});

                                setTimeout(
                                    function () {
                                        cropperImg09 = new Cropper(img, {
                                            viewMode: 1,
                                            aspectRatio: 16 / 9,
                                            dragMode: 'move',
                                            cropBoxMovable: false,
                                            cropBoxResizable: false,
                                            toggleDragModeOnDblclick: false,
                                            responsive: true,
                                            crop: function (event) {
                                                let width = event.detail.width,
                                                    height = event.detail.height,
                                                    x = event.detail.x,
                                                    y = event.detail.y,
                                                    x2 = (Math.round(x) + Math.round(width)),
                                                    y2 = (Math.round(y) + Math.round(height)),
                                                    rotate = event.detail.rotate,
                                                    scaleX = event.detail.scaleX,
                                                    scaleY = event.detail.scaleY;
                                                img09CropData = {
                                                    "aspectRatio": 16 / 9,
                                                    "width": width,
                                                    "height": height,
                                                    "x": x,
                                                    "y": y,
                                                    "x2": x2,
                                                    "y2": y2,
                                                    "rotate": rotate,
                                                    "scaleX": scaleX,
                                                    "scaleY": scaleY,
                                                    "folder": JSON.parse(response).folder,
                                                    "filename": JSON.parse(response).filename,
                                                };
                                                $("#uploadingAnimalImg09Data").val(JSON.stringify(img09CropData));
                                            }
                                        });
                                    }, 500);

                            }, 2000);
                    }

                    function onFileError(event, file, error) {
                        if (error) {
                            file09Error = {"fileSize": utility.getFormatBytes(file['size']), "error": error}

                            $("#uploading-animal-form .animal.img09.progress").addClass("d-none");
                            $("#uploading-animal-form .animal.img09.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                            $("#uploading-animal-form .animal.img09.progress .progress-bar .file-percent").html("0%");
                            $("#uploading-animal-form .animal.img09.progress .progress-bar .file-size").html("");
                            $("#uploading-animal-form .animal.img09.progress .progress-bar").css({"width": "0"});

                            let $uploadingAnimalForm = $("#uploading-animal-form");

                            if (file09Error['error'] === "Request Entity Too Large" || file09Error['error'] === "size") {
                                $uploadingAnimalForm.find(".uploading-animal-img09-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img09-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img09-error span").attr("data-i18n", "anlihouse-A136");
                                $uploadingAnimalForm.find(".uploading-animal-img09-error").removeClass("d-none");
                                $('body').i18n();
                            } else if (file09Error['error'] === "Unsupported Media Type") {
                                $uploadingAnimalForm.find(".uploading-animal-img09-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img09-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img09-error span").attr("data-i18n", "anlihouse-A134");
                                $uploadingAnimalForm.find(".uploading-animal-img09-error").removeClass("d-none");
                                $('body').i18n();
                            }

                        }
                    }

                    $("#uploading-animal-form .animal.img09.img-icon .fs-upload-target").trigger("click");
                });

                $("body").on("click", "#uploading-animal-form .animal.img09.trash-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg09) {
                        cropperImg09.destroy();
                        img09CropData = {};
                    }

                    $("#uploading-animal-form .animal.img09 .cropper-container.cropper-bg").each(function () {
                        $(this).detach();
                    });

                    $("#uploading-animal-form #uploadingAnimalImg09Data").val(null);
                    $("#uploading-animal-form #uploadingAnimalImg09").val(null);
                    $("#uploading-animal-form .animal.img09.trash-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img09.crop-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img09.crop-back-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img09.img-icon").removeClass("d-none");
                    $("#uploading-animal-form .animal.img09.cropper-img").addClass("d-none");
                    $("#uploading-animal-form .animal.img09.animal-edit-img09-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg09, #uploading-animal-form .animal.img09.img-icon").removeClass("pointer-events-none");

                    $("#uploading-animal-form .uploadingAnimalImg09Show").find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "");
                    $("#uploading-animal-form .uploadingAnimalImg09Show").find(".animal.animal-edit-img-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg09Status").val("rm");
                    if ($("#uploading-animal-form #uploadingAnimalImg09DataOld").val() !== "") {
                        $("#uploading-animal-form .animal.img09.trash-back-icon").removeClass("d-none");
                    }
                });

                $("body").on("click", "#uploading-animal-form .animal.img09.crop-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img09.crop-back-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg09Status").val("editing");

                    if (cropperImg09) {
                        cropperImg09.destroy();
                    }

                    let $uploadingAnimalImg09Show = $("#uploading-animal-form .uploadingAnimalImg09Show");
                    let $uploadingAnimalImg09 = $uploadingAnimalImg09Show.find("#uploadingAnimalImg09");
                    $uploadingAnimalImg09Show.find(".animal.img09.trash-icon").addClass("d-none");
                    let uploadingAnimalImg09DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg09DataOld").val());

                    let img_edit = document.getElementById('animal-new-img09-cropper-edit');
                    img_edit.src = "/static/images/animal/" + uploadingAnimalImg09DataOld['folder'] + "/origin/" + uploadingAnimalImg09DataOld['filename'];

                    setTimeout(
                        function () {
                            $uploadingAnimalImg09Show.find(".animal.animal-edit-img-preview").addClass("d-none");
                            $uploadingAnimalImg09Show.find(".animal.cropper-img-edit").removeClass("d-none");

                            setTimeout(
                                function () {
                                    cropperImg09 = new Cropper(img_edit, {
                                        viewMode: 1,
                                        aspectRatio: 16 / 9,
                                        dragMode: 'move',
                                        cropBoxMovable: false,
                                        cropBoxResizable: false,
                                        toggleDragModeOnDblclick: false,
                                        responsive: true,
                                        crop: function (event) {
                                            let width = event.detail.width,
                                                height = event.detail.height,
                                                x = event.detail.x,
                                                y = event.detail.y,
                                                x2 = (Math.round(x) + Math.round(width)),
                                                y2 = (Math.round(y) + Math.round(height)),
                                                rotate = event.detail.rotate,
                                                scaleX = event.detail.scaleX,
                                                scaleY = event.detail.scaleY;
                                            img09CropData = {
                                                "aspectRatio": 16 / 9,
                                                "width": width,
                                                "height": height,
                                                "x": x,
                                                "y": y,
                                                "x2": x2,
                                                "y2": y2,
                                                "rotate": rotate,
                                                "scaleX": scaleX,
                                                "scaleY": scaleY,
                                                "folder": uploadingAnimalImg09DataOld['folder'],
                                                "filename": uploadingAnimalImg09DataOld['filename'],
                                            };
                                            $("#uploading-animal-form #uploadingAnimalImg09Data").val(JSON.stringify(img09CropData));
                                        }
                                    });
                                }, 500);

                        }, 500);


                });

                $("body").on("click", "#uploading-animal-form .animal.img09.crop-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img09.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg09Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg09Data").val($("#uploading-animal-form #uploadingAnimalImg09DataOld").val());

                    let $uploadingAnimalImg09Show = $("#uploading-animal-form .uploadingAnimalImg09Show");
                    let $uploadingAnimalImg09 = $uploadingAnimalImg09Show.find("#uploadingAnimalImg09");

                    if (cropperImg09) {
                        cropperImg09.destroy();
                    }

                    $uploadingAnimalImg09Show.find(".animal.img09.trash-icon").removeClass("d-none");
                    $uploadingAnimalImg09Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg09Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                });

                $("body").on("click", "#uploading-animal-form .animal.img09.trash-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img09.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg09Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg09Data").val($("#uploading-animal-form #uploadingAnimalImg09DataOld").val());

                    let $uploadingAnimalImg09Show = $("#uploading-animal-form .uploadingAnimalImg09Show");
                    let $uploadingAnimalImg09 = $uploadingAnimalImg09Show.find("#uploadingAnimalImg09");

                    if (cropperImg09) {
                        cropperImg09.destroy();
                    }

                    $uploadingAnimalImg09Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg09Show.find(".animal.img09.img-icon").addClass("d-none");
                    $uploadingAnimalImg09Show.find(".animal.img09.trash-icon").removeClass("d-none");

                    let uploadingAnimalImg09DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg09DataOld").val());

                    $uploadingAnimalImg09Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + uploadingAnimalImg09DataOld['folder'] + "/cropped/" + uploadingAnimalImg09DataOld['filename']);
                    $uploadingAnimalImg09Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg09").addClass("pointer-events-none");
                    $("#uploading-animal-form #uploadingAnimalImg09").val(uploadingAnimalImg09DataOld['filename']);
                });
                // End IMG 09

                // Start IMG 10
                $("body").on("click", "#uploading-animal-form #uploadingAnimalImg10, #uploading-animal-form .animal.img10.img-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg10) {
                        cropperImg10.destroy();
                        img10CropData = {};
                    }

                    $("#uploading-animal-form .animal.img10.img-icon").upload({
                        "action": "/uploading-animal-img-upload",
                        "label": "",
                        "multiple": false,
                        "maxSize": maxSizeImg,
                        "theme": "",
                        beforeSend: onBeforeSend
                    }).on("start.upload", onStart)
                        .on("complete.upload", onComplete)
                        .on("filestart.upload", onFileStart)
                        .on("fileprogress.upload", onFileProgress)
                        .on("filecomplete.upload", onFileComplete)
                        .on("fileerror.upload", onFileError)
                        .on("queued.upload", onQueued);

                    $("#uploading-animal-form").off("click", ".img-cancel.progress-rm.img10");
                    $("#uploading-animal-form").on("click", ".img-cancel.progress-rm.img10", onCancel);

                    function onCancel(e) {
                        $("#uploading-animal-form .animal.img10.img-icon").upload("abort");
                        $("#uploading-animal-form .animal.img10.progress").addClass("d-none");
                        $("#uploading-animal-form .animal.img10.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                        $("#uploading-animal-form .animal.img10.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img10.progress .progress-bar .file-size").html("");
                        $("#uploading-animal-form .animal.img10.progress .progress-bar").css({"width": "0"});
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
                        $("#uploading-animal-form .animal.img10.progress").removeClass("d-none");
                        $("#uploading-animal-form .animal.img10.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.img10.progress .progress-bar").css({"width": "0"});
                    }

                    function onFileProgress(event, file, percent) {
                        $("#uploading-animal-form .animal.img10.progress .progress-bar .file-percent").html(percent + "%");
                        $("#uploading-animal-form .animal.img10.progress .progress-bar").css({"width": percent + "%"})
                    }

                    function onFileComplete(event, file, response) {
                        let fileSize = utility.getFormatBytes(file['size']);
                        $("#uploading-animal-form .animal.img10.progress .progress-bar").removeClass("progress-bar-striped").addClass("bg-success");
                        $("#uploading-animal-form .animal.img10.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                        let img = document.getElementById('animal-new-img10-cropper');
                        img.src = JSON.parse(response).data;

                        setTimeout(
                            function () {
                                $("#uploading-animal-form .animal.img10.progress").addClass("d-none");
                                $("#uploading-animal-form .animal.img10.cropper-img").removeClass("d-none");
                                $("#uploading-animal-form .animal.img10.trash-icon").removeClass("d-none");
                                $("#uploading-animal-form .animal.img10.img-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg10").val(JSON.parse(response).filename);
                                $("#uploading-animal-form #uploadingAnimalImg10, #uploading-animal-form .animal.img10.img-icon").addClass("pointer-events-none");
                                $("#uploading-animal-form .animal.img10.trash-back-icon").addClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalImg10Status").val("new");

                                $("#uploading-animal-form").find(".uploading-animal-img10-error span").removeData("i18n");
                                $("#uploading-animal-form").find(".uploading-animal-img10-error span").text("");
                                $("#uploading-animal-form").find(".uploading-animal-img10-error").addClass("d-none");

                                $("#uploading-animal-form .animal.img10.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                                $("#uploading-animal-form .animal.img10.progress .progress-bar .file-percent").html("0%");
                                $("#uploading-animal-form .animal.img10.progress .progress-bar .file-size").html("");
                                $("#uploading-animal-form .animal.img10.progress .progress-bar").css({"width": "0"});

                                setTimeout(
                                    function () {
                                        cropperImg10 = new Cropper(img, {
                                            viewMode: 1,
                                            aspectRatio: 16 / 9,
                                            dragMode: 'move',
                                            cropBoxMovable: false,
                                            cropBoxResizable: false,
                                            toggleDragModeOnDblclick: false,
                                            responsive: true,
                                            crop: function (event) {
                                                let width = event.detail.width,
                                                    height = event.detail.height,
                                                    x = event.detail.x,
                                                    y = event.detail.y,
                                                    x2 = (Math.round(x) + Math.round(width)),
                                                    y2 = (Math.round(y) + Math.round(height)),
                                                    rotate = event.detail.rotate,
                                                    scaleX = event.detail.scaleX,
                                                    scaleY = event.detail.scaleY;
                                                img10CropData = {
                                                    "aspectRatio": 16 / 9,
                                                    "width": width,
                                                    "height": height,
                                                    "x": x,
                                                    "y": y,
                                                    "x2": x2,
                                                    "y2": y2,
                                                    "rotate": rotate,
                                                    "scaleX": scaleX,
                                                    "scaleY": scaleY,
                                                    "folder": JSON.parse(response).folder,
                                                    "filename": JSON.parse(response).filename,
                                                };
                                                $("#uploadingAnimalImg10Data").val(JSON.stringify(img10CropData));
                                            }
                                        });
                                    }, 500);

                            }, 2000);
                    }

                    function onFileError(event, file, error) {
                        if (error) {
                            file10Error = {"fileSize": utility.getFormatBytes(file['size']), "error": error}

                            $("#uploading-animal-form .animal.img10.progress").addClass("d-none");
                            $("#uploading-animal-form .animal.img10.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                            $("#uploading-animal-form .animal.img10.progress .progress-bar .file-percent").html("0%");
                            $("#uploading-animal-form .animal.img10.progress .progress-bar .file-size").html("");
                            $("#uploading-animal-form .animal.img10.progress .progress-bar").css({"width": "0"});

                            let $uploadingAnimalForm = $("#uploading-animal-form");

                            if (file10Error['error'] === "Request Entity Too Large" || file10Error['error'] === "size") {
                                $uploadingAnimalForm.find(".uploading-animal-img10-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img10-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img10-error span").attr("data-i18n", "anlihouse-A136");
                                $uploadingAnimalForm.find(".uploading-animal-img10-error").removeClass("d-none");
                                $('body').i18n();
                            } else if (file10Error['error'] === "Unsupported Media Type") {
                                $uploadingAnimalForm.find(".uploading-animal-img10-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-img10-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-img10-error span").attr("data-i18n", "anlihouse-A134");
                                $uploadingAnimalForm.find(".uploading-animal-img10-error").removeClass("d-none");
                                $('body').i18n();
                            }

                        }
                    }

                    $("#uploading-animal-form .animal.img10.img-icon .fs-upload-target").trigger("click");
                });

                $("body").on("click", "#uploading-animal-form .animal.img10.trash-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    if (cropperImg10) {
                        cropperImg10.destroy();
                        img10CropData = {};
                    }

                    $("#uploading-animal-form .animal.img10 .cropper-container.cropper-bg").each(function () {
                        $(this).detach();
                    });

                    $("#uploading-animal-form #uploadingAnimalImg10Data").val(null);
                    $("#uploading-animal-form #uploadingAnimalImg10").val(null);
                    $("#uploading-animal-form .animal.img10.trash-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img10.crop-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img10.crop-back-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.img10.img-icon").removeClass("d-none");
                    $("#uploading-animal-form .animal.img10.cropper-img").addClass("d-none");
                    $("#uploading-animal-form .animal.img10.animal-edit-img10-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg10, #uploading-animal-form .animal.img10.img-icon").removeClass("pointer-events-none");

                    $("#uploading-animal-form .uploadingAnimalImg10Show").find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "");
                    $("#uploading-animal-form .uploadingAnimalImg10Show").find(".animal.animal-edit-img-preview").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg10Status").val("rm");
                    if ($("#uploading-animal-form #uploadingAnimalImg10DataOld").val() !== "") {
                        $("#uploading-animal-form .animal.img10.trash-back-icon").removeClass("d-none");
                    }
                });

                $("body").on("click", "#uploading-animal-form .animal.img10.crop-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img10.crop-back-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg10Status").val("editing");

                    if (cropperImg10) {
                        cropperImg10.destroy();
                    }

                    let $uploadingAnimalImg10Show = $("#uploading-animal-form .uploadingAnimalImg10Show");
                    let $uploadingAnimalImg10 = $uploadingAnimalImg10Show.find("#uploadingAnimalImg10");
                    $uploadingAnimalImg10Show.find(".animal.img10.trash-icon").addClass("d-none");
                    let uploadingAnimalImg10DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg10DataOld").val());

                    let img_edit = document.getElementById('animal-new-img10-cropper-edit');
                    img_edit.src = "/static/images/animal/" + uploadingAnimalImg10DataOld['folder'] + "/origin/" + uploadingAnimalImg10DataOld['filename'];

                    setTimeout(
                        function () {
                            $uploadingAnimalImg10Show.find(".animal.animal-edit-img-preview").addClass("d-none");
                            $uploadingAnimalImg10Show.find(".animal.cropper-img-edit").removeClass("d-none");

                            setTimeout(
                                function () {
                                    cropperImg10 = new Cropper(img_edit, {
                                        viewMode: 1,
                                        aspectRatio: 16 / 9,
                                        dragMode: 'move',
                                        cropBoxMovable: false,
                                        cropBoxResizable: false,
                                        toggleDragModeOnDblclick: false,
                                        responsive: true,
                                        crop: function (event) {
                                            let width = event.detail.width,
                                                height = event.detail.height,
                                                x = event.detail.x,
                                                y = event.detail.y,
                                                x2 = (Math.round(x) + Math.round(width)),
                                                y2 = (Math.round(y) + Math.round(height)),
                                                rotate = event.detail.rotate,
                                                scaleX = event.detail.scaleX,
                                                scaleY = event.detail.scaleY;
                                            img10CropData = {
                                                "aspectRatio": 16 / 9,
                                                "width": width,
                                                "height": height,
                                                "x": x,
                                                "y": y,
                                                "x2": x2,
                                                "y2": y2,
                                                "rotate": rotate,
                                                "scaleX": scaleX,
                                                "scaleY": scaleY,
                                                "folder": uploadingAnimalImg10DataOld['folder'],
                                                "filename": uploadingAnimalImg10DataOld['filename'],
                                            };
                                            $("#uploading-animal-form #uploadingAnimalImg10Data").val(JSON.stringify(img10CropData));
                                        }
                                    });
                                }, 500);

                        }, 500);


                });

                $("body").on("click", "#uploading-animal-form .animal.img10.crop-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img10.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg10Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg10Data").val($("#uploading-animal-form #uploadingAnimalImg10DataOld").val());

                    let $uploadingAnimalImg10Show = $("#uploading-animal-form .uploadingAnimalImg10Show");
                    let $uploadingAnimalImg10 = $uploadingAnimalImg10Show.find("#uploadingAnimalImg10");

                    if (cropperImg10) {
                        cropperImg10.destroy();
                    }

                    $uploadingAnimalImg10Show.find(".animal.img10.trash-icon").removeClass("d-none");
                    $uploadingAnimalImg10Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg10Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                });

                $("body").on("click", "#uploading-animal-form .animal.img10.trash-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    _this.addClass("d-none");
                    $("#uploading-animal-form .animal.img10.crop-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg10Status").val("unchanged");
                    $("#uploading-animal-form #uploadingAnimalImg10Data").val($("#uploading-animal-form #uploadingAnimalImg10DataOld").val());

                    let $uploadingAnimalImg10Show = $("#uploading-animal-form .uploadingAnimalImg10Show");
                    let $uploadingAnimalImg10 = $uploadingAnimalImg10Show.find("#uploadingAnimalImg10");

                    if (cropperImg10) {
                        cropperImg10.destroy();
                    }

                    $uploadingAnimalImg10Show.find(".animal.cropper-img-edit").addClass("d-none");
                    $uploadingAnimalImg10Show.find(".animal.img10.img-icon").addClass("d-none");
                    $uploadingAnimalImg10Show.find(".animal.img10.trash-icon").removeClass("d-none");

                    let uploadingAnimalImg10DataOld = JSON.parse($("#uploading-animal-form #uploadingAnimalImg10DataOld").val());

                    $uploadingAnimalImg10Show.find(".animal.animal-edit-img-preview #animal-edit-img-preview").attr("src", "/static/images/animal/" + uploadingAnimalImg10DataOld['folder'] + "/cropped/" + uploadingAnimalImg10DataOld['filename']);
                    $uploadingAnimalImg10Show.find(".animal.animal-edit-img-preview").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalImg10").addClass("pointer-events-none");
                    $("#uploading-animal-form #uploadingAnimalImg10").val(uploadingAnimalImg10DataOld['filename']);
                });
                // End IMG 10

            },

            uploadingAnimalNewImg: function () {
                $("body").on("click", "#uploading-animal-form .uploadingAnimalImgShowIcon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let dataImgInput = _this.attr("data-img-input");

                    if (dataImgInput === "02") {
                        $("#uploading-animal-form .uploadingAnimalImg02Show").removeClass("d-none");
                        _this.hide();
                    }

                    if (dataImgInput === "03") {
                        $("#uploading-animal-form .uploadingAnimalImg03Show").removeClass("d-none");
                        _this.hide();
                    }

                    if (dataImgInput === "04") {
                        $("#uploading-animal-form .uploadingAnimalImg04Show").removeClass("d-none");
                        _this.hide();
                    }

                    if (dataImgInput === "05") {
                        $("#uploading-animal-form .uploadingAnimalImg05Show").removeClass("d-none");
                        _this.hide();
                    }

                    if (dataImgInput === "06") {
                        $("#uploading-animal-form .uploadingAnimalImg06Show").removeClass("d-none");
                        _this.hide();
                    }

                    if (dataImgInput === "07") {
                        $("#uploading-animal-form .uploadingAnimalImg07Show").removeClass("d-none");
                        _this.hide();
                    }

                    if (dataImgInput === "08") {
                        $("#uploading-animal-form .uploadingAnimalImg08Show").removeClass("d-none");
                        _this.hide();
                    }

                    if (dataImgInput === "09") {
                        $("#uploading-animal-form .uploadingAnimalImg09Show").removeClass("d-none");
                        _this.hide();
                    }

                    if (dataImgInput === "10") {
                        $("#uploading-animal-form .uploadingAnimalImg10Show").removeClass("d-none");
                        _this.hide();
                    }
                });
            },

            uploadingAnimalVideos: function () {
                let maxSizeVideo;
                let fileVideo01Error;
                let movieLoggerInterval = null;

                if (process.env.NODE_ENV === "production") {
                    maxSizeVideo = process.env.PRODUCTION_VIDEO_MAX_SIZE // Bytes == 200 Megabytes
                } else {
                    maxSizeVideo = process.env.DEVELOPMENT_VIDEO_MAX_SIZE // Bytes == 200 Megabytes
                }

                $("body").on("click", "#uploading-animal-form #uploadingAnimalVideo01, #uploading-animal-form .animal.video01.video-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let namespace = utility.getSocketURL() + '/connect';
                    let socket = io(namespace);

                    $("#uploading-animal-form .animal.video01.video-icon").upload({
                        "action": "/uploading-animal-video-upload",
                        "label": "",
                        "multiple": false,
                        "maxSize": maxSizeVideo,
                        "theme": "",
                        beforeSend: onBeforeSend
                    }).on("start.upload", onStart)
                        .on("complete.upload", onComplete)
                        .on("filestart.upload", onFileStart)
                        .on("fileprogress.upload", onFileProgress)
                        .on("filecomplete.upload", onFileComplete)
                        .on("fileerror.upload", onFileError)
                        .on("queued.upload", onQueued);

                    $("#uploading-animal-form").off("click", ".video-cancel.progress-rm.video01");
                    $("#uploading-animal-form").on("click", ".video-cancel.progress-rm.video01", onCancel);

                    function onCancel(e) {
                        $("#uploading-animal-form .animal.video01.video-icon").upload("abort");
                        $("#uploading-animal-form .animal.video01.progress").addClass("d-none");
                        $("#uploading-animal-form .animal.video01.progress .progress-bar").removeClass("bg-success progress-bar-animated").addClass("bg-primary progress-bar-striped");
                        $("#uploading-animal-form .animal.video01.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.video01.progress .progress-bar .file-size").html("");
                        $("#uploading-animal-form .animal.video01.progress .progress-bar").css({"width": "0"});
                        $("#uploading-animal-form .uploading-animal-video-create-info").addClass("d-none");
                        clearInterval(movieLoggerInterval);
                        movieLoggerInterval = null;
                    }

                    function onBeforeSend(formData) {
                        let categoryName;
                        let subcategoryName;
                        let animalName;
                        let animalGender;
                        let animalColor;
                        let animalImg01;
                        let animalImg02;
                        let animalImg03;
                        let animalImg04;
                        let animalImg05;
                        let animalImg06;
                        let animalImg07;
                        let animalImg08;
                        let animalImg09;
                        let animalImg10;

                        if ($("#uploading-animal-form #uploadingAnimalCategoryIdName").val() !== "") {
                            categoryName = $("#uploading-animal-form #uploadingAnimalCategoryIdName").val()
                        } else {
                            categoryName = "-"
                        }

                        if ($("#uploading-animal-form #uploadingAnimalSubCategoryIdName").val() !== "") {
                            subcategoryName = $("#uploading-animal-form #uploadingAnimalSubCategoryIdName").val().trim()
                        } else {
                            subcategoryName = "-"
                        }

                        if ($("#uploading-animal-form #uploadingAnimalName").val() !== "") {
                            animalName = $("#uploading-animal-form #uploadingAnimalName").val().trim()
                        } else {
                            animalName = "-"
                        }

                        if ($("#uploading-animal-form #uploadingAnimalGenderValEN").val() !== "") {
                            animalGender = $("#uploading-animal-form #uploadingAnimalGenderValEN").val().trim()
                        } else {
                            animalGender = "-"
                        }

                        if ($("#uploading-animal-form #uploadingAnimalColorValEN").val() !== "") {
                            animalColor = $("#uploading-animal-form #uploadingAnimalColorValEN").val().trim()
                        } else {
                            animalColor = "-"
                        }


                        if ($("#uploading-animal-form #uploadingAnimalImg01Data").val() !== "") {
                            animalImg01 = $("#uploading-animal-form #uploadingAnimalImg01Data").val()
                        } else {
                            animalImg01 = false
                        }

                        if ($("#uploading-animal-form #uploadingAnimalImg02Data").val() !== "") {
                            animalImg02 = $("#uploading-animal-form #uploadingAnimalImg02Data").val()
                        } else {
                            animalImg02 = false
                        }

                        if ($("#uploading-animal-form #uploadingAnimalImg03Data").val() !== "") {
                            animalImg03 = $("#uploading-animal-form #uploadingAnimalImg03Data").val()
                        } else {
                            animalImg03 = false
                        }

                        if ($("#uploading-animal-form #uploadingAnimalImg04Data").val() !== "") {
                            animalImg04 = $("#uploading-animal-form #uploadingAnimalImg04Data").val()
                        } else {
                            animalImg04 = false
                        }

                        if ($("#uploading-animal-form #uploadingAnimalImg05Data").val() !== "") {
                            animalImg05 = $("#uploading-animal-form #uploadingAnimalImg05Data").val()
                        } else {
                            animalImg05 = false
                        }

                        if ($("#uploading-animal-form #uploadingAnimalImg06Data").val() !== "") {
                            animalImg06 = $("#uploading-animal-form #uploadingAnimalImg06Data").val()
                        } else {
                            animalImg06 = false
                        }

                        if ($("#uploading-animal-form #uploadingAnimalImg07Data").val() !== "") {
                            animalImg07 = $("#uploading-animal-form #uploadingAnimalImg07Data").val()
                        } else {
                            animalImg07 = false
                        }

                        if ($("#uploading-animal-form #uploadingAnimalImg08Data").val() !== "") {
                            animalImg08 = $("#uploading-animal-form #uploadingAnimalImg08Data").val()
                        } else {
                            animalImg08 = false
                        }

                        if ($("#uploading-animal-form #uploadingAnimalImg09Data").val() !== "") {
                            animalImg09 = $("#uploading-animal-form #uploadingAnimalImg09Data").val()
                        } else {
                            animalImg09 = false
                        }

                        if ($("#uploading-animal-form #uploadingAnimalImg10Data").val() !== "") {
                            animalImg10 = $("#uploading-animal-form #uploadingAnimalImg10Data").val()
                        } else {
                            animalImg10 = false
                        }

                        formData.append("category_name", categoryName);
                        formData.append("subcategory_name", subcategoryName);
                        formData.append("animal_name", animalName);
                        formData.append("animal_gender", animalGender);
                        formData.append("animal_color", animalColor);
                        formData.append("animal_img_01", animalImg01);
                        formData.append("animal_img_02", animalImg02);
                        formData.append("animal_img_03", animalImg03);
                        formData.append("animal_img_04", animalImg04);
                        formData.append("animal_img_05", animalImg05);
                        formData.append("animal_img_06", animalImg06);
                        formData.append("animal_img_07", animalImg07);
                        formData.append("animal_img_08", animalImg08);
                        formData.append("animal_img_09", animalImg09);
                        formData.append("animal_img_10", animalImg10);
                        return formData;
                    }

                    function onQueued(event, files) {
                    }

                    function onStart(event) {
                        $("#uploading-animal-form .video-cancel.progress-rm.video01").removeClass("d-none");
                    }

                    function onComplete(event) {
                    }

                    function onFileStart(event, file) {
                        $("#uploading-animal-form .animal.video01.progress").removeClass("d-none");
                        $("#uploading-animal-form .animal.video01.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.video01.progress .progress-bar").css({"width": "0"});
                    }

                    function onFileProgress(event, file, percent) {
                        if (percent > 75) {
                            $("#uploading-animal-form .video-cancel.progress-rm.video01").addClass("d-none");
                            $("#uploading-animal-form .uploading-animal-video-create-info").removeClass("d-none");
                        }
                        if (percent < 95) {
                            $("#uploading-animal-form .animal.video01.progress .progress-bar .file-percent").html(percent + "%");
                            $("#uploading-animal-form .animal.video01.progress .progress-bar").css({"width": percent + "%"});
                        }
                        if (percent > 96) {
                            $("#uploading-animal-form .animal.video01.progress .progress-bar").addClass("progress-bar-animated");

                            // Start setTimeout AJAX
                            setTimeout(
                                function () {
                                    let count = 0;
                                    movieLoggerInterval = setInterval(() => {
                                        // Start AJAX
                                        /*
                                        let movieLoggerData;
                                        $.ajax({
                                            type: "GET",
                                            url: "/_movie-logger",
                                            contentType: "application/json",
                                            beforeSend: function (xhr) {
                                            },
                                            success: function (result, status, xhr) {
                                                movieLoggerData = result['message']
                                            },
                                            complete: function (xhr, status) {
                                                let statusCode = xhr['status'];

                                                if (statusCode === 200) {
                                                    $("#uploading-animal-form .animal.video01.progress .progress-bar .file-percent").html(movieLoggerData['percentage'] + "%");
                                                    $("#uploading-animal-form .animal.video01.progress .progress-bar").css({"width": movieLoggerData['percentage'] + "%"});
                                                } else if (statusCode === 202) {
                                                }
                                            },
                                            error: function (xhr, status, error) {
                                                count++;
                                                if (count === 10) {
                                                    clearInterval(movieLoggerInterval);
                                                    movieLoggerInterval = null;
                                                }
                                            }
                                        });
                                        */
                                        // End AJAX
                                        // Start Video Logger Percentage
                                        socket.emit('video_logger', {
                                            "room": $("#filter-form input#room").val()
                                        });
                                        // End Video Logger Percentage
                                    }, 1000);
                                }, 3000);
                            // End setTimeout AJAX

                        }
                    }

                    function onFileComplete(event, file, response) {
                        let video01Data;
                        let fileSize = utility.getFormatBytes(file['size']);
                        $("#uploading-animal-form .uploading-animal-video-create-info").addClass("d-none");
                        $("#uploading-animal-form .animal.video01.progress .progress-bar").removeClass("progress-bar-striped progress-bar-animated").addClass("bg-success");
                        $("#uploading-animal-form .animal.video01.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                        $("#uploading-animal-form .animal.video01.progress .progress-bar .file-percent").html("100%");
                        $("#uploading-animal-form .animal.video01.progress .progress-bar").css({"width": "100%"});

                        clearInterval(movieLoggerInterval);
                        movieLoggerInterval = null;

                        setTimeout(
                            function () {
                                $("#uploading-animal-form .animal.video01.progress").addClass("d-none");
                                $("#uploading-animal-form .animal.video01.trash-icon").removeClass("d-none");
                                $("#uploading-animal-form .animal.video01.video-icon").addClass("d-none");
                                video01Data = {
                                    "data": JSON.parse(response).data,
                                    "folder": JSON.parse(response).folder,
                                    "filename": JSON.parse(response).filename
                                }
                                $("#uploading-animal-form #uploadingAnimalVideo01Data").val(JSON.stringify(video01Data));
                                $("#uploading-animal-form #uploadingAnimalVideo01").val(JSON.parse(response).filename);
                                $("#uploading-animal-form #uploadingAnimalVideo01, #uploading-animal-form .animal.video01.video-icon").addClass("pointer-events-none");

                                $("#uploading-animal-form").find(".uploading-animal-video01-error span").removeData("i18n");
                                $("#uploading-animal-form").find(".uploading-animal-video01-error span").text("");
                                $("#uploading-animal-form").find(".uploading-animal-video01-error").addClass("d-none");

                                $("#uploading-animal-form .animal.video01.progress .progress-bar").removeClass("bg-success progress-bar-animated").addClass("bg-primary progress-bar-striped");
                                $("#uploading-animal-form .animal.video01.progress .progress-bar .file-percent").html("0%");
                                $("#uploading-animal-form .animal.video01.progress .progress-bar .file-size").html("");
                                $("#uploading-animal-form .animal.video01.progress .progress-bar").css({"width": "0"});

                                $("#uploading-animal-form .animal.video01.cropped-video #animalUploadingVideo01Video").attr("src", JSON.parse(response).data)
                                $("#uploading-animal-form .animal.video01.cropped-video").removeClass("d-none");
                                $("#uploading-animal-form #uploadingAnimalVideo01Status").val("new");

                                clearInterval(movieLoggerInterval);
                                movieLoggerInterval = null;

                            }, 2000);

                        setTimeout(
                            function () {
                                clearInterval(movieLoggerInterval);
                                movieLoggerInterval = null;
                            }, 10000);
                    }

                    function onFileError(event, file, error) {
                        if (error) {
                            fileVideo01Error = {"fileSize": utility.getFormatBytes(file['size']), "error": error}

                            $("#uploading-animal-form .animal.video01.progress").addClass("d-none");
                            $("#uploading-animal-form .animal.video01.progress .progress-bar").removeClass("bg-success progress-bar-animated").addClass("bg-primary progress-bar-striped");
                            $("#uploading-animal-form .animal.video01.progress .progress-bar .file-percent").html("0%");
                            $("#uploading-animal-form .animal.video01.progress .progress-bar .file-size").html("");
                            $("#uploading-animal-form .animal.video01.progress .progress-bar").css({"width": "0"});
                            $("#uploading-animal-form .uploading-animal-video-create-info").addClass("d-none");
                            clearInterval(movieLoggerInterval);
                            movieLoggerInterval = null;

                            let $uploadingAnimalForm = $("#uploading-animal-form");

                            if (fileVideo01Error['error'] === "Request Entity Too Large" || fileVideo01Error['error'] === "size") {
                                $uploadingAnimalForm.find(".uploading-animal-video01-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-video01-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-video01-error span").attr("data-i18n", "anlihouse-A137");
                                $uploadingAnimalForm.find(".uploading-animal-video01-error").removeClass("d-none");
                                $('body').i18n();
                            } else if (fileVideo01Error['error'] === "Unsupported Media Type") {
                                $uploadingAnimalForm.find(".uploading-animal-video01-error span").removeData("i18n");
                                $uploadingAnimalForm.find(".uploading-animal-video01-error span").text("");
                                $uploadingAnimalForm.find(".uploading-animal-video01-error span").attr("data-i18n", "anlihouse-A135");
                                $uploadingAnimalForm.find(".uploading-animal-video01-error").removeClass("d-none");
                                $('body').i18n();
                            }

                        }
                    }

                    $("#uploading-animal-form .animal.video01.video-icon .fs-upload-target").trigger("click");

                });

                $("body").on("click", "#uploading-animal-form .animal.video01.trash-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let $uploadingAnimalVideo01Show = $("#uploading-animal-form .uploadingAnimalVideo01Show");
                    let $uploadingAnimalVideo01 = $("#uploading-animal-form #uploadingAnimalVideo01");

                    // $("#uploading-animal-form #uploadingAnimalVideo01Data").val(null);
                    $uploadingAnimalVideo01.val(null);
                    $("#uploading-animal-form #uploadingAnimalVideo01Data").val(null);
                    $("#uploading-animal-form .animal.video01.trash-icon").addClass("d-none");
                    $("#uploading-animal-form .animal.video01.video-icon").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalVideo01, #uploading-animal-form .animal.video01.video-icon").removeClass("pointer-events-none");
                    $("#uploading-animal-form .animal.video01.cropped-video #animalUploadingVideo01Video").attr("src", "")
                    $("#uploading-animal-form .animal.video01.cropped-video").addClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalVideo01Status").val("rm");

                    $uploadingAnimalVideo01Show.find(".animal.video01.trash-back-icon").removeClass("d-none");
                });

                $("body").on("click", "#uploading-animal-form .animal.video01.trash-back-icon", function (event) {
                    event.preventDefault();
                    const _this = $(this);

                    let $uploadingAnimalVideo01Show = $("#uploading-animal-form .uploadingAnimalVideo01Show");
                    let $uploadingAnimalVideo01 = $("#uploading-animal-form #uploadingAnimalVideo01");

                    let $uploadingAnimalVideo01Data = JSON.parse($("#uploading-animal-form #uploadingAnimalVideo01DataOld").val());

                    // $("#uploading-animal-form #uploadingAnimalVideo01Data").val($uploadingAnimalVideo01Data);
                    $uploadingAnimalVideo01.val($uploadingAnimalVideo01Data['filename']);
                    $uploadingAnimalVideo01.addClass("pointer-events-none");
                    $uploadingAnimalVideo01Show.find(".animal.video01.video-icon").addClass("d-none");
                    $uploadingAnimalVideo01Show.find(".animal.video01.trash-back-icon").addClass("d-none");
                    $uploadingAnimalVideo01Show.find(".animal.video01.trash-icon").removeClass("d-none");

                    $uploadingAnimalVideo01Show.find(".animal.video01.cropped-video #animalUploadingVideo01Video").attr("src", "/static/videos/animal/" + $uploadingAnimalVideo01Data['folder'] + "/cropped/" + $uploadingAnimalVideo01Data['filename']);
                    $uploadingAnimalVideo01Show.find(".animal.video01.cropped-video").removeClass("d-none");
                    $("#uploading-animal-form #uploadingAnimalVideo01Data").val($("#uploading-animal-form #uploadingAnimalVideo01DataOld").val());
                    $("#uploading-animal-form #uploadingAnimalVideo01Status").val(null);
                });

            },

            uploadingAnimalPDF: function () {
                let fileErrorBreedRegistry;
                let fileErrorXRay;

                const pdfOptions = {
                    height: "500px",
                    pdfOpenParams: {
                        pagemode: 'none'
                    }
                };

                let maxSizePDF;
                if (process.env.NODE_ENV === "production") {
                    maxSizePDF = process.env.PRODUCTION_PDF_MAX_SIZE // Bytes == 25 Megabytes
                } else {
                    maxSizePDF = process.env.DEVELOPMENT_PDF_MAX_SIZE // Bytes == 25 Megabytes
                }




        // Start X Ray PDF

        $("body").on("click", "#uploading-animal-form #uploadingAnimalXRayPdf, #uploading-animal-form .animal.xRay.img-icon", function (event) {
            event.preventDefault();
            const _this = $(this);

            $("#uploading-animal-form .animal.xRay.img-icon").upload({
                "action": "/uploading-animal-x-ray-pdf-upload",
                "label": "",
                "multiple": false,
                "maxSize": maxSizePDF,
                "theme": "",
                beforeSend: onBeforeSend
            }).on("start.upload", onStart)
                .on("complete.upload", onComplete)
                .on("filestart.upload", onFileStart)
                .on("fileprogress.upload", onFileProgress)
                .on("filecomplete.upload", onFileComplete)
                .on("fileerror.upload", onFileError)
                .on("queued.upload", onQueued);

            $("#uploading-animal-form").off("click", ".img-cancel.progress-rm.xRay");
            $("#uploading-animal-form").on("click", ".img-cancel.progress-rm.xRay", onCancel);

            function onCancel(e) {
                $("#uploading-animal-form #uploadingAnimalXRAYPdf").val(null);
                $("#uploading-animal-form #uploadingAnimalXRAYPdfData").val(null);
                $("#uploading-animal-form .animal.xRay.img-icon").upload("abort");
                $("#uploading-animal-form .animal.xRay.progress").addClass("d-none");
                $("#uploading-animal-form .animal.xRay.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                $("#uploading-animal-form .animal.xRay.progress .progress-bar .file-percent").html("0%");
                $("#uploading-animal-form .animal.xRay.progress .progress-bar .file-size").html("");
                $("#uploading-animal-form .animal.xRay.progress .progress-bar").css({"width": "0"});

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
                $("#uploading-animal-form .animal.xRay.progress").removeClass("d-none");
                $("#uploading-animal-form .animal.xRay.progress .progress-bar .file-percent").html("0%");
                $("#uploading-animal-form .animal.xRay.progress .progress-bar").css({"width": "0"});
            }

            function onFileProgress(event, file, percent) {
                $("#uploading-animal-form .animal.xRay.progress .progress-bar .file-percent").html(percent + "%");
                $("#uploading-animal-form .animal.xRay.progress .progress-bar").css({"width": percent + "%"})
            }

            function onFileComplete(event, file, response) {
                let fileSize = utility.getFormatBytes(file['size']);
                $("#uploading-animal-form .animal.xRay.progress .progress-bar").removeClass("progress-bar-striped").addClass("bg-success");
                $("#uploading-animal-form .animal.xRay.progress .progress-bar .file-size").html("- " + fileSize['size'] + " " + fileSize['type']);

                if (PDFObject.supportsPDFs) {
                    PDFObject.embed(JSON.parse(response).data, "#animal-new-x-ray-cropper", pdfOptions);
                } else {
                    console.log("Not supported by this browser.");
                }

                setTimeout(
                    function () {
                        $("#uploading-animal-form .animal.xRay.progress").addClass("d-none");
                        $("#uploading-animal-form .animal.xRay.cropper-img").removeClass("d-none");
                        $("#uploading-animal-form .animal.xRay.trash-icon").removeClass("d-none");
                        $("#uploading-animal-form .animal.xRay.img-icon").addClass("d-none");
                        $("#uploading-animal-form #uploadingAnimalXRayPdf").val(JSON.parse(response).filename);
                        $("#uploading-animal-form #uploadingAnimalXRayPdfData").val(response);
                        $("#uploading-animal-form #uploadingAnimalXRayPdf, #uploading-animal-form .animal.xRay.img-icon").addClass("pointer-events-none");
                        $("#uploading-animal-form .animal.xRay.trash-back-icon").addClass("d-none");
                        $("#uploading-animal-form #uploadingAnimalXRayPdfStatus").val("new");

                        $("#uploading-animal-form").find(".uploading-animal-x-ray-error span").removeData("i18n");
                        $("#uploading-animal-form").find(".uploading-animal-x-ray-error span").text("");
                        $("#uploading-animal-form").find(".uploading-animal-x-ray-error").addClass("d-none");

                        $("#uploading-animal-form .animal.xRay.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                        $("#uploading-animal-form .animal.xRay.progress .progress-bar .file-percent").html("0%");
                        $("#uploading-animal-form .animal.xRay.progress .progress-bar .file-size").html("");
                        $("#uploading-animal-form .animal.xRay.progress .progress-bar").css({"width": "0"});
                    }, 2000);

            }

            function onFileError(event, file, error) {
                if (error) {
                    fileErrorXRay = {"fileSize": utility.getFormatBytes(file['size']), "error": error}

                    $("#uploading-animal-form .animal.xRay.progress").addClass("d-none");
                    $("#uploading-animal-form .animal.xRay.progress .progress-bar").removeClass("bg-success").addClass("bg-primary progress-bar-striped");
                    $("#uploading-animal-form .animal.xRay.progress .progress-bar .file-percent").html("0%");
                    $("#uploading-animal-form .animal.xRay.progress .progress-bar .file-size").html("");
                    $("#uploading-animal-form .animal.xRay.progress .progress-bar").css({"width": "0"});

                    let $uploadingAnimalForm = $("#uploading-animal-form");

                    if (fileErrorXRay['error'] === "Request Entity Too Large" || fileErrorXRay['error'] === "size") {
                        $uploadingAnimalForm.find(".uploading-animal-x-ray-error span").removeData("i18n");
                        $uploadingAnimalForm.find(".uploading-animal-x-ray-error span").text("");
                        $uploadingAnimalForm.find(".uploading-animal-x-ray-error span").attr("data-i18n", "anlihouse-A210");
                        $uploadingAnimalForm.find(".uploading-animal-x-ray-error").removeClass("d-none");
                        $('body').i18n();
                    } else if (fileErrorXRay['error'] === "Unsupported Media Type") {
                        $uploadingAnimalForm.find(".uploading-animal-x-ray-error span").removeData("i18n");
                        $uploadingAnimalForm.find(".uploading-animal-x-ray-error span").text("");
                        $uploadingAnimalForm.find(".uploading-animal-x-ray-error span").attr("data-i18n", "anlihouse-A209");
                        $uploadingAnimalForm.find(".uploading-animal-x-ray-error").removeClass("d-none");
                        $('body').i18n();
                    }


                }
            }

            $("#uploading-animal-form .animal.xRay.img-icon .fs-upload-target").trigger("click");

        });

        $("body").on("click", "#uploading-animal-form .animal.xRay.trash-icon", function (event) {
            event.preventDefault();
            const _this = $(this);

            $("#uploading-animal-form #uploadingAnimalXRayPdf").val(null);
            $("#uploading-animal-form #uploadingAnimalXRayPdfData").val(null);
            $("#uploading-animal-form .animal.xRay.trash-icon").addClass("d-none");
            $("#uploading-animal-form .animal.xRay.crop-icon").addClass("d-none");
            $("#uploading-animal-form .animal.xRay.crop-back-icon").addClass("d-none");
            $("#uploading-animal-form .animal.xRay.img-icon").removeClass("d-none");
            $("#uploading-animal-form .animal.xRay.cropper-img").addClass("d-none");
            $("#uploading-animal-form .animal.xRay.animal-edit-img01-preview").addClass("d-none");
            $("#uploading-animal-form #uploadingAnimalXRayPdf, #uploading-animal-form .animal.xRay.img-icon").removeClass("pointer-events-none");
            $("#uploading-animal-form .animal.xRay.trash-back-icon").removeClass("d-none");
            $("#uploading-animal-form #uploadingAnimalXRayPdfStatus").val("rm");
        });

        $("body").on("click", "#uploading-animal-form .animal.xRay.trash-back-icon", function (event) {
            event.preventDefault();
            const _this = $(this);

            _this.addClass("d-none");

            let $uploadingAnimalXRayShow = $("#uploading-animal-form .uploadingAnimalXRayShow");
            let $uploadingAnimalXRayPdfData = JSON.parse($("#uploading-animal-form #uploadingAnimalXRayPdfDataOld").val());
            let $uploadingAnimalXRayPdf = $uploadingAnimalXRayShow.find("#uploadingAnimalXRayPdf");
            $("#uploading-animal-form #uploadingAnimalXRayPdfData").val();

            $("#uploading-animal-form #uploadingAnimalXRayPdfStatus").val("unchanged");

            $uploadingAnimalXRayPdf.addClass("pointer-events-none");
            $uploadingAnimalXRayPdf.val($uploadingAnimalXRayPdfData['filename']);
            $uploadingAnimalXRayShow.find(".animal.xRay.img-icon").addClass("d-none");
            $uploadingAnimalXRayShow.find(".animal.xRay.trash-icon").removeClass("d-none");

            if (PDFObject.supportsPDFs) {
                PDFObject.embed("/static/pdf/animal/" + $uploadingAnimalXRayPdfData['folder'] + "/" + $uploadingAnimalXRayPdfData['filename'], "#animal-new-breed-registry-cropper", pdfOptions);
                $uploadingAnimalXRayShow.find(".animal.xRay.cropper-img").removeClass("d-none");
            } else {
                console.log("Not supported by this browser.");
            }
        });

        // End X Ray PDF

    },

        initializ: function () {
            loadAnimalMedia.uploadingAnimalImages();
            loadAnimalMedia.uploadingAnimalNewImg();
            loadAnimalMedia.uploadingAnimalVideos();
            loadAnimalMedia.uploadingAnimalPDF();
        }

    };

    $(

    function() {
        loadAnimalMedia.initializ()
    }

)
    ;
}
}

export let anlibreedersAnimalMedia = new AnlibreedersAnimalMedia();