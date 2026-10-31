
const billingToggle = document.getElementById("billing-toggle");
const savingsBadge = document.getElementById("savings-badge");

const plans = [
    {
        priceId: "basic-price",
        monthlyPrice: 500,
        yearlyPrice: 4800
    },
    {
        priceId: "pro-price",
        monthlyPrice: 1000,
        yearlyPrice: 9600
    },
    {
        priceId: "premium-price",
        monthlyPrice: 1500,
        yearlyPrice: 14400
    }
];

function animatePrice(element, startValue, endValue) {
    const duration = 700;
    const startTime = performance.now();

    function updatePrice(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = Math.round(
            startValue + (endValue - startValue) * progress
        );

        element.textContent = "₹" + currentValue;

        if (progress < 1) {
            requestAnimationFrame(updatePrice);
        }
    }

    requestAnimationFrame(updatePrice);
}

billingToggle.addEventListener("change", function () {

    const isYearly = billingToggle.checked;

    
    savingsBadge.hidden = !isYearly;

   
    plans.forEach(function (plan) {

        const priceElement = document.getElementById(plan.priceId);

        const oldPrice = Number(
            priceElement.textContent.replace("₹", "")
        );

        const newPrice = isYearly
            ? plan.yearlyPrice
            : plan.monthlyPrice;

        animatePrice(priceElement, oldPrice, newPrice);
    });

    const periods = document.querySelectorAll(".billing-period");

    periods.forEach(function (period) {
        period.textContent = isYearly ? "/year" : "/month";
    });

});
