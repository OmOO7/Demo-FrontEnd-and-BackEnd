$(document).on('click', '#btnSave', function (e) {
    if (IsValid()) {
        save();
    }
    else {
        return false;
    }
});

function save() {

    var e = new FormData;
    e.append("UserID", $("#ddluser").val()),
        e.append("Amount", $("#txtamount").val()),
        e.append("TransType", $("input[name='depositwithdraw']:checked").val()),
        e.append("Descriptions", $("#txtdescripion").val()),
        $.ajax({
            type: "POST",
            url: "/User/UserDepoistWithdrawAmt",
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

function IsValid() {
    var status = true;
    if (($("#ddluser").val() == "" || $("#ddluser").val() == "0") && ($("#txtamount").val() == "" || $("#txtamount").val() == "0") && ($("#txtdescripion").val() == "")) {
        $("#fguser").addClass("has-error");
        $("#fgAmount").addClass("has-error");
        $("#fgDescription").addClass("has-error");
        status = false;
    }
    else if ($("#ddluser").val() == "" || $("#ddluser").val() == "0") {
        $("#fguser").addClass("has-error");
        status = false;
    }
    else if ($("#txtamount").val() == "" || $("#txtamount").val() == "0") {
        $("#fgAmount").addClass("has-error");
        status = false;
    }
    else if ($("#txtdescripion").val() == "") {
        $("#fgDescription").addClass("has-error");
        status = false;
    }
    return status;
}

$(document).on('click', '#btnCancel', function (e) {
    RemoveError();
    ClearData();
});

function ClearData() {
    $("#ddluser").val("");
    $("#txtamount").val("");
    $("#txtdescripion").val("");
    $("#rad_D").prop("checked", true);
    $("#rad_W").prop("checked", false);
}

function RemoveError() {
    $("#fguser").removeClass("has-error");
    $("#fgAmount").removeClass("has-error");
    $("#fgDescription").removeClass("has-error");
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
        url: "/User/GetUsersAmountDetail",
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
                for (var o = 0; o < r.result.Table1.length; o++)
                    $("#compact").append("<tr><td>" + r.result.Table1[o].UserName + " </td><td>" + r.result.Table1[o].TransType + " </td><td>" + r.result.Table1[o].TransID + " </td><td>" + r.result.Table1[o].Currency + " </td><td>" + r.result.Table1[o].Amount + "</td><td>" + r.result.Table1[o].TransStatus + "</td><td>" + r.result.Table1[o].Descriptions + "</td></tr");
                e.length < 1e3 ? (a = [25, 50, 100, 250, -1], t = [25, 50, 100, 250, "All"], l = 25) : (a = [50, 100, 250, 500, -1], t = [50, 100, 250, 500, "All"], l = 50);
                $("#compact").DataTable({
                    responsive: 1,
                    iDisplayLength: l,
                    aLengthMenu: [a, t],
                    order: [[0, "asc"]],
                    dom: "Blfrtip",
                    buttons: [{
                        extend: "excel",
                        title: 'Deposite_withdraw' + formatted_date,
                        exportOptions: {
                            columns: [0, 1]
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
