document.querySelector('#loan-form').addEventListener('submit', validateForm);



// Form Validation
function validateForm(e) {
  e.preventDefault();

  // Remove errors on button click
  const errorMessages = document.querySelectorAll('.form-error');

  errorMessages.forEach((error) => {
    error.remove();
  });

  // Check every field
  const fields = ['amount', 'interest', 'loan-term'];

  fields.forEach((field) => {
    const input = document.querySelector(`#${field}`).value;

    if (input <= 0 || input == null) {
      showError(field);
    }
  });

  // Calculate if no error
  if (!document.querySelector('.form-error')) {
    runCalculator();
  }
}

function showError(field) {
  // Create error field
  const fieldElement = document.querySelector(`#${field}`);
  const formGroup = fieldElement.parentElement.parentElement;
  const errorMessage = document.createElement('div');

  errorMessage.className = `form-error ${field}-error alert alert-danger p-2 mb-4`;

  // Limit error to 1
  if (!document.querySelector(`.${field}-error`)) {
    errorMessage.appendChild(document.createTextNode(`Please check your ${field}`));
    formGroup.parentNode.insertBefore(errorMessage, formGroup.nextSibling);
  }
}



// Loan Calculator
function calculateLoan() {
  // Inputs
  const amount = parseFloat(document.querySelector('#amount').value);
  const interest = parseFloat(document.querySelector('#interest').value);
  const loanTerm = parseFloat(document.querySelector('#loan-term').value);

  // Variables
  const calcInterest = (interest / 100) / 12;
  const calcLoanTerm = loanTerm * 12;

  // Computation
  let monthlyPayment = (amount * calcInterest) / (1 - ((1 + calcInterest) ** -calcLoanTerm));
  let totalPayment = monthlyPayment * calcLoanTerm;
  let totalInterest = totalPayment - amount;

  totalPayment = totalPayment.toFixed(2);
  totalInterest = totalInterest.toFixed(2);
  monthlyPayment = monthlyPayment.toFixed(2);

  return {
    monthlyPayment: monthlyPayment,
    totalPayment: totalPayment,
    totalInterest: totalInterest,
  }
}

function runCalculator(e) {
  // Form Result UI
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');
  const loading = document.querySelector('#loading');
  const results = document.querySelector('#results');

  // Loan Function
  const loan = calculateLoan();

  // Display Loader & Loan
  results.style.display = 'none';
  loading.style.display = 'block';

  setTimeout(() => {
    loading.style.display = 'none';
    results.style.display = 'block';
  }, 500);

  monthlyPayment.value = loan.monthlyPayment;
  totalPayment.value = loan.totalPayment;
  totalInterest.value = loan.totalInterest;
}