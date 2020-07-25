var GridFields = [];

function FillGridFields(Languages) {
    var GridWidth = Math.floor(90 / (Languages.length + 1));
    var WidthVal = GridWidth + "%";
    GridFields.push({ name: "Resource", width: WidthVal });

    $.each(Languages, function (index, value) {
        GridFields.push({ name: value.LanguageName, type: "text", width: WidthVal, validate: "required" });
    });
}

function ShowResource(btnNo, Name, total, Module, Id) {
   
    GridFields = GridFields.filter(function (obj) {
        return obj.type !== 'control';
    });

    GridFields.push(
        {
            type: "control",
            width: "10%",
            align: "center",
            modeSwitchButton: false,
            editButton: false,
            headerTemplate: function () {
                return $("<button>").addClass("btn bg-slate-700 btn-sm").attr("type", "button").text(label("Common", "ButtonCaption", "ADD", "ADD"))
                    .on("click", function () {
                        showDetailsDialog(Languages, Module);
                    });
            }
        }
    );
    $("#" + Id).jsGrid({
        width: "100%",
        height: "65vh",
        editing: true,
        autoload: true,
        paging: false,
        loadIndication: true,
        loadIndicationDelay: 500,
        loadMessage: label("Common", "MessageCaption", "PleaseWait", "Please Wait..."),
        loadShading: true,
        confirmDeleting: false,
        onItemDeleting: function (args) {
            if (!args.item.deleteConfirmed) {
                args.cancel = true;
                var DeleteWarning = "";
                var DeleteConfirm = label("Common", "Menu", "Resource", "Resource") + " <span style='color:#f44336;font-weight:700'>" + args.item.Resource + "</span>  " + label("Common", "MessageCaption", "DeleteConfirmMsg", "will be removed. Are you sure?");
                DeleteWarning += label("Common", "MessageCaption", "DeleteWarning", "You will not be able to recover this record!");
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
                    closeOnConfirm: true,
                    closeOnCancel: false
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            args.item.deleteConfirmed = true;
                            ResourceList = [];
                            ResourceList.push({ Module: Module, Form: ActiveForm, ResourceName: args.item.Resource, Value: "", LanguageId: 0 });

                            DeleteResource(ResourceList);
                            $("#" + Id).jsGrid('deleteItem', args.item);

                        }
                        else {
                            var btOK = label("Common", "ButtonCaption", "OK", "OK");
                            var btCancelled = label("Common", "ButtonCaption", "Cancelled", "Cancelled");
                            var DeleteNotMsg = label("Common", "MessageCaption", "DeleteNot", "Your record is not deleted. It's safe !");

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
        },
        controller: {
            loadData: function (filter) {
                return getData(btnNo, Name, total, Module, Id);
            },
            insertItem: function (item) {

            },
            updateItem: function (item) {
                var ResourceList = [];
                var CurrentResource = item['Resource'];

                $.each(item, function (index, value) {
                    if (index != "Resource") {
                        var LangID = getLanguageIdByField(index);
                        ResourceList.push({ Module: Module, Form: ActiveForm, ResourceName: CurrentResource, Value: value, LanguageId: LangID });
                    }
                });

                if (ResourceList != null && ResourceList.length > 0)
                    UpdateResource(ResourceList);
            },
            deleteItem: function (item) {
                console.log("DELETE");
                console.log(item);
            }
        },

        noDataContent: label("Common", "MessageCaption", "NoRecordsFound", "No records found."),
        fields: GridFields
    });
}

function getData(btnNo, Name, total, Module, Id) {
    var ResourceList = [];

    $.ajax({
        cache: false,
        type: "POST",
        async: false,
        url: ITX3ResolveUrl('Resource/ResourceListByFormAndModule'),
        data: JSON.stringify({ 'form': Name, 'Module': Module }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.Result == "OK") {
                ActiveForm = Name;
                ResourceList = JSON.parse("[" + GetJSONString(data.Records) + "]");
                $("#" + Id).show();
                ResetHeaderButton("btn" + btnNo);
            }
        },
        error: function (xhr, ret, e) {
        }
    });

    return ResourceList;
}

function GetJSONString(str) {
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&amp;nbsp;/g, '&nbsp;');
    str = str.replace(/&#39;/g, '');
    str = str.replace(/\\n/g, ' ');
    str = str.replace(/\\t/g, ' ');
    str = str.replace(/\\/g, '');
    str = str.substring(1, str.length - 1);
    return str;
}

