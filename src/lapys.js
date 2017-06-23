/* Strict Mode */
"use strict";

/* Lapys Object
    --- NOTE ---
        Used for referencing data used
        within functions.
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
        document.querySelectorAll('script[src*="lapys.js"]')[0].src ||
        document.querySelectorAll('script[src*="lapys.min.js"]')[0].src,

    // Execution Time
    lastExecuted : "Last executed on: " + Date(),

    // Name (Title)
    name : "LapysJS",
 
    // Strict Mode
    strictMode : (function() {
        return !this
    })(),

    // Version
    version : "0.0.1"
}

/* Function */
    // Document Loader
    function documentLoader(innerHTML) {
        // Initialization
        var loaderElement = document.createElement("div")

        /* --- NOTE --- 
                If
                    the <body> has a child.
        */
        if (document.body.children[0])
            // Insertion
            document.body.insertBefore(
                loaderElement,
                document.body.children[0]
            )

        // …else
        else
            // Insertion
            document.body.appendChild(loaderElement)

        /* --- NOTE ---
                If
                    "innerHTML" is "undefined".
        */
        if (innerHTML == undefined)
            innerHTML = (
                '<div ' +
                    'data-title="Loading, please wait…_center_top" ' +
                    'data-title-class="fnt-sz-m p-1"' +
                ' > </div>'
            )

        // Modification
            // ID
            loaderElement.id = "documentLoader"
            loaderElement.innerHTML = innerHTML

        // Style
            // This function runs near realtime.
            setInterval(function() {
                loaderElement.style.height = window.innerHeight + "px"
            }, 1)

        // Event
        window.onload = function() { deleteDocumentLoader() }

        // Function
        function deleteDocumentLoader() {
            loaderElement.parentNode.removeChild(loaderElement)
        }
    }

