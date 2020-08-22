<html>
<head>
    <title></title>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const found = window.location.hash.match(/\/vehicle\/([0-9]+)/);
            const vehicleId = found[1];

            const form = document.getElementById("edit-vehicle-form");
            form.addEventListener("submit", e => {
                e.preventDefault();
                document.querySelector(".success").classList.remove("show");

                fetch(
                    solairis.ycl.constant.BASE_URL + "/api/vehicle/" + vehicleId,
                    {
                        method: "PUT",
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({
                                vehicleId: vehicleId,
                                name: form.querySelector("input[name=name]").value,
                                description: form.querySelector("input[name=description]").value,
                                notes: form.querySelector("textarea[name=notes]").value
                            }
                        )
                    }
                )
                    .then(response => response.json())
                    .then(vehicle => {
                        vehicleCallback(vehicle, form);
                        document.querySelector(".success").classList.add("show");
                    });
            });

            fetch(solairis.ycl.constant.BASE_URL + "/api/vehicle/" + vehicleId)
                .then(response => response.json())
                .then(vehicle => vehicleCallback(vehicle, form));
        });

        const vehicleCallback = function(vehicle, form) {
            document.title = vehicle.name + " | " + solairis.ycl.constant.SITE_TITLE;
            document.querySelector(".display-name").textContent = vehicle.name;
            form.querySelector("input[name=name]").value = vehicle.name;
            form.querySelector("input[name=description]").value = vehicle.description;
            form.querySelector("textarea[name=notes]").value = vehicle.notes;
        }
    </script>
</head>
<body>
<h2>Editing <span class="display-name"></span></h2>

<div class="success message">Vehicle Saved</div>

<form method="get" action="#" id="edit-vehicle-form">
    <div class="input name">
        <div class="error"></div>
        <label>Name
            <input name="name"/>
        </label>
    </div>
    <div class="input description">
        <label>Description
            <input name="description"/>
        </label>
    </div>
    <div class="input notes">
        <label>Notes
            <textarea name="notes"></textarea>
        </label>
    </div>
    <div class="input">
        <input type="submit" value="Update"/>
    </div>
</form>

</body>
</html>
