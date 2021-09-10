var btnSubmit = "#btnSubmit",
    btnCancel = "#btnCancel",
    btnOption1 = "#option1",
    btnOption2 = "#option2",
    dllUsers = $("#dllUsers");

function ResetData() {
    $("#tree_2").jstree(!0).deselect_all(), $("#dllUsers").val(""), $("#fgUsers").removeClass("has-error")
}

function IsValid() {
    var e = !0;
    return "" == $("#dllUsers").val() ? ($("#fgUsers").addClass("has-error"), e = !1) : $("#fgUsers").removeClass("has-error"), e
}

function AddData() {
    var e = [],
        s = [];
    $.each($("#tree_2").jstree("get_checked", !0), function () {
        s.push(this.id), e.push(this.parent)
    });
    var t = [];
    $.each(e, function (e, s) {
        -1 === $.inArray(s, t) && t.push(s)
    });
    var a;
    a = t.concat(s);
    var r = [];
    if ($.each(a, function (e, s) {
        -1 === $.inArray(s, r) && "#" != s && r.push(s)
    }), r.length > 0) {
        var n = new FormData;
        n.append("UserId", dllUsers.val()), n.append("MenuID", r), $.ajax({
            type: "POST",
            url: "/Master/AddUserPrivileges",
            data: n,
            contentType: !1,
            processData: !1,
            dataType: "json",
            success: function (e) {
                if (null != e || null != e) {
                    var s = JSON.parse(e);
                    Message("success", s.message, "success"), "OK" == s.status && ResetData()
                } else Message("info", "Error in Submission", "info")
            },
            error: function (e) {
                window.location = DefaultURL;
            }
        })
    } else Message("info", "Select At Least One Node", "info")
}
jQuery(document).ready(function () { }), $(btnOption1).click(function () {
    $(DivAdd).show(), $(DivList).hide(), $(option1).hide(), $(option2).show()
}), $(btnOption2).click(function () {
    $(DivAdd).hide(), $(DivList).show(), $(option1).show(), $(option2).hide()
}), $(btnSubmit).click(function () {
    IsValid() && AddData()
}), $(btnCancel).click(function () {
    ResetData()
}), $("#dllUsers").change(function () {
    "" == $("#dllUsers").val() ? $("#fgUsers").addClass("has-error") : $("#fgUsers").removeClass("has-error")
    
    }), dllUsers.change(function () {
    if ("" == $("#dllUsers").val()) {
        return;
    }
    var e = new FormData;
    e.append("userid", dllUsers.val()), $.ajax({
        type: "POST",
        url: "/Master/GetMenuByUserID",
        data: e,
        contentType: !1,
        processData: !1,
        dataType: "json",
        success: function (e) {
            if (null != e && void 0 !== e) {
                var s = JSON.parse(e);
                if (null != s.result) {
                    $("#tree_2").jstree(!0).deselect_all();
                    for (var t = $("#tree_2").jstree(!0).get_json("#", {
                        flat: !0
                    }), a = 0; a < t.length; a++)
                        for (var r = 0; r < s.result.Table1.length; r++) null != s.result.Table1[r].ParentMenuID && t[a].id == s.result.Table1[r].MenuItemID && (t[a].state.selected = !0);
                    $("#tree_2").jstree(!0).settings.core.data = t, $("#tree_2").jstree(!0).refresh();
                    var n = $("#tree_2").jstree(!0);
                    process = !1, $("#tree_2").on("refresh.jstree", function () {
                        process = !0
                    }), n.refresh()
                } else $("#tree_2").jstree(!0).deselect_all()
            } else Message("info", jsondata.message, "info")
        },
        error: function (e) {
            window.location = DefaultURL;
        }
    })
});