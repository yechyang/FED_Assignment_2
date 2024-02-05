const wheel = document.querySelector('.wheel');
const spinBtn = document.getElementById('spin-btn');

spinBtn.addEventListener('click', () => {
    const degrees = Math.floor(Math.random() * 360) + 3600;
    wheel.style.transition = 'all 3s ease-out';
    wheel.style.transform = `rotate(${degrees}deg)`;

    setTimeout(() => {
        alert('You get ' + getLandedSection(degrees) + ' points');
    }, 3000);
});

function getLandedSection(degrees) {
    const sections = ['20', '15', '30', '40', '50', '60'];
    const index = Math.floor((degrees % 360) / (360 / sections.length));
    return sections[index];
}