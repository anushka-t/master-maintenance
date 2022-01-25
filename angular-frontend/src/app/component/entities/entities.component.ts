import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NestedParamPipe } from 'src/app/pipe/nested-param.pipe';
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

  constructor(protected restService: AbstractRestService<T>, protected nestedParamPipe: NestedParamPipe,
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
      if(attr.name.split('.').length > 1) {
        
        let splited = attr.name.split('.')
        console.log(splited)
        // this.newEntityForm.addControl(splited[0], new FormGroup({}))
        // let nestedForm: FormGroup = this.newEntityForm.get(splited[0])
        // nestedForm.addControl(splited[1], new FormControl('', Validators.required))
        // console.log(this.newEntityForm)

      } else {
        this.newEntityForm.addControl(attr.name, new FormControl('', Validators.required))
      }
    })

    this.updatedEntityForm = new FormGroup({
      id: new FormControl(0)
    })
    this.attributes.forEach(attr => {
      this.updatedEntityForm.addControl(attr.name, new FormControl('', Validators.required))
    })
    console.log(this.updatedEntityForm)
  }

  get newEntity() { return this.newEntityForm.controls }
  setShowCreateForm(state: boolean) { this.showCreateForm = state; }
  setShowUpdateForm(state: boolean) { this.showUpdateForm = state; }

  update(id: number): void {
    this.setShowUpdateForm(true)
    this.restService.get(id).subscribe(data => {
      let formValue: any = {}
      let formData: any = data
      formValue.id = formData['id']
      this.attributes.forEach(a => {
        formValue[a.name] = this.nestedParamPipe.transform(formData, a.name)
      })
      console.log(formValue)
      this.updatedEntityForm.setValue(formValue)
    })
  }

  delete(id: number): void {
    this.restService.delete(id).subscribe(() => {
      console.log(`entity deleted`)
      window.location.reload()
    })
  }

  onCreate() {
    Object.keys(this.newEntityForm.value).forEach(key => {
      if(key.split('.').length > 1 && key.split('.')[1] === 'id') {

      } 
    })
    this.restService.create(this.newEntityForm.value).subscribe(() => {
      console.log(`new entity created`)
      // window.location.reload()  
    })
  }

  onUpdate() {
    console.log(this.updatedEntityForm.value)
    this.restService.update(this.updatedEntityForm.value.id, this.updatedEntityForm.value).subscribe(() => {
      console.log(`entity updated`)
      // window.location.reload()
    })
  }
}
