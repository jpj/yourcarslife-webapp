<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Dashboard</title>

    <script src="<c:url value="/resources/js/db-objects.js"/>"></script>
    <script type="text/javascript">

        const vehicleDb = new ListDb();

        const fuelLogDb = new ListDb();

        fetch(solairis.ycl.constant.BASE_URL + '/api/vehicle')
            .then(response => response.json())
            .then(vehicles => vehicleDb.load(vehicles));

        vehicleDb.forAllItems((vehicles) => {
            vehicles.forEach(vehicle => {
                fetch(
                    solairis.ycl.constant.BASE_URL + '/api/log/fuel?' +
                    new URLSearchParams({
                        vehicleId: vehicle.vehicleId,
                        offset: 0,
                        numResults: 10000
                    })
                )
                    .then(response => response.json())
                    .then(logs => {
                        fuelLogDb.load(logs);
                    });
            });
        });

        document.addEventListener("DOMContentLoaded", function () {

            const vehicleTemplate = document.getElementById("vehicle-template");
            const dashboardTemplate = document.getElementById("dashboard-template");
            const fuelLogTemplate = document.getElementById("fuel-log-template");

            const pageContainer = document.getElementById("page-content-content");

            window.onhashchange = function(e) {
                const found = e.newURL.match(/[#]{0,1}\/([a-z]+)\/([0-9]+)/);

                if (found && found.length === 3 && found[1] === "fuel") {
                    const vehicleId = parseInt(found[2]);

                    pageContainer.innerHTML = document.getElementById("fuel-log-page-template").innerHTML;

                    vehicleDb.forAllItems(
                        (vehicles) => {
                            pageContainer.querySelector(".vehicle-wrapper .vehicle-name").innerText = vehicles.filter(vehicle => vehicle.vehicleId === vehicleId)[0].name
                        }
                    );

                    const mainHolder = pageContainer.querySelector("#fuel-logs");
                    fuelLogDb.forAllItems(fuelLogs => {
                        fuelLogs
                            .filter(fuelLog => fuelLog.vehicle.vehicleId === vehicleId)
                            .forEach(fuelLog => {
                                const thisFuelLogTemplate = fuelLogTemplate.cloneNode(true);
                                let template = thisFuelLogTemplate.innerHTML;
                                new Map([
                                    ...Object.entries(fuelLog),
                                    ...[
                                        ["logDateFormattedForHumans", new Date(fuelLog.logDate).toLocaleDateString("en-US")],
                                        ["costPerFuel", parseFloat(((fuelLog.cost / 100))/fuelLog.fuel).toFixed(3)],
                                        ["cost", (fuelLog.cost / 100).toFixed(2)],
                                        ["odometer", fuelLog.odometer.toFixed(1)],
                                        ["fuel", fuelLog.fuel.toFixed(3)]
                                    ]
                                ])
                                .forEach((value, key) => {
                                    template = template.replace(new RegExp("{{" + key + "}}", "g"), value);
                                });
                                mainHolder.insertAdjacentHTML(
                                    "beforeend",
                                    `<article class="fuel-log fuel-log-\${fuelLog.logId}">\${template}</article>`
                                );

                                const parentWrapper = mainHolder.querySelector(`.fuel-log-\${fuelLog.logId}`);
                                parentWrapper.querySelector("input[name=logDate]").value = new Date(fuelLog.logDate);
                                parentWrapper.querySelector(".missedFillup input").checked = fuelLog.missedFillup;

                                parentWrapper.querySelector("input[name=cancel]").addEventListener("click", e => {
                                    e.preventDefault();
                                    // Might also want to reset values if possible
                                    parentWrapper.classList.remove("editing");
                                });

                                parentWrapper.querySelector("input[name=save]").addEventListener("click", e => {
                                    e.preventDefault();
                                    
                                    var cost = null;
                                    var costStr = parentWrapper.querySelector(".cost input").value;
                                    if (costStr !== null) {
                                        if (costStr.indexOf(".") !== -1) {
                                            var costStrParts = costStr.split(".");
                                            if (costStrParts.length === 2 && costStrParts[1].length === 2) {
                                                cost = parseInt(costStrParts[0]+costStrParts[1]);
                                            }
                                        } else {
                                            cost = parseInt(costStr+"00");
                                        }
                                    }

                                    const some = {
                                        logId: fuelLog.logId,
                                        active: true,
                                        odometer: parseFloat( parentWrapper.querySelector(".odometer input").value ),
                                        logDate: new Date(parentWrapper.querySelector(".date input").value).getTime(), /*"2020-08-24T19:59:00.000Z",*/
                                        fuel: parseFloat( parentWrapper.querySelector(".fuel input").value ),
                                        octane: parseInt( parentWrapper.querySelector(".octane input").value ),
                                        cost: cost,
                                        missedFillup: parentWrapper.querySelector(".missedFillup input").checked,
                                        vehicle: {
                                            vehicleId: fuelLog.vehicle.vehicleId
                                        },
                                        created: null,
                                        modified: null,
                                        tags: []
                                    };

                                    fetch(
                                        solairis.ycl.constant.BASE_URL + "/api/log/fuel/" + fuelLog.logId,
                                        {
                                            method: "PUT",
                                            headers: new Headers({
                                                'Content-Type': 'application/json'
                                            }),
                                            body: JSON.stringify(some)
                                        }
                                    )
                                        .then(response => response.json())
                                        .then(vehicle => {
                                            alert("all done");
                                        });
                                })
                            });
                    });

                    mainHolder.addEventListener("click", e => {
                        // Might need to make this work even if a child of .view is clicked
                        if (e.target.classList.contains("view")) {
                            e.target.parentElement.classList.add("editing");
                        }
                    });
                } else {

                    pageContainer.innerHTML = dashboardTemplate.innerHTML;

                    const mainHolder = document.getElementById("vehicles");

                    vehicleDb.forAllItems((vehicles) => {
                        vehicles.forEach(vehicle => {
                            let template = vehicleTemplate.innerHTML;
                            Object.keys(vehicle).forEach(key => {
                                template = template.replace(new RegExp("{{" + key + "}}", "g"), vehicle[key]);
                            });
                            mainHolder.insertAdjacentHTML("beforeend", template);

                            fuelLogDb.forAllItems(fuelLogs => {
                               mainHolder.querySelector(".vehicle-" + vehicle.vehicleId + " .total-log-count").innerHTML = fuelLogs.filter(fuelLog => fuelLog.vehicle.vehicleId = vehicle.vehicleId).length;
                            });
                        });
                    });

                    document.getElementById("add-new-vehicle").addEventListener("click", e => {
                        e.preventDefault();
                        const vehicleName = prompt("New Vehicle Name:");
                        if (vehicleName) {
                            fetch(
                                solairis.ycl.constant.BASE_URL + "/api/vehicle",
                                {
                                    method: "POST",
                                    headers: new Headers({
                                        'Content-Type': 'application/json'
                                    }),
                                    body: JSON.stringify({
                                        name: vehicleName
                                    })
                                }
                            )
                                .then(response => response.json())
                                .then(vehicle => {
                                    window.location.href = "./vehicle#/vehicle/" + vehicle.vehicleId
                                });
                        }
                    });

                    document.getElementById("vehicles").addEventListener("click", e => {
                        if (e.target.classList.contains("delete")) {
                            e.preventDefault();
                            const containerElement = e.target.parentElement.parentElement;
                            containerElement.classList.add("deleting");
                            if ( confirm("Are you sure you want to delete this vehicle? This action will delete all associated logs with this vehicle and cannot be undone!" ) ) {
                                fetch(
                                    solairis.ycl.constant.BASE_URL + "/api/vehicle/" + e.target.dataset.vehicleid,
                                    {
                                        method: "DELETE",
                                        headers: new Headers({
                                            'Content-Type': 'application/json'
                                        })
                                    }
                                )
                                    .then(response => {
                                        containerElement.remove();
                                    })
                            } else {
                                containerElement.classList.remove("deleting");
                            }
                        }
                    });
                }
            };
            window.onhashchange({newURL: location.href});
        });

    </script>
</head>
<body>

</body>
</html>