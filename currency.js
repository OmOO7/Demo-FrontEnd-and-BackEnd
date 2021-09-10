
$(document).on('click', '#btnSubmit', function (e) {
    if (IsValid()) {
        save();
    }
    else {
        return false;
    }
});

function IsValid() {
    var status = true;
    if (($("#ddluser").val() == "" || $("#ddluser").val() == "0") && ($("#ddlcurrency").val() == "" || $("#ddlcurrency").val() == "0")) {
        $("#fguser").addClass("has-error");
        $("#fgcurrency").addClass("has-error");
        status = false;
    }
    else if ($("#ddluser").val() == "" || $("#ddluser").val() == "0") {
        $("#fguser").addClass("has-error");
        status = false;
    }
    else if ($("#ddlcurrency").val() == "" || $("#ddlcurrency").val() == "0") {
        $("#fgcurrency").addClass("has-error");
        status = false;
    }
    return status;
}

function save() {

    var e = new FormData;
    e.append("UserID", $("#ddluser").val()),
        e.append("CurrencyCode", $("#ddlcurrency").val()),
        e.append("UCID", $("#hdnUCID").val()),
        $.ajax({
            type: "POST",
            url: "/User/InsUserCurrency",
            data: e,
            contentType: !1,
            processData: !1,
            dataType: "json",
            success: function (e) {
                if (null != e && void 0 !== e) {
                    var a = JSON.parse(e);
                    if (a.status == "OK" || a.status == "ok" || a.status == "Ok") {
                        RemoveError();
                        ClearData();
                        Message("success", a.message, "success");
                    }
                    else {
                        Message("error", a.message, "error");
                    }
                }
                else
                    Message("error", a.message, "error");
            },
            error: function (e) {
                window.location = DefaultURL;
            }
        })
}

$(document).on('click', '#btnCancel', function (e) {
    RemoveError();
    ClearData();
});

function ClearData() {
    $("#ddluser").val("");
    $("#ddlcurrency").val("");
    $("#hdnUCID").val("0");
}

function RemoveError() {
    $("#fguser").removeClass("has-error");
    $("#fgcurrency").removeClass("has-error");
}

function Onfocus(id) {
    $("#" + id).removeClass("has-error");
}

$(document).on('click', '#option2', function (e) {
    if ($("#ddluser").val() == "" || $("#ddluser").val() == "0") {
        $("#fguser").addClass("has-error");
        return false;
    }
    else {
        $("#option1").show();
        $("#DivAdd").hide();
        $("#option2").hide();
        RemoveError();
        GetData();
    }
});

$(document).on('click', '#option1', function (e) {
    $("#DivAdd").show();
    $("#option2").show();
    $("#DivList").hide();
    $("#option1").hide();
    ClearData();
    RemoveError();
});

function GetData() {
    var e = "{'UserID':'" + $("#ddluser").val() + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/User/GetUserCurrency",
        data: e,
        dataType: "json",
        success: function (e) {
            if (null != e && void 0 !== e) {
                var a, t, l, r = JSON.parse(e);
                let current_datetime = new Date()
                let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
                $("#compact").dataTable().fnDestroy();
                $("#compact tbody tr").remove();
                $("#DivList").show();
                for (var o = 0; o < r.result.length; o++)
                    $("#compact").append("<tr><td align ='center'> <a href='javascript:void(0);' onclick='EditData(" + r.result[o].UCID + ")'> <i class='fa fa-pencil text-inverse mr-10'></i> </a></td ><td> " + r.result[o].UserName + " </td ><td> " + r.result[o].CurrencyName + " </td ><td>" + r.result[o].CurrencyCode + " </td><td align='center'><a href='javascript:void(0);' onclick='DeleteData(" + r.result[o].UCID + ")'> <i class='fa fa-trash text-inverse mr-10'></i> </a></td></tr>");
                e.length < 1e3 ? (a = [25, 50, 100, 250, -1], t = [25, 50, 100, 250, "All"], l = 25) : (a = [50, 100, 250, 500, -1], t = [50, 100, 250, 500, "All"], l = 50);
                $("#compact").DataTable({
                    responsive: 1,
                    iDisplayLength: l,
                    aLengthMenu: [a, t],
                    order: [[1, "asc"]],
                    dom: "Blfrtip",
                    buttons: [{
                        extend: "excel", 
                        title: 'Currency' + formatted_date,
                        exportOptions: {
                            columns: [1, 2, 3]
                        },
                        text: "Export to Excel"
                    }]
                })

            } else Message("error", "Error in Listing", "error")
        },
        error: function (e) {
            window.location = DefaultURL;
        }
    })
}

function EditData(id) {
    var e = "{'UCID':'" + id + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/User/GetUserCurrency",
        data: e,
        dataType: "json",
        success: function (e) {
            if (null != e && void 0 !== e) {
                var r = JSON.parse(e);
                $("#hdnUCID").val(r.result[0].UCID);
                $("#ddluser").val(r.result[0].UserID);
                $("#ddlcurrency").val(r.result[0].CurrencyCode);
                $("#DivAdd").show();
                $("#option2").show();
                $("#DivList").hide();
                $("#option1").hide();
            }
            else {
                Message("error", "Error in edit data", "error")
            }
        },
        error: function (e) {
            window.location = DefaultURL;
        }
    })
}
function DeleteData(id) {
    swal({
        title: "Are You Sure?",
        text: "to Delete this records",
        type: "info",
        showCancelButton: !0,
        closeOnConfirm: !1,
        showLoaderOnConfirm: !0

    }, function (isConfirm) {
        if (isConfirm) {
            swal.close();
            DeleteRec(id);
        } else {
            swal.close();
            e.preventDefault();
            return false;
        }
    });
}

function DeleteRec(id) {
    debugger;
    var e = "{'UCID':'" + id + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/User/DltUserCurrency",
        data: e,
        dataType: "json",
        success: function (e) {
            if (null != e && void 0 !== e) {
                var a = JSON.parse(e);
                if (a.status == "OK" || a.status == "ok" || a.status == "Ok") {
                    Message("success", a.message, "success");
                    GetData();
                }
                else {
                    Message("error", a.message, "error");
                }
            }
            else {
                Message("error", "Error in Listing", "error")
            }
        },
        error: function (e) {
            window.location = DefaultURL;
        }
    })
}