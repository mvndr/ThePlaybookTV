(function(b) {
    function q(a) {
        b(a.target).closest(".mbr-slider").hasClass("in") && a.target.playVideo()
    }

    function m(a) {
        a = b(a.target);
        "undefined" !== typeof b.fn.masonry && a.outerFind(".mbr-gallery").each(function() {
            var a = b(this).find(".mbr-gallery-row").masonry({
                itemSelector: ".mbr-gallery-item:not(.mbr-gallery-item__hided)",
                percentPosition: !0,
                horizontalOrder: !0
            });
            a.masonry("reloadItems");
            a.on("filter", function() {
                a.masonry("reloadItems");
                a.masonry("layout");
                b(window).trigger("update.parallax")
            }.bind(this, a));
            a.imagesLoaded().progress(function() {
                a.masonry("layout")
            })
        })
    }

    function l() {
        clearTimeout(n);
        n = setTimeout(r, 50)
    }

    function r() {
        var a = b(".mbr-gallery .modal");
        if (a.length) {
            var d = b(window).width() - 0,
                c = b(window).height() - 0;
            a.each(function() {
                var a, g, k = b(this).find(".modal-dialog");
                a = k.find(".carousel-item.active > img");
                k.find(".carousel-item.prev > img, .carousel-item.next > img").length && (a = k.find(".carousel-item.prev > img, .carousel-item.next > img").eq(0));
                g = a[0].naturalWidth;
                var f = a[0].naturalHeight;
                a = d / c > g / f ? (c - 20) * g / f : d - 20;
                a = a >= g ? g : a;
                g = (c - a * f / g) / 2;
                k.css({
                    width: parseInt(a),
                    top: g + 0
                })
            })
        }
    }
    if (!b("html").hasClass("is-builder")) {
        var f = document.createElement("script");
        f.src = "https://www.youtube.com/iframe_api";
        var p = document.getElementsByTagName("script")[0];
        p.parentNode.insertBefore(f, p);
        var h = [];
        window.onYouTubeIframeAPIReady = function() {
            var a = a || {};
            a.YTAPIReady || (a.YTAPIReady = !0, jQuery(document).trigger("YTAPIReady"));
            b(".video-slide").each(function(a) {
                b(".video-container").eq(a).append('<div id ="mbr-video-' +
                    a + '" class="mbr-background-video" data-video-num="' + a + '"></div>').append('<div class="item-overlay"></div>');
                b(this).attr("data-video-num", a);
                if (-1 !== b(this).attr("data-video-url").indexOf("vimeo.com")) {
                    var c = {
                        id: b(this).attr("data-video-url"),
                        width: "100%",
                        height: "100%",
                        loop: !0
                    };
                    a = new Vimeo.Player("mbr-video-" + a, c);
                    a.playVideo = Vimeo.play
                } else {
                    var c = YT.Player,
                        e;
                    e = b(this).attr("data-video-url");
                    e = "false" === e ? !1 : (e = /(?:\?v=|\/embed\/|\.be\/)([-a-z0-9_]+)/i.exec(e) || /^([-a-z0-9_]+)$/i.exec(e)) ? e[1] : !1;
                    a = new c("mbr-video-" + a, {
                        height: "100%",
                        width: "100%",
                        videoId: e,
                        events: {
                            onReady: q
                        },
                        playerVars: {
                            rel: 0
                        }
                    })
                }
                h.push(a)
            })
        }
    }
    b(document).on("add.cards", function(a) {
        var d = b(a.target);
        d.find(".mbr-gallery-filter-all");
        d.on("click", ".mbr-gallery-filter li > .btn", function(a) {
            a.preventDefault();
            var e = b(this).closest("li");
            e.parent().find("a").removeClass("active");
            b(this).addClass("active");
            var g = e.closest("section").find(".mbr-gallery-row"),
                f = b(this).html().trim();
            d.find(".mbr-gallery-item").each(function(a, d) {
                var c =
                    b(this),
                    g = c.attr("data-tags").split(",").map(function(a) {
                        return a.trim()
                    }); - 1 !== b.inArray(f, g) || e.hasClass("mbr-gallery-filter-all") ? c.removeClass("mbr-gallery-item__hided") : (c.addClass("mbr-gallery-item__hided"), setTimeout(function() {
                    c.css("left", "300px")
                }, 200))
            });
            setTimeout(function() {
                g.closest(".mbr-gallery-row").trigger("filter")
            }, 50)
        })
    });
    b(document).on("add.cards changeParameter.cards changeButtonColor.cards", function(a) {
        var d = b(a.target),
            c = d.find(".mbr-gallery-filter-all"),
            e = [];
        d.find(".mbr-gallery-item").each(function(a) {
            (b(this).attr("data-tags") ||
                "").trim().split(",").map(function(a) {
                a = a.trim(); - 1 === b.inArray(a, e) && e.push(a)
            })
        });
        if (0 < d.find(".mbr-gallery-filter").length && b(a.target).find(".mbr-gallery-filter").hasClass("gallery-filter-active") && !b(a.target).find(".mbr-gallery-filter").hasClass("mbr-shop-filter")) {
            var g = "",
                f = c.find("a").attr("class") || "",
                f = f.replace(/(^|\s)active(\s|$)/, " ").trim();
            d.find(".mbr-gallery-filter ul li:not(li:eq(0))").remove();
            e.map(function(a) {
                g += '<li><a class="' + f + '" href>' + a + "</a></li>"
            });
            d.find(".mbr-gallery-filter ul").append(g)
        } else d.find(".mbr-gallery-item__hided").removeClass("mbr-gallery-item__hided"),
            d.find(".mbr-gallery-row").trigger("filter");
        m(a)
    });
    b(document).on("change.cards", function(a) {
        m(a)
    });
    b(".mbr-gallery-item").on("click", "a", function(a) {
        a.stopPropagation()
    });
    var n, f = b(document).find(".mbr-gallery");
    f.on("show.bs.modal", function(a) {
        clearTimeout(d);
        var d = setTimeout(function() {
            var c = b(a.relatedTarget).parent().index(),
                c = b(a.target).find(".carousel-item").eq(c).find(".mbr-background-video");
            b(a.target).find(".carousel-item .mbr-background-video");
            0 < c.length && (c = h[+c.attr("data-video-num")],
                c.playVideo ? c.playVideo() : c.play())
        }, 500);
        l()
    });
    f.on("slide.bs.carousel", function(a) {
        a = b(a.target).find(".carousel-item.active .mbr-background-video");
        0 < a.length && (a = h[+a.attr("data-video-num")], a.pauseVideo ? a.pauseVideo() : a.pause())
    });
    b(window).on("resize load", l);
    f.on("slid.bs.carousel", function(a) {
        a = b(a.target).find(".carousel-item.active .mbr-background-video");
        0 < a.length && (a = h[+a.attr("data-video-num")], a.playVideo ? a.playVideo() : a.play());
        l()
    });
    f.on("hide.bs.modal", function(a) {
        h.map(function(a,
            b) {
            a.pauseVideo ? a.pauseVideo() : a.pause()
        })
    })
})(jQuery);