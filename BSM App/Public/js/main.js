document.addEventListener('DOMContentLoaded', function() {
  // Function to fetch existing users from the backend
  async function fetchUsers() {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      return data.users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  // Function to display existing users
  async function displayUsers() {
    const userList = document.getElementById('user-list');
    const users = await fetchUsers();

    userList.innerHTML = ''; // Clear existing user list

    users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.textContent = `Username: ${user.username}, Email: ${user.email}`;
      userList.appendChild(listItem);
    });
  }

  // Call the display function when the page loads
  displayUsers();

  // Function to handle form submission for adding users
  document.getElementById('add-user-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Here you can send the user data to the backend for processing
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    // After adding the user, refresh the user list
    await displayUsers();

    // You can then update the UI or show a confirmation message
    alert('User added successfully!');
  });

  // Function to handle user removal
  document.getElementById('user-list').addEventListener('click', async function(event) {
    if (event.target.tagName === 'LI') {
      const username = event.target.textContent.split(':')[1].trim();
      // Here you can send the username to the backend to remove the user
      console.log('Removing user:', username);
      // After removing the user, refresh the user list
      await displayUsers();
      // You can then update the UI or show a confirmation message
      alert('User removed successfully!');
    }
  });

  // Function to fetch admin dashboards from the backend
  async function fetchAdminDashboards() {
    try {
      const response = await fetch('/api/admin-dashboards');
      const data = await response.json();
      return data.adminDashboards;
    } catch (error) {
      console.error('Error fetching admin dashboards:', error);
      return [];
    }
  }

  // Function to fetch client dashboards from the backend
  async function fetchClientDashboards() {
    try {
      const response = await fetch('/api/client-dashboards');
      const data = await response.json();
      return data.clientDashboards;
    } catch (error) {
      console.error('Error fetching client dashboards:', error);
      return [];
    }
  }

  // Function to display admin dashboards
  async function displayAdminDashboards() {
    const adminDashboardList = document.getElementById('admin-dashboard-list');
    const adminDashboards = await fetchAdminDashboards();

    adminDashboardList.innerHTML = ''; // Clear existing dashboards

    adminDashboards.forEach(dashboard => {
      const listItem = document.createElement('li');
      listItem.textContent = dashboard.name;
      adminDashboardList.appendChild(listItem);
    });
  }

  // Function to display client dashboards
  async function displayClientDashboards() {
    const clientDashboardList = document.getElementById('client-dashboard-list');
    const clientDashboards = await fetchClientDashboards();

    clientDashboardList.innerHTML = ''; // Clear existing dashboards

    clientDashboards.forEach(dashboard => {
      const listItem = document.createElement('li');
      listItem.textContent = dashboard.name;
      clientDashboardList.appendChild(listItem);
    });
  }

  // Call the display functions when the page loads
  displayAdminDashboards();
  displayClientDashboards();
});
