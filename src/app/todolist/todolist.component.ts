import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {

  taskArray: any[] = [
    {taskName: 'Learn Html5', isCompleted: false, isEditable:false}
  ]
 constructor(){}
 ngOnInit(): void{
  this.getFromLocalStorage();
 }

 //Submit form with a new task
onSubmit(form: NgForm){
 console.log(form);
 this.taskArray.push({
  taskName: form.controls['task'].value,
  isCompleted: false,
  isEditable:false
})
this.saveLocalStorage();
form.reset();
}
//save new task in the localStorage
//save the array of Objects in string json value
saveLocalStorage(){
  let stringJSONArray = JSON.stringify(this.taskArray);
  localStorage.setItem('todolist', stringJSONArray); //set JSONArray with a keyvalue
}
//parses a JSON string into array of an Object 
getFromLocalStorage(){
  //Get the taskarray in a variable
  let itemJSONString =  localStorage.getItem('todolist');
  if(itemJSONString != null){
   this.taskArray = JSON.parse(itemJSONString);
  }
}

onCheck(index: number){
  console.log(this.taskArray);
  this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  this.saveLocalStorage();
}
  onDelete(index: number){
  console.log(index);
  this.taskArray.splice(index, 1);
  this.saveLocalStorage();
  }
  onEdit(index: number){
  this.taskArray[index].isEditable = true;
  this.saveLocalStorage();
  }
  onSave(index: number, newTask: string){
    this.taskArray[index].taskName = newTask;
    this.taskArray[index].isEditable = false;
    this.saveLocalStorage();
  }
 
}
