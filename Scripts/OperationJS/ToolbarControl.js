var AutoID;
var strAction;
var PrintID;
var MenuId;
var MenuName;
var ListSQL;
var ScreenTitle;
var ScreenMode;
var SearchColumn;
var Sortcolumn;
var FormObject;
var AddEditObject;
var viewRowCount;
var BindOnLoad;
var isAutoPrint;
var isAutoAdd;
var canOpen;
var canAdd;
var canEdit;
var canDelete;
var canSave;
var canPrint;
var canEmail;
var canView;


function fillUserRightsSetting() {
    MenuId = $("#MenuId").val();
    MenuName = $("#MenuName").val();
    ListSQL = $("#ListSQL").val();
    ScreenTitle = $("#ScreenTitle").val();
    ScreenMode = $("#ScreenMode").val();
    SearchColumn = $("#SearchColumn").val();
    Sortcolumn = $("#Sortcolumn").val();
    viewRowCount = $("#viewRowCount").val();
    BindOnLoad = $("#BindOnLoad").val();
    isAutoPrint = $("#isAutoPrint").val();
    isAutoAdd = $("#isAutoAdd").val();
    FormObject = $("#FormObject").val();
    AddEditObject = $("#AddEditObject").val();
    canOpen = $("#canOpen").val();
    canAdd = $("#canAdd").val();

    if (canAdd.toUpperCase() == "TRUE" ? true : false) {
        $('#btnToolbarAdd').attr("disabled", false);
        shortcut.add("Alt+A", function () {
            $('#btnToolbarAdd').click();
        });
    }
    else {
        $('#btnToolbarAdd').attr("disabled", true);
    }

    canEdit = $("#canEdit").val();
    if (canEdit.toUpperCase() == "TRUE" ? true : false) {
        $('#btnToolbarEdit').attr("disabled", false);
        shortcut.add("Alt+E", function () {
            $('#btnToolbarEdit').click();
        });
    }
    else {
        $('#btnToolbarEdit').attr("disabled", true);
    }

    canDelete = $("#canDelete").val();
    if (canDelete.toUpperCase() == "TRUE" ? true : false) {
        $('#btnToolbarDelete').attr("disabled", false);
        shortcut.add("Alt+D", function () {
            $('#btnToolbarDelete').click();
        });
    }
    else {
        $('#btnToolbarDelete').attr("disabled", true);
    }

    canSave = $("#canSave").val();
    if (canSave.toUpperCase() == "TRUE" ? true : false) {
        $('#btnToolbarSave').attr("disabled", false);
        shortcut.add("Alt+S", function () {
            $('#btnToolbarSave').click();
        });
    }
    else {
        $('#btnToolbarSave').attr("disabled", true);
    }

    canPrint = $("#canPrint").val();
    if (canPrint.toUpperCase() == "TRUE" ? true : false) {
        $('#btnToolbarPrint').attr("disabled", false);
        shortcut.add("Alt+P", function () {
            $('#btnToolbarPrint').click();
        });
    }
    else {
        $('#btnToolbarPrint').attr("disabled", true);
    }

    canEmail = $("#canEmail").val();
    if (canEmail.toUpperCase() == "TRUE" ? true : false) {
        $('#btnToolbarEmail').attr("disabled", false);
    }
    else {
        $('#btnToolbarEmail').attr("disabled", true);
    }

    canView = $("#canView").val();

    shortcut.add("Alt+N", function () {
        $('#btnToolbarNext').click();
    });

    shortcut.add("Alt+V", function () {
        $('#btnToolbarPrev').click();
    });

    shortcut.add("Alt+C", function () {
        $('#btnToolbarCancel').click();
    });

}

function fillToolbarControl() {
    if (AutoID != undefined && AutoID != '' && AutoID != '0' && strAction == 'V') {
        $("input").attr('disabled', true);
        $("textarea").attr('disabled', true);
        $(".control").attr('disabled', true);
        $('.ddlGlobal').attr('disabled', true);
        $('#btnToolbarSave').attr("disabled", true);
        shortcut.remove("Alt+S");

        shortcut.add("Alt+N", function () {
            $('#btnToolbarNext').click();
        });

        shortcut.add("Alt+V", function () {
            $('#btnToolbarPrev').click();
        });

        shortcut.add("Alt+C", function () {
            $('#btnToolbarCancel').click();
        });
    }
    else if (strAction == 'E') {
        $('#btnToolbarAdd').attr("disabled", true);
        shortcut.remove("Alt+A");
        $('#btnToolbarDelete').attr("disabled", true);
        shortcut.remove("Alt+D");
        $('#btnToolbarEdit').attr("disabled", true);
        shortcut.remove("Alt+E");
        $('#btnToolbarPrint').attr("disabled", true);
        shortcut.remove("Alt+P");
        $('#btnToolbarEmail').attr("disabled", true);
        shortcut.remove("Alt+E");
        $('#btnToolbarSearch').attr("disabled", true);
        $('#btnToolbarNext').attr("disabled", true);
        shortcut.remove("Alt+N");
        $('#btnToolbarPrev').attr("disabled", true);
        shortcut.remove("Alt+P");
    }
    else if (strAction == 'C') {
        $('#btnToolbarAdd').attr("disabled", true);
        shortcut.remove("Alt+A");
        $('#btnToolbarEdit').attr("disabled", true);
        shortcut.remove("Alt+E");
        $('#btnToolbarDelete').attr("disabled", true);
        shortcut.remove("Alt+D");
        $('#btnToolbarPrint').attr("disabled", true);
        shortcut.remove("Alt+P");
        $('#btnToolbarEmail').attr("disabled", true);
        shortcut.remove("Alt+E");
        $('#btnToolbarSearch').attr("disabled", true);
        $('#btnToolbarNext').attr("disabled", true);
        shortcut.remove("Alt+N");
        $('#btnToolbarPrev').attr("disabled", true);
        shortcut.remove("Alt+P");
        $('#CourseDuration').val('')
    }
}