/* Global Object Test
        --- NOTE ---
            If
                the global 'window' object
                exists
                    and
                LapysJS has not been
                executed.
*/
if (
    window &&
    this == window &&
    !LapysJS.executed
) {
    /* Syntax */
        // Clear Console
        var clear = function() {
            // Return
            return console.clear()
        }

        // Create Element
        var create = function(element) {
            // Return
            return document.createElement(element)
        }

        // CSS Functions
        var css = {
            // Create <link>
            add : function(href, media, rel, type) {
                // Insertion
                if (!document.querySelectorAll('link[href="' + href + '"][media="' + media + '"][rel="' + rel + '"][type="' + type + '"]')[0])
                    document.getElementsByTagName("head")[0].innerHTML += (
                        '<link href="' + href + '" media="' + media + '" rel="' + rel + '" type="' + type + '">'
                    )
            },
            
            // Create <style>
            style : function(dataKey, selector, property, atRule) {
                // Initialization
                var cssStyle = document.createElement("style")
                
                // Modification
                    // [data-key]
                    cssStyle.setAttribute("data-key", dataKey)
                
                // Insertion
                if (!document.querySelectorAll('style[data-key="' + dataKey + '"]')[0])
                    document.getElementsByTagName("head")[0].appendChild(cssStyle)
                
                /* --- NOTE ---
                        If
                            "atRule" is "undefined".
                */
                if (atRule == undefined)
                    cssStyle.innerHTML += "\n" + selector + " { " + property + " }"

                // …else
                else
                    cssStyle.innerHTML += "\n" + selector + " { " + property + " } " + atRule
            }
        }

        // Delete Functions
        var del = {
            // Delete Attribute
            attr : function(element, attribute) {
                // Return
                return element.removeAttribute(attribute)
            },
            
            // Delete Element Class
            class : function(element, className) {
                /* --- NOTE ---
                        If
                            the element does not have a
                            class value.
                */
                if (element.className == "") {
                    // Do nothing…
                }

                // …else
                else {
                    // Index all the element's class values.
                    for (i = 0; i < element.classList.length; i++)
                        /* --- NOTE ---
                                If
                                    a match is found, remove the class given.
                        */
                        if (className == element.classList[i])
                            element.classList.value = element.classList.value.replace(className, "")

                    /* --- NOTE ---
                            If
                                there is only one class,
                                remove all white-spaces.
                    */
                    if (element.classList[1] == undefined)
                        element.classList.value = element.classList.value.replace(/ /g, "")

                    /* --- NOTE ---
                            If
                                there is white-space before
                                any class value, remove it.
                    */
                    if (element.classList.value.indexOf(" ") == 0)
                        element.classList.value = element.classList.value.replace(" ", "")                    
                }
            },

            // Delete event
            event : function(element, event, func) {
                // Return
                return element.removeEventListener(event, func)
            },

            // Delete <link>
            link : function(href, media, rel, type) {
                /* --- NOTE ---
                        If
                            the element exists.
                */
                if (document.querySelectorAll('link[href="' + href + '"][media="' + media + '"][rel="' + rel + '"]')[0])
                    /* --- NOTE ---
                            If
                                the "type" attribute is specified.
                    */
                    if (type != undefined)
                        document.getElementsByTagName("head")[0].removeChild(
                            document.querySelectorAll('link[href="' + href + '"][media="' + media + '"][rel="' + rel + '"][type="' + type + '"]')[0]
                        )
                    
                    // …else
                    else
                        document.getElementsByTagName("head")[0].removeChild(
                            document.querySelectorAll('link[href="' + href + '"][media="' + media + '"][rel="' + rel + '"]')[0]
                        )
            },
            
            // Delete HTML
            html : function(element, index) {
                // If "index" is "undefined".
                if (index == undefined)
                    // If the element exists.
                    if (element)
                        // Return
                        return element.parentNode.removeChild(element)

                    // …else
                    else {
                        // Do nothing…
                    }

                // …else
                else
                    // If the elem element exists.
                    if (element[index])
                        // Return
                        return element[index].parentNode.removeChild(element[index])
            },

            // Delete inline CSS
            inlineStyle : function(element, style) {
                /* --- NOTE ---
                        If
                            the element has the "style" attribute.
                */
                if (element.hasAttribute("style"))
                    // Replace the CSS style and its value with "''".
                    element.style = element.getAttribute("style").replace(
                        // Collect the CSS style and its value.
                        element.getAttribute("style").slice(
                            // The first instance of the style.
                                // [property]
                                element.getAttribute("style").indexOf(style),
                            
                            // The length of the style and its value.
                                // [property: value]
                                (function() {
                                    /* --- NOTE ---
                                            If
                                                [property: value]
                                    */
                                    if (element.getAttribute("style").indexOf(style + ": " + element.style[style]) >= 0)
                                        // Return
                                        return (element.getAttribute("style").indexOf(style) + (style + ": " + element.style[style]).toString().length)
                                    
                                    /* --- NOTE ---
                                            else if
                                                [property:value]
                                    */
                                    else if (element.getAttribute("style").indexOf(style + ":" + element.style[style]) >= 0)
                                        // Return
                                        return (element.getAttribute("style").indexOf(style) + (style + ":" + element.style[style]).toString().length)

                                    /* --- NOTE ---
                                            else if
                                                [property :value]
                                    */
                                    else if (element.getAttribute("style").indexOf(style + " :" + element.style[style]) >= 0)
                                        // Return
                                        return (element.getAttribute("style").indexOf(style) + (style + " :" + element.style[style]).toString().length)

                                    /* --- NOTE ---
                                            else if
                                                [property : value]
                                    */
                                    else if (element.getAttribute("style").indexOf(style + " : " + element.style[style]) >= 0)
                                        // Return
                                        return (element.getAttribute("style").indexOf(style) + (style + " : " + element.style[style]).toString().length)

                                    // …else
                                    else
                                        return 0
                                })() +

                                // [value;]
                                (function() {
                                    /* --- NOTE ---
                                            If
                                                [value; ]
                                    */
                                    if (element.getAttribute("style").indexOf(element.style[style] + "; ") >= 0)
                                        // Return
                                        return (element.getAttribute("style").indexOf(style) + "; ".length)
                                    
                                    /* --- NOTE ---
                                            else if
                                                [value ;]
                                    */
                                    else if (element.getAttribute("style").indexOf(element.style[style] + " ;") >= 0)
                                        // Return
                                        return (element.getAttribute("style").indexOf(style) + " ;".length)

                                    /* --- NOTE ---
                                            else if
                                                [value;]
                                    */
                                    else if (element.getAttribute("style").indexOf(element.style[style] + ";") >= 0)
                                        // Return
                                        return (element.getAttribute("style").indexOf(style) + ";".length)

                                    /* --- NOTE ---
                                            else if
                                                [value ; ]
                                    */
                                    else if (element.getAttribute("style").indexOf(element.style[style] + " ; ") >= 0)
                                        // Return
                                        return (element.getAttribute("style").indexOf(style) + " ; ".length)

                                    // …else
                                    else
                                        // Return
                                        return 0
                                })()
                        ),

                        // Replace with nothing.
                        ""
                    )

                // Remove the "style" attribute if it becomes 'empty'.
                if (element.getAttribute("style") == "")
                    element.removeAttribute("style")
            },

            // Delete <style>
            style : function(dataKey) {
                /* --- NOTE ---
                        If 
                            the element exists.
                */
                if (document.querySelectorAll('style[data-key="' + dataKey + '"]')[0])
                    document.querySelectorAll('style[data-key="' + dataKey + '"]')[0].parentNode.removeChild(
                        document.querySelectorAll('style[data-key="' + dataKey + '"]')[0]
                    )
            }
        }

        // Directory
        var dir = {
            // Complete URL
            fullPath : location.href,

            // Host
            host : location.host,

            // Host Name
            hostName : location.hostName,

            // Query Strings
            qs : (function() {
                // Initialization
                    // URL
                    var URL = location.search

                    // URL Query
                    var URLQuery = { }

                    // URL Query Toggle
                    var URLQueryOnce = false

                // For the number of "=" in the "search" property of "location".
                for (i = 0; i < (location.search.match(/=/g) || []).length; i++) {
                    /* --- NOTE ---
                            If
                                "URLQueryOnce" is "false".
                    */
                    if (!URLQueryOnce) {
                        /* --- NOTE ---
                                If
                                    "URL" has "&" in it.
                        */
                        if (URL.indexOf("&") >= 0)
                            // Create a new member in the "URLQuery" object.
                            URLQuery[
                                URL.slice(1, URL.indexOf("="))
                            ] = URL.slice(
                                    1,
                                    URL.indexOf("&")
                                ).slice(URL.indexOf("="))

                        // …else
                        else
                            // Create a new member in the "URLQuery" object.
                            URLQuery[
                                URL.slice(1, URL.indexOf("="))
                            ] = URL.slice(URL.indexOf("="))

                        // Toggle
                        URLQueryOnce = true
                    }

                    // …else
                    else
                        /* --- NOTE ---
                                If
                                    "URL" has "&" in it.
                        */
                        if (URL.indexOf("&") >= 0)
                            // Create a new member in the "URLQuery" object.
                            URLQuery[
                                URL.slice(0, URL.indexOf("="))
                            ] = URL.slice(
                                    0,
                                    URL.indexOf("&")
                                ).slice(URL.indexOf("=") + "=".length)

                        // …else
                        else
                            // Create a new member in the "URLQuery" object.
                            URLQuery[URL.slice(0, URL.indexOf("="))] = URL.slice(URL.indexOf("=") + "=".length)

                    /* --- NOTE ---
                            If
                                "URL" has "&" in it.
                    */
                    if (URL.indexOf("&") >= 0)
                        // Modification
                        URL = URL.slice(URL.indexOf("&") + "&".length)

                    // …else
                    else
                        // Modification
                        URL = ""

                    /* --- NOTE ---
                            Add a "length" property to "URLQuery" to
                            count the length of members in the object.
                    */
                    URLQuery.length = i + 1
                }
                
                // Return
                return URLQuery
            })(),

            // Port
            origin : location.origin,

            // URL
            path : location.pathname,

            // Search
            search : location.search
        }
        
        // Files
        var file = {
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
            name : (function() {
                /* --- NOTE ---
                        If
                            the "pathname" property modified
                            is not "''".
                */
                if (location.pathname.split("/").pop() != "")
                    // Return
                    return location.pathname.split("/").pop()

                // …else
                else
                    // Return
                    return location.pathname.split("#").shift()
            })(),

            // Plug-ins
            plugIns : document.plugins,

            // Ready
            ready : document.readyState,

            // Scripts
            scripts : document.scripts,

            // Stylesheets
            stylesheets : document.styleSheets,

            // File System
            system : {
                // Request
                request : (window.requestFileSystem || window.webkitRequestFileSystem)
            },

            // Type
            type : (function() {
                // Return
                return (
                    // [If]
                    /[.]/.exec(
                        (function() {
                            if (location.pathname.split("/").pop() != "")
                                return location.pathname.split("/").pop()

                            else
                                return location.pathname.split("#").shift()
                        })())
                    ) ?

                        // [(true)]
                        /[^.]+$/.exec(
                            (function() {
                                if (location.pathname.split("/").pop() != "")
                                    return location.pathname.split("/").pop()

                                else
                                    return location.pathname.split("#").shift()
                            })()
                        )[0]

                        :
                    
                        // [(false)]
                        undefined
            })(),

            // Visibility
            visibility : document.visibilityState,

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
        }

        // has Functions
        var has = {
            // Has Attribute Node
            attr : function(attribute, element, index) {
                /* --- NOTE ---
                        If
                            "index" is "undefined".
                */
                if (index == undefined)
                    // If the element has the "attribute" specified.
                    if (element.hasAttribute(attribute))
                        // Return
                        return true

                    // …else
                    else
                        // Return
                        return false

                // …else
                else
                    // If the element has the "attribute" specified.
                    if (element[index].hasAttribute(attribute))
                        // Return
                        return true

                    // …else
                    else
                        // Return
                        return false
            },

            // Has Class Node
            class : function(className, element, index) {
                /* --- NOTE ---
                        If
                            "index" is "undefined".
                */
                if (index == undefined)
                    /* --- NOTE ---
                            If
                                the element has the class node.
                    */
                    if (element.className.indexOf(className) >= 0)
                        // Return
                        return true

                    // …else
                    else
                        // Return
                        return false

                // …else
                else
                    // If the element has the class node.
                    if (element[index].className.indexOf(className) >= 0)
                        // Return
                        return true

                    // …else
                    else
                        // Return
                        return false
            }
        }

        // insertAfter Function
        var insertAfter = function(element, nextSibling) {
            /* --- NOTE ---
                    The "nextSibling" has to defined in the DOM
                    before it can be placed after the "element".
            */
            nextSibling.parentNode.insertBefore(element, nextSibling)

            // Return
            return nextSibling.parentNode.insertBefore(nextSibling, element)
        }

        // insertBefore Function
        var insertBefore = function(element, previousSibling) {
            // Return
            return previousSibling.parentNode.insertBefore(element, previousSibling)
        }

        // Get Functions
        var get = {
            // Get Attribute
            attr : function(element, attribute, index) {
                // If "index" is "undefined".
                if (index == undefined)
                    // Return
                    return element.getAttribute(attribute)

                // …else
                else
                    // Return
                    return element[index].getAttribute(attribute)
            },

            // Get Class Attribute
            class : function(element, index) {
                // If "index" is "undefined".
                if (index == undefined)
                    // Return
                    return element.classList

                // …else
                else
                    // Return
                    return element[index].classList
            },

            // Get CSS
            css : function(property, element, index) {
                /* --- NOTE ---
                        If
                            the element exists.
                */
                if (element)
                    // If "index" is "undefined".
                    if (index == undefined)
                        /* --- NOTE ---
                                If
                                    the element has the specified "property".
                        */
                        if (element.style[property])
                            // Return
                            return element.style[property]

                        // …else
                        else
                            // Return
                            return window.getComputedStyle(element).getPropertyValue(property)

                    // …else
                    else
                        /* --- NOTE ---
                                If
                                    the element has the specified "property".
                        */
                        if (element[index].style[property])
                            // Return
                            return element[index].style[property]

                        // …else
                        else
                            // Return
                            return window.getComputedStyle(element[index]).getPropertyValue(property)
            },

            // Get CSS Nodes
            cssAttr : function(element, index) {
                // Initialization
                var elementCSSSelector

                /* --- NOTE ---
                        If
                            "index" is "undefined".
                */
                if (index == undefined) {
                    /* --- NOTE ---
                            If
                                the element has a "class" attribute.
                    */
                    if (element.hasAttribute("class"))
                        // Modification
                        elementCSSSelector += " ." + element.className.replace(/ /g, ".")

                    /* --- NOTE ---
                            If
                                the element has an "id" attribute.
                    */
                    if (element.hasAttribute("id"))
                        // Modification
                        elementCSSSelector += " " + "#" + element.id

                    /* --- NOTE ---
                            For
                                the number of attributes the
                                element has.
                    */
                    for (var i = 0; i < element.attributes.length; i++)
                        /* --- NOTE ---
                                If
                                    the attribute is
                                        not "class"
                                            and
                                        "id".
                        */
                        if (
                            element.attributes[i].name != "class" &&
                            element.attributes[i].name != "id"
                        )
                            // Modification
                            elementCSSSelector += ' ' + '[' + element.attributes[i].name + '="' + element.attributes[i].value + '"]'

                    // Modification
                        /* --- NOTE ---
                                If
                                    "elementCSSSelector" is
                                    still "undefined".
                        */
                        if (elementCSSSelector)
                            elementCSSSelector = elementCSSSelector.replace(
                                "undefined ", "").replace(
                                " #", "#").replace(
                                / \[/g, "["
                            )

                        return elementCSSSelector
                }

                // …else
                else {
                    /* --- NOTE ---
                            If
                                the element has a "class" attribute.
                    */
                    if (element[index].hasAttribute("class"))
                        // Modification
                        elementCSSSelector += " ." + element[index].className.replace(/ /g, ".")

                    /* --- NOTE ---
                            If
                                the element has an "id" attribute.
                    */
                    if (element[index].hasAttribute("id"))
                        // Modification
                        elementCSSSelector += " " + "#" + element[index].id

                    /* --- NOTE ---
                            For
                                the number of attributes the
                                element has.
                    */
                    for (var i = 0; i < element[index].attributes.length; i++)
                        /* --- NOTE ---
                                If
                                    the attribute is
                                        not "class"
                                            and
                                        "id".
                        */
                        if (
                            element[index].attributes[i].name != "class" &&
                            element[index].attributes[i].name != "id"
                        )
                            // Modification
                            elementCSSSelector += ' ' + '[' + element[index].attributes[i].name + '="' + element[index].attributes[i].value + '"]'

                    // Modification
                        /* --- NOTE ---
                                If
                                    "elementCSSSelector" is
                                    still "undefined".
                        */
                        if (elementCSSSelector)
                            elementCSSSelector = elementCSSSelector.replace(
                                "undefined ", "").replace(
                                " #", "#").replace(
                                / \[/g, "["
                            )

                        return elementCSSSelector
                }
            },

            // Get HTML
            html : function(element, index) {
                /* --- NOTE ---
                        If
                            "index" is "undefined".
                */
                if (index == undefined)
                    /* --- NOTE ---
                            If
                                a second element in the NodeList
                                does not exist.
                    */
                    if (!document.querySelectorAll(element)[1])
                        // Return
                        return document.querySelectorAll(element)[0]

                    // …else
                    else
                        // Return
                        return document.querySelectorAll(element)

                /* --- NOTE ---
                        else if
                            "index" is "_array",
                            give the array NodeList.
                */
                else if (index == "_array")
                    // Return
                    return document.querySelectorAll(element)

                // …else
                else
                    // Return
                    return document.querySelectorAll(element)[index]
            },

            // Get Screen Position
            screenPosition : function(element, position) {
                /* --- NOTE ---
                        If
                            "position" is "_bottom".
                */
                if (position == "_bottom")
                    // Return
                    return element.getBoundingClientRect().bottom

                /* --- NOTE ---
                        else if
                            "position" is "_left".
                */
                if (position == "_left")
                    // Return
                    return element.getBoundingClientRect().left

                /* --- NOTE ---
                        else if
                            "position" is "_right".
                */
                if (position == "_right")
                    // Return
                    return element.getBoundingClientRect().right

                /* --- NOTE ---
                        else if
                            "position" is "_top".
                */
                if (position == "_top")
                    // Return
                    return element.getBoundingClientRect().top
            }
        }

        // Assign Directory
        var goTo = function(directory) {
            // Return
            return location.assign(directory)
        }

        // Javascript Function
        var js = {
            // Link <script>
            add : function(src, type, sync) {
                // If "sync" is "undefined".
                if (sync == undefined)
                    document.getElementsByTagName("body")[0].innerHTML += (
                        '<script src="' + src + '" type="' + type + '"> </script>'
                    )

                // …else
                else
                    document.getElementsByTagName("body")[0].innerHTML += (
                        '<script ' + sync + ' src="' + src + '" type="' + type + '"> </script>'
                    )
            },

            // Create <script>
            script : function(dataKey, code) {
                // Initialization
                var jsScript = document.createElement("script")
                
                // Modification
                    // [data-key]
                    jsScript.setAttribute("data-key", dataKey)
                
                // Insertion
                document.getElementsByTagName("body")[0].appendChild(jsScript)
                
                // Content
                jsScript.innerHTML += "\n" + code + "\n"
            }
        }

        // Log Object
        var log = function(data) {
            // Return
            return console.log(data)
        }

        // Boolean Conversion
        var parseBool = function(data) {
            // Return
            return !!data
        }

        /* Indexing Order
            --- NOTE ---
                Useful for position prefix.

            --- UPDATE REQUIRED ---
                Code needs clean-up here.
        */
        var parseIndex = function(data) {
            /* --- NOTE ---
                If
                    the stringified data has the character "1"
                        and
                    does not have a second character
                        and
                    its second character is not "0".
            */
            if (data.toString().indexOf("1") == 0 &&
                data.toString()[1] != undefined &&
                data.toString()[1] != "0")
                return data + "th"

            /* --- NOTE ---
                    else if
                        its last character is "1".
            */
            else if (data.toString().lastIndexOf("1") == (data.toString().length - 1))
                // Return
                return data + "st"
            
            /* --- NOTE ---
                    else if
                        its last character is "2".
            */
            else if (data.toString().lastIndexOf("2") == (data.toString().length - 1))
                // Return
                return data + "nd"
            
            /* --- NOTE ---
                    else if
                        its last character is "3".
            */
            else if (data.toString().lastIndexOf("3") == (data.toString().length - 1))
                // Return
                return data + "rd"
            
            // …else
            else
                // Return
                return data + "th"
        }

        /* Stringify Object
            --- NOTE ---
                Converts HTML elements to text format
                using UTF-8 character encoding.
        */
        var parseString = function(data) {
            /* --- WARN ---
                "data" must be defined.
            */
            if (data[0] != undefined)
                /* --- NOTE ---
                        If
                            the "data" has a tag name (is an element).
                */
                if (data[0].tagName !== "ELEMENT")
                    // Return
                    return data.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")

                // …else
                else
                    // Return
                    return console.warn("Object data not found.")

            // …else
            else
                // Return
                return data.toString()
        }

        // Reload Document Function
        var refresh = function() {
            // Return
            return location.reload()
        }

        // Set Functions
        var set = {
            // Set Attribute
            attr : function(element, attribute, value) {
                /* --- NOTE ---
                        If
                            no value is given, append an empty value ("") to fulfill
                            both arguments of the setAttribute() function.
                */
                if (value == undefined)
                    // Return
                    return element.setAttribute(attribute, "")

                // …else
                else
                    // Return
                    return element.setAttribute(attribute, value)
            },

            // Set Class Attribute
            class : function(element, value) {
                /* --- NOTE ---
                        If
                            there is no class for the element,
                            append the given value directly.
                */
                if (element.className == "")
                    // Return
                    return element.classList.value = value

                // …else
                else
                    // Return
                    return element.classList.value += " " + value
            },

            /* Set CSS Nodes
                    --- UPDATE REQUIRED ---
                        Clean up code.
            */
            cssAttr : function(element, elementCSSSelector) {
                /* --- NOTE ---
                        If
                            the "elementCSSSelector" does not have a ".",
                            add a ".".
                */
                if (elementCSSSelector.indexOf(".") <= -1)
                    elementCSSSelector = "." + elementCSSSelector

                // CSS Selector
                elementCSSSelector = elementCSSSelector.replace(
                    // Class Node
                    /\./g, "_end__class_"
                ).replace(
                    // Class Attribute
                    /\[class/g, "_end__class_"

                ).replace(
                    // ID Node
                    /\#/g, "_end__id_"
                ).replace(
                    // ID Attribute
                    /\[id/g, "_end__id-attr_"

                ).replace(
                    // Attribute
                    /\[/g, "_end__attr_"

                ).replace(
                    // [End]
                    /\]/g, "_end_"

                // Miscellaneous
                ).replace(
                    /\*/g, ""
                ).replace(
                    /\+/g, ""
                ).replace(
                    /\'/g, ""
                ).replace(
                    /\"/g, ""
                ).replace(
                    /\¬/g, ""
                ).replace(
                    /\>/g, ""
                ).replace(
                    /\:/g, "_delete_"
                ) + "_end_"

                elementCSSSelector = elementCSSSelector.slice(elementCSSSelector.indexOf("_end_") + "_end_".length)

                elementCSSSelector = elementCSSSelector.replace(
                    elementCSSSelector.slice(
                        elementCSSSelector.indexOf("_delete_"),
                        (elementCSSSelector.lastIndexOf("_end_") + "_end_".length)
                    ),
                    ""
                )                

                // Class
                if (elementCSSSelector.indexOf("class_") >= 0)
                    element.className = (function() {
                        var elementClass

                        elementClass = elementCSSSelector

                        elementClass = elementClass.replace(/_class_/g, "")
                        elementClass = elementClass.replace("class_", "")
                        elementClass = elementClass.replace(/_end_/g, " ")
                        elementClass = elementClass.replace("end_", " ")
                        if (
                            elementClass.indexOf("attr_") != 0 &&
                            elementClass.indexOf("id_") != 0
                        )
                            elementClass = elementClass.slice(0, elementClass.indexOf("_"))
                        else
                            elementClass = elementClass.slice(elementClass.indexOf("  "))

                        if (elementClass[0] == " ")
                            elementClass = elementClass.slice(1)

                        if (elementClass[elementClass.length - 1] == " ") {
                            elementClass = elementClass.slice(0, -1)

                            if (elementClass[elementClass.length - 1] == " ")
                                elementClass = elementClass.slice(0, -1)
                        }

                        setTimeout(function() {
                            if (!element.classList[1])
                                elementClass = elementClass.replace(/ /g, "")
                        })

                        return elementClass.replace("  ", " ")
                    })()

                if (
                    element.className.indexOf("=") >= 0 ||
                    element.className.indexOf("_") >= 0
                )
                    element.className = element.className.replace("=", "").replace(/_/g, "")

                if (element.className == "")
                    element.removeAttribute("class")

                // ID
                if (elementCSSSelector.indexOf("_id_") >= 0)
                    element.id = (function() {
                        var elementID

                        elementID = elementCSSSelector

                        elementID = elementID.slice(elementID.indexOf("_id_") + "_id_".length)
                        elementID = elementID.slice(0, elementID.indexOf("_end_"))

                        return elementID
                    })()

                if (
                    element.id.indexOf("end") >= 0 ||
                    element.id.indexOf("#id") >= 0 ||
                    element.id.indexOf("_") >= 0
                )
                    element.id = element.id.replace("end", "").replace("#id", "").replace(/_/g, "")

                if (
                    element.id == "" ||
                    element.id.indexOf("=") >= 0
                )
                    element.removeAttribute("id")

                // Attribute
                var elementAttr = [ ]
                var elementAttrValue = elementCSSSelector

                if (elementCSSSelector.indexOf("_attr_") >= 0)
                    for (i = 0; i < (elementCSSSelector.match(/_attr_/g) || []).length; i++) {
                        elementAttr[i] = elementAttrValue.slice(elementAttrValue.indexOf("_attr_") + "_attr_".length)
                        elementAttr[i] = elementAttr[i].slice(0, elementAttr[i].indexOf("_end_"))

                        elementAttrValue = elementAttrValue.replace("_attr_" + elementAttr[i] + "_end_", "")

                        element.setAttribute(
                            elementAttr[i].slice(0, elementAttr[i].indexOf("=")),

                            elementAttr[i].slice(elementAttr[i].indexOf("=") + 1)
                        )
                    }
            },
            
            // Set Event
            event : function(element, event, func) {
                // Return
                return element.addEventListener(event, func)
            }
        }

        // Reload Javascript Function
        var scriptReload = function(element) {
            /* --- NOTE ---
                    If
                        element is "undefined".
            */
            if (element == undefined)
                // For every <script> element.
                for (var i = document.getElementsByTagName("script").length - 1; i >= 0; i--)
                    // Insertion
                    document.getElementsByTagName("body")[0].appendChild(
                        document.getElementsByTagName("script")[i]
                    )

            // …else
            else
                // Insertion
                element.parentNode.insertBefore(element, element)
        }

        // Write Object
        var write = function(data) {
            // Return
            return document.write(data)
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
        document.html = (
            document.getElementsByTagName("html")[0] ||
            document.body.parentNode ||
            document.head.parentNode ||
            document.children[0] ||
            document
        )

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
            if (
                    (!!window.opr && !!opr.addons) ||
                    !!window.opera ||
                    navigator.userAgent.indexOf("OPR/") >= 0
            ) {
                browser.opera = true
                browser.type = "Opera 8.0+"
            }

            // Mozila Firefox 1.0+
            if (typeof InstallTrigger !== "undefined") {
                browser.mozila = true
                browser.type = "Firefox 1.0+"
            }
            
            // Safari 3.0+
            if (
                /constructor/i.test(window.HTMLElement) ||

                (function(p) {
                    return p.toString() === "[object SafariRemoteNotification]" 
                })(!window["safari"] || safari.pushNotification)
            ) {
                browser.safari = true
                browser.type = "Safari 3.0+"
            }
            
            // Internet Explorer 6-11
            if (
                /*@cc_on!@*/ false ||
                !!document.documentMode
            ) {
                browser.IE = true
                browser.type = "Internet Explorer 6-11"
            }
            
            // Microsoft Edge 20+
            if (
                !( /*@cc_on!@*/ false || !!document.documentMode) &&
                !window.StyleMedia
            ) {
                browser.edge = true
                browser.type = "Edge 20+"
            }
            
            // Google Chrome 1+
            if (
                !!window.chrome &&
                !!window.chrome.webstore
            ) {
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
            // Avail Left
            availLeft : window.screen.availLeft,

            // Avail Height
            availHeight : window.screen.availHeight,

            // Avail Top
            availTop : window.screen.availTop,

            // Avail Width
            availWidth : window.screen.availWidth,

            // Color Depth
            colorDepth : window.screen.colorDepth,

            // Height
            height : window.screen.height,

            // Pixel Ratio
            pixelRatio : window.devicePixelRatio,

            // Screen Angle
            screenAngle : window.screen.orientation.angle,

            // Screen Orientation
            screenOrientation : window.screen.orientation.type,

            // Style Media
            styleMedia : window.styleMedia,

            // Width
            width : window.screen.width
        }

        // Operating System
        var OS = {
            // Is Macintosh?
            mac : false,

            // Is Linux?
            linux : false,

            // OS Vendor Type
            type : undefined,

            // Is Unix?
            unix : false,

            // Is Windows?
            windows : false
        }

            // WIndows
            if (navigator.appVersion.indexOf("Win") >= 0) {
                OS.windows = true
                OS.type = "Windows"
            }

            // Macintosh
            if (navigator.appVersion.indexOf("Mac") >= 0) {
                OS.mac = true
                OS.type = "Mac"
            }

            // Unix
            if (navigator.appVersion.indexOf("X11") >= 0) {
                OS.unix = true
                OS.type = "Unix"
            }

            // Linux
            if (navigator.appVersion.indexOf("Linux") >= 0) {
                OS.linux = true
                OS.type = "Linux"
            }
        
        // Random Number (within 1 and 10)
        var rand = Math.random() * 10
        
        // Date & Time
        var date = {
            // Day Index
            dyIndex: new Date().getDate(),

            // Full Date
            fullDate: Date(),

            // Hour
            hr: new Date().getHours(),

            // Minute
            min: new Date().getMinutes(),

            // Month Index
            mthIndex: new Date().getMonth() + 1,

            // Second
            sec: new Date().getSeconds(),

            // Year
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

    /* Function */
        // Main Function
        function main() {
            /* HTML Elements */
                // Initialization
                    // <abbr> 
                    var abbr = document.querySelectorAll("abbr")
                    
                    /* All
                        *
                    */
                    var all = document.querySelectorAll("*")
                    
                    // <body>
                    var body = document.getElementsByTagName("body")[0] || document.body

                    // <button>
                    var button = document.getElementsByTagName("button")
                    
                    // <br>
                    var br = document.getElementsByTagName("br")

                    // <favicon>
                    var favicon = document.getElementsByTagName("favicon")
                    
                    // <head> 
                    var head = document.getElementsByTagName("head")[0] || document.head
                    
                    // <html> 
                    var html = document.getElementsByTagName("html")[0]
                    
                    // <lorem>
                    var lorem = document.getElementsByTagName("lorem")
                    
                    // <main> 
                    var main = document.getElementsByTagName("main")[0]
                    
                    // <time>
                    var time = document.getElementsByTagName("time")
                
                // Special Elements
                    // <favicon>
                        /* --- NOTE ---
                                If
                                    the first element exists.
                        */
                        if (favicon[0])
                            /* --- NOTE ---
                                    If
                                        "src" attribute is present.
                            */
                            if (favicon[0].hasAttribute("src")) {
                                // Insertion
                                head.insertAdjacentHTML(
                                    'beforeend',

                                    '<!-- Document Favicon -->' +
                                    '<link href="' + favicon[0].getAttribute("src") + '" rel="icon" type="image/png">' +
                                    '<link href="' + favicon[0].getAttribute("src") + '" rel="shortcut icon">'
                                )

                                // Deletion
                                favicon[0].parentNode.removeChild(favicon[0])
                            }

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
                        // Index all <br> elements.
                        for (i = 0; i < br.length; i++) {
                            // Initialization
                                // If <br> has an attribute of "2".
                                if (br[i].hasAttribute("2"))
                                    br[i].insertAdjacentHTML("afterend", " <br>")

                                // If <br> has an attribute of "3".
                                if (br[i].hasAttribute("3")) {
                                    br[i].insertAdjacentHTML("afterend", " <br>")
                                    br[i].insertAdjacentHTML("afterend", " <br>")
                                }
                        }

                    // <button>
                        // Index all <button> elements.
                        for (i = 0; i < button.length; i++)
                            /* --- NOTE --
                                    If
                                        the element has the
                                        "no-autofill" attribute.
                            */
                            if (!button[i].hasAttribute("no-autofill"))
                                /* --- NOTE --
                                        If
                                            the element does not a
                                            value or HTML content.
                                */
                                if (
                                    button[i].innerHTML == "" ||
                                    button[i].innerHTML == " " ||
                                    button[i].value == "" ||
                                    button[i].value == " "
                                )
                                    button[i].innerHTML = " BUTTON "

                    // <html>
                    html.charset = document.charset
                    html.CSSCompatibility = document.compatMode
                    if (html.lang == "")
                        html.lang = window.navigator.languages.toString()

                    // <time> 
                    function timeHTML() {
                        // Index all <time> elements.
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

            /* Web Applications */
            setTimeout(function() {
                /* Accordion */
                    // Definition
                        // Accordion
                        var accordion = document.querySelectorAll(".accr")
                        
                        // Accordion Boolean
                        var accordionBin = [false]
                        
                        // Accordion Header
                        var accordionHeader = document.querySelectorAll(".accr > .accr-h")
                        
                        // Accordion Screen
                        var accordionContent = document.querySelectorAll(".accr > .accr-c")
                        
                        // Accordion ID
                        var accordionIdentity = [  ]
                    
                    // Index all Accordions.
                    for (i = 0; i < accordion.length; i++) {
                        // Modification
                            // Accordion Boolean
                            accordionBin[i] = false

                        // 'Close' the Accordion.
                        accordion[i].open = false
                    
                        // Create a unique ID for each Accordion.
                        accordionIdentity[i] = "#" + Math.random().toString().slice(3)
                    
                        // Modification
                            // [data-index]
                            accordion[i].setAttribute("data-index", i)

                            // [data-id]
                            accordion[i].setAttribute("data-id", accordionIdentity[i])
                    
                            /* --- NOTE ---
                                    If
                                        the element is a <details>.
                            */
                            if (accordion[i].hasAttribute("open") && accordion[i].tagName == "DETAILS") {
                                // Modification
                                    // [data-open]
                                    accordion[i].setAttribute("data-open", "")

                                    // [open]
                                    accordion[i].removeAttribute("open")
                            }
                    
                        /* --- NOTE ---
                                If
                                    the attribute "data-open" is defined,
                                    open the Accordion.
                        */
                        if (accordion[i].hasAttribute("data-open"))
                            accordion[i].open = true
                    }
                    
                    // Index all Accordion Headers.
                    for (i = 0; i < accordionHeader.length; i++) {
                        // Modification
                            // [data-index]
                            accordionHeader[i].setAttribute("data-index", i)

                        // Event
                        accordionHeader[i].addEventListener("click", openAccordionContent)

                        // Function
                        function openAccordionContent() {
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

                            // Toggle
                            accordionBin[this.getAttribute("data-index")] = !accordionBin[this.getAttribute("data-index")]
                        }
                    }
                    
                    // Index all Accordion Contents.
                    for (i = 0; i < accordionContent.length; i++) {
                        // Modification
                            // [data-index]
                            accordionContent[i].setAttribute("data-index", i)

                        /* --- NOTE ---
                                If
                                    the Accordion is open,
                                    show the Accordion Content.
                        */
                        if (
                            accordionContent[i].parentNode.open ||
                            accordionContent[i].parentNode.hasAttribute("data-open")
                        )
                            accordionContent[i].style.display = "block"

                        // …else do not display the Accordion Content
                        else
                            accordionContent[i].style.display = "none"
                    }
                    
                    // For Javascript-functioned Accordions.
                    setInterval(function() {
                        // Index all Accordions.
                        for (i = 0; i < accordion.length; i++) {
                            // If the Accordion has the "data-open" attribute, it opens
                            if (
                                accordion[i].open ||
                                accordion[i].hasAttribute("data-open")
                            ) {
                                // Set the "data-open" attribute to 'true'.
                                accordion[i].setAttribute("data-open", "")

                                /* --- NOTE ---
                                        If
                                            the second child of the Accordion
                                            is the Accordion Content,
                                            display it.
                                */
                                if (accordion[i].children[1].className.indexOf("accr-c") >= 0)
                                    accordion[i].children[1].style.display = "block"
                                
                                /* --- NOTE ---
                                        …else if
                                            the first child of the Accordion
                                            is the Accordion Content,
                                            display it.
                                */
                                else if ((accordion[i].children[0].className.indexOf("accr-c") >= 0))
                                    accordion[i].children[0].style.display = "block"
                                
                                /* --- NOTE ---
                                        …else
                                            if any child of the Accordion is the
                                            Accordion Content,
                                            display it.
                                */
                                else
                                    // Index all Accordion child elements.
                                    for (j = 0; j < accordion[i].children.length; j++)
                                        /* --- NOTE ---
                                                if
                                                    the Accordion child element
                                                    has a class of "accr-c".
                                        */
                                        if (accordion[i].children[j].className.indexOf("accr-c") >= 0)
                                            accordion[i].children[j].style.display = "block"

                            }
                            
                            /* --- NOTE ---
                                    …else
                                        if the Accordion does not have
                                        the "data-open" attribute,
                                        it closes.
                            */
                            else {
                                // Remove the "data-open" attribute.
                                accordion[i].removeAttribute("data-open")

                                /* --- NOTE ---
                                        if
                                        the second child of the Accordion
                                        is the Accordion Content,
                                        hide it.
                                */
                                if (accordion[i].children[1].className.indexOf("accr-c") >= 0)
                                    accordion[i].children[1].style.display = "none"

                                /*
                                    …else
                                        if the first child of the Accordion
                                        is the Accordion Content,
                                        hide it.
                                */
                                else if ((accordion[i].children[0].className.indexOf("accr-c") >= 0))
                                    accordion[i].children[0].style.display = "none"

                                /*
                                    …else
                                        if any child of the Accordion
                                        is the Accordion Content,
                                        hide it.
                                */
                                else
                                    // Index all Accordion child elements.
                                    for (j = 0; j < accordion[i].children.length; j++)
                                        /* --- NOTE ---
                                                if
                                                    the Accordion child element
                                                    has a class of "accr-c".
                                        */
                                        if (accordion[i].children[j].className.indexOf("accr-c") >= 0)
                                            accordion[i].children[j].style.display = "none"
                            }
                        }
                    }, 100)

                /* Carousel */
                    // Definition
                        // Carousel
                        var carousel = document.getElementsByClassName("crsl")

                        // Carousel Buttons
                            // Left Carousel Button
                            var carouselButtonsLeft

                            // Right Carousel Button
                            var carouselButtonsRight
                        
                        // Carousel Indicators
                        var carouselIndicators
                        
                        // (General) Carousel Counter
                        var carouselCounter = 0
                        
                        // (Individual) Carousel Counter
                        var carouselElementCounter = [  ]
                    
                    // Index all Carousels.
                    for (i = 0; i < carousel.length; i++) {
                        // Modification
                            // [data-index]
                            carousel[i].setAttribute("data-index", i)

                        // Children
                            // Index all Carousel child elements.
                            for (j = 0; j < carousel[i].children.length; j++)
                                // Modification
                                    // [data-key]
                                    carousel[i].children[j].setAttribute("data-key", j)
                        
                        /* --- NOTE ---
                                If
                                    "data-controls" attribute is enabled,
                                    append a control button.
                        */
                        if (carousel[i].hasAttribute("data-controls"))
                            // Insertion
                            carousel[i].insertAdjacentHTML(
                                'afterend',

                                '<button class="crsl-btn-l" ' +
                                    (function() {
                                        if (carousel[i].hasAttribute("data-theme"))
                                            return 'data-theme="' + carousel[i].getAttribute("data-theme") + '"'
                                    })() +

                                    (function() {
                                        if (carousel[i].hasAttribute("data-theme"))
                                            return ' style="top: ' + (carousel[i].offsetTop + (carousel[i].clientHeight / 2)) + 'px"'
                                    })() +
                                '> < </button>'
                            )
                        
                        /* --- NOTE ---
                                If
                                    "data-duration" attribute is disabled,
                                    set the attribute to "0".
                        */
                        if (!carousel[i].hasAttribute("data-duration"))
                            // Modifcation
                                // [data-duration]
                                carousel[i].setAttribute("data-duration", 0)
                        
                        /* --- NOTE ---
                                If
                                    "data-duration" attribute is enabled.
                        */
                        if (carousel[i].hasAttribute("data-duration"))
                            // Index all Carousel child elements.
                            for (j = 0; j < carousel[i].children.length; j++)
                                // Style
                                carousel[i].children[j].style.animationDuration = (
                                    carousel[i].getAttribute("data-duration") + "s"
                                )
                        
                        /* --- NOTE ---
                                If
                                    "data-interval" attribute is disabled, set the attribute to "3"..
                        */
                        if (!carousel[i].hasAttribute("data-interval"))
                            // Modification
                                // [data-interval]
                                carousel[i].setAttribute("data-interval", 3)
                        
                        /* --- NOTE ---
                                If
                                    "data-navigation" attribute is enabled.
                        */
                        if (carousel[i].hasAttribute("data-navigation")) {
                            /* --- NOTE ---
                                    Give the Carousel Buttons time to load if they are present.
                            */
                            setTimeout(function() {
                                // Index all Carousels.
                                for (i = 0; i < carousel.length; i++)
                                    // For the number of Carousel child elements.
                                    for (j = carousel[i].children.length - 1; j >= 0; j--)
                                        // Initialization
                                        carousel[i].insertAdjacentHTML(
                                            'afterend',

                                            '<input class="crsl-nav" ' +
                                                'data-id="' + i + '"' +
                                                ' data-list="' + j + '"' +
                                                (function() {
                                                    if (carousel[i].hasAttribute("data-theme"))
                                                        return ' data-theme="' + carousel[i].getAttribute("data-theme") + '" ' }
                                                )() +
                                                (function() {
                                                    if (carousel[i].hasAttribute("data-theme"))
                                                        return 'style="top: ' + (carousel[i].clientHeight - 40) + 'px" '
                                                })() +
                                                'type="checkbox">'
                                        )
                            }, 750)
                        }

                        /* --- NOTE ---
                                If
                                    "data-slide" attribute is enabled.
                        */
                        if (carousel[i].hasAttribute("data-slide"))
                            // Index all Carousel element children -- that are not <span>.
                            for (j = 0; j < document.querySelectorAll(".crsl[data-index] > *:not(span)").length; j++)
                                // Style
                                document.querySelectorAll(".crsl[data-index] > *:not(span)")[j].style.animationName = (
                                    carousel[i].getAttribute("data-slide") + "_carousel"
                                )
                        
                        /* --- NOTE ---
                                If
                                    "data-marquee" attribute is enabled.
                        */
                        if (carousel[i].hasAttribute("data-marquee"))
                            // Run this function every 1 second.
                            setInterval(carouselRight, 1000)

                        // Event
                        document.body.addEventListener("click", focusCarousel)

                        // Function
                        function focusCarousel() {
                            // Index all Carousels.
                            for (i = 0; i < carousel.length; i++)
                                carousel[i].isFocused = false

                            // Index all targeted elements.
                            for (i = 0; i < window.event.path.length; i++)
                                /* --- NOTE ---
                                        If
                                            the target is an element.
                                */
                                if (window.event.path[i].tagName != undefined)
                                    /* --- NOTE ---
                                            If
                                                the element has a "class" attribute.
                                    */
                                    if (window.event.path[i].hasAttribute("class"))
                                        // Index all class nodes for the target elements.
                                        for (j = 0; j < window.event.path[i].classList.length; j++)
                                            // If any of the nodes are "crsl".
                                            if (window.event.path[i].classList[j] == "crsl")
                                                    window.event.path[i].isFocused = true
                        }
                    }

                    // Stylize the carousel if it is "focused"
                    setInterval(function() {
                        // Index all Carousels.
                        for (i = 0; i < carousel.length; i++)
                            /* --- NOTE ---
                                    If
                                        the Carousel 'is focused'.
                            */
                            if (carousel[i].isFocused)
                                // Modification
                                    // [psd-focus]
                                    carousel[i].setAttribute("psd-focus", "")

                            // …else
                            else
                                carousel[i].removeAttribute("psd-focus")
                    }, 100)

                    // Event
                    document.body.addEventListener("keydown", carouselKey)
                    document.body.addEventListener("keypress", carouselKey)

                    // Set the buttons
                        // Left Carousel Buttons
                            // Defintion
                            carouselButtonsLeft = document.querySelectorAll(".crsl + .crsl-btn-l")

                            // Index all Left Carousel Buttons
                            for (i = 0; i < carouselButtonsLeft.length; i++) {
                                // Event
                                carouselButtonsLeft[i].addEventListener("click", carouselL)

                                // Content
                                carouselButtonsLeft[i].innerHTML = (carousel[i].getAttribute("data-left-button") || " < ")

                                // Adjacent Initialization
                                carouselButtonsLeft[i].insertAdjacentHTML(
                                    'afterend',

                                    '<button class="crsl-btn-r" ' +
                                        (function() {
                                            if (carousel[i].hasAttribute("data-theme"))
                                                return 'data-theme="' + carousel[i].getAttribute("data-theme") + '"'
                                        })() +

                                        (function() {
                                            if (carousel[i].hasAttribute("data-theme"))
                                                return ' style="top: ' + (carousel[i].offsetTop + (carousel[i].clientHeight / 2)) + 'px"'
                                        })() +
                                    '> > </button>'
                                )

                                // Modification
                                    // [data-index]
                                    carouselButtonsLeft[i].setAttribute("data-index", i)
                            }
                        
                        // Right Carousel buttons
                            // Defintion
                            carouselButtonsRight = document.querySelectorAll(".crsl-btn-l + .crsl-btn-r")

                            // Index all Right Carousel Buttons.
                            for (i = 0; i < carouselButtonsRight.length; i++) {
                                // Event
                                carouselButtonsRight[i].addEventListener("click", carouselR)

                                // Content
                                carouselButtonsRight[i].innerHTML = (carousel[i].getAttribute("data-right-button") || " > ")

                                // Modification
                                    // [data-index]
                                    carouselButtonsRight[i].setAttribute("data-index", i)
                            }

                    // Carousel Indicators
                        // Catch the navigation elements.
                        setTimeout(function() {
                            // Definition
                            carouselIndicators = document.querySelectorAll(".crsl-nav[data-list]")

                            // Index all Carousel Indicators.
                            for (i = 0; i < carouselIndicators.length; i++)
                                // Event
                                carouselIndicators[i].addEventListener("click", carouselToggle)
                        }, 825)
                    
                    /* --- NOTE ---
                            For
                                all Carousels
                                append a "data-count" attribute to count the seconds and
                                add new properties to the carousel array.
                    */
                    for (i = 0; i < carousel.length; i++)
                        carouselElementCounter[i] = 0
                    
                    // Carousel Counter (Individual)
                        // This function runs every 1 second.
                        setInterval(function() {
                            // Index all Carousels.
                            for (i = 0; i < carousel.length; i++)                       
                                // Modification
                                    // [data-count]
                                    carousel[i].setAttribute("data-count", carouselElementCounter[i]++)
                        }, 1000)

                    // Function
                        // Toggle the active (displayed) slide on the Carousel
                        function carouselToggle() {
                            // Initialization
                            var carouselContent = document.querySelectorAll('.crsl[data-index="' + this.getAttribute("data-index") + '"] > *:not(span)'),
                                carouselSlide = document.querySelectorAll('.crsl[data-index="' + this.getAttribute("data-id") + '"] > *:not(span)[data-key="' + this.getAttribute("data-list") + '"]')
                                
                            // Index all Carousel Content.
                            for (i = 0; i < carouselContent.length; i++)
                                carouselContent[i].style.display = "none"

                            // Show the first Carousel Content.
                            carouselSlide[0].style.display = "block"

                            // Insertion
                            carouselSlide[0].parentNode.insertBefore(
                                carouselSlide[0], 
                                carouselSlide[0].parentNode.childNodes[1]
                            )
                        }
                        
                        // Reverse the rotary
                        function carouselLeft() {
                            // Index all Carousels.
                            for (i = 0; i < carousel.length; i++) {
                                /* --- NOTE ---
                                        If
                                            the "data-count" attribute matches
                                            the "data-duration" and "data-interval" attribute.
                                */
                                if (
                                    carousel[i].getAttribute("data-count") ==
                                    (
                                        parseInt(parseInt(carousel[i].getAttribute("data-duration")) +
                                        parseInt(carousel[i].getAttribute("data-interval")))
                                    )
                                ) {
                                    // Index all Carousel child element.
                                    for (j = 0; j < document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)').length; j++)
                                        document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[j].style.display = "none"
                                    
                                    // Children
                                        // First Child
                                            // Style
                                            document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0].style.display = "block"

                                    // Insertion
                                    document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0].parentNode.insertBefore(
                                        document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)').length - 1],
                                        document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0]
                                    )
                                
                                    // Reset the "data-count" attribute for the specified Carousel.
                                    carouselElementCounter[i] = 0

                                    // Modification
                                        // [data-count]
                                        carousel[i].setAttribute("data-count", 0)
                                }
                            }
                        }

                        // Reverse a rotary
                        function carouselL() {
                            // Definition
                            var carouselLContent = document.querySelectorAll('.crsl[data-index="' + this.getAttribute("data-index") + '"] > *:not(span)')
                            
                            // Index all Carousel child elements
                            for (i = 0; i < carouselLContent.length; i++)
                                carouselLContent[i].style.display = "none"
                            
                            // Children
                                // First Child
                                    // Style
                                    carouselLContent[0].style.display = "block"

                            // Insertion
                            carouselLContent[0].parentNode.insertBefore(
                                carouselLContent[carouselLContent.length - 1],
                                carouselLContent[0]
                            )
                        }

                        // Play the rotary
                        function carouselRight() {
                            // Index all Carousels.
                            for (i = 0; i < carousel.length; i++) {
                                /* --- NOTE ---
                                        If
                                            the "data-count" attribute matches
                                            the "data-duration" + "data-interval" attribute.
                                */
                                if (
                                    carousel[i].getAttribute("data-count") ==
                                    (
                                        parseInt(parseInt(carousel[i].getAttribute("data-duration")) +  
                                        parseInt(carousel[i].getAttribute("data-interval")))
                                    )
                                ) {
                                    // Index all Carousel child elements.
                                    for (j = 0; j < document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)').length; j++)
                                        document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[j].style.display = "none"
                                    
                                    // Children
                                        // Last Child
                                            // Style
                                            document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[
                                                document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)').length - 1
                                            ].style.display = "block"

                                    // Insertion
                                    document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0].parentNode.appendChild(
                                        document.querySelectorAll('.crsl[data-index="' + i + '"] > *:not(span)')[0]
                                    )

                                    // Reset the "data-count" attribute for the specified Carousel.
                                    carouselElementCounter[i] = 0

                                    // Modification
                                        // [data-count]
                                        carousel[i].setAttribute("data-count", 0)
                                }
                            }
                        }

                        // Play a rotary
                        function carouselR() {
                            // Definition
                            var carouselLContent = document.querySelectorAll('.crsl[data-index="' + this.getAttribute("data-index") + '"] > *:not(span)')
                            
                            // Index all Carousel child elements.
                            for (i = 0; i < carouselLContent.length; i++)
                                carouselLContent[i].style.display = "none"
                            
                            // Children
                                // First Child
                                    // Style
                                    carouselLContent[0].style.display = "block"

                            // Insertion
                            carouselLContent[0].parentNode.appendChild(carouselLContent[0])
                        }

                        // Toggle the rotary via keyboard input when the carousel is "focused"
                        function carouselKey() {
                            /* --- NOTE ---
                                    If
                                        Left Arrow Key.
                            */
                            if (
                                event.keyCode == 37 ||
                                event.keyCode == 65 ||
                                event.keyCode == 97
                            ) {
                                // Index all Carousels.
                                for (i = 0; i < carousel.length; i++)
                                    // If a Carousel 'is focused'.
                                    if (carousel[i].isFocused) {
                                        // Index all Carousel child elements.
                                        for (j = 0; j < carousel[i].children.length; j++)
                                            carousel[i].children[j].style.display = "none"

                                        // Index all Carousel child elements.
                                        for (j = 0; j < carousel[i].children.length; j++)
                                            carousel[i].children[j].style.display = "block"

                                        // Insertion
                                        carousel[i].insertBefore(
                                            carousel[i].children[carousel[i].children.length - 1],
                                            carousel[i].children[0]
                                        )
                                    }
                            }

                            /* --- NOTE ---
                                    If
                                        Right Arrow Key.
                            */
                            if (
                                event.keyCode == 39 ||
                                event.keyCode == 68 ||
                                event.keyCode == 100
                            ) {
                                // Index all Carousels.
                                for (i = 0; i < carousel.length; i++)
                                    // If a Carousel 'is focused'.
                                    if (carousel[i].isFocused) {
                                        // Index all Carousel child elements.
                                        for (j = 0; j < carousel[i].children.length; j++)
                                            carousel[i].children[j].style.display = "none"

                                        // Children
                                            // First Child
                                                // Style
                                                carousel[i].children[0].style.display = "block"

                                        // Insertion
                                        carousel[i].appendChild(carousel[i].children[0])
                                    }
                            }
                        }

                /* Code Editor */
                    // Definition
                        // Editor
                        var codeEditor = document.getElementsByClassName("cd-edtr")

                        // Editor Toggle
                        var codeEditorBin = [false]

                    // Index all Editors.
                    for (i = 0; i < codeEditor.length; i++) {
                        // Defintion
                            // Editor Boolean
                            codeEditorBin[i] = false

                        // Modification
                            // [data-index]
                            codeEditor[i].setAttribute("data-index", i)

                        // Event
                        codeEditor[i].addEventListener("ondblclick", parseHTML)

                        // Function
                        function parseHTML() {
                            /*  --- NOTE ---
                                    If
                                        the element exists.
                            */
                            if (!codeEditorBin[this.getAttribute("data-index")])
                                this.innerHTML = this.innerHTML.replace(/</gi, "&lt;").replace(/>/gi, "&gt;")

                            // …else
                            else
                                this.innerHTML = this.innerHTML.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")

                            // Toggle
                            codeEditorBin[this.getAttribute("data-index")] = !codeEditorBin[this.getAttribute("data-index")]
                        }
                    }

                /* Clipboard */
                    // Definition
                        // <copy>
                        var copy = document.getElementsByTagName("copy")
                        
                        // <cut>
                        var cut = document.getElementsByTagName("cut")
                        
                        // <paste>
                        var paste = document.getElementsByTagName("paste")

                    /* --- NOTE ---
                            Index all <paste> elements.

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
                            throw new Error("The <paste> element is not supposed to be within a <copy> or <cut> element.")

                    /* --- NOTE ---
                        Delete "cut" content.
                    */
                    for (i = 0; i < cut.length; i++)
                        cut[i].parentNode.removeChild(cut[i])

                /* Dropdown */
                    // Definition
                        // Dropdown Header
                        var dropdownHeader = document.getElementsByClassName("drpdwn")
                  
                        // Dropdown Boolean
                        var dropdownBin = [false]
                  
                        // Dropdown Content 
                        var dropdownContent = document.querySelectorAll("[data-drpdwn]")
                  
                        // Dropdown Content CSS Display Value
                        var dropdownContentCSSDisplay = {  }

                    // Dropdown Header
                        // Index all Dropdown Headers.
                        for (i = 0; i < dropdownHeader.length; i++) {
                            // Modification
                                // Dropdown Boolean
                                dropdownBin[i] = false

                            // Index the Dropdown Headers.
                            dropdownHeader[i].setAttribute("data-index", i)

                            /* Logic
                                    How the following events are going to
                                    take place are dependent on the
                                    Dropdown Header's "data-event" attribute value
                            */
                                /* --- NOTE ---
                                        If
                                            "data-event" is "on",
                                            set a activate event.
                                */
                                if (dropdownHeader[i].getAttribute("data-event") == "on") {
                                    // Add the event
                                    dropdownHeader[i].addEventListener("click", showDropdownMenuOn)

                                    function showDropdownMenuOn() {
                                        // Show the corresponding Dropdown Content.
                                        if (!dropdownBin[this.getAttribute("data-index")])
                                            showDropdownMenu()

                                        // Hide the corresponding Dropdown Content.
                                        else
                                            hideDropdownMenu()

                                        // Toggle the Dropdown Boolean.
                                        dropdownBin[this.getAttribute("data-index")] = !dropdownBin[this.getAttribute("data-index")]
                                    }
                                }

                                /* --- NOTE ---
                                        If
                                            "data-event" is "on",
                                            set a hover event.
                                */
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

                                /* --- NOTE ---
                                        If
                                            "data-event" is "on",
                                            set a focus-hover and blur event.
                                */
                                else if (dropdownHeader[i].getAttribute("data-event") == "over_toggle") {
                                    // Event
                                    dropdownHeader[i].onmouseover = function() {
                                        // Show the corresponding content
                                        showDropdownMenu()
                                    }

                                    dropdownHeader[i].onmouseleave = function() {
                                        // Hide the corresponding content
                                        hideDropdownMenu()
                                    }
                                }
                        }

                    // Dropdown Content
                        // Index all Dropdown Contents.
                        for (i = 0; i < dropdownContent.length; i++) {
                            // Modification
                                // Dropdown Content CSS Display Value
                                dropdownContentCSSDisplay[
                                    dropdownContent[i].getAttribute("data-drpdwn")
                                ] = window.getComputedStyle(dropdownContent[i]).getPropertyValue("display")

                            // Style
                            dropdownContent[i].style.display = "none"

                            // Function
                                // Show the Dropdown Content.
                                    // Event
                                dropdownContent[i].addEventListener("mouseover", defaultShowDropdownMenu)

                                    // Show the Dropdown Content.
                                    function defaultShowDropdownMenu() {
                                        // Definition
                                        var dropdownEventElement = this
                                        
                                        // Set a timeout.
                                        setTimeout(function() {
                                            dropdownEventElement.style.display = dropdownContentCSSDisplay[dropdownEventElement.getAttribute("data-drpdwn")]
                                        }, 250)
                                    }

                                // Hide the Dropdown Content.
                                    // Event
                                    dropdownContent[i].addEventListener("mouseover", defaultHideDropdownMenu)

                                    // Hide the Dropdown Content.
                                    function defaultHideDropdownMenu() {
                                        // Definition
                                        var dropdownEventElement = this
                                        
                                        // Set a timeout.
                                        setTimeout(function() {
                                            dropdownEventElement.style.display = "none"
                                        }, 250)
                                    }
                        }

                        // Modification
                            // This function runs near realtime.
                            setInterval(function() {
                                // Index all Dropdown Contents.
                                for (i = 0; i < dropdownContent.length; i++) {
                                    /* --- NOTE ---
                                            If
                                                the Dropdown Content's "open" property is "undefined".
                                    */
                                    if (!dropdownContent[i].open) {
                                        dropdownContent[i].removeAttribute("data-show")
                                        dropdownContent[i].setAttribute("data-hide", "")
                                        dropdownContent[i].style.display = "none"
                                    }
                                    else {
                                        dropdownContent[i].removeAttribute("data-hide")
                                        dropdownContent[i].setAttribute("data-show", "")
                                        dropdownContent[i].style.display = dropdownContentCSSDisplay[dropdownContent[i].getAttribute("data-drpdwn").toString()]
                                    }
                                }
                            }, 1)

                    // Function
                        // Hide the Dropdown Content.
                        function hideDropdownMenu() {
                            // Definition
                            var dropdownEventTarget = window.event.target

                            // Modification
                                /* --- NOTE ---
                                        For
                                            as many parent elements
                                            the event target element has.
                                */
                                for (i = 0; i < window.event.path.length; i++)
                                    /* --- NOTE ---
                                            If
                                                the event target element does not
                                                have a "drpdwn" class.
                                    */
                                    if (dropdownEventTarget.className.indexOf("drpdwn") <= -1)
                                        dropdownEventTarget = dropdownEventTarget.parentNode

                            /*  --- NOTE ---
                                    If
                                        the target element exists,
                                        hide it.
                            */
                            if (document.querySelectorAll('[data-drpdwn="' + dropdownEventTarget.id + '"]')[0]) {
                                document.querySelectorAll('[data-drpdwn="' + dropdownEventTarget.id + '"]')[0].open = false
                                document.querySelectorAll('[data-drpdwn="' + dropdownEventTarget.id + '"]')[0].removeAttribute("data-show")
                                document.querySelectorAll('[data-drpdwn="' + dropdownEventTarget.id + '"]')[0].setAttribute("data-hidden", "")
                                document.querySelectorAll('[data-drpdwn="' + dropdownEventTarget.id + '"]')[0].style.display = "none"
                            }
                        }

                        // Show the Dropdown Content.
                        function showDropdownMenu() {
                            // Definition
                            var dropdownEventTarget = window.event.target

                            // Modification
                                /* --- NOTE ---
                                        For
                                            as many parent elements
                                            the event target element has.
                                */
                                for (i = 0; i < window.event.path.length; i++)
                                    /* --- NOTE ---
                                            If
                                                the event target element does not
                                                have a "drpdwn" class.
                                    */
                                    if (dropdownEventTarget.className.indexOf("drpdwn") <= -1)
                                        dropdownEventTarget = dropdownEventTarget.parentNode


                            /* --- NOTE ---
                                    If
                                        the target element exists,
                                        show it.
                            */
                            if (document.querySelectorAll('[data-drpdwn="' + dropdownEventTarget.id + '"]')[0]) {
                                document.querySelectorAll('[data-drpdwn="' + dropdownEventTarget.id + '"]')[0].open = true
                                document.querySelectorAll('[data-drpdwn="' + dropdownEventTarget.id + '"]')[0].removeAttribute("data-hidden")
                                document.querySelectorAll('[data-drpdwn="' + dropdownEventTarget.id + '"]')[0].setAttribute("data-show", "")
                                document.querySelectorAll('[data-drpdwn="' + dropdownEventTarget.id + '"]')[0].style.display = dropdownContentCSSDisplay[document.querySelectorAll('[data-drpdwn="' + dropdownEventTarget.id + '"]')[0].getAttribute("data-drpdwn")]
                            }
                        }

                /* Horizontal Scroller */
                    // Definition
                        // Horizontal Scroller
                        var horizontalScroller = document.getElementsByClassName("hr-scr")

                    // Index all Horizontal Scrollers
                    for (i = 0; i < horizontalScroller.length; i++) {
                        // Modification
                            // [data-childshow]
                                /* --- NOTE ---
                                        if
                                            the "data-childshow" attribute is "undefined".
                                */
                                if (!horizontalScroller[i].hasAttribute("data-childshow"))
                                    horizontalScroller[i].setAttribute("data-childshow", 3)

                                horizontalScroller[i].setAttribute(
                                    "data-childshow",
                                    parseInt(horizontalScroller[i].getAttribute("data-childshow"))
                                )

                        // Children
                            // Initialization
                                // Horizontal Scroller "data-childshow" attribute
                                var horizontalScrollerChildIndex = horizontalScroller[i].getAttribute("data-childshow")

                            // Style
                                /* Border-Left Width, Border-Right Width & Width
                                    --- NOTE ---
                                        Index the Horizontal Scroller's width divided by
                                        its "data-childshow" attribute for the
                                        width of its children.

                                    --- WARN ---
                                        This process must be repeated over.
                                */
                                setInterval(function() {
                                    horizontalScroller = document.getElementsByClassName("hr-scr")

                                    // Index all Horizontal Scrollers
                                    for (i = 0; i < horizontalScroller.length; i++)
                                        // Index all Horizontal Scroller children elements
                                        for (j = 0; j < horizontalScroller[i].children.length; j++) {
                                            // Border Left Width
                                            horizontalScroller[i].children[j].style.borderLeftWidth = (
                                                (
                                                    (
                                                        body.clientWidth /
                                                        horizontalScroller[i].getAttribute("data-childshow")
                                                    ) - (
                                                        (parseInt(window.getComputedStyle(horizontalScroller[i].children[j]).getPropertyValue("marginLeft").replace("px", "")) || 0) +
                                                        (parseInt(window.getComputedStyle(horizontalScroller[i].children[j]).getPropertyValue("marginRight").replace("px", "")) || 0) +
                                                        (parseInt(window.getComputedStyle(horizontalScroller[i].children[j]).getPropertyValue("paddingLeft").replace("px", "")) || 0) +
                                                        (parseInt(window.getComputedStyle(horizontalScroller[i].children[j]).getPropertyValue("paddingRight").replace("px", "")) || 0)
                                                    ) - (
                                                        5
                                                    )
                                                ) /
                                                8
                                            ) + "px"

                                            // Border Right Width
                                            horizontalScroller[i].children[j].style.borderRightWidth = (
                                                (
                                                    (
                                                        body.clientWidth /
                                                        horizontalScroller[i].getAttribute("data-childshow")
                                                    ) - (
                                                        (parseInt(window.getComputedStyle(horizontalScroller[i].children[j]).getPropertyValue("marginLeft").replace("px", "")) || 0) +
                                                        (parseInt(window.getComputedStyle(horizontalScroller[i].children[j]).getPropertyValue("marginRight").replace("px", "")) || 0) +
                                                        (parseInt(window.getComputedStyle(horizontalScroller[i].children[j]).getPropertyValue("paddingLeft").replace("px", "")) || 0) +
                                                        (parseInt(window.getComputedStyle(horizontalScroller[i].children[j]).getPropertyValue("paddingRight").replace("px", "")) || 0)
                                                    ) - (
                                                        5
                                                    )
                                                ) /
                                                8
                                            ) + "px"

                                            // Width
                                            horizontalScroller[i].children[j].style.width = (
                                                (
                                                    (
                                                        body.clientWidth /
                                                        horizontalScroller[i].getAttribute("data-childshow")
                                                    ) - (
                                                        (parseInt(window.getComputedStyle(horizontalScroller[i].children[j]).getPropertyValue("marginLeft").replace("px", "")) || 0) +
                                                        (parseInt(window.getComputedStyle(horizontalScroller[i].children[j]).getPropertyValue("marginRight").replace("px", "")) || 0) +
                                                        (parseInt(window.getComputedStyle(horizontalScroller[i].children[j]).getPropertyValue("paddingLeft").replace("px", "")) || 0) +
                                                        (parseInt(window.getComputedStyle(horizontalScroller[i].children[j]).getPropertyValue("paddingRight").replace("px", "")) || 0)
                                                    ) - (
                                                        5
                                                    )
                                                ) /
                                                2
                                            ) + "px"

                                            // Children
                                            for (k = 0; k < horizontalScroller[i].children[j].children.length; k++)
                                                // Style
                                                    // Right
                                                    horizontalScroller[i].children[j].children[k].style.right = horizontalScroller[i].children[j].style.borderLeftWidth
                                        }
                                }, 100)
                    }

                /* Media */
                    // Definition
                    var media = document.getElementsByClassName("med")
                
                    /* --- NOTE ---
                            If
                                a "med" class element exists.
                    */
                    if (media[0]) {
                        // Index all "med" class elements.
                        for (i = 0; i < media.length; i++) {
                            /* --- NOTE ---
                                    If
                                        the element is an
                                        <audio>
                                            or
                                        <video> element.
                            */
                            if (
                                media[i].tagName == "AUDIO" ||
                                media[i].tagName == "VIDEO"
                            ) {
                                /* --- NOTE ---
                                        Update the media source
                                            and
                                        give time for other modules to run.
                                */
                                setTimeout(function() {
                                    // Index all Media.
                                    for (i = 0; i < media.length; i++)
                                        /* --- NOTE ---
                                                If
                                                    the element is an
                                                    <audio>
                                                        or
                                                    <video> element.
                                        */
                                        if (
                                            media[i].tagName == "AUDIO" ||
                                            media[i].tagName == "VIDEO"
                                        )
                                            // Index all Console element children.
                                            for (j = 0; j < media[i].childNodes.length; j++)
                                                /* --- NOTE ---
                                                        If
                                                            it is a <source> element, replace the console's "src"
                                                            attribute with the <source>'s "src" attribute
                                                                and
                                                            the console's media duration is Not a Number,
                                                            skip over that <source> to the next.
                                                */
                                                if (
                                                    media[i].childNodes[j].tagName == "SOURCE" &&
                                                    media[i].duration != NaN
                                                )
                                                    media[i].src = media[i].childNodes[j].getAttribute("src")
                                }, 1250)
                       
                                // Adjacent Initialization
                                media[i].insertAdjacentHTML("afterend", "<nav> </nav>")
                       
                                // Modification
                                    // [data-index]
                                    media[i].setAttribute("data-index", i)
                       
                                /* --- NOTE ---
                                        If
                                            the Console has the "controls"
                                            attribute.
                                */
                                if (media[i].hasAttribute("controls"))
                                    media[i].removeAttribute("controls")
                            }
                        }

                        // Media Controller
                            // Definition
                            var mediaController = document.querySelectorAll(".med + nav")
                        
                        // Index all Media Controllers.
                        for (i = 0; i < mediaController.length; i++) {
                            // Children
                            mediaController[i].innerHTML = (
                                /* Pause/ Play Button */
                                '<button data-vid-play type="button">' +
                                    (
                                        media[i].getAttribute('data-vid-play-html') ||
                                        ' &blacktriangleright; '
                                    ) +
                                '</button>' +
                                
                                /* Stop Button */
                                '<button data-vid-stop type="button">' +
                                    (
                                        media[i].getAttribute('data-vid-stop-html') ||
                                        ' &blacksquare; '
                                    ) +
                                '</button>' +
                                
                                /* Playback Current Time */
                                '<div data-vid-currenttime> 00:00:00 </div>' +
                                
                                /* Playback Duration */
                                '<div data-vid-duration> 00:00:00 </div>' +
                                
                                /* Playback Seeker */
                                '<input data-vid-seek min="0" step="1" type="range" value="0">' +
                                
                                /* Volume Button */
                                '<button data-vid-vol type="button">' +
                                    (
                                        media[i].getAttribute('data-vid-vol-html') ||
                                        ' &lescc; '
                                    ) +
                                '</button>' +
                                
                                /* Mute/ Volume Range */
                                '<input data-vid-volRange max="100" min="0" step="1" type="range" value="100">' +
                                
                                /* Download Button */
                                '<button data-vid-dwnld type="button">' +
                                    (
                                        media[i].getAttribute('data-vid-dwnld-html') ||
                                        ' &darr; '
                                    ) +
                                '</button>' +
                                
                                /* Slow Button */
                                '<button data-vid-slow type="button">' +
                                    (
                                        media[i].getAttribute('data-vid-slow-html') ||
                                        ' &#8672; '
                                    ) +
                                '</button>' +
                                
                                /* Fast Button */
                                '<button data-vid-fast type="button">' +
                                    (
                                        media[i].getAttribute('data-vid-fast-html') ||
                                        ' &#8674; '
                                    ) +
                                '</button>' +
                                
                                /* Playback Rate */
                                '<div data-vid-rate> </div>' +
                                
                                /* Fullscreen Button */
                                '<button data-vid-flscrn type="button">' +
                                    (
                                        media[i].getAttribute('data-vid-flscrn-html') ||
                                        ' &#9635; '
                                    ) +
                                '</button>'
                            )

                            // Modification
                                // [data-index]
                                mediaController[i].setAttribute("data-index", i)
                        }

                        // Index all Container child elements.
                        for (i = 0; i < document.querySelectorAll(".med + nav > *").length; i++)
                            // Modification
                                // [data-index]
                                document.querySelectorAll(".med + nav > *")[i].setAttribute(
                                    "data-index",
                                    document.querySelectorAll(".med + nav > *")[i].parentNode.getAttribute("data-index")
                                )
                        
                        // Pause/ Play Button
                            // Definition
                                // Pause/ Play Button
                                var mediaControllerPlay = document.querySelectorAll(".med + nav > [data-vid-play]")
                            
                                // Pause/ Play Button Toggle
                                var mediaControllerPlayBin = [false]

                            // Index all Pause/ Play Buttons.
                            for (i = 0; i < mediaControllerPlay.length; i++) {
                                // Event
                                    // Media
                                    media[i].addEventListener("click", playMedia)

                                    // Pause/ Play Button
                                    mediaControllerPlay[i].addEventListener("click", playMedia)

                                // Definition
                                    // Play/ Pause Button Toggle.
                                    mediaControllerPlayBin[i] = false
                            }

                            // Function
                            function playMedia() {
                                if (!mediaControllerPlayBin[this.getAttribute("data-index")])
                                    // Play the Media
                                    media[this.getAttribute("data-index")].play()
                                
                                else
                                    // Pause the Media
                                    media[this.getAttribute("data-index")].pause()

                                // Toggle
                                mediaControllerPlayBin[this.getAttribute("data-index")] = !mediaControllerPlayBin[this.getAttribute("data-index")]
                            }
                        
                        // Stop Button
                            // Definition
                            var mediaControllerStop = document.querySelectorAll(".med + nav > [data-vid-stop]")

                            // Index all Stop Buttons.
                            for (i = 0; i < mediaControllerStop.length; i++)
                                // Event
                                mediaControllerStop[i].addEventListener("click", stopMedia)

                                // Function
                                function stopMedia() {
                                    // Reload the Media.
                                    media[this.getAttribute("data-index")].load()
                                }
                        
                        // Playback Current Time
                            // Definition
                            var mediaControllerCurrentTime = document.querySelectorAll(".med + nav > [data-vid-currenttime]")
                        
                        // Playback Duration
                            // Definition
                            var mediaControllerDuration = document.querySelectorAll(".med + nav > [data-vid-duration]")
                            
                            // This function runs near realtime.
                            setInterval(function() {
                                /* --- NOTE ---
                                        For
                                            the number of Media Console Playback Current Time.
                                */
                                for (i = 0; i < mediaControllerCurrentTime.length; i++) {
                                    // Current Time in Hours:Minutes:Seconds.
                                        // Hours
                                        var mediaControllerCurrentTimeHTMLHours = 0
                                        var mediaControllerDurationHTMLHours = 0
                                            
                                        var mediaControllerCurrentTimeHTMLMinutes = 0
                                        var mediaControllerDurationHTMLMinutes = 0
                                            
                                        var mediaControllerCurrentTimeHTMLSeconds = parseInt(document.querySelectorAll(
                                            '.med[data-index="' + mediaControllerCurrentTime[i].getAttribute("data-index") + '"]')[0].currentTime
                                        )
                                        var mediaControllerDurationHTMLSeconds = parseInt(document.querySelectorAll(
                                            '.med[data-index="' + mediaControllerCurrentTime[i].getAttribute("data-index") + '"]')[0].duration
                                        )


                                    // For every 60 seconds (or minutes), add 1 minute (or hour).
                                        // Playback Current Time
                                            // Hours
                                            for (
                                                    mediaControllerCurrentTimeHTMLSeconds;
                                                    mediaControllerCurrentTimeHTMLSeconds >= 3600;
                                                    mediaControllerCurrentTimeHTMLSeconds -= 3600
                                            )
                                                mediaControllerCurrentTimeHTMLHours++

                                        // Playback Duration
                                            // Hours
                                            for (
                                                    mediaControllerDurationHTMLSeconds;
                                                    mediaControllerDurationHTMLSeconds >= 3600;
                                                    mediaControllerDurationHTMLSeconds -= 3600
                                            )
                                                mediaControllerDurationHTMLHours++

                                        // Playback Current Time
                                            // Minutes
                                            for (
                                                    mediaControllerCurrentTimeHTMLSeconds;
                                                    mediaControllerCurrentTimeHTMLSeconds >= 60;
                                                    mediaControllerCurrentTimeHTMLSeconds -= 60
                                            )
                                                mediaControllerCurrentTimeHTMLMinutes++
                                    
                                        // Playback Duration
                                            // Minutes
                                            for (
                                                    mediaControllerDurationHTMLSeconds;
                                                    mediaControllerDurationHTMLSeconds >= 60;
                                                    mediaControllerDurationHTMLSeconds -= 60
                                            )
                                                mediaControllerDurationHTMLMinutes++


                                    /* --- NOTE ---
                                            Each value must be double-digit (octal).
                                    */
                                        // Playback Current Time
                                        if (!mediaControllerCurrentTimeHTMLHours.toString()[1])
                                            mediaControllerCurrentTimeHTMLHours = "0" + mediaControllerCurrentTimeHTMLHours

                                        if (!mediaControllerCurrentTimeHTMLMinutes.toString()[1])
                                            mediaControllerCurrentTimeHTMLMinutes = "0" + mediaControllerCurrentTimeHTMLMinutes

                                        if (!mediaControllerCurrentTimeHTMLSeconds.toString()[1])
                                            mediaControllerCurrentTimeHTMLSeconds = "0" + mediaControllerCurrentTimeHTMLSeconds

                                        // Playback Duration
                                        if (!mediaControllerDurationHTMLHours.toString()[1])
                                            mediaControllerDurationHTMLHours = "0" + mediaControllerDurationHTMLHours

                                        if (!mediaControllerDurationHTMLMinutes.toString()[1])
                                            mediaControllerDurationHTMLMinutes = "0" + mediaControllerDurationHTMLMinutes

                                        if (!mediaControllerDurationHTMLSeconds.toString()[1])
                                            mediaControllerDurationHTMLSeconds = "0" + mediaControllerDurationHTMLSeconds

                                    // Content
                                        // Playback Current Time
                                        mediaControllerCurrentTime[i].innerHTML = (
                                            mediaControllerCurrentTimeHTMLHours + ":" +
                                            mediaControllerCurrentTimeHTMLMinutes + ":" +
                                            mediaControllerCurrentTimeHTMLSeconds
                                        ).toString().replace(/NaN/g, "00")
                                        
                                        // Playback Duration
                                        mediaControllerDuration[i].innerHTML = (
                                            mediaControllerDurationHTMLHours + ":" +
                                            mediaControllerDurationHTMLMinutes + ":" +
                                            mediaControllerDurationHTMLSeconds
                                        ).toString().replace(/NaN/g, "00")
                                }
                            }, 1)
                        
                        // Playback Seeker
                            // Definition
                            var mediaControllerSeek = document.querySelectorAll(".med + nav > [data-vid-seek]")
                            
                        // Set a timeout for .825 seconds.
                        setTimeout(function() {
                            // Index all Playback Seekers.
                            for (i = 0; i < mediaControllerSeek.length; i++) {
                                // Event
                                mediaControllerSeek[i].addEventListener("change", seekMedia)
                                mediaControllerSeek[i].addEventListener("input", seekMedia)
                                
                                // Modification
                                    // max
                                    mediaControllerSeek[i].max = parseInt(media[i].duration)
                            }
                            
                            // Function
                            function seekMedia() {
                                // Seek the specified Media.
                                media[this.getAttribute("data-index")].currentTime = this.value
                            }
                            
                            // This function runs near realtime.
                            setInterval(function() {
                                // Index all Playback Seekers.
                                for (i = 0; i < mediaControllerSeek.length; i++) {
                                    // Modification
                                    mediaControllerSeek[i].value = parseInt(media[i].currentTime)
                                    mediaControllerSeek[i].value = media[i].currentTime
                                }
                            }, 1)
                        }, 750)
                        
                        // Mute/ Volume Button
                            // Definition
                                // Mute/ Volume Button
                                var mediaControllerVolume = document.querySelectorAll(".med + nav > [data-vid-vol]")

                                // Media Volume
                                var mediaVolume = [  ]
                       
                                // Mute/ Volume Button Toggle
                                var mediaControllerVolumeBin = [false]
                        
                            // Index all Mute/ Volume Buttons.
                            for (i = 0; i < mediaControllerVolume.length; i++) {
                                // Event
                                mediaControllerVolume[i].addEventListener("click", volMedia)

                                // Definition
                                    // Media Volume
                                    mediaVolume[i] = media[i].volume

                                    // Mute/ Volume Button Toggle
                                    mediaControllerVolumeBin[i] = false
                            }
                        
                            // Function
                            function volMedia() {
                                if (!mediaControllerVolumeBin[this.getAttribute("data-index")]) {
                                    // Modification
                                        // Media Volume
                                        mediaVolume[this.getAttribute("data-index")] = media[this.getAttribute("data-index")].volume

                                        // Media
                                        media[this.getAttribute("data-index")].volume = 0
                                }

                                else
                                    // Modification
                                        // Media
                                        media[this.getAttribute("data-index")].volume = mediaVolume[this.getAttribute("data-index")]

                                // Toggle
                                mediaControllerVolumeBin[this.getAttribute("data-index")] = !mediaControllerVolumeBin[this.getAttribute("data-index")]
                            }

                        // Volume Range
                        var mediaControllerVolumeRange = document.querySelectorAll(".med + nav > [data-vid-volRange]")

                            // Set a timeout for .75 second(s).
                            setTimeout(function() {
                                // Index all Volume Ranges.
                                for (i = 0; i < mediaControllerVolumeRange.length; i++) {
                                    // Event
                                    mediaControllerVolumeRange[i].addEventListener("change", volRangeMedia)
                                    mediaControllerVolumeRange[i].addEventListener("input", volRangeMedia)
                                }
                                
                                // Function
                                function volRangeMedia() {
                                    // Modification
                                    media[this.getAttribute("data-index")].volume = (this.value / 100)
                                }
                                
                                // This function runs near realtime.
                                setInterval(function() {
                                    // Index all Volume Ranges.
                                    for (i = 0; i < mediaControllerVolumeRange.length; i++)
                                        // Modification
                                        mediaControllerVolumeRange[i].value = (media[i].volume * 100)
                                }, 1)
                            }, 750)
                    
                        // Download Button
                        var mediaControllerDownload = document.querySelectorAll(".med + nav > [data-vid-dwnld]")

                            // Index all Download Buttons.
                            for (i = 0; i < mediaControllerDownload.length; i++)
                                /* --- NOTE ---
                                        If
                                            the "src" attribute exists.
                                */
                                if (media[i].getAttribute("src") != undefined)
                                    // Modification
                                        // src
                                        mediaControllerDownload[i].href = media[i].getAttribute("src")
                        
                        // Playback Rate
                        var mediaPlaybackRate = [  ]

                            // Index all Slow Buttons.
                            for (i = 0; i < document.querySelectorAll(".med + nav > [data-vid-slow]").length; i++)
                                // Modification
                                    // Playback Rate
                                    mediaPlaybackRate[i] = media[i].playbackRate
                        
                        // Slow Button
                        var mediaControllerSlow = document.querySelectorAll(".med + nav > [data-vid-slow]")
                            
                            // Index all Slow Buttons.
                            for (i = 0; i < mediaControllerSlow.length; i++)
                                // Event
                                mediaControllerSlow[i].addEventListener("click", slowMedia)

                                // Function
                                function slowMedia() {
                                    // Modification
                                        // Media
                                        media[
                                            this.getAttribute("data-index")
                                        ].playbackRate = (mediaPlaybackRate[this.getAttribute("data-index")] - .25)

                                        // Playback Rate
                                        mediaPlaybackRate[
                                            this.getAttribute("data-index")
                                        ] = media[this.getAttribute("data-index")].playbackRate
                                }
                        
                        // Fast Button
                        var mediaControllerFast = document.querySelectorAll(".med + nav > [data-vid-fast]")

                            // Index all Fast Buttons.
                            for (i = 0; i < mediaControllerFast.length; i++)
                                // Event
                                mediaControllerFast[i].addEventListener("click", fastMedia)

                                // Function
                                function fastMedia() {
                                    // Modification
                                        // Media
                                        media[
                                            this.getAttribute("data-index")
                                        ].playbackRate = (mediaPlaybackRate[this.getAttribute("data-index")] + .25)
                                    
                                        // Playback Rate
                                        mediaPlaybackRate[
                                            this.getAttribute("data-index")
                                        ] = media[this.getAttribute("data-index")].playbackRate
                                }
                        
                        // Playback Rate
                        var mediaControllerRate = document.querySelectorAll(".med + nav > [data-vid-rate]")

                            // This function runs near realtime.
                            setInterval(function() {
                                // Index all Playback Rates.
                                for (i = 0; i < mediaControllerRate.length; i++)
                                    // Content
                                    mediaControllerRate[i].innerHTML = " &times;" + media[i].playbackRate + " "
                            }, 1)

                        // Fullscreen Button
                            // Definition
                                // Fullscreen Button
                                var mediaControllerFullscreen = document.querySelectorAll(".med + nav > [data-vid-flscrn]")

                                // Fullscreen Button Toggle
                                var mediaControllerFullscreenBin = [false]
                            
                            // Index all Fullscreen Buttons.
                            for (i = 0; i < mediaControllerFullscreen.length; i++) {
                                // Event
                                    // Media
                                    media[i].addEventListener("dblclick", fullMedia)

                                    // Fullscreen Button
                                    mediaControllerFullscreen[i].addEventListener("click", fullMedia)

                                // Definition
                                    // Fullscreen Toggle
                                    mediaControllerFullscreenBin[i] = false
                            }

                            // Function
                            function fullMedia() {
                                // If the Media is a <video> element.
                                if (media[this.getAttribute("data-index")].tagName == "VIDEO") {
                                    if (!mediaControllerFullscreenBin[i]) {
                                        // Modification
                                            // [data-fullscreen]
                                            media[this.getAttribute("data-index")].setAttribute("data-fullscreen", "")

                                        /* --- NOTE ---
                                                If
                                                    request for fullscreen
                                                    is granted.
                                        */
                                        if (
                                            (document.fullScreenElement && (document.fullScreenElement !== null)) ||
                                            (!document.mozFullScreen && !document.webkitIsFullScreen)
                                        )
                                            /* --- NOTE ---
                                                    If
                                                        requestFullScreen().
                                            */
                                            if (media[this.getAttribute("data-index")].requestFullScreen)
                                                // Set the Media to fullscreen.
                                                media[this.getAttribute("data-index")].requestFullScreen()
                                        
                                            /* --- NOTE ---
                                                    …else if
                                                        mozRequestFullScreen().
                                            */
                                            else if (media[this.getAttribute("data-index")].mozRequestFullScreen)
                                                // Set the Media to fullscreen.
                                                media[this.getAttribute("data-index")].mozRequestFullScreen()
                                        
                                            /* --- NOTE ---
                                                    …else if
                                                        webkitRequestFullScreen().
                                            */
                                            else if (media[this.getAttribute("data-index")].webkitRequestFullScreen)
                                                // Set the Media to fullscreen.
                                                media[this.getAttribute("data-index")].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
                                    }

                                    else {
                                        // Append the "data-fullscreen" attribute.
                                        media[this.getAttribute("data-index")].removeAttribute("data-fullscreen")

                                        /* --- NOTE ---
                                                If
                                                    cancelFullScreen().
                                        */
                                        if (document.cancelFullScreen)
                                            // Set the Media to fullscreen.
                                            document.cancelFullScreen()
                                        
                                        /* --- NOTE ---
                                                …else if
                                                    mozCancelFullScreen().
                                        */
                                        else if (document.mozCancelFullScreen)
                                            // Set the Media to fullscreen.
                                            document.mozCancelFullScreen()
                                        
                                        /* --- NOTE ---
                                                …else if
                                                    webkitCancelFullScreen().
                                        */
                                        else if (document.webkitCancelFullScreen)
                                            // Set the Media to fullscreen.
                                            document.webkitCancelFullScreen()
                                    }

                                    // Toggle
                                    mediaControllerFullscreenBin[i] = !mediaControllerFullscreenBin[i]
                                }
                            }
                    }
                
                /* ToolTip (or ScreenTip) */
                    // Definition
                        // Tooltip
                        var tooltip = document.createElement("div")
                        
                        // Tipped Elements
                        var tooltipElements = document.querySelectorAll("[data-title]")

                    // Insertion
                    body.appendChild(tooltip)

                    // Adjacent Initialization
                    tooltip.insertAdjacentHTML("beforebegin", " <!-- Tooltip --> ")
                    
                    // Modification
                        // ID
                        tooltip.id = "tooltip"

                    // Hide the tooltip on received input
                    body.addEventListener("click", removeTooltip)
                    body.addEventListener("keydown", removeTooltip)
                    body.addEventListener("keypress", removeTooltip)
                    body.addEventListener("mousedown", removeTooltip)

                    // Function
                    function removeTooltip() {
                        // Set a timeout for .5 second(s).
                        setTimeout(function() {
                            // Style
                            tooltip.style.display = "none"
                        }, 500)
                    }
                    
                    // Index all Tipped Elements.
                    for (i = 0; i < tooltipElements.length; i++) {
                        // Event
                        tooltipElements[i].addEventListener("mouseover", showTooltip)
                        tooltipElements[i].addEventListener("mouseleave", hideTooltip)

                        // Function
                            // Show Tooltip
                            function showTooltip() {
                                // Content
                                tooltip.innerHTML = this.getAttribute("data-title")

                                // Modification
                                    // Class
                                        // Remove the previous class.
                                        tooltip.removeAttribute("class")

                                        /* --- NOTE ---
                                                If the target element has
                                                the "data-title-class" attribute.
                                        */
                                        if (this.hasAttribute("data-title-class"))
                                            tooltip.className = this.getAttribute("data-title-class")

                                // Style
                                    // Display
                                    tooltip.style.display = "inline"

                                    // Opacity
                                    tooltip.style.opacity = "1"

                                    // Transform
                                        // Initialization
                                            // Tooltip Left Coordinate
                                            var tooltipLeft = 0

                                            // Tooltip Left Margin
                                            var tooltipMarginLeft = 0

                                            // Tooltip Top Coordinate
                                            var tooltipTop = 0

                                            // Tooltip Top Margin
                                            var tooltipMarginTop = 0

                                        // Default Spacing
                                            // Tooltip Left Margin
                                                // Update
                                                tooltipMarginLeft = (this.getBoundingClientRect().width * (10 / 100))
                                                
                                                /* --- NOTE ---
                                                        If
                                                            the Tooltip Left Margin is greater than or equal to
                                                            10 percent of the body width.
                                                */
                                                if (tooltipMarginLeft >= (body.getBoundingClientRect().width / 10))
                                                    tooltipMarginLeft = ((body.getBoundingClientRect().width / 10) / 10)

                                            // Tooltip Top Margin
                                                // Update
                                                tooltipMarginTop = (this.getBoundingClientRect().height * (10 / 100))
                                                  
                                                /* --- NOTE ---
                                                        If
                                                            the Tooltip Left Margin is greater than or equal to
                                                            10 percent of the body width.
                                                */  
                                                if (tooltipMarginTop >= (body.getBoundingClientRect().height / 10))
                                                    tooltipMarginTop = ((body.getBoundingClientRect().height / 10) / 10)

                                        // Default Positioning
                                            // Tooltip Left Coordinate
                                            tooltipLeft = (
                                                (
                                                    event.clientX + (
                                                        this.getBoundingClientRect().left + (this.getBoundingClientRect().width / 2))
                                                    ) / 2
                                            ) + tooltipMarginLeft

                                            // Tooltip Top Coordinate
                                            tooltipTop = (
                                                (
                                                    event.clientY + (
                                                        this.getBoundingClientRect().top + (this.getBoundingClientRect().height / 2))
                                                    ) / 2
                                                ) + tooltipMarginTop

                                        // Preset Positioning
                                            // Center
                                            if (
                                                this.getAttribute("data-title").search("_center") >= 0 &&
                                                this.getAttribute("data-title").search("_center") <= this.getAttribute("data-title").lastIndexOf("_center")
                                            ) {
                                                // Modification
                                                tooltip.innerHTML = tooltip.innerHTML.replace(/_center([^_center]*)$/, "$1")

                                                    // Tooltip Left Coordinate
                                                    tooltipLeft = this.getBoundingClientRect().left + (this.getBoundingClientRect().width / 2) - (tooltip.getBoundingClientRect().width / 2)

                                                    // Tooltip Top Coordinate
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
                                                    // Modification
                                                    tooltip.innerHTML = tooltip.innerHTML.replace("_center", "").replace("_left", "")

                                                        // Tooltip Left Coordinate
                                                        tooltipLeft = (this.getBoundingClientRect().left - tooltip.getBoundingClientRect().width) - tooltipMarginLeft

                                                        // Tooltip Top Coordinate
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
                                                    // Modification
                                                    tooltip.innerHTML = tooltip.innerHTML.replace("_center", "").replace("_right", "")

                                                        // Tooltip Left Coordinate
                                                        tooltipLeft = (this.getBoundingClientRect().left + this.getBoundingClientRect().width) + tooltipMarginLeft

                                                        // Tooltip Top Coordinate
                                                        tooltipTop = this.getBoundingClientRect().top + (this.getBoundingClientRect().height / 2) - (tooltip.getBoundingClientRect().height / 2)
                                                }

                                            // Bottom
                                            if (
                                                this.getAttribute("data-title").search("_bottom") >= 0 &&
                                                this.getAttribute("data-title").search("_bottom") <= this.getAttribute("data-title").lastIndexOf("_bottom")
                                            ) {
                                                // Modification
                                                tooltip.innerHTML = tooltip.innerHTML.replace(/_bottom([^_bottom]*)$/, "$1")

                                                    // Tooltip Top Coordinate
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
                                                    // Modification
                                                    tooltip.innerHTML = tooltip.innerHTML.replace("_bottom", "").replace("_left", "")

                                                            // Tooltip Left Coordinate
                                                        tooltipLeft = (this.getBoundingClientRect().left - tooltip.getBoundingClientRect().width) - tooltipMarginLeft

                                                        // Tooltip Top Coordinate
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
                                                    // Modification
                                                    tooltip.innerHTML = tooltip.innerHTML.replace("_bottom", "").replace("_center", "")

                                                        // Tooltip Left Coordinate
                                                        tooltipLeft = this.getBoundingClientRect().left + (this.getBoundingClientRect().width / 2) - (tooltip.getBoundingClientRect().width / 2)

                                                        // Tooltip Top Coordinate
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
                                                    // Modification
                                                    tooltip.innerHTML = tooltip.innerHTML.replace("_bottom", "").replace("_right", "")

                                                        // Tooltip Left Coordinate
                                                        tooltipLeft = (this.getBoundingClientRect().left + this.getBoundingClientRect().width) + tooltipMarginLeft

                                                        // Tooltip Top Coordinate
                                                        tooltipTop = (this.getBoundingClientRect().top + this.getBoundingClientRect().height + tooltip.getBoundingClientRect().height) + tooltipMarginTop
                                                }

                                            // Top
                                            if (
                                                this.getAttribute("data-title").search("_top") >= 0 &&
                                                this.getAttribute("data-title").search("_top") <= this.getAttribute("data-title").lastIndexOf("_top")
                                            ) {
                                                // Modification
                                                tooltip.innerHTML = tooltip.innerHTML.replace(/_top([^_top]*)$/, "$1")

                                                    // Tooltip Top Coordinate
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
                                                    // Modification
                                                    tooltip.innerHTML = tooltip.innerHTML.replace("_left", "").replace("_top", "")

                                                        // Tooltip Left Coordinate
                                                        tooltipLeft = (this.getBoundingClientRect().left - tooltip.getBoundingClientRect().width) - tooltipMarginLeft

                                                        // Tooltip Top Coordinate
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
                                                    // Modification
                                                    tooltip.innerHTML = tooltip.innerHTML.replace("_center", "").replace("_top", "")

                                                        // Tooltip Left Coordinate
                                                        tooltipLeft = this.getBoundingClientRect().left + (this.getBoundingClientRect().width / 2) - (tooltip.getBoundingClientRect().width / 2)

                                                        // Tooltip Top Coordinate
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
                                                    // Modification
                                                    tooltip.innerHTML = tooltip.innerHTML.replace("_right", "").replace("_top", "")

                                                        // Tooltip Left Coordinate
                                                        tooltipLeft = (this.getBoundingClientRect().left + this.getBoundingClientRect().width) + tooltipMarginLeft

                                                        // Tooltip Top Coordinate
                                                        tooltipTop = (this.getBoundingClientRect().top - tooltip.getBoundingClientRect().height) - tooltipMarginTop
                                                }

                                        // Off-screen Corrective Positioning (on the center-axis)
                                        if (
                                                (tooltip.getBoundingClientRect().left + tooltip.clientWidth) >
                                                body.clientWidth
                                            )
                                            // Tooltip Left Coordinate
                                            tooltipLeft = tooltipLeft - (tooltip.clientWidth / 2) - (tooltipMarginLeft + (tooltipMarginLeft / 2))

                                        // Obstructive Targets.
                                            /* --- NOTE ---
                                                    If
                                                        the element is required.
                                            */
                                            if (
                                                this.hasAttribute("required") ||
                                                this.required
                                            ) {
                                                // Modification
                                                    // Required
                                                    this.removeAttribute("required")
                                                    this.onceRequired = true

                                                    // Title
                                                    this.title = ""

                                                    this.tooltipBefore = this.getAttribute("title")

                                                        if (
                                                            !this.tooltipBefore ||
                                                            this.tooltipBefore == ""
                                                        )
                                                            this.tooltipBefore == false
                                            }

                                            /* --- NOTE ---
                                                    If
                                                        the element has the
                                                        "title" attribute.
                                            */
                                            if (this.hasAttribute("title"))
                                                this.removeAttribute("title")

                                        /* --- NOTE ---
                                                If
                                                    the tooltip is meant
                                                    to be hidden.
                                        */
                                        if (this.getAttribute("data-title").lastIndexOf("_hidden") >= 0) {
                                            // Modification
                                            tooltip.innerHTML = tooltip.innerHTML.replace(/_hidden([^_hidden]*)$/, "$1")

                                            // Style
                                            tooltip.style.opacity = "0"
                                        }

                                        tooltip.style.transform = "translate(" +
                                            tooltipLeft + "px, " +
                                            tooltipTop + "px" +
                                        ")"
                            }

                            // Hide Tooltip
                            function hideTooltip() {
                                // Style
                                tooltip.style.opacity = "0"

                                // Correction
                                    /* --- NOTE ---
                                            If
                                                the element is required.
                                    */
                                    if (this.onceRequired) {
                                        this.required = ""
                                        
                                        this.onceRequired = false
                                    }

                                    /* --- NOTE ---
                                            If
                                                the element once had
                                                a title.
                                    */
                                    if (this.tooltipBefore)
                                        this.title = this.tooltipBefore
                            }
                    }
            }, 100)

            /* Lapys JS (All) HTML Elements */
                // Function
                    /* Repeat
                            --- WARN ---
                                This function is meant to repeat
                                every realtime unit.
                    */
                    function repeatModifyElement() {
                        /* Definition
                                --- WARN ---
                                    Must be an array.
                        */
                        all = get.html("*", "_array")

                        // Index all elements.
                        for (i = 0; i < all.length; i++) {
                            // Modification
                                // Child Identifier
                                all[i].childID = { }

                                // CSS
                                    // Height
                                    all[i].CSSheight = numeralCSS(all[i].clientHeight)

                                    // Margin
                                    all[i].CSSmargin = {
                                        // Bottom
                                        bottom : (function() {
                                            if (
                                                !all[i].style.marginBottom &&
                                                all[i].style.marginBottom != ""
                                            )
                                                return numeralCSS(all[i].style.marginBottom)
                                            else
                                                return numeralCSS(get.css("margin-bottom", all[i]))
                                        })(),

                                        // Horizontal
                                        horizontal : (function() {
                                            var elementPaddingLeft
                                            var elementPaddingRight

                                            if (
                                                !all[i].style.marginLeft &&
                                                all[i].style.marginLeft != ""
                                            )
                                                elementPaddingLeft = numeralCSS(all[i].style.marginLeft)
                                            else {
                                                elementPaddingLeft = numeralCSS(get.css("margin-left", all[i]))

                                                if (!elementPaddingLeft)
                                                    elementPaddingLeft = 0
                                            }

                                            if (
                                                !all[i].style.marginRight &&
                                                all[i].style.marginRight != ""
                                            )
                                                elementPaddingRight = numeralCSS(all[i].style.marginRight)
                                            else {
                                                elementPaddingRight = numeralCSS(get.css("margin-right", all[i]))

                                                if (!elementPaddingRight)
                                                    elementPaddingRight = 0
                                            }

                                            return (elementPaddingLeft + elementPaddingRight)
                                        })(),

                                        // Left
                                        left : (function() {
                                            if (
                                                !all[i].style.marginLeft &&
                                                all[i].style.marginLeft != ""
                                            )
                                                return numeralCSS(all[i].style.marginLeft)
                                            else
                                                return numeralCSS(get.css("margin-left", all[i]))
                                        })(),

                                        // Right
                                        right : (function() {
                                            if (
                                                !all[i].style.marginRight &&
                                                all[i].style.marginRight != ""
                                            )
                                                return numeralCSS(all[i].style.marginRight)
                                            else
                                                return numeralCSS(get.css("margin-right", all[i]))
                                        })(),

                                        // Top
                                        top : (function() {
                                            if (
                                                !all[i].style.marginTop &&
                                                all[i].style.marginTop != ""
                                            )
                                                return numeralCSS(all[i].style.marginTop)
                                            else
                                                return numeralCSS(get.css("margin-top", all[i]))
                                        })(),

                                        // Vertical
                                        vertical : (function() {
                                            var elementPaddingBottom
                                            var elementPaddingTop

                                            if (
                                                !all[i].style.marginBottom &&
                                                all[i].style.marginBottom != ""
                                            )
                                                elementPaddingBottom = numeralCSS(all[i].style.marginBottom)
                                            else {
                                                elementPaddingBottom = numeralCSS(get.css("margin-bottom", all[i]))

                                                if (!elementPaddingBottom)
                                                    elementPaddingBottom = 0
                                            }

                                            if (
                                                !all[i].style.marginTop &&
                                                all[i].style.marginTop != ""
                                            )
                                                elementPaddingTop = numeralCSS(all[i].style.marginTop)
                                            else {
                                                elementPaddingTop = numeralCSS(get.css("margin-top", all[i]))

                                                if (!elementPaddingTop)
                                                    elementPaddingTop = 0
                                            }

                                            return (elementPaddingBottom + elementPaddingTop)
                                        })()
                                    }

                                    // Padding
                                    all[i].CSSpadding = {
                                        // Bottom
                                        bottom : (function() {
                                            if (
                                                !all[i].style.paddingBottom &&
                                                all[i].style.paddingBottom != ""
                                            )
                                                return numeralCSS(all[i].style.paddingBottom)
                                            else
                                                return numeralCSS(get.css("padding-bottom", all[i]))
                                        })(),

                                        // Horizontal
                                        horizontal : (function() {
                                            var elementPaddingLeft
                                            var elementPaddingRight

                                            if (
                                                !all[i].style.paddingLeft &&
                                                all[i].style.paddingLeft != ""
                                            )
                                                elementPaddingLeft = numeralCSS(all[i].style.paddingLeft)
                                            else {
                                                elementPaddingLeft = numeralCSS(get.css("padding-left", all[i]))

                                                if (!elementPaddingLeft)
                                                    elementPaddingLeft = 0
                                            }

                                            if (
                                                !all[i].style.paddingRight &&
                                                all[i].style.paddingRight != ""
                                            )
                                                elementPaddingRight = numeralCSS(all[i].style.paddingRight)
                                            else {
                                                elementPaddingRight = numeralCSS(get.css("padding-right", all[i]))

                                                if (!elementPaddingRight)
                                                    elementPaddingRight = 0
                                            }

                                            return (elementPaddingLeft + elementPaddingRight)
                                        })(),

                                        // Left
                                        left : (function() {
                                            if (
                                                !all[i].style.paddingLeft &&
                                                all[i].style.paddingLeft != ""
                                            )
                                                return numeralCSS(all[i].style.paddingLeft)
                                            else
                                                return numeralCSS(get.css("padding-left", all[i]))
                                        })(),

                                        // Right
                                        right : (function() {
                                            if (
                                                !all[i].style.paddingRight &&
                                                all[i].style.paddingRight != ""
                                            )
                                                return numeralCSS(all[i].style.paddingRight)
                                            else
                                                return numeralCSS(get.css("padding-right", all[i]))
                                        })(),

                                        // Top
                                        top : (function() {
                                            if (
                                                !all[i].style.paddingTop &&
                                                all[i].style.paddingTop != ""
                                            )
                                                return numeralCSS(all[i].style.paddingTop)
                                            else
                                                return numeralCSS(get.css("padding-top", all[i]))
                                        })(),

                                        // Vertical
                                        vertical : (function() {
                                            var elementPaddingBottom
                                            var elementPaddingTop

                                            if (
                                                !all[i].style.paddingBottom &&
                                                all[i].style.paddingBottom != ""
                                            )
                                                elementPaddingBottom = numeralCSS(all[i].style.paddingBottom)
                                            else {
                                                elementPaddingBottom = numeralCSS(get.css("padding-bottom", all[i]))

                                                if (!elementPaddingBottom)
                                                    elementPaddingBottom = 0
                                            }

                                            if (
                                                !all[i].style.paddingTop &&
                                                all[i].style.paddingTop != ""
                                            )
                                                elementPaddingTop = numeralCSS(all[i].style.paddingTop)
                                            else {
                                                elementPaddingTop = numeralCSS(get.css("padding-top", all[i]))

                                                if (!elementPaddingTop)
                                                    elementPaddingTop = 0
                                            }

                                            return (elementPaddingBottom + elementPaddingTop)
                                        })()
                                    }

                                    // Width
                                    all[i].CSSwidth = numeralCSS(all[i].clientWidth)

                                    /* Function */
                                        // Numberal CSS
                                        function numeralCSS(data) {
                                            /* Return
                                                    Convert CSS values with
                                                    unit systems to regular
                                                    numbers.
                                            */
                                            return parseFloat(
                                                data.toString().replace(
                                                    // Centimeters
                                                    "cm", "").replace(

                                                    // Degrees
                                                    "deg", "").replace(

                                                    // Inches
                                                    "in", "").replace(

                                                    // Milliseconds
                                                    "ms", "").replace(

                                                    // Pixels
                                                    "px", "").replace(

                                                    // Seconds
                                                    "s", "").replace(
                                                )
                                            )
                                        }

                                // Indexing
                                all[i].nodeIndex = i

                            // Children
                                // Index all element child elements.
                                for (j = 0; j < all[i].children.length; j++) {
                                    /* --- NOTE ---
                                            If
                                                the element property does not co-exist from its
                                                child's ID already
                                                set the element property to the child element.
                                    */
                                    if (
                                        !all[i][all[i].children[j].id] &&
                                        all[i][all[i].children[j].id] != "" &&
                                        all[i][all[i].children[j].id] != " " &&
                                        all[i].children[j].id != ""
                                    )
                                        all[i][all[i].children[j].id] = all[i].children[j]

                                    /* --- NOTE ---
                                            Add synchronized "id" attributed child element and
                                            element properties to the "childID" property.

                                            If
                                                the child element does not have an ID.
                                    */
                                    if (all[i].children[j].id != "")
                                       all[i].childID[all[i].children[j].id] = all[i].children[j]
                                }
                            }
                    }
                    repeatModifyElement()
                    setInterval(function() { repeatModifyElement() }, 1)

                    /* No-Repeat
                            --- WARN ---
                                This function runs only once.
                    */
                    function norepeatModifyElement() {
                        // Index all elements.
                        for (i = 0; i < all.length; i++) {
                            // Index all non-<html> elements
                            if (all[i] != html) {
                                // <form> Elements
                                if (all[i].tagName == "FORM")
                                    /* --- NOTE ---
                                        If
                                            the element has a "name" attribute
                                                and
                                            the attribute has a value.
                                    */
                                    if (
                                        all[i].hasAttribute("name") &&
                                        all[i].getAttribute("name") != ""
                                    )
                                        // Index all the element's children.
                                        for (j = 0; j < all[i].children.length; j++)
                                            // If the element's child does not have a "form" attribute.
                                            set.attr(all[i].children[j], "form", all[i].getAttribute("name"))

                                // <input>
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

                                // <option>
                                if (all[i].tagName == "OPTION") {
                                    // If the element has no "label" attribute.
                                    if (!all[i].hasAttribute("label"))
                                        all[i].setAttribute(
                                            "label",
                                            (function() {
                                                // If the element's "innerText" has a white-space as its first character.
                                                if (all[i].innerText[0] == " ") {
                                                    return all[i].innerText.slice(1)

                                                    // If the element's "innerText" has a white-space as its last character.
                                                    if (all[i].innerText[all[i].innerText.length] == " ")
                                                        return all[i].innerText.slice(1, -1)
                                                }

                                                // If the element's "innerText" has a white-space as its last character.
                                                else if (all[i].innerText[all[i].innerText.length] == " ") {
                                                    return all[i].innerText.slice(0, -1)

                                                    // If the element's "innerText" has a white-space as its first character.
                                                    if (all[i].innerText[0] == " ")
                                                        return all[i].innerText.slice(1, -1)
                                                }

                                                else
                                                    return all[i].innerText
                                            })()
                                        )
                                }

                                // <textarea>
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

                                        // Event
                                        all[i].addEventListener("dblclick", resetElementSize)

                                        // Function
                                        function resetElementSize() {
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
                    }
                    norepeatModifyElement()

            /* Console */
            if (document.getElementsByTagName("html")[0].getAttribute("data-console") != "off") {
                // Index all elements.
                for (i = 0; i < all.length; i++) {
                    // Deprecated elements/
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
                        all[i].tagName == "XMP"
                    )
                        console.warn(
                            "The <" + all[i].localName + "> element is obsolete. Although it may still work in some browsers, its use is discouraged since it could be removed at any time. Try to avoid using it."
                        )
                    
                    // Useful but deprecated elements.
                    if (all[i].tagName == "BIG" || all[i].tagName == "CENTER")
                        console.warn(
                            "The <" + all[i].localName + "> element is useful but still deprecated."
                        )
                }
                    // Multiple elements
                        // <body>
                        if (document.getElementsByTagName("body")[1])
                            console.warn("It is advised to use only 1 <body> element.")

                        // <head>
                        if (document.getElementsByTagName("head")[1])
                            console.warn("It is advised to use only 1 <head> element.")

                        // <html>
                        if (document.getElementsByTagName("html")[1])
                            console.warn("It is advised to use only 1 <html> element.")

                        // <main>
                        if (document.getElementsByTagName("main")[1])
                            console.warn("It is advised to use only 1 <main> element.")
            }

            /* Lapys JS Class Sets
                    --- NOTE ---
                        The script is repeated over in-case
                        of any event that causes a
                        change in styles (such as resizing).
            */
            setInterval(function() {
                // Index all elements.
                for (i = 0; i < all.length; i++) {
                    /* --- NOTE ---
                            If the element
                            has the "class" attribute.
                    */
                    if (all[i].hasAttribute("class")) {
                        // Flex Basis Preset
                            // flx-b-device-width
                            if (window.getComputedStyle(all[i].parentNode).getPropertyValue("flex-direction").indexOf("column") <= -1)
                                if (all[i].getAttribute("class").indexOf("flx-b-device-width") >= 0)
                                    all[i].style.flexBasis = window.innerWidth + "px"
                                else { /* Do nothing… */ }

                            else
                                if (all[i].getAttribute("class").indexOf("flx-b-device-width") >= 0)
                                    all[i].style.flexBasis = window.innerHeight + "px"
                            
                            // flx-b-height
                            if (window.getComputedStyle(all[i].parentNode).getPropertyValue("flex-direction").indexOf("column") <= -1)
                                if (all[i].getAttribute("class").indexOf("flx-b-height") >= 0)
                                    all[i].style.flexBasis = all[i].clientHeight + "px"
                            
                            // flx-b-width
                            if (window.getComputedStyle(all[i].parentNode).getPropertyValue("flex-direction").indexOf("column") <= -1)
                                if (all[i].getAttribute("class").indexOf("flx-b-width") >= 0)
                                    all[i].style.flexBasis = all[i].clientWidth + "px"
                            
                            // flx-b-style
                            if (window.getComputedStyle(all[i].parentNode).getPropertyValue("flex-direction").indexOf("column") <= -1)
                                if (all[i].getAttribute("class").indexOf("flx-b-style") >= 0)
                                    all[i].style.flexBasis = all[i].clientWidth + "px"
                                else { /* Do nothing… */ }
                            
                            else
                                if (all[i].getAttribute("class").indexOf("flx-b-style") >= 0)
                                    all[i].style.flexBasis = all[i].clientHeight + "px"

                        // Height Preset
                            // h-device-height
                            if (all[i].getAttribute("class").indexOf("h-device-height") >= 0)
                                all[i].style.height = window.innerHeight + "px"
                            
                            // h-style
                            if (all[i].getAttribute("class").indexOf("h-style") >= 0)
                                all[i].style.height = all[i].clientHeight + "px"
                            
                            // h-width
                            if (all[i].getAttribute("class").indexOf("h-width") >= 0)
                                all[i].style.height = all[i].clientWidth + "px"

                        // Max Height Preset
                            // max-h-device-height
                            if (all[i].getAttribute("class").indexOf("max-h-device-height") >= 0)
                                all[i].style.maxHeight = window.innerHeight + "px"
                            
                            // max-h-style
                            if (all[i].getAttribute("class").indexOf("max-h-style") >= 0)
                                all[i].style.maxHeight = all[i].clientHeight + "px"
                            
                            // max-h-width
                            if (all[i].getAttribute("class").indexOf("max-h-width") >= 0)
                                all[i].style.maxHeight = all[i].clientWidth + "px"

                        // Min Height Preset
                            // min-h-device-height
                            if (all[i].getAttribute("class").indexOf("min-h-device-height") >= 0)
                                all[i].style.minHeight = window.innerHeight + "px"
                            
                            // min-h-style
                            if (all[i].getAttribute("class").indexOf("min-h-style") >= 0)
                                all[i].style.minHeight = all[i].clientHeight + "px"
                            
                            // min-h-width
                            if (all[i].getAttribute("class").indexOf("min-h-width") >= 0)
                                all[i].style.minHeight = all[i].clientWidth + "px"

                        // Max Width Preset
                            // max-w-device-width
                            if (all[i].getAttribute("class").indexOf("max-w-device-width") >= 0)
                                all[i].style.maxWidth = window.innerWidth + "px"
                            
                            // max-w-height
                            if (all[i].getAttribute("class").indexOf("max-w-height") >= 0)
                                all[i].style.maxWidth = all[i].clientHeight + "px"
                            
                            // max-w-style
                            if (all[i].getAttribute("class").indexOf("max-w-style") >= 0)
                                all[i].style.maxWidth = all[i].clientWidth + "px"

                        // Min Width Preset
                            // min-w-device-width
                            if (all[i].getAttribute("class").indexOf("min-w-device-width") >= 0)
                                all[i].style.minWidth = window.innerWidth + "px"
                            
                            // min-w-height
                            if (all[i].getAttribute("class").indexOf("min-w-height") >= 0)
                                all[i].style.minWidth = all[i].clientHeight + "px"
                            
                            // min-w-style
                            if (all[i].getAttribute("class").indexOf("min-w-style") >= 0)
                                all[i].style.minWidth = all[i].clientWidth + "px"

                        // Width Preset
                            // w-device-width
                            if (all[i].getAttribute("class").indexOf("w-device-width") >= 0)
                                all[i].style.width = window.innerWidth + "px"
                            
                            // w-height
                            if (all[i].getAttribute("class").indexOf("w-height") >= 0)
                                all[i].style.width = all[i].clientHeight + "px"
                            
                            // w-style
                            if (all[i].getAttribute("class").indexOf("w-style") >= 0)
                                all[i].style.width = all[i].clientWidth + "px"
                    }
                }
            }, 1)

            /* Execution
                --- WARN ---
                    The LapysJS script must run only once.
            */
            LapysJS.executed = true
        }
        main()
}

// …else
else {
    // Throw an error if the global 'window' object does not exist.
    throw new Error("LapysJS v" + LapysJS.version + " does not function without the global 'window' object.")
}
