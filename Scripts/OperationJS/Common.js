var isMultiDrop = false;
var isPageSizeChange = false;
var DocPageSize = 10;
var DocPageCurSize = 10;

function FillDropdownList(ColumnValue, ColumnText, TableName, WhereCondition, SetCodeControlId, OrderByCondition) {

    var strWhere = "";
    OrderByCondition = OrderByCondition == undefined ? "" : OrderByCondition;

    var model = {
        ColumnValue: ColumnValue,
        ColumnText: ColumnText,
        TableName: TableName,
        WhereCondition: WhereCondition,
        OrderByCondition: OrderByCondition
    }
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: ITX3ResolveUrl('Common/GetCommonList'),
        data: JSON.stringify(model),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#" + SetCodeControlId).html('');
            var _tempstr = "";
            _tempstr = "<option value=''>" + label("Common", "LabelCaption", "Select", "Select") + "</option>";
            if (data.Result == 1) {
                var lstobj = $.parseJSON(data.Records);
                for (var i = 0; i < lstobj.length; i++) {
                    _tempstr += "<option value=" + lstobj[i].Id + ">" + lstobj[i].Name + "</option>";
                }
            }
            $("#" + SetCodeControlId).append(_tempstr);
        },
        error: function (xhr, ajaxOptins, throwError) {
            alert("Error occured");
        }
    });
}

function FillDropdownListFromSP(SP, Parameters, SetCodeControlId) {
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: ITX3ResolveUrl('Common/GetCommonListFromSP'),
        data: JSON.stringify({ 'SP': SP, 'Parameters': Parameters }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#" + SetCodeControlId).html('');
            var _tempstr = "";
            _tempstr = "<option value=''>" + label("Common", "LabelCaption", "Select", "Select") + "</option>";
            if (data.Result == 1) {
                var lstobj = $.parseJSON(data.Records);
                for (var i = 0; i < lstobj.length; i++) {
                    _tempstr += "<option value=" + lstobj[i].Id + ">" + lstobj[i].Name + "</option>";
                }
            }
            $("#" + SetCodeControlId).append(_tempstr);
        },
        error: function (xhr, ajaxOptins, throwError) {
            alert("Error occured");
        }
    });
}

function FillDropdownListFromSPJson(SP, Parameters, SetCodeControlId, isMultiDrop, SQL = "", TableName = "", DataValue = "", DisplayValue = "", WhereClause = "", OrderBy = "") {
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: ITX3ResolveUrl('Common/GetCommonListFromSP'),
        data: JSON.stringify({ 'SP': SP, 'Parameters': Parameters, 'SQL': SQL, 'TableName': TableName, 'DataValue': DataValue, 'DisplayValue': DisplayValue, 'WhereClause': WhereClause, 'OrderBy': OrderBy }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var tmpData = data.Records;
            $("#" + SetCodeControlId).html('');
            if (data.Result == 1) {
                if (!isMultiDrop) {
                    $("#" + SetCodeControlId).empty();
                    $("#" + SetCodeControlId).empty().append('<option  value="">' + label("Common", "LabelCaption", "Select", "Select") + '</option>');
                    //$("#" + SetCodeControlId).empty().append('<option  value="">Select</option>');
                }

                $("#" + SetCodeControlId).select2({
                    data: $.parseJSON(data.Records)
                });
            }
            else {
                if (!isMultiDrop) {
                    $("#" + SetCodeControlId).empty();
                    $("#" + SetCodeControlId).empty().append('<option  value="">' + label("Common", "LabelCaption", "Select", "Select") + '</option>');
                    //$("#" + SetCodeControlId).empty().append('<option  value="">Select</option>');
                }
            }
        },
        error: function (xhr, ajaxOptins, throwError) {
            alert("Error occured");
        }
    });
}

