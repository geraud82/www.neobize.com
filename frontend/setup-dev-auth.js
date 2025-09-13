// Development authentication setup script
// This script sets up a temporary authentication token for testing admin functionality

console.log('Setting up development authentication...');

// Set a temporary auth token in localStorage
const tempToken = 'dev-token-' + Date.now();
localStorage.setItem('authToken', tempToken);

console.log('✅ Development authentication token set:', tempToken);
console.log('You can now access admin routes like /admin and /admin/create');
console.log('Note: This is for development only - backend API calls will be simulated');

// Reload the page to apply the authentication
window.location.reload();
