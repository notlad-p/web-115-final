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
    form.insertBefore(dayContainer, buttonsFooter);

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

  const headerElements = ["<header>", "<h1>Weekly Meal Plan</h1>"];
  const elements = [];

  const meals = {};

  for (const [key, value] of formData.entries()) {
    const isUserInfo = key === "name" || key === "email" || key === "goals";
    if (isUserInfo) {
      // add user info to header elements
      const sanitizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      headerElements.push(`<p><b>${sanitizedKey}</b>: ${value}</p>`);
    } else {
      // add days and meals to object
      const mealDay = key.split("-")[0];
      const mealKey = key.split("-")[1];
      if (!meals[mealDay]) {
        meals[mealDay] = {};
      }
      meals[mealDay][mealKey] = value;
    }
  }

  // close header
  headerElements.push(
    '<button onClick="window.print()">Print or Download</button>'
  );
  headerElements.push("</header>");

  for (const [key, value] of Object.entries(meals)) {
    elements.push("<div class='day-container'>");
    elements.push(`<h2>${key}</h2>`);
    for (const [mealKey, mealValue] of Object.entries(value)) {
      elements.push(`<p><b>${mealKey}</b>: ${mealValue}</p>`);
    }
    elements.push("</div>");
  }

  const newWindow = window.open(
    "about:blank",
    "myPop",
    "width=800,height=800,left=200,top=200"
  );
  newWindow.document.write(
    '<html><head><title>Meal Plan</title><link rel="stylesheet" type="text/css" href="style.css"/></head><body>'
  );
  newWindow.document.write(headerElements.join(""));
  newWindow.document.write(elements.join(""));
  newWindow.document.write("</body></html>");
});
