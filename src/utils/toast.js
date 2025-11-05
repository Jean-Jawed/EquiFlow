export const showToast = (message, type = 'success') => {
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideUpToast 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};
