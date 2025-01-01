document.addEventListener('DOMContentLoaded', function() {
  const jobContainer = document.getElementById('job-container');

  // Fetch the job data from the jobs.json file
  fetch('jobs.json')
    .then(response => response.json())
    .then(jobs => {
      jobs.forEach(job => {
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
    })
    .catch(error => console.error('Error loading job listings:', error));
});

// Filter jobs based on user input
function filterJobs() {
  const searchValue = document.getElementById('jobSearch').value.toLowerCase();
  const jobItems = document.querySelectorAll('.job-item');

  jobItems.forEach(item => {
    const title = item.querySelector('h3').textContent.toLowerCase();
    const location = item.querySelector('p').textContent.toLowerCase();
    
    if (title.includes(searchValue) || location.includes(searchValue)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