$('#btnToolbarAdd').click(function () {
    var url = ITX3ResolveUrl('~/' + FormObject + '/' + AddEditObject + '?menuid=' + MenuId + '&strAction=C');
    location.href = url;
});

$('#btnToolbarEdit').click(function () {
    var url = ITX3ResolveUrl('~/' + FormObject + '/' + AddEditObject + '?menuid=' + MenuId + '&strAction=E&id=' + AutoID);
    location.href = url;
});

$('#btnToolbarPrint').click(function () {
    RunReport(AutoID);
});

function RunReport(AutoID) {
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: ITX3ResolveUrl('GridList/LoadReport'),
        data: JSON.stringify({ 'Id': AutoID }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.status === "success") {
                window.open(data.url, '_blank');
                return false;
            }
        }
    });
}

$('#btnToolbarDelete').click(function () {
    var title = "";
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
    }, function (isConfirm) {
        if (isConfirm) {
            DeleteRecord(AutoID, '' + AddEditObject + '', '' + FormObject + '', 1);
            var url = ITX3ResolveUrl('~/GridList/Index?id=' + MenuId);
            location.href = url;
        } else {
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

});

$('#btnToolbarNext').click(function () {
    NextPrevRecord(1, 0, AutoID);
});

$('#btnToolbarPrev').click(function () {
    NextPrevRecord(0, 1, AutoID);
});

function NextPrevRecord(isNextClick, isPrevClick, CurrentID) {
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: ITX3ResolveUrl('Masters/GetNextPrevRecord'),
        data: JSON.stringify({
            'Id': CurrentID,
            'SPName': 'CourseMstSP'
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (JSON.parse(data.Records).Table.length > 0) {
                var url;
                if (isNextClick) {
                    if (JSON.parse(data.Records).Table[0].NextValue != null) {
                        url = ITX3ResolveUrl('~/' + FormObject + '/' + AddEditObject + '?menuid=' + MenuId + '&strAction=V&id=' + JSON.parse(data.Records).Table[0].NextValue);
                        location.href = url;
                    }
                    else {
                        $('#btnToolbarNext').attr("disabled", true);
                        AlertDialog("You are on Last Record.");
                    }
                }
                else {
                    if (JSON.parse(data.Records).Table[0].PreviousValue != null) {
                        url = ITX3ResolveUrl('~/' + FormObject + '/' + AddEditObject + '?menuid=' + MenuId + '&strAction=V&id=' + JSON.parse(data.Records).Table[0].PreviousValue);
                        location.href = url;
                    }
                    else {
                        $('#btnToolbarPrev').attr("disabled", true);
                        AlertDialog("You are on First Record.");
                    }
                }
            }
        },
        error: function (xhr, ajaxOptins, throwError) {
            alert("Error occured");
        }
    });
}

$("#NoPrint").click(function () {
    $('#isAutoPrint').val('Flase');
    $('#exampleModal').modal('toggle');
    $('form').submit();
});

$("#YesPrint").click(function () {
    $('#isAutoPrint').val('True');
    $('#exampleModal').modal('toggle');
    $('form').submit();
});

$("#btnClosepopupProof").click(function () {
    $('#popupProof').modal('toggle');
});

//$('#btnToolbarSave').click(function () {
//    if ($('#AddEditFrom').valid()) {
//        if (isAutoPrint == "True") {
//            $('#exampleModal').modal({ backdrop: 'static', keyboard: false });
//        } else {
//            $('form').submit();
//        }
//    }
//});

$('#btnToolbarCancel').click(function () {
    if (typeof DeleteDocumentFolderOnCancel != 'undefined' && $.isFunction(DeleteDocumentFolderOnCancel)) {
        DeleteDocumentFolderOnCancel();
    }
    
    var url = ITX3ResolveUrl('~/GridList/Index/' + MenuId);
    location.href = url;
});

function FixToolbarShortKeys() {
    shortcut.add("Alt+C", function () {
        $('#btnToolbarCancel').click();
    });
}
