import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractRestService } from '../../service/abstract-rest.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css'],
})
export class EntitiesComponent<T> implements OnInit {

  attributes: any[]
  tableData: T[]
  columnsToDisplay: string[]
  showCreateForm: boolean = false
  showUpdateForm: boolean = false
  newEntityForm: FormGroup
  updatedEntityForm: FormGroup

  constructor(protected restService: AbstractRestService<T>, 
    @Inject('attributes') protected _attributes: any[]) { 
    this.attributes = _attributes
  }
  
  ngOnInit(): void {
    this.columnsToDisplay = this.attributes
                              .filter(attr => attr.display === true)
                              .map(attr => attr.name)
                              .concat(['editButton', 'deleteButton'])
    this.restService.getAll().subscribe(data => {
      this.tableData = data
    })

    this.newEntityForm = new FormGroup({})
    this.attributes.forEach(attr => {
      this.newEntityForm.addControl(attr.name, new FormControl('', Validators.required))
    })

    this.updatedEntityForm = new FormGroup({
      id: new FormControl(0)
    })
    this.attributes.forEach(attr => {
      this.updatedEntityForm.addControl(attr.name, new FormControl('', Validators.required))
    })
  }

  get newEntity() { return this.newEntityForm.controls }
  setShowCreateForm(state: boolean) { this.showCreateForm = state; }
  setShowUpdateForm(state: boolean) { this.showUpdateForm = state; }

  update(id: number): void {
    this.setShowUpdateForm(true)
    this.restService.get(id).subscribe(data => {
      this.updatedEntityForm.setValue(data)
    })
  }

  delete(id: number): void {
    this.restService.delete(id).subscribe(() => {
      console.log(`entity deleted`)
      window.location.reload()
    })
  }

  onCreate() {
    this.restService.create(this.newEntityForm.value).subscribe(() => {
      console.log(`new entity created`)
      window.location.reload()
    })
  }

  onUpdate() {
    this.restService.update(this.updatedEntityForm.value.id, this.updatedEntityForm.value).subscribe(() => {
      console.log(`entity updated`)
      window.location.reload()
    })
  }
}
