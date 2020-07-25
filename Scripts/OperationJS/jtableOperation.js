function RowSelectedPopup(Id, btn, ControllerName, title) {
    if (btn != "" && ControllerName != "") {
        if (btn == "E") {
            $.ajax({
                url: ITX3ResolveUrl("Common/GetDataById"),
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ 'Id': Id, 'ObjectType': ControllerName }),
                dataType: "json",
                success: function (data) {
                    var Records = data.Records;
                    switch (ControllerName) {
                        case "Language":
                            FillLanguageObject(Records);
                            break;
                    }
                },
                failure: function (response) {
                    alert(response.responseText);
                },
                error: function (response) {
                    alert(response.responseText);
                }
            });
        }

        if (btn == "D") {
            title = title == undefined ? "" : title;
            var DeleteConfirm = label("Common", "MessageCaption", "DeleteConfirm", "Are you sure want to delete") + " <span style='color:#f44336;font-weight:700'>" + title + "</span> ?";
            var DeleteWarning = label("Common", "MessageCaption", "DeleteWarning", "You will not be able to recover this record!");
            var btConfirm = label("Common", "ButtonCaption", "DeleteYes", "Yes, delete it!");
            var btCancel = label("Common", "ButtonCaption", "DeleteNo", "No, cancel pls!");

            swal({
                title: DeleteConfirm,
                text: DeleteWarning,
                type: "error",
                html: true,
                showCancelButton: true,
                confirmButtonColor: "#EF5350",
                confirmButtonText: btConfirm,
                cancelButtonText: btCancel,
                closeOnConfirm: false,
                closeOnCancel: false
            },
                function (isConfirm) {
                    if (isConfirm) {
                        var res = DeleteRecord(Id, ControllerName, 0);
                        swal.close();
                        if (res) {
                            switch (ControllerName) {
                                case "Language":
                                    FillGridList();
                                    FillLanguage("", "", "");
                                    break;
                            }

                            var NotificationTitle = label("Common", "MessageCaption", "SuccessTitle", "Success !");
                            var NotificationAlertmsg = label("Common", "MessageCaption", "DeleteSuccess", "Your record has been deleted.");
                            showNotification(NotificationTitle, NotificationAlertmsg, "success", 5000);
                        }
                        else {
                            var NotificationTitle = label("Common", "MessageCaption", "FailTitle", "Sorry !");
                            var NotificationAlertmsg = label("Common", "MessageCaption", "DeleteFail", "Your record has not been deleted.");
                            showNotification(NotificationTitle, NotificationAlertmsg, "danger", 5000);
                        }

                    }
                    else {
                        var btOK = label("Common", "ButtonCaption", "OK", "OK");
                        var btCancelled = label("Common", "ButtonCaption", "Cancelled", "Cancelled");
                        var DeleteNotMsg = label("Common", "MessageCaption", "DeleteNot", "Your record is not deleted. It`s safe !");
                        swal({
                            title: btCancelled,
                            text: DeleteNotMsg,
                            confirmButtonText: btOK,
                            confirmButtonColor: "#26A69A",
                            type: "info"
                        });
                    }
                });
        }
    }
}