function FillDropdownListFromSPJsonForCombo(SP, Parameters, SetCodeControlId, selectRecordValue, fieldName) {
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: ITX3ResolveUrl('Common/GetCommonListFromSP'),
        data: JSON.stringify({ 'SP': SP, 'Parameters': Parameters }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var tmpData = data.Records;
            $("#" + SetCodeControlId).html('');
            if (data.Result == 1) {
                if (!isMultiDrop) {
                    $("#" + SetCodeControlId).empty();
                    $("#" + SetCodeControlId).empty().append('<option  value="">' + label("Common", "LabelCaption", "Select", "Select") + '</option>');
                    //$("#" + SetCodeControlId).empty().append('<option  value="">Select</option>');
                }

                $("#" + SetCodeControlId).select2({
                    data: $.parseJSON(data.Records)
                });

                $('#' + SetCodeControlId).val(selectRecordValue).trigger('change');
                comboCancelClick(fieldName);

            }
            else {
                if (!isMultiDrop) {
                    $("#" + SetCodeControlId).empty();
                    $("#" + SetCodeControlId).empty().append('<option  value="">' + label("Common", "LabelCaption", "Select", "Select") + '</option>');
                    //$("#" + SetCodeControlId).empty().append('<option  value="">Select</option>');
                }
            }
        },
        error: function (xhr, ajaxOptins, throwError) {
            alert("Error occured");
        }
    });
}

function FillMultiDropdownGroupList(SP, Parameters, SetCodeControlId) {
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: ITX3ResolveUrl('Common/GetMultiDropdownGroupList'),
        data: JSON.stringify({ 'SP': SP, 'Parameters': Parameters }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.Result == 1) {
                $("#" + SetCodeControlId).html('');

                if (data.Records != null && data.Records != '') {
                    $("#" + SetCodeControlId).select2({
                        data: data.Records
                    });
                }
            }
            else {
                $("#" + SetCodeControlId).html('');
            }
        },
        error: function (xhr, ajaxOptins, throwError) {
            alert("Error occured");
        }
    });
}

function AutoComplate(Area, ControlName, ActionName, GetValueFromControlId, SetCodeControlId, SetTextControlId) {
    $('#' + GetValueFromControlId).attr("fromselect", "");
    $('#' + GetValueFromControlId).attr("lasttext", "");
    $('#' + GetValueFromControlId).autocomplete({
        source: function (request, response) {
            var autocompleteUrl = '';
            if (Area != '' && Area != undefined)
                autocompleteUrl = ITX3ResolveUrl(Area + "/" + ControlName + "/" + ActionName);
            else
                autocompleteUrl = ITX3ResolveUrl(ControlName + "/" + ActionName);

            $.ajax({
                url: autocompleteUrl,
                data: "{ 'prefix': '" + request.term + "'}",
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.Name,
                            value: item.Name,
                            idValue: item.Id
                        };
                    }));
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    console.log('some error occured', textStatus, errorThrown);
                }
            });
        },
        minLength: 1,
        select: function (event, ui) {
            $('#' + SetCodeControlId).val(ui.item.idValue).trigger('change');
            $('#' + SetTextControlId).val(ui.item.label);
            $('#' + GetValueFromControlId).attr("fromselect", "1");
            $('#' + GetValueFromControlId).attr("lasttext", ui.item.label);
            return false;
        }
    });
}

function label(Module, Form, Resource, Default) {
    if ($.grep(lstResource, function (x) 
    { return x.Module == Module && x.Form == Form && x.ResourceName == Resource; })[0] != undefined) {
        var txt = document.createElement("textarea");
        txt.innerHTML = $.grep(lstResource, function (x) { return x.Module == Module && x.Form == Form && x.ResourceName == Resource; })[0].Value
        return txt.value;
    }
    else {
        var LanguageId = getCookie("LanguageId");
        $.ajax({
            cache: false,
            type: "POST",
            async: false,
            url: ITX3ResolveUrl('Common/InsertSingleResource'),
            data: JSON.stringify({ strModule: Module, strForm: Form, strResource: Resource, strDefault: Default }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var Model = {
                    Module: Module,
                    Form: Form,
                    ResourceName: Resource,
                    Value: Default,
                    LanguageId: 1
                };

                lstResource.push(Model);
            },
            error: function (xhr, ret, e) {

            }
        });

        return ($.grep(lstResource, function (x) { return x.Module == Module && x.Form == Form && x.ResourceName == Resource; })[0] == undefined ?
            (LanguageId == 1 ? Default : "") :
            $.grep(lstResource, function (x) { return x.Module == Module && x.Form == Form && x.ResourceName == Resource; })[0].Value);
    }
}

