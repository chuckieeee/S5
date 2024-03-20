document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const orderForm = document.getElementById('orderForm');
    const itemCounter = document.querySelector('.item-counter');
    const totalBill = document.getElementById('totalBill');
    const cashGivenInput = document.getElementById('cashGiven');
    
    // Prices for different items
    const prices = {
        strainer: 400.00,
        alayb: 700.00,
        pm2: 250.00
    };

    // Function to update order details based on user input
    function updateOrderDetails() {
        let totalQty = 0;
        let total = 0;
        Array.from(orderForm.elements).forEach(input => {
            if (input.type === "number" && input.name !== "totalBill" && input.name !== "cashGiven") {
                totalQty += parseInt(input.value, 10);
                total += parseInt(input.value, 10) * prices[input.name];
            }
        });
        itemCounter.textContent = totalQty;
        totalBill.value = total.toFixed(2);
        updateCashChange();
    }

    // Function to calculate cash change
    function updateCashChange() {
        const cashGiven = parseFloat(cashGivenInput.value);
        const totalAmount = parseFloat(totalBill.value);
        const cashChange = cashGiven - totalAmount;
        if (!isNaN(cashChange)) {
            document.getElementById('cashChange').textContent = `₱${cashChange.toFixed(2)}`;
        }
        updatePayment();
    }

    // Function to update payment amount in modal
    function updatePayment() {
        const cashGiven = parseFloat(cashGivenInput.value);
        if (!isNaN(cashGiven)) {
            modalPayment.textContent = `₱${cashGiven.toFixed(2)}`;
        } else {
            modalPayment.textContent = "";
        }
    }

    // Event listeners
    orderForm.addEventListener('input', updateOrderDetails);
    cashGivenInput.addEventListener('input', updateCashChange);
});
