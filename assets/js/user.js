//===========================field in addlead.html========================

function validateForm() {
  let isValid = true;
  const formFields = document.querySelectorAll("input[required]");

  formFields.forEach((field) => {
    if (!field.value) {
      isValid = false;
      field.classList.add("error"); // You can style this using CSS for better visibility
      field.setAttribute("title", `Please enter ${getFieldLabel(field)}*`);
    } else {
      field.classList.remove("error");
      field.removeAttribute("title");
    }
  });

  return isValid;
}

function getFieldLabel(field) {
  // This function assumes that each input field has a corresponding label with a 'for' attribute.
  const label = document.querySelector(`label[for="${field.id}"]`);
  return label ? label.textContent.trim() : "mandatory fields";
}

function displayTooltipsForRequiredFields() {
  const formFields = document.querySelectorAll("input[required]");

  const fieldMessages = {
    // Add more fields and messages as needed
    "#name": "Name is required",
    "#email": "Email is required",
    // Add more fields and messages as needed
  };

  formFields.forEach((field) => {
    if (!field.value) {
      const fieldName = field.name.toLowerCase(); // Adjust the field name as needed
      const errorMessage = fieldMessages[fieldName];

      field.classList.add("error");
      field.setAttribute(
        "title",
        errorMessage || `Please enter ${getFieldLabel(field)}*`
      );
    } else {
      field.classList.remove("error");
      field.removeAttribute("title");
    }
  });
}

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  displayTooltipsForRequiredFields(); // Display tooltips on form submission
  if (validateForm()) {
    addlead(); // If form is valid, proceed with adding the lead
  }
});

// You might also consider triggering the tooltips on other events, like input or blur
document
  .getElementById("myForm")
  .addEventListener("input", displayTooltipsForRequiredFields);

function formatName(name) {
  // Split the name into words
  const words = name.split(" ");

  // Capitalize the first letter of each word
  const formattedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the formatted words back into a string
  const formattedName = formattedWords.join(" ");

  return formattedName;
}

async function addlead() {
  const name = $("#name").val();
  const formattedName = formatName(name);
  const email = $("#email").val();
  const mobile = $("#mobile").val();
  const address = $("#address").val();
  const courseIntrested = $("#course").val();
  const mode = $("#mode").val();
  const courseDoneInOtherInstitute = $("#courseInOtherInstitute").val();
  const instituteName = $("#institute").val();
  const reason = $("#reason").val();
  const interest = $("#interest").val();
  const degree = $("#degree").val();
  const field = $("#field").val();
  const passingYear = $("#passingYear").val();
  const collegeName = $("#collegeName").val();
  const experience = $("#experience").val();
  const yearOfPassing = $("#yearOfExperience").val();
  const designation = $("#designation").val();
  const approach = $("#approach").val();
  const referenceName = $("#reference").val();
  const batchCode = $("#batchCode").val();
  const status = $("#status").val();
  const comment = $("#comment").val();
  const follow = $("#follow").val();
  const date = $("#date").val();

  const url = "http://localhost:8080/add-lead";
  const result = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name: formattedName,
      email: email,
      mobile: mobile,
      address: address,
      courseIntrested: courseIntrested,
      mode: mode,
      courseDoneInOtherInstitute: courseDoneInOtherInstitute,
      instituteName: instituteName,
      reason: reason,
      interest: interest,
      degree: degree,
      field: field,
      passingYear: passingYear,
      collegeName: collegeName,
      experience: experience,
      yearOfPassing: yearOfPassing,
      designation: designation,
      approach: approach,
      referenceName: referenceName,
      batchCode: batchCode,
      status: status,
      comment: comment,
      follow: follow,
      date: date,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (!isValidEmail(email)) {
    // Show error notification for invalid email address
    Toastify({
      text: "Error: Enter valid Emailid.",
      backgroundColor: "red",
      position: "right-bottom",
      duration: 6000, // 6 seconds
      close: true,
      gravity: "bottom",
      stopOnFocus: true,
    }).showToast();
    return;
  }

  if (!isValidMobileNumber(mobile)) {
    // Show error notification for invalid mobile number
    Toastify({
      text: "Error: Enter valid Mobile number.",
      backgroundColor: "red",
      position: "right-bottom",
      duration: 6000, // 6 seconds
      close: true,
      gravity: "bottom",
      stopOnFocus: true,
    }).showToast();
    return;
  }

  if (result.ok) {
    // Show success notification
    Toastify({
      text: formattedName + " is added as lead",
      backgroundColor: "green",
      position: "left-bottom",
      duration: 6000, // 6 seconds
      close: true,
      gravity: "bottom",
      stopOnFocus: true,
    }).showToast();
  } else {
    // Show error notification
    Toastify({
      text: "Error: Email or mobile already exist.",
      backgroundColor: "red",
      position: "right-bottom",
      duration: 6000, // 6 seconds
      close: true,
      gravity: "bottom",
      stopOnFocus: true,
    }).showToast();
  }

  // After adding the lead, fetch and update the lead data in leadlist.html
  // fetchLeadData();
}