function JtableFillLayout(Page) {
    var headerCells = $('#jtbl thead th.jtable-column-header');
    LayoutResize(headerCells);
}

function showHideFilter(ColName, Visibility) {
    if ($("#th" + ColName).length) {
        if (Visibility == "hidden")
            $("#th" + ColName).hide();
        else
            $("#th" + ColName).show();
    }
    if ($("#Filt" + ColName).length) {
        if (Visibility == "hidden")
            $("#Filt" + ColName).hide();
        else
            $("#Filt" + ColName).show();
    }
}

function GetDocumentPagignation() {
    var result = "";
    $.ajax({
        type: "POST",
        url: ITX3ResolveUrl('DocCenterMVC/Documents/GetDocumentPaging'),
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            result = data;
        },
        failure: function (response) {
            alert(response.responseText);
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
    return result;
}

function getCookie(name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

function FillLanguage(LanguageId, LanguageCode, LanguageName) {
    $("#ddlLanguage").html('');

    var model = {
        Code: LanguageId,
        CultureCode: LanguageCode,
        Name: LanguageName
    }

    $.ajax({
        url: ITX3ResolveUrl("Language/FillLanguage"),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(model),
        dataType: "json",
        success: function (data) {
            var strHTML = data.Records;
            if (LanguageId == "" || LanguageId == '')
                $("#ddlLanguage").html(strHTML);
            else
                location.reload();
        },
        failure: function (response) {
            alert(response.responseText);
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

function ErorrResponse(result, ValMessage) {
    if (result.status == 401) {
        RedirectSessionOut();
    }
    else
        alert(ValMessage + '<br>' + result.responseText);
}

function ChangeClient(CurrentId, SelectedId) {
    $.ajax({
        type: "POST",
        async: false,
        url: ITX3ResolveUrl('Common/ChangeClient'),
        data: JSON.stringify({ 'ClientId': SelectedId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data == "OK") {
                location.reload();
            }
            else {
                $("#ddlClient").val(CurrentId).trigger('change');
            }
        },
        failure: function (response) {
            AjaxCallFailure();
        },
        error: function (response) {
            SessionOut(response, CurrentPagePath);
        }
    });
}

function OpenModuleMenu(mainMenuName, subMenuName, subOfSubMenuName, isSubMenuOfSubMenu) {
    $("#" + mainMenuName).addClass('active');
    if (!isSubMenuOfSubMenu) {
        $("#" + mainMenuName).find('ul:first').css('display', 'block');
        $("#" + mainMenuName + "_" + subMenuName).addClass('active');
    } else {
        $("#" + mainMenuName).find('ul:first').css('display', 'block');
        $("#" + mainMenuName + "_" + subMenuName).addClass('active');
        $("#" + mainMenuName + "_" + subMenuName).css('display', 'block');
        $("#" + mainMenuName + "_" + subMenuName + "_" + subOfSubMenuName).addClass('active');
        $("#" + mainMenuName + "_" + subMenuName).find('ul:first').css('display', 'block');
    }
}

//function InitDatePicker() {
var date = new Date();
var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
$('.GNCDatepicker').datepicker({
    format: 'dd/mm/yyyy',
    todayBtn: "linked",
    changeMonth: true,
    changeYear: true,
    yearRange: '1900:2100',
    autoclose: true,
    todayHighlight: true,
});
//}

$("#ClosePrint").click(function () {
    $('#exampleModal').modal('toggle');
});

function ClockPicker() {
    $('.clockpicker').clockpicker({
    });
}
