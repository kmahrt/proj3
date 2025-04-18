

function checkRequired(fieldId, requiredMessage) {
  const field = document.getElementById(fieldId);
  const errorDiv = document.getElementById(fieldId + '-error');
  
  if (!field.value.trim()) {
    setElementValidity(fieldId, false, requiredMessage);
  } else {
    setElementValidity(fieldId, true);
  }
}

function checkFormat(fieldId, badFormatMessage, regex) {
  const field = document.getElementById(fieldId);
  const errorDiv = document.getElementById(fieldId + '-error');
  
  if (!regex.test(field.value)) {
    setElementValidity(fieldId, false, badFormatMessage);
  } else {
    setElementValidity(fieldId, true);
  }
}

function validateState(fieldId, invalidMessage) {
  const stateAbbreviations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", 
    "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", 
    "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];
  
  const field = document.getElementById(fieldId);
  const errorDiv = document.getElementById(fieldId + '-error');
  
  if (!stateAbbreviations.includes(field.value.toUpperCase())) {
    setElementValidity(fieldId, false, invalidMessage);
  } else {
    setElementValidity(fieldId, true);
  }
}

function setElementValidity(fieldId, valid, message) {
  const field = document.getElementById(fieldId);
  const errorDiv = document.getElementById(fieldId + '-error');
  
  field.classList.add('was-validated');
  
  if (valid) {
    field.setCustomValidity('');
    errorDiv.innerHTML = '';
    field.style.borderColor = 'green';
  } else {
    field.setCustomValidity(message);
    errorDiv.innerHTML = message;
    field.style.borderColor = 'red';
  }
}

function validateForm(event) {
  event.preventDefault();
  
  checkRequired('first-name', 'First name is required');
  checkRequired('last-name', 'Last name is required');
  checkRequired('address', 'Address is required');
  checkRequired('city', 'City is required');
  checkRequired('state', 'State is required');
  checkRequired('zip', 'Zip code is required');
  checkRequired('phone', 'Phone number is required');
  checkRequired('email', 'Email is required');
  
  checkFormat('zip', 'Zip code is not valid', /^[0-9]{5}(?:-[0-9]{4})?$/);
  checkFormat('phone', 'Phone number is not valid', /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/);
  checkFormat('email', 'Email is not valid', /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
  
  validateState('state', 'State abbreviation is not valid');
  
  const checkboxes = document.querySelectorAll('input[name="find-page"]');
  const isAnyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
  
  if (!isAnyChecked) {
    setElementValidity('find-page', false, 'Please select at least one option for "How did you find my page?"');
  } else {
    setElementValidity('find-page', true);
  }

  const form = document.getElementById('infoForm');
  if (form.checkValidity()) {
    document.getElementById('infoForm').style.display = 'none';
    document.getElementById('success').style.display = 'block';
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('infoForm');
  
  const fields = form.querySelectorAll('input, textarea');
  fields.forEach(field => {
    field.addEventListener('blur', function () {
      if (field.id === 'state') {
        validateState(field.id, 'State abbreviation is not valid');
      } else if (field.id === 'zip') {
        checkFormat(field.id, 'Zip code is not valid', /^[0-9]{5}(?:-[0-9]{4})?$/);
      } else if (field.id === 'phone') {
        checkFormat(field.id, 'Phone number is not valid', /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/);
      } else if (field.id === 'email') {
        checkFormat(field.id, 'Email is not valid', /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
      } else {
        checkRequired(field.id, field.id + ' is required');
      }
    });
  });

  form.addEventListener('submit', validateForm);
});
