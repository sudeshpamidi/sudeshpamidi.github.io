$(document).ready(function() {

    var $radio = $('input[name="hearaboutus-opts"]');
    $('#others').attr('disabled', true);

    $radio.on('change', function(e) {
        var value = $(this).val();
        if (value == 'others') {
            $("#others").attr('disabled', false);
        } else {
            $("#others").val("");
            $("#others").attr('disabled', true);
        }
    });
});