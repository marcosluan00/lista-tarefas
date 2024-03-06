import { Component, Output,EventEmitter,ChangeDetectorRef,Input, inject, ElementRef,ViewChild } from '@angular/core';
import { ITaskModel } from '../../../shared/interfaces';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input-add-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input-add-item.component.html',
  styleUrl: './input-add-item.component.scss'
})
export class InputAddItemComponent {
  #cdr = inject(ChangeDetectorRef)

  @Input( {required: true} ) public inputListItems: ITaskModel[] = [];

  @Output() public outputListItems = new EventEmitter<ITaskModel>();

  @ViewChild("inputText") public inputText!: ElementRef;

  public focusAndAddItem(value:string) {
    if(value) {
      this.#cdr.detectChanges();
      this.inputText.nativeElement.value = '';

      const id = `ID-${new Date().getTime()}`

      this.outputListItems.emit({
        id,
        checked: false,
        value
      })

      return this.inputText.nativeElement.focus();
    }
  }
}
