jQuery('document').ready(function($) {
    'use strict';

    $("#flash").click(function() {
        var dtype = $("#dtype").val();
        $.ajax({
            type: "POST",
            url: "/usb/" + dtype,
            crossDomain: true,
            success: function(responseData, status, xhr) {
                alert('AutoHAT flashed');
            },
            error: function(request, status, error) {
                alert(error);
            }
        });
    });

    var usbPolling = setInterval(function usbStatus() {
        $.ajax({
            type: "GET",
            url: "/usb",
            crossDomain: true,
            success: function(responseData, status, xhr) {
                if (responseData.serial) {
                    $("#flash").show();
                    $('#serial').text(responseData.serial);
                    $('#vendor').text(responseData.deviceDescriptor.idVendor);
                    $('#product').text(responseData.deviceDescriptor.idProduct);
                } else {
                  $("#flash").hide();
                  $('#serial').text('No AutoHAT detected');
                  $('#vendor').text('No AutoHAT detected');
                  $('#product').text('No AutoHAT detected');
                }
                return true;
            },
            error: function(request, status, error) {
                console.log(error);
                return false;
            }
        });
    }, 2000);

});
