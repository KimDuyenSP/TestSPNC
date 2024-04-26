document.addEventListener('DOMContentLoaded', function() {
  const main = () => {
      setupGame();
      setupControl(window.game);
  };

  main(); // Initialize your game and control setups

  // Event listener for a single information button (if merged)
  const infoButton = document.getElementById('info-button');
  if (infoButton) {
      infoButton.addEventListener('click', function() {
          const infoOverlay = document.getElementById('info-overlay');
          infoOverlay.style.display = (infoOverlay.style.display === 'none' || infoOverlay.style.display === '') ? 'flex' : 'none';
      });
  }
  // Closing overlays with close buttons
  const closeButtons = document.querySelectorAll('.close-button');
  closeButtons.forEach(function(button) {
      button.addEventListener('click', function() {
          button.closest('.overlay').style.display = 'none';
      });
  });
});
