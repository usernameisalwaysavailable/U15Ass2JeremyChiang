function togglePaymentMethod() {
    var method = document.getElementById("payment-method").value;
    document.querySelectorAll('.payment-section').forEach(function(section) {
        section.style.display = 'none';
        section.querySelectorAll('input').forEach(function(input) {
            input.disabled = true;
        });
    });
    var selectedSection = document.getElementById(method + "-info");
    selectedSection.style.display = 'block';
    selectedSection.querySelectorAll('input').forEach(function(input) {
        input.disabled = false;
    });
}

function processPayment(event) {
    event.preventDefault();

    var method = document.getElementById("payment-method").value;

    if (method === "paypal") {
        console.log("Redirecting to PayPal...");
        window.location.href = "https://www.paypal.com/verify";
        return;
    }

    var form = document.getElementById("payment-form");
    if (form.checkValidity()) {
        alert("Payment submitted successfully!");
    } else {
        alert("Please fill in all required fields.");
    }
}

function renderPayPalButton() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: '10.00'
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
            });
        }
    }).render('#paypal-button-container');
}

document.addEventListener('DOMContentLoaded', () => {
    togglePaymentMethod();
    renderPayPalButton();
});
