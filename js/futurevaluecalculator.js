//Discription : This containes functions of future value calculator
//Author: Sudesh Pamidi

"use strict"

window.onload = function() {

    // get the control references
    const dipositamount = document.getElementById("dipositamount");
    const interestrate = document.getElementById("interestrate");
    const numyears = document.getElementById("numyears");
    const calculate = document.getElementById("calculate");
    const results = document.getElementById("results");
    const reset = document.getElementById("reset");


    //Calculate button event
    calculate.onclick = function() {
        let diposit = dipositamount.value;
        let term = numyears.value * 12
        let apr = interestrate.value / 1200;

        if (isNaN(diposit) || isNaN(term) || isNaN(apr)) {

            results.style.display = "block";
            results.innerHTML = "<p class='error'>One or more input fields are not number(s).</p>";
            return;
        }

        let futureamount = calculatefuturevalue(diposit, term, apr);
        let totalearned = futureamount - diposit;

        //Displaying the results
        results.style.display = "block";
        results.innerHTML = "<strong>Future Amount:</strong> $" + futureamount.toFixed(2) +
            "<br> <strong>Interest Amount:</strong> $" + totalearned.toFixed(2);
    }

    //Principal Amount keyup event 
    dipositamount.onkeyup = clearresults;

    //interest rate keyup event
    interestrate.onkeyup = clearresults;

    //number of years  keyup event
    numyears.onkeyup = clearresults;

    //reset button onclick event binding
    reset.onclick = clearresults;

    //Clear the results
    function clearresults() {
        //results.style.display = "mone"; 
        document.getElementById("results").style.display = "none";
        results.innerHTML = "";
    };
}

//Calculate the amount
function calculatefuturevalue(diposit, term, apr) {
    var futureamount = diposit * Math.pow((1 + apr), term);
    return futureamount;
};