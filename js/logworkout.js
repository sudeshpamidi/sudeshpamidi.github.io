$(document).ready(function() {

    //Get the last controls  into a variable                      
    var index = $("table tbody tr:last-child").index();
    var controls = $("table tbody tr:last-child").html();
    console.log(controls);

    $("table tbody tr").eq(index).find(".add, .edit, .delete").toggle();
    //$('[data-toggle="tooltip"]').tooltip;                                         

    // Add row on add button click 
    // Binding function to a control is not working for new rows.. need to work on it
    $(document).on("click", ".add", function() {
        console.log('clicked');

        var empty = false;
        var input = $(this).parents("tr").find(".inputcontrol");


        //Validate the control's data.
        input.each(function() {
            if (!$(this).val()) {
                $(this).addClass("error");
                empty = true;
            } else {
                $(this).removeClass("error");
            }
        });
        console.log('Came here - error');
        $(this).parents("tr").find(".error").first().focus();
        console.log('Came here - focus');

        if (!empty) {
            input.each(function() {
                $(this).parent("td").html($(this).val());
            });

            //is this a last child
            if ($(this).parents("tr").is(':last-child')) {

                //This is not last row
                $(this).parents("tr").find(".add, .edit, .delete").toggle();

                var index2 = $("table tbody tr:last-child").index();
                var row = '<tr>' + controls + '</tr>';

                $("table").append(row);

                $("table tbody tr").eq(index2 + 1).find(".add, .edit, .delete").toggle();
            } else {
                $(this).parents("tr").find(".add, .edit").toggle();
            }
        }
    });

    // Edit row on edit button click 
    // Binding function to a control is not working for new rows.. need to work on it
    $(document).on("click", ".edit", function() {
        $(this).parents("tr").find("td:not(:last-child)").each(function() {
            $(this).html('<input type="text" class="form-control inputcontrol" value="' + $(this).text() + '">');
        });
        $(this).parents("tr").find(".add, .edit").toggle();
    });

    // Delete row on delete button click
    //Binding function to a control is not working for new rows.. need to work on it
    $(document).on("click", ".delete", function() {
        //$(".delete").bind("click", function() { -- this is not working for new rows 
        $(this).parents("tr").remove();
    });

    // Calculate the calories
    //$("#steps").blur(function() {
    //    $(this).parents("tr").find("#calories").val($(this).val() * 20);
    //});

    //$("document").on("blur", ".steps", function() {
    //$(this).parents("tr").find("#calories").val($(this).val() * 20);
    //});


    //$("#formschedule").submit(function(event) {
    //    null;
    //});
});