function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  const submitButton = document.getElementById("submitButton");
  submitButton.disabled = true; // Disable the submit button

  if (validateForm()) {
    addlead().then(() => {
      submitButton.disabled = false; // Enable the submit button
    });
  } else {
    submitButton.disabled = false; // Enable the submit button in case of validation failure
  }
}

function isValidMobileNumber(mobile) {
  // Regular expression to validate a 10-digit mobile number starting with 6, 7, 8, or 9
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
}

function isValidEmail(email) {
  // Regular expression to validate an email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const selectElement = document.getElementById("courseInOtherInstitute");
const otherOptionsElement = document.getElementById("otherOptions");
const otherOptionElement = document.getElementById("otherOption");

selectElement.addEventListener("change", function () {
  if (selectElement.value === "yes") {
    otherOptionsElement.style.display = "block";
    otherOptionElement.style.display = "block";
  } else {
    otherOptionsElement.style.display = "none";
    otherOptionElement.style.display = "none";
  }
});

const selectExperience = document.getElementById("experience");
const yearOfExperienceElement = document.getElementById(
  "selectYearOfExperience"
);
const designationElement = document.getElementById("selectDesignation");

selectExperience.addEventListener("change", function () {
  if (selectExperience.value === "it") {
    yearOfExperienceElement.style.display = "block";
    designationElement.style.display = "block";
  } else {
    yearOfExperienceElement.style.display = "none";
    designationElement.style.display = "none";
  }
});

const selectApproach = document.getElementById("approach");
const refElement = document.getElementById("selectRef");
const batchElement = document.getElementById("selectBatch");

selectApproach.addEventListener("change", function () {
  if (selectApproach.value === "ref") {
    refElement.style.display = "block";
    batchElement.style.display = "block";
  } else {
    refElement.style.display = "none";
    batchElement.style.display = "none";
  }
});

const statusElement = document.getElementById("status");
const followOnFieldElement = document.getElementById("followOnField");

statusElement.addEventListener("change", function () {
  if (statusElement.value === "Open" || statusElement.value === "Contacted" || statusElement.value === "Proposal Sent") {
    followOnFieldElement.style.display = "block";
  } else {
    followOnFieldElement.style.display = "none";
    // Optionally, you can clear the followOnField value when it's hidden
    document.getElementById("follow").value = "";
  }
});

function showSubDropdown(dropdown) {
  const selectedOption = dropdown.value;

  document.getElementById("subDropdown1").style.display = "none";
  document.getElementById("subDropdown2").style.display = "none";

  if (selectedOption === "option1") {
    document.getElementById("subDropdown1").style.display = "block";
  } else if (selectedOption === "option2") {
    document.getElementById("subDropdown2").style.display = "block";
  }
}
