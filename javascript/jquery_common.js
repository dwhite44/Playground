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

            url = url.replace("?&", "?");
            if (url[url.length - 1] == '?')
              url = url.substr(0, url.length - 1);

            return url;
        },
        populateSelectListFromAjax: function($select_ctrl, url, value_field, text_field, not_found_text, exclude_default_option) 
        {
            $select_ctrl.html('');
            $select_ctrl.val('Loading..')
            $.ajax(
            {
                url: url,
                dataType: "json",
                success: function (data, status, xhr)
                {
                    $select_ctrl.html("");

                    if (data.length == 0)
                    {
                        if (typeof not_found_text == 'undefined' || not_found_text == null || not_found_text.length == 0)
                            not_found_text = "No items found";

                        $select_ctrl.append($.create_select_item("", not_found_text));
                    }
                    else
                    {
                        if (typeof exclude_default_option == 'undefined' || exclude_default_option == null || exclude_default_option == false)
                            $select_ctrl.append($.create_select_item("", ""));

                        $.each(data, function (index, item)
                        {
                            $select_ctrl.append($.create_select_item(item[value_field], item[text_field]));
                        });
                    }

                    $select_ctrl.trigger('ajax:success', [data, status, xhr]);
                },
                error: function (xhr, status, error)
                {
                    //alert("Error: " + status);
                    $select_ctrl.html('');
                    $select_ctrl.append($.create_select_item('', 'Error...'));
                    $select_ctrl.trigger("ajax:failure", [xhr, status, error]);

                },
                complete: function (xhr)
                {
                    $select_ctrl.removeClass("ui-autocomplete-loading");
                    $select_ctrl.trigger("ajax:complete", xhr);
                }
            });
        },
        create_select_item: function(value, text)
        {
          return $("<option></option>").val(value).html(text);
        }
    });
})(jQuery);
