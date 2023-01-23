import { Component } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {CdkDragDrop,moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop'
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
    todoForm !: FormGroup;
    tasks:ITask[]=[];
    inprogress:ITask[]=[];
    done:ITask[]=[];
    constructor(private fb:FormBuilder){
      this.todoForm=this.fb.group({
        item:['',Validators.required]
      })
    }
    addTask(){
      if(this.todoForm.value.item!==null){
        this.tasks.push({
          description:this.todoForm.value.item
        })
        this.todoForm.reset();
      }
    }
    drop(event: CdkDragDrop<ITask[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
          );
        }
    }
}



