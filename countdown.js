function countdownModal() {
  let count = 3; 
  let countdownDisplay = document.getElementById('countdownDisplay');

  // Display initial count
  countdownDisplay.textContent = count;

  const countdownInterval = setInterval(function() {
    count--;
    countdownDisplay.textContent = count;

    if (count === 0) {
      clearInterval(countdownInterval);
      
      closeModal();
    }
  }, 1000);
}