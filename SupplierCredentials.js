

jQuery(document).ready(function () { }), $("#option1").click(function () {
    $("#DivAdd").show(), $("#DivList").hide(), $("#option1").hide(), $("#option2").show(), $("#spanTitle").html("Add Supplier Credentials")
}), $("#option2").click(function () {
    $("#DivAdd").hide(), $("#DivList").show(), $("#option1").show(), $("#option2").hide(), GetData(), $("#spanTitle").html("Supplier Credentials List")
})

$('#btnSubmit').click(function () {
    debugger
    if (!isValidData())
        return;
    AddData();
})

function AddData() {

    var e = new FormData;
    e.append("SCID", $('#hfSCID').val()),
    e.append("UserID", $('#dllUsers').val()),
        e.append("SupID", $('#dllSupplier').val()),
        e.append("TestUserName", $('#txtTestUserName').val().trim()),
        e.append("TestPassword", $('#txtTestPassword').val().trim()),
        e.append("TestKey", $('#txtTestKey').val().trim()),
        e.append("TestSecret", $('#txtTestSecret').val().trim()),
        e.append("TestAccountID", $('#txtTestAccountID').val().trim()),
        e.append("TestURL", $('#txtTestURL').val().trim()),
        e.append("LiveUserName", $('#txtLiveUserName').val().trim()),
        e.append("LivePassword", $('#txtLivePassword').val().trim()),
        e.append("LiveKey", $('#txtLiveKey').val().trim()),
        e.append("LiveSecret", $('#txtLiveSecret').val().trim()),
        e.append("LiveAccountID", $('#txtLiveAccountID').val().trim()),
        e.append("LiveURL", $('#txtLiveURL').val().trim());

       
  
    $.ajax({
        type: "POST",
        url: "/Master/AddSupplierCredentials",
        data: e,
        contentType: !1,
        processData: !1,
        dataType: "json",
        success: function (e) {
            if (null != e && void 0 !== e) {

                var t = JSON.parse(e);
                if (t.status == "OK") {
                    "OK" == t.status && Reset(), Message("success", t.message, "success")
                }
                else {
                    Message("error", t.message, "error")
                }
            } else Message("error", t.message, "error")
        },
        error: function (e) {
            // window.location = DefaultURL;
        }
    })
}

function RemoveHasError() {

    //Remove has error class start
        $('#fgUsers').removeClass("has-error"),
        $('#fgSupplier').removeClass("has-error"),
        $('#fgTestUserName').removeClass("has-error"),
        $('#fgTestPassword').removeClass("has-error"),
        $('#fgTestKey').removeClass("has-error"),
        $('#fgTestSecret').removeClass("has-error"),
        $('#fgTestAccountID').removeClass("has-error"),
        $('#fgTestURL').removeClass("has-error"),
        $('#fgLiveUserName').removeClass("has-error"),
        $('#fgLivePassword').removeClass("has-error"),
        $('#fgLiveKey').removeClass("has-error"),
        $('#fgLiveSecret').removeClass("has-error"),
        $('#fgLiveAccountID').removeClass("has-error"),
        $('#fgLiveURL').removeClass("has-error");
    //Remove has error class end
}

function isValidData() {

    RemoveHasError();
    var result = true;

    if ($('#dllUsers').val() == "") {
        $('#fgUsers').addClass("has-error"), result = true;
    }
    if ($('#dllSupplier').val() == "") {
        $('#fgSupplier').addClass("has-error"), result = false;
    }
    if ($('#txtTestUserName').val() == "") {
        $('#fgTestUserName').addClass("has-error"), result = false;
    }

    if ($('#txtTestPassword').val() == "") {
        $('#fgTestPassword').addClass("has-error"), result = false;
    }

    if ($('#txtTestKey').val() == "") {
        $('#fgTestKey').addClass("has-error"), result = false;
    }

    if ($('#txtTestSecret').val() == "") {
        $('#fgTestSecret').addClass("has-error"), result = false;
    }

    if ($('#txtTestAccountID').val() == "") {
        $('#fgTestAccountID').addClass("has-error"), result = false;
    }

    if ($('#txtTestURL').val() == "") {
        $('#fgTestURL').addClass("has-error"), result = false;
    }

    if ($('#txtLiveUserName').val() == "") {
        $('#fgLiveUserName').addClass("has-error"), result = false;
    }

    if ($('#txtLivePassword').val() == "") {
        $('#fgLivePassword').addClass("has-error"), result = false;
    }

    if ($('#txtLiveKey').val() == "") {
        $('#fgLiveKey').addClass("has-error"), result = false;
    }

    if ($('#txtLiveSecret').val() == "") {
        $('#fgLiveSecret').addClass("has-error"), result = false;
    }

    if ($('#txtLiveAccountID').val() == "") {
        $('#fgLiveAccountID').addClass("has-error"), result = false;
    }

    if ($('#txtLiveURL').val() == "") {
        $('#fgLiveURL').addClass("has-error"), result = false;
    }

    return result;
}

