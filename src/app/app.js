import angular from 'angular';

import '../style/app.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';


let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: '$ctrl'
  }
};

class AppCtrl {
  constructor() {
    this.taskDescription = '';
    this.tasks = [
      { id: 1, description: 'Task 1', isSelected: false },
      { id: 2, description: 'Task 2', isSelected: false },
      { id: 3, description: 'Task 3', isSelected: false }];
    this.url = 'https://github.com/preboot/angular-webpack';
  };

  addTask() {
    console.log('added task');
    if (this.taskDescription)
      this.tasks.push({ id: this.tasks.length, description: this.taskDescription, isSelected: false });
  }

  selectAll() {
    this.tasks.forEach(function (task) {
      task.isSelected = true;
    }, this);
  }

  unselectAll() {
    this.tasks.forEach(function (task) {
      task.isSelected = false;
    }, this);
  }

  removeSelected() {
    var remainingTasks = [];
    this.tasks.forEach(function (task) {
      if (!task.isSelected)
        remainingTasks.push(task);
    }, this);
    this.tasks = remainingTasks;
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;