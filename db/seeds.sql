USE employee_tracker;

INSERT INTO department (name)
VALUES
  ('Architecture'),
  ('Art'),
  ('Art History'),
  ('Graphic Design'),
  ('Product Design');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Director of Architecture', '250000', 1),
  ('Associate Professor of Architecture', '175000', 1),
  ('Director of Art', '250000', 2),
  ('Associate Professor of Art', '175000', 2),
  ('Director of Art History', '250000', 3),
  ('Associate Professor of Art History', '175000', 3),
  ('Director of Graphic Design', '250000', 4),
  ('Associate Professor of Graphic Design', '175000', 4),
  ('Director of Product Design', '250000', 5),
  ('Associate Professor of Product Design', '175000', 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Lucy', 'Gans', 1, NULL),
  ('Shimon', 'Attie', 2, 1),
  ('Robin', 'Cameron', 3, NULL),
  ('Anna', 'Chupa', 4, 3),
  ('William', 'Crow', 5, NULL),
  ('Amy', 'Forsyth', 6, 5),
  ('Eugene', 'Han', 7, NULL),
  ('Wesley', 'Heiss', 8, 7),
  ('Marilyn', 'Jones', 9, NULL),
  ('Victor', 'Martinez', 10, 9);