function ResetHeaderButton(btn) {
    $('#' + btn).removeClass('btn bg-slate-700 btn-xlg mb-10 ml-5').addClass('btn bg-teal-700 btn-xlg mb-10 ml-5');
    $("#" + btn).siblings().removeClass('btn bg-teal-700 btn-xlg mb-10 ml-5').addClass('btn bg-slate-700 btn-xlg mb-10 ml-5');
}

function showDetailsDialog(Languages, Module) {
    var html = "";

    $(Languages).each(function (i, val) {
        html += '<div class="form-group" style="margin-bottom: 10px!important;">' +
            '<label class="col-sm-4 control-label text-bold text-size-large">' + val.LanguageName + ':</label>' +
            '<div class="col-sm-8">' +
            '<input class="form-control text-size-large" id="Language' + val.LanguageId + '" name="" tabindex="1" type="text" value="">' +
            '</div></div>';
    });

    $("#DynamicResourceFormGroupPanel").append(html);
    $("#btnAddResource").attr('Module', Module);
    $("#modal_AddResource").modal();
}

function ResourcesValidation() {
    if (CheckMandatoryField("ResourceName", "textbox") == false) {
        $("#ResourceName").focus();
        return false;
    }

    var checkflag = true;

    $.each(Languages, function (i, val) {
        if (CheckMandatoryField("Language" + val.LanguageId, "textbox") == false) {
            $("#Language" + val.LanguageId).focus();
            checkflag = false;
            return false;
        }
    });

    if (!(checkflag))
        return false;

    return true;
}

function InsertResource(ResourceList) {
    $.ajax({
        url: ITX3ResolveUrl("Resource/InsertResource"),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ResourceList': " + JSON.stringify(ResourceList) + "}",
        dataType: "json",
        success: function (data) {
            if (data.Result == "OK") {
                ValuesInserted = {
                    Resource: ResourceList[0].ResourceName,
                };

                $.each(Languages, function (i, val) {
                    ValuesInserted[val.LanguageName] = $("#Language" + val.LanguageId).val();
                });

                $(".jsgrid").jsGrid("insertItem", ValuesInserted);
                $("#modal_AddResource").modal('hide');
                ShowTinyNotification(1);
            }
            else
                ShowTinyNotification("");
        },
        failure: function (response) {
            alert(response.responseText);
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

function UpdateResource(ResourceList) {
    $.ajax({
        url: ITX3ResolveUrl("Resource/InsertResource"),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ResourceList': " + JSON.stringify(ResourceList) + "}",
        dataType: "json",
        success: function (data) {
            if (data.Result == "OK")
                ShowTinyNotification(2);
            else
                ShowTinyNotification("");
        },
        failure: function (response) {
            alert(response.responseText);
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

function getLanguageIdByField(field) {
    var LangID = "";

    $.each(Languages, function (index, value) {
        if (value.LanguageName == field) {
            LangID = value.LanguageId;
            return LangID;
        }
    });

    return LangID;
}

function DeleteResource(DeleteList) {
    console.log(DeleteList);
    console.log(JSON.stringify(DeleteList));

    $.ajax({
        url: ITX3ResolveUrl("Resource/DeleteResource"),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: "{ 'ResourceList': " + JSON.stringify(DeleteList) + "}",
        dataType: "json",
        success: function (data) {
            if (data.Result == "OK")
                ShowTinyNotification(3);
            else
                ShowTinyNotification("");
        },
        failure: function (response) {
            alert(response.responseText);
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

$("#btnAddResource").on('click', function () {
    ResourceList = [];
    InsertedValues = [];

    if (ResourcesValidation()) {
        var CurrentResource = $("#ResourceName").val();

        $.each(Languages, function (i, val) {
            ResourceList.push({ Module: $("#btnAddResource").attr("module"), Form: ActiveForm, ResourceName: CurrentResource, Value: $("#Language" + val.LanguageId).val(), LanguageId: val.LanguageId });
        });

        if (ResourceList != null && ResourceList.length > 0)
            InsertResource(ResourceList);
    }
});

$("#modal_AddResource").on('hide.bs.modal', function () {
    $("#ResourceName").val("");
    $("#btnAddResource").attr('Module', '');
    $("#DynamicResourceFormGroupPanel").html("");
});