$(document).on('click', '#btnSubmit', function (e) {
    if (IsValid()) {
        if (IsValid()) {
            var t = new FormData;
            t.append("TaxID", $('#hdnTaxID').val()),
                t.append("TaxName", $('#txt_taxname').val()),
                t.append("ProductID", $('#ddlproduct').val()),
            t.append("Percentage", $('#txt_percentage').val()),
             t.append("EffectiveDate", $('#txt_date').val()),

            $.ajax({
                type: "POST",
                url: "/User/InsUpdTax",
                data: t,
                contentType: !1,
                processData: !1,
                dataType: "json",
                success: function (e) {
                    if (null != e && void 0 !== e) {
                        var t = JSON.parse(e);
                        ClearData();
                        RemoveError();
                        Message("success", t.message, "success");
                    }
                    else {
                        Message("error", "Error in add data", "error")
                    }
                },
                error: function (e) {
                    window.location = DefaultURL;
                }
            })
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
});

function IsValid() {
    var status = true;
    if (($("#txt_taxname").val() == "" || $("#txt_taxname").val() == "0") && ($("#ddlproduct").val() == "" || $("#ddlproduct").val() == "0") && ($("#txt_percentage").val() == "" || $("#txt_percentage").val() == "0") && ($("#txt_date").val() == "" || $("#txt_date").val() == "0")) {
        $("#fgtaxname").addClass("has-error");
        $("#fgProduct").addClass("has-error");
        $("#fgPercentage").addClass("has-error");
        $("#fgDate").addClass("has-error");
        status = false;
    }
    else if ($("#txt_taxname").val() == "" || $("#txt_taxname").val() == "0") {
        $("#fgtaxname").addClass("has-error");
        status = false;
    }
    else if ($("#ddlproduct").val() == "" || $("#ddlproduct").val() == "0") {
        $("#fgProduct").addClass("has-error");
        status = false;
    }
    else if ($("#txt_percentage").val() == "" || $("#txt_percentage").val() == "0") {
        $("#fgPercentage").addClass("has-error");
        status = false;
    }
    else if ($("#txt_date").val() == "" || $("#txt_date").val() == "0") {
        $("#fgDate").addClass("has-error");
        status = false;
    }
    return status;
}

$(document).on('click', '#btnCancel', function (e) {
    RemoveError();
    ClearData();
});

function ClearData() {
    $("#hdnTaxID").val("0");
    $("#txt_taxname").val("");
    $("#ddlproduct").val("");
    $("#txt_percentage").val("");
    $("#txt_date").val("");
}

function RemoveError() {
    $("#fgtaxname").removeClass("has-error");
    $("#fgProduct").removeClass("has-error");
    $("#fgPercentage").removeClass("has-error");
    $("#fgDate").removeClass("has-error");
}

function Onfocus(id) {
    $("#" + id).removeClass("has-error");
}

$(document).on('click', '#btnView', function (e) {
    $("#DivList").show();
    GetData();
});

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
    //RemoveError();
});

function GetData() {

    var e = "{'TaxID': '0'}";


    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/User/GetTaxDetails",
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

                    $("#compact").append("<tr><td align='center'><a  href='javascript:void(0);' onclick='EditData(" + r.result[o].TaxID + ")'> <i class='fa fa-pencil text-inverse mr-10'></i> </a></td> <td>" + r.result[o].TaxName + " </td> <td>" + r.result[o].ProductID + " </td> <td>" + r.result[o].Percentage + " </td> <td>" + r.result[o].EffectiveDate + " </td><td align='center'><a  href='javascript:void(0);' onclick='DeleteData(" + r.result[o].TaxID + ")'> <i class='fa fa-trash text-inverse mr-10'></i> </a></td>");


                e.length < 1e3 ? (a = [25, 50, 100, 250, -1], t = [25, 50, 100, 250, "All"], l = 25) : (a = [50, 100, 250, 500, -1], t = [50, 100, 250, 500, "All"], l = 50);
                $("#compact").DataTable({
                    responsive: 1,
                    iDisplayLength: l,
                    aLengthMenu: [a, t],
                    order: [[1, "asc"]],
                    dom: "Blfrtip",
                    buttons: [{
                        extend: "excel",
                        title: 'currency' + formatted_date,
                        exportOptions: {
                            columns: [1, 2, 3, 4]
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
    
    var param = "{'TaxID':'" + id + "'}";

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/User/GetTaxDetails",
        data: param,
        dataType: "json",
        success: function (e) {
            if (null != e && void 0 !== e) {
                var r = JSON.parse(e);
                $("#hdnTaxID").val(r.result[0].TaxID);
                $("#txt_taxname").val(r.result[0].TaxName);
                $("#ddlproduct").val(r.result[0].ProductID);
                $("#txt_percentage").val(r.result[0].Percentage);
                $("#txt_date").val(r.result[0].EffectiveDate);

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
    var e = "{'TaxID':'" + id + "'}";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/User/DltUpdTax",
        data: e,
        dataType: "json",
        
        success: function (e) {
            debugger;
            if (null != e && void 0 !== e) {
                var t = JSON.parse(e);
                debugger;
                if (t.status == "OK" || t.status == "ok") {
                    Message("success", t.message, "success");
                    GetData();
                }
                else {
                    Message("error", t.message, "error")
                }
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
