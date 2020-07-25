
var isBindFromGridButton = false;
var USERID;
var UploadedDocumentPath;
var MaxImageSize;
var ProjectImagePath;
var MaxLogoSize;
var oldFileName;
var oldLogo;


// file upload
//$(function () {
//    'use strict';
var url = ''; //BaseURL + 'Upload/LetterInward';

//signature upload
$('#uploadBtnSignature').fileupload({
    url: url,
    dataType: 'json',
    done: function (e, data) {
        debugger;
        var UploadFailedFiles = [];
        UploadFailedFiles.length = 0;
        alert("ddd");
        var UploadFailedFilesName = [];
        UploadFailedFilesName.length = 0;

        for (var i = 0; i < data.result.length; i++) {
            if (data.result[i].Status == true) {
                var guid = USERID;
                var signName = $('#imgSign').attr('class');
                $("[name='Photo']").each(function () {
                    $(this).remove();
                });
                if (signName != null && signName != "") {
                    DeleteFileFromSignatureOnUpload(signName, guid, oldFileName);
                }
                var proofDocumentURL = 'http://localhost/IGovernance/';
                //var proofDocumentURL = 'http://122.169.119.181/GNC/';
                var imagePath = proofDocumentURL + "Upload" + "/" + $("#FormObject").val() + "/" + guid;
                var SRC = imagePath + "/" + data.result[i].FileName.replace("%", "$");
                $('#imgSign').attr('src', SRC);
                $('#imgSign').attr('class', data.result[i].FileName.replace("%", "$"));


                //$('#imgSignature').show();
                $('#bckUpload').removeClass('bckUpload');
                $('#imgSign').css("display", "block");
                $('#signDelete').css("display", "inline");

                $('<input type="hidden">').attr({
                    name: 'Photo',
                    value: data.result[i].FileName.replace("%", "$"),
                    id: data.result[i].FileName.replace("%", "$"),
                }).appendTo('form');

            }
            else if (data.result[i].Status == false && data.result[i].Message == "BigName") {
                UploadFailedFilesName.push(data.result[i].FileName.replace("%", "$"));
            }
            else {
                UploadFailedFiles.push(data.result[i].FileName.replace("%", "$"));
            }
        }
        if (UploadFailedFiles.length > 0) {
            ShowToast('', UploadFailedFiles.length + " " + "File has not been uploaded.", 'error');
        }

        if (UploadFailedFilesName.length > 0) {
            ShowToast('', UploadFailedFilesName.length + " " + "Uploaded filename is too big.", 'error');
        }
        if (UploadFailedFilesName.length == 0 && UploadFailedFiles.length == 0) {
            ShowToast('', 'File has been uploaded successfully.', 'success');
        }
    },

    progressall: function (e, data) {

    },

    singleFileUploads: false,
    send: function (e, data) {
        var documentType = data.files[0].type.split("/");
        var mimeType = documentType[0];
        if (data.files.length == 1) {
            for (var i = 0; i < data.files.length; i++) {
                if (data.files[i].name.length > 50) {
                    ShowToast("", "Please upload small filename.", "error");
                    return false;
                }
            }
        }
        if (data.files.length > 1) {
            for (var i = 0; i < data.files.length; i++) {
                if (data.files[i].size > parseInt(MaxImageSize)) {
                    ShowToast("", data.files[i].name + " Maximum file size limit exceeded. Please upload a file smaller  than" + " " + maxsize + "MB", "error");
                    return false;
                }
            }
        }
        else {
            if (data.files[0].size > parseInt(MaxImageSize)) {
                ShowToast("", "Maximum  file size limit exceeded.Please upload a  file smaller than" + " " + maxsize + "MB", "error")
                return false;
            }
        }
        if (mimeType != "image") {
            ShowToast("", "Please upload a file with .jpg , .jpeg or .png extension.", "error");
            return false;
        }
        $(".alert").hide();
        $("#errorMsgRegion").html("");
        $("#errorMsgRegion").hide();

        $('<input type="hidden">').attr({
            name: 'Guid',
            value: USERID,
            id: USERID,
        }).appendTo('form');
        return true;

    },
    formData: { userId: USERID, moduleName: $("#FormObject").val() },
    change: function (e, data) {
        $("#uploadFile").val("C:\\fakepath\\" + data.files[0].name);
    }
}).prop('disabled', !$.support.fileInput)
    .parent().addClass($.support.fileInput ? undefined : 'disabled');


