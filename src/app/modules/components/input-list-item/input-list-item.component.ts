import { Component, Input,Output,EventEmitter } from '@angular/core';
import { ITaskModel } from '../../../shared/interfaces';

@Component({
  selector: 'app-input-list-item',
  standalone: true,
  imports: [],
  templateUrl: './input-list-item.component.html',
  styleUrl: './input-list-item.component.scss'
})
export class InputListItemComponent {

  @Input( {required: true} ) public inputListItems: ITaskModel[] = [];

  @Output() public outputUpdateItemCheckbox = new EventEmitter <{
    id:string,
    checked:boolean;
  }>();

  public updateItemCheckbox(id:string,checked:boolean) {
    return this.outputUpdateItemCheckbox.emit({ id, checked });

  }

  @Output() public outputUpdateItemValue = new EventEmitter <{
    id:string,
    value:string;
  }>();

  public updateItemValue(id:string, value:string) {
    return this.outputUpdateItemValue.emit({ id, value });

  }
  @Output() public outputDeleteItem = new EventEmitter<string>();

  public deleteOneItem(id:string) {
    return this.outputDeleteItem.emit(id);
  }

}
