document.addEventListener('DOMContentLoaded', () => {
  const logDiv = document.getElementById('log');
  const alertBox = document.getElementById('alert-box');
  const clearBtn = document.getElementById('clear');

  const updateUI = () => {
    chrome.storage.local.get(['history', 'alert'], (data) => {
      if (data.alert) {
        alertBox.style.display = 'block';
      } else {
        alertBox.style.display = 'none';
      }

      if (data.history && data.history.length > 0) {
        logDiv.innerHTML = data.history.map(entry => `
          <div class="log-entry">
            <span class="time">[${entry.timestamp}]</span><br>
            <strong>${entry.domain}</strong><br>
            <span style="color: #444;">${entry.title}</span>
          </div>
        `).join('');
      } else {
        logDiv.innerHTML = "Ingen AI-aktivitet registreret.";
      }
    });
  };

  clearBtn.addEventListener('click', () => {
    chrome.storage.local.set({ history: [], alert: false }, () => {
      updateUI();
    });
  });

  updateUI();
});
