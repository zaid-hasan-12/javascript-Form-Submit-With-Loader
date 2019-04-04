/***************************************************************************************************
LoadingOverlay - A flexible loading overlay jQuery plugin
    Author          : Gaspare Sganga
    Version         : 2.0.2
    License         : MIT
    Documentation   : https://gasparesganga.com/labs/jquery-loading-overlay/
***************************************************************************************************/
!function (e) {
    "function" == typeof define && define.amd
        ? define(["jquery"], e)
        : "object" == typeof module && module.exports
            ? e(require("jquery"))
            : e(jQuery)
}(function (e, a) {
    "use strict";
    var s = {
            background: "rgba(255, 255, 255, 0.8)",
            backgroundClass: "",
            image: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'><ellipse rx='8" +
                    "0' ry='80' cx='500' cy='90'/><ellipse rx='80' ry='80' cx='500' cy='910'/><elli" +
                    "pse rx='80' ry='80' cx='90' cy='500'/><ellipse rx='80' ry='80' cx='910' cy='50" +
                    "0'/><ellipse rx='80' ry='80' cx='212' cy='212'/><ellipse rx='80' ry='80' cx='7" +
                    "88' cy='212'/><ellipse rx='80' ry='80' cx='212' cy='788'/><ellipse rx='80' ry=" +
                    "'80' cx='788' cy='788'/></svg>",
            imageAnimation: "2000ms rotate_right",
            imageAutoResize: !0,
            imageResizeFactor: 1,
            imageColor: "#202020",
            imageClass: "",
            imageOrder: 1,
            fontawesome: "",
            fontawesomeAnimation: "",
            fontawesomeAutoResize: !0,
            fontawesomeResizeFactor: 1,
            fontawesomeColor: "#202020",
            fontawesomeOrder: 2,
            custom: "",
            customAnimation: "",
            customAutoResize: !0,
            customResizeFactor: 1,
            customOrder: 3,
            text: "",
            textAnimation: "",
            textAutoResize: !0,
            textResizeFactor: .5,
            textColor: "#202020",
            textClass: "",
            textOrder: 4,
            progress: !1,
            progressAutoResize: !0,
            progressResizeFactor: .25,
            progressColor: "#a0a0a0",
            progressClass: "",
            progressOrder: 5,
            progressSpeed: 200,
            progressMin: 0,
            progressMax: 100,
            size: 50,
            maxSize: 120,
            minSize: 20,
            direction: "column",
            fade: !0,
            _fadeValues: [
                400, 200
            ],
            resizeInterval: 50,
            zIndex: 2147483647
        },
        t = {
            overlay: {
                "box-sizing": "border-box",
                position: "relative",
                display: "flex",
                "flex-wrap": "nowrap",
                "align-items": "center",
                "justify-content": "space-around"
            },
            element: {
                "box-sizing": "border-box",
                overflow: "visible",
                flex: "0 0 auto",
                display: "flex",
                "justify-content": "center",
                "align-items": "center"
            },
            element_svg: {
                width: "100%",
                height: "100%"
            },
            progress_wrapper: {
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%"
            },
            progress_bar: {
                position: "absolute",
                left: "0"
            }
        },
        o = {
            count: 0,
            fadeOut: a,
            overlay: a,
            resizeIntervalId: a,
            text: a,
            progress: a
        },
        r = [
            "rotate_right", "rotate_left", "fadein", "pulse"
        ],
        i = {
            name: "rotate_right",
            time: "2000ms"
        };
    function n(a, r) {
        var i;
        a = e(a),
        r.size = !(!(i = r.size) || i < 0) && (
            "string" == typeof i && ["vmin", "vmax"].indexOf(i.slice(-4)) > -1
                ? {
                    fixed: !0,
                    units: i.slice(-4),
                    value: i.slice(0, -4)
                }
                : "string" == typeof i && ["rem"].indexOf(i.slice(-3)) > -1
                    ? {
                        fixed: !0,
                        units: i.slice(-3),
                        value: i.slice(0, -3)
                    }
                    : "string" == typeof i && [
                        "px",
                        "em",
                        "cm",
                        "mm",
                        "in",
                        "pt",
                        "pc",
                        "vh",
                        "vw"
                    ].indexOf(i.slice(-2)) > -1
                        ? {
                            fixed: !0,
                            units: i.slice(-2),
                            value: i.slice(0, -2)
                        }
                        : {
                            fixed: !1,
                            units: "px",
                            value: parseFloat(i)
                        }
        ),
        r.maxSize = parseInt(r.maxSize, 10) || 0,
        r.minSize = parseInt(r.minSize, 10) || 0,
        r.resizeInterval = parseInt(r.resizeInterval, 10) || 0;
        var n = a.data("loadingoverlay"),
            l = a.is("body");
        if (void 0 === n) {
            if (
                n = e.extend({}, o),
                a.data("loadingoverlay", n),
                n.overlay = e("<div>", {class: "loadingoverlay"}).css(t.overlay).css(
                    "flex-direction",
                    "row" === r.direction.toLowerCase()
                        ? "row"
                        : "column"
                ),
                r.backgroundClass
                    ? n.overlay.addClass(r.backgroundClass)
                    : n.overlay.css("background", r.background),
                l && n.overlay.css(
                    {position: "fixed", top: 0, left: 0, width: "100%", height: "100%"}
                ),
                void 0 !== r.zIndex && n.overlay.css("z-index", r.zIndex),
                r.image
            ) {
                var d = m(
                    n.overlay,
                    r.imageOrder,
                    r.imageAutoResize,
                    r.imageResizeFactor,
                    r.imageAnimation
                );
                "<svg" === r
                    .image
                    .slice(0, 4)
                    .toLowerCase() && "</svg>" === r
                    .image
                    .slice(-6)
                    .toLowerCase()
                        ? (
                            d.append(r.image),
                            d.children().css(t.element_svg),
                            !r.imageClass && r.imageColor && d.css("fill", r.imageColor)
                        )
                        : ".svg" === r
                            .image
                            .slice(-4)
                            .toLowerCase() || "data:image/svg" === r
                            .image
                            .slice(0, 14)
                            .toLowerCase()
                                ? (
                                    d.load(r.image, function () {
                                        d
                                            .children()
                                            .css(t.element_svg)
                                    }),
                                    !r.imageClass && r.imageColor && d.css("fill", r.imageColor)
                                )
                                : d.css({
                                    "background-image": "url(" + r.image + ")",
                                    "background-position": "center",
                                    "background-repeat": "no-repeat",
                                    "background-size": "cover"
                                }),
                r.imageClass && d.addClass(r.imageClass)
            }
            if (r.fontawesome) {
                d = m(
                    n.overlay,
                    r.fontawesomeOrder,
                    r.fontawesomeAutoResize,
                    r.fontawesomeResizeFactor,
                    r.fontawesomeAnimation
                ).addClass("loadingoverlay_fa");
                e("<div>", {class: r.fontawesome}).appendTo(d),
                r.fontawesomeColor && d.css("color", r.fontawesomeColor)
            }
            if (r.custom) 
                d = m(
                    n.overlay,
                    r.customOrder,
                    r.customAutoResize,
                    r.customResizeFactor,
                    r.customAnimation
                ).append(r.custom);
            if (
                r.text && (
                    n.text = m(n.overlay, r.textOrder, r.textAutoResize, r.textResizeFactor, r.textAnimation).addClass("loadingoverlay_text").text(r.text),
                    r.textClass
                        ? n.text.addClass(r.textClass)
                        : r.textColor && n.text.css("color", r.textColor)
                ),
                r.progress
            ) {
                d = m(
                    n.overlay,
                    r.progressOrder,
                    r.progressAutoResize,
                    r.progressResizeFactor,
                    !1
                ).addClass("loadingoverlay_progress");
                var c = e("<div>")
                    .css(t.progress_wrapper)
                    .appendTo(d);
                n.progress = {
                    bar: e("<div>")
                        .css(t.progress_bar)
                        .appendTo(c),
                    min: parseFloat(r.progressMin),
                    max: parseFloat(r.progressMax),
                    speed: parseInt(r.progressSpeed, 10)
                },
                r.progressClass
                    ? n
                        .progress
                        .bar
                        .addClass(r.progressClass)
                    : r.progressColor && n
                        .progress
                        .bar
                        .css("background", r.progressColor)
            }
            f(a, n.overlay, r, l, !0),
            r.resizeInterval > 0 && (n.resizeIntervalId = setInterval(function () {
                f(a, n.overlay, r, l, !1)
            }, r.resizeInterval)),
            r.fade
                ? !0 === r.fade
                    ? r.fade = s._fadeValues
                    : "string" == typeof r.fade || "number" == typeof r.fade
                        ? r.fade = [r.fade, r.fade]
                        : "array" === e.type(r.fade) && r.fade.length < 2 && (r.fade = [
                            r.fade[0], r.fade[0]
                        ])
                : r.fade = [
                    0, 0
                ],
            r.fade = [
                parseInt(r.fade[0], 10),
                parseInt(r.fade[1], 10)
            ],
            n.fadeOut = r.fade[1],
            n
                .overlay
                .hide()
                .appendTo("body")
                .fadeIn(r.fade[0])
        }
        n.count++
    }
    function l(a, s) {
        var t = (a = e(a)).data("loadingoverlay");
        void 0 !== t && (t.count--, (s || t.count <= 0) && (
            t.resizeIntervalId && clearInterval(t.resizeIntervalId),
            t.overlay.fadeOut(t.fadeOut, function () {
                e(this).remove()
            }),
            a.removeData("loadingoverlay")
        ))
    }
    function d(a, s) {
        var t = (a = e(a)).data("loadingoverlay");
        void 0 !== t && t.text && (
            !1 === s
                ? t.text.hide()
                : t.text.show().text(s)
        )
    }
    function c(a, s) {
        var t = (a = e(a)).data("loadingoverlay");
        if (void 0 !== t && t.progress) 
            if (!1 === s) 
                t
                    .progress
                    .bar
                    .hide();
            else {
                var o = 100 * ((parseFloat(s) || 0) - t.progress.min) / (
                    t.progress.max - t.progress.min
                );
                o < 0 && (o = 0),
                o > 100 && (o = 100),
                t
                    .progress
                    .bar
                    .show()
                    .animate({
                        width: o + "%"
                    }, t.progress.speed)
            }
        }
    function f(a, s, t, o, r) {
        if (!o) {
            var i = "fixed" === a.css("position"),
                n = i
                    ? a[0].getBoundingClientRect()
                    : a.offset();
            s.css({
                position: i
                    ? "fixed"
                    : "absolute",
                top: n.top + parseInt(a.css("border-top-width"), 10),
                left: n.left + parseInt(a.css("border-left-width"), 10),
                width: a.innerWidth(),
                height: a.innerHeight()
            })
        }
        if (t.size) {
            var l = o
                    ? e(window)
                    : a,
                d = t.size.value;
            t.size.fixed || (
                d = Math.min(l.innerWidth(), l.innerHeight()) * d / 100,
                t.maxSize && d > t.maxSize && (d = t.maxSize),
                t.minSize && d < t.minSize && (d = t.minSize)
            ),
            s
                .children(".loadingoverlay_element")
                .each(function () {
                    var s = e(this);
                    if (r || s.data("loadingoverlay_autoresize")) {
                        var o = s.data("loadingoverlay_resizefactor");
                        s.hasClass("loadingoverlay_fa") || s.hasClass("loadingoverlay_text")
                            ? s.css("font-size", d * o + t.size.units)
                            : s.hasClass("loadingoverlay_progress")
                                ? a
                                    .data("loadingoverlay")
                                    .progress
                                    .bar
                                    .css({
                                        height: d * o + t.size.units,
                                        top: s
                                            .position()
                                            .top
                                    })
                                    .css("top", "-=" + d * o * .5 + t.size.units)
                                : s.css({
                                    width: d * o + t.size.units,
                                    height: d * o + t.size.units
                                })
                    }
                })
        }
    }
    function m(a, s, o, r, n) {
        var l = e("<div>", {
            class: "loadingoverlay_element",
            css: {
                order: s
            }
        })
            .css(t.element)
            .data({loadingoverlay_autoresize: o, loadingoverlay_resizefactor: r})
            .appendTo(a);
        if (!0 === n && (n = i.time + " " + i.name), "string" == typeof n) {
            var d,
                c,
                f = n
                    .replace(/\s\s+/g, " ")
                    .toLowerCase()
                    .split(" ");
            2 === f.length && g(f[0]) && p(f[1])
                ? (d = f[1], c = f[0])
                : 2 === f.length && g(f[1]) && p(f[0])
                    ? (d = f[0], c = f[1])
                    : 1 === f.length && g(f[0])
                        ? (d = i.name, c = f[0])
                        : 1 === f.length && p(f[0]) && (d = f[0], c = i.time),
            l.css({
                "animation-name": "loadingoverlay_animation__" + d,
                "animation-duration": c,
                "animation-timing-function": "linear",
                "animation-iteration-count": "infinite"
            })
        }
        return l
    }
    function g(e) {
        return !isNaN(parseFloat(e)) && ("s" === e.slice(-1) || "ms" === e.slice(-2))
    }
    function p(e) {
        return r.indexOf(e) > -1
    }
    e.LoadingOverlaySetup = function (a) {
        e.extend(!0, s, a)
    },
    e.LoadingOverlay = function (a, t) {
        switch (a.toLowerCase()) {
            case "show":
                n("body", e.extend(!0, {}, s, t));
                break;
            case "hide":
                l("body", t);
                break;
            case "text":
                d("body", t);
                break;
            case "progress":
                c("body", t)
        }
    },
    e.fn.LoadingOverlay = function (a, t) {
        switch (a.toLowerCase()) {
            case "show":
                var o = e.extend(!0, {}, s, t);
                return this.each(function () {
                    n(this, o)
                });
            case "hide":
                return this.each(function () {
                    l(this, t)
                });
            case "text":
                return this.each(function () {
                    d(this, t)
                });
            case "progress":
                return this.each(function () {
                    c(this, t)
                })
        }
    },
    e(function () {
        e("head").append([
            "<style>",
            "@-webkit-keyframes loadingoverlay_animation__rotate_right {",
            "to {",
            "-webkit-transform : rotate(360deg);",
            "transform : rotate(360deg);",
            "}",
            "}",
            "@keyframes loadingoverlay_animation__rotate_right {",
            "to {",
            "-webkit-transform : rotate(360deg);",
            "transform : rotate(360deg);",
            "}",
            "}",
            "@-webkit-keyframes loadingoverlay_animation__rotate_left {",
            "to {",
            "-webkit-transform : rotate(-360deg);",
            "transform : rotate(-360deg);",
            "}",
            "}",
            "@keyframes loadingoverlay_animation__rotate_left {",
            "to {",
            "-webkit-transform : rotate(-360deg);",
            "transform : rotate(-360deg);",
            "}",
            "}",
            "@-webkit-keyframes loadingoverlay_animation__fadein {",
            "0% {",
            "opacity   : 0;",
            "-webkit-transform : scale(0.1, 0.1);",
            "transform : scale(0.1, 0.1);",
            "}",
            "50% {",
            "opacity   : 1;",
            "}",
            "100% {",
            "opacity   : 0;",
            "-webkit-transform : scale(1, 1);",
            "transform : scale(1, 1);",
            "}",
            "}",
            "@keyframes loadingoverlay_animation__fadein {",
            "0% {",
            "opacity   : 0;",
            "-webkit-transform : scale(0.1, 0.1);",
            "transform : scale(0.1, 0.1);",
            "}",
            "50% {",
            "opacity   : 1;",
            "}",
            "100% {",
            "opacity   : 0;",
            "-webkit-transform : scale(1, 1);",
            "transform : scale(1, 1);",
            "}",
            "}",
            "@-webkit-keyframes loadingoverlay_animation__pulse {",
            "0% {",
            "-webkit-transform : scale(0, 0);",
            "transform : scale(0, 0);",
            "}",
            "50% {",
            "-webkit-transform : scale(1, 1);",
            "transform : scale(1, 1);",
            "}",
            "100% {",
            "-webkit-transform : scale(0, 0);",
            "transform : scale(0, 0);",
            "}",
            "}",
            "@keyframes loadingoverlay_animation__pulse {",
            "0% {",
            "-webkit-transform : scale(0, 0);",
            "transform : scale(0, 0);",
            "}",
            "50% {",
            "-webkit-transform : scale(1, 1);",
            "transform : scale(1, 1);",
            "}",
            "100% {",
            "-webkit-transform : scale(0, 0);",
            "transform : scale(0, 0);",
            "}",
            "}",
            "</style>"
        ].join(" "))
    })
});