function RowSelectedOrNot(Id, btn, ActionName, ControllerName, title, MenuId) {
    var i = 0;
    var id = "";
    $('input[type=checkbox][name^=chkGrd]').each(function () {
        if (this.checked) {
            i += 1;
            id += (id == "" ? "" : ",") + (btn == "D" ? "'" : "") + $(this).context.id + (btn == "D" ? "'" : "");
        }
    });

    if (i == 0 && btn == 'MD') {
        AlertDialog(label("Common", "MessageCaption", "SelectRow", "Please select row!"));
        return false;
    }
    if (btn == 'E' || btn == 'V') {
        var url = "";
        if (MenuId != undefined && MenuId != "")
            url = ITX3ResolveUrl(ControllerName + '/' + ActionName + "?id=" + Id + "&strAction=" + btn + "&menuid=" + MenuId);
        else
            url = ITX3ResolveUrl(ControllerName + '/' + ActionName + "?id=" + Id + "&strAction=" + btn);

        location.href = url;
    }
    else if (btn == 'MD') {
        var DeleteConfirm = label("Common", "MessageCaption", "MultiDeleteConfirm", "Are you sure want to delete selected records?");
        var DeleteWarning = label("Common", "MessageCaption", "DeleteWarning", "You will not be able to recover this record!");
        var btConfirm = label("Common", "ButtonCaption", "DeleteYes", "Yes, delete it!");
        var btCancel = label("Common", "ButtonCaption", "DeleteNo", "No, cancel pls!");

        swal({
            title: DeleteConfirm,
            text: DeleteWarning,
            type: "error",
            html: true,
            showCancelButton: true,
            confirmButtonColor: "#26A69A",
            confirmButtonText: btConfirm,
            cancelButtonText: btCancel,
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    var res = DeleteRecord(id, ActionName, ControllerName, 0);
                    if (res) {
                        FillGridList();
                        swal.close();
                        //ShowTinyNotification(5);
                    }
                    else {
                        swal.close();
                        //ShowTinyNotification(0);
                    }
                }
                else {
                    var btOK = label("Common", "ButtonCaption", "OK", "OK");
                    var btCancelled = label("Common", "ButtonCaption", "Cancelled", "Cancelled");
                    var DeleteNotMsg = label("Common", "MessageCaption", "DeleteNot", "Your record is not deleted. It`s safe !");
                    swal({
                        title: btCancelled,
                        text: DeleteNotMsg,
                        confirmButtonText: btOK,
                        confirmButtonColor: "#26A69A",
                        type: "info"
                    });
                }
            });
    }
    else {
        id = "'" + Id + "'";
        title = title == undefined ? "" : title;
        var DeleteConfirm = label("Common", "MessageCaption", "DeleteConfirm", "Are you sure want to delete") + " <span style='color:#f44336;font-weight:700'>" + title + "</span> ?";
        var DeleteWarning = label("Common", "MessageCaption", "DeleteWarning", "You will not be able to recover this record!");
        var btConfirm = label("Common", "ButtonCaption", "DeleteYes", "Yes, delete it!");
        var btCancel = label("Common", "ButtonCaption", "DeleteNo", "No, cancel pls!");

        swal({
            title: DeleteConfirm,
            text: DeleteWarning,
            type: "error",
            html: true,
            showCancelButton: true,
            confirmButtonColor: "#26A69A",
            confirmButtonText: btConfirm,
            cancelButtonText: btCancel,
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    var res = DeleteRecord(id, ActionName, ControllerName, 0);
                    if (res) {
                        FillGridList();
                        swal.close();
                        //ShowTinyNotification(3);
                    }
                    else {
                        swal.close();
                        //ShowTinyNotification(0);
                    }

                }
                else {
                    var btOK = label("Common", "ButtonCaption", "OK", "OK");
                    var btCancelled = label("Common", "ButtonCaption", "Cancelled", "Cancelled");
                    var DeleteNotMsg = label("Common", "MessageCaption", "DeleteNot", "Your record is not deleted. It`s safe !");
                    swal({
                        title: btCancelled,
                        text: DeleteNotMsg,
                        confirmButtonText: btOK,
                        confirmButtonColor: "#26A69A",
                        type: "info"
                    });
                }
            });
    }
}

function DeleteRecord(IDs, ActionName, ControllerName, IsPageRedirect) {
    var Result = false;
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: ITX3ResolveUrl(ControllerName + '/Delete' + ActionName),
        data: JSON.stringify({ Ids: IDs, isPageRedirect: IsPageRedirect }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.ResultData == "OK") {
                Result = true;
                if (!IsPageRedirect) {
                    ShowToast("", data.Message, "success");
                }
            }
        },
        error: function (xhr, ret, e) {
        }
    });

    return Result;
}