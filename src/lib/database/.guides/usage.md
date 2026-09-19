# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUserProfile, createTask, updateTaskStatus, updateTask, deleteTask, updateUserRole, getMyTasks, getAllTasks, getTaskById, getAllUsers } from '@dataconnect/generated';


// Operation CreateUserProfile:  For variables, look at type CreateUserProfileVars in ../index.d.ts
const { data } = await CreateUserProfile(dataConnect, createUserProfileVars);

// Operation CreateTask:  For variables, look at type CreateTaskVars in ../index.d.ts
const { data } = await CreateTask(dataConnect, createTaskVars);

// Operation UpdateTaskStatus:  For variables, look at type UpdateTaskStatusVars in ../index.d.ts
const { data } = await UpdateTaskStatus(dataConnect, updateTaskStatusVars);

// Operation UpdateTask:  For variables, look at type UpdateTaskVars in ../index.d.ts
const { data } = await UpdateTask(dataConnect, updateTaskVars);

// Operation DeleteTask:  For variables, look at type DeleteTaskVars in ../index.d.ts
const { data } = await DeleteTask(dataConnect, deleteTaskVars);

// Operation UpdateUserRole:  For variables, look at type UpdateUserRoleVars in ../index.d.ts
const { data } = await UpdateUserRole(dataConnect, updateUserRoleVars);

// Operation GetMyTasks:  For variables, look at type GetMyTasksVars in ../index.d.ts
const { data } = await GetMyTasks(dataConnect, getMyTasksVars);

// Operation GetAllTasks: 
const { data } = await GetAllTasks(dataConnect);

// Operation GetTaskById:  For variables, look at type GetTaskByIdVars in ../index.d.ts
const { data } = await GetTaskById(dataConnect, getTaskByIdVars);

// Operation GetAllUsers: 
const { data } = await GetAllUsers(dataConnect);


```