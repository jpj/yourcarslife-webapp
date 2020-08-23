<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Dashboard</title>

    <script type="text/javascript">
        document.addEventListener("DOMContentLoaded", function () {
            const mainHolder = document.getElementById("vehicles");
            const dashboardTemplate = document.getElementById("vehicle-template");

            fetch(solairis.ycl.constant.BASE_URL + '/api/vehicle')
                .then(response => response.json())
                .then(data => {

                    data.forEach(vehicle => {
                        let template = dashboardTemplate.innerHTML;
                        Object.keys(vehicle).forEach(key => {
                            template = template.replace(new RegExp("{{" + key + "}}", "g"), vehicle[key]);
                        });
                        mainHolder.insertAdjacentHTML("beforeend", template);
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

            // Do delete here. Prob addEventListener("click") on the `ul` then look for `delete` anchor
            // on the event.target() etc etc etc
            document.getElementById("vehicles").addEventListener("click", e => {
                e.preventDefault();
                if (e.target.classList.contains("delete")) {
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
        });
    </script>
</head>
<body>
<%--		<form action="<c:url value="/connect/facebook"/>" method="POST">--%>
<%--			<p><input type="submit" value="Connect With Facebook"/></p>--%>
<%--		</form>--%>
<h2>Your Vehicles</h2>

<p>
    (<a id="add-new-vehicle" class="add-new-vehicle" href="#">Add new vehicle</a>)
</p>

<ul id="vehicles">
</ul>

<script id="vehicle-template" type="text/template">
    <li class="vehicle">
        <div class="container edit">

        </div>
        <div class="container view">
            <div class="name">
                <a href="<c:url value="/vehicle"/>#/vehicle/{{vehicleId}}">{{name}}</a>
            </div>
            <div class="actions">
                <a class="fuel-logs" href="<c:url value="/log/fuel"/>#/log/fuel/{{vehicleId}}">Fill Up</a>
                <a class="service-logs"
                   href="<c:url value="/log/service"/>#/log/service/{{vehicleId}}">Service</a>
            </div>
            <div>Notes: <span class="notes">{{notes}}</span></div>
            <div>Description: <span class="description">{{description}}</span></div>
            <a href="#" class="delete" data-vehicleid="{{vehicleId}}">Delete</a>
        </div>
    </li>
</script>
</body>
</html>