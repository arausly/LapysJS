/* Strict Mode */
"use strict";

/* Lapys Object
        --- NOTE ---
            Used for referencing data used
            within functions
*/
var lapys

/* LapysJS Object */
var LapysJS = {
    // Author
    author : "Lapys Dev Team",

    // Execution
    executed : false,

    // Script Element
    js :
        document.querySelectorAll('script[src*="lapys.js"]')[0] ||
        document.querySelectorAll('script[src*="lapys.min.js"]')[0],

    // Script Element "src" Attribute
    jsURL :
        document.querySelectorAll('script[src*="lapys.js"]')[0].getAttribute("src").toString() ||
        document.querySelectorAll('script[src*="lapys.min.js"]')[0].getAttribute("src").toString(),

    // Execution Time
    lastExecuted : "Last executed on: " + Date(),

    // Name (Title)
    name : "LapysJS",
 
    // Strict Mode
    strictMode : (function() {
        return !this
    })(),

    // Version
    version : (function() {
        /* Initialization
                --- NOTE ---
                    The value is based on the number of updates made recently.
        */
        var versionNumber = 4,

        // Placeholder
        secondaryVersionNumber = 0,
        primaryVersionNumber = 0

        // Modification
        for (var i = 0; i < versionNumber; i++) {
            if (versionNumber > 9) {
                // Reset the version number
                versionNumber -= 10

                // Increment the secondary version number
                secondaryVersionNumber += 1
            }

            if (secondaryVersionNumber > 9) {
                // Reset the version number
                secondaryVersionNumber -= 10
                
                // Increment the secondary version number
                primaryVersionNumber += 1
            }
        }

        // Print
        return primaryVersionNumber + "." + secondaryVersionNumber + "." + versionNumber
    })()
}

