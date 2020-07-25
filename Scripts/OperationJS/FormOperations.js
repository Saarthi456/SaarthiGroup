
function CheckExistance(Value, ColumnName, TableName, WhereCondition) {
    var flag = false;
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: ITX3ResolveUrl('Common/CheckExistance'),
        data: JSON.stringify({ Value: Value, ColumnName: ColumnName, TableName: TableName, WhereCondition: WhereCondition }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data >= 1) {
                var msgWarning = label("Common", "MessageCaption", "AlreadyExist", "is already exist!");
                AlertDialog("<span style='color:#f44336;font-weight:700'>" + Value + "</span> " + msgWarning);
                flag = true;
            }
        },
        error: function (xhr, ret, e) {
            return false;
        }
    });

    return flag;
}

function CheckExistanceWithoutDialog(Value, ColumnName, TableName, WhereCondition) {
    var flag = false;
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: ITX3ResolveUrl('Common/CheckExistance'),
        data: JSON.stringify({ Value: Value, ColumnName: ColumnName, TableName: TableName, WhereCondition: WhereCondition }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data >= 1) {
                flag = true;
            }
        },
        error: function (xhr, ret, e) {
            return false;
        }
    });

    return flag;
}

function CheckMandatoryField(cntrlID, cntrlType) {
    if (cntrlType == 'textbox' || cntrlType == 'textarea') {
        if ($.trim($("#" + cntrlID).val()) == '') {
            $("#" + cntrlID).css('border', '1px solid #b94a48');
            return false;
        }
        else {
            $("#" + cntrlID).css('border', '');
            return true;
        }
    }
    else if (cntrlType == 'dropdown') {
        if ($.trim($("#" + cntrlID).val()) == '' || $.trim($("#" + cntrlID).val()) == 'Select' || $.trim($("#" + cntrlID).val()) == '-9999') {
            $("#" + cntrlID).siblings(".select2-container").css({ 'border': '1px solid #b94a48', 'border-radius': '3px' });
            return false;
        }
        else {
            $("#" + cntrlID).siblings(".select2-container").css('border', '');
            return true;
        }
    }
    else if (cntrlType == 'checkbox') {
        if ($("#" + cntrlID).prop("checked")) {
            $("#uniform-" + cntrlID).find("span").css({ 'border': '2px solid #607D8B' });
            return true;
        }
        else {
            $("#uniform-" + cntrlID).find("span").css({ 'border': '2px solid #b94a48' });
            return false;
        }
    }
    else if (cntrlType == 'checkboxlist') {
        if ($('input[name=' + cntrlID + ']:checked').length == 0) {
            $("#" + cntrlID + " div.checker span").css({ 'border': '2px solid red' });
            $('input[name="' + cntrlID + '"]').parent("div.choice span").css({ 'border': '2px solid red' });
            return false;
        }
        else {
            $("#" + cntrlID + " div.checker span").css({ 'border': '2px solid #607D8B' });
            $('input[name="' + cntrlID + '"]').parent("div.choice span").css({ 'border': '2px solid #607D8B' });
            return true;
        }
    }
    else if (cntrlType == 'radiobutton') {
        if ($('input[name="' + cntrlID + '"]:checked').length == 0) {
            $("#" + cntrlID + " div.choice span").css({ 'border': '2px solid red' });
            $('input[name="' + cntrlID + '"]').parent("div.choice span").css({ 'border': '2px solid red' });
            return false;
        }
        else {
            $("#" + cntrlID + " div.choice span").css({ 'border': '2px solid #607D8B' });
            $('input[name="' + cntrlID + '"]').parent("div.choice span").css({ 'border': '2px solid #607D8B' });
            return true;
        }
    }

    return true;
}

function CheckFileExtension(cntrlID, extension) {
    var extensionArr = extension.split(",");
    if ($.inArray($("#" + cntrlID).val().substring($("#" + cntrlID).val().lastIndexOf(".")), extensionArr) == -1) {
        $("#" + cntrlID).css('border', '1px solid red');
        return false;
    }
    else {
        $("#" + cntrlID).css('border', '');
        return true;
    }
}

function AlertDialog(title) {
    var btOK = label("Common", "ButtonCaption", "OK", "OK");
    swal({
        title: title,
        confirmButtonText: btOK,
        confirmButtonColor: "#26A69A",
        html: true,
    });
}

