
var isBindFromGridButton = false;
var BaseURL = '';
var USERID;
var UploadedDocumentPath;
var MaxImageSize;
var ProjectImagePath;
var MaxLogoSize;
var oldFileName;
var oldLogo;

function fillUserRightsSetting() {
    MenuId = $("#MenuId").val();
    MenuName = $("#MenuName").val();
    ListSQL = $("#ListSQL").val();
    ScreenTitle = $("#ScreenTitle").val();
    ScreenMode = $("#ScreenMode").val();
    SearchColumn = $("#SearchColumn").val();
    Sortcolumn = $("#Sortcolumn").val();
    FormObject = $("#FormObject").val();
    AddEditObject = $("#AddEditObject").val();
    viewRowCount = $("#viewRowCount").val();
    BindOnLoad = $("#BindOnLoad").val();
    isAutoPrint = $("#isAutoPrint").val();
    isAutoAdd = $("#isAutoAdd").val();
    canOpen = $("#canOpen").val();
    canAdd = $("#canAdd").val();
    canEdit = $("#canEdit").val();
    canDelete = $("#canDelete").val();
    canSave = $("#canSave").val();
    canPrint = $("#canPrint").val();
    canEmail = $("#canEmail").val();
    canView = $("#canView").val();

    if (canAdd.toUpperCase() == "TRUE" ? true : false) {
        $('#btnGridAdd').attr("disabled", false);
        shortcut.add("Alt+A", function () {
            $('#btnGridAdd').trigger('click');
        });
    }
    else {
        $('#btnGridAdd').attr("disabled", true);
    }

    //canEdit = $("#canEdit").val();
    //if (canEdit.toUpperCase() == "TRUE" ? true : false) {
    //    $('#btnToolbarEdit').attr("disabled", false);
    //}
    //else {
    //    $('#btnToolbarEdit').attr("disabled", true);
    //}

    canDelete = $("#canDelete").val();
    if (canDelete.toUpperCase() == "TRUE" ? true : false) {
        $('#btnGridRemove').attr("disabled", false);
        shortcut.add("Alt+D", function () {
            $('#btnGridRemove').trigger('click');
        });
    }
    else {
        $('#btnGridRemove').attr("disabled", true);
    }

    canPrint = $("#canPrint").val();
    if (canPrint.toUpperCase() == "TRUE" ? true : false) {
        $('#btnGridPrint').attr("disabled", false);
        shortcut.add("Alt+P", function () {
            $('#btnGridPrint').trigger('click');
        });
    }
    else {
        $('#btnGridPrint').attr("disabled", true);
    }

    canEmail = $("#canEmail").val();
    if (canEmail.toUpperCase() == "TRUE" ? true : false) {
        $('#btnGridMail').attr("disabled", false);
    }
    else {
        $('#btnGridMail').attr("disabled", true);
    }

}

function FillGridList() {
    var isBindOnLoad = false;
    if (isBindFromGridButton)
        isBindOnLoad = true;
    else
        isBindOnLoad = BindOnLoad.toUpperCase() == "TRUE" ? true : false;

    var printIcon = function (cell, formatterParams) {
        var gridButtons = "<span style=\"font-weight:bold; font-size:14px\"><i class='icon-pencil6 text-blue-800' onclick=\"return RowSelectedOrNot(" + cell.getData()["AutoID"] + ",'E', '" + AddEditObject+"','" + FormObject+"',''," + MenuId + ");\"></i></span>";
        gridButtons += "<span style=\"font-weight:bold; font-size:14px\" class='ml-10'><i class='icon-cross2 text-danger-800' onclick=\"return RowSelectedOrNot(" + cell.getData()["AutoID"] + ",'D', '" + AddEditObject+"','" + FormObject+"',''," + MenuId + ");\"></i></span>";
        return gridButtons;
    };
    var checkboxIcon = function (cell, formatterParams) {
        return "<input type=\"checkbox\" name=\"chkGrd\" id=" + cell.getData()["AutoID"] + " onclick=\"DeselectMain();\">";
    };

    GridFields = [];
    if (GridFields.length == 0) {
        GridFields.push({ title: label(ModuleName,MenuName, "No.", "No."), field: TabulatorCols[0]["field"], align: "center", width: 60, headerSort: false });
        GridFields.push({ title: "<input id='chkSelectDeselectAll' type='checkbox'/>", formatter: checkboxIcon, width: 40, align: "center", headerSort: false });
        $.each(TabulatorCols, function (index, value) {
            if (value.field != "RowNo") {
                var TitleVal = label(ModuleName,MenuName,value.field, value.field);
                GridFields.push(
                    {
                        title: TitleVal,
                        field: value.field,
                        headerFilter: "input",
                        headerFilterPlaceholder: ''
                    });
            }
        });
        GridFields.push({ formatter: printIcon, width: 80, align: "center", headerSort: false });
    }

    var URL = "";
    URL = ITX3ResolveUrl('GridList/BindGrid?ObjectType=' + ListSQL + '&SortBy=' + Sortcolumn + '&BindOnLoad=' + isBindOnLoad);

    tblTabulator = new Tabulator("#tblGrid",
        {
            height: 725,
            layout: "fitColumns",
            selectable: 1,
            pagination: "remote",
            paginationSize: 15,
            ajaxSorting: true,
            ajaxFiltering: true,
            placeholder: "No records found!",
            ajaxConfig: "POST",
            ajaxContentType: "json",
            paginationSizeSelector: [5, 10, 15, 20, 25, 50, 100, 500, 1000, 1500, 2000, 2500, 3000],
            ajaxURL: URL,
            paginationDataSent: {
                "page": "pageNo"
            },
            rowDblClick: function (e, row) {
                var RowDataId = row.getData().AutoID;
                RowSelectedOrNot(RowDataId, 'V', '' + AddEditObject + '', '' + FormObject+'', '', MenuId);
            },
            columns: GridFields
        });

    $("#chkSelectDeselectAll").on("change", function () {
        $('.tabulator-tableHolder input[type=checkbox]').prop('checked', this.checked);
    });

    if (isMultiSearch) {
        $(".tabulator-col").css('height', 80);
        $(".tabulator-header-filter").show();
    }
    else {
        $(".tabulator-col").css('height', 45);
        $(".tabulator-header-filter").hide();
    }

    var GridCount = getCookie("GridDataCount");
    $('#lblGridCount').html('(' + GridCount + ')');
    $('input[type=search]').keyup(function (e) {
        //var keycode = (event.keyCode ? event.keyCode : event.which);
        //if (keycode == '13') {
        //    var headerFilters = tblTabulator.getHeaderFilters();
        //    if (headerFilters.length > 0) {

        //        GridFilters = [];
        //        GridFilters = headerFilters;
        //        FillGridList();
        //    }
        //}
        var GridCount = getCookie("GridDataCount");
        $('#lblGridCount').html('(' + GridCount + ')');
    });
}

