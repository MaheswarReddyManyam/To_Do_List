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
    allTasks:ITask[]=[];
    localItem:string;
    constructor(private fb:FormBuilder){
      this.todoForm=this.fb.group({
        item:['',Validators.required]
      })
      this.localItem=localStorage.getItem("todos")!;
      this.allTasks=JSON.parse(this.localItem);
      if(this.localItem==null){
        this.allTasks=[];
      }
      else{
        for(let i=0;i<this.allTasks.length;i++){
          if(this.allTasks[i].colNumber===1) this.tasks.push(this.allTasks[i]);
          else if(this.allTasks[i].colNumber===2) this.inprogress.push(this.allTasks[i]);
          else this.done.push(this.allTasks[i]);
        }
      }
    }
    
    addTask(){
      if(this.todoForm.value.item!==null){
        this.tasks.push({
          description:this.todoForm.value.item,
          colNumber:1
        })
        this.todoForm.reset();
        this.allTasks=this.tasks.concat(this.inprogress,this.done);
        console.log(this.allTasks);
        localStorage.setItem("todos",JSON.stringify(this.allTasks));
      }
    }
    drop(event: CdkDragDrop<ITask[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        console.log(event.previousContainer.data[0].colNumber);
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
          );
        }
        for(let i=0;i<this.inprogress.length;i++){
          this.inprogress[i].colNumber=2;
        }
        for(let i=0;i<this.done.length;i++){
          this.done[i].colNumber=3;
        }
        this.allTasks=this.tasks.concat(this.inprogress,this.done);
        console.log(this.allTasks);
      localStorage.setItem("todos",JSON.stringify(this.allTasks));
    }
}



