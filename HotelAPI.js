function setActiveMenu() {
    var e = GetQueryStringParams("p"),
        n = GetQueryStringParams("s");
    $("#parentMenuId" + e).addClass("active open"), $("#submenu" + n).addClass("active")
}

function GetQueryStringParams(e) {
    for (var n = window.location.search.substring(1).split("&"), a = 0; a < n.length; a++) {
        var t = n[a].split("=");
        if (t[0] == e) return t[1]
    }
}

function GetMenu(e, n) {
    $.ajax({
        url: window.location.origin + "/Home/bindmenu",
        type: "GET",
        dataType: "json",
        success: function (e) {
            if (e.result.Table.length > 0) {
                for (var n = "", a = 0; a < e.result.Table.length; a++) {
                    n += "<li class='nav-item' id='parentMenuId" + e.result.Table[a].Menuid + "'>", n += "<a href='javascript:;' class='nav-link nav-toggle'><i class='" + e.result.Table[a].MenuDescription + "'></i><span class='title'>" + e.result.Table[a].MenuName + "</span><span class='arrow'></span></a>", n += "<ul class='sub-menu'>";
                    for (var t = 0; t < e.result.Table1.length; t++) e.result.Table1[t].ParentMenuID == e.result.Table[a].Menuid && (n += "<li id='submenu" + e.result.Table1[t].Menuid + "' class='nav-item'><a  onclick=GetMenu(" + e.result.Table1[t].ParentMenuID + "," + window.location.origin + e.result.Table1[t].MenuUrl + ")  href=" + window.location.origin + e.result.Table1[t].MenuUrl + "?p=" + e.result.Table1[t].ParentMenuID + "&s=" + e.result.Table1[t].Menuid + " class='nav-link'><span class='title'>" + e.result.Table1[t].MenuName + "</span></a></li>");
                    n += "</ul>", n += "</li>"
                }
                $(".MenuList").append(n), setActiveMenu()
            }
        },
        error: function () {
            window.location = DefaultURL;
        }
    })
}
$(".nav-item").click(function () {
    $(".nav-item").each(function () {
        $(this).removeClass("active")
    }), $(this).addClass("active")
});