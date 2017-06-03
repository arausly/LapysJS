/* Navigation */
    // Header Navigation Panel
        // Children
            if (get.html("#nav", 0)) {
                // Specification
                nav.home.href = "../index.html"
                nav.download.href = "download.html"
                nav.css.href = "css.html"
                nav.javascript.href = "javascript.html"
                nav.components.href = ""
                nav.documentation.href = "documentation.html"
                nav.themes.href = "themes.html"
            }

    // Footer
        // Children
            // Extra Options
                // Updates
                setTimeout(function() {
                    extra.updates.href = "../pages/updates.html"
                })            

/* Icons */
    // Definition
        // Icon Frame Container
        var iconFrame = get.html(".icon-frame")

        // Icon Frames
        var icon = get.html(".icon", "_array")

    // Insertion
        // Icon Frame Container
        get.html('.icon-frame').insertAdjacentHTML(
            'afterend',
            '<div class="c-aqua flt-r m-r-5" onclick= "showIcons()" style="cursor: pointer"> <small> View more&hellip; </small> </div>'
        )

        // Expand Icon Frame
        function showIcons() {
            del.html(get.html('[onclick]'))

            get.html(".icon-frame").style.height = get.html(".icon-frame").scrollHeight + "px"
        }

        // Icon Frames
        for (i = 0; i < get.html(".icon", "_array").length; i++) {
            get.html('.icon', i).insertAdjacentHTML(
                'beforebegin',
                '<textarea class="pos-fix" data-index="' + i +  '" style="bottom: -1000px">' +
                    '<span class="' + get.html('.icon [class*="icn-"]', i).className + '"> </span>' +
                '</textarea>'
            )

            set.attr(
                get.html(".icon", i),
                "data-index",
                i
            )

            // Add the events
            get.html('.icon', i).onclick = function() {
                get.html('textarea.pos-fix[data-index="' + get.attr(this,"data-index") + '"]').select()

                document.execCommand('copy')

                get.html('textarea.pos-fix[data-index="' + get.attr(this,"data-index") + '"]').blur()
            }
        }