$(document).ready(function () {
    $("#search").focus(function () {
        $(".search-box").addClass("border-searching");
        $(".search-icon").addClass("si-rotate");
    });
    $("#search").blur(function () {
        $(".search-box").removeClass("border-searching");
        $(".search-icon").removeClass("si-rotate");
    });
    $("#search").keyup(function () {
        if ($(this).val().length > 0) {
            $(".goIcon").addClass("go-in");
        }
        else {
            $(".goIcon").removeClass("go-in");
        }
    });
});
