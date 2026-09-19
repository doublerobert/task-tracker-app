import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateTaskData {
  task_insert: Task_Key;
}

export interface CreateTaskVariables {
  title: string;
  description?: string | null;
  priority: string;
  dueDate?: DateString | null;
  assignedToId: string;
}

export interface CreateUserProfileData {
  user_insert: User_Key;
}

export interface CreateUserProfileVariables {
  displayName: string;
  email: string;
}

export interface DeleteTaskData {
  task_delete?: Task_Key | null;
}

export interface DeleteTaskVariables {
  id: UUIDString;
}

export interface GetAllTasksData {
  tasks: ({
    id: UUIDString;
    title: string;
    status: string;
    priority: string;
    dueDate?: DateString | null;
    assignedTo: {
      id: string;
      displayName: string;
      email: string;
    } & User_Key;
    createdBy: {
      id: string;
      displayName: string;
    } & User_Key;
  } & Task_Key)[];
}

export interface GetAllUsersData {
  users: ({
    id: string;
    displayName: string;
    email: string;
    role: string;
  } & User_Key)[];
}

export interface GetCurrentUserProfileData {
  user?: {
    id: string;
    displayName: string;
    email: string;
    role: string;
  } & User_Key;
}

export interface GetMyTasksData {
  tasks: ({
    id: UUIDString;
    title: string;
    description?: string | null;
    status: string;
    priority: string;
    dueDate?: DateString | null;
    createdBy: {
      id: string;
      displayName: string;
    } & User_Key;
  } & Task_Key)[];
}

export interface GetMyTasksVariables {
  userId: string;
}

export interface GetTaskByIdData {
  task?: {
    id: UUIDString;
    title: string;
    description?: string | null;
    status: string;
    priority: string;
    dueDate?: DateString | null;
    assignedTo: {
      id: string;
      displayName: string;
      email: string;
    } & User_Key;
    createdBy: {
      id: string;
      displayName: string;
    } & User_Key;
  } & Task_Key;
}

export interface GetTaskByIdVariables {
  id: UUIDString;
}

export interface Task_Key {
  id: UUIDString;
  __typename?: 'Task_Key';
}

export interface UpdateTaskData {
  task_update?: Task_Key | null;
}

export interface UpdateTaskStatusData {
  task_update?: Task_Key | null;
}

export interface UpdateTaskStatusVariables {
  id: UUIDString;
  status: string;
}

export interface UpdateTaskVariables {
  id: UUIDString;
  title?: string | null;
  description?: string | null;
  priority?: string | null;
  dueDate?: DateString | null;
  assignedToId?: string | null;
}

export interface UpdateUserRoleData {
  user_update?: User_Key | null;
}

export interface UpdateUserRoleVariables {
  id: string;
  role: string;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface CreateUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserProfileVariables): MutationRef<CreateUserProfileData, CreateUserProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserProfileVariables): MutationRef<CreateUserProfileData, CreateUserProfileVariables>;
  operationName: string;
}
export const createUserProfileRef: CreateUserProfileRef;

export function createUserProfile(vars: CreateUserProfileVariables): MutationPromise<CreateUserProfileData, CreateUserProfileVariables>;
export function createUserProfile(dc: DataConnect, vars: CreateUserProfileVariables): MutationPromise<CreateUserProfileData, CreateUserProfileVariables>;

interface CreateTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTaskVariables): MutationRef<CreateTaskData, CreateTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTaskVariables): MutationRef<CreateTaskData, CreateTaskVariables>;
  operationName: string;
}
export const createTaskRef: CreateTaskRef;

export function createTask(vars: CreateTaskVariables): MutationPromise<CreateTaskData, CreateTaskVariables>;
export function createTask(dc: DataConnect, vars: CreateTaskVariables): MutationPromise<CreateTaskData, CreateTaskVariables>;

interface UpdateTaskStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTaskStatusVariables): MutationRef<UpdateTaskStatusData, UpdateTaskStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTaskStatusVariables): MutationRef<UpdateTaskStatusData, UpdateTaskStatusVariables>;
  operationName: string;
}
export const updateTaskStatusRef: UpdateTaskStatusRef;

export function updateTaskStatus(vars: UpdateTaskStatusVariables): MutationPromise<UpdateTaskStatusData, UpdateTaskStatusVariables>;
export function updateTaskStatus(dc: DataConnect, vars: UpdateTaskStatusVariables): MutationPromise<UpdateTaskStatusData, UpdateTaskStatusVariables>;

interface UpdateTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTaskVariables): MutationRef<UpdateTaskData, UpdateTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTaskVariables): MutationRef<UpdateTaskData, UpdateTaskVariables>;
  operationName: string;
}
export const updateTaskRef: UpdateTaskRef;

export function updateTask(vars: UpdateTaskVariables): MutationPromise<UpdateTaskData, UpdateTaskVariables>;
export function updateTask(dc: DataConnect, vars: UpdateTaskVariables): MutationPromise<UpdateTaskData, UpdateTaskVariables>;

interface DeleteTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTaskVariables): MutationRef<DeleteTaskData, DeleteTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTaskVariables): MutationRef<DeleteTaskData, DeleteTaskVariables>;
  operationName: string;
}
export const deleteTaskRef: DeleteTaskRef;

export function deleteTask(vars: DeleteTaskVariables): MutationPromise<DeleteTaskData, DeleteTaskVariables>;
export function deleteTask(dc: DataConnect, vars: DeleteTaskVariables): MutationPromise<DeleteTaskData, DeleteTaskVariables>;

interface UpdateUserRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  operationName: string;
}
export const updateUserRoleRef: UpdateUserRoleRef;

export function updateUserRole(vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;
export function updateUserRole(dc: DataConnect, vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;

interface GetMyTasksRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyTasksVariables): QueryRef<GetMyTasksData, GetMyTasksVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyTasksVariables): QueryRef<GetMyTasksData, GetMyTasksVariables>;
  operationName: string;
}
export const getMyTasksRef: GetMyTasksRef;

export function getMyTasks(vars: GetMyTasksVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyTasksData, GetMyTasksVariables>;
export function getMyTasks(dc: DataConnect, vars: GetMyTasksVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyTasksData, GetMyTasksVariables>;

interface GetAllTasksRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllTasksData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAllTasksData, undefined>;
  operationName: string;
}
export const getAllTasksRef: GetAllTasksRef;

export function getAllTasks(options?: ExecuteQueryOptions): QueryPromise<GetAllTasksData, undefined>;
export function getAllTasks(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAllTasksData, undefined>;

interface GetTaskByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTaskByIdVariables): QueryRef<GetTaskByIdData, GetTaskByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTaskByIdVariables): QueryRef<GetTaskByIdData, GetTaskByIdVariables>;
  operationName: string;
}
export const getTaskByIdRef: GetTaskByIdRef;

export function getTaskById(vars: GetTaskByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetTaskByIdData, GetTaskByIdVariables>;
export function getTaskById(dc: DataConnect, vars: GetTaskByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetTaskByIdData, GetTaskByIdVariables>;

interface GetAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAllUsersData, undefined>;
  operationName: string;
}
export const getAllUsersRef: GetAllUsersRef;

export function getAllUsers(options?: ExecuteQueryOptions): QueryPromise<GetAllUsersData, undefined>;
export function getAllUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAllUsersData, undefined>;

interface GetCurrentUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserProfileData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserProfileData, undefined>;
  operationName: string;
}
export const getCurrentUserProfileRef: GetCurrentUserProfileRef;

export function getCurrentUserProfile(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserProfileData, undefined>;
export function getCurrentUserProfile(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserProfileData, undefined>;

