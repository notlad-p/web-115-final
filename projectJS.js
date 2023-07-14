const injectMealForm = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const meals = ["Breakfast", "Snack 2", "Lunch", "Snack 1", "Dinner"];
  const form = document.querySelector("form");

  days.forEach((day) => {
    // Create day container
    const dayContainer = document.createElement("div");
    dayContainer.classList.add("day-container");
    const buttonsFooter = document.querySelector(".buttons-footer");
    form.insertBefore(dayContainer, buttonsFooter)

    // Create day header
    const h2 = document.createElement("h2");
    h2.innerText = day;
    dayContainer.appendChild(h2);

    meals.forEach((meal) => {
      // Create meal label
      const label = document.createElement("label");
      label.for = `${day}-${meal}`;
      label.innerText = `${meal}: `;
      dayContainer.appendChild(label);

      // Create meal input
      const input = document.createElement("input");
      input.type = "text";
      input.name = `${day}-${meal}`;
      input.placeholder = `${meal}`;
      dayContainer.appendChild(input);
    });
  });

  // Create buttons
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.innerText = "Submit";
};

injectMealForm();

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  console.log(formData)
  // const meals = {};
  // for (const [key, value] of formData.entries()) {
  //   meals[key] = value;
  // }
  // console.log(meals);
})
