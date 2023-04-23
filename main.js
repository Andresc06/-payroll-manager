let positions = [
  { id: 1, name: "Chief Executive Officer", salary: 50000 },
  { id: 2, name: "Marketing Manager", salary: 45000 },
  { id: 3, name: "Product Manager", salary: 44000 },
  { id: 4, name: "Supervisor", salary: 41000 },
  { id: 5, name: "Sales Manager", salary: 40000 },
  { id: 6, name: "Financial Manager", salary: 39000 },
  { id: 7, name: "Office Employee", salary: 30000 },
];

let employees = [];

let concepts = []

function setQuantity(chosen) {
  let modes = document.getElementsByClassName("mode");
  if (chosen == 0) {
    // Set Quantity mode enabled
    modes[0].disabled = false;

    // Set Discount mode disabled
    modes[1].disabled = true;
  } else {
    // Set Discount mode enabled
    modes[1].disabled = false;

    // Set Quantity mode disabled
    modes[0].disabled = true;
  }
}

function handleSubmit(event) {
  event.preventDefault();


  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());

  let info = Object.values(value);

  if (value.user_phone) {
    generateInTable1(info);
  }

  if (value.concept_des) {
    generateInTable2(info);
  }

  if (value.concept_id) {
    assignConcept(info);
  }

  let forms = document.querySelectorAll(".form");
  forms.forEach(form => {
    form.reset();
  });

}

const forms = document.querySelectorAll(".form");
forms.forEach(form => {
  form.addEventListener("submit", handleSubmit);
})


function assignConcept(values) {
  let employee_id = values[0],
    concept_id = values[1];

  let employee = findObject(employees, "id", employee_id);
  employee.concepts.push(concept_id);
  console.log(employees);
}

//COD DIEGO


const formMenus = document.querySelectorAll('.form_menu');

formMenus.forEach(menu => {
  const formSelect = menu.querySelector('.form_select');
  const arrow = menu.querySelector('.arrow');
  const form = menu.querySelector('.form');

  formSelect.addEventListener('click', () => {
    formSelect.classList.toggle('form_select_active');
    form.classList.toggle('form_active');
    arrow.classList.toggle('arrow_rotate');
  })
});

function findObject(arr, key, value) {
  return arr.filter(obj => obj[key] === value)[0];
};

//LO DE ABAJO VA PA dropdownMenu.js

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(drop => {
  const select = drop.querySelector('.select');
  const arrow = drop.querySelector('.arrow');
  const menu = drop.querySelector('.menu');
  const options = drop.querySelectorAll('.menu label');
  const selected = drop.querySelector('.selected');

  select.addEventListener('click', () => {
    select.classList.toggle('select_clicked');
    arrow.classList.toggle('arrow_rotate');
    menu.classList.toggle('menu_open');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerHTML = option.innerText;
      select.classList.remove('select_clicked');
      arrow.classList.remove('arrow_rotate');
      menu.classList.remove('menu_open');

      options.forEach(option => {
        option.classList.remove('active');
      });

      option.classList.add('active');
    });
  });
});

// COD ANDRES


function showTable(number) {

  let element = 'table' + number;

  document.getElementById('table1').style.display = 'none';
  document.getElementById('table2').style.display = 'none';
  document.getElementById('table3').style.display = 'none';

  document.getElementById(element).style.display = 'inline-block';

  if (number == 3) {
    generateInTable3();
  }

}

function generateInTable1(values) {

  // Obtener la referencia del elemento de id table1
  let table1 = document.getElementById("table1");

  // Crea las celdas
  let row = document.createElement("tr");

  let position = values[0],
    user_name = values[1],
    user_lastname = values[2],
    user_address = values[3],
    user_phone = values[4],
    user_email = values[5],
    user_ci = values[6]

  let info = [user_ci, user_name, user_lastname, position, user_email, user_address, user_phone]

  info.forEach(inf => {
    let td = document.createElement("td");
    td.textContent = inf;
    row.appendChild(td);
  })

  table1.appendChild(row);

  employees.push({
    id: user_ci,
    name: user_name,
    lastname: user_lastname,
    addr: user_address,
    tlfn: user_phone,
    email: user_email,
    position: position,
    concepts: []
  })
}

function generateInTable2(values) {
  // Obtener la referencia del elemento de id table2
  let table2 = document.getElementById("table2");

  // Crea las celdas
  let row = document.createElement("tr");

  let concept_name = values[0],
    concept_type = values[1],
    concept_mode = values[2],
    concept_qty = values[3],
    concept_des = values[4],
    concept_id = `${concepts.length + 1}`;

  let info = [concept_id, concept_name, concept_type, concept_mode, concept_qty, concept_des]

  info.forEach(inf => {
    let td = document.createElement("td");
    td.textContent = inf;
    row.appendChild(td);
  })

  table2.appendChild(row);

  concepts.push({
    id: concept_id,
    name: concept_name,
    type: concept_type,
    mode: concept_mode,
    amount: concept_qty,
    description: concept_des
  })
}

function generateInTable3() {

  // Obtener la referencia del elemento de id table3
  let table3 = document.getElementById("table3");
  table3.innerHTML = '';

  let mandatory = ['CI', 'Name', 'Last Name', 'Position', 'Salary'];

  let header = document.createElement("thead");
  let tr = document.createElement("tr");

  mandatory.forEach(inf => {
    let th = document.createElement("th");
    th.textContent = inf;
    tr.appendChild(th);
  })

  let conceptHeaders = [];

  concepts.forEach(concept => {
    let th = document.createElement("th");
    th.textContent = concept.name;
    conceptHeaders.push(concept.name)
    tr.appendChild(th);
  })

  let th = document.createElement("th");
  th.textContent = "Balance";
  tr.appendChild(th);

  header.appendChild(tr);
  table3.appendChild(header);

  let string = `<tbody>`;
  let totalBalance = 0;

  console.log(employees)
  employees.forEach(employee => {

    let employeeSalary = parseFloat(findObject(positions, "name", employee.position).salary),
      balance = employeeSalary;

    string += `
      <tr>
        <td>${employee.id}</td>
        <td>${employee.name}</td>
        <td>${employee.lastname}</td>
        <td>${employee.position}</td>
        <td>${employeeSalary}</td>
        `
    conceptHeaders.forEach(concept => {
      let found;
      let employeeConcept;

      employee.concepts.forEach(c => {
        employeeC = findObject(concepts, "id", `${c}`);

        if (concept === employeeC.name) {
          found = true;
          employeeConcept = employeeC;
        }
      });

      if (found) {
        let conceptType = employeeConcept.type;
        let conceptMode = employeeConcept.mode;
        let conceptAmount = parseFloat(employeeConcept.amount);

        if (conceptMode === "ptg") {
          conceptAmount = employeeSalary * (conceptAmount / 100)
        }

        if (conceptType === "discount") {
          conceptAmount = -conceptAmount;
        }
        balance += conceptAmount;
        string += `<td>${conceptAmount}</td>`;
      }
      else {
        string += `<td>---</td>`;
      }
    })
    totalBalance += balance;
    string += `<td>${balance}</td></tr>`;
  });

  string += `<tr><td><b><i>Total Balance</i></b></td><td><b><i>${totalBalance}</i></b></td></tr></tbody>`
  table3.innerHTML += string;
}