function DeselectMain() {
    $('#chkSelectDeselectAll').prop('checked', false);
    return false;
}

$('#btnGridAdd').click(function () {
    var url = ITX3ResolveUrl('~/' + FormObject + '/' + AddEditObject+'?menuid=' + MenuId);
    location.href = url;
});

$('#btnGridRemove').click(function () {
    RowSelectedOrNot('', 'MD', '' + AddEditObject + '', '' + FormObject+'', '')
});

$('#btnGridLoadRecords').click(function () {
    isBindFromGridButton = true;
    FillGridList();
});

$('#btnGridMultiSearch').click(function () {
    if (isMultiSearch) {
        isMultiSearch = false;
        $(".tabulator-col").css('height', 45);
        $(".tabulator-header-filter").hide();
    }
    else {
        isMultiSearch = true;
        $(".tabulator-col").css('height', 80);
        $(".tabulator-header-filter").show();
        if (SearchColumn == '' || SearchColumn == undefined)
            $("#ddlGridFilter").val('').trigger('change');
        else
            $("#ddlGridFilter").val(SearchColumn).trigger('change');

        $("#GridtxtSearch").val('');

        var ColumnFilters = tblTabulator.getFilters();
        if (ColumnFilters.length > 0) {
            tblTabulator.clearFilter();
        }
    }
});

$('#btnGridDropSearch').click(function () {
    var filterfield = $("#ddlGridFilter").val();
    var filterval = $("#GridtxtSearch").val();
    var filterType = $("#chkExactMatch").is(':checked') ? '=' : 'like';

    var headerFilters = tblTabulator.getHeaderFilters();
    if (headerFilters.length > 0) {
        tblTabulator.clearHeaderFilter();
    }

    tblTabulator.setFilter([
        { field: filterfield, type: filterType, value: filterval }
    ]);
});

$('#GridtxtSearch').keyup(function (e) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var filterfield = $("#ddlGridFilter").val();
        var filterval = $("#GridtxtSearch").val();
        var filterType = $("#chkExactMatch").is(':checked') ? '=' : 'like';

        var headerFilters = tblTabulator.getHeaderFilters();
        if (headerFilters.length > 0) {
            tblTabulator.clearHeaderFilter();
        }

        tblTabulator.setFilter([
            { field: filterfield, type: filterType, value: filterval }
        ]);

        var GridCount = getCookie("GridDataCount");
        $('#lblGridCount').html('(' + GridCount + ')');
    }
});

$('#btnGridClearSearch').click(function () {
    if (SearchColumn == '' || SearchColumn == undefined)
        $("#ddlGridFilter").val('').trigger('change');
    else
        $("#ddlGridFilter").val(SearchColumn).trigger('change');

    $("#GridtxtSearch").val('');

    var ColumnFilters = tblTabulator.getFilters();
    if (ColumnFilters.length > 0) {
        tblTabulator.clearFilter();
    }

    var GridCount = getCookie("GridDataCount");
    $('#lblGridCount').html('(' + GridCount + ')');
});

$("#btnGridExcel").click(function () {
    var ExcelFileName = AddEditObject + ".xlsx";
    tblTabulator.download("xlsx", ExcelFileName, { sheetName: AddEditObject });
});

$("#btnGridPDF").click(function () {
    var PDFFileName = AddEditObject + ".pdf";
    var PDFReportName = AddEditObject + " Report";
    tblTabulator.download("pdf", PDFFileName, {
        orientation: "landscape",
        title: PDFReportName
    });
});

$("#btnGridPrint").click(function () {
    var i = 0;
    var PrintId = "";
    $('input[type=checkbox][name^=chkGrd]').each(function () {
        if (this.checked) {
            i += 1;
            PrintId += (PrintId == "" ? "" : ",") + $(this).context.AutoID;
        }
    });

    if (PrintId != "" && PrintId != null) {
        RunReport(PrintId);
    } else {
        AlertDialog("Please select one record.")
    }
});

function RunReport(Id) {
    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: ITX3ResolveUrl('GridList/LoadReport'),
        data: JSON.stringify({ 'Id': Id }),
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