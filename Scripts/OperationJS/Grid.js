
function FillGridList() {
    $('#tblGrid').jtable({
        paging: true,
        sorting: true,
        selecting: true,
        pageSize: 10,
        jqueryuiTheme: true,
        defaultSorting: 'Name ASC',
        actions: {
            listAction: ITX3ResolveUrl('Common/GetGridList?ObjectType=Language')
        },
        fields: {
            Code: {
                title: label("Common", "LabelCaption", "Code", "Code"),
                default: label("Common", "LabelCaption", "Code", "Code"),
                width: '20%',
                columnResizable: false
            },
            Name: {
                title: label("Common", "LabelCaption", "Name", "Name"),
                default: label("Common", "LabelCaption", "Name", "Name"),
                width: '50%',
                columnResizable: false
            },
            IsActive: {
                title: label("Common", "LabelCaption", "Active", "Active"),
                default: label("Common", "LabelCaption", "Active", "Active"),
                width: '10%',
                listClass: 'fieldCenter',
                display: function (data) {
                    if (data.record.IsActive == true) {
                        return "<span class=\"label label-success label-rounded label-icon\"><i class=\"icon-checkmark4\"></i></span>";
                    }
                    else {
                        return "<span class=\"label label-danger label-rounded label-icon\"><i class=\"icon-cross2\"></i></span>";
                    }
                }
            },
            //selectionChanged: function () {
            //    //Get all selected rows
            //    var $selectedRows = $('#tblGrid').jtable('selectedRows');
            //    $('#SelectedRowList').empty();
            //    if ($selectedRows.length > 0) {
            //        //Show selected rows
            //        $selectedRows.each(function () {
            //            var record = $(this).data('record');
            //        });
            //    } else {
            //        //No rows selected
            //        $('#tblGrid').append('No row selected! Select rows to see here...');
            //    }
            //},
            "Action": {
                title: label("Common", "LabelCaption", "Action", "Action"),
                default: label("Common", "LabelCaption", "Action", "Action"),
                width: '10%',
                listClass: 'fieldCenter',
                display: function (data) {
                    if (data.record.Code != 'en-US' && data.record.Code != 'hi-IN') {
                        var Editbtn = "<span class=\"label position-right\"><a href=\"JavaScript:void(0);\" class=\"label bg-slate label-icon\" onclick=\"return RowSelectedPopup(" + data.record.Id.toString() + ",'E', 'Language');\"><i class=\"icon-pencil6\"></i></a></span>";
                        Editbtn += "<span class=\"label position-right\"><a href=\"JavaScript:void(0);\" class=\"label bg-slate label-icon\" onclick=\"return RowSelectedPopup(" + data.record.Id.toString() + ",'D', 'Language','" + data.record.Name.toString() + "');\"><i class=\"icon-cross2\"></i></a></span>";
                        return Editbtn;
                    }
                },
            }
        }
    });

    $('#tblGrid').jtable('load');

    $("#FiltCode,#FiltName").onTypeFinished(GetFilterData);
}

$(document).keydown(function (e) {
    //up key
    if (e.keyCode == 38) {
        //return false;
        $('#tblGrid').jtable('selectedRows').prev().click();
    }
    //down key
    if (e.keyCode == 40) {
        $('#tblGrid').jtable('selectedRows').next().click();
        //return false;
    }
});

function LayoutResize(headerCells) {
    headerCells.each(function () {
        var $cell = $(this);
        var fieldName = $cell.data('fieldName');
        if (fieldName == "Code")
            $cell.css('width', '20%');
        else if (fieldName == "Name")
            $cell.css('width', '50%');
        else if (fieldName == "Actice")
            $cell.css("text-align", "center").css('width', '10%');
        else
            $cell.css("text-align", "center").css('width', '10%');
    });
}

function FillLanguageObject(Records) {
    $("#strAction").val("E");
    $("#Id").val(Records.Id);
    $("#CultureCode").val(Records.Code).trigger('change');
    $("#Code").val(Records.Code);
    $("#Name").val(Records.Name);
    $("#Name").removeAttr("readonly");
    $('#IsActive').prop('checked', Records.IsActive).change();
    $("#modal_Language").modal("show");
}

function GetFilterData() {
    var Filter = "Codeᴌ" + $('#FiltCode').val() + "|"
    Filter += "Nameᴌ" + $('#FiltName').val()
    $('#tblGrid').jtable('load', { Filters: Filter });
}

$("#btnAddNew").click(function () {
    $('#modal_Language').modal('show');
});

$("#modal_Language").escape(function () {
    $('#modal_Language').modal('hide');
})

$("#CultureCode").change(function () {
    var CultVal = $('#CultureCode').val();
    var CultText = $('#CultureCode option:selected').text();
    var CultName = CultText.split('(')[0].slice(0, -1);
    if (CultVal == "" || CultVal == '') {
        $("#Code").val('');
        $("#Name").val('');
        $("#Code").prop("readonly", true);
        $("#Name").prop("readonly", true);
    }
    else {
        $("#Code").val(CultVal);
        $("#Name").val(CultName);
        $("#Name").removeAttr("readonly");
    }
});

$('#modal_Language').on('hidden.bs.modal', function () {
    ResetControl();
});

function ResetControl() {
    $("#strAction").val("C");
    $("#Id").val("");

    $("#CultureCode").val("").trigger('change');
    $('#Code').val('');
    $('#Name').val('');
    $("#Code").prop("readonly", true);
    $("#Name").prop("readonly", true);
    $('#IsActive').prop('checked', true).change();
    $("#CultureCode").siblings(".select2-container").css('border', '');
    $("#Code,#Name").css('border', '');
    $('#btnSubmit').removeAttr("disabled");
}