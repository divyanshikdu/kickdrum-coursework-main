//task 1.1 creating a constructor
function Task(title,priority){
    this.id=Date.now();
    this.title= title;
    this.priority=priority;
    this.completed= false;
}
//object
const t1= new Task("Learn the advanced js","high");
console.log(t1);


Task.prototype.markComplete=function(){
    this.completed=true;
    return this;
}

//using prototype
t1.markComplete();
console.log("after markcompleted",t1);

//update priority
Task.prototype.updatePriority=function(newPriority){
    const allow=["low","medium","high"];
    if(!allow.includes(newPriority)){
        console.log("Invalid");
        return this;
    }
    this.priority= newPriority;
    return this;
}

const t2 = new Task("react", "low");

t2.updatePriority("high");
console.log(t2); // high

const t3= new Task("react", "low");
t3.updatePriority("urgent");
console.log(t3);


//get info for task
Task.prototype.getInfo = function () {
  return `#${this.id} | ${this.title} | priority=${this.priority} | completed=${this.completed}`;
};
const t4= new Task("task info test","medium");
console.log(t4.getInfo());

//priority task constructor
function PriorityTask(title,priority,dueDate){
   Task.call(this,title,priority);
    this.dueDate=dueDate;
}
//priority chain
PriorityTask.prototype= Object.create(Task.prototype);
PriorityTask.prototype.constructor = PriorityTask;

//overriding getinfo()
PriorityTask.prototype.getInfo = function () {
  const baseInfo = Task.prototype.getInfo.call(this);

  if (this.dueDate) {
    return `${baseInfo} | due=${this.dueDate}`;
  }
  return baseInfo;
};
Task.prototype.getAllTasksInfo = function (tasks) {
  return tasks.map(task => task.getInfo());
};



const urgent = new PriorityTask("Urgent Task", "high", "12 May");
const other = new PriorityTask("Other Task", "medium","9 august");

const p1 = new PriorityTask("Urgent Bug Fix", "high", "12 May");
const p2 = new PriorityTask("Release Prep", "medium", "9 August");

// All tasks together
const allTasks = [t1, t2, p1, p2];

// Get all info
console.log("\nALL TASKS INFO:");
console.log(t1.getAllTasksInfo(allTasks));


//TASK 2
//- task 2.1
function createTaskAsync(title, priority) {
  console.log("Creating tasks...");

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Task created!");
      const task = new Task(title, priority);
      resolve(task);
    }, 1000); // 1 second delay
  });
}

createTaskAsync("Async Task", "high").then(task => {
  console.log("Returned Task:", task);
});


//task 2.2 
function demonstrateEventLoop() {
  setTimeout(() => {
    console.log(1);

    setTimeout(() => {
      console.log(4);

      setTimeout(() => {
        console.log(3);

        setTimeout(() => {
          console.log(2);
        }, 2000);

      }, 2000);

    }, 2000);

  }, 2000);
}
//calling it
demonstrateEventLoop();

async function createAndSaveTask(title, priority) {
  try {
    const savedTask = await createTaskAsync(title, priority);

    await createTaskAsync("Prepared task", "medium");

    //  success log
    console.log("Task created and saved successfully!");

    // saved task return
    return savedTask;
  } catch (error) {
    console.error("Error while creating/saving task:", error);
    throw error; 
  }
}
createAndSaveTask("Main Task", "high");


//task 2.4
function createMultipleTasksAsync(taskDataArray) {
  console.log(`Creating ${taskDataArray.length} tasks...`);

  const promises = taskDataArray.map(task =>
    createTaskAsync(task.title, task.priority)
  );

  return Promise.all(promises)
    .then(tasks => {
      console.log("All tasks created!");
      return tasks;
    })
    .catch(error => {
      console.error("Error creating multiple tasks:", error);
      throw error;
    });
}
const data = [
  { title: "Task A", priority: "low" },
  { title: "Task B", priority: "medium" },
  { title: "Task C", priority: "high" }
];

createMultipleTasksAsync(data).then(tasks => {
  console.log("Created Tasks:", tasks);
});
