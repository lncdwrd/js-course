class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  initialize() {
    // this.validateOnSubmit();
    this.validateOnEntry();
  }

  validateOnEntry() {
    this.fields.forEach((field) => {
      const input = document.querySelector(`#${field}`);
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
    });
  }

  validateField(field) {
    if (field.id === 'name') {
      const re = /^[a-zA-Z]{2,10}$/;

      if (re.test(field.value)) {
        field.classList.remove('is-invalid');
      } else {
        field.classList.add('is-invalid');
      }
    } else if (field.id === 'zip_code') {
      const re = /^[0-9]{5}(-[0-9]{4})?$/;

      if (re.test(field.value)) {
        field.classList.remove('is-invalid');
      } else {
        field.classList.add('is-invalid');
      }
    } else if (field.id === 'email') {
      const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

      if (re.test(field.value)) {
        field.classList.remove('is-invalid');
      } else {
        field.classList.add('is-invalid');
      }
    } else if (field.id === 'phone') {
      const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

      if (re.test(field.value)) {
        field.classList.remove('is-invalid');
      } else {
        field.classList.add('is-invalid');
      }
    }
  }
}

const userForm = document.querySelector('#userForm');
const userFormFields = ['name', 'zip_code', 'email', 'phone'];
const userFormValidator = new FormValidator(userForm, userFormFields);

userFormValidator.initialize();