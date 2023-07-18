import "./sass/style.scss";

const fieldsets = Array.from(document.getElementsByTagName("fieldset"));
const password = document.getElementById("password") as HTMLInputElement;
const confirmPassword = document.getElementById(
  "confirm-password"
) as HTMLInputElement;

enum inputState {
  good = "good",
  bad = "bad",
}

const { good, bad } = inputState;

const toggleClasses = (fieldset: HTMLFieldSetElement, type: inputState) => {
  if (type === bad) {
    fieldset.classList.add("invalid");
    fieldset.classList.remove("valid");
  } else if (type === good) {
    fieldset.classList.add("valid");
    fieldset.classList.remove("invalid");
  }
};

fieldsets.forEach((fieldset) => {
  const input = fieldset.getElementsByTagName("input")[0];
  input.addEventListener("focusout", () => {
    toggleClasses(fieldset, input.value && input.validity.valid ? good : bad);
    input.id === "confirm-password" &&
      toggleClasses(
        fieldset,
        password.value === confirmPassword.value ? good : bad
      );
  });
});

// toggle visibilty of password inputs
const toggleVisibility = () => {
  const elements: HTMLInputElement[] = [password, confirmPassword];
  const visibilityIcon = document.getElementById(
    "visibility-icon"
  ) as HTMLImageElement;
  elements.forEach(
    (element) =>
      (element.type = element.type === "password" ? "text" : "password")
  );

  visibilityIcon.src = visibilityIcon.src.match(/eye/)
    ? "./assets/hide.png"
    : "./assets/eye.png";
};

const visibilityButton = document.getElementById("visibility-button");
visibilityButton?.addEventListener("click", toggleVisibility);