// Header : Success, Fail, Not Found
// Type :success, danger, Warning
function showNotification(header, message, type, closeDelay) {
    $('#alert_container').html('');
    var str = "";
    str += "<div class=\"alert alert-" + type + "\" role=\"alert\" style=\"padding:8px;float:left;width:50%;text-align:center;font-size:14px;\">";
    str += "<button type=\"button\" class=\"close\" style=\"margin-left:10px\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
    str += "<strong>" + header + "</strong> " + message + "!";
    str += "</div>";
    $('#alert_container').html(str);

    if (closeDelay) {
        window.setTimeout(function () {
            $(".alert").fadeTo(2000, 500).slideUp(500, function () {
                $(this).slideUp(500);
            });
        }, closeDelay);
    }
}

function ShowTinyNotification(result) {
    var Notitext = "", Notitype = "";
    if (result == 1) {
        Notitype = "success";
        Notitext = label("Common", "MessageCaption", "SucessInsert", "Record added successfully.");
        ShowToast("", Notitext, "success");
    }

    else if (result == 2) {
        Notitype = "success";
        Notitext = label("Common", "MessageCaption", "SucessUpdate", "Record updated successfully.");
        ShowToast("", Notitext, "success");
    }
    else if (result == 3) {
        Notitype = "success";
        Notitext = label("Common", "MessageCaption", "SucessDelete", "Record deleted successfully.");
        ShowToast("", Notitext, "success");
    }
    else if (result == 4) {
        Notitype = "success";
        Notitext = label("Common", "MessageCaption", "NotificationSuccess", "Notification sent successfully.");
        ShowToast("", Notitext, "success");
    }
    else if (result == 5) {
        Notitype = "success";
        Notitext = "All record deleted successfully.";
        ShowToast("", Notitext, "success");
    }
    else {
        Notitype = "error";
        Notitext = label("Common", "MessageCaption", "Transaction Fail", "Transaction has been failed, try again.");
        ShowToast("", Notitext, "error");
    }

    //noty({
    //    width: 200,
    //    text: Notitext,
    //    type: Notitype,
    //    dismissQueue: true,
    //    timeout: 5000,
    //    layout: "topRight"
    //});
    return false;
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
}

$.fn.onTypeFinished = function (func) {
    var T = undefined, S = 0, D = 1000;
    $(this).bind("keyup", onKeyPress);//.bind("focusout", onTimeOut);
    function onKeyPress() {
        clearTimeout(T);
        if (S == 0) { S = new Date().getTime(); D = 1000; T = setTimeout(onTimeOut, 1000); return; }
        var t = new Date().getTime();
        D = (D + (t - S)) / 2; S = t; T = setTimeout(onTimeOut, D * 2);
    }

    function onTimeOut() {
        func.apply(); S = 0;
    }
    return this;
};

jQuery.fn.ForceNumericOnly = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            if (e.shiftKey || e.ctrlKey || e.altKey) {
                return (e.preventDefault());
            }
            var key = e.charCode || e.keyCode || 0;
            if ($(this).val().indexOf('.') !== -1 && (key == 190 || key == 110))
                return (e.preventDefault());

            return (
                key == 8 ||
                key == 9 ||
                key == 46 ||
                (key >= 37 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });

}

//Allow users to enter numbers only
$(".numericOnly").bind('keypress', function (e) {
    var flag = false;
    var count = $(this).val().length;

    if (e.shiftKey || e.ctrlKey || e.altKey) {
        return (e.preventDefault());
    }
    var key = e.charCode || e.keyCode || 0;

    if ($(this).val().indexOf('.') !== -1 && (key == 190 || key == 110))
        return (e.preventDefault());

    if (key == 8 || key == 9 || (key >= 37 && key <= 40) || (key >= 48 && key <= 57))
        flag = true;

    return flag;
});

//Disable paste
$(".numericOnly").bind("paste", function (e) {
    e.preventDefault();
});

jQuery.fn.ForceDecimalOnly = function (value, precision) {
    return this.each(function () {
        $(this).keydown(function (event) {

            if (event.shiftKey) {
                event.preventDefault();
            }
            var key = event.charCode || event.keyCode || 0;


            if (
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105) || (key >= 35 && key <= 40) ||
                key == 8 || key == 9 || key == 37 ||
                key == 39 || key == 46 || key == 110 || key == 190) {
            } else {
                event.preventDefault();
            }

            if ($(this).val().indexOf('.') !== -1 && (key == 190 || key == 110))
                event.preventDefault();

            if ($(this).val().length > value + precision + 1) {
                if (key == 8 || key == 9 || key == 37 || key == 39 || key == 46) { }
                else { event.preventDefault(); }
            }
            if ((key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105)) {

                var split = ($(this).val().split("."));
                if (split[1] != null && split[1] != "") {
                }
                else {
                    if ($(this).val().length == value)
                        event.preventDefault();
                }
            }

        });

        $(this).blur(function () {
            if ($(this).val() != '') {
                $(this).val(parseFloat($(this).val()).toFixed(precision));
            }
        });
    });
}

