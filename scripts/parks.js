/** Dicription: This script contains supporting functions for parks.html page 
//  Adding table content with data in JSON object. 
// Author : Sudesh Pamidi
*/
"use strict"

$(document).ready(function() {

    const searchParkType = document.getElementById("searchParkType");
    const searchByLocation = document.getElementById("searchByLocation");
    const searchRadio = document.querySelectorAll("input[name=search]");
    const tbody = document.getElementById("tbody");
    const thead = document.getElementById("thead");

    document.getElementById("today").innerHTML = new Date().toDateString() + " | 79° F";

    // fill two dropdowns 
    fillDropDown(searchByLocation, locations);
    fillDropDown(searchParkType, parkTypes);

    // Wireup two radio buttons (location and park type)
    for (var i = 0; i < searchRadio.length - 1; i++) {
        searchRadio[i].addEventListener("click", toggleDropdown);
    }

    /* begining  of getting JSON file */
    $.getJSON("/data/nationalparks.json", function(data) {
        let parks = data.parks.sort(sortByLocationNameDesc);

        searchByLocation.onchange = displayResultsByLocation;
        searchParkType.onchange = displayResultsByParkType;

        // Wire up for All option click event 
        searchRadio[2].addEventListener("click", displayResults);

        /**
         * To display all the data -- [All option]
         */
        function displayResults() {
            toggleDropdown();
            addTableHeaders(thead);
            addToTbody(tbody, parks)
        };

        /** 
         * To refresh the tbody with data result of search by park type         
         */
        function displayResultsByParkType() {
            clearResults();
            let items = getParksInfoByType(searchParkType.value);
            addTableHeaders(thead);
            addToTbody(tbody, items)
        }

        /** 
         * refresh the tbody with data - no parameters         
         */
        function displayResultsByLocation() {
            clearResults();
            let items = getParksInfoByLocation(searchByLocation.value);
            addTableHeaders(thead);
            addToTbody(tbody, items)
        }

        /** to add the rows and columms of tbody with data
         * @param parkType(text) Mountain Name
         * return the mountains element
         */
        function getParksInfoByType(parkType) {
            let parksInfo = parks.filter(o => o.LocationName.includes(parkType));
            return parksInfo;
        };

        /** to add the rows and columms of tbody with data
         * @param parkType(text) Mountain Name
         * return the mountains element
         */
        function getParksInfoByLocation(location) {
            let parksInfo = parks.filter(o => o.State == location);
            return parksInfo;
        }
    });
    /* end of getting JSON file */

    /**
     * reset/clear the results in the table 
     */
    function clearResults() {
        tbody.innerHTML = "";
        thead.innerHTML = "";
    };

    /** to add the rows and columms of tbody with data
     * @param tbody table body element
     * @param data  array of elements
     */
    function addToTbody(tbody, data) {
        data.forEach(function(e) {
            let tr = tbody.insertRow("tr")
            let i = 0;
            parkLabels.forEach(function(x) {
                let cell = tr.insertCell(i);
                let innerHtml;
                switch (x) {
                    case "Location":
                        innerHtml = e.LocationName;
                        break;
                    case "Address":
                        innerHtml = e.Address + "<br>" + e.City + "<br>" + e.State + " " + e.ZipCode;
                        break;
                    case "Phone":
                        innerHtml = (e.Phone == "0" ? " " : e.Phone);
                        break;
                    case "Fax":
                        innerHtml = (e.Fax == "0" ? " " : e.Fax);
                        break;
                    case "Visit":
                        innerHtml = (typeof e.Visit === "undefined" ? " " : "<a href='" + e["Visit"] + "' target='_blank'>" + e["Visit"] + "</a>")
                        break;
                    case "Coordinates":
                        innerHtml = "Latitude: " + e.Latitude + "<br>" + "Longitude: " + e.Longitude;
                        break;
                    default:
                        innerHtml = e[x];
                }
                cell.innerHTML = innerHtml;
                i++;
            });
        });
    };

    /** to add table headers <th> with the data-header informaion 
     * @param thead table body element     
     */
    function addTableHeaders(thead) {
        let tr = thead.insertRow(0)

        // Loop through array of header information in 
        parkLabels.forEach(function(e) {
            let th = document.createElement("th");
            th.innerHTML = e; //.toUpperCase();
            tr.appendChild(th);
        });
    };

    /**
     *  Function to toggle the dropdown based on radio button selection 
     */
    function toggleDropdown() {
        let searchType = document.querySelector("input[name=search]:checked").value;

        clearResults();
        switch (searchType) {
            case "all":
                searchParkType.className = "hide" // .style.display = "none";
                searchByLocation.className = "hide";
                searchParkType.selectedIndex = 0;
                searchByLocation.selectedIndex = 0;
                break;
            case "parktype":
                searchParkType.className = "custom-select show";
                searchByLocation.selectedIndex = 0
                searchByLocation.className = "hide";
                break;
            case "location":
            default:
                searchParkType.selectedIndex = 0
                searchParkType.className = "hide";
                searchByLocation.className = "custom-select show";
        }
    };

    /**
     * This is a common function to fill the dropDown with the data in array of element.
     * @param {*} dropdown -- Dropdown box name
     * @param {*} obj      -- javascript objects
     */
    function fillDropDown(dropdown, obj) {
        let nextPos = dropdown.options.length;
        obj.forEach(function(e) {
            dropdown.options[nextPos] = new Option(e, e);
            nextPos++;
        });
    };

    /**
     * This is to delete the dropdown elements. This is not been used 
     */
    function clearDropDown() {
        let len = searchDropdown.options.length;
        for (let i = len - 1; i >= 1; i--) {
            searchDropdown.remove(i);
        }
    };

    /**
     * Sort the object by location name desc
     * @param {*} a 
     * @param {*} b 
     */
    function sortByLocationNameDesc(a, b) {
        if (a.LocationName > b.LocationName) {
            return -1;
        }
        return 1;
    }
});