/* Description JS
        --- NOTE ---
            This module is meant for describing
            sections of the page.
*/
    // Document
    document.html.description += "Landing Page"
    // Logo
    get.html("#logo", 0).description = "Lapys JS Icon"

/* Navigation JS */
    // Hide the "Home" navigation item
        get.html("#nav > .nav-home", 0).classList.value += " d-none"

    // Alternate the hyperlink destination path for the HTML document
        del.attr(get.html("#nav > .nav-home", 0), "href")
        attr(get.html("#nav > .nav-download", 0), "href", "html/download.html")
        attr(get.html("#nav > .nav-documentation", 0), "href", "html/documentation.html")
        attr(get.html("#nav > .nav-components", 0), "href", "html/components.html")
        attr(get.html("#nav > .nav-class-sets", 0), "href", "html/class-sets.html")
        attr(get.html("#nav > .nav-javascript", 0), "href", "html/js.html")
        attr(get.html("#nav > .nav-themes", 0), "href", "html/themes.html")

    // Alternate the "updates" link anchor path
        for (i = 0; i < get.html('#notify + * + #notify-level > [class*="level-"]').length; i++)
            attr(get.html('#notify + * + #notify-level > [class*="level-"]', i), "href", "html/updates.html")

    // Navigation & Navigation Tab Sync
        // Insert a navigation tab right at the beginning of the main content.
        get.html("article#main", 0).insertAdjacentHTML('afterbegin', 
            '<!-- Navigation Tab -->' +
            '<nav class="bx-s-2 col-grp ovfw-h section w-90" id="navTb"> </nav>')
    
        // Navigation Link Items
        var navLink = get.html("#nav > a"),
        // Navigation Panel
            navTb = get.html("#navTb", 0)

        /* --- NOTE ---
                If the link items are not present,
                    add alternative markup to the navigation panel.
        */
            if (get.html("#nav > a") == undefined)
                get.html("#navTb", 0).innerHTML = " Please turn on Javascript. "

        // Add a new list item for each item
            for (i = 0; i < navLink.length; i++)
                navTb.innerHTML += "<a>" + navLink[i].childNodes[1].innerHTML  + "</a>"

        // Catch the list items and configure the correct hyperlink paths
        var navTbs = get.html("#navTb > a")
            for (i = 0; i < navTbs.length; i++)                
                if (navLink[i].hasAttribute("href"))
                    navTbs[i].setAttribute("href", navLink[i].getAttribute("href"))

    // Set the navigation
    toggleNavItemDisplay()
        
/* Trailer JS */
setTimeout(function() {
    var bin1 = false,
        playable = false

        // Events
            // Play Button Events
            addEvent(get.html("#trailerPlayButton", 0), "click", playTrailer)
            // Console Play Button Event
            addEvent(get.html("#trailer div > nav > [data-vid-play]", 0), "click", togglePlayButton)
            // Video Event
            addEvent(get.html("#trailerVid", 0), "click", playTrailerToggle)
            addEvent(get.html("#trailerVid", 0), "playing", playTrailer)

        // De-activate the video if it hasn't been played
        function untouchTrailer() {
            if (!playable)
                get.html("#trailerVid", 0).style.pointerEvents = "none"
            else 
                get.html("#trailerVid", 0).style.pointerEvents = "all"
        }
        untouchTrailer()
        setInterval(untouchTrailer, 500)

        // Play the Trailer
        function playTrailer() {
            // Hide the big play button
            get.html("#trailerPlayButton", 0).style.opacity = "0"
            get.html("#trailerPlayButton", 0).style.pointerEvents = "none"

            // Set the boolean values
            bin = true
            bin1 = false
            playable = true

            // Change the state of the console play button
            togglePlayButton()

            get.html("#trailerVid", 0).play()
        }

        function playTrailerToggle() {
            // Play the video
            if (playable && !bin) {
                togglePlayButton()
                playTrailer()
            }
            // Pause the video
            else {
                togglePlayButton()
                this.pause()
            }

            bin = !bin
        }

        /* Change the Console Play Button State */
        function togglePlayButton() {
            /* --- NOTE ---
                    There are also focused states but
                    that it done via CSS.
            */
            // Pause Button State
            if (!bin1)
                attr(get.html("#trailer div > nav > [data-vid-play]", 0), "style", "" +
                    "background: transparent; " +
                    "background-attachment: scroll; " +
                    "background-image: url(assets/img/png/icons/pause.png); " +
                    "background-position: center; " +
                    "background-repeat: no-repeat; " +
                    "background-size: 100%; " +
                    "border: 0 !important; " +
                    "flex-basis: 15px; " +
                    "height: 15px !important; " +
                    "top: 9px; " +
                    "width: 15px !important")

            // Play Button State
            else
                del.attr(get.html("#trailer div > nav > [data-vid-play]", 0), "style")

            bin1 = !bin1
        }

        /* Change the Console Volume Button State */
        get.html("#trailer div > nav > [data-vid-vol]", 0).onclick = function() {
            if (!bin1)
                this.style.backgroundImage = "url(assets/img/png/icons/speaker-mute.png)"
            else
                del.attr(this, "style")

            bin1 = !bin1
        }
}, 200)

/* Download JS
        --- NOTE ---
            Once the "Default Download" option is selected,
            not only will it download the framework but transfer the user
            to another page (a "Thank You" page).
*/
get.html("#defaultDownload", 0).onclick = function() {
    goTo("html/downloaded.html")
}