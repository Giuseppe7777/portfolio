let tasks = [
    {
        itemName: "Clean the living room",
        description: "Tidy up the room and dust the shelves.",
        image: "clean_room.jpg",
        priority: 0,
        deadline: "07.10.2024"
    },
    {
        itemName: "Bake a chocolate cake",
        description: "Prepare a cake for tonight's family dinner.",
        image: "bake_cake.jpg",
        priority: 0,
        deadline: "07.10.2024"
    },
    {
        itemName: "Take the dog for a walk",
        description: "Walk the dog in the park for 30 minutes.",
        image: "dog_walk.jpg",
        priority: 0,
        deadline: "07.10.2024"
    },
    {
        itemName: "Feed the cat",
        description: "Give the cat its daily meal and fresh water.",
        image: "feed_cat.jpg",
        priority: 0,
        deadline: "07.10.2024"
    },
    {
        itemName: "Fix the broken chair",
        description: "Repair the wobbly chair in the living room.",
        image: "fix_chair.jpg",
        priority: 0,
        deadline: "07.10.2024"
    },
    {
        itemName: "Send the letter",
        description: "Drop off the letter at the nearest post office.",
        image: "send_letter.jpg",
        priority: 0,
        deadline: "07.10.2024"
    },
    {
        itemName: "Wash the car",
        description: "Clean the car both inside and outside.",
        image: "wash_car.jpg",
        priority: 0,
        deadline: "07.10.2024"
    },
    {
        itemName: "Water the indoor plants",
        description: "Give the plants enough water for the day.",
        image: "water_plants.jpg",
        priority: 0,
        deadline: "07.10.2024"
    },
    {
        itemName: "Write a shopping list",
        description: "Make a list for groceries and household items.",
        image: "write_list.jpg",
        priority: 0,
        deadline: "07.10.2024"
    },
]

let deletedTasks = [];

function showCard() {
    document.getElementById('cards').innerHTML = '';

    tasks.forEach((item, index) => {
        document.getElementById('cards').innerHTML += `
            <div class="cardsblock__item mb-3" id="task-${index}">
                <div class="card">
                    <div class="card-header d-flex align-items-center justify-content-between ">
                        <button><span class="card-header-badge badge bg-primary">Task</span></button>
                        <div class="card-header-buttons">
                            <button class="btn" type="button">
                                <i class="fa-regular fa-bookmark"></i>
                            </button>
                            <button class="btn" type="button">
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                        </div>
                    </div>

                    <img class="card-img-top cardsblock-image" src="img/cards/${item.image}"  alt="${item.itemName}">
                    <div class="card-body">
                        <h5 class="card-title">${item.itemName}</h5>
                        <p class="card-text">${item.description}</p>
                        <div class="card-info mb-3">
                            <div class="card-priority mb-3 d-flex">
                                <button class="priority">
                                    <i class="fa-solid fa-triangle-exclamation me-2"></i>
                                </button>
                                <div class="priority-info d-flex align-items-center">
                                    <p class="priority-text me-2">Priority level:</p> 
                                    <span class="priorityNum priority-bg rounded-1">${item.priority}</span>
                                </div>
                            </div>
                            <div class="card-deadline">
                                <i class="fa-regular fa-calendar-days me-2"></i>
                                Deadline: <span>${item.deadline}</span>
                            </div>
                        </div>
                        <div class="card-buttons">
                            <button class="btn btn-danger delete-btn" data-index="${index}">Delete</button>
                            <button class="btn btn-success">Done</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    tasks.forEach((item, index) => {
        changeColor(index); 
    });

    addDeleteListeners();
    increasePriority();
}

function changeColor(index) {
    const priorityNumElement = document.querySelectorAll('.priority-bg')[index];     
    const priority = tasks[index].priority;
    
    if (priority <= 1) {
        priorityNumElement.classList.remove('bg-warning', 'bg-danger');
        priorityNumElement.classList.add('bg-success');
    } else if (priority <= 3) {
        priorityNumElement.classList.remove('bg-success', 'bg-danger');
        priorityNumElement.classList.add('bg-warning');
    } else {
        priorityNumElement.classList.remove('bg-success', 'bg-warning');
        priorityNumElement.classList.add('bg-danger');
    }
}

function sortTaskByPriority() {
    tasks.sort((a, b) => b.priority - a.priority); 
    showCard(); 
}

document.getElementById('sortBtn').addEventListener('click', sortTaskByPriority);

function increasePriority() {
    let priorityButtons = document.querySelectorAll('.priority');
    let priorityNums = document.querySelectorAll('.priorityNum');
    
    priorityButtons.forEach((btn, index) => {
        btn.addEventListener('click', function () {
            if (tasks[index].priority < 5) {
                tasks[index].priority++;
                priorityNums[index].innerText = tasks[index].priority;
                changeColor(index); 
            }
        });    
    });
}

function addDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const taskIndex = this.getAttribute('data-index');
            const deletedTask = tasks.splice(taskIndex, 1)[0]; 
            deletedTasks.push(deletedTask); 

            showCard(); 
            showDeletedTasks(); 
        });
    });
}

function showDeletedTasks() {
    document.getElementById('deletedCards').innerHTML = '';

    deletedTasks.forEach((item, index) => {
        document.getElementById('deletedCards').innerHTML += `
            <div class="cardsblock__item mb-3" id="task-${index}">
                <div class="card">                    
                    <img class="card-img-top cardsblock-image" src="img/cards/${item.image}" alt="${item.itemName}">
                    <div class="card-body">
                        <h5 class="card-title">${item.itemName}</h5>
                        <p class="card-text">${item.description}</p>
                        <div class="card-info mb-3">                            
                            <div class="card-deadline">
                                <i class="fa-regular fa-calendar-days me-2"></i>
                                Deadline: <span>${item.deadline}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        `;
    });
}

// Switch between tasks and deleted ones
document.getElementById('deletedLink').addEventListener('click', function() {
    document.getElementById('taskSection').style.display = 'none';
    document.getElementById('deletedSection').style.display = 'block';
});

// Back to main tasks
document.getElementById('tasksLink').addEventListener('click', function() {
    document.getElementById('taskSection').style.display = 'block';
    document.getElementById('deletedSection').style.display = 'none';
});

showCard();
showDeletedTasks();