function fileUploadnew(ControlName, url, divName, fieldName) {
    //mulitiple proof upload
    $('#' + ControlName).fileupload({
        url: url + "Upload",
        dataType: 'json',
        done: function (e, data) {
            var UploadFailedFiles = [];
            UploadFailedFiles.length = 0;

            var UploadFailedFilesName = [];
            UploadFailedFilesName.length = 0;

            for (var i = 0; i < data.result.length; i++) {

                if (data.result[i].Status == true) {
                    $("#" + divName).find('tr').each(function () {
                        $(this).remove();
                    });
                    var rowcount = $('#' + divName + ' tr').length;
                    var count = rowcount + 1;
                    var documentType = data.result[i].MimeType.split("/");
                    var mimeType = documentType[0];
                    var documentId = "document" + count;
                    var content = "<tr style='margin-top:30px' id= " + data.result[i].FileName.replace("%", "$") + " >"
                    content += '<td class="tdCount col-sm-2" style="font-weight: bold;color: blue;" >' + count + '.' + ' </td>';
                    content += '<td class="col-sm-8" style="font-weight: bold;color: blue;">' + data.result[i].FileName.replace("%", "$") + ' </td>';

                    if (mimeType == "image") {
                        content += '<td  class="col-sm-2" style="color:blue"><img src=' + ProjectImagePath + 'images/view-icon.png style="cursor: pointer" id="' + data.result[i].FileName.replace("%", "$") + '"  class="' + data.result[i].FileName.replace("%", "$") + '" title="Preview" onclick="OpenDocument(this)"></td>';
                    }
                    else {
                        content += '<td  class="col-sm-2" style="color:blue"><img src=' + ProjectImagePath + 'images/view-icon.png style="cursor: pointer" id="' + data.result[i].FileName.replace("%", "$") + '" class="' + data.result[i].FileName.replace("%", "$") + '" title="Download" onclick="DownloadDocument(this)"></td>';
                    }
                    content += '<td style="color:blue"><img src=' + ProjectImagePath + 'images/delete-icon.png style="cursor: pointer id="signDelete1" title="Delete" onclick="DeleteFileFromFolder(\'' + data.result[i].FileName + '\',\'' + divName + '\',\'' + fieldName + '\')"></td>';
                    content += "</tr>"

                    //$('#' + divName).append(content);
                    $('<input type="hidden">').attr({
                        name: fieldName + '_FileNamesCreate',
                        value: data.result[i].FileName.replace("%", "$"),
                        id: data.result[i].FileName.replace("%", "$"),
                    }).appendTo('form');

                    if (data.result[i].Status == true) {
                        var guid = USERID;
                        var signName = $('#imgSign').attr('class');
                        $("[name='Photo']").each(function () {
                            $(this).remove();
                        });
                        if (signName != null && signName != "") {
                            DeleteFileFromSignatureOnUpload(signName, guid, oldFileName);
                        }
                        var proofDocumentURL = ProjectImagePath;
                        //var proofDocumentURL = 'http://122.169.119.181/eTrack/';
                        var imagePath = proofDocumentURL + "Upload" + "/" + $("#FormObject").val() + "/" + guid;
                        var SRC = imagePath + "/" + data.result[i].FileName.replace("%", "$");
                        $('#imgSign').attr('src', SRC);
                        $('#imgSign').attr('class', data.result[i].FileName.replace("%", "$"));


                        //$('#imgSignature').show();
                        $('#bckUpload').removeClass('bckUpload');
                        $('#imgSign').css("display", "block");
                        $('#signDelete').css("display", "inline");

                        $('<input type="hidden">').attr({
                            name: fieldName + '_FileNamesCreate',
                            value: data.result[i].FileName.replace("%", "$"),
                            id: data.result[i].FileName.replace("%", "$"),
                        }).appendTo('form');


                    }
                    else if (data.result[i].Status == false && data.result[i].Message == "BigName") {
                        UploadFailedFilesName.push(data.result[i].FileName.replace("%", "$"));
                    }
                    else {
                        UploadFailedFiles.push(data.result[i].FileName.replace("%", "$"));
                    }
                }
                if (UploadFailedFiles.length > 0) {
                    ShowToast("", UploadFailedFiles.length + " " + "File has not been uploaded.", "error");
                }
                if (UploadFailedFilesName.length > 0) {
                    ShowToast("", UploadFailedFilesName.length + " " + "Uploaded filename is too big.", "error");
                }
                if (UploadFailedFilesName.length == 0 && UploadFailedFiles.length == 0) {
                    ShowToast("", "File has been uploaded successfully.", "success");
                }
            }
        },

        progressall: function (e, data) {

        },

        singleFileUploads: false,
        send: function (e, data) {
            if (data.files.length == 1) {
                for (var i = 0; i < data.files.length; i++) {
                    if (data.files[i].name.length > 50) {
                        //$('html').animate({ scrollTop: 0 }, 'slow');//IE, FF
                        //$('body').animate({ scrollTop: 0 }, 'slow');
                        ShowToast("", "Please upload small filename.", "error");
                        return false;
                    }
                }
            }
            if (data.files.length > 1) {
                for (var i = 0; i < data.files.length; i++) {
                    if (data.files[i].size > parseInt(MaxImageSize)) {
                        ShowToast("", data.files[i].name + " Maximum file size limit exceeded. Please upload a file smaller  than" + " " + maxsize + "MB", "error");
                        return false;
                    }
                }
            }
            else {
                if (data.files[0].size > parseInt(MaxImageSize)) {
                    ShowToast("", "Maximum  file size limit exceeded.Please upload a  file smaller than" + " " + maxsize + "MB", "error");
                    return false;
                }
            }
            $(".alert").hide();
            $("#errorMsgRegion").html("");
            $("#errorMsgRegion").hide();
            $('<input type="hidden">').attr({
                name: 'Guid',
                value: USERID,
                id: USERID,
            }).appendTo('form');
            return true;
        },
        formData: { userId: USERID, moduleName: $("#FormObject").val() },
        change: function (e, data) {
            $("#uploadFile").val("C:\\fakepath\\" + data.files[0].name);
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

}

function fileUploadnewSign(ControlName, url, divName, fieldName) {
    //mulitiple proof upload
    $('#' + ControlName).fileupload({
        url: url + "Upload",
        dataType: 'json',
        done: function (e, data) {
            var UploadFailedFiles = [];
            UploadFailedFiles.length = 0;

            var UploadFailedFilesName = [];
            UploadFailedFilesName.length = 0;

            for (var i = 0; i < data.result.length; i++) {

                if (data.result[i].Status == true) {
                    $("#" + divName).find('tr').each(function () {
                        $(this).remove();
                    });
                    var rowcount = $('#' + divName + ' tr').length;
                    var count = rowcount + 1;
                    var documentType = data.result[i].MimeType.split("/");
                    var mimeType = documentType[0];
                    var documentId = "document" + count;
                    var content = "<tr style='margin-top:30px' id= " + data.result[i].FileName.replace("%", "$") + " >"
                    content += '<td class="tdCount col-sm-2" style="font-weight: bold;color: blue;" >' + count + '.' + ' </td>';
                    content += '<td class="col-sm-8" style="font-weight: bold;color: blue;">' + data.result[i].FileName.replace("%", "$") + ' </td>';

                    if (mimeType == "image") {
                        content += '<td  class="col-sm-2" style="color:blue"><img src=' + ProjectImagePath + 'images/view-icon.png style="cursor: pointer" id="' + data.result[i].FileName.replace("%", "$") + '"  class="' + data.result[i].FileName.replace("%", "$") + '" title="Preview" onclick="OpenDocument(this)"></td>';
                    }
                    else {
                        content += '<td  class="col-sm-2" style="color:blue"><img src=' + ProjectImagePath + 'images/view-icon.png style="cursor: pointer" id="' + data.result[i].FileName.replace("%", "$") + '" class="' + data.result[i].FileName.replace("%", "$") + '" title="Download" onclick="DownloadDocument(this)"></td>';
                    }
                    content += '<td style="color:blue"><img src=' + ProjectImagePath + 'images/delete-icon.png style="cursor: pointer id="signDelete1" title="Delete" onclick="DeleteFileFromFolder(\'' + data.result[i].FileName + '\',\'' + divName + '\',\'' + fieldName + '\')"></td>';
                    content += "</tr>"

                    //$('#' + divName).append(content);
                    $('<input type="hidden">').attr({
                        name: fieldName + '_FileNamesCreate',
                        value: data.result[i].FileName.replace("%", "$"),
                        id: data.result[i].FileName.replace("%", "$"),
                    }).appendTo('form');

                    if (data.result[i].Status == true) {
                        var guid = USERID;
                        var signName = $('#imgSign1').attr('class');
                        $("[name='Photo']").each(function () {
                            $(this).remove();
                        });
                        if (signName != null && signName != "") {
                            DeleteFileFromSignatureOnUpload(signName, guid, oldFileName);
                        }
                        var proofDocumentURL = ProjectImagePath;
                        //var proofDocumentURL = 'http://122.169.119.181/eTrack/';
                        var imagePath = proofDocumentURL + "Upload" + "/" + $("#FormObject").val() + "/" + guid;
                        var SRC = imagePath + "/" + data.result[i].FileName.replace("%", "$");
                        $('#imgSign1').attr('src', SRC);
                        $('#imgSign1').attr('class', data.result[i].FileName.replace("%", "$"));


                        //$('#imgSignature').show();
                        $('#bckUpload1').removeClass('bckUpload');
                        $('#imgSign1').css("display", "block");
                        $('#signDelete1').css("display", "inline");

                        $('<input type="hidden">').attr({
                            name: fieldName + '_FileNamesCreate',
                            value: data.result[i].FileName.replace("%", "$"),
                            id: data.result[i].FileName.replace("%", "$"),
                        }).appendTo('form');


                    }
                    else if (data.result[i].Status == false && data.result[i].Message == "BigName") {
                        UploadFailedFilesName.push(data.result[i].FileName.replace("%", "$"));
                    }
                    else {
                        UploadFailedFiles.push(data.result[i].FileName.replace("%", "$"));
                    }
                }
                if (UploadFailedFiles.length > 0) {
                    ShowToast("", UploadFailedFiles.length + " " + "File has not been uploaded.", "error");
                }
                if (UploadFailedFilesName.length > 0) {
                    ShowToast("", UploadFailedFilesName.length + " " + "Uploaded filename is too big.", "error");
                }
                if (UploadFailedFilesName.length == 0 && UploadFailedFiles.length == 0) {
                    ShowToast("", "File has been uploaded successfully.", "success");
                }
            }
        },

        progressall: function (e, data) {

        },

        singleFileUploads: false,
        send: function (e, data) {
            if (data.files.length == 1) {
                for (var i = 0; i < data.files.length; i++) {
                    if (data.files[i].name.length > 50) {
                        //$('html').animate({ scrollTop: 0 }, 'slow');//IE, FF
                        //$('body').animate({ scrollTop: 0 }, 'slow');
                        ShowToast("", "Please upload small filename.", "error");
                        return false;
                    }
                }
            }
            if (data.files.length > 1) {
                for (var i = 0; i < data.files.length; i++) {
                    if (data.files[i].size > parseInt(MaxImageSize)) {
                        ShowToast("", data.files[i].name + " Maximum file size limit exceeded. Please upload a file smaller  than" + " " + maxsize + "MB", "error");
                        return false;
                    }
                }
            }
            else {
                if (data.files[0].size > parseInt(MaxImageSize)) {
                    ShowToast("", "Maximum  file size limit exceeded.Please upload a  file smaller than" + " " + maxsize + "MB", "error");
                    return false;
                }
            }
            $(".alert").hide();
            $("#errorMsgRegion").html("");
            $("#errorMsgRegion").hide();
            $('<input type="hidden">').attr({
                name: 'Guid',
                value: USERID,
                id: USERID,
            }).appendTo('form');
            return true;
        },
        formData: { userId: USERID, moduleName: $("#FormObject").val() },
        change: function (e, data) {
            $("#uploadFile").val("C:\\fakepath\\" + data.files[0].name);
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

}

function fileUpload(ControlName, url, divName, fieldName) {
    //mulitiple proof upload
    
    $('#' + ControlName).fileupload({
        url: url + "Upload",
        dataType: 'json',
        done: function (e, data) {
            var UploadFailedFiles = [];
            UploadFailedFiles.length = 0;

            var UploadFailedFilesName = [];
            UploadFailedFilesName.length = 0;

            for (var i = 0; i < data.result.length; i++) {

                if (data.result[i].Status == true) {
                    $("#" + divName).find('tr').each(function () {
                        $(this).remove();
                    });
                    var rowcount = $('#' + divName + ' tr').length;
                    var count = rowcount + 1;
                    var documentType = data.result[i].MimeType.split("/");
                    var mimeType = documentType[0];
                    var documentId = "document" + count;
                    var content = "<tr style='margin-top:30px' id= " + data.result[i].FileName.replace("%", "$") + " >"
                    content += '<td class="tdCount col-sm-2" style="font-weight: bold;color: blue;" >' + count + '.' + ' </td>';
                    content += '<td class="col-sm-8" style="font-weight: bold;color: blue;">' + data.result[i].FileName.replace("%", "$") + ' </td>';

                    if (mimeType == "image") {
                        content += '<td  class="col-sm-2" style="color:blue"><img src=' + ProjectImagePath + 'images/view-icon.png style="cursor: pointer" id="' + data.result[i].FileName.replace("%", "$") + '"  class="' + data.result[i].FileName.replace("%", "$") + '" title="Preview" onclick="OpenDocument(this)"></td>';
                    }
                    else {
                        content += '<td  class="col-sm-2" style="color:blue"><img src=' + ProjectImagePath + 'images/view-icon.png style="cursor: pointer" id="' + data.result[i].FileName.replace("%", "$") + '" class="' + data.result[i].FileName.replace("%", "$") + '" title="Download" onclick="DownloadDocument(this)"></td>';
                    }
                    content += '<td style="color:blue"><img src=' + ProjectImagePath + 'images/delete-icon.png style="cursor: pointer id="signDelete1" title="Delete" onclick="DeleteFileFromFolder(\'' + data.result[i].FileName + '\',\'' + divName + '\',\'' + fieldName + '\')"></td>';
                    content += "</tr>"

                    $('#' + divName).append(content);
                    $('<input type="hidden">').attr({
                        name: fieldName + '_FileNamesCreate',
                        value: data.result[i].FileName.replace("%", "$"),
                        id: data.result[i].FileName.replace("%", "$"),
                    }).appendTo('form');

                }
                else if (data.result[i].Status == false && data.result[i].Message == "BigName") {
                    UploadFailedFilesName.push(data.result[i].FileName.replace("%", "$"));
                }
                else {
                    UploadFailedFiles.push(data.result[i].FileName.replace("%", "$"));
                }
            }
            if (UploadFailedFiles.length > 0) {
                ShowToast("", UploadFailedFiles.length + " " + "File has not been uploaded.", "error");
            }
            if (UploadFailedFilesName.length > 0) {
                ShowToast("", UploadFailedFilesName.length + " " + "Uploaded filename is too big.", "error");
            }
            if (UploadFailedFilesName.length == 0 && UploadFailedFiles.length == 0) {
                ShowToast("", "File has been uploaded successfully.", "success");
            }
        },

        progressall: function (e, data) {

        },

        singleFileUploads: false,
        send: function (e, data) {
            if (data.files.length == 1) {
                for (var i = 0; i < data.files.length; i++) {
                    if (data.files[i].name.length > 50) {
                        //$('html').animate({ scrollTop: 0 }, 'slow');//IE, FF
                        //$('body').animate({ scrollTop: 0 }, 'slow');
                        ShowToast("", "Please upload small filename.", "error");
                        return false;
                    }
                }
            }
            if (data.files.length > 1) {
                for (var i = 0; i < data.files.length; i++) {
                    if (data.files[i].size > parseInt(MaxImageSize)) {
                        ShowToast("", data.files[i].name + " Maximum file size limit exceeded. Please upload a file smaller  than" + " " + maxsize + "MB", "error");
                        return false;
                    }
                }
            }
            else {
                if (data.files[0].size > parseInt(MaxImageSize)) {
                    ShowToast("", "Maximum  file size limit exceeded.Please upload a  file smaller than" + " " + maxsize + "MB", "error");
                    return false;
                }
            }
            $(".alert").hide();
            $("#errorMsgRegion").html("");
            $("#errorMsgRegion").hide();
            $('<input type="hidden">').attr({
                name: 'Guid',
                value: USERID,
                id: USERID,
            }).appendTo('form');
            return true;
        },
        formData: { userId: USERID, moduleName: $("#FormObject").val() },
        change: function (e, data) {
            $("#uploadFile").val("C:\\fakepath\\" + data.files[0].name);
        }
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

}



////mulitiple proof upload
//$('#uploadBtn2').fileupload({

//    url: url,
//    dataType: 'json',
//    done: function (e, data) {
//        var UploadFailedFiles = [];
//        UploadFailedFiles.length = 0;

//        var UploadFailedFilesName = [];
//        UploadFailedFilesName.length = 0;

//        for (var i = 0; i < data.result.length; i++) {

//            if (data.result[i].Status == true) {
//                $("#tblDocuments2").find('tr').each(function () {
//                    $(this).remove();
//                });
//                $("[name='FileNamesCreate1']").each(function () {
//                    $(this).remove();
//                });
//                var rowcount = $('#tblDocuments2 tr').length;
//                var count = rowcount + 1;
//                var documentType = data.result[i].MimeType.split("/");
//                var mimeType = documentType[0];
//                var documentId = "document" + count;
//                var content = "<tr style='margin-top:30px' id= " + data.result[i].FileName.replace("%", "$") + " >"
//                content += '<td class="tdCount col-sm-2" >' + count + '.' + ' </td>';
//                content += '<td class="col-sm-6" style="color:#494949">' + data.result[i].FileName.replace("%", "$") + ' </td>';

//                if (mimeType == "image") {
//                    content += '<td  class="col-sm-2" style="color:blue"><img src=' + ProjectImagePath + 'images/view-icon.png style="cursor: pointer" id="' + data.result[i].FileName.replace("%", "$") + '"  class="' + data.result[i].FileName.replace("%", "$") + '" title="Preview" onclick="OpenDocument(this)"></td>';
//                }
//                else {
//                    content += '<td  class="col-sm-2" style="color:blue"><img src=' + ProjectImagePath + 'images/view-icon.png style="cursor: pointer" id="' + data.result[i].FileName.replace("%", "$") + '" class="' + data.result[i].FileName.replace("%", "$") + '" title="Download" onclick="DownloadDocument(this)"></td>';
//                }
//                content += '<td style="color:blue"><img src=' + ProjectImagePath + 'images/delete-icon.png style="cursor: pointer id="signDelete2" title="Delete" onclick="DeleteFileFromFolder(\'' + data.result[i].FileName + '\',2)"></td>';
//                content += "</tr>"

//                $('#tblDocuments2').append(content);
//                $('<input type="hidden">').attr({
//                    name: 'FileNamesCreate1',
//                    value: data.result[i].FileName.replace("%", "$"),
//                    id: data.result[i].FileName.replace("%", "$"),
//                }).appendTo('form');

//            }
//            else if (data.result[i].Status == false && data.result[i].Message == "BigName") {
//                UploadFailedFilesName.push(data.result[i].FileName.replace("%", "$"));
//            }
//            else {
//                UploadFailedFiles.push(data.result[i].FileName.replace("%", "$"));
//            }
//        }
//        if (UploadFailedFiles.length > 0) {
//            ShowToast("", UploadFailedFiles.length + " " + "File has not been uploaded.", "error");
//        }
//        if (UploadFailedFilesName.length > 0) {
//            ShowToast("", UploadFailedFilesName.length + " " + "Uploaded filename is too big.", "error");
//        }
//        if (UploadFailedFilesName.length == 0 && UploadFailedFiles.length == 0) {
//            ShowToast("", "File has been uploaded successfully.", "success");
//        }
//    },

//    progressall: function (e, data) {

//    },

//    singleFileUploads: false,
//    send: function (e, data) {
//        if (data.files.length == 1) {
//            for (var i = 0; i < data.files.length; i++) {
//                if (data.files[i].name.length > 50) {
//                    //$('html').animate({ scrollTop: 0 }, 'slow');//IE, FF
//                    //$('body').animate({ scrollTop: 0 }, 'slow');
//                    ShowToast("", "Please upload small filename.", "error");
//                    return false;
//                }
//            }
//        }
//        if (data.files.length > 1) {
//            for (var i = 0; i < data.files.length; i++) {
//                debugger;
//                if (data.files[i].size > parseInt(MaxImageSize)) {
//                    ShowToast("", data.files[i].name + " Maximum file size limit exceeded. Please upload a file smaller  than" + " " + maxsize + "MB", "error");
//                    return false;
//                }
//            }
//        }
//        else {
//            if (data.files[0].size > parseInt(MaxImageSize)) {
//                debugger;
//                ShowToast("", "Maximum  file size limit exceeded.Please upload a  file smaller than" + " " + maxsize + "MB", "error");
//                return false;
//            }
//        }
//        $(".alert").hide();
//        $("#errorMsgRegion").html("");
//        $("#errorMsgRegion").hide();
//        $('<input type="hidden">').attr({
//            name: 'Guid',
//            value: USERID,
//            id: USERID,
//        }).appendTo('form');
//        return true;
//    },
//    formData: { userId: USERID, moduleName: $("#FormObject").val() },
//    change: function (e, data) {
//        $("#uploadFile").val("C:\\fakepath\\" + data.files[0].name);
//    }
//}).prop('disabled', !$.support.fileInput)
//    .parent().addClass($.support.fileInput ? undefined : 'disabled');

////mulitiple proof upload
//$('#uploadBtn3').fileupload({

//    url: url,
//    dataType: 'json',
//    done: function (e, data) {
//        var UploadFailedFiles = [];
//        UploadFailedFiles.length = 0;

//        var UploadFailedFilesName = [];
//        UploadFailedFilesName.length = 0;

//        for (var i = 0; i < data.result.length; i++) {

//            if (data.result[i].Status == true) {
//                $("#tblDocuments3").find('tr').each(function () {
//                    $(this).remove();
//                });
//                $("[name='FileNamesCreate2']").each(function () {
//                    $(this).remove();
//                });
//                var rowcount = $('#tblDocuments3 tr').length;
//                var count = rowcount + 1;
//                var documentType = data.result[i].MimeType.split("/");
//                var mimeType = documentType[0];
//                var documentId = "document" + count;
//                var content = "<tr style='margin-top:30px' id= " + data.result[i].FileName.replace("%", "$") + " >"
//                content += '<td class="tdCount col-sm-2" >' + count + '.' + ' </td>';
//                content += '<td class="col-sm-6" style="color:#494949">' + data.result[i].FileName.replace("%", "$") + ' </td>';

//                if (mimeType == "image") {
//                    content += '<td  class="col-sm-2" style="color:blue"><img src=' + ProjectImagePath + 'images/view-icon.png style="cursor: pointer" id="' + data.result[i].FileName.replace("%", "$") + '"  class="' + data.result[i].FileName.replace("%", "$") + '" title="Preview" onclick="OpenDocument(this)"></td>';
//                }
//                else {
//                    content += '<td  class="col-sm-2" style="color:blue"><img src=' + ProjectImagePath + 'images/view-icon.png style="cursor: pointer" id="' + data.result[i].FileName.replace("%", "$") + '" class="' + data.result[i].FileName.replace("%", "$") + '" title="Download" onclick="DownloadDocument(this)"></td>';
//                }
//                content += '<td style="color:blue"><img src=' + ProjectImagePath + 'images/delete-icon.png style="cursor: pointer id="signDelete3" title="Delete" onclick="DeleteFileFromFolder(\'' + data.result[i].FileName + '\',3)"></td>';
//                content += "</tr>"

//                $('#tblDocuments2').append(content);
//                $('<input type="hidden">').attr({
//                    name: 'FileNamesCreate2',
//                    value: data.result[i].FileName.replace("%", "$"),
//                    id: data.result[i].FileName.replace("%", "$"),
//                }).appendTo('form');

//            }
//            else if (data.result[i].Status == false && data.result[i].Message == "BigName") {
//                UploadFailedFilesName.push(data.result[i].FileName.replace("%", "$"));
//            }
//            else {
//                UploadFailedFiles.push(data.result[i].FileName.replace("%", "$"));
//            }
//        }
//        if (UploadFailedFiles.length > 0) {
//            ShowToast("", UploadFailedFiles.length + " " + "File has not been uploaded.", "error");
//        }
//        if (UploadFailedFilesName.length > 0) {
//            ShowToast("", UploadFailedFilesName.length + " " + "Uploaded filename is too big.", "error");
//        }
//        if (UploadFailedFilesName.length == 0 && UploadFailedFiles.length == 0) {
//            ShowToast("", "File has been uploaded successfully.", "success");
//        }
//    },

//    progressall: function (e, data) {

//    },

//    singleFileUploads: false,
//    send: function (e, data) {
//        if (data.files.length == 1) {
//            for (var i = 0; i < data.files.length; i++) {
//                if (data.files[i].name.length > 50) {
//                    //$('html').animate({ scrollTop: 0 }, 'slow');//IE, FF
//                    //$('body').animate({ scrollTop: 0 }, 'slow');
//                    ShowToast("", "Please upload small filename.", "error");
//                    return false;
//                }
//            }
//        }
//        if (data.files.length > 1) {
//            for (var i = 0; i < data.files.length; i++) {
//                debugger;
//                if (data.files[i].size > parseInt(MaxImageSize)) {
//                    ShowToast("", data.files[i].name + " Maximum file size limit exceeded. Please upload a file smaller  than" + " " + maxsize + "MB", "error");
//                    return false;
//                }
//            }
//        }
//        else {
//            if (data.files[0].size > parseInt(MaxImageSize)) {
//                debugger;
//                ShowToast("", "Maximum  file size limit exceeded.Please upload a  file smaller than" + " " + maxsize + "MB", "error");
//                return false;
//            }
//        }

//        $('<input type="hidden">').attr({
//            name: 'Guid',
//            value: USERID,
//            id: USERID,
//        }).appendTo('form');
//        return true;
//    },
//    formData: { userId: USERID, moduleName: $("#FormObject").val() },
//    change: function (e, data) {
//        $("#uploadFile").val("C:\\fakepath\\" + data.files[0].name);
//    }
//}).prop('disabled', !$.support.fileInput)
//    .parent().addClass($.support.fileInput ? undefined : 'disabled');
////});

function DeleteFileFromSignatureOnUpload(fileNames, guid, oldFileName) {
    $.ajax(
        {
            url: BaseURL + 'DeleteSignatureFileFromFolder/Institution',
            data: { fileName: fileNames, FolderName: guid, OldFileName: oldFileName, moduleName: $("#FormObject").val() },
            contentType: 'application/json',
            method: 'get',
            success: function (data) {

            },
        });
}

function DeleteFileFromDatabase(UserDocumentID, userId, documentpath, divName, fieldName) {
    if (confirm('Are you sure you want to delete this file ?')) {
        $.ajax(
            {
                url: UploadURL + 'DeleteFileByID',
                data: { UserDocumentID: UserDocumentID, shopID: userId, Documentpath: documentpath, moduleName: $("#FormObject").val() },
                contentType: 'application/json',
                method: 'get',
                success: function () {
                    $("#" + divName).find('tr').each(function () {
                        if ($(this).attr('id') == UserDocumentID)
                            $(this).remove();
                    });
                    $("#" + divName + " tr").each(function () {
                        var trNumber = $(this).index() + 1;
                        $(this).find('td.tdCount').html(trNumber);
                    });
                    $('#' + fieldName).val('');
                    ShowToast("", "File has been Deleted successfully.", "success");
                }
            });
    }
}

function DeleteFileFromFolder(fileDelete, divName, fieldName) {
    var FolderName = USERID;
    if (confirm('Are you sure you want to delete this file ?')) {
        $.ajax(
            {
                url: UploadURL + 'DeleteFileFromFolder',
                data: { fileName: fileDelete, FolderName: FolderName, moduleName: $("#FormObject").val() },
                method: 'get',
                success: function () {
                    document.getElementById(divName).deleteRow(fileDelete);
                    $("#" + divName + "  tr").each(function () {
                        var trNumber = $(this).index() + 1;
                        $(this).find('td.tdCount').html(trNumber);
                    });
                    $("[name='" + fieldName + "_FileNamesCreate']").each(function () {
                        if ($(this).attr('id') == fileDelete)
                            $(this).remove();
                    });

                    $('#' + fieldName).val('');
                    ShowToast("", "File has been Deleted successfully.", "success");
                    return false;
                }
            });
    }
}

function DeleteDocumentFolderOnCancel() {
    var guid = USERID;
    var Name = [];
    var Sign = document.getElementsByName("Photo");
    if (Sign.length > 0) {
        var SignName = Sign[0].id;
        DeleteFileFromUserOnCancel(SignName, guid);
    }
    
    var elements = $("[name*='_FileNamesCreate']");
    if (elements.length > 0) {
        for (var i = 0; i < elements.length; i++) {
            DeleteFileFromUserOnCancel(elements[i].id, guid);
        }
    }
}

function DeleteFileFromUserOnCancel(fileNames, guid) {
    $.ajax(
        {
            url: UploadURL + 'DeleteFileFromFolder',
            data: { fileName: fileNames, FolderName: guid, moduleName: $("#FormObject").val() },
            contentType: 'application/json',
            method: 'get',
            success: function (data) {

            },
        });
}

//Proof of Open upload
function OpenDocument(e) {
    var guid = USERID;
    var proofDocumentURL = UploadedDocumentPath;
    var imagePath = proofDocumentURL + "/" + "Upload" + "/" + $("#FormObject").val() + "/" + guid;
    var SRC = imagePath + "/" + e.className;
    $('#imgFile').attr("src", SRC);
    $('#popupProof').modal({ backdrop: 'static', keyboard: false });
}

//Proof of Download Document
function DownloadDocument(e) {
    var foldername = USERID;
    var FileName = e.id;
    window.location.href = UploadURL + 'ViewDownloadFile/' + $("#FormObject").val() + '?FileName=' + e.className + '&FolderName=' + foldername + '&moduleName=' + $("#FormObject").val();
}

function deleteImage(imageId) {
    var FolderName = USERID;
    var OldFileName = oldFileName;
    var fileDelete = $('#imgSign').attr('class');

    if (confirm('Are you sure you want to delete this file ?')) {
        $.ajax(
            {
                url: UploadURL + 'DeleteFileFromFolder',
                data: { fileName: fileDelete, FolderName: FolderName, moduleName: $("#FormObject").val() },
                //method: 'get',

                //url: BaseURL + 'DeleteSignatureFileFromFolder/Institution',
               // data: { fileName: fileDelete, FolderName: FolderName, OldFileName: OldFileName, moduleName: $("#FormObject").val() },
                contentType: 'application/json',
                method: 'get',
                success: function () {
                    var sign = $('#imgSign').attr('class');
                    $("[name='Photo']").each(function () {
                        $(this).remove();
                    });
                    $('#imgSign').removeAttr('src');
                    $('#imgSign').removeAttr('class');
                    $('#popupbox').modal('hide');
                    $("#imgSignature").hide();
                    $('#imgSign').css("display", "none");
                    $('#bckUpload').addClass('bckUpload');
                    $('#signDelete').css("display", "none");

                    ShowToast("", "File has been Deleted successfully.", "success");

                    return false;
                }
            });
    }
}

function deleteImageSign(imageId) {
    var FolderName = USERID;
    var OldFileName = oldFileName;
    var fileDelete = $('#imgSign1').attr('class');

    if (confirm('Are you sure you want to delete this file ?')) {
        $.ajax(
            {
                url: UploadURL + 'DeleteFileFromFolder',
                data: { fileName: fileDelete, FolderName: FolderName, moduleName: $("#FormObject").val() },
                //method: 'get',

                //url: BaseURL + 'DeleteSignatureFileFromFolder/Institution',
                // data: { fileName: fileDelete, FolderName: FolderName, OldFileName: OldFileName, moduleName: $("#FormObject").val() },
                contentType: 'application/json',
                method: 'get',
                success: function () {
                    var sign = $('#imgSign1').attr('class');
                    $("[name='Photo']").each(function () {
                        $(this).remove();
                    });
                    $('#imgSign1').removeAttr('src');
                    $('#imgSign1').removeAttr('class');
                    $('#popupbox').modal('hide');
                    $("#imgSignature1").hide();
                    $('#imgSign1').css("display", "none");
                    $('#bckUpload1').addClass('bckUpload');
                    $('#signDelete1').css("display", "none");

                    ShowToast("", "File has been Deleted successfully.", "success");

                    return false;
                }
            });
    }
}

function DeleteFileFromFolder(fileDelete, divName, fieldName) {
    var FolderName = USERID;
    if (confirm('Are you sure you want to delete this file ?')) {
        $.ajax(
            {
                url: UploadURL + 'DeleteFileFromFolder',
                data: { fileName: fileDelete, FolderName: FolderName, moduleName: $("#FormObject").val() },
                method: 'get',
                success: function () {
                    document.getElementById(divName).deleteRow(fileDelete);
                    $("#" + divName + "  tr").each(function () {
                        var trNumber = $(this).index() + 1;
                        $(this).find('td.tdCount').html(trNumber);
                    });
                    $("[name='" + fieldName + "_FileNamesCreate']").each(function () {
                        if ($(this).attr('id') == fileDelete)
                            $(this).remove();
                    });

                    $('#' + fieldName).val('');
                    ShowToast("", "File has been Deleted successfully.", "success");
                    return false;
                }
            });
    }
}
