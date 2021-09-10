
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
    if (($("#ddluser").val() == "" || $("#ddluser").val() == "0") && ($("#ddlproduct").val() == "" || $("#ddlproduct").val() == "0") && ($("#txt_day").val() == "")) {
        $("#fguser").addClass("has-error");
        $("#fgproduct").addClass("has-error");
        $("#fgdays").addClass("has-error");
        status = false;
    }
    else if ($("#ddluser").val() == "" || $("#ddluser").val() == "0") {
        $("#fguser").addClass("has-error");
        status = false;
    }
    else if ($("#ddlproduct").val() == "" || $("#ddlproduct").val() == "0") {
        $("#fgproduct").addClass("has-error");
        status = false;
    }
    else if ($("#txt_day").val() == "") {
        $("#fgdays").addClass("has-error");
        status = false;
    }
    return status;
}

function save() {

    var e = new FormData;
    e.append("UserID", $("#ddluser").val()),
        e.append("ProductID", $("#ddlproduct").val()),
        e.append("Days", $("#txt_day").val()),
        e.append("CDID", $("#hdnCDID").val()),
        $.ajax({
            type: "POST",
            url: "/User/InsUpdCancelationDays",
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
    $("#ddlproduct").val("");
    $("#txt_day").val("");
    $("#hdnCDID").val("0");
    $("#ddluser").prop("disabled", false);
    $("#ddlproduct").prop("disabled", false);
}


function RemoveError() {
    $("#fguser").removeClass("has-error");
    $("#fgproduct").removeClass("has-error");
    $("#fgdays").removeClass("has-error");
}

function Onfocus(id) {
    $("#" + id).removeClass("has-error");
}
$(document).on('click', '#option2', function (e) {
    $("#option1").show();
    $("#DivAdd").hide();
    $("#option2").hide();
    //RemoveError();
    GetData();
});

$(document).on('click', '#option1', function (e) {
    $("#DivAdd").show();
    $("#option2").show();
    $("#DivList").hide();
    $("#option1").hide();
    //ClearData();
    // RemoveError();
});

function GetData() {

    var e = "{'CDID': '0'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/User/GetCancelationDays",
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
                    $("#compact").append("<tr><td align ='center'> <a href='javascript:void(0);' onclick='EditData(" + r.result[o].CDID + ")'> <i class='fa fa-pencil text-inverse mr-10'></i> </a></td ><td> " + r.result[o].UserName + " </td ><td> " + r.result[o].ProductName + " </td ><td>" + r.result[o].Days + " </td><td align='center'><a href='javascript:void(0);' onclick='DeleteData(" + r.result[o].CDID + ")'> <i class='fa fa-trash text-inverse mr-10'></i> </a></td></tr>");
                e.length < 1e3 ? (a = [25, 50, 100, 250, -1], t = [25, 50, 100, 250, "All"], l = 25) : (a = [50, 100, 250, 500, -1], t = [50, 100, 250, 500, "All"], l = 50);
                $("#compact").DataTable({
                    responsive: 1,
                    iDisplayLength: l,
                    aLengthMenu: [a, t],
                    order: [[1, "asc"]],
                    dom: "Blfrtip",
                    buttons: [{
                        extend: "excel",
                        title: 'CancelationDays' + formatted_date,
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
    var e = "{'CDID':'" + id + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/User/GetCancelationDays",
        data: e,
        dataType: "json",
        success: function (e) {
            if (null != e && void 0 !== e) {
                var r = JSON.parse(e);
                RemoveError();
                $("#hdnCDID").val(r.result[0].CDID);
                $("#ddluser").val(r.result[0].UserID);
                $("#ddlproduct").val(r.result[0].ProductID);
                $("#txt_day").val(r.result[0].Days);
                $("#DivAdd").show();
                $("#option2").show();
                $("#DivList").hide();
                $("#option1").hide();

                $("#ddluser").prop("disabled", true);
                $("#ddlproduct").prop("disabled", true);
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
    var e = "{'CDID':'" + id + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/User/DltCancelationDays",
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