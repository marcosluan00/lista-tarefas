import { Component, signal } from '@angular/core';
import { InputAddItemComponent } from '../../../components/input-add-item/input-add-item.component';
import { ITaskModel } from '../../../../shared/interfaces';
import { InputListItemComponent } from '../../../components/input-list-item/input-list-item.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [InputAddItemComponent, InputListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  public addItem = signal(true);

  public getInputAndAddItem(value: ITaskModel){
    localStorage.setItem(
      '@my-list',
      JSON.stringify([ ...this.#setListItems(), value ])
    )
    return this.#setListItems.set(this.#parseItems());
  }

  #setListItems = signal<ITaskModel[]>(this.#parseItems());

  public getListItems = this.#setListItems.asReadonly();

  #parseItems(){
    return JSON.parse(localStorage.getItem('@my-list') || '[]')
  }

  public deleteAllItems(){
    Swal.fire({
      title: "Tem certeza?",
      text: "Todos os itens serão deletados!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, delete tudo!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('@my-list');
      return this.#setListItems.set(this.#parseItems());
      }
    });
  }

  public listItemsStage(value: 'pending' | 'completed'){
    return this.getListItems().filter((res: ITaskModel) => {
      if(value === 'pending' ){
        return !res.checked
      }
      if(value === 'completed' ){
        return res.checked
      }
      return res
    })
  }
  public updateItemCheckbox(newItem: {id:string,checked:boolean }){
    this.#setListItems.update((oldValue: ITaskModel[])=> {
      oldValue.filter( res => {
        if(res.id === newItem.id){
          res.checked = newItem.checked
          return res
        }
        return res
      })
      return oldValue;
    })

    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems()))
  }

  public updateItemValue(newItem: {id:string,value:string }){
    this.#setListItems.update((oldValue: ITaskModel[])=> {
      oldValue.filter( res => {
        if(res.id === newItem.id){
          res.value = newItem.value
          return res
        }
        return res
      })
      return oldValue;
    })

    return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems()))
  }
  public deleteOneItem(id:string){
    Swal.fire({
      title: "Tem certeza?",
      text: "O item será deletado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.#setListItems.update((oldValue: ITaskModel[])=> {
          return oldValue.filter((res) => res.id !== id);
        })
        return localStorage.setItem('@my-list', JSON.stringify(this.#setListItems()))
      }
    });


  }
}