/* Global Object Test */
if (
    window &&
    this == window &&
    !LapysJS.executed
) {
    /* Syntax */
        // Create Element
        var create = (element) => {
            return document.createElement(element)
        },

        // CSS Functions
        css = {
            // Create <link>
            add : (href, media, rel, type) => {
                // Append the <link> element within the <head> element.
                document.getElementsByTagName("head")[0].innerHTML += (
                    '<link href="' + href + '" media="' + media + '" rel="' + rel + '" type="' + type + '">')
            },
            
            // Create <style>
            style : (dataKey, selector, property, atRule) => {
                // Create a new <style> element.
                var cssStyle = document.createElement("style")
                
                // Uniquely identify the <style> element.
                cssStyle.setAttribute("data-key", dataKey)
                
                // Append the element into the <head> element.
                document.getElementsByTagName("head")[0].appendChild(cssStyle)
                
                // The option for CSS at-rules is given here.
                if (atRule == undefined)
                    cssStyle.innerHTML += "\n" + selector + " { " + property + " }"
                else
                    cssStyle.innerHTML += "\n" + selector + " { " + property + " } " + atRule
            }
        },

        // Delete Functions
        del = {
            // Delete Attribute
            attr : (element, attribute) => {
                return element.removeAttribute(attribute)
            },
            
            // Delete Element Class
            class : (element, className) => {
                if (element.className == "") {
                    // Do nothing…
                } else {
                    // Index all the element's class values
                    for (i = 0; i < element.classList.length; i++)
                        // If a match is found, remove the class given
                        if (className == element.classList[i])
                            element.classList.value = element.classList.value.replace(className, "")

                    // If there are only two classes, remove all white-spaces
                    if (element.classList[1] == undefined)
                        element.classList.value = element.classList.value.replace(/ /g, "")

                    // If there is white-space before any class value, remove it
                    if (element.classList.value.indexOf(" ") == 0)
                        element.classList.value = element.classList.value.replace(" ", "")                    
                }
            },

            // Delete event
            event : (element, event, func) => {
                return element.removeEventListener(event, func)
            },

            // Delete <link>
            link : (href, media, rel, type) => {
                if (document.querySelectorAll('link[href="' + href + '"][media="' + media + '"][rel="' + rel + '"]')[0])
                    // If the "type" attribute is specified
                    if (type != undefined)
                        document.getElementsByTagName("head")[0].removeChild(
                            document.querySelectorAll('link[href="' + href + '"][media="' + media + '"][rel="' + rel + '"][type="' + type + '"]')[0]
                        )
                    
                    else
                        document.getElementsByTagName("head")[0].removeChild(
                            document.querySelectorAll('link[href="' + href + '"][media="' + media + '"][rel="' + rel + '"]')[0]
                        )
            },
            
            // Delete HTML
            html : (element, index) => {
                if (index == undefined)
                    if (element)
                        return element.parentNode.removeChild(element)
                    else {
                        // Do nothing…
                    }

                else
                    if (element[index])
                        return element[index].parentNode.removeChild(element[index])
            },

            // Delete inline CSS
            inlineStyle : (element, style) => {
                // If the element has the "style" attribute.
                if (element.hasAttribute("style"))
                    // Replace the CSS style and its value with "''".
                    element.style = element.getAttribute("style").replace(
                        // Collect the CSS style and its value.
                        element.getAttribute("style").slice(
                            // The first instance of the style.
                                // property
                                element.getAttribute("style").indexOf(style),
                            
                            // The length of the style and its value.
                                // property: value
                                (function() {
                                    if (element.getAttribute("style").indexOf(style + ": " + window.getComputedStyle(element)[style]) >= 0)
                                        return (element.getAttribute("style").indexOf(style) + (style + ": " + window.getComputedStyle(element)[style]).toString().length)
                                    
                                    else if (element.getAttribute("style").indexOf(style + ":" + window.getComputedStyle(element)[style]) >= 0)
                                        return (element.getAttribute("style").indexOf(style) + (style + ":" + window.getComputedStyle(element)[style]).toString().length)

                                    else if (element.getAttribute("style").indexOf(style + " :" + window.getComputedStyle(element)[style]) >= 0)
                                        return (element.getAttribute("style").indexOf(style) + (style + " :" + window.getComputedStyle(element)[style]).toString().length)

                                    else
                                        return 0
                                })() +

                                // value;
                                (function() {
                                    if (element.getAttribute("style").indexOf(window.getComputedStyle(element)[style] + "; ") >= 0)
                                        return (element.getAttribute("style").indexOf(style) + "; ".length)
                                    
                                    else if (element.getAttribute("style").indexOf(window.getComputedStyle(element)[style] + " ;") >= 0)
                                        return (element.getAttribute("style").indexOf(style) + " ;".length)

                                    else if (element.getAttribute("style").indexOf(window.getComputedStyle(element)[style] + ";") >= 0)
                                        return (element.getAttribute("style").indexOf(style) + ";".length)

                                    else
                                        return 0
                                })()
                        ),
                        ""
                    )

                // Remove the "style" attribute if it becomes "empty".
                if (element.getAttribute("style") == "")
                    element.removeAttribute("style")
            },

            // Delete <style>
            style : (dataKey) => {
                if (document.querySelectorAll('style[data-key="' + dataKey + '"]')[0])
                    document.querySelectorAll('style[data-key="' + dataKey + '"]')[0].parentNode.removeChild(
                        document.querySelectorAll('style[data-key="' + dataKey + '"]')[0]
                    )
            }
        },

        // Directory
        dir = {
            // Complete URL
            fullPath : location.href,

            // URL
            path : location.pathName,

            // Port
            port : location.port,

            // Protocol
            protocol : location.protocol
        },
        
        // Files
        file = {
            // Close Files
            close : (directory) => {
                var file = new File(directory)

                // Open the file
                file.close()
            },

            // Content Type
            contentType : document.contentType,

            // Domain
            domain : document.domain,

            // Embed
            embeds : document.embeds,

            // Input Encoding
            inputEncoding : document.inputEncoding,

            // Last Modified
            lastModified : document.lastModified,

            // Name
            name : location.href.slice(location.href.lastIndexOf("/") + 1),

            // Open Files
            open : (directory) => {
                var file = new File(directory)

                // Open the file
                file.open()
            },

            // Plug-ins
            plugIns : document.plugins,

            // Read files
            read : (directory) => {
                var file = new File(directory)

                // Open the file with "Read" access
                file.open("r")
                
                // Parse the file content into the "content" variable
                var content = ""
                    // Read each line of content
                    while (!file.eof)
                        content += file.readIn() + "\n"
                
                // Close the file
                file.close()

                return content
            },

            // Ready
            ready : document.readyState,

            // Scripts
            scripts : document.scripts,

            // Stylesheets
            stylesheets : document.styleSheets,

            // Type
            type : (function() {
                var fileType = location.href.slice(location.href.lastIndexOf("/") + 1)

                return fileType.slice(fileType.indexOf(".") + 1)
            })(),

            // Visibility
            visibility : document.visibilityState,

            // Write files
            write : (directory, content) => {
                var file = new File(directory)

                // Open the file via "Write" access
                file.open("w")
                
                // Write into the file
                file.writeIn(content)
                
                // Close the file
                file.close()
            },

            // XML
            XML : {
                // Encoding
                encoding : document.xmlEncoding,

                // Stand Alone
                standAlone : document.xmlStandalone,

                // Version
                version : document.xmlVersion
            },

            // XML Encoding
            XMLEncoding : document.xmlEncoding
        },

        // insertAfter Function
        insertAfter = (element, nextSibling) => {
            /* --- NOTE ---
                    The "nextSibling" has to defined in the DOM
                        before it can be placed after the "element".
            */
            nextSibling.parentNode.insertBefore(element, nextSibling)

            return nextSibling.parentNode.insertBefore(nextSibling, element)
        },

        // insertBefore Function
        insertBefore = (element, previousSibling) => {
            return previousSibling.parentNode.insertBefore(element, previousSibling)
        },

        // Get Functions
        get = {
            // Get Attribute
            attr : (element, attribute, index) => {
                if (index == undefined)
                    return element.getAttribute(attribute)

                else
                    return element[index].getAttribute(attribute)
            },

            // Get Class Attribute
            class : (element, index) => {
                if (index == undefined)
                    return element.classList

                else
                    return element[index].classList
            },

            // Get CSS
            css : (property, element, index) => {
                if (index == undefined)
                    return window.getComputedStyle(element).getPropertyValue(property)

                else
                    return window.getComputedStyle(element[index]).getPropertyValue(property)
            },

            // Get HTML
            html : (element, index) => {
                if (index == undefined)
                    if (!document.querySelectorAll(element)[1])
                        return document.querySelectorAll(element)[0]
                    else
                        return document.querySelectorAll(element)

                else if (index == "_array")
                    return document.querySelectorAll(element)

                else
                    return document.querySelectorAll(element)[index]
            }
        },

        // Assign Directory
        goTo = (directory) => {
            return location.assign(directory)
        },

        // Javascript Function
        js = {
            // Link <script>
            add : (src, type, sync) => {
                // Append the <script> element within the <body> element.
                if (sync == undefined)
                    document.getElementsByTagName("body")[0].innerHTML += (
                        '<script src="' + src + '" type="' + type + '"> </script>')
                else
                    document.getElementsByTagName("body")[0].innerHTML += (
                        '<script ' + sync + ' src="' + src + '" type="' + type + '"> </script>')
            },

            // Create <script>
            script : (dataKey, code) => {
                // Create a new <script> element.
                var jsScript = document.createElement("script")
                
                // Uniquely identify the <script> element.
                jsScript.setAttribute("data-key", dataKey)
                
                // Append the element into the <body> element.
                document.getElementsByTagName("body")[0].appendChild(jsScript)
                
                // Append the Javascript code into the <script> element.
                jsScript.innerHTML += "\n" + code + "\n"
            }
        },

        // Log Object
        log = (object) => {
            return console.log(object)
        },

        // Boolean Conversion
        parseBool = (object) => {
            if (object)
                return true
           
            else
                return false
        },

        /* Indexing Order
            --- NOTE ---
                Useful for position prefix.

            --- UPDATE REQUIRED ---
                Code needs clean-up here.
        */
        parseIndex = (object) => {
            if (object.toString().indexOf("1") == 0 &&
                object.toString()[1] != undefined &&
                object.toString()[1] != "0")
                return object + "th"

            else if (object.toString().lastIndexOf("1") == (object.toString().length - 1))
                return object + "st"
            
            else if (object.toString().lastIndexOf("2") == (object.toString().length - 1))
                return object + "nd"
            
            else if (object.toString().lastIndexOf("3") == (object.toString().length - 1))
                return object + "rd"
            
            else
                return object + "th"
        },

        /* Stringify Object
            --- NOTE ---
                Converts HTML elements to text format
                using UTF-8 character encoding.
        */
        parseString = (object) => {
            if (object[0] != undefined)
                if (object[0].tagName !== "ELEMENT")
                    return object.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")
                else
                    return console.warn("%c Object data not found.", "font-family: 'Calibri Light'")

            else
                return object.toString()
        },

        // Reload Document Function
        refresh = () => {
            return location.reload()
        },

        // Set Functions
        set = {
            // Set Attribute
            attr : (element, attribute, value) => {
                /* --- NOTE ---
                        If
                            no value is given, append an empty value ("") to fulfill
                            both arguments of the setAttribute() function.
                */
                if (value == undefined)
                    return element.setAttribute(attribute, "")

                else
                    return element.setAttribute(attribute, value)
            },

            // Set Class Attribute
            class : (element, value) => {
                /* --- NOTE ---
                        If
                            there is no class for the element,
                            append the given value directly
                        else
                            add white-space before appending
                            the given value.
                */
                if (element.className == "")
                    return element.classList.value = value

                else
                    return element.classList.value += " " + value
            },
            
            // Set Event
            event : (element, event, func) => {
                return element.addEventListener(event, func)
            }
        },

        // Reload Javascript Function
        scriptReload = (element) => {
            if (element == undefined)
                // For every <script> element.
                for (var i = document.getElementsByTagName("script").length - 1; i >= 0; i--)
                    // Re-append them into the <body> tag
                    document.getElementsByTagName("body")[0].appendChild(
                        document.getElementsByTagName("script")[i]
                    )

            else
                element.parentNode.insertBefore(element, element)
        },

        // Write Object
        write = (object) => {
            return document.write(object)
        }

        // Directory
            // File Parent URL
            if (location.href.indexOf(".") >= 0)
                dir.path = location.href.slice(0, (location.href.lastIndexOf("/")))

    /* Document */
        // Modification
        window.name = document.getElementsByTagName("title")[0].textContent

    /* Objects */
        // Document
        document.html = (document.getElementsByTagName("html")[0] || document.body.parentNode || document.head.parentNode)

        // Boolean
        var bin = false
        
        // Application
        var app = {
            // Application Cache
            cache : window.applicationCache,

            // Application Code Name
            codeName : window.navigator.appCodeName,

            // Application Design Mode
            designMode : document.designMode,

            // Application Hardware Currency
            hardwareCurrency : window.navigator.hardwareCurrency,

            // Application Language
            language : window.navigator.language,

            // Application MIME Types
            mimeTypes : window.navigator.mimeTypes,

            // Application Name
            name : window.navigator.appName,

            // Application Platform
            platform : window.navigator.platform,

            // Application Product
            product : window.navigator.product,

            // Application Service Worker
            serviceWorker : window.navigator.serviceWorker,

            // Application User Agent
            userAgent : window.navigator.userAgent,

            // Application Version
            version : window.navigator.appVersion
        }

        // Browser
        var browser = {
            // Browser Cache
            appCache : window.applicationCache,

            // Is Chrome?
            chrome : false,

            // Browser Client Information
            clientInfo : window.clientInformation,

            // Is Browser Cookies?
            cookies : window.navigator.cookieEnabled,

            // Is Edge?
            edge : false,

            // Is Internet Explorer?
            IE : false,

            // Is Mozila?
            mozila : false,

            // Browser Navigator
            navigator : window.navigator,

            // Is Online?
            online : window.navigator.onLine,

            // Is Opera?
            opera : false,

            // Browser Plug-ins
            plugin : window.navigator.plugins,

            // Is Safari?
            safari : false,

            // Browser Vendor Type
            type : undefined,

            // Browser Vendor
            vendor : window.navigator.vendor
        }
            // Opera 8.0+
            if ((!!window.opr && !!opr.addons) ||
                !!window.opera ||
                navigator.userAgent.indexOf("OPR/") >= 0) {
                browser.opera = true
                browser.type = "Opera 8.0+"
            }

            // Mozila Firefox 1.0+
            if (typeof InstallTrigger !== "undefined") {
                browser.mozila = true
                browser.type = "Firefox 1.0+"
            }
            
            // Safari 3.0+
            if (/constructor/i.test(window.HTMLElement) ||
                (function(p) { return p.toString() === "[object SafariRemoteNotification]" })(!window["safari"] || safari.pushNotification)) {
                browser.safari = true
                browser.type = "Safari 3.0+"
            }
            
            // Internet Explorer 6-11
            if ( /*@cc_on!@*/ false ||
                !!document.documentMode) {
                browser.IE = true
                browser.type = "Internet Explorer 6-11"
            }
            
            // Microsoft Edge 20+
            if (!( /*@cc_on!@*/ false || !!document.documentMode) &&
                !window.StyleMedia) {
                browser.edge = true
                browser.type = "Edge 20+"
            }
            
            // Google Chrome 1+
            if (!!window.chrome &&
                !!window.chrome.webstore) {
                browser.chrome = true
                browser.type = "Chrome 1+"
            }

        // HTML Document Type
        var HTMLDoctype = (
                '<!DOCTYPE ' +
                    (document.doctype.name) +
                    (document.doctype.publicId ? ' PUBLIC "' + document.doctype.publicId + '"' : '') +
                    (!document.doctype.publicId && document.doctype.systemId ? ' SYSTEM' : '')  +
                    (document.doctype.systemId ? ' "' + document.doctype.systemId + '"' : '') +
                '>'
        )

        // Time Interval Counter
        var count = 0
        
        // Loop Counters
        var i, j, k

        // Device
        var device = {
            availLeft : window.screen.availLeft,
            availHeight : window.screen.availHeight,
            availTop : window.screen.availTop,
            availWidth : window.screen.availWidth,
            colorDepth : window.screen.colorDepth,
            height : window.screen.height,
            pixelRatio : window.devicePixelRatio,
            screenAngle : window.screen.orientation.angle,
            screenOrientation : window.screen.orientation.type,
            styleMedia : window.styleMedia,
            width : window.screen.width
        }

        // Operating System
        var OS = {
            mac : false,
            linux : false,
            type : undefined,
            unix : false,
            windows : false
        }

            if (navigator.appVersion.indexOf("Win") >= 0) {
                OS.windows = true
                OS.type = "Windows"
            }

            if (navigator.appVersion.indexOf("Mac") >= 0) {
                OS.mac = true
                OS.type = "Mac"
            }

            if (navigator.appVersion.indexOf("X11") >= 0) {
                OS.unix = true
                OS.type = "Unix"
            }

            if (navigator.appVersion.indexOf("Linux") >= 0) {
                OS.linux = true
                OS.type = "Linux"
            }
        
        // Random Number (within 1 and 10)
        var rand = Math.random() * 10
        
        // Date & Time
        var date = {
            dyIndex: new Date().getDate(),
            fullDate: Date(),
            hr: new Date().getHours(),
            min: new Date().getMinutes(),
            mthIndex: new Date().getMonth() + 1,
            sec: new Date().getSeconds(),
            yr: new Date().getFullYear()
        }
            // date.dy
            if (Date().indexOf("Sun") >= 0)
                date.dy = "Sunday"
            if (Date().indexOf("Mon") >= 0)
                date.dy = "Monday"
            if (Date().indexOf("Tue") >= 0)
                date.dy = "Tuesday"
            if (Date().indexOf("Wed") >= 0)
                date.dy = "Wednesday"
            if (Date().indexOf("Thu") >= 0)
                date.dy = "Thursday"
            if (Date().indexOf("Fri") >= 0)
                date.dy = "Friday"
            if (Date().indexOf("Sat") >= 0)
                date.dy = "Saturday"
        
            // date.mth
            if (Date().indexOf("Jan") >= 0)
                date.mth = "January"
            if (Date().indexOf("Feb") >= 0)
                date.mth = "February"
            if (Date().indexOf("Mar") >= 0)
                date.mth = "March"
            if (Date().indexOf("Apr") >= 0)
                date.mth = "April"
            if (Date().indexOf("May") >= 0)
                date.mth = "May"
            if (Date().indexOf("Jun") >= 0)
                date.mth = "June"
            if (Date().indexOf("Jul") >= 0)
                date.mth = "July"
            if (Date().indexOf("Aug") >= 0)
                date.mth = "August"
            if (Date().indexOf("Sep") >= 0)
                date.mth = "September"
            if (Date().indexOf("Oct") >= 0)
                date.mth = "October"
            if (Date().indexOf("Nov") >= 0)
                date.mth = "November"
            if (Date().indexOf("Dec") >= 0)
                date.mth = "December"
        

            // The "date" object can be updated continuously if chosen
            if (false) {
                setInterval(function() {
                    if (Date().indexOf("Sun") >= 0)
                        date.dy = "Sunday"
                    if (Date().indexOf("Mon") >= 0)
                        date.dy = "Monday"
                    if (Date().indexOf("Tue") >= 0)
                        date.dy = "Tuesday"
                    if (Date().indexOf("Wed") >= 0)
                        date.dy = "Wednesday"
                    if (Date().indexOf("Thu") >= 0)
                        date.dy = "Thursday"
                    if (Date().indexOf("Fri") >= 0)
                        date.dy = "Friday"
                    if (Date().indexOf("Sat") >= 0)
                        date.dy = "Saturday"
        
                    date.dyIndex = new Date().getDate()
        
                    date.fullDate = Date()
        
                    date.hr = new Date().getHours()
        
                    date.min = new Date().getMinutes()
        
                    if (Date().indexOf("Jan") >= 0)
                        date.mth = "January"
                    if (Date().indexOf("Feb") >= 0)
                        date.mth = "February"
                    if (Date().indexOf("Mar") >= 0)
                        date.mth = "March"
                    if (Date().indexOf("Apr") >= 0)
                        date.mth = "April"
                    if (Date().indexOf("May") >= 0)
                        date.mth = "May"
                    if (Date().indexOf("Jun") >= 0)
                        date.mth = "June"
                    if (Date().indexOf("Jul") >= 0)
                        date.mth = "July"
                    if (Date().indexOf("Aug") >= 0)
                        date.mth = "August"
                    if (Date().indexOf("Sep") >= 0)
                        date.mth = "September"
                    if (Date().indexOf("Oct") >= 0)
                        date.mth = "October"
                    if (Date().indexOf("Nov") >= 0)
                        date.mth = "November"
                    if (Date().indexOf("Dec") >= 0)
                        date.mth = "December"
        
                    date.mthIndex = new Date().getMonth() + 1
        
                    date.sec = new Date().getSeconds()
        
                    date.yr = new Date().getFullYear()
                }, 1)
            }

(function() {
    /* HTML Elements */
        // Initialization
            // <abbr> 
            var abbr = document.querySelectorAll("abbr"),
            
            // *
            all = document.querySelectorAll("*"),
            
            // <body> 
            body = document.getElementsByTagName("body")[0] || document.body,
            
            // <br>
            br = document.getElementsByTagName("br"),
            
            // <head> 
            head = document.getElementsByTagName("head")[0] || document.head,
            
            // <html> 
            html = document.getElementsByTagName("html")[0],
            
            // <lorem>
            lorem = document.getElementsByTagName("lorem"),
            
            // <main> 
            main = document.getElementsByTagName("main")[0],
            
            // <time>
            time = document.getElementsByTagName("time")
        
        // Special Elements
            // <lorem>
                // Dummy Text Level 1
                if (rand <= 2.5)
                    var loremHTMLLevel1 = "This string has thirty-nine characters"

                else if (rand <= 5)
                    var loremHTMLLevel1 = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
                
                else if (rand <= 7.5)
                    var loremHTMLLevel1 = "Li Europan lingues es membres del sam familie."
                
                else
                    var loremHTMLLevel1 = "The quick, brown fox jumps over a lazy dog."
                
                // Dummy Text Level 2
                if (rand <= 2.5)
                    var loremHTMLLevel2 = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."
                
                else if (rand <= 5)
                    var loremHTMLLevel2 = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
                
                else if (rand <= 7.5)
                    var loremHTMLLevel2 = "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular."
                
                else
                    var loremHTMLLevel2 = "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog."
                
                // Dummy Text Level 3
                if (rand <= 2.5)
                    var loremHTMLLevel3 = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia."
                
                else if (rand <= 5)
                    var loremHTMLLevel3 = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim."
                
                else if (rand <= 7.5)
                    var loremHTMLLevel3 = "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores."
                
                else
                    var loremHTMLLevel3 = "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim."
                
                // Dummy Text Level 4
                if (rand <= 2.5)
                    var loremHTMLLevel4 = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar."
                
                else if (rand <= 5)
                    var loremHTMLLevel4 = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim."
                
                else if (rand <= 7.5)
                    var loremHTMLLevel4 = "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues."
                
                else
                    var loremHTMLLevel4 = "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! " + '"Now fax quiz Jack!"' + " my brave ghost pled. Five quacking zephyrs jolt my wax bed."
                
                // Dummy Text Level 5
                if (rand <= 2.5)
                    var loremHTMLLevel5 = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of  Alphabet Village and the sublime of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then …"
                
                else if (rand <= 5)
                    var loremHTMLLevel5 = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, …"
                
                else if (rand <= 7.5)
                    var loremHTMLLevel5 = "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronuncion e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles."
                
                else
                    var loremHTMLLevel5 = "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! " + '"Now fax quiz Jack!"' + " my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard’s job is to vex chumps quickly in fog. Watch " + '"Jeopardy!"' + ", Alex Trebek's fun TV quiz game. Woven silk pyjamas exchanged for blue quartz. Brawny gods just …"

                // Print
                for (i = 0; i < lorem.length; i++) {
                    if (lorem[i].hasAttribute("1"))
                        lorem[i].innerHTML = loremHTMLLevel1

                    if (lorem[i].hasAttribute("2"))
                        lorem[i].innerHTML = loremHTMLLevel2
                    
                    if (lorem[i].hasAttribute("3"))
                        lorem[i].innerHTML = loremHTMLLevel3
                    
                    if (lorem[i].hasAttribute("4"))
                        lorem[i].innerHTML = loremHTMLLevel4
                    
                    if (lorem[i].hasAttribute("5"))
                        lorem[i].innerHTML = loremHTMLLevel5
                }
        
        /* Alternated Elements
                --- NOTE ---
                    Set a timeout for Javascript coded
                    alternated elements.
        */
            setTimeout(function() {
                // <br>
                    // Index all <br>
                    for (i = 0; i < br.length; i++) {
                        // Initialization
                            // If <br> has an attribute of 2
                            if (br[i].hasAttribute("2"))
                                br[i].insertAdjacentHTML("afterend", " <br>")

                            // If <br> has an attribute of 3
                            if (br[i].hasAttribute("3")) {
                                br[i].insertAdjacentHTML("afterend", " <br>")
                                br[i].insertAdjacentHTML("afterend", " <br>")
                            }
                    }

                // <html>
                html.charset = document.charset
                html.CSSCompatibility = document.compatMode

                if (html.lang == "")
                    html.lang = (window.navigator.languages).toString()

                // <time> 
                function timeHTML() {
                    for (i = 0; i < time.length; i++) {
                        // Day
                        if (time[i].className.indexOf("dy") >= 0) {
                            if (Date().toString().indexOf("Sun") >= 0)
                                time[i].innerHTML = "Sunday"

                            if (Date().toString().indexOf("Mon") >= 0)
                                time[i].innerHTML = "Monday"
                            
                            if (Date().toString().indexOf("Tue") >= 0)
                                time[i].innerHTML = "Tuesday"
                            
                            if (Date().toString().indexOf("Wed") >= 0)
                                time[i].innerHTML = "Wednesday"
                            
                            if (Date().toString().indexOf("Thu") >= 0)
                                time[i].innerHTML = "Thursday"
                            
                            if (Date().toString().indexOf("Fri") >= 0)
                                time[i].innerHTML = "Friday"
                            
                            if (Date().toString().indexOf("Sat") >= 0)
                                time[i].innerHTML = "Saturday"
                        }
                        
                        // Date
                        if (time[i].className.indexOf("dyIndex") >= 0)
                            time[i].innerHTML = new Date().getDate()
                        
                        // Date with Postfix
                        if (time[i].className.indexOf("dyIndex") >= 0 &&
                            time[i].className.indexOf("pos") >= 0)
                            time[i].innerHTML = parseIndex(new Date().getDate())
                        
                        // Full Calender Date and Time
                        if (time[i].className.indexOf("fullDate") >= 0)
                            time[i].innerHTML = Date()
                        
                        // Hour
                        if (time[i].className.indexOf("hr") >= 0) {
                            // The HTML is in double digits
                            if (new Date().getHours().toString()[1] == undefined)
                                time[i].innerHTML = "0" + new Date().getHours()

                            else
                                time[i].innerHTML = new Date().getHours()
                        }

                        // Minutes
                        if (time[i].className.indexOf("min") >= 0) {
                            if (new Date().getMinutes().toString()[1] == undefined)
                                time[i].innerHTML = "0" + new Date().getMinutes()
                            else
                                time[i].innerHTML = new Date().getMinutes()
                        }

                        // Month
                        if (time[i].className.indexOf("mth") >= 0) {
                            if (Date().toString().indexOf("Jan") >= 0)
                                time[i].innerHTML = "January"
                            
                            if (Date().toString().indexOf("Feb") >= 0)
                                time[i].innerHTML = "February"
                            
                            if (Date().toString().indexOf("Mar") >= 0)
                                time[i].innerHTML = "March"
                            
                            if (Date().toString().indexOf("Apr") >= 0)
                                time[i].innerHTML = "April"
                            
                            if (Date().toString().indexOf("May") >= 0)
                                time[i].innerHTML = "May"
                            
                            if (Date().toString().indexOf("Jun") >= 0)
                                time[i].innerHTML = "June"
                            
                            if (Date().toString().indexOf("Jul") >= 0)
                                time[i].innerHTML = "July"
                            
                            if (Date().toString().indexOf("Aug") >= 0)
                                time[i].innerHTML = "August"
                            
                            if (Date().toString().indexOf("Sep") >= 0)
                                time[i].innerHTML = "September"
                            
                            if (Date().toString().indexOf("Oct") >= 0)
                                time[i].innerHTML = "October"
                            
                            if (Date().toString().indexOf("Nov") >= 0)
                                time[i].innerHTML = "November"
                            
                            if (Date().toString().indexOf("Dec") >= 0)
                                time[i].innerHTML = "December"
                        }

                        // Month Number
                        if (time[i].className.indexOf("mthIndex") >= 0)
                            time[i].innerHTML = new Date().getMonth() + 1

                        // Month Number with Postfix
                        if (time[i].className.indexOf("mthIndex") >= 0 &&
                            time[i].className.indexOf("pos") >= 0)
                            time[i].innerHTML = parseIndex(new Date().getMonth() + 1)

                        // Seconds
                        if (time[i].className.indexOf("sec") >= 0) {
                            if (new Date().getSeconds().toString()[1] == undefined)
                                time[i].innerHTML = "0" + new Date().getSeconds()
                            else
                                time[i].innerHTML = new Date().getSeconds()
                        }

                        // Year
                        if (time[i].className.indexOf("yr") >= 0)
                            time[i].innerHTML = new Date().getFullYear()
                    }
                }
                timeHTML()
                setInterval(timeHTML, 1000)
            }, 50)

    // Web Applications
        /* Accordion */
            // Definition
                // Accordion
                var accordion = document.querySelectorAll(".accr"),
                // Accordion Boolean
                    accordionBin = [false],
                // Accordion Header
                    accordionHeader = document.querySelectorAll(".accr > .accr-h"),
                // Accordion Screen
                    accordionContent = document.querySelectorAll(".accr > .accr-c"),
                // Accordion ID
                    accordionIdentity = [  ]
            
            // Index all Accordions
            for (i = 0; i < accordion.length; i++) {
                // Create toggles
                accordionBin[i] = false

                // Close the Accordion
                accordion[i].open = false
            
                // Create a unique ID for each Accordion
                accordionIdentity[i] = "#" + Math.random().toString().slice(2)
            
                // Index all Accordions
                accordion[i].setAttribute("data-index", i)
                accordion[i].setAttribute("data-id", accordionIdentity[i])
            
                // Reset the "open" attribute
                if (accordion[i].hasAttribute("open") && accordion[i].tagName == "DETAILS") {
                    accordion[i].removeAttribute("open")
                    accordion[i].setAttribute("data-open", "")
                }
            
                // Open the Accordion if the attribute "data-open" is defined
                if (accordion[i].hasAttribute("data-open"))
                    accordion[i].open = true
            }
            
            // Index all Accordion Headers
            for (i = 0; i < accordionHeader.length; i++) {
                // Index all Accordion Headers
                accordionHeader[i].setAttribute("data-index", i)

                // Add the events
                accordionHeader[i].onclick = function() {
                    if (!accordionBin[this.getAttribute("data-index")]) {
                        // Open the Accordion
                        document.querySelectorAll(this.parentNode.localName + '.accr[data-id="' + this.parentNode.getAttribute("data-id") + '"] > .accr-c[data-index="' + this.getAttribute("data-index") + '"]')[0].parentNode.open = true
                        document.querySelectorAll(this.parentNode.localName + '.accr[data-id="' + this.parentNode.getAttribute("data-id") + '"] > .accr-c[data-index="' + this.getAttribute("data-index") + '"]')[0].parentNode.setAttribute("data-open", "")

                        // Show the Accordion Content
                        document.querySelectorAll(this.parentNode.localName + '.accr[data-id="' + this.parentNode.getAttribute("data-id") + '"] > .accr-c[data-index="' + this.getAttribute("data-index") + '"]')[0].style.display = "block"
                    }

                    else {
                        // Un-open the Accordion
                        document.querySelectorAll(this.parentNode.localName + '.accr[data-id="' + this.parentNode.getAttribute("data-id") + '"] > .accr-c[data-index="' + this.getAttribute("data-index") + '"]')[0].parentNode.open = false
                        document.querySelectorAll(this.parentNode.localName + '.accr[data-id="' + this.parentNode.getAttribute("data-id") + '"] > .accr-c[data-index="' + this.getAttribute("data-index") + '"]')[0].parentNode.removeAttribute("data-open")
                        
                        // Hide the Accordion Content
                        document.querySelectorAll(this.parentNode.localName + '.accr[data-id="' + this.parentNode.getAttribute("data-id") + '"] > .accr-c[data-index="' + this.getAttribute("data-index") + '"]')[0].style.display = "none"
                    }

                    accordionBin[this.getAttribute("data-index")] = !accordionBin[this.getAttribute("data-index")]
                }
            }
            
            // Index all Accordion Content
            for (i = 0; i < accordionContent.length; i++) {
                // Index all Accordion Content
                accordionContent[i].setAttribute("data-index", i)

                // If the Accordion is open, show the Accordion Content
                if (
                    accordionContent[i].parentNode.open ||
                    accordionContent[i].parentNode.hasAttribute("data-open")
                )
                    accordionContent[i].style.display = "block"

                // else do not display the Accordion Content
                else
                    accordionContent[i].style.display = "none"
            }
            
            // For Javascript-functioned Accordions
            setInterval(function() {
                // Index all Accordions
                for (i = 0; i < accordion.length; i++) {
                    // If the Accordion has the "data-open" attribute, it opens
                    if (accordion[i].open || accordion[i].hasAttribute("data-open"))
                        // If the second child of the Accordion is the Accordion Content, display it
                        if (accordion[i].children[1].className.indexOf("accr-c") >= 0)
                            accordion[i].children[1].style.display = "block"
                        
                        // else if the first child of the Accordion is the Accordion Content, display it
                        else if ((accordion[i].children[0].className.indexOf("accr-c") >= 0))
                            accordion[i].children[0].style.display = "block"
                        
                        // else if any child of the Accordion is the Accordion Content, display it
                        else
                            for (j = 0; j < accordion[i].children.length; j++)
                                if (accordion[i].children[j].className.indexOf("accr-c") >= 0)
                                    accordion[i].children[j].style.display = "block"
                    
                    // If the Accordion does not have the "data-open" attribute, it closes
                    else
                        // If the second child of the Accordion is the Accordion Content, hide it
                        if (accordion[i].children[1].className.indexOf("accr-c") >= 0)
                            accordion[i].children[1].style.display = "none"

                        // else if the first child of the Accordion is the Accordion Content, hide it
                        else if ((accordion[i].children[0].className.indexOf("accr-c") >= 0))
                            accordion[i].children[0].style.display = "none"

                        // else if any child of the Accordion is the Accordion Content, hide it
                        else
                            for (j = 0; j < accordion[i].children.length; j++)
                                if (accordion[i].children[j].className.indexOf("accr-c") >= 0)
                                    accordion[i].children[j].style.display = "none"
                }
            }, 100)

        /* Automatic Text 
                --- UPDATE REQUIRED ---
                    Needs to able to delete and type text dynamically.
        */
            // Definition
                // Text
                var autoTxt = document.getElementsByClassName("auto-txt"),
                // Text Properties
                    // Text (Content) Length
                    autoTxtHTMLLength = [{  }],
                // Text Attributes
                    // Text Content ("data-text")
                    autoTxtHTML = [{  }],
                    // Text Function Type ("data-function")
                    autoTxtFunction = [""],
                    // Text Pause Interval ("data-pauseInterval")
                    autoTxtPause = [0],
                    // Text Play Interval ("data-playInterval")
                    autoTxtPlay = [0],
                // Text Automatic Input Function
                // Input
                    // Baseline
                    autoTxtInputBaseline = [0],
                    // Counter
                    autoTxtInputCounter = [0],
                    // Indexer
                    autoTxtInputIndexer = [0]

            if (autoTxt[0]) {
            // Text Content
                // Create arrays for each string separated via the "_" character.
                function autoTxtHTMLDefinition() {
                    // Index all Text
                    for (i = 0; i < autoTxt.length; i++) {
                        // Define "autoTxtHTML[i]"
                        autoTxtHTML[i] = {  }

                        // Create a "length" attribute
                        autoTxtHTML[i].length = 1

                        // Store the value of the Text Content
                        autoTxtHTML[i].value = autoTxt[i].getAttribute("data-text")
                        // Quasi-variable for the Text Content
                        autoTxtHTML[i].content = autoTxt[i].getAttribute("data-text")

                        // Run this for a limit of 100 times.
                        for (j = 0; j < 101; j++) {
                            // Create an array from separating the content with the "_" character.
                            if (autoTxtHTML[i].value.indexOf("_") >= 0) {
                                // Update the length of the array
                                autoTxtHTML[i].length++

                                // Slice the Text Content value to make an array item
                                autoTxtHTML[i].value = autoTxtHTML[i].value.slice(0, autoTxtHTML[i].value.indexOf("_"))

                                // Update the Text Content value
                                autoTxtHTML[i].value = autoTxtHTML[i].content.slice(0, autoTxtHTML[i].content.lastIndexOf("_"))

                                // Use a quasi-variable to update the Text Content value
                                autoTxtHTML[i].content = autoTxtHTML[i].value

                                // Create the array items
                                autoTxtHTML[i][0] = autoTxt[i].getAttribute("data-text").slice(autoTxt[i].getAttribute("data-text").lastIndexOf("_")).replace(/_/g, "")
                                autoTxtHTML[i][j + 1] = autoTxtHTML[i].value.slice(
                                    (function() {
                                        if (autoTxtHTML[i].value.lastIndexOf("_") >= 0)
                                            return autoTxtHTML[i].value.lastIndexOf("_")
                                        else
                                            return 0
                                    })()
                                ).replace(/_/g, "")
                            }
                        }
                    }

                    // Restore the original Text Content value
                    for (i = 0; i < autoTxt.length; i++) {
                        autoTxtHTML[i].value = autoTxt[i].getAttribute("data-text")
                        // Including the quasi-variable
                        autoTxtHTML[i].content = autoTxt[i].getAttribute("data-text")
                    }
                }
                    autoTxtHTMLDefinition()

                // Text Attributes and Properties
                for (i = 0; i < autoTxtHTML.length; i++) {
                    // Text (Content) Length
                    autoTxtHTMLLength[i] = autoTxtHTML[i]

                        /* --- NOTE ---
                                This loop here overrides "autoTxtHTML".
                                So "autoTxtHTML" must be redefined with its function
                                above.
                        */
                        for (j = 0; j < autoTxtHTMLLength[i].length; j++)
                            autoTxtHTMLLength[i][j] = autoTxtHTMLLength[i][j].length

                    // Text Function Type ("data-function")
                    autoTxtFunction[i] = autoTxt[i].getAttribute("data-function")

                    // Text Pause Interval ("data-pauseInterval")
                    autoTxtPause[i] = parseFloat(autoTxt[i].getAttribute("data-pauseInterval"))

                    // Text Pause Interval ("data-playInterval")
                    autoTxtPlay[i] = parseFloat(autoTxt[i].getAttribute("data-playInterval"))
                }
                    // Text Content
                    autoTxtHTMLDefinition()

                // Text Automatic Input Function
                for (i = 0; i < autoTxt.length; i++) {
                    // Input
                        // Baseline
                        autoTxtInputBaseline[i] = 0
                            // Increment the baseline
                            setInterval(function() {
                                for (i = 0; i < autoTxt.length; i++)
                                    autoTxtInputBaseline[i] += .0015
                            }, 1)
                        // Counter
                        autoTxtInputCounter[i] = 0
                        // Indexer
                        autoTxtInputIndexer[i] = 0
                }

                // Text Automatic Input Function
                (function() {
                    // Wait on the various input functions ("data-function")
                    setInterval(function() {
                        // Index all Text
                        for (i = 0; i < autoTxtHTML.length; i++) {
                            if (autoTxt[i])
                                // Input
                                if (autoTxt[i].getAttribute("data-function") == "input") {
                                    // Character-by-character input
                                        // Reset the baseline once the play interval has been reached
                                        if (autoTxtInputBaseline[i] >= autoTxtPlay[i])
                                            autoTxtInputBaseline[i] = 0

                                        // If the counter indexes a non-defined array item
                                        if (!autoTxtHTMLLength[i][autoTxtInputCounter[i]]) {
                                            // Reset the counter
                                            autoTxtInputCounter[i] = 0
                                        }
                                        
                                        // else if the baseline matches the current item's string length then …
                                        else if (autoTxtInputBaseline[i] >= (autoTxtPlay[i] / autoTxtHTMLLength[i][autoTxtInputIndexer[i]])) {
                                            autoTxt[i].innerHTML += autoTxtHTML[i][autoTxtInputIndexer[i]][autoTxtInputCounter[i]]

                                            // Reset the baseline
                                            autoTxtInputBaseline[i] = 0

                                            // Increment the counter
                                            autoTxtInputCounter[i] += 1
                                        }
                                }
                            }
                    }, 1)
                })()
            }

        /* Carousel 
                --- UPDATE REQUIRED ---
                    Code here needs clean-up.
        */
            // Definition
                // Carousel
                var carousel = document.getElementsByClassName("crsl"),
                // Carousel Buttons
                    carouselButtonsLeft,
                    carouselButtonsRight,
                // Carousel Indicators
                    carouselIndicators,
                // (General) Carousel Counter
                    carouselCounter = 0,
                // (Individual) Carousel Counter
                    carouselElementCounter = [  ]
            
            // Index all Carousels
            for (i = 0; i < carousel.length; i++) {
                // Index all Carousels
                carousel[i].setAttribute("data-index", i)

                // Index the Carousel Slides
                for (j = 0; j < carousel[i].children.length; j++)
                    carousel[i].children[j].setAttribute("data-key", j)
                
                // If "data-controls" attribute is enabled, append a control button.
                if (carousel[i].hasAttribute("data-controls"))
                    carousel[i].insertAdjacentHTML(
                        'afterend',
                        '<button class="crsl-btn-l"> < </button>'
                    )
                
                // If "data-duration" attribute is disabled, set the attribute to "0".
                if (!carousel[i].hasAttribute("data-duration"))
                    carousel[i].setAttribute("data-duration", 0)
                
                // If "data-duration" attribute is enabled
                if (carousel[i].hasAttribute("data-duration"))
                    // Index all Carousel Slides
                    for (j = 0; j < carousel[i].children.length; j++)
                        // Set the CSS "animation-duration".
                        carousel[i].children[j].style.animationDuration = (
                            (carousel[i].children[j].parentNode.getAttribute("data-duration") + "s").toString()
                        )
                
                // If "data-interval" attribute is disabled, set the attribute to "3".
                if (!carousel[i].hasAttribute("data-interval"))
                    carousel[i].setAttribute("data-interval", 3)
                
                // If "data-navigation" attribute is enabled
                if (carousel[i].hasAttribute("data-navigation")) {
                    /* --- NOTE ---
                            Give the carousel buttons time to load if they are present.
                    */
                    setTimeout(function() {
                        // Index all Carousels
                        for (i = 0; i < carousel.length; i++)
                            // Repeat for the number of Carousel Slides present
                            for (j = carousel[i].children.length - 1; j >= 0; j--)
                                // Initialize a new checkbox.
                                carousel[i].insertAdjacentHTML(
                                    'afterend',
                                    '<input class="crsl-nav" data-id="' + i + '" data-list="' + j + '" type="checkbox">'
                                )
                    }, 750)
                }

                // If "data-slide" attribute is enabled
                if (carousel[i].hasAttribute("data-slide"))
                    for (j = 0; j < document.querySelectorAll(".crsl[data-index] > *:not(span)").length; j++)
                        document.querySelectorAll(".crsl[data-index] > *:not(span)")[j].style.animationName = "" +
                            document.querySelectorAll(".crsl[data-index] > *:not(span)")[j].parentNode.getAttribute("data-slide") + "_carousel"
                
                // If "data-marquee" attribute is enabled
                if (carousel[i].hasAttribute("data-marquee"))
                    // Toggle the Carousel Slides to the right every 1 second.
                    setInterval(carouselRight, 1000)

                // Set a focus status for Carousels
                document.body.onclick = function() {
                    // If what was clicked is a Carousel, focus on it.
                    if (window.event.target.className.indexOf("crsl") >= 0)
                        window.event.target.isFocused = true
                    
                    // else if what was clicked's parent is a Carousel, focus on it.
                    else if (window.event.target.parentNode.className.indexOf("crsl") >= 0)
                        window.event.target.parentNode.isFocused = true
                    
                    // else if what was clicked's parent's parent is a Carousel, focus on it.
                    else if (window.event.target.parentNode.parentNode.className.indexOf("crsl") >= 0)
                        window.event.target.parentNode.parentNode.isFocused = true

                    // else un-select all Carousels
                    else if (window.event.target)
                        for (i = 0; i < carousel.length; i++)
                            carousel[i].isFocused = false
                }
            }

            // Stylize the carousel if it is "focused"
            setInterval(function() {
                for (i = 0; i < carousel.length; i++)
                    if (carousel[i].isFocused)
                        carousel[i].setAttribute("psd-focus", "")
                    else
                        carousel[i].removeAttribute("psd-focus")
            }, 100)

            // Accept keyboard input for toggling slides
            document.body.addEventListener("keydown", carouselKey)
            document.body.addEventListener("keypress", carouselKey)

            // Set the buttons
                // Left Carousel Buttons
                carouselButtonsLeft = document.querySelectorAll(".crsl + .crsl-btn-l")

                // Index all Left Carousel Buttons
                for (i = 0; i < carouselButtonsLeft.length; i++) {
                    // Add the events
                    carouselButtonsLeft[i].addEventListener("click", carouselL)

                    // Accept custom HTML from the "data-left-button" attribute.
                    carouselButtonsLeft[i].innerHTML = carousel[i].getAttribute("data-left-button") || "<"

                    // Create the Right Carousel Buttons
                    carouselButtonsLeft[i].insertAdjacentHTML('afterend', '<button class="crsl-btn-r"> > </button>')

                    // Index all Left Carousel Buttons
                    carouselButtonsLeft[i].setAttribute("data-index", i)
                }
                
                // Right Carousel Buttons
                carouselButtonsRight = document.querySelectorAll(".crsl-btn-l + .crsl-btn-r")

                // Index all Right Carousel Buttons
                for (i = 0; i < carouselButtonsRight.length; i++) {
                    // Add the events
                    carouselButtonsRight[i].addEventListener("click", carouselR)

                    // Accept custom HTML from the "data-right-button" attribute.
                    carouselButtonsRight[i].innerHTML = carousel[i].getAttribute("data-right-button") || ">"

                    // Index all Right Carousel Buttons
                    carouselButtonsRight[i].setAttribute("data-index", i)
                }

            // Carousel Indicators
                // Catch the navigation elements
                setTimeout(function() {
                    // Definition
                    carouselIndicators = document.querySelectorAll(".crsl-nav[data-list]")

                    // Index all Carousel Indicators
                    for (i = 0; i < carouselIndicators.length; i++)
                        // Add the events
                        carouselIndicators[i].addEventListener("click", carouselToggle)
                }, 825)
            
            /* --- NOTE ---
                Append a "data-count" attribute to count the seconds and
                add new properties to the carousel array.
            */
            for (i = 0; i < carousel.length; i++)
                carouselElementCounter[i] = 0
            
            // The counter property
            setInterval(function() {
                for (i = 0; i < carousel.length; i++) {
                    // Increment the values of each property
                    carouselElementCounter[i]++
                    
                    // Append the attribute
                    carousel[i].setAttribute("data-count", carouselElementCounter[i])
                }
            }, 1000)

            // Toggle the active (displayed) slide on the Carousel
            function carouselToggle() {
                // Initialization
                var carouselContent = document.querySelectorAll('.crsl[data-index="' + this.getAttribute("data-index") + '"] > *:not(span)'),
                    carouselSlide = document.querySelectorAll('.crsl[data-index="' + this.getAttribute("data-id") + '"] > *:not(span)[data-key="' + this.getAttribute("data-list") + '"]')
                    
                // Hide all Carousel Slides
                for (i = 0; i < carouselContent.length; i++)
                    carouselContent[i].style.display = "none"

                // Show the first Carousel Slide
                carouselSlide[0].style.display = "block"

                // Place the last Carousel Slide before the first.
                carouselSlide[0].parentNode.insertBefore(
                    carouselSlide[0], 
                    carouselSlide[0].parentNode.childNodes[1]
                )
            }
            
            // Reverse the rotary
            function carouselLeft() {
                // Call this function when the "data-count" attribute matches the ("data-duration" + "data-interval") attribute
                for (i = 0; i < carousel.length; i++) {
                    if (
                        carousel[i].getAttribute("data-count") ==
                        (
                            parseInt(parseInt(carousel[i].getAttribute("data-duration")) +
                            parseInt(carousel[i].getAttribute("data-interval")))
                        )
                    ) {
                        // Hide all Carousel Slides
                        for (j = 0; j < document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)').length; j++)
                            document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[j].style.display = "none"
                        
                        // Show the first Carousel Slide
                        document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0].style.display = "block"

                        // Place the first Carousel Slide before the last.
                        document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0].parentNode.insertBefore(
                            document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)').length - 1],
                            document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0]
                        )
                    
                        // Reset the "data-count" attribute for the specified Carousel
                        carouselElementCounter[i] = 0
                        carousel[i].setAttribute("data-count", 0)
                    }
                }
            }

            // Reverse a rotary
            function carouselL() {
                // Definition
                var carouselLContent = document.querySelectorAll('.crsl[data-index="' + this.getAttribute("data-index") + '"] > *:not(span)')
                
                // Hide all Carousel Slides
                for (i = 0; i < carouselLContent.length; i++)
                    carouselLContent[i].style.display = "none"
                
                // Show the first Carousel Slide
                carouselLContent[0].style.display = "block"

                // Place the first Carousel Slide before the last.
                carouselLContent[0].parentNode.insertBefore(
                    carouselLContent[carouselLContent.length - 1],
                    carouselLContent[0]
                )
            }

            // Play the rotary
            function carouselRight() {
                // Call this function when the "data-count" attribute matches the ("data-duration" + "data-interval") attribute
                for (i = 0; i < carousel.length; i++) {
                    if (
                        carousel[i].getAttribute("data-count") ==
                        (
                            parseInt(parseInt(carousel[i].getAttribute("data-duration")) +  
                            parseInt(carousel[i].getAttribute("data-interval")))
                        )
                    ) {
                        // Hide all Carousel Slides
                        for (j = 0; j < document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)').length; j++)
                            document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[j].style.display = "none"
                        
                        // Show the last Carousel Slide
                        document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)').length - 1].style.display = "block"

                        // Place the first Carousel Slide after the last.
                        document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0].parentNode.appendChild(document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0])

                        // Reset the "data-count" attribute for the specified Carousel
                        carouselElementCounter[i] = 0
                        carousel[i].setAttribute("data-count", 0)
                    }
                }
            }

            // Play a rotary
            function carouselR() {
                // Definition
                var carouselLContent = document.querySelectorAll('.crsl[data-index="' + this.getAttribute("data-index") + '"] > *:not(span)')
                
                // Hide all Carousel Slides
                for (i = 0; i < carouselLContent.length; i++)
                    carouselLContent[i].style.display = "none"
                
                // Show the first Carousel Slide
                carouselLContent[0].style.display = "block"

                // Place the first Carousel Slide after the last.
                carouselLContent[0].parentNode.appendChild(carouselLContent[0])
            }

            // Toggle the rotary via keyboard input when the carousel is "focused"
            function carouselKey() {
                // Left Arrow Key
                if (event.keyCode == 37) {
                    // Index all Carousels
                    for (i = 0; i < carousel.length; i++)
                        // If a Carousel is focused
                        if (carousel[i].isFocused) {
                            // Hide all the Carousel's children
                            for (j = 0; j < carousel[i].children.length; j++)
                                carousel[i].children[j].style.display = "none"

                            // Hide all carousel children
                            for (j = 0; j < carousel[i].children.length; j++)
                                carousel[i].children[j].style.display = "block"

                            // Place the first Carousel Slide before the last.
                            carousel[i].insertBefore(
                                carousel[i].children[carousel[i].children.length - 1],
                                carousel[i].children[0]
                            )
                        }
                }

                // Right Arrow Key
                if (event.keyCode == 39) {
                    // Index all Carousels
                    for (i = 0; i < carousel.length; i++)
                        // If a Carousel is focused
                        if (carousel[i].isFocused) {
                            // Hide all Carousel children
                            for (j = 0; j < carousel[i].children.length; j++)
                                carousel[i].children[j].style.display = "none"

                            // Show the first Carousel child
                            carousel[i].children[0].style.display = "block"

                            // Place the first Carousel Slide after the last.
                            carousel[i].appendChild(carousel[i].children[0])
                        }
                }
            }

        /* Code Editor */
            // Definition
                // Editor
                var codeEditor = document.getElementsByClassName("cd-edtr"),
                    // Editor Boolean
                    codeEditorBin = [false]

            // Index all Editors
            for (i = 0; i < codeEditor.length; i++) {
                // Create toggles
                codeEditorBin[i] = false

                // Index all Editors
                codeEditor[i].setAttribute("data-index", i)

                // Add the events
                codeEditor[i].ondblclick = function() {
                    // Convert to string
                    if (!codeEditorBin[this.getAttribute("data-index")])
                        this.innerHTML = this.innerHTML.replace(/</gi, "&lt;").replace(/>/gi, "&gt;")

                    // Convert to HTML
                    else
                        this.innerHTML = this.innerHTML.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")

                    codeEditorBin[this.getAttribute("data-index")] = !codeEditorBin[this.getAttribute("data-index")]
                }
            }

        /* Clipboard */
            // Definition
                // <copy>
                var copy = document.getElementsByTagName("copy"),
                // <cut>
                    cut = document.getElementsByTagName("cut"),
                // <paste>
                    paste = document.getElementsByTagName("paste")

            /* --- NOTE ---
                    Paste content referenced from a <copy> element
                    within a <paste> element.
            */
            for (i = 0; i < paste.length; i++)
                // If <paste> is not a child <copy> or <cut>.
                if (
                    paste[i].parentNode.tagName != "COPY" &&
                    paste[i].parentNode.tagName != "CUT"
                )
                    // Copy Command
                    if (document.querySelectorAll("#" + paste[i].getAttribute("ref"))[0].tagName == "COPY")
                        paste[i].innerHTML = document.querySelectorAll("copy#" + paste[i].getAttribute("ref"))[0].innerHTML

                    // Cut Command
                    else
                        paste[i].innerHTML = document.querySelectorAll("cut#" + paste[i].getAttribute("ref"))[0].innerHTML

                // If <paste> is a child <copy> or <cut>.
                else 
                    console.error("%c The <paste> element is not supposed to be within a <copy> or <cut> element.", "font-family: 'Calibri Light'")

            /* --- NOTE ---
                    Delete "cut" content.
            */
            for (i = 0; i < cut.length; i++)
                cut[i].parentNode.removeChild(cut[i])

        /* Dropdown */
            // Definition
                // Dropdown Header
                var dropdownHeader = document.getElementsByClassName("drpdwn"),
                // Dropdown Boolean
                    dropdownBin = [false],
                // Dropdown Content 
                    dropdownContent = document.querySelectorAll("[data-drpdwn]"),
                // Dropdown Content CSS Display Value
                    dropdownContentCSSDisplay = {  }

            // Index all headers
            for (i = 0; i < dropdownHeader.length; i++) {
                // Create toggles
                dropdownBin[i] = false

                // Index the headers
                dropdownHeader[i].setAttribute("data-index", i)
            }
                
            // Index all contents
            for (i = 0; i < dropdownContent.length; i++) {
                // Store the content's CSS "display"
                dropdownContentCSSDisplay[dropdownContent[i].getAttribute("data-drpdwn").toString()] = window.getComputedStyle(dropdownContent[i]).getPropertyValue("display")

                // Hide the content
                dropdownContent[i].style.display = "none"
            }

            // Hide the content
            function hideDropdownMenu() {
                if (document.querySelectorAll('[data-drpdwn="' + window.event.target.getAttribute("id") + '"]')[0])
                    document.querySelectorAll('[data-drpdwn="' + window.event.target.getAttribute("id") + '"]')[0].style.display = "none"
            }
            // Show the content
            function showDropdownMenu() {
                if (document.querySelectorAll('[data-drpdwn="' + window.event.target.getAttribute("id") + '"]')[0])
                    document.querySelectorAll('[data-drpdwn="' + window.event.target.getAttribute("id") + '"]')[0].style.display = dropdownContentCSSDisplay[document.querySelectorAll('[data-drpdwn="' + window.event.target.getAttribute("id") + '"]')[0].getAttribute("data-drpdwn")]
            }

            // Index all headers
            for (i = 0; i < dropdownHeader.length; i++)
                /* --- NOTE ---
                        How the following events are going to
                        take place are dependent on the
                        header's "data-event" attribute value
                */
                // Click event
                if (dropdownHeader[i].getAttribute("data-event") == "on")
                    // Add the event
                    dropdownHeader[i].onclick = function() {
                        // Show the corresponding content
                        if (!dropdownBin[this.getAttribute("data-index")])
                            showDropdownMenu()
                        // Hide the corresponding content
                        else
                            hideDropdownMenu()

                        dropdownBin[this.getAttribute("data-index")] = !dropdownBin[this.getAttribute("data-index")]
                    }

                // Mouseover event
                else if (dropdownHeader[i].getAttribute("data-event") == "over")
                    // Add the event
                    dropdownHeader[i].onmouseover = function() {
                        // Show the corresponding content
                        if (!dropdownBin[this.getAttribute("data-index")])
                            showDropdownMenu()
                        // Hide the corresponding content
                        else
                            hideDropdownMenu()

                        dropdownBin[this.getAttribute("data-index")] = !dropdownBin[this.getAttribute("data-index")]
                    }

                // Mouseover and mouseleave event
                else if (dropdownHeader[i].getAttribute("data-event") == "over_toggle") {
                    // Add the event
                    dropdownHeader[i].onmouseover = function() {
                        // Show the corresponding content
                        showDropdownMenu()
                    }
                    dropdownHeader[i].onmouseleave = function() {
                        // Hide the corresponding content
                        hideDropdownMenu()
                    }
                }

        /* Media 
                --- UPDATE REQUIRED ---
                    Code here needs clean up.
        */
            // Definition
            var media = document.getElementsByClassName("med")
        
            // If a "med" class element exists
            if (media[0]) {
                // Run this function for all <audio> and <video> consoles
                for (i = 0; i < media.length; i++) {
                    if (media[i].tagName == "AUDIO" || media[i].tagName == "VIDEO") {
                        /* --- NOTE ---
                                Update the media source
                                    and
                                give time for the Javascript to run
                        */
                        setTimeout(function() {
                            // Re-index all consoles
                            for (i = 0; i < media.length; i++)
                                if (media[i].tagName == "AUDIO" || media[i].tagName == "VIDEO")
                                    // Index all console element children
                                    for (j = 0; j < media[i].childNodes.length; j++)
                                        /* --- NOTE ---
                                            If
                                                it is a <source> element, replace the console's "src"
                                                attribute with the <source>'s "src" attribute
                                                    and
                                                the console's media duration is Not a Number,
                                                skip over that <source> to the next.
                                        */
                                        if (media[i].childNodes[j].tagName == "SOURCE"
                                            && media[i].duration != NaN)

                                            media[i].setAttribute("src", media[i].childNodes[j].getAttribute("src"))
                        }, 1250)
               
                        // Create the console controller
                        media[i].insertAdjacentHTML("afterend", "<nav> </nav>")
               
                        // Index every media console
                        media[i].setAttribute("data-index", i)
               
                        // Remove the "controls" attribute
                        if (media[i].hasAttribute("controls"))
                            media[i].removeAttribute("controls")
                    }
                }
                // Media Controller (Catch the controller)
                var mediaController = document.querySelectorAll(".med + nav")
                
                // Append the controls for the controller
                for (i = 0; i < mediaController.length; i++) {
                    mediaController[i].innerHTML = (
                        // Pause/ Play Button
                        '<input data-vid-play type="button" value="&blacktriangleright;">' +
                        // Stop Button
                        '<input data-vid-stop type="button" value="&blacksquare;">' +
                        // Playback Current Time
                        '<div data-vid-currenttime> 00:00:00 </div>' +
                        // Playback Duration
                        '<div data-vid-duration> 00:00:00 </div>' +
                        // Playback Seeker
                        '<input data-vid-seek min="0" step="1" type="range" value="0">' +
                        // Volume Button
                        '<input data-vid-vol type="button" value="&lescc;">' +
                        // Mute/ Volume Range
                        '<input data-vid-volRange max="100" min="0" step="1" type="range" value="100">' +
                        // Download Button
                        '<a data-vid-dwnld download> &darr; </a>' +
                        // Slow Button
                        '<input data-vid-slow type="button" value="&#8672;">' +
                        // Fast Button
                        '<input data-vid-fast type="button" value="&#8674;">' +
                        // Playback Rate
                        '<div data-vid-rate> </div>' +
                        // Fullscreen Button
                        '<input data-vid-flscrn type="button" value="&#9635;">'
                    )

                    // Index every controller
                    mediaController[i].setAttribute("data-index", i)
                }

                // Index every controller component
                for (i = 0; i < document.querySelectorAll(".med + nav > *").length; i++)
                    document.querySelectorAll(".med + nav > *")[i].setAttribute("data-index", document.querySelectorAll(".med + nav > *")[i].parentNode.getAttribute("data-index"))
                
                // Pause/ Play Button
                var mediaControllerPlay = document.querySelectorAll(".med + nav > [data-vid-play]"),
                    // Pause/ Play Button Boolean
                    mediaControllerPlayBin = [false]

                    // Add the events
                    for (i = 0; i < mediaControllerPlay.length; i++) {
                        // Video
                        media[i].addEventListener("click", playMedia)
                        // Pause/ Play Button
                        mediaControllerPlay[i].addEventListener("click", playMedia)

                        // Create toggles
                        mediaControllerPlayBin[i] = false
                    }
                    // Play or pause the console playback
                    function playMedia() {
                        // Play the playback
                        if (!mediaControllerPlayBin[this.getAttribute("data-index")])
                            media[this.getAttribute("data-index")].play()
                        
                        // Pause the playback
                        else
                            media[this.getAttribute("data-index")].pause()

                        mediaControllerPlayBin[this.getAttribute("data-index")] = !mediaControllerPlayBin[this.getAttribute("data-index")]
                    }
                
                // Stop Button
                var mediaControllerStop = document.querySelectorAll(".med + nav > [data-vid-stop]")
                    // Stop the console playback
                    for (i = 0; i < mediaControllerStop.length; i++) {
                        // Add the events
                        mediaControllerStop[i].onclick = function() {
                            media[this.getAttribute("data-index")].load()
                        }
                    }
                
                // Playback Current Time
                var mediaControllerCurrentTime = document.querySelectorAll(".med + nav > [data-vid-currenttime]")
                
                // Playback Duration
                var mediaControllerDuration = document.querySelectorAll(".med + nav > [data-vid-duration]")
                    
                    setInterval(function() {
                        for (i = 0; i < mediaControllerCurrentTime.length; i++) {
                            // Current Time in Hours:Minutes:Seconds
                            var mediaControllerCurrentTimeHTMLHours = 0,
                                mediaControllerDurationHTMLHours = 0,
                                
                                mediaControllerCurrentTimeHTMLMinutes = 0,
                                mediaControllerDurationHTMLMinutes = 0,
                                
                                mediaControllerCurrentTimeHTMLSeconds = parseInt(document.querySelectorAll(
                                    '.med[data-index="' + mediaControllerCurrentTime[i].getAttribute("data-index") + '"]')[0].currentTime
                                ),
                                mediaControllerDurationHTMLSeconds = parseInt(document.querySelectorAll(
                                    '.med[data-index="' + mediaControllerCurrentTime[i].getAttribute("data-index") + '"]')[0].duration
                                )


                            // For every 60 seconds (or minutes), add 1 minute (or hour)
                            for (mediaControllerCurrentTimeHTMLSeconds;
                                mediaControllerCurrentTimeHTMLSeconds >= 3600;
                                mediaControllerCurrentTimeHTMLSeconds -= 3600)
                                mediaControllerCurrentTimeHTMLHours++;
                            for (mediaControllerDurationHTMLSeconds;
                                mediaControllerDurationHTMLSeconds >= 3600;
                                mediaControllerDurationHTMLSeconds -= 3600)
                                mediaControllerDurationHTMLHours++;

                            for (mediaControllerCurrentTimeHTMLSeconds;
                                mediaControllerCurrentTimeHTMLSeconds >= 60;
                                mediaControllerCurrentTimeHTMLSeconds -= 60)
                                mediaControllerCurrentTimeHTMLMinutes++;
                            for (mediaControllerDurationHTMLSeconds;
                                mediaControllerDurationHTMLSeconds >= 60;
                                mediaControllerDurationHTMLSeconds -= 60)
                                mediaControllerDurationHTMLMinutes++;


                            // Each value must be double-digit (octal)
                            if (mediaControllerCurrentTimeHTMLHours.toString()[1] == undefined)
                                mediaControllerCurrentTimeHTMLHours = "0" + mediaControllerCurrentTimeHTMLHours
                            if (mediaControllerCurrentTimeHTMLMinutes.toString()[1] == undefined)
                                mediaControllerCurrentTimeHTMLMinutes = "0" + mediaControllerCurrentTimeHTMLMinutes
                            if (mediaControllerCurrentTimeHTMLSeconds.toString()[1] == undefined)
                                mediaControllerCurrentTimeHTMLSeconds = "0" + mediaControllerCurrentTimeHTMLSeconds

                            if (mediaControllerDurationHTMLHours.toString()[1] == undefined)
                                mediaControllerDurationHTMLHours = "0" + mediaControllerDurationHTMLHours
                            if (mediaControllerDurationHTMLMinutes.toString()[1] == undefined)
                                mediaControllerDurationHTMLMinutes = "0" + mediaControllerDurationHTMLMinutes
                            if (mediaControllerDurationHTMLSeconds.toString()[1] == undefined)
                                mediaControllerDurationHTMLSeconds = "0" + mediaControllerDurationHTMLSeconds


                            // Append the parsed HTML
                            mediaControllerCurrentTime[i].innerHTML = (
                                mediaControllerCurrentTimeHTMLHours + ":" +
                                mediaControllerCurrentTimeHTMLMinutes + ":" +
                                mediaControllerCurrentTimeHTMLSeconds
                            ).toString().replace(/NaN/g, "00")
                            
                            mediaControllerDuration[i].innerHTML = (
                                mediaControllerDurationHTMLHours + ":" +
                                mediaControllerDurationHTMLMinutes + ":" +
                                mediaControllerDurationHTMLSeconds
                            ).toString().replace(/NaN/g, "00")
                        }
                    }, 1)
                
                // Playback Seek
                var mediaControllerSeek = document.querySelectorAll(".med + nav > [data-vid-seek]")
                    
                // Give time for the consoles to load
                setTimeout(function() {
                    for (i = 0; i < mediaControllerSeek.length; i++) {
                        // Add the events
                        mediaControllerSeek[i].addEventListener("change", seekMedia)
                        mediaControllerSeek[i].addEventListener("input", seekMedia)
                        
                        // Scale the "max" attribute to the console playback duration
                        mediaControllerSeek[i].setAttribute("max", parseInt(media[i].duration))
                    }
                    
                    // Change the current time of the playback on the value of the seeker
                    function seekMedia() {
                        media[this.getAttribute("data-index")].currentTime = this.value
                    }
                    
                    // Update the value of the seeker
                    setInterval(function() {
                        for (i = 0; i < mediaControllerSeek.length; i++) {
                            mediaControllerSeek[i].setAttribute("value", parseInt(media[i].currentTime))
                            mediaControllerSeek[i].value = media[i].currentTime
                        }
                    }, 1)
                }, 750)
                
                // Mute/ Volume Button
                var mediaControllerVolume = document.querySelectorAll(".med + nav > [data-vid-vol]"),
                    // Console Volume
                    mediaVolume = [  ],
                    // Mute/ Volume Button Boolean
                    mediaControllerVolumeBin = [false]
                
                // Store the volume value of the console
                for (i = 0; i < mediaControllerVolume.length; i++) {
                    // Add the events
                    mediaControllerVolume[i].addEventListener("click", volMedia)

                    // Store each consoles' volume amount
                    mediaVolume[i] = media[i].volume

                    // Create toggles
                    mediaControllerVolumeBin[i] = false
                }
                
                function volMedia() {
                    // Mute or restore the volume
                    if (!mediaControllerVolumeBin[this.getAttribute("data-index")]) {
                        // Store the previous volume value of the console
                        mediaVolume[this.getAttribute("data-index")] = media[this.getAttribute("data-index")].volume
                        // Update the media volume to 0
                        media[this.getAttribute("data-index")].volume = 0
                    }

                    // Update the media volume the formerly stored value
                    else {
                        media[this.getAttribute("data-index")].volume = mediaVolume[this.getAttribute("data-index")]
                    }

                    mediaControllerVolumeBin[this.getAttribute("data-index")] = !mediaControllerVolumeBin[this.getAttribute("data-index")]
                }

                // Volume Range
                var mediaControllerVolumeRange = document.querySelectorAll(".med + nav > [data-vid-volRange]")
                    // Give time for the consoles to load
                    setTimeout(function() {
                        // Add the events
                        for (i = 0; i < mediaControllerVolumeRange.length; i++) {
                            mediaControllerVolumeRange[i].addEventListener("change", volRangeMedia)
                            mediaControllerVolumeRange[i].addEventListener("input", volRangeMedia)
                        }
                        
                        // Change the volume of the playback on the value of the seeker
                        function volRangeMedia() {
                            media[this.getAttribute("data-index")].volume = (this.value / 100)
                        }
                        
                        // Update the value of the seeker
                        setInterval(function() {
                            for (i = 0; i < mediaControllerVolumeRange.length; i++) {
                                mediaControllerVolumeRange[i].setAttribute("value", (media[i].volume * 100))
                                mediaControllerVolumeRange[i].value = (media[i].volume * 100)
                            }
                        }, 1)
                    }, 750)
            
                // Download Button
                var mediaControllerDownload = document.querySelectorAll(".med + nav > [data-vid-dwnld]")
                    // Make a download button from the media "src" path
                    for (i = 0; i < mediaControllerDownload.length; i++)
                        if (media[i].getAttribute("src") != undefined)
                            mediaControllerDownload[i].setAttribute("href", media[i].getAttribute("src"))
                
                // Playback Rate
                var mediaPlaybackRate = [  ]
                
                // Slow Button
                var mediaControllerSlow = document.querySelectorAll(".med + nav > [data-vid-slow]")
                    // Add the events
                    for (i = 0; i < mediaControllerSlow.length; i++) {
                        // Store the media playback rate
                        mediaPlaybackRate[i] = media[i].playbackRate

                        // Slow down the playback rate
                        mediaControllerSlow[i].onclick = function() {
                            media[this.getAttribute("data-index")].playbackRate = (mediaPlaybackRate[this.getAttribute("data-index")] - .25)
                            mediaPlaybackRate[this.getAttribute("data-index")] = media[this.getAttribute("data-index")].playbackRate
                        }
                    }
                
                // Fast Button
                var mediaControllerFast = document.querySelectorAll(".med + nav > [data-vid-fast]")
                    // Add the events
                    for (i = 0; i < mediaControllerFast.length; i++) mediaControllerFast[i].onclick = function() {
                        // Speed up the playback rate
                        media[this.getAttribute("data-index")].playbackRate = (mediaPlaybackRate[this.getAttribute("data-index")] + .25)
                        
                        // Update the playback rate
                        mediaPlaybackRate[this.getAttribute("data-index")] = media[this.getAttribute("data-index")].playbackRate
                    }
                
                // Playback Rate
                var mediaControllerRate = document.querySelectorAll(".med + nav > [data-vid-rate]")
                    setInterval(function() {
                        for (i = 0; i < mediaControllerRate.length; i++)
                            mediaControllerRate[i].innerHTML = "&times;" + media[i].playbackRate
                    }, 1)

                // Fullscreen Button
                var mediaControllerFullscreen = document.querySelectorAll(".med + nav > [data-vid-flscrn]"),
                    mediaControllerFullscreenBin = [false]
                    
                // Add the events
                for (i = 0; i < mediaControllerFullscreen.length; i++) {
                    // Media
                    media[i].addEventListener("dblclick", fullMedia)

                    // Fullscreen Button
                    mediaControllerFullscreen[i].addEventListener("click", fullMedia)

                    // Create toggles
                    mediaControllerFullscreenBin[i] = false
                }

                function fullMedia() {
                    // Only support <video> elements
                    if (media[this.getAttribute("data-index")].tagName == "VIDEO") {
                        if (!mediaControllerFullscreenBin[i]) {
                            // Append the "data-fullscreen" attribute
                            media[this.getAttribute("data-index")].setAttribute("data-fullscreen", "")

                            // Set the console to fullscreen
                            if (
                                (document.fullScreenElement && document.fullScreenElement !== null) ||
                                (!document.mozFullScreen && !document.webkitIsFullScreen)
                            )
                                if (media[this.getAttribute("data-index")].requestFullScreen)
                                    media[this.getAttribute("data-index")].requestFullScreen()
                            
                                else if (media[this.getAttribute("data-index")].mozRequestFullScreen)
                                    media[this.getAttribute("data-index")].mozRequestFullScreen()
                            
                                else if (media[this.getAttribute("data-index")].webkitRequestFullScreen)
                                    media[this.getAttribute("data-index")].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
                        } else {
                            // Append the "data-fullscreen" attribute
                            media[this.getAttribute("data-index")].removeAttribute("data-fullscreen")

                            // Set the console to normal view
                            if (document.cancelFullScreen)
                                document.cancelFullScreen()
                            
                            else if (document.mozCancelFullScreen)
                                document.mozCancelFullScreen()
                            
                            else if (document.webkitCancelFullScreen)
                                document.webkitCancelFullScreen()
                        }

                        mediaControllerFullscreenBin[i] = !mediaControllerFullscreenBin[i]
                    }
                }
            }
        
        /* ToolTip (or ScreenTip) */
            // Definition
                // Tooltip
                var tooltip = document.createElement("div"),
                // [data-title]
                tooltipElements = document.querySelectorAll("[data-title]")

            // Place the tooltip in the document
            body.appendChild(tooltip)
            
            // Identify and mark the tooltip
            tooltip.insertAdjacentHTML("beforebegin", "<!-- Tooltip -->")
            tooltip.setAttribute("id", "tooltip")

            // Hide the tooltip on received input
            body.addEventListener("click", hideTooltip)
            body.addEventListener("keydown", hideTooltip)
            body.addEventListener("keypress", hideTooltip)
            body.addEventListener("mousedown", hideTooltip)

            function hideTooltip() {
                setTimeout(function() {
                    tooltip.style.display = "none"
                }, 500)
            }
            
            // Mark all elements with the tooltip element
            for (i = 0; i < tooltipElements.length; i++) {
                // Add the event
                tooltipElements[i].onmouseover = function() {
                    // Show the tooltip and position it
                    tooltip.innerHTML = this.getAttribute("data-title")

                    tooltip.style.display = "inline"
                    tooltip.style.opacity = "1"

                    // Create variables for the tooltip's positioning
                    var tooltipLeft = 0,
                        tooltipMarginLeft = 0,
                        tooltipTop = 0,
                        tooltipMarginTop = 0

                    // Default Spacing
                    tooltipMarginLeft = (this.getBoundingClientRect().width * (10 / 100))
                        
                        if (tooltipMarginLeft >= (body.getBoundingClientRect().width / 10))
                            tooltipMarginLeft = ((body.getBoundingClientRect().width / 10) / 10)


                    tooltipMarginTop = (this.getBoundingClientRect().height * (10 / 100))
                        
                        if (tooltipMarginTop >= (body.getBoundingClientRect().height / 10))
                            tooltipMarginTop = ((body.getBoundingClientRect().height / 10) / 10)

                    // Default Positioning
                    tooltipLeft = ((event.clientX + (this.getBoundingClientRect().left + (this.getBoundingClientRect().width / 2))) / 2) + tooltipMarginLeft
                    tooltipTop = ((event.clientY + (this.getBoundingClientRect().top + (this.getBoundingClientRect().height / 2))) / 2) + tooltipMarginTop

                    // Preset Positioning
                        // Bottom
                        if (
                            this.getAttribute("data-title").search("_bottom") >= 0 &&
                            this.getAttribute("data-title").search("_bottom") <= this.getAttribute("data-title").lastIndexOf("_bottom")
                        ) {
                            // Remove the "_bottom".
                            tooltip.innerHTML = tooltip.innerHTML.replace(/_bottom([^_bottom]*)$/, "$1")

                            // Position the tooltip.
                            tooltipTop = (this.getBoundingClientRect().top + this.getBoundingClientRect().height + tooltip.getBoundingClientRect().height) + tooltipMarginTop
                        }
                            // Bottom Left
                            if (
                                    this.getAttribute("data-title").search("_bottom") >= 0 &&
                                    this.getAttribute("data-title").search("_bottom") <= (this.getAttribute("data-title").lastIndexOf("_bottom") + this.getAttribute("data-title").lastIndexOf("_left"))
                                        &&
                                    this.getAttribute("data-title").search("_left") >= 0 &&
                                    this.getAttribute("data-title").search("_left") <= (this.getAttribute("data-title").lastIndexOf("_left") + this.getAttribute("data-title").lastIndexOf("_bottom"))
                            ) {
                                // Remove the "_bottom" and "_left".
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_bottom_left([^_bottom_left]*)$/, "$1")
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_left_bottom([^_left_bottom]*)$/, "$1")

                                // Position the tooltip.
                                tooltipLeft = (this.getBoundingClientRect().left - tooltip.getBoundingClientRect().width) - tooltipMarginLeft
                                tooltipTop = (this.getBoundingClientRect().top + this.getBoundingClientRect().height + tooltip.getBoundingClientRect().height) + tooltipMarginTop
                            }
                            // Bottom Center
                            if (
                                    this.getAttribute("data-title").search("_bottom") >= 0 &&
                                    this.getAttribute("data-title").search("_bottom") <= (this.getAttribute("data-title").lastIndexOf("_bottom") + this.getAttribute("data-title").lastIndexOf("_center"))
                                        &&
                                    this.getAttribute("data-title").search("_center") >= 0 &&
                                    this.getAttribute("data-title").search("_center") <= (this.getAttribute("data-title").lastIndexOf("_center") + this.getAttribute("data-title").lastIndexOf("_bottom"))
                            ) {
                                // Remove the "_bottom" and "_center".
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_bottom_center([^_bottom_center]*)$/, "$1")
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_center_bottom([^_center_bottom]*)$/, "$1")

                                // Position the tooltip.
                                tooltipLeft = this.getBoundingClientRect().left + (this.getBoundingClientRect().width / 2) - (tooltip.getBoundingClientRect().width / 2)
                                tooltipTop = (this.getBoundingClientRect().top + this.getBoundingClientRect().height + tooltip.getBoundingClientRect().height) + tooltipMarginTop
                            }
                            // Bottom Right
                            if (
                                    this.getAttribute("data-title").search("_bottom") >= 0 &&
                                    this.getAttribute("data-title").search("_bottom") <= (this.getAttribute("data-title").lastIndexOf("_bottom") + this.getAttribute("data-title").lastIndexOf("_right"))
                                        &&
                                    this.getAttribute("data-title").search("_right") >= 0 &&
                                    this.getAttribute("data-title").search("_right") <= (this.getAttribute("data-title").lastIndexOf("_right") + this.getAttribute("data-title").lastIndexOf("_bottom"))
                            ) {
                                // Remove the "_bottom" and "_right".
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_bottom_right([^_bottom_right]*)$/, "$1")
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_right_bottom([^_right_bottom]*)$/, "$1")

                                // Position the tooltip.
                                tooltipLeft = (this.getBoundingClientRect().left + this.getBoundingClientRect().width) + tooltipMarginLeft
                                tooltipTop = (this.getBoundingClientRect().top + this.getBoundingClientRect().height + tooltip.getBoundingClientRect().height) + tooltipMarginTop
                            }
                        // Center
                        if (
                                this.getAttribute("data-title").search("_center") >= 0 &&
                            this.getAttribute("data-title").search("_center") <= this.getAttribute("data-title").lastIndexOf("_center")
                        ) {
                            // Remove the "_center".
                            tooltip.innerHTML = tooltip.innerHTML.replace(/_center([^_center]*)$/, "$1")

                            // Position the tooltip.
                            tooltipLeft = this.getBoundingClientRect().left + (this.getBoundingClientRect().width / 2) - (tooltip.getBoundingClientRect().width / 2)
                            tooltipTop = this.getBoundingClientRect().top + (this.getBoundingClientRect().height / 2) - (tooltip.getBoundingClientRect().height / 2)
                        }
                            // Center Left
                            if (
                                    this.getAttribute("data-title").search("_center") >= 0 &&
                                    this.getAttribute("data-title").search("_center") <= (this.getAttribute("data-title").lastIndexOf("_center") + this.getAttribute("data-title").lastIndexOf("_left"))
                                        &&
                                    this.getAttribute("data-title").search("_left") >= 0 &&
                                    this.getAttribute("data-title").search("_left") <= (this.getAttribute("data-title").lastIndexOf("_left") + this.getAttribute("data-title").lastIndexOf("_center"))
                            ) {
                                // Remove the "_center" and "_left".
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_center_left([^_center_left]*)$/, "$1")
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_left_center([^_left_center]*)$/, "$1")

                                // Position the tooltip.
                                tooltipLeft = (this.getBoundingClientRect().left - tooltip.getBoundingClientRect().width) - tooltipMarginLeft
                                tooltipTop = this.getBoundingClientRect().top + (this.getBoundingClientRect().height / 2) - (tooltip.getBoundingClientRect().height / 2)
                            }
                            // Center Right
                            if (
                                    this.getAttribute("data-title").search("_center") >= 0 &&
                                    this.getAttribute("data-title").search("_center") <= (this.getAttribute("data-title").lastIndexOf("_center") + this.getAttribute("data-title").lastIndexOf("_right"))
                                        &&
                                    this.getAttribute("data-title").search("_right") >= 0 &&
                                    this.getAttribute("data-title").search("_right") <= (this.getAttribute("data-title").lastIndexOf("_right") + this.getAttribute("data-title").lastIndexOf("_center"))
                            ) {
                                // Remove the "_center" and "_right".
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_center_right([^_center_right]*)$/, "$1")
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_right_center([^_right_center]*)$/, "$1")

                                // Position the tooltip.
                                tooltipLeft = (this.getBoundingClientRect().left + this.getBoundingClientRect().width) + tooltipMarginLeft
                                tooltipTop = this.getBoundingClientRect().top + (this.getBoundingClientRect().height / 2) - (tooltip.getBoundingClientRect().height / 2)
                            }
                    // Top
                        if (
                            this.getAttribute("data-title").search("_top") >= 0 &&
                            this.getAttribute("data-title").search("_top") <= this.getAttribute("data-title").lastIndexOf("_top")
                        ) {
                            // Remove the "_top".
                            tooltip.innerHTML = tooltip.innerHTML.replace(/_top([^_top]*)$/, "$1")

                            // Position the tooltip.
                            tooltipTop = (this.getBoundingClientRect().top - tooltip.getBoundingClientRect().height) - tooltipMarginTop
                        }
                            // Top Left
                            if (
                                    this.getAttribute("data-title").search("_top") >= 0 &&
                                    this.getAttribute("data-title").search("_top") <= (this.getAttribute("data-title").lastIndexOf("_top") + this.getAttribute("data-title").lastIndexOf("_left"))
                                        &&
                                    this.getAttribute("data-title").search("_left") >= 0 &&
                                    this.getAttribute("data-title").search("_left") <= (this.getAttribute("data-title").lastIndexOf("_left") + this.getAttribute("data-title").lastIndexOf("_top"))
                            ) {
                                // Remove the "_top" and "_left".
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_top_left([^_top_left]*)$/, "$1")
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_left_top([^_left_top]*)$/, "$1")

                                // Position the tooltip.
                                tooltipLeft = (this.getBoundingClientRect().left - tooltip.getBoundingClientRect().width) - tooltipMarginLeft
                                tooltipTop = (this.getBoundingClientRect().top - tooltip.getBoundingClientRect().height) - tooltipMarginTop
                            }
                            // Top Center
                            if (
                                    this.getAttribute("data-title").search("_top") >= 0 &&
                                    this.getAttribute("data-title").search("_top") <= (this.getAttribute("data-title").lastIndexOf("_top") + this.getAttribute("data-title").lastIndexOf("_center"))
                                        &&
                                    this.getAttribute("data-title").search("_center") >= 0 &&
                                    this.getAttribute("data-title").search("_center") <= (this.getAttribute("data-title").lastIndexOf("_center") + this.getAttribute("data-title").lastIndexOf("_top"))
                            ) {
                                // Remove the "_top" and "_center".
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_top_center([^_top_center]*)$/, "$1")
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_center_top([^_center_top]*)$/, "$1")

                                // Position the tooltip.
                                tooltipLeft = this.getBoundingClientRect().left + (this.getBoundingClientRect().width / 2) - (tooltip.getBoundingClientRect().width / 2)
                                tooltipTop = (this.getBoundingClientRect().top - tooltip.getBoundingClientRect().height) - tooltipMarginTop
                            }
                            // Top Right
                            if (
                                    this.getAttribute("data-title").search("_top") >= 0 &&
                                    this.getAttribute("data-title").search("_top") <= (this.getAttribute("data-title").lastIndexOf("_top") + this.getAttribute("data-title").lastIndexOf("_right"))
                                        &&
                                    this.getAttribute("data-title").search("_right") >= 0 &&
                                    this.getAttribute("data-title").search("_right") <= (this.getAttribute("data-title").lastIndexOf("_right") + this.getAttribute("data-title").lastIndexOf("_top"))
                            ) {
                                // Remove the "_top" and "_right".
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_top_right([^_top_right]*)$/, "$1")
                                tooltip.innerHTML = tooltip.innerHTML.replace(/_right_top([^_right_top]*)$/, "$1")

                                // Position the tooltip.
                                tooltipLeft = (this.getBoundingClientRect().left + this.getBoundingClientRect().width) + tooltipMarginLeft
                                tooltipTop = (this.getBoundingClientRect().top - tooltip.getBoundingClientRect().height) - tooltipMarginTop
                            }

                    // Off-screen Corrective Positioning (on the center-axis)
                    if ((tooltip.getBoundingClientRect().left + tooltip.clientWidth) > body.clientWidth)
                        tooltipLeft = tooltipLeft - (tooltip.clientWidth / 2) - (tooltipMarginLeft + (tooltipMarginLeft / 2))

                    // Remove any obstructions to the tooltip
                        // Required Elements
                        if (this.hasAttribute("required") ||
                            this.required) {
                            this.removeAttribute("required")
                            this.setAttribute("title", "")

                            this.tooltipBefore = this.getAttribute("title")
                                if (!this.tooltipBefore || this.tooltipBefore == "")
                                    this.tooltipBefore == false

                            this.onceRequired = true
                        }

                        /* Titled Elements
                                Two tooltips are not flexible on a
                                single element.
                        */
                        if (this.hasAttribute("title"))
                            this.removeAttribute("title")

                    // Hide the tooltip regardless
                    if (this.getAttribute("data-title").lastIndexOf("_hidden") >= 0) {
                        // Remove the "_hidden".
                        tooltip.innerHTML = tooltip.innerHTML.replace(/_hidden([^_hidden]*)$/, "$1")

                        tooltip.style.opacity = "0"
                    }

                    tooltip.style.transform = "translate(" +
                        tooltipLeft + "px, " +
                        tooltipTop + "px" +
                    ")"
                }

                // Hide the tooltip
                tooltipElements[i].onmouseleave = function() {
                    tooltip.style.opacity = "0"

                    // Correct any alterations made from corrections
                        // Required Elements
                        if (this.onceRequired) {
                            this.setAttribute("required", "")
                            
                            if (this.tooltipBefore)
                                this.setAttribute("title", this.tooltipBefore)
                            
                            this.onceRequired = false
                        }
                }
            }

    /* Lapys JS Class Sets
            --- NOTE ---
                The script is repeated over in-case
                of any event that causes a
                change in styles (such as resizing).
    */
    setInterval(function() {
        for (i = 0; i < all.length; i++) {
            if (all[i].hasAttribute("class")) {
                // Height Preset
                    // h-device-height
                    if (all[i].getAttribute("class").indexOf("h-device-height") >= 0)
                        all[i].style.height = device.height + "px"
                    // h-style
                    if (all[i].getAttribute("class").indexOf("h-style") >= 0)
                        all[i].style.height = all[i].clientHeight + "px"
                    // h-width
                    if (all[i].getAttribute("class").indexOf("h-width") >= 0)
                        all[i].style.height = all[i].clientWidth + "px"
                // Margin Preset
                    // m-parent-center
                    if (all[i].getAttribute("class").indexOf("m-parent-center") >= 0)
                        if (
                            all[i].parentNode.clientHeight < body.clientHeight &&
                            all[i].parentNode.clientWidth < body.clientWidth
                        )
                            all[i].style.margin = (
                                // Vertical Margin
                                (function() {
                                    if (all[i].parentNode)
                                        var verticalMargin = ((all[i].parentNode.clientHeight / 2) - (all[i].clientHeight / 2))

                                        if (
                                            verticalMargin == 0 ||
                                            !verticalMargin ||
                                            verticalMargin >= body.clientHeight
                                        )
                                            return "auto "
                                        else
                                            return verticalMargin + "px "
                                })() + 
                                // Horizontal Margin
                                (function() {
                                    if (all[i].parentNode)
                                        var horizontalMargin = ((all[i].parentNode.clientWidth / 2) - (all[i].clientWidth / 2))

                                        if (
                                            horizontalMargin == 0 ||
                                            !horizontalMargin ||
                                            horizontalMargin >= body.clientWidth
                                        )
                                            return "auto"
                                        else
                                            return horizontalMargin + "px"
                                })()
                            )
                // Width Preset
                    // w-device-width
                    if (all[i].getAttribute("class").indexOf("w-device-width") >= 0)
                        all[i].style.width = device.width + "px"
                    // w-height
                    if (all[i].getAttribute("class").indexOf("w-height") >= 0)
                        all[i].style.width = all[i].clientHeight + "px"
                    // w-style
                    if (all[i].getAttribute("class").indexOf("w-style") >= 0)
                        all[i].style.width = all[i].clientWidth + "px"
            }
        }
    }, 1)

    /* Lapys JS (All) HTML Elements */
    for (i = 0; i < all.length; i++) {
        // Modification
            // Indexing
            all[i].nodeIndex = i

        // All elements excluding <html>
        if (all[i] != html) {
            // <lorem> for <input>
            if (all[i].tagName == "INPUT") {
                if (all[i].hasAttribute("value")) {
                    if (all[i].getAttribute("value").indexOf(":lorem1:") >= 0)
                        all[i].value = loremHTMLLevel1

                    if (all[i].getAttribute("value").indexOf(":lorem2:") >= 0)
                        all[i].value = loremHTMLLevel2

                    if (all[i].getAttribute("value").indexOf(":lorem3:") >= 0)
                        all[i].value = loremHTMLLevel3

                    if (all[i].getAttribute("value").indexOf(":lorem4:") >= 0)
                        all[i].value = loremHTMLLevel4

                    if (all[i].getAttribute("value").indexOf(":lorem5:") >= 0)
                        all[i].value = loremHTMLLevel5

                }
            }
            // <lorem> for <textarea>
            if (all[i].tagName == "TEXTAREA") {
                if (all[i].value.indexOf("<lorem 1>") >= 0)
                    all[i].value = all[i].value.replace("<lorem 1>", loremHTMLLevel1).slice(0, -10)

                if (all[i].value.indexOf("<lorem 2>") >= 0)
                    all[i].value = all[i].value.replace("<lorem 2>", loremHTMLLevel2).slice(0, -10)

                if (all[i].value.indexOf("<lorem 3>") >= 0)
                    all[i].value = all[i].value.replace("<lorem 3>", loremHTMLLevel3).slice(0, -10)

                if (all[i].value.indexOf("<lorem 4>") >= 0)
                    all[i].value = all[i].value.replace("<lorem 4>", loremHTMLLevel4).slice(0, -10)

                if (all[i].value.indexOf("<lorem 5>") >= 0)
                    all[i].value = all[i].value.replace("<lorem 5>", loremHTMLLevel5).slice(0, -10)

            }
            // Search for resize-able elements and reset their size when double-clicked
            if (!all[i].hasAttribute("data-resize")) {
                if (window.getComputedStyle(all[i]).getPropertyValue("resize") == "horizontal" ||
                    window.getComputedStyle(all[i]).getPropertyValue("resize") == "vertical" ||
                    window.getComputedStyle(all[i]).getPropertyValue("resize") == "both") {
                    
                    // Collect the initially set height and width of the resize-able element
                    var elementsResizeCSSHeight = [  ],
                        elementsResizeCSSWidth = [  ]

                    // Reset the object size
                    all[i].ondblclick = function() {
                        this.style.height = this.getAttribute("data-height")
                        this.style.width = this.getAttribute("data-width")
                    }
                    
                    // Get the collected size of each object
                    all[i].setAttribute("data-height", window.getComputedStyle(all[i]).getPropertyValue("height"))
                    all[i].setAttribute("data-width", window.getComputedStyle(all[i]).getPropertyValue("width"))
                }
            }
        }
    }

    /* Console */
    if (document.getElementsByTagName("html")[0].getAttribute("data-console") != "off") {
        // Brand LapysJS
        if (!LapysJS.executed)
            console.info("%c \tThank you for getting LapysJS\n\t\twe hope you enjoy the experience.", "font-family: Calibri Light")

        // Console Warnings
        for (i = 0; i < all.length; i++) {
            // Deprecated elements
            if (all[i].tagName == "ACRONYM" || all[i].tagName == "APPLET" ||
                all[i].tagName == "BASEFONT" ||
                all[i].tagName == "CONTENT" ||
                all[i].tagName == "DIR" ||
                all[i].tagName == "EMBED" ||
                all[i].tagName == "FONT" ||
                all[i].tagName == "ISINDEX" ||
                all[i].tagName == "KEYGEN" ||
                all[i].tagName == "LISTING" ||
                all[i].tagName == "MARQUEE" || all[i].tagName == "MENU" ||
                all[i].tagName == "NOBR" ||
                all[i].tagName == "PLAINTEXT" ||
                all[i].tagName == "S" || all[i].tagName == "STRIKE" || all[i].tagName == "SPACER" ||
                all[i].tagName == "TT" ||
                all[i].tagName == "U" ||
                all[i].tagName == "XMP")
                console.warn("%c The <" + all[i].localName +
                    "> element is obsolete. Although it may still work in some browsers, its use is discouraged since it could be removed at any time. Try to avoid using it.", "font-family: 'Calibri Light'")
            
            // Useful but deprecated elements
            if (all[i].tagName == "BIG" || all[i].tagName == "CENTER")
                console.warn("%c The <" + all[i].localName +
                    "> element is useful, but is still deprecated.", "font-family: 'Calibri Light'")
        }
            // Multiple elements
                // <body>
                if (document.getElementsByTagName("body")[1])
                    console.warn("%c It is advised to use only 1 <body> element.", "font-family: 'Calibri Light'")
                // <head>
                if (document.getElementsByTagName("head")[1])
                    console.warn("%c It is advised to use only 1 <head> element.", "font-family: 'Calibri Light'")
                // <html>
                if (document.getElementsByTagName("html")[1])
                    console.warn("%c It is advised to use only 1 <html> element.", "font-family: 'Calibri Light'")
                // <main>
                if (document.getElementsByTagName("main")[1])
                    console.warn("%c It is advised to use only 1 <main> element.", "font-family: 'Calibri Light'")
    }

    /* Execution
        --- WARN ---
            The LapysJS script must run only once.
    */
    LapysJS.executed = true
})()
} else {
    // Throw an error if the global 'window' object does not exist.
    throw new Error("LapysJS v" + LapysJS.version + " does not function without the global 'window' object.")
}