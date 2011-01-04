(function($) {
    $.extend({
        urlAddQuerystringParam: function(url, param, value, replaceValueIfParamExists)
        {
            if (url.charAt(url.length - 1) == "#")
                url = url.substr(0, url.length - 1);
                
            if (url.indexOf("?") == -1)
                url = url + "?" + param + "=" + value;
            else {
                var paramIndex = url.indexOf(param + "=");
                if (paramIndex == -1)
                    url = url + "&" + param + "=" + value;
                else {
                    if (replaceValueIfParamExists)
                    {
                        var valBeginIndex = url.indexOf("=", paramIndex + 1) + 1;
                        var valEndIndex = url.indexOf("&", paramIndex + 1);
                        
                        if (valEndIndex == -1)
                            url = url.substr(0, valBeginIndex) + value;
                        else
                            url = url.substr(0, valBeginIndex) + value + url.substr(valEndIndex);
                    }
                    else
                    {
                        var sepIndex = url.indexOf("&", paramIndex + 1);

                        if (sepIndex == -1)
                            url = url + "|" + value;
                        else
                            url = url.substr(0, sepIndex) + "|" + value + url.substr(sepIndex);
                    }
                }
            }
            
            return url;
        },
        urlRemoveQuerystringParam: function(url, param)
        {
            var paramIndex = url.indexOf(param + "=");

            if (paramIndex != -1)
            {
                var valEndIndex = url.indexOf("&", paramIndex + 1);

                if (valEndIndex == -1)
                    url = url.substr(0, paramIndex);
                else
                    url = url.substr(0, paramIndex) + url.substr(valEndIndex);
            }

            return url;
        }
    });
})(jQuery);
