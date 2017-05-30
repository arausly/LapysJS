/* Navigation */
    // Header Navigation Panel
        // Children
            if (get.html("#nav", 0)) {
                // Specification
                nav.home.href = ""
                nav.download.href = "pages/download.html"
                nav.css.href = "pages/css.html"
                nav.javascript.href = "pages/javascript.html"
                nav.components.href = "pages/components.html"
                nav.documentation.href = "pages/documentation.html"
                nav.themes.href = "pages/themes.html"
            }

/* Trailer */
    // Play Button
        // Definition
        var playBtn = get.html("#playBtn")

        // Modification
        if (
            get.css("animation-duration", playBtn).indexOf("ms") <= -1 ||
            get.css("animation-duration", playBtn).indexOf("s") <= -1
        )
            playBtn.style.animationDuration = 0

        // Function
            // Add the events
            set.event(playBtn, "click", deletePlayBtn)
            set.event(get.html("#vid"), "play", deletePlayBtn)

                // Delete the play button
                function deletePlayBtn() {
                    // Delete the play button after a time.
                    setTimeout(
                        function() {
                            del.html(playBtn)
                        },

                        (function() {
                            if (get.css("animation-duration", playBtn).indexOf("ms") <= -1)
                                return parseFloat(get.css("animation-duration", playBtn).replace("s", "")) * 1000
                            else
                                return get.css("animation-duration", playBtn).replace("ms", "")
                        })()
                    )

                    // Play the video
                    get.html("#vid").play()
                }

/* Updates */
    // Styling
        // Toggle the notification animation every 1 minute.
            // Initialization
            var notifyBin = false

            // Definition
            var notifyAnimation

            function notifyAnimationInterval() {
                notifyAnimation = setInterval(function() {
                    // On Notification Animation
                    if (!notifyBin)
                        css.style(
                            "notifierAnimation",
                            
                            "", "",

                            "@keyframes notify {" +
                                "25% { " +
                                    "bottom: 20px; " +
                                    "box-shadow: 0 0 0 1.25px rgba(255, 255, 255, .3), " +
                                                            "0 0 0 5px rgba(0, 0, 0, .3), " +
                                                            "0 0 0 2.5px rgba(255, 255, 255, .3) " +
                                "} " +
                    
                                "50% { " +
                                    "bottom: 10px " +
                                "} " +

                                "66.67% { " +
                                    "bottom: 1.25px " +
                                "} " +
                 
                                "75% { " +
                                    "bottom: 5px " +
                                "} " +

                                "82.5% { " +
                                    "bottom: 2.5px " +
                                "} " +
                            "}"
                        )
                    
                    // Off Notification Animation
                    else
                        del.style("notifierAnimation")

                    // Toggle
                    notifyBin = !notifyBin
                }, 30000)
            }
            notifyAnimationInterval()

    // Modification
        /*
            Show the notification/ update message
            when the notifier is hovered or tapped on.
        */
            // Initialization
                // Updates
                var updates = get.html("#updates")
                    // Notifier
                    var notifier = get.html("#notifier"),
                        notifierOnce = false

            // Events
                // Show Message
                set.event(updates, "mouseover", showMessage)
                set.event(notifier, "mouseenter", showMessage)

                // Hide Message
                set.event(notifier, "mouseleave", hideMessage)

            // Functions
                // Show Message
                function showMessage() {
                    // Styling
                        // Updates
                            // Re-style the Updates
                            updates.style.borderWidth = 0
                            updates.style.overflow = "hidden"

                            // Notifier
                                // Remove the Notifier's Animation Interval
                                clearInterval(notifyAnimation)

                                notifyAnimation = undefined

                                // Remove the Notifier's Animation
                                del.style("notifierAnimation")

                                // Re-style the Notifier
                                notifier.style = (
                                    "border-radius: 0; " +
                                    "bottom: 0; " + 
                                    "box-shadow: 0 0 10px 0 rgba(0, 0, 0, .45); " +
                                    "cursor: default; " +
                                    "height: " + get.css("font-size", notifier).replace("px", "") + "px; " +
                                    "left: 0; " +
                                    "padding: 7.5px; " +
                                    "position: relative; " + 
                                    "text-align: center; " +
                                    "width: 100%"
                                )

                                // Content of the Message
                                if (!notifierOnce) {
                                    css.style(
                                        'notifier',
                                        '#notifier::after',

                                        'animation: fadeIn .75s; ' +
                                        'content: " LapysJS is now up and running! "; ' +
                                        'cursor: pointer; ' +
                                        'pointer-events: all !important'
                                    )

                                    notifierOnce = true
                                }
                }

                // Hide Message
                function hideMessage() {
                    // Styling
                        // Updates
                            // Re-style the Updates
                            updates.style.borderWidth = "1px"
                            del.inlineStyle(updates, "overflow")

                            // Notifier
                                // Replay the Notifier's Animation Interval
                                notifyAnimationInterval()

                                // Re-style the Notifier
                                del.attr(notifier, "style")

                                // Content of the Message
                                if (notifierOnce) {
                                    del.style('notifier')

                                    notifierOnce = false
                                }
                }