jQuery.fn.CheckValidDate = function (ControlId, format) {
    return this.each(function () {
        $(this).focusout(function () {
            var isvalid = true;
            if ($(this).val() != '') {
                if (format == "dd/MM/yyyy") {
                    var date = $(this).val().split("/");
                    if (date.length == 3) {
                        var $Day = date[0];
                        var $Month = date[1];
                        var $Year = date[2];
                        if ($Month.length == "2") { $Month = $Month.replace("0", ""); }

                        if (parseInt($Month) > 12) { isvalid = false; }
                        if (parseInt($Year.length) != 4) { isvalid = false; }
                        if (parseInt($Day.length) > 2) { isvalid = false; }
                        else {
                            if ($Month == "1" || $Month == "3" || $Month == "5" || $Month == "7" || $Month == "8" || $Month == "10" || $Month == "12") {
                                if (parseInt($Day) > 31) { isvalid = false; }
                            }
                            else if ($Month == "4" || $Month == "6" || $Month == "9" || $Month == "11") {
                                if (parseInt($Day) > 30) { isvalid = false; }
                            }
                            else if ($Month == "2") {
                                if ((parseInt($Year) % 4 == 0 && parseInt($Year) % 100 != 00) || parseInt($Year) % 400 == 0) {
                                    if (parseInt($Day) > 29) { isvalid = false; }
                                }
                                else {
                                    if (parseInt($Day) > 28) { isvalid = false; }
                                }
                            }
                        }
                    }
                    else
                        isvalid = false;
                }

            }
            if (isvalid == false) {
                $("#dialog-RequiredLayout").dialog({
                    title: Title,
                    resizable: false,
                    height: 170,
                    modal: true,
                    buttons: [{
                        text: GetLable('lblOK', 'common', 'OK'),
                        click: function () {
                            $(this).dialog("close");
                            $(ControlId).focus();
                        }
                    }]
                });
                $("#lblRequiredLayout").text("Invalid Date");
                return false;
            }
            return true;

        });
    });

}

$(".pertext").change(function () {

    if (parseFloat($(this).val()) > 100) {
        $(this).val("");
        AlertDialog("", "Percentage can't add more then 100.");
    }

});

jQuery.fn.CheckNumberRange = function (FromValue, ToValue, Msg) {
    return this.each(function () {
        $(this).focusout(function () {
            if (parseFloat($.trim($(this).val())) < FromValue || parseFloat($.trim($(this).val())) > ToValue) {
                var ControlId = this.id;

                swal({
                    title: Msg,
                    confirmButtonText: label("Common", "ButtonCaption", "OK", "OK"),
                    confirmButtonColor: "#26A69A",
                    html: true,
                }, function (isConfirm) {
                    $("#" + ControlId).focus();
                });

                return false;
            }
        });
    });
}


jQuery.fn.escape = function (callback) {
    return this.each(function () {
        $(document).on("keydown", this, function (e) {
            var keycode = ((typeof e.keyCode != 'undefined' && e.keyCode) ? e.keyCode : e.which);
            if (keycode === 27) {
                callback.call(this, e);
            };
        });
    });
};

//To allow only alphabetic characters
$('.alphaonly').bind('keyup blur', function () {
    var node = $(this);
    node.val(node.val().replace(/[^a-zA-Z]/g, ''));
});

$('.alphanumericonly').bind('keyup blur', function () {
    var node = $(this);
    node.val(node.val().replace(/[^a-zA-Z0-9]/g, ''));
});

function JSNumberFormat(Amount) {
    if (isNaN(Amount)) { return ""; }
    return parseFloat(Amount).toFixed(GetNoOfDecimal()).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function JSNumberFormatWithDecimalParam(Amount, DecimalPlaces) {
    if (isNaN(Amount)) { return ""; }
    return parseFloat(parseFloat(Amount).toFixed(DecimalPlaces)).toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function GetJSONListfromString(str) {
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&amp;nbsp;/g, '&nbsp;');
    str = str.replace(/&#39;/g, '');
    str = str.replace(/\\n/g, ' ');
    str = str.replace(/\\t/g, ' ');
    str = str.replace(/\\/g, '\\\\');

    str = JSON.stringify(str);
    str = str.replace(/\\n/g, '\\\\n');
    str = str.replace(/\\r/g, '\\\\r');
    str = str.replace(/\\t/g, '\\\\t');
    str = $.parseJSON($.trim(str));
    var JsonList = $.parseJSON($.trim(str));
    return JsonList;
}

function GetJSONListfromModelstring(str) {
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&amp;nbsp;/g, '&nbsp;');
    return str;
}

function GetHtmlfromModelstring(str) {
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/&nbsp;/g, '&amp;nbsp;');
    return str;
}