function Reset() {

    $('#dllUsers').val(""),
        $('#dllSupplier').val(""),
        $('#txtTestUserName').val(""),
        $('#txtTestPassword').val(""),
        $('#txtTestKey').val(""),
        $('#txtTestSecret').val(""),
        $('#txtTestAccountID').val(""),
        $('#txtTestURL').val(""),
        $('#txtLiveUserName').val(""),
        $('#txtLivePassword').val(""),
        $('#txtLiveKey').val(""),
        $('#txtLiveSecret').val(""),
        $('#txtLiveAccountID').val(""),
        $('#txtLiveURL').val(""),
        $('#hfSCID').val('0');


}

$('#btnCancel').click(function () {
    RemoveHasError();
    Reset();
})

function EditData(id) {
    $('#hfSCID').val(id);
    var e = new FormData;
    
    e.append("SCID", $('#hfSCID').val());
        $.ajax({
            type: "POST",
            url: "/Master/GetSupCredentialById",
            data: e,
            contentType: !1,
            processData: !1,
            dataType: "json",
            success: function (e) {
                if (null != e && void 0 !== e) {
                    debugger
                    var t = JSON.parse(e);
                    if (t.status == "OK") {
                        $('#SpanTitle').html("edit supplier credentials"),
                            $('#DivList').hide(), $('#option1').hide(), $('#option2').show(), $('#DivAdd').show();                        
                            $('#dllUsers').val(t.result[0].UserID),
                            $('#dllSupplier').val(t.result[0].SupID),
                            $('#txtTestUserName').val(t.result[0].TestUserName),
                            $('#txtTestPassword').val(t.result[0].TestPassword),
                            $('#txtTestKey').val(t.result[0].TestKey),
                            $('#txtTestSecret').val(t.result[0].TestSecret),
                            $('#txtTestAccountID').val(t.result[0].TestAccountID),
                            $('#txtTestURL').val(t.result[0].TestURL),
                            $('#txtLiveUserName').val(t.result[0].LiveUserName),
                            $('#txtLivePassword').val(t.result[0].LivePassword),
                            $('#txtLiveKey').val(t.result[0].LiveKey),
                            $('#txtLiveSecret').val(t.result[0].LiveSecret),
                            $('#txtLiveAccountID').val(t.result[0].LiveAccountID),
                            $('#txtLiveURL').val(t.result[0].LiveURL);

                    }
                  
                } 
            },
            error: function (e) {
                // window.location = DefaultURL;
            }
        })

    
    
}
function GetData() {
    Reset(), $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "/Master/GetSupCredential",
        dataType: "json",
        success: function (e) {
            if (null != e && void 0 !== e) {
                var t, a, s, r = JSON.parse(e);
                let current_datetime = new Date()
                let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()

                $("#compact").dataTable().fnDestroy(), $("#compact tbody tr").remove(), $("#DivList").show();

                for (var n = 0; n < r.result.length; n++) $("#compact").append("<tr>"
                    + "<td align='center'> <a style='text-decoration: none;' href='javascript:void(0);' onclick='EditData(" + r.result[n].SCID+ ")'>" + r.result[n].UserName + "</a></td>"
                    
                    
                    + "<td>" + r.result[n].SupplierName + " </td>"
                    + "<td>" + r.result[n].ProductName + " </td>"
                    + "<td>" + r.result[n].TestUserName + " </td>"                    
                    + "<td>" + r.result[n].TestPassword + " </td>"
                    + "<td>" + r.result[n].TestKey + " </td>"
                    + "<td>" + r.result[n].TestSecret + " </td>"
                    + "<td>" + r.result[n].TestAccountID + " </td>"
                    + "<td>" + r.result[n].TestURL + " </td>"
                    + "<td>" + r.result[n].LiveUserName + " </td>"
                    + "<td>" + r.result[n].LivePassword + " </td>"
                    + "<td>" + r.result[n].LiveKey + " </td>"
                    + "<td>" + r.result[n].LiveSecret + " </td>"
                    + "<td>" + r.result[n].LiveAccountID + " </td>"
                    + "<td>" + r.result[n].LiveURL + " </td>"
                   +"</tr >");
                e.length < 1e3 ? (t = [25, 50, 100, 250, -1], a = [25, 50, 100, 250, "All"], s = 25) : (t = [50, 100, 250, 500, -1], a = [50, 100, 250, 500, "All"], s = 50);
                $("#compact").DataTable({
                    responsive: !0,
                    processing: !0,
                    iDisplayLength: s,
                    aLengthMenu: [t, a],


                    dom: "Blfrtip",
                    buttons: [{
                        extend: "excel",
                        title: 'Admin_' + formatted_date,

                        text: "Export to Excel"
                    }]
                })
            } else Message("error", "Error in Listing", "error")
        },
        error: function (e) {
           // window.location = DefaultURL;
        }
    })
}
