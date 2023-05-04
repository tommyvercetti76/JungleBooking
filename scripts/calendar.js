function toggleCalendar() {
  const calendar = document.getElementById('calendar');
  calendar.classList.toggle('hidden');
}

function createCalendar() {
  // Add the calendar generation logic here
}

document.addEventListener('DOMContentLoaded', () => {
  createCalendar();
  
  const calendarIcons = document.querySelectorAll('.calendar-icon');
  calendarIcons.forEach((icon) => {
    icon.addEventListener('click', toggleCalendar);
  });
});
