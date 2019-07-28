//Discription : This containes functions of martgage calculator
//Author: Sudesh Pamidi

"use strict"

window.onload = function() {

    // get the control references
    const principalamt = document.getElementById("principal");
    const interestrate = document.getElementById("interestrate");
    const loanlength = document.getElementById("loanlength");
    const calculate = document.getElementById("calculate");
    const results = document.getElementById("results");
    const reset = document.getElementById("reset");

    //Calculate button event
    calculate.onclick = function() {

        let amount = Number(principalamt.value);
        let term = loanlength.value * 12;
        let apr = interestrate.value / 1200;

        if (isNaN(amount) || isNaN(term) || isNaN(apr)) {
            results.style.display = "block";
            results.innerHTML = "<p class='error'>One or more input fields are not number(s).</p>";
            return;
        }

        let mpayment = calculatepayment(amount, term, apr);

        if (isNaN(mpayment))
            mpayment = 0;

        let totalamount = mpayment * term

        //Display the results
        results.style.display = "block";
        results.innerHTML = "<strong>Monthly Payment:</strong> $" + mpayment.toFixed(2) +
            "<br> <strong>Total Cost:</strong> $" + totalamount.toFixed(2);
    }

    //Principal Amount keyup event 
    principalamt.onkeyup = clearresults;

    //interest rate keyup event
    interestrate.onkeyup = clearresults;

    //number of years  keyup event
    loanlength.onkeyup = clearresults;

    //reset button onlclick
    reset.onclick = clearresults;

    //Clear the results
    function clearresults() {
        //results.style.display = "mone"; 
        document.getElementById("results").style.display = "none";
        results.innerHTML = "";
    };
}

//Calculate the amount
function calculatepayment(amount, term, apr) {
    var payment = amount * (apr * Math.pow((1 + apr), term)) / (Math.pow((1 + apr), term) - 1);
    return payment;
};