document.addEventListener('DOMContentLoaded', function () {
    let wheel = document.querySelector('.wheel');
    let spinBtn = document.querySelector('.spinBtn');
    
    spinBtn.onclick = function () {
        // Disable the spin button to prevent multiple clicks
        spinBtn.disabled = true;

        // Generate a random angle for spinning
        let randomAngle = Math.ceil(Math.random() * 10000);

        // Calculate the final angle of rotation after spinning
        let finalAngle = randomAngle % 360;

        // Rotate the wheel
        wheel.style.transition = "transform 5s ease-in-out";
        wheel.style.transform = "rotate(" + (360 - finalAngle) + "deg)";

        // Delay to allow the wheel to finish spinning
        setTimeout(function () {
            // Enable the spin button after spinning ends
            spinBtn.disabled = false;

            // Calculate the index of the section where the wheel stops
            let sectionIndex = Math.floor(finalAngle / 45); // 360 / 8 = 45 degrees per section

            // Get the value of the section where the wheel stops
            let values = ['5', '10', 'Nothing', '15', '20', 'Nothing', '5', '10'];
            let landedValue = values[sectionIndex];

            // Display or use the landed value
            alert("The wheel landed on: " + landedValue);
        }, 5000); // Adjust this timeout to match the transition duration
    }
});