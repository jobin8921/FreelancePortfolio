let jobs = [];  // Store all job listings
let filteredJobs = [];  // Store filtered job listings
const jobsPerPage = 3;  // Number of jobs per page
let currentPage = 1;  // Starting page

document.addEventListener('DOMContentLoaded', function () {
  const jobContainer = document.getElementById('job-container');
  const paginationContainer = document.getElementById('pagination-container');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Fetch job data from jobs.json
  fetch('jobs.json')
    .then(response => response.json())
    .then(data => {
      jobs = data;  // Store all jobs
      filteredJobs = jobs;  // Initially display all jobs
      renderJobs(); // Initial render of jobs
      updatePagination(); // Initial pagination setup
    })
    .catch(error => console.error('Error loading job listings:', error));

  // Function to render jobs for the current page
  function renderJobs() {
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const jobsToDisplay = filteredJobs.slice(startIndex, endIndex);

    jobContainer.innerHTML = '';  // Clear job container

    jobsToDisplay.forEach(job => {
      const jobItem = document.createElement('div');
      jobItem.classList.add('job-item');
      jobItem.innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>Location:</strong> ${job.location}</p>
        <p>${job.description}</p>
        <a href="${job.applyLink}" class="apply-btn" target="_blank">Apply Now</a>
      `;
      jobContainer.appendChild(jobItem);
    });

    updatePagination();  // Update pagination buttons after rendering jobs
  }

  // Function to change pages (Previous/Next)
  window.changePage = function(direction) {
    currentPage += direction;
    renderJobs();
  }

  // Function to update the status of the Previous and Next buttons
  function updatePagination() {
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

    // Enable/Disable Previous and Next buttons based on the current page
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  // Function to filter jobs by category (Frontend, Backend, Full Stack)
  window.filterByCategory = function(category) {
    filteredJobs = jobs.filter(job => job.title.toLowerCase().includes(category.toLowerCase()));
    currentPage = 1; // Reset to the first page
    renderJobs();
  };
  window.resetFilters = function() {
    filteredJobs = jobs;  // Show all jobs
    currentPage = 1;  // Reset to the first page
    renderJobs();
    updatePagination();
  };
  // Function to filter jobs based on search input
  window.filterJobs = function() {
    const searchValue = document.getElementById('jobSearch').value.toLowerCase();
    filteredJobs = jobs.filter(job =>
      job.title.toLowerCase().includes(searchValue) || job.location.toLowerCase().includes(searchValue)
    );
    currentPage = 1;  // Reset to the first page
    renderJobs();
  };
});
