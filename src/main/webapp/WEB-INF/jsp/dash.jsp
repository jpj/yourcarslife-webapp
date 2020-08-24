<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Dashboard</title>

    <script src="<c:url value="/resources/js/db-objects.js"/>"></script>
    <script type="text/javascript">

        const vehicleDb = new VehicleDb();

        const fuelLogDb = new VehicleDb();

        fetch(solairis.ycl.constant.BASE_URL + '/api/vehicle')
            .then(response => response.json())
            .then(vehicles => vehicleDb.loadDb(vehicles));

        vehicleDb.forAllVehicles((vehicles) => {
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
                        fuelLogDb.loadDb(logs);
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

                    vehicleDb.forAllVehicles(
                        (vehicles) => {
                            pageContainer.querySelector(".vehicle-wrapper .vehicle-name").innerText = vehicles.filter(vehicle => vehicle.vehicleId === vehicleId)[0].name
                        }
                    );

                    const mainHolder = pageContainer.querySelector("#fuel-logs");
                    fuelLogDb.forAllVehicles(fuelLogs => {
                        fuelLogs
                            .filter(fuelLog => fuelLog.vehicle.vehicleId === vehicleId)
                            .forEach(fuelLog => {
                                let template = fuelLogTemplate.innerHTML;
                                Object.keys(fuelLog).forEach(key => {
                                    template = template.replace(new RegExp("{{" + key + "}}", "g"), fuelLog[key]);
                                });
                                mainHolder.insertAdjacentHTML(
                                    "beforeend",
                                    `<article class="fuel-log fuel-log-\${fuelLog.logId}">\${template}</article>`);
                            });
                    });
                } else {

                    pageContainer.innerHTML = dashboardTemplate.innerHTML;

                    const mainHolder = document.getElementById("vehicles");

                    vehicleDb.forAllVehicles((vehicles) => {
                        vehicles.forEach(vehicle => {
                            let template = vehicleTemplate.innerHTML;
                            Object.keys(vehicle).forEach(key => {
                                template = template.replace(new RegExp("{{" + key + "}}", "g"), vehicle[key]);
                            });
                            mainHolder.insertAdjacentHTML("beforeend", template);
                        });
                    });

                    document.getElementById("add-new-vehicle").addEventListener("click", e => {
                        e.preventDefault();
                        alert("add new vehicle  clicked");
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