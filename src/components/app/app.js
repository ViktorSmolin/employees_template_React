import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "..//app-filter/app-filter";
import EmployeesList from "..//emplayers-list/emplayers-list";
import EmployeesAddForm from "..//emplayers-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //ну якобы данные пришли откуда то... от туда ))
      data: [
        { name: "Alex M.", salary: 3000, increase: true, rise: true, id: 1 },
        { name: "John C.", salary: 800, increase: false, rise: false, id: 2 },
        { name: "Carl W.", salary: 5000, increase: false, rise: false, id: 3 },
      ],
      term: "",
      filter: "all",
    };
    this.maxId = 4;
  }
  // Добовляем пользователя, (но можно и пустого)
  addItem = (name, salary) => {
    if (name.length <= 3) {
      name = "Имя менее 3 символов!!! если ты не Ян кочно";
    }
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  onToggleIncrease = (id) => {
    // this.setState(({ data }) => {
    // код полностью рабочий, но я нехера его не понял (только то, что newArr формируется из разных объектов и массивов)
    // const index = data.findIndex((elem) => elem.id === id);
    // const old = data[index];
    // const newItem = { ...old, increase: !old.increase };
    // const newArr = [
    //   ...data.slice(0, index),
    //   newItem,
    //   ...data.slice(index + 1),
    // ];
    // return {
    //   data: newArr,
    // };
    // });

    // а здесь мы получем новый массив с одним изменёным зачение increase
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            increase: !item.increase,
          };
        }
        return item;
      }),
    }));
  };
  onToggleRise = (id) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            rise: !item.rise,
          };
        }
        return item;
      }),
    }));
  };

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => {
      // берём name каждого элемента массива выполняем метод indexOf (term <-- кусок строки
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  deletItem = (id) => {
    this.setState(({ data }) => {
      // const index = data.findIndex((elem) => elem.id === id);
      // const before = data.slice(0, index);
      // const after = data.slice(index + 1);
      // const newArr =[...before, ...after];
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case "rise":
        return items.filter((item) => item.rise);
      case "moreThen1000":
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  onFilterSelect = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, term, filter } = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);
    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>
        <EmployeesList
          data={visibleData}
          onDelete={this.deletItem}
          onToggleIncrease={this.onToggleIncrease}
          onToggleRise={this.onToggleRise}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
