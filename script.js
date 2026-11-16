var link = document.getElementById("suv-enquiry");

if (link) {
    link.onclick = function() {
        window.location.href = "enquiry.html";
    };
}
var form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        document.getElementById("form-status").textContent =
            "Thank you! Your enquiry has been submitted successfully.";

        form.reset();
    });
}