function isContainReservedChar(inputString) {
    var isContain = false;
    var specialChars = ";\/^?:@=&*<>|";
    for (i = 0; i < specialChars.length; i++) {
        var matchChar = specialChars[i];
        if (inputString.indexOf(specialChars[i]) > -1) {
            isContain = true;
        }
    }
    return isContain;
}

function RedirectSessionOut(returnpath) {
    var btOK = label("Common", "ButtonCaption", "OK", "OK");
    var btnauth = label("Common", "MessageCaption", "SessionExpire", "Session Expire");
    var AlertMsg = label("Common", "MessageCaption", "SessionExpireMessage", "Your session is expired. so please login again!.");
    swal({
        title: btnauth,
        text: AlertMsg,
        type: "info",
        timer: 5000,
        confirmButtonText: btOK,
        confirmButtonColor: "#26A69A"
    }, function () {
        debugger;
        if (returnpath != undefined && returnpath != "" && returnpath != null)
            window.location.href = ITX3ResolveUrl('Login.aspx?ReturnUrl=' + returnpath);
        else
            window.location.href = ITX3ResolveUrl('~/Login.aspx');
    });
}

function SessionOut(response, returnpath) {
    if (response.status == "401") {
        var btOK = label("Common", "ButtonCaption", "OK", "OK");
        var btnauth = label("Common", "MessageCaption", "SessionExpire", "Session Expire");
        var AlertMsg = label("Common", "MessageCaption", "SessionExpireMessage", "Your session is expired. so please login again!.");
        swal({
            title: btnauth,
            text: AlertMsg,
            type: "info",
            timer: 5000,
            confirmButtonText: btOK,
            confirmButtonColor: "#26A69A"
        }, function () {
            debugger;
            if (returnpath != undefined && returnpath != "" && returnpath != null)
                window.location.href = ITX3ResolveUrl('Login.aspx?ReturnUrl=' + returnpath);
            else
                window.location.href = ITX3ResolveUrl('~/Login.aspx');
        });
    }
    else {
        var btnOK = label("Common", "ButtonCaption", "OK", "OK");
        var btnTransFail = label("Common", "MessageCaption", "TransactionFailTitle", "Transaction Fail!");
        var btnAlert = label("Common", "MessageCaption", "Transaction Fail", "Your transaction not completed. please try again!.");
        swal({
            title: btnTransFail,
            text: btnAlert,
            type: "info",
            timer: 5000,
            confirmButtonText: btnOK,
            confirmButtonColor: "#26A69A"
        }, function () {
            location.reload();
        });
    }
    
}

function AjaxCallFailure() {
    var btOK = label("Common", "ButtonCaption", "OK", "OK");
    var btnauth = label("Common", "MessageCaption", "TransactionFailTitle", "Transaction Fail!");
    var AlertMsg = label("Common", "MessageCaption", "Transaction Fail", "Your transaction not completed. please try again!.");
    swal({
        title: btnauth,
        text: AlertMsg,
        type: "info",
        timer: 5000,
        confirmButtonText: btOK,
        confirmButtonColor: "#26A69A"
    }, function () {
        location.reload();
    });
}

function ShowToast(Title, Msg, type) {
    toastr.options = {
        timeOut: 5000,
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "extendedTimeOut": "2500",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "tapToDismiss": false

    }
    switch (type) {
        case 'success':
            toastr.success(Msg, Title);
            break;
        case 'info':
            toastr.info(Msg, Title);
            break;

        case 'warning':
            toastr.warning(Msg, Title);
            break;

        case 'error':
            toastr.error(Msg, Title);
            break;

        case 'waits':
            toastr.info(Msg, Title);
            break;
        default:
    }
}

function setDropdwonText(id, TextValue) {
    if (TextValue != undefined || TextValue != "" || TextValue != null) {
        $("#" + id).val(TextValue).trigger('change');
    }
    else {
        $("#" + id).val("").trigger('change');
    }
}

function setDropdwonValue(id,value) {
    if (value != 0) {
        $("#" + id).val(value).trigger('change');
    }
    else {
        $("#" + id).val("").trigger('change');
